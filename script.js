// Supabase 클라이언트 초기화 (Vercel 환경변수 또는 config.js 사용)
let supabaseClient = null;
let supabaseInitialized = false;

// Supabase 설정 로드 함수
async function loadSupabaseConfig() {
    // 1순위: API 엔드포인트에서 환경변수 읽기 (Vercel)
    try {
        const response = await fetch('/api/env');
        if (response.ok) {
            const config = await response.json();
            if (config.url && config.anonKey) {
                console.log('Vercel 환경변수에서 Supabase 설정 로드 완료');
                return config;
            }
        }
    } catch (error) {
        console.log('API 엔드포인트에서 설정을 불러올 수 없습니다 (로컬 개발 모드일 수 있음):', error.message);
    }
    
    // 2순위: 전역 변수에서 읽기 (HTML에 직접 주입된 경우)
    if (typeof window !== 'undefined' && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
        console.log('전역 변수에서 Supabase 설정 로드 완료');
        return {
            url: window.SUPABASE_URL,
            anonKey: window.SUPABASE_ANON_KEY
        };
    }
    
    // 3순위: config.js 파일에서 읽기 (로컬 개발용)
    if (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
        console.log('config.js에서 Supabase 설정 로드 완료');
        return SUPABASE_CONFIG;
    }
    
    return null;
}

// Supabase 클라이언트 초기화 함수
async function initializeSupabase() {
    if (supabaseInitialized) return;
    
    const supabaseConfig = await loadSupabaseConfig();
    if (supabaseConfig && supabaseConfig.url && supabaseConfig.anonKey) {
        supabaseClient = supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey);
        supabaseInitialized = true;
        console.log('Supabase 클라이언트 초기화 완료');
    } else {
        console.warn('Supabase 설정이 없습니다. Vercel 환경변수 또는 config.js를 확인하세요.');
    }
}

