////////////////////////////////////////////////////////////
//////////////////////// Set-Up ////////////////////////////
////////////////////////////////////////////////////////////

var margin = { left: 50, top: 20, right: 50, bottom: 20 },
  width = Math.min(window.innerWidth, 600) - margin.left - margin.right,
  height = Math.min(window.innerWidth, 600) - margin.top - margin.bottom,
  innerRadius = Math.min(width, height) * 0.39,
  outerRadius = innerRadius * 1.08;

var Names = [
    "Action",
    "Adult",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "Game-Show",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk-Show",
    "Thriller",
    "War",
    "Western",
  ],
  colors = [
    '#FF9E00', 
    ' #795548', 
    '#f4511e', 
    '#19BA99', 
    '#4AB049', 
    '#FF5E96', 
    '#0C4194', 
    '#2C7830', 
    '#1E46AB', 
    '#17a589', 
    '#e65100', 
    '#0277bd', 
    '#03a9f4', 
    '#8DB42F', 
    '#0277bd', 
    '#A0184B', 
    '#B81D57', 
    '#142892', 
    '#7cb342', 
    '#00acc1',
    '#914790',  
    '#F45233', 
    '#fdd835', 
    '#808080', 
    '#039be5', 
    '#1471D6', 
    '#d84315', 
    '#ef6c00'
  ],

  opacityDefault = 0.8;

