const compararPorAno = (a, b) => {
  const anoA = parseInt(a.startYear);
  const anoB = parseInt(b.startYear);

  if (anoA < anoB) {
    return -1;
  }
  if (anoA > anoB) {
    return 1;
  }
  return 0;
};

function groupByNumbersOfYears(
  numberOfYears,
  firstYear,
  lastYear,
  selectedData
) {
  let filtered = [...selectedData].filter(
    (selectedData) =>
      parseInt(selectedData.startYear) >= firstYear &&
      parseInt(selectedData.startYear) <= lastYear
  );
  filtered = filtered.sort(compararPorAno);
  const groupedGenres = filtered.reduce((acc, current, index) => {
    if (index % numberOfYears === 0) {
      const endIntDate =
        numberOfYears == 1
          ? parseInt(current.startYear)
          : parseInt(current.startYear) + parseInt(numberOfYears);
      acc.push({
        ...current,
        initialIntDate: parseInt(current.startYear),
        endIntDate: endIntDate < lastYear ? endIntDate : lastYear,
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

function generateColors(selectedData) {
  // const colors = [];

  // for (let i = 0; i < 30; i++) {
  //   const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  //   colors.push(color);
  // }
  colors_all_genres = [
    "#FF9E00",
    " #795548",
    "#f4511e",
    "#19BA99",
    "#4AB049",
    "#FF5E96",
    "#0C4194",
    "#2C7830",
    "#1E46AB",
    "#17a589",
    "#e65100",
    "#0277bd",
    "#03a9f4",
    "#8DB42F",
    "#0277bd",
    "#A0184B",
    "#B81D57",
    "#142892",
    "#7cb342",
    "#00acc1",
    "#914790",
    "#F45233",
    "#fdd835",
    "#808080",
    "#039be5",
    "#1471D6",
    " #d84315",
    "#ef6c00",
  ];

  colors_grouped_genres = [
    "#1E46AB",
    "#B81D57",
    "#00acc1",
    "#4AB049",
    "#ef6c00",
    "#FF5E96",
    "#19BA99",
    "#808080",
    "#fdd835",
    "#795548",
    "#914790",
  ];

  if (selectedData == dataGenresByYear) {
    return colors_all_genres;
  } else {
    return colors_grouped_genres;
  }
}

function createGenresByYear(
  quantityYears,
  minYear,
  maxYear,
  selectedData,
  hiddenAll
) {
  const filteredData = groupByNumbersOfYears(
    quantityYears,
    minYear,
    maxYear,
    selectedData
  );
  const groupedGenres = groupByGenres(filteredData);
  const colorPalette = generateColors(selectedData);

  const data = {
    labels: filteredData.map((d) =>
      quantityYears > 1
        ? `${d.initialIntDate} ~ ${d.endIntDate}`
        : d.initialIntDate
    ),
    datasets: Object.entries(groupedGenres).map(([key, value], index) => ({
      label: key,
      data: value,
      borderColor: colorPalette[index],
      backgroundColor: colorPalette[index],
      fill: true,
      hidden: hiddenAll,
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
            "Quantidade de filmes produzidos por gênero a cada ano",
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
