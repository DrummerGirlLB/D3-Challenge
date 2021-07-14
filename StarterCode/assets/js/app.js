//dataset headers: id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,healthcare,healthcareLow,healthcareHigh,obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//load csv data
d3.csv("assets/data/data.csv").then(function(data) {

    console.log(data);

    //cast data as ints with +
    data.forEach(function(data) {
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
    });

    //log a list of states
    var state = data.map(data => data.state);
    var stateAbv = data.map(data => data.abbr)
    console.log("state", state);
    console.log("stateAbv", stateAbv)

    //Add X axis
    var x = d3.scaleLinear()
        .domain(d3.extent(data, data => data.age))
        .range([ 0, width ]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain(d3.extent(data, data => data.smokes))
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

    //setup colorscale, add to html: <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
    //var myColor = d3.scaleOrdinal().domain(data)
      //  .range(d3.schemeSet3);
        
    svg.selectAll(".firstrow")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d){return x(data.age)})
        .attr("cy", function(d){return y(data.smokes)})
        .attr("fill", "#008000");
    
    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        //.text(function(d){return d.stateAbv;})
        //.append("text").text(function(d){return d.stateAbv;})
        .append("circle")
        //.text((`${d.stateAbv}`))
        //.classed("stateText", true)
        //.attr("transform", function(d){return "translate("+d.abbr+",80)"})
        .attr("cx", function (d) {return x(d.age);})
        .attr("cy", function (d) {return y(d.smokes);})
        .attr("r", 10)
        .style("fill", "#69b3a2");
    
    //add text    
    svg.append("circle")
        //.text(function(d){return d.stateAbv;}).classed("stateText", true);
        .attr("transform", function(d){return "translate("+d.abbr+",80)"});


}).catch(function(error) {
    console.log(error);
});