#! /bin/sh
# <script src="js/knockout-2.1.0.js"></script>
# <script src="js/date.js"></script>

# <script src="js/viewModel.js"></script>
# <script src="js/hideAddressBar.js"></script>
# <script src="js/highcharts/highcharts.js"></script>
# <script src="js/chartOptions.js"></script>
# <script src="js/heartRate.js"></script>

cd ../static/js
cat knockout-2.1.0.js date.js config.js viewModel.js hideAddressBar.js highcharts/highcharts.js chartOptions.js heartRate.js > ../../build/heartRate.concat.js
cd ../../build
java -jar yuicompressor-*.jar heartRate.concat.js > ../static/js-min/heartRate.min.js
rm -f heartRate.concat.js