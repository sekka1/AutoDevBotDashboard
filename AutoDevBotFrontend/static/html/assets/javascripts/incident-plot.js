    $(document).ready(function() {

    /**
     * Builds initial array with the given number to build initial chart
     * before data comes back from the websocket call.
     *
     * @param {int} initialCount
     * @returns {Array}
     */
    function getInitTimeChartData(initialCount){
        var res = [];

        for(var i=1; i < initialCount; i++){
            res.push([i, 0]);
        }
        return res;
    }

    /**
     * Update entire chart array with the one new data point.
     *
     * @param {Array} chartData
     * @param {int} dataPoint
     * @returns {Array}
     */
    function updateTimeChartWithNewDataPoint(chartData, dataPoint){
        var res = [];

        var obj = $.parseJSON(dataPoint);
        console.log(obj.Success, obj.Failure);

        //console.log(chartData[0][1][0]);
        //console.log(chartData[0][1][1]);

        // Push all but the first one into the output array
        for(var i=1; i < chartData[0].length; i++){
            //res.push([chartData[0][i][0], chartData[0][i][1]]);
            res.push([i, chartData[0][i][1]]);
        }

        // Last plot on the left
        res.push([chartData[0].length, obj.Failure]);

        // console.log(res);

        return res;
    }

    /**
     * Find the max Y axis in the chartData
     *
     * @param {Array} chartData
     * @returns {number}
     */
    function getMaxYAxis(chartData){
        var max = 0;
        for(var i=1; i < chartData[0].length; i++){
            if(chartData[0][i][1] > max)
                max = chartData[0][i][1];
        }
        return max;
    }        
    
      if($("#realtimechart").length) {
          var options = {
              series: { shadowSize: 1 },
              lines: { fill: true, fillColor: { colors: [ { opacity: 1 }, { opacity: 0.1 } ] }},
              yaxis: { min: 0, max: 1 },
              xaxis: { show: false },
              colors: ["#EEA43C"],
              grid: { tickColor: "#dddddd",
                  borderWidth: 0,
                  labelMargin: 5,
                  borderColor: null
              }
          };

          var chartData = [getInitTimeChartData(299)];

          var plot = $.plot($("#realtimechart"), chartData, options);
          socketIO.on('getTopLevelDashboardData_stat', function(data){            
              // console.log(data);
              chartData = [updateTimeChartWithNewDataPoint(chartData, data)]; // data.data, array of arrays

              // Setup and re-draw y axis with max value in current chart
              plot.getOptions().yaxes[0].max = getMaxYAxis(chartData);
              plot.setupGrid();

              plot.setData(chartData);
              plot.draw();
          });
      }

    });