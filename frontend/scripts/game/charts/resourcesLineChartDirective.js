module.exports = angular.module('resourcesLineChartDirective',[])
.directive('resourcesPerDay', ['storage',function(storage){
  return {
    scope:{
      day:'=',
      filters:'=',
      colors:'='
    },
    link: function(scope, element, attrs){
      var width = 560;
      var height = 180;
      var marginTop =10;
      var marginBottom= 10;
      var marginLeft =30;
      var marginRight= 10;
      var id = 'svg_'+scope.buildingsPerDay;
      var svg = d3.select(element[0])
        .append("svg")
        .attr('viewBox','0 0 '+(width+marginLeft+marginRight)+' '+(height+marginTop+marginBottom))
        .attr('id', id)
        .append("g").attr('x',0).attr('y',0)
        .attr("transform", "translate("+marginLeft+","+marginTop+")");
      var x = d3.scale.ordinal().rangeRoundPoints([0, width], 0);
      var y = d3.scale.linear().rangeRound([height, 0]);
      var xAxis = d3.svg.axis().scale(x).orient("bottom");
      var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format("d"));

      scope.render = function(data) {
        if (data === undefined) {
          return ;
        }
        var dataSeries = [];
        var i = 0;
        for(var resourceName in data){
          if(scope.filters[resourceName]){
            dataSeries.push({
              name : resourceName,
              values: data[resourceName],
              color: scope.colors[i]
            });
          }
          i++;
        }
        svg.selectAll("*").remove();
        svg.selectAll('g.axis').remove();
        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")")
        .call(xAxis).attr('fill','none').attr('stroke','#333').selectAll(".tick").attr("visibility","hidden");
        svg.append("g").attr("class", "y axis")
        .call(yAxis).attr('fill','none').attr('stroke','#333').append("text")
        .attr("transform", "rotate(-90)").attr("y", -30).attr("x", -60).attr("dy", ".6em")
        .style("text-anchor", "end").attr("fill", "#333").attr("stroke", "none").text("resources");
        if(dataSeries.length>0){
          x.domain(dataSeries[0].values
          .map(function(d,i) {
            return i;
          }));
          y.domain([0, d3.max(dataSeries, function(data){
            return d3.max( data.values.concat(20), function(d) { return d; } );
          })]);
          var series = svg.selectAll(".series")
          .data(dataSeries)
          .enter().append("g")
          .attr("class", "series")
          .attr("stroke", function(d,i){
            return d.color;
          });
          var line = d3.svg.line()
          .interpolate("basis")
          .x(function (d,i) { return x(i); })
          .y(function (d) { return y(d); });

          series.append("path")
          .attr("class", "line")
          .attr("d", function (d) { return line(d.values); })
          .style("stroke-width", "1")
          .style("fill", "none");
        }
      };
      scope.$watch('day', function(){
        scope.render(storage.getAll('resource'));
      });
      scope.$watch('filters', function(){
        scope.render(storage.getAll('resource'));
      },true);
    }
  };
}]);