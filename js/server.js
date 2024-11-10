const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// AI API와의 통신 로직
app.post('/generate-plan', (req, res) => {
    const travelData = req.body;

    // AI API에 요청 전송 (예제용)
    // 실제 API URL과 인증을 적용해야 함
    fetch('https://example-ai-api.com/plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(travelData)
    })
    .then(response => response.json())
    .then(data => {
        res.json(data); // 클라이언트에 JSON 응답 전송
    })
    .catch(error => {
        console.error('AI API 요청 오류:', error);
        res.status(500).send('AI API 요청 실패');
    });
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
