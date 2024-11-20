// Função de pesquisa
document.getElementById('search-input').addEventListener('input', searchCourses);

function searchCourses() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    const rows = document.querySelectorAll('#course-table tr');

    rows.forEach(row => {
        const courseName = row.cells[1].textContent.toLowerCase();
        if (courseName.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}