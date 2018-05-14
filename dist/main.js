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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@pop3/graphics/index.js":
/*!**********************************************!*\
  !*** ./node_modules/@pop3/graphics/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const toDataView = __webpack_require__(/*! to-data-view */ \"./node_modules/to-data-view/index.js\")\n\nconst Font = __webpack_require__(/*! ./lib/font */ \"./node_modules/@pop3/graphics/lib/font.js\")\nconst Palette = __webpack_require__(/*! ./lib/palette */ \"./node_modules/@pop3/graphics/lib/palette.js\")\nconst Sprite = __webpack_require__(/*! ./lib/sprite */ \"./node_modules/@pop3/graphics/lib/sprite.js\")\n\nclass Manager {\n  /**\n   * @param {Map<string, ArrayBuffer | Uint8Array>} files\n   */\n  constructor (files) {\n    this.files = files\n  }\n\n  /**\n   * @param {string} spriteName\n   * @param {number} width\n   * @param {number} height\n   */\n  getRawSprite (spriteName, width, height) {\n    const view = toDataView(this.files.get(spriteName))\n    const data = new Int8Array(view.buffer, view.byteOffset, view.byteLength)\n\n    return new Sprite('raw', data, width, height)\n  }\n\n  /**\n   * @param {string} spriteFileName\n   * @param {string | null} paletteName\n   */\n  getFont (spriteFileName, paletteName = null) {\n    const sprites = Sprite.loadSpriteFile(this.files.get(spriteFileName))\n    const palette = this.getPalette(paletteName)\n\n    return new Font(sprites, palette)\n  }\n\n  /**\n   * @param {string | null} paletteName\n   */\n  getPalette (paletteName = null) {\n    return paletteName ? Palette.loadPalette(this.files.get(paletteName)) : Palette.default\n  }\n\n  /**\n   * @param {string} spriteFileName\n   */\n  getSprites (spriteFileName) {\n    return Sprite.loadSpriteFile(this.files.get(spriteFileName))\n  }\n}\n\n/**\n * @param {Map<string, ArrayBuffer | Uint8Array>} files\n */\nmodule.exports = function init (files) {\n  return new Manager(files)\n}\n\n\n//# sourceURL=webpack:///./node_modules/@pop3/graphics/index.js?");

/***/ }),

/***/ "./node_modules/@pop3/graphics/lib/font.js":
/*!*************************************************!*\
  !*** ./node_modules/@pop3/graphics/lib/font.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Sprite = __webpack_require__(/*! ./sprite */ \"./node_modules/@pop3/graphics/lib/sprite.js\") // eslint-disable-line no-unused-vars\nconst Palette = __webpack_require__(/*! ./palette */ \"./node_modules/@pop3/graphics/lib/palette.js\") // eslint-disable-line no-unused-vars\n\nclass Font {\n  /**\n   * @param {Sprite[]} sprites\n   * @param {Palette} palette\n   */\n  constructor (sprites, palette) {\n    this.sprites = sprites\n    this.palette = palette\n  }\n\n  /**\n   * @param {string} text\n   */\n  renderText (text) {\n    const { height, width } = this.measureText(text)\n    const canvas = document.createElement('canvas')\n\n    canvas.width = width\n    canvas.height = height\n\n    this.drawText(canvas.getContext('2d'), text, 0, 0)\n\n    return canvas\n  }\n\n  /**\n   * @param {CanvasRenderingContext2D} context\n   * @param {string} text\n   * @param {number} x\n   * @param {number} y\n   */\n  drawText (context, text, x, y) {\n    let offset = 0\n\n    for (const char of text) {\n      const sprite = this.sprites[char.codePointAt(0) - 32]\n\n      if (!sprite) {\n        throw new Error(`Unsupported char code: ${char.codePointAt(0)}`)\n      }\n\n      sprite.draw(context, this.palette, x + offset, y)\n      offset += sprite.width\n    }\n  }\n\n  /**\n   * @param {string} text\n   */\n  measureText (text) {\n    let width = 0\n    let height = 0\n\n    for (const char of text) {\n      const sprite = this.sprites[char.codePointAt(0) - 32]\n\n      if (!sprite) {\n        throw new Error(`Unsupported char code: ${char.codePointAt(0)}`)\n      }\n\n      width += sprite.width\n      height = Math.max(height, sprite.height)\n    }\n\n    return { width, height }\n  }\n}\n\nmodule.exports = Font\n\n\n//# sourceURL=webpack:///./node_modules/@pop3/graphics/lib/font.js?");