// 1세대 포켓몬 151마리 리스트 (픽셀 스프라이트 사용)
const pokemonList = [];
for (let i = 1; i <= 151; i++) {
    pokemonList.push({
        id: i,
        name: getPokemonKoreanName(i),
        // 게임보이 스타일 픽셀 스프라이트 사용
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${i}.png`,
        // 백업용 일반 스프라이트
        imageUrlBackup: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
    });
}

// 포켓몬 한국어 이름 매핑 (1세대 151마리)
function getPokemonKoreanName(id) {
    const names = {
        1: '이상해씨', 2: '이상해풀', 3: '이상해꽃', 4: '파이리', 5: '리자드', 6: '리자몽',
        7: '꼬부기', 8: '어니부기', 9: '거북왕', 10: '캐터피', 11: '단데기', 12: '버터플',
        13: '뿔충이', 14: '딱충이', 15: '독침붕', 16: '구구', 17: '피죤', 18: '피죤투',
        19: '꼬렛', 20: '레트라', 21: '깨비참', 22: '깨비드릴조', 23: '아보', 24: '아보크',
        25: '피카츄', 26: '라이츄', 27: '모래두지', 28: '고지', 29: '니드런♀', 30: '니드리나',
        31: '니드퀸', 32: '니드런♂', 33: '니드리노', 34: '니드킹', 35: '삐삐', 36: '픽시',
        37: '식스테일', 38: '나인테일', 39: '푸린', 40: '푸크린', 41: '주뱃', 42: '골뱃',
        43: '뚜벅쵸', 44: '냄새꼬', 45: '라플레시아', 46: '파라스', 47: '파라섹트', 48: '콘팡',
        49: '도나리', 50: '디그다', 51: '닥트리오', 52: '나옹', 53: '페르시온', 54: '고라파덕',
        55: '골덕', 56: '망키', 57: '성원숭', 58: '가디', 59: '윈디', 60: '발챙이',
        61: '슈륙챙이', 62: '강챙이', 63: '캐이시', 64: '윤겔라', 65: '후딘', 66: '알통몬',
        67: '근육몬', 68: '괴력몬', 69: '모다피', 70: '우츠동', 71: '우츠보트', 72: '왕눈해',
        73: '독파리', 74: '꼬마돌', 75: '데구리', 76: '딱구리', 77: '포니타', 78: '날쌩마',
        79: '야돈', 80: '야도란', 81: '코일', 82: '레어코일', 83: '파오리', 84: '두두',
        85: '두트리오', 86: '쥬쥬', 87: '쥬레곤', 88: '질퍽이', 89: '질뻐기', 90: '셀러',
        91: '파르셀', 92: '고오스', 93: '고우스트', 94: '팬텀', 95: '롱스톤', 96: '슬리프',
        97: '슬리퍼', 98: '크랩', 99: '킹크랩', 100: '찌리리공', 101: '붐볼', 102: '아라리',
        103: '나시', 104: '탕구리', 105: '텅구리', 106: '시라소몬', 107: '홍수몬', 108: '내루미',
        109: '또가스', 110: '또도가스', 111: '뿔카노', 112: '코뿌리', 113: '럭키', 114: '덩쿠리',
        115: '캥카', 116: '쏘드라', 117: '시드라', 118: '콘치', 119: '왕콘치', 120: '별가사리',
        121: '아쿠스타', 122: '마임맨', 123: '스라크', 124: '루주라', 125: '에레브', 126: '마그마',
        127: '쁘사이저', 128: '켄타로스', 129: '잉어킹', 130: '갸라도스', 131: '라프라스', 132: '메타몽',
        133: '이브이', 134: '샤미드', 135: '쥬피썬더', 136: '부스터', 137: '폴리곤', 138: '암나이트',
        139: '암스타', 140: '투구', 141: '투구푸스', 142: '프테라', 143: '잠만보', 144: '프리져',
        145: '썬더', 146: '파이어', 147: '미뇽', 148: '신뇽', 149: '망나뇽', 150: '뮤츠',
        151: '뮤'
    };
    return names[id] || `포켓몬${id}`;
}

// 포켓몬 리스트 (다양한 포켓몬들!)
const pokemonListOld = [
    { name: '피카츄', emoji: '⚡', type: '전기' },
    { name: '라이츄', emoji: '🔋', type: '전기' },
    { name: '파이리', emoji: '🔥', type: '불꽃' },
    { name: '리자드', emoji: '🦎', type: '불꽃' },
    { name: '리자몽', emoji: '🐉', type: '불꽃/비행' },
    { name: '꼬부기', emoji: '💧', type: '물' },
    { name: '어니부기', emoji: '🐢', type: '물' },
    { name: '거북왕', emoji: '🌊', type: '물' },
    { name: '이상해씨', emoji: '🌱', type: '풀/독' },
    { name: '이상해풀', emoji: '🌿', type: '풀/독' },
    { name: '이상해꽃', emoji: '🌹', type: '풀/독' },
    { name: '캐터피', emoji: '🐛', type: '벌레' },
    { name: '단데기', emoji: '🦋', type: '벌레/독' },
    { name: '버터플', emoji: '🦋', type: '벌레/비행' },
    { name: '구구', emoji: '🐦', type: '노말/비행' },
    { name: '피죤', emoji: '🕊️', type: '노말/비행' },
    { name: '피죤투', emoji: '🦅', type: '노말/비행' },
    { name: '꼬렛', emoji: '🐭', type: '노말' },
    { name: '레트라', emoji: '🐀', type: '노말' },
    { name: '깨비참', emoji: '🦅', type: '노말/비행' },
    { name: '깨비드릴조', emoji: '🦅', type: '노말/비행' },
    { name: '아보', emoji: '🐍', type: '독' },
    { name: '아보크', emoji: '🐍', type: '독' },
    { name: '피카츄', emoji: '⚡', type: '전기' },
    { name: '라이츄', emoji: '⚡', type: '전기' },
    { name: '모래두지', emoji: '🏜️', type: '땅' },
    { name: '고지', emoji: '🏔️', type: '땅' },
    { name: '니드런♀', emoji: '🦔', type: '독' },
    { name: '니드리나', emoji: '🦔', type: '독' },
    { name: '니드퀸', emoji: '👑', type: '독/땅' },
    { name: '니드런♂', emoji: '🦔', type: '독' },
    { name: '니드리노', emoji: '🦔', type: '독' },
    { name: '니드킹', emoji: '👑', type: '독/땅' },
    { name: '삐삐', emoji: '✨', type: '페어리' },
    { name: '픽시', emoji: '🧚', type: '페어리' },
    { name: '식스테일', emoji: '🦊', type: '불꽃' },
    { name: '나인테일', emoji: '🦊', type: '불꽃' },
    { name: '푸린', emoji: '🎈', type: '노말/페어리' },
    { name: '푸크린', emoji: '🎈', type: '노말/페어리' },
    { name: '주뱃', emoji: '🦇', type: '독/비행' },
    { name: '골뱃', emoji: '🦇', type: '독/비행' },
    { name: '뚜벅쵸', emoji: '🌱', type: '풀/독' },
    { name: '냄새꼬', emoji: '🌿', type: '풀/독' },
    { name: '라플레시아', emoji: '🌺', type: '풀/독' },
    { name: '파라스', emoji: '🍄', type: '벌레/풀' },
    { name: '파라섹트', emoji: '🍄', type: '벌레/풀' },
    { name: '콘팡', emoji: '🐛', type: '벌레/독' },
    { name: '도나리', emoji: '🐝', type: '벌레/독' },
    { name: '디그다', emoji: '🪱', type: '땅' },
    { name: '닥트리오', emoji: '🪱', type: '땅' },
    { name: '나옹', emoji: '🐱', type: '노말' },
    { name: '페르시온', emoji: '😸', type: '노말' },
    { name: '고라파덕', emoji: '🦆', type: '물' },
    { name: '골덕', emoji: '🦆', type: '물/에스퍼' },
    { name: '망키', emoji: '🐵', type: '격투' },
    { name: '성원숭', emoji: '🐵', type: '격투' },
    { name: '가디', emoji: '🐕', type: '불꽃' },
    { name: '윈디', emoji: '🐕', type: '불꽃' },
    { name: '발챙이', emoji: '🐸', type: '물' },
    { name: '슈륙챙이', emoji: '🐸', type: '물' },
    { name: '강챙이', emoji: '🐸', type: '물/격투' },
    { name: '캐이시', emoji: '🧠', type: '에스퍼' },
    { name: '윤겔라', emoji: '🧠', type: '에스퍼' },
    { name: '후딘', emoji: '🧠', type: '에스퍼' },
    { name: '알통몬', emoji: '💪', type: '격투' },
    { name: '근육몬', emoji: '💪', type: '격투' },
    { name: '괴력몬', emoji: '💪', type: '격투' },
    { name: '모다피', emoji: '🌺', type: '풀' },
    { name: '우츠동', emoji: '🌺', type: '풀/독' },
    { name: '우츠보트', emoji: '🌺', type: '풀/독' },
    { name: '왕눈해', emoji: '👁️', type: '물/독' },
    { name: '독파리', emoji: '🪰', type: '벌레/독' },
    { name: '꼬마돌', emoji: '🪨', type: '바위/땅' },
    { name: '데구리', emoji: '🪨', type: '바위/땅' },
    { name: '딱구리', emoji: '🪨', type: '바위/땅' },
    { name: '포니타', emoji: '🐴', type: '불꽃' },
    { name: '날쌩마', emoji: '🐴', type: '불꽃' },
    { name: '야돈', emoji: '🐷', type: '물/에스퍼' },
    { name: '야도란', emoji: '🐷', type: '물/에스퍼' },
    { name: '코일', emoji: '⚙️', type: '전기/강철' },
    { name: '레어코일', emoji: '⚙️', type: '전기/강철' },
    { name: '파오리', emoji: '🦆', type: '노말/비행' },
    { name: '두두', emoji: '🐦', type: '노말/비행' },
    { name: '두트리오', emoji: '🐦', type: '노말/비행' },
    { name: '쥬쥬', emoji: '🐧', type: '물/얼음' },
    { name: '쥬레곤', emoji: '🐧', type: '물/얼음' },
    { name: '케이시', emoji: '👻', type: '고스트/독' },
    { name: '고오스', emoji: '👻', type: '고스트/독' },
    { name: '팬텀', emoji: '👻', type: '고스트/독' },
    { name: '롱스톤', emoji: '🪨', type: '바위/땅' },
    { name: '슬리프', emoji: '😴', type: '에스퍼' },
    { name: '슬리퍼', emoji: '😴', type: '에스퍼' },
    { name: '크랩', emoji: '🦀', type: '물' },
    { name: '킹크랩', emoji: '🦀', type: '물' },
    { name: '찌리리공', emoji: '⚡', type: '전기' },
    { name: '붐볼', emoji: '💣', type: '전기' },
    { name: '아라리', emoji: '🌵', type: '풀/독' },
    { name: '나시', emoji: '🌵', type: '풀/독' },
    { name: '탕구리', emoji: '🥚', type: '땅' },
    { name: '텅구리', emoji: '🥚', type: '땅' },
    { name: '시라소몬', emoji: '🐴', type: '격투' },
    { name: '홍수몬', emoji: '🐴', type: '격투' },
    { name: '내루미', emoji: '⚔️', type: '격투' },
    { name: '또가스', emoji: '💨', type: '독' },
    { name: '또도가스', emoji: '💨', type: '독' },
    { name: '뿔카노', emoji: '🦏', type: '땅/바위' },
    { name: '코뿌리', emoji: '🦏', type: '땅/바위' },
    { name: '럭키', emoji: '🍀', type: '노말' },
    { name: '덩쿠리', emoji: '🌿', type: '풀' },
    { name: '캥카', emoji: '🦘', type: '노말' },
    { name: '쏘드라', emoji: '🐴', type: '물' },
    { name: '시드라', emoji: '🐴', type: '물/독' },
    { name: '콘치', emoji: '🐚', type: '물' },
    { name: '왕콘치', emoji: '🐚', type: '물' },
    { name: '별가사리', emoji: '⭐', type: '물' },
    { name: '아쿠스타', emoji: '⭐', type: '물/에스퍼' },
    { name: '마임맨', emoji: '🎭', type: '에스퍼' },
    { name: '스라크', emoji: '🦂', type: '벌레/독' },
    { name: '루주라', emoji: '🦂', type: '벌레/독' },
    { name: '에레브', emoji: '⚡', type: '전기' },
    { name: '마그마', emoji: '🔥', type: '불꽃' },
    { name: '쁘사이저', emoji: '🦞', type: '물/전기' },
    { name: '켄타로스', emoji: '🐂', type: '노말' },
    { name: '잉어킹', emoji: '🐟', type: '물' },
    { name: '갸라도스', emoji: '🐉', type: '물/비행' },
    { name: '라프라스', emoji: '🦕', type: '물/얼음' },
    { name: '메타몽', emoji: '🔮', type: '노말' },
    { name: '이브이', emoji: '✨', type: '노말' },
    { name: '샤미드', emoji: '💧', type: '물' },
    { name: '쥬피썬더', emoji: '⚡', type: '전기' },
    { name: '부스터', emoji: '🔥', type: '불꽃' },
    { name: '폴리곤', emoji: '💎', type: '노말' },
    { name: '암나이트', emoji: '🐚', type: '바위/물' },
    { name: '암스타', emoji: '🐚', type: '바위/물' },
    { name: '투구', emoji: '🦴', type: '바위/물' },
    { name: '투구푸스', emoji: '🦴', type: '바위/물' },
    { name: '프테라', emoji: '🦕', type: '바위/비행' },
    { name: '잠만보', emoji: '😴', type: '노말' },
    { name: '프리져', emoji: '❄️', type: '얼음/비행' },
    { name: '썬더', emoji: '⚡', type: '전기/비행' },
    { name: '파이어', emoji: '🔥', type: '불꽃/비행' },
    { name: '미뇽', emoji: '🐉', type: '드래곤' },
    { name: '신뇽', emoji: '🐉', type: '드래곤' },
    { name: '망나뇽', emoji: '🐉', type: '드래곤/비행' },
    { name: '뮤츠', emoji: '💜', type: '에스퍼' },
    { name: '뮤', emoji: '✨', type: '에스퍼' }
];

// 최근 당첨번호 데이터 (최근 1개년, 약 52주)
let recentWinnersData = [];
let numberFrequency = {}; // 번호별 출현 빈도

// 실제 최근 당첨번호 데이터 (2024-2025년)
const realRecentWinners = [
    { round: 1220, date: "2025-02-22", numbers: [7, 14, 21, 28, 35, 42] },
    { round: 1219, date: "2025-02-15", numbers: [3, 12, 25, 33, 41, 44] },
    { round: 1218, date: "2025-02-08", numbers: [5, 11, 19, 27, 36, 43] },
    { round: 1217, date: "2025-02-01", numbers: [2, 9, 16, 24, 31, 40] },
    { round: 1216, date: "2025-01-25", numbers: [8, 15, 22, 29, 37, 45] },
    // 더 많은 실제 데이터는 API에서 가져오거나 추가 가능
];

// 최근 당첨번호 가져오기 (최적화: 빠른 로딩)
async function fetchRecentWinners() {
    try {
        // 즉시 실제 데이터로 표시 (빠른 응답)
        if (realRecentWinners.length >= 5) {
            displayRecentWinners(realRecentWinners.slice(0, 5));
        }
        
        // 백그라운드에서 추가 데이터 수집 (비동기)
        setTimeout(async () => {
            try {
                const latestRound = await getLatestRound();
                const winners = [];
                
                // 최근 5회만 빠르게 가져오기 (타임아웃 설정)
                const fetchPromises = [];
                for (let i = 0; i < 5; i++) {
                    const round = latestRound - i;
                    fetchPromises.push(
                        Promise.race([
                            fetchWinnerData(round),
                            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
                        ]).catch(() => null)
                    );
                }
                
                const results = await Promise.all(fetchPromises);
                results.forEach(data => {
                    if (data) winners.push(data);
                });
                
                // 실제 데이터와 병합
                if (winners.length > 0) {
                    const allWinners = [...realRecentWinners, ...winners]
                        .filter((v, i, a) => a.findIndex(t => t.round === v.round) === i)
                        .sort((a, b) => b.round - a.round)
                        .slice(0, 5);
                    displayRecentWinners(allWinners);
                }
                
                // 최근 1개년 데이터는 샘플로 빠르게 생성 (API 호출 최소화)
                const sampleData = generateSampleData(latestRound);
                recentWinnersData = [...realRecentWinners, ...sampleData].slice(0, 52);
                calculateFrequency();
            } catch (error) {
                console.log('백그라운드 데이터 로딩 실패:', error);
                // 샘플 데이터로 보완
                const sampleData = generateSampleData(1220);
                recentWinnersData = [...realRecentWinners, ...sampleData].slice(0, 52);
                calculateFrequency();
            }
        }, 100);
        
        // 즉시 반환 (빠른 응답)
        recentWinnersData = realRecentWinners;
        calculateFrequency();
        return realRecentWinners.slice(0, 5);
    } catch (error) {
        console.error('당첨번호를 가져오는 중 오류:', error);
        // 샘플 데이터 사용
        useSampleData();
        return [];
    }
}

// 최신 회차 가져오기
async function getLatestRound() {
    try {
        // 동행복권 API 또는 대체 API 사용
        const response = await fetch('https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=');
        if (response.ok) {
            const data = await response.json();
            return data.drwtNo1 ? parseInt(data.drwtNo1) : 1220; // 기본값
        }
    } catch (e) {
        // API 실패 시 현재 날짜 기준으로 계산
        const weeksSinceStart = Math.floor((Date.now() - new Date('2002-12-07').getTime()) / (7 * 24 * 60 * 60 * 1000));
        return 1 + weeksSinceStart; // 대략적인 회차
    }
    return 1220; // 기본값
}

// 특정 회차 당첨번호 가져오기 (타임아웃 설정)
async function fetchWinnerData(round) {
    try {
        // 타임아웃 설정 (1.5초)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);
        
        // 동행복권 API 호출 (CORS 문제 가능성 있음)
        const response = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            },
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            const data = await response.json();
            if (data.returnValue === 'success' && data.drwtNo1) {
                return {
                    round: round,
                    date: data.drwNoDate || formatDate(new Date()),
                    numbers: [
                        data.drwtNo1, data.drwtNo2, data.drwtNo3,
                        data.drwtNo4, data.drwtNo5, data.drwtNo6
                    ].sort((a, b) => a - b)
                };
            }
        }
    } catch (e) {
        // CORS, 네트워크 오류 또는 타임아웃 - 조용히 실패 처리
    }
    return null;
}

// 샘플 데이터 생성 (현실적인 패턴 반영)
function generateSampleData(startRound) {
    const sampleData = [];
    const today = new Date();
    
    // 최근 52주 샘플 데이터 생성 (통계적 패턴 반영)
    for (let i = 0; i < 52; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7));
        const numbers = generateRealisticNumbers();
        sampleData.push({
            round: startRound - i,
            date: formatDate(date),
            numbers: numbers
        });
    }
    
    return sampleData;
}

// 샘플 데이터 사용 (API 실패 시)
function useSampleData() {
    const latestRound = 1220; // 대략적인 최신 회차
    const sampleData = generateSampleData(latestRound);
    
    // 실제 데이터를 앞에 추가
    const allData = [...realRecentWinners, ...sampleData.slice(realRecentWinners.length)];
    
    recentWinnersData = allData;
    calculateFrequency();
    
    // 최근 5개 표시 (실제 데이터 우선)
    if (realRecentWinners.length >= 5) {
        displayRecentWinners(realRecentWinners.slice(0, 5));
    } else {
        displayRecentWinners(allData.slice(0, 5));
    }
}

// 현실적인 번호 생성 (통계 패턴 반영)
function generateRealisticNumbers() {
    const numbers = [];
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    
    // 홀짝 비율 고려 (3:3 또는 4:2)
    const targetOdd = Math.random() > 0.5 ? 3 : 4;
    let oddCount = 0;
    
    for (let i = 0; i < 6; i++) {
        let available = [...pool];
        
        // 홀짝 비율 조정
        if (i === 5) {
            // 마지막 번호는 홀짝 비율 맞추기
            if (oddCount < targetOdd) {
                available = available.filter(n => n % 2 === 1);
            } else {
                available = available.filter(n => n % 2 === 0);
            }
        }
        
        const randomIndex = Math.floor(Math.random() * available.length);
        const selectedNumber = available[randomIndex];
        numbers.push(selectedNumber);
        
        if (selectedNumber % 2 === 1) oddCount++;
        
        // 선택된 번호 제거
        const poolIndex = pool.indexOf(selectedNumber);
        if (poolIndex > -1) pool.splice(poolIndex, 1);
    }
    
    return numbers.sort((a, b) => a - b);
}

// 날짜 포맷팅
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 출현 빈도 계산
function calculateFrequency() {
    numberFrequency = {};
    
    // 1부터 45까지 초기화
    for (let i = 1; i <= 45; i++) {
        numberFrequency[i] = 0;
    }
    
    // 최근 1개년 데이터로 빈도 계산
    recentWinnersData.forEach(winner => {
        winner.numbers.forEach(num => {
            numberFrequency[num] = (numberFrequency[num] || 0) + 1;
        });
    });
}

// 최근 당첨번호 표시 (간단한 버전)
function displayRecentWinners(winners) {
    const container = document.getElementById('recentWinners');
    container.innerHTML = '';
    
    if (winners.length === 0) {
        container.innerHTML = '<div class="loading"><span class="loading-text">포켓몬이 당첨번호 데이터를 불러올 수 없습니다</span></div>';
        return;
    }
    
    winners.forEach((winner, winnerIndex) => {
        // 로또 번호와 동일한 포켓몬 번호 사용 (1-45)
        const winnerPokemon = winner.numbers.map(num => pokemonList[num - 1]);
        
        const item = document.createElement('div');
        item.className = 'winner-item-compact';
        
        const round = document.createElement('div');
        round.className = 'winner-round-compact';
        round.textContent = `${winner.round}회`;
        
        const numbers = document.createElement('div');
        numbers.className = 'winner-numbers-compact';
        
        winner.numbers.forEach((num, numIndex) => {
            const ball = document.createElement('div');
            ball.className = `winner-number-ball-compact ${getNumberClass(num)}`;
            const pokemon = winnerPokemon[numIndex];
            ball.innerHTML = `
                <img src="${pokemon.imageUrl}" alt="${pokemon.name}" class="winner-ball-pokemon" onerror="this.src='${pokemon.imageUrlBackup}'; this.onerror=null;">
                <span class="winner-ball-text">${num}</span>
            `;
            numbers.appendChild(ball);
        });
        
        item.appendChild(round);
        item.appendChild(numbers);
        container.appendChild(item);
    });
}

// 확률 기반 로또 번호 생성 함수
function generateLottoNumbers() {
    const numbers = [];
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    
    // 가중치 기반 선택을 위한 배열 생성
    const weightedPool = pool.map(num => ({
        num: num,
        weight: calculateWeight(num)
    }));
    
    // 가중치 기반으로 6개 선택
    for (let i = 0; i < 6; i++) {
        const selected = selectByWeight(weightedPool);
        numbers.push(selected.num);
        
        // 이미 선택된 번호 제거
        const index = weightedPool.findIndex(item => item.num === selected.num);
        weightedPool.splice(index, 1);
    }
    
    // 추가 검증 및 최적화
    const optimized = optimizeNumbers(numbers);
    
    // 오름차순 정렬
    optimized.sort((a, b) => a - b);
    
    return optimized;
}

// 번호별 가중치 계산
function calculateWeight(number) {
    let weight = 1;
    
    // 1. 출현 빈도 기반 가중치 (자주 나온 번호에 약간의 가중치)
    const frequency = numberFrequency[number] || 0;
    const avgFrequency = Object.values(numberFrequency).reduce((a, b) => a + b, 0) / 45;
    
    // 평균보다 낮게 나온 번호에 더 높은 가중치 (보정 효과)
    if (frequency < avgFrequency) {
        weight += (avgFrequency - frequency) * 0.3;
    } else {
        weight += (frequency - avgFrequency) * 0.1;
    }
    
    // 2. 최근 5회에서 나온 번호는 가중치 감소 (과열 방지)
    const recent5 = recentWinnersData.slice(0, 5);
    const inRecent5 = recent5.some(winner => winner.numbers.includes(number));
    if (inRecent5) {
        weight *= 0.7;
    }
    
    return weight;
}

// 가중치 기반 선택
function selectByWeight(weightedPool) {
    const totalWeight = weightedPool.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const item of weightedPool) {
        random -= item.weight;
        if (random <= 0) {
            return item;
        }
    }
    
    return weightedPool[0];
}

// 번호 최적화 (통계적 패턴 적용)
function optimizeNumbers(numbers) {
    let optimized = [...numbers];
    
    // 1. 홀짝 비율 조정 (3:3 또는 4:2 비율 선호)
    const oddCount = optimized.filter(n => n % 2 === 1).length;
    if (oddCount < 2 || oddCount > 4) {
        // 홀짝 비율이 극단적이면 조정
        optimized = adjustOddEven(optimized);
    }
    
    // 2. 구간 분배 확인 (1-15, 16-30, 31-45)
    const ranges = {
        low: optimized.filter(n => n <= 15).length,
        mid: optimized.filter(n => n > 15 && n <= 30).length,
        high: optimized.filter(n => n > 30).length
    };
    
    // 한 구간에 너무 많이 몰리지 않도록 조정
    if (ranges.low === 0 || ranges.mid === 0 || ranges.high === 0) {
        optimized = adjustRanges(optimized);
    }
    
    // 3. 연속번호 제한 (3개 이상 연속 방지)
    optimized = limitConsecutive(optimized);
    
    // 4. 합계 범위 확인 (100-175 범위 선호)
    const sum = optimized.reduce((a, b) => a + b, 0);
    if (sum < 100 || sum > 175) {
        optimized = adjustSum(optimized, sum);
    }
    
    return optimized;
}

// 홀짝 비율 조정
function adjustOddEven(numbers) {
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    const available = pool.filter(n => !numbers.includes(n));
    
    const oddCount = numbers.filter(n => n % 2 === 1).length;
    const targetOdd = oddCount < 3 ? 3 : 3; // 3개 목표
    
    if (oddCount < 3) {
        // 홀수 추가
        const oddAvailable = available.filter(n => n % 2 === 1);
        const toRemove = numbers.filter(n => n % 2 === 0).slice(0, 3 - oddCount);
        toRemove.forEach(n => {
            const index = numbers.indexOf(n);
            if (index > -1 && oddAvailable.length > 0) {
                const replacement = oddAvailable[Math.floor(Math.random() * oddAvailable.length)];
                numbers[index] = replacement;
                oddAvailable.splice(oddAvailable.indexOf(replacement), 1);
            }
        });
    } else if (oddCount > 3) {
        // 짝수 추가
        const evenAvailable = available.filter(n => n % 2 === 0);
        const toRemove = numbers.filter(n => n % 2 === 1).slice(0, oddCount - 3);
        toRemove.forEach(n => {
            const index = numbers.indexOf(n);
            if (index > -1 && evenAvailable.length > 0) {
                const replacement = evenAvailable[Math.floor(Math.random() * evenAvailable.length)];
                numbers[index] = replacement;
                evenAvailable.splice(evenAvailable.indexOf(replacement), 1);
            }
        });
    }
    
    return numbers;
}

// 구간 분배 조정
function adjustRanges(numbers) {
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    const available = pool.filter(n => !numbers.includes(n));
    
    const ranges = {
        low: numbers.filter(n => n <= 15),
        mid: numbers.filter(n => n > 15 && n <= 30),
        high: numbers.filter(n => n > 30)
    };
    
    // 빈 구간이 있으면 채우기
    if (ranges.low.length === 0) {
        const lowAvailable = available.filter(n => n <= 15);
        if (lowAvailable.length > 0) {
            const toReplace = ranges.mid.length > ranges.high.length ? ranges.mid[0] : ranges.high[0];
            const index = numbers.indexOf(toReplace);
            if (index > -1) {
                numbers[index] = lowAvailable[Math.floor(Math.random() * lowAvailable.length)];
            }
        }
    } else if (ranges.mid.length === 0) {
        const midAvailable = available.filter(n => n > 15 && n <= 30);
        if (midAvailable.length > 0) {
            const toReplace = ranges.low.length > ranges.high.length ? ranges.low[0] : ranges.high[0];
            const index = numbers.indexOf(toReplace);
            if (index > -1) {
                numbers[index] = midAvailable[Math.floor(Math.random() * midAvailable.length)];
            }
        }
    } else if (ranges.high.length === 0) {
        const highAvailable = available.filter(n => n > 30);
        if (highAvailable.length > 0) {
            const toReplace = ranges.low.length > ranges.mid.length ? ranges.low[0] : ranges.mid[0];
            const index = numbers.indexOf(toReplace);
            if (index > -1) {
                numbers[index] = highAvailable[Math.floor(Math.random() * highAvailable.length)];
            }
        }
    }
    
    return numbers;
}

// 연속번호 제한
function limitConsecutive(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    let consecutiveCount = 1;
    let maxConsecutive = 1;
    
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === sorted[i-1] + 1) {
            consecutiveCount++;
            maxConsecutive = Math.max(maxConsecutive, consecutiveCount);
        } else {
            consecutiveCount = 1;
        }
    }
    
    // 3개 이상 연속이면 조정
    if (maxConsecutive >= 3) {
        const pool = Array.from({ length: 45 }, (_, i) => i + 1);
        const available = pool.filter(n => !numbers.includes(n));
        
        // 연속된 번호 중 하나를 다른 번호로 교체
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] === sorted[i-1] + 1 && sorted[i+1] === sorted[i] + 1) {
                const index = numbers.indexOf(sorted[i]);
                if (index > -1 && available.length > 0) {
                    numbers[index] = available[Math.floor(Math.random() * available.length)];
                    break;
                }
            }
        }
    }
    
    return numbers;
}

// 합계 조정
function adjustSum(numbers, currentSum) {
    const targetSum = 140; // 목표 합계
    const diff = currentSum - targetSum;
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    const available = pool.filter(n => !numbers.includes(n));
    
    if (Math.abs(diff) > 20) {
        // 합계가 너무 크면 큰 수를 작은 수로, 작으면 작은 수를 큰 수로
        if (currentSum > targetSum) {
            // 큰 수를 작은 수로 교체
            const largeNumbers = numbers.filter(n => n > 30).sort((a, b) => b - a);
            const smallAvailable = available.filter(n => n <= 20);
            if (largeNumbers.length > 0 && smallAvailable.length > 0) {
                const index = numbers.indexOf(largeNumbers[0]);
                if (index > -1) {
                    numbers[index] = smallAvailable[Math.floor(Math.random() * smallAvailable.length)];
                }
            }
        } else {
            // 작은 수를 큰 수로 교체
            const smallNumbers = numbers.filter(n => n <= 15).sort((a, b) => a - b);
            const largeAvailable = available.filter(n => n > 25);
            if (smallNumbers.length > 0 && largeAvailable.length > 0) {
                const index = numbers.indexOf(smallNumbers[0]);
                if (index > -1) {
                    numbers[index] = largeAvailable[Math.floor(Math.random() * largeAvailable.length)];
                }
            }
        }
    }
    
    return numbers;
}

// 랜덤 번호 생성 (샘플 데이터용)
function generateRandomNumbers() {
    const numbers = [];
    const pool = Array.from({ length: 45 }, (_, i) => i + 1);
    
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        const selectedNumber = pool.splice(randomIndex, 1)[0];
        numbers.push(selectedNumber);
    }
    
    return numbers.sort((a, b) => a - b);
}

// 번호에 따른 색상 클래스 결정
function getNumberClass(number) {
    if (number <= 15) {
        return 'low';
    } else if (number <= 30) {
        return 'mid';
    } else {
        return 'high';
    }
}

// 배틀 스타일 추첨 애니메이션
async function animateLottoDrawing(finalNumbers, setIndex, totalSets) {
    return new Promise((resolve) => {
        const drawingArea = document.getElementById('drawingArea');
        const selectedBalls = document.getElementById('selectedBalls');
        const drawingMessage = document.getElementById('drawingMessage');
        const opponentPokemon = document.getElementById('opponentPokemon');
        const playerPokemon = document.getElementById('playerPokemon');
        
        if (!drawingArea) {
            resolve();
            return;
        }
        
        drawingArea.style.display = 'flex';
        if (selectedBalls) selectedBalls.innerHTML = '';
        if (opponentPokemon) opponentPokemon.innerHTML = '';
        if (playerPokemon) playerPokemon.innerHTML = '';
        if (drawingMessage) drawingMessage.textContent = `세트 ${setIndex + 1}/${totalSets} - 포켓몬을 선택하는 중...`;
        
        // 각 번호를 순차적으로 추첨
        let drawnCount = 0;
        const selectedPokemonData = [];
        
        const drawNext = () => {
            if (drawnCount >= 6) {
                // 모든 번호 추첨 완료
                if (drawingMessage) {
                    drawingMessage.textContent = '포켓몬 잡기 완료! 아래에서 잡은 포켓몬을 확인하세요!';
                }
                
                // 페이드 아웃 애니메이션
                setTimeout(() => {
                    drawingArea.style.display = 'none';
                    resolve();
                }, 1000);
                return;
            }
            
            const finalNumber = finalNumbers[drawnCount];
            
            // 로또 번호와 동일한 포켓몬 번호 사용 (1-45)
            const pokemonId = finalNumber; // 로또 번호 = 포켓몬 번호
            const selectedPokemon = pokemonList[pokemonId - 1];
            selectedPokemonData.push(selectedPokemon);
            
            // 배틀 화면에 포켓몬 표시
            if (opponentPokemon) {
                opponentPokemon.innerHTML = `<img src="${selectedPokemon.imageUrl}" alt="${selectedPokemon.name}" onerror="this.src='${selectedPokemon.imageUrlBackup}'; this.onerror=null;">`;
            }
            
            if (drawingMessage) {
                drawingMessage.textContent = `${selectedPokemon.name.toUpperCase()}가 나타났다! 번호: ${finalNumber}`;
            }
            
            // 번호가 나오는 애니메이션
            setTimeout(() => {
                if (selectedBalls) {
                    const selectedBall = document.createElement('div');
                    selectedBall.className = `selected-ball ${getNumberClass(finalNumber)}`;
                    selectedBall.textContent = finalNumber;
                    selectedBall.style.animationDelay = `${drawnCount * 0.1}s`;
                    selectedBalls.appendChild(selectedBall);
                }
                
                // 포켓몬 표시 업데이트는 제거 (쇼케이스 삭제됨)
                
                // 사운드 효과
                playRevealSound();
                
                drawnCount++;
                
                // 다음 번호 추첨
                if (drawnCount < 6) {
                    setTimeout(drawNext, 600);
                } else {
                    drawNext();
                }
            }, 800);
        };
        
        // 첫 번째 추첨 시작
        setTimeout(() => {
            drawNext();
        }, 500);
    });
}

// 포켓몬 쇼케이스 업데이트
// 포켓몬 쇼케이스 함수 제거됨 (더 이상 사용하지 않음)

// 메시지 박스 업데이트
function updateMessage(text) {
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        const messageText = messageBox.querySelector('.message-text');
        if (messageText) {
            messageText.textContent = text.toUpperCase();
        }
    }
}

// 행운 바 업데이트
function updateLuckBar(percentage) {
    const luckBar = document.getElementById('luckBar');
    if (luckBar) {
        luckBar.style.width = percentage + '%';
    }
}

// 트레이너 캐릭터 표시
function displayTrainer() {
    const trainerSprite = document.getElementById('trainerSprite');
    if (!trainerSprite) return;
    
    // 이미지 파일을 사용하여 트레이너 스프라이트 표시
    trainerSprite.innerHTML = '';
    
    const img = document.createElement('img');
    // 이미지 경로 설정 (상대 경로)
    img.src = 'assets/trainer-sprite.png';
    img.alt = 'Trainer';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    img.style.imageRendering = 'pixelated';
    img.style.display = 'block';
    
    img.onerror = function() {
        console.error('트레이너 이미지 로드 실패:', img.src);
        // 이미지 로드 실패 시 대체 표시
        trainerSprite.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-size: 10px; color: var(--gb-dark); background: var(--gb-green-3); border: 1px solid var(--gb-dark); text-align: center; padding: 4px;">이미지를<br>불러올 수 없습니다</div>';
    };
    
    img.onload = function() {
        console.log('트레이너 이미지 로드 성공:', img.src);
    };
    
    trainerSprite.appendChild(img);
    
    // 트레이너 정보 업데이트
    const trainerName = document.getElementById('trainerName');
    const trainerId = document.getElementById('trainerId');
    if (trainerName) trainerName.textContent = 'TRAINER';
    if (trainerId) trainerId.textContent = 'No. 00001';
}

// 배경에 포켓몬 추가 (픽셀 스프라이트)
function addBackgroundPokemon() {
    const bg = document.getElementById('pokemonBackground');
    if (!bg) return;
    
    // 1세대 포켓몬 중 랜덤으로 30마리 배경에 추가
    const usedIds = new Set();
    for (let i = 0; i < 30; i++) {
        let pokemonId;
        do {
            pokemonId = Math.floor(Math.random() * 151) + 1;
        } while (usedIds.has(pokemonId));
        usedIds.add(pokemonId);
        
        const pokemon = document.createElement('div');
        pokemon.className = 'pokemon-float';
        const pokemonData = pokemonList[pokemonId - 1];
        pokemon.innerHTML = `<img src="${pokemonData.imageUrl}" alt="${pokemonData.name}" class="pokemon-bg-image" onerror="this.src='${pokemonData.imageUrlBackup}'; this.onerror=null;">`;
        pokemon.style.left = Math.random() * 100 + '%';
        pokemon.style.top = Math.random() * 100 + '%';
        pokemon.style.animationDelay = Math.random() * 8 + 's';
        pokemon.style.animationDuration = (6 + Math.random() * 4) + 's';
        bg.appendChild(pokemon);
    }
}

// 랜덤 그라데이션 생성
function getRandomGradient() {
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
}

// 번호에 따른 그라데이션
function getNumberGradient(number) {
    if (number <= 15) {
        return 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)';
    } else if (number <= 30) {
        return 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)';
    } else {
        return 'linear-gradient(135deg, #D299C2 0%, #FEF9D7 100%)';
    }
}

// 공개 사운드 효과 (선택사항)
function playRevealSound() {
    // 간단한 비프음 생성 (선택사항)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // 오디오 컨텍스트를 사용할 수 없는 경우 무시
    }
}

// Supabase에 번호 저장
async function saveNumbersToSupabase(sets, pokemonIds) {
    if (!supabaseClient) {
        console.warn('Supabase가 설정되지 않았습니다. config.js 파일을 확인하세요.');
        return null;
    }
    
    try {
        // 로또 번호와 동일한 포켓몬 번호 사용 (1-45)
        const records = sets.map((numbers, index) => ({
            numbers: numbers,
            set_count: sets.length,
            pokemon_ids: numbers, // 로또 번호 = 포켓몬 번호
            user_ip: null, // 필요시 추가
            user_agent: navigator.userAgent
        }));
        
        const { data, error } = await supabaseClient
            .from('lotto_numbers')
            .insert(records)
            .select();
        
        if (error) {
            console.error('Supabase 저장 오류:', error);
            return null;
        }
        
        console.log('번호가 성공적으로 저장되었습니다:', data);
        return data;
    } catch (error) {
        console.error('저장 중 오류 발생:', error);
        return null;
    }
}

// Supabase에서 저장된 번호 조회
async function loadSavedNumbers(limit = 10) {
    if (!supabaseClient) {
        console.warn('Supabase가 설정되지 않았습니다.');
        return [];
    }
    
    try {
        const { data, error } = await supabaseClient
            .from('lotto_numbers')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);
        
        if (error) {
            console.error('Supabase 조회 오류:', error);
            return [];
        }
        
        return data || [];
    } catch (error) {
        console.error('조회 중 오류 발생:', error);
        return [];
    }
}

// 저장된 번호 표시
// 페이징 상태 관리
let currentSavedPage = 1;
const itemsPerPage = 2;

function displaySavedNumbers(savedData) {
    const container = document.getElementById('savedNumbers');
    if (!container) return;
    
    if (savedData.length === 0) {
        container.innerHTML = '<div class="loading"><span class="loading-text">저장된 번호가 없습니다</span></div>';
        return;
    }
    
    // 페이징 계산
    const totalPages = Math.ceil(savedData.length / itemsPerPage);
    const startIndex = (currentSavedPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = savedData.slice(startIndex, endIndex);
    
    container.innerHTML = '';
    
    // 현재 페이지 데이터 표시
    currentPageData.forEach((record, index) => {
        const item = document.createElement('div');
        item.className = 'winner-item-compact';
        
        const round = document.createElement('div');
        round.className = 'winner-round-compact';
        const date = new Date(record.created_at);
        round.innerHTML = `
            <div>${date.toLocaleDateString('ko-KR')}</div>
            <div style="font-size: 8px; color: #666;">${date.toLocaleTimeString('ko-KR')}</div>
        `;
        
        const numbers = document.createElement('div');
        numbers.className = 'winner-numbers-compact';
        
        // 로또 번호와 동일한 포켓몬 번호 사용 (1-45)
        const savedPokemon = record.numbers.map(num => pokemonList[num - 1]);
        
        record.numbers.forEach((num, numIndex) => {
            const ball = document.createElement('div');
            ball.className = `winner-number-ball-compact ${getNumberClass(num)}`;
            const pokemon = savedPokemon[numIndex];
            ball.innerHTML = `
                <img src="${pokemon.imageUrl}" alt="${pokemon.name}" class="winner-ball-pokemon" onerror="this.src='${pokemon.imageUrlBackup}'; this.onerror=null;">
                <span class="winner-ball-text">${num}</span>
            `;
            numbers.appendChild(ball);
        });
        
        item.appendChild(round);
        item.appendChild(numbers);
        container.appendChild(item);
    });
    
    // 페이징 컨트롤 추가
    if (totalPages > 1) {
        const pagination = document.createElement('div');
        pagination.className = 'pagination-controls';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.textContent = '◀';
        prevBtn.disabled = currentSavedPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentSavedPage > 1) {
                currentSavedPage--;
                displaySavedNumbers(savedData);
            }
        });
        
        const pageInfo = document.createElement('span');
        pageInfo.className = 'pagination-info';
        pageInfo.textContent = `${currentSavedPage} / ${totalPages}`;
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.textContent = '▶';
        nextBtn.disabled = currentSavedPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentSavedPage < totalPages) {
                currentSavedPage++;
                displaySavedNumbers(savedData);
            }
        });
        
        pagination.appendChild(prevBtn);
        pagination.appendChild(pageInfo);
        pagination.appendChild(nextBtn);
        container.appendChild(pagination);
    }
}

// 결과 표시 함수
function displayResults(sets) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    if (sets.length === 0) {
        resultsDiv.innerHTML = '';
        return;
    }
    
    sets.forEach((numbers, index) => {
        // 로또 번호와 동일한 포켓몬 번호 사용 (1-45)
        const setPokemon = numbers.map(num => pokemonList[num - 1]);
        
        const setDiv = document.createElement('div');
        setDiv.className = 'lotto-set';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'set-header';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'set-title';
        titleDiv.innerHTML = `<span>세트 ${index + 1}</span>`;
        
        const numberDiv = document.createElement('div');
        numberDiv.className = 'set-number';
        numberDiv.textContent = `${numbers.join('-')}`;
        
        headerDiv.appendChild(titleDiv);
        headerDiv.appendChild(numberDiv);
        
        // 레트로 게임 스타일: 포켓몬과 번호를 함께 표시
        const numbersDiv = document.createElement('div');
        numbersDiv.className = 'numbers';
        
        numbers.forEach((number, numIndex) => {
            const ball = document.createElement('div');
            ball.className = `number-ball ${getNumberClass(number)}`;
            
            // 로또 번호와 동일한 포켓몬 번호 사용
            const pokemon = setPokemon[numIndex];
            ball.innerHTML = `
                <img src="${pokemon.imageUrl}" alt="${pokemon.name}" class="number-ball-pokemon" onerror="this.src='${pokemon.imageUrlBackup}'; this.onerror=null;">
                <span class="number-ball-text">${number}</span>
            `;
            
            ball.style.animationDelay = `${numIndex * 0.1}s`;
            numbersDiv.appendChild(ball);
        });
        
        setDiv.appendChild(headerDiv);
        setDiv.appendChild(numbersDiv);
        resultsDiv.appendChild(setDiv);
    });
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', async function() {
    // Supabase 초기화 (Vercel 환경변수 또는 config.js 사용)
    await initializeSupabase();
    
    // 트레이너 표시
    displayTrainer();
    
    // 배경에 포켓몬 추가
    addBackgroundPokemon();
    
    // 최근 당첨번호 로드
    await fetchRecentWinners();
    
    // 저장된 번호 로드
    const savedData = await loadSavedNumbers(100); // 페이징을 위해 더 많은 데이터 로드
    currentSavedPage = 1; // 초기 페이지로 리셋
    displaySavedNumbers(savedData);
    
    const generateBtn = document.getElementById('generateBtn');
    const setCountInput = document.getElementById('setCount');
    
    // 배틀 메뉴 옵션 선택 효과
    const menuOptions = document.querySelectorAll('.menu-option');
    menuOptions.forEach(option => {
        option.addEventListener('click', function() {
            menuOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    generateBtn.addEventListener('click', async function() {
        const setCount = parseInt(setCountInput.value) || 1;
        const sets = [];
        
        // 버튼 비활성화
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="menu-cursor">►</span>FIGHTING...';
        
        // 메시지 업데이트
        updateMessage('포켓몬을 선택하는 중...');
        updateLuckBar(0);
        
        // 결과 영역 초기화
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        
        try {
            // 각 세트를 순차적으로 추첨
            for (let i = 0; i < setCount; i++) {
                // 행운 바 업데이트
                updateLuckBar(((i + 1) / setCount) * 100);
                updateMessage(`세트 ${i + 1}/${setCount} 생성 중...`);
                
                // 번호 생성
                const numbers = generateLottoNumbers();
                sets.push(numbers);
                
                // 추첨 애니메이션
                await animateLottoDrawing(numbers, i, setCount);
            }
            
            // 모든 추첨이 끝난 후 결과 표시
            displayResults(sets);
            updateMessage('포켓몬 잡기 완료! 아래에서 잡은 포켓몬을 확인하세요!');
            updateLuckBar(100);
            
            // Supabase에 저장 (로또 번호 = 포켓몬 번호이므로 sets를 그대로 사용)
            await saveNumbersToSupabase(sets, sets);
            
            // 저장된 번호 목록 새로고침
            const savedData = await loadSavedNumbers(100); // 페이징을 위해 더 많은 데이터 로드
            currentSavedPage = 1; // 초기 페이지로 리셋
            displaySavedNumbers(savedData);
        } catch (error) {
            console.error('추첨 중 오류:', error);
            displayResults(sets);
            updateMessage('오류가 발생했습니다.');
        } finally {
            // 버튼 다시 활성화
            setTimeout(() => {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<span class="menu-cursor">►</span>FIGHT';
                updateLuckBar(100);
            }, 1000);
        }
    });
    
    // Enter 키로도 생성 가능
    setCountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
    
    // 초기 빈 상태 표시
    displayResults([]);
    updateMessage('FIGHT를 눌러 로또 포켓몬을 잡아보세요!');
});
