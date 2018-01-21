var test = require('tape')
var tapSpec = require('tap-spec')

var gridIterator = require('./grid_iterator')
var cellIterator = require('./cell_iterator')
var calculateCellAverageColor = require('./calculate_cell_average_color')
var calculateCssBoxShadow = require('./calculate_css_style')
var arrayToCssColor = require('./array_to_css_color')

var testSuites = [
    gridIterator,
    cellIterator,
    calculateCellAverageColor,
    calculateCssBoxShadow,
    arrayToCssColor
]

testSuites.forEach(function(fn) {
    fn(test)
})

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout)
