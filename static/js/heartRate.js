$(function () {
    
    $.fx.speeds._default = 300;     // default animation duration
    
    $(document).ready(function() {
        
        var chart;
        var chartMinTime;
        var chartMaxTime;
        
        var showHelpTask;
        
        var initialTime;
        var tapCount = 0;
        var lastMeasurementTime = 0;
        var lastTapTime = 0;
        
        var showHelp = function() {
            $(HELP_LABEL_SELECTOR).animate({opacity : 1});
            $(BPM_LABEL_SELECTOR).animate({opacity : FADED_LABEL_OPACITY});
            model.fullHeartCount(0);
        };
        
        var showBpm = function() {
            $(BPM_LABEL_SELECTOR).animate({opacity : 1});
            $(HELP_LABEL_SELECTOR).animate({opacity : FADED_LABEL_OPACITY});
        };
        
        var plotAverageBpm = function() {
            var AVERAGE_BPM_LINE_ID = 'averageBpmLine';
            
            var seriesData = chart.series[0].data;
            var measurementCount = 0;
            var measurementSum = 0;
            
            for (i in seriesData) {
                if(seriesData[i].x > chartMinTime && seriesData[i].x < chartMaxTime) {
                    measurementSum += seriesData[i].y;
                    measurementCount++;
                }
            }
            var averageBpm = Math.round(measurementSum / measurementCount);
            
            chart.yAxis[0].removePlotLine(AVERAGE_BPM_LINE_ID);
            chart.yAxis[0].addPlotLine({
                value: averageBpm,
                color: 'white',
                width: 3,
                id: AVERAGE_BPM_LINE_ID,
                label: {
                    text : averageBpm + ' BPM',
                    align:'center',
                    y : -5,
                    style: {
                        'color':'white',
                        'font-size' : '16pt'
                    }
                },
                dashStyle:'LongDash',
                zIndex : 5
            });
            if(averageBpm) {
                
                var timestamp;
                var now = Date.now().getTime();
                
                var item = model.historyItems.shift();
                if (item && now - item.timestamp < MAX_CHART_RANGE * 60 * 1000) {
                    timestamp = item.timestamp;
                }
                else {
                    if(item) {
                        model.historyItems.unshift(item);
                    }
                    timestamp = now;
                }
                
                model.historyItems.unshift({
                    timestamp : timestamp,
                    bpm : averageBpm
                });
                
                saveHistory();
            }
        }
        
        var plotBpmValue = function(bpmValue) {
            var elapsedMinutes = (Date.now() - initialTime) / (60 * 1000);
            updateXAxisRange();
            plotAverageBpm();
            chart.series[0].addPoint([elapsedMinutes, bpmValue]);
        }
        
        var startBeatEffect = function() {
            $(BPM_LABEL_SELECTOR).css({'font-size' : FONT_SIZE_BEAT});
            setTimeout(stopBeatEffect, BEAT_EFFECT_DURATION);
        }
        
        var stopBeatEffect = function() {
            $(BPM_LABEL_SELECTOR).css({'font-size' : FONT_SIZE_BPM});
        }
        
        var updateXAxisRange = function() {
            var elapsedMinutes = (Date.now() - initialTime) / (60*1000);
            chartMinTime = Math.max(elapsedMinutes - MAX_CHART_RANGE, 0);
            chartMaxTime = elapsedMinutes;
            chart.xAxis[0].setExtremes(chartMinTime, chartMaxTime, false, false);
        }
        
        var onBeat = function() {
            
            if(!$('#container-'+TAB_NAMES[0]).is(':visible')) {
                return;
            }
            
            tapCount++;
            
            startBeatEffect();
            showBpm();
            
            if(showHelpTask) {
                clearTimeout(showHelpTask);
            }
            showHelpTask = setTimeout(showHelp, TAP_COUNT_TIMEOUT);
            
            if(Date.now() - lastTapTime > TAP_COUNT_TIMEOUT) {
                tapCount = 0;
            }
            
            lastTapTime = Date.now();
            
            model.fullHeartCount(1 + tapCount % TAPS_PER_MEASUREMENT)
            
            if(tapCount == 0) {
                lastMeasurementTime = Date.now();
            }
            else if (tapCount % TAPS_PER_MEASUREMENT == 0) {
                
                var elapsedSeconds = (Date.now() - lastMeasurementTime) / 1000;
                var bpm = TAPS_PER_MEASUREMENT * 60 / elapsedSeconds;
                 
                lastMeasurementTime = Date.now();
                if (!initialTime) {
                    initialTime = lastMeasurementTime;
                }
                $(BPM_LABEL_SELECTOR).text(Highcharts.numberFormat(bpm, 0))
                setTimeout(function(){
                    plotBpmValue(bpm);    
                }, PLOT_POINT_DELAY)
             }
        }
        
        var resizeChartClickShield = function(chart){
            var c = $(chart.container);
            $(CHART_CLICK_SHIELD_SELECTOR).css({
                top: c.offset().top,
                left: c.offset().left,
                width: c.width(),
                height: c.height()        
            });
        }
        
        $('#container-Measure').on('touchstart',function(){
            onBeat(); 
        });
        
        if(!isIos) {
            $('#container-Measure').mousedown(function() {
                onBeat();
            });
        }
        
        $(document).keypress(function() {
            onBeat();
        });
        
        $(document).on('tabChanged', function(){
            resizeChartClickShield(chart);
        });
        
        chart = new Highcharts.Chart(chartArgs, resizeChartClickShield);
        showHelpTask = setTimeout(showHelp, INITIAL_SHOW_HELP_DELAY);
        
        loadHistory();
        $('.noselect').on('onselectstart',function(){return false;});
    });
    
});