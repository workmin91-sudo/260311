# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. https://supabase.com 접속
2. 새 프로젝트 생성
3. 프로젝트 이름: `pokelotto` (또는 원하는 이름)
4. 데이터베이스 비밀번호 설정 (기억해두세요!)

## 2. 데이터베이스 테이블 생성

Supabase 대시보드에서 SQL Editor로 이동 후 다음 SQL 실행:

```sql
-- 추첨 번호 저장 테이블
CREATE TABLE IF NOT EXISTS lotto_numbers (
  id BIGSERIAL PRIMARY KEY,
  numbers INTEGER[] NOT NULL,
  set_count INTEGER DEFAULT 1,
  pokemon_ids INTEGER[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_ip TEXT,
  user_agent TEXT
);

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_lotto_numbers_created_at ON lotto_numbers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lotto_numbers_numbers ON lotto_numbers USING GIN(numbers);

-- Row Level Security (RLS) 활성화
ALTER TABLE lotto_numbers ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기/쓰기 가능하도록 정책 설정
CREATE POLICY "Allow public read access" ON lotto_numbers
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON lotto_numbers
  FOR INSERT WITH CHECK (true);
```

## 3. Supabase API 키 확인

1. Supabase 대시보드 > Settings > API
2. 다음 정보 복사:
   - Project URL (예: https://xxxxx.supabase.co)
   - anon/public key

## 4. config.js 파일 생성

프로젝트 루트에 `config.js` 파일을 생성하고 위에서 복사한 정보를 입력하세요.
