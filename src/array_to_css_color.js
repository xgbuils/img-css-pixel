function arrayToCssColor(array) {
    return '#' + array.map(function(chunk) {
        return ('00' + chunk.toString(16)).substr(-2, 2)
    }).join('')
}

module.exports = arrayToCssColor