/***/ }),

/***/ "./node_modules/@pop3/graphics/lib/palette.js":
/*!****************************************************!*\
  !*** ./node_modules/@pop3/graphics/lib/palette.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* global ImageData */\n\nconst toDataView = __webpack_require__(/*! to-data-view */ \"./node_modules/to-data-view/index.js\")\n\nfunction generateDefaultPalette () {\n  return new Palette(Uint32Array.from({ length: 256 }, (_, idx) => {\n    return (0x00 << 24) | (idx << 16) | (idx << 8) | idx\n  }))\n}\n\nclass Palette {\n  /**\n   * @param {Uint32Array} colors\n   */\n  constructor (colors) {\n    this.colors = colors\n  }\n\n  /**\n   * @param {number} index\n   */\n  getPixelData (index) {\n    const color = this.colors[index]\n    const data = new Uint8ClampedArray(4)\n\n    data[0] = (color >> 0) & 0xff\n    data[1] = (color >> 8) & 0xff\n    data[2] = (color >> 16) & 0xff\n    data[3] = 0xff - (color >> 24) & 0xff\n\n    return new ImageData(data, 1, 1)\n  }\n\n  /**\n   * @param {number} index\n   */\n  getPixelColorString (index) {\n    const color = this.colors[index]\n    const data = new Uint8ClampedArray(4)\n\n    data[0] = (color >> 0) & 0xff\n    data[1] = (color >> 8) & 0xff\n    data[2] = (color >> 16) & 0xff\n    data[3] = 0xff - ((color >> 24) & 0xff)\n\n    return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3] / 255).toFixed(3)})`\n  }\n\n  /**\n   * @param {CanvasRenderingContext2D} context\n   * @param {number} index\n   * @param {number} x\n   * @param {number} y\n   */\n  drawPixel (context, index, x, y) {\n    context.fillStyle = this.getPixelColorString(index)\n    context.fillRect(x, y, 1, 1)\n  }\n}\n\nPalette.default = generateDefaultPalette()\n\n/**\n * @param {ArrayBuffer | Uint8Array} source\n */\nPalette.loadPalette = function loadPalette (source) {\n  const view = toDataView(source)\n\n  return new Palette(new Uint32Array(view.buffer, 0, 256))\n}\n\nmodule.exports = Palette\n\n\n//# sourceURL=webpack:///./node_modules/@pop3/graphics/lib/palette.js?");

/***/ }),

