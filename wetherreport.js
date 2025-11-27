<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Forecast App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(to bottom, #1e3c72, #2a5298);
            min-height: 100vh;
            padding: 20px;
            color: white;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .search-section {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }

        .search-box {
            display: flex;
            gap: 15px;
            max-width: 600px;
            margin: 0 auto;
        }

        .search-input {
            flex: 1;
            padding: 15px 20px;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            background: white;
            color: #333;
        }

        .search-input:focus {
            outline: 2px solid #64b5f6;
        }

        .btn {
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
            font-size: 16px;
        }

        .btn-search {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }

        .btn-search:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-search:disabled {
            background: #999;
            cursor: not-allowed;
        }

        .quick-cities {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
            flex-wrap: wrap;
        }

        .city-chip {
            padding: 8px 16px;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
        }

        .city-chip:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }

        /* Weather Cards */
        .weather-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .weather-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            animation: fadeIn 0.5s;
            position: relative;
            overflow: hidden;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .weather-card::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 3s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }

        .card-content {
            position: relative;
            z-index: 1;
        }

        .weather-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .city-name {
            font-size: 1.8em;
            font-weight: bold;
        }

        .btn-close {
            background: rgba(255,255,255,0.2);
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            color: white;
            transition: all 0.3s;
        }

        .btn-close:hover {
            background: rgba(255,255,255,0.3);
            transform: rotate(90deg);
        }

        .weather-icon {
            font-size: 5em;
            text-align: center;
            margin: 20px 0;
        }

        .temperature {
            font-size: 3.5em;
            font-weight: bold;
            text-align: center;
            margin-bottom: 10px;
        }

        .weather-description {
            text-align: center;
            font-size: 1.2em;
            margin-bottom: 20px;
            opacity: 0.9;
        }

        .weather-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .detail-item {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
        }

        .detail-label {
            font-size: 0.9em;
            opacity: 0.8;
            margin-bottom: 5px;
        }

        .detail-value {
            font-size: 1.3em;
            font-weight: bold;
        }

        /* Loading */
        .loading-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 60px;
            text-align: center;
        }

        .spinner {
            width: 60px;
            height: 60px;
            border: 5px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            margin: 0 auto 20px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Error */
        .error-card {
            background: rgba(255,87,87,0.2);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            border: 2px solid rgba(255,87,87,0.5);
        }

        .error-icon {
            font-size: 4em;
            margin-bottom: 20px;
        }

        .empty-state {
            text-align: center;
            padding: 80px 20px;
            opacity: 0.6;
        }

        .empty-icon {
            font-size: 5em;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌤️ พยากรณ์อากาศ</h1>
            <p>ค้นหาสภาพอากาศในเมืองต่างๆ</p>
        </div>

        <div class="search-section">
            <div class="search-box">
                <input type="text" id="cityInput" class="search-input" 
                       placeholder="กรอกชื่อเมือง... (เช่น Bangkok, Tokyo, London)">
                <button class="btn btn-search" id="searchBtn" onclick="searchWeather()">
                    🔍 ค้นหา
                </button>
            </div>
            
            <div class="quick-cities">
                <span style="opacity: 0.8;">เมืองยอดนิยม:</span>
                <div class="city-chip" onclick="quickSearch('Bangkok')">🇹🇭 Bangkok</div>
                <div class="city-chip" onclick="quickSearch('Tokyo')">🇯🇵 Tokyo</div>
                <div class="city-chip" onclick="quickSearch('London')">🇬🇧 London</div>
                <div class="city-chip" onclick="quickSearch('New York')">🇺🇸 New York</div>
                <div class="city-chip" onclick="quickSearch('Paris')">🇫🇷 Paris</div>
            </div>
        </div>

        <div class="weather-grid" id="weatherGrid"></div>
    </div>

    <script>
        // ==========================================
        // DATA & STATE
        // ==========================================

        let weatherData = [];
        let isLoading = false;

        // จำลองข้อมูลสภาพอากาศ
        const mockWeatherDatabase = {
            'bangkok': {
                city: 'Bangkok',
                country: 'Thailand',
                temp: 32,
                feels_like: 38,
                humidity: 75,
                wind_speed: 12,
                description: 'แดดร้อน อากาศชื้น',
                icon: '☀️',
                pressure: 1012
            },
            'tokyo': {
                city: 'Tokyo',
                country: 'Japan',
                temp: 18,
                feels_like: 16,
                humidity: 65,
                wind_speed: 8,
                description: 'มีเมฆบางส่วน',
                icon: '⛅',
                pressure: 1015
            },
            'london': {
                city: 'London',
                country: 'UK',
                temp: 12,
                feels_like: 10,
                humidity: 80,
                wind_speed: 15,
                description: 'ฝนตกปรอยๆ',
                icon: '🌧️',
                pressure: 1008
            },
            'new york': {
                city: 'New York',
                country: 'USA',
                temp: 22,
                feels_like: 21,
                humidity: 55,
                wind_speed: 10,
                description: 'อากาศแจ่มใส',
                icon: '🌤️',
                pressure: 1013
            },
            'paris': {
                city: 'Paris',
                country: 'France',
                temp: 15,
                feels_like: 14,
                humidity: 70,
                wind_speed: 11,
                description: 'มีเมฆมาก',
                icon: '☁️',
                pressure: 1010
            },
            'singapore': {
                city: 'Singapore',
                country: 'Singapore',
                temp: 30,
                feels_like: 35,
                humidity: 85,
                wind_speed: 8,
                description: 'ฝนฟ้าคะนอง',
                icon: '⛈️',
                pressure: 1011
            },
            'sydney': {
                city: 'Sydney',
                country: 'Australia',
                temp: 25,
                feels_like: 24,
                humidity: 60,
                wind_speed: 14,
                description: 'สดใส มีลมพัด',
                icon: '🌬️',
                pressure: 1016
            }
        };

        // ==========================================
        // API SIMULATION (ใช้ Promise และ async/await)
        // ==========================================

        function fetchWeatherData(city) {
            return new Promise((resolve, reject) => {
                // จำลอง network delay
                setTimeout(() => {
                    const cityLower = city.toLowerCase().trim();
                    const data = mockWeatherDatabase[cityLower];

                    // ใช้ if-else ตรวจสอบ
                    if (data) {
                        // สุ่มอุณหภูมิเล็กน้อยเพื่อความสมจริง
                        const randomTemp = data.temp + Math.floor(Math.random() * 3 - 1);
                        resolve({
                            ...data,
                            temp: randomTemp,
                            timestamp: Date.now()
                        });
                    } else {
                        reject('ไม่พบข้อมูลเมืองนี้');
                    }
                }, 1500);
            });
        }

        // ==========================================
        // SEARCH WEATHER (ใช้ async/await และ try-catch)
        // ==========================================

        async function searchWeather() {
            const input = document.getElementById('cityInput');
            const city = input.value.trim();

            // Validation (ใช้ if-else)
            if (!city) {
                alert('⚠️ กรุณากรอกชื่อเมือง');
                return;
            }

            // ตรวจสอบซ้ำ
            const exists = weatherData.find(w => 
                w.city.toLowerCase() === city.toLowerCase()
            );

            if (exists) {
                alert('📍 เมืองนี้มีอยู่ในรายการแล้ว');
                return;
            }

            // เริ่มโหลด
            isLoading = true;
            renderLoading();

            // Disable button
            const btn = document.getElementById('searchBtn');
            btn.disabled = true;
            btn.textContent = '⏳ กำลังค้นหา...';

            try {
                // เรียก API (ใช้ await)
                const data = await fetchWeatherData(city);
                
                // เพิ่มข้อมูล
                weatherData.push(data);
                
                // แสดงผล
                renderWeatherCards();
                
                // Clear input
                input.value = '';

            } catch (error) {
                // Error handling
                renderError(error);
                
                // ลบ error หลัง 3 วินาที
                setTimeout(() => {
                    renderWeatherCards();
                }, 3000);

            } finally {
                // คืนค่าปุ่ม
                isLoading = false;
                btn.disabled = false;
                btn.textContent = '🔍 ค้นหา';
            }
        }

        // ==========================================
        // QUICK SEARCH
        // ==========================================

        async function quickSearch(city) {
            document.getElementById('cityInput').value = city;
            await searchWeather();
        }

        // ==========================================
        // REMOVE CITY
        // ==========================================

        function removeCity(index) {
            // ใช้ filter
            weatherData = weatherData.filter((_, i) => i !== index);
            renderWeatherCards();
        }

        // ==========================================
        // RENDER FUNCTIONS (ใช้ for loop, switch)
        // ==========================================

        function renderLoading() {
            const grid = document.getElementById('weatherGrid');
            grid.innerHTML = `
                <div class="loading-card">
                    <div class="spinner"></div>
                    <p style="font-size: 1.2em;">กำลังโหลดข้อมูลสภาพอากาศ...</p>
                </div>
            `;
        }

        function renderError(message) {
            const grid = document.getElementById('weatherGrid');
            const errorHtml = `
                <div class="error-card">
                    <div class="error-icon">❌</div>
                    <h2>เกิดข้อผิดพลาด</h2>
                    <p style="margin-top: 10px; font-size: 1.1em;">${message}</p>
                    <p style="margin-top: 10px; opacity: 0.8;">กรุณาลองใหม่อีกครั้ง</p>
                </div>
            `;

            if (weatherData.length === 0) {
                grid.innerHTML = errorHtml;
            } else {
                grid.insertAdjacentHTML('afterbegin', errorHtml);
            }
        }

        function renderWeatherCards() {
            const grid = document.getElementById('weatherGrid');

            // Empty state
            if (weatherData.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <div class="empty-icon">🌍</div>
                        <h2>ยังไม่มีข้อมูลสภาพอากาศ</h2>
                        <p style="margin-top: 10px; opacity: 0.8;">
                            ค้นหาเมืองเพื่อดูพยากรณ์อากาศ
                        </p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = '';

            // Render cards (ใช้ for loop)
            for (let i = 0; i < weatherData.length; i++) {
                const weather = weatherData[i];
                const card = createWeatherCard(weather, i);
                grid.appendChild(card);
            }
        }

        function createWeatherCard(weather, index) {
            const card = document.createElement('div');
            card.className = 'weather-card';

            // กำหนดสีตามอุณหภูมิ (ใช้ if-else if-else)
            let bgColor;
            if (weather.temp >= 30) {
                bgColor = 'rgba(255, 87, 51, 0.2)'; // ร้อน
            } else if (weather.temp >= 20) {
                bgColor = 'rgba(255, 193, 7, 0.2)'; // อบอุ่น
            } else if (weather.temp >= 10) {
                bgColor = 'rgba(3, 169, 244, 0.2)'; // เย็น
            } else {
                bgColor = 'rgba(63, 81, 181, 0.2)'; // หนาว
            }

            card.style.background = bgColor;

            card.innerHTML = `
                <div class="card-content">
                    <div class="weather-header">
                        <div class="city-name">${weather.city}, ${weather.country}</div>
                        <button class="btn-close" onclick="removeCity(${index})">×</button>
                    </div>

                    <div class="weather-icon">${weather.icon}</div>
                    <div class="temperature">${weather.temp}°C</div>
                    <div class="weather-description">${weather.description}</div>

                    <div class="weather-details">
                        <div class="detail-item">
                            <div class="detail-label">รู้สึกเหมือน</div>
                            <div class="detail-value">${weather.feels_like}°C</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">ความชื้น</div>
                            <div class="detail-value">${weather.humidity}%</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">ความเร็วลม</div>
                            <div class="detail-value">${weather.wind_speed} km/h</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">ความกดอากาศ</div>
                            <div class="detail-value">${weather.pressure} hPa</div>
                        </div>
                    </div>
                </div>
            `;

            return card;
        }

        // ==========================================
        // AUTO-REFRESH (ใช้ setInterval และ async)
        // ==========================================

        async function refreshWeatherData() {
            // ถ้ามีข้อมูล
            if (weatherData.length === 0) return;

            console.log('🔄 Refreshing weather data...');

            // Refresh แต่ละเมือง (ใช้ for loop)
            for (let i = 0; i < weatherData.length; i++) {
                try {
                    const city = weatherData[i].city;
                    const newData = await fetchWeatherData(city);
                    weatherData[i] = newData;
                } catch (error) {
                    console.error(`Failed to refresh ${weatherData[i].city}:`, error);
                }
            }

            renderWeatherCards();
        }

        // Refresh ทุก 30 วินาที
        setInterval(refreshWeatherData, 30000);

        // ==========================================
        // EVENT LISTENERS
        // ==========================================

        document.getElementById('cityInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });

        // ==========================================
        // INITIALIZE
        // ==========================================

        function init() {
            renderWeatherCards();
            
            // โหลดเมืองเริ่มต้น
            setTimeout(() => {
                quickSearch('Bangkok');
            }, 500);
        }

        window.onload = init;
    </script>
</body>
</html>