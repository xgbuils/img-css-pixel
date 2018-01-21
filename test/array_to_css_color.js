var arrayToCssColor = require('../src/array_to_css_color')

module.exports = function(test) {
    test('arrayToCssColor', function(t) {
        t.test('given numbers with 2 hexadecimal digits, it is correcly transformed', function(st) {
            var cssColor = arrayToCssColor([0x35, 0x33, 0x64])
            st.equal(cssColor, '#353364')
            st.end()
        })

        t.test('given numbers with 1 hexadecimal digits, it is correcly transformed', function(st) {
            var cssColor = arrayToCssColor([0x08, 0x0f, 0x01])
            st.equal(cssColor, '#080f01')
            st.end()
        })
    })
}
