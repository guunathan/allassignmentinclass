<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grade Management System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .main-grid {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 20px;
        }

        .card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        h2 {
            color: #0083b0;
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        /* Form Styles */
        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: 600;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s;
        }

        .form-control:focus {
            outline: none;
            border-color: #00b4db;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            font-size: 14px;
        }

        .btn-primary {
            background: #00b4db;
            color: white;
            width: 100%;
        }

        .btn-primary:hover {
            background: #0083b0;
            transform: translateY(-2px);
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn-danger {
            background: #dc3545;
            color: white;
        }

        .btn-success {
            background: #28a745;
            color: white;
        }

        .btn-sm {
            padding: 6px 12px;
            font-size: 12px;
        }

        /* Controls */
        .controls {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .search-box {
            flex: 1;
            min-width: 200px;
        }

        .filter-select {
            padding: 10px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            min-width: 150px;
        }

        /* Statistics */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: linear-gradient(135deg, #00b4db, #0083b0);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }

        .stat-value {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 0.9em;
            opacity: 0.9;
        }

        /* Table */
        .table-container {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead {
            background: #f8f9fa;
        }

        th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #333;
            cursor: pointer;
            user-select: none;
        }

        th:hover {
            background: #e9ecef;
        }

        th.sortable::after {
            content: ' ⇅';
            opacity: 0.3;
        }

        th.sort-asc::after {
            content: ' ↑';
            opacity: 1;
        }

        th.sort-desc::after {
            content: ' ↓';
            opacity: 1;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }

        tbody tr {
            transition: background 0.2s;
        }

        tbody tr:hover {
            background: #f8f9fa;
        }

        .grade-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9em;
        }

        .grade-A { background: #d4edda; color: #155724; }
        .grade-B { background: #d1ecf1; color: #0c5460; }
        .grade-C { background: #fff3cd; color: #856404; }
        .grade-D { background: #f8d7da; color: #721c24; }
        .grade-F { background: #f8d7da; color: #721c24; }

        .action-buttons {
            display: flex;
            gap: 5px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #999;
        }

        .empty-state-icon {
            font-size: 4em;
            margin-bottom: 20px;
        }

        @media (max-width: 968px) {
            .main-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 ระบบจัดการเกรดนักเรียน</h1>
            <p>Student Grade Management System</p>
        </div>

        <div class="main-grid">
            <!-- Form Section -->
            <div class="card">
                <h2>➕ เพิ่มนักเรียน</h2>
                <div class="form-group">
                    <label>รหัสนักเรียน</label>
                    <input type="text" id="studentId" class="form-control" placeholder="เช่น 65010001">
                </div>
                <div class="form-group">
                    <label>ชื่อ-นามสกุล</label>
                    <input type="text" id="studentName" class="form-control" placeholder="เช่น สมชาย ใจดี">
                </div>
                <div class="form-group">
                    <label>วิชา</label>
                    <input type="text" id="subject" class="form-control" placeholder="เช่น JavaScript">
                </div>
                <div class="form-group">
                    <label>คะแนน (0-100)</label>
                    <input type="number" id="score" class="form-control" min="0" max="100" placeholder="เช่น 85">
                </div>
                <button class="btn btn-primary" onclick="addStudent()">เพิ่มนักเรียน</button>

                <div style="margin-top: 30px;">
                    <h3 style="color: #0083b0; margin-bottom: 15px;">📊 สถิติรวม</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value" id="totalStudents">0</div>
                            <div class="stat-label">นักเรียน</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="avgGPA">0.00</div>
                            <div class="stat-label">GPA เฉลี่ย</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="passRate">0%</div>
                            <div class="stat-label">ผ่าน</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Table Section -->
            <div class="card">
                <h2>📋 รายชื่อนักเรียน</h2>
                
                <div class="controls">
                    <input type="text" id="searchBox" class="form-control search-box" 
                           placeholder="🔍 ค้นหา..." onkeyup="handleSearch()">
                    
                    <select id="gradeFilter" class="filter-select" onchange="handleFilter()">
                        <option value="all">ทุกเกรด</option>
                        <option value="A">เกรด A</option>
                        <option value="B">เกรด B</option>
                        <option value="C">เกรด C</option>
                        <option value="D">เกรด D</option>
                        <option value="F">เกรด F</option>
                    </select>

                    <button class="btn btn-success btn-sm" onclick="exportData()">📥 Export CSV</button>
                </div>

                <div class="table-container">
                    <table id="studentTable">
                        <thead>
                            <tr>
                                <th class="sortable" onclick="sortTable('id')">รหัส</th>
                                <th class="sortable" onclick="sortTable('name')">ชื่อ-นามสกุล</th>
                                <th class="sortable" onclick="sortTable('subject')">วิชา</th>
                                <th class="sortable" onclick="sortTable('score')">คะแนน</th>
                                <th class="sortable" onclick="sortTable('grade')">เกรด</th>
                                <th>GPA</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody id="studentTableBody"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script>
        // ==========================================
        // DATA & STATE
        // ==========================================

        let students = [];
        let filteredStudents = [];
        let currentSort = { column: null, direction: 'asc' };

        // ==========================================
        // GRADE CALCULATION (ใช้ if-else if-else)
        // ==========================================

        function calculateGrade(score) {
            // ตรวจสอบคะแนน
            if (score < 0 || score > 100) {
                return { grade: 'Invalid', gpa: 0 };
            }

            let grade, gpa;

            // คำนวณเกรด (ใช้ if-else if-else)
            if (score >= 80) {
                grade = 'A';
                gpa = 4.0;
            } else if (score >= 75) {
                grade = 'B+';
                gpa = 3.5;
            } else if (score >= 70) {
                grade = 'B';
                gpa = 3.0;
            } else if (score >= 65) {
                grade = 'C+';
                gpa = 2.5;
            } else if (score >= 60) {
                grade = 'C';
                gpa = 2.0;
            } else if (score >= 55) {
                grade = 'D+';
                gpa = 1.5;
            } else if (score >= 50) {
                grade = 'D';
                gpa = 1.0;
            } else {
                grade = 'F';
                gpa = 0.0;
            }

            return { grade, gpa };
        }

        // ==========================================
        // VALIDATION (ใช้ if-else)
        // ==========================================

        function validateInput(id, name, subject, score) {
            const errors = [];

            // ตรวจสอบรหัสนักเรียน
            if (!id || id.trim() === '') {
                errors.push('กรุณากรอกรหัสนักเรียน');
            } else if (!/^\d+$/.test(id)) {
                errors.push('รหัสนักเรียนต้องเป็นตัวเลขเท่านั้น');
            }

            // ตรวจสอบชื่อ
            if (!name || name.trim() === '') {
                errors.push('กรุณากรอกชื่อ-นามสกุล');
            }

            // ตรวจสอบวิชา
            if (!subject || subject.trim() === '') {
                errors.push('กรุณากรอกชื่อวิชา');
            }

            // ตรวจสอบคะแนน (ใช้ if-else)
            if (score === '' || score === null || score === undefined) {
                errors.push('กรุณากรอกคะแนน');
            } else {
                const numScore = parseFloat(score);
                if (isNaN(numScore)) {
                    errors.push('คะแนนต้องเป็นตัวเลข');
                } else if (numScore < 0 || numScore > 100) {
                    errors.push('คะแนนต้องอยู่ระหว่าง 0-100');
                }
            }

            return errors;
        }

        // ==========================================
        // ADD STUDENT (ใช้ if-else)
        // ==========================================

        function addStudent() {
            const id = document.getElementById('studentId').value.trim();
            const name = document.getElementById('studentName').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const score = document.getElementById('score').value;

            // Validate
            const errors = validateInput(id, name, subject, score);

            if (errors.length > 0) {
                alert('❌ พบข้อผิดพลาด:\n' + errors.join('\n'));
                return;
            }

            // ตรวจสอบซ้ำ (ใช้ for loop)
            for (let i = 0; i < students.length; i++) {
                if (students[i].id === id && students[i].subject === subject) {
                    alert('❌ นักเรียนคนนี้มีข้อมูลวิชานี้อยู่แล้ว');
                    return;
                }
            }

            // คำนวณเกรด
            const numScore = parseFloat(score);
            const { grade, gpa } = calculateGrade(numScore);

            // เพิ่มนักเรียน
            const student = {
                id,
                name,
                subject,
                score: numScore,
                grade,
                gpa
            };

            students.push(student);

            // Clear form
            document.getElementById('studentId').value = '';
            document.getElementById('studentName').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('score').value = '';

            // Render
            renderTable();
            updateStatistics();

            alert('✓ เพิ่มนักเรียนสำเร็จ');
        }

        // ==========================================
        // DELETE STUDENT
        // ==========================================

        function deleteStudent(index) {
            if (confirm('ต้องการลบข้อมูลนี้หรือไม่?')) {
                students.splice(index, 1);
                renderTable();
                updateStatistics();
            }
        }

        // ==========================================
        // SEARCH (ใช้ for loop และ if-else)
        // ==========================================

        function handleSearch() {
            const searchTerm = document.getElementById('searchBox').value.toLowerCase();

            // ถ้าไม่ได้ค้นหา
            if (!searchTerm) {
                filteredStudents = [...students];
            } else {
                filteredStudents = [];

                // ค้นหา (ใช้ for loop)
                for (let i = 0; i < students.length; i++) {
                    const student = students[i];
                    const searchText = `${student.id} ${student.name} ${student.subject}`.toLowerCase();

                    if (searchText.includes(searchTerm)) {
                        filteredStudents.push(student);
                    }
                }
            }

            renderTable();
        }

        // ==========================================
        // FILTER (ใช้ switch statement)
        // ==========================================

        function handleFilter() {
            const filter = document.getElementById('gradeFilter').value;

            // ใช้ switch
            switch(filter) {
                case 'all':
                    filteredStudents = [...students];
                    break;

                case 'A':
                    filteredStudents = students.filter(s => s.grade === 'A');
                    break;

                case 'B':
                    filteredStudents = students.filter(s => s.grade.startsWith('B'));
                    break;

                case 'C':
                    filteredStudents = students.filter(s => s.grade.startsWith('C'));
                    break;

                case 'D':
                    filteredStudents = students.filter(s => s.grade.startsWith('D'));
                    break;

                case 'F':
                    filteredStudents = students.filter(s => s.grade === 'F');
                    break;

                default:
                    filteredStudents = [...students];
            }

            renderTable();
        }

        // ==========================================
        // SORT TABLE (ใช้ for loop)
        // ==========================================

        function sortTable(column) {
            // Toggle direction
            if (currentSort.column === column) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.column = column;
                currentSort.direction = 'asc';
            }

            // Sort (ใช้ sort method)
            const dataToSort = filteredStudents.length > 0 ? filteredStudents : students;

            dataToSort.sort((a, b) => {
                let valA = a[column];
                let valB = b[column];

                // Convert to number if numeric
                if (column === 'score' || column === 'gpa') {
                    valA = parseFloat(valA);
                    valB = parseFloat(valB);
                }

                if (valA < valB) {
                    return currentSort.direction === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return currentSort.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });

            renderTable();
            updateSortIndicators();
        }

        function updateSortIndicators() {
            // Clear all
            const headers = document.querySelectorAll('th');
            for (let i = 0; i < headers.length; i++) {
                headers[i].classList.remove('sort-asc', 'sort-desc');
            }

            // Add to current
            if (currentSort.column) {
                const columnMap = {
                    'id': 0,
                    'name': 1,
                    'subject': 2,
                    'score': 3,
                    'grade': 4
                };

                const index = columnMap[currentSort.column];
                if (index !== undefined) {
                    headers[index].classList.add(`sort-${currentSort.direction}`);
                }
            }
        }

        // ==========================================
        // RENDER TABLE (ใช้ for loop)
        // ==========================================

        function renderTable() {
            const tbody = document.getElementById('studentTableBody');
            const dataToRender = filteredStudents.length > 0 || document.getElementById('searchBox').value 
                ? filteredStudents 
                : students;

            // Empty state
            if (dataToRender.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7">
                            <div class="empty-state">
                                <div class="empty-state-icon">📭</div>
                                <p>ไม่พบข้อมูล</p>
                            </div>
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = '';

            // Render (ใช้ for loop)
            for (let i = 0; i < dataToRender.length; i++) {
                const student = dataToRender[i];
                const originalIndex = students.indexOf(student);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.subject}</td>
                    <td>${student.score}</td>
                    <td><span class="grade-badge grade-${student.grade[0]}">${student.grade}</span></td>
                    <td>${student.gpa.toFixed(2)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${originalIndex})">
                                🗑️ ลบ
                            </button>
                        </div>
                    </td>
                `;

                tbody.appendChild(row);
            }
        }

        // ==========================================
        // STATISTICS (ใช้ for loop)
        // ==========================================

        function updateStatistics() {
            const total = students.length;
            document.getElementById('totalStudents').textContent = total;

            if (total === 0) {
                document.getElementById('avgGPA').textContent = '0.00';
                document.getElementById('passRate').textContent = '0%';
                return;
            }

            // คำนวณ GPA เฉลี่ย (ใช้ for loop)
            let totalGPA = 0;
            let passCount = 0;

            for (let i = 0; i < students.length; i++) {
                totalGPA += students[i].gpa;
                if (students[i].score >= 50) {
                    passCount++;
                }
            }

            const avgGPA = totalGPA / total;
            const passRate = (passCount / total) * 100;

            document.getElementById('avgGPA').textContent = avgGPA.toFixed(2);
            document.getElementById('passRate').textContent = passRate.toFixed(0) + '%';
        }

        // ==========================================
        // EXPORT CSV (ใช้ for loop)
        // ==========================================

        function exportData() {
            if (students.length === 0) {
                alert('ไม่มีข้อมูลให้ export');
                return;
            }

            // สร้าง CSV header
            let csv = 'รหัสนักเรียน,ชื่อ-นามสกุล,วิชา,คะแนน,เกรด,GPA\n';

            // เพิ่มข้อมูล (ใช้ for loop)
            for (let i = 0; i < students.length; i++) {
                const s = students[i];
                csv += `${s.id},${s.name},${s.subject},${s.score},${s.grade},${s.gpa}\n`;
            }

            // Download
            const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', `student_grades_${Date.now()}.csv`);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            alert('✓ Export สำเร็จ');
        }

        // ==========================================
        // INITIALIZE
        // ==========================================

        function init() {
            // ข้อมูลตัวอย่าง
            const sampleData = [
                { id: '65010001', name: 'สมชาย ใจดี', subject: 'JavaScript', score: 85 },
                { id: '65010002', name: 'สมหญิง รักเรียน', subject: 'HTML/CSS', score: 92 },
                { id: '65010003', name: 'ประยุทธ์ มั่นคง', subject: 'React', score: 78 },
                { id: '65010001', name: 'สมชาย ใจดี', subject: 'Node.js', score: 67 },
                { id: '65010004', name: 'สมศรี ขยัน', subject: 'JavaScript', score: 45 }
            ];

            // เพิ่มข้อมูลตัวอย่าง (ใช้ for...of)
            for (const data of sampleData) {
                const { grade, gpa } = calculateGrade(data.score);
                students.push({ ...data, grade, gpa });
            }

            renderTable();
            updateStatistics();
        }

        window.onload = init;
    </script>
</body>
</html>