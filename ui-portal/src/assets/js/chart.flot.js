$(function(){
        'use strict'

        $.plot('#flotChart', [{
          data: walletbalance,
          color: '#0168fa',
          lines: {
            show: true,
            lineWidth: 1.5
          },
          bars: { show: false }
        }], {
          series: {
            shadowSize: 0,
            bars: {
              show: true,
              lineWidth: 0,
              barWidth: .5,
              fill: 1
            }
          },
          grid: {
            color: '#c0ccda',
            borderWidth: 0,
            labelMargin: 10
          },
    			yaxis: {
            show: true,
            max: 12500,
            tickSize: 2500
          },
    			xaxis: {
            color: 'transparent',
            show: true,
            max: 37,
            ticks: [[5,'5 Nov'],[10,'6 Nov'],[15,'7 Nov'],[20,'8 Nov'],[25,'9 Nov'],[30,'10 Nov'],[35,'11 Nov']]
          }
    		});

        
          var ctx1 = document.getElementById('chartBar').getContext('2d');
        new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: ['Tue','Wed','Thurs','Fri','Sat','Sun','Mon'],
            datasets: [{
              data: [8,10,8,11,2,2,8],
              backgroundColor: '#66a4fb'
            }]
          },
          options: {
            maintainAspectRatio: false,
            legend: {
              display: false,
                labels: {
                  display: false
                }
            },
            scales: {
              xAxes: [{
                 gridLines: {
                  display: false
                },
                ticks: {
                  fontColor: '#8392a5',
                  fontSize: 10,
                  min: 80,
                  max: 200
                },
                barPercentage: 0.5
              }],
              yAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                  fontColor: '#8392a5',
                  fontSize: 10,
                  min: 0,
                  max: 10
                }
              }]
            }
          }
        });

      })