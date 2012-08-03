var chartArgs = {
    chart : {
        animation : false,
        alignTicks : false,
        renderTo : 'bpmChart',
        type : 'line',
        marginRight : 10
    },
    title : null,
    xAxis : {
        title : {
            text : 'Showing last 20 seconds'
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',    
        labels: {
           enabled: false
        },
        minorTickLength: 0,
        tickLength: 0
    },
    yAxis : {
        title : null
    },
    tooltip : {
        formatter : function() {
            return '<b>' + this.series.name + '<br/>' + Highcharts.numberFormat(this.y, 2) + '</b><br/>' + 'Time: ' + Highcharts.numberFormat(this.x, 2) + ' minutes<br/>';
        }

    },
    legend : {
        enabled : false
    },
    exporting : {
        enabled : false
    },
    series : [{
        name : 'Heart Rate (BPM)',
        data : [],
        shadow : false,
        lineWidth : 4,
        marker : {
            radius : 5
        }
    }]
};

// Apply the grey theme -- must be executed before charts are created
Highcharts.setOptions({
    global : {
        useUTC : false
    },
    colors : ["61658E", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart : {
        backgroundColor : {
            linearGradient : [0, 0, 0, 400],
            stops : [[0, 'rgb(80, 80, 80)'], [1, 'rgb(40, 40, 40)']]
        },
        borderWidth : 0,
        borderRadius : 15,
        plotBackgroundColor : null,
        plotShadow : false,
        plotBorderWidth : 0
    },
    title : {
        style : {
            color : '#000',
            font : '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
    },
    subtitle : {
        style : {
            color : '#DDD',
            font : '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
    },
    xAxis : {
        gridLineWidth : 0,
        lineColor : '#777',
        tickColor : '#777',
        labels : {
            style : {
                color : '#aaa',
                fontWeight : 'bold'
            }
        },
        title : {
            style : {
                color : '#888',
                font : 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
        }
    },
    yAxis : {
        alternateGridColor : null,
        minorTickInterval : null,
        gridLineColor : 'rgba(128, 128, 128, .2)',
        lineWidth : 0,
        tickWidth : 0,
        labels : {
            style : {
                color : '#aaa',
                fontWeight : 'bold'
            }
        },
        title : {
            style : {
                color : '#888',
                font : 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
            }
        }
    },
    legend : {
        itemStyle : {
            color : '#CCC'
        },
        itemHoverStyle : {
            color : '#FFF'
        },
        itemHiddenStyle : {
            color : '#333'
        }
    },
    credits : {
        style : {
            right : '50px'
        }
    },
    labels : {
        style : {
            color : '#CCC'
        }
    },
    tooltip : {
        backgroundColor : {
            linearGradient : [0, 0, 0, 50],
            stops : [[0, 'rgba(96, 96, 96, .8)'], [1, 'rgba(16, 16, 16, .8)']]
        },
        borderWidth : 0,
        style : {
            color : '#FFF'
        }
    },

    plotOptions : {
        line : {
            dataLabels : {
                color : '#CCC'
            },
            marker : {
                lineColor : '#333'
            }
        },
        areaspline : {
            marker : {
                enabled : false
            }
        },
        scatter : {
            marker : {
                lineColor : '#333'
            }
        }
    },

    toolbar : {
        itemStyle : {
            color : '#CCC'
        }
    }
});