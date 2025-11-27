<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Application</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .quiz-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            max-width: 600px;
            width: 100%;
            padding: 40px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        h1 {
            color: #f5576c;
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .timer {
            font-size: 1.5em;
            color: #333;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .progress-bar {
            height: 8px;
            background: #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 30px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #f093fb, #f5576c);
            width: 0%;
            transition: width 0.3s;
        }

        .loading {
            text-align: center;
            padding: 40px;
            font-size: 1.2em;
            color: #666;
        }

        .question-section {
            display: none;
        }

        .question-section.active {
            display: block;
        }

        .question-number {
            color: #f5576c;
            font-size: 1em;
            margin-bottom: 10px;
        }

        .question-text {
            font-size: 1.3em;
            color: #333;
            margin-bottom: 25px;
            line-height: 1.6;
        }

        .options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .option {
            padding: 15px 20px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            background: white;
        }

        .option:hover {
            border-color: #f5576c;
            background: #fff5f7;
            transform: translateX(5px);
        }

        .option.selected {
            border-color: #f5576c;
            background: #f5576c;
            color: white;
        }

        .navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            gap: 15px;
        }

        .btn {
            padding: 12px 30px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
        }

        .btn-primary {
            background: #f5576c;
            color: white;
            flex: 1;
        }

        .btn-primary:hover {
            background: #e04558;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
        }

        .btn-secondary {
            background: #e0e0e0;
            color: #666;
        }

        .btn-secondary:hover {
            background: #d0d0d0;
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .result-section {
            display: none;
            text-align: center;
        }

        .result-section.active {
            display: block;
        }

        .score-display {
            font-size: 4em;
            color: #f5576c;
            margin: 30px 0;
            font-weight: bold;
        }

        .result-message {
            font-size: 1.5em;
            color: #333;
            margin-bottom: 30px;
        }

        .stats {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }

        .stat-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .stat-item:last-child {
            border-bottom: none;
        }
    </style>
</head>
<body>
    <div class="quiz-container">
        <div class="header">
            <h1>🎯 Quiz Challenge</h1>
            <div class="timer" id="timer">เวลา: 00:00</div>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>

        <div class="loading" id="loading">
            กำลังโหลดคำถาม...
        </div>

        <div class="question-section" id="questionSection">
            <div class="question-number" id="questionNumber"></div>
            <div class="question-text" id="questionText"></div>
            <div class="options" id="options"></div>
            <div class="navigation">
                <button class="btn btn-secondary" id="prevBtn" onclick="previousQuestion()">ก่อนหน้า</button>
                <button class="btn btn-primary" id="nextBtn" onclick="nextQuestion()">ถัดไป</button>
            </div>
        </div>

        <div class="result-section" id="resultSection">
            <h2>🎊 ผลการทดสอบ</h2>
            <div class="score-display" id="scoreDisplay"></div>
            <div class="result-message" id="resultMessage"></div>
            <div class="stats" id="stats"></div>
            <button class="btn btn-primary" onclick="restartQuiz()">ทำแบบทดสอบอีกครั้ง</button>
        </div>
    </div>

    <script>
        // ข้อมูลคำถาม (จำลองการดึงจาก API)
        const quizData = [
            {
                question: "JavaScript ย่อมาจากอะไร?",
                options: ["Java Script", "Just Script", "JavaScript เป็นชื่อเต็มอยู่แล้ว", "Joint Script"],
                correct: 2
            },
            {
                question: "คำสั่งใดใช้สำหรับประกาศตัวแปรที่ไม่สามารถเปลี่ยนค่าได้?",
                options: ["var", "let", "const", "static"],
                correct: 2
            },
            {
                question: "Array.map() ใช้ทำอะไร?",
                options: ["ลบข้อมูล", "เปลี่ยนแปลงทุกตัวใน array", "เรียงข้อมูล", "รวมข้อมูล"],
                correct: 1
            },
            {
                question: "Promise ใน JavaScript ใช้ทำอะไร?",
                options: ["จัดการ Error", "จัดการ Async Operations", "ประกาศตัวแปร", "สร้าง Object"],
                correct: 1
            },
            {
                question: "typeof null จะได้ผลลัพธ์เป็นอะไร?",
                options: ["null", "undefined", "object", "number"],
                correct: 2
            }
        ];

        let currentQuestion = 0;
        let userAnswers = [];
        let timerSeconds = 0;
        let timerInterval;
        let startTime;

        // Async function จำลองการโหลดข้อมูล
        async function loadQuestions() {
            const loading = document.getElementById('loading');
            
            // จำลอง delay การโหลด (ใช้ Promise และ setTimeout)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // ซ่อน loading แสดง quiz
            loading.style.display = 'none';
            document.getElementById('questionSection').classList.add('active');
            
            // เริ่มจับเวลา
            startTimer();
            
            // แสดงคำถามแรก
            renderQuestion();
        }

        // ฟังก์ชันจับเวลา (ใช้ setInterval - async pattern)
        function startTimer() {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                timerSeconds++;
                const minutes = Math.floor(timerSeconds / 60);
                const seconds = timerSeconds % 60;
                document.getElementById('timer').textContent = 
                    `เวลา: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }, 1000);
        }

        // ฟังก์ชันหยุดจับเวลา
        function stopTimer() {
            clearInterval(timerInterval);
        }

        // แสดงคำถาม
        function renderQuestion() {
            const q = quizData[currentQuestion];
            
            document.getElementById('questionNumber').textContent = 
                `คำถามที่ ${currentQuestion + 1} จาก ${quizData.length}`;
            document.getElementById('questionText').textContent = q.question;
            
            // สร้างตัวเลือก (ใช้ for loop)
            const optionsDiv = document.getElementById('options');
            optionsDiv.innerHTML = '';
            
            for (let i = 0; i < q.options.length; i++) {
                const option = document.createElement('div');
                option.className = 'option';
                option.textContent = q.options[i];
                
                // if-else: ตรวจสอบว่าเลือกไว้หรือไม่
                if (userAnswers[currentQuestion] === i) {
                    option.classList.add('selected');
                }
                
                option.onclick = () => selectOption(i);
                optionsDiv.appendChild(option);
            }
            
            // อัพเดท progress bar
            const progress = ((currentQuestion + 1) / quizData.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            
            // จัดการปุ่ม
            document.getElementById('prevBtn').disabled = currentQuestion === 0;
            document.getElementById('nextBtn').textContent = 
                currentQuestion === quizData.length - 1 ? 'ส่งคำตอบ' : 'ถัดไป';
        }

        // เลือกตัวเลือก
        function selectOption(index) {
            userAnswers[currentQuestion] = index;
            renderQuestion();
        }

        // คำถามถัดไป
        function nextQuestion() {
            // if-else: ตรวจสอบว่าเป็นคำถามสุดท้ายหรือไม่
            if (currentQuestion < quizData.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                // ส่งคำตอบและแสดงผล
                showResults();
            }
        }

        // คำถามก่อนหน้า
        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion();
            }
        }

        // แสดงผลลัพธ์
        function showResults() {
            stopTimer();
            
            document.getElementById('questionSection').classList.remove('active');
            document.getElementById('resultSection').classList.add('active');
            
            // คำนวณคะแนน (ใช้ for loop และ if-else)
            let correctAnswers = 0;
            
            for (let i = 0; i < quizData.length; i++) {
                if (userAnswers[i] === quizData[i].correct) {
                    correctAnswers++;
                }
            }
            
            const score = (correctAnswers / quizData.length) * 100;
            
            // แสดงคะแนน
            document.getElementById('scoreDisplay').textContent = 
                `${correctAnswers}/${quizData.length}`;
            
            // ข้อความตามคะแนน (ใช้ if-else if-else)
            let message;
            if (score === 100) {
                message = '🏆 เยี่ยมมาก! คุณได้คะแนนเต็ม!';
            } else if (score >= 80) {
                message = '🎉 ดีมาก! คุณทำได้ดีเยี่ยม!';
            } else if (score >= 60) {
                message = '👍 ดีใช้ได้! ผ่านเกณฑ์แล้ว!';
            } else if (score >= 40) {
                message = '📚 ควรอ่านเพิ่มเติมนะครับ';
            } else {
                message = '💪 ลองอีกครั้งไหมครับ?';
            }
            
            document.getElementById('resultMessage').textContent = message;
            
            // แสดงสถิติ
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            const timeStr = `${minutes} นาที ${seconds} วินาที`;
            
            document.getElementById('stats').innerHTML = `
                <div class="stat-item">
                    <span>คะแนนที่ได้:</span>
                    <strong>${correctAnswers} / ${quizData.length}</strong>
                </div>
                <div class="stat-item">
                    <span>เปอร์เซ็นต์:</span>
                    <strong>${score.toFixed(1)}%</strong>
                </div>
                <div class="stat-item">
                    <span>เวลาที่ใช้:</span>
                    <strong>${timeStr}</strong>
                </div>
                <div class="stat-item">
                    <span>ตอบผิด:</span>
                    <strong>${quizData.length - correctAnswers} ข้อ</strong>
                </div>
            `;
        }

        // เริ่มใหม่
        function restartQuiz() {
            currentQuestion = 0;
            userAnswers = [];
            timerSeconds = 0;
            
            document.getElementById('resultSection').classList.remove('active');
            document.getElementById('loading').style.display = 'block';
            
            loadQuestions();
        }

        // เริ่มต้น (ใช้ async/await)
        window.onload = async () => {
            await loadQuestions();
        };
    </script>
</body>
</html>