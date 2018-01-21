var processIterator = require('./utils/process_iterator')
var GridIterator = require('../src/grid_iterator')

var MAX_ITERATIONS = 10

module.exports = function(test) {
    test('GridIterator', function(t) {
        t.test('Given rows and cols, it iterates over coords', function(st) {
            var iterator = new GridIterator({
                rows: 2,
                cols: 3
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [{
                x: 0,
                y: 0
            }, {
                x: 1,
                y: 0
            }, {
                x: 2,
                y: 0
            }, {
                x: 0,
                y: 1
            }, {
                x: 1,
                y: 1
            }, {
                x: 2,
                y: 1
            }])
            st.end()
        })

        t.test('zero rows implies empty iterator', function(st) {
            var iterator = new GridIterator({
                rows: 0,
                cols: 3
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [])
            st.end()
        })

        t.test('zero cols implies empty iterator', function(st) {
            var iterator = new GridIterator({
                rows: 2,
                cols: 0
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [])
            st.end()
        })
    })
}
