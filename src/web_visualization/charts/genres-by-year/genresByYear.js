function groupByNumbersOfYears(numberOfYears, firstYear, lastYear) {
	const filtered = [...dataGenresByYear].filter(genreByYear =>
		Number(genreByYear.startYear) >= firstYear && Number(genreByYear.startYear) <= lastYear
	)

	return filtered.reduce((acc, current, index) => {
		if (index % numberOfYears === 0) {
			acc.push({
				...current,
				initialIntDate: Number(current.startYear),
				endIntDate: Number(current.startYear + numberOfYears)
			});

		} else {
			const mergedData = {};

			for (let key in acc[-1]) {
				if (key == 'initialIntDate' || key == 'endIntDate') {
					mergedData[key] = acc[-1][key]
				} else {
					mergedData[key] = (parseInt(acc[-1][key]) + parseInt(current[key]))
				}
			}

			acc[-1] = mergedData;
		}

		return acc;
	}, [])
}

function createGenresByYear() {
	const filteredData = groupByNumbersOfYears(10, 1900, 2023)

	const data = {
		labels: filteredData.map(d => `${d.initialIntDate} ~ ${d.endIntDate}`),
		datasets: filteredData.map(d => ({
			label: 'My First dataset',
			data: { count: 4, min: -100, max: 100 },
			borderColor: 'red',
			backgroundColor: 'red',
			fill: true
		}))
		// {
		// 	label: 'My First dataset',
		// 	data: Utils.numbers(NUMBER_CFG),
		// 	borderColor: Utils.CHART_COLORS.red,
		// 	backgroundColor: Utils.CHART_COLORS.red,
		// 	fill: true
		// },
	};

	var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: (ctx) => 'Chart.js Line Chart - stacked=' + ctx.chart.options.scales.y.stacked
				},
				tooltip: {
					mode: 'index'
				},
			},
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Month'
					}
				},
				y: {
					stacked: true,
					title: {
						display: true,
						text: 'Value'
					}
				}
			}
		}
	});
}