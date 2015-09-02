(function () {
  var coords = NamelessNumbers.coords;
  var line = d3.svg.line()
    .interpolate("cardinal")
    .tension(0.3);

  var svg = d3.select('#succ');
  var lines = svg.append('g')
    .attr('class', '.relSuccLines')

  lines.selectAll('.relSucc')
    .data(coords)
    .enter().append('path')
      .attr('class', 'relSucc')
      .attr('fill', 'none')
      .attr('stroke-width', 0.2)
      .attr('stroke', '#555')
      // .attr('shape-rendering', )
      .attr('d', function (d) { return line(coords); });

  var graph = NamelessNumbers.makeGraph(svg);
  // make it curved

  // make it an arrow or something

  // connect all the lines into one long line!!

})();
