var calculateCssStyle = require('../src/calculate_css_style')

var calculateCellAverageColorMock = (function() {
    var arr = [
        [0x22, 0x33, 0x44],
        [0x55, 0x66, 0x77],
        [0x88, 0x99, 0xaa],
        [0xbb, 0xcc, 0xdd]
    ]
    var index = 0
    return function() {
        var color = arr[index]
        index = (index + 1) % arr.length
        return color
    }
})()

module.exports = function(test) {
    test('calculateCssStyle', function(t) {
        t.test('getting index of cell (0, 0)', function(st) {
            var averageColor = calculateCssStyle({}, {
                cols: 2,
                rows: 2,
                size: 20,
                calculateCellAverageColor: calculateCellAverageColorMock
            })
            st.deepEqual(averageColor, 'box-shadow: 0px 20px 0 #223344,20px 20px 0 #556677,0px 40px 0 #8899aa,20px 40px 0 #bbccdd;width:20px;height:20px')
            st.end()
        })
    })
}