/***/ "./node_modules/@pop3/graphics/lib/sprite.js":
/*!***************************************************!*\
  !*** ./node_modules/@pop3/graphics/lib/sprite.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const toDataView = __webpack_require__(/*! to-data-view */ \"./node_modules/to-data-view/index.js\")\n\nconst Palette = __webpack_require__(/*! ./palette */ \"./node_modules/@pop3/graphics/lib/palette.js\")\n\nconst magicNumber = 0x42465350\n\nclass Sprite {\n  /**\n   * @param {'raw' | 'compressed'} type\n   * @param {Int8Array} data\n   * @param {number} width\n   * @param {number} height\n   */\n  constructor (type, data, width, height) {\n    this.type = type\n    this.data = data\n    this.width = width\n    this.height = height\n  }\n\n  /**\n   * @param {Palette | null} palette\n   */\n  render (palette) {\n    if (palette == null) palette = Palette.default\n\n    const canvas = document.createElement('canvas')\n\n    canvas.width = this.width\n    canvas.height = this.height\n\n    this.draw(canvas.getContext('2d'), palette, 0, 0)\n\n    return canvas\n  }\n\n  /**\n   * @param {CanvasRenderingContext2D} context\n   * @param {Palette | null} palette\n   * @param {number} dx\n   * @param {number} dy\n   */\n  draw (context, palette, dx, dy) {\n    if (palette == null) palette = Palette.default\n\n    if (this.type === 'compressed') return this._drawCompressed(context, palette, dx, dy)\n    if (this.type === 'raw') return this._drawRaw(context, palette, dx, dy)\n  }\n\n  /**\n   * @private\n   * @param {CanvasRenderingContext2D} context\n   * @param {Palette} palette\n   * @param {number} dx\n   * @param {number} dy\n   */\n  _drawCompressed (context, palette, dx, dy) {\n    let pos = 0\n\n    const udata = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.length)\n\n    for (let y = dy; y < dy + this.height; y++) {\n      let x = dx\n\n      while (1) {\n        const counter = this.data[pos]; pos += 1\n\n        if (counter === 0) {\n          break\n        }\n\n        if (counter < 0) {\n          x += -counter\n        }\n\n        if (counter > 0) {\n          for (let i = 0; i < counter; i++) {\n            const pixelIndex = udata[pos]; pos += 1\n            palette.drawPixel(context, pixelIndex, x, y); x += 1\n          }\n        }\n      }\n    }\n  }\n\n  /**\n   * @private\n   * @param {CanvasRenderingContext2D} context\n   * @param {Palette} palette\n   * @param {number} dx\n   * @param {number} dy\n   */\n  _drawRaw (context, palette, dx, dy) {\n    let pos = 0\n\n    const udata = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.length)\n\n    for (let y = dy; y < dy + this.height; y++) {\n      for (let x = dx; x < dx + this.width; x++) {\n        const pixelIndex = udata[pos]; pos += 1\n        palette.drawPixel(context, pixelIndex, x, y)\n      }\n    }\n  }\n}\n\n/**\n * @param {ArrayBuffer} buffer\n * @param {number} byteOffset\n * @param {number} width\n * @param {number} height\n */\nSprite.compressedByteLength = function compressedByteLength (buffer, byteOffset, width, height) {\n  let pos = 0\n\n  const data = new Int8Array(buffer, byteOffset)\n\n  for (let y = 0; y < height; y++) {\n    while (1) {\n      const counter = data[pos]; pos += 1\n\n      if (counter === 0) {\n        break\n      }\n\n      if (counter > 0) {\n        pos += counter\n      }\n    }\n  }\n\n  return pos\n}\n\n/**\n * @param {ArrayBuffer | Uint8Array} source\n */\nSprite.loadSpriteFile = function loadSpriteFile (source) {\n  const view = toDataView(source)\n\n  if (view.getUint32(0, true) !== magicNumber) {\n    throw new Error(`File did not start with the magic number, expected ${magicNumber.toString(16)} got ${view.getUint32(0).toString(16)}`)\n  }\n\n  let pos = 8\n  const spriteCount = view.getUint32(4, true)\n\n  return Array.from({ length: spriteCount }, () => {\n    const width = view.getUint16(pos, true); pos += 2\n    const height = view.getUint16(pos, true); pos += 2\n    const offset = view.getUint32(pos, true); pos += 4\n    const length = Sprite.compressedByteLength(view.buffer, offset, width, height)\n\n    return new Sprite('compressed', new Int8Array(view.buffer, offset, length), width, height)\n  })\n}\n\nmodule.exports = Sprite\n\n\n//# sourceURL=webpack:///./node_modules/@pop3/graphics/lib/sprite.js?");

/***/ }),

/***/ "./node_modules/file-to-array-buffer/index.js":
/*!****************************************************!*\
  !*** ./node_modules/file-to-array-buffer/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* global FileReader */\n\n\n\nmodule.exports = function fileToArrayBuffer (file) {\n  return new Promise(function (resolve, reject) {\n    const reader = new FileReader()\n\n    reader.onerror = function onerror (ev) {\n      reject(ev.target.error)\n    }\n\n    reader.onload = function onload (ev) {\n      resolve(ev.target.result)\n    }\n\n    reader.readAsArrayBuffer(file)\n  })\n}\n\n\n//# sourceURL=webpack:///./node_modules/file-to-array-buffer/index.js?");

/***/ }),

