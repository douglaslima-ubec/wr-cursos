function searchOnTable(searchInputId, tableId) {
    const searchValue = document.getElementById(searchInputId).value.toLowerCase();
    const rows = document.querySelectorAll(`${tableId} tr`);
    rows.forEach(row => {
        const courseName = row.cells[1].textContent.toLowerCase();
        if (courseName.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}