/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function reduce(iterator, cb, acc) {
    var state
    while (!(state = iterator.next()).done) {
        acc = cb(acc, state.value)
    }
    return acc
}

module.exports = reduce


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var calculateCssStyle = __webpack_require__(2)
var calculateCellAverageColor = __webpack_require__(4)

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var reduce = __webpack_require__(0)
var GridIterator = __webpack_require__(3)

function calculateCssStyle(buffer, options) {
    var gridIterator = new GridIterator(options)
    var size = options.size
    var boxShadow = reduce(gridIterator, function(acc, position) {
        var averageColor = options.calculateCellAverageColor(buffer, {
            position: position,
            size: options.size,
            grid: options.grid
        })
            .map(function(color) {
                return ('00' + color.toString(16)).substr(-2,2);
            })
            .join('')
        var xCoord = size * position.x
        var yCoord = size * (position.y + 1)
        acc.push(xCoord + 'px ' + yCoord + 'px 0 #' + averageColor)
        return acc
    }, []).join(',')
    return 'box-shadow: ' + boxShadow + ';width:' + size + 'px;height:' + size + 'px'
}

module.exports = calculateCssStyle


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var reduce = __webpack_require__(0)
var CellIterator = __webpack_require__(5)

function calculateCellAverageColor(buffer, options) {
    var cellSize = options.size
    var cellArea = cellSize * cellSize
    var cellIterator = new CellIterator({
        position: options.position,
        size: cellSize,
        grid: options.grid
    })
    return reduce(cellIterator, function(sumColor, index) {
        var acc = sumColor.map(function(c, j) {
            return c + buffer[4 * index + j]
        })
        return acc
    }, [0, 0, 0])
        .map(function(sumColorFragment) {
            return Math.round(sumColorFragment / cellArea)
        })
}

module.exports = calculateCellAverageColor


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var CellIterator = function(options) {
    var position = options.position
    var cellSize = options.size
    var grid = options.grid
    this.cellWidth = Math.min(grid.width - cellSize * position.x, cellSize)
    var cellHeight = Math.min(grid.height - cellSize * position.y, cellSize)
    this.width = grid.width
    this.offset = (position.y * grid.width + position.x) * cellSize
    this.endRow = this.offset + this.cellWidth
    this.end = this.endRow + (cellHeight - 1) * grid.width
}

CellIterator.prototype.next = function() {
    var value = this.offset
    var offset = this.offset + 1
    if (offset >= this.endRow) {
        this.endRow += this.width
        offset = this.endRow - this.cellWidth
    }
    this.offset = offset
    return value >= this.end ? {done: true} : {value: value}
}

module.exports = CellIterator


/***/ })
/******/ ]);