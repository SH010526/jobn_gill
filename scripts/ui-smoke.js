const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.commandLine.appendSwitch('disable-gpu');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    width: 720,
    height: 820,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '..', 'src', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const consoleMessages = [];
  win.webContents.on('console-message', (_event, _level, message) => {
    consoleMessages.push(message);
  });

  await win.loadFile(path.join(__dirname, '..', 'src', 'renderer', 'index.html'));
  await wait(700);

  const result = await win.webContents.executeJavaScript(`
    (async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const text = (selector) => document.querySelector(selector)?.textContent?.trim() ?? '';
      const click = (selector) => {
        const node = document.querySelector(selector);
        if (!node) return false;
        node.click();
        return true;
      };

      const before = {
        ready: window.__kioskReady === true,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        menuCount: document.querySelectorAll('.menu-card').length,
        firstId: document.querySelector('.menu-card')?.dataset.id ?? '',
        instruction: text('#instructionMessage'),
        visibleMenuCards: (() => {
          const section = document.querySelector('.menu-section')?.getBoundingClientRect();
          if (!section) return 0;
          return [...document.querySelectorAll('.menu-card')].filter((node) => {
            const rect = node.getBoundingClientRect();
            return rect.right > section.left && rect.left < section.right && rect.bottom > section.top && rect.top < section.bottom;
          }).length;
        })(),
        optionsFullyVisible: (() => {
          const options = document.querySelector('#inlineOptionsPanel')?.getBoundingClientRect();
          const footer = document.querySelector('.kiosk-footer')?.getBoundingClientRect();
          return Boolean(options && footer && options.bottom <= footer.top);
        })(),
        optionRect: (() => {
          const options = document.querySelector('#inlineOptionsPanel')?.getBoundingClientRect();
          const footer = document.querySelector('.kiosk-footer')?.getBoundingClientRect();
          return options && footer
            ? { optionTop: Math.round(options.top), optionBottom: Math.round(options.bottom), footerTop: Math.round(footer.top) }
            : null;
        })(),
        footerFullyVisible: (() => {
          const footer = document.querySelector('.kiosk-footer')?.getBoundingClientRect();
          return Boolean(footer && footer.bottom <= window.innerHeight && footer.top >= 0);
        })()
      };

      const clickedCoffee = click('.category-tab[data-category="coffee"]');
      await wait(50);
      const afterCategory = {
        clickedCoffee,
        active: document.querySelector('.category-tab.active')?.dataset.category ?? '',
        menuCount: document.querySelectorAll('.menu-card').length,
        ids: [...document.querySelectorAll('.menu-card')].map((node) => node.dataset.id ?? '').slice(0, 12)
      };

      const clickedMenu = click('.menu-card[data-id="americano"]');
      await wait(80);
      click('#btnGoToOptions');
      await wait(80);
      const afterMenu = {
        clickedMenu,
        selected: text('#summaryDrinkName'),
        checkoutDisabled: document.querySelector('#checkoutBtn')?.disabled ?? true,
        optionCount: document.querySelectorAll('[data-option-key]').length,
        optionLabels: [...document.querySelectorAll('.option-label-solid')].map((node) => node.textContent.trim()),
        optionsFullyVisible: (() => {
          const options = document.querySelector('#inlineOptionsPanel')?.getBoundingClientRect();
          const footer = document.querySelector('.kiosk-footer')?.getBoundingClientRect();
          return Boolean(options && footer && options.bottom <= footer.top);
        })(),
        optionButtonsInside: (() => {
          const panel = document.querySelector('#inlineOptionsPanel')?.getBoundingClientRect();
          if (!panel) return false;
          return [...document.querySelectorAll('.opt-solid-btn')].every((node) => {
            const rect = node.getBoundingClientRect();
            return rect.left >= panel.left && rect.right <= panel.right && rect.top >= panel.top && rect.bottom <= panel.bottom;
          });
        })()
      };

      const clickedDose = click('[data-option-key="dose"][data-option-value="18"]');
      const clickedPlus = click('#btnQtyPlus');
      await wait(80);
      const afterOptions = {
        clickedDose,
        clickedPlus,
        options: text('#summaryDrinkOptions'),
        qty: text('#qtyVal'),
        total: text('#totalCartAmount')
      };

      const clickedAll = click('.category-tab[data-category="all"]');
      await wait(80);
      const grid = document.querySelector('#menuGrid');
      const menuScroller = document.querySelector('.menu-section');
      if (grid && menuScroller) {
        const wheelEvent = new WheelEvent('wheel', { deltaY: 500, bubbles: true, cancelable: true });
        menuScroller.dispatchEvent(wheelEvent);
        if ((window.__menuVerticalOffset ?? 0) === 0 && typeof menuScroller.onwheel === 'function') menuScroller.onwheel(wheelEvent);
      }
      await wait(180);
      const syntheticWheelScrollTop = window.__menuVerticalOffset ?? -1;
      const beforeWheelOffset = window.__menuOffset ?? 0;
      if (menuScroller) menuScroller.dispatchEvent(new WheelEvent('wheel', { deltaY: 500, bubbles: true, cancelable: true }));
      await wait(80);
      const afterWheelOffset = window.__menuOffset ?? 0;
      if (grid) {
        grid.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 1, button: 0, clientX: 500, bubbles: true }));
        grid.dispatchEvent(new PointerEvent('pointermove', { pointerId: 1, button: 0, clientX: 180, bubbles: true }));
        grid.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1, button: 0, clientX: 180, bubbles: true }));
      }
      await wait(120);
      const afterScroll = {
        clickedAll,
        scrollWidth: grid?.scrollWidth ?? -1,
        clientWidth: grid?.clientWidth ?? -1,
        scrollHeight: grid?.scrollHeight ?? -1,
        clientHeight: menuScroller?.clientHeight ?? -1,
        scrollTop: window.__menuVerticalOffset ?? -1,
        syntheticWheelScrollTop,
        overflow: grid ? grid.scrollWidth > grid.clientWidth : false,
        beforeWheelOffset,
        afterWheelOffset,
        dragMenuOffset: window.__menuOffset ?? 0,
        transform: grid?.style.transform ?? ''
      };

      const clickedGear = click('#gearButton');
      await wait(50);
      const drawerOpen = document.querySelector('#adminDrawer')?.classList.contains('open') ?? false;
      const clickedClose = click('#closeDrawerButton');
      await wait(50);
      const drawerClosed = !(document.querySelector('#adminDrawer')?.classList.contains('open') ?? true);

      const clickedCheckout = click('#checkoutBtn');
      await wait(800);
      const afterCheckout = {
        clickedCheckout,
        drawerOpen: document.querySelector('#adminDrawer')?.classList.contains('open') ?? false,
        hasLog: text('#logList').length > 0
      };

      return { before, afterCategory, afterMenu, afterOptions, afterScroll, clickedGear, drawerOpen, clickedClose, drawerClosed, afterCheckout };
    })()
  `);

  await win.webContents.executeJavaScript(`
    document.querySelector('#drawerBackdrop')?.click();
    const grid = document.querySelector('#menuGrid');
    if (grid) {
      grid.scrollIntoView({ block: 'center' });
      grid.scrollLeft = 0;
    }
  `);
  await wait(100);
  const rect = await win.webContents.executeJavaScript(`
    (() => {
      const rect = document.querySelector('#menuGrid')?.getBoundingClientRect();
      return rect ? { x: Math.round(rect.left + 40), y: Math.round(rect.top + 40) } : null;
    })()
  `);
  if (rect) {
    win.webContents.sendInputEvent({ type: 'mouseMove', x: rect.x, y: rect.y });
    win.webContents.sendInputEvent({ type: 'mouseWheel', x: rect.x, y: rect.y, deltaY: 500, wheelTicksY: 5 });
    await wait(250);
    result.afterScroll.realWheelMenuOffset = await win.webContents.executeJavaScript(`window.__menuOffset ?? 0`);
    result.afterScroll.realWheelScrollTop = await win.webContents.executeJavaScript(`window.__menuVerticalOffset ?? 0`);
  }

  const output = JSON.stringify({ result, consoleMessages }, null, 2);
  fs.writeFileSync(path.join(__dirname, '..', 'ui-smoke-result.json'), output, 'utf8');
  console.log(output);
  const failures = [];
  if (!result.before.ready) failures.push('화면 초기화 실패');
  if (result.before.menuCount !== 20) failures.push(`전체 메뉴 ${result.before.menuCount}개 표시`);
  if (result.before.visibleMenuCards !== 10 && result.before.visibleMenuCards !== 12) failures.push(`첫 화면에 보이는 메뉴 ${result.before.visibleMenuCards}개`);
  if (!result.before.optionsFullyVisible) failures.push('옵션 영역이 하단바와 겹침');
  if (!result.before.footerFullyVisible) failures.push('하단 주문바가 화면 밖으로 나감');
  if (result.afterScroll.overflow) failures.push('메뉴판에 가로 빈 영역이 남음');
  if (result.afterScroll.scrollHeight <= result.afterScroll.clientHeight) failures.push('메뉴판 세로 스크롤 없음');
  if ((result.afterScroll.syntheticWheelScrollTop ?? 0) <= 0) failures.push('메뉴판이 아래로 움직이지 않음');
  if (result.afterScroll.dragMenuOffset !== 0) failures.push(`메뉴판이 좌우로 밀림: ${result.afterScroll.dragMenuOffset}`);
  if (!result.afterMenu.clickedMenu || result.afterMenu.checkoutDisabled) failures.push('음료 선택 후 주문 버튼 활성화 실패');
  if (!result.afterMenu.optionsFullyVisible) failures.push('음료 선택 후 옵션 영역이 하단바와 겹침');
  if (!result.afterMenu.optionButtonsInside) failures.push('옵션 버튼이 옵션 박스 밖으로 넘어감');
  if (!result.drawerOpen || !result.drawerClosed) failures.push('설정 패널 열기/닫기 실패');
  if (failures.length) {
    throw new Error(failures.join(', '));
  }
  app.quit();
}).catch((error) => {
  console.error(error);
  app.quit();
});
