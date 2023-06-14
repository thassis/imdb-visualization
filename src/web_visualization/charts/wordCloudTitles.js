
var fill = d3.scaleOrdinal(d3);

function generateColors() {
  const colors = [];

  for (let i = 0; i < 30; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(color);
  }

  return colors;
}

const colorPalette = generateColors();

const data = [];

console.log("comecou auqui");

let i = 0
for (let genre in dataMoviesWords) {
  console.log(`Genre: ${genre}`);

  const genreData = dataMoviesWords[genre];
  for (let key in genreData) {
    const value = genreData[key];

    data.push({
      text: key,
      value: value,
      color: colorPalette[i],
    });
  }

  i++;
}

console.log(i)

function fillColor(d,i){
  return d.color;
}

var layout = d3.layout.cloud().size([400, 300]).words(data).on("end", draw);

layout.start();

function draw(words) {
  d3.select("#word-cloud")
    .append("g")
    .attr(
      "transform",
      "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
    )
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .text((d) => d.text)
    .style("font-size", (d) => d.size + "px")
    .style("font-family", (d) => d.font)
    .style("fill", fillColor)
    .attr("text-anchor", "middle")
    .attr(
      "transform",
      (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
    );
}
