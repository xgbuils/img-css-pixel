var reduce = require('./iterator_reduce')
var GridIterator = require('./grid_iterator')
var arrayToCssColor = require('./array_to_css_color')

function calculateCssStyle(buffer, options) {
    var gridIterator = new GridIterator(options)
    var size = options.size
    var calculateCellAverageColor = options.calculateCellAverageColor
    var boxShadow = reduce(gridIterator, function(acc, position) {
        var cssAverageColor = arrayToCssColor(calculateCellAverageColor(buffer, {
            position: position,
            size: options.size,
            grid: options.grid
        }))
        var xCoord = size * position.x
        var yCoord = size * (position.y + 1)
        acc.push(xCoord + 'px ' + yCoord + 'px 0 ' + cssAverageColor)
        return acc
    }, []).join(',')
    return 'box-shadow: ' + boxShadow + ';width:' + size + 'px;height:' + size + 'px'
}

module.exports = calculateCssStyle
