const axios = require('axios');

// Переменные среды
const baseUrl = 'https://api-prod.hezzl.com';
const campaignId = 145602;

// Метод Init
async function testInit() {
    try {
        // Отправляем запрос Init
        const startTime = Date.now();
        const response = await axios.get(`${baseUrl}/gw/v1/game/${campaignId}/init`);
        const endTime = Date.now();

        // Проверка статуса ответа
        if (response.status === 200) {
            console.log('Init test passed');
        } else {
            console.error('Init test failed: Unexpected status code', response.status);
        }

        // Получаем тело ответа в формате JSON
        const jsonData = response.data;

        // Записываем значение параметра time в переменную timeZone
        const timeZone = jsonData.time;

        // Проверяем наличие параметра data в ответе
        if (jsonData.hasOwnProperty('data')) {
            console.log('Data parameter exists');
        } else {
            console.error('Data parameter does not exist');
        }

        // Проверяем наличие параметра auth в data в ответе
        if (jsonData.data.hasOwnProperty('auth')) {
            console.log('Auth parameter exists in data');
        } else {
            console.error('Auth parameter does not exist in data');
        }

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
            timeZone: timeZone,
            responseTime: responseTime
        };
    } catch (error) {
        console.error('Init test failed:', error.message);

        // Возвращаем результаты теста в случае ошибки
        return { error: error.message };
    }
}

// Вызываем тесты и выводим результаты
async function runTests() {
    const testResults = [];
    for (let i = 0; i < 4; i++) { // Исправлено на 4 теста
        console.log(`Test ${i + 1}:`);
        const result = await testInit();
        testResults.push(result);
    }
    console.log('Test results:', testResults);
}

// Запускаем тесты
runTests();