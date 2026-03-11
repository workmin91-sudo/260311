# 포켓몬 로또 번호 추천 서비스 🎮⚡

포켓몬스터 컨셉의 로또 번호 추천 웹 서비스입니다.

## 주요 기능

- 🎯 **확률 기반 번호 생성**: 최근 1개년 당첨번호 분석 기반으로 번호 추천
- 🎮 **포켓몬스터 컨셉**: 1세대 포켓몬 151마리 활용
- 🎲 **포켓볼 추첨 애니메이션**: 실제 포켓볼에서 포켓몬이 나오는 듯한 애니메이션
- 📊 **최근 5회 당첨번호 표시**: 최근 당첨번호 확인
- 🎨 **화려한 디자인**: 포켓몬 이미지와 애니메이션으로 구성된 재미있는 UI

## 사용 방법

1. `index.html` 파일을 웹 브라우저에서 열기
2. 생성할 세트 수 입력 (1~10)
3. "포켓볼 던지기!" 버튼 클릭
4. 포켓볼에서 포켓몬이 나오며 번호가 추첨됨
5. 생성된 번호 확인

## 기술 스택

- HTML5
- CSS3 (애니메이션, 그라데이션)
- JavaScript (ES6+)
- PokeAPI (포켓몬 이미지)

## 파일 구조

```
260311/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # JavaScript 로직
└── README.md          # 프로젝트 설명
```

## 특징

- 반응형 디자인 (모바일/데스크톱 지원)
- 포켓몬 이미지 API 활용
- 부드러운 애니메이션 효과
- 확률 기반 번호 생성 알고리즘

## Supabase 연동 (번호 저장 기능)

### Vercel 배포 시 환경변수 설정 (권장)

1. **Vercel 대시보드에서 환경변수 설정**
   - Vercel 프로젝트 > Settings > Environment Variables
   - 다음 변수 추가:
     - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key
   - Environment: Production, Preview, Development 모두 선택
   - 자세한 내용은 `vercel-setup.md` 참고

2. **로컬 개발 시**
   ```bash
   cp config.example.js config.js
   ```
   - `config.js` 파일에 Supabase URL과 API 키 입력

### Supabase 설정

1. **Supabase 프로젝트 생성**
   - https://supabase.com 접속
   - 새 프로젝트 생성
   - 프로젝트 URL과 API 키 확인

2. **데이터베이스 테이블 생성**
   - Supabase 대시보드 > SQL Editor
   - `supabase-setup.md` 파일의 SQL 실행

### 기능

- 추첨한 번호가 자동으로 Supabase에 저장됩니다
- 저장된 번호는 "SAVED NUMBERS" 섹션에서 확인할 수 있습니다
- 최대 10개의 최근 저장된 번호가 표시됩니다
- Vercel 환경변수를 우선 사용하며, 없으면 config.js 파일 사용

## 참고

- 포켓몬 이미지는 [PokeAPI](https://pokeapi.co/)를 통해 제공됩니다.
- 로또 번호는 확률 기반으로 생성되며, 당첨을 보장하지 않습니다.
- Supabase 설정은 선택사항입니다. 설정하지 않아도 번호 생성 기능은 정상 작동합니다.
