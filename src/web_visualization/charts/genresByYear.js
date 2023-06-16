function groupByNumbersOfYears(numberOfYears, firstYear, lastYear) {
  const filtered = [...dataGenresByYear].filter(
    (genreByYear) =>
      parseInt(genreByYear.startYear) >= firstYear &&
      parseInt(genreByYear.startYear) <= lastYear
  );

  const groupedGenres = filtered.reduce((acc, current, index) => {
    if (index % numberOfYears === 0) {
      acc.push({
        ...current,
        initialIntDate: parseInt(current.startYear),
        endIntDate: parseInt(current.startYear) + parseInt(numberOfYears),
      });
    } else {
      const mergedData = {};

      for (let key in acc[-1]) {
        if (key == "initialIntDate" || key == "endIntDate") {
          mergedData[key] = acc[-1][key];
        } else {
          mergedData[key] = parseInt(acc[-1][key]) + parseInt(current[key]);
        }
      }

      acc[-1] = mergedData;
    }

    return acc;
  }, []);

  return groupedGenres.sort((a, b) => a.initialIntDate - b.initialIntDate);
}

function groupByGenres(genresByYear) {
  genres = {};

  genresByYear.forEach((year) => {
    Object.entries(year).forEach(([key, value]) => {
      if (
        key != "initialIntDate" &&
        key != "endIntDate" &&
        key != "startYear" &&
        key != "endYear"
      ) {
        if (!genres[key]) genres[key] = [];

        genres[key].push(value);
      }
    });
  });

  return genres;
}

function generateColors() {
  const colors = [];

  for (let i = 0; i < 30; i++) {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(color);
  }

  return colors;
}

function createGenresByYear(quantityYears, minYear, maxYear) {
  const filteredData = groupByNumbersOfYears(quantityYears, minYear, maxYear);
  const groupedGenres = groupByGenres(filteredData);
  const colorPalette = generateColors();

  const data = {
    labels: filteredData.map((d) => `${d.initialIntDate} ~ ${d.endIntDate}`),
    datasets: Object.entries(groupedGenres).map(([key, value], index) => ({
      label: key,
      data: value,
      borderColor: colorPalette[index],
      backgroundColor: colorPalette[index],
      fill: true,
    })),
  };

  let chartStatus = Chart.getChart("myChart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) =>
            "Quantidade de filmes produzidos por gênero a cada ano" +
            ctx.chart.options.scales.y.stacked,
        },
        tooltip: {
          mode: "index",
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Anos",
          },
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: "Quantidade de filmes",
          },
        },
      },
    },
  });
}