/***/ "./node_modules/performance-now/lib/performance-now.js":
/*!*************************************************************!*\
  !*** ./node_modules/performance-now/lib/performance-now.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2\n(function() {\n  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;\n\n  if ((typeof performance !== \"undefined\" && performance !== null) && performance.now) {\n    module.exports = function() {\n      return performance.now();\n    };\n  } else if ((typeof process !== \"undefined\" && process !== null) && process.hrtime) {\n    module.exports = function() {\n      return (getNanoSeconds() - nodeLoadTime) / 1e6;\n    };\n    hrtime = process.hrtime;\n    getNanoSeconds = function() {\n      var hr;\n      hr = hrtime();\n      return hr[0] * 1e9 + hr[1];\n    };\n    moduleLoadTime = getNanoSeconds();\n    upTime = process.uptime() * 1e9;\n    nodeLoadTime = moduleLoadTime - upTime;\n  } else if (Date.now) {\n    module.exports = function() {\n      return Date.now() - loadTime;\n    };\n    loadTime = Date.now();\n  } else {\n    module.exports = function() {\n      return new Date().getTime() - loadTime;\n    };\n    loadTime = new Date().getTime();\n  }\n\n}).call(this);\n\n//# sourceMappingURL=performance-now.js.map\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/performance-now/lib/performance-now.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/raf/index.js":
/*!***********************************!*\
  !*** ./node_modules/raf/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(/*! performance-now */ \"./node_modules/performance-now/lib/performance-now.js\")\n  , root = typeof window === 'undefined' ? global : window\n  , vendors = ['moz', 'webkit']\n  , suffix = 'AnimationFrame'\n  , raf = root['request' + suffix]\n  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]\n\nfor(var i = 0; !raf && i < vendors.length; i++) {\n  raf = root[vendors[i] + 'Request' + suffix]\n  caf = root[vendors[i] + 'Cancel' + suffix]\n      || root[vendors[i] + 'CancelRequest' + suffix]\n}\n\n// Some versions of FF have rAF but not cAF\nif(!raf || !caf) {\n  var last = 0\n    , id = 0\n    , queue = []\n    , frameDuration = 1000 / 60\n\n  raf = function(callback) {\n    if(queue.length === 0) {\n      var _now = now()\n        , next = Math.max(0, frameDuration - (_now - last))\n      last = next + _now\n      setTimeout(function() {\n        var cp = queue.slice(0)\n        // Clear queue here to prevent\n        // callbacks from appending listeners\n        // to the current frame's queue\n        queue.length = 0\n        for(var i = 0; i < cp.length; i++) {\n          if(!cp[i].cancelled) {\n            try{\n              cp[i].callback(last)\n            } catch(e) {\n              setTimeout(function() { throw e }, 0)\n            }\n          }\n        }\n      }, Math.round(next))\n    }\n    queue.push({\n      handle: ++id,\n      callback: callback,\n      cancelled: false\n    })\n    return id\n  }\n\n  caf = function(handle) {\n    for(var i = 0; i < queue.length; i++) {\n      if(queue[i].handle === handle) {\n        queue[i].cancelled = true\n      }\n    }\n  }\n}\n\nmodule.exports = function(fn) {\n  // Wrap in a new function to prevent\n  // `cancel` potentially being assigned\n  // to the native rAF function\n  return raf.call(root, fn)\n}\nmodule.exports.cancel = function() {\n  caf.apply(root, arguments)\n}\nmodule.exports.polyfill = function(object) {\n  if (!object) {\n    object = root;\n  }\n  object.requestAnimationFrame = raf\n  object.cancelAnimationFrame = caf\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/raf/index.js?");

/***/ }),

/***/ "./node_modules/to-data-view/index.js":
/*!********************************************!*\
  !*** ./node_modules/to-data-view/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function toDataView (data) {\n  if (data instanceof Uint8Array) {\n    return new DataView(data.buffer, data.byteOffset, data.byteLength)\n  }\n\n  if (data instanceof ArrayBuffer) {\n    return new DataView(data)\n  }\n\n  throw new TypeError('Expected `data` to be an ArrayBuffer or Uint8Array')\n}\n\n\n//# sourceURL=webpack:///./node_modules/to-data-view/index.js?");

/***/ }),

