import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// --- TS Interfaces & Types ---
interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  desc: string;
  price: number;
  category: 'coffee' | 'tea' | 'ade';
  image: string;
  isBest?: boolean;
  defaultTemp: 'HOT' | 'ICE';
}

interface CartItem {
  cartId: string;
  menuId: string;
  name: string;
  temp: 'HOT' | 'ICE';
  strength: '마일드' | '보통' | '진하게';
  volume: '적게' | '보통' | '많이';
  cups: number;
  singlePrice: number;
  totalPrice: number;
}

// --- Premium HD Coffee Photography Data ---
const MENU_DATA: MenuItem[] = [
  {
    id: 'm1',
    name: '좁은길 아메리카노',
    englishName: 'Narrow Path Americano',
    desc: '고소하고 균형 잡힌 바디감의 시그니처 커피',
    price: 2500,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=80',
    isBest: true,
    defaultTemp: 'HOT',
  },
  {
    id: 'm2',
    name: '딥 에스프레소',
    englishName: 'Deep Espresso',
    desc: '다크하고 묵직한 오리지널 이탈리안 에센스',
    price: 2000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm3',
    name: '아인슈페너',
    englishName: 'Einspänner',
    desc: '달콤하고 쫀득한 솔티 크림과 에스프레소',
    price: 4500,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&auto=format&fit=crop&q=80',
    isBest: true,
    defaultTemp: 'ICE',
  },
  {
    id: 'm4',
    name: '시그니처 카페라떼',
    englishName: 'Signature Cafe Latte',
    desc: '부드러운 스팀 밀크와 에스프레소의 고소한 맛',
    price: 3500,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm5',
    name: '바닐라 빈 라떼',
    englishName: 'Vanilla Bean Latte',
    desc: '천연 바닐라 빈 시럽의 깊고 풍부한 단맛',
    price: 4000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm6',
    name: '제주 말차라떼',
    englishName: 'Jeju Matcha Latte',
    desc: '제주 유기농 햇말차의 진하고 쌉싸름한 풍미',
    price: 4200,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm7',
    name: '리얼 콜드브루',
    englishName: 'Real Cold Brew',
    desc: '찬물로 12시간 동안 한 방울씩 내린 깔끔한 브루',
    price: 3000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'ICE',
  },
  {
    id: 'm8',
    name: '돌체 콜드브루',
    englishName: 'Dolce Cold Brew',
    desc: '달콤한 연유와 깨끗한 콜드브루의 시원한 조화',
    price: 3800,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&auto=format&fit=crop&q=80',
    isBest: true,
    defaultTemp: 'ICE',
  },
  {
    id: 'm9',
    name: '디카페인 아메리카노',
    englishName: 'Decaf Americano',
    desc: '카페인 부담 없이 가볍게 즐기는 부드러운 커피',
    price: 2800,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm10',
    name: '시나몬 카푸치노',
    englishName: 'Cinnamon Cappuccino',
    desc: '드라이한 벨벳 밀크폼에 알싸한 시나몬 토핑',
    price: 3500,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm11',
    name: '카라멜 마끼아또',
    englishName: 'Caramel Macchiato',
    desc: '에스프레소 위에 올린 달콤한 카라멜 소스 드립',
    price: 4000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572286258217-40142c1c6a70?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm12',
    name: '헤이즐넛 라떼',
    englishName: 'Hazelnut Latte',
    desc: '고소한 헤이즐넛 향이 잔잔하게 퍼지는 웰메이드 라떼',
    price: 4000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm13',
    name: '피치 블러썸 티',
    englishName: 'Peach Blossom Tea',
    desc: '과일 과즙의 달콤함과 은은한 복숭아 향 홍차 티',
    price: 3500,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'ICE',
  },
  {
    id: 'm14',
    name: '클래식 홍차',
    englishName: 'Classic Black Tea',
    desc: '실론 홍차 잎을 정교하게 우려낸 깊은 무게감',
    price: 3500,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm15',
    name: '다크 초코라떼',
    englishName: 'Dark Chocolate Latte',
    desc: '기라델리 딥 카카오를 사용한 진한 정통 핫초코',
    price: 3800,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm16',
    name: '얼그레이 밀크티',
    englishName: 'Earl Grey Milk Tea',
    desc: '베르가못 얼그레이를 연유 스팀밀크에 블렌딩한 밀크티',
    price: 3800,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'HOT',
  },
  {
    id: 'm17',
    name: '자몽 에이드',
    englishName: 'Grapefruit Ade',
    desc: '상큼하고 쌉싸름한 생 자몽 과즙 에이드',
    price: 4000,
    category: 'ade',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'ICE',
  },
  {
    id: 'm18',
    name: '레몬 에이드',
    englishName: 'Lemon Ade',
    desc: '상큼한 레몬즙과 시원한 탄산수의 조화',
    price: 4000,
    category: 'ade',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80',
    defaultTemp: 'ICE',
  },
  {
    id: 'm19',
    name: '청포도 에이드',
    englishName: 'Green Grape Ade',
    desc: '달콤한 청포도 과육이 씹히는 시원한 에이드',
    price: 4500,
    category: 'ade',
    image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&auto=format&fit=crop&q=80',
    isBest: true,
    defaultTemp: 'ICE',
  },
];

