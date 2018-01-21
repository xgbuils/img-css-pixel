var GridIterator = function(options) {
    this.cols = options.cols
    this.rows = options.rows
    this.x = 0
    this.y = 0
}

GridIterator.prototype.next = function() {
    if (this.x >= this.cols) {
        this.x = 0
        ++this.y
    }
    var value = {
        x: this.x,
        y: this.y
    }
    ++this.x
    return this.y >= this.rows || this.cols === 0 ? {done: true} : {value: value}
}

module.exports = GridIterator
