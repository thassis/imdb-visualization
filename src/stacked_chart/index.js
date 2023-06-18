// createGenresByYear(1, 2000, 2018)

const myForm = document.getElementById("genres-by-year");

// createWordCloud()
hiddenAll = false;
byGenres = false;

function createStackedGraph(byGenres = false) {
  yearsToGroup = document.getElementById("yearsToGroup").value || "10";
  minDate = document.getElementById("minYear").value || "1894";
  maxDate = document.getElementById("maxYear").value || "2020";

  createGenresByYear(
    yearsToGroup,
    minDate,
    maxDate,
    byGenres ? dataGenresByYear : dataGenresByYearGrouped,
    hiddenAll
  );
}

myForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission and page reload

  createStackedGraph();
});

document.getElementById("yearsToGroup").value = "10";
minDate = document.getElementById("minYear").value = "1894";
maxDate = document.getElementById("maxYear").value = "2020";

//leia o primeiro radion de index.html e set true
document.getElementById("inlineRadio1").checked = true;

//cria um evento que da um console log no radio que mudar
document.querySelectorAll('input[type="radio"]').forEach((item) => {
  item.addEventListener("change", function () {
    if (this.value == "option1") {
      byGenres = false;
    } else {
      byGenres = true;
    }
    createStackedGraph(byGenres, hiddenAll);
  });
});

var checkbox = document.getElementById("checkDesmarcarTodos");

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    hiddenAll = true;
  } else {
    hiddenAll = false;
  }
  createStackedGraph(byGenres, hiddenAll);
});

createStackedGraph();
