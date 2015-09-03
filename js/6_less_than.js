(function () {
  function concat(a,b) { return a.concat(b); }

  function lessThanWith(n) {
    var svg = d3.select('#less-than-with-' + n);
    var numbers = [];
    for (var i=0; i<n; i++) numbers.push({});
    var nodes = numbers.map(function (n, index) {
      return {name: index, label: ""};
    });
    function links() {
      result = [];
      nodes.forEach(function(a, ai) {
        nodes.forEach(function (b, bi) {
          if (ai < bi) result.push(
            NamelessNumbers.link(a, b, 'less than'));
              // bi === ai + 1
              //   ? 'succ'
              //   : 'less than'));
        })
      });
      return result;
    }
    var graph = NamelessNumbers.makeGraph(svg, nodes, links());
  }

  lessThanWith(2);
  lessThanWith(3);
  lessThanWith(4);
  lessThanWith(5);
})();
