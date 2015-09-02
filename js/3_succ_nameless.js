(function () {
  var svg = d3.select('#succ-nameless');
  var numbers = [{}, {}, {}, {}, {}, {}, {}, {}];
  var nodes = numbers.map(function (n, index) {
    return {name: index, label: ""};
  });
  var links = NamelessNumbers.linkLine(nodes, 'succ');
  var graph = NamelessNumbers.makeGraph(svg, nodes, links);
})();