/***/ "./node_modules/uppie/uppie.js":
/*!*************************************!*\
  !*** ./node_modules/uppie/uppie.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! uppie v1.0.8 | (c) silverwind | BSD license */\n/* eslint-disable no-var */\n(function(root, m) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (m),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n})(typeof self !== \"undefined\" ? self : this, function() {\n  \"use strict\";\n  return function Uppie() {\n    return function(node, cb) {\n      if (node instanceof NodeList) {\n        [].slice.call(node).forEach(function(n) {\n          watch(n, cb);\n        });\n      } else {\n        watch(node, cb);\n      }\n    };\n  };\n\n  function watch(node, cb) {\n    if (node.tagName.toLowerCase() === \"input\" && node.type === \"file\") {\n      node.addEventListener(\"change\", function(event) {\n        var t = event.target;\n        if (t.files && t.files.length) {\n          arrayApi(t, cb.bind(null, event));\n        } else if (\"getFilesAndDirectories\" in t) {\n          newDirectoryApi(t, cb.bind(null, event));\n        } else {\n          cb(event);\n        }\n      });\n    } else {\n      var stop = function(event) { event.preventDefault(); };\n      node.addEventListener(\"dragover\", stop);\n      node.addEventListener(\"dragenter\", stop);\n      node.addEventListener(\"drop\", function(event) {\n        event.preventDefault();\n        var dt = event.dataTransfer;\n        if (dt.items && dt.items.length && \"webkitGetAsEntry\" in dt.items[0]) {\n          entriesApi(dt.items, cb.bind(null, event));\n        } else if (\"getFilesAndDirectories\" in dt) {\n          newDirectoryApi(dt, cb.bind(null, event));\n        } else if (dt.files) {\n          arrayApi(dt, cb.bind(null, event));\n        } else cb();\n      });\n    }\n  }\n\n  // API implemented in Firefox 42+ and Edge\n  function newDirectoryApi(input, cb) {\n    var fd = new FormData(), files = [];\n    var iterate = function(entries, path, resolve) {\n      var promises = [];\n      entries.forEach(function(entry) {\n        promises.push(new Promise(function(resolve) {\n          if (\"getFilesAndDirectories\" in entry) {\n            entry.getFilesAndDirectories().then(function(entries) {\n              iterate(entries, entry.path + \"/\", resolve);\n            });\n          } else {\n            if (entry.name) {\n              var p = (path + entry.name).replace(/^[/\\\\]/, \"\");\n              fd.append(\"files[]\", entry, p);\n              files.push(p);\n            }\n            resolve();\n          }\n        }));\n      });\n      Promise.all(promises).then(resolve);\n    };\n    input.getFilesAndDirectories().then(function(entries) {\n      new Promise(function(resolve) {\n        iterate(entries, \"/\", resolve);\n      }).then(cb.bind(null, fd, files));\n    });\n  }\n\n  // old prefixed API implemented in Chrome 11+ as well as array fallback\n  function arrayApi(input, cb) {\n    var fd = new FormData(), files = [];\n    [].slice.call(input.files).forEach(function(file) {\n      fd.append(\"files[]\", file, file.webkitRelativePath || file.name);\n      files.push(file.webkitRelativePath || file.name);\n    });\n    cb(fd, files);\n  }\n\n  // old drag and drop API implemented in Chrome 11+\n  function entriesApi(items, cb) {\n    var fd = new FormData(), files = [], rootPromises = [];\n\n    function readEntries(entry, reader, oldEntries, cb) {\n      var dirReader = reader || entry.createReader();\n      dirReader.readEntries(function(entries) {\n        var newEntries = oldEntries ? oldEntries.concat(entries) : entries;\n        if (entries.length) {\n          setTimeout(readEntries.bind(null, entry, dirReader, newEntries, cb), 0);\n        } else {\n          cb(newEntries);\n        }\n      });\n    }\n\n    function readDirectory(entry, path, resolve) {\n      if (!path) path = entry.name;\n      readEntries(entry, 0, 0, function(entries) {\n        var promises = [];\n        entries.forEach(function(entry) {\n          promises.push(new Promise(function(resolve) {\n            if (entry.isFile) {\n              entry.file(function(file) {\n                var p = path + \"/\" + file.name;\n                fd.append(\"files[]\", file, p);\n                files.push(p);\n                resolve();\n              }, resolve.bind());\n            } else readDirectory(entry, path + \"/\" + entry.name, resolve);\n          }));\n        });\n        Promise.all(promises).then(resolve.bind());\n      });\n    }\n\n    [].slice.call(items).forEach(function(entry) {\n      entry = entry.webkitGetAsEntry();\n      if (entry) {\n        rootPromises.push(new Promise(function(resolve) {\n          if (entry.isFile) {\n            entry.file(function(file) {\n              fd.append(\"files[]\", file, file.name);\n              files.push(file.name);\n              resolve();\n            }, resolve.bind());\n          } else if (entry.isDirectory) {\n            readDirectory(entry, null, resolve);\n          }\n        }));\n      }\n    });\n    Promise.all(rootPromises).then(cb.bind(null, fd, files));\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/uppie/uppie.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uppie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uppie */ \"./node_modules/uppie/uppie.js\");\n/* harmony import */ var uppie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uppie__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var file_to_array_buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! file-to-array-buffer */ \"./node_modules/file-to-array-buffer/index.js\");\n/* harmony import */ var file_to_array_buffer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(file_to_array_buffer__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var raf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! raf */ \"./node_modules/raf/index.js\");\n/* harmony import */ var raf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(raf__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _pop3_graphics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pop3/graphics */ \"./node_modules/@pop3/graphics/index.js\");\n/* harmony import */ var _pop3_graphics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_pop3_graphics__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu */ \"./src/menu.js\");\n\n\n\n\n\n\n\n\nconst uppie = new uppie__WEBPACK_IMPORTED_MODULE_0___default.a()\n\nfunction loadLanguage (file) {\n  const result = []\n  const view = new Uint16Array(file)\n\n  let buffer = ''\n  for (let i = 0; i < view.length; i++) {\n    if (view[i] === 0) {\n      result.push(buffer)\n      buffer = ''\n    } else {\n      buffer += String.fromCharCode(view[i])\n    }\n  }\n\n  return result\n}\n\nuppie(document.getElementById('dropzone'), async (_, formData) => {\n  const raw = Array.from(formData.entries(), item => item[1])\n  const load = (name) => file_to_array_buffer__WEBPACK_IMPORTED_MODULE_1___default()(raw.find(file => file.name.toLowerCase().endsWith(name)))\n\n  const files = new Map([\n    // ['data/fenew/feboxes.spr', await load('data/fenew/feboxes.spr')],\n    // ['data/fenew/feboxsp.spr', await load('data/fenew/feboxsp.spr')],\n    // ['data/hfx0-0.dat', await load('data/hfx0-0.dat')],\n    // ['data/hspr0-0.dat', await load('data/hspr0-0.dat')],\n\n    ['data/backpal.dat', await load('data/backpal.dat')],\n    ['data/fenew/febackg0.dat', await load('data/fenew/febackg0.dat')],\n    ['data/fenew/fecursor.spr', await load('data/fenew/fecursor.spr')],\n    ['data/fenew/feft33we.spr', await load('data/fenew/feft33we.spr')],\n    ['data/fenew/fehi33we.spr', await load('data/fenew/fehi33we.spr')],\n    ['data/fenew/felgsden.spr', await load('data/fenew/felgsden.spr')],\n    ['data/fenew/felgspen.spr', await load('data/fenew/felgspen.spr')],\n    ['data/fenew/felo20we.spr', await load('data/fenew/felo20we.spr')],\n    ['data/fenew/felo33we.spr', await load('data/fenew/felo33we.spr')],\n    ['data/fenew/fepal0.dat', await load('data/fenew/fepal0.dat')],\n    ['data/fenew/fepal1.dat', await load('data/fenew/fepal1.dat')],\n    ['data/fenew/fepointe.spr', await load('data/fenew/fepointe.spr')],\n    ['data/fenew/fesd33we.spr', await load('data/fenew/fesd33we.spr')],\n    ['language/lang00.dat', await load('language/lang00.dat')],\n  ])\n\n  const graphics = _pop3_graphics__WEBPACK_IMPORTED_MODULE_3___default()(files)\n\n  const palette0 = graphics.getPalette('data/fenew/fepal0.dat')\n  const palette1 = graphics.getPalette('data/fenew/fepal1.dat')\n  const backpal = graphics.getPalette('data/backpal.dat')\n\n  const background = graphics.getRawSprite('data/fenew/febackg0.dat', 640, 480).render(palette0)\n\n  const largeTextFont = graphics.getFont('data/fenew/felo33we.spr', 'data/fenew/fepal0.dat')\n  const smallTextFont = graphics.getFont('data/fenew/felo20we.spr', 'data/fenew/fepal0.dat')\n  const textLinkFont = graphics.getFont('data/fenew/feft33we.spr', 'data/fenew/fepal0.dat')\n  const textLinkHighlightFont = graphics.getFont('data/fenew/fehi33we.spr', 'data/fenew/fepal0.dat')\n  const textLinkShadowFont = graphics.getFont('data/fenew/fesd33we.spr', null)\n\n  const logo = graphics.getSprites('data/fenew/felgspen.spr').map(s => s.render(palette0))\n  const logoShadow = graphics.getSprites('data/fenew/felgsden.spr')[0].render(null)\n\n  const cursors = graphics.getSprites('data/fenew/fecursor.spr').map(s => s.render(null))\n  const pointer = graphics.getSprites('data/fenew/fepointe.spr')[0].render(palette0)\n\n  const language = loadLanguage(files.get('language/lang00.dat'))\n\n  const menu = new _menu__WEBPACK_IMPORTED_MODULE_4__[\"default\"](graphics, [\n    { text: language[309] },\n    { text: language[299] },\n    { text: language[300] },\n    { text: language[307] },\n    { text: language[326] },\n    { text: language[334] },\n    { text: language[445] },\n    { text: language[447] },\n    { text: language[308] }\n  ])\n\n  const canvas = document.createElement('canvas')\n\n  canvas.width = 640\n  canvas.height = 480\n\n  const context = canvas.getContext('2d')\n\n  context.imageSmoothingEnabled = false\n\n  document.body.removeChild(document.getElementById('dropzone'))\n  document.body.appendChild(canvas)\n\n  canvas.style.cursor = 'none'\n\n  let mouseX = 0\n  let mouseY = 0\n\n  canvas.addEventListener('mousemove', (ev) => {\n    mouseX = ev.offsetX\n    mouseY = ev.offsetY\n  })\n\n  const versionText = smallTextFont.renderText('version 1.03 @ nov 25 1998 14:19:50')\n\n  let i = 0\n  const draw = () => {\n    const tick = (i++ >> 2)\n\n    // console.time('draw')\n\n    context.drawImage(background, 0, 0)\n    context.drawImage(cursors[tick % cursors.length], mouseX - 64, mouseY - 64)\n\n    {\n      const x = canvas.width / 2\n      const y = 10 + (logo[0].height / 2)\n\n      context.globalAlpha = 0.3\n\n      const offsetX = (x - mouseX) / 32\n      const offsetY = (y - mouseY) / 32\n\n      context.drawImage(logoShadow, 174 + offsetX, 2 + offsetY)\n      context.globalAlpha = 1.0\n\n      context.drawImage(logo[0], 180, 10)\n      context.drawImage(logo[1], 460, 10)\n    }\n\n    menu.draw(context, mouseX, mouseY)\n\n    context.drawImage(versionText, 10, 480 - versionText.height - 1)\n\n    context.drawImage(pointer, mouseX - 1, mouseY - 1)\n\n    // console.timeEnd('draw')\n\n    raf__WEBPACK_IMPORTED_MODULE_2___default()(draw)\n  }\n\n  raf__WEBPACK_IMPORTED_MODULE_2___default()(draw)\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Menu; });\nclass Menu {\n  /**\n   * @param {object[]} items\n   * @param {string} items.text\n   */\n  constructor (graphics, items) {\n    const textLinkFont = graphics.getFont('data/fenew/feft33we.spr', 'data/fenew/fepal0.dat')\n    const textLinkHighlightFont = graphics.getFont('data/fenew/fehi33we.spr', 'data/fenew/fepal0.dat')\n    const textLinkShadowFont = graphics.getFont('data/fenew/fesd33we.spr', null)\n\n    let y = 140\n    this.items = items.map((item) => {\n      const sprites = [\n        textLinkFont.renderText(item.text),\n        textLinkHighlightFont.renderText(item.text),\n        textLinkShadowFont.renderText(item.text)\n      ]\n\n      const cx = 320\n      const cy = y + (sprites[0].height / 2)\n      const x1 = 320 - (sprites[0].width / 2)\n      const x2 = 320 + (sprites[0].width / 2)\n      const y1 = y\n      const y2 = y + sprites[0].height\n\n      y += 30\n\n      return { x1, x2, y1, y2, cx, cy, sprites }\n    })\n  }\n\n  /**\n   * @param {CanvasRenderingContext2D} context\n   */\n  draw (context, mouseX, mouseY) {\n    context.globalAlpha = 0.3\n\n    for (const item of this.items) {\n      const offsetX = (item.cx - mouseX) / 32\n      const offsetY = (item.cy - mouseY) / 32\n\n      context.drawImage(item.sprites[2], item.x1 + offsetX, item.y1 + offsetY)\n    }\n\n    context.globalAlpha = 1.0\n\n    for (const item of this.items) {\n      const idx = (mouseX >= item.x1 && mouseX <= item.x2 && mouseY >= item.y1 && mouseY <= item.y2) ? 1 : 0\n      context.drawImage(item.sprites[idx], item.x1, item.y1)\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/menu.js?");

/***/ })

/******/ });