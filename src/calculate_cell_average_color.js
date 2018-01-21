var reduce = require('./iterator_reduce')
var CellIterator = require('./cell_iterator')

function calculateCellAverageColor(buffer, options) {
    var cellSize = options.size
    var cellArea = cellSize * cellSize
    var cellIterator = new CellIterator({
        position: options.position,
        size: cellSize,
        grid: options.grid
    })
    return reduce(cellIterator, function(sumColor, index) {
        var acc = sumColor.map(function(c, j) {
            return c + buffer[4 * index + j]
        })
        return acc
    }, [0, 0, 0])
        .map(function(sumColorFragment) {
            return Math.round(sumColorFragment / cellArea)
        })
}

module.exports = calculateCellAverageColor
