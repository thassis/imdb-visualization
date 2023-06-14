// createGenresByYear(1, 2000, 2018)

const myForm = document.getElementById('genres-by-year');

// createWordCloud()

myForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission and page reload

    yearsToGroup = document.getElementById('yearsToGroup').value
    minDate = document.getElementById('minYear').value
    maxDate = document.getElementById('maxYear').value

    createGenresByYear(yearsToGroup, minDate, maxDate)
})