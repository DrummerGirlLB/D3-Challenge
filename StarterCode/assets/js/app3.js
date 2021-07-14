//ok back to basic - 
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var chartGroup = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//lets load the data first
d3.csv("assets/data/data.csv").then(function (data, err) {
    if (err) throw err;

    data.forEach(function (data) {
        data.age = +data.age;
        data.income = +data.income;
    });
    //(scales)
    var xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.age)]).range([0, width]);
    var yLinearScale = d3.scaleLinear().domain([0, d3.max(data, d => d.income)]).range([height, 0]);
    //(axis)
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    //append and add to chartGroup
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append('g')
        .call(leftAxis);
    //build circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.age))
        .attr("cy", d => yLinearScale(d.income))
        .attr(function (d) {
            return "stateCircle" + d.abbr;
        })
    //.attr("fill", "blue")
    //.attr("opacity", 0.8);
    //build tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .attr([1, -1])
        .html(function (d) {
            return (`${d.abbr}`);
        });
    //add tooltip
    chartGroup.call(toolTip);
    //tooltip show/hide function
    circlesGroup.on("click", function (data) {
        toolTip.show(data, this);
    })
        .on("mouseout", function (data) {
            toolTip.hide(data);
        });

    chartGroup.append("text")
        .attr("transform", `translate(${width / 3}, ${height + margin.top + 25})`)
        .text("Age per state");

    chartGroup.append("text")
        .attr("transform", "roatate(-90)")
        .attr("y", 0 - margin.left + 30)
        .attr("x", 0 - (height / 1.5))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Income per state");
});