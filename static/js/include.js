var TAPS_PER_MEASUREMENT = 4;
var MAX_CHART_RANGE = 5; // minutes

var FADED_LABEL_OPACITY = 0.33;
var FONT_SIZE_BPM = '46pt';
var FONT_SIZE_BEAT = '60pt';

var INITIAL_SHOW_HELP_DELAY = 1000;
var TAP_COUNT_TIMEOUT = 2000;
var BEAT_EFFECT_DURATION = 50;

var PLOT_POINT_DELAY = BEAT_EFFECT_DURATION + 10;   // helps responsiveness

var BPM_LABEL_SELECTOR = '.bpmLabel';
var HELP_LABEL_SELECTOR = '#helpLabel';
var CHART_CLICK_SHIELD_SELECTOR = '#chartClickShield';

var isIos = (navigator.userAgent.match(/iPhone/i)) || 
            (navigator.userAgent.match(/iPod/i)) ||
            (navigator.userAgent.match(/iPad/i));