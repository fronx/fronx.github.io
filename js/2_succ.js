(function () {
  var svg = d3.select('#succ');
  var numbers = [0,1,2,3,4,5,6,7];
  var nodes = numbers.map(function (n) {
    return {name: n, label: n};
  });
  var links = NamelessNumbers.linkLine(nodes, 'succ');
  var graph = NamelessNumbers.makeGraph(svg, nodes, links);
})();
