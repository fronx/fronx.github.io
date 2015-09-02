(function () {
  var svg = d3.select('#succ-pred');
  var numbers = [{}, {}, {}, {}, {}, {}, {}, {}];
  var nodes = numbers.map(function (n, index) {
    return {name: index, label: ""};
  });
  var succ = NamelessNumbers.linkLine(nodes, 'succ');
  var pred = NamelessNumbers.linkLine(nodes.reverse(), 'pred');
  var links = succ.concat(pred);
  var graph = NamelessNumbers.makeGraph(svg, nodes, links);
})();
