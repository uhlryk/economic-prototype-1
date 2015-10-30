module.exports = angular.module('charts',[])
.directive('buildingsPerDay', ['storage',function(storage){
  return {
    scope:{
      buildingsPerDay:'@',
      day:'='
    },
    link: function(scope, element, attrs){
      var width = 560;
      var height = 80;
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
      var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);
      var y = d3.scale.linear().rangeRound([height, 0]);
      var xAxis = d3.svg.axis().scale(x).orient("bottom");
      var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format("d"));
      scope.render = function(data) {
        if (data === undefined) {
          return ;
        }
        var startVal = data.shift();
        svg.selectAll("*").remove();
        data.forEach(function(d) {
          d = +d;
        });
        x.domain(data.map(function(d,i) {return i; }));
        y.domain([0, d3.max(data.concat(5), function(d) { return d; })]);
        svg.selectAll('g.axis').remove();
        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")")
        .call(xAxis).attr('fill','none').attr('stroke','#333').selectAll(".tick").attr("visibility","hidden");
        svg.append("g").attr("class", "y axis")
        .call(yAxis).attr('fill','none').attr('stroke','#333').append("text")
        .attr("transform", "rotate(-90)").attr("y", -30).attr("x", -20).attr("dy", ".6em")
        .style("text-anchor", "end").attr("fill", "#333").attr("stroke", "none").text("buildings");
        var bars = svg.selectAll(".bar").data(data).enter().append("rect")
        .style("fill", function(d,i){
          if(i === 0){
            if(data[i]>startVal){
              return "#44aa44";
            } else if(data[i]===startVal){
              return "#888888";
            } else {
              return "#aa4444";
            }
          } else {
            if(data[i]>data[i-1]){
              return "#44aa44";
            } else if(data[i]===data[i-1]){
              return "#888888";
            } else {
              return "#aa4444";
            }
          }
        })
        .attr("x", function(d,i) { return x(i); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) {
          if(d === 0){
            return y(0.1);
          }
          return y(d);
        })
        .attr("height", function(d) {
          if(d===0){
            return height - y(0.1);
          }
          return height - y(d);
        });
        svg.selectAll("rect").data(data).enter().append("text")
        .attr("x", x.rangeBand() / 2)
        .attr("y", function(d,i) { return (d * 100); })
        .style("text-anchor", "middle").style("font-size", "10px")
        .text(function(d) {return (d * 100); });
      };
      scope.$watch('day', function(){
        scope.render(storage.get('buildings',scope.buildingsPerDay));
      });
    }
  };
}]);