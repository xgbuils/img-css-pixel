var reduce = require('./iterator_reduce')
var GridIterator = require('./grid_iterator')

function calculateCssStyle(buffer, options) {
    var gridIterator = new GridIterator(options)
    var size = options.size
    var boxShadow = reduce(gridIterator, function(acc, position) {
        var averageColor = options.calculateCellAverageColor(buffer, {
            position: position,
            size: options.size,
            grid: options.grid
        })
            .map(function(color) {
                return ('00' + color.toString(16)).substr(-2, 2)
            })
            .join('')
        var xCoord = size * position.x
        var yCoord = size * position.y
        acc.push(xCoord + 'px ' + yCoord + 'px 0 #' + averageColor)
        return acc
    }, []).join(',')
    return 'box-shadow: ' + boxShadow + ';width:' + size + 'px;height:' + size + 'px'
}

module.exports = calculateCssStyle
