(function () {
  function XIsLessThan(x) {
    var svg = d3.select('#x-is-less-' + x);
    var numbers = [{}, {}, {}, {}, {}, {}, {}, {}];
    var nodes = numbers.map(function (n, index) {
      return {name: index, label: index};
    });
    function links() {
      var result = [];
      nodes.forEach(function(a, ai) {
        nodes.forEach(function (b, bi) {
          if (ai === x && ai < bi) result.push(
            NamelessNumbers.link(a, b, 'x-is-less'));
        })
      });
      return result;
    }
    var graph = NamelessNumbers.makeGraph(svg, nodes, links());
  }

  XIsLessThan(1);
  XIsLessThan(3);
})();
