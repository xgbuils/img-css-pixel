var test = require('tape')
var tapSpec = require('tap-spec')

var gridIterator = require('./grid_iterator')
var cellIterator = require('./cell_iterator')
var calculateCellAverageColor = require('./calculate_cell_average_color')
var calculateCssBoxShadow = require('./calculate_css_style')

var testSuites = [
    gridIterator,
    cellIterator,
    calculateCellAverageColor,
    calculateCssBoxShadow
]

testSuites.forEach(function(fn) {
    fn(test)
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
