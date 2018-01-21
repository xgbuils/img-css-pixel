var processIterator = require('./utils/process_iterator')
var CellIterator = require('../src/cell_iterator')

var MAX_ITERATIONS = 10

var createGrid = function() {
    return {      //  0  1  2  3  4
        width: 5, //  5  6  7  8  9
        height: 5 // 10 11 12 13 14
    }             // 15 16 17 18 19
}                 // 20 21 22 23 24

module.exports = function(test) {
    test('CellIterator', function(t) {
        t.test('getting index of cell (0, 0)', function(st) {
            var iterator = new CellIterator({
                grid: createGrid(),
                size: 2,
                position: {
                    x: 0,
                    y: 0
                }
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [0, 1, 5, 6])
            st.end()
        })

        t.test('getting index of cell (1, 0)', function(st) {
            var iterator = new CellIterator({
                grid: createGrid(),
                size: 2,
                position: {
                    x: 1,
                    y: 0
                }
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [2, 3, 7, 8])
            st.end()
        })

        t.test('getting index of cell (1, 1)', function(st) {
            var iterator = new CellIterator({
                grid: createGrid(),
                size: 2,
                position: {
                    x: 1,
                    y: 1
                }
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [12, 13, 17, 18])
            st.end()
        })

        t.test('getting index of cell (2, 1)', function(st) {
            var iterator = new CellIterator({
                grid: createGrid(),
                size: 2,
                position: {
                    x: 2,
                    y: 1
                }
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [14, 19])
            st.end()
        })

        t.test('getting index of cell (0, 2)', function(st) {
            var iterator = new CellIterator({
                grid: createGrid(),
                size: 2,
                position: {
                    x: 0,
                    y: 2
                }
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [20, 21])
            st.end()
        })

        t.test('getting index of cell (0, 2)', function(st) {
            var iterator = new CellIterator({
                grid: createGrid(),
                size: 2,
                position: {
                    x: 2,
                    y: 2
                }
            })
            st.deepEqual(processIterator(iterator, MAX_ITERATIONS), [24])
            st.end()
        })
    })
}
