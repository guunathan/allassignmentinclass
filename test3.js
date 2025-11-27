<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Advanced JS Interaction</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: #eef1f5;
        padding: 40px;
    }
    .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        background: white;
        border-radius: 14px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    input, select, textarea {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #ccc;
        margin-bottom: 15px;
    }
    button {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        background: #007bff;
        color: white;
        cursor: pointer;
        transition: 0.2s;
    }
    button:hover {
        background: #005fcc;
    }
    .box {
        background: #f7f7f7;
        padding: 20px;
        border-radius: 10px;
        margin-top: 20px;
        transition: 0.3s;
    }
    .highlight {
        background: #ffe8b2 !important;
    }
    #logList {
        margin-top: 20px;
        padding: 10px;
        background: #eef;
        border-radius: 10px;
        max-height: 200px;
        overflow-y: auto;
    }
</style>
</head>
<body>

<div class="container">
    <h2>Advanced JavaScript Interaction Demo</h2>

    <label>ชื่อของคุณ</label>
    <input type="text" id="nameInput" placeholder="พิมพ์ชื่อ...">

    <label>อายุของคุณ</label>
    <input type="number" id="ageInput" placeholder="พิมพ์อายุ...">

    <label>เลือกอารมณ์วันนี้</label>
    <select id="moodSelect">
        <option value="">-- เลือก --</option>
        <option value="happy">😊 ดีใจ</option>
        <option value="sad">😢 เศร้า</option>
        <option value="angry">😡 โกรธ</option>
        <option value="sleepy">😴 ง่วง</option>
    </select>

    <label>ข้อความเพิ่มเติม</label>
    <textarea id="msgInput"></textarea>

    <label>ใส่ตัวเลขเพื่อทายผล (1–10)</label>
    <input type="number" id="guessInput">

    <button id="submitBtn">ส่งข้อมูล</button>
    <button id="clearBtn">เคลียร์ข้อมูล</button>

    <div class="box" id="resultBox">
        <h3>ผลลัพธ์</h3>
        <p id="resultMsg">กรอกข้อมูลด้านบนก่อนนะครับ</p>
    </div>

    <h3>System Log</h3>
    <div id="logList"></div>
</div>

<script>
/* =======================================================
   1) เก็บข้อมูลผู้ใช้แบบ Object + Array
======================================================= */
let userData = {
    name: "",
    age: 0,
    mood: "",
    extra: "",
    guess: 0
};
let logs = [];

/* =======================================================
   2) การอ้างอิง element
======================================================= */
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const moodSelect = document.getElementById("moodSelect");
const msgInput = document.getElementById("msgInput");
const guessInput = document.getElementById("guessInput");

const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const resultMsg = document.getElementById("resultMsg");
const resultBox = document.getElementById("resultBox");
const logList = document.getElementById("logList");

/* =======================================================
   3) Mouse Event: highlight box
======================================================= */
resultBox.addEventListener("mouseover", () => {
    resultBox.classList.add("highlight");
});
resultBox.addEventListener("mouseout", () => {
    resultBox.classList.remove("highlight");
});

/* =======================================================
   4) Key Events: typing detect
======================================================= */
nameInput.addEventListener("keyup", () => {
    addLog("กำลังพิมพ์ชื่อ...");
});
msgInput.addEventListener("keydown", () => {
    addLog("กำลังพิมพ์ข้อความ...");
});

/* =======================================================
   5) ฟังก์ชันสำหรับเพิ่ม log
======================================================= */
function addLog(text) {
    logs.push(text);

    const div = document.createElement("div");
    div.textContent = text;
    logList.appendChild(div);
}

/* =======================================================
   6) Nested Function แบบ 3 ชั้น
======================================================= */
function processData() {

    function validate() {

        function isEmpty(value) {
            return value.trim().length === 0;
        }

        if (isEmpty(nameInput.value)) return "ชื่อว่าง";
        if (ageInput.value <= 0) return "อายุต้องมากกว่า 0";
        if (moodSelect.value === "") return "ยังไม่ได้เลือกอารมณ์";
        if (guessInput.value < 1 || guessInput.value > 10) return "ตัวเลขต้อง 1–10";

        return "ok";
    }

    const result = validate();
    if (result !== "ok") {
        alert("Error: " + result);
        return false;
    }
    return true;
}

/* =======================================================
   7) Click Event: Submit
======================================================= */
submitBtn.addEventListener("click", () => {

    if (!processData()) return;

    // รับข้อมูลเข้าวัตถุ
    userData.name = nameInput.value;
    userData.age = parseInt(ageInput.value);
    userData.mood = moodSelect.value;
    userData.extra = msgInput.value;
    userData.guess = parseInt(guessInput.value);

    const randomNumber = Math.floor(Math.random() * 10) + 1;

    let message = "";

    // conditional ซับซ้อนหลายชั้น
    if (userData.guess === randomNumber) {
        message += "🎉 คุณทายถูก! เลขคือ " + randomNumber + "<br>";
    } else {
        message += "❌ ทายผิด! เลขที่ถูกต้องคือ " + randomNumber + "<br>";
    }

    if (userData.age < 18) {
        message += "คุณยังเป็นผู้เยาว์<br>";
    } else {
        message += "คุณเป็นผู้ใหญ่แล้ว<br>";
    }

    // แสดงอารมณ์
    if (userData.mood === "happy") message += "วันนี้คุณดูสดใสมาก 😊<br>";
    if (userData.mood === "sad")   message += "ขอให้กำลังใจนะครับ 😢<br>";
    if (userData.mood === "angry") message += "ใจเย็นๆ นะครับ 😡<br>";
    if (userData.mood === "sleepy") message += "พักผ่อนด้วยนะ 😴<br>";

    // Delay effect (timer)
    resultMsg.innerHTML = "Processing...";
    setTimeout(() => {
        resultMsg.innerHTML = message;
        addLog("Submit ข้อมูลสำเร็จ");
    }, 700);

});

/* =======================================================
   8) dblclick event: เคลียร์ผลลัพธ์
======================================================= */
clearBtn.addEventListener("dblclick", () => {
    resultMsg.textContent = "กรอกข้อมูลด้านบนก่อนนะครับ";
    logList.innerHTML = "";
    logs = [];
    addLog("เคลียร์ข้อมูลทั้งหมดแล้ว");
});
</script>

</body>
</html>
