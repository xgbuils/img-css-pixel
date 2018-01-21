var calculateCellAverageColor = require('../src/calculate_cell_average_color')

var createGrid = function() {
    return {
        width: 4,
        height: 4
    }
}

/* eslint-disable no-multi-spaces */
var createBuffer = function() {
    return [
        0x26, 0x22, 0x84, 0, 0x26, 0x22, 0x84, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0x33, 0x33, 0x33, 0, 0x55, 0x55, 0x55, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,    0,    0,    0,    0,    0,    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,    0,    0,    0,    0,    0,    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
}
/* eslint-enable no-multi-spaces */

module.exports = function(test) {
    test('calculateCellAverageColor', function(t) {
        t.test('getting index of cell (0, 0)', function(st) {
            var averageColor = calculateCellAverageColor(createBuffer(), {
                grid: createGrid(),
                size: 2,
                position: {
                    x: 0,
                    y: 0
                }
            })
            st.deepEqual(averageColor, [0x35, 0x33, 0x64])
            st.end()
        })
    })
}
