(function () {
  var svg = d3.select('#numbers');
  var numbers = [0,1,2,3,4,5,6,7]; // ,8,9,10,11,12,13,14,15];
  var nodes = numbers.map(function (n, index) {
    return {name: n, label: n};
  });
  var links = [];
  var graph = NamelessNumbers.makeGraph(svg, nodes, links);
})();
