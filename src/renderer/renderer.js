const stageMap = [
  { value: 0, label: '대기' },
  { value: 1, label: '그라인딩' },
  { value: 2, label: '레벨링' },
  { value: 3, label: '리드 닫힘' },
  { value: 4, label: '탬핑' },
  { value: 5, label: '준비완료' },
  { value: 7, label: '추출' },
  { value: 8, label: '퍽 드라이' },
  { value: 9, label: '리드 열림' },
  { value: 10, label: '와이프' },
  { value: 11, label: '복귀' }
];

const menuItems = [
  {
    id: 'americano',
    category: 'coffee',
    name: '좁은길 아메리카노',
    desc: '고소한 원두와 깔끔한 밸런스',
    price: 2500,
    dose: 15,
    yieldMl: 36,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'espresso',
    category: 'coffee',
    name: '딥 에스프레소',
    desc: '짧은 잔에 담긴 진한 바디감',
    price: 2000,
    dose: 18,
    yieldMl: 30,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'einspanner',
    category: 'coffee',
    name: '아인슈페너',
    desc: '차가운 커피 위에 부드러운 크림',
    price: 4500,
    dose: 15,
    yieldMl: 45,
    temp: 'ICE',
    badges: ['ICE', 'BEST'],
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'vanilla-latte',
    category: 'latte',
    name: '바닐라 빈 라떼',
    desc: '바닐라 향을 더한 달콤한 라떼',
    price: 4000,
    dose: 16,
    yieldMl: 40,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'coldbrew',
    category: 'coffee',
    name: '리얼 콜드브루',
    desc: '천천히 추출한 깔끔한 차가운 커피',
    price: 3800,
    dose: 15,
    yieldMl: 45,
    temp: 'ICE',
    badges: ['ICE'],
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'grapefruit-ade',
    category: 'ade',
    name: '자몽 에이드',
    desc: '자몽의 산뜻함과 탄산감',
    price: 4000,
    dose: 12,
    yieldMl: 45,
    temp: 'ICE',
    badges: ['ICE'],
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'cafe-latte',
    category: 'latte',
    name: '시그니처 카페라떼',
    desc: '에스프레소와 우유의 부드러운 균형',
    price: 3500,
    dose: 16,
    yieldMl: 40,
    temp: 'HOT',
    badges: ['HOT', 'BEST'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'matcha-latte',
    category: 'latte',
    name: '제주 말차라떼',
    desc: '말차의 쌉싸름함과 우유의 밸런스',
    price: 4200,
    dose: 14,
    yieldMl: 42,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'peach-tea',
    category: 'latte',
    name: '피치 블러썸 티',
    desc: '복숭아 향이 은은한 티 메뉴',
    price: 3500,
    dose: 12,
    yieldMl: 45,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'lemon-ade',
    category: 'ade',
    name: '레몬 에이드',
    desc: '레몬의 청량함이 살아있는 에이드',
    price: 4000,
    dose: 12,
    yieldMl: 45,
    temp: 'ICE',
    badges: ['ICE'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'dolce-coldbrew',
    category: 'coffee',
    name: '돌체 콜드브루',
    desc: '콜드브루에 달콤한 밀크감을 더한 메뉴',
    price: 4300,
    dose: 15,
    yieldMl: 45,
    temp: 'ICE',
    badges: ['ICE'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'decaf-americano',
    category: 'coffee',
    name: '디카페인 아메리카노',
    desc: '카페인 부담을 줄인 깔끔한 커피',
    price: 3000,
    dose: 15,
    yieldMl: 36,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'cappuccino',
    category: 'latte',
    name: '시나몬 카푸치노',
    desc: '풍성한 거품과 은은한 시나몬 향',
    price: 3900,
    dose: 16,
    yieldMl: 38,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'caramel-macchiato',
    category: 'latte',
    name: '카라멜 마끼아또',
    desc: '카라멜의 달콤함이 살아있는 라떼',
    price: 4500,
    dose: 16,
    yieldMl: 42,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'hazelnut-latte',
    category: 'latte',
    name: '헤이즐넛 라떼',
    desc: '고소한 향을 더한 부드러운 라떼',
    price: 4300,
    dose: 16,
    yieldMl: 42,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'black-tea',
    category: 'latte',
    name: '클래식 홍차',
    desc: '가볍고 깔끔한 향의 티 메뉴',
    price: 3500,
    dose: 12,
    yieldMl: 45,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'choco-latte',
    category: 'latte',
    name: '다크 초코라떼',
    desc: '진한 초콜릿과 우유의 묵직한 조합',
    price: 4200,
    dose: 12,
    yieldMl: 48,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'earl-grey-milk',
    category: 'latte',
    name: '얼그레이 밀크티',
    desc: '홍차 향과 우유감이 부드럽게 이어집니다',
    price: 4200,
    dose: 12,
    yieldMl: 48,
    temp: 'HOT',
    badges: ['HOT'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'green-grape-ade',
    category: 'ade',
    name: '청포도 에이드',
    desc: '청포도 향과 탄산감이 선명한 에이드',
    price: 4500,
    dose: 12,
    yieldMl: 45,
    temp: 'ICE',
    badges: ['ICE'],
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=640&auto=format&fit=crop&q=80'
  },
  {
    id: 'blue-lemon-ade',
    category: 'ade',
    name: '블루 레몬 에이드',
    desc: '레몬의 산뜻함에 청량한 블루 베이스를 더한 에이드',
    price: 4500,
    dose: 12,
    yieldMl: 45,
    temp: 'ICE',
    badges: ['ICE'],
    image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=640&auto=format&fit=crop&q=80'
  }
];

const optionSets = {
  coffee: [
    {
      key: 'temp',
      title: '온도',
      choices: [
        { label: '뜨겁게', value: 'HOT', desc: '따뜻한 커피로 제조합니다.' },
        { label: '차갑게', value: 'ICE', desc: '아이스 커피로 제조합니다.' }
      ]
    },
    {
      key: 'dose',
      title: '커피 농도',
      choices: [
        { label: '연하게', value: 12, desc: '원두를 줄여 가볍게 만듭니다.' },
        { label: '기본', value: 15, desc: '기본 원두량으로 만듭니다.' },
        { label: '진하게', value: 18, desc: '원두를 늘려 진하게 만듭니다.', extra: 500 }
      ]
    },
    {
      key: 'yieldMl',
      title: '물 양',
      choices: [
        { label: '적게', value: 30, desc: '물 양을 줄여 맛을 선명하게 합니다.' },
        { label: '기본', value: 36, desc: '기본 물 양입니다.' },
        { label: '많게', value: 45, desc: '물 양을 늘려 부드럽게 만듭니다.' }
      ]
    }
  ],
  latte: [
    {
      key: 'temp',
      title: '온도',
      choices: [
        { label: '뜨겁게', value: 'HOT', desc: '따뜻한 라떼로 제조합니다.' },
        { label: '차갑게', value: 'ICE', desc: '아이스 라떼로 제조합니다.' }
      ]
    },
    {
      key: 'dose',
      title: '샷 농도',
      choices: [
        { label: '연하게', value: 12, desc: '샷을 줄여 가볍게 만듭니다.' },
        { label: '기본', value: 16, desc: '기본 샷으로 만듭니다.' },
        { label: '샷 추가', value: 18, desc: '샷을 더해 진하게 만듭니다.', extra: 500 }
      ]
    },
    {
      key: 'yieldMl',
      title: '우유 양',
      choices: [
        { label: '적게', value: 32, desc: '우유를 줄여 커피 맛을 살립니다.' },
        { label: '기본', value: 40, desc: '기본 우유 양입니다.' },
        { label: '많게', value: 48, desc: '우유를 늘려 부드럽게 만듭니다.' }
      ]
    }
  ],
  ade: [
    {
      key: 'temp',
      title: '온도',
      choices: [{ label: '차갑게', value: 'ICE', desc: '에이드는 차갑게만 제조합니다.' }]
    },
    {
      key: 'dose',
      title: '시럽 농도',
      choices: [
        { label: '연하게', value: 10, desc: '시럽을 줄여 덜 달게 만듭니다.' },
        { label: '기본', value: 12, desc: '기본 시럽 양입니다.' },
        { label: '진하게', value: 15, desc: '시럽을 늘려 맛을 진하게 합니다.', extra: 500 }
      ]
    },
    {
      key: 'yieldMl',
      title: '탄산',
      choices: [
        { label: '약하게', value: 38, desc: '탄산을 줄입니다.' },
        { label: '기본', value: 45, desc: '기본 탄산입니다.' },
        { label: '강하게', value: 52, desc: '탄산을 늘립니다.' }
      ]
    }
  ]
};

const sensorHistory = [];
const maxHistory = 30;
let latestStatusTime = 0;
const api = window.machineApi ?? {
  listPorts: async () => [],
  connect: async () => null,
  disconnect: async () => true,
  snapshot: async () => null,
  addOrder: async () => [],
  cancelActive: async () => false,
  clearWaiting: async () => 0,
  onState: () => () => undefined,
  onLog: () => () => undefined
};

const el = {};
let selectedCategory = 'all';
let selectedDrink = null;
let selectedOptions = { temp: 'HOT', dose: 15, yieldMl: 36 };
let selectedCups = 1;
let cupsOptions = [];
let activeCupIndex = 0;
let paymentTimer = null;
let menuOffset = 0;
let menuVerticalOffset = 0;
let menuDragDistance = 0;
let menuWasDragged = false;
let screenStage = 'menu';
let dismissedFinishedOrderId = null;

function bindElements() {
  const ids = [
    'kioskStartScreen',
    'btnStartOrder',
    'clockValue',
    'connectionState',
    'instructionMessage',
    'menuGrid',
    'inlineOptionsPanel',
    'optionsBgBlur',
    'optionsPlaceholder',
    'optionsActiveContent',
    'optionTypeBadge',
    'inlineDrinkTitle',
    'inlineDrinkDesc',
    'optionGroups',
    'cupTabsContainer',
    'summaryEmptyState',
    'summaryActiveState',
    'summaryTempBadge',
    'summaryDrinkName',
    'summaryDrinkOptions',
    'totalCartAmount',
    'checkoutBtn',
    'footerCheckoutRow',
    'btnQtyMinus',
    'btnQtyPlus',
    'qtyVal',
    'paymentModalOverlay',
    'paymentModalAmount',
    'btnCancelPayment',
    'view-status',
    'tempValue',
    'pressureValue',
    'cupValue',
    'modeValue',
    'stageValue',
    'recipeState',
    'progressPercentText',
    'stageProgress',
    'stageSteps',
    'activeMessage',
    'statusActionButton',
    'tempCanvas',
    'pressureCanvas',
    'tempChartValue',
    'pressureChartValue',
    'portInput',
    'portList',
    'baudInput',
    'refreshPortsButton',
    'connectButton',
    'disconnectButton',
    'cancelButton',
    'clearQueueButton',
    'queueCount',
    'queueList',
    'logList',
    'gearButton',
    'adminDrawer',
    'drawerBackdrop',
    'closeDrawerButton',
    'cupsInput',
    'doseInput',
    'yieldInput',
    'brewerInput',
    'grinderInput',
    'selectedMenuName',
    'selectedRecipe'
  ];

  ids.forEach((id) => {
    const key = id === 'view-status' ? 'viewStatus' : id;
    el[key] = document.getElementById(id);
  });
  el.categoryTabs = [...document.querySelectorAll('.category-tab')];
}

function safeText(node, value) {
  if (node) node.textContent = value;
}

function formatCurrency(value) {
  return `${Number(value).toLocaleString('ko-KR')}원`;
}

function formatTime(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(iso));
}

function updateClock() {
  safeText(
    el.clockValue,
    new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit' }).format(new Date())
  );
}

function getOptionSet() {
  if (!selectedDrink) return [];
  const category = selectedDrink.category;
  
  if (category === 'coffee') {
    return [
      {
        key: 'temp',
        title: '온도',
        choices: [
          { label: '뜨겁게', value: 'HOT', desc: '따뜻한 커피로 제조합니다.' },
          { label: '차갑게', value: 'ICE', desc: '아이스 커피로 제조합니다.' }
        ]
      },
      {
        key: 'dose',
        title: '커피 농도',
        choices: [
          { label: '연하게', value: selectedDrink.dose - 3, desc: '원두를 줄여 가볍게 만듭니다.' },
          { label: '기본', value: selectedDrink.dose, desc: '기본 원두량으로 만듭니다.' },
          { label: '진하게', value: selectedDrink.dose + 3, desc: '원두를 늘려 진하게 만듭니다.', extra: 500 }
        ]
      },
      {
        key: 'yieldMl',
        title: '물 양',
        choices: [
          { label: '적게', value: selectedDrink.yieldMl - 6, desc: '물 양을 줄여 맛을 선명하게 합니다.' },
          { label: '기본', value: selectedDrink.yieldMl, desc: '기본 물 양입니다.' },
          { label: '많게', value: selectedDrink.yieldMl + 9, desc: '물 양을 늘려 부드럽게 만듭니다.' }
        ]
      }
    ];
  } else if (category === 'latte') {
    return [
      {
        key: 'temp',
        title: '온도',
        choices: [
          { label: '뜨겁게', value: 'HOT', desc: '따뜻한 라떼로 제조합니다.' },
          { label: '차갑게', value: 'ICE', desc: '아이스 라떼로 제조합니다.' }
        ]
      },
      {
        key: 'dose',
        title: '샷 농도',
        choices: [
          { label: '연하게', value: selectedDrink.dose - 4, desc: '샷을 줄여 가볍게 만듭니다.' },
          { label: '기본', value: selectedDrink.dose, desc: '기본 샷으로 만듭니다.' },
          { label: '샷 추가', value: selectedDrink.dose + 2, desc: '샷을 더해 진하게 만듭니다.', extra: 500 }
        ]
      },
      {
        key: 'yieldMl',
        title: '우유 양',
        choices: [
          { label: '적게', value: selectedDrink.yieldMl - 8, desc: '우유를 줄여 커피 맛을 살립니다.' },
          { label: '기본', value: selectedDrink.yieldMl, desc: '기본 우유 양입니다.' },
          { label: '많게', value: selectedDrink.yieldMl + 8, desc: '우유를 늘려 부드럽게 만듭니다.' }
        ]
      }
    ];
  } else if (category === 'ade') {
    return [
      {
        key: 'temp',
        title: '온도',
        choices: [{ label: '차갑게', value: 'ICE', desc: '에이드는 차갑게만 제조합니다.' }]
      },
      {
        key: 'dose',
        title: '시럽 농도',
        choices: [
          { label: '연하게', value: selectedDrink.dose - 2, desc: '시럽을 줄여 덜 달게 만듭니다.' },
          { label: '기본', value: selectedDrink.dose, desc: '기본 시럽 양입니다.' },
          { label: '진하게', value: selectedDrink.dose + 3, desc: '시럽을 늘려 맛을 진하게 합니다.', extra: 500 }
        ]
      },
      {
        key: 'yieldMl',
        title: '탄산',
        choices: [
          { label: '약하게', value: selectedDrink.yieldMl - 7, desc: '탄산을 줄입니다.' },
          { label: '기본', value: selectedDrink.yieldMl, desc: '기본 탄산입니다.' },
          { label: '강하게', value: selectedDrink.yieldMl + 7, desc: '탄산을 늘립니다.' }
        ]
      }
    ];
  }
  
  return [];
}

function getChoice(key, value) {
  return getOptionSet().find((group) => group.key === key)?.choices.find((choice) => choice.value === value);
}

function getUnitPrice(options = selectedOptions) {
  if (!selectedDrink) return 0;
  return selectedDrink.price + (getChoice('dose', options.dose)?.extra ?? 0);
}

function syncHiddenInputs() {
  if (el.cupsInput) el.cupsInput.value = selectedCups;
  if (el.doseInput) el.doseInput.value = selectedOptions.dose;
  if (el.yieldInput) el.yieldInput.value = selectedOptions.yieldMl;
  safeText(el.selectedMenuName, selectedDrink?.name ?? '');
  safeText(
    el.selectedRecipe,
    selectedDrink ? `${selectedCups}잔 · ${Number(selectedOptions.dose).toFixed(1)}g · ${Number(selectedOptions.yieldMl).toFixed(1)}ml` : ''
  );
}

function renderMenu() {
  if (!el.menuGrid) return;
  const visibleItems = menuItems.filter((item) => selectedCategory === 'all' || item.category === selectedCategory);
  menuOffset = 0;
  menuVerticalOffset = 0;
  menuWasDragged = false;
  menuDragDistance = 0;
  el.menuGrid.innerHTML = visibleItems
    .map((item) => {
      const selected = selectedDrink?.id === item.id ? ' selected' : '';
      const badges = item.badges
        .map((badge) => `<span class="badge badge-${badge.toLowerCase()}">${badge}</span>`)
        .join('');
      return `
        <button type="button" class="menu-card${selected}" data-id="${item.id}" data-category="${item.category}">
          <div class="card-image-box">
            <img class="drink-img" src="${item.image}" alt="${item.name}" />
            ${badges}
          </div>
          <div class="card-details">
            <strong class="menu-title">${item.name}</strong>
            <span class="menu-price">${formatCurrency(item.price)}</span>
          </div>
        </button>
      `;
    })
    .join('');
  requestAnimationFrame(() => applyMenuVerticalOffset(false));
}

function selectDrink(id) {
  const drink = menuItems.find((item) => item.id === id);
  if (!drink) return;

  selectedDrink = drink;
  const initialOpt = {
    temp: drink.category === 'ade' ? 'ICE' : drink.temp,
    dose: drink.dose,
    yieldMl: drink.yieldMl
  };
  selectedCups = 1;
  cupsOptions = [initialOpt];
  activeCupIndex = 0;
  selectedOptions = cupsOptions[activeCupIndex];

  if (screenStage === 'options') {
    safeText(el.instructionMessage, `${drink.name} 옵션을 선택해 주세요.`);
    renderMenu();
    renderOptions();
    renderSummary();
    syncHiddenInputs();

    // Scroll the selected card row into view in the 1-row layout
    const visibleItems = menuItems.filter((item) => selectedCategory === 'all' || item.category === selectedCategory);
    const drinkIndex = visibleItems.findIndex((item) => item.id === id);
    if (drinkIndex !== -1) {
      const rowIndex = Math.floor(drinkIndex / 3);
      menuVerticalOffset = rowIndex * 160;
      setTimeout(() => {
        applyMenuVerticalOffset(true);
      }, 50);
    }
  } else {
    safeText(el.instructionMessage, `${drink.name}이(가) 선택되었습니다. 아래 '옵션 선택하기'를 눌러주세요.`);
    renderMenu();
    renderSummary();
    syncHiddenInputs();
  }
}

function goToOptionsStage() {
  if (!selectedDrink) return;
  screenStage = 'options';
  document.body.dataset.screenStage = 'options';
  safeText(el.instructionMessage, `${selectedDrink.name} 옵션을 선택해 주세요.`);
  renderMenu();
  renderOptions();
  renderSummary();

  // Scroll the selected card row into view in the 1-row layout
  const visibleItems = menuItems.filter((item) => selectedCategory === 'all' || item.category === selectedCategory);
  const drinkIndex = visibleItems.findIndex((item) => item.id === selectedDrink.id);
  if (drinkIndex !== -1) {
    const rowIndex = Math.floor(drinkIndex / 3);
    menuVerticalOffset = rowIndex * 160;
    setTimeout(() => {
      applyMenuVerticalOffset(true);
    }, 50);
  }
}

function goToMenuStage() {
  screenStage = 'menu';
  document.body.dataset.screenStage = 'menu';
  safeText(el.instructionMessage, '원하는 음료를 선택해 주세요.');
  renderMenu();
  renderOptions();
  renderSummary();

  // Scroll the selected card row into view in the 3-row layout
  const visibleItems = menuItems.filter((item) => selectedCategory === 'all' || item.category === selectedCategory);
  const drinkIndex = visibleItems.findIndex((item) => item.id === selectedDrink?.id);
  if (drinkIndex !== -1) {
    const rowIndex = Math.floor(drinkIndex / 3);
    menuVerticalOffset = rowIndex * 160;
    setTimeout(() => {
      applyMenuVerticalOffset(true);
    }, 50);
  }
}

function resetOrderSelection() {
  selectedDrink = null;
  selectedCups = 1;
  cupsOptions = [];
  activeCupIndex = 0;
  selectedOptions = { temp: 'HOT', dose: 15, yieldMl: 36 };
  screenStage = 'menu';
  document.body.dataset.screenStage = 'menu';
  safeText(el.instructionMessage, '원하는 음료를 선택해 주세요.');
  renderMenu();
  renderOptions();
  renderSummary();
  syncHiddenInputs();
}

function showHomeScreen() {
  resetOrderSelection();
  if (!el.kioskStartScreen) return;
  el.kioskStartScreen.hidden = false;
  el.kioskStartScreen.classList.remove('fade-out');
}

function renderOptions() {
  if (!el.inlineOptionsPanel || !el.optionGroups) return;

  if (!selectedDrink) {
    document.body.dataset.drinkSelected = 'false';
    document.body.dataset.screenStage = 'menu';
    el.inlineOptionsPanel.classList.add('disabled');
    if (el.optionsPlaceholder) el.optionsPlaceholder.hidden = false;
    if (el.optionsActiveContent) el.optionsActiveContent.hidden = true;
    el.optionGroups.innerHTML = '';
    if (el.cupTabsContainer) {
      el.cupTabsContainer.hidden = true;
      el.cupTabsContainer.innerHTML = '';
    }
    if (el.optionsBgBlur) {
      el.optionsBgBlur.style.backgroundImage = 'none';
      el.optionsBgBlur.style.opacity = '0';
    }
    return;
  }

  document.body.dataset.drinkSelected = 'true';
  document.body.dataset.screenStage = screenStage;
  el.inlineOptionsPanel.classList.remove('disabled');
  if (el.optionsPlaceholder) el.optionsPlaceholder.hidden = true;
  if (el.optionsActiveContent) el.optionsActiveContent.hidden = false;
  if (el.optionsBgBlur) {
    el.optionsBgBlur.style.backgroundImage = `url(${selectedDrink.image})`;
    el.optionsBgBlur.style.opacity = '1';
  }
  safeText(el.inlineDrinkTitle, selectedDrink.name);
  safeText(el.inlineDrinkDesc, selectedDrink.desc);
  safeText(
    el.optionTypeBadge,
    selectedDrink.category === 'coffee' ? '커피 옵션' : selectedDrink.category === 'latte' ? '라떼·티 옵션' : '에이드 옵션'
  );

  // Cup Tabs Rendering
  if (el.cupTabsContainer) {
    if (selectedCups > 1) {
      el.cupTabsContainer.hidden = false;
      el.cupTabsContainer.innerHTML = cupsOptions
        .map((cupOpt, idx) => {
          const isActive = idx === activeCupIndex ? ' active' : '';
          const doseLbl = getChoice('dose', cupOpt.dose)?.label ?? '기본';
          const tempLbl = cupOpt.temp === 'ICE' ? '아이스' : '핫';
          return `
            <button type="button" class="cup-tab${isActive}" data-index="${idx}">
              <span class="tab-cup-num">컵 ${idx + 1}</span>
              <span class="tab-cup-desc">${tempLbl}/${doseLbl}</span>
            </button>
          `;
        })
        .join('');
    } else {
      el.cupTabsContainer.hidden = true;
      el.cupTabsContainer.innerHTML = '';
    }
  }

  el.optionGroups.innerHTML = getOptionSet()
    .map((group) => {
      const choices = group.choices
        .map((choice) => {
          const active = selectedOptions[group.key] === choice.value ? ' active' : '';
          const tempClass = group.key === 'temp' ? ` temp-btn ${choice.value === 'ICE' ? 'ice' : 'hot'}` : '';
          return `
            <button type="button" class="opt-solid-btn${tempClass}${active}" data-option-key="${group.key}" data-option-value="${choice.value}">
              <span>${choice.label}</span>
              <span class="chk-status">${active ? '✓' : ''}</span>
            </button>
          `;
        })
        .join('');
      return `
        <section class="option-group-solid">
          <strong class="option-label-solid">${group.title}</strong>
          <div class="option-button-grid">${choices}</div>
        </section>
      `;
    })
    .join('');
}

function areCupsOptionsIdentical() {
  if (cupsOptions.length <= 1) return true;
  const first = cupsOptions[0];
  return cupsOptions.every(
    (opt) => opt.temp === first.temp && opt.dose === first.dose && opt.yieldMl === first.yieldMl
  );
}

function renderSummary() {
  if (!selectedDrink) {
    if (el.summaryEmptyState) el.summaryEmptyState.hidden = false;
    if (el.summaryActiveState) el.summaryActiveState.hidden = true;
    safeText(el.totalCartAmount, '0원');
    if (el.checkoutBtn) el.checkoutBtn.disabled = true;
    if (el.btnQtyMinus) el.btnQtyMinus.disabled = true;
    if (el.btnQtyPlus) el.btnQtyPlus.disabled = true;
    safeText(el.qtyVal, '1');
    if (el.footerCheckoutRow) {
      el.footerCheckoutRow.innerHTML = `
        <button type="button" class="btn-kiosk-checkout-primary" id="btnGoToOptions" disabled>옵션 선택하기</button>
      `;
    }
    return;
  }

  const doseTitle = getOptionSet().find((group) => group.key === 'dose')?.title ?? '농도';
  const yieldTitle = getOptionSet().find((group) => group.key === 'yieldMl')?.title ?? '물 양';
  if (el.summaryEmptyState) el.summaryEmptyState.hidden = true;
  if (el.summaryActiveState) el.summaryActiveState.hidden = false;
  safeText(el.summaryTempBadge, selectedOptions.temp);
  if (el.summaryTempBadge) el.summaryTempBadge.className = `summary-temp-badge ${selectedOptions.temp === 'ICE' ? 'ice' : 'hot'}`;
  safeText(el.summaryDrinkName, selectedDrink.name);

  let optionsText = '';
  if (areCupsOptionsIdentical()) {
    const doseChoice = getChoice('dose', selectedOptions.dose);
    const yieldChoice = getChoice('yieldMl', selectedOptions.yieldMl);
    optionsText = `${doseTitle} ${doseChoice?.label ?? '기본'} · ${yieldTitle} ${yieldChoice?.label ?? '기본'} · ${selectedCups}잔`;
  } else {
    optionsText = cupsOptions
      .map((opt, idx) => {
        const tempChoice = opt.temp === 'ICE' ? '아이스' : '핫';
        const doseChoice = getChoice('dose', opt.dose)?.label ?? '기본';
        return `컵${idx + 1}(${tempChoice}/${doseChoice})`;
      })
      .join(' · ');
  }

  safeText(el.summaryDrinkOptions, optionsText);

  const totalAmount = cupsOptions.reduce((sum, cupOpt) => sum + getUnitPrice(cupOpt), 0);
  safeText(el.totalCartAmount, formatCurrency(totalAmount));

  if (el.checkoutBtn) el.checkoutBtn.disabled = false;
  if (el.btnQtyMinus) el.btnQtyMinus.disabled = selectedCups <= 1;
  if (el.btnQtyPlus) el.btnQtyPlus.disabled = selectedCups >= 5;
  safeText(el.qtyVal, String(selectedCups));

  if (el.footerCheckoutRow) {
    if (screenStage === 'menu') {
      el.footerCheckoutRow.innerHTML = `
        <div class="checkout-split-buttons">
          <button type="button" class="btn-kiosk-checkout-secondary" id="btnGoHome">홈으로</button>
          <button type="button" class="btn-kiosk-checkout-primary" id="btnGoToOptions">옵션 선택하기</button>
        </div>
      `;
    } else {
      el.footerCheckoutRow.innerHTML = `
        <div class="checkout-split-buttons three">
          <button type="button" class="btn-kiosk-checkout-secondary" id="btnGoHome">홈으로</button>
          <button type="button" class="btn-kiosk-checkout-secondary" id="btnBackToMenu">이전으로</button>
          <button type="button" class="btn-kiosk-checkout-primary" id="checkoutBtn">주문 전송</button>
        </div>
      `;
    }
  }
}

async function refreshPorts() {
  try {
    const ports = (await api.listPorts()).filter((port) => ['COM6', 'COM7'].includes(String(port.path).toUpperCase()));
    if (el.portList) el.portList.innerHTML = '';
    ports.forEach((port) => {
      const option = document.createElement('option');
      option.value = port.path;
      option.label = port.friendlyName || port.manufacturer || port.path;
      el.portList?.append(option);
    });
    if (ports.length > 0 && el.portInput && !ports.some((port) => port.path === el.portInput.value)) {
      el.portInput.value = ports[0].path;
    }
    addLog({
      time: new Date().toISOString(),
      message: ports.length ? `COM6/COM7 중 사용 가능한 포트 ${ports.length}개를 찾았습니다.` : 'COM6/COM7 포트를 찾지 못했습니다.'
    });
  } catch (error) {
    addLog({ time: new Date().toISOString(), message: `포트 조회 실패: ${error.message}` });
  }
}

function addLog(entry) {
  if (!el.logList) return;
  const item = document.createElement('li');
  item.innerHTML = `<span>${formatTime(entry.time)}</span><strong>${entry.message}</strong>`;
  el.logList.prepend(item);
  while (el.logList.children.length > 80) el.logList.lastElementChild.remove();
}

function renderState(snapshot) {
  if (!snapshot?.status) {
    latestStatusTime = 0;
    sensorHistory.length = 0;
    safeText(el.connectionState, '미연결');
    if (el.connectionState) el.connectionState.className = 'state-bad';
    if (el.viewStatus) el.viewStatus.hidden = true;
    document.body.dataset.brewing = 'false';
    drawTrend();
    return;
  }

  const status = snapshot.status;
  const statusTime = Date.parse(status.updatedAt ?? '') || Date.now();
  if (statusTime < latestStatusTime) return;
  latestStatusTime = statusTime;

  const queue = snapshot.queue ?? [];
  safeText(el.connectionState, snapshot.connectionText || (snapshot.connected ? '연결됨' : '응답 없음'));
  if (el.connectionState) {
    el.connectionState.className = snapshot.connected
      ? snapshot.consecutivePollErrors > 0
        ? 'state-warn'
        : 'state-good'
      : 'state-bad';
  }
  safeText(el.tempValue, `${status.boilerTemp.toFixed(1)}°C`);
  safeText(el.pressureValue, `${status.pressureBar.toFixed(2)} bar`);
  safeText(el.tempChartValue, `${status.boilerTemp.toFixed(1)}°C`);
  safeText(el.pressureChartValue, `${status.pressureBar.toFixed(2)} bar`);
  safeText(el.cupValue, status.cupText);
  safeText(el.modeValue, status.sysModeText);

  const display = getStatusDisplay(snapshot);
  safeText(el.stageValue, display.title);
  safeText(el.recipeState, display.stateText);
  safeText(el.activeMessage, display.message);
  if (el.statusActionButton) {
    el.statusActionButton.hidden = !display.showAction;
    el.statusActionButton.textContent = display.actionText;
    el.statusActionButton.dataset.orderId = display.orderId ? String(display.orderId) : '';
  }

  const brewing = status.stage !== 0 || Boolean(snapshot.activeOrder) || display.showFinished;
  if (el.viewStatus) el.viewStatus.hidden = !brewing;
  document.body.dataset.brewing = brewing ? 'true' : 'false';
  recordSensorPoint(status);

  renderStages(status.stage, snapshot.activeOrder);
  renderOrders({ ...snapshot, queue });
  renderProgress(status.stage, snapshot.activeOrder, display);
  drawTrend(status);
}

function recordSensorPoint(status) {
  sensorHistory.push({
    temp: status.boilerTemp,
    pressure: status.pressureBar,
    time: latestStatusTime
  });
  if (sensorHistory.length > maxHistory) sensorHistory.splice(0, sensorHistory.length - maxHistory);
}

function getStatusDisplay(snapshot) {
  const status = snapshot.status;
  const active = snapshot.activeOrder;
  const finished = snapshot.lastFinishedOrder;

  if (active?.completionSeen && status.cupStatus === 0x0003) {
    return {
      title: '컵을 가져가세요',
      message: '제조는 끝났습니다. 컵이 빠지면 주문이 완료됩니다.',
      stateText: '컵 수령 대기',
      progress: 100,
      showAction: false,
      actionText: ''
    };
  }

  if (finished && finished.state === 'done' && dismissedFinishedOrderId !== finished.id) {
    return {
      title: '주문 완료',
      message: '컵 빠짐까지 확인했습니다. 새 주문을 시작할 수 있습니다.',
      stateText: '최종 완료',
      progress: 100,
      showAction: true,
      actionText: '홈화면으로',
      showFinished: true,
      orderId: finished.id
    };
  }

  if (finished && finished.state === 'failed' && dismissedFinishedOrderId !== finished.id) {
    return {
      title: '제조 실패',
      message: finished.message || '제조 중 문제가 발생했습니다.',
      stateText: '확인 필요',
      progress: 0,
      showAction: true,
      actionText: '주문 화면으로',
      showFinished: true,
      orderId: finished.id
    };
  }

  return {
    title: status.stageText,
    message: active
      ? `${active.message} · 재시도 ${active.retries}회`
      : snapshot.queue?.length
        ? '현재 주문이 끝나면 다음 잔이 자동 시작됩니다.'
        : '제조 대기 중입니다.',
    stateText: status.rcpStateText,
    progress: null,
    showAction: false,
    actionText: '',
    showFinished: false
  };
}

function renderProgress(currentStage, activeOrder, display = {}) {
  if (typeof display.progress === 'number') {
    if (el.stageProgress) el.stageProgress.style.width = `${display.progress}%`;
    safeText(el.progressPercentText, `${display.progress}%`);
    return;
  }

  if (!activeOrder) {
    if (el.stageProgress) el.stageProgress.style.width = '0%';
    safeText(el.progressPercentText, '0%');
    return;
  }

  const currentIndex = Math.max(0, stageMap.findIndex((stage) => stage.value === currentStage));
  const ratio = activeOrder.completionSeen ? 1 : currentIndex / (stageMap.length - 1);
  const percent = Math.round(ratio * 100);
  if (el.stageProgress) el.stageProgress.style.width = `${percent}%`;
  safeText(el.progressPercentText, `${percent}%`);
}

function renderStages(currentStage, activeOrder) {
  if (!el.stageSteps) return;
  el.stageSteps.innerHTML = '';
  const currentIndex = stageMap.findIndex((stage) => stage.value === currentStage);
  stageMap.forEach((stage, index) => {
    const step = document.createElement('div');
    step.className = 'stage-step';
    if (activeOrder?.completionSeen || index < currentIndex) step.classList.add('done');
    if (stage.value === currentStage) step.classList.add('current');
    step.innerHTML = `<span>${index}</span><strong>${stage.label}</strong>`;
    el.stageSteps.append(step);
  });
}

function renderOrders(snapshot) {
  const active = snapshot.activeOrder;
  const queue = snapshot.queue ?? [];
  safeText(el.queueCount, `대기 ${queue.length}잔`);

  if (!el.queueList) return;
  el.queueList.innerHTML = '';
  if (queue.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = '대기열 비어 있음';
    el.queueList.append(empty);
    return;
  }

  queue.forEach((order) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>#${order.id}</strong><span>${order.dose}g / ${order.yieldMl}ml</span><em>${order.message}</em>`;
    el.queueList.append(item);
  });
}

function drawTrend(status = null) {
  const currentTemp = status?.boilerTemp ?? sensorHistory[sensorHistory.length - 1]?.temp ?? null;
  const currentPressure = status?.pressureBar ?? sensorHistory[sensorHistory.length - 1]?.pressure ?? null;
  drawSingleTrend(el.tempCanvas, sensorHistory.map((point) => point.temp), {
    min: 60,
    mid: 85,
    max: 110,
    color: '#C53030',
    unit: '°C',
    currentValue: currentTemp,
    latestSegment: false
  });
  drawSingleTrend(el.pressureCanvas, sensorHistory.map((point) => point.pressure), {
    min: 0,
    mid: 6,
    max: 12,
    color: '#2B6CB0',
    unit: 'bar',
    floorPx: 8,
    traceWidth: 4,
    currentValue: currentPressure,
    latestSegment: false
  });
}

function drawSingleTrend(canvas, values, scale) {
  const ctx = canvas?.getContext?.('2d');
  if (!canvas || !ctx) return;
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const left = 54;
  const right = width - 18;
  const top = 16;
  const bottom = height - 24;

  ctx.strokeStyle = '#dddddd';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 2; i += 1) {
    const y = top + i * ((bottom - top) / 2);
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  ctx.fillStyle = scale.color;
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText(`${scale.max}${scale.unit}`, 12, top + 4);
  ctx.fillText(`${scale.mid}${scale.unit}`, 16, top + ((bottom - top) / 2) + 4);
  ctx.fillText(`${scale.min}${scale.unit}`, 16, bottom + 4);

  drawLine(ctx, values, scale.min, scale.max, scale.color, left, right, top, bottom, {
    floorPx: scale.floorPx ?? 0,
    traceWidth: scale.traceWidth ?? 3,
    latestSegment: Boolean(scale.latestSegment),
    currentValue: scale.currentValue
  });
  if (scale.currentValue != null) {
    drawCurrentValueLine(ctx, scale.currentValue, scale.min, scale.max, scale.color, left, right, top, bottom, scale.floorPx ?? 0);
  }
}

function drawLine(ctx, values, min, max, color, left, right, top, bottom, options = {}) {
  if (values.length === 0 && options.currentValue == null) return;
  const { floorPx = 0, traceWidth = 3, latestSegment = false, currentValue = null } = options;
  const normalizedValues = [...values];
  if (currentValue != null) {
    if (normalizedValues.length === 0) normalizedValues.push(currentValue);
    else normalizedValues[normalizedValues.length - 1] = currentValue;
  }
  const xStep = (right - left) / (maxHistory - 1);
  const offset = Math.max(0, maxHistory - normalizedValues.length);
  const points = normalizedValues.map((value, index) => {
    const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const y = bottom - ratio * (bottom - top);
    return {
      x: left + (offset + index) * xStep,
      y: floorPx > 0 ? Math.min(bottom - floorPx, y) : y
    };
  });

  const latest = points[points.length - 1];
  ctx.strokeStyle = color;
  ctx.lineWidth = traceWidth;
  if (points.length >= 2) {
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }

  if (latestSegment) {
    ctx.beginPath();
    ctx.moveTo(Math.max(left, latest.x - 34), latest.y);
    ctx.lineTo(latest.x, latest.y);
    ctx.stroke();
  }
}

function drawCurrentValueLine(ctx, value, min, max, color, left, right, top, bottom, floorPx = 0) {
  const ratio = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const rawY = bottom - ratio * (bottom - top);
  const y = floorPx > 0 ? Math.min(bottom - floorPx, rawY) : rawY;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(Math.max(left, right - 15), y);
  ctx.lineTo(right, y);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(right, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function openDrawer() {
  el.adminDrawer?.classList.add('open');
  el.drawerBackdrop?.classList.add('active');
}

function closeDrawer() {
  el.adminDrawer?.classList.remove('open');
  el.drawerBackdrop?.classList.remove('active');
}

async function submitOrder() {
  if (!selectedDrink) return;
  syncHiddenInputs();
  const totalAmount = cupsOptions.reduce((sum, cupOpt) => sum + getUnitPrice(cupOpt), 0);
  safeText(el.paymentModalAmount, formatCurrency(totalAmount));
  if (el.paymentModalOverlay) el.paymentModalOverlay.hidden = false;
  clearTimeout(paymentTimer);

  paymentTimer = setTimeout(async () => {
    if (el.paymentModalOverlay) el.paymentModalOverlay.hidden = true;
    try {
      if (areCupsOptionsIdentical()) {
        await api.addOrder({
          cups: selectedCups,
          dose: selectedOptions.dose,
          yieldMl: selectedOptions.yieldMl,
          brewer: Number(el.brewerInput?.value ?? 0),
          grinder: Number(el.grinderInput?.value ?? 0)
        });
      } else {
        for (const opt of cupsOptions) {
          await api.addOrder({
            cups: 1,
            dose: opt.dose,
            yieldMl: opt.yieldMl,
            brewer: Number(el.brewerInput?.value ?? 0),
            grinder: Number(el.grinderInput?.value ?? 0)
          });
        }
      }
      selectedDrink = null;
      selectedCups = 1;
      cupsOptions = [];
      activeCupIndex = 0;
      selectedOptions = { temp: 'HOT', dose: 15, yieldMl: 36 };
      screenStage = 'menu';
      safeText(el.instructionMessage, '원하는 음료를 선택해 주세요.');
      renderMenu();
      renderOptions();
      renderSummary();
      syncHiddenInputs();
    } catch (error) {
      addLog({ time: new Date().toISOString(), message: `주문 전송 실패: ${error.message}` });
      openDrawer();
    }
  }, 500);
}

function hideStartScreen() {
  if (!el.kioskStartScreen) return;
  el.kioskStartScreen.classList.add('fade-out');
  setTimeout(() => {
    el.kioskStartScreen.hidden = true;
  }, 220);
}

window.hideStartScreen = window.hideStartScreen || hideStartScreen;

function bindEvents() {
  el.btnStartOrder?.addEventListener('click', hideStartScreen);
  el.menuGrid?.addEventListener('click', (event) => {
    if (menuWasDragged) {
      event.preventDefault();
      event.stopPropagation();
      menuWasDragged = false;
      return;
    }
    const card = event.target.closest('.menu-card');
    if (!card) return;
    selectDrink(card.dataset.id);
  });
  bindMenuScroll();
  el.optionGroups?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-option-key]');
    if (!button || !selectedDrink) return;
    const key = button.dataset.optionKey;
    const group = getOptionSet().find((item) => item.key === key);
    const choice = group?.choices.find((item) => String(item.value) === button.dataset.optionValue);
    if (!choice) return;
    selectedOptions[key] = choice.value;
    renderOptions();
    renderSummary();
    syncHiddenInputs();
  });
  el.categoryTabs?.forEach((tab) => {
    tab.addEventListener('click', () => {
      el.categoryTabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
      selectedCategory = tab.dataset.category;
      renderMenu();
    });
  });
  el.footerCheckoutRow?.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    if (btn.id === 'btnGoToOptions') {
      goToOptionsStage();
    } else if (btn.id === 'btnGoHome') {
      showHomeScreen();
    } else if (btn.id === 'btnBackToMenu') {
      goToMenuStage();
    } else if (btn.id === 'checkoutBtn') {
      submitOrder();
    }
  });
  el.btnCancelPayment?.addEventListener('click', () => {
    clearTimeout(paymentTimer);
    if (el.paymentModalOverlay) el.paymentModalOverlay.hidden = true;
  });
  el.statusActionButton?.addEventListener('click', () => {
    const orderId = Number(el.statusActionButton.dataset.orderId);
    if (orderId) dismissedFinishedOrderId = orderId;
    if (el.viewStatus) el.viewStatus.hidden = true;
    document.body.dataset.brewing = 'false';
    showHomeScreen();
  });
  el.btnQtyMinus?.addEventListener('click', () => {
    selectedCups = Math.max(1, selectedCups - 1);
    while (cupsOptions.length > selectedCups) {
      cupsOptions.pop();
    }
    if (activeCupIndex >= selectedCups) {
      activeCupIndex = selectedCups - 1;
    }
    selectedOptions = cupsOptions[activeCupIndex];
    renderOptions();
    renderSummary();
    syncHiddenInputs();
  });
  el.btnQtyPlus?.addEventListener('click', () => {
    selectedCups = Math.min(5, selectedCups + 1);
    while (cupsOptions.length < selectedCups) {
      cupsOptions.push({ ...cupsOptions[cupsOptions.length - 1] });
    }
    selectedOptions = cupsOptions[activeCupIndex];
    renderOptions();
    renderSummary();
    syncHiddenInputs();
  });
  el.cupTabsContainer?.addEventListener('click', (event) => {
    const button = event.target.closest('.cup-tab');
    if (!button) return;
    const index = parseInt(button.dataset.index, 10);
    if (isNaN(index)) return;
    activeCupIndex = index;
    selectedOptions = cupsOptions[activeCupIndex];
    renderOptions();
    renderSummary();
    syncHiddenInputs();
  });
  el.refreshPortsButton?.addEventListener('click', refreshPorts);
  el.connectButton?.addEventListener('click', async () => {
    el.connectButton.disabled = true;
    try {
      renderState(
        await api.connect({
          port: el.portInput?.value.trim(),
          baudRate: Number(el.baudInput?.value ?? 115200)
        })
      );
    } catch (error) {
      addLog({ time: new Date().toISOString(), message: `연결 실패: ${error.message}` });
    } finally {
      el.connectButton.disabled = false;
    }
  });
  el.disconnectButton?.addEventListener('click', async () => {
    try {
      await api.disconnect();
      renderState(null);
      addLog({ time: new Date().toISOString(), message: '연결이 해제되었습니다.' });
    } catch (error) {
      addLog({ time: new Date().toISOString(), message: `연결 해제 실패: ${error.message}` });
    }
  });
  el.cancelButton?.addEventListener('click', async () => {
    try {
      await api.cancelActive();
    } catch (error) {
      addLog({ time: new Date().toISOString(), message: `정지 실패: ${error.message}` });
    }
  });
  el.clearQueueButton?.addEventListener('click', async () => {
    try {
      await api.clearWaiting();
    } catch (error) {
      addLog({ time: new Date().toISOString(), message: `대기열 삭제 실패: ${error.message}` });
    }
  });
  el.gearButton?.addEventListener('click', openDrawer);
  el.closeDrawerButton?.addEventListener('click', closeDrawer);
  el.drawerBackdrop?.addEventListener('click', closeDrawer);
}

