var calculateCssStyle = require('./calculate_css_style')
var calculateCellAverageColor = require('./calculate_cell_average_color')

var byId = document.getElementById.bind(document)

var app = function() {
    var elements = createImageElements()
    bindImageEvents(elements)
}

var createImageElements = function() {
    var canvas = byId('image_canvas')
    return {
        image: byId('image'),
        canvas: canvas,
        pixelarButton: byId('pixelar_button'),
        pixelatedContainer: byId('pixelated_css'),
        pixelsInput: byId('num_pixels'),
        context: canvas.getContext('2d')
    }
}

var updateCanvas = function(elements) {
    var image = elements.image
    var canvas = elements.canvas
    var height = canvas.height
    var width = height * image.width / image.height
    canvas.height = height
    canvas.width = width
    elements.context.drawImage(image, 0, 0, width, height)
}

var showCanvas = function(elements) {
    elements.image.classList.add('hidden')
    elements.canvas.classList.remove('hidden')
}

var showPixelarButton = function(elements) {
    elements.pixelarButton.classList.remove('hidden')
}

var drawPixelatedCssImage = function(elements) {
    var size = Number(elements.pixelsInput.value)
    var width = elements.canvas.width
    var height = elements.canvas.height
    var cols = Math.ceil(width / size)
    var rows = Math.ceil(height / size)
    var buffer = elements.context.getImageData(0, 0, width, height).data
    var style = calculateCssStyle(buffer, {
        size: size,
        cols: cols,
        rows: rows,
        grid: {
            width: width,
            height: height
        },
        calculateCellAverageColor: calculateCellAverageColor
    })
    elements.pixelatedContainer.setAttribute('style', style)
}

var bindImageEvents = function(elements) {
    elements.image.addEventListener('load', function() {
        showCanvas(elements)
        updateCanvas(elements)
        showPixelarButton(elements)
    })
    elements.pixelarButton.addEventListener('click', function() {
        drawPixelatedCssImage(elements)
    })
}

document.addEventListener('DOMContentLoaded', app)
