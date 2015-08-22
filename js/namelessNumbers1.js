(function () {

function randomInt(limit) {
  return Math.floor(Math.random() * limit);
}

function randomPairs(limitX, limitY, n) {
  if (limitX * limitY < n) throw "nope. sorry. you can't generate " + n + " pairs within limits " + [limitX, limitY];
  var result = [];
  var __set = new Set();
  var pair, key;
  while (__set.size < n) {
    pair = [randomInt(limitX), randomInt(limitY)];
    key = pair.toString();
    if (!__set.has(key)) {
      __set.add(key);
      result.push(pair);
    }
  }
  return result;
}

var vis = d3.select('#namelessNumbers1');
vis.append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "#fcfcfc");

var colorScale = d3.scale.category10();
colorScale.domain[d3.range(0, 10, 1)];

var numbers = [0,1,2,3,4,5,6,7]; // ,8,9,10,11,12,13,14,15];
var strokeWidth = 2.5;
var maxX = 512;
var maxY = 256;
var gridSize = 32;

numbers.forEach(function (num) {
  vis.append('svg:circle')
    .attr('stroke-width', strokeWidth)
    .attr('stroke', colorScale(10))
    .attr('fill', 'none')
    .attr('opacity', 0.70);
});

var circle = vis.selectAll('circle');
circle.data(numbers);
var radius = 15;
var coords = randomPairs(15, 7, numbers.length);

circle
  .attr('cx', function (d) { return coords[d][0] * gridSize + radius*2 + strokeWidth; })
  .attr('cy', function (d) { return coords[d][1] * gridSize + radius*2 + strokeWidth; })
  .attr('r', radius);

})();