function getMaxMenuOffset() {
  return 0;
}

function applyMenuOffset(animated = true) {
  if (!el.menuGrid) return;
  menuOffset = Math.max(0, Math.min(menuOffset, getMaxMenuOffset()));
  el.menuGrid.style.transition = animated ? 'transform 180ms ease' : 'none';
  el.menuGrid.style.transform = `translateY(${-menuVerticalOffset}px)`;
  window.__menuOffset = menuOffset;
}

function moveMenuBy(delta, animated = true) {
  menuOffset += delta;
  applyMenuOffset(animated);
}

function bindMenuScroll() {
  if (!el.menuGrid) return;
  el.menuGrid.style.transform = 'translateY(0)';
  window.__menuOffset = 0;
  window.__menuVerticalOffset = 0;
  window.__menuWheelEvents = 0;
  const handleMenuWheel = (event) => {
    window.__menuWheelEvents += 1;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    menuVerticalOffset += event.deltaY;
    applyMenuVerticalOffset(true);
  };
  const menuScroller = el.menuGrid.parentElement;
  menuScroller.onwheel = handleMenuWheel;
  menuScroller.addEventListener('wheel', handleMenuWheel, { passive: false });
}

function getMaxMenuVerticalOffset() {
  const menuScroller = el.menuGrid?.parentElement;
  if (!el.menuGrid || !menuScroller) return 0;
  return Math.max(0, el.menuGrid.scrollHeight - menuScroller.clientHeight);
}