export default function App() {
  const [currentTime, setCurrentTime] = useState<string>('--:--');
  const [currentCategory, setCurrentCategory] = useState<'all' | 'coffee' | 'tea' | 'ade'>('all');
  
  // Customization selection states
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [temp, setTemp] = useState<'HOT' | 'ICE'>('HOT');
  const [strength, setStrength] = useState<'마일드' | '보통' | '진하게'>('보통');
  const [volume, setVolume] = useState<'적게' | '보통' | '많이'>('보통');
  const [cups, setCups] = useState<number>(1);
  
  // Transition / Takeover states
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [paymentOpen, setPaymentOpen] = useState<boolean>(false);
  const [brewingOpen, setBrewingOpen] = useState<boolean>(false);
  const [brewProgress, setBrewProgress] = useState<number>(0);
  const [brewStepName, setBrewStepName] = useState<string>('원두 그라인딩');

  // Clock Sync
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hh}:${mm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Menu Selection Handler
  const handleSelectMenu = (menu: MenuItem) => {
    setSelectedMenu(menu);
    setTemp(menu.defaultTemp);
    setStrength('보통');
    setVolume('보통');
    setCups(1);
    
    // Smooth scroll down to customization
    setTimeout(() => {
      document.getElementById('options-panel-target')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const getUnitPrice = (): number => {
    if (!selectedMenu) return 0;
    let base = selectedMenu.price;
    if (strength === '진하게') base += 500;
    return base;
  };

  const clearSelection = () => {
    setSelectedMenu(null);
    setTemp('HOT');
    setStrength('보통');
    setVolume('보통');
    setCups(1);
  };

  const totalAmount = selectedMenu ? getUnitPrice() * cups : 0;

  // Checkout Payment
  const handleCheckout = () => {
    if (!selectedMenu) return;
    setPaymentOpen(true);
    setTimeout(() => {
      setPaymentOpen(false);
      startBrewingTakeover();
    }, 2500);
  };

  // Brewing Takeover progress simulation
  const startBrewingTakeover = () => {
    setBrewingOpen(true);
    setBrewProgress(0);
  };

  useEffect(() => {
    if (!brewingOpen) return;
    const steps = [
      { max: 20, name: '원두 그라인딩...' },
      { max: 45, name: '에스프레소 레벨링 및 고압 탬핑...' },
      { max: 75, name: '정밀 온도 고압 커피 추출 중...' },
      { max: 90, name: '밀크폼 혼합 및 고압 퍽 탈수...' },
      { max: 100, name: '음료 조리 완료! 컵을 수령해 주세요.' }
    ];

    const timer = setInterval(() => {
      setBrewProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setBrewingOpen(false);
            clearSelection();
          }, 4000);
          return 100;
        }
        const currentStep = steps.find(s => next <= s.max) || steps[steps.length - 1];
        setBrewStepName(currentStep.name);
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [brewingOpen]);

  // Category change logic
  const handleCategoryChange = (category: 'all' | 'coffee' | 'tea' | 'ade') => {
    setCurrentCategory(category);
  };

  // Horizontal mouse wheel and drag-to-scroll delegation for menu grid
  const menuGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = menuGridRef.current;
    if (!el) return;
    
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add('active');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      el.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      el.classList.remove('active');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed multiplier
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const filteredMenu = MENU_DATA.filter((item) => {
    if (currentCategory === 'all') return true;
    return item.category === currentCategory;
  });

  return (
    <div className="kiosk-shell">

      {/* 0. WELCOME / START ORDER TAKE OVER SCREEN */}
      {!isStarted && (
        <div className="kiosk-start-screen">
          <div className="start-content">
            <div className="start-logo-wrapper">
              <span className="start-logo-cup">☕</span>
            </div>
            <h1 className="start-brand-korean">좁은길</h1>
            <h2 className="start-brand-english">NARROW PATH COFFEE</h2>
            <p className="start-sub">정밀 로봇 바리스타가 전하는 특별한 한 잔</p>
            <button type="button" className="btn-start-order" onClick={() => setIsStarted(true)}>
              <span className="btn-start-title">주문하기</span>
              <span className="btn-start-sub">TOUCH TO START</span>
            </button>
          </div>
        </div>
      )}
      
      {/* 1. SOLID MACHINE HEADER (80px) */}
      <header className="top-nav-kiosk">
        <div className="nav-container">
          <div className="brand-wordmark">
            <span className="brand-logo-cup">☕</span>
            <div className="brand-text-wrapper">
              <h1 className="brand-korean">좁은길 NARROW PATH COFFEE</h1>
              <span className="brand-english">ESPRESSO TERMINAL</span>
            </div>
          </div>

          <div className="header-right">
            <span id="connectionState" className="state-good">주문 가능</span>
            <span className="nav-clock" id="clockValue">{currentTime}</span>
          </div>
        </div>
      </header>

      {/* 1.5 FIXED INSTRUCTION BANNER (44px) */}
      <div className="order-instruction-banner">
        <span id="instructionMessage">
          {selectedMenu 
            ? `[${selectedMenu.name}] 상세 레시피를 조정한 뒤 하단에서 결제해 주세요` 
            : '원하시는 음료를 선택해 주세요'}
        </span>
      </div>

      {/* VIEW TAKEOVER: BREWING STATUS */}
      {brewingOpen && (
        <div className="view-status-takeover">
          <div className="brewing-takeover">
            <div className="brewing-card">
              
              <div className="cup-steam-animation">
                <div className="steam-line steam-1"></div>
                <div className="steam-line steam-2"></div>
                <div className="steam-line steam-3"></div>
                <div className="brewing-mug">☕</div>
              </div>

              <h2 className="brew-title">맛있는 음료 제조 중</h2>
              <p className="brew-subtitle">정밀 로봇 바리스타가 정성껏 음료를 조리하고 있습니다.</p>

              <div className="brew-progress-wrapper">
                <div className="progress-bar-rail">
                  <div className="progress-bar-fill" style={{ width: `${brewProgress}%` }}></div>
                </div>
                <div className="progress-text-row">
                  <span className="step-name">{brewStepName}</span>
                  <span className="progress-percentage">{brewProgress}% 제조 진행</span>
                </div>
              </div>

              <div className="brewing-telemetry">
                <div className="tel-card">
                  <span className="tel-label">온도</span>
                  <span className="tel-val">92.8 °C</span>
                </div>
                <div className="tel-card">
                  <span className="tel-label">추출압</span>
                  <span className="tel-val">9.1 bar</span>
                </div>
                <div className="tel-card">
                  <span className="tel-label">컵 센서</span>
                  <span className="tel-val text-gold">안착 확인</span>
                </div>
              </div>

              {/* Real-time profile chart mock */}
              <div className="trend-chart-card-portrait">
                <div className="chart-header-portrait">
                  <span className="chart-eyebrow">EXTRACTION PROFILE</span>
                </div>
                <div className="canvas-wrapper-portrait-mock">
                  <div className="mock-chart-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CARD PAYMENT SIMULATOR MODAL */}
      {paymentOpen && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-card">
            <div className="payment-spinner"></div>
            <h2 className="payment-modal-title">IC 카드를 투입해 주세요</h2>
            <p className="payment-modal-desc">결제 단말기에 카드를 끝까지 밀어 넣어주세요.</p>
            <div className="ic-reader-icon">💳</div>
            <div className="amount-label">결제 금액</div>
            <div className="amount-val">₩{totalAmount.toLocaleString()}</div>
            <button type="button" className="payment-cancel-btn" onClick={() => setPaymentOpen(false)} style={{ marginTop: '24px' }}>
              결제 취소
            </button>
          </div>
        </div>
      )}

      {/* KIOSK MAIN SCROLL BODY (Vertical Single-Column Layout) */}
      <div className="kiosk-main-body">
        
        {/* 2. CATEGORY TABS (Height 58px) */}
        <div className="category-section">
          <nav className="category-strip">
            <button
              type="button"
              className={`category-tab ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              <span className="tab-label">📋 전체</span>
            </button>
            <button
              type="button"
              className={`category-tab ${currentCategory === 'coffee' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('coffee')}
            >
              <span className="tab-label">☕ 커피</span>
            </button>
            <button
              type="button"
              className={`category-tab ${currentCategory === 'tea' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('tea')}
            >
              <span className="tab-label">🍵 라떼 &amp; 티</span>
            </button>
            <button
              type="button"
              className={`category-tab ${currentCategory === 'ade' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('ade')}
            >
              <span className="tab-label">🍹 에이드</span>
            </button>
          </nav>
        </div>

        {/* 3. MENU GRID (2 Columns, Full Width) */}
        <div className="menu-section">
          <div className="menu-grid" ref={menuGridRef}>
            {filteredMenu.map((item) => {
              const isSelected = selectedMenu?.id === item.id;
              return (
                <button
                  key={item.id}
                  className={`menu-card ${isSelected ? 'selected' : ''}`}
                  type="button"
                  onClick={() => handleSelectMenu(item)}
                >
                  <div className="card-image-box">
                    <img src={item.image} alt={item.name} className="drink-img" />
                    {item.defaultTemp === 'HOT' ? (
                      <span className="badge badge-hot">HOT</span>
                    ) : (
                      <span className="badge badge-ice">ICE</span>
                    )}
                    {item.isBest && <span className="badge badge-best">BEST</span>}
                  </div>
                  <div className="card-details">
                    <strong className="menu-title">{item.name}</strong>
                    <strong className="menu-price">₩{item.price.toLocaleString()}</strong>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. INLINE OPTION CUSTOMIZER PANEL (Below grid) */}
        <div className="customization-section" id="options-panel-target">
          <div className={`options-panel ${selectedMenu ? '' : 'disabled'}`}>
            {!selectedMenu ? (
              <div className="options-placeholder">
                <div className="placeholder-icon">☕</div>
                <h4 className="placeholder-title">상세 옵션 설정</h4>
                <p className="placeholder-desc">메뉴 카드를 선택하시면 상세 옵션 설정 패널이 노출됩니다.</p>
              </div>
            ) : (
              <div className="options-active-content">
                <div className="options-header-solid">
                  <span className="opt-badge-gold">레시피 구성</span>
                  <h3 className="opt-drink-name">{selectedMenu.name}</h3>
                  <p className="opt-drink-desc">{selectedMenu.desc}</p>
                </div>

                <div className="options-grid-solid">
                  {/* Temp selection */}
                  <div className="option-group-solid">
                    <label className="option-label-solid">온도 선택</label>
                    <div className="option-button-grid">
                      <button
                        type="button"
                        className={`opt-solid-btn temp-btn hot ${temp === 'HOT' ? 'active' : ''}`}
                        onClick={() => setTemp('HOT')}
                      >
                        <span className="chk-status">{temp === 'HOT' ? '✓ ' : ''}</span>
                        <svg className="opt-svg icon-temp-hot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v3M10 2v3M14 2v3"/></svg>
                        뜨겁게 (HOT)
                      </button>
                      <button
                        type="button"
                        className={`opt-solid-btn temp-btn ice ${temp === 'ICE' ? 'active' : ''}`}
                        onClick={() => setTemp('ICE')}
                      >
                        <span className="chk-status">{temp === 'ICE' ? '✓ ' : ''}</span>
                        <svg className="opt-svg icon-temp-ice" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m20 16-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/></svg>
                        차갑게 (ICE)
                      </button>
                    </div>
                  </div>

                  {/* Strength selection */}
                  <div className="option-group-solid">
                    <label className="option-label-solid">농도</label>
                    <div className="option-button-grid">
                      <button
                        type="button"
                        className={`opt-solid-btn strength-btn ${strength === '마일드' ? 'active' : ''}`}
                        onClick={() => setStrength('마일드')}
                      >
                        <span className="chk-status">{strength === '마일드' ? '✓ ' : ''}</span>
                        <svg className="opt-svg icon-strength-mild" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z"/><path d="M19 2c-2.26 4.33-5.27 7.14-8 8"/></svg>
                        마일드
                      </button>
                      <button
                        type="button"
                        className={`opt-solid-btn strength-btn ${strength === '보통' ? 'active' : ''}`}
                        onClick={() => setStrength('보통')}
                      >
                        <span className="chk-status">{strength === '보통' ? '✓ ' : ''}</span>
                        <svg className="opt-svg icon-strength-medium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z"/><path d="M19 2c-2.26 4.33-5.27 7.14-8 8"/><path d="M5 22c1-3 3-5.5 6-7"/></svg>
                        보통
                      </button>
                      <button
                        type="button"
                        className={`opt-solid-btn strength-btn ${strength === '진하게' ? 'active' : ''}`}
                        onClick={() => setStrength('진하게')}
                      >
                        <span className="chk-status">{strength === '진하게' ? '✓ ' : ''}</span>
                        <svg className="opt-svg icon-strength-strong" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z"/><path d="M19 2c-2.26 4.33-5.27 7.14-8 8"/></svg>
                        진하게 (+500원)
                      </button>
                    </div>
                  </div>

                  {/* Volume selection */}
                  <div className="option-group-solid">
                    <label className="option-label-solid">물 양</label>
                    <div className="option-button-grid">
                      <button
                        type="button"
                        className={`opt-solid-btn volume-btn ${volume === '적게' ? 'active' : ''}`}
                        onClick={() => setVolume('적게')}
                      >
                        <span className="chk-status">{volume === '적게' ? '✓ ' : ''}</span>
                        <svg className="opt-svg icon-water-less" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7Z"/></svg>
                        적게
                      </button>
                      <button
                        type="button"
                        className={`opt-solid-btn volume-btn ${volume === '보통' ? 'active' : ''}`}
                        onClick={() => setVolume('보통')}
                      >
                        <span className="chk-status">{volume === '보통' ? '✓ ' : ''}</span>
                        <svg className="opt-svg icon-water-medium" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22a5 5 0 0 0 5-5c0-3.1-5-9.3-5-9.3S3 13.9 3 17a5 5 0 0 0 5 5Z"/><path d="M16 22a5 5 0 0 0 5-5c0-3.1-5-9.3-5-9.3s-5 6.2-5 9.3a5 5 0 0 0 5 5Z"/></svg>
                        보통
                      </button>
                      <button
                        type="button"
                        className={`opt-solid-btn volume-btn ${volume === '많이' ? 'active' : ''}`}
                        onClick={() => setVolume('많이')}
                      >
                        <span className="chk-status">{volume === '많이' ? '✓ ' : ''}</span>
                        <svg className="opt-svg icon-water-more" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22a4 4 0 0 0 4-4c0-2.5-4-7.4-4-7.4S1 15.5 1 18a4 4 0 0 0 4 4Z"/><path d="M12 22a4 4 0 0 0 4-4c0-2.5-4-7.4-4-7.4S8 15.5 8 18a4 4 0 0 0 4 4Z"/><path d="M19 22a4 4 0 0 0 4-4c0-2.5-4-7.4-4-7.4S15 15.5 15 18a4 4 0 0 0 4 4Z"/></svg>
                        많이
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 5. FIXED BOTTOM TRANSACTION PANEL */}
      <footer className="kiosk-footer">
        <div className="footer-summary-container">
          
          {/* Row 1: Drink Info & Stepper */}
          <div className="footer-details-row">
            {/* Selected drink details (Left) */}
            <div className="summary-left-info">
              {!selectedMenu ? (
                <div className="summary-empty-state">
                  <span>메뉴를 선택해 주세요</span>
                </div>
              ) : (
                <div className="summary-active-state">
                  <div className="summary-drink-title-row">
                    <span className={`summary-temp-badge ${temp === 'HOT' ? 'hot' : 'ice'}`}>{temp}</span>
                    <strong className="summary-drink-name">{selectedMenu.name}</strong>
                  </div>
                  <div className="summary-drink-options">
                    농도: {strength === '마일드' ? '마일드' : strength === '진하게' ? '진하게' : '보통'} · 물 양: {volume === '적게' ? '적게' : volume === '많이' ? '많이' : '보통'}
                  </div>
                </div>
              )}
            </div>

            {/* Stepper (Right) */}
            <div className="summary-stepper-block">
              <div className="kiosk-stepper-machine">
                <button
                  type="button"
                  className="kiosk-stepper-btn minus"
                  disabled={!selectedMenu || cups <= 1}
                  onClick={() => setCups((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="kiosk-stepper-value">{cups}</span>
                <button
                  type="button"
                  className="kiosk-stepper-btn plus"
                  disabled={!selectedMenu}
                  onClick={() => setCups((prev) => Math.min(10, prev + 1))}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Large Centered Payment Price */}
          <div className="footer-price-row">
            <span className="bill-lbl">총 결제 금액</span>
            <strong className="bill-val-total">₩{totalAmount.toLocaleString()}</strong>
          </div>

          {/* Row 3: Checkout Button */}
          <div className="footer-checkout-row">
            <button
              type="button"
              className="btn-kiosk-checkout-primary"
              disabled={!selectedMenu}
              onClick={handleCheckout}
            >
              <span>💳 주문 전송 및 결제하기</span>
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