var matrix = [
  [
    15393, 50, 9500, 1568, 588, 7942, 9795, 636, 16660, 692, 2305, 8, 1, 916,
    2341, 185, 229, 1034, 8, 11, 2268, 2893, 3, 433, 2, 6379, 1108, 624,
  ],
  [
    50, 7298, 51, 24, 10, 859, 217, 64, 605, 0, 121, 0, 0, 8, 130, 12, 6, 57, 0,
    2, 225, 49, 0, 11, 2, 76, 2, 24,
  ],
  [
    9500, 51, 5023, 2886, 705, 6302, 1849, 2160, 7581, 3077, 2812, 8, 0, 913,
    832, 221, 231, 688, 43, 20, 1460, 1353, 0, 196, 1, 931, 415, 490,
  ],
  [
    1568, 24, 2886, 4111, 206, 2397, 143, 554, 1030, 1777, 770, 0, 1, 165, 163,
    126, 156, 75, 6, 1, 103, 374, 1, 61, 1, 51, 32, 10,
  ],
  [
    588, 10, 705, 206, 3438, 1018, 842, 11316, 7089, 659, 84, 2, 1, 3478, 46,
    1685, 175, 66, 101, 12, 413, 24, 2, 781, 3, 112, 320, 51,
  ],
  [
    7942, 859, 6302, 2397, 1018, 61641, 6277, 2284, 30990, 5518, 3890, 18, 9,
    569, 4486, 3378, 4588, 1662, 33, 42, 17485, 1877, 9, 882, 27, 1960, 522,
    707,
  ],
  [
    9795, 217, 1849, 143, 842, 6277, 6429, 1346, 21344, 318, 316, 703, 1, 387,
    1449, 349, 198, 4153, 35, 4, 1717, 269, 2, 107, 2, 7198, 83, 112,
  ],
  [
    636, 64, 2160, 554, 11316, 2284, 1346, 131500, 5914, 2149, 223, 0, 2, 7793,
    358, 6624, 485, 311, 1405, 144, 283, 194, 25, 3398, 45, 136, 1921, 118,
  ],
  [
    16660, 605, 7581, 1030, 7089, 30990, 21344, 5914, 143454, 7424, 4882, 746,
    2, 6687, 5343, 4885, 3362, 7719, 164, 25, 28128, 2624, 13, 2207, 5, 14067,
    5624, 3057,
  ],
  [
    692, 0, 3077, 1777, 659, 5518, 318, 2149, 7424, 6260, 2085, 0, 1, 332, 88,
    467, 702, 217, 59, 10, 1122, 277, 2, 289, 6, 111, 72, 115,
  ],
  [
    2305, 121, 2812, 770, 84, 3890, 316, 223, 4882, 2085, 3295, 1, 0, 176, 2116,
    355, 445, 845, 2, 2, 1229, 867, 3, 18, 0, 631, 46, 48,
  ],
  [
    8, 0, 8, 0, 2, 18, 703, 0, 746, 0, 1, 0, 0, 0, 8, 11, 0, 93, 0, 0, 30, 1, 0,
    8, 0, 62, 0, 1,
  ],
  [
    1, 0, 0, 1, 1, 9, 1, 2, 2, 1, 0, 0, 74, 2, 1, 6, 0, 0, 0, 3, 0, 1, 0, 3, 2,
    0, 0, 0,
  ],
  [
    916, 8, 913, 165, 3478, 569, 387, 7793, 6687, 332, 176, 0, 2, 2391, 114,
    507, 144, 133, 367, 7, 660, 51, 0, 202, 1, 256, 1613, 97,
  ],
  [
    2341, 130, 832, 163, 46, 4486, 1449, 358, 5343, 88, 2116, 8, 1, 114, 16954,
    124, 158, 4190, 1, 10, 565, 2423, 2, 14, 2, 8062, 47, 138,
  ],
  [
    185, 12, 221, 126, 1685, 3378, 349, 6624, 4885, 467, 355, 11, 6, 507, 124,
    7075, 467, 193, 22, 18, 1601, 71, 0, 50, 39, 70, 66, 516,
  ],
  [
    229, 6, 231, 156, 175, 4588, 198, 485, 3362, 702, 445, 0, 0, 144, 158, 467,
    3775, 84, 2, 4, 2012, 81, 1, 27, 1, 75, 45, 76,
  ],
  [
    1034, 57, 688, 75, 66, 1662, 4153, 311, 7719, 217, 845, 93, 0, 133, 4190,
    193, 84, 3152, 4, 3, 933, 867, 2, 17, 0, 5125, 43, 62,
  ],
  [
    8, 0, 43, 6, 101, 33, 35, 1405, 164, 59, 2, 0, 0, 367, 1, 22, 2, 4, 285, 6,
    3, 3, 1, 28, 36, 5, 26, 1,
  ],
  [
    11, 2, 20, 1, 12, 42, 4, 144, 25, 10, 2, 0, 3, 7, 10, 18, 4, 3, 6, 1242, 6,
    4, 1, 12, 11, 4, 1, 1,
  ],
  [
    2268, 225, 1460, 103, 413, 17485, 1717, 283, 28128, 1122, 1229, 30, 0, 660,
    565, 1601, 2012, 933, 3, 6, 8472, 432, 1, 332, 0, 1420, 797, 321,
  ],
  [
    2893, 49, 1353, 374, 24, 1877, 269, 194, 2624, 277, 867, 1, 1, 51, 2423, 71,
    81, 867, 3, 4, 432, 4719, 4, 18, 1, 2094, 49, 51,
  ],
  [
    3, 0, 0, 1, 2, 9, 2, 25, 13, 2, 3, 0, 0, 0, 2, 0, 1, 2, 1, 1, 1, 4, 2, 1, 0,
    2, 0, 0,
  ],
  [
    433, 11, 196, 61, 781, 882, 107, 3398, 2207, 289, 18, 8, 3, 202, 14, 50, 27,
    17, 28, 12, 332, 18, 1, 2213, 8, 41, 21, 6,
  ],
  [
    2, 2, 1, 1, 3, 27, 2, 45, 5, 6, 0, 0, 2, 1, 2, 39, 1, 0, 36, 11, 0, 1, 0, 8,
    255, 2, 0, 0,
  ],
  [
    6379, 76, 931, 51, 112, 1960, 7198, 136, 14067, 111, 631, 62, 0, 256, 8062,
    70, 75, 5125, 5, 4, 1420, 2094, 2, 41, 2, 16353, 279, 145,
  ],
  [
    1108, 2, 415, 32, 320, 522, 83, 1921, 5624, 72, 46, 0, 0, 1613, 47, 66, 45,
    43, 26, 1, 797, 49, 0, 21, 0, 279, 1436, 48,
  ],
  [
    624, 24, 490, 10, 51, 707, 112, 118, 3057, 115, 48, 1, 0, 97, 138, 516, 76,
    62, 1, 1, 321, 51, 0, 6, 0, 145, 48, 3736,
  ],
];

////////////////////////////////////////////////////////////
/////////// Create scale and layout functions //////////////
////////////////////////////////////////////////////////////

var colors = d3.scale.ordinal().domain(d3.range(Names.length)).range(colors);

//A "custom" d3 chord function that automatically sorts the order of the chords in such a manner to reduce overlap
var chord = customChordLayout()
  .padding(0.04) // ***************************************************************
  .sortChords(d3.descending) //which chord should be shown on top when chords cross. Now the biggest chord is at the bottom
  .matrix(matrix);

var arc = d3.svg
  .arc()
  .innerRadius(innerRadius * 1.01)
  .outerRadius(outerRadius * 0.98); //*********************************************************

var path = d3.svg.chord().radius(innerRadius);

////////////////////////////////////////////////////////////
////////////////////// Create SVG //////////////////////////
////////////////////////////////////////////////////////////

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (width / 2 + margin.left) +
      "," +
      (height / 2 + margin.top) +
      ")"
  );

////////////////////////////////////////////////////////////
/////////////// Create the gradient fills //////////////////
////////////////////////////////////////////////////////////

//Function to create the id for each chord gradient
function getGradID(d) {
  return "linkGrad-" + d.source.index + "-" + d.target.index;
}

//Create the gradients definitions for each chord
var grads = svg
  .append("defs")
  .selectAll("linearGradient")
  .data(chord.chords())
  .enter()
  .append("linearGradient")
  .attr("id", getGradID)
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", function (d, i) {
    return (
      innerRadius *
      Math.cos(
        (d.source.endAngle - d.source.startAngle) / 2 +
          d.source.startAngle -
          Math.PI / 2
      )
    );
  })
  .attr("y1", function (d, i) {
    return (
      innerRadius *
      Math.sin(
        (d.source.endAngle - d.source.startAngle) / 2 +
          d.source.startAngle -
          Math.PI / 2
      )
    );
  })
  .attr("x2", function (d, i) {
    return (
      innerRadius *
      Math.cos(
        (d.target.endAngle - d.target.startAngle) / 2 +
          d.target.startAngle -
          Math.PI / 2
      )
    );
  })
  .attr("y2", function (d, i) {
    return (
      innerRadius *
      Math.sin(
        (d.target.endAngle - d.target.startAngle) / 2 +
          d.target.startAngle -
          Math.PI / 2
      )
    );
  });

//Set the starting color (at 0%)
grads
  .append("stop")
  .attr("offset", "0%")
  .attr("stop-color", function (d) {
    return colors(d.source.index);
  });

//Set the ending color (at 100%)
grads
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", function (d) {
    return colors(d.target.index);
  });

////////////////////////////////////////////////////////////
////////////////// Draw outer Arcs /////////////////////////
////////////////////////////////////////////////////////////

var outerArcs = svg
  .selectAll("g.group")
  .data(chord.groups)
  .enter()
  .append("g")
  .attr("class", "group")
  .on("mouseover", fade(0.1))
  .on("mouseout", fade(opacityDefault));

outerArcs
  .append("path")
  .style("fill", function (d) {
    return colors(d.index);
  })
  .attr("d", arc)
  .each(function (d, i) {
    //Search pattern for everything between the start and the first capital L
    var firstArcSection = /(^.+?)L/;

    //Grab everything up to the first Line statement
    var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
    //Replace all the comma's so that IE can handle it
    newArc = newArc.replace(/,/g, " ");

    //If the end angle lies beyond a quarter of a circle (90 degrees or pi/2)
    //flip the end and start position
    if (
      (d.endAngle > (90 * Math.PI) / 180) &
      (d.startAngle < (270 * Math.PI) / 180)
    ) {
      var startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A
        middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1
        endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the string (denoted by $)
      //Flip the direction of the arc by switching the start en end point (and sweep flag)
      //of those elements that are below the horizontal line
      var newStart = endLoc.exec(newArc)[1];
      var newEnd = startLoc.exec(newArc)[1];
      var middleSec = middleLoc.exec(newArc)[1];

      //Build up the new arc notation, set the sweep-flag to 0
      newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
    } //if

    //Create a new invisible arc that the text can flow along
    svg
      .append("path")
      .attr("class", "hiddenArcs")
      .attr("id", "arc" + i)
      .attr("d", newArc)
      .style("fill", "none");
  });

////////////////////////////////////////////////////////////
////////////////// Append Names ////////////////////////////
////////////////////////////////////////////////////////////

//Append the label names on the outside
outerArcs
  .append("text")
  //.attr("class", "titles")
  /*.attr("dy", function(d,i) { return (d.endAngle > 90*Math.PI/180 & d.startAngle < 270*Math.PI/180 ? 25 : -16); })
	.append("textPath")
	.attr("startOffset","50%")
	.style("text-anchor","middle")
	.attr("xlink:href",function(d,i){return "#arc"+i;})
	.text(function(d,i){ return Names[i]; });*/
  .each(function (d) {
    d.angle = (d.startAngle + d.endAngle) / 2;
  })
  .attr("dy", ".35em")
  .attr("transform", function (d) {
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")" +
      "translate(" +
      (innerRadius + 26) +
      ")" +
      (d.angle > Math.PI ? "rotate(180)" : "")
    );
  })
  .style("text-anchor", function (d) {
    return d.angle > Math.PI ? "end" : null;
  })

  .style("font-size", "16px")
  .text(function (d, i) {
    return Names[i];
  });

////////////////////////////////////////////////////////////
////////////////// Draw inner chords ///////////////////////
////////////////////////////////////////////////////////////

svg
  .selectAll("path.chord")
  .data(chord.chords)
  .enter()
  .append("path")
  .attr("class", "chord")
  .style("fill", function (d) {
    return "url(#" + getGradID(d) + ")";
  })
  .style("opacity", opacityDefault)
  .attr("d", path)
  .on("mouseover", mouseoverChord)
  .on("mouseout", mouseoutChord);

////////////////////////////////////////////////////////////
////////////////// Extra Functions /////////////////////////
////////////////////////////////////////////////////////////

//Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function (d, i) {
    svg
      .selectAll("path.chord")
      .filter(function (d) {
        return d.source.index !== i && d.target.index !== i;
      })
      .transition()
      .style("opacity", opacity);
  };
} //fade

//Highlight hovered over chord
function mouseoverChord(d, i) {
  //Decrease opacity to all
  svg.selectAll("path.chord").transition().style("opacity", 0.1);
  //Show hovered over chord with full opacity
  d3.select(this).transition().style("opacity", 1);

  //Define and show the tooltip over the mouse location
  $(this).popover({
    placement: "auto top",
    container: "body",
    mouseOffset: 10,
    followMouse: true,
    trigger: "hover",
    html: true,
    content: function () {
      // **********************************************************
      if (Names[d.source.index] == Names[d.target.index]) {
        return (
          "<p style='font-size: 11px; text-align: center;'><span style='font-weight:900'>" +
          Names[d.source.index] +
          "</span> appeared in <span style='font-weight:900'>" +
          d.source.value +
          "</span> movies </p>"
        );
      } else {
        return (
          "<p style='font-size: 11px; text-align: center;'><span style='font-weight:900'>" +
          Names[d.source.index] +
          "</span> and <span style='font-weight:900'>" +
          Names[d.target.index] +
          "</span> appeared together in <span style='font-weight:900'>" +
          d.source.value +
          "</span> movies </p>"
        );
      }
    },
  });
  $(this).popover("show");
} //mouseoverChord

//Bring all chords back to default opacity
function mouseoutChord(d) {
  //Hide the tooltip
  $(".popover").each(function () {
    $(this).remove();
  });
  //Set opacity back to default for all
  svg.selectAll("path.chord").transition().style("opacity", opacityDefault);
} //function mouseoutChord
