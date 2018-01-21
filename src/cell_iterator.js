var CellIterator = function(options) {
    var position = options.position
    var cellSize = options.size
    var grid = options.grid
    this.cellWidth = Math.min(grid.width - cellSize * position.x, cellSize)
    var cellHeight = Math.min(grid.height - cellSize * position.y, cellSize)
    this.width = grid.width
    this.offset = (position.y * grid.width + position.x) * cellSize
    this.endRow = this.offset + this.cellWidth
    this.end = this.endRow + (cellHeight - 1) * grid.width
}

CellIterator.prototype.next = function() {
    var value = this.offset
    var offset = this.offset + 1
    if (offset >= this.endRow) {
        this.endRow += this.width
        offset = this.endRow - this.cellWidth
    }
    this.offset = offset
    return value >= this.end ? {done: true} : {value: value}
}

module.exports = CellIterator
