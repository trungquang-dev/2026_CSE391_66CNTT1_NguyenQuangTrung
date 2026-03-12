        const students = [];
        const nameInput = document.getElementById('nameInput');
        const scoreInput = document.getElementById('scoreInput');
        const addBtn = document.getElementById('addBtn');
        const tableBody = document.getElementById('tableBody');
        let filteredStudents = [];
        let searchKeyword = '';
        let filterGrade = 'Tất cả';
        let sortBy = null; // null, 'asc', 'desc'


        function getGrade(score) {
            if (score >= 8.5) return 'Giỏi';
            if (score >= 7.0) return 'Khá';
            if (score >= 5.0) return 'Trung bình';
            return 'Yếu';
        }

       

        function updateStats() {
            const total = students.length;
            const avg = total > 0 ? (students.reduce((sum, s) => sum + s.score, 0) / total).toFixed(2) : '0.00';
            
            document.getElementById('totalStudents').textContent = total;
            document.getElementById('avgScore').textContent = avg;
        }

        function addStudent() {
            nameInput.style.border = '';
            scoreInput.style.border = '';
            const name = nameInput.value.trim();
            const score = parseFloat(scoreInput.value);

            if (!name) {
                nameInput.placeholder = 'Vui lòng nhập đúng tên!';
                nameInput.style.border = '1px solid red';
                return;
            }

            if (isNaN(score) || score < 0 || score > 10) {
                scoreInput.placeholder = 'Vui lòng nhập điểm hợp lệ (0-10)!';
                scoreInput.style.border = '1px solid red';
                scoreInput.focus();
                return;
            }

            students.push({
                name: name,
                score: score,
                grade: getGrade(score)
            });

            applyFilters();
            nameInput.value = '';
            scoreInput.value = '';
            nameInput.focus();
        }

        addBtn.addEventListener('click', addStudent);

        scoreInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addStudent();
            }
        });

        tableBody.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-btn')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                students.splice(index, 1);
                applyFilters();
            }
        });

        renderTable();
        nameInput.focus();
        
        const searchInput = document.getElementById('searchInput');
        const filterSelect = document.getElementById('filterSelect');
        const scoreHeader = document.getElementById('scoreHeader');

        function applyFilters() {
            filteredStudents = students.filter(student => {
            const matchSearch = student.name.toLowerCase().includes(searchKeyword.toLowerCase());
            const matchGrade = filterGrade === 'Tất cả' || student.grade === filterGrade;
            return matchSearch && matchGrade;
            });

            if (sortBy === 'asc') {
            filteredStudents.sort((a, b) => a.score - b.score);
            } else if (sortBy === 'desc') {
            filteredStudents.sort((a, b) => b.score - a.score);
            }

            renderTable();
        }

        function renderTable() {
            tableBody.innerHTML = '';
            
            if (filteredStudents.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="empty-message">Không có kết quả</td></tr>';
            document.getElementById('totalStudents').textContent = '0';
            document.getElementById('avgScore').textContent = '0.00';
            return;
            }

            filteredStudents.forEach((student, index) => {
            const row = document.createElement('tr');
            const isWeak = student.score < 5.0;
            
            if (isWeak) {
                row.classList.add('yellow-bg');
            }
            
            const actualIndex = students.indexOf(student);
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.score}</td>
                <td>${student.grade}</td>
                <td><button class="delete-btn" data-index="${actualIndex}">Xóa</button></td>
            `;
            tableBody.appendChild(row);
            });

            updateStats();
        }

        function updateStats() {
            const total = filteredStudents.length;
            const avg = total > 0 ? (filteredStudents.reduce((sum, s) => sum + s.score, 0) / total).toFixed(2) : '0.00';
            
            document.getElementById('totalStudents').textContent = total;
            document.getElementById('avgScore').textContent = avg;
        }

        searchInput.addEventListener('input', function(e) {
            searchKeyword = e.target.value;
            applyFilters();
        });

        filterSelect.addEventListener('change', function(e) {
            filterGrade = e.target.value;
            applyFilters();
        });

        scoreHeader.addEventListener('click', function() {
            if (sortBy === null || sortBy === 'desc') {
            sortBy = 'asc';
            scoreHeader.textContent = 'Điểm ▲';
            } else {
            sortBy = 'desc';
            scoreHeader.textContent = 'Điểm ▼';
            }
            applyFilters();
        });

        applyFilters();