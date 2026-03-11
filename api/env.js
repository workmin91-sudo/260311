// Vercel Serverless Function - 환경변수 제공 API
// 이 파일은 Vercel에서 서버 사이드로 환경변수를 제공합니다

export default function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');
    
    // Vercel 환경변수에서 Supabase 설정 읽기
    const config = {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
    };
    
    // 환경변수가 설정되어 있으면 반환
    if (config.url && config.anonKey) {
        res.status(200).json(config);
    } else {
        res.status(200).json({
            url: '',
            anonKey: '',
            message: '환경변수가 설정되지 않았습니다.'
        });
    }
}
