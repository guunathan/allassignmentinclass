<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            width: 100%;
            max-width: 500px;
            padding: 30px;
        }

        h1 {
            color: #667eea;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2em;
        }

        .input-section {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        #todoInput {
            flex: 1;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        #todoInput:focus {
            outline: none;
            border-color: #667eea;
        }

        .btn {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: 600;
        }

        .btn-add {
            background: #667eea;
            color: white;
        }

        .btn-add:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .filters {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            justify-content: center;
        }

        .filter-btn {
            padding: 8px 16px;
            background: #f5f5f5;
            color: #666;
            border: 2px solid transparent;
        }

        .filter-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .stats {
            text-align: center;
            margin-bottom: 20px;
            color: #666;
            font-size: 14px;
        }

        #todoList {
            list-style: none;
        }

        .todo-item {
            background: #f9f9f9;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s;
            animation: slideIn 0.3s;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .todo-item:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .todo-item.completed {
            opacity: 0.6;
        }

        .todo-item.completed .todo-text {
            text-decoration: line-through;
            color: #999;
        }

        .checkbox {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .todo-text {
            flex: 1;
            font-size: 16px;
            color: #333;
        }

        .btn-delete {
            background: #ff6b6b;
            color: white;
            padding: 6px 12px;
            font-size: 14px;
        }

        .btn-delete:hover {
            background: #ff5252;
        }

        .empty-state {
            text-align: center;
            padding: 40px;
            color: #999;
        }

        .empty-state svg {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
            opacity: 0.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 Todo List</h1>
        
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="เพิ่มงานใหม่...">
            <button class="btn btn-add" onclick="addTodo()">เพิ่ม</button>
        </div>

        <div class="filters">
            <button class="btn filter-btn active" onclick="filterTodos('all')">ทั้งหมด</button>
            <button class="btn filter-btn" onclick="filterTodos('active')">ยังไม่เสร็จ</button>
            <button class="btn filter-btn" onclick="filterTodos('completed')">เสร็จแล้ว</button>
        </div>

        <div class="stats" id="stats">
            งานที่เหลือ: 0
        </div>

        <ul id="todoList"></ul>
    </div>

    <script>
        // ตัวแปรเก็บข้อมูล
        let todos = [];
        let currentFilter = 'all';

        // ฟังก์ชันเพิ่ม Todo (ใช้ if-else)
        function addTodo() {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();

            // if-else condition
            if (text === '') {
                alert('กรุณากรอกงานที่ต้องการเพิ่ม');
                return;
            }

            // สร้าง todo object
            const todo = {
                id: Date.now(),
                text: text,
                completed: false
            };

            todos.push(todo);
            input.value = '';
            renderTodos();
        }

        // ฟังก์ชันลบ Todo
        function deleteTodo(id) {
            // ใช้ filter เพื่อลบ
            todos = todos.filter(todo => todo.id !== id);
            renderTodos();
        }

        // ฟังก์ชัน Toggle Complete (ใช้ for loop)
        function toggleTodo(id) {
            // for loop แบบธรรมดา
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    todos[i].completed = !todos[i].completed;
                    break;
                }
            }
            renderTodos();
        }

        // ฟังก์ชันกรอง (ใช้ switch statement)
        function filterTodos(filter) {
            currentFilter = filter;
            
            // อัพเดท active button
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            renderTodos();
        }

        // ฟังก์ชันแสดงผล
        function renderTodos() {
            const list = document.getElementById('todoList');
            list.innerHTML = '';

            // กรอง todos ตาม currentFilter (ใช้ switch)
            let filteredTodos;
            switch(currentFilter) {
                case 'active':
                    filteredTodos = todos.filter(todo => !todo.completed);
                    break;
                case 'completed':
                    filteredTodos = todos.filter(todo => todo.completed);
                    break;
                default:
                    filteredTodos = todos;
            }

            // ตรวจสอบว่ามี todo หรือไม่
            if (filteredTodos.length === 0) {
                list.innerHTML = `
                    <div class="empty-state">
                        <p>ไม่มีงานในรายการนี้</p>
                    </div>
                `;
            } else {
                // for...of loop
                for (const todo of filteredTodos) {
                    const li = document.createElement('li');
                    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                    li.innerHTML = `
                        <input type="checkbox" class="checkbox" 
                               ${todo.completed ? 'checked' : ''} 
                               onchange="toggleTodo(${todo.id})">
                        <span class="todo-text">${todo.text}</span>
                        <button class="btn btn-delete" onclick="deleteTodo(${todo.id})">ลบ</button>
                    `;
                    list.appendChild(li);
                }
            }

            updateStats();
        }

        // อัพเดทสถิติ
        function updateStats() {
            const activeTodos = todos.filter(todo => !todo.completed).length;
            document.getElementById('stats').textContent = `งานที่เหลือ: ${activeTodos}`;
        }

        // เพิ่ม Event Listener สำหรับ Enter key
        document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        // แสดงผลครั้งแรก
        renderTodos();
    </script>
</body>
</html>