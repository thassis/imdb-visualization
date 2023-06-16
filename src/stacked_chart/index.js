// createGenresByYear(1, 2000, 2018)

const myForm = document.getElementById("genres-by-year");

// createWordCloud()

function createStackedGraph() {
  yearsToGroup = document.getElementById("yearsToGroup").value || "10";
  minDate = document.getElementById("minYear").value || "1894";
  maxDate = document.getElementById("maxYear").value || "2020";

  createGenresByYear(yearsToGroup, minDate, maxDate, dataGenresByYearGrouped);
}

myForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission and page reload

  createStackedGraph();
});

document.getElementById("yearsToGroup").value = "10";
minDate = document.getElementById("minYear").value = "1894";
maxDate = document.getElementById("maxYear").value = "2020";

createStackedGraph();
