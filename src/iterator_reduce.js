function reduce(iterator, cb, acc) {
    var state
    while (!(state = iterator.next()).done) {
        acc = cb(acc, state.value)
    }
    return acc
}

module.exports = reduce
