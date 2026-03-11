# Vercel 배포 및 환경변수 설정 가이드

## 1. Vercel 프로젝트 연결

1. https://vercel.com 접속 및 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택: `workmin91-sudo/260311`
4. 프로젝트 설정:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: (비워두기)
   - Output Directory: `./`
5. "Deploy" 클릭

## 2. Vercel 환경변수 설정

### 방법 1: Vercel 대시보드에서 설정 (권장)

1. Vercel 대시보드에서 프로젝트 선택
2. Settings > Environment Variables 메뉴로 이동
3. 다음 환경변수 추가:

   **변수 1:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co` (실제 Supabase URL)
   - Environment: Production, Preview, Development 모두 선택

   **변수 2:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (실제 anon key)
   - Environment: Production, Preview, Development 모두 선택

4. "Save" 클릭

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서
vercel env add NEXT_PUBLIC_SUPABASE_URL
# 프롬프트에 따라 값 입력

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# 프롬프트에 따라 값 입력

# 환경변수 배포
vercel --prod
```

## 3. 환경변수 확인

설정 후 다음을 확인하세요:

1. Vercel 대시보드 > Settings > Environment Variables
2. 설정한 변수들이 표시되는지 확인
3. 프로젝트를 다시 배포 (Redeploy)

## 4. 작동 방식

- **프로덕션 (Vercel)**: `/api/env` 엔드포인트를 통해 환경변수 제공
- **로컬 개발**: `config.js` 파일 사용 (Git에 커밋되지 않음)

## 5. 보안 주의사항

- `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트에서 접근 가능합니다
- Supabase anon key는 공개되어도 안전하지만, service_role key는 절대 공개하지 마세요
- `config.js` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다

## 6. 문제 해결

### 환경변수가 작동하지 않는 경우:

1. **환경변수 이름 확인**: `NEXT_PUBLIC_` 접두사가 있는지 확인
2. **재배포**: 환경변수 추가 후 반드시 재배포 필요
3. **브라우저 콘솔 확인**: 개발자 도구에서 오류 메시지 확인
4. **API 엔드포인트 테스트**: `/api/env` URL로 직접 접속하여 JSON 응답 확인

### 로컬 개발:

로컬에서는 `config.js` 파일을 사용합니다:
```javascript
// config.js
const SUPABASE_CONFIG = {
    url: 'https://xxxxx.supabase.co',
    anonKey: 'your-anon-key'
};
```