function applyMenuVerticalOffset(animated = true) {
  if (!el.menuGrid) return;
  menuVerticalOffset = Math.max(0, Math.min(menuVerticalOffset, getMaxMenuVerticalOffset()));
  el.menuGrid.style.transition = animated ? 'transform 220ms ease' : 'none';
  el.menuGrid.style.transform = `translateY(${-menuVerticalOffset}px)`;
  window.__menuVerticalOffset = menuVerticalOffset;
  window.__menuOffset = 0;
}

function normalizeStaticText() {
  document.title = '좁은길 (Narrow Path) Kiosk Terminal';
  document.querySelectorAll('.brand-logo-cup, .start-logo-cup, .placeholder-icon, .brewing-mug').forEach((node) => {
    node.textContent = '☕';
  });
  document.querySelectorAll('.brand-korean, .start-brand-korean').forEach((node) => {
    node.textContent = '좁은길';
  });
  document.querySelectorAll('.brand-english, .start-brand-english').forEach((node) => {
    node.textContent = 'NARROW PATH COFFEE';
  });
  const startSub = document.querySelector('.start-sub');
  if (startSub) startSub.textContent = '정밀 로봇 바리스타가 전하는 특별한 한 잔';
  const startTitle = document.querySelector('.btn-start-title');
  if (startTitle) startTitle.textContent = '주문하기';
  const tabLabels = [
    ['all', '전체 20'],
    ['coffee', '커피 6'],
    ['latte', '라떼 & 티 10'],
    ['ade', '에이드 4']
  ];
  tabLabels.forEach(([category, label]) => {
    const node = document.querySelector(`.category-tab[data-category="${category}"] .tab-label`);
    if (node) node.textContent = label;
  });
  safeText(el.connectionState, '미연결');
  safeText(el.instructionMessage, '원하는 음료를 선택해 주세요.');
  safeText(document.querySelector('.placeholder-title'), '음료를 먼저 선택해 주세요');
  safeText(document.querySelector('.placeholder-desc'), '선택한 음료 종류에 맞는 옵션이 이곳에 표시됩니다.');
  safeText(el.summaryEmptyState, '아직 선택한 음료가 없습니다.');
  safeText(document.querySelector('.bill-lbl'), '결제 금액');
  safeText(el.checkoutBtn, '주문 전송');
  safeText(el.gearButton, '⚙');
  safeText(document.querySelector('.payment-modal-title'), '결제를 확인하고 있습니다');
  safeText(document.querySelector('.payment-modal-desc'), '결제가 완료되면 주문이 자동으로 전송됩니다.');
  safeText(document.querySelector('.ic-reader-icon'), '💳');
  safeText(document.querySelector('.amount-label'), '결제 금액');
  safeText(el.btnCancelPayment, '취소');
  document.querySelectorAll('.eyebrow').forEach((node) => {
    if (!node.textContent.trim() || node.textContent.includes('?')) node.textContent = '운영자';
  });
  const drawerTitle = document.querySelector('.drawer-header h2');
  if (drawerTitle) drawerTitle.textContent = '장비 연결';
  safeText(el.closeDrawerButton, '닫기');
  const labels = document.querySelectorAll('.drawer-body label');
  if (labels[0]) labels[0].childNodes[0].textContent = '포트';
  if (labels[1]) labels[1].childNodes[0].textContent = '속도';
  safeText(el.refreshPortsButton, '조회');
  safeText(el.connectButton, '연결');
  safeText(el.disconnectButton, '해제');
  safeText(el.cancelButton, '현재 제조 정지');
  safeText(el.clearQueueButton, '대기열 비우기');
  const drawerHeadings = document.querySelectorAll('.drawer-section h3');
  if (drawerHeadings[0]) drawerHeadings[0].textContent = '대기열';
  if (drawerHeadings[1]) drawerHeadings[1].textContent = '통신·에러 로그';
}

function init() {
  bindElements();
  normalizeStaticText();
  bindEvents();
  api.onState(renderState);
  api.onLog(addLog);

  screenStage = 'menu';
  document.body.dataset.screenStage = 'menu';

  updateClock();
  setInterval(updateClock, 10000);
  renderMenu();
  renderOptions();
  renderSummary();
  renderStages(0, null);
  drawTrend();
  refreshPorts();
  api.snapshot().then(renderState).catch(() => renderState(null));
  window.__kioskReady = true;
}

init();
