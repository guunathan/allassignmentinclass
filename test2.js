<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Interaction Demo</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background: #f4f4f4;
        padding: 40px;
    }

    .card {
        width: 280px;
        padding: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        text-align: center;
        margin-bottom: 30px;
        transition: 0.3s;
    }

    .btn {
        padding: 10px 18px;
        border: none;
        border-radius: 6px;
        background: #007bff;
        color: white;
        cursor: pointer;
        margin-top: 10px;
        transition: 0.2s;
    }

    .btn:hover {
        background: #005fcc;
    }

    .highlight {
        background: #ffe6a9 !important;
    }

    #result {
        margin-top: 15px;
        font-weight: bold;
        color: #333;
    }
</style>
</head>
<body>

<h2>JavaScript Interaction Demo</h2>

<div class="card" id="cardBox">
    <h3>Event Listener Tester</h3>

    <input type="text" id="inputName" placeholder="พิมพ์ชื่อของคุณ..." />
    <br><br>

    <button id="btnCheck" class="btn">ตรวจสอบชื่อ</button>

    <div id="result"></div>
</div>

<script>
// ======================
// 1) ใช้ event listener
// ======================

// element ต่าง ๆ
const card = document.getElementById("cardBox");
const inputName = document.getElementById("inputName");
const btnCheck = document.getElementById("btnCheck");
const result = document.getElementById("result");

// ------------------------------
// 2) mouseover / mouseout event
// ------------------------------
card.addEventListener("mouseover", function () {
    card.classList.add("highlight");
});

card.addEventListener("mouseout", function () {
    card.classList.remove("highlight");
});

// ------------------------------
// 3) click event + nested function
// ------------------------------
btnCheck.addEventListener("click", function () {

    // ฟังก์ชันซ้อนฟังก์ชัน (nested function)
    function validateName(name) {
        function isEmpty(text) {
            return text.trim().length === 0;
        }
        return !isEmpty(name);
    }

    const nameValue = inputName.value;

    // ใช้ if-else + alert
    if (validateName(nameValue)) {
        result.textContent = "สวัสดีคุณ " + nameValue + " 😀";
    } else {
        alert("ชื่อว่าง! กรุณาพิมพ์ชื่อก่อนกดปุ่ม");
        result.textContent = "";
    }
});

// ------------------------------
// 4) input event
// ------------------------------
inputName.addEventListener("input", function() {
    if (inputName.value.length > 10) {
        result.textContent = "ชื่อยาวมากเลยนะ!";
    } else {
        result.textContent = "";
    }
});

</script>

</body>
</html>
