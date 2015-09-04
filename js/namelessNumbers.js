NamelessNumbers = (function () {

var colorScale = d3.scale.category10();
colorScale.domain[d3.range(0, 10, 1)];

function makeGraph(svg, nodes, links) {
  var layout = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([svg.attr('width'), svg.attr('height')])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

  svg.append("defs").selectAll("marker")
      .data(["arrow", "arrowEqual"])
    .enter().append("marker")
      .attr("id", function(d) { return d; })
      .attr("viewBox", "0 -5 13 7")
      .attr("refX", 22)
      .attr("refY", -2.5)
      .attr("overflow", "show")
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", function (markerType) {
        return markerType === "arrowEqual"
          ? 40
          : "auto";
      })
    .append("path")
      .attr("d", "M0,-4L12,0L0,4");

  var path = svg.append("g").selectAll(".link")
      .data(layout.links())
    .enter().append("path")
      .attr("class", function(d) { return "link " + d.label; })
      .attr('fill', 'none')
      .attr('stroke-width', 1.7)
      .attr('stroke', '#000')
      .attr("marker-end", function(d) {
        return d.source === d.target
          ? "url(#arrowEqual)"
          : "url(#arrow)";
      });

  var number = svg.selectAll("g.number")
    .data(layout.nodes())
    .enter().append("g")
      .attr("class", "number")
      .call(layout.drag);

  number.append("circle")
    .attr('stroke', '#000')
    .attr('fill', "#f5f5f5")
    .attr('r', function (d) {
      return d.label !== "" ? 12 : 4;
    });

  number.append("text")
      .attr('x', -4)
      .attr('y', 5)
      .attr('fill', '#333')
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
    return "M" + d.source.x + "," + d.source.y + "A" + (
      dr === 0
      ? "15,15 0 1,1 " + (1 + d.target.x) + "," + d.target.y
      : dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y
    );
  }

  return {
    number: number,
    layout: layout,
  };
}

function link(sourceNode, targetNode, label) {
  return {source: sourceNode.name, target: targetNode.name, label: label};
}

function linkLine(list, label) {
  var result = [];
  list.forEach(function (item, index) {
    if (index < list.length - 1)
      result.push(link(list[index], list[index + 1], label));
  });
  return result;
}

function mkGraph(n, withLabels, selector, linkFn, distance) {
  var svg = d3.select(selector);
  var numbers = [];
  for (var i=0; i<n; i++) numbers.push({});
  var nodes = numbers.map(function (n, index) {
    return {name: index, label: withLabels ? index : ""};
  });
  function links() {
    var result = [];
    nodes.forEach(function(a, ai) {
      nodes.forEach(function (b, bi) {
        linkFn(a, ai, b, bi, result);
      });
    });
    return result;
  }
  var graph = NamelessNumbers.makeGraph(svg, nodes, links());
  graph.layout.stop();
  var dist = distance === undefined ? 40 : distance;
  graph.layout.linkDistance(dist + n * 6)
  graph.layout.start();
}

function mkCoordinateSystem(svg) {
  var padding = 15;
  var width = 240 - (2 * padding);
  var height = 240 - (2 * padding);
  var g = svg.append("g")
    .attr("transform", "translate(" + padding + "," + padding + ")")
    .attr("class", "lineGraph");
  var x = d3.scale.linear().range([0, width]);
  x.domain([-6,6]);
  var y = d3.scale.linear().range([height, 0]);
  y.domain([-6,6]);
  var xAxis = d3.svg.axis().scale(x).tickValues([-6,-4,-2,2,4,6]);
  var yAxis = d3.svg.axis().scale(y).tickValues([-6,-4,-2,2,4,6]).orient("left");
  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height/2) + ")")
    .call(xAxis);
  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + width/2 + ",0)")
    .call(yAxis);
  return {
    g: g,
    x: x,
    y: y,
  }
}

function mkLineGraph(selector, fn, lineClass) {
  var svg = d3.select(selector);
  var coord = mkCoordinateSystem(svg);
  var xrange = [];
  for (var i=-6; i<6; i = i + 0.2) xrange.push(i);
  var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return coord.x(d); })
    .y(function(d) { return coord.y(fn(d)); });
  coord.g.append("path")
    .attr("class", "line" + lineClass === undefined ? "" : " " + lineClass)
    .attr("stroke", "#0000ff")
    .attr("stroke-width", 1.3)
    .attr("d", line(xrange));
}

function mkDotGraph(selector, fn) {
  var svg = d3.select(selector);
  var coord = mkCoordinateSystem(svg);
  var xrange = [];
  for (var i=-6; i<6; i = i + 1) xrange.push(i);
  coord.g.selectAll('circle')
    .data(xrange)
    .enter().append('circle')
      .attr('r', 2.5)
      .attr('fill', '#0000ff')
      .attr('cx', coord.x)
      .attr('cy', function (d) { return coord.y(fn(d)); })
}

return {
  colorScale: colorScale,
  makeGraph: makeGraph,
  mkGraph: mkGraph,
  mkLineGraph: mkLineGraph,
  link: link,
  linkLine: linkLine,
  mkDotGraph: mkDotGraph,
};

}());
