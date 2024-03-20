const axios = require('axios');

// Переменные среды
const email = 'test@hezzl.com';
const password = '123456';
const baseUrl = 'https://api-prod.hezzl.com';
const campaignId = 145602;

// Метод CheckLogin
async function testCheckLogin() {
    try {
        // Отправляем запрос CheckLogin
        const startTime = Date.now();
        const response = await axios.post(`${baseUrl}/auth/v1/game/${campaignId}/check-login`, { login: email });
        const endTime = Date.now();

        // Проверка статуса ответа
        if (response.status === 200) {
            console.log('CheckLogin test passed');
        } else {
            console.error('CheckLogin test failed: Unexpected status code', response.status);
        }

        // Получаем тело ответа в формате JSON
        const jsonData = response.data;

        // Записываем значение параметра accessToken в переменную
        const accessToken = jsonData.accessToken;

        // Проверяем скорость ответа от сервера менее 200ms
        const responseTime = endTime - startTime;
        if (responseTime < 200) {
            console.log('Response time is less than 200ms');
        } else {
            console.error('Response time is greater than or equal to 200ms');
        }

        // Возвращаем результаты теста
        return {
            status: response.status,
            accessToken: accessToken,
            responseTime: responseTime
        };
    } catch (error) {
        console.error('CheckLogin test failed:', error.message);

        // Возвращаем результаты теста в случае ошибки
        return { error: error.message };
    }
}

// Вызываем тесты и выводим результаты
async function runTests() {
    const testResults = [];
    for (let i = 0; i < 5; i++) {
        console.log(`Test ${i + 1}:`);
        const result = await testCheckLogin();
        testResults.push(result);
    }
    console.log('Test results:', testResults);
}

// Запускаем тесты
runTests();