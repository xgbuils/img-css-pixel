module.exports = function(iterator, maxIterations) {
    maxIterations = maxIterations || Infinity
    var array = []
    var state
    while (!(state = iterator.next()).done && maxIterations-- > 0) {
        array.push(state.value)
    }
    return array
}
