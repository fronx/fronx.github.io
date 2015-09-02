NamelessNumbers = (function () {

var colorScale = d3.scale.category10();
colorScale.domain[d3.range(0, 10, 1)];

function makeGraph(svg, nodes, links) {
  var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([800, 256])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

  svg.append("defs").selectAll("marker")
      .data(["arrow"])
    .enter().append("marker")
      .attr("id", function(d) { return d; })
      .attr("viewBox", "0 -3 13 7")
      .attr("refX", 22)
      .attr("refY", -2.5)
      .attr("overflow", "show")
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
    .append("path")
      .attr("d", "M0,-6L12,0L0,6");

  var path = svg.append("g").selectAll(".link")
      .data(force.links())
    .enter().append("path")
      .attr("class", function(d) { return "link " + d.label; })
      .attr('fill', 'none')
      .attr('stroke-width', 1.7)
      .attr('stroke', '#000')
      .attr("marker-end", function(d) { return "url(#arrow)"; });

  var number = svg.selectAll("g.number")
    .data(force.nodes())
    .enter().append("g")
      .attr("class", "number")
      .call(force.drag);

  number.append("circle")
    .attr('fill', colorScale(0))
    .attr('stroke', 'red')
    .attr('r', 12);

  number.append("text")
      .attr('x', -4)
      .attr('y', 5)
      .attr('fill', 'white')
      .text(function (d) { return d.label; });

  function transform(d) {
    return "translate(" + d.x + "," + d.y + ")";
  }

  function tick() {
    path.attr("d", linkArc);
    number.attr("transform", transform);
  }

  function linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  }

  return {
    number: number,
  };
}

function link(source, target, label) {
  return {source: source, target: target, label: label};
}

function linkLine(list, label) {
  var result = [];
  list.forEach(function (item, index) {
    if (index < list.length - 1)
      result.push(link(list[index].name, list[index + 1].name, label));
  });
  return result;
}

return {
  colorScale: colorScale,
  makeGraph: makeGraph,
  link: link,
  linkLine: linkLine,
};

}());
