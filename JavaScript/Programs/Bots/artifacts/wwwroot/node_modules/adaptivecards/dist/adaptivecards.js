(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AdaptiveCards"] = factory();
	else
		root["AdaptiveCards"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/adaptivecards.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/adaptivecards.ts":
/*!******************************!*\
  !*** ./src/adaptivecards.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./card-elements */ "./src/card-elements.ts"));
__export(__webpack_require__(/*! ./enums */ "./src/enums.ts"));
__export(__webpack_require__(/*! ./host-config */ "./src/host-config.ts"));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
exports.SizeAndUnit = utils_1.SizeAndUnit;
exports.getEnumValueOrDefault = utils_1.getEnumValueOrDefault;


/***/ }),

/***/ "./src/card-elements.ts":
/*!******************************!*\
  !*** ./src/card-elements.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Enums = __webpack_require__(/*! ./enums */ "./src/enums.ts");
var Utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var HostConfig = __webpack_require__(/*! ./host-config */ "./src/host-config.ts");
var TextFormatters = __webpack_require__(/*! ./text-formatters */ "./src/text-formatters.ts");
function invokeSetCollection(action, collection) {
    if (action) {
        // Closest emulation of "internal" in TypeScript.
        action["setCollection"](collection);
    }
}
function isActionAllowed(action, forbiddenActionTypes) {
    if (forbiddenActionTypes) {
        for (var i = 0; i < forbiddenActionTypes.length; i++) {
            if (action.getJsonTypeName() === forbiddenActionTypes[i]) {
                return false;
            }
        }
    }
    return true;
}
function generateUniqueId() {
    return "__ac-" + Utils.UUID.generate();
}
function createCardObjectInstance(parent, json, createInstanceCallback, createValidationErrorCallback, errors) {
    var result = null;
    if (json && typeof json === "object") {
        var tryToFallback = false;
        var typeName = json["type"];
        result = createInstanceCallback(typeName);
        if (!result) {
            tryToFallback = true;
            raiseParseError(createValidationErrorCallback(typeName), errors);
        }
        else {
            result.setParent(parent);
            result.parse(json);
            tryToFallback = result.shouldFallback();
        }
        if (tryToFallback) {
            var fallback = json["fallback"];
            if (!fallback) {
                parent.setShouldFallback(true);
            }
            if (typeof fallback === "string" && fallback.toLowerCase() === "drop") {
                result = null;
            }
            else if (typeof fallback === "object") {
                result = createCardObjectInstance(parent, fallback, createInstanceCallback, createValidationErrorCallback, errors);
            }
        }
    }
    return result;
}
function createActionInstance(parent, json, errors) {
    return createCardObjectInstance(parent, json, function (typeName) { return AdaptiveCard.actionTypeRegistry.createInstance(typeName); }, function (typeName) {
        return {
            error: Enums.ValidationError.UnknownActionType,
            message: "Unknown action type: " + typeName + ". Attempting to fall back."
        };
    }, errors);
}
exports.createActionInstance = createActionInstance;
function createElementInstance(parent, json, errors) {
    return createCardObjectInstance(parent, json, function (typeName) { return AdaptiveCard.elementTypeRegistry.createInstance(typeName); }, function (typeName) {
        return {
            error: Enums.ValidationError.UnknownElementType,
            message: "Unknown element type: " + typeName + ". Attempting to fall back."
        };
    }, errors);
}
exports.createElementInstance = createElementInstance;
var SpacingDefinition = /** @class */ (function () {
    function SpacingDefinition(top, right, bottom, left) {
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = 0; }
        if (bottom === void 0) { bottom = 0; }
        if (left === void 0) { left = 0; }
        this.left = 0;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    return SpacingDefinition;
}());
exports.SpacingDefinition = SpacingDefinition;
var PaddingDefinition = /** @class */ (function () {
    function PaddingDefinition(top, right, bottom, left) {
        if (top === void 0) { top = Enums.Spacing.None; }
        if (right === void 0) { right = Enums.Spacing.None; }
        if (bottom === void 0) { bottom = Enums.Spacing.None; }
        if (left === void 0) { left = Enums.Spacing.None; }
        this.top = Enums.Spacing.None;
        this.right = Enums.Spacing.None;
        this.bottom = Enums.Spacing.None;
        this.left = Enums.Spacing.None;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    PaddingDefinition.prototype.toSpacingDefinition = function (hostConfig) {
        return new SpacingDefinition(hostConfig.getEffectiveSpacing(this.top), hostConfig.getEffectiveSpacing(this.right), hostConfig.getEffectiveSpacing(this.bottom), hostConfig.getEffectiveSpacing(this.left));
    };
    return PaddingDefinition;
}());
exports.PaddingDefinition = PaddingDefinition;
var SizeAndUnit = /** @class */ (function () {
    function SizeAndUnit(physicalSize, unit) {
        this.physicalSize = physicalSize;
        this.unit = unit;
    }
    SizeAndUnit.parse = function (input) {
        var result = new SizeAndUnit(0, Enums.SizeUnit.Weight);
        var regExp = /^([0-9]+)(px|\*)?$/g;
        var matches = regExp.exec(input);
        if (matches && matches.length >= 2) {
            result.physicalSize = parseInt(matches[1]);
            if (matches.length == 3) {
                if (matches[2] == "px") {
                    result.unit = Enums.SizeUnit.Pixel;
                }
            }
            return result;
        }
        throw new Error("Invalid size: " + input);
    };
    return SizeAndUnit;
}());
exports.SizeAndUnit = SizeAndUnit;
var CardElement = /** @class */ (function () {
    function CardElement() {
        this._shouldFallback = false;
        this._lang = undefined;
        this._hostConfig = null;
        this._internalPadding = null;
        this._parent = null;
        this._renderedElement = null;
        this._separatorElement = null;
        this._isVisible = true;
        this._truncatedDueToOverflow = false;
        this._defaultRenderedElementDisplayMode = null;
        this._padding = null;
        this.requires = new HostConfig.HostCapabilities();
        this.horizontalAlignment = null;
        this.spacing = Enums.Spacing.Default;
        this.separator = false;
        this.height = "auto";
        this.customCssSelector = null;
    }
    CardElement.prototype.internalRenderSeparator = function () {
        return Utils.renderSeparation({
            spacing: this.hostConfig.getEffectiveSpacing(this.spacing),
            lineThickness: this.separator ? this.hostConfig.separator.lineThickness : null,
            lineColor: this.separator ? this.hostConfig.separator.lineColor : null
        }, this.separatorOrientation);
    };
    CardElement.prototype.updateRenderedElementVisibility = function () {
        if (this._renderedElement) {
            this._renderedElement.style.display = this._isVisible ? this._defaultRenderedElementDisplayMode : "none";
        }
        if (this._separatorElement) {
            if (this.parent && this.parent.isFirstElement(this)) {
                this._separatorElement.style.display = "none";
            }
            else {
                this._separatorElement.style.display = this._isVisible ? this._defaultRenderedElementDisplayMode : "none";
            }
        }
    };
    CardElement.prototype.hideElementDueToOverflow = function () {
        if (this._renderedElement && this._isVisible) {
            this._renderedElement.style.visibility = 'hidden';
            this._isVisible = false;
            raiseElementVisibilityChangedEvent(this, false);
        }
    };
    CardElement.prototype.showElementHiddenDueToOverflow = function () {
        if (this._renderedElement && !this._isVisible) {
            this._renderedElement.style.visibility = null;
            this._isVisible = true;
            raiseElementVisibilityChangedEvent(this, false);
        }
    };
    // Marked private to emulate internal access
    CardElement.prototype.handleOverflow = function (maxHeight) {
        if (this.isVisible || this.isHiddenDueToOverflow()) {
            var handled = this.truncateOverflow(maxHeight);
            // Even if we were unable to truncate the element to fit this time,
            // it still could have been previously truncated
            this._truncatedDueToOverflow = handled || this._truncatedDueToOverflow;
            if (!handled) {
                this.hideElementDueToOverflow();
            }
            else if (handled && !this._isVisible) {
                this.showElementHiddenDueToOverflow();
            }
        }
    };
    // Marked private to emulate internal access
    CardElement.prototype.resetOverflow = function () {
        var sizeChanged = false;
        if (this._truncatedDueToOverflow) {
            this.undoOverflowTruncation();
            this._truncatedDueToOverflow = false;
            sizeChanged = true;
        }
        if (this.isHiddenDueToOverflow) {
            this.showElementHiddenDueToOverflow();
        }
        return sizeChanged;
    };
    CardElement.prototype.createPlaceholderElement = function () {
        var element = document.createElement("div");
        element.style.border = "1px dashed #DDDDDD";
        element.style.padding = "4px";
        element.style.minHeight = "32px";
        element.style.fontSize = "10px";
        element.innerText = "Empty " + this.getJsonTypeName();
        return element;
    };
    CardElement.prototype.internalGetNonZeroPadding = function (padding, processTop, processRight, processBottom, processLeft) {
        if (processTop === void 0) { processTop = true; }
        if (processRight === void 0) { processRight = true; }
        if (processBottom === void 0) { processBottom = true; }
        if (processLeft === void 0) { processLeft = true; }
        if (processTop) {
            if (padding.top == Enums.Spacing.None) {
                padding.top = this.internalPadding.top;
            }
        }
        if (processRight) {
            if (padding.right == Enums.Spacing.None) {
                padding.right = this.internalPadding.right;
            }
        }
        if (processBottom) {
            if (padding.bottom == Enums.Spacing.None) {
                padding.bottom = this.internalPadding.bottom;
            }
        }
        if (processLeft) {
            if (padding.left == Enums.Spacing.None) {
                padding.left = this.internalPadding.left;
            }
        }
        if (this.parent) {
            this.parent.internalGetNonZeroPadding(padding, processTop && this.isAtTheVeryTop(), processRight && this.isAtTheVeryRight(), processBottom && this.isAtTheVeryBottom(), processLeft && this.isAtTheVeryLeft());
        }
    };
    CardElement.prototype.adjustRenderedElementSize = function (renderedElement) {
        if (this.height === "auto") {
            renderedElement.style.flex = "0 0 auto";
        }
        else {
            renderedElement.style.flex = "1 1 auto";
        }
    };
    /*
     * Called when this element overflows the bottom of the card.
     * maxHeight will be the amount of space still available on the card (0 if
     * the element is fully off the card).
     */
    CardElement.prototype.truncateOverflow = function (maxHeight) {
        // Child implementations should return true if the element handled
        // the truncation request such that its content fits within maxHeight,
        // false if the element should fall back to being hidden
        return false;
    };
    /*
     * This should reverse any changes performed in truncateOverflow().
     */
    CardElement.prototype.undoOverflowTruncation = function () { };
    CardElement.prototype.isDesignMode = function () {
        var rootElement = this.getRootElement();
        return rootElement instanceof AdaptiveCard && rootElement.designMode;
    };
    Object.defineProperty(CardElement.prototype, "useDefaultSizing", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "allowCustomPadding", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "defaultPadding", {
        get: function () {
            return new PaddingDefinition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "internalPadding", {
        get: function () {
            if (this._padding) {
                return this._padding;
            }
            else {
                return (this._internalPadding && this.allowCustomPadding) ? this._internalPadding : this.defaultPadding;
            }
        },
        set: function (value) {
            this._internalPadding = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "separatorOrientation", {
        get: function () {
            return Enums.Orientation.Horizontal;
        },
        enumerable: true,
        configurable: true
    });
    CardElement.prototype.getPadding = function () {
        return this._padding;
    };
    CardElement.prototype.setPadding = function (value) {
        this._padding = value;
        if (this._padding) {
            AdaptiveCard.useAutomaticContainerBleeding = false;
        }
    };
    CardElement.prototype.toJSON = function () {
        var result = {};
        Utils.setProperty(result, "type", this.getJsonTypeName());
        Utils.setProperty(result, "id", this.id);
        if (this.horizontalAlignment !== null) {
            Utils.setEnumProperty(Enums.HorizontalAlignment, result, "horizontalAlignment", this.horizontalAlignment);
        }
        Utils.setEnumProperty(Enums.Spacing, result, "spacing", this.spacing, Enums.Spacing.Default);
        Utils.setProperty(result, "separator", this.separator, false);
        Utils.setProperty(result, "height", this.height, "auto");
        return result;
    };
    CardElement.prototype.setParent = function (value) {
        this._parent = value;
    };
    CardElement.prototype.getNonZeroPadding = function () {
        var padding = new PaddingDefinition();
        this.internalGetNonZeroPadding(padding);
        return padding;
    };
    CardElement.prototype.getForbiddenElementTypes = function () {
        return null;
    };
    CardElement.prototype.getForbiddenActionTypes = function () {
        return null;
    };
    CardElement.prototype.parse = function (json, errors) {
        raiseParseElementEvent(this, json, errors);
        this.requires.parse(json["requires"], errors);
        this.id = json["id"];
        this.speak = json["speak"];
        this.horizontalAlignment = Utils.getEnumValueOrDefault(Enums.HorizontalAlignment, json["horizontalAlignment"], null);
        this.spacing = Utils.getEnumValueOrDefault(Enums.Spacing, json["spacing"], Enums.Spacing.Default);
        this.separator = json["separator"];
        var jsonSeparation = json["separation"];
        if (jsonSeparation !== undefined) {
            if (jsonSeparation === "none") {
                this.spacing = Enums.Spacing.None;
                this.separator = false;
            }
            else if (jsonSeparation === "strong") {
                this.spacing = Enums.Spacing.Large;
                this.separator = true;
            }
            else if (jsonSeparation === "default") {
                this.spacing = Enums.Spacing.Default;
                this.separator = false;
            }
            raiseParseError({
                error: Enums.ValidationError.Deprecated,
                message: "The \"separation\" property is deprecated and will be removed. Use the \"spacing\" and \"separator\" properties instead."
            }, errors);
        }
        var jsonHeight = json["height"];
        if (jsonHeight === "auto" || jsonHeight === "stretch") {
            this.height = jsonHeight;
        }
    };
    CardElement.prototype.getActionCount = function () {
        return 0;
    };
    CardElement.prototype.getActionAt = function (index) {
        throw new Error("Index out of range.");
    };
    CardElement.prototype.validate = function () {
        return [];
    };
    CardElement.prototype.remove = function () {
        if (this.parent && this.parent instanceof CardElementContainer) {
            return this.parent.removeItem(this);
        }
        return false;
    };
    CardElement.prototype.render = function () {
        this._renderedElement = this.internalRender();
        this._separatorElement = this.internalRenderSeparator();
        if (this._renderedElement) {
            if (this.customCssSelector) {
                this._renderedElement.classList.add(this.customCssSelector);
            }
            this._renderedElement.style.boxSizing = "border-box";
            this._defaultRenderedElementDisplayMode = this._renderedElement.style.display;
            this.adjustRenderedElementSize(this._renderedElement);
            this.updateLayout(false);
        }
        else if (this.isDesignMode()) {
            this._renderedElement = this.createPlaceholderElement();
        }
        return this._renderedElement;
    };
    CardElement.prototype.updateLayout = function (processChildren) {
        if (processChildren === void 0) { processChildren = true; }
        this.updateRenderedElementVisibility();
    };
    CardElement.prototype.indexOf = function (cardElement) {
        return -1;
    };
    CardElement.prototype.isRendered = function () {
        return this._renderedElement && this._renderedElement.offsetHeight > 0;
    };
    CardElement.prototype.isAtTheVeryTop = function () {
        return this.parent ? this.parent.isFirstElement(this) && this.parent.isAtTheVeryTop() : true;
    };
    CardElement.prototype.isFirstElement = function (element) {
        return true;
    };
    CardElement.prototype.isAtTheVeryBottom = function () {
        return this.parent ? this.parent.isLastElement(this) && this.parent.isAtTheVeryBottom() : true;
    };
    CardElement.prototype.isLastElement = function (element) {
        return true;
    };
    CardElement.prototype.isAtTheVeryLeft = function () {
        return this.parent ? this.parent.isLeftMostElement(this) && this.parent.isAtTheVeryLeft() : true;
    };
    CardElement.prototype.isBleeding = function () {
        return false;
    };
    CardElement.prototype.isLeftMostElement = function (element) {
        return true;
    };
    CardElement.prototype.isAtTheVeryRight = function () {
        return this.parent ? this.parent.isRightMostElement(this) && this.parent.isAtTheVeryRight() : true;
    };
    CardElement.prototype.isRightMostElement = function (element) {
        return true;
    };
    CardElement.prototype.isHiddenDueToOverflow = function () {
        return this._renderedElement && this._renderedElement.style.visibility == 'hidden';
    };
    CardElement.prototype.canContentBleed = function () {
        return this.parent ? this.parent.canContentBleed() : true;
    };
    CardElement.prototype.getRootElement = function () {
        var rootElement = this;
        while (rootElement.parent) {
            rootElement = rootElement.parent;
        }
        return rootElement;
    };
    CardElement.prototype.getParentContainer = function () {
        var currentElement = this.parent;
        while (currentElement) {
            if (currentElement instanceof Container) {
                return currentElement;
            }
            currentElement = currentElement.parent;
        }
        return null;
    };
    CardElement.prototype.getAllInputs = function () {
        return [];
    };
    CardElement.prototype.getResourceInformation = function () {
        return [];
    };
    CardElement.prototype.getElementById = function (id) {
        return this.id === id ? this : null;
    };
    CardElement.prototype.getActionById = function (id) {
        return null;
    };
    CardElement.prototype.shouldFallback = function () {
        return this._shouldFallback || !this.requires.areAllMet(this.hostConfig.hostCapabilities);
    };
    CardElement.prototype.setShouldFallback = function (value) {
        this._shouldFallback = value;
    };
    Object.defineProperty(CardElement.prototype, "lang", {
        get: function () {
            if (this._lang) {
                return this._lang;
            }
            else {
                if (this.parent) {
                    return this.parent.lang;
                }
                else {
                    return undefined;
                }
            }
        },
        set: function (value) {
            if (value && value != "") {
                var regEx = /^[a-z]{2,3}$/ig;
                var matches = regEx.exec(value);
                if (!matches) {
                    throw new Error("Invalid language identifier: " + value);
                }
            }
            this._lang = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "hostConfig", {
        get: function () {
            if (this._hostConfig) {
                return this._hostConfig;
            }
            else {
                if (this.parent) {
                    return this.parent.hostConfig;
                }
                else {
                    return defaultHostConfig;
                }
            }
        },
        set: function (value) {
            this._hostConfig = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "index", {
        get: function () {
            if (this.parent) {
                return this.parent.indexOf(this);
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "isInteractive", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "isStandalone", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        set: function (value) {
            // If the element is going to be hidden, reset any changes that were due
            // to overflow truncation (this ensures that if the element is later
            // un-hidden it has the right content)
            if (AdaptiveCard.useAdvancedCardBottomTruncation && !value) {
                this.undoOverflowTruncation();
            }
            if (this._isVisible != value) {
                this._isVisible = value;
                this.updateRenderedElementVisibility();
                if (this._renderedElement) {
                    raiseElementVisibilityChangedEvent(this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "hasVisibleSeparator", {
        get: function () {
            var parentContainer = this.getParentContainer();
            if (parentContainer) {
                return this.separatorElement && !parentContainer.isFirstElement(this);
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "renderedElement", {
        get: function () {
            return this._renderedElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardElement.prototype, "separatorElement", {
        get: function () {
            return this._separatorElement;
        },
        enumerable: true,
        configurable: true
    });
    return CardElement;
}());
exports.CardElement = CardElement;
var CardElementContainer = /** @class */ (function (_super) {
    __extends(CardElementContainer, _super);
    function CardElementContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CardElementContainer;
}(CardElement));
exports.CardElementContainer = CardElementContainer;
var TextBlock = /** @class */ (function (_super) {
    __extends(TextBlock, _super);
    function TextBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._processedText = null;
        _this._treatAsPlainText = true;
        _this._selectAction = null;
        _this._effectiveStyleDefinition = null;
        _this.size = Enums.TextSize.Default;
        _this.weight = Enums.TextWeight.Default;
        _this.color = Enums.TextColor.Default;
        _this.isSubtle = false;
        _this.wrap = false;
        _this.useMarkdown = true;
        return _this;
    }
    TextBlock.prototype.restoreOriginalContent = function () {
        var maxHeight = this.maxLines
            ? (this._computedLineHeight * this.maxLines) + 'px'
            : null;
        this.renderedElement.style.maxHeight = maxHeight;
        this.renderedElement.innerHTML = this._originalInnerHtml;
    };
    TextBlock.prototype.truncateIfSupported = function (maxHeight) {
        // For now, only truncate TextBlocks that contain just a single
        // paragraph -- since the maxLines calculation doesn't take into
        // account Markdown lists
        var children = this.renderedElement.children;
        var isTextOnly = !children.length;
        var truncationSupported = isTextOnly || children.length == 1
            && children[0].tagName.toLowerCase() == 'p';
        if (truncationSupported) {
            var element = isTextOnly
                ? this.renderedElement
                : children[0];
            Utils.truncate(element, maxHeight, this._computedLineHeight);
            return true;
        }
        return false;
    };
    TextBlock.prototype.getEffectiveStyleDefinition = function () {
        if (!this._effectiveStyleDefinition) {
            this._effectiveStyleDefinition = this.hostConfig.containerStyles.default;
            var parentContainer = this.getParentContainer();
            while (parentContainer) {
                if (parentContainer.style) {
                    this._effectiveStyleDefinition = this.hostConfig.containerStyles.getStyleByName(parentContainer.style);
                    break;
                }
                parentContainer = parentContainer.getParentContainer();
            }
        }
        return this._effectiveStyleDefinition;
    };
    TextBlock.prototype.getRenderedDomElementType = function () {
        return "div";
    };
    TextBlock.prototype.internalRender = function () {
        var _this = this;
        this._effectiveStyleDefinition = null;
        this._processedText = null;
        if (!Utils.isNullOrEmpty(this.text)) {
            var hostConfig = this.hostConfig;
            var element = document.createElement(this.getRenderedDomElementType());
            element.classList.add(hostConfig.makeCssClassName("ac-textBlock"));
            element.style.overflow = "hidden";
            this.applyStylesTo(element);
            if (this.selectAction) {
                element.onclick = function (e) {
                    _this.selectAction.execute();
                    e.cancelBubble = true;
                };
            }
            if (!this._processedText) {
                this._treatAsPlainText = true;
                var formattedText = TextFormatters.formatText(this.lang, this.text);
                if (this.useMarkdown) {
                    if (AdaptiveCard.allowMarkForTextHighlighting) {
                        formattedText = formattedText.replace(/<mark>/g, "===").replace(/<\/mark>/g, "/==");
                    }
                    var markdownProcessingResult = AdaptiveCard.applyMarkdown(formattedText);
                    if (markdownProcessingResult.didProcess && markdownProcessingResult.outputHtml) {
                        this._processedText = markdownProcessingResult.outputHtml;
                        this._treatAsPlainText = false;
                        // Only process <mark> tag if markdown processing was applied because
                        // markdown processing is also responsible for sanitizing the input string
                        if (AdaptiveCard.allowMarkForTextHighlighting) {
                            var markStyle = "";
                            var effectiveStyle = this.getEffectiveStyleDefinition();
                            if (effectiveStyle.highlightBackgroundColor) {
                                markStyle += "background-color: " + effectiveStyle.highlightBackgroundColor + ";";
                            }
                            if (effectiveStyle.highlightForegroundColor) {
                                markStyle += "color: " + effectiveStyle.highlightForegroundColor + ";";
                            }
                            if (!Utils.isNullOrEmpty(markStyle)) {
                                markStyle = 'style="' + markStyle + '"';
                            }
                            this._processedText = this._processedText.replace(/===/g, "<mark " + markStyle + ">").replace(/\/==/g, "</mark>");
                        }
                    }
                    else {
                        this._processedText = formattedText;
                        this._treatAsPlainText = true;
                    }
                }
                else {
                    this._processedText = formattedText;
                    this._treatAsPlainText = true;
                }
            }
            if (this._treatAsPlainText) {
                element.innerText = this._processedText;
            }
            else {
                element.innerHTML = this._processedText;
            }
            if (element.firstElementChild instanceof HTMLElement) {
                var firstElementChild = element.firstElementChild;
                firstElementChild.style.marginTop = "0px";
                firstElementChild.style.width = "100%";
                if (!this.wrap) {
                    firstElementChild.style.overflow = "hidden";
                    firstElementChild.style.textOverflow = "ellipsis";
                }
            }
            if (element.lastElementChild instanceof HTMLElement) {
                element.lastElementChild.style.marginBottom = "0px";
            }
            var anchors = element.getElementsByTagName("a");
            for (var i = 0; i < anchors.length; i++) {
                var anchor = anchors[i];
                anchor.classList.add(this.hostConfig.makeCssClassName("ac-anchor"));
                anchor.target = "_blank";
                anchor.onclick = function (e) {
                    if (raiseAnchorClickedEvent(_this, e.target)) {
                        e.preventDefault();
                    }
                };
            }
            if (this.wrap) {
                element.style.wordWrap = "break-word";
                if (this.maxLines > 0) {
                    element.style.maxHeight = (this._computedLineHeight * this.maxLines) + "px";
                    element.style.overflow = "hidden";
                }
            }
            else {
                element.style.whiteSpace = "nowrap";
                element.style.textOverflow = "ellipsis";
            }
            if (AdaptiveCard.useAdvancedTextBlockTruncation || AdaptiveCard.useAdvancedCardBottomTruncation) {
                this._originalInnerHtml = element.innerHTML;
            }
            if (this.selectAction != null && hostConfig.supportsInteractivity) {
                element.tabIndex = 0;
                element.setAttribute("role", "button");
                element.setAttribute("aria-label", this.selectAction.title);
                element.classList.add(hostConfig.makeCssClassName("ac-selectable"));
            }
            return element;
        }
        else {
            return null;
        }
    };
    TextBlock.prototype.truncateOverflow = function (maxHeight) {
        if (maxHeight >= this._computedLineHeight) {
            return this.truncateIfSupported(maxHeight);
        }
        return false;
    };
    TextBlock.prototype.undoOverflowTruncation = function () {
        this.restoreOriginalContent();
        if (AdaptiveCard.useAdvancedTextBlockTruncation && this.maxLines) {
            var maxHeight = this._computedLineHeight * this.maxLines;
            this.truncateIfSupported(maxHeight);
        }
    };
    TextBlock.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setEnumProperty(Enums.TextSize, result, "size", this.size, Enums.TextSize.Default);
        Utils.setEnumProperty(Enums.TextWeight, result, "weight", this.weight, Enums.TextWeight.Default);
        Utils.setEnumProperty(Enums.TextColor, result, "color", this.color, Enums.TextColor.Default);
        Utils.setProperty(result, "text", this.text);
        Utils.setProperty(result, "isSubtle", this.isSubtle, false);
        Utils.setProperty(result, "wrap", this.wrap, false);
        Utils.setProperty(result, "maxLines", this.maxLines, 0);
        return result;
    };
    TextBlock.prototype.applyStylesTo = function (targetElement) {
        if (this.hostConfig.fontFamily) {
            targetElement.style.fontFamily = this.hostConfig.fontFamily;
        }
        var parentContainer = this.getParentContainer();
        var isRtl = parentContainer ? parentContainer.isRtl() : false;
        switch (this.horizontalAlignment) {
            case Enums.HorizontalAlignment.Center:
                targetElement.style.textAlign = "center";
                break;
            case Enums.HorizontalAlignment.Right:
                targetElement.style.textAlign = isRtl ? "left" : "right";
                break;
            default:
                targetElement.style.textAlign = isRtl ? "right" : "left";
                break;
        }
        var fontSize;
        switch (this.size) {
            case Enums.TextSize.Small:
                fontSize = this.hostConfig.fontSizes.small;
                break;
            case Enums.TextSize.Medium:
                fontSize = this.hostConfig.fontSizes.medium;
                break;
            case Enums.TextSize.Large:
                fontSize = this.hostConfig.fontSizes.large;
                break;
            case Enums.TextSize.ExtraLarge:
                fontSize = this.hostConfig.fontSizes.extraLarge;
                break;
            default:
                fontSize = this.hostConfig.fontSizes.default;
                break;
        }
        if (this.hostConfig.lineHeights) {
            switch (this.size) {
                case Enums.TextSize.Small:
                    this._computedLineHeight = this.hostConfig.lineHeights.small;
                    break;
                case Enums.TextSize.Medium:
                    this._computedLineHeight = this.hostConfig.lineHeights.medium;
                    break;
                case Enums.TextSize.Large:
                    this._computedLineHeight = this.hostConfig.lineHeights.large;
                    break;
                case Enums.TextSize.ExtraLarge:
                    this._computedLineHeight = this.hostConfig.lineHeights.extraLarge;
                    break;
                default:
                    this._computedLineHeight = this.hostConfig.lineHeights.default;
                    break;
            }
        }
        else {
            // Looks like 1.33 is the magic number to compute line-height
            // from font size.
            this._computedLineHeight = fontSize * 1.33;
        }
        targetElement.style.fontSize = fontSize + "px";
        targetElement.style.lineHeight = this._computedLineHeight + "px";
        var styleDefinition = this.getEffectiveStyleDefinition();
        var actualTextColor = this.color ? this.color : Enums.TextColor.Default;
        var colorDefinition;
        switch (actualTextColor) {
            case Enums.TextColor.Accent:
                colorDefinition = styleDefinition.foregroundColors.accent;
                break;
            case Enums.TextColor.Dark:
                colorDefinition = styleDefinition.foregroundColors.dark;
                break;
            case Enums.TextColor.Light:
                colorDefinition = styleDefinition.foregroundColors.light;
                break;
            case Enums.TextColor.Good:
                colorDefinition = styleDefinition.foregroundColors.good;
                break;
            case Enums.TextColor.Warning:
                colorDefinition = styleDefinition.foregroundColors.warning;
                break;
            case Enums.TextColor.Attention:
                colorDefinition = styleDefinition.foregroundColors.attention;
                break;
            default:
                colorDefinition = styleDefinition.foregroundColors.default;
                break;
        }
        targetElement.style.color = Utils.stringToCssColor(this.isSubtle ? colorDefinition.subtle : colorDefinition.default);
        var fontWeight;
        switch (this.weight) {
            case Enums.TextWeight.Lighter:
                fontWeight = this.hostConfig.fontWeights.lighter;
                break;
            case Enums.TextWeight.Bolder:
                fontWeight = this.hostConfig.fontWeights.bolder;
                break;
            default:
                fontWeight = this.hostConfig.fontWeights.default;
                break;
        }
        targetElement.style.fontWeight = fontWeight.toString();
    };
    TextBlock.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.text = json["text"];
        var sizeString = json["size"];
        if (sizeString && typeof sizeString === "string" && sizeString.toLowerCase() === "normal") {
            this.size = Enums.TextSize.Default;
            raiseParseError({
                error: Enums.ValidationError.Deprecated,
                message: "The TextBlock.size value \"normal\" is deprecated and will be removed. Use \"default\" instead."
            }, errors);
        }
        else {
            this.size = Utils.getEnumValueOrDefault(Enums.TextSize, sizeString, this.size);
        }
        var weightString = json["weight"];
        if (weightString && typeof weightString === "string" && weightString.toLowerCase() === "normal") {
            this.weight = Enums.TextWeight.Default;
            raiseParseError({
                error: Enums.ValidationError.Deprecated,
                message: "The TextBlock.weight value \"normal\" is deprecated and will be removed. Use \"default\" instead."
            }, errors);
        }
        else {
            this.weight = Utils.getEnumValueOrDefault(Enums.TextWeight, weightString, this.weight);
        }
        this.color = Utils.getEnumValueOrDefault(Enums.TextColor, json["color"], this.color);
        this.isSubtle = json["isSubtle"];
        this.wrap = json["wrap"] === undefined ? false : json["wrap"];
        if (typeof json["maxLines"] === "number") {
            this.maxLines = json["maxLines"];
        }
    };
    TextBlock.prototype.getJsonTypeName = function () {
        return "TextBlock";
    };
    TextBlock.prototype.renderSpeech = function () {
        if (this.speak != null)
            return this.speak + '\n';
        if (this.text)
            return '<s>' + this.text + '</s>\n';
        return null;
    };
    TextBlock.prototype.updateLayout = function (processChildren) {
        if (processChildren === void 0) { processChildren = false; }
        _super.prototype.updateLayout.call(this, processChildren);
        if (AdaptiveCard.useAdvancedTextBlockTruncation && this.maxLines && this.isRendered()) {
            // Reset the element's innerHTML in case the available room for
            // content has increased
            this.restoreOriginalContent();
            var maxHeight = this._computedLineHeight * this.maxLines;
            this.truncateIfSupported(maxHeight);
        }
    };
    Object.defineProperty(TextBlock.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            if (this._text != value) {
                this._text = value;
                this._processedText = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBlock.prototype, "selectAction", {
        get: function () {
            return this._selectAction;
        },
        set: function (value) {
            this._selectAction = value;
            if (this._selectAction) {
                this._selectAction.setParent(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    return TextBlock;
}(CardElement));
exports.TextBlock = TextBlock;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.prototype.getRenderedDomElementType = function () {
        return "label";
    };
    Label.prototype.internalRender = function () {
        var renderedElement = _super.prototype.internalRender.call(this);
        if (!Utils.isNullOrEmpty(this.forElementId)) {
            renderedElement.htmlFor = this.forElementId;
        }
        return renderedElement;
    };
    return Label;
}(TextBlock));
var Fact = /** @class */ (function () {
    function Fact(name, value) {
        if (name === void 0) { name = undefined; }
        if (value === void 0) { value = undefined; }
        this.name = name;
        this.value = value;
    }
    Fact.prototype.toJSON = function () {
        return { title: this.name, value: this.value };
    };
    Fact.prototype.renderSpeech = function () {
        if (this.speak != null) {
            return this.speak + '\n';
        }
        return '<s>' + this.name + ' ' + this.value + '</s>\n';
    };
    return Fact;
}());
exports.Fact = Fact;
var FactSet = /** @class */ (function (_super) {
    __extends(FactSet, _super);
    function FactSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.facts = [];
        return _this;
    }
    Object.defineProperty(FactSet.prototype, "useDefaultSizing", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    FactSet.prototype.internalRender = function () {
        var element = null;
        var hostConfig = this.hostConfig;
        if (this.facts.length > 0) {
            element = document.createElement("table");
            element.style.borderWidth = "0px";
            element.style.borderSpacing = "0px";
            element.style.borderStyle = "none";
            element.style.borderCollapse = "collapse";
            element.style.display = "block";
            element.style.overflow = "hidden";
            element.classList.add(hostConfig.makeCssClassName("ac-factset"));
            for (var i = 0; i < this.facts.length; i++) {
                var trElement = document.createElement("tr");
                if (i > 0) {
                    trElement.style.marginTop = this.hostConfig.factSet.spacing + "px";
                }
                // Title column
                var tdElement = document.createElement("td");
                tdElement.style.padding = "0";
                tdElement.classList.add(hostConfig.makeCssClassName("ac-fact-title"));
                if (this.hostConfig.factSet.title.maxWidth) {
                    tdElement.style.maxWidth = this.hostConfig.factSet.title.maxWidth + "px";
                }
                tdElement.style.verticalAlign = "top";
                var textBlock = new TextBlock();
                textBlock.setParent(this);
                textBlock.text = Utils.isNullOrEmpty(this.facts[i].name) ? "Title" : this.facts[i].name;
                textBlock.size = this.hostConfig.factSet.title.size;
                textBlock.color = this.hostConfig.factSet.title.color;
                textBlock.isSubtle = this.hostConfig.factSet.title.isSubtle;
                textBlock.weight = this.hostConfig.factSet.title.weight;
                textBlock.wrap = this.hostConfig.factSet.title.wrap;
                textBlock.spacing = Enums.Spacing.None;
                Utils.appendChild(tdElement, textBlock.render());
                Utils.appendChild(trElement, tdElement);
                // Spacer column
                tdElement = document.createElement("td");
                tdElement.style.width = "10px";
                Utils.appendChild(trElement, tdElement);
                // Value column
                tdElement = document.createElement("td");
                tdElement.style.verticalAlign = "top";
                tdElement.classList.add(hostConfig.makeCssClassName("ac-fact-value"));
                textBlock = new TextBlock();
                textBlock.setParent(this);
                textBlock.text = Utils.isNullOrEmpty(this.facts[i].value) ? "Value" : this.facts[i].value;
                textBlock.size = this.hostConfig.factSet.value.size;
                textBlock.color = this.hostConfig.factSet.value.color;
                textBlock.isSubtle = this.hostConfig.factSet.value.isSubtle;
                textBlock.weight = this.hostConfig.factSet.value.weight;
                textBlock.wrap = this.hostConfig.factSet.value.wrap;
                textBlock.spacing = Enums.Spacing.None;
                Utils.appendChild(tdElement, textBlock.render());
                Utils.appendChild(trElement, tdElement);
                Utils.appendChild(element, trElement);
            }
        }
        return element;
    };
    FactSet.prototype.getJsonTypeName = function () {
        return "FactSet";
    };
    FactSet.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        var facts = [];
        for (var _i = 0, _a = this.facts; _i < _a.length; _i++) {
            var fact = _a[_i];
            facts.push(fact.toJSON());
        }
        Utils.setProperty(result, "facts", facts);
        return result;
    };
    FactSet.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.facts = [];
        if (json["facts"] != null) {
            var jsonFacts = json["facts"];
            this.facts = [];
            for (var i = 0; i < jsonFacts.length; i++) {
                var fact = new Fact();
                fact.name = jsonFacts[i]["title"];
                fact.value = jsonFacts[i]["value"];
                fact.speak = jsonFacts[i]["speak"];
                this.facts.push(fact);
            }
        }
    };
    FactSet.prototype.renderSpeech = function () {
        if (this.speak != null) {
            return this.speak + '\n';
        }
        // render each fact
        var speak = null;
        if (this.facts.length > 0) {
            speak = '';
            for (var i = 0; i < this.facts.length; i++) {
                var speech = this.facts[i].renderSpeech();
                if (speech) {
                    speak += speech;
                }
            }
        }
        return '<p>' + speak + '\n</p>\n';
    };
    return FactSet;
}(CardElement));
exports.FactSet = FactSet;
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = Enums.ImageStyle.Default;
        _this.size = Enums.Size.Auto;
        _this.pixelWidth = null;
        _this.pixelHeight = null;
        _this.altText = "";
        return _this;
    }
    Image.prototype.parseDimension = function (name, value, errors) {
        if (value) {
            if (typeof value === "string") {
                try {
                    var size = Utils.SizeAndUnit.parse(value);
                    if (size.unit == Enums.SizeUnit.Pixel) {
                        return size.physicalSize;
                    }
                }
                catch (_a) {
                    // Ignore error
                }
            }
            raiseParseError({
                error: Enums.ValidationError.InvalidPropertyValue,
                message: "Invalid image " + name + ": " + value
            }, errors);
        }
        return 0;
    };
    Image.prototype.applySize = function (element) {
        if (this.pixelWidth || this.pixelHeight) {
            if (this.pixelWidth) {
                element.style.width = this.pixelWidth + "px";
            }
            if (this.pixelHeight) {
                element.style.height = this.pixelHeight + "px";
            }
        }
        else {
            switch (this.size) {
                case Enums.Size.Stretch:
                    element.style.width = "100%";
                    break;
                case Enums.Size.Auto:
                    element.style.maxWidth = "100%";
                    break;
                case Enums.Size.Small:
                    element.style.width = this.hostConfig.imageSizes.small + "px";
                    break;
                case Enums.Size.Large:
                    element.style.width = this.hostConfig.imageSizes.large + "px";
                    break;
                case Enums.Size.Medium:
                    element.style.width = this.hostConfig.imageSizes.medium + "px";
                    break;
            }
        }
    };
    Object.defineProperty(Image.prototype, "useDefaultSizing", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype.internalRender = function () {
        var _this = this;
        var element = null;
        if (!Utils.isNullOrEmpty(this.url)) {
            element = document.createElement("div");
            element.style.display = "flex";
            element.style.alignItems = "flex-start";
            element.onkeypress = function (e) {
                if (_this.selectAction) {
                    if (e.keyCode == 13 || e.keyCode == 32) { // enter or space pressed
                        _this.selectAction.execute();
                    }
                }
            };
            element.onclick = function (e) {
                if (_this.selectAction) {
                    _this.selectAction.execute();
                    e.cancelBubble = true;
                }
            };
            switch (this.horizontalAlignment) {
                case Enums.HorizontalAlignment.Center:
                    element.style.justifyContent = "center";
                    break;
                case Enums.HorizontalAlignment.Right:
                    element.style.justifyContent = "flex-end";
                    break;
                default:
                    element.style.justifyContent = "flex-start";
                    break;
            }
            // Cache hostConfig to avoid walking the parent hierarchy multiple times
            var hostConfig = this.hostConfig;
            var imageElement = document.createElement("img");
            imageElement.onload = function (e) {
                raiseImageLoadedEvent(_this);
            };
            imageElement.onerror = function (e) {
                var card = _this.getRootElement();
                _this.renderedElement.innerHTML = "";
                if (card && card.designMode) {
                    var errorElement = document.createElement("div");
                    errorElement.style.display = "flex";
                    errorElement.style.alignItems = "center";
                    errorElement.style.justifyContent = "center";
                    errorElement.style.backgroundColor = "#EEEEEE";
                    errorElement.style.color = "black";
                    errorElement.innerText = ":-(";
                    errorElement.style.padding = "10px";
                    _this.applySize(errorElement);
                    _this.renderedElement.appendChild(errorElement);
                }
                raiseImageLoadedEvent(_this);
            };
            imageElement.style.maxHeight = "100%";
            imageElement.style.minWidth = "0";
            imageElement.classList.add(hostConfig.makeCssClassName("ac-image"));
            if (this.selectAction != null && hostConfig.supportsInteractivity) {
                imageElement.tabIndex = 0;
                imageElement.setAttribute("role", "button");
                imageElement.setAttribute("aria-label", this.selectAction.title);
                imageElement.classList.add(hostConfig.makeCssClassName("ac-selectable"));
            }
            this.applySize(imageElement);
            if (this.style === Enums.ImageStyle.Person) {
                imageElement.style.borderRadius = "50%";
                imageElement.style.backgroundPosition = "50% 50%";
                imageElement.style.backgroundRepeat = "no-repeat";
            }
            if (!Utils.isNullOrEmpty(this.backgroundColor)) {
                imageElement.style.backgroundColor = Utils.stringToCssColor(this.backgroundColor);
            }
            imageElement.src = this.url;
            imageElement.alt = this.altText;
            element.appendChild(imageElement);
        }
        return element;
    };
    Image.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        if (this._selectAction) {
            Utils.setProperty(result, "selectAction", this._selectAction.toJSON());
        }
        Utils.setEnumProperty(Enums.ImageStyle, result, "style", this.style, Enums.ImageStyle.Default);
        Utils.setProperty(result, "backgroundColor", this.backgroundColor);
        Utils.setProperty(result, "url", this.url);
        Utils.setEnumProperty(Enums.Size, result, "size", this.size, Enums.Size.Auto);
        if (this.pixelWidth) {
            Utils.setProperty(result, "width", this.pixelWidth + "px");
        }
        if (this.pixelHeight) {
            Utils.setProperty(result, "height", this.pixelHeight + "px");
        }
        Utils.setProperty(result, "altText", this.altText);
        return result;
    };
    Image.prototype.getJsonTypeName = function () {
        return "Image";
    };
    Image.prototype.getActionById = function (id) {
        var result = _super.prototype.getActionById.call(this, id);
        if (!result && this.selectAction) {
            result = this.selectAction.getActionById(id);
        }
        return result;
    };
    Image.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.url = json["url"];
        this.backgroundColor = json["backgroundColor"];
        var styleString = json["style"];
        if (styleString && typeof styleString === "string" && styleString.toLowerCase() === "normal") {
            this.style = Enums.ImageStyle.Default;
            raiseParseError({
                error: Enums.ValidationError.Deprecated,
                message: "The Image.style value \"normal\" is deprecated and will be removed. Use \"default\" instead."
            }, errors);
        }
        else {
            this.style = Utils.getEnumValueOrDefault(Enums.ImageStyle, styleString, this.style);
        }
        this.size = Utils.getEnumValueOrDefault(Enums.Size, json["size"], this.size);
        this.altText = json["altText"];
        // pixelWidth and pixelHeight are only parsed for backwards compatibility.
        // Payloads should use the width and height proerties instead.
        if (json["pixelWidth"] && typeof json["pixelWidth"] === "number") {
            this.pixelWidth = json["pixelWidth"];
            raiseParseError({
                error: Enums.ValidationError.Deprecated,
                message: "The pixelWidth property is deprecated and will be removed. Use the width property instead."
            }, errors);
        }
        if (json["pixelHeight"] && typeof json["pixelHeight"] === "number") {
            this.pixelHeight = json["pixelHeight"];
            raiseParseError({
                error: Enums.ValidationError.Deprecated,
                message: "The pixelHeight property is deprecated and will be removed. Use the height property instead."
            }, errors);
        }
        var size = this.parseDimension("width", json["width"], errors);
        if (size > 0) {
            this.pixelWidth = size;
        }
        size = this.parseDimension("height", json["height"], errors);
        if (size > 0) {
            this.pixelHeight = size;
        }
        this.selectAction = createActionInstance(this, json["selectAction"], errors);
    };
    Image.prototype.getResourceInformation = function () {
        if (!Utils.isNullOrEmpty(this.url)) {
            return [{ url: this.url, mimeType: "image" }];
        }
        else {
            return [];
        }
    };
    Image.prototype.renderSpeech = function () {
        if (this.speak != null) {
            return this.speak + '\n';
        }
        return null;
    };
    Object.defineProperty(Image.prototype, "selectAction", {
        get: function () {
            return this._selectAction;
        },
        set: function (value) {
            this._selectAction = value;
            if (this._selectAction) {
                this._selectAction.setParent(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Image;
}(CardElement));
exports.Image = Image;
var ImageSet = /** @class */ (function (_super) {
    __extends(ImageSet, _super);
    function ImageSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._images = [];
        _this.imageSize = Enums.Size.Medium;
        return _this;
    }
    ImageSet.prototype.internalRender = function () {
        var element = null;
        if (this._images.length > 0) {
            element = document.createElement("div");
            element.style.display = "flex";
            element.style.flexWrap = "wrap";
            for (var i = 0; i < this._images.length; i++) {
                this._images[i].size = this.imageSize;
                var renderedImage = this._images[i].render();
                renderedImage.style.display = "inline-flex";
                renderedImage.style.margin = "0px";
                renderedImage.style.marginRight = "10px";
                renderedImage.style.maxHeight = this.hostConfig.imageSet.maxImageHeight + "px";
                Utils.appendChild(element, renderedImage);
            }
        }
        return element;
    };
    ImageSet.prototype.getItemCount = function () {
        return this._images.length;
    };
    ImageSet.prototype.getItemAt = function (index) {
        return this._images[index];
    };
    ImageSet.prototype.getResourceInformation = function () {
        var result = [];
        for (var _i = 0, _a = this._images; _i < _a.length; _i++) {
            var image = _a[_i];
            result = result.concat(image.getResourceInformation());
        }
        return result;
    };
    ImageSet.prototype.removeItem = function (item) {
        if (item instanceof Image) {
            var itemIndex = this._images.indexOf(item);
            if (itemIndex >= 0) {
                this._images.splice(itemIndex, 1);
                item.setParent(null);
                this.updateLayout();
                return true;
            }
        }
        return false;
    };
    ImageSet.prototype.getJsonTypeName = function () {
        return "ImageSet";
    };
    ImageSet.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setEnumProperty(Enums.Size, result, "imageSize", this.imageSize, Enums.Size.Medium);
        if (this._images.length > 0) {
            var images = [];
            for (var _i = 0, _a = this._images; _i < _a.length; _i++) {
                var image = _a[_i];
                images.push(image.toJSON());
            }
            Utils.setProperty(result, "images", images);
        }
        return result;
    };
    ImageSet.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.imageSize = Utils.getEnumValueOrDefault(Enums.Size, json["imageSize"], Enums.Size.Medium);
        if (json["images"] != null) {
            var jsonImages = json["images"];
            this._images = [];
            for (var i = 0; i < jsonImages.length; i++) {
                var image = new Image();
                image.parse(jsonImages[i], errors);
                this.addImage(image);
            }
        }
    };
    ImageSet.prototype.addImage = function (image) {
        if (!image.parent) {
            this._images.push(image);
            image.setParent(this);
        }
        else {
            throw new Error("This image already belongs to another ImageSet");
        }
    };
    ImageSet.prototype.indexOf = function (cardElement) {
        return cardElement instanceof Image ? this._images.indexOf(cardElement) : -1;
    };
    ImageSet.prototype.renderSpeech = function () {
        if (this.speak != null) {
            return this.speak;
        }
        var speak = null;
        if (this._images.length > 0) {
            speak = '';
            for (var i = 0; i < this._images.length; i++) {
                speak += this._images[i].renderSpeech();
            }
        }
        return speak;
    };
    return ImageSet;
}(CardElementContainer));
exports.ImageSet = ImageSet;
var MediaSource = /** @class */ (function () {
    function MediaSource(url, mimeType) {
        if (url === void 0) { url = undefined; }
        if (mimeType === void 0) { mimeType = undefined; }
        this.url = url;
        this.mimeType = mimeType;
    }
    MediaSource.prototype.parse = function (json, errors) {
        this.mimeType = json["mimeType"];
        this.url = json["url"];
    };
    MediaSource.prototype.toJSON = function () {
        return {
            mimeType: this.mimeType,
            url: this.url
        };
    };
    return MediaSource;
}());
exports.MediaSource = MediaSource;
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sources = [];
        return _this;
    }
    Media.prototype.getPosterUrl = function () {
        return this.poster ? this.poster : this.hostConfig.media.defaultPoster;
    };
    Media.prototype.processSources = function () {
        this._selectedSources = [];
        this._selectedMediaType = undefined;
        for (var _i = 0, _a = this.sources; _i < _a.length; _i++) {
            var source = _a[_i];
            var mimeComponents = source.mimeType.split('/');
            if (mimeComponents.length == 2) {
                if (!this._selectedMediaType) {
                    var index = Media.supportedMediaTypes.indexOf(mimeComponents[0]);
                    if (index >= 0) {
                        this._selectedMediaType = Media.supportedMediaTypes[index];
                    }
                }
                if (mimeComponents[0] == this._selectedMediaType) {
                    this._selectedSources.push(source);
                }
            }
        }
    };
    Media.prototype.renderPoster = function () {
        var _this = this;
        var playButtonArrowWidth = 12;
        var playButtonArrowHeight = 15;
        var posterRootElement = document.createElement("div");
        posterRootElement.className = "ac-media-poster";
        posterRootElement.setAttribute("role", "contentinfo");
        posterRootElement.setAttribute("aria-label", this.altText ? this.altText : "Media content");
        posterRootElement.style.position = "relative";
        posterRootElement.style.display = "flex";
        var posterUrl = this.getPosterUrl();
        if (posterUrl) {
            var posterImageElement_1 = document.createElement("img");
            posterImageElement_1.style.width = "100%";
            posterImageElement_1.style.height = "100%";
            posterImageElement_1.onerror = function (e) {
                posterImageElement_1.parentNode.removeChild(posterImageElement_1);
                posterRootElement.classList.add("empty");
                posterRootElement.style.minHeight = "150px";
            };
            posterImageElement_1.src = posterUrl;
            posterRootElement.appendChild(posterImageElement_1);
        }
        else {
            posterRootElement.classList.add("empty");
            posterRootElement.style.minHeight = "150px";
        }
        if (this.hostConfig.supportsInteractivity && this._selectedSources.length > 0) {
            var playButtonOuterElement = document.createElement("div");
            playButtonOuterElement.setAttribute("role", "button");
            playButtonOuterElement.setAttribute("aria-label", "Play media");
            playButtonOuterElement.className = "ac-media-playButton";
            playButtonOuterElement.style.display = "flex";
            playButtonOuterElement.style.alignItems = "center";
            playButtonOuterElement.style.justifyContent = "center";
            playButtonOuterElement.onclick = function (e) {
                if (_this.hostConfig.media.allowInlinePlayback) {
                    var mediaPlayerElement = _this.renderMediaPlayer();
                    _this.renderedElement.innerHTML = "";
                    _this.renderedElement.appendChild(mediaPlayerElement);
                    mediaPlayerElement.play();
                }
                else {
                    if (Media.onPlay) {
                        Media.onPlay(_this);
                    }
                }
            };
            var playButtonInnerElement = document.createElement("div");
            playButtonInnerElement.className = "ac-media-playButton-arrow";
            playButtonInnerElement.style.width = playButtonArrowWidth + "px";
            playButtonInnerElement.style.height = playButtonArrowHeight + "px";
            playButtonInnerElement.style.borderTopWidth = (playButtonArrowHeight / 2) + "px";
            playButtonInnerElement.style.borderBottomWidth = (playButtonArrowHeight / 2) + "px";
            playButtonInnerElement.style.borderLeftWidth = playButtonArrowWidth + "px";
            playButtonInnerElement.style.borderRightWidth = "0";
            playButtonInnerElement.style.borderStyle = "solid";
            playButtonInnerElement.style.borderTopColor = "transparent";
            playButtonInnerElement.style.borderRightColor = "transparent";
            playButtonInnerElement.style.borderBottomColor = "transparent";
            playButtonInnerElement.style.transform = "translate(" + (playButtonArrowWidth / 10) + "px,0px)";
            playButtonOuterElement.appendChild(playButtonInnerElement);
            var playButtonContainer = document.createElement("div");
            playButtonContainer.style.position = "absolute";
            playButtonContainer.style.left = "0";
            playButtonContainer.style.top = "0";
            playButtonContainer.style.width = "100%";
            playButtonContainer.style.height = "100%";
            playButtonContainer.style.display = "flex";
            playButtonContainer.style.justifyContent = "center";
            playButtonContainer.style.alignItems = "center";
            playButtonContainer.appendChild(playButtonOuterElement);
            posterRootElement.appendChild(playButtonContainer);
        }
        return posterRootElement;
    };
    Media.prototype.renderMediaPlayer = function () {
        var mediaElement;
        if (this._selectedMediaType == "video") {
            var videoPlayer = document.createElement("video");
            var posterUrl = this.getPosterUrl();
            if (posterUrl) {
                videoPlayer.poster = posterUrl;
            }
            mediaElement = videoPlayer;
        }
        else {
            mediaElement = document.createElement("audio");
        }
        mediaElement.controls = true;
        mediaElement.preload = "none";
        mediaElement.style.width = "100%";
        for (var _i = 0, _a = this.sources; _i < _a.length; _i++) {
            var source = _a[_i];
            var src = document.createElement("source");
            src.src = source.url;
            src.type = source.mimeType;
            mediaElement.appendChild(src);
        }
        return mediaElement;
    };
    Media.prototype.internalRender = function () {
        var element = document.createElement("div");
        element.className = this.hostConfig.makeCssClassName("ac-media");
        this.processSources();
        element.appendChild(this.renderPoster());
        return element;
    };
    Media.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.poster = json["poster"];
        this.altText = json["altText"];
        if (json["sources"] != null) {
            var jsonSources = json["sources"];
            this.sources = [];
            for (var i = 0; i < jsonSources.length; i++) {
                var source = new MediaSource();
                source.parse(jsonSources[i], errors);
                this.sources.push(source);
            }
        }
    };
    Media.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "poster", this.poster);
        Utils.setProperty(result, "altText", this.altText);
        if (this.sources.length > 0) {
            var serializedSources = [];
            for (var _i = 0, _a = this.sources; _i < _a.length; _i++) {
                var source = _a[_i];
                serializedSources.push(source.toJSON());
            }
            Utils.setProperty(result, "sources", serializedSources);
        }
        return result;
    };
    Media.prototype.getJsonTypeName = function () {
        return "Media";
    };
    Media.prototype.getResourceInformation = function () {
        var result = [];
        var posterUrl = this.getPosterUrl();
        if (!Utils.isNullOrEmpty(posterUrl)) {
            result.push({ url: posterUrl, mimeType: "image" });
        }
        for (var _i = 0, _a = this.sources; _i < _a.length; _i++) {
            var mediaSource = _a[_i];
            if (!Utils.isNullOrEmpty(mediaSource.url)) {
                result.push({ url: mediaSource.url, mimeType: mediaSource.mimeType });
            }
        }
        return result;
    };
    Media.prototype.renderSpeech = function () {
        return this.altText;
    };
    Object.defineProperty(Media.prototype, "selectedMediaType", {
        get: function () {
            return this._selectedMediaType;
        },
        enumerable: true,
        configurable: true
    });
    Media.supportedMediaTypes = ["audio", "video"];
    return Media;
}(CardElement));
exports.Media = Media;
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Input.prototype.valueChanged = function () {
        if (this.onValueChanged) {
            this.onValueChanged(this);
        }
    };
    Input.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "title", this.title);
        Utils.setProperty(result, "value", this.renderedElement ? this.value : this.defaultValue);
        return result;
    };
    Input.prototype.validate = function () {
        if (!this.id) {
            return [{ error: Enums.ValidationError.PropertyCantBeNull, message: "All inputs must have a unique Id" }];
        }
        else {
            return [];
        }
    };
    Input.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.id = json["id"];
        this.defaultValue = json["value"];
    };
    Input.prototype.renderSpeech = function () {
        if (this.speak != null) {
            return this.speak;
        }
        if (this.title) {
            return '<s>' + this.title + '</s>\n';
        }
        return null;
    };
    Input.prototype.getAllInputs = function () {
        return [this];
    };
    Object.defineProperty(Input.prototype, "isInteractive", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return Input;
}(CardElement));
exports.Input = Input;
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = Enums.InputTextStyle.Text;
        return _this;
    }
    TextInput.prototype.internalRender = function () {
        var _this = this;
        if (this.isMultiline) {
            this._textareaElement = document.createElement("textarea");
            this._textareaElement.className = this.hostConfig.makeCssClassName("ac-input", "ac-textInput", "ac-multiline");
            this._textareaElement.style.width = "100%";
            this._textareaElement.tabIndex = 0;
            if (!Utils.isNullOrEmpty(this.placeholder)) {
                this._textareaElement.placeholder = this.placeholder;
                this._textareaElement.setAttribute("aria-label", this.placeholder);
            }
            if (!Utils.isNullOrEmpty(this.defaultValue)) {
                this._textareaElement.value = this.defaultValue;
            }
            if (this.maxLength > 0) {
                this._textareaElement.maxLength = this.maxLength;
            }
            this._textareaElement.oninput = function () { _this.valueChanged(); };
            return this._textareaElement;
        }
        else {
            this._inputElement = document.createElement("input");
            this._inputElement.type = Enums.InputTextStyle[this.style].toLowerCase();
            this._inputElement.className = this.hostConfig.makeCssClassName("ac-input", "ac-textInput");
            this._inputElement.style.width = "100%";
            this._inputElement.tabIndex = 0;
            if (!Utils.isNullOrEmpty(this.placeholder)) {
                this._inputElement.placeholder = this.placeholder;
                this._inputElement.setAttribute("aria-label", this.placeholder);
            }
            if (!Utils.isNullOrEmpty(this.defaultValue)) {
                this._inputElement.value = this.defaultValue;
            }
            if (this.maxLength > 0) {
                this._inputElement.maxLength = this.maxLength;
            }
            this._inputElement.oninput = function () { _this.valueChanged(); };
            return this._inputElement;
        }
    };
    TextInput.prototype.getJsonTypeName = function () {
        return "Input.Text";
    };
    TextInput.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "placeholder", this.placeholder);
        Utils.setProperty(result, "maxLength", this.maxLength, 0);
        Utils.setProperty(result, "isMultiline", this.isMultiline, false);
        Utils.setEnumProperty(Enums.InputTextStyle, result, "style", this.style, Enums.InputTextStyle.Text);
        return result;
    };
    TextInput.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.maxLength = json["maxLength"];
        this.isMultiline = json["isMultiline"];
        this.placeholder = json["placeholder"];
        this.style = Utils.getEnumValueOrDefault(Enums.InputTextStyle, json["style"], this.style);
    };
    Object.defineProperty(TextInput.prototype, "value", {
        get: function () {
            if (this.isMultiline) {
                return this._textareaElement ? this._textareaElement.value : null;
            }
            else {
                return this._inputElement ? this._inputElement.value : null;
            }
        },
        enumerable: true,
        configurable: true
    });
    return TextInput;
}(Input));
exports.TextInput = TextInput;
var ToggleInput = /** @class */ (function (_super) {
    __extends(ToggleInput, _super);
    function ToggleInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.valueOn = "true";
        _this.valueOff = "false";
        return _this;
    }
    ToggleInput.prototype.internalRender = function () {
        var _this = this;
        var element = document.createElement("div");
        element.className = this.hostConfig.makeCssClassName("ac-input");
        element.style.width = "100%";
        element.style.display = "flex";
        element.style.alignItems = "center";
        this._checkboxInputElement = document.createElement("input");
        this._checkboxInputElement.id = generateUniqueId();
        this._checkboxInputElement.type = "checkbox";
        this._checkboxInputElement.style.display = "inline-block";
        this._checkboxInputElement.style.verticalAlign = "middle";
        this._checkboxInputElement.style.margin = "0";
        this._checkboxInputElement.style.flex = "0 0 auto";
        this._checkboxInputElement.setAttribute("aria-label", this.title);
        this._checkboxInputElement.tabIndex = 0;
        if (this.defaultValue == this.valueOn) {
            this._checkboxInputElement.checked = true;
        }
        this._checkboxInputElement.onchange = function () { _this.valueChanged(); };
        Utils.appendChild(element, this._checkboxInputElement);
        if (!Utils.isNullOrEmpty(this.title) || this.isDesignMode()) {
            var label = new Label();
            label.setParent(this);
            label.forElementId = this._checkboxInputElement.id;
            label.hostConfig = this.hostConfig;
            label.text = Utils.isNullOrEmpty(this.title) ? this.getJsonTypeName() : this.title;
            label.useMarkdown = AdaptiveCard.useMarkdownInRadioButtonAndCheckbox;
            var labelElement = label.render();
            labelElement.style.display = "inline-block";
            labelElement.style.flex = "1 1 auto";
            labelElement.style.verticalAlign = "middle";
            var spacerElement = document.createElement("div");
            spacerElement.style.width = "6px";
            Utils.appendChild(element, spacerElement);
            Utils.appendChild(element, labelElement);
        }
        return element;
    };
    ToggleInput.prototype.getJsonTypeName = function () {
        return "Input.Toggle";
    };
    ToggleInput.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "valueOn", this.valueOn, "true");
        Utils.setProperty(result, "valueOff", this.valueOff, "false");
        return result;
    };
    ToggleInput.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.title = json["title"];
        this.valueOn = Utils.getValueOrDefault(json["valueOn"], this.valueOn);
        this.valueOff = Utils.getValueOrDefault(json["valueOff"], this.valueOff);
    };
    Object.defineProperty(ToggleInput.prototype, "value", {
        get: function () {
            if (this._checkboxInputElement) {
                return this._checkboxInputElement.checked ? this.valueOn : this.valueOff;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    return ToggleInput;
}(Input));
exports.ToggleInput = ToggleInput;
var Choice = /** @class */ (function () {
    function Choice(title, value) {
        if (title === void 0) { title = undefined; }
        if (value === void 0) { value = undefined; }
        this.title = title;
        this.value = value;
    }
    Choice.prototype.toJSON = function () {
        return { title: this.title, value: this.value };
    };
    return Choice;
}());
exports.Choice = Choice;
var ChoiceSetInput = /** @class */ (function (_super) {
    __extends(ChoiceSetInput, _super);
    function ChoiceSetInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.choices = [];
        return _this;
    }
    ChoiceSetInput.getUniqueCategoryName = function () {
        var uniqueCwtegoryName = "__ac-category" + ChoiceSetInput.uniqueCategoryCounter;
        ChoiceSetInput.uniqueCategoryCounter++;
        return uniqueCwtegoryName;
    };
    ChoiceSetInput.prototype.internalRender = function () {
        var _this = this;
        if (!this.isMultiSelect) {
            if (this.isCompact) {
                // Render as a combo box
                this._selectElement = document.createElement("select");
                this._selectElement.className = this.hostConfig.makeCssClassName("ac-input", "ac-multichoiceInput");
                this._selectElement.style.width = "100%";
                var option = document.createElement("option");
                option.selected = true;
                option.disabled = true;
                option.hidden = true;
                option.value = "";
                if (this.placeholder) {
                    option.text = this.placeholder;
                }
                Utils.appendChild(this._selectElement, option);
                for (var i = 0; i < this.choices.length; i++) {
                    var option_1 = document.createElement("option");
                    option_1.value = this.choices[i].value;
                    option_1.text = this.choices[i].title;
                    option_1.setAttribute("aria-label", this.choices[i].title);
                    if (this.choices[i].value == this.defaultValue) {
                        option_1.selected = true;
                    }
                    Utils.appendChild(this._selectElement, option_1);
                }
                this._selectElement.onchange = function () { _this.valueChanged(); };
                return this._selectElement;
            }
            else {
                // Render as a series of radio buttons
                var uniqueCategoryName = ChoiceSetInput.getUniqueCategoryName();
                var element = document.createElement("div");
                element.className = this.hostConfig.makeCssClassName("ac-input");
                element.style.width = "100%";
                this._toggleInputs = [];
                for (var i_1 = 0; i_1 < this.choices.length; i_1++) {
                    var radioInput = document.createElement("input");
                    radioInput.id = generateUniqueId();
                    radioInput.type = "radio";
                    radioInput.style.margin = "0";
                    radioInput.style.display = "inline-block";
                    radioInput.style.verticalAlign = "middle";
                    radioInput.name = Utils.isNullOrEmpty(this.id) ? uniqueCategoryName : this.id;
                    radioInput.value = this.choices[i_1].value;
                    radioInput.style.flex = "0 0 auto";
                    radioInput.setAttribute("aria-label", this.choices[i_1].title);
                    if (this.choices[i_1].value == this.defaultValue) {
                        radioInput.checked = true;
                    }
                    radioInput.onchange = function () { _this.valueChanged(); };
                    this._toggleInputs.push(radioInput);
                    var label = new Label();
                    label.setParent(this);
                    label.forElementId = radioInput.id;
                    label.hostConfig = this.hostConfig;
                    label.text = Utils.isNullOrEmpty(this.choices[i_1].title) ? "Choice " + i_1 : this.choices[i_1].title;
                    label.useMarkdown = AdaptiveCard.useMarkdownInRadioButtonAndCheckbox;
                    var labelElement = label.render();
                    labelElement.style.display = "inline-block";
                    labelElement.style.flex = "1 1 auto";
                    labelElement.style.marginLeft = "6px";
                    labelElement.style.verticalAlign = "middle";
                    var spacerElement = document.createElement("div");
                    spacerElement.style.width = "6px";
                    var compoundInput = document.createElement("div");
                    compoundInput.style.display = "flex";
                    Utils.appendChild(compoundInput, radioInput);
                    Utils.appendChild(compoundInput, spacerElement);
                    Utils.appendChild(compoundInput, labelElement);
                    Utils.appendChild(element, compoundInput);
                }
                return element;
            }
        }
        else {
            // Render as a list of toggle inputs
            var defaultValues = this.defaultValue ? this.defaultValue.split(this.hostConfig.choiceSetInputValueSeparator) : null;
            var element = document.createElement("div");
            element.className = this.hostConfig.makeCssClassName("ac-input");
            element.style.width = "100%";
            this._toggleInputs = [];
            for (var i_2 = 0; i_2 < this.choices.length; i_2++) {
                var checkboxInput = document.createElement("input");
                checkboxInput.id = generateUniqueId();
                checkboxInput.type = "checkbox";
                checkboxInput.style.margin = "0";
                checkboxInput.style.display = "inline-block";
                checkboxInput.style.verticalAlign = "middle";
                checkboxInput.value = this.choices[i_2].value;
                checkboxInput.style.flex = "0 0 auto";
                checkboxInput.setAttribute("aria-label", this.choices[i_2].title);
                if (defaultValues) {
                    if (defaultValues.indexOf(this.choices[i_2].value) >= 0) {
                        checkboxInput.checked = true;
                    }
                }
                checkboxInput.onchange = function () { _this.valueChanged(); };
                this._toggleInputs.push(checkboxInput);
                var label = new Label();
                label.setParent(this);
                label.forElementId = checkboxInput.id;
                label.hostConfig = this.hostConfig;
                label.text = Utils.isNullOrEmpty(this.choices[i_2].title) ? "Choice " + i_2 : this.choices[i_2].title;
                label.useMarkdown = AdaptiveCard.useMarkdownInRadioButtonAndCheckbox;
                var labelElement = label.render();
                labelElement.style.display = "inline-block";
                labelElement.style.flex = "1 1 auto";
                // labelElement.style.marginLeft = "6px";
                labelElement.style.verticalAlign = "middle";
                var spacerElement = document.createElement("div");
                spacerElement.style.width = "6px";
                var compoundInput = document.createElement("div");
                compoundInput.style.display = "flex";
                compoundInput.style.alignItems = "center";
                Utils.appendChild(compoundInput, checkboxInput);
                Utils.appendChild(compoundInput, spacerElement);
                Utils.appendChild(compoundInput, labelElement);
                Utils.appendChild(element, compoundInput);
            }
            return element;
        }
    };
    ChoiceSetInput.prototype.getJsonTypeName = function () {
        return "Input.ChoiceSet";
    };
    ChoiceSetInput.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "placeholder", this.placeholder);
        if (this.choices.length > 0) {
            var choices = [];
            for (var _i = 0, _a = this.choices; _i < _a.length; _i++) {
                var choice = _a[_i];
                choices.push(choice.toJSON());
            }
            Utils.setProperty(result, "choices", choices);
        }
        if (!this.isCompact) {
            Utils.setProperty(result, "style", "expanded", false);
        }
        Utils.setProperty(result, "isMultiSelect", this.isMultiSelect, false);
        return result;
    };
    ChoiceSetInput.prototype.validate = function () {
        var result = [];
        if (this.choices.length == 0) {
            result = [{ error: Enums.ValidationError.CollectionCantBeEmpty, message: "An Input.ChoiceSet must have at least one choice defined." }];
        }
        for (var i = 0; i < this.choices.length; i++) {
            if (!this.choices[i].title || !this.choices[i].value) {
                result = result.concat([{ error: Enums.ValidationError.PropertyCantBeNull, message: "All choices in an Input.ChoiceSet must have their title and value properties set." }]);
                break;
            }
        }
        return result;
    };
    ChoiceSetInput.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.isCompact = !(json["style"] === "expanded");
        this.isMultiSelect = json["isMultiSelect"];
        this.placeholder = json["placeholder"];
        this.choices = [];
        if (json["choices"] != undefined) {
            var choiceArray = json["choices"];
            for (var i = 0; i < choiceArray.length; i++) {
                var choice = new Choice();
                choice.title = choiceArray[i]["title"];
                choice.value = choiceArray[i]["value"];
                this.choices.push(choice);
            }
        }
    };
    Object.defineProperty(ChoiceSetInput.prototype, "value", {
        get: function () {
            if (!this.isMultiSelect) {
                if (this.isCompact) {
                    return this._selectElement ? this._selectElement.value : null;
                }
                else {
                    if (!this._toggleInputs || this._toggleInputs.length == 0) {
                        return null;
                    }
                    for (var i = 0; i < this._toggleInputs.length; i++) {
                        if (this._toggleInputs[i].checked) {
                            return this._toggleInputs[i].value;
                        }
                    }
                    return null;
                }
            }
            else {
                if (!this._toggleInputs || this._toggleInputs.length == 0) {
                    return null;
                }
                var result = "";
                for (var i = 0; i < this._toggleInputs.length; i++) {
                    if (this._toggleInputs[i].checked) {
                        if (result != "") {
                            result += this.hostConfig.choiceSetInputValueSeparator;
                        }
                        result += this._toggleInputs[i].value;
                    }
                }
                return result == "" ? null : result;
            }
        },
        enumerable: true,
        configurable: true
    });
    ChoiceSetInput.uniqueCategoryCounter = 0;
    return ChoiceSetInput;
}(Input));
exports.ChoiceSetInput = ChoiceSetInput;
var NumberInput = /** @class */ (function (_super) {
    __extends(NumberInput, _super);
    function NumberInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberInput.prototype.internalRender = function () {
        var _this = this;
        this._numberInputElement = document.createElement("input");
        this._numberInputElement.setAttribute("type", "number");
        this._numberInputElement.className = this.hostConfig.makeCssClassName("ac-input", "ac-numberInput");
        this._numberInputElement.setAttribute("min", this.min);
        this._numberInputElement.setAttribute("max", this.max);
        this._numberInputElement.style.width = "100%";
        this._numberInputElement.tabIndex = 0;
        if (!Utils.isNullOrEmpty(this.defaultValue)) {
            this._numberInputElement.value = this.defaultValue;
        }
        if (!Utils.isNullOrEmpty(this.placeholder)) {
            this._numberInputElement.placeholder = this.placeholder;
            this._numberInputElement.setAttribute("aria-label", this.placeholder);
        }
        this._numberInputElement.oninput = function () { _this.valueChanged(); };
        return this._numberInputElement;
    };
    NumberInput.prototype.getJsonTypeName = function () {
        return "Input.Number";
    };
    NumberInput.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "placeholder", this.placeholder);
        Utils.setProperty(result, "min", this.min);
        Utils.setProperty(result, "max", this.max);
        return result;
    };
    NumberInput.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.placeholder = json["placeholder"];
        this.min = json["min"];
        this.max = json["max"];
    };
    Object.defineProperty(NumberInput.prototype, "value", {
        get: function () {
            return this._numberInputElement ? this._numberInputElement.value : null;
        },
        enumerable: true,
        configurable: true
    });
    return NumberInput;
}(Input));
exports.NumberInput = NumberInput;
var DateInput = /** @class */ (function (_super) {
    __extends(DateInput, _super);
    function DateInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateInput.prototype.internalRender = function () {
        this._dateInputElement = document.createElement("input");
        this._dateInputElement.setAttribute("type", "date");
        this._dateInputElement.className = this.hostConfig.makeCssClassName("ac-input", "ac-dateInput");
        this._dateInputElement.style.width = "100%";
        if (!Utils.isNullOrEmpty(this.defaultValue)) {
            this._dateInputElement.value = this.defaultValue;
        }
        return this._dateInputElement;
    };
    DateInput.prototype.getJsonTypeName = function () {
        return "Input.Date";
    };
    Object.defineProperty(DateInput.prototype, "value", {
        get: function () {
            return this._dateInputElement ? this._dateInputElement.value : null;
        },
        enumerable: true,
        configurable: true
    });
    return DateInput;
}(Input));
exports.DateInput = DateInput;
var TimeInput = /** @class */ (function (_super) {
    __extends(TimeInput, _super);
    function TimeInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeInput.prototype.internalRender = function () {
        this._timeInputElement = document.createElement("input");
        this._timeInputElement.setAttribute("type", "time");
        this._timeInputElement.className = this.hostConfig.makeCssClassName("ac-input", "ac-timeInput");
        this._timeInputElement.style.width = "100%";
        if (!Utils.isNullOrEmpty(this.defaultValue)) {
            this._timeInputElement.value = this.defaultValue;
        }
        return this._timeInputElement;
    };
    TimeInput.prototype.getJsonTypeName = function () {
        return "Input.Time";
    };
    Object.defineProperty(TimeInput.prototype, "value", {
        get: function () {
            return this._timeInputElement ? this._timeInputElement.value : null;
        },
        enumerable: true,
        configurable: true
    });
    return TimeInput;
}(Input));
exports.TimeInput = TimeInput;
var ActionButtonState;
(function (ActionButtonState) {
    ActionButtonState[ActionButtonState["Normal"] = 0] = "Normal";
    ActionButtonState[ActionButtonState["Expanded"] = 1] = "Expanded";
    ActionButtonState[ActionButtonState["Subdued"] = 2] = "Subdued";
})(ActionButtonState || (ActionButtonState = {}));
var ActionButton = /** @class */ (function () {
    function ActionButton(action, parentContainerStyle) {
        this._element = null;
        this._state = ActionButtonState.Normal;
        this.onClick = null;
        this.action = action;
        this._parentContainerStyle = parentContainerStyle;
    }
    ActionButton.prototype.updateCssStyle = function () {
        var hostConfig = this.action.parent.hostConfig;
        this.action.renderedElement.className = hostConfig.makeCssClassName("ac-pushButton");
        this.action.renderedElement.classList.add("style-" + this._parentContainerStyle);
        if (this.action instanceof ShowCardAction) {
            this.action.renderedElement.classList.add(hostConfig.makeCssClassName("expandable"));
        }
        this.action.renderedElement.classList.remove(hostConfig.makeCssClassName("expanded"));
        this.action.renderedElement.classList.remove(hostConfig.makeCssClassName("subdued"));
        switch (this._state) {
            case ActionButtonState.Expanded:
                this.action.renderedElement.classList.add(hostConfig.makeCssClassName("expanded"));
                break;
            case ActionButtonState.Subdued:
                this.action.renderedElement.classList.add(hostConfig.makeCssClassName("subdued"));
                break;
        }
        if (this.action.isPrimary) {
            this.action.renderedElement.classList.add(hostConfig.makeCssClassName("primary"));
        }
    };
    ActionButton.prototype.render = function (alignment) {
        var _this = this;
        this.action.render();
        this.action.renderedElement.style.flex = alignment === Enums.ActionAlignment.Stretch ? "0 1 100%" : "0 1 auto";
        this.action.renderedElement.onclick = function (e) { _this.click(); };
        this.updateCssStyle();
    };
    ActionButton.prototype.click = function () {
        if (this.onClick != null) {
            this.onClick(this);
        }
    };
    Object.defineProperty(ActionButton.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
            this.updateCssStyle();
        },
        enumerable: true,
        configurable: true
    });
    return ActionButton;
}());
var Action = /** @class */ (function () {
    function Action() {
        this._shouldFallback = false;
        this._parent = null;
        this._actionCollection = null; // hold the reference to its action collection
        this._renderedElement = null;
        this.requires = new HostConfig.HostCapabilities();
    }
    Action.prototype.setCollection = function (actionCollection) {
        this._actionCollection = actionCollection;
    };
    Action.prototype.addCssClasses = function (element) {
        // Do nothing in base implementation
    };
    Action.prototype.toJSON = function () {
        var result = {};
        Utils.setProperty(result, "type", this.getJsonTypeName());
        Utils.setProperty(result, "id", this.id);
        Utils.setProperty(result, "title", this.title);
        Utils.setProperty(result, "iconUrl", this.iconUrl);
        return result;
    };
    Action.prototype.render = function () {
        // Cache hostConfig for perf
        var hostConfig = this.parent.hostConfig;
        var buttonElement = document.createElement("button");
        buttonElement.className = hostConfig.makeCssClassName("ac-pushButton");
        this.addCssClasses(buttonElement);
        buttonElement.setAttribute("aria-label", this.title);
        buttonElement.type = "button";
        buttonElement.style.display = "flex";
        buttonElement.style.alignItems = "center";
        buttonElement.style.justifyContent = "center";
        var hasTitle = !Utils.isNullOrEmpty(this.title);
        var titleElement = document.createElement("div");
        titleElement.style.overflow = "hidden";
        titleElement.style.textOverflow = "ellipsis";
        if (!(hostConfig.actions.iconPlacement == Enums.ActionIconPlacement.AboveTitle || hostConfig.actions.allowTitleToWrap)) {
            titleElement.style.whiteSpace = "nowrap";
        }
        if (hasTitle) {
            titleElement.innerText = this.title;
        }
        if (Utils.isNullOrEmpty(this.iconUrl)) {
            buttonElement.classList.add("noIcon");
            buttonElement.appendChild(titleElement);
        }
        else {
            var iconElement = document.createElement("img");
            iconElement.src = this.iconUrl;
            iconElement.style.width = hostConfig.actions.iconSize + "px";
            iconElement.style.height = hostConfig.actions.iconSize + "px";
            iconElement.style.flex = "0 0 auto";
            if (hostConfig.actions.iconPlacement == Enums.ActionIconPlacement.AboveTitle) {
                buttonElement.classList.add("iconAbove");
                buttonElement.style.flexDirection = "column";
                if (hasTitle) {
                    iconElement.style.marginBottom = "4px";
                }
            }
            else {
                buttonElement.classList.add("iconLeft");
                if (hasTitle) {
                    iconElement.style.marginRight = "4px";
                }
            }
            buttonElement.appendChild(iconElement);
            buttonElement.appendChild(titleElement);
        }
        this._renderedElement = buttonElement;
    };
    Action.prototype.setParent = function (value) {
        this._parent = value;
    };
    Action.prototype.execute = function () {
        if (this.onExecute) {
            this.onExecute(this);
        }
        raiseExecuteActionEvent(this);
    };
    // Expand the action card pane with a inline status card
    // Null status will clear the status bar
    Action.prototype.setStatus = function (status) {
        if (this._actionCollection == null) {
            return;
        }
        if (status) {
            var statusCard = new InlineAdaptiveCard();
            statusCard.parse(status);
            this._actionCollection.showStatusCard(statusCard);
        }
        else {
            this._actionCollection.hideStatusCard();
        }
    };
    Action.prototype.validate = function () {
        return [];
    };
    Action.prototype.prepare = function (inputs) {
        // Do nothing in base implementation
    };
    ;
    Action.prototype.parse = function (json, errors) {
        raiseParseActionEvent(this, json, errors);
        this.requires.parse(json["requires"], errors);
        this.id = json["id"];
        if (!json["title"] && json["title"] !== "") {
            raiseParseError({
                error: Enums.ValidationError.PropertyCantBeNull,
                message: "Actions should always have a title."
            }, errors);
        }
        this.title = json["title"];
        this.iconUrl = json["iconUrl"];
    };
    Action.prototype.remove = function () {
        if (this._actionCollection) {
            return this._actionCollection.removeAction(this);
        }
        return false;
    };
    Action.prototype.getAllInputs = function () {
        return [];
    };
    Action.prototype.getResourceInformation = function () {
        if (!Utils.isNullOrEmpty(this.iconUrl)) {
            return [{ url: this.iconUrl, mimeType: "image" }];
        }
        else {
            return [];
        }
    };
    Action.prototype.getActionById = function (id) {
        if (this.id == id) {
            return this;
        }
    };
    Object.defineProperty(Action.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action.prototype, "renderedElement", {
        get: function () {
            return this._renderedElement;
        },
        enumerable: true,
        configurable: true
    });
    Action.prototype.shouldFallback = function () {
        return this._shouldFallback || !this.requires.areAllMet(this.parent.hostConfig.hostCapabilities);
    };
    return Action;
}());
exports.Action = Action;
var SubmitAction = /** @class */ (function (_super) {
    __extends(SubmitAction, _super);
    function SubmitAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isPrepared = false;
        return _this;
    }
    SubmitAction.prototype.getJsonTypeName = function () {
        return "Action.Submit";
    };
    SubmitAction.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "data", this._originalData);
        return result;
    };
    SubmitAction.prototype.prepare = function (inputs) {
        if (this._originalData) {
            this._processedData = JSON.parse(JSON.stringify(this._originalData));
        }
        else {
            this._processedData = {};
        }
        for (var i = 0; i < inputs.length; i++) {
            var inputValue = inputs[i].value;
            if (inputValue != null) {
                this._processedData[inputs[i].id] = inputs[i].value;
            }
        }
        this._isPrepared = true;
    };
    SubmitAction.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.data = json["data"];
    };
    Object.defineProperty(SubmitAction.prototype, "data", {
        get: function () {
            return this._isPrepared ? this._processedData : this._originalData;
        },
        set: function (value) {
            this._originalData = value;
            this._isPrepared = false;
        },
        enumerable: true,
        configurable: true
    });
    return SubmitAction;
}(Action));
exports.SubmitAction = SubmitAction;
var OpenUrlAction = /** @class */ (function (_super) {
    __extends(OpenUrlAction, _super);
    function OpenUrlAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OpenUrlAction.prototype.getJsonTypeName = function () {
        return "Action.OpenUrl";
    };
    OpenUrlAction.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "url", this.url);
        return result;
    };
    OpenUrlAction.prototype.validate = function () {
        if (!this.url) {
            return [{ error: Enums.ValidationError.PropertyCantBeNull, message: "An Action.OpenUrl must have its url property set." }];
        }
        else {
            return [];
        }
    };
    OpenUrlAction.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.url = json["url"];
    };
    return OpenUrlAction;
}(Action));
exports.OpenUrlAction = OpenUrlAction;
var HttpHeader = /** @class */ (function () {
    function HttpHeader(name, value) {
        if (name === void 0) { name = ""; }
        if (value === void 0) { value = ""; }
        this._value = new Utils.StringWithSubstitutions();
        this.name = name;
        this.value = value;
    }
    HttpHeader.prototype.toJSON = function () {
        return { name: this.name, value: this._value.getOriginal() };
    };
    HttpHeader.prototype.prepare = function (inputs) {
        this._value.substituteInputValues(inputs, Utils.ContentTypes.applicationXWwwFormUrlencoded);
    };
    Object.defineProperty(HttpHeader.prototype, "value", {
        get: function () {
            return this._value.get();
        },
        set: function (newValue) {
            this._value.set(newValue);
        },
        enumerable: true,
        configurable: true
    });
    return HttpHeader;
}());
exports.HttpHeader = HttpHeader;
var HttpAction = /** @class */ (function (_super) {
    __extends(HttpAction, _super);
    function HttpAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._url = new Utils.StringWithSubstitutions();
        _this._body = new Utils.StringWithSubstitutions();
        _this._headers = [];
        return _this;
    }
    HttpAction.prototype.getJsonTypeName = function () {
        return "Action.Http";
    };
    HttpAction.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "method", this.method);
        Utils.setProperty(result, "url", this._url.getOriginal());
        Utils.setProperty(result, "body", this._body.getOriginal());
        if (this._headers.length > 0) {
            var headers = [];
            for (var _i = 0, _a = this._headers; _i < _a.length; _i++) {
                var header = _a[_i];
                headers.push(header.toJSON());
            }
            Utils.setProperty(result, "headers", headers);
        }
        return result;
    };
    HttpAction.prototype.validate = function () {
        var result = [];
        if (!this.url) {
            result = [{ error: Enums.ValidationError.PropertyCantBeNull, message: "An Action.Http must have its url property set." }];
        }
        if (this.headers.length > 0) {
            for (var i = 0; i < this.headers.length; i++) {
                if (!this.headers[i].name || !this.headers[i].value) {
                    result = result.concat([{ error: Enums.ValidationError.PropertyCantBeNull, message: "All headers of an Action.Http must have their name and value properties set." }]);
                    break;
                }
            }
        }
        return result;
    };
    HttpAction.prototype.prepare = function (inputs) {
        this._url.substituteInputValues(inputs, Utils.ContentTypes.applicationXWwwFormUrlencoded);
        var contentType = Utils.ContentTypes.applicationJson;
        for (var i = 0; i < this._headers.length; i++) {
            this._headers[i].prepare(inputs);
            if (this._headers[i].name && this._headers[i].name.toLowerCase() == "content-type") {
                contentType = this._headers[i].value;
            }
        }
        this._body.substituteInputValues(inputs, contentType);
    };
    ;
    HttpAction.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.url = json["url"];
        this.method = json["method"];
        this.body = json["body"];
        this._headers = [];
        if (json["headers"] != null) {
            var jsonHeaders = json["headers"];
            for (var i = 0; i < jsonHeaders.length; i++) {
                var httpHeader = new HttpHeader();
                httpHeader.name = jsonHeaders[i]["name"];
                httpHeader.value = jsonHeaders[i]["value"];
                this.headers.push(httpHeader);
            }
        }
    };
    Object.defineProperty(HttpAction.prototype, "url", {
        get: function () {
            return this._url.get();
        },
        set: function (value) {
            this._url.set(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpAction.prototype, "body", {
        get: function () {
            return this._body.get();
        },
        set: function (value) {
            this._body.set(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HttpAction.prototype, "headers", {
        get: function () {
            return this._headers ? this._headers : [];
        },
        set: function (value) {
            this._headers = value;
        },
        enumerable: true,
        configurable: true
    });
    return HttpAction;
}(Action));
exports.HttpAction = HttpAction;
var ShowCardAction = /** @class */ (function (_super) {
    __extends(ShowCardAction, _super);
    function ShowCardAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.card = new InlineAdaptiveCard();
        return _this;
    }
    ShowCardAction.prototype.addCssClasses = function (element) {
        _super.prototype.addCssClasses.call(this, element);
        element.classList.add(this.parent.hostConfig.makeCssClassName("expandable"));
    };
    ShowCardAction.prototype.getJsonTypeName = function () {
        return "Action.ShowCard";
    };
    ShowCardAction.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        if (this.card) {
            Utils.setProperty(result, "card", this.card.toJSON());
        }
        return result;
    };
    ShowCardAction.prototype.validate = function () {
        return this.card.validate();
    };
    ShowCardAction.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.card.parse(json["card"], errors);
    };
    ShowCardAction.prototype.setParent = function (value) {
        _super.prototype.setParent.call(this, value);
        this.card.setParent(value);
    };
    ShowCardAction.prototype.getAllInputs = function () {
        return this.card.getAllInputs();
    };
    ShowCardAction.prototype.getResourceInformation = function () {
        return _super.prototype.getResourceInformation.call(this).concat(this.card.getResourceInformation());
    };
    ShowCardAction.prototype.getActionById = function (id) {
        var result = _super.prototype.getActionById.call(this, id);
        if (!result) {
            result = this.card.getActionById(id);
        }
        return result;
    };
    return ShowCardAction;
}(Action));
exports.ShowCardAction = ShowCardAction;
var ActionCollection = /** @class */ (function () {
    function ActionCollection(owner) {
        this._expandedAction = null;
        this._renderedActionCount = 0;
        this._statusCard = null;
        this._actionCard = null;
        this.items = [];
        this.buttons = [];
        this._owner = owner;
    }
    ActionCollection.prototype.refreshContainer = function () {
        this._actionCardContainer.innerHTML = "";
        if (this._actionCard === null && this._statusCard === null) {
            this._actionCardContainer.style.padding = "0px";
            this._actionCardContainer.style.marginTop = "0px";
            return;
        }
        this._actionCardContainer.style.marginTop = this._renderedActionCount > 0 ? this._owner.hostConfig.actions.showCard.inlineTopMargin + "px" : "0px";
        var padding = this._owner.getNonZeroPadding().toSpacingDefinition(this._owner.hostConfig);
        if (this._actionCard !== null) {
            this._actionCard.style.paddingLeft = padding.left + "px";
            this._actionCard.style.paddingRight = padding.right + "px";
            this._actionCard.style.marginLeft = "-" + padding.left + "px";
            this._actionCard.style.marginRight = "-" + padding.right + "px";
            Utils.appendChild(this._actionCardContainer, this._actionCard);
        }
        if (this._statusCard !== null) {
            this._statusCard.style.paddingLeft = padding.left + "px";
            this._statusCard.style.paddingRight = padding.right + "px";
            this._statusCard.style.marginLeft = "-" + padding.left + "px";
            this._statusCard.style.marginRight = "-" + padding.right + "px";
            Utils.appendChild(this._actionCardContainer, this._statusCard);
        }
    };
    ActionCollection.prototype.layoutChanged = function () {
        this._owner.getRootElement().updateLayout();
    };
    ActionCollection.prototype.hideActionCard = function () {
        var previouslyExpandedAction = this._expandedAction;
        this._expandedAction = null;
        this._actionCard = null;
        this.refreshContainer();
        if (previouslyExpandedAction) {
            this.layoutChanged();
            raiseInlineCardExpandedEvent(previouslyExpandedAction, false);
        }
    };
    ActionCollection.prototype.showActionCard = function (action, suppressStyle, raiseEvent) {
        if (suppressStyle === void 0) { suppressStyle = false; }
        if (raiseEvent === void 0) { raiseEvent = true; }
        if (action.card == null) {
            return;
        }
        action.card.suppressStyle = suppressStyle;
        var renderedCard = action.card.render();
        this._actionCard = renderedCard;
        this._expandedAction = action;
        this.refreshContainer();
        if (raiseEvent) {
            this.layoutChanged();
            raiseInlineCardExpandedEvent(action, true);
        }
    };
    ActionCollection.prototype.collapseExpandedAction = function () {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].state = ActionButtonState.Normal;
        }
        this.hideActionCard();
    };
    ActionCollection.prototype.expandShowCardAction = function (action, raiseEvent) {
        for (var i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].action !== action) {
                this.buttons[i].state = ActionButtonState.Subdued;
            }
            else {
                this.buttons[i].state = ActionButtonState.Expanded;
            }
        }
        this.showActionCard(action, !(this._owner.isAtTheVeryLeft() && this._owner.isAtTheVeryRight()), raiseEvent);
    };
    ActionCollection.prototype.actionClicked = function (actionButton) {
        if (!(actionButton.action instanceof ShowCardAction)) {
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].state = ActionButtonState.Normal;
            }
            this.hideStatusCard();
            this.hideActionCard();
            actionButton.action.execute();
        }
        else {
            this.hideStatusCard();
            if (this._owner.hostConfig.actions.showCard.actionMode === Enums.ShowCardActionMode.Popup) {
                actionButton.action.execute();
            }
            else if (actionButton.action === this._expandedAction) {
                this.collapseExpandedAction();
            }
            else {
                this.expandShowCardAction(actionButton.action, true);
            }
        }
    };
    ActionCollection.prototype.getParentContainer = function () {
        if (this._owner instanceof Container) {
            return this._owner;
        }
        else {
            return this._owner.getParentContainer();
        }
    };
    ActionCollection.prototype.findActionButton = function (action) {
        for (var _i = 0, _a = this.buttons; _i < _a.length; _i++) {
            var actionButton = _a[_i];
            if (actionButton.action == action) {
                return actionButton;
            }
        }
        return null;
    };
    ActionCollection.prototype.parse = function (json, errors) {
        this.clear();
        if (json && json instanceof Array) {
            for (var _i = 0, json_1 = json; _i < json_1.length; _i++) {
                var jsonAction = json_1[_i];
                var action = createActionInstance(this._owner, jsonAction, errors);
                if (action) {
                    this.addAction(action);
                }
            }
        }
    };
    ActionCollection.prototype.toJSON = function () {
        if (this.items.length > 0) {
            var result = [];
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var action = _a[_i];
                result.push(action.toJSON());
            }
            return result;
        }
        else {
            return null;
        }
    };
    ActionCollection.prototype.showStatusCard = function (status) {
        status.setParent(this._owner);
        this._statusCard = status.render();
        this.refreshContainer();
    };
    ActionCollection.prototype.hideStatusCard = function () {
        this._statusCard = null;
        this.refreshContainer();
    };
    ActionCollection.prototype.getActionById = function (id) {
        var result = null;
        for (var i = 0; i < this.items.length; i++) {
            result = this.items[i].getActionById(id);
            if (result) {
                break;
            }
        }
        return result;
    };
    ActionCollection.prototype.validate = function () {
        var result = [];
        if (this._owner.hostConfig.actions.maxActions && this.items.length > this._owner.hostConfig.actions.maxActions) {
            result.push({
                error: Enums.ValidationError.TooManyActions,
                message: "A maximum of " + this._owner.hostConfig.actions.maxActions + " actions are allowed."
            });
        }
        if (this.items.length > 0 && !this._owner.hostConfig.supportsInteractivity) {
            result.push({
                error: Enums.ValidationError.InteractivityNotAllowed,
                message: "Interactivity is not allowed."
            });
        }
        for (var i = 0; i < this.items.length; i++) {
            if (!isActionAllowed(this.items[i], this._owner.getForbiddenActionTypes())) {
                result.push({
                    error: Enums.ValidationError.ActionTypeNotAllowed,
                    message: "Actions of type " + this.items[i].getJsonTypeName() + " are not allowe."
                });
            }
        }
        for (var i = 0; i < this.items.length; i++) {
            result = result.concat(this.items[i].validate());
        }
        return result;
    };
    ActionCollection.prototype.render = function (orientation, isDesignMode) {
        var _this = this;
        if (!this._owner.hostConfig.supportsInteractivity) {
            return null;
        }
        var element = document.createElement("div");
        var maxActions = this._owner.hostConfig.actions.maxActions ? Math.min(this._owner.hostConfig.actions.maxActions, this.items.length) : this.items.length;
        var forbiddenActionTypes = this._owner.getForbiddenActionTypes();
        this._actionCardContainer = document.createElement("div");
        this._renderedActionCount = 0;
        if (this._owner.hostConfig.actions.preExpandSingleShowCardAction && maxActions == 1 && this.items[0] instanceof ShowCardAction && isActionAllowed(this.items[0], forbiddenActionTypes)) {
            this.showActionCard(this.items[0], true);
            this._renderedActionCount = 1;
        }
        else {
            var buttonStrip = document.createElement("div");
            buttonStrip.className = this._owner.hostConfig.makeCssClassName("ac-actionSet");
            buttonStrip.style.display = "flex";
            if (orientation == Enums.Orientation.Horizontal) {
                buttonStrip.style.flexDirection = "row";
                if (this._owner.horizontalAlignment && this._owner.hostConfig.actions.actionAlignment != Enums.ActionAlignment.Stretch) {
                    switch (this._owner.horizontalAlignment) {
                        case Enums.HorizontalAlignment.Center:
                            buttonStrip.style.justifyContent = "center";
                            break;
                        case Enums.HorizontalAlignment.Right:
                            buttonStrip.style.justifyContent = "flex-end";
                            break;
                        default:
                            buttonStrip.style.justifyContent = "flex-start";
                            break;
                    }
                }
                else {
                    switch (this._owner.hostConfig.actions.actionAlignment) {
                        case Enums.ActionAlignment.Center:
                            buttonStrip.style.justifyContent = "center";
                            break;
                        case Enums.ActionAlignment.Right:
                            buttonStrip.style.justifyContent = "flex-end";
                            break;
                        default:
                            buttonStrip.style.justifyContent = "flex-start";
                            break;
                    }
                }
            }
            else {
                buttonStrip.style.flexDirection = "column";
                if (this._owner.horizontalAlignment && this._owner.hostConfig.actions.actionAlignment != Enums.ActionAlignment.Stretch) {
                    switch (this._owner.horizontalAlignment) {
                        case Enums.HorizontalAlignment.Center:
                            buttonStrip.style.alignItems = "center";
                            break;
                        case Enums.HorizontalAlignment.Right:
                            buttonStrip.style.alignItems = "flex-end";
                            break;
                        default:
                            buttonStrip.style.alignItems = "flex-start";
                            break;
                    }
                }
                else {
                    switch (this._owner.hostConfig.actions.actionAlignment) {
                        case Enums.ActionAlignment.Center:
                            buttonStrip.style.alignItems = "center";
                            break;
                        case Enums.ActionAlignment.Right:
                            buttonStrip.style.alignItems = "flex-end";
                            break;
                        case Enums.ActionAlignment.Stretch:
                            buttonStrip.style.alignItems = "stretch";
                            break;
                        default:
                            buttonStrip.style.alignItems = "flex-start";
                            break;
                    }
                }
            }
            var parentContainerStyle = this.getParentContainer().style;
            for (var i = 0; i < this.items.length; i++) {
                if (isActionAllowed(this.items[i], forbiddenActionTypes)) {
                    var actionButton = this.findActionButton(this.items[i]);
                    if (!actionButton) {
                        actionButton = new ActionButton(this.items[i], parentContainerStyle);
                        actionButton.onClick = function (ab) { _this.actionClicked(ab); };
                        this.buttons.push(actionButton);
                    }
                    actionButton.render(this._owner.hostConfig.actions.actionAlignment);
                    buttonStrip.appendChild(actionButton.action.renderedElement);
                    this._renderedActionCount++;
                    if (this._renderedActionCount >= this._owner.hostConfig.actions.maxActions || i == this.items.length - 1) {
                        break;
                    }
                    else if (this._owner.hostConfig.actions.buttonSpacing > 0) {
                        var spacer = document.createElement("div");
                        if (orientation === Enums.Orientation.Horizontal) {
                            spacer.style.flex = "0 0 auto";
                            spacer.style.width = this._owner.hostConfig.actions.buttonSpacing + "px";
                        }
                        else {
                            spacer.style.height = this._owner.hostConfig.actions.buttonSpacing + "px";
                        }
                        Utils.appendChild(buttonStrip, spacer);
                    }
                }
            }
            var buttonStripContainer = document.createElement("div");
            buttonStripContainer.style.overflow = "hidden";
            buttonStripContainer.appendChild(buttonStrip);
            Utils.appendChild(element, buttonStripContainer);
        }
        Utils.appendChild(element, this._actionCardContainer);
        for (var i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].state == ActionButtonState.Expanded) {
                this.expandShowCardAction(this.buttons[i].action, false);
                break;
            }
        }
        return this._renderedActionCount > 0 ? element : null;
    };
    ActionCollection.prototype.addAction = function (action) {
        if (!action) {
            throw new Error("The action parameter cannot be null.");
        }
        if ((!action.parent || action.parent === this._owner) && this.items.indexOf(action) < 0) {
            this.items.push(action);
            if (!action.parent) {
                action.setParent(this._owner);
            }
            invokeSetCollection(action, this);
        }
        else {
            throw new Error("The action already belongs to another element.");
        }
    };
    ActionCollection.prototype.removeAction = function (action) {
        if (this.expandedAction && this._expandedAction == action) {
            this.collapseExpandedAction();
        }
        var actionIndex = this.items.indexOf(action);
        if (actionIndex >= 0) {
            this.items.splice(actionIndex, 1);
            action.setParent(null);
            invokeSetCollection(action, null);
            for (var i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].action == action) {
                    this.buttons.splice(i, 1);
                    break;
                }
            }
            return true;
        }
        return false;
    };
    ActionCollection.prototype.clear = function () {
        this.items = [];
        this.buttons = [];
        this._expandedAction = null;
        this._renderedActionCount = 0;
    };
    ActionCollection.prototype.getAllInputs = function () {
        var result = [];
        for (var i = 0; i < this.items.length; i++) {
            var action = this.items[i];
            result = result.concat(action.getAllInputs());
        }
        return result;
    };
    ActionCollection.prototype.getResourceInformation = function () {
        var result = [];
        for (var i = 0; i < this.items.length; i++) {
            result = result.concat(this.items[i].getResourceInformation());
        }
        return result;
    };
    Object.defineProperty(ActionCollection.prototype, "renderedActionCount", {
        get: function () {
            return this._renderedActionCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionCollection.prototype, "expandedAction", {
        get: function () {
            return this._expandedAction;
        },
        enumerable: true,
        configurable: true
    });
    return ActionCollection;
}());
var ActionSet = /** @class */ (function (_super) {
    __extends(ActionSet, _super);
    function ActionSet() {
        var _this = _super.call(this) || this;
        _this.orientation = null;
        _this._actionCollection = new ActionCollection(_this);
        return _this;
    }
    ActionSet.prototype.internalRender = function () {
        return this._actionCollection.render(this.orientation ? this.orientation : this.hostConfig.actions.actionsOrientation, this.isDesignMode());
    };
    ActionSet.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setEnumProperty(Enums.Orientation, result, "orientation", this.orientation);
        Utils.setProperty(result, "actions", this._actionCollection.toJSON());
        return result;
    };
    ActionSet.prototype.isBleeding = function () {
        return this._actionCollection.expandedAction ? true : false;
    };
    ActionSet.prototype.getJsonTypeName = function () {
        return "ActionSet";
    };
    ActionSet.prototype.getActionCount = function () {
        return this._actionCollection.items.length;
    };
    ActionSet.prototype.getActionAt = function (index) {
        if (index >= 0 && index < this.getActionCount()) {
            return this._actionCollection.items[index];
        }
        else {
            _super.prototype.getActionAt.call(this, index);
        }
    };
    ActionSet.prototype.validate = function () {
        return this._actionCollection.validate();
    };
    ActionSet.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        var jsonOrientation = json["orientation"];
        if (jsonOrientation) {
            this.orientation = Utils.getEnumValueOrDefault(Enums.Orientation, jsonOrientation, Enums.Orientation.Horizontal);
        }
        this._actionCollection.parse(json["actions"], errors);
    };
    ActionSet.prototype.addAction = function (action) {
        this._actionCollection.addAction(action);
    };
    ActionSet.prototype.getAllInputs = function () {
        return this._actionCollection.getAllInputs();
    };
    ActionSet.prototype.getResourceInformation = function () {
        return this._actionCollection.getResourceInformation();
    };
    ActionSet.prototype.renderSpeech = function () {
        // TODO: What's the right thing to do here?
        return "";
    };
    Object.defineProperty(ActionSet.prototype, "isInteractive", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return ActionSet;
}(CardElement));
exports.ActionSet = ActionSet;
var BackgroundImage = /** @class */ (function () {
    function BackgroundImage() {
        this.mode = Enums.BackgroundImageMode.Stretch;
        this.horizontalAlignment = Enums.HorizontalAlignment.Left;
        this.verticalAlignment = Enums.VerticalAlignment.Top;
    }
    BackgroundImage.prototype.parse = function (json, errors) {
        this.url = json["url"];
        this.mode = Utils.getEnumValueOrDefault(Enums.BackgroundImageMode, json["mode"], this.mode);
        this.horizontalAlignment = Utils.getEnumValueOrDefault(Enums.HorizontalAlignment, json["horizontalAlignment"], this.horizontalAlignment);
        this.verticalAlignment = Utils.getEnumValueOrDefault(Enums.VerticalAlignment, json["verticalAlignment"], this.verticalAlignment);
    };
    BackgroundImage.prototype.apply = function (element) {
        if (this.url) {
            element.style.backgroundImage = "url('" + this.url + "')";
            switch (this.mode) {
                case Enums.BackgroundImageMode.Repeat:
                    element.style.backgroundRepeat = "repeat";
                    break;
                case Enums.BackgroundImageMode.RepeatHorizontally:
                    element.style.backgroundRepeat = "repeat-x";
                    break;
                case Enums.BackgroundImageMode.RepeatVertically:
                    element.style.backgroundRepeat = "repeat-y";
                    break;
                case Enums.BackgroundImageMode.Stretch:
                default:
                    element.style.backgroundRepeat = "no-repeat";
                    element.style.backgroundSize = "cover";
                    break;
            }
            switch (this.horizontalAlignment) {
                case Enums.HorizontalAlignment.Center:
                    element.style.backgroundPositionX = "center";
                    break;
                case Enums.HorizontalAlignment.Right:
                    element.style.backgroundPositionX = "right";
                    break;
            }
            switch (this.verticalAlignment) {
                case Enums.VerticalAlignment.Center:
                    element.style.backgroundPositionY = "center";
                    break;
                case Enums.VerticalAlignment.Bottom:
                    element.style.backgroundPositionY = "bottom";
                    break;
            }
        }
    };
    return BackgroundImage;
}());
exports.BackgroundImage = BackgroundImage;
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._items = [];
        _this._renderedItems = [];
        _this._style = null;
        _this.verticalContentAlignment = Enums.VerticalAlignment.Top;
        _this.rtl = null;
        return _this;
    }
    Container.prototype.isElementAllowed = function (element, forbiddenElementTypes) {
        if (!this.hostConfig.supportsInteractivity && element.isInteractive) {
            return false;
        }
        if (forbiddenElementTypes) {
            for (var i = 0; i < forbiddenElementTypes.length; i++) {
                if (element.getJsonTypeName() === forbiddenElementTypes[i]) {
                    return false;
                }
            }
        }
        return true;
    };
    Container.prototype.insertItemAt = function (item, index, forceInsert) {
        if (!item.parent || forceInsert) {
            if (item.isStandalone) {
                if (index < 0 || index >= this._items.length) {
                    this._items.push(item);
                }
                else {
                    this._items.splice(index, 0, item);
                }
                item.setParent(this);
            }
            else {
                throw new Error("Elements of type " + item.getJsonTypeName() + " cannot be used as standalone elements.");
            }
        }
        else {
            throw new Error("The element already belongs to another container.");
        }
    };
    Object.defineProperty(Container.prototype, "hasExplicitStyle", {
        get: function () {
            return this._style != null;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.getItemsCollectionPropertyName = function () {
        return "items";
    };
    Container.prototype.isLastElementBleeding = function () {
        return this._renderedItems.length > 0 ? this._renderedItems[this._renderedItems.length - 1].isBleeding() : false;
    };
    Container.prototype.applyPadding = function () {
        if (!this.renderedElement) {
            return;
        }
        if (this.padding) {
            var physicalPadding = this.padding.toSpacingDefinition(this.hostConfig);
            this.renderedElement.style.paddingTop = physicalPadding.top + "px";
            this.renderedElement.style.paddingRight = physicalPadding.right + "px";
            this.renderedElement.style.paddingBottom = physicalPadding.bottom + "px";
            this.renderedElement.style.paddingLeft = physicalPadding.left + "px";
        }
        else if (this.hasBackground) {
            var physicalMargin = new SpacingDefinition();
            var physicalPadding = new SpacingDefinition();
            var useAutoPadding = (this.parent ? this.parent.canContentBleed() : false) && AdaptiveCard.useAutomaticContainerBleeding;
            if (useAutoPadding) {
                var effectivePadding = this.getNonZeroPadding();
                var effectiveMargin = new PaddingDefinition(effectivePadding.top, effectivePadding.right, effectivePadding.bottom, effectivePadding.left);
                if (!this.isAtTheVeryTop()) {
                    effectivePadding.top = Enums.Spacing.None;
                    effectiveMargin.top = Enums.Spacing.None;
                }
                if (!this.isAtTheVeryBottom()) {
                    effectivePadding.bottom = Enums.Spacing.None;
                    effectiveMargin.bottom = Enums.Spacing.None;
                }
                if (!this.isAtTheVeryLeft()) {
                    effectivePadding.left = Enums.Spacing.None;
                    effectiveMargin.left = Enums.Spacing.None;
                }
                if (!this.isAtTheVeryRight()) {
                    effectivePadding.right = Enums.Spacing.None;
                    effectiveMargin.right = Enums.Spacing.None;
                }
                if (effectivePadding.left != Enums.Spacing.None || effectivePadding.right != Enums.Spacing.None) {
                    if (effectivePadding.left == Enums.Spacing.None) {
                        effectivePadding.left = effectivePadding.right;
                    }
                    if (effectivePadding.right == Enums.Spacing.None) {
                        effectivePadding.right = effectivePadding.left;
                    }
                }
                if (effectivePadding.top != Enums.Spacing.None || effectivePadding.bottom != Enums.Spacing.None) {
                    if (effectivePadding.top == Enums.Spacing.None) {
                        effectivePadding.top = effectivePadding.bottom;
                    }
                    if (effectivePadding.bottom == Enums.Spacing.None) {
                        effectivePadding.bottom = effectivePadding.top;
                    }
                }
                if (effectivePadding.top != Enums.Spacing.None
                    || effectivePadding.right != Enums.Spacing.None
                    || effectivePadding.bottom != Enums.Spacing.None
                    || effectivePadding.left != Enums.Spacing.None) {
                    if (effectivePadding.top == Enums.Spacing.None) {
                        effectivePadding.top = Enums.Spacing.Default;
                    }
                    if (effectivePadding.right == Enums.Spacing.None) {
                        effectivePadding.right = Enums.Spacing.Default;
                    }
                    if (effectivePadding.bottom == Enums.Spacing.None) {
                        effectivePadding = Object.assign({}, effectivePadding, { bottom: Enums.Spacing.Default });
                    }
                    if (effectivePadding.left == Enums.Spacing.None) {
                        effectivePadding = Object.assign({}, effectivePadding, { left: Enums.Spacing.Default });
                    }
                }
                if (effectivePadding.top == Enums.Spacing.None &&
                    effectivePadding.right == Enums.Spacing.None &&
                    effectivePadding.bottom == Enums.Spacing.None &&
                    effectivePadding.left == Enums.Spacing.None) {
                    effectivePadding = new PaddingDefinition(Enums.Spacing.Padding, Enums.Spacing.Padding, Enums.Spacing.Padding, Enums.Spacing.Padding);
                }
                physicalMargin = effectiveMargin.toSpacingDefinition(this.hostConfig);
                physicalPadding = effectivePadding.toSpacingDefinition(this.hostConfig);
            }
            else {
                physicalPadding = new PaddingDefinition(Enums.Spacing.Padding, Enums.Spacing.Padding, Enums.Spacing.Padding, Enums.Spacing.Padding).toSpacingDefinition(this.hostConfig);
            }
            this.renderedElement.style.marginTop = "-" + physicalMargin.top + "px";
            this.renderedElement.style.marginRight = "-" + physicalMargin.right + "px";
            this.renderedElement.style.marginBottom = "-" + physicalMargin.bottom + "px";
            this.renderedElement.style.marginLeft = "-" + physicalMargin.left + "px";
            this.renderedElement.style.paddingTop = physicalPadding.top + "px";
            this.renderedElement.style.paddingRight = physicalPadding.right + "px";
            this.renderedElement.style.paddingBottom = physicalPadding.bottom + "px";
            this.renderedElement.style.paddingLeft = physicalPadding.left + "px";
            if (this.separatorElement) {
                if (this.separatorOrientation == Enums.Orientation.Horizontal) {
                    this.separatorElement.style.marginLeft = "-" + physicalMargin.left + "px";
                    this.separatorElement.style.marginRight = "-" + physicalMargin.right + "px";
                }
                else {
                    this.separatorElement.style.marginTop = "-" + physicalMargin.top + "px";
                    this.separatorElement.style.marginBottom = "-" + physicalMargin.bottom + "px";
                }
            }
        }
        if (this.isLastElementBleeding()) {
            this.renderedElement.style.paddingBottom = "0px";
        }
    };
    Container.prototype.internalRender = function () {
        var _this = this;
        this._renderedItems = [];
        // Cache hostConfig to avoid walking the parent hierarchy several times
        var hostConfig = this.hostConfig;
        var element = document.createElement("div");
        if (this.rtl != null && this.rtl) {
            element.dir = "rtl";
        }
        element.classList.add(hostConfig.makeCssClassName("ac-container"));
        element.style.display = "flex";
        element.style.flexDirection = "column";
        if (AdaptiveCard.useAdvancedCardBottomTruncation) {
            // Forces the container to be at least as tall as its content.
            //
            // Fixes a quirk in Chrome where, for nested flex elements, the
            // inner element's height would never exceed the outer element's
            // height. This caused overflow truncation to break -- containers
            // would always be measured as not overflowing, since their heights
            // were constrained by their parents as opposed to truly reflecting
            // the height of their content.
            //
            // See the "Browser Rendering Notes" section of this answer:
            // https://stackoverflow.com/questions/36247140/why-doesnt-flex-item-shrink-past-content-size
            element.style.minHeight = '-webkit-min-content';
        }
        switch (this.verticalContentAlignment) {
            case Enums.VerticalAlignment.Center:
                element.style.justifyContent = "center";
                break;
            case Enums.VerticalAlignment.Bottom:
                element.style.justifyContent = "flex-end";
                break;
            default:
                element.style.justifyContent = "flex-start";
                break;
        }
        if (this.hasBackground) {
            if (this.backgroundImage) {
                this.backgroundImage.apply(element);
            }
            var styleDefinition = this.hostConfig.containerStyles.getStyleByName(this.style, this.hostConfig.containerStyles.getStyleByName(this.defaultStyle));
            if (!Utils.isNullOrEmpty(styleDefinition.backgroundColor)) {
                element.style.backgroundColor = Utils.stringToCssColor(styleDefinition.backgroundColor);
            }
        }
        if (this.selectAction && hostConfig.supportsInteractivity) {
            element.classList.add(hostConfig.makeCssClassName("ac-selectable"));
            element.tabIndex = 0;
            element.setAttribute("role", "button");
            element.setAttribute("aria-label", this.selectAction.title);
            element.onclick = function (e) {
                if (_this.selectAction != null) {
                    _this.selectAction.execute();
                    e.cancelBubble = true;
                }
            };
            element.onkeypress = function (e) {
                if (_this.selectAction != null) {
                    // Enter or space pressed
                    if (e.keyCode == 13 || e.keyCode == 32) {
                        _this.selectAction.execute();
                    }
                }
            };
        }
        if (this._items.length > 0) {
            for (var i = 0; i < this._items.length; i++) {
                var renderedElement = this.isElementAllowed(this._items[i], this.getForbiddenElementTypes()) ? this._items[i].render() : null;
                if (renderedElement) {
                    if (this._renderedItems.length > 0 && this._items[i].separatorElement) {
                        this._items[i].separatorElement.style.flex = "0 0 auto";
                        Utils.appendChild(element, this._items[i].separatorElement);
                    }
                    Utils.appendChild(element, renderedElement);
                    this._renderedItems.push(this._items[i]);
                }
            }
        }
        else {
            if (this.isDesignMode()) {
                var placeholderElement = this.createPlaceholderElement();
                placeholderElement.style.width = "100%";
                placeholderElement.style.height = "100%";
                element.appendChild(placeholderElement);
            }
        }
        return element;
    };
    Container.prototype.truncateOverflow = function (maxHeight) {
        // Add 1 to account for rounding differences between browsers
        var boundary = this.renderedElement.offsetTop + maxHeight + 1;
        var handleElement = function (cardElement) {
            var elt = cardElement.renderedElement;
            if (elt) {
                switch (Utils.getFitStatus(elt, boundary)) {
                    case Enums.ContainerFitStatus.FullyInContainer:
                        var sizeChanged = cardElement['resetOverflow']();
                        // If the element's size changed after resetting content,
                        // we have to check if it still fits fully in the card
                        if (sizeChanged) {
                            handleElement(cardElement);
                        }
                        break;
                    case Enums.ContainerFitStatus.Overflowing:
                        var maxHeight_1 = boundary - elt.offsetTop;
                        cardElement['handleOverflow'](maxHeight_1);
                        break;
                    case Enums.ContainerFitStatus.FullyOutOfContainer:
                        cardElement['handleOverflow'](0);
                        break;
                }
            }
        };
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            handleElement(item);
        }
        return true;
    };
    Container.prototype.undoOverflowTruncation = function () {
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            item['resetOverflow']();
        }
    };
    Object.defineProperty(Container.prototype, "hasBackground", {
        get: function () {
            var parentContainer = this.getParentContainer();
            return this.backgroundImage != undefined || (this.hasExplicitStyle && (parentContainer ? parentContainer.style != this.style : false));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "defaultStyle", {
        get: function () {
            return Enums.ContainerStyle.Default;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "allowCustomStyle", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        if (this._selectAction) {
            Utils.setProperty(result, "selectAction", this._selectAction.toJSON());
        }
        if (this.backgroundImage) {
            Utils.setProperty(result, "backgroundImage", this.backgroundImage.url);
        }
        Utils.setProperty(result, "style", this.style, "default");
        Utils.setEnumProperty(Enums.VerticalAlignment, result, "verticalContentAlignment", this.verticalContentAlignment, Enums.VerticalAlignment.Top);
        if (this._items.length > 0) {
            var elements = [];
            for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
                var element = _a[_i];
                elements.push(element.toJSON());
            }
            Utils.setProperty(result, this.getItemsCollectionPropertyName(), elements);
        }
        return result;
    };
    Container.prototype.getItemCount = function () {
        return this._items.length;
    };
    Container.prototype.getItemAt = function (index) {
        return this._items[index];
    };
    Container.prototype.getJsonTypeName = function () {
        return "Container";
    };
    Container.prototype.isBleeding = function () {
        return this.isLastElementBleeding();
    };
    Container.prototype.isFirstElement = function (element) {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].isVisible) {
                return this._items[i] == element;
            }
        }
        return false;
    };
    Container.prototype.isLastElement = function (element) {
        for (var i = this._items.length - 1; i >= 0; i--) {
            if (this._items[i].isVisible) {
                return this._items[i] == element;
            }
        }
        return false;
    };
    Container.prototype.isRtl = function () {
        if (this.rtl != null) {
            return this.rtl;
        }
        else {
            var parentContainer = this.getParentContainer();
            return parentContainer ? parentContainer.isRtl() : false;
        }
    };
    Container.prototype.validate = function () {
        var result = [];
        if (this._style) {
            var styleDefinition = this.hostConfig.containerStyles.getStyleByName(this._style);
            if (!styleDefinition) {
                result.push({
                    error: Enums.ValidationError.InvalidPropertyValue,
                    message: "Unknown container style: " + this._style
                });
            }
        }
        for (var i = 0; i < this._items.length; i++) {
            if (!this.hostConfig.supportsInteractivity && this._items[i].isInteractive) {
                result.push({
                    error: Enums.ValidationError.InteractivityNotAllowed,
                    message: "Interactivity is not allowed."
                });
            }
            if (!this.isElementAllowed(this._items[i], this.getForbiddenElementTypes())) {
                result.push({
                    error: Enums.ValidationError.InteractivityNotAllowed,
                    message: "Elements of type " + this._items[i].getJsonTypeName() + " are not allowed in this container."
                });
            }
            result = result.concat(this._items[i].validate());
        }
        return result;
    };
    Container.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.setShouldFallback(false);
        this._items = [];
        this._renderedItems = [];
        var jsonBackgroundImage = json["backgroundImage"];
        if (jsonBackgroundImage) {
            this.backgroundImage = new BackgroundImage();
            if (typeof jsonBackgroundImage === "string") {
                this.backgroundImage.url = jsonBackgroundImage;
                this.backgroundImage.mode = Enums.BackgroundImageMode.Stretch;
            }
            else if (typeof jsonBackgroundImage === "object") {
                this.backgroundImage = new BackgroundImage();
                this.backgroundImage.parse(json["backgroundImage"], errors);
            }
        }
        this.verticalContentAlignment = Utils.getEnumValueOrDefault(Enums.VerticalAlignment, json["verticalContentAlignment"], this.verticalContentAlignment);
        this._style = json["style"];
        this.selectAction = createActionInstance(this, json["selectAction"], errors);
        if (json[this.getItemsCollectionPropertyName()] != null) {
            var items = json[this.getItemsCollectionPropertyName()];
            this.clear();
            for (var i = 0; i < items.length; i++) {
                var element = createElementInstance(this, items[i], errors);
                if (element) {
                    this.insertItemAt(element, -1, true);
                }
            }
        }
    };
    Container.prototype.indexOf = function (cardElement) {
        return this._items.indexOf(cardElement);
    };
    Container.prototype.addItem = function (item) {
        this.insertItemAt(item, -1, false);
    };
    Container.prototype.insertItemBefore = function (item, insertBefore) {
        this.insertItemAt(item, this._items.indexOf(insertBefore), false);
    };
    Container.prototype.insertItemAfter = function (item, insertAfter) {
        this.insertItemAt(item, this._items.indexOf(insertAfter) + 1, false);
    };
    Container.prototype.removeItem = function (item) {
        var itemIndex = this._items.indexOf(item);
        if (itemIndex >= 0) {
            this._items.splice(itemIndex, 1);
            item.setParent(null);
            this.updateLayout();
            return true;
        }
        return false;
    };
    Container.prototype.clear = function () {
        this._items = [];
    };
    Container.prototype.canContentBleed = function () {
        return this.hasBackground ? false : _super.prototype.canContentBleed.call(this);
    };
    Container.prototype.getAllInputs = function () {
        var result = [];
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            result = result.concat(item.getAllInputs());
        }
        return result;
    };
    Container.prototype.getResourceInformation = function () {
        var result = [];
        if (this.backgroundImage && !Utils.isNullOrEmpty(this.backgroundImage.url)) {
            result.push({ url: this.backgroundImage.url, mimeType: "image" });
        }
        for (var i = 0; i < this.getItemCount(); i++) {
            result = result.concat(this.getItemAt(i).getResourceInformation());
        }
        return result;
    };
    Container.prototype.getElementById = function (id) {
        var result = _super.prototype.getElementById.call(this, id);
        if (!result) {
            for (var i = 0; i < this._items.length; i++) {
                result = this._items[i].getElementById(id);
                if (result) {
                    break;
                }
            }
        }
        return result;
    };
    Container.prototype.getActionById = function (id) {
        var result = _super.prototype.getActionById.call(this, id);
        if (!result) {
            if (this.selectAction) {
                result = this.selectAction.getActionById(id);
            }
            if (!result) {
                for (var i = 0; i < this._items.length; i++) {
                    result = this._items[i].getActionById(id);
                    if (result) {
                        break;
                    }
                }
            }
        }
        return result;
    };
    Container.prototype.renderSpeech = function () {
        if (this.speak != null) {
            return this.speak;
        }
        // render each item
        var speak = null;
        if (this._items.length > 0) {
            speak = '';
            for (var i = 0; i < this._items.length; i++) {
                var result = this._items[i].renderSpeech();
                if (result) {
                    speak += result;
                }
            }
        }
        return speak;
    };
    Container.prototype.updateLayout = function (processChildren) {
        if (processChildren === void 0) { processChildren = true; }
        _super.prototype.updateLayout.call(this, processChildren);
        this.applyPadding();
        if (processChildren) {
            for (var i = 0; i < this._items.length; i++) {
                this._items[i].updateLayout();
            }
        }
    };
    Object.defineProperty(Container.prototype, "style", {
        get: function () {
            if (this.allowCustomStyle) {
                if (this._style && this.hostConfig.containerStyles.getStyleByName(this._style)) {
                    return this._style;
                }
                return null;
            }
            else {
                return this.defaultStyle;
            }
        },
        set: function (value) {
            this._style = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "padding", {
        get: function () {
            return this.getPadding();
        },
        set: function (value) {
            this.setPadding(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "selectAction", {
        get: function () {
            return this._selectAction;
        },
        set: function (value) {
            this._selectAction = value;
            if (this._selectAction) {
                this._selectAction.setParent(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Container;
}(CardElementContainer));
exports.Container = Container;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column(width) {
        if (width === void 0) { width = "auto"; }
        var _this = _super.call(this) || this;
        _this._computedWeight = 0;
        _this.width = "auto";
        _this.width = width;
        return _this;
    }
    Column.prototype.adjustRenderedElementSize = function (renderedElement) {
        if (this.isDesignMode()) {
            renderedElement.style.minWidth = "20px";
            renderedElement.style.minHeight = "20px";
        }
        else {
            renderedElement.style.minWidth = "0";
        }
        if (this.width === "auto") {
            renderedElement.style.flex = "0 1 auto";
        }
        else if (this.width === "stretch") {
            renderedElement.style.flex = "1 1 50px";
        }
        else {
            var sizeAndUnit = this.width;
            if (sizeAndUnit.unit == Enums.SizeUnit.Pixel) {
                renderedElement.style.flex = "0 0 auto";
                renderedElement.style.width = sizeAndUnit.physicalSize + "px";
            }
            else {
                renderedElement.style.flex = "1 1 " + (this._computedWeight > 0 ? this._computedWeight : sizeAndUnit.physicalSize) + "%";
            }
        }
    };
    Object.defineProperty(Column.prototype, "separatorOrientation", {
        get: function () {
            return Enums.Orientation.Vertical;
        },
        enumerable: true,
        configurable: true
    });
    Column.prototype.getJsonTypeName = function () {
        return "Column";
    };
    Column.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        if (this.width instanceof Utils.SizeAndUnit) {
            if (this.width.unit == Enums.SizeUnit.Pixel) {
                Utils.setProperty(result, "width", this.width.physicalSize + "px");
            }
            else {
                Utils.setProperty(result, "width", this.width.physicalSize);
            }
        }
        else {
            Utils.setProperty(result, "width", this.width);
        }
        return result;
    };
    Column.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        var jsonWidth = json["width"];
        if (jsonWidth === undefined) {
            jsonWidth = json["size"];
            if (jsonWidth !== undefined) {
                raiseParseError({
                    error: Enums.ValidationError.Deprecated,
                    message: "The \"Column.size\" property is deprecated and will be removed. Use the \"Column.width\" property instead."
                }, errors);
            }
        }
        var invalidWidth = false;
        try {
            this.width = Utils.SizeAndUnit.parse(jsonWidth);
        }
        catch (e) {
            if (typeof jsonWidth === "string" && (jsonWidth === "auto" || jsonWidth === "stretch")) {
                this.width = jsonWidth;
            }
            else {
                invalidWidth = true;
            }
        }
        if (invalidWidth) {
            raiseParseError({
                error: Enums.ValidationError.InvalidPropertyValue,
                message: "Invalid column width:" + jsonWidth + " - defaulting to \"auto\""
            }, errors);
        }
    };
    Object.defineProperty(Column.prototype, "hasVisibleSeparator", {
        get: function () {
            if (this.parent && this.parent instanceof ColumnSet) {
                return this.separatorElement && !this.parent.isLeftMostElement(this);
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isStandalone", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return Column;
}(Container));
exports.Column = Column;
var ColumnSet = /** @class */ (function (_super) {
    __extends(ColumnSet, _super);
    function ColumnSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._columns = [];
        return _this;
    }
    ColumnSet.prototype.applyPadding = function () {
        if (this.padding) {
            if (this.renderedElement) {
                var physicalPadding = this.padding.toSpacingDefinition(this.hostConfig);
                this.renderedElement.style.paddingTop = physicalPadding.top + "px";
                this.renderedElement.style.paddingRight = physicalPadding.right + "px";
                this.renderedElement.style.paddingBottom = physicalPadding.bottom + "px";
                this.renderedElement.style.paddingLeft = physicalPadding.left + "px";
            }
        }
    };
    ColumnSet.prototype.internalRender = function () {
        var _this = this;
        if (this._columns.length > 0) {
            // Cache hostConfig to avoid walking the parent hierarchy several times
            var hostConfig = this.hostConfig;
            var element = document.createElement("div");
            element.className = hostConfig.makeCssClassName("ac-columnSet");
            element.style.display = "flex";
            if (AdaptiveCard.useAdvancedCardBottomTruncation) {
                // See comment in Container.internalRender()
                element.style.minHeight = '-webkit-min-content';
            }
            if (this.selectAction && hostConfig.supportsInteractivity) {
                element.classList.add(hostConfig.makeCssClassName("ac-selectable"));
                element.onclick = function (e) {
                    _this.selectAction.execute();
                    e.cancelBubble = true;
                };
            }
            switch (this.horizontalAlignment) {
                case Enums.HorizontalAlignment.Center:
                    element.style.justifyContent = "center";
                    break;
                case Enums.HorizontalAlignment.Right:
                    element.style.justifyContent = "flex-end";
                    break;
                default:
                    element.style.justifyContent = "flex-start";
                    break;
            }
            var totalWeight = 0;
            for (var _i = 0, _a = this._columns; _i < _a.length; _i++) {
                var column = _a[_i];
                if (column.width instanceof Utils.SizeAndUnit && (column.width.unit == Enums.SizeUnit.Weight)) {
                    totalWeight += column.width.physicalSize;
                }
            }
            var renderedColumnCount = 0;
            for (var _b = 0, _c = this._columns; _b < _c.length; _b++) {
                var column = _c[_b];
                if (column.width instanceof Utils.SizeAndUnit && column.width.unit == Enums.SizeUnit.Weight && totalWeight > 0) {
                    var computedWeight = 100 / totalWeight * column.width.physicalSize;
                    // Best way to emulate "internal" access I know of
                    column["_computedWeight"] = computedWeight;
                }
                var renderedColumn = column.render();
                if (renderedColumn) {
                    if (renderedColumnCount > 0 && column.separatorElement) {
                        column.separatorElement.style.flex = "0 0 auto";
                        Utils.appendChild(element, column.separatorElement);
                    }
                    Utils.appendChild(element, renderedColumn);
                    renderedColumnCount++;
                }
            }
            return renderedColumnCount > 0 ? element : null;
        }
        else {
            return null;
        }
    };
    ColumnSet.prototype.truncateOverflow = function (maxHeight) {
        for (var _i = 0, _a = this._columns; _i < _a.length; _i++) {
            var column = _a[_i];
            column['handleOverflow'](maxHeight);
        }
        return true;
    };
    ColumnSet.prototype.undoOverflowTruncation = function () {
        for (var _i = 0, _a = this._columns; _i < _a.length; _i++) {
            var column = _a[_i];
            column['resetOverflow']();
        }
    };
    ColumnSet.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        if (this._selectAction) {
            Utils.setProperty(result, "selectAction", this.selectAction.toJSON());
        }
        if (this._columns.length > 0) {
            var columns = [];
            for (var _i = 0, _a = this._columns; _i < _a.length; _i++) {
                var column = _a[_i];
                columns.push(column.toJSON());
            }
            Utils.setProperty(result, "columns", columns);
        }
        return result;
    };
    ColumnSet.prototype.isFirstElement = function (element) {
        for (var i = 0; i < this._columns.length; i++) {
            if (this._columns[i].isVisible) {
                return this._columns[i] == element;
            }
        }
        return false;
    };
    ColumnSet.prototype.getCount = function () {
        return this._columns.length;
    };
    ColumnSet.prototype.getItemCount = function () {
        return this.getCount();
    };
    ColumnSet.prototype.getColumnAt = function (index) {
        return this._columns[index];
    };
    ColumnSet.prototype.getItemAt = function (index) {
        return this.getColumnAt(index);
    };
    ColumnSet.prototype.getJsonTypeName = function () {
        return "ColumnSet";
    };
    ColumnSet.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this.selectAction = createActionInstance(this, json["selectAction"], errors);
        if (json["columns"] != null) {
            var jsonColumns = json["columns"];
            this._columns = [];
            for (var i = 0; i < jsonColumns.length; i++) {
                var column = new Column();
                column.setParent(this);
                column.parse(jsonColumns[i], errors);
                this._columns.push(column);
            }
        }
    };
    ColumnSet.prototype.validate = function () {
        var result = [];
        var weightedColumns = 0;
        var stretchedColumns = 0;
        for (var i = 0; i < this._columns.length; i++) {
            if (typeof this._columns[i].width === "number") {
                weightedColumns++;
            }
            else if (this._columns[i].width === "stretch") {
                stretchedColumns++;
            }
            result = result.concat(this._columns[i].validate());
        }
        if (weightedColumns > 0 && stretchedColumns > 0) {
            result.push({
                error: Enums.ValidationError.Hint,
                message: "It is not recommended to use weighted and stretched columns in the same ColumnSet, because in such a situation stretched columns will always get the minimum amount of space."
            });
        }
        return result;
    };
    ColumnSet.prototype.updateLayout = function (processChildren) {
        if (processChildren === void 0) { processChildren = true; }
        _super.prototype.updateLayout.call(this, processChildren);
        this.applyPadding();
        if (processChildren) {
            for (var i = 0; i < this._columns.length; i++) {
                this._columns[i].updateLayout();
            }
        }
    };
    ColumnSet.prototype.addColumn = function (column) {
        if (!column.parent) {
            this._columns.push(column);
            column.setParent(this);
        }
        else {
            throw new Error("This column already belongs to another ColumnSet.");
        }
    };
    ColumnSet.prototype.removeItem = function (item) {
        if (item instanceof Column) {
            var itemIndex = this._columns.indexOf(item);
            if (itemIndex >= 0) {
                this._columns.splice(itemIndex, 1);
                item.setParent(null);
                this.updateLayout();
                return true;
            }
        }
        return false;
    };
    ColumnSet.prototype.indexOf = function (cardElement) {
        return cardElement instanceof Column ? this._columns.indexOf(cardElement) : -1;
    };
    ColumnSet.prototype.isLeftMostElement = function (element) {
        return this._columns.indexOf(element) == 0;
    };
    ColumnSet.prototype.isRightMostElement = function (element) {
        return this._columns.indexOf(element) == this._columns.length - 1;
    };
    ColumnSet.prototype.getAllInputs = function () {
        var result = [];
        for (var i = 0; i < this._columns.length; i++) {
            result = result.concat(this._columns[i].getAllInputs());
        }
        return result;
    };
    ColumnSet.prototype.getResourceInformation = function () {
        var result = [];
        for (var i = 0; i < this._columns.length; i++) {
            result = result.concat(this._columns[i].getResourceInformation());
        }
        return result;
    };
    ColumnSet.prototype.getElementById = function (id) {
        var result = _super.prototype.getElementById.call(this, id);
        if (!result) {
            for (var i = 0; i < this._columns.length; i++) {
                result = this._columns[i].getElementById(id);
                if (result) {
                    break;
                }
            }
        }
        return result;
    };
    ColumnSet.prototype.getActionById = function (id) {
        var result = null;
        for (var i = 0; i < this._columns.length; i++) {
            result = this._columns[i].getActionById(id);
            if (result) {
                break;
            }
        }
        return result;
    };
    ColumnSet.prototype.renderSpeech = function () {
        if (this.speak != null) {
            return this.speak;
        }
        // render each item
        var speak = '';
        if (this._columns.length > 0) {
            for (var i = 0; i < this._columns.length; i++) {
                speak += this._columns[i].renderSpeech();
            }
        }
        return speak;
    };
    Object.defineProperty(ColumnSet.prototype, "padding", {
        get: function () {
            return this.getPadding();
        },
        set: function (value) {
            this.setPadding(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnSet.prototype, "selectAction", {
        get: function () {
            return this._selectAction;
        },
        set: function (value) {
            this._selectAction = value;
            if (this._selectAction) {
                this._selectAction.setParent(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ColumnSet;
}(CardElementContainer));
exports.ColumnSet = ColumnSet;
function raiseImageLoadedEvent(image) {
    var card = image.getRootElement();
    var onImageLoadedHandler = (card && card.onImageLoaded) ? card.onImageLoaded : AdaptiveCard.onImageLoaded;
    if (onImageLoadedHandler) {
        onImageLoadedHandler(image);
    }
}
function raiseAnchorClickedEvent(element, anchor) {
    var card = element.getRootElement();
    var onAnchorClickedHandler = (card && card.onAnchorClicked) ? card.onAnchorClicked : AdaptiveCard.onAnchorClicked;
    return onAnchorClickedHandler != null ? onAnchorClickedHandler(element, anchor) : false;
}
function raiseExecuteActionEvent(action) {
    var card = action.parent.getRootElement();
    var onExecuteActionHandler = (card && card.onExecuteAction) ? card.onExecuteAction : AdaptiveCard.onExecuteAction;
    if (onExecuteActionHandler) {
        action.prepare(action.parent.getRootElement().getAllInputs());
        onExecuteActionHandler(action);
    }
}
function raiseInlineCardExpandedEvent(action, isExpanded) {
    var card = action.parent.getRootElement();
    var onInlineCardExpandedHandler = (card && card.onInlineCardExpanded) ? card.onInlineCardExpanded : AdaptiveCard.onInlineCardExpanded;
    if (onInlineCardExpandedHandler) {
        onInlineCardExpandedHandler(action, isExpanded);
    }
}
function raiseElementVisibilityChangedEvent(element, shouldUpdateLayout) {
    if (shouldUpdateLayout === void 0) { shouldUpdateLayout = true; }
    var rootElement = element.getRootElement();
    if (shouldUpdateLayout) {
        rootElement.updateLayout();
    }
    var card = rootElement;
    var onElementVisibilityChangedHandler = (card && card.onElementVisibilityChanged) ? card.onElementVisibilityChanged : AdaptiveCard.onElementVisibilityChanged;
    if (onElementVisibilityChangedHandler != null) {
        onElementVisibilityChangedHandler(element);
    }
}
function raiseParseElementEvent(element, json, errors) {
    var card = element.getRootElement();
    var onParseElementHandler = (card && card.onParseElement) ? card.onParseElement : AdaptiveCard.onParseElement;
    if (onParseElementHandler != null) {
        onParseElementHandler(element, json, errors);
    }
}
function raiseParseActionEvent(action, json, errors) {
    var card = action.parent ? action.parent.getRootElement() : null;
    var onParseActionHandler = (card && card.onParseAction) ? card.onParseAction : AdaptiveCard.onParseAction;
    if (onParseActionHandler != null) {
        onParseActionHandler(action, json, errors);
    }
}
function raiseParseError(error, errors) {
    if (errors) {
        errors.push(error);
    }
    if (AdaptiveCard.onParseError != null) {
        AdaptiveCard.onParseError(error);
    }
}
var ContainerWithActions = /** @class */ (function (_super) {
    __extends(ContainerWithActions, _super);
    function ContainerWithActions() {
        var _this = _super.call(this) || this;
        _this._actionCollection = new ActionCollection(_this);
        return _this;
    }
    Object.defineProperty(ContainerWithActions.prototype, "renderIfEmpty", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ContainerWithActions.prototype.internalRender = function () {
        var element = _super.prototype.internalRender.call(this);
        var renderedActions = this._actionCollection.render(this.hostConfig.actions.actionsOrientation, false);
        if (renderedActions) {
            Utils.appendChild(element, Utils.renderSeparation({
                spacing: this.hostConfig.getEffectiveSpacing(this.hostConfig.actions.spacing),
                lineThickness: null,
                lineColor: null
            }, Enums.Orientation.Horizontal));
            Utils.appendChild(element, renderedActions);
        }
        if (this.renderIfEmpty) {
            return element;
        }
        else {
            return element.children.length > 0 ? element : null;
        }
    };
    ContainerWithActions.prototype.isLastElementBleeding = function () {
        if (this._actionCollection.renderedActionCount == 0) {
            return _super.prototype.isLastElementBleeding.call(this) ? !this.isDesignMode() : false;
        }
        else {
            if (this._actionCollection.items.length == 1) {
                return this._actionCollection.expandedAction != null && !this.hostConfig.actions.preExpandSingleShowCardAction;
            }
            else {
                return this._actionCollection.expandedAction != null;
            }
        }
    };
    ContainerWithActions.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "actions", this._actionCollection.toJSON());
        return result;
    };
    ContainerWithActions.prototype.getActionCount = function () {
        return this._actionCollection.items.length;
    };
    ContainerWithActions.prototype.getActionAt = function (index) {
        if (index >= 0 && index < this.getActionCount()) {
            return this._actionCollection.items[index];
        }
        else {
            _super.prototype.getActionAt.call(this, index);
        }
    };
    ContainerWithActions.prototype.getActionById = function (id) {
        var result = this._actionCollection.getActionById(id);
        return result ? result : _super.prototype.getActionById.call(this, id);
    };
    ContainerWithActions.prototype.parse = function (json, errors) {
        _super.prototype.parse.call(this, json, errors);
        this._actionCollection.parse(json["actions"]);
    };
    ContainerWithActions.prototype.validate = function () {
        var result = _super.prototype.validate.call(this);
        if (this._actionCollection) {
            result = result.concat(this._actionCollection.validate());
        }
        return result;
    };
    ContainerWithActions.prototype.isLastElement = function (element) {
        return _super.prototype.isLastElement.call(this, element) && this._actionCollection.items.length == 0;
    };
    ContainerWithActions.prototype.addAction = function (action) {
        this._actionCollection.addAction(action);
    };
    ContainerWithActions.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this._actionCollection.clear();
    };
    ContainerWithActions.prototype.getAllInputs = function () {
        return _super.prototype.getAllInputs.call(this).concat(this._actionCollection.getAllInputs());
    };
    ContainerWithActions.prototype.getResourceInformation = function () {
        return _super.prototype.getResourceInformation.call(this).concat(this._actionCollection.getResourceInformation());
    };
    Object.defineProperty(ContainerWithActions.prototype, "isStandalone", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return ContainerWithActions;
}(Container));
exports.ContainerWithActions = ContainerWithActions;
var TypeRegistry = /** @class */ (function () {
    function TypeRegistry() {
        this._items = [];
        this.reset();
    }
    TypeRegistry.prototype.findTypeRegistration = function (typeName) {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].typeName === typeName) {
                return this._items[i];
            }
        }
        return null;
    };
    TypeRegistry.prototype.clear = function () {
        this._items = [];
    };
    TypeRegistry.prototype.registerType = function (typeName, createInstance) {
        var registrationInfo = this.findTypeRegistration(typeName);
        if (registrationInfo != null) {
            registrationInfo.createInstance = createInstance;
        }
        else {
            registrationInfo = {
                typeName: typeName,
                createInstance: createInstance
            };
            this._items.push(registrationInfo);
        }
    };
    TypeRegistry.prototype.unregisterType = function (typeName) {
        for (var i = 0; i < this._items.length; i++) {
            if (this._items[i].typeName === typeName) {
                this._items.splice(i, 1);
                return;
            }
        }
    };
    TypeRegistry.prototype.createInstance = function (typeName) {
        var registrationInfo = this.findTypeRegistration(typeName);
        return registrationInfo ? registrationInfo.createInstance() : null;
    };
    TypeRegistry.prototype.getItemCount = function () {
        return this._items.length;
    };
    TypeRegistry.prototype.getItemAt = function (index) {
        return this._items[index];
    };
    return TypeRegistry;
}());
exports.TypeRegistry = TypeRegistry;
var ElementTypeRegistry = /** @class */ (function (_super) {
    __extends(ElementTypeRegistry, _super);
    function ElementTypeRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementTypeRegistry.prototype.reset = function () {
        this.clear();
        this.registerType("Container", function () { return new Container(); });
        this.registerType("TextBlock", function () { return new TextBlock(); });
        this.registerType("Image", function () { return new Image(); });
        this.registerType("ImageSet", function () { return new ImageSet(); });
        this.registerType("Media", function () { return new Media(); });
        this.registerType("FactSet", function () { return new FactSet(); });
        this.registerType("ColumnSet", function () { return new ColumnSet(); });
        this.registerType("Input.Text", function () { return new TextInput(); });
        this.registerType("Input.Date", function () { return new DateInput(); });
        this.registerType("Input.Time", function () { return new TimeInput(); });
        this.registerType("Input.Number", function () { return new NumberInput(); });
        this.registerType("Input.ChoiceSet", function () { return new ChoiceSetInput(); });
        this.registerType("Input.Toggle", function () { return new ToggleInput(); });
    };
    return ElementTypeRegistry;
}(TypeRegistry));
exports.ElementTypeRegistry = ElementTypeRegistry;
var ActionTypeRegistry = /** @class */ (function (_super) {
    __extends(ActionTypeRegistry, _super);
    function ActionTypeRegistry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionTypeRegistry.prototype.reset = function () {
        this.clear();
        this.registerType("Action.OpenUrl", function () { return new OpenUrlAction(); });
        this.registerType("Action.Submit", function () { return new SubmitAction(); });
        this.registerType("Action.ShowCard", function () { return new ShowCardAction(); });
    };
    return ActionTypeRegistry;
}(TypeRegistry));
exports.ActionTypeRegistry = ActionTypeRegistry;
var AdaptiveCard = /** @class */ (function (_super) {
    __extends(AdaptiveCard, _super);
    function AdaptiveCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._cardTypeName = "AdaptiveCard";
        _this._fallbackCard = null;
        _this.onAnchorClicked = null;
        _this.onExecuteAction = null;
        _this.onElementVisibilityChanged = null;
        _this.onImageLoaded = null;
        _this.onInlineCardExpanded = null;
        _this.onParseElement = null;
        _this.onParseAction = null;
        _this.version = new HostConfig.Version(1, 0);
        _this.designMode = false;
        return _this;
    }
    Object.defineProperty(AdaptiveCard, "processMarkdown", {
        get: function () {
            throw new Error("The processMarkdown event has been removed. Please update your code and set onProcessMarkdown instead.");
        },
        set: function (value) {
            throw new Error("The processMarkdown event has been removed. Please update your code and set onProcessMarkdown instead.");
        },
        enumerable: true,
        configurable: true
    });
    AdaptiveCard.applyMarkdown = function (text) {
        var result = {
            didProcess: false
        };
        if (AdaptiveCard.onProcessMarkdown) {
            AdaptiveCard.onProcessMarkdown(text, result);
        }
        else if (window["markdownit"]) {
            // Check for markdownit
            result.outputHtml = window["markdownit"]().render(text);
            result.didProcess = true;
        }
        else {
            console.warn("Markdown processing isn't enabled. Please see https://www.npmjs.com/package/adaptivecards#supporting-markdown");
        }
        return result;
    };
    AdaptiveCard.prototype.isVersionSupported = function () {
        if (this.bypassVersionCheck) {
            return true;
        }
        else {
            var unsupportedVersion = !this.version ||
                !this.version.isValid ||
                (AdaptiveCard.currentVersion.major < this.version.major) ||
                (AdaptiveCard.currentVersion.major == this.version.major && AdaptiveCard.currentVersion.minor < this.version.minor);
            return !unsupportedVersion;
        }
    };
    Object.defineProperty(AdaptiveCard.prototype, "renderIfEmpty", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    AdaptiveCard.prototype.getItemsCollectionPropertyName = function () {
        return "body";
    };
    AdaptiveCard.prototype.applyPadding = function () {
        if (!this.renderedElement) {
            return;
        }
        var effectivePadding = this.padding ? this.padding.toSpacingDefinition(this.hostConfig) : this.internalPadding.toSpacingDefinition(this.hostConfig);
        this.renderedElement.style.paddingTop = effectivePadding.top + "px";
        this.renderedElement.style.paddingRight = effectivePadding.right + "px";
        this.renderedElement.style.paddingBottom = effectivePadding.bottom + "px";
        this.renderedElement.style.paddingLeft = effectivePadding.left + "px";
        if (this.isLastElementBleeding()) {
            this.renderedElement.style.paddingBottom = "0px";
        }
    };
    AdaptiveCard.prototype.internalRender = function () {
        var renderedElement = _super.prototype.internalRender.call(this);
        if (AdaptiveCard.useAdvancedCardBottomTruncation) {
            // Unlike containers, the root card element should be allowed to
            // be shorter than its content (otherwise the overflow truncation
            // logic would never get triggered)
            renderedElement.style.minHeight = null;
        }
        return renderedElement;
    };
    Object.defineProperty(AdaptiveCard.prototype, "bypassVersionCheck", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdaptiveCard.prototype, "defaultPadding", {
        get: function () {
            return new PaddingDefinition(Enums.Spacing.Padding, Enums.Spacing.Padding, Enums.Spacing.Padding, Enums.Spacing.Padding);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdaptiveCard.prototype, "allowCustomPadding", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdaptiveCard.prototype, "allowCustomStyle", {
        get: function () {
            return this.hostConfig.adaptiveCard && this.hostConfig.adaptiveCard.allowCustomStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdaptiveCard.prototype, "hasBackground", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    AdaptiveCard.prototype.getJsonTypeName = function () {
        return "AdaptiveCard";
    };
    AdaptiveCard.prototype.toJSON = function () {
        var result = _super.prototype.toJSON.call(this);
        Utils.setProperty(result, "$schema", "http://adaptivecards.io/schemas/adaptive-card.json");
        if (!this.bypassVersionCheck && this.version) {
            Utils.setProperty(result, "version", this.version.toString());
        }
        Utils.setProperty(result, "fallbackText", this.fallbackText);
        Utils.setProperty(result, "lang", this.lang);
        Utils.setProperty(result, "speak", this.speak);
        return result;
    };
    AdaptiveCard.prototype.validate = function () {
        var result = [];
        if (this._cardTypeName != "AdaptiveCard") {
            result.push({
                error: Enums.ValidationError.MissingCardType,
                message: "Invalid or missing card type. Make sure the card's type property is set to \"AdaptiveCard\"."
            });
        }
        if (!this.bypassVersionCheck && !this.version) {
            result.push({
                error: Enums.ValidationError.PropertyCantBeNull,
                message: "The version property must be specified."
            });
        }
        else if (!this.isVersionSupported()) {
            result.push({
                error: Enums.ValidationError.UnsupportedCardVersion,
                message: "The specified card version (" + this.version + ") is not supported. The maximum supported card version is " + AdaptiveCard.currentVersion
            });
        }
        return result.concat(_super.prototype.validate.call(this));
    };
    AdaptiveCard.prototype.parse = function (json, errors) {
        this._fallbackCard = null;
        this._cardTypeName = json["type"];
        var langId = json["lang"];
        if (langId && typeof langId === "string") {
            try {
                this.lang = langId;
            }
            catch (e) {
                raiseParseError({
                    error: Enums.ValidationError.InvalidPropertyValue,
                    message: e.message
                }, errors);
            }
        }
        this.version = HostConfig.Version.parse(json["version"], errors);
        this.fallbackText = json["fallbackText"];
        var fallbackElement = createElementInstance(null, json["fallback"], errors);
        if (fallbackElement) {
            this._fallbackCard = new AdaptiveCard();
            this._fallbackCard.addItem(fallbackElement);
        }
        _super.prototype.parse.call(this, json, errors);
    };
    AdaptiveCard.prototype.render = function (target) {
        var fallback = false;
        var renderedCard;
        if (this.shouldFallback()) {
            if (this._fallbackCard) {
                this._fallbackCard.hostConfig = this.hostConfig;
                renderedCard = this._fallbackCard.render();
            }
            else {
                var errorText = !Utils.isNullOrEmpty(this.fallbackText) ? this.fallbackText : "The card could not be rendered. It is either malformed or uses features not supported by this host.";
                try {
                    var fallbackCard = new AdaptiveCard();
                    fallbackCard.hostConfig = this.hostConfig;
                    fallbackCard.parse({
                        type: "AdaptiveCard",
                        version: "1.0",
                        body: [
                            {
                                type: "TextBlock",
                                text: errorText,
                                wrap: true
                            }
                        ]
                    });
                    renderedCard = fallbackCard.render();
                }
                catch (e) {
                    renderedCard = document.createElement("div");
                    renderedCard.innerHTML = errorText;
                }
            }
        }
        else {
            renderedCard = _super.prototype.render.call(this);
            if (renderedCard) {
                renderedCard.tabIndex = 0;
                if (!Utils.isNullOrEmpty(this.speak)) {
                    renderedCard.setAttribute("aria-label", this.speak);
                }
            }
        }
        if (target) {
            target.appendChild(renderedCard);
            this.updateLayout();
        }
        return renderedCard;
    };
    AdaptiveCard.prototype.updateLayout = function (processChildren) {
        if (processChildren === void 0) { processChildren = true; }
        _super.prototype.updateLayout.call(this, processChildren);
        if (AdaptiveCard.useAdvancedCardBottomTruncation && this.isRendered()) {
            var card = this.renderedElement;
            var padding = this.hostConfig.getEffectiveSpacing(Enums.Spacing.Default);
            this['handleOverflow'](card.offsetHeight - padding);
        }
    };
    AdaptiveCard.prototype.canContentBleed = function () {
        return true;
    };
    AdaptiveCard.prototype.shouldFallback = function () {
        return _super.prototype.shouldFallback.call(this) || !this.isVersionSupported();
    };
    Object.defineProperty(AdaptiveCard.prototype, "hasVisibleSeparator", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    AdaptiveCard.currentVersion = new HostConfig.Version(1, 1);
    AdaptiveCard.useAutomaticContainerBleeding = false;
    AdaptiveCard.useAdvancedTextBlockTruncation = true;
    AdaptiveCard.useAdvancedCardBottomTruncation = false;
    AdaptiveCard.useMarkdownInRadioButtonAndCheckbox = true;
    AdaptiveCard.allowMarkForTextHighlighting = false;
    AdaptiveCard.elementTypeRegistry = new ElementTypeRegistry();
    AdaptiveCard.actionTypeRegistry = new ActionTypeRegistry();
    AdaptiveCard.onAnchorClicked = null;
    AdaptiveCard.onExecuteAction = null;
    AdaptiveCard.onElementVisibilityChanged = null;
    AdaptiveCard.onImageLoaded = null;
    AdaptiveCard.onInlineCardExpanded = null;
    AdaptiveCard.onParseElement = null;
    AdaptiveCard.onParseAction = null;
    AdaptiveCard.onParseError = null;
    AdaptiveCard.onProcessMarkdown = null;
    return AdaptiveCard;
}(ContainerWithActions));
exports.AdaptiveCard = AdaptiveCard;
var InlineAdaptiveCard = /** @class */ (function (_super) {
    __extends(InlineAdaptiveCard, _super);
    function InlineAdaptiveCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.suppressStyle = false;
        return _this;
    }
    Object.defineProperty(InlineAdaptiveCard.prototype, "bypassVersionCheck", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InlineAdaptiveCard.prototype, "defaultPadding", {
        get: function () {
            return new PaddingDefinition(this.suppressStyle ? Enums.Spacing.None : Enums.Spacing.Padding, Enums.Spacing.Padding, this.suppressStyle ? Enums.Spacing.None : Enums.Spacing.Padding, Enums.Spacing.Padding);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InlineAdaptiveCard.prototype, "defaultStyle", {
        get: function () {
            if (this.suppressStyle) {
                return Enums.ContainerStyle.Default;
            }
            else {
                return this.hostConfig.actions.showCard.style ? this.hostConfig.actions.showCard.style : Enums.ContainerStyle.Emphasis;
            }
        },
        enumerable: true,
        configurable: true
    });
    InlineAdaptiveCard.prototype.render = function (target) {
        var renderedCard = _super.prototype.render.call(this, target);
        renderedCard.setAttribute("aria-live", "polite");
        renderedCard.removeAttribute("tabindex");
        return renderedCard;
    };
    InlineAdaptiveCard.prototype.getForbiddenActionTypes = function () {
        return [ShowCardAction];
    };
    return InlineAdaptiveCard;
}(AdaptiveCard));
var defaultHostConfig = new HostConfig.HostConfig({
    supportsInteractivity: true,
    fontFamily: "Segoe UI",
    spacing: {
        small: 10,
        default: 20,
        medium: 30,
        large: 40,
        extraLarge: 50,
        padding: 20
    },
    separator: {
        lineThickness: 1,
        lineColor: "#EEEEEE"
    },
    fontSizes: {
        small: 12,
        default: 14,
        medium: 17,
        large: 21,
        extraLarge: 26
    },
    fontWeights: {
        lighter: 200,
        default: 400,
        bolder: 600
    },
    imageSizes: {
        small: 40,
        medium: 80,
        large: 160
    },
    containerStyles: {
        default: {
            backgroundColor: "#FFFFFF",
            foregroundColors: {
                default: {
                    default: "#333333",
                    subtle: "#EE333333"
                },
                dark: {
                    default: "#000000",
                    subtle: "#66000000"
                },
                light: {
                    default: "#FFFFFF",
                    subtle: "#33000000"
                },
                accent: {
                    default: "#2E89FC",
                    subtle: "#882E89FC"
                },
                attention: {
                    default: "#cc3300",
                    subtle: "#DDcc3300"
                },
                good: {
                    default: "#54a254",
                    subtle: "#DD54a254"
                },
                warning: {
                    default: "#e69500",
                    subtle: "#DDe69500"
                }
            }
        },
        emphasis: {
            backgroundColor: "#08000000",
            foregroundColors: {
                default: {
                    default: "#333333",
                    subtle: "#EE333333"
                },
                dark: {
                    default: "#000000",
                    subtle: "#66000000"
                },
                light: {
                    default: "#FFFFFF",
                    subtle: "#33000000"
                },
                accent: {
                    default: "#2E89FC",
                    subtle: "#882E89FC"
                },
                attention: {
                    default: "#cc3300",
                    subtle: "#DDcc3300"
                },
                good: {
                    default: "#54a254",
                    subtle: "#DD54a254"
                },
                warning: {
                    default: "#e69500",
                    subtle: "#DDe69500"
                }
            }
        }
    },
    actions: {
        maxActions: 5,
        spacing: Enums.Spacing.Default,
        buttonSpacing: 10,
        showCard: {
            actionMode: Enums.ShowCardActionMode.Inline,
            inlineTopMargin: 16
        },
        actionsOrientation: Enums.Orientation.Horizontal,
        actionAlignment: Enums.ActionAlignment.Left
    },
    adaptiveCard: {
        allowCustomStyle: false
    },
    imageSet: {
        imageSize: Enums.Size.Medium,
        maxImageHeight: 100
    },
    factSet: {
        title: {
            color: Enums.TextColor.Default,
            size: Enums.TextSize.Default,
            isSubtle: false,
            weight: Enums.TextWeight.Bolder,
            wrap: true,
            maxWidth: 150,
        },
        value: {
            color: Enums.TextColor.Default,
            size: Enums.TextSize.Default,
            isSubtle: false,
            weight: Enums.TextWeight.Default,
            wrap: true,
        },
        spacing: 10
    }
});


/***/ }),

/***/ "./src/enums.ts":
/*!**********************!*\
  !*** ./src/enums.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Size;
(function (Size) {
    Size[Size["Auto"] = 0] = "Auto";
    Size[Size["Stretch"] = 1] = "Stretch";
    Size[Size["Small"] = 2] = "Small";
    Size[Size["Medium"] = 3] = "Medium";
    Size[Size["Large"] = 4] = "Large";
})(Size = exports.Size || (exports.Size = {}));
var SizeUnit;
(function (SizeUnit) {
    SizeUnit[SizeUnit["Weight"] = 0] = "Weight";
    SizeUnit[SizeUnit["Pixel"] = 1] = "Pixel";
})(SizeUnit = exports.SizeUnit || (exports.SizeUnit = {}));
var TextSize;
(function (TextSize) {
    TextSize[TextSize["Small"] = 0] = "Small";
    TextSize[TextSize["Default"] = 1] = "Default";
    TextSize[TextSize["Medium"] = 2] = "Medium";
    TextSize[TextSize["Large"] = 3] = "Large";
    TextSize[TextSize["ExtraLarge"] = 4] = "ExtraLarge";
})(TextSize = exports.TextSize || (exports.TextSize = {}));
var Spacing;
(function (Spacing) {
    Spacing[Spacing["None"] = 0] = "None";
    Spacing[Spacing["Small"] = 1] = "Small";
    Spacing[Spacing["Default"] = 2] = "Default";
    Spacing[Spacing["Medium"] = 3] = "Medium";
    Spacing[Spacing["Large"] = 4] = "Large";
    Spacing[Spacing["ExtraLarge"] = 5] = "ExtraLarge";
    Spacing[Spacing["Padding"] = 6] = "Padding";
})(Spacing = exports.Spacing || (exports.Spacing = {}));
var TextWeight;
(function (TextWeight) {
    TextWeight[TextWeight["Lighter"] = 0] = "Lighter";
    TextWeight[TextWeight["Default"] = 1] = "Default";
    TextWeight[TextWeight["Bolder"] = 2] = "Bolder";
})(TextWeight = exports.TextWeight || (exports.TextWeight = {}));
var TextColor;
(function (TextColor) {
    TextColor[TextColor["Default"] = 0] = "Default";
    TextColor[TextColor["Dark"] = 1] = "Dark";
    TextColor[TextColor["Light"] = 2] = "Light";
    TextColor[TextColor["Accent"] = 3] = "Accent";
    TextColor[TextColor["Good"] = 4] = "Good";
    TextColor[TextColor["Warning"] = 5] = "Warning";
    TextColor[TextColor["Attention"] = 6] = "Attention";
})(TextColor = exports.TextColor || (exports.TextColor = {}));
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
    HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
    HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
})(HorizontalAlignment = exports.HorizontalAlignment || (exports.HorizontalAlignment = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
    VerticalAlignment[VerticalAlignment["Center"] = 1] = "Center";
    VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
var ActionAlignment;
(function (ActionAlignment) {
    ActionAlignment[ActionAlignment["Left"] = 0] = "Left";
    ActionAlignment[ActionAlignment["Center"] = 1] = "Center";
    ActionAlignment[ActionAlignment["Right"] = 2] = "Right";
    ActionAlignment[ActionAlignment["Stretch"] = 3] = "Stretch";
})(ActionAlignment = exports.ActionAlignment || (exports.ActionAlignment = {}));
var ImageStyle;
(function (ImageStyle) {
    ImageStyle[ImageStyle["Default"] = 0] = "Default";
    ImageStyle[ImageStyle["Person"] = 1] = "Person";
})(ImageStyle = exports.ImageStyle || (exports.ImageStyle = {}));
var ShowCardActionMode;
(function (ShowCardActionMode) {
    ShowCardActionMode[ShowCardActionMode["Inline"] = 0] = "Inline";
    ShowCardActionMode[ShowCardActionMode["Popup"] = 1] = "Popup";
})(ShowCardActionMode = exports.ShowCardActionMode || (exports.ShowCardActionMode = {}));
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
var BackgroundImageMode;
(function (BackgroundImageMode) {
    BackgroundImageMode[BackgroundImageMode["Stretch"] = 0] = "Stretch";
    BackgroundImageMode[BackgroundImageMode["RepeatHorizontally"] = 1] = "RepeatHorizontally";
    BackgroundImageMode[BackgroundImageMode["RepeatVertically"] = 2] = "RepeatVertically";
    BackgroundImageMode[BackgroundImageMode["Repeat"] = 3] = "Repeat";
})(BackgroundImageMode = exports.BackgroundImageMode || (exports.BackgroundImageMode = {}));
var ActionIconPlacement;
(function (ActionIconPlacement) {
    ActionIconPlacement[ActionIconPlacement["LeftOfTitle"] = 0] = "LeftOfTitle";
    ActionIconPlacement[ActionIconPlacement["AboveTitle"] = 1] = "AboveTitle";
})(ActionIconPlacement = exports.ActionIconPlacement || (exports.ActionIconPlacement = {}));
var InputTextStyle;
(function (InputTextStyle) {
    InputTextStyle[InputTextStyle["Text"] = 0] = "Text";
    InputTextStyle[InputTextStyle["Tel"] = 1] = "Tel";
    InputTextStyle[InputTextStyle["Url"] = 2] = "Url";
    InputTextStyle[InputTextStyle["Email"] = 3] = "Email";
})(InputTextStyle = exports.InputTextStyle || (exports.InputTextStyle = {}));
/*
    This should really be a string enum, e.g.

        export enum ContainerStyle {
            Default = "default",
            Emphasis = "emphasis"
        }

    However, some hosts do not use a version of TypeScript
    recent enough to understand string enums. This is
    a compatible construct that does not require using
    a more recent version of TypeScript.
*/
var ContainerStyle = /** @class */ (function () {
    function ContainerStyle() {
    }
    ContainerStyle.Default = "default";
    ContainerStyle.Emphasis = "emphasis";
    return ContainerStyle;
}());
exports.ContainerStyle = ContainerStyle;
var ValidationError;
(function (ValidationError) {
    ValidationError[ValidationError["Hint"] = 0] = "Hint";
    ValidationError[ValidationError["ActionTypeNotAllowed"] = 1] = "ActionTypeNotAllowed";
    ValidationError[ValidationError["CollectionCantBeEmpty"] = 2] = "CollectionCantBeEmpty";
    ValidationError[ValidationError["Deprecated"] = 3] = "Deprecated";
    ValidationError[ValidationError["ElementTypeNotAllowed"] = 4] = "ElementTypeNotAllowed";
    ValidationError[ValidationError["InteractivityNotAllowed"] = 5] = "InteractivityNotAllowed";
    ValidationError[ValidationError["InvalidPropertyValue"] = 6] = "InvalidPropertyValue";
    ValidationError[ValidationError["MissingCardType"] = 7] = "MissingCardType";
    ValidationError[ValidationError["PropertyCantBeNull"] = 8] = "PropertyCantBeNull";
    ValidationError[ValidationError["TooManyActions"] = 9] = "TooManyActions";
    ValidationError[ValidationError["UnknownActionType"] = 10] = "UnknownActionType";
    ValidationError[ValidationError["UnknownElementType"] = 11] = "UnknownElementType";
    ValidationError[ValidationError["UnsupportedCardVersion"] = 12] = "UnsupportedCardVersion";
})(ValidationError = exports.ValidationError || (exports.ValidationError = {}));
var ContainerFitStatus;
(function (ContainerFitStatus) {
    ContainerFitStatus[ContainerFitStatus["FullyInContainer"] = 0] = "FullyInContainer";
    ContainerFitStatus[ContainerFitStatus["Overflowing"] = 1] = "Overflowing";
    ContainerFitStatus[ContainerFitStatus["FullyOutOfContainer"] = 2] = "FullyOutOfContainer";
})(ContainerFitStatus = exports.ContainerFitStatus || (exports.ContainerFitStatus = {}));


/***/ }),

/***/ "./src/host-config.ts":
/*!****************************!*\
  !*** ./src/host-config.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Enums = __webpack_require__(/*! ./enums */ "./src/enums.ts");
var Utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var TextColorDefinition = /** @class */ (function () {
    function TextColorDefinition(obj) {
        this.default = "#000000";
        this.subtle = "#666666";
        if (obj) {
            this.default = obj["default"] || this.default;
            this.subtle = obj["subtle"] || this.subtle;
        }
    }
    return TextColorDefinition;
}());
exports.TextColorDefinition = TextColorDefinition;
var AdaptiveCardConfig = /** @class */ (function () {
    function AdaptiveCardConfig(obj) {
        this.allowCustomStyle = false;
        if (obj) {
            this.allowCustomStyle = obj["allowCustomStyle"] || this.allowCustomStyle;
        }
    }
    return AdaptiveCardConfig;
}());
exports.AdaptiveCardConfig = AdaptiveCardConfig;
var ImageSetConfig = /** @class */ (function () {
    function ImageSetConfig(obj) {
        this.imageSize = Enums.Size.Medium;
        this.maxImageHeight = 100;
        if (obj) {
            this.imageSize = obj["imageSize"] != null ? obj["imageSize"] : this.imageSize;
            this.maxImageHeight = Utils.getValueOrDefault(obj["maxImageHeight"], 100);
        }
    }
    ImageSetConfig.prototype.toJSON = function () {
        return {
            imageSize: Enums.Size[this.imageSize],
            maxImageHeight: this.maxImageHeight
        };
    };
    return ImageSetConfig;
}());
exports.ImageSetConfig = ImageSetConfig;
var MediaConfig = /** @class */ (function () {
    function MediaConfig(obj) {
        this.allowInlinePlayback = true;
        if (obj) {
            this.defaultPoster = obj["defaultPoster"];
            this.allowInlinePlayback = obj["allowInlinePlayback"] || this.allowInlinePlayback;
        }
    }
    MediaConfig.prototype.toJSON = function () {
        return {
            defaultPoster: this.defaultPoster,
            allowInlinePlayback: this.allowInlinePlayback
        };
    };
    return MediaConfig;
}());
exports.MediaConfig = MediaConfig;
var FactTextDefinition = /** @class */ (function () {
    function FactTextDefinition(obj) {
        this.size = Enums.TextSize.Default;
        this.color = Enums.TextColor.Default;
        this.isSubtle = false;
        this.weight = Enums.TextWeight.Default;
        this.wrap = true;
        if (obj) {
            this.size = Utils.parseHostConfigEnum(Enums.TextSize, obj["size"], Enums.TextSize.Default);
            this.color = Utils.parseHostConfigEnum(Enums.TextColor, obj["color"], Enums.TextColor.Default);
            this.isSubtle = obj["isSubtle"] || this.isSubtle;
            this.weight = Utils.parseHostConfigEnum(Enums.TextWeight, obj["weight"], this.getDefaultWeight());
            this.wrap = obj["wrap"] != null ? obj["wrap"] : this.wrap;
        }
    }
    ;
    FactTextDefinition.prototype.getDefaultWeight = function () {
        return Enums.TextWeight.Default;
    };
    FactTextDefinition.prototype.toJSON = function () {
        return {
            size: Enums.TextSize[this.size],
            color: Enums.TextColor[this.color],
            isSubtle: this.isSubtle,
            weight: Enums.TextWeight[this.weight],
            wrap: this.wrap
        };
    };
    return FactTextDefinition;
}());
exports.FactTextDefinition = FactTextDefinition;
var FactTitleDefinition = /** @class */ (function (_super) {
    __extends(FactTitleDefinition, _super);
    function FactTitleDefinition(obj) {
        var _this = _super.call(this, obj) || this;
        _this.maxWidth = 150;
        _this.weight = Enums.TextWeight.Bolder;
        if (obj) {
            _this.maxWidth = obj["maxWidth"] != null ? obj["maxWidth"] : _this.maxWidth;
            _this.weight = Utils.parseHostConfigEnum(Enums.TextWeight, obj["weight"], Enums.TextWeight.Bolder);
        }
        return _this;
    }
    FactTitleDefinition.prototype.getDefaultWeight = function () {
        return Enums.TextWeight.Bolder;
    };
    return FactTitleDefinition;
}(FactTextDefinition));
exports.FactTitleDefinition = FactTitleDefinition;
var FactSetConfig = /** @class */ (function () {
    function FactSetConfig(obj) {
        this.title = new FactTitleDefinition();
        this.value = new FactTextDefinition();
        this.spacing = 10;
        if (obj) {
            this.title = new FactTitleDefinition(obj["title"]);
            this.value = new FactTextDefinition(obj["value"]);
            this.spacing = obj.spacing && obj.spacing != null ? obj.spacing && obj.spacing : this.spacing;
        }
    }
    return FactSetConfig;
}());
exports.FactSetConfig = FactSetConfig;
var ShowCardActionConfig = /** @class */ (function () {
    function ShowCardActionConfig(obj) {
        this.actionMode = Enums.ShowCardActionMode.Inline;
        this.inlineTopMargin = 16;
        this.style = Enums.ContainerStyle.Emphasis;
        if (obj) {
            this.actionMode = Utils.parseHostConfigEnum(Enums.ShowCardActionMode, obj["actionMode"], Enums.ShowCardActionMode.Inline);
            this.inlineTopMargin = obj["inlineTopMargin"] != null ? obj["inlineTopMargin"] : this.inlineTopMargin;
            this.style = obj["style"] && typeof obj["style"] === "string" ? obj["style"] : Enums.ContainerStyle.Emphasis;
        }
    }
    ShowCardActionConfig.prototype.toJSON = function () {
        return {
            actionMode: Enums.ShowCardActionMode[this.actionMode],
            inlineTopMargin: this.inlineTopMargin,
            style: this.style
        };
    };
    return ShowCardActionConfig;
}());
exports.ShowCardActionConfig = ShowCardActionConfig;
var ActionsConfig = /** @class */ (function () {
    function ActionsConfig(obj) {
        this.maxActions = 5;
        this.spacing = Enums.Spacing.Default;
        this.buttonSpacing = 20;
        this.showCard = new ShowCardActionConfig();
        this.preExpandSingleShowCardAction = false;
        this.actionsOrientation = Enums.Orientation.Horizontal;
        this.actionAlignment = Enums.ActionAlignment.Left;
        this.iconPlacement = Enums.ActionIconPlacement.LeftOfTitle;
        this.allowTitleToWrap = false;
        this.iconSize = 24;
        if (obj) {
            this.maxActions = obj["maxActions"] != null ? obj["maxActions"] : this.maxActions;
            this.spacing = Utils.parseHostConfigEnum(Enums.Spacing, obj.spacing && obj.spacing, Enums.Spacing.Default);
            this.buttonSpacing = obj["buttonSpacing"] != null ? obj["buttonSpacing"] : this.buttonSpacing;
            this.showCard = new ShowCardActionConfig(obj["showCard"]);
            this.preExpandSingleShowCardAction = Utils.getValueOrDefault(obj["preExpandSingleShowCardAction"], false);
            this.actionsOrientation = Utils.parseHostConfigEnum(Enums.Orientation, obj["actionsOrientation"], Enums.Orientation.Horizontal);
            this.actionAlignment = Utils.parseHostConfigEnum(Enums.ActionAlignment, obj["actionAlignment"], Enums.ActionAlignment.Left);
            this.iconPlacement = Utils.parseHostConfigEnum(Enums.ActionIconPlacement, obj["iconPlacement"], Enums.ActionIconPlacement.LeftOfTitle);
            this.allowTitleToWrap = obj["allowTitleToWrap"] != null ? obj["allowTitleToWrap"] : this.allowTitleToWrap;
            try {
                var sizeAndUnit = Utils.SizeAndUnit.parse(obj["iconSize"]);
                if (sizeAndUnit.unit == Enums.SizeUnit.Pixel) {
                    this.iconSize = sizeAndUnit.physicalSize;
                }
            }
            catch (e) {
                // Swallow this, keep default icon size
            }
        }
    }
    ActionsConfig.prototype.toJSON = function () {
        return {
            maxActions: this.maxActions,
            spacing: Enums.Spacing[this.spacing],
            buttonSpacing: this.buttonSpacing,
            showCard: this.showCard,
            preExpandSingleShowCardAction: this.preExpandSingleShowCardAction,
            actionsOrientation: Enums.Orientation[this.actionsOrientation],
            actionAlignment: Enums.ActionAlignment[this.actionAlignment]
        };
    };
    return ActionsConfig;
}());
exports.ActionsConfig = ActionsConfig;
var ContainerStyleDefinition = /** @class */ (function () {
    function ContainerStyleDefinition(obj) {
        this.foregroundColors = {
            default: new TextColorDefinition(),
            dark: new TextColorDefinition(),
            light: new TextColorDefinition(),
            accent: new TextColorDefinition(),
            good: new TextColorDefinition(),
            warning: new TextColorDefinition(),
            attention: new TextColorDefinition()
        };
        this.parse(obj);
    }
    ContainerStyleDefinition.prototype.getTextColorDefinitionOrDefault = function (obj, defaultValue) {
        return new TextColorDefinition(obj ? obj : defaultValue);
    };
    ContainerStyleDefinition.prototype.parse = function (obj) {
        if (obj) {
            this.backgroundColor = obj["backgroundColor"];
            if (obj.foregroundColors) {
                this.foregroundColors.default = this.getTextColorDefinitionOrDefault(obj.foregroundColors["default"], { default: "#333333", subtle: "#EE333333" });
                this.foregroundColors.dark = this.getTextColorDefinitionOrDefault(obj.foregroundColors["dark"], { default: "#000000", subtle: "#66000000" });
                this.foregroundColors.light = this.getTextColorDefinitionOrDefault(obj.foregroundColors["light"], { default: "#FFFFFF", subtle: "#33000000" });
                this.foregroundColors.accent = this.getTextColorDefinitionOrDefault(obj.foregroundColors["accent"], { default: "#2E89FC", subtle: "#882E89FC" });
                this.foregroundColors.good = this.getTextColorDefinitionOrDefault(obj.foregroundColors["good"], { default: "#54A254", subtle: "#DD54A254" });
                this.foregroundColors.warning = this.getTextColorDefinitionOrDefault(obj.foregroundColors["warning"], { default: "#E69500", subtle: "#DDE69500" });
                this.foregroundColors.attention = this.getTextColorDefinitionOrDefault(obj.foregroundColors["attention"], { default: "#CC3300", subtle: "#DDCC3300" });
            }
            this.highlightBackgroundColor = obj["highlightBackgroundColor"];
            this.highlightForegroundColor = obj["highlightForegroundColor"];
        }
    };
    Object.defineProperty(ContainerStyleDefinition.prototype, "isBuiltIn", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return ContainerStyleDefinition;
}());
exports.ContainerStyleDefinition = ContainerStyleDefinition;
var BuiltInContainerStyleDefinition = /** @class */ (function (_super) {
    __extends(BuiltInContainerStyleDefinition, _super);
    function BuiltInContainerStyleDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BuiltInContainerStyleDefinition.prototype, "isBuiltIn", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return BuiltInContainerStyleDefinition;
}(ContainerStyleDefinition));
var ContainerStyleSet = /** @class */ (function () {
    function ContainerStyleSet(obj) {
        this._allStyles = {};
        this._allStyles[Enums.ContainerStyle.Default] = new BuiltInContainerStyleDefinition();
        this._allStyles[Enums.ContainerStyle.Emphasis] = new BuiltInContainerStyleDefinition();
        if (obj) {
            this._allStyles[Enums.ContainerStyle.Default].parse(obj[Enums.ContainerStyle.Default]);
            this._allStyles[Enums.ContainerStyle.Emphasis].parse(obj[Enums.ContainerStyle.Emphasis]);
            var customStyleArray = obj["customStyles"];
            if (customStyleArray && Array.isArray(customStyleArray)) {
                for (var _i = 0, customStyleArray_1 = customStyleArray; _i < customStyleArray_1.length; _i++) {
                    var customStyle = customStyleArray_1[_i];
                    if (customStyle) {
                        var styleName = customStyle["name"];
                        if (styleName && typeof styleName === "string") {
                            if (this._allStyles.hasOwnProperty(styleName)) {
                                this._allStyles[styleName].parse(customStyle["style"]);
                            }
                            else {
                                this._allStyles[styleName] = new ContainerStyleDefinition(customStyle["style"]);
                            }
                        }
                    }
                }
            }
        }
    }
    ContainerStyleSet.prototype.toJSON = function () {
        var _this = this;
        var customStyleArray = [];
        Object.keys(this._allStyles).forEach(function (key) {
            if (!_this._allStyles[key].isBuiltIn) {
                customStyleArray.push({
                    name: key,
                    style: _this._allStyles[key]
                });
            }
        });
        var result = {
            default: this.default,
            emphasis: this.emphasis
        };
        if (customStyleArray.length > 0) {
            result.customStyles = customStyleArray;
        }
        return result;
    };
    ContainerStyleSet.prototype.getStyleByName = function (name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return this._allStyles.hasOwnProperty(name) ? this._allStyles[name] : defaultValue;
    };
    Object.defineProperty(ContainerStyleSet.prototype, "default", {
        get: function () {
            return this._allStyles[Enums.ContainerStyle.Default];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContainerStyleSet.prototype, "emphasis", {
        get: function () {
            return this._allStyles[Enums.ContainerStyle.Emphasis];
        },
        enumerable: true,
        configurable: true
    });
    return ContainerStyleSet;
}());
exports.ContainerStyleSet = ContainerStyleSet;
var Version = /** @class */ (function () {
    function Version(major, minor) {
        if (major === void 0) { major = 1; }
        if (minor === void 0) { minor = 1; }
        this._isValid = true;
        this._major = major;
        this._minor = minor;
    }
    Version.parse = function (versionString, errors) {
        if (!versionString) {
            return null;
        }
        var result = new Version();
        result._versionString = versionString;
        var regEx = /(\d+).(\d+)/gi;
        var matches = regEx.exec(versionString);
        if (matches != null && matches.length == 3) {
            result._major = parseInt(matches[1]);
            result._minor = parseInt(matches[2]);
        }
        else {
            result._isValid = false;
        }
        if (!result._isValid && errors) {
            errors.push({
                error: Enums.ValidationError.InvalidPropertyValue,
                message: "Invalid version string: " + result._versionString
            });
        }
        return result;
    };
    Version.prototype.toString = function () {
        return !this._isValid ? this._versionString : this._major + "." + this._minor;
    };
    Version.prototype.compareTo = function (otherVersion) {
        if (!this.isValid || !otherVersion.isValid) {
            throw new Error("Cannot compare invalid version.");
        }
        if (this.major > otherVersion.major) {
            return 1;
        }
        else if (this.major < otherVersion.major) {
            return -1;
        }
        else if (this.minor > otherVersion.minor) {
            return 1;
        }
        else if (this.minor < otherVersion.minor) {
            return -1;
        }
        return 0;
    };
    Object.defineProperty(Version.prototype, "major", {
        get: function () {
            return this._major;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "minor", {
        get: function () {
            return this._minor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        enumerable: true,
        configurable: true
    });
    return Version;
}());
exports.Version = Version;
var HostCapabilities = /** @class */ (function () {
    function HostCapabilities() {
        this.capabilities = null;
    }
    HostCapabilities.prototype.setCapability = function (name, version) {
        if (!this.capabilities) {
            this.capabilities = {};
        }
        this.capabilities[name] = version;
    };
    HostCapabilities.prototype.parse = function (json, errors) {
        if (json) {
            for (var name_1 in json) {
                var jsonVersion = json[name_1];
                if (typeof jsonVersion === "string") {
                    if (jsonVersion == "*") {
                        this.setCapability(name_1, "*");
                    }
                    else {
                        var version = Version.parse(jsonVersion, errors);
                        if (version.isValid) {
                            this.setCapability(name_1, version);
                        }
                    }
                }
            }
        }
    };
    HostCapabilities.prototype.hasCapability = function (name, version) {
        if (this.capabilities && this.capabilities.hasOwnProperty(name)) {
            if (version == "*" || this.capabilities[name] == "*") {
                return true;
            }
            return version.compareTo(this.capabilities[name]) <= 0;
        }
        return false;
    };
    HostCapabilities.prototype.areAllMet = function (hostCapabilities) {
        if (this.capabilities) {
            for (var capabilityName in this.capabilities) {
                if (!hostCapabilities.hasCapability(capabilityName, this.capabilities[capabilityName])) {
                    return false;
                }
            }
        }
        return true;
    };
    return HostCapabilities;
}());
exports.HostCapabilities = HostCapabilities;
var HostConfig = /** @class */ (function () {
    function HostConfig(obj) {
        this.hostCapabilities = new HostCapabilities();
        this.choiceSetInputValueSeparator = ",";
        this.supportsInteractivity = true;
        this.fontFamily = "Segoe UI,Segoe,Segoe WP,Helvetica Neue,Helvetica,sans-serif";
        this.spacing = {
            small: 3,
            default: 8,
            medium: 20,
            large: 30,
            extraLarge: 40,
            padding: 15
        };
        this.separator = {
            lineThickness: 1,
            lineColor: "#EEEEEE"
        };
        this.fontSizes = {
            small: 12,
            default: 14,
            medium: 17,
            large: 21,
            extraLarge: 26
        };
        this.fontWeights = {
            lighter: 200,
            default: 400,
            bolder: 600
        };
        this.imageSizes = {
            small: 40,
            medium: 80,
            large: 160
        };
        this.containerStyles = new ContainerStyleSet();
        this.actions = new ActionsConfig();
        this.adaptiveCard = new AdaptiveCardConfig();
        this.imageSet = new ImageSetConfig();
        this.media = new MediaConfig();
        this.factSet = new FactSetConfig();
        this.cssClassNamePrefix = null;
        if (obj) {
            if (typeof obj === "string" || obj instanceof String) {
                obj = JSON.parse(obj);
            }
            this.choiceSetInputValueSeparator = (obj && typeof obj["choiceSetInputValueSeparator"] === "string") ? obj["choiceSetInputValueSeparator"] : this.choiceSetInputValueSeparator;
            this.supportsInteractivity = (obj && typeof obj["supportsInteractivity"] === "boolean") ? obj["supportsInteractivity"] : this.supportsInteractivity;
            this.fontFamily = obj["fontFamily"] || this.fontFamily;
            this.fontSizes = {
                small: obj.fontSizes && obj.fontSizes["small"] || this.fontSizes.small,
                default: obj.fontSizes && obj.fontSizes["default"] || this.fontSizes.default,
                medium: obj.fontSizes && obj.fontSizes["medium"] || this.fontSizes.medium,
                large: obj.fontSizes && obj.fontSizes["large"] || this.fontSizes.large,
                extraLarge: obj.fontSizes && obj.fontSizes["extraLarge"] || this.fontSizes.extraLarge
            };
            if (obj.lineHeights) {
                this.lineHeights = {
                    small: obj.lineHeights["small"],
                    default: obj.lineHeights["default"],
                    medium: obj.lineHeights["medium"],
                    large: obj.lineHeights["large"],
                    extraLarge: obj.lineHeights["extraLarge"]
                };
            }
            ;
            this.fontWeights = {
                lighter: obj.fontWeights && obj.fontWeights["lighter"] || this.fontWeights.lighter,
                default: obj.fontWeights && obj.fontWeights["default"] || this.fontWeights.default,
                bolder: obj.fontWeights && obj.fontWeights["bolder"] || this.fontWeights.bolder
            };
            this.imageSizes = {
                small: obj.imageSizes && obj.imageSizes["small"] || this.imageSizes.small,
                medium: obj.imageSizes && obj.imageSizes["medium"] || this.imageSizes.medium,
                large: obj.imageSizes && obj.imageSizes["large"] || this.imageSizes.large,
            };
            this.containerStyles = new ContainerStyleSet(obj["containerStyles"]);
            this.spacing = {
                small: obj.spacing && obj.spacing["small"] || this.spacing.small,
                default: obj.spacing && obj.spacing["default"] || this.spacing.default,
                medium: obj.spacing && obj.spacing["medium"] || this.spacing.medium,
                large: obj.spacing && obj.spacing["large"] || this.spacing.large,
                extraLarge: obj.spacing && obj.spacing["extraLarge"] || this.spacing.extraLarge,
                padding: obj.spacing && obj.spacing["padding"] || this.spacing.padding
            };
            this.separator = {
                lineThickness: obj.separator && obj.separator["lineThickness"] || this.separator.lineThickness,
                lineColor: obj.separator && obj.separator["lineColor"] || this.separator.lineColor
            };
            this.actions = new ActionsConfig(obj.actions || this.actions);
            this.adaptiveCard = new AdaptiveCardConfig(obj.adaptiveCard || this.adaptiveCard);
            this.imageSet = new ImageSetConfig(obj["imageSet"]);
            this.factSet = new FactSetConfig(obj["factSet"]);
        }
    }
    HostConfig.prototype.getEffectiveSpacing = function (spacing) {
        switch (spacing) {
            case Enums.Spacing.Small:
                return this.spacing.small;
            case Enums.Spacing.Default:
                return this.spacing.default;
            case Enums.Spacing.Medium:
                return this.spacing.medium;
            case Enums.Spacing.Large:
                return this.spacing.large;
            case Enums.Spacing.ExtraLarge:
                return this.spacing.extraLarge;
            case Enums.Spacing.Padding:
                return this.spacing.padding;
            default:
                return 0;
        }
    };
    HostConfig.prototype.makeCssClassName = function () {
        var classNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classNames[_i] = arguments[_i];
        }
        var result = "";
        for (var i = 0; i < classNames.length; i++) {
            if (i > 0) {
                result += " ";
            }
            if (this.cssClassNamePrefix) {
                result += this.cssClassNamePrefix + "-";
            }
            result += classNames[i];
        }
        return result;
    };
    return HostConfig;
}());
exports.HostConfig = HostConfig;


/***/ }),

/***/ "./src/text-formatters.ts":
/*!********************************!*\
  !*** ./src/text-formatters.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractTextFormatter = /** @class */ (function () {
    function AbstractTextFormatter(regularExpression) {
        this._regularExpression = regularExpression;
    }
    AbstractTextFormatter.prototype.format = function (lang, input) {
        var matches;
        var result = input;
        while ((matches = this._regularExpression.exec(input)) != null) {
            result = result.replace(matches[0], this.internalFormat(lang, matches));
        }
        ;
        return result;
    };
    return AbstractTextFormatter;
}());
var DateFormatter = /** @class */ (function (_super) {
    __extends(DateFormatter, _super);
    function DateFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFormatter.prototype.internalFormat = function (lang, matches) {
        var date = new Date(Date.parse(matches[1]));
        var format = matches[2] != undefined ? matches[2].toLowerCase() : "compact";
        if (format != "compact") {
            return date.toLocaleDateString(lang, { day: "numeric", weekday: format, month: format, year: "numeric" });
        }
        else {
            return date.toLocaleDateString();
        }
    };
    return DateFormatter;
}(AbstractTextFormatter));
var TimeFormatter = /** @class */ (function (_super) {
    __extends(TimeFormatter, _super);
    function TimeFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeFormatter.prototype.internalFormat = function (lang, matches) {
        var date = new Date(Date.parse(matches[1]));
        return date.toLocaleTimeString(lang, { hour: 'numeric', minute: '2-digit' });
    };
    return TimeFormatter;
}(AbstractTextFormatter));
function formatText(lang, text) {
    var formatters = [
        new DateFormatter(/\{{2}DATE\((\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|(?:(?:-|\+)\d{2}:\d{2})))(?:, ?(COMPACT|LONG|SHORT))?\)\}{2}/g),
        new TimeFormatter(/\{{2}TIME\((\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|(?:(?:-|\+)\d{2}:\d{2})))\)\}{2}/g)
    ];
    var result = text;
    for (var i = 0; i < formatters.length; i++) {
        result = formatters[i].format(lang, result);
    }
    return result;
}
exports.formatText = formatText;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Enums = __webpack_require__(/*! ./enums */ "./src/enums.ts");
/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
var UUID = /** @class */ (function () {
    function UUID() {
    }
    UUID.generate = function () {
        var d0 = Math.random() * 0xffffffff | 0;
        var d1 = Math.random() * 0xffffffff | 0;
        var d2 = Math.random() * 0xffffffff | 0;
        var d3 = Math.random() * 0xffffffff | 0;
        return UUID.lut[d0 & 0xff] + UUID.lut[d0 >> 8 & 0xff] + UUID.lut[d0 >> 16 & 0xff] + UUID.lut[d0 >> 24 & 0xff] + '-' +
            UUID.lut[d1 & 0xff] + UUID.lut[d1 >> 8 & 0xff] + '-' + UUID.lut[d1 >> 16 & 0x0f | 0x40] + UUID.lut[d1 >> 24 & 0xff] + '-' +
            UUID.lut[d2 & 0x3f | 0x80] + UUID.lut[d2 >> 8 & 0xff] + '-' + UUID.lut[d2 >> 16 & 0xff] + UUID.lut[d2 >> 24 & 0xff] +
            UUID.lut[d3 & 0xff] + UUID.lut[d3 >> 8 & 0xff] + UUID.lut[d3 >> 16 & 0xff] + UUID.lut[d3 >> 24 & 0xff];
    };
    UUID.initialize = function () {
        for (var i = 0; i < 256; i++) {
            UUID.lut[i] = (i < 16 ? '0' : '') + i.toString(16);
        }
    };
    UUID.lut = [];
    return UUID;
}());
exports.UUID = UUID;
UUID.initialize();
exports.ContentTypes = {
    applicationJson: "application/json",
    applicationXWwwFormUrlencoded: "application/x-www-form-urlencoded"
};
function getValueOrDefault(obj, defaultValue) {
    return obj ? obj : defaultValue;
}
exports.getValueOrDefault = getValueOrDefault;
function isNullOrEmpty(value) {
    return value === undefined || value === null || value === "";
}
exports.isNullOrEmpty = isNullOrEmpty;
function appendChild(node, child) {
    if (child != null && child != undefined) {
        node.appendChild(child);
    }
}
exports.appendChild = appendChild;
function setProperty(target, propertyName, propertyValue, defaultValue) {
    if (defaultValue === void 0) { defaultValue = undefined; }
    if (propertyValue && (!defaultValue || defaultValue !== propertyValue)) {
        target[propertyName] = propertyValue;
    }
}
exports.setProperty = setProperty;
function setEnumProperty(enumType, target, propertyName, propertyValue, defaultValue) {
    if (defaultValue === undefined || defaultValue !== propertyValue) {
        target[propertyName] = enumType[propertyValue];
    }
}
exports.setEnumProperty = setEnumProperty;
function getEnumValueOrDefault(targetEnum, name, defaultValue) {
    if (isNullOrEmpty(name)) {
        return defaultValue;
    }
    for (var key in targetEnum) {
        var isValueProperty = parseInt(key, 10) >= 0;
        if (isValueProperty) {
            var value = targetEnum[key];
            if (value && typeof value === "string") {
                if (value.toLowerCase() === name.toLowerCase()) {
                    return parseInt(key, 10);
                }
            }
        }
    }
    return defaultValue;
}
exports.getEnumValueOrDefault = getEnumValueOrDefault;
function parseHostConfigEnum(targetEnum, value, defaultValue) {
    if (typeof value === "string") {
        return getEnumValueOrDefault(targetEnum, value, defaultValue);
    }
    else if (typeof value === "number") {
        return getValueOrDefault(value, defaultValue);
    }
    else {
        return defaultValue;
    }
}
exports.parseHostConfigEnum = parseHostConfigEnum;
function renderSeparation(separationDefinition, orientation) {
    if (separationDefinition.spacing > 0 || separationDefinition.lineThickness > 0) {
        var separator = document.createElement("div");
        if (orientation == Enums.Orientation.Horizontal) {
            if (separationDefinition.lineThickness) {
                separator.style.marginTop = (separationDefinition.spacing / 2) + "px";
                separator.style.paddingTop = (separationDefinition.spacing / 2) + "px";
                separator.style.borderTop = separationDefinition.lineThickness + "px solid " + stringToCssColor(separationDefinition.lineColor);
            }
            else {
                separator.style.height = separationDefinition.spacing + "px";
            }
        }
        else {
            if (separationDefinition.lineThickness) {
                separator.style.marginLeft = (separationDefinition.spacing / 2) + "px";
                separator.style.paddingLeft = (separationDefinition.spacing / 2) + "px";
                separator.style.borderLeft = separationDefinition.lineThickness + "px solid " + stringToCssColor(separationDefinition.lineColor);
            }
            else {
                separator.style.width = separationDefinition.spacing + "px";
            }
        }
        separator.style.overflow = "hidden";
        return separator;
    }
    else {
        return null;
    }
}
exports.renderSeparation = renderSeparation;
function stringToCssColor(color) {
    var regEx = /#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?/gi;
    var matches = regEx.exec(color);
    if (matches && matches[4]) {
        var a = parseInt(matches[1], 16) / 255;
        var r = parseInt(matches[2], 16);
        var g = parseInt(matches[3], 16);
        var b = parseInt(matches[4], 16);
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }
    else {
        return color;
    }
}
exports.stringToCssColor = stringToCssColor;
var StringWithSubstitutions = /** @class */ (function () {
    function StringWithSubstitutions() {
        this._isProcessed = false;
        this._original = null;
        this._processed = null;
    }
    StringWithSubstitutions.prototype.substituteInputValues = function (inputs, contentType) {
        this._processed = this._original;
        var regEx = /\{{2}([a-z0-9_$@]+).value\}{2}/gi;
        var matches;
        while ((matches = regEx.exec(this._original)) != null) {
            var matchedInput = null;
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].id.toLowerCase() == matches[1].toLowerCase()) {
                    matchedInput = inputs[i];
                    break;
                }
            }
            if (matchedInput) {
                var valueForReplace = "";
                if (matchedInput.value) {
                    valueForReplace = matchedInput.value;
                }
                if (contentType === exports.ContentTypes.applicationJson) {
                    valueForReplace = JSON.stringify(valueForReplace);
                    valueForReplace = valueForReplace.slice(1, -1);
                }
                else if (contentType === exports.ContentTypes.applicationXWwwFormUrlencoded) {
                    valueForReplace = encodeURIComponent(valueForReplace);
                }
                this._processed = this._processed.replace(matches[0], valueForReplace);
            }
        }
        ;
        this._isProcessed = true;
    };
    StringWithSubstitutions.prototype.getOriginal = function () {
        return this._original;
    };
    StringWithSubstitutions.prototype.get = function () {
        if (!this._isProcessed) {
            return this._original;
        }
        else {
            return this._processed;
        }
    };
    StringWithSubstitutions.prototype.set = function (value) {
        this._original = value;
        this._isProcessed = false;
    };
    return StringWithSubstitutions;
}());
exports.StringWithSubstitutions = StringWithSubstitutions;
var SizeAndUnit = /** @class */ (function () {
    function SizeAndUnit(physicalSize, unit) {
        this.physicalSize = physicalSize;
        this.unit = unit;
    }
    SizeAndUnit.parse = function (input) {
        var result = new SizeAndUnit(0, Enums.SizeUnit.Weight);
        var regExp = /^([0-9]+)(px|\*)?$/g;
        var matches = regExp.exec(input);
        if (matches && matches.length >= 2) {
            result.physicalSize = parseInt(matches[1]);
            if (matches.length == 3) {
                if (matches[2] == "px") {
                    result.unit = Enums.SizeUnit.Pixel;
                }
            }
            return result;
        }
        throw new Error("Invalid size: " + input);
    };
    return SizeAndUnit;
}());
exports.SizeAndUnit = SizeAndUnit;
function truncate(element, maxHeight, lineHeight) {
    var fits = function () {
        // Allow a one pixel overflow to account for rounding differences
        // between browsers
        return maxHeight - element.scrollHeight >= -1.0;
    };
    if (fits())
        return;
    var fullText = element.innerHTML;
    var truncateAt = function (idx) {
        element.innerHTML = fullText.substring(0, idx) + '...';
    };
    var breakableIndices = findBreakableIndices(fullText);
    var lo = 0;
    var hi = breakableIndices.length;
    var bestBreakIdx = 0;
    // Do a binary search for the longest string that fits
    while (lo < hi) {
        var mid = Math.floor((lo + hi) / 2);
        truncateAt(breakableIndices[mid]);
        if (fits()) {
            bestBreakIdx = breakableIndices[mid];
            lo = mid + 1;
        }
        else {
            hi = mid;
        }
    }
    truncateAt(bestBreakIdx);
    // If we have extra room, try to expand the string letter by letter
    // (covers the case where we have to break in the middle of a long word)
    if (lineHeight && maxHeight - element.scrollHeight >= lineHeight - 1.0) {
        var idx = findNextCharacter(fullText, bestBreakIdx);
        while (idx < fullText.length) {
            truncateAt(idx);
            if (fits()) {
                bestBreakIdx = idx;
                idx = findNextCharacter(fullText, idx);
            }
            else {
                break;
            }
        }
        truncateAt(bestBreakIdx);
    }
}
exports.truncate = truncate;
function findBreakableIndices(html) {
    var results = [];
    var idx = findNextCharacter(html, -1);
    while (idx < html.length) {
        if (html[idx] == ' ') {
            results.push(idx);
        }
        idx = findNextCharacter(html, idx);
    }
    return results;
}
function findNextCharacter(html, currIdx) {
    currIdx += 1;
    // If we found the start of an HTML tag, keep advancing until we get
    // past it, so we don't end up truncating in the middle of the tag
    while (currIdx < html.length && html[currIdx] == '<') {
        while (currIdx < html.length && html[currIdx++] != '>')
            ;
    }
    return currIdx;
}
function getFitStatus(element, containerEnd) {
    var start = element.offsetTop;
    var end = start + element.clientHeight;
    if (end <= containerEnd) {
        return Enums.ContainerFitStatus.FullyInContainer;
    }
    else if (start < containerEnd) {
        return Enums.ContainerFitStatus.Overflowing;
    }
    else {
        return Enums.ContainerFitStatus.FullyOutOfContainer;
    }
}
exports.getFitStatus = getFitStatus;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9BZGFwdGl2ZUNhcmRzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9BZGFwdGl2ZUNhcmRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0FkYXB0aXZlQ2FyZHMvLi9zcmMvYWRhcHRpdmVjYXJkcy50cyIsIndlYnBhY2s6Ly9BZGFwdGl2ZUNhcmRzLy4vc3JjL2NhcmQtZWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vQWRhcHRpdmVDYXJkcy8uL3NyYy9lbnVtcy50cyIsIndlYnBhY2s6Ly9BZGFwdGl2ZUNhcmRzLy4vc3JjL2hvc3QtY29uZmlnLnRzIiwid2VicGFjazovL0FkYXB0aXZlQ2FyZHMvLi9zcmMvdGV4dC1mb3JtYXR0ZXJzLnRzIiwid2VicGFjazovL0FkYXB0aXZlQ2FyZHMvLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxl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QztBQUVELFNBQVMsaUJBQWlCLENBQUMsSUFBWSxFQUFFLE9BQWU7SUFDdkQsT0FBTyxJQUFJLENBQUMsQ0FBQztJQUViLG9FQUFvRTtJQUNwRSxrRUFBa0U7SUFDbEUsT0FBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ3JELE9BQU8sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksR0FBRztZQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLE9BQW9CLEVBQUUsWUFBb0I7SUFDdEUsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUM5QixJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztJQUV2QyxJQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUU7UUFDeEIsT0FBTyxLQUFLLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUM7S0FDakQ7U0FDSSxJQUFJLEtBQUssR0FBRyxZQUFZLEVBQUU7UUFDOUIsT0FBTyxLQUFLLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDO0tBQzVDO1NBQ0k7UUFDSixPQUFPLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQztLQUNwRDtBQUNGLENBQUM7QUFiRCxvQ0FhQyIsImZpbGUiOiJhZGFwdGl2ZWNhcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQWRhcHRpdmVDYXJkc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJBZGFwdGl2ZUNhcmRzXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hZGFwdGl2ZWNhcmRzLnRzXCIpO1xuIiwiZXhwb3J0ICogZnJvbSBcIi4vY2FyZC1lbGVtZW50c1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9lbnVtc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9ob3N0LWNvbmZpZ1wiO1xyXG5leHBvcnQgeyBTaXplQW5kVW5pdCwgZ2V0RW51bVZhbHVlT3JEZWZhdWx0IH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgSUFkYXB0aXZlQ2FyZCwgSUNhcmRFbGVtZW50IH0gZnJvbSBcIi4vc2NoZW1hXCI7IiwiaW1wb3J0ICogYXMgRW51bXMgZnJvbSBcIi4vZW51bXNcIjtcclxuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0ICogYXMgSG9zdENvbmZpZyBmcm9tIFwiLi9ob3N0LWNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBUZXh0Rm9ybWF0dGVycyBmcm9tIFwiLi90ZXh0LWZvcm1hdHRlcnNcIjtcclxuXHJcbmZ1bmN0aW9uIGludm9rZVNldENvbGxlY3Rpb24oYWN0aW9uOiBBY3Rpb24sIGNvbGxlY3Rpb246IEFjdGlvbkNvbGxlY3Rpb24pIHtcclxuXHRpZiAoYWN0aW9uKSB7XHJcblx0XHQvLyBDbG9zZXN0IGVtdWxhdGlvbiBvZiBcImludGVybmFsXCIgaW4gVHlwZVNjcmlwdC5cclxuXHRcdGFjdGlvbltcInNldENvbGxlY3Rpb25cIl0oY29sbGVjdGlvbik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0FjdGlvbkFsbG93ZWQoYWN0aW9uOiBBY3Rpb24sIGZvcmJpZGRlbkFjdGlvblR5cGVzOiBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiB7XHJcblx0aWYgKGZvcmJpZGRlbkFjdGlvblR5cGVzKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZvcmJpZGRlbkFjdGlvblR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChhY3Rpb24uZ2V0SnNvblR5cGVOYW1lKCkgPT09IGZvcmJpZGRlbkFjdGlvblR5cGVzW2ldKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVVbmlxdWVJZCgpOiBzdHJpbmcge1xyXG5cdHJldHVybiBcIl9fYWMtXCIgKyBVdGlscy5VVUlELmdlbmVyYXRlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhcmRPYmplY3RJbnN0YW5jZTxUIGV4dGVuZHMgSUNhcmRPYmplY3Q+KFxyXG5cdHBhcmVudDogQ2FyZEVsZW1lbnQsXHJcblx0anNvbjogYW55LFxyXG5cdGNyZWF0ZUluc3RhbmNlQ2FsbGJhY2s6ICh0eXBlTmFtZTogc3RyaW5nKSA9PiBULFxyXG5cdGNyZWF0ZVZhbGlkYXRpb25FcnJvckNhbGxiYWNrOiAodHlwZU5hbWU6IHN0cmluZykgPT4gSG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yLFxyXG5cdGVycm9yczogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPik6IFQge1xyXG5cdGxldCByZXN1bHQ6IFQgPSBudWxsO1xyXG5cclxuXHRpZiAoanNvbiAmJiB0eXBlb2YganNvbiA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0bGV0IHRyeVRvRmFsbGJhY2sgPSBmYWxzZTtcclxuXHRcdGxldCB0eXBlTmFtZSA9IGpzb25bXCJ0eXBlXCJdO1xyXG5cclxuXHRcdHJlc3VsdCA9IGNyZWF0ZUluc3RhbmNlQ2FsbGJhY2sodHlwZU5hbWUpO1xyXG5cclxuXHRcdGlmICghcmVzdWx0KSB7XHJcblx0XHRcdHRyeVRvRmFsbGJhY2sgPSB0cnVlO1xyXG5cclxuXHRcdFx0cmFpc2VQYXJzZUVycm9yKGNyZWF0ZVZhbGlkYXRpb25FcnJvckNhbGxiYWNrKHR5cGVOYW1lKSwgZXJyb3JzKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXN1bHQuc2V0UGFyZW50KHBhcmVudCk7XHJcblx0XHRcdHJlc3VsdC5wYXJzZShqc29uKTtcclxuXHJcblx0XHRcdHRyeVRvRmFsbGJhY2sgPSByZXN1bHQuc2hvdWxkRmFsbGJhY2soKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHJ5VG9GYWxsYmFjaykge1xyXG5cdFx0XHRsZXQgZmFsbGJhY2sgPSBqc29uW1wiZmFsbGJhY2tcIl07XHJcblxyXG5cdFx0XHRpZiAoIWZhbGxiYWNrKSB7XHJcblx0XHRcdFx0cGFyZW50LnNldFNob3VsZEZhbGxiYWNrKHRydWUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0eXBlb2YgZmFsbGJhY2sgPT09IFwic3RyaW5nXCIgJiYgZmFsbGJhY2sudG9Mb3dlckNhc2UoKSA9PT0gXCJkcm9wXCIpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBmYWxsYmFjayA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdHJlc3VsdCA9IGNyZWF0ZUNhcmRPYmplY3RJbnN0YW5jZTxUPihcclxuXHRcdFx0XHRcdHBhcmVudCxcclxuXHRcdFx0XHRcdGZhbGxiYWNrLFxyXG5cdFx0XHRcdFx0Y3JlYXRlSW5zdGFuY2VDYWxsYmFjayxcclxuXHRcdFx0XHRcdGNyZWF0ZVZhbGlkYXRpb25FcnJvckNhbGxiYWNrLFxyXG5cdFx0XHRcdFx0ZXJyb3JzKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkluc3RhbmNlKFxyXG5cdHBhcmVudDogQ2FyZEVsZW1lbnQsXHJcblx0anNvbjogYW55LFxyXG5cdGVycm9yczogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPik6IEFjdGlvbiB7XHJcblx0cmV0dXJuIGNyZWF0ZUNhcmRPYmplY3RJbnN0YW5jZTxBY3Rpb24+KFxyXG5cdFx0cGFyZW50LFxyXG5cdFx0anNvbixcclxuXHRcdCh0eXBlTmFtZTogc3RyaW5nKSA9PiB7IHJldHVybiBBZGFwdGl2ZUNhcmQuYWN0aW9uVHlwZVJlZ2lzdHJ5LmNyZWF0ZUluc3RhbmNlKHR5cGVOYW1lKTsgfSxcclxuXHRcdCh0eXBlTmFtZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0ZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5Vbmtub3duQWN0aW9uVHlwZSxcclxuXHRcdFx0XHRtZXNzYWdlOiBcIlVua25vd24gYWN0aW9uIHR5cGU6IFwiICsgdHlwZU5hbWUgKyBcIi4gQXR0ZW1wdGluZyB0byBmYWxsIGJhY2suXCJcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGVycm9ycyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50SW5zdGFuY2UoXHJcblx0cGFyZW50OiBDYXJkRWxlbWVudCxcclxuXHRqc29uOiBhbnksXHJcblx0ZXJyb3JzOiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KTogQ2FyZEVsZW1lbnQge1xyXG5cdHJldHVybiBjcmVhdGVDYXJkT2JqZWN0SW5zdGFuY2U8Q2FyZEVsZW1lbnQ+KFxyXG5cdFx0cGFyZW50LFxyXG5cdFx0anNvbixcclxuXHRcdCh0eXBlTmFtZTogc3RyaW5nKSA9PiB7IHJldHVybiBBZGFwdGl2ZUNhcmQuZWxlbWVudFR5cGVSZWdpc3RyeS5jcmVhdGVJbnN0YW5jZSh0eXBlTmFtZSk7IH0sXHJcblx0XHQodHlwZU5hbWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IuVW5rbm93bkVsZW1lbnRUeXBlLFxyXG5cdFx0XHRcdG1lc3NhZ2U6IFwiVW5rbm93biBlbGVtZW50IHR5cGU6IFwiICsgdHlwZU5hbWUgKyBcIi4gQXR0ZW1wdGluZyB0byBmYWxsIGJhY2suXCJcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGVycm9ycyk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTcGFjaW5nRGVmaW5pdGlvbiB7XHJcblx0bGVmdDogbnVtYmVyID0gMDtcclxuXHR0b3A6IG51bWJlciA9IDA7XHJcblx0cmlnaHQ6IG51bWJlciA9IDA7XHJcblx0Ym90dG9tOiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0b3A6IG51bWJlciA9IDAsXHJcblx0XHRyaWdodDogbnVtYmVyID0gMCxcclxuXHRcdGJvdHRvbTogbnVtYmVyID0gMCxcclxuXHRcdGxlZnQ6IG51bWJlciA9IDApIHtcclxuXHRcdHRoaXMudG9wID0gdG9wO1xyXG5cdFx0dGhpcy5yaWdodCA9IHJpZ2h0O1xyXG5cdFx0dGhpcy5ib3R0b20gPSBib3R0b207XHJcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZGRpbmdEZWZpbml0aW9uIHtcclxuXHR0b3A6IEVudW1zLlNwYWNpbmcgPSBFbnVtcy5TcGFjaW5nLk5vbmU7XHJcblx0cmlnaHQ6IEVudW1zLlNwYWNpbmcgPSBFbnVtcy5TcGFjaW5nLk5vbmU7XHJcblx0Ym90dG9tOiBFbnVtcy5TcGFjaW5nID0gRW51bXMuU3BhY2luZy5Ob25lO1xyXG5cdGxlZnQ6IEVudW1zLlNwYWNpbmcgPSBFbnVtcy5TcGFjaW5nLk5vbmU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHRvcDogRW51bXMuU3BhY2luZyA9IEVudW1zLlNwYWNpbmcuTm9uZSxcclxuXHRcdHJpZ2h0OiBFbnVtcy5TcGFjaW5nID0gRW51bXMuU3BhY2luZy5Ob25lLFxyXG5cdFx0Ym90dG9tOiBFbnVtcy5TcGFjaW5nID0gRW51bXMuU3BhY2luZy5Ob25lLFxyXG5cdFx0bGVmdDogRW51bXMuU3BhY2luZyA9IEVudW1zLlNwYWNpbmcuTm9uZSkge1xyXG5cdFx0dGhpcy50b3AgPSB0b3A7XHJcblx0XHR0aGlzLnJpZ2h0ID0gcmlnaHQ7XHJcblx0XHR0aGlzLmJvdHRvbSA9IGJvdHRvbTtcclxuXHRcdHRoaXMubGVmdCA9IGxlZnQ7XHJcblx0fVxyXG5cclxuXHR0b1NwYWNpbmdEZWZpbml0aW9uKGhvc3RDb25maWc6IEhvc3RDb25maWcuSG9zdENvbmZpZyk6IFNwYWNpbmdEZWZpbml0aW9uIHtcclxuXHRcdHJldHVybiBuZXcgU3BhY2luZ0RlZmluaXRpb24oXHJcblx0XHRcdGhvc3RDb25maWcuZ2V0RWZmZWN0aXZlU3BhY2luZyh0aGlzLnRvcCksXHJcblx0XHRcdGhvc3RDb25maWcuZ2V0RWZmZWN0aXZlU3BhY2luZyh0aGlzLnJpZ2h0KSxcclxuXHRcdFx0aG9zdENvbmZpZy5nZXRFZmZlY3RpdmVTcGFjaW5nKHRoaXMuYm90dG9tKSxcclxuXHRcdFx0aG9zdENvbmZpZy5nZXRFZmZlY3RpdmVTcGFjaW5nKHRoaXMubGVmdCkpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpemVBbmRVbml0IHtcclxuXHRwaHlzaWNhbFNpemU6IG51bWJlcjtcclxuXHR1bml0OiBFbnVtcy5TaXplVW5pdDtcclxuXHJcblx0c3RhdGljIHBhcnNlKGlucHV0OiBhbnkpOiBTaXplQW5kVW5pdCB7XHJcblx0XHRsZXQgcmVzdWx0ID0gbmV3IFNpemVBbmRVbml0KDAsIEVudW1zLlNpemVVbml0LldlaWdodCk7XHJcblxyXG5cdFx0bGV0IHJlZ0V4cCA9IC9eKFswLTldKykocHh8XFwqKT8kL2c7XHJcblx0XHRsZXQgbWF0Y2hlcyA9IHJlZ0V4cC5leGVjKGlucHV0KTtcclxuXHJcblx0XHRpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+PSAyKSB7XHJcblx0XHRcdHJlc3VsdC5waHlzaWNhbFNpemUgPSBwYXJzZUludChtYXRjaGVzWzFdKTtcclxuXHJcblx0XHRcdGlmIChtYXRjaGVzLmxlbmd0aCA9PSAzKSB7XHJcblx0XHRcdFx0aWYgKG1hdGNoZXNbMl0gPT0gXCJweFwiKSB7XHJcblx0XHRcdFx0XHRyZXN1bHQudW5pdCA9IEVudW1zLlNpemVVbml0LlBpeGVsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNpemU6IFwiICsgaW5wdXQpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IocGh5c2ljYWxTaXplOiBudW1iZXIsIHVuaXQ6IEVudW1zLlNpemVVbml0KSB7XHJcblx0XHR0aGlzLnBoeXNpY2FsU2l6ZSA9IHBoeXNpY2FsU2l6ZTtcclxuXHRcdHRoaXMudW5pdCA9IHVuaXQ7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZXNvdXJjZUluZm9ybWF0aW9uIHtcclxuXHR1cmw6IHN0cmluZztcclxuXHRtaW1lVHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDYXJkT2JqZWN0IHtcclxuXHRzaG91bGRGYWxsYmFjaygpOiBib29sZWFuO1xyXG5cdHNldFBhcmVudChwYXJlbnQ6IENhcmRFbGVtZW50KTtcclxuXHRwYXJzZShqc29uOiBhbnkpO1xyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2FyZEVsZW1lbnQgaW1wbGVtZW50cyBJQ2FyZE9iamVjdCB7XHJcblx0cHJpdmF0ZSBfc2hvdWxkRmFsbGJhY2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIF9sYW5nOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcblx0cHJpdmF0ZSBfaG9zdENvbmZpZz86IEhvc3RDb25maWcuSG9zdENvbmZpZyA9IG51bGw7XHJcblx0cHJpdmF0ZSBfaW50ZXJuYWxQYWRkaW5nOiBQYWRkaW5nRGVmaW5pdGlvbiA9IG51bGw7XHJcblx0cHJpdmF0ZSBfcGFyZW50OiBDYXJkRWxlbWVudCA9IG51bGw7XHJcblx0cHJpdmF0ZSBfcmVuZGVyZWRFbGVtZW50OiBIVE1MRWxlbWVudCA9IG51bGw7XHJcblx0cHJpdmF0ZSBfc2VwYXJhdG9yRWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xyXG5cdHByaXZhdGUgX2lzVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblx0cHJpdmF0ZSBfdHJ1bmNhdGVkRHVlVG9PdmVyZmxvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX2RlZmF1bHRSZW5kZXJlZEVsZW1lbnREaXNwbGF5TW9kZTogc3RyaW5nID0gbnVsbDtcclxuXHRwcml2YXRlIF9wYWRkaW5nOiBQYWRkaW5nRGVmaW5pdGlvbiA9IG51bGw7XHJcblxyXG5cdHByaXZhdGUgaW50ZXJuYWxSZW5kZXJTZXBhcmF0b3IoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIFV0aWxzLnJlbmRlclNlcGFyYXRpb24oXHJcblx0XHRcdHtcclxuXHRcdFx0XHRzcGFjaW5nOiB0aGlzLmhvc3RDb25maWcuZ2V0RWZmZWN0aXZlU3BhY2luZyh0aGlzLnNwYWNpbmcpLFxyXG5cdFx0XHRcdGxpbmVUaGlja25lc3M6IHRoaXMuc2VwYXJhdG9yID8gdGhpcy5ob3N0Q29uZmlnLnNlcGFyYXRvci5saW5lVGhpY2tuZXNzIDogbnVsbCxcclxuXHRcdFx0XHRsaW5lQ29sb3I6IHRoaXMuc2VwYXJhdG9yID8gdGhpcy5ob3N0Q29uZmlnLnNlcGFyYXRvci5saW5lQ29sb3IgOiBudWxsXHJcblx0XHRcdH0sXHJcblx0XHRcdHRoaXMuc2VwYXJhdG9yT3JpZW50YXRpb24pO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB1cGRhdGVSZW5kZXJlZEVsZW1lbnRWaXNpYmlsaXR5KCkge1xyXG5cdFx0aWYgKHRoaXMuX3JlbmRlcmVkRWxlbWVudCkge1xyXG5cdFx0XHR0aGlzLl9yZW5kZXJlZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IHRoaXMuX2lzVmlzaWJsZSA/IHRoaXMuX2RlZmF1bHRSZW5kZXJlZEVsZW1lbnREaXNwbGF5TW9kZSA6IFwibm9uZVwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9zZXBhcmF0b3JFbGVtZW50KSB7XHJcblx0XHRcdGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5pc0ZpcnN0RWxlbWVudCh0aGlzKSkge1xyXG5cdFx0XHRcdHRoaXMuX3NlcGFyYXRvckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3NlcGFyYXRvckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IHRoaXMuX2lzVmlzaWJsZSA/IHRoaXMuX2RlZmF1bHRSZW5kZXJlZEVsZW1lbnREaXNwbGF5TW9kZSA6IFwibm9uZVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGhpZGVFbGVtZW50RHVlVG9PdmVyZmxvdygpIHtcclxuXHRcdGlmICh0aGlzLl9yZW5kZXJlZEVsZW1lbnQgJiYgdGhpcy5faXNWaXNpYmxlKSB7XHJcblx0XHRcdHRoaXMuX3JlbmRlcmVkRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcblx0XHRcdHRoaXMuX2lzVmlzaWJsZSA9IGZhbHNlO1xyXG5cdFx0XHRyYWlzZUVsZW1lbnRWaXNpYmlsaXR5Q2hhbmdlZEV2ZW50KHRoaXMsIGZhbHNlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2hvd0VsZW1lbnRIaWRkZW5EdWVUb092ZXJmbG93KCkge1xyXG5cdFx0aWYgKHRoaXMuX3JlbmRlcmVkRWxlbWVudCAmJiAhdGhpcy5faXNWaXNpYmxlKSB7XHJcblx0XHRcdHRoaXMuX3JlbmRlcmVkRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gbnVsbDtcclxuXHRcdFx0dGhpcy5faXNWaXNpYmxlID0gdHJ1ZTtcclxuXHRcdFx0cmFpc2VFbGVtZW50VmlzaWJpbGl0eUNoYW5nZWRFdmVudCh0aGlzLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBNYXJrZWQgcHJpdmF0ZSB0byBlbXVsYXRlIGludGVybmFsIGFjY2Vzc1xyXG5cdHByaXZhdGUgaGFuZGxlT3ZlcmZsb3cobWF4SGVpZ2h0OiBudW1iZXIpIHtcclxuXHRcdGlmICh0aGlzLmlzVmlzaWJsZSB8fCB0aGlzLmlzSGlkZGVuRHVlVG9PdmVyZmxvdygpKSB7XHJcblx0XHRcdHZhciBoYW5kbGVkID0gdGhpcy50cnVuY2F0ZU92ZXJmbG93KG1heEhlaWdodCk7XHJcblxyXG5cdFx0XHQvLyBFdmVuIGlmIHdlIHdlcmUgdW5hYmxlIHRvIHRydW5jYXRlIHRoZSBlbGVtZW50IHRvIGZpdCB0aGlzIHRpbWUsXHJcblx0XHRcdC8vIGl0IHN0aWxsIGNvdWxkIGhhdmUgYmVlbiBwcmV2aW91c2x5IHRydW5jYXRlZFxyXG5cdFx0XHR0aGlzLl90cnVuY2F0ZWREdWVUb092ZXJmbG93ID0gaGFuZGxlZCB8fCB0aGlzLl90cnVuY2F0ZWREdWVUb092ZXJmbG93O1xyXG5cclxuXHRcdFx0aWYgKCFoYW5kbGVkKSB7XHJcblx0XHRcdFx0dGhpcy5oaWRlRWxlbWVudER1ZVRvT3ZlcmZsb3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChoYW5kbGVkICYmICF0aGlzLl9pc1Zpc2libGUpIHtcclxuXHRcdFx0XHR0aGlzLnNob3dFbGVtZW50SGlkZGVuRHVlVG9PdmVyZmxvdygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBNYXJrZWQgcHJpdmF0ZSB0byBlbXVsYXRlIGludGVybmFsIGFjY2Vzc1xyXG5cdHByaXZhdGUgcmVzZXRPdmVyZmxvdygpOiBib29sZWFuIHtcclxuXHRcdHZhciBzaXplQ2hhbmdlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLl90cnVuY2F0ZWREdWVUb092ZXJmbG93KSB7XHJcblx0XHRcdHRoaXMudW5kb092ZXJmbG93VHJ1bmNhdGlvbigpO1xyXG5cdFx0XHR0aGlzLl90cnVuY2F0ZWREdWVUb092ZXJmbG93ID0gZmFsc2U7XHJcblx0XHRcdHNpemVDaGFuZ2VkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5pc0hpZGRlbkR1ZVRvT3ZlcmZsb3cpIHtcclxuXHRcdFx0dGhpcy5zaG93RWxlbWVudEhpZGRlbkR1ZVRvT3ZlcmZsb3coKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc2l6ZUNoYW5nZWQ7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY3JlYXRlUGxhY2Vob2xkZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdGVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCIxcHggZGFzaGVkICNERERERERcIjtcclxuXHRcdGVsZW1lbnQuc3R5bGUucGFkZGluZyA9IFwiNHB4XCI7XHJcblx0XHRlbGVtZW50LnN0eWxlLm1pbkhlaWdodCA9IFwiMzJweFwiO1xyXG5cdFx0ZWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiMTBweFwiO1xyXG5cdFx0ZWxlbWVudC5pbm5lclRleHQgPSBcIkVtcHR5IFwiICsgdGhpcy5nZXRKc29uVHlwZU5hbWUoKTtcclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBpbnRlcm5hbEdldE5vblplcm9QYWRkaW5nKHBhZGRpbmc6IFBhZGRpbmdEZWZpbml0aW9uLFxyXG5cdFx0cHJvY2Vzc1RvcDogYm9vbGVhbiA9IHRydWUsXHJcblx0XHRwcm9jZXNzUmlnaHQ6IGJvb2xlYW4gPSB0cnVlLFxyXG5cdFx0cHJvY2Vzc0JvdHRvbTogYm9vbGVhbiA9IHRydWUsXHJcblx0XHRwcm9jZXNzTGVmdDogYm9vbGVhbiA9IHRydWUpIHtcclxuXHRcdGlmIChwcm9jZXNzVG9wKSB7XHJcblx0XHRcdGlmIChwYWRkaW5nLnRvcCA9PSBFbnVtcy5TcGFjaW5nLk5vbmUpIHtcclxuXHRcdFx0XHRwYWRkaW5nLnRvcCA9IHRoaXMuaW50ZXJuYWxQYWRkaW5nLnRvcDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChwcm9jZXNzUmlnaHQpIHtcclxuXHRcdFx0aWYgKHBhZGRpbmcucmlnaHQgPT0gRW51bXMuU3BhY2luZy5Ob25lKSB7XHJcblx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHRoaXMuaW50ZXJuYWxQYWRkaW5nLnJpZ2h0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHByb2Nlc3NCb3R0b20pIHtcclxuXHRcdFx0aWYgKHBhZGRpbmcuYm90dG9tID09IEVudW1zLlNwYWNpbmcuTm9uZSkge1xyXG5cdFx0XHRcdHBhZGRpbmcuYm90dG9tID0gdGhpcy5pbnRlcm5hbFBhZGRpbmcuYm90dG9tO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHByb2Nlc3NMZWZ0KSB7XHJcblx0XHRcdGlmIChwYWRkaW5nLmxlZnQgPT0gRW51bXMuU3BhY2luZy5Ob25lKSB7XHJcblx0XHRcdFx0cGFkZGluZy5sZWZ0ID0gdGhpcy5pbnRlcm5hbFBhZGRpbmcubGVmdDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnBhcmVudCkge1xyXG5cdFx0XHR0aGlzLnBhcmVudC5pbnRlcm5hbEdldE5vblplcm9QYWRkaW5nKFxyXG5cdFx0XHRcdHBhZGRpbmcsXHJcblx0XHRcdFx0cHJvY2Vzc1RvcCAmJiB0aGlzLmlzQXRUaGVWZXJ5VG9wKCksXHJcblx0XHRcdFx0cHJvY2Vzc1JpZ2h0ICYmIHRoaXMuaXNBdFRoZVZlcnlSaWdodCgpLFxyXG5cdFx0XHRcdHByb2Nlc3NCb3R0b20gJiYgdGhpcy5pc0F0VGhlVmVyeUJvdHRvbSgpLFxyXG5cdFx0XHRcdHByb2Nlc3NMZWZ0ICYmIHRoaXMuaXNBdFRoZVZlcnlMZWZ0KCkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFkanVzdFJlbmRlcmVkRWxlbWVudFNpemUocmVuZGVyZWRFbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0aWYgKHRoaXMuaGVpZ2h0ID09PSBcImF1dG9cIikge1xyXG5cdFx0XHRyZW5kZXJlZEVsZW1lbnQuc3R5bGUuZmxleCA9IFwiMCAwIGF1dG9cIjtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZW5kZXJlZEVsZW1lbnQuc3R5bGUuZmxleCA9IFwiMSAxIGF1dG9cIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBpbnRlcm5hbFJlbmRlcigpOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAvKlxyXG4gICAgICogQ2FsbGVkIHdoZW4gdGhpcyBlbGVtZW50IG92ZXJmbG93cyB0aGUgYm90dG9tIG9mIHRoZSBjYXJkLlxyXG4gICAgICogbWF4SGVpZ2h0IHdpbGwgYmUgdGhlIGFtb3VudCBvZiBzcGFjZSBzdGlsbCBhdmFpbGFibGUgb24gdGhlIGNhcmQgKDAgaWZcclxuICAgICAqIHRoZSBlbGVtZW50IGlzIGZ1bGx5IG9mZiB0aGUgY2FyZCkuXHJcbiAgICAgKi9cclxuXHRwcm90ZWN0ZWQgdHJ1bmNhdGVPdmVyZmxvdyhtYXhIZWlnaHQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0Ly8gQ2hpbGQgaW1wbGVtZW50YXRpb25zIHNob3VsZCByZXR1cm4gdHJ1ZSBpZiB0aGUgZWxlbWVudCBoYW5kbGVkXHJcblx0XHQvLyB0aGUgdHJ1bmNhdGlvbiByZXF1ZXN0IHN1Y2ggdGhhdCBpdHMgY29udGVudCBmaXRzIHdpdGhpbiBtYXhIZWlnaHQsXHJcblx0XHQvLyBmYWxzZSBpZiB0aGUgZWxlbWVudCBzaG91bGQgZmFsbCBiYWNrIHRvIGJlaW5nIGhpZGRlblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogVGhpcyBzaG91bGQgcmV2ZXJzZSBhbnkgY2hhbmdlcyBwZXJmb3JtZWQgaW4gdHJ1bmNhdGVPdmVyZmxvdygpLlxyXG4gICAgICovXHJcblx0cHJvdGVjdGVkIHVuZG9PdmVyZmxvd1RydW5jYXRpb24oKSB7IH1cclxuXHJcblx0cHJvdGVjdGVkIGlzRGVzaWduTW9kZSgpOiBib29sZWFuIHtcclxuXHRcdHZhciByb290RWxlbWVudCA9IHRoaXMuZ2V0Um9vdEVsZW1lbnQoKTtcclxuXHJcblx0XHRyZXR1cm4gcm9vdEVsZW1lbnQgaW5zdGFuY2VvZiBBZGFwdGl2ZUNhcmQgJiYgcm9vdEVsZW1lbnQuZGVzaWduTW9kZTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXQgdXNlRGVmYXVsdFNpemluZygpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldCBhbGxvd0N1c3RvbVBhZGRpbmcoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXQgZGVmYXVsdFBhZGRpbmcoKTogUGFkZGluZ0RlZmluaXRpb24ge1xyXG5cdFx0cmV0dXJuIG5ldyBQYWRkaW5nRGVmaW5pdGlvbigpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldCBpbnRlcm5hbFBhZGRpbmcoKTogUGFkZGluZ0RlZmluaXRpb24ge1xyXG5cdFx0aWYgKHRoaXMuX3BhZGRpbmcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3BhZGRpbmc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuICh0aGlzLl9pbnRlcm5hbFBhZGRpbmcgJiYgdGhpcy5hbGxvd0N1c3RvbVBhZGRpbmcpID8gdGhpcy5faW50ZXJuYWxQYWRkaW5nIDogdGhpcy5kZWZhdWx0UGFkZGluZztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBzZXQgaW50ZXJuYWxQYWRkaW5nKHZhbHVlOiBQYWRkaW5nRGVmaW5pdGlvbikge1xyXG5cdFx0dGhpcy5faW50ZXJuYWxQYWRkaW5nID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0IHNlcGFyYXRvck9yaWVudGF0aW9uKCk6IEVudW1zLk9yaWVudGF0aW9uIHtcclxuXHRcdHJldHVybiBFbnVtcy5PcmllbnRhdGlvbi5Ib3Jpem9udGFsO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldFBhZGRpbmcoKTogUGFkZGluZ0RlZmluaXRpb24ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhZGRpbmc7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgc2V0UGFkZGluZyh2YWx1ZTogUGFkZGluZ0RlZmluaXRpb24pIHtcclxuXHRcdHRoaXMuX3BhZGRpbmcgPSB2YWx1ZTtcclxuXHJcblx0XHRpZiAodGhpcy5fcGFkZGluZykge1xyXG5cdFx0XHRBZGFwdGl2ZUNhcmQudXNlQXV0b21hdGljQ29udGFpbmVyQmxlZWRpbmcgPSBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlYWRvbmx5IHJlcXVpcmVzID0gbmV3IEhvc3RDb25maWcuSG9zdENhcGFiaWxpdGllcygpO1xyXG5cclxuXHRpZDogc3RyaW5nO1xyXG5cdHNwZWFrOiBzdHJpbmc7XHJcblx0aG9yaXpvbnRhbEFsaWdubWVudD86IEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQgPSBudWxsO1xyXG5cdHNwYWNpbmc6IEVudW1zLlNwYWNpbmcgPSBFbnVtcy5TcGFjaW5nLkRlZmF1bHQ7XHJcblx0c2VwYXJhdG9yOiBib29sZWFuID0gZmFsc2U7XHJcblx0aGVpZ2h0OiBcImF1dG9cIiB8IFwic3RyZXRjaFwiID0gXCJhdXRvXCI7XHJcblx0Y3VzdG9tQ3NzU2VsZWN0b3I6IHN0cmluZyA9IG51bGw7XHJcblxyXG5cdGFic3RyYWN0IGdldEpzb25UeXBlTmFtZSgpOiBzdHJpbmc7XHJcblx0YWJzdHJhY3QgcmVuZGVyU3BlZWNoKCk6IHN0cmluZztcclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJ0eXBlXCIsIHRoaXMuZ2V0SnNvblR5cGVOYW1lKCkpO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImlkXCIsIHRoaXMuaWQpO1xyXG5cclxuXHRcdGlmICh0aGlzLmhvcml6b250YWxBbGlnbm1lbnQgIT09IG51bGwpIHtcclxuXHRcdFx0VXRpbHMuc2V0RW51bVByb3BlcnR5KEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQsIHJlc3VsdCwgXCJob3Jpem9udGFsQWxpZ25tZW50XCIsIHRoaXMuaG9yaXpvbnRhbEFsaWdubWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0VXRpbHMuc2V0RW51bVByb3BlcnR5KEVudW1zLlNwYWNpbmcsIHJlc3VsdCwgXCJzcGFjaW5nXCIsIHRoaXMuc3BhY2luZywgRW51bXMuU3BhY2luZy5EZWZhdWx0KTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJzZXBhcmF0b3JcIiwgdGhpcy5zZXBhcmF0b3IsIGZhbHNlKTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQsIFwiYXV0b1wiKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0c2V0UGFyZW50KHZhbHVlOiBDYXJkRWxlbWVudCkge1xyXG5cdFx0dGhpcy5fcGFyZW50ID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRnZXROb25aZXJvUGFkZGluZygpOiBQYWRkaW5nRGVmaW5pdGlvbiB7XHJcblx0XHR2YXIgcGFkZGluZzogUGFkZGluZ0RlZmluaXRpb24gPSBuZXcgUGFkZGluZ0RlZmluaXRpb24oKTtcclxuXHJcblx0XHR0aGlzLmludGVybmFsR2V0Tm9uWmVyb1BhZGRpbmcocGFkZGluZyk7XHJcblxyXG5cdFx0cmV0dXJuIHBhZGRpbmc7XHJcblx0fVxyXG5cclxuXHRnZXRGb3JiaWRkZW5FbGVtZW50VHlwZXMoKTogQXJyYXk8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldEZvcmJpZGRlbkFjdGlvblR5cGVzKCk6IEFycmF5PGFueT4ge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRwYXJzZShqc29uOiBhbnksIGVycm9ycz86IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pIHtcclxuXHRcdHJhaXNlUGFyc2VFbGVtZW50RXZlbnQodGhpcywganNvbiwgZXJyb3JzKTtcclxuXHJcblx0XHR0aGlzLnJlcXVpcmVzLnBhcnNlKGpzb25bXCJyZXF1aXJlc1wiXSwgZXJyb3JzKTtcclxuXHRcdHRoaXMuaWQgPSBqc29uW1wiaWRcIl07XHJcblx0XHR0aGlzLnNwZWFrID0ganNvbltcInNwZWFrXCJdO1xyXG5cdFx0dGhpcy5ob3Jpem9udGFsQWxpZ25tZW50ID0gVXRpbHMuZ2V0RW51bVZhbHVlT3JEZWZhdWx0KEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQsIGpzb25bXCJob3Jpem9udGFsQWxpZ25tZW50XCJdLCBudWxsKTtcclxuXHJcblx0XHR0aGlzLnNwYWNpbmcgPSBVdGlscy5nZXRFbnVtVmFsdWVPckRlZmF1bHQoRW51bXMuU3BhY2luZywganNvbltcInNwYWNpbmdcIl0sIEVudW1zLlNwYWNpbmcuRGVmYXVsdCk7XHJcblx0XHR0aGlzLnNlcGFyYXRvciA9IGpzb25bXCJzZXBhcmF0b3JcIl07XHJcblxyXG5cdFx0dmFyIGpzb25TZXBhcmF0aW9uID0ganNvbltcInNlcGFyYXRpb25cIl07XHJcblxyXG5cdFx0aWYgKGpzb25TZXBhcmF0aW9uICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aWYgKGpzb25TZXBhcmF0aW9uID09PSBcIm5vbmVcIikge1xyXG5cdFx0XHRcdHRoaXMuc3BhY2luZyA9IEVudW1zLlNwYWNpbmcuTm9uZTtcclxuXHRcdFx0XHR0aGlzLnNlcGFyYXRvciA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGpzb25TZXBhcmF0aW9uID09PSBcInN0cm9uZ1wiKSB7XHJcblx0XHRcdFx0dGhpcy5zcGFjaW5nID0gRW51bXMuU3BhY2luZy5MYXJnZTtcclxuXHRcdFx0XHR0aGlzLnNlcGFyYXRvciA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoanNvblNlcGFyYXRpb24gPT09IFwiZGVmYXVsdFwiKSB7XHJcblx0XHRcdFx0dGhpcy5zcGFjaW5nID0gRW51bXMuU3BhY2luZy5EZWZhdWx0O1xyXG5cdFx0XHRcdHRoaXMuc2VwYXJhdG9yID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhaXNlUGFyc2VFcnJvcihcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLkRlcHJlY2F0ZWQsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBcIlRoZSBcXFwic2VwYXJhdGlvblxcXCIgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkLiBVc2UgdGhlIFxcXCJzcGFjaW5nXFxcIiBhbmQgXFxcInNlcGFyYXRvclxcXCIgcHJvcGVydGllcyBpbnN0ZWFkLlwiXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcnNcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIganNvbkhlaWdodCA9IGpzb25bXCJoZWlnaHRcIl07XHJcblxyXG5cdFx0aWYgKGpzb25IZWlnaHQgPT09IFwiYXV0b1wiIHx8IGpzb25IZWlnaHQgPT09IFwic3RyZXRjaFwiKSB7XHJcblx0XHRcdHRoaXMuaGVpZ2h0ID0ganNvbkhlaWdodDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldEFjdGlvbkNvdW50KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdGdldEFjdGlvbkF0KGluZGV4OiBudW1iZXIpOiBBY3Rpb24ge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW5kZXggb3V0IG9mIHJhbmdlLlwiKTtcclxuXHR9XHJcblxyXG5cdHZhbGlkYXRlKCk6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4ge1xyXG5cdFx0cmV0dXJuIFtdO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKCk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50IGluc3RhbmNlb2YgQ2FyZEVsZW1lbnRDb250YWluZXIpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50LnJlbW92ZUl0ZW0odGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHRoaXMuX3JlbmRlcmVkRWxlbWVudCA9IHRoaXMuaW50ZXJuYWxSZW5kZXIoKTtcclxuXHRcdHRoaXMuX3NlcGFyYXRvckVsZW1lbnQgPSB0aGlzLmludGVybmFsUmVuZGVyU2VwYXJhdG9yKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3JlbmRlcmVkRWxlbWVudCkge1xyXG5cdFx0XHRpZiAodGhpcy5jdXN0b21Dc3NTZWxlY3Rvcikge1xyXG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVkRWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY3VzdG9tQ3NzU2VsZWN0b3IpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9yZW5kZXJlZEVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gXCJib3JkZXItYm94XCI7XHJcblx0XHRcdHRoaXMuX2RlZmF1bHRSZW5kZXJlZEVsZW1lbnREaXNwbGF5TW9kZSA9IHRoaXMuX3JlbmRlcmVkRWxlbWVudC5zdHlsZS5kaXNwbGF5O1xyXG5cclxuXHRcdFx0dGhpcy5hZGp1c3RSZW5kZXJlZEVsZW1lbnRTaXplKHRoaXMuX3JlbmRlcmVkRWxlbWVudCk7XHJcblx0XHRcdHRoaXMudXBkYXRlTGF5b3V0KGZhbHNlKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHRoaXMuaXNEZXNpZ25Nb2RlKCkpIHtcclxuXHRcdFx0dGhpcy5fcmVuZGVyZWRFbGVtZW50ID0gdGhpcy5jcmVhdGVQbGFjZWhvbGRlckVsZW1lbnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcmVuZGVyZWRFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlTGF5b3V0KHByb2Nlc3NDaGlsZHJlbjogYm9vbGVhbiA9IHRydWUpIHtcclxuXHRcdHRoaXMudXBkYXRlUmVuZGVyZWRFbGVtZW50VmlzaWJpbGl0eSgpO1xyXG5cdH1cclxuXHJcblx0aW5kZXhPZihjYXJkRWxlbWVudDogQ2FyZEVsZW1lbnQpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHJcblx0aXNSZW5kZXJlZCgpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9yZW5kZXJlZEVsZW1lbnQgJiYgdGhpcy5fcmVuZGVyZWRFbGVtZW50Lm9mZnNldEhlaWdodCA+IDA7XHJcblx0fVxyXG5cclxuXHRpc0F0VGhlVmVyeVRvcCgpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmlzRmlyc3RFbGVtZW50KHRoaXMpICYmIHRoaXMucGFyZW50LmlzQXRUaGVWZXJ5VG9wKCkgOiB0cnVlO1xyXG5cdH1cclxuXHJcblx0aXNGaXJzdEVsZW1lbnQoZWxlbWVudDogQ2FyZEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0aXNBdFRoZVZlcnlCb3R0b20oKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5pc0xhc3RFbGVtZW50KHRoaXMpICYmIHRoaXMucGFyZW50LmlzQXRUaGVWZXJ5Qm90dG9tKCkgOiB0cnVlO1xyXG5cdH1cclxuXHJcblx0aXNMYXN0RWxlbWVudChlbGVtZW50OiBDYXJkRWxlbWVudCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRpc0F0VGhlVmVyeUxlZnQoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5pc0xlZnRNb3N0RWxlbWVudCh0aGlzKSAmJiB0aGlzLnBhcmVudC5pc0F0VGhlVmVyeUxlZnQoKSA6IHRydWU7XHJcblx0fVxyXG5cclxuXHRpc0JsZWVkaW5nKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aXNMZWZ0TW9zdEVsZW1lbnQoZWxlbWVudDogQ2FyZEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0aXNBdFRoZVZlcnlSaWdodCgpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmlzUmlnaHRNb3N0RWxlbWVudCh0aGlzKSAmJiB0aGlzLnBhcmVudC5pc0F0VGhlVmVyeVJpZ2h0KCkgOiB0cnVlO1xyXG5cdH1cclxuXHJcblx0aXNSaWdodE1vc3RFbGVtZW50KGVsZW1lbnQ6IENhcmRFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGlzSGlkZGVuRHVlVG9PdmVyZmxvdygpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9yZW5kZXJlZEVsZW1lbnQgJiYgdGhpcy5fcmVuZGVyZWRFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPT0gJ2hpZGRlbic7XHJcblx0fVxyXG5cclxuXHRjYW5Db250ZW50QmxlZWQoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5jYW5Db250ZW50QmxlZWQoKSA6IHRydWU7XHJcblx0fVxyXG5cclxuXHRnZXRSb290RWxlbWVudCgpOiBDYXJkRWxlbWVudCB7XHJcblx0XHR2YXIgcm9vdEVsZW1lbnQ6IENhcmRFbGVtZW50ID0gdGhpcztcclxuXHJcblx0XHR3aGlsZSAocm9vdEVsZW1lbnQucGFyZW50KSB7XHJcblx0XHRcdHJvb3RFbGVtZW50ID0gcm9vdEVsZW1lbnQucGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByb290RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdGdldFBhcmVudENvbnRhaW5lcigpOiBDb250YWluZXIge1xyXG5cdFx0dmFyIGN1cnJlbnRFbGVtZW50OiBDYXJkRWxlbWVudCA9IHRoaXMucGFyZW50O1xyXG5cclxuXHRcdHdoaWxlIChjdXJyZW50RWxlbWVudCkge1xyXG5cdFx0XHRpZiAoY3VycmVudEVsZW1lbnQgaW5zdGFuY2VvZiBDb250YWluZXIpIHtcclxuXHRcdFx0XHRyZXR1cm4gPENvbnRhaW5lcj5jdXJyZW50RWxlbWVudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y3VycmVudEVsZW1lbnQgPSBjdXJyZW50RWxlbWVudC5wYXJlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRnZXRBbGxJbnB1dHMoKTogQXJyYXk8SW5wdXQ+IHtcclxuXHRcdHJldHVybiBbXTtcclxuXHR9XHJcblxyXG5cdGdldFJlc291cmNlSW5mb3JtYXRpb24oKTogQXJyYXk8SVJlc291cmNlSW5mb3JtYXRpb24+IHtcclxuXHRcdHJldHVybiBbXTtcclxuXHR9XHJcblxyXG5cdGdldEVsZW1lbnRCeUlkKGlkOiBzdHJpbmcpOiBDYXJkRWxlbWVudCB7XHJcblx0XHRyZXR1cm4gdGhpcy5pZCA9PT0gaWQgPyB0aGlzIDogbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldEFjdGlvbkJ5SWQoaWQ6IHN0cmluZyk6IEFjdGlvbiB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHNob3VsZEZhbGxiYWNrKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Nob3VsZEZhbGxiYWNrIHx8ICF0aGlzLnJlcXVpcmVzLmFyZUFsbE1ldCh0aGlzLmhvc3RDb25maWcuaG9zdENhcGFiaWxpdGllcyk7XHJcblx0fVxyXG5cclxuXHRzZXRTaG91bGRGYWxsYmFjayh2YWx1ZTogYm9vbGVhbikge1xyXG5cdFx0dGhpcy5fc2hvdWxkRmFsbGJhY2sgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGdldCBsYW5nKCk6IHN0cmluZyB7XHJcblx0XHRpZiAodGhpcy5fbGFuZykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fbGFuZztcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5wYXJlbnQpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQubGFuZztcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXQgbGFuZyh2YWx1ZTogc3RyaW5nKSB7XHJcblx0XHRpZiAodmFsdWUgJiYgdmFsdWUgIT0gXCJcIikge1xyXG5cdFx0XHR2YXIgcmVnRXggPSAvXlthLXpdezIsM30kL2lnO1xyXG5cclxuXHRcdFx0dmFyIG1hdGNoZXMgPSByZWdFeC5leGVjKHZhbHVlKTtcclxuXHJcblx0XHRcdGlmICghbWF0Y2hlcykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbGFuZ3VhZ2UgaWRlbnRpZmllcjogXCIgKyB2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9sYW5nID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRnZXQgaG9zdENvbmZpZygpOiBIb3N0Q29uZmlnLkhvc3RDb25maWcge1xyXG5cdFx0aWYgKHRoaXMuX2hvc3RDb25maWcpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2hvc3RDb25maWc7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMucGFyZW50KSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGFyZW50Lmhvc3RDb25maWc7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGRlZmF1bHRIb3N0Q29uZmlnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXQgaG9zdENvbmZpZyh2YWx1ZTogSG9zdENvbmZpZy5Ib3N0Q29uZmlnKSB7XHJcblx0XHR0aGlzLl9ob3N0Q29uZmlnID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRnZXQgaW5kZXgoKTogbnVtYmVyIHtcclxuXHRcdGlmICh0aGlzLnBhcmVudCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQuaW5kZXhPZih0aGlzKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBpc0ludGVyYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzU3RhbmRhbG9uZSgpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0Z2V0IHBhcmVudCgpOiBDYXJkRWxlbWVudCB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50O1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9pc1Zpc2libGU7XHJcblx0fVxyXG5cclxuXHRnZXQgaGFzVmlzaWJsZVNlcGFyYXRvcigpOiBib29sZWFuIHtcclxuXHRcdHZhciBwYXJlbnRDb250YWluZXIgPSB0aGlzLmdldFBhcmVudENvbnRhaW5lcigpO1xyXG5cclxuXHRcdGlmIChwYXJlbnRDb250YWluZXIpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VwYXJhdG9yRWxlbWVudCAmJiAhcGFyZW50Q29udGFpbmVyLmlzRmlyc3RFbGVtZW50KHRoaXMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldCBpc1Zpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuXHRcdC8vIElmIHRoZSBlbGVtZW50IGlzIGdvaW5nIHRvIGJlIGhpZGRlbiwgcmVzZXQgYW55IGNoYW5nZXMgdGhhdCB3ZXJlIGR1ZVxyXG5cdFx0Ly8gdG8gb3ZlcmZsb3cgdHJ1bmNhdGlvbiAodGhpcyBlbnN1cmVzIHRoYXQgaWYgdGhlIGVsZW1lbnQgaXMgbGF0ZXJcclxuXHRcdC8vIHVuLWhpZGRlbiBpdCBoYXMgdGhlIHJpZ2h0IGNvbnRlbnQpXHJcblx0XHRpZiAoQWRhcHRpdmVDYXJkLnVzZUFkdmFuY2VkQ2FyZEJvdHRvbVRydW5jYXRpb24gJiYgIXZhbHVlKSB7XHJcblx0XHRcdHRoaXMudW5kb092ZXJmbG93VHJ1bmNhdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLl9pc1Zpc2libGUgIT0gdmFsdWUpIHtcclxuXHRcdFx0dGhpcy5faXNWaXNpYmxlID0gdmFsdWU7XHJcblxyXG5cdFx0XHR0aGlzLnVwZGF0ZVJlbmRlcmVkRWxlbWVudFZpc2liaWxpdHkoKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9yZW5kZXJlZEVsZW1lbnQpIHtcclxuXHRcdFx0XHRyYWlzZUVsZW1lbnRWaXNpYmlsaXR5Q2hhbmdlZEV2ZW50KHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgcmVuZGVyZWRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLl9yZW5kZXJlZEVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRnZXQgc2VwYXJhdG9yRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc2VwYXJhdG9yRWxlbWVudDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYXJkRWxlbWVudENvbnRhaW5lciBleHRlbmRzIENhcmRFbGVtZW50IHtcclxuXHRhYnN0cmFjdCBnZXRJdGVtQ291bnQoKTogbnVtYmVyO1xyXG5cdGFic3RyYWN0IGdldEl0ZW1BdChpbmRleDogbnVtYmVyKTogQ2FyZEVsZW1lbnQ7XHJcblx0YWJzdHJhY3QgcmVtb3ZlSXRlbShpdGVtOiBDYXJkRWxlbWVudCk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0QmxvY2sgZXh0ZW5kcyBDYXJkRWxlbWVudCB7XHJcblx0cHJpdmF0ZSBfY29tcHV0ZWRMaW5lSGVpZ2h0OiBudW1iZXI7XHJcblx0cHJpdmF0ZSBfb3JpZ2luYWxJbm5lckh0bWw6IHN0cmluZztcclxuXHRwcml2YXRlIF90ZXh0OiBzdHJpbmc7XHJcblx0cHJpdmF0ZSBfcHJvY2Vzc2VkVGV4dDogc3RyaW5nID0gbnVsbDtcclxuXHRwcml2YXRlIF90cmVhdEFzUGxhaW5UZXh0OiBib29sZWFuID0gdHJ1ZTtcclxuXHRwcml2YXRlIF9zZWxlY3RBY3Rpb246IEFjdGlvbiA9IG51bGw7XHJcblx0cHJpdmF0ZSBfZWZmZWN0aXZlU3R5bGVEZWZpbml0aW9uOiBIb3N0Q29uZmlnLkNvbnRhaW5lclN0eWxlRGVmaW5pdGlvbiA9IG51bGw7XHJcblxyXG5cdHByaXZhdGUgcmVzdG9yZU9yaWdpbmFsQ29udGVudCgpIHtcclxuXHRcdHZhciBtYXhIZWlnaHQgPSB0aGlzLm1heExpbmVzXHJcblx0XHRcdD8gKHRoaXMuX2NvbXB1dGVkTGluZUhlaWdodCAqIHRoaXMubWF4TGluZXMpICsgJ3B4J1xyXG5cdFx0XHQ6IG51bGw7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG5cdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fb3JpZ2luYWxJbm5lckh0bWw7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRydW5jYXRlSWZTdXBwb3J0ZWQobWF4SGVpZ2h0OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdC8vIEZvciBub3csIG9ubHkgdHJ1bmNhdGUgVGV4dEJsb2NrcyB0aGF0IGNvbnRhaW4ganVzdCBhIHNpbmdsZVxyXG5cdFx0Ly8gcGFyYWdyYXBoIC0tIHNpbmNlIHRoZSBtYXhMaW5lcyBjYWxjdWxhdGlvbiBkb2Vzbid0IHRha2UgaW50b1xyXG5cdFx0Ly8gYWNjb3VudCBNYXJrZG93biBsaXN0c1xyXG5cdFx0dmFyIGNoaWxkcmVuID0gdGhpcy5yZW5kZXJlZEVsZW1lbnQuY2hpbGRyZW47XHJcblx0XHR2YXIgaXNUZXh0T25seSA9ICFjaGlsZHJlbi5sZW5ndGg7XHJcblxyXG5cdFx0dmFyIHRydW5jYXRpb25TdXBwb3J0ZWQgPSBpc1RleHRPbmx5IHx8IGNoaWxkcmVuLmxlbmd0aCA9PSAxXHJcblx0XHRcdCYmICg8SFRNTEVsZW1lbnQ+Y2hpbGRyZW5bMF0pLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAncCc7XHJcblxyXG5cdFx0aWYgKHRydW5jYXRpb25TdXBwb3J0ZWQpIHtcclxuXHRcdFx0dmFyIGVsZW1lbnQgPSBpc1RleHRPbmx5XHJcblx0XHRcdFx0PyB0aGlzLnJlbmRlcmVkRWxlbWVudFxyXG5cdFx0XHRcdDogPEhUTUxFbGVtZW50PmNoaWxkcmVuWzBdO1xyXG5cclxuXHRcdFx0VXRpbHMudHJ1bmNhdGUoZWxlbWVudCwgbWF4SGVpZ2h0LCB0aGlzLl9jb21wdXRlZExpbmVIZWlnaHQpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldEVmZmVjdGl2ZVN0eWxlRGVmaW5pdGlvbigpIHtcclxuXHRcdGlmICghdGhpcy5fZWZmZWN0aXZlU3R5bGVEZWZpbml0aW9uKSB7XHJcblx0XHRcdHRoaXMuX2VmZmVjdGl2ZVN0eWxlRGVmaW5pdGlvbiA9IHRoaXMuaG9zdENvbmZpZy5jb250YWluZXJTdHlsZXMuZGVmYXVsdDtcclxuXHJcblx0XHRcdGxldCBwYXJlbnRDb250YWluZXIgPSB0aGlzLmdldFBhcmVudENvbnRhaW5lcigpO1xyXG5cclxuXHRcdFx0d2hpbGUgKHBhcmVudENvbnRhaW5lcikge1xyXG5cdFx0XHRcdGlmIChwYXJlbnRDb250YWluZXIuc3R5bGUpIHtcclxuXHRcdFx0XHRcdHRoaXMuX2VmZmVjdGl2ZVN0eWxlRGVmaW5pdGlvbiA9IHRoaXMuaG9zdENvbmZpZy5jb250YWluZXJTdHlsZXMuZ2V0U3R5bGVCeU5hbWUocGFyZW50Q29udGFpbmVyLnN0eWxlKTtcclxuXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHBhcmVudENvbnRhaW5lciA9IHBhcmVudENvbnRhaW5lci5nZXRQYXJlbnRDb250YWluZXIoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9lZmZlY3RpdmVTdHlsZURlZmluaXRpb247XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0UmVuZGVyZWREb21FbGVtZW50VHlwZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFwiZGl2XCI7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgaW50ZXJuYWxSZW5kZXIoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0dGhpcy5fZWZmZWN0aXZlU3R5bGVEZWZpbml0aW9uID0gbnVsbDtcclxuXHRcdHRoaXMuX3Byb2Nlc3NlZFRleHQgPSBudWxsO1xyXG5cclxuXHRcdGlmICghVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLnRleHQpKSB7XHJcblx0XHRcdGxldCBob3N0Q29uZmlnID0gdGhpcy5ob3N0Q29uZmlnO1xyXG5cclxuXHRcdFx0bGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMuZ2V0UmVuZGVyZWREb21FbGVtZW50VHlwZSgpKTtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGhvc3RDb25maWcubWFrZUNzc0NsYXNzTmFtZShcImFjLXRleHRCbG9ja1wiKSk7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG5cclxuXHRcdFx0dGhpcy5hcHBseVN0eWxlc1RvKGVsZW1lbnQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0QWN0aW9uKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5vbmNsaWNrID0gKGUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0QWN0aW9uLmV4ZWN1dGUoKTtcclxuXHJcblx0XHRcdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMuX3Byb2Nlc3NlZFRleHQpIHtcclxuXHRcdFx0XHR0aGlzLl90cmVhdEFzUGxhaW5UZXh0ID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0bGV0IGZvcm1hdHRlZFRleHQgPSBUZXh0Rm9ybWF0dGVycy5mb3JtYXRUZXh0KHRoaXMubGFuZywgdGhpcy50ZXh0KTtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMudXNlTWFya2Rvd24pIHtcclxuXHRcdFx0XHRcdGlmIChBZGFwdGl2ZUNhcmQuYWxsb3dNYXJrRm9yVGV4dEhpZ2hsaWdodGluZykge1xyXG5cdFx0XHRcdFx0XHRmb3JtYXR0ZWRUZXh0ID0gZm9ybWF0dGVkVGV4dC5yZXBsYWNlKC88bWFyaz4vZywgXCI9PT1cIikucmVwbGFjZSgvPFxcL21hcms+L2csIFwiLz09XCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGxldCBtYXJrZG93blByb2Nlc3NpbmdSZXN1bHQgPSBBZGFwdGl2ZUNhcmQuYXBwbHlNYXJrZG93bihmb3JtYXR0ZWRUZXh0KTtcclxuXHJcblx0XHRcdFx0XHRpZiAobWFya2Rvd25Qcm9jZXNzaW5nUmVzdWx0LmRpZFByb2Nlc3MgJiYgbWFya2Rvd25Qcm9jZXNzaW5nUmVzdWx0Lm91dHB1dEh0bWwpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5fcHJvY2Vzc2VkVGV4dCA9IG1hcmtkb3duUHJvY2Vzc2luZ1Jlc3VsdC5vdXRwdXRIdG1sO1xyXG5cdFx0XHRcdFx0XHR0aGlzLl90cmVhdEFzUGxhaW5UZXh0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBPbmx5IHByb2Nlc3MgPG1hcms+IHRhZyBpZiBtYXJrZG93biBwcm9jZXNzaW5nIHdhcyBhcHBsaWVkIGJlY2F1c2VcclxuXHRcdFx0XHRcdFx0Ly8gbWFya2Rvd24gcHJvY2Vzc2luZyBpcyBhbHNvIHJlc3BvbnNpYmxlIGZvciBzYW5pdGl6aW5nIHRoZSBpbnB1dCBzdHJpbmdcclxuXHRcdFx0XHRcdFx0aWYgKEFkYXB0aXZlQ2FyZC5hbGxvd01hcmtGb3JUZXh0SGlnaGxpZ2h0aW5nKSB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IG1hcmtTdHlsZTogc3RyaW5nID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRsZXQgZWZmZWN0aXZlU3R5bGUgPSB0aGlzLmdldEVmZmVjdGl2ZVN0eWxlRGVmaW5pdGlvbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoZWZmZWN0aXZlU3R5bGUuaGlnaGxpZ2h0QmFja2dyb3VuZENvbG9yKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRtYXJrU3R5bGUgKz0gXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIiArIGVmZmVjdGl2ZVN0eWxlLmhpZ2hsaWdodEJhY2tncm91bmRDb2xvciArIFwiO1wiO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0aWYgKGVmZmVjdGl2ZVN0eWxlLmhpZ2hsaWdodEZvcmVncm91bmRDb2xvcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0bWFya1N0eWxlICs9IFwiY29sb3I6IFwiICsgZWZmZWN0aXZlU3R5bGUuaGlnaGxpZ2h0Rm9yZWdyb3VuZENvbG9yICsgXCI7XCI7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkobWFya1N0eWxlKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0bWFya1N0eWxlID0gJ3N0eWxlPVwiJyArIG1hcmtTdHlsZSArICdcIic7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0XHR0aGlzLl9wcm9jZXNzZWRUZXh0ID0gdGhpcy5fcHJvY2Vzc2VkVGV4dC5yZXBsYWNlKC89PT0vZywgXCI8bWFyayBcIiArIG1hcmtTdHlsZSArIFwiPlwiKS5yZXBsYWNlKC9cXC89PS9nLCBcIjwvbWFyaz5cIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuX3Byb2Nlc3NlZFRleHQgPSBmb3JtYXR0ZWRUZXh0O1xyXG5cdFx0XHRcdFx0XHR0aGlzLl90cmVhdEFzUGxhaW5UZXh0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLl9wcm9jZXNzZWRUZXh0ID0gZm9ybWF0dGVkVGV4dDtcclxuXHRcdFx0XHRcdHRoaXMuX3RyZWF0QXNQbGFpblRleHQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMuX3RyZWF0QXNQbGFpblRleHQpIHtcclxuXHRcdFx0XHRlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuX3Byb2Nlc3NlZFRleHQ7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9wcm9jZXNzZWRUZXh0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdFx0bGV0IGZpcnN0RWxlbWVudENoaWxkID0gPEhUTUxFbGVtZW50PmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcblx0XHRcdFx0Zmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUubWFyZ2luVG9wID0gXCIwcHhcIjtcclxuXHRcdFx0XHRmaXJzdEVsZW1lbnRDaGlsZC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG5cclxuXHRcdFx0XHRpZiAoIXRoaXMud3JhcCkge1xyXG5cdFx0XHRcdFx0Zmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG5cdFx0XHRcdFx0Zmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUudGV4dE92ZXJmbG93ID0gXCJlbGxpcHNpc1wiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdFx0KDxIVE1MRWxlbWVudD5lbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQpLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMHB4XCI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBhbmNob3JzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIik7XHJcblxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFuY2hvcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRsZXQgYW5jaG9yID0gPEhUTUxBbmNob3JFbGVtZW50PmFuY2hvcnNbaV07XHJcblx0XHRcdFx0YW5jaG9yLmNsYXNzTGlzdC5hZGQodGhpcy5ob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJhYy1hbmNob3JcIikpO1xyXG5cdFx0XHRcdGFuY2hvci50YXJnZXQgPSBcIl9ibGFua1wiO1xyXG5cdFx0XHRcdGFuY2hvci5vbmNsaWNrID0gKGUpID0+IHtcclxuXHRcdFx0XHRcdGlmIChyYWlzZUFuY2hvckNsaWNrZWRFdmVudCh0aGlzLCBlLnRhcmdldCBhcyBIVE1MQW5jaG9yRWxlbWVudCkpIHtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMud3JhcCkge1xyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUud29yZFdyYXAgPSBcImJyZWFrLXdvcmRcIjtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMubWF4TGluZXMgPiAwKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICh0aGlzLl9jb21wdXRlZExpbmVIZWlnaHQgKiB0aGlzLm1heExpbmVzKSArIFwicHhcIjtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRlbGVtZW50LnN0eWxlLndoaXRlU3BhY2UgPSBcIm5vd3JhcFwiO1xyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUudGV4dE92ZXJmbG93ID0gXCJlbGxpcHNpc1wiO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoQWRhcHRpdmVDYXJkLnVzZUFkdmFuY2VkVGV4dEJsb2NrVHJ1bmNhdGlvbiB8fCBBZGFwdGl2ZUNhcmQudXNlQWR2YW5jZWRDYXJkQm90dG9tVHJ1bmNhdGlvbikge1xyXG5cdFx0XHRcdHRoaXMuX29yaWdpbmFsSW5uZXJIdG1sID0gZWxlbWVudC5pbm5lckhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdEFjdGlvbiAhPSBudWxsICYmIGhvc3RDb25maWcuc3VwcG9ydHNJbnRlcmFjdGl2aXR5KSB7XHJcblx0XHRcdFx0ZWxlbWVudC50YWJJbmRleCA9IDBcclxuXHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XHJcblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHRoaXMuc2VsZWN0QWN0aW9uLnRpdGxlKTtcclxuXHRcdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtc2VsZWN0YWJsZVwiKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBlbGVtZW50O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHRydW5jYXRlT3ZlcmZsb3cobWF4SGVpZ2h0OiBudW1iZXIpOiBib29sZWFuIHtcclxuXHRcdGlmIChtYXhIZWlnaHQgPj0gdGhpcy5fY29tcHV0ZWRMaW5lSGVpZ2h0KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnRydW5jYXRlSWZTdXBwb3J0ZWQobWF4SGVpZ2h0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgdW5kb092ZXJmbG93VHJ1bmNhdGlvbigpIHtcclxuXHRcdHRoaXMucmVzdG9yZU9yaWdpbmFsQ29udGVudCgpO1xyXG5cclxuXHRcdGlmIChBZGFwdGl2ZUNhcmQudXNlQWR2YW5jZWRUZXh0QmxvY2tUcnVuY2F0aW9uICYmIHRoaXMubWF4TGluZXMpIHtcclxuXHRcdFx0dmFyIG1heEhlaWdodCA9IHRoaXMuX2NvbXB1dGVkTGluZUhlaWdodCAqIHRoaXMubWF4TGluZXM7XHJcblx0XHRcdHRoaXMudHJ1bmNhdGVJZlN1cHBvcnRlZChtYXhIZWlnaHQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2l6ZTogRW51bXMuVGV4dFNpemUgPSBFbnVtcy5UZXh0U2l6ZS5EZWZhdWx0O1xyXG5cdHdlaWdodDogRW51bXMuVGV4dFdlaWdodCA9IEVudW1zLlRleHRXZWlnaHQuRGVmYXVsdDtcclxuXHRjb2xvcjogRW51bXMuVGV4dENvbG9yID0gRW51bXMuVGV4dENvbG9yLkRlZmF1bHQ7XHJcblx0aXNTdWJ0bGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHR3cmFwOiBib29sZWFuID0gZmFsc2U7XHJcblx0bWF4TGluZXM6IG51bWJlcjtcclxuXHR1c2VNYXJrZG93bjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdHRvSlNPTigpIHtcclxuXHRcdGxldCByZXN1bHQgPSBzdXBlci50b0pTT04oKTtcclxuXHJcblx0XHRVdGlscy5zZXRFbnVtUHJvcGVydHkoRW51bXMuVGV4dFNpemUsIHJlc3VsdCwgXCJzaXplXCIsIHRoaXMuc2l6ZSwgRW51bXMuVGV4dFNpemUuRGVmYXVsdCk7XHJcblx0XHRVdGlscy5zZXRFbnVtUHJvcGVydHkoRW51bXMuVGV4dFdlaWdodCwgcmVzdWx0LCBcIndlaWdodFwiLCB0aGlzLndlaWdodCwgRW51bXMuVGV4dFdlaWdodC5EZWZhdWx0KTtcclxuXHRcdFV0aWxzLnNldEVudW1Qcm9wZXJ0eShFbnVtcy5UZXh0Q29sb3IsIHJlc3VsdCwgXCJjb2xvclwiLCB0aGlzLmNvbG9yLCBFbnVtcy5UZXh0Q29sb3IuRGVmYXVsdCk7XHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwidGV4dFwiLCB0aGlzLnRleHQpO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImlzU3VidGxlXCIsIHRoaXMuaXNTdWJ0bGUsIGZhbHNlKTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJ3cmFwXCIsIHRoaXMud3JhcCwgZmFsc2UpO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcIm1heExpbmVzXCIsIHRoaXMubWF4TGluZXMsIDApO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRhcHBseVN0eWxlc1RvKHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRpZiAodGhpcy5ob3N0Q29uZmlnLmZvbnRGYW1pbHkpIHtcclxuXHRcdFx0dGFyZ2V0RWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gdGhpcy5ob3N0Q29uZmlnLmZvbnRGYW1pbHk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBhcmVudENvbnRhaW5lciA9IHRoaXMuZ2V0UGFyZW50Q29udGFpbmVyKCk7XHJcblx0XHRsZXQgaXNSdGwgPSBwYXJlbnRDb250YWluZXIgPyBwYXJlbnRDb250YWluZXIuaXNSdGwoKSA6IGZhbHNlO1xyXG5cclxuXHRcdHN3aXRjaCAodGhpcy5ob3Jpem9udGFsQWxpZ25tZW50KSB7XHJcblx0XHRcdGNhc2UgRW51bXMuSG9yaXpvbnRhbEFsaWdubWVudC5DZW50ZXI6XHJcblx0XHRcdFx0dGFyZ2V0RWxlbWVudC5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQ6XHJcblx0XHRcdFx0dGFyZ2V0RWxlbWVudC5zdHlsZS50ZXh0QWxpZ24gPSBpc1J0bCA/IFwibGVmdFwiIDogXCJyaWdodFwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHRhcmdldEVsZW1lbnQuc3R5bGUudGV4dEFsaWduID0gaXNSdGwgPyBcInJpZ2h0XCIgOiBcImxlZnRcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZm9udFNpemU6IG51bWJlcjtcclxuXHJcblx0XHRzd2l0Y2ggKHRoaXMuc2l6ZSkge1xyXG5cdFx0XHRjYXNlIEVudW1zLlRleHRTaXplLlNtYWxsOlxyXG5cdFx0XHRcdGZvbnRTaXplID0gdGhpcy5ob3N0Q29uZmlnLmZvbnRTaXplcy5zbWFsbDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBFbnVtcy5UZXh0U2l6ZS5NZWRpdW06XHJcblx0XHRcdFx0Zm9udFNpemUgPSB0aGlzLmhvc3RDb25maWcuZm9udFNpemVzLm1lZGl1bTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBFbnVtcy5UZXh0U2l6ZS5MYXJnZTpcclxuXHRcdFx0XHRmb250U2l6ZSA9IHRoaXMuaG9zdENvbmZpZy5mb250U2l6ZXMubGFyZ2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRW51bXMuVGV4dFNpemUuRXh0cmFMYXJnZTpcclxuXHRcdFx0XHRmb250U2l6ZSA9IHRoaXMuaG9zdENvbmZpZy5mb250U2l6ZXMuZXh0cmFMYXJnZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRmb250U2l6ZSA9IHRoaXMuaG9zdENvbmZpZy5mb250U2l6ZXMuZGVmYXVsdDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5ob3N0Q29uZmlnLmxpbmVIZWlnaHRzKSB7XHJcblx0XHRcdHN3aXRjaCAodGhpcy5zaXplKSB7XHJcblx0XHRcdFx0Y2FzZSBFbnVtcy5UZXh0U2l6ZS5TbWFsbDpcclxuXHRcdFx0XHRcdHRoaXMuX2NvbXB1dGVkTGluZUhlaWdodCA9IHRoaXMuaG9zdENvbmZpZy5saW5lSGVpZ2h0cy5zbWFsbDtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgRW51bXMuVGV4dFNpemUuTWVkaXVtOlxyXG5cdFx0XHRcdFx0dGhpcy5fY29tcHV0ZWRMaW5lSGVpZ2h0ID0gdGhpcy5ob3N0Q29uZmlnLmxpbmVIZWlnaHRzLm1lZGl1bTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgRW51bXMuVGV4dFNpemUuTGFyZ2U6XHJcblx0XHRcdFx0XHR0aGlzLl9jb21wdXRlZExpbmVIZWlnaHQgPSB0aGlzLmhvc3RDb25maWcubGluZUhlaWdodHMubGFyZ2U7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEVudW1zLlRleHRTaXplLkV4dHJhTGFyZ2U6XHJcblx0XHRcdFx0XHR0aGlzLl9jb21wdXRlZExpbmVIZWlnaHQgPSB0aGlzLmhvc3RDb25maWcubGluZUhlaWdodHMuZXh0cmFMYXJnZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR0aGlzLl9jb21wdXRlZExpbmVIZWlnaHQgPSB0aGlzLmhvc3RDb25maWcubGluZUhlaWdodHMuZGVmYXVsdDtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Ly8gTG9va3MgbGlrZSAxLjMzIGlzIHRoZSBtYWdpYyBudW1iZXIgdG8gY29tcHV0ZSBsaW5lLWhlaWdodFxyXG5cdFx0XHQvLyBmcm9tIGZvbnQgc2l6ZS5cclxuXHRcdFx0dGhpcy5fY29tcHV0ZWRMaW5lSGVpZ2h0ID0gZm9udFNpemUgKiAxLjMzO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhcmdldEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSArIFwicHhcIjtcclxuXHRcdHRhcmdldEVsZW1lbnQuc3R5bGUubGluZUhlaWdodCA9IHRoaXMuX2NvbXB1dGVkTGluZUhlaWdodCArIFwicHhcIjtcclxuXHJcblx0XHRsZXQgc3R5bGVEZWZpbml0aW9uID0gdGhpcy5nZXRFZmZlY3RpdmVTdHlsZURlZmluaXRpb24oKTtcclxuXHJcblx0XHRsZXQgYWN0dWFsVGV4dENvbG9yID0gdGhpcy5jb2xvciA/IHRoaXMuY29sb3IgOiBFbnVtcy5UZXh0Q29sb3IuRGVmYXVsdDtcclxuXHRcdGxldCBjb2xvckRlZmluaXRpb246IEhvc3RDb25maWcuVGV4dENvbG9yRGVmaW5pdGlvbjtcclxuXHJcblx0XHRzd2l0Y2ggKGFjdHVhbFRleHRDb2xvcikge1xyXG5cdFx0XHRjYXNlIEVudW1zLlRleHRDb2xvci5BY2NlbnQ6XHJcblx0XHRcdFx0Y29sb3JEZWZpbml0aW9uID0gc3R5bGVEZWZpbml0aW9uLmZvcmVncm91bmRDb2xvcnMuYWNjZW50O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEVudW1zLlRleHRDb2xvci5EYXJrOlxyXG5cdFx0XHRcdGNvbG9yRGVmaW5pdGlvbiA9IHN0eWxlRGVmaW5pdGlvbi5mb3JlZ3JvdW5kQ29sb3JzLmRhcms7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRW51bXMuVGV4dENvbG9yLkxpZ2h0OlxyXG5cdFx0XHRcdGNvbG9yRGVmaW5pdGlvbiA9IHN0eWxlRGVmaW5pdGlvbi5mb3JlZ3JvdW5kQ29sb3JzLmxpZ2h0O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEVudW1zLlRleHRDb2xvci5Hb29kOlxyXG5cdFx0XHRcdGNvbG9yRGVmaW5pdGlvbiA9IHN0eWxlRGVmaW5pdGlvbi5mb3JlZ3JvdW5kQ29sb3JzLmdvb2Q7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRW51bXMuVGV4dENvbG9yLldhcm5pbmc6XHJcblx0XHRcdFx0Y29sb3JEZWZpbml0aW9uID0gc3R5bGVEZWZpbml0aW9uLmZvcmVncm91bmRDb2xvcnMud2FybmluZztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBFbnVtcy5UZXh0Q29sb3IuQXR0ZW50aW9uOlxyXG5cdFx0XHRcdGNvbG9yRGVmaW5pdGlvbiA9IHN0eWxlRGVmaW5pdGlvbi5mb3JlZ3JvdW5kQ29sb3JzLmF0dGVudGlvbjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRjb2xvckRlZmluaXRpb24gPSBzdHlsZURlZmluaXRpb24uZm9yZWdyb3VuZENvbG9ycy5kZWZhdWx0O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhcmdldEVsZW1lbnQuc3R5bGUuY29sb3IgPSBVdGlscy5zdHJpbmdUb0Nzc0NvbG9yKHRoaXMuaXNTdWJ0bGUgPyBjb2xvckRlZmluaXRpb24uc3VidGxlIDogY29sb3JEZWZpbml0aW9uLmRlZmF1bHQpO1xyXG5cclxuXHRcdGxldCBmb250V2VpZ2h0OiBudW1iZXI7XHJcblxyXG5cdFx0c3dpdGNoICh0aGlzLndlaWdodCkge1xyXG5cdFx0XHRjYXNlIEVudW1zLlRleHRXZWlnaHQuTGlnaHRlcjpcclxuXHRcdFx0XHRmb250V2VpZ2h0ID0gdGhpcy5ob3N0Q29uZmlnLmZvbnRXZWlnaHRzLmxpZ2h0ZXI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRW51bXMuVGV4dFdlaWdodC5Cb2xkZXI6XHJcblx0XHRcdFx0Zm9udFdlaWdodCA9IHRoaXMuaG9zdENvbmZpZy5mb250V2VpZ2h0cy5ib2xkZXI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0Zm9udFdlaWdodCA9IHRoaXMuaG9zdENvbmZpZy5mb250V2VpZ2h0cy5kZWZhdWx0O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRhcmdldEVsZW1lbnQuc3R5bGUuZm9udFdlaWdodCA9IGZvbnRXZWlnaHQudG9TdHJpbmcoKTtcclxuXHR9XHJcblxyXG5cdHBhcnNlKGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdFx0c3VwZXIucGFyc2UoanNvbiwgZXJyb3JzKTtcclxuXHJcblx0XHR0aGlzLnRleHQgPSBqc29uW1widGV4dFwiXTtcclxuXHJcblx0XHR2YXIgc2l6ZVN0cmluZyA9IGpzb25bXCJzaXplXCJdO1xyXG5cclxuXHRcdGlmIChzaXplU3RyaW5nICYmIHR5cGVvZiBzaXplU3RyaW5nID09PSBcInN0cmluZ1wiICYmIHNpemVTdHJpbmcudG9Mb3dlckNhc2UoKSA9PT0gXCJub3JtYWxcIikge1xyXG5cdFx0XHR0aGlzLnNpemUgPSBFbnVtcy5UZXh0U2l6ZS5EZWZhdWx0O1xyXG5cclxuXHRcdFx0cmFpc2VQYXJzZUVycm9yKFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IuRGVwcmVjYXRlZCxcclxuXHRcdFx0XHRcdG1lc3NhZ2U6IFwiVGhlIFRleHRCbG9jay5zaXplIHZhbHVlIFxcXCJub3JtYWxcXFwiIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZC4gVXNlIFxcXCJkZWZhdWx0XFxcIiBpbnN0ZWFkLlwiXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcnNcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNpemUgPSBVdGlscy5nZXRFbnVtVmFsdWVPckRlZmF1bHQoRW51bXMuVGV4dFNpemUsIHNpemVTdHJpbmcsIHRoaXMuc2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHdlaWdodFN0cmluZyA9IGpzb25bXCJ3ZWlnaHRcIl07XHJcblxyXG5cdFx0aWYgKHdlaWdodFN0cmluZyAmJiB0eXBlb2Ygd2VpZ2h0U3RyaW5nID09PSBcInN0cmluZ1wiICYmIHdlaWdodFN0cmluZy50b0xvd2VyQ2FzZSgpID09PSBcIm5vcm1hbFwiKSB7XHJcblx0XHRcdHRoaXMud2VpZ2h0ID0gRW51bXMuVGV4dFdlaWdodC5EZWZhdWx0O1xyXG5cclxuXHRcdFx0cmFpc2VQYXJzZUVycm9yKFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IuRGVwcmVjYXRlZCxcclxuXHRcdFx0XHRcdG1lc3NhZ2U6IFwiVGhlIFRleHRCbG9jay53ZWlnaHQgdmFsdWUgXFxcIm5vcm1hbFxcXCIgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkLiBVc2UgXFxcImRlZmF1bHRcXFwiIGluc3RlYWQuXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yc1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMud2VpZ2h0ID0gVXRpbHMuZ2V0RW51bVZhbHVlT3JEZWZhdWx0KEVudW1zLlRleHRXZWlnaHQsIHdlaWdodFN0cmluZywgdGhpcy53ZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY29sb3IgPSBVdGlscy5nZXRFbnVtVmFsdWVPckRlZmF1bHQoRW51bXMuVGV4dENvbG9yLCBqc29uW1wiY29sb3JcIl0sIHRoaXMuY29sb3IpO1xyXG5cdFx0dGhpcy5pc1N1YnRsZSA9IGpzb25bXCJpc1N1YnRsZVwiXTtcclxuXHRcdHRoaXMud3JhcCA9IGpzb25bXCJ3cmFwXCJdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGpzb25bXCJ3cmFwXCJdO1xyXG5cclxuXHRcdGlmICh0eXBlb2YganNvbltcIm1heExpbmVzXCJdID09PSBcIm51bWJlclwiKSB7XHJcblx0XHRcdHRoaXMubWF4TGluZXMgPSBqc29uW1wibWF4TGluZXNcIl07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIlRleHRCbG9ja1wiO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyU3BlZWNoKCk6IHN0cmluZyB7XHJcblx0XHRpZiAodGhpcy5zcGVhayAhPSBudWxsKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5zcGVhayArICdcXG4nO1xyXG5cclxuXHRcdGlmICh0aGlzLnRleHQpXHJcblx0XHRcdHJldHVybiAnPHM+JyArIHRoaXMudGV4dCArICc8L3M+XFxuJztcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZUxheW91dChwcm9jZXNzQ2hpbGRyZW46IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cdFx0c3VwZXIudXBkYXRlTGF5b3V0KHByb2Nlc3NDaGlsZHJlbik7XHJcblxyXG5cdFx0aWYgKEFkYXB0aXZlQ2FyZC51c2VBZHZhbmNlZFRleHRCbG9ja1RydW5jYXRpb24gJiYgdGhpcy5tYXhMaW5lcyAmJiB0aGlzLmlzUmVuZGVyZWQoKSkge1xyXG5cdFx0XHQvLyBSZXNldCB0aGUgZWxlbWVudCdzIGlubmVySFRNTCBpbiBjYXNlIHRoZSBhdmFpbGFibGUgcm9vbSBmb3JcclxuXHRcdFx0Ly8gY29udGVudCBoYXMgaW5jcmVhc2VkXHJcblx0XHRcdHRoaXMucmVzdG9yZU9yaWdpbmFsQ29udGVudCgpO1xyXG5cdFx0XHR2YXIgbWF4SGVpZ2h0ID0gdGhpcy5fY29tcHV0ZWRMaW5lSGVpZ2h0ICogdGhpcy5tYXhMaW5lcztcclxuXHRcdFx0dGhpcy50cnVuY2F0ZUlmU3VwcG9ydGVkKG1heEhlaWdodCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgdGV4dCgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RleHQ7XHJcblx0fVxyXG5cclxuXHRzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcblx0XHRpZiAodGhpcy5fdGV4dCAhPSB2YWx1ZSkge1xyXG5cdFx0XHR0aGlzLl90ZXh0ID0gdmFsdWU7XHJcblxyXG5cdFx0XHR0aGlzLl9wcm9jZXNzZWRUZXh0ID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBzZWxlY3RBY3Rpb24oKTogQWN0aW9uIHtcclxuXHRcdHJldHVybiB0aGlzLl9zZWxlY3RBY3Rpb247XHJcblx0fVxyXG5cclxuXHRzZXQgc2VsZWN0QWN0aW9uKHZhbHVlOiBBY3Rpb24pIHtcclxuXHRcdHRoaXMuX3NlbGVjdEFjdGlvbiA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zZWxlY3RBY3Rpb24pIHtcclxuXHRcdFx0dGhpcy5fc2VsZWN0QWN0aW9uLnNldFBhcmVudCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIExhYmVsIGV4dGVuZHMgVGV4dEJsb2NrIHtcclxuXHRwcm90ZWN0ZWQgZ2V0UmVuZGVyZWREb21FbGVtZW50VHlwZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFwibGFiZWxcIjtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRsZXQgcmVuZGVyZWRFbGVtZW50ID0gPEhUTUxMYWJlbEVsZW1lbnQ+c3VwZXIuaW50ZXJuYWxSZW5kZXIoKTtcclxuXHJcblx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkodGhpcy5mb3JFbGVtZW50SWQpKSB7XHJcblx0XHRcdHJlbmRlcmVkRWxlbWVudC5odG1sRm9yID0gdGhpcy5mb3JFbGVtZW50SWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlbmRlcmVkRWxlbWVudDtcclxuXHR9XHJcblxyXG5cdGZvckVsZW1lbnRJZDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjdCB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHZhbHVlOiBzdHJpbmc7XHJcblx0c3BlYWs6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IobmFtZTogc3RyaW5nID0gdW5kZWZpbmVkLCB2YWx1ZTogc3RyaW5nID0gdW5kZWZpbmVkKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0cmV0dXJuIHsgdGl0bGU6IHRoaXMubmFtZSwgdmFsdWU6IHRoaXMudmFsdWUgfTtcclxuXHR9XHJcblxyXG5cdHJlbmRlclNwZWVjaCgpOiBzdHJpbmcge1xyXG5cdFx0aWYgKHRoaXMuc3BlYWsgIT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zcGVhayArICdcXG4nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAnPHM+JyArIHRoaXMubmFtZSArICcgJyArIHRoaXMudmFsdWUgKyAnPC9zPlxcbic7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjdFNldCBleHRlbmRzIENhcmRFbGVtZW50IHtcclxuXHRwcm90ZWN0ZWQgZ2V0IHVzZURlZmF1bHRTaXppbmcoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgaW50ZXJuYWxSZW5kZXIoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0bGV0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcclxuXHRcdGxldCBob3N0Q29uZmlnID0gdGhpcy5ob3N0Q29uZmlnO1xyXG5cclxuXHRcdGlmICh0aGlzLmZhY3RzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCA9IFwiMHB4XCI7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuYm9yZGVyU3BhY2luZyA9IFwiMHB4XCI7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBcIm5vbmVcIjtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5ib3JkZXJDb2xsYXBzZSA9IFwiY29sbGFwc2VcIjtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGhvc3RDb25maWcubWFrZUNzc0NsYXNzTmFtZShcImFjLWZhY3RzZXRcIikpO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZhY3RzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IHRyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcblx0XHRcdFx0aWYgKGkgPiAwKSB7XHJcblx0XHRcdFx0XHR0ckVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gdGhpcy5ob3N0Q29uZmlnLmZhY3RTZXQuc3BhY2luZyArIFwicHhcIjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFRpdGxlIGNvbHVtblxyXG5cdFx0XHRcdGxldCB0ZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblx0XHRcdFx0dGRFbGVtZW50LnN0eWxlLnBhZGRpbmcgPSBcIjBcIjtcclxuXHRcdFx0XHR0ZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJhYy1mYWN0LXRpdGxlXCIpKTtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuaG9zdENvbmZpZy5mYWN0U2V0LnRpdGxlLm1heFdpZHRoKSB7XHJcblx0XHRcdFx0XHR0ZEVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSB0aGlzLmhvc3RDb25maWcuZmFjdFNldC50aXRsZS5tYXhXaWR0aCArIFwicHhcIjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRkRWxlbWVudC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gXCJ0b3BcIjtcclxuXHJcblx0XHRcdFx0bGV0IHRleHRCbG9jayA9IG5ldyBUZXh0QmxvY2soKTtcclxuXHRcdFx0XHR0ZXh0QmxvY2suc2V0UGFyZW50KHRoaXMpO1xyXG5cdFx0XHRcdHRleHRCbG9jay50ZXh0ID0gVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLmZhY3RzW2ldLm5hbWUpID8gXCJUaXRsZVwiIDogdGhpcy5mYWN0c1tpXS5uYW1lO1xyXG5cdFx0XHRcdHRleHRCbG9jay5zaXplID0gdGhpcy5ob3N0Q29uZmlnLmZhY3RTZXQudGl0bGUuc2l6ZTtcclxuXHRcdFx0XHR0ZXh0QmxvY2suY29sb3IgPSB0aGlzLmhvc3RDb25maWcuZmFjdFNldC50aXRsZS5jb2xvcjtcclxuXHRcdFx0XHR0ZXh0QmxvY2suaXNTdWJ0bGUgPSB0aGlzLmhvc3RDb25maWcuZmFjdFNldC50aXRsZS5pc1N1YnRsZTtcclxuXHRcdFx0XHR0ZXh0QmxvY2sud2VpZ2h0ID0gdGhpcy5ob3N0Q29uZmlnLmZhY3RTZXQudGl0bGUud2VpZ2h0O1xyXG5cdFx0XHRcdHRleHRCbG9jay53cmFwID0gdGhpcy5ob3N0Q29uZmlnLmZhY3RTZXQudGl0bGUud3JhcDtcclxuXHRcdFx0XHR0ZXh0QmxvY2suc3BhY2luZyA9IEVudW1zLlNwYWNpbmcuTm9uZTtcclxuXHJcblx0XHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQodGRFbGVtZW50LCB0ZXh0QmxvY2sucmVuZGVyKCkpO1xyXG5cdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKHRyRWxlbWVudCwgdGRFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0Ly8gU3BhY2VyIGNvbHVtblxyXG5cdFx0XHRcdHRkRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuXHRcdFx0XHR0ZEVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwcHhcIjtcclxuXHJcblx0XHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQodHJFbGVtZW50LCB0ZEVsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHQvLyBWYWx1ZSBjb2x1bW5cclxuXHRcdFx0XHR0ZEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcblx0XHRcdFx0dGRFbGVtZW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcInRvcFwiO1xyXG5cdFx0XHRcdHRkRWxlbWVudC5jbGFzc0xpc3QuYWRkKGhvc3RDb25maWcubWFrZUNzc0NsYXNzTmFtZShcImFjLWZhY3QtdmFsdWVcIikpO1xyXG5cclxuXHRcdFx0XHR0ZXh0QmxvY2sgPSBuZXcgVGV4dEJsb2NrKCk7XHJcblx0XHRcdFx0dGV4dEJsb2NrLnNldFBhcmVudCh0aGlzKTtcclxuXHRcdFx0XHR0ZXh0QmxvY2sudGV4dCA9IFV0aWxzLmlzTnVsbE9yRW1wdHkodGhpcy5mYWN0c1tpXS52YWx1ZSkgPyBcIlZhbHVlXCIgOiB0aGlzLmZhY3RzW2ldLnZhbHVlO1xyXG5cdFx0XHRcdHRleHRCbG9jay5zaXplID0gdGhpcy5ob3N0Q29uZmlnLmZhY3RTZXQudmFsdWUuc2l6ZTtcclxuXHRcdFx0XHR0ZXh0QmxvY2suY29sb3IgPSB0aGlzLmhvc3RDb25maWcuZmFjdFNldC52YWx1ZS5jb2xvcjtcclxuXHRcdFx0XHR0ZXh0QmxvY2suaXNTdWJ0bGUgPSB0aGlzLmhvc3RDb25maWcuZmFjdFNldC52YWx1ZS5pc1N1YnRsZTtcclxuXHRcdFx0XHR0ZXh0QmxvY2sud2VpZ2h0ID0gdGhpcy5ob3N0Q29uZmlnLmZhY3RTZXQudmFsdWUud2VpZ2h0O1xyXG5cdFx0XHRcdHRleHRCbG9jay53cmFwID0gdGhpcy5ob3N0Q29uZmlnLmZhY3RTZXQudmFsdWUud3JhcDtcclxuXHRcdFx0XHR0ZXh0QmxvY2suc3BhY2luZyA9IEVudW1zLlNwYWNpbmcuTm9uZTtcclxuXHJcblx0XHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQodGRFbGVtZW50LCB0ZXh0QmxvY2sucmVuZGVyKCkpO1xyXG5cdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKHRyRWxlbWVudCwgdGRFbGVtZW50KTtcclxuXHRcdFx0XHRVdGlscy5hcHBlbmRDaGlsZChlbGVtZW50LCB0ckVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRmYWN0czogQXJyYXk8RmFjdD4gPSBbXTtcclxuXHJcblx0Z2V0SnNvblR5cGVOYW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXCJGYWN0U2V0XCI7XHJcblx0fVxyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gc3VwZXIudG9KU09OKCk7XHJcblxyXG5cdFx0bGV0IGZhY3RzID0gW11cclxuXHJcblx0XHRmb3IgKGxldCBmYWN0IG9mIHRoaXMuZmFjdHMpIHtcclxuXHRcdFx0ZmFjdHMucHVzaChmYWN0LnRvSlNPTigpKTtcclxuXHRcdH1cclxuXHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwiZmFjdHNcIiwgZmFjdHMpO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRwYXJzZShqc29uOiBhbnksIGVycm9ycz86IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pIHtcclxuXHRcdHN1cGVyLnBhcnNlKGpzb24sIGVycm9ycyk7XHJcblxyXG5cdFx0dGhpcy5mYWN0cyA9IFtdO1xyXG5cclxuXHRcdGlmIChqc29uW1wiZmFjdHNcIl0gIT0gbnVsbCkge1xyXG5cdFx0XHR2YXIganNvbkZhY3RzID0ganNvbltcImZhY3RzXCJdIGFzIEFycmF5PGFueT47XHJcblxyXG5cdFx0XHR0aGlzLmZhY3RzID0gW107XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGpzb25GYWN0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBmYWN0ID0gbmV3IEZhY3QoKTtcclxuXHJcblx0XHRcdFx0ZmFjdC5uYW1lID0ganNvbkZhY3RzW2ldW1widGl0bGVcIl07XHJcblx0XHRcdFx0ZmFjdC52YWx1ZSA9IGpzb25GYWN0c1tpXVtcInZhbHVlXCJdO1xyXG5cdFx0XHRcdGZhY3Quc3BlYWsgPSBqc29uRmFjdHNbaV1bXCJzcGVha1wiXTtcclxuXHJcblx0XHRcdFx0dGhpcy5mYWN0cy5wdXNoKGZhY3QpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXJTcGVlY2goKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLnNwZWFrICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3BlYWsgKyAnXFxuJztcclxuXHRcdH1cclxuXHJcblx0XHQvLyByZW5kZXIgZWFjaCBmYWN0XHJcblx0XHRsZXQgc3BlYWsgPSBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLmZhY3RzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0c3BlYWsgPSAnJztcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5mYWN0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBzcGVlY2ggPSB0aGlzLmZhY3RzW2ldLnJlbmRlclNwZWVjaCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoc3BlZWNoKSB7XHJcblx0XHRcdFx0XHRzcGVhayArPSBzcGVlY2g7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuICc8cD4nICsgc3BlYWsgKyAnXFxuPC9wPlxcbic7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2UgZXh0ZW5kcyBDYXJkRWxlbWVudCB7XHJcblx0cHJpdmF0ZSBfc2VsZWN0QWN0aW9uOiBBY3Rpb247XHJcblxyXG5cdHByaXZhdGUgcGFyc2VEaW1lbnNpb24obmFtZTogc3RyaW5nLCB2YWx1ZTogYW55LCBlcnJvcnM6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pOiBudW1iZXIge1xyXG5cdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0bGV0IHNpemUgPSBVdGlscy5TaXplQW5kVW5pdC5wYXJzZSh2YWx1ZSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHNpemUudW5pdCA9PSBFbnVtcy5TaXplVW5pdC5QaXhlbCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2l6ZS5waHlzaWNhbFNpemU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhdGNoIHtcclxuXHRcdFx0XHRcdC8vIElnbm9yZSBlcnJvclxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmFpc2VQYXJzZUVycm9yKFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IuSW52YWxpZFByb3BlcnR5VmFsdWUsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBcIkludmFsaWQgaW1hZ2UgXCIgKyBuYW1lICsgXCI6IFwiICsgdmFsdWVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yc1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAwO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhcHBseVNpemUoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdGlmICh0aGlzLnBpeGVsV2lkdGggfHwgdGhpcy5waXhlbEhlaWdodCkge1xyXG5cdFx0XHRpZiAodGhpcy5waXhlbFdpZHRoKSB7XHJcblx0XHRcdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMucGl4ZWxXaWR0aCArIFwicHhcIjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRoaXMucGl4ZWxIZWlnaHQpIHtcclxuXHRcdFx0XHRlbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMucGl4ZWxIZWlnaHQgKyBcInB4XCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXMuc2l6ZSkge1xyXG5cdFx0XHRcdGNhc2UgRW51bXMuU2l6ZS5TdHJldGNoOlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBFbnVtcy5TaXplLkF1dG86XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLm1heFdpZHRoID0gXCIxMDAlXCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEVudW1zLlNpemUuU21hbGw6XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5ob3N0Q29uZmlnLmltYWdlU2l6ZXMuc21hbGwgKyBcInB4XCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEVudW1zLlNpemUuTGFyZ2U6XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5ob3N0Q29uZmlnLmltYWdlU2l6ZXMubGFyZ2UgKyBcInB4XCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEVudW1zLlNpemUuTWVkaXVtOlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMuaG9zdENvbmZpZy5pbWFnZVNpemVzLm1lZGl1bSArIFwicHhcIjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0IHVzZURlZmF1bHRTaXppbmcoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgaW50ZXJuYWxSZW5kZXIoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0dmFyIGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcclxuXHJcblx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkodGhpcy51cmwpKSB7XHJcblx0XHRcdGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJmbGV4LXN0YXJ0XCI7XHJcblxyXG5cdFx0XHRlbGVtZW50Lm9ua2V5cHJlc3MgPSAoZSkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNlbGVjdEFjdGlvbikge1xyXG5cdFx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PSAxMyB8fCBlLmtleUNvZGUgPT0gMzIpIHsgLy8gZW50ZXIgb3Igc3BhY2UgcHJlc3NlZFxyXG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdEFjdGlvbi5leGVjdXRlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbGVtZW50Lm9uY2xpY2sgPSAoZSkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNlbGVjdEFjdGlvbikge1xyXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RBY3Rpb24uZXhlY3V0ZSgpO1xyXG5cdFx0XHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3dpdGNoICh0aGlzLmhvcml6b250YWxBbGlnbm1lbnQpIHtcclxuXHRcdFx0XHRjYXNlIEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQuQ2VudGVyOlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQ6XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJmbGV4LWVuZFwiO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImZsZXgtc3RhcnRcIjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDYWNoZSBob3N0Q29uZmlnIHRvIGF2b2lkIHdhbGtpbmcgdGhlIHBhcmVudCBoaWVyYXJjaHkgbXVsdGlwbGUgdGltZXNcclxuXHRcdFx0bGV0IGhvc3RDb25maWcgPSB0aGlzLmhvc3RDb25maWc7XHJcblxyXG5cdFx0XHRsZXQgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuXHRcdFx0aW1hZ2VFbGVtZW50Lm9ubG9hZCA9IChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdHJhaXNlSW1hZ2VMb2FkZWRFdmVudCh0aGlzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpbWFnZUVsZW1lbnQub25lcnJvciA9IChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdGxldCBjYXJkID0gdGhpcy5nZXRSb290RWxlbWVudCgpIGFzIEFkYXB0aXZlQ2FyZDtcclxuXHJcblx0XHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcblx0XHRcdFx0aWYgKGNhcmQgJiYgY2FyZC5kZXNpZ25Nb2RlKSB7XHJcblx0XHRcdFx0XHRsZXQgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0XHRcdGVycm9yRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcblx0XHRcdFx0XHRlcnJvckVsZW1lbnQuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XHJcblx0XHRcdFx0XHRlcnJvckVsZW1lbnQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xyXG5cdFx0XHRcdFx0ZXJyb3JFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0VFRUVFRVwiO1xyXG5cdFx0XHRcdFx0ZXJyb3JFbGVtZW50LnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xyXG5cdFx0XHRcdFx0ZXJyb3JFbGVtZW50LmlubmVyVGV4dCA9IFwiOi0oXCI7XHJcblx0XHRcdFx0XHRlcnJvckVsZW1lbnQuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuYXBwbHlTaXplKGVycm9yRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZXJyb3JFbGVtZW50KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJhaXNlSW1hZ2VMb2FkZWRFdmVudCh0aGlzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpbWFnZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gXCIxMDAlXCI7XHJcblx0XHRcdGltYWdlRWxlbWVudC5zdHlsZS5taW5XaWR0aCA9IFwiMFwiO1xyXG5cdFx0XHRpbWFnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJhYy1pbWFnZVwiKSk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RBY3Rpb24gIT0gbnVsbCAmJiBob3N0Q29uZmlnLnN1cHBvcnRzSW50ZXJhY3Rpdml0eSkge1xyXG5cdFx0XHRcdGltYWdlRWxlbWVudC50YWJJbmRleCA9IDBcclxuXHRcdFx0XHRpbWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcclxuXHRcdFx0XHRpbWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0aGlzLnNlbGVjdEFjdGlvbi50aXRsZSk7XHJcblx0XHRcdFx0aW1hZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtc2VsZWN0YWJsZVwiKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYXBwbHlTaXplKGltYWdlRWxlbWVudCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5zdHlsZSA9PT0gRW51bXMuSW1hZ2VTdHlsZS5QZXJzb24pIHtcclxuXHRcdFx0XHRpbWFnZUVsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1MCVcIjtcclxuXHRcdFx0XHRpbWFnZUVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gXCI1MCUgNTAlXCI7XHJcblx0XHRcdFx0aW1hZ2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSBcIm5vLXJlcGVhdFwiO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkodGhpcy5iYWNrZ3JvdW5kQ29sb3IpKSB7XHJcblx0XHRcdFx0aW1hZ2VFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFV0aWxzLnN0cmluZ1RvQ3NzQ29sb3IodGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbWFnZUVsZW1lbnQuc3JjID0gdGhpcy51cmw7XHJcblx0XHRcdGltYWdlRWxlbWVudC5hbHQgPSB0aGlzLmFsdFRleHQ7XHJcblxyXG5cdFx0XHRlbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRzdHlsZTogRW51bXMuSW1hZ2VTdHlsZSA9IEVudW1zLkltYWdlU3R5bGUuRGVmYXVsdDtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcclxuXHR1cmw6IHN0cmluZztcclxuXHRzaXplOiBFbnVtcy5TaXplID0gRW51bXMuU2l6ZS5BdXRvO1xyXG5cdHdpZHRoOiBVdGlscy5TaXplQW5kVW5pdDtcclxuXHRwaXhlbFdpZHRoPzogbnVtYmVyID0gbnVsbDtcclxuXHRwaXhlbEhlaWdodD86IG51bWJlciA9IG51bGw7XHJcblx0YWx0VGV4dDogc3RyaW5nID0gXCJcIjtcclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHN1cGVyLnRvSlNPTigpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zZWxlY3RBY3Rpb24pIHtcclxuXHRcdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcInNlbGVjdEFjdGlvblwiLCB0aGlzLl9zZWxlY3RBY3Rpb24udG9KU09OKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdFV0aWxzLnNldEVudW1Qcm9wZXJ0eShFbnVtcy5JbWFnZVN0eWxlLCByZXN1bHQsIFwic3R5bGVcIiwgdGhpcy5zdHlsZSwgRW51bXMuSW1hZ2VTdHlsZS5EZWZhdWx0KTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJiYWNrZ3JvdW5kQ29sb3JcIiwgdGhpcy5iYWNrZ3JvdW5kQ29sb3IpO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcInVybFwiLCB0aGlzLnVybCk7XHJcblx0XHRVdGlscy5zZXRFbnVtUHJvcGVydHkoRW51bXMuU2l6ZSwgcmVzdWx0LCBcInNpemVcIiwgdGhpcy5zaXplLCBFbnVtcy5TaXplLkF1dG8pO1xyXG5cclxuXHRcdGlmICh0aGlzLnBpeGVsV2lkdGgpIHtcclxuXHRcdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcIndpZHRoXCIsIHRoaXMucGl4ZWxXaWR0aCArIFwicHhcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMucGl4ZWxIZWlnaHQpIHtcclxuXHRcdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImhlaWdodFwiLCB0aGlzLnBpeGVsSGVpZ2h0ICsgXCJweFwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwiYWx0VGV4dFwiLCB0aGlzLmFsdFRleHQpO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIkltYWdlXCI7XHJcblx0fVxyXG5cclxuXHRnZXRBY3Rpb25CeUlkKGlkOiBzdHJpbmcpIHtcclxuXHRcdHZhciByZXN1bHQgPSBzdXBlci5nZXRBY3Rpb25CeUlkKGlkKTtcclxuXHJcblx0XHRpZiAoIXJlc3VsdCAmJiB0aGlzLnNlbGVjdEFjdGlvbikge1xyXG5cdFx0XHRyZXN1bHQgPSB0aGlzLnNlbGVjdEFjdGlvbi5nZXRBY3Rpb25CeUlkKGlkKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHRoaXMudXJsID0ganNvbltcInVybFwiXTtcclxuXHRcdHRoaXMuYmFja2dyb3VuZENvbG9yID0ganNvbltcImJhY2tncm91bmRDb2xvclwiXTtcclxuXHJcblx0XHR2YXIgc3R5bGVTdHJpbmcgPSBqc29uW1wic3R5bGVcIl07XHJcblxyXG5cdFx0aWYgKHN0eWxlU3RyaW5nICYmIHR5cGVvZiBzdHlsZVN0cmluZyA9PT0gXCJzdHJpbmdcIiAmJiBzdHlsZVN0cmluZy50b0xvd2VyQ2FzZSgpID09PSBcIm5vcm1hbFwiKSB7XHJcblx0XHRcdHRoaXMuc3R5bGUgPSBFbnVtcy5JbWFnZVN0eWxlLkRlZmF1bHQ7XHJcblxyXG5cdFx0XHRyYWlzZVBhcnNlRXJyb3IoXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5EZXByZWNhdGVkLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJUaGUgSW1hZ2Uuc3R5bGUgdmFsdWUgXFxcIm5vcm1hbFxcXCIgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkLiBVc2UgXFxcImRlZmF1bHRcXFwiIGluc3RlYWQuXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yc1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuc3R5bGUgPSBVdGlscy5nZXRFbnVtVmFsdWVPckRlZmF1bHQoRW51bXMuSW1hZ2VTdHlsZSwgc3R5bGVTdHJpbmcsIHRoaXMuc3R5bGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2l6ZSA9IFV0aWxzLmdldEVudW1WYWx1ZU9yRGVmYXVsdChFbnVtcy5TaXplLCBqc29uW1wic2l6ZVwiXSwgdGhpcy5zaXplKTtcclxuXHRcdHRoaXMuYWx0VGV4dCA9IGpzb25bXCJhbHRUZXh0XCJdO1xyXG5cclxuXHRcdC8vIHBpeGVsV2lkdGggYW5kIHBpeGVsSGVpZ2h0IGFyZSBvbmx5IHBhcnNlZCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXHJcblx0XHQvLyBQYXlsb2FkcyBzaG91bGQgdXNlIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IHByb2VydGllcyBpbnN0ZWFkLlxyXG5cdFx0aWYgKGpzb25bXCJwaXhlbFdpZHRoXCJdICYmIHR5cGVvZiBqc29uW1wicGl4ZWxXaWR0aFwiXSA9PT0gXCJudW1iZXJcIikge1xyXG5cdFx0XHR0aGlzLnBpeGVsV2lkdGggPSBqc29uW1wicGl4ZWxXaWR0aFwiXTtcclxuXHJcblx0XHRcdHJhaXNlUGFyc2VFcnJvcihcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLkRlcHJlY2F0ZWQsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBcIlRoZSBwaXhlbFdpZHRoIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZC4gVXNlIHRoZSB3aWR0aCBwcm9wZXJ0eSBpbnN0ZWFkLlwiXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRlcnJvcnNcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoanNvbltcInBpeGVsSGVpZ2h0XCJdICYmIHR5cGVvZiBqc29uW1wicGl4ZWxIZWlnaHRcIl0gPT09IFwibnVtYmVyXCIpIHtcclxuXHRcdFx0dGhpcy5waXhlbEhlaWdodCA9IGpzb25bXCJwaXhlbEhlaWdodFwiXTtcclxuXHJcblx0XHRcdHJhaXNlUGFyc2VFcnJvcihcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLkRlcHJlY2F0ZWQsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBcIlRoZSBwaXhlbEhlaWdodCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQuIFVzZSB0aGUgaGVpZ2h0IHByb3BlcnR5IGluc3RlYWQuXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yc1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBzaXplID0gdGhpcy5wYXJzZURpbWVuc2lvbihcIndpZHRoXCIsIGpzb25bXCJ3aWR0aFwiXSwgZXJyb3JzKTtcclxuXHJcblx0XHRpZiAoc2l6ZSA+IDApIHtcclxuXHRcdFx0dGhpcy5waXhlbFdpZHRoID0gc2l6ZTtcclxuXHRcdH1cclxuXHJcblx0XHRzaXplID0gdGhpcy5wYXJzZURpbWVuc2lvbihcImhlaWdodFwiLCBqc29uW1wiaGVpZ2h0XCJdLCBlcnJvcnMpO1xyXG5cclxuXHRcdGlmIChzaXplID4gMCkge1xyXG5cdFx0XHR0aGlzLnBpeGVsSGVpZ2h0ID0gc2l6ZTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnNlbGVjdEFjdGlvbiA9IGNyZWF0ZUFjdGlvbkluc3RhbmNlKFxyXG5cdFx0XHR0aGlzLFxyXG5cdFx0XHRqc29uW1wic2VsZWN0QWN0aW9uXCJdLFxyXG5cdFx0XHRlcnJvcnMpO1xyXG5cdH1cclxuXHJcblx0Z2V0UmVzb3VyY2VJbmZvcm1hdGlvbigpOiBBcnJheTxJUmVzb3VyY2VJbmZvcm1hdGlvbj4ge1xyXG5cdFx0aWYgKCFVdGlscy5pc051bGxPckVtcHR5KHRoaXMudXJsKSkge1xyXG5cdFx0XHRyZXR1cm4gW3sgdXJsOiB0aGlzLnVybCwgbWltZVR5cGU6IFwiaW1hZ2VcIiB9XVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBbXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlclNwZWVjaCgpOiBzdHJpbmcge1xyXG5cdFx0aWYgKHRoaXMuc3BlYWsgIT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zcGVhayArICdcXG4nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0Z2V0IHNlbGVjdEFjdGlvbigpOiBBY3Rpb24ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdEFjdGlvbjtcclxuXHR9XHJcblxyXG5cdHNldCBzZWxlY3RBY3Rpb24odmFsdWU6IEFjdGlvbikge1xyXG5cdFx0dGhpcy5fc2VsZWN0QWN0aW9uID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NlbGVjdEFjdGlvbikge1xyXG5cdFx0XHR0aGlzLl9zZWxlY3RBY3Rpb24uc2V0UGFyZW50KHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEltYWdlU2V0IGV4dGVuZHMgQ2FyZEVsZW1lbnRDb250YWluZXIge1xyXG5cdHByaXZhdGUgX2ltYWdlczogQXJyYXk8SW1hZ2U+ID0gW107XHJcblxyXG5cdHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRsZXQgZWxlbWVudDogSFRNTEVsZW1lbnQgPSBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLl9pbWFnZXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZmxleFdyYXAgPSBcIndyYXBcIjtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faW1hZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dGhpcy5faW1hZ2VzW2ldLnNpemUgPSB0aGlzLmltYWdlU2l6ZTtcclxuXHJcblx0XHRcdFx0bGV0IHJlbmRlcmVkSW1hZ2UgPSB0aGlzLl9pbWFnZXNbaV0ucmVuZGVyKCk7XHJcblxyXG5cdFx0XHRcdHJlbmRlcmVkSW1hZ2Uuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWZsZXhcIjtcclxuXHRcdFx0XHRyZW5kZXJlZEltYWdlLnN0eWxlLm1hcmdpbiA9IFwiMHB4XCI7XHJcblx0XHRcdFx0cmVuZGVyZWRJbWFnZS5zdHlsZS5tYXJnaW5SaWdodCA9IFwiMTBweFwiO1xyXG5cdFx0XHRcdHJlbmRlcmVkSW1hZ2Uuc3R5bGUubWF4SGVpZ2h0ID0gdGhpcy5ob3N0Q29uZmlnLmltYWdlU2V0Lm1heEltYWdlSGVpZ2h0ICsgXCJweFwiO1xyXG5cclxuXHRcdFx0XHRVdGlscy5hcHBlbmRDaGlsZChlbGVtZW50LCByZW5kZXJlZEltYWdlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0aW1hZ2VTaXplOiBFbnVtcy5TaXplID0gRW51bXMuU2l6ZS5NZWRpdW07XHJcblxyXG5cdGdldEl0ZW1Db3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2ltYWdlcy5sZW5ndGg7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtQXQoaW5kZXg6IG51bWJlcik6IENhcmRFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLl9pbWFnZXNbaW5kZXhdO1xyXG5cdH1cclxuXHJcblx0Z2V0UmVzb3VyY2VJbmZvcm1hdGlvbigpOiBBcnJheTxJUmVzb3VyY2VJbmZvcm1hdGlvbj4ge1xyXG5cdFx0bGV0IHJlc3VsdDogQXJyYXk8SVJlc291cmNlSW5mb3JtYXRpb24+ID0gW107XHJcblxyXG5cdFx0Zm9yIChsZXQgaW1hZ2Ugb2YgdGhpcy5faW1hZ2VzKSB7XHJcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoaW1hZ2UuZ2V0UmVzb3VyY2VJbmZvcm1hdGlvbigpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlSXRlbShpdGVtOiBDYXJkRWxlbWVudCk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKGl0ZW0gaW5zdGFuY2VvZiBJbWFnZSkge1xyXG5cdFx0XHR2YXIgaXRlbUluZGV4ID0gdGhpcy5faW1hZ2VzLmluZGV4T2YoaXRlbSk7XHJcblxyXG5cdFx0XHRpZiAoaXRlbUluZGV4ID49IDApIHtcclxuXHRcdFx0XHR0aGlzLl9pbWFnZXMuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XHJcblxyXG5cdFx0XHRcdGl0ZW0uc2V0UGFyZW50KG51bGwpO1xyXG5cclxuXHRcdFx0XHR0aGlzLnVwZGF0ZUxheW91dCgpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGdldEpzb25UeXBlTmFtZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFwiSW1hZ2VTZXRcIjtcclxuXHR9XHJcblxyXG5cdHRvSlNPTigpIHtcclxuXHRcdGxldCByZXN1bHQgPSBzdXBlci50b0pTT04oKTtcclxuXHJcblx0XHRVdGlscy5zZXRFbnVtUHJvcGVydHkoRW51bXMuU2l6ZSwgcmVzdWx0LCBcImltYWdlU2l6ZVwiLCB0aGlzLmltYWdlU2l6ZSwgRW51bXMuU2l6ZS5NZWRpdW0pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9pbWFnZXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsZXQgaW1hZ2VzID0gW107XHJcblxyXG5cdFx0XHRmb3IgKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcclxuXHRcdFx0XHRpbWFnZXMucHVzaChpbWFnZS50b0pTT04oKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJpbWFnZXNcIiwgaW1hZ2VzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHRoaXMuaW1hZ2VTaXplID0gVXRpbHMuZ2V0RW51bVZhbHVlT3JEZWZhdWx0KEVudW1zLlNpemUsIGpzb25bXCJpbWFnZVNpemVcIl0sIEVudW1zLlNpemUuTWVkaXVtKTtcclxuXHJcblx0XHRpZiAoanNvbltcImltYWdlc1wiXSAhPSBudWxsKSB7XHJcblx0XHRcdGxldCBqc29uSW1hZ2VzID0ganNvbltcImltYWdlc1wiXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuXHRcdFx0dGhpcy5faW1hZ2VzID0gW107XHJcblxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGpzb25JbWFnZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdFx0XHRpbWFnZS5wYXJzZShqc29uSW1hZ2VzW2ldLCBlcnJvcnMpO1xyXG5cclxuXHRcdFx0XHR0aGlzLmFkZEltYWdlKGltYWdlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkSW1hZ2UoaW1hZ2U6IEltYWdlKSB7XHJcblx0XHRpZiAoIWltYWdlLnBhcmVudCkge1xyXG5cdFx0XHR0aGlzLl9pbWFnZXMucHVzaChpbWFnZSk7XHJcblxyXG5cdFx0XHRpbWFnZS5zZXRQYXJlbnQodGhpcyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpbWFnZSBhbHJlYWR5IGJlbG9uZ3MgdG8gYW5vdGhlciBJbWFnZVNldFwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGluZGV4T2YoY2FyZEVsZW1lbnQ6IENhcmRFbGVtZW50KTogbnVtYmVyIHtcclxuXHRcdHJldHVybiBjYXJkRWxlbWVudCBpbnN0YW5jZW9mIEltYWdlID8gdGhpcy5faW1hZ2VzLmluZGV4T2YoY2FyZEVsZW1lbnQpIDogLTE7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJTcGVlY2goKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLnNwZWFrICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3BlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHNwZWFrID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5faW1hZ2VzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0c3BlYWsgPSAnJztcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faW1hZ2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0c3BlYWsgKz0gdGhpcy5faW1hZ2VzW2ldLnJlbmRlclNwZWVjaCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHNwZWFrO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lZGlhU291cmNlIHtcclxuXHRtaW1lVHlwZTogc3RyaW5nO1xyXG5cdHVybDogc3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZyA9IHVuZGVmaW5lZCwgbWltZVR5cGU6IHN0cmluZyA9IHVuZGVmaW5lZCkge1xyXG5cdFx0dGhpcy51cmwgPSB1cmw7XHJcblx0XHR0aGlzLm1pbWVUeXBlID0gbWltZVR5cGU7XHJcblx0fVxyXG5cclxuXHRwYXJzZShqc29uOiBhbnksIGVycm9ycz86IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pIHtcclxuXHRcdHRoaXMubWltZVR5cGUgPSBqc29uW1wibWltZVR5cGVcIl07XHJcblx0XHR0aGlzLnVybCA9IGpzb25bXCJ1cmxcIl07XHJcblx0fVxyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtaW1lVHlwZTogdGhpcy5taW1lVHlwZSxcclxuXHRcdFx0dXJsOiB0aGlzLnVybFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lZGlhIGV4dGVuZHMgQ2FyZEVsZW1lbnQge1xyXG5cdHN0YXRpYyByZWFkb25seSBzdXBwb3J0ZWRNZWRpYVR5cGVzID0gW1wiYXVkaW9cIiwgXCJ2aWRlb1wiXTtcclxuXHJcblx0cHJpdmF0ZSBfc2VsZWN0ZWRNZWRpYVR5cGU6IHN0cmluZztcclxuXHRwcml2YXRlIF9zZWxlY3RlZFNvdXJjZXM6IEFycmF5PE1lZGlhU291cmNlPjtcclxuXHJcblx0cHJpdmF0ZSBnZXRQb3N0ZXJVcmwoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLnBvc3RlciA/IHRoaXMucG9zdGVyIDogdGhpcy5ob3N0Q29uZmlnLm1lZGlhLmRlZmF1bHRQb3N0ZXI7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHByb2Nlc3NTb3VyY2VzKCkge1xyXG5cdFx0dGhpcy5fc2VsZWN0ZWRTb3VyY2VzID0gW107XHJcblx0XHR0aGlzLl9zZWxlY3RlZE1lZGlhVHlwZSA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHRmb3IgKGxldCBzb3VyY2Ugb2YgdGhpcy5zb3VyY2VzKSB7XHJcblx0XHRcdGxldCBtaW1lQ29tcG9uZW50cyA9IHNvdXJjZS5taW1lVHlwZS5zcGxpdCgnLycpO1xyXG5cclxuXHRcdFx0aWYgKG1pbWVDb21wb25lbnRzLmxlbmd0aCA9PSAyKSB7XHJcblx0XHRcdFx0aWYgKCF0aGlzLl9zZWxlY3RlZE1lZGlhVHlwZSkge1xyXG5cdFx0XHRcdFx0bGV0IGluZGV4ID0gTWVkaWEuc3VwcG9ydGVkTWVkaWFUeXBlcy5pbmRleE9mKG1pbWVDb21wb25lbnRzWzBdKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoaW5kZXggPj0gMCkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9zZWxlY3RlZE1lZGlhVHlwZSA9IE1lZGlhLnN1cHBvcnRlZE1lZGlhVHlwZXNbaW5kZXhdO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWltZUNvbXBvbmVudHNbMF0gPT0gdGhpcy5fc2VsZWN0ZWRNZWRpYVR5cGUpIHtcclxuXHRcdFx0XHRcdHRoaXMuX3NlbGVjdGVkU291cmNlcy5wdXNoKHNvdXJjZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlbmRlclBvc3RlcigpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRjb25zdCBwbGF5QnV0dG9uQXJyb3dXaWR0aCA9IDEyO1xyXG5cdFx0Y29uc3QgcGxheUJ1dHRvbkFycm93SGVpZ2h0ID0gMTU7XHJcblxyXG5cdFx0bGV0IHBvc3RlclJvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdHBvc3RlclJvb3RFbGVtZW50LmNsYXNzTmFtZSA9IFwiYWMtbWVkaWEtcG9zdGVyXCI7XHJcblx0XHRwb3N0ZXJSb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiY29udGVudGluZm9cIik7XHJcblx0XHRwb3N0ZXJSb290RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHRoaXMuYWx0VGV4dCA/IHRoaXMuYWx0VGV4dCA6IFwiTWVkaWEgY29udGVudFwiKTtcclxuXHRcdHBvc3RlclJvb3RFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiO1xyXG5cdFx0cG9zdGVyUm9vdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG5cclxuXHRcdGxldCBwb3N0ZXJVcmwgPSB0aGlzLmdldFBvc3RlclVybCgpO1xyXG5cclxuXHRcdGlmIChwb3N0ZXJVcmwpIHtcclxuXHRcdFx0bGV0IHBvc3RlckltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcblx0XHRcdHBvc3RlckltYWdlRWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG5cdFx0XHRwb3N0ZXJJbWFnZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XHJcblxyXG5cdFx0XHRwb3N0ZXJJbWFnZUVsZW1lbnQub25lcnJvciA9IChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdHBvc3RlckltYWdlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHBvc3RlckltYWdlRWxlbWVudCk7XHJcblx0XHRcdFx0cG9zdGVyUm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpO1xyXG5cdFx0XHRcdHBvc3RlclJvb3RFbGVtZW50LnN0eWxlLm1pbkhlaWdodCA9IFwiMTUwcHhcIjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9zdGVySW1hZ2VFbGVtZW50LnNyYyA9IHBvc3RlclVybDtcclxuXHJcblx0XHRcdHBvc3RlclJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBvc3RlckltYWdlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cG9zdGVyUm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpO1xyXG5cdFx0XHRwb3N0ZXJSb290RWxlbWVudC5zdHlsZS5taW5IZWlnaHQgPSBcIjE1MHB4XCI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaG9zdENvbmZpZy5zdXBwb3J0c0ludGVyYWN0aXZpdHkgJiYgdGhpcy5fc2VsZWN0ZWRTb3VyY2VzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0bGV0IHBsYXlCdXR0b25PdXRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRwbGF5QnV0dG9uT3V0ZXJFbGVtZW50LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XHJcblx0XHRcdHBsYXlCdXR0b25PdXRlckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIlBsYXkgbWVkaWFcIik7XHJcblx0XHRcdHBsYXlCdXR0b25PdXRlckVsZW1lbnQuY2xhc3NOYW1lID0gXCJhYy1tZWRpYS1wbGF5QnV0dG9uXCI7XHJcblx0XHRcdHBsYXlCdXR0b25PdXRlckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG5cdFx0XHRwbGF5QnV0dG9uT3V0ZXJFbGVtZW50LnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xyXG5cdFx0XHRwbGF5QnV0dG9uT3V0ZXJFbGVtZW50LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcclxuXHRcdFx0cGxheUJ1dHRvbk91dGVyRWxlbWVudC5vbmNsaWNrID0gKGUpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5ob3N0Q29uZmlnLm1lZGlhLmFsbG93SW5saW5lUGxheWJhY2spIHtcclxuXHRcdFx0XHRcdGxldCBtZWRpYVBsYXllckVsZW1lbnQgPSB0aGlzLnJlbmRlck1lZGlhUGxheWVyKCk7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdFx0XHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LmFwcGVuZENoaWxkKG1lZGlhUGxheWVyRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdFx0bWVkaWFQbGF5ZXJFbGVtZW50LnBsYXkoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAoTWVkaWEub25QbGF5KSB7XHJcblx0XHRcdFx0XHRcdE1lZGlhLm9uUGxheSh0aGlzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBwbGF5QnV0dG9uSW5uZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0cGxheUJ1dHRvbklubmVyRWxlbWVudC5jbGFzc05hbWUgPSBcImFjLW1lZGlhLXBsYXlCdXR0b24tYXJyb3dcIjtcclxuXHRcdFx0cGxheUJ1dHRvbklubmVyRWxlbWVudC5zdHlsZS53aWR0aCA9IHBsYXlCdXR0b25BcnJvd1dpZHRoICsgXCJweFwiO1xyXG5cdFx0XHRwbGF5QnV0dG9uSW5uZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IHBsYXlCdXR0b25BcnJvd0hlaWdodCArIFwicHhcIjtcclxuXHRcdFx0cGxheUJ1dHRvbklubmVyRWxlbWVudC5zdHlsZS5ib3JkZXJUb3BXaWR0aCA9IChwbGF5QnV0dG9uQXJyb3dIZWlnaHQgLyAyKSArIFwicHhcIjtcclxuXHRcdFx0cGxheUJ1dHRvbklubmVyRWxlbWVudC5zdHlsZS5ib3JkZXJCb3R0b21XaWR0aCA9IChwbGF5QnV0dG9uQXJyb3dIZWlnaHQgLyAyKSArIFwicHhcIjtcclxuXHRcdFx0cGxheUJ1dHRvbklubmVyRWxlbWVudC5zdHlsZS5ib3JkZXJMZWZ0V2lkdGggPSBwbGF5QnV0dG9uQXJyb3dXaWR0aCArIFwicHhcIjtcclxuXHRcdFx0cGxheUJ1dHRvbklubmVyRWxlbWVudC5zdHlsZS5ib3JkZXJSaWdodFdpZHRoID0gXCIwXCI7XHJcblx0XHRcdHBsYXlCdXR0b25Jbm5lckVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBcInNvbGlkXCI7XHJcblx0XHRcdHBsYXlCdXR0b25Jbm5lckVsZW1lbnQuc3R5bGUuYm9yZGVyVG9wQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7XHJcblx0XHRcdHBsYXlCdXR0b25Jbm5lckVsZW1lbnQuc3R5bGUuYm9yZGVyUmlnaHRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcclxuXHRcdFx0cGxheUJ1dHRvbklubmVyRWxlbWVudC5zdHlsZS5ib3JkZXJCb3R0b21Db2xvciA9IFwidHJhbnNwYXJlbnRcIjtcclxuXHRcdFx0cGxheUJ1dHRvbklubmVyRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZShcIiArIChwbGF5QnV0dG9uQXJyb3dXaWR0aCAvIDEwKSArIFwicHgsMHB4KVwiO1xyXG5cclxuXHRcdFx0cGxheUJ1dHRvbk91dGVyRWxlbWVudC5hcHBlbmRDaGlsZChwbGF5QnV0dG9uSW5uZXJFbGVtZW50KTtcclxuXHJcblx0XHRcdGxldCBwbGF5QnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0cGxheUJ1dHRvbkNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuXHRcdFx0cGxheUJ1dHRvbkNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcblx0XHRcdHBsYXlCdXR0b25Db250YWluZXIuc3R5bGUudG9wID0gXCIwXCI7XHJcblx0XHRcdHBsYXlCdXR0b25Db250YWluZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuXHRcdFx0cGxheUJ1dHRvbkNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcclxuXHRcdFx0cGxheUJ1dHRvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcblx0XHRcdHBsYXlCdXR0b25Db250YWluZXIuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xyXG5cdFx0XHRwbGF5QnV0dG9uQ29udGFpbmVyLnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xyXG5cclxuXHRcdFx0cGxheUJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5QnV0dG9uT3V0ZXJFbGVtZW50KTtcclxuXHRcdFx0cG9zdGVyUm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocGxheUJ1dHRvbkNvbnRhaW5lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBvc3RlclJvb3RFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByZW5kZXJNZWRpYVBsYXllcigpOiBIVE1MTWVkaWFFbGVtZW50IHtcclxuXHRcdGxldCBtZWRpYUVsZW1lbnQ6IEhUTUxNZWRpYUVsZW1lbnQ7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkTWVkaWFUeXBlID09IFwidmlkZW9cIikge1xyXG5cdFx0XHRsZXQgdmlkZW9QbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidmlkZW9cIik7XHJcblxyXG5cdFx0XHRsZXQgcG9zdGVyVXJsID0gdGhpcy5nZXRQb3N0ZXJVcmwoKTtcclxuXHJcblx0XHRcdGlmIChwb3N0ZXJVcmwpIHtcclxuXHRcdFx0XHR2aWRlb1BsYXllci5wb3N0ZXIgPSBwb3N0ZXJVcmw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG1lZGlhRWxlbWVudCA9IHZpZGVvUGxheWVyO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKTtcclxuXHRcdH1cclxuXHJcblx0XHRtZWRpYUVsZW1lbnQuY29udHJvbHMgPSB0cnVlO1xyXG5cdFx0bWVkaWFFbGVtZW50LnByZWxvYWQgPSBcIm5vbmVcIjtcclxuXHRcdG1lZGlhRWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG5cclxuXHRcdGZvciAobGV0IHNvdXJjZSBvZiB0aGlzLnNvdXJjZXMpIHtcclxuXHRcdFx0bGV0IHNyYzogSFRNTFNvdXJjZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpO1xyXG5cdFx0XHRzcmMuc3JjID0gc291cmNlLnVybDtcclxuXHRcdFx0c3JjLnR5cGUgPSBzb3VyY2UubWltZVR5cGU7XHJcblxyXG5cdFx0XHRtZWRpYUVsZW1lbnQuYXBwZW5kQ2hpbGQoc3JjKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbWVkaWFFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGludGVybmFsUmVuZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdGxldCBlbGVtZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtbWVkaWFcIik7XHJcblxyXG5cdFx0dGhpcy5wcm9jZXNzU291cmNlcygpO1xyXG5cclxuXHRcdGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJQb3N0ZXIoKSk7XHJcblxyXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgb25QbGF5OiAoc2VuZGVyOiBNZWRpYSkgPT4gdm9pZDtcclxuXHJcblx0c291cmNlczogQXJyYXk8TWVkaWFTb3VyY2U+ID0gW107XHJcblx0cG9zdGVyOiBzdHJpbmc7XHJcblx0YWx0VGV4dDogc3RyaW5nO1xyXG5cclxuXHRwYXJzZShqc29uOiBhbnksIGVycm9ycz86IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pIHtcclxuXHRcdHN1cGVyLnBhcnNlKGpzb24sIGVycm9ycyk7XHJcblxyXG5cdFx0dGhpcy5wb3N0ZXIgPSBqc29uW1wicG9zdGVyXCJdO1xyXG5cdFx0dGhpcy5hbHRUZXh0ID0ganNvbltcImFsdFRleHRcIl07XHJcblxyXG5cdFx0aWYgKGpzb25bXCJzb3VyY2VzXCJdICE9IG51bGwpIHtcclxuXHRcdFx0bGV0IGpzb25Tb3VyY2VzID0ganNvbltcInNvdXJjZXNcIl0gYXMgQXJyYXk8YW55PjtcclxuXHJcblx0XHRcdHRoaXMuc291cmNlcyA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBqc29uU291cmNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBzb3VyY2UgPSBuZXcgTWVkaWFTb3VyY2UoKTtcclxuXHRcdFx0XHRzb3VyY2UucGFyc2UoanNvblNvdXJjZXNbaV0sIGVycm9ycyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuc291cmNlcy5wdXNoKHNvdXJjZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRvSlNPTigpIHtcclxuXHRcdGxldCByZXN1bHQgPSBzdXBlci50b0pTT04oKTtcclxuXHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwicG9zdGVyXCIsIHRoaXMucG9zdGVyKTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJhbHRUZXh0XCIsIHRoaXMuYWx0VGV4dCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuc291cmNlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGxldCBzZXJpYWxpemVkU291cmNlcyA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgc291cmNlIG9mIHRoaXMuc291cmNlcykge1xyXG5cdFx0XHRcdHNlcmlhbGl6ZWRTb3VyY2VzLnB1c2goc291cmNlLnRvSlNPTigpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcInNvdXJjZXNcIiwgc2VyaWFsaXplZFNvdXJjZXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIk1lZGlhXCI7XHJcblx0fVxyXG5cclxuXHRnZXRSZXNvdXJjZUluZm9ybWF0aW9uKCk6IEFycmF5PElSZXNvdXJjZUluZm9ybWF0aW9uPiB7XHJcblx0XHRsZXQgcmVzdWx0OiBBcnJheTxJUmVzb3VyY2VJbmZvcm1hdGlvbj4gPSBbXTtcclxuXHJcblx0XHRsZXQgcG9zdGVyVXJsID0gdGhpcy5nZXRQb3N0ZXJVcmwoKTtcclxuXHJcblx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkocG9zdGVyVXJsKSkge1xyXG5cdFx0XHRyZXN1bHQucHVzaCh7IHVybDogcG9zdGVyVXJsLCBtaW1lVHlwZTogXCJpbWFnZVwiIH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IG1lZGlhU291cmNlIG9mIHRoaXMuc291cmNlcykge1xyXG5cdFx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkobWVkaWFTb3VyY2UudXJsKSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKHsgdXJsOiBtZWRpYVNvdXJjZS51cmwsIG1pbWVUeXBlOiBtZWRpYVNvdXJjZS5taW1lVHlwZSB9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJTcGVlY2goKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLmFsdFRleHQ7XHJcblx0fVxyXG5cclxuXHRnZXQgc2VsZWN0ZWRNZWRpYVR5cGUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLl9zZWxlY3RlZE1lZGlhVHlwZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnB1dCBleHRlbmRzIENhcmRFbGVtZW50IGltcGxlbWVudHMgVXRpbHMuSUlucHV0IHtcclxuXHRwcm90ZWN0ZWQgdmFsdWVDaGFuZ2VkKCkge1xyXG5cdFx0aWYgKHRoaXMub25WYWx1ZUNoYW5nZWQpIHtcclxuXHRcdFx0dGhpcy5vblZhbHVlQ2hhbmdlZCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFic3RyYWN0IGdldCB2YWx1ZSgpOiBzdHJpbmc7XHJcblxyXG5cdG9uVmFsdWVDaGFuZ2VkOiAoc2VuZGVyOiBJbnB1dCkgPT4gdm9pZDtcclxuXHJcblx0dGl0bGU6IHN0cmluZztcclxuXHRkZWZhdWx0VmFsdWU6IHN0cmluZztcclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHN1cGVyLnRvSlNPTigpO1xyXG5cclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJ0aXRsZVwiLCB0aGlzLnRpdGxlKTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJ2YWx1ZVwiLCB0aGlzLnJlbmRlcmVkRWxlbWVudCA/IHRoaXMudmFsdWUgOiB0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHZhbGlkYXRlKCk6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4ge1xyXG5cdFx0aWYgKCF0aGlzLmlkKSB7XHJcblx0XHRcdHJldHVybiBbeyBlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLlByb3BlcnR5Q2FudEJlTnVsbCwgbWVzc2FnZTogXCJBbGwgaW5wdXRzIG11c3QgaGF2ZSBhIHVuaXF1ZSBJZFwiIH1dO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBbXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHBhcnNlKGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdFx0c3VwZXIucGFyc2UoanNvbiwgZXJyb3JzKTtcclxuXHJcblx0XHR0aGlzLmlkID0ganNvbltcImlkXCJdO1xyXG5cdFx0dGhpcy5kZWZhdWx0VmFsdWUgPSBqc29uW1widmFsdWVcIl07XHJcblx0fVxyXG5cclxuXHRyZW5kZXJTcGVlY2goKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLnNwZWFrICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3BlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMudGl0bGUpIHtcclxuXHRcdFx0cmV0dXJuICc8cz4nICsgdGhpcy50aXRsZSArICc8L3M+XFxuJztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldEFsbElucHV0cygpOiBBcnJheTxJbnB1dD4ge1xyXG5cdFx0cmV0dXJuIFt0aGlzXTtcclxuXHR9XHJcblxyXG5cdGdldCBpc0ludGVyYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dElucHV0IGV4dGVuZHMgSW5wdXQge1xyXG5cdHByaXZhdGUgX3RleHRhcmVhRWxlbWVudDogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuXHRwcml2YXRlIF9pbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cdHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRpZiAodGhpcy5pc011bHRpbGluZSkge1xyXG5cdFx0XHR0aGlzLl90ZXh0YXJlYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XHJcblx0XHRcdHRoaXMuX3RleHRhcmVhRWxlbWVudC5jbGFzc05hbWUgPSB0aGlzLmhvc3RDb25maWcubWFrZUNzc0NsYXNzTmFtZShcImFjLWlucHV0XCIsIFwiYWMtdGV4dElucHV0XCIsIFwiYWMtbXVsdGlsaW5lXCIpO1xyXG5cdFx0XHR0aGlzLl90ZXh0YXJlYUVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuXHRcdFx0dGhpcy5fdGV4dGFyZWFFbGVtZW50LnRhYkluZGV4ID0gMDtcclxuXHJcblx0XHRcdGlmICghVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLnBsYWNlaG9sZGVyKSkge1xyXG5cdFx0XHRcdHRoaXMuX3RleHRhcmVhRWxlbWVudC5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXI7XHJcblx0XHRcdFx0dGhpcy5fdGV4dGFyZWFFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdGhpcy5wbGFjZWhvbGRlcilcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFVdGlscy5pc051bGxPckVtcHR5KHRoaXMuZGVmYXVsdFZhbHVlKSkge1xyXG5cdFx0XHRcdHRoaXMuX3RleHRhcmVhRWxlbWVudC52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5tYXhMZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0dGhpcy5fdGV4dGFyZWFFbGVtZW50Lm1heExlbmd0aCA9IHRoaXMubWF4TGVuZ3RoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl90ZXh0YXJlYUVsZW1lbnQub25pbnB1dCA9ICgpID0+IHsgdGhpcy52YWx1ZUNoYW5nZWQoKTsgfVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuX3RleHRhcmVhRWxlbWVudDtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9pbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcblx0XHRcdHRoaXMuX2lucHV0RWxlbWVudC50eXBlID0gRW51bXMuSW5wdXRUZXh0U3R5bGVbdGhpcy5zdHlsZV0udG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0dGhpcy5faW5wdXRFbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtaW5wdXRcIiwgXCJhYy10ZXh0SW5wdXRcIik7XHJcblx0XHRcdHRoaXMuX2lucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG5cdFx0XHR0aGlzLl9pbnB1dEVsZW1lbnQudGFiSW5kZXggPSAwO1xyXG5cclxuXHRcdFx0aWYgKCFVdGlscy5pc051bGxPckVtcHR5KHRoaXMucGxhY2Vob2xkZXIpKSB7XHJcblx0XHRcdFx0dGhpcy5faW5wdXRFbGVtZW50LnBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlcjtcclxuXHRcdFx0XHR0aGlzLl9pbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0aGlzLnBsYWNlaG9sZGVyKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkodGhpcy5kZWZhdWx0VmFsdWUpKSB7XHJcblx0XHRcdFx0dGhpcy5faW5wdXRFbGVtZW50LnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLm1heExlbmd0aCA+IDApIHtcclxuXHRcdFx0XHR0aGlzLl9pbnB1dEVsZW1lbnQubWF4TGVuZ3RoID0gdGhpcy5tYXhMZW5ndGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX2lucHV0RWxlbWVudC5vbmlucHV0ID0gKCkgPT4geyB0aGlzLnZhbHVlQ2hhbmdlZCgpOyB9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5faW5wdXRFbGVtZW50O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bWF4TGVuZ3RoOiBudW1iZXI7XHJcblx0aXNNdWx0aWxpbmU6IGJvb2xlYW47XHJcblx0cGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHRzdHlsZTogRW51bXMuSW5wdXRUZXh0U3R5bGUgPSBFbnVtcy5JbnB1dFRleHRTdHlsZS5UZXh0O1xyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIklucHV0LlRleHRcIjtcclxuXHR9XHJcblxyXG5cdHRvSlNPTigpIHtcclxuXHRcdGxldCByZXN1bHQgPSBzdXBlci50b0pTT04oKTtcclxuXHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwicGxhY2Vob2xkZXJcIiwgdGhpcy5wbGFjZWhvbGRlcik7XHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwibWF4TGVuZ3RoXCIsIHRoaXMubWF4TGVuZ3RoLCAwKTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJpc011bHRpbGluZVwiLCB0aGlzLmlzTXVsdGlsaW5lLCBmYWxzZSk7XHJcblx0XHRVdGlscy5zZXRFbnVtUHJvcGVydHkoRW51bXMuSW5wdXRUZXh0U3R5bGUsIHJlc3VsdCwgXCJzdHlsZVwiLCB0aGlzLnN0eWxlLCBFbnVtcy5JbnB1dFRleHRTdHlsZS5UZXh0KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHRoaXMubWF4TGVuZ3RoID0ganNvbltcIm1heExlbmd0aFwiXTtcclxuXHRcdHRoaXMuaXNNdWx0aWxpbmUgPSBqc29uW1wiaXNNdWx0aWxpbmVcIl07XHJcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0ganNvbltcInBsYWNlaG9sZGVyXCJdO1xyXG5cdFx0dGhpcy5zdHlsZSA9IFV0aWxzLmdldEVudW1WYWx1ZU9yRGVmYXVsdChFbnVtcy5JbnB1dFRleHRTdHlsZSwganNvbltcInN0eWxlXCJdLCB0aGlzLnN0eWxlKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG5cdFx0aWYgKHRoaXMuaXNNdWx0aWxpbmUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX3RleHRhcmVhRWxlbWVudCA/IHRoaXMuX3RleHRhcmVhRWxlbWVudC52YWx1ZSA6IG51bGw7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2lucHV0RWxlbWVudCA/IHRoaXMuX2lucHV0RWxlbWVudC52YWx1ZSA6IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG9nZ2xlSW5wdXQgZXh0ZW5kcyBJbnB1dCB7XHJcblx0cHJpdmF0ZSBfY2hlY2tib3hJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cdHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtaW5wdXRcIik7XHJcblx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XHJcblx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuXHRcdGVsZW1lbnQuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XHJcblxyXG5cdFx0dGhpcy5fY2hlY2tib3hJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcblx0XHR0aGlzLl9jaGVja2JveElucHV0RWxlbWVudC5pZCA9IGdlbmVyYXRlVW5pcXVlSWQoKTtcclxuXHRcdHRoaXMuX2NoZWNrYm94SW5wdXRFbGVtZW50LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcblx0XHR0aGlzLl9jaGVja2JveElucHV0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcclxuXHRcdHRoaXMuX2NoZWNrYm94SW5wdXRFbGVtZW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcIm1pZGRsZVwiO1xyXG5cdFx0dGhpcy5fY2hlY2tib3hJbnB1dEVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIwXCI7XHJcblx0XHR0aGlzLl9jaGVja2JveElucHV0RWxlbWVudC5zdHlsZS5mbGV4ID0gXCIwIDAgYXV0b1wiO1xyXG5cdFx0dGhpcy5fY2hlY2tib3hJbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0aGlzLnRpdGxlKTtcclxuXHRcdHRoaXMuX2NoZWNrYm94SW5wdXRFbGVtZW50LnRhYkluZGV4ID0gMDtcclxuXHJcblx0XHRpZiAodGhpcy5kZWZhdWx0VmFsdWUgPT0gdGhpcy52YWx1ZU9uKSB7XHJcblx0XHRcdHRoaXMuX2NoZWNrYm94SW5wdXRFbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2NoZWNrYm94SW5wdXRFbGVtZW50Lm9uY2hhbmdlID0gKCkgPT4geyB0aGlzLnZhbHVlQ2hhbmdlZCgpOyB9XHJcblxyXG5cdFx0VXRpbHMuYXBwZW5kQ2hpbGQoZWxlbWVudCwgdGhpcy5fY2hlY2tib3hJbnB1dEVsZW1lbnQpO1xyXG5cclxuXHRcdGlmICghVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLnRpdGxlKSB8fCB0aGlzLmlzRGVzaWduTW9kZSgpKSB7XHJcblx0XHRcdGxldCBsYWJlbCA9IG5ldyBMYWJlbCgpO1xyXG5cdFx0XHRsYWJlbC5zZXRQYXJlbnQodGhpcyk7XHJcblx0XHRcdGxhYmVsLmZvckVsZW1lbnRJZCA9IHRoaXMuX2NoZWNrYm94SW5wdXRFbGVtZW50LmlkO1xyXG5cdFx0XHRsYWJlbC5ob3N0Q29uZmlnID0gdGhpcy5ob3N0Q29uZmlnO1xyXG5cdFx0XHRsYWJlbC50ZXh0ID0gVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLnRpdGxlKSA/IHRoaXMuZ2V0SnNvblR5cGVOYW1lKCkgOiB0aGlzLnRpdGxlO1xyXG5cdFx0XHRsYWJlbC51c2VNYXJrZG93biA9IEFkYXB0aXZlQ2FyZC51c2VNYXJrZG93bkluUmFkaW9CdXR0b25BbmRDaGVja2JveDtcclxuXHJcblx0XHRcdGxldCBsYWJlbEVsZW1lbnQgPSBsYWJlbC5yZW5kZXIoKTtcclxuXHRcdFx0bGFiZWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG5cdFx0XHRsYWJlbEVsZW1lbnQuc3R5bGUuZmxleCA9IFwiMSAxIGF1dG9cIjtcclxuXHRcdFx0bGFiZWxFbGVtZW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcIm1pZGRsZVwiO1xyXG5cclxuXHRcdFx0bGV0IHNwYWNlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRzcGFjZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCI2cHhcIjtcclxuXHJcblx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGVsZW1lbnQsIHNwYWNlckVsZW1lbnQpO1xyXG5cdFx0XHRVdGlscy5hcHBlbmRDaGlsZChlbGVtZW50LCBsYWJlbEVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBlbGVtZW50O1xyXG5cdH1cclxuXHJcblx0dmFsdWVPbjogc3RyaW5nID0gXCJ0cnVlXCI7XHJcblx0dmFsdWVPZmY6IHN0cmluZyA9IFwiZmFsc2VcIjtcclxuXHJcblx0Z2V0SnNvblR5cGVOYW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXCJJbnB1dC5Ub2dnbGVcIjtcclxuXHR9XHJcblxyXG5cdHRvSlNPTigpIHtcclxuXHRcdGxldCByZXN1bHQgPSBzdXBlci50b0pTT04oKTtcclxuXHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwidmFsdWVPblwiLCB0aGlzLnZhbHVlT24sIFwidHJ1ZVwiKTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJ2YWx1ZU9mZlwiLCB0aGlzLnZhbHVlT2ZmLCBcImZhbHNlXCIpO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRwYXJzZShqc29uOiBhbnksIGVycm9ycz86IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pIHtcclxuXHRcdHN1cGVyLnBhcnNlKGpzb24sIGVycm9ycyk7XHJcblxyXG5cdFx0dGhpcy50aXRsZSA9IGpzb25bXCJ0aXRsZVwiXTtcclxuXHJcblx0XHR0aGlzLnZhbHVlT24gPSBVdGlscy5nZXRWYWx1ZU9yRGVmYXVsdDxzdHJpbmc+KGpzb25bXCJ2YWx1ZU9uXCJdLCB0aGlzLnZhbHVlT24pO1xyXG5cdFx0dGhpcy52YWx1ZU9mZiA9IFV0aWxzLmdldFZhbHVlT3JEZWZhdWx0PHN0cmluZz4oanNvbltcInZhbHVlT2ZmXCJdLCB0aGlzLnZhbHVlT2ZmKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG5cdFx0aWYgKHRoaXMuX2NoZWNrYm94SW5wdXRFbGVtZW50KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jaGVja2JveElucHV0RWxlbWVudC5jaGVja2VkID8gdGhpcy52YWx1ZU9uIDogdGhpcy52YWx1ZU9mZjtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaG9pY2Uge1xyXG5cdHRpdGxlOiBzdHJpbmc7XHJcblx0dmFsdWU6IHN0cmluZztcclxuXHJcblx0Y29uc3RydWN0b3IodGl0bGU6IHN0cmluZyA9IHVuZGVmaW5lZCwgdmFsdWU6IHN0cmluZyA9IHVuZGVmaW5lZCkge1xyXG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xyXG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0cmV0dXJuIHsgdGl0bGU6IHRoaXMudGl0bGUsIHZhbHVlOiB0aGlzLnZhbHVlIH07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hvaWNlU2V0SW5wdXQgZXh0ZW5kcyBJbnB1dCB7XHJcblx0cHJpdmF0ZSBzdGF0aWMgdW5pcXVlQ2F0ZWdvcnlDb3VudGVyID0gMDtcclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgZ2V0VW5pcXVlQ2F0ZWdvcnlOYW1lKCk6IHN0cmluZyB7XHJcblx0XHRsZXQgdW5pcXVlQ3d0ZWdvcnlOYW1lID0gXCJfX2FjLWNhdGVnb3J5XCIgKyBDaG9pY2VTZXRJbnB1dC51bmlxdWVDYXRlZ29yeUNvdW50ZXI7XHJcblxyXG5cdFx0Q2hvaWNlU2V0SW5wdXQudW5pcXVlQ2F0ZWdvcnlDb3VudGVyKys7XHJcblxyXG5cdFx0cmV0dXJuIHVuaXF1ZUN3dGVnb3J5TmFtZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX3NlbGVjdEVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50O1xyXG5cdHByaXZhdGUgX3RvZ2dsZUlucHV0czogQXJyYXk8SFRNTElucHV0RWxlbWVudD47XHJcblxyXG5cdHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRpZiAoIXRoaXMuaXNNdWx0aVNlbGVjdCkge1xyXG5cdFx0XHRpZiAodGhpcy5pc0NvbXBhY3QpIHtcclxuXHRcdFx0XHQvLyBSZW5kZXIgYXMgYSBjb21ibyBib3hcclxuXHRcdFx0XHR0aGlzLl9zZWxlY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuXHRcdFx0XHR0aGlzLl9zZWxlY3RFbGVtZW50LmNsYXNzTmFtZSA9IHRoaXMuaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtaW5wdXRcIiwgXCJhYy1tdWx0aWNob2ljZUlucHV0XCIpO1xyXG5cdFx0XHRcdHRoaXMuX3NlbGVjdEVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuXHJcblx0XHRcdFx0bGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcblx0XHRcdFx0b3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRvcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xyXG5cdFx0XHRcdG9wdGlvbi5oaWRkZW4gPSB0cnVlO1xyXG5cdFx0XHRcdG9wdGlvbi52YWx1ZSA9IFwiXCI7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLnBsYWNlaG9sZGVyKSB7XHJcblx0XHRcdFx0XHRvcHRpb24udGV4dCA9IHRoaXMucGxhY2Vob2xkZXI7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRVdGlscy5hcHBlbmRDaGlsZCh0aGlzLl9zZWxlY3RFbGVtZW50LCBvcHRpb24pO1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2hvaWNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0bGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcblx0XHRcdFx0XHRvcHRpb24udmFsdWUgPSB0aGlzLmNob2ljZXNbaV0udmFsdWU7XHJcblx0XHRcdFx0XHRvcHRpb24udGV4dCA9IHRoaXMuY2hvaWNlc1tpXS50aXRsZTtcclxuXHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHRoaXMuY2hvaWNlc1tpXS50aXRsZSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHRoaXMuY2hvaWNlc1tpXS52YWx1ZSA9PSB0aGlzLmRlZmF1bHRWYWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKHRoaXMuX3NlbGVjdEVsZW1lbnQsIG9wdGlvbik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLl9zZWxlY3RFbGVtZW50Lm9uY2hhbmdlID0gKCkgPT4geyB0aGlzLnZhbHVlQ2hhbmdlZCgpOyB9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLl9zZWxlY3RFbGVtZW50O1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdC8vIFJlbmRlciBhcyBhIHNlcmllcyBvZiByYWRpbyBidXR0b25zXHJcblx0XHRcdFx0bGV0IHVuaXF1ZUNhdGVnb3J5TmFtZSA9IENob2ljZVNldElucHV0LmdldFVuaXF1ZUNhdGVnb3J5TmFtZSgpO1xyXG5cclxuXHRcdFx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSB0aGlzLmhvc3RDb25maWcubWFrZUNzc0NsYXNzTmFtZShcImFjLWlucHV0XCIpO1xyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuXHJcblx0XHRcdFx0dGhpcy5fdG9nZ2xlSW5wdXRzID0gW107XHJcblxyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaG9pY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRsZXQgcmFkaW9JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuXHRcdFx0XHRcdHJhZGlvSW5wdXQuaWQgPSBnZW5lcmF0ZVVuaXF1ZUlkKCk7XHJcblx0XHRcdFx0XHRyYWRpb0lucHV0LnR5cGUgPSBcInJhZGlvXCI7XHJcblx0XHRcdFx0XHRyYWRpb0lucHV0LnN0eWxlLm1hcmdpbiA9IFwiMFwiO1xyXG5cdFx0XHRcdFx0cmFkaW9JbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcclxuXHRcdFx0XHRcdHJhZGlvSW5wdXQuc3R5bGUudmVydGljYWxBbGlnbiA9IFwibWlkZGxlXCI7XHJcblx0XHRcdFx0XHRyYWRpb0lucHV0Lm5hbWUgPSBVdGlscy5pc051bGxPckVtcHR5KHRoaXMuaWQpID8gdW5pcXVlQ2F0ZWdvcnlOYW1lIDogdGhpcy5pZDtcclxuXHRcdFx0XHRcdHJhZGlvSW5wdXQudmFsdWUgPSB0aGlzLmNob2ljZXNbaV0udmFsdWU7XHJcblx0XHRcdFx0XHRyYWRpb0lucHV0LnN0eWxlLmZsZXggPSBcIjAgMCBhdXRvXCI7XHJcblx0XHRcdFx0XHRyYWRpb0lucHV0LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdGhpcy5jaG9pY2VzW2ldLnRpdGxlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5jaG9pY2VzW2ldLnZhbHVlID09IHRoaXMuZGVmYXVsdFZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdHJhZGlvSW5wdXQuY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmFkaW9JbnB1dC5vbmNoYW5nZSA9ICgpID0+IHsgdGhpcy52YWx1ZUNoYW5nZWQoKTsgfVxyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3RvZ2dsZUlucHV0cy5wdXNoKHJhZGlvSW5wdXQpO1xyXG5cclxuXHRcdFx0XHRcdGxldCBsYWJlbCA9IG5ldyBMYWJlbCgpO1xyXG5cdFx0XHRcdFx0bGFiZWwuc2V0UGFyZW50KHRoaXMpO1xyXG5cdFx0XHRcdFx0bGFiZWwuZm9yRWxlbWVudElkID0gcmFkaW9JbnB1dC5pZDtcclxuXHRcdFx0XHRcdGxhYmVsLmhvc3RDb25maWcgPSB0aGlzLmhvc3RDb25maWc7XHJcblx0XHRcdFx0XHRsYWJlbC50ZXh0ID0gVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLmNob2ljZXNbaV0udGl0bGUpID8gXCJDaG9pY2UgXCIgKyBpIDogdGhpcy5jaG9pY2VzW2ldLnRpdGxlO1xyXG5cdFx0XHRcdFx0bGFiZWwudXNlTWFya2Rvd24gPSBBZGFwdGl2ZUNhcmQudXNlTWFya2Rvd25JblJhZGlvQnV0dG9uQW5kQ2hlY2tib3g7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGxhYmVsRWxlbWVudCA9IGxhYmVsLnJlbmRlcigpO1xyXG5cdFx0XHRcdFx0bGFiZWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG5cdFx0XHRcdFx0bGFiZWxFbGVtZW50LnN0eWxlLmZsZXggPSBcIjEgMSBhdXRvXCI7XHJcblx0XHRcdFx0XHRsYWJlbEVsZW1lbnQuc3R5bGUubWFyZ2luTGVmdCA9IFwiNnB4XCI7XHJcblx0XHRcdFx0XHRsYWJlbEVsZW1lbnQuc3R5bGUudmVydGljYWxBbGlnbiA9IFwibWlkZGxlXCI7XHJcblxyXG5cdFx0XHRcdFx0bGV0IHNwYWNlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRcdFx0c3BhY2VyRWxlbWVudC5zdHlsZS53aWR0aCA9IFwiNnB4XCI7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGNvbXBvdW5kSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRcdFx0Y29tcG91bmRJbnB1dC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcblxyXG5cdFx0XHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQoY29tcG91bmRJbnB1dCwgcmFkaW9JbnB1dCk7XHJcblx0XHRcdFx0XHRVdGlscy5hcHBlbmRDaGlsZChjb21wb3VuZElucHV0LCBzcGFjZXJFbGVtZW50KTtcclxuXHRcdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGNvbXBvdW5kSW5wdXQsIGxhYmVsRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQoZWxlbWVudCwgY29tcG91bmRJbnB1dCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdC8vIFJlbmRlciBhcyBhIGxpc3Qgb2YgdG9nZ2xlIGlucHV0c1xyXG5cdFx0XHRsZXQgZGVmYXVsdFZhbHVlcyA9IHRoaXMuZGVmYXVsdFZhbHVlID8gdGhpcy5kZWZhdWx0VmFsdWUuc3BsaXQodGhpcy5ob3N0Q29uZmlnLmNob2ljZVNldElucHV0VmFsdWVTZXBhcmF0b3IpIDogbnVsbDtcclxuXHJcblx0XHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc05hbWUgPSB0aGlzLmhvc3RDb25maWcubWFrZUNzc0NsYXNzTmFtZShcImFjLWlucHV0XCIpO1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XHJcblxyXG5cdFx0XHR0aGlzLl90b2dnbGVJbnB1dHMgPSBbXTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaG9pY2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IGNoZWNrYm94SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcblx0XHRcdFx0Y2hlY2tib3hJbnB1dC5pZCA9IGdlbmVyYXRlVW5pcXVlSWQoKTtcclxuXHRcdFx0XHRjaGVja2JveElucHV0LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcblx0XHRcdFx0Y2hlY2tib3hJbnB1dC5zdHlsZS5tYXJnaW4gPSBcIjBcIjtcclxuXHRcdFx0XHRjaGVja2JveElucHV0LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG5cdFx0XHRcdGNoZWNrYm94SW5wdXQuc3R5bGUudmVydGljYWxBbGlnbiA9IFwibWlkZGxlXCI7XHJcblx0XHRcdFx0Y2hlY2tib3hJbnB1dC52YWx1ZSA9IHRoaXMuY2hvaWNlc1tpXS52YWx1ZTtcclxuXHRcdFx0XHRjaGVja2JveElucHV0LnN0eWxlLmZsZXggPSBcIjAgMCBhdXRvXCI7XHJcblx0XHRcdFx0Y2hlY2tib3hJbnB1dC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHRoaXMuY2hvaWNlc1tpXS50aXRsZSk7XHJcblxyXG5cdFx0XHRcdGlmIChkZWZhdWx0VmFsdWVzKSB7XHJcblx0XHRcdFx0XHRpZiAoZGVmYXVsdFZhbHVlcy5pbmRleE9mKHRoaXMuY2hvaWNlc1tpXS52YWx1ZSkgPj0gMCkge1xyXG5cdFx0XHRcdFx0XHRjaGVja2JveElucHV0LmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Y2hlY2tib3hJbnB1dC5vbmNoYW5nZSA9ICgpID0+IHsgdGhpcy52YWx1ZUNoYW5nZWQoKTsgfVxyXG5cclxuXHRcdFx0XHR0aGlzLl90b2dnbGVJbnB1dHMucHVzaChjaGVja2JveElucHV0KTtcclxuXHJcblx0XHRcdFx0bGV0IGxhYmVsID0gbmV3IExhYmVsKCk7XHJcblx0XHRcdFx0bGFiZWwuc2V0UGFyZW50KHRoaXMpO1xyXG5cdFx0XHRcdGxhYmVsLmZvckVsZW1lbnRJZCA9IGNoZWNrYm94SW5wdXQuaWQ7XHJcblx0XHRcdFx0bGFiZWwuaG9zdENvbmZpZyA9IHRoaXMuaG9zdENvbmZpZztcclxuXHRcdFx0XHRsYWJlbC50ZXh0ID0gVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLmNob2ljZXNbaV0udGl0bGUpID8gXCJDaG9pY2UgXCIgKyBpIDogdGhpcy5jaG9pY2VzW2ldLnRpdGxlO1xyXG5cdFx0XHRcdGxhYmVsLnVzZU1hcmtkb3duID0gQWRhcHRpdmVDYXJkLnVzZU1hcmtkb3duSW5SYWRpb0J1dHRvbkFuZENoZWNrYm94O1xyXG5cclxuXHRcdFx0XHRsZXQgbGFiZWxFbGVtZW50ID0gbGFiZWwucmVuZGVyKCk7XHJcblx0XHRcdFx0bGFiZWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiO1xyXG5cdFx0XHRcdGxhYmVsRWxlbWVudC5zdHlsZS5mbGV4ID0gXCIxIDEgYXV0b1wiO1xyXG5cdFx0XHRcdC8vIGxhYmVsRWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0ID0gXCI2cHhcIjtcclxuXHRcdFx0XHRsYWJlbEVsZW1lbnQuc3R5bGUudmVydGljYWxBbGlnbiA9IFwibWlkZGxlXCI7XHJcblxyXG5cdFx0XHRcdGxldCBzcGFjZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0XHRzcGFjZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCI2cHhcIjtcclxuXHJcblx0XHRcdFx0bGV0IGNvbXBvdW5kSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRcdGNvbXBvdW5kSW5wdXQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG5cdFx0XHRcdGNvbXBvdW5kSW5wdXQuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XHJcblxyXG5cdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGNvbXBvdW5kSW5wdXQsIGNoZWNrYm94SW5wdXQpO1xyXG5cdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGNvbXBvdW5kSW5wdXQsIHNwYWNlckVsZW1lbnQpO1xyXG5cdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGNvbXBvdW5kSW5wdXQsIGxhYmVsRWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGVsZW1lbnQsIGNvbXBvdW5kSW5wdXQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNob2ljZXM6IEFycmF5PENob2ljZT4gPSBbXTtcclxuXHRpc0NvbXBhY3Q6IGJvb2xlYW47XHJcblx0aXNNdWx0aVNlbGVjdDogYm9vbGVhbjtcclxuXHRwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIklucHV0LkNob2ljZVNldFwiO1xyXG5cdH1cclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHN1cGVyLnRvSlNPTigpO1xyXG5cclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJwbGFjZWhvbGRlclwiLCB0aGlzLnBsYWNlaG9sZGVyKTtcclxuXHJcblx0XHRpZiAodGhpcy5jaG9pY2VzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0dmFyIGNob2ljZXMgPSBbXTtcclxuXHJcblx0XHRcdGZvciAobGV0IGNob2ljZSBvZiB0aGlzLmNob2ljZXMpIHtcclxuXHRcdFx0XHRjaG9pY2VzLnB1c2goY2hvaWNlLnRvSlNPTigpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImNob2ljZXNcIiwgY2hvaWNlcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzQ29tcGFjdCkge1xyXG5cdFx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwic3R5bGVcIiwgXCJleHBhbmRlZFwiLCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImlzTXVsdGlTZWxlY3RcIiwgdGhpcy5pc011bHRpU2VsZWN0LCBmYWxzZSk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHZhbGlkYXRlKCk6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4ge1xyXG5cdFx0dmFyIHJlc3VsdDogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPiA9IFtdO1xyXG5cclxuXHRcdGlmICh0aGlzLmNob2ljZXMubGVuZ3RoID09IDApIHtcclxuXHRcdFx0cmVzdWx0ID0gW3sgZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5Db2xsZWN0aW9uQ2FudEJlRW1wdHksIG1lc3NhZ2U6IFwiQW4gSW5wdXQuQ2hvaWNlU2V0IG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hvaWNlIGRlZmluZWQuXCIgfV07XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNob2ljZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKCF0aGlzLmNob2ljZXNbaV0udGl0bGUgfHwgIXRoaXMuY2hvaWNlc1tpXS52YWx1ZSkge1xyXG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoW3sgZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5Qcm9wZXJ0eUNhbnRCZU51bGwsIG1lc3NhZ2U6IFwiQWxsIGNob2ljZXMgaW4gYW4gSW5wdXQuQ2hvaWNlU2V0IG11c3QgaGF2ZSB0aGVpciB0aXRsZSBhbmQgdmFsdWUgcHJvcGVydGllcyBzZXQuXCIgfV0pXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHRoaXMuaXNDb21wYWN0ID0gIShqc29uW1wic3R5bGVcIl0gPT09IFwiZXhwYW5kZWRcIik7XHJcblx0XHR0aGlzLmlzTXVsdGlTZWxlY3QgPSBqc29uW1wiaXNNdWx0aVNlbGVjdFwiXTtcclxuXHRcdHRoaXMucGxhY2Vob2xkZXIgPSBqc29uW1wicGxhY2Vob2xkZXJcIl07XHJcblxyXG5cdFx0dGhpcy5jaG9pY2VzID0gW107XHJcblxyXG5cdFx0aWYgKGpzb25bXCJjaG9pY2VzXCJdICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR2YXIgY2hvaWNlQXJyYXkgPSBqc29uW1wiY2hvaWNlc1wiXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaG9pY2VBcnJheS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciBjaG9pY2UgPSBuZXcgQ2hvaWNlKCk7XHJcblxyXG5cdFx0XHRcdGNob2ljZS50aXRsZSA9IGNob2ljZUFycmF5W2ldW1widGl0bGVcIl07XHJcblx0XHRcdFx0Y2hvaWNlLnZhbHVlID0gY2hvaWNlQXJyYXlbaV1bXCJ2YWx1ZVwiXTtcclxuXHJcblx0XHRcdFx0dGhpcy5jaG9pY2VzLnB1c2goY2hvaWNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcblx0XHRpZiAoIXRoaXMuaXNNdWx0aVNlbGVjdCkge1xyXG5cdFx0XHRpZiAodGhpcy5pc0NvbXBhY3QpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0RWxlbWVudCA/IHRoaXMuX3NlbGVjdEVsZW1lbnQudmFsdWUgOiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGlmICghdGhpcy5fdG9nZ2xlSW5wdXRzIHx8IHRoaXMuX3RvZ2dsZUlucHV0cy5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RvZ2dsZUlucHV0cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3RvZ2dsZUlucHV0c1tpXS5jaGVja2VkKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl90b2dnbGVJbnB1dHNbaV0udmFsdWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGlmICghdGhpcy5fdG9nZ2xlSW5wdXRzIHx8IHRoaXMuX3RvZ2dsZUlucHV0cy5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmVzdWx0OiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl90b2dnbGVJbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAodGhpcy5fdG9nZ2xlSW5wdXRzW2ldLmNoZWNrZWQpIHtcclxuXHRcdFx0XHRcdGlmIChyZXN1bHQgIT0gXCJcIikge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHQgKz0gdGhpcy5ob3N0Q29uZmlnLmNob2ljZVNldElucHV0VmFsdWVTZXBhcmF0b3I7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmVzdWx0ICs9IHRoaXMuX3RvZ2dsZUlucHV0c1tpXS52YWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQgPT0gXCJcIiA/IG51bGwgOiByZXN1bHQ7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTnVtYmVySW5wdXQgZXh0ZW5kcyBJbnB1dCB7XHJcblx0cHJpdmF0ZSBfbnVtYmVySW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuXHRwcm90ZWN0ZWQgaW50ZXJuYWxSZW5kZXIoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0dGhpcy5fbnVtYmVySW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG5cdFx0dGhpcy5fbnVtYmVySW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJudW1iZXJcIik7XHJcblx0XHR0aGlzLl9udW1iZXJJbnB1dEVsZW1lbnQuY2xhc3NOYW1lID0gdGhpcy5ob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJhYy1pbnB1dFwiLCBcImFjLW51bWJlcklucHV0XCIpO1xyXG5cdFx0dGhpcy5fbnVtYmVySW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1pblwiLCB0aGlzLm1pbik7XHJcblx0XHR0aGlzLl9udW1iZXJJbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWF4XCIsIHRoaXMubWF4KTtcclxuXHRcdHRoaXMuX251bWJlcklucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG5cdFx0dGhpcy5fbnVtYmVySW5wdXRFbGVtZW50LnRhYkluZGV4ID0gMDtcclxuXHJcblx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkodGhpcy5kZWZhdWx0VmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuX251bWJlcklucHV0RWxlbWVudC52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLnBsYWNlaG9sZGVyKSkge1xyXG5cdFx0XHR0aGlzLl9udW1iZXJJbnB1dEVsZW1lbnQucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyO1xyXG5cdFx0XHR0aGlzLl9udW1iZXJJbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0aGlzLnBsYWNlaG9sZGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9udW1iZXJJbnB1dEVsZW1lbnQub25pbnB1dCA9ICgpID0+IHsgdGhpcy52YWx1ZUNoYW5nZWQoKTsgfVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9udW1iZXJJbnB1dEVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRtaW46IHN0cmluZztcclxuXHRtYXg6IHN0cmluZztcclxuXHRwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIklucHV0Lk51bWJlclwiO1xyXG5cdH1cclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHN1cGVyLnRvSlNPTigpO1xyXG5cclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJwbGFjZWhvbGRlclwiLCB0aGlzLnBsYWNlaG9sZGVyKTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJtaW5cIiwgdGhpcy5taW4pO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcIm1heFwiLCB0aGlzLm1heCk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHBhcnNlKGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdFx0c3VwZXIucGFyc2UoanNvbiwgZXJyb3JzKTtcclxuXHJcblx0XHR0aGlzLnBsYWNlaG9sZGVyID0ganNvbltcInBsYWNlaG9sZGVyXCJdO1xyXG5cdFx0dGhpcy5taW4gPSBqc29uW1wibWluXCJdO1xyXG5cdFx0dGhpcy5tYXggPSBqc29uW1wibWF4XCJdO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbnVtYmVySW5wdXRFbGVtZW50ID8gdGhpcy5fbnVtYmVySW5wdXRFbGVtZW50LnZhbHVlIDogbnVsbDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRlSW5wdXQgZXh0ZW5kcyBJbnB1dCB7XHJcblx0cHJpdmF0ZSBfZGF0ZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuXHJcblx0cHJvdGVjdGVkIGludGVybmFsUmVuZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHRoaXMuX2RhdGVJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcblx0XHR0aGlzLl9kYXRlSW5wdXRFbGVtZW50LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJkYXRlXCIpO1xyXG5cdFx0dGhpcy5fZGF0ZUlucHV0RWxlbWVudC5jbGFzc05hbWUgPSB0aGlzLmhvc3RDb25maWcubWFrZUNzc0NsYXNzTmFtZShcImFjLWlucHV0XCIsIFwiYWMtZGF0ZUlucHV0XCIpO1xyXG5cdFx0dGhpcy5fZGF0ZUlucHV0RWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xyXG5cclxuXHRcdGlmICghVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLmRlZmF1bHRWYWx1ZSkpIHtcclxuXHRcdFx0dGhpcy5fZGF0ZUlucHV0RWxlbWVudC52YWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9kYXRlSW5wdXRFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0Z2V0SnNvblR5cGVOYW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXCJJbnB1dC5EYXRlXCI7XHJcblx0fVxyXG5cclxuXHRnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLl9kYXRlSW5wdXRFbGVtZW50ID8gdGhpcy5fZGF0ZUlucHV0RWxlbWVudC52YWx1ZSA6IG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZUlucHV0IGV4dGVuZHMgSW5wdXQge1xyXG5cdHByaXZhdGUgX3RpbWVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cdHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcblx0XHR0aGlzLl90aW1lSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG5cdFx0dGhpcy5fdGltZUlucHV0RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGltZVwiKTtcclxuXHRcdHRoaXMuX3RpbWVJbnB1dEVsZW1lbnQuY2xhc3NOYW1lID0gdGhpcy5ob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJhYy1pbnB1dFwiLCBcImFjLXRpbWVJbnB1dFwiKTtcclxuXHRcdHRoaXMuX3RpbWVJbnB1dEVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcclxuXHJcblx0XHRpZiAoIVV0aWxzLmlzTnVsbE9yRW1wdHkodGhpcy5kZWZhdWx0VmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuX3RpbWVJbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fdGltZUlucHV0RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdGdldEpzb25UeXBlTmFtZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFwiSW5wdXQuVGltZVwiO1xyXG5cdH1cclxuXHJcblx0Z2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdGltZUlucHV0RWxlbWVudCA/IHRoaXMuX3RpbWVJbnB1dEVsZW1lbnQudmFsdWUgOiBudWxsO1xyXG5cdH1cclxufVxyXG5cclxuZW51bSBBY3Rpb25CdXR0b25TdGF0ZSB7XHJcblx0Tm9ybWFsLFxyXG5cdEV4cGFuZGVkLFxyXG5cdFN1YmR1ZWRcclxufVxyXG5cclxuY2xhc3MgQWN0aW9uQnV0dG9uIHtcclxuXHRwcml2YXRlIF9wYXJlbnRDb250YWluZXJTdHlsZTogc3RyaW5nO1xyXG5cdHByaXZhdGUgX2FjdGlvbjogQWN0aW9uO1xyXG5cdHByaXZhdGUgX2VsZW1lbnQ6IEhUTUxCdXR0b25FbGVtZW50ID0gbnVsbDtcclxuXHRwcml2YXRlIF9zdGF0ZTogQWN0aW9uQnV0dG9uU3RhdGUgPSBBY3Rpb25CdXR0b25TdGF0ZS5Ob3JtYWw7XHJcblxyXG5cdHByaXZhdGUgdXBkYXRlQ3NzU3R5bGUoKSB7XHJcblx0XHRsZXQgaG9zdENvbmZpZyA9IHRoaXMuYWN0aW9uLnBhcmVudC5ob3N0Q29uZmlnO1xyXG5cclxuXHRcdHRoaXMuYWN0aW9uLnJlbmRlcmVkRWxlbWVudC5jbGFzc05hbWUgPSBob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJhYy1wdXNoQnV0dG9uXCIpO1xyXG5cdFx0dGhpcy5hY3Rpb24ucmVuZGVyZWRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdHlsZS1cIiArIHRoaXMuX3BhcmVudENvbnRhaW5lclN0eWxlKTtcclxuXHJcblx0XHRpZiAodGhpcy5hY3Rpb24gaW5zdGFuY2VvZiBTaG93Q2FyZEFjdGlvbikge1xyXG5cdFx0XHR0aGlzLmFjdGlvbi5yZW5kZXJlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJleHBhbmRhYmxlXCIpKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFjdGlvbi5yZW5kZXJlZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJleHBhbmRlZFwiKSk7XHJcblx0XHR0aGlzLmFjdGlvbi5yZW5kZXJlZEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJzdWJkdWVkXCIpKTtcclxuXHJcblx0XHRzd2l0Y2ggKHRoaXMuX3N0YXRlKSB7XHJcblx0XHRcdGNhc2UgQWN0aW9uQnV0dG9uU3RhdGUuRXhwYW5kZWQ6XHJcblx0XHRcdFx0dGhpcy5hY3Rpb24ucmVuZGVyZWRFbGVtZW50LmNsYXNzTGlzdC5hZGQoaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiZXhwYW5kZWRcIikpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIEFjdGlvbkJ1dHRvblN0YXRlLlN1YmR1ZWQ6XHJcblx0XHRcdFx0dGhpcy5hY3Rpb24ucmVuZGVyZWRFbGVtZW50LmNsYXNzTGlzdC5hZGQoaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwic3ViZHVlZFwiKSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuYWN0aW9uLmlzUHJpbWFyeSkge1xyXG5cdFx0XHR0aGlzLmFjdGlvbi5yZW5kZXJlZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJwcmltYXJ5XCIpKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRyZWFkb25seSBhY3Rpb246IEFjdGlvbjtcclxuXHJcblx0Y29uc3RydWN0b3IoYWN0aW9uOiBBY3Rpb24sIHBhcmVudENvbnRhaW5lclN0eWxlOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuYWN0aW9uID0gYWN0aW9uO1xyXG5cdFx0dGhpcy5fcGFyZW50Q29udGFpbmVyU3R5bGUgPSBwYXJlbnRDb250YWluZXJTdHlsZTtcclxuXHR9XHJcblxyXG5cdG9uQ2xpY2s6IChhY3Rpb25CdXR0b246IEFjdGlvbkJ1dHRvbikgPT4gdm9pZCA9IG51bGw7XHJcblxyXG5cdHJlbmRlcihhbGlnbm1lbnQ6IEVudW1zLkFjdGlvbkFsaWdubWVudCkge1xyXG5cdFx0dGhpcy5hY3Rpb24ucmVuZGVyKCk7XHJcblx0XHR0aGlzLmFjdGlvbi5yZW5kZXJlZEVsZW1lbnQuc3R5bGUuZmxleCA9IGFsaWdubWVudCA9PT0gRW51bXMuQWN0aW9uQWxpZ25tZW50LlN0cmV0Y2ggPyBcIjAgMSAxMDAlXCIgOiBcIjAgMSBhdXRvXCI7XHJcblx0XHR0aGlzLmFjdGlvbi5yZW5kZXJlZEVsZW1lbnQub25jbGljayA9IChlKSA9PiB7IHRoaXMuY2xpY2soKTsgfTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZUNzc1N0eWxlKCk7XHJcblx0fVxyXG5cclxuXHRjbGljaygpIHtcclxuXHRcdGlmICh0aGlzLm9uQ2xpY2sgIT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLm9uQ2xpY2sodGhpcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgc3RhdGUoKTogQWN0aW9uQnV0dG9uU3RhdGUge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0YXRlO1xyXG5cdH1cclxuXHJcblx0c2V0IHN0YXRlKHZhbHVlOiBBY3Rpb25CdXR0b25TdGF0ZSkge1xyXG5cdFx0dGhpcy5fc3RhdGUgPSB2YWx1ZTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZUNzc1N0eWxlKCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWN0aW9uIGltcGxlbWVudHMgSUNhcmRPYmplY3Qge1xyXG5cdHByaXZhdGUgX3Nob3VsZEZhbGxiYWNrOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBfcGFyZW50OiBDYXJkRWxlbWVudCA9IG51bGw7XHJcblx0cHJpdmF0ZSBfYWN0aW9uQ29sbGVjdGlvbjogQWN0aW9uQ29sbGVjdGlvbiA9IG51bGw7IC8vIGhvbGQgdGhlIHJlZmVyZW5jZSB0byBpdHMgYWN0aW9uIGNvbGxlY3Rpb25cclxuXHRwcml2YXRlIF9yZW5kZXJlZEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gbnVsbDtcclxuXHJcblx0cHJpdmF0ZSBzZXRDb2xsZWN0aW9uKGFjdGlvbkNvbGxlY3Rpb246IEFjdGlvbkNvbGxlY3Rpb24pIHtcclxuXHRcdHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24gPSBhY3Rpb25Db2xsZWN0aW9uO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFkZENzc0NsYXNzZXMoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdC8vIERvIG5vdGhpbmcgaW4gYmFzZSBpbXBsZW1lbnRhdGlvblxyXG5cdH1cclxuXHJcblx0YWJzdHJhY3QgZ2V0SnNvblR5cGVOYW1lKCk6IHN0cmluZztcclxuXHJcblx0cmVhZG9ubHkgcmVxdWlyZXMgPSBuZXcgSG9zdENvbmZpZy5Ib3N0Q2FwYWJpbGl0aWVzKCk7XHJcblxyXG5cdGlkOiBzdHJpbmc7XHJcblx0dGl0bGU6IHN0cmluZztcclxuXHRpY29uVXJsOiBzdHJpbmc7XHJcblx0aXNQcmltYXJ5OiBib29sZWFuO1xyXG5cclxuXHRvbkV4ZWN1dGU6IChzZW5kZXI6IEFjdGlvbikgPT4gdm9pZDtcclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHt9O1xyXG5cclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJ0eXBlXCIsIHRoaXMuZ2V0SnNvblR5cGVOYW1lKCkpO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImlkXCIsIHRoaXMuaWQpO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcInRpdGxlXCIsIHRoaXMudGl0bGUpO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImljb25VcmxcIiwgdGhpcy5pY29uVXJsKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKCkge1xyXG5cdFx0Ly8gQ2FjaGUgaG9zdENvbmZpZyBmb3IgcGVyZlxyXG5cdFx0bGV0IGhvc3RDb25maWcgPSB0aGlzLnBhcmVudC5ob3N0Q29uZmlnO1xyXG5cclxuXHRcdHZhciBidXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHRcdGJ1dHRvbkVsZW1lbnQuY2xhc3NOYW1lID0gaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtcHVzaEJ1dHRvblwiKTtcclxuXHJcblx0XHR0aGlzLmFkZENzc0NsYXNzZXMoYnV0dG9uRWxlbWVudCk7XHJcblxyXG5cdFx0YnV0dG9uRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHRoaXMudGl0bGUpO1xyXG5cdFx0YnV0dG9uRWxlbWVudC50eXBlID0gXCJidXR0b25cIjtcclxuXHRcdGJ1dHRvbkVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG5cdFx0YnV0dG9uRWxlbWVudC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcclxuXHRcdGJ1dHRvbkVsZW1lbnQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xyXG5cclxuXHRcdGxldCBoYXNUaXRsZSA9ICFVdGlscy5pc051bGxPckVtcHR5KHRoaXMudGl0bGUpO1xyXG5cclxuXHRcdGxldCB0aXRsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0dGl0bGVFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuXHRcdHRpdGxlRWxlbWVudC5zdHlsZS50ZXh0T3ZlcmZsb3cgPSBcImVsbGlwc2lzXCI7XHJcblxyXG5cdFx0aWYgKCEoaG9zdENvbmZpZy5hY3Rpb25zLmljb25QbGFjZW1lbnQgPT0gRW51bXMuQWN0aW9uSWNvblBsYWNlbWVudC5BYm92ZVRpdGxlIHx8IGhvc3RDb25maWcuYWN0aW9ucy5hbGxvd1RpdGxlVG9XcmFwKSkge1xyXG5cdFx0XHR0aXRsZUVsZW1lbnQuc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGhhc1RpdGxlKSB7XHJcblx0XHRcdHRpdGxlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLnRpdGxlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChVdGlscy5pc051bGxPckVtcHR5KHRoaXMuaWNvblVybCkpIHtcclxuXHRcdFx0YnV0dG9uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibm9JY29uXCIpO1xyXG5cclxuXHRcdFx0YnV0dG9uRWxlbWVudC5hcHBlbmRDaGlsZCh0aXRsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGxldCBpY29uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcblx0XHRcdGljb25FbGVtZW50LnNyYyA9IHRoaXMuaWNvblVybDtcclxuXHRcdFx0aWNvbkVsZW1lbnQuc3R5bGUud2lkdGggPSBob3N0Q29uZmlnLmFjdGlvbnMuaWNvblNpemUgKyBcInB4XCI7XHJcblx0XHRcdGljb25FbGVtZW50LnN0eWxlLmhlaWdodCA9IGhvc3RDb25maWcuYWN0aW9ucy5pY29uU2l6ZSArIFwicHhcIjtcclxuXHRcdFx0aWNvbkVsZW1lbnQuc3R5bGUuZmxleCA9IFwiMCAwIGF1dG9cIjtcclxuXHJcblx0XHRcdGlmIChob3N0Q29uZmlnLmFjdGlvbnMuaWNvblBsYWNlbWVudCA9PSBFbnVtcy5BY3Rpb25JY29uUGxhY2VtZW50LkFib3ZlVGl0bGUpIHtcclxuXHRcdFx0XHRidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uQWJvdmVcIik7XHJcblx0XHRcdFx0YnV0dG9uRWxlbWVudC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gXCJjb2x1bW5cIjtcclxuXHJcblx0XHRcdFx0aWYgKGhhc1RpdGxlKSB7XHJcblx0XHRcdFx0XHRpY29uRWxlbWVudC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjRweFwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRidXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpY29uTGVmdFwiKTtcclxuXHJcblx0XHRcdFx0aWYgKGhhc1RpdGxlKSB7XHJcblx0XHRcdFx0XHRpY29uRWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodCA9IFwiNHB4XCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRidXR0b25FbGVtZW50LmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcclxuXHRcdFx0YnV0dG9uRWxlbWVudC5hcHBlbmRDaGlsZCh0aXRsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3JlbmRlcmVkRWxlbWVudCA9IGJ1dHRvbkVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRzZXRQYXJlbnQodmFsdWU6IENhcmRFbGVtZW50KSB7XHJcblx0XHR0aGlzLl9wYXJlbnQgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGV4ZWN1dGUoKSB7XHJcblx0XHRpZiAodGhpcy5vbkV4ZWN1dGUpIHtcclxuXHRcdFx0dGhpcy5vbkV4ZWN1dGUodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmFpc2VFeGVjdXRlQWN0aW9uRXZlbnQodGhpcyk7XHJcblx0fVxyXG5cclxuXHQvLyBFeHBhbmQgdGhlIGFjdGlvbiBjYXJkIHBhbmUgd2l0aCBhIGlubGluZSBzdGF0dXMgY2FyZFxyXG5cdC8vIE51bGwgc3RhdHVzIHdpbGwgY2xlYXIgdGhlIHN0YXR1cyBiYXJcclxuXHRzZXRTdGF0dXMoc3RhdHVzOiBhbnkpIHtcclxuXHRcdGlmICh0aGlzLl9hY3Rpb25Db2xsZWN0aW9uID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzdGF0dXMpIHtcclxuXHRcdFx0bGV0IHN0YXR1c0NhcmQgPSBuZXcgSW5saW5lQWRhcHRpdmVDYXJkKCk7XHJcblx0XHRcdHN0YXR1c0NhcmQucGFyc2Uoc3RhdHVzKTtcclxuXHRcdFx0dGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5zaG93U3RhdHVzQ2FyZChzdGF0dXNDYXJkKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9hY3Rpb25Db2xsZWN0aW9uLmhpZGVTdGF0dXNDYXJkKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+IHtcclxuXHRcdHJldHVybiBbXTtcclxuXHR9XHJcblxyXG5cdHByZXBhcmUoaW5wdXRzOiBBcnJheTxJbnB1dD4pIHtcclxuXHRcdC8vIERvIG5vdGhpbmcgaW4gYmFzZSBpbXBsZW1lbnRhdGlvblxyXG5cdH07XHJcblxyXG5cdHBhcnNlKGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdFx0cmFpc2VQYXJzZUFjdGlvbkV2ZW50KHRoaXMsIGpzb24sIGVycm9ycyk7XHJcblxyXG5cdFx0dGhpcy5yZXF1aXJlcy5wYXJzZShqc29uW1wicmVxdWlyZXNcIl0sIGVycm9ycyk7XHJcblx0XHR0aGlzLmlkID0ganNvbltcImlkXCJdO1xyXG5cclxuXHRcdGlmICghanNvbltcInRpdGxlXCJdICYmIGpzb25bXCJ0aXRsZVwiXSAhPT0gXCJcIikge1xyXG5cdFx0XHRyYWlzZVBhcnNlRXJyb3IoXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5Qcm9wZXJ0eUNhbnRCZU51bGwsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBcIkFjdGlvbnMgc2hvdWxkIGFsd2F5cyBoYXZlIGEgdGl0bGUuXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVycm9yc1xyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudGl0bGUgPSBqc29uW1widGl0bGVcIl07XHJcblx0XHR0aGlzLmljb25VcmwgPSBqc29uW1wiaWNvblVybFwiXTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZSgpOiBib29sZWFuIHtcclxuXHRcdGlmICh0aGlzLl9hY3Rpb25Db2xsZWN0aW9uKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9hY3Rpb25Db2xsZWN0aW9uLnJlbW92ZUFjdGlvbih0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRnZXRBbGxJbnB1dHMoKTogQXJyYXk8SW5wdXQ+IHtcclxuXHRcdHJldHVybiBbXTtcclxuXHR9XHJcblxyXG5cdGdldFJlc291cmNlSW5mb3JtYXRpb24oKTogQXJyYXk8SVJlc291cmNlSW5mb3JtYXRpb24+IHtcclxuXHRcdGlmICghVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLmljb25VcmwpKSB7XHJcblx0XHRcdHJldHVybiBbeyB1cmw6IHRoaXMuaWNvblVybCwgbWltZVR5cGU6IFwiaW1hZ2VcIiB9XVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBbXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldEFjdGlvbkJ5SWQoaWQ6IHN0cmluZyk6IEFjdGlvbiB7XHJcblx0XHRpZiAodGhpcy5pZCA9PSBpZCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldCBwYXJlbnQoKTogQ2FyZEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudDtcclxuXHR9XHJcblxyXG5cdGdldCByZW5kZXJlZEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3JlbmRlcmVkRWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHNob3VsZEZhbGxiYWNrKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3Nob3VsZEZhbGxiYWNrIHx8ICF0aGlzLnJlcXVpcmVzLmFyZUFsbE1ldCh0aGlzLnBhcmVudC5ob3N0Q29uZmlnLmhvc3RDYXBhYmlsaXRpZXMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1Ym1pdEFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XHJcblx0cHJpdmF0ZSBfaXNQcmVwYXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX29yaWdpbmFsRGF0YTogT2JqZWN0O1xyXG5cdHByaXZhdGUgX3Byb2Nlc3NlZERhdGE6IE9iamVjdDtcclxuXHJcblx0Z2V0SnNvblR5cGVOYW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXCJBY3Rpb24uU3VibWl0XCI7XHJcblx0fVxyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gc3VwZXIudG9KU09OKCk7XHJcblxyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImRhdGFcIiwgdGhpcy5fb3JpZ2luYWxEYXRhKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cHJlcGFyZShpbnB1dHM6IEFycmF5PElucHV0Pikge1xyXG5cdFx0aWYgKHRoaXMuX29yaWdpbmFsRGF0YSkge1xyXG5cdFx0XHR0aGlzLl9wcm9jZXNzZWREYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLl9vcmlnaW5hbERhdGEpKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLl9wcm9jZXNzZWREYXRhID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlucHV0VmFsdWUgPSBpbnB1dHNbaV0udmFsdWU7XHJcblxyXG5cdFx0XHRpZiAoaW5wdXRWYWx1ZSAhPSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5fcHJvY2Vzc2VkRGF0YVtpbnB1dHNbaV0uaWRdID0gaW5wdXRzW2ldLnZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faXNQcmVwYXJlZCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRwYXJzZShqc29uOiBhbnksIGVycm9ycz86IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pIHtcclxuXHRcdHN1cGVyLnBhcnNlKGpzb24sIGVycm9ycyk7XHJcblxyXG5cdFx0dGhpcy5kYXRhID0ganNvbltcImRhdGFcIl07XHJcblx0fVxyXG5cclxuXHRnZXQgZGF0YSgpOiBPYmplY3Qge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2lzUHJlcGFyZWQgPyB0aGlzLl9wcm9jZXNzZWREYXRhIDogdGhpcy5fb3JpZ2luYWxEYXRhO1xyXG5cdH1cclxuXHJcblx0c2V0IGRhdGEodmFsdWU6IE9iamVjdCkge1xyXG5cdFx0dGhpcy5fb3JpZ2luYWxEYXRhID0gdmFsdWU7XHJcblx0XHR0aGlzLl9pc1ByZXBhcmVkID0gZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3BlblVybEFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XHJcblx0dXJsOiBzdHJpbmc7XHJcblxyXG5cdGdldEpzb25UeXBlTmFtZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFwiQWN0aW9uLk9wZW5VcmxcIjtcclxuXHR9XHJcblxyXG5cdHRvSlNPTigpIHtcclxuXHRcdGxldCByZXN1bHQgPSBzdXBlci50b0pTT04oKTtcclxuXHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwidXJsXCIsIHRoaXMudXJsKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGUoKTogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPiB7XHJcblx0XHRpZiAoIXRoaXMudXJsKSB7XHJcblx0XHRcdHJldHVybiBbeyBlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLlByb3BlcnR5Q2FudEJlTnVsbCwgbWVzc2FnZTogXCJBbiBBY3Rpb24uT3BlblVybCBtdXN0IGhhdmUgaXRzIHVybCBwcm9wZXJ0eSBzZXQuXCIgfV07XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHRoaXMudXJsID0ganNvbltcInVybFwiXTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIdHRwSGVhZGVyIHtcclxuXHRwcml2YXRlIF92YWx1ZSA9IG5ldyBVdGlscy5TdHJpbmdXaXRoU3Vic3RpdHV0aW9ucygpO1xyXG5cclxuXHRuYW1lOiBzdHJpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZyA9IFwiXCIsIHZhbHVlOiBzdHJpbmcgPSBcIlwiKSB7XHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdFx0dGhpcy52YWx1ZSA9IHZhbHVlO1xyXG5cdH1cclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0cmV0dXJuIHsgbmFtZTogdGhpcy5uYW1lLCB2YWx1ZTogdGhpcy5fdmFsdWUuZ2V0T3JpZ2luYWwoKSB9O1xyXG5cdH1cclxuXHJcblx0cHJlcGFyZShpbnB1dHM6IEFycmF5PElucHV0Pikge1xyXG5cdFx0dGhpcy5fdmFsdWUuc3Vic3RpdHV0ZUlucHV0VmFsdWVzKGlucHV0cywgVXRpbHMuQ29udGVudFR5cGVzLmFwcGxpY2F0aW9uWFd3d0Zvcm1VcmxlbmNvZGVkKTtcclxuXHR9XHJcblxyXG5cdGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlLmdldCgpO1xyXG5cdH1cclxuXHJcblx0c2V0IHZhbHVlKG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuX3ZhbHVlLnNldChuZXdWYWx1ZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSHR0cEFjdGlvbiBleHRlbmRzIEFjdGlvbiB7XHJcblx0cHJpdmF0ZSBfdXJsID0gbmV3IFV0aWxzLlN0cmluZ1dpdGhTdWJzdGl0dXRpb25zKCk7XHJcblx0cHJpdmF0ZSBfYm9keSA9IG5ldyBVdGlscy5TdHJpbmdXaXRoU3Vic3RpdHV0aW9ucygpO1xyXG5cdHByaXZhdGUgX2hlYWRlcnM6IEFycmF5PEh0dHBIZWFkZXI+ID0gW107XHJcblxyXG5cdG1ldGhvZDogc3RyaW5nO1xyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIkFjdGlvbi5IdHRwXCI7XHJcblx0fVxyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gc3VwZXIudG9KU09OKCk7XHJcblxyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcIm1ldGhvZFwiLCB0aGlzLm1ldGhvZCk7XHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwidXJsXCIsIHRoaXMuX3VybC5nZXRPcmlnaW5hbCgpKTtcclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJib2R5XCIsIHRoaXMuX2JvZHkuZ2V0T3JpZ2luYWwoKSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2hlYWRlcnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsZXQgaGVhZGVycyA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaGVhZGVyIG9mIHRoaXMuX2hlYWRlcnMpIHtcclxuXHRcdFx0XHRoZWFkZXJzLnB1c2goaGVhZGVyLnRvSlNPTigpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImhlYWRlcnNcIiwgaGVhZGVycyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHZhbGlkYXRlKCk6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4ge1xyXG5cdFx0dmFyIHJlc3VsdDogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPiA9IFtdO1xyXG5cclxuXHRcdGlmICghdGhpcy51cmwpIHtcclxuXHRcdFx0cmVzdWx0ID0gW3sgZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5Qcm9wZXJ0eUNhbnRCZU51bGwsIG1lc3NhZ2U6IFwiQW4gQWN0aW9uLkh0dHAgbXVzdCBoYXZlIGl0cyB1cmwgcHJvcGVydHkgc2V0LlwiIH1dO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmhlYWRlcnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGVhZGVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmICghdGhpcy5oZWFkZXJzW2ldLm5hbWUgfHwgIXRoaXMuaGVhZGVyc1tpXS52YWx1ZSkge1xyXG5cdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChbeyBlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLlByb3BlcnR5Q2FudEJlTnVsbCwgbWVzc2FnZTogXCJBbGwgaGVhZGVycyBvZiBhbiBBY3Rpb24uSHR0cCBtdXN0IGhhdmUgdGhlaXIgbmFtZSBhbmQgdmFsdWUgcHJvcGVydGllcyBzZXQuXCIgfV0pO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHByZXBhcmUoaW5wdXRzOiBBcnJheTxJbnB1dD4pIHtcclxuXHRcdHRoaXMuX3VybC5zdWJzdGl0dXRlSW5wdXRWYWx1ZXMoaW5wdXRzLCBVdGlscy5Db250ZW50VHlwZXMuYXBwbGljYXRpb25YV3d3Rm9ybVVybGVuY29kZWQpO1xyXG5cclxuXHRcdGxldCBjb250ZW50VHlwZSA9IFV0aWxzLkNvbnRlbnRUeXBlcy5hcHBsaWNhdGlvbkpzb247XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9oZWFkZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHRoaXMuX2hlYWRlcnNbaV0ucHJlcGFyZShpbnB1dHMpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuX2hlYWRlcnNbaV0ubmFtZSAmJiB0aGlzLl9oZWFkZXJzW2ldLm5hbWUudG9Mb3dlckNhc2UoKSA9PSBcImNvbnRlbnQtdHlwZVwiKSB7XHJcblx0XHRcdFx0Y29udGVudFR5cGUgPSB0aGlzLl9oZWFkZXJzW2ldLnZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYm9keS5zdWJzdGl0dXRlSW5wdXRWYWx1ZXMoaW5wdXRzLCBjb250ZW50VHlwZSk7XHJcblx0fTtcclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHRoaXMudXJsID0ganNvbltcInVybFwiXTtcclxuXHRcdHRoaXMubWV0aG9kID0ganNvbltcIm1ldGhvZFwiXTtcclxuXHRcdHRoaXMuYm9keSA9IGpzb25bXCJib2R5XCJdO1xyXG5cclxuXHRcdHRoaXMuX2hlYWRlcnMgPSBbXTtcclxuXHJcblx0XHRpZiAoanNvbltcImhlYWRlcnNcIl0gIT0gbnVsbCkge1xyXG5cdFx0XHR2YXIganNvbkhlYWRlcnMgPSBqc29uW1wiaGVhZGVyc1wiXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBqc29uSGVhZGVycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGxldCBodHRwSGVhZGVyID0gbmV3IEh0dHBIZWFkZXIoKTtcclxuXHJcblx0XHRcdFx0aHR0cEhlYWRlci5uYW1lID0ganNvbkhlYWRlcnNbaV1bXCJuYW1lXCJdO1xyXG5cdFx0XHRcdGh0dHBIZWFkZXIudmFsdWUgPSBqc29uSGVhZGVyc1tpXVtcInZhbHVlXCJdO1xyXG5cclxuXHRcdFx0XHR0aGlzLmhlYWRlcnMucHVzaChodHRwSGVhZGVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0IHVybCgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3VybC5nZXQoKTtcclxuXHR9XHJcblxyXG5cdHNldCB1cmwodmFsdWU6IHN0cmluZykge1xyXG5cdFx0dGhpcy5fdXJsLnNldCh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgYm9keSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2JvZHkuZ2V0KCk7XHJcblx0fVxyXG5cclxuXHRzZXQgYm9keSh2YWx1ZTogc3RyaW5nKSB7XHJcblx0XHR0aGlzLl9ib2R5LnNldCh2YWx1ZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgaGVhZGVycygpOiBBcnJheTxIdHRwSGVhZGVyPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5faGVhZGVycyA/IHRoaXMuX2hlYWRlcnMgOiBbXTtcclxuXHR9XHJcblxyXG5cdHNldCBoZWFkZXJzKHZhbHVlOiBBcnJheTxIdHRwSGVhZGVyPikge1xyXG5cdFx0dGhpcy5faGVhZGVycyA9IHZhbHVlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3dDYXJkQWN0aW9uIGV4dGVuZHMgQWN0aW9uIHtcclxuXHRwcm90ZWN0ZWQgYWRkQ3NzQ2xhc3NlcyhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0c3VwZXIuYWRkQ3NzQ2xhc3NlcyhlbGVtZW50KTtcclxuXHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5wYXJlbnQuaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiZXhwYW5kYWJsZVwiKSk7XHJcblx0fVxyXG5cclxuXHRyZWFkb25seSBjYXJkOiBBZGFwdGl2ZUNhcmQgPSBuZXcgSW5saW5lQWRhcHRpdmVDYXJkKCk7XHJcblxyXG5cdGdldEpzb25UeXBlTmFtZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFwiQWN0aW9uLlNob3dDYXJkXCI7XHJcblx0fVxyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gc3VwZXIudG9KU09OKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY2FyZCkge1xyXG5cdFx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwiY2FyZFwiLCB0aGlzLmNhcmQudG9KU09OKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+IHtcclxuXHRcdHJldHVybiB0aGlzLmNhcmQudmFsaWRhdGUoKTtcclxuXHR9XHJcblxyXG5cdHBhcnNlKGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdFx0c3VwZXIucGFyc2UoanNvbiwgZXJyb3JzKTtcclxuXHJcblx0XHR0aGlzLmNhcmQucGFyc2UoanNvbltcImNhcmRcIl0sIGVycm9ycyk7XHJcblx0fVxyXG5cclxuXHRzZXRQYXJlbnQodmFsdWU6IENhcmRFbGVtZW50KSB7XHJcblx0XHRzdXBlci5zZXRQYXJlbnQodmFsdWUpO1xyXG5cclxuXHRcdHRoaXMuY2FyZC5zZXRQYXJlbnQodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Z2V0QWxsSW5wdXRzKCk6IEFycmF5PElucHV0PiB7XHJcblx0XHRyZXR1cm4gdGhpcy5jYXJkLmdldEFsbElucHV0cygpO1xyXG5cdH1cclxuXHJcblx0Z2V0UmVzb3VyY2VJbmZvcm1hdGlvbigpOiBBcnJheTxJUmVzb3VyY2VJbmZvcm1hdGlvbj4ge1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldFJlc291cmNlSW5mb3JtYXRpb24oKS5jb25jYXQodGhpcy5jYXJkLmdldFJlc291cmNlSW5mb3JtYXRpb24oKSk7XHJcblx0fVxyXG5cclxuXHRnZXRBY3Rpb25CeUlkKGlkOiBzdHJpbmcpOiBBY3Rpb24ge1xyXG5cdFx0dmFyIHJlc3VsdCA9IHN1cGVyLmdldEFjdGlvbkJ5SWQoaWQpO1xyXG5cclxuXHRcdGlmICghcmVzdWx0KSB7XHJcblx0XHRcdHJlc3VsdCA9IHRoaXMuY2FyZC5nZXRBY3Rpb25CeUlkKGlkKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQWN0aW9uQ29sbGVjdGlvbiB7XHJcblx0cHJpdmF0ZSBfb3duZXI6IENhcmRFbGVtZW50O1xyXG5cdHByaXZhdGUgX2FjdGlvbkNhcmRDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG5cdHByaXZhdGUgX2V4cGFuZGVkQWN0aW9uOiBTaG93Q2FyZEFjdGlvbiA9IG51bGw7XHJcblx0cHJpdmF0ZSBfcmVuZGVyZWRBY3Rpb25Db3VudDogbnVtYmVyID0gMDtcclxuXHRwcml2YXRlIF9zdGF0dXNDYXJkOiBIVE1MRWxlbWVudCA9IG51bGw7XHJcblx0cHJpdmF0ZSBfYWN0aW9uQ2FyZDogSFRNTEVsZW1lbnQgPSBudWxsO1xyXG5cclxuXHRwcml2YXRlIHJlZnJlc2hDb250YWluZXIoKSB7XHJcblx0XHR0aGlzLl9hY3Rpb25DYXJkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FjdGlvbkNhcmQgPT09IG51bGwgJiYgdGhpcy5fc3RhdHVzQ2FyZCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLl9hY3Rpb25DYXJkQ29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xyXG5cdFx0XHR0aGlzLl9hY3Rpb25DYXJkQ29udGFpbmVyLnN0eWxlLm1hcmdpblRvcCA9IFwiMHB4XCI7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYWN0aW9uQ2FyZENvbnRhaW5lci5zdHlsZS5tYXJnaW5Ub3AgPSB0aGlzLl9yZW5kZXJlZEFjdGlvbkNvdW50ID4gMCA/IHRoaXMuX293bmVyLmhvc3RDb25maWcuYWN0aW9ucy5zaG93Q2FyZC5pbmxpbmVUb3BNYXJnaW4gKyBcInB4XCIgOiBcIjBweFwiO1xyXG5cclxuXHRcdHZhciBwYWRkaW5nID0gdGhpcy5fb3duZXIuZ2V0Tm9uWmVyb1BhZGRpbmcoKS50b1NwYWNpbmdEZWZpbml0aW9uKHRoaXMuX293bmVyLmhvc3RDb25maWcpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9hY3Rpb25DYXJkICE9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuX2FjdGlvbkNhcmQuc3R5bGUucGFkZGluZ0xlZnQgPSBwYWRkaW5nLmxlZnQgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMuX2FjdGlvbkNhcmQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGFkZGluZy5yaWdodCArIFwicHhcIjtcclxuXHJcblx0XHRcdHRoaXMuX2FjdGlvbkNhcmQuc3R5bGUubWFyZ2luTGVmdCA9IFwiLVwiICsgcGFkZGluZy5sZWZ0ICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLl9hY3Rpb25DYXJkLnN0eWxlLm1hcmdpblJpZ2h0ID0gXCItXCIgKyBwYWRkaW5nLnJpZ2h0ICsgXCJweFwiO1xyXG5cclxuXHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQodGhpcy5fYWN0aW9uQ2FyZENvbnRhaW5lciwgdGhpcy5fYWN0aW9uQ2FyZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX3N0YXR1c0NhcmQgIT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5fc3RhdHVzQ2FyZC5zdHlsZS5wYWRkaW5nTGVmdCA9IHBhZGRpbmcubGVmdCArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5fc3RhdHVzQ2FyZC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nLnJpZ2h0ICsgXCJweFwiO1xyXG5cclxuXHRcdFx0dGhpcy5fc3RhdHVzQ2FyZC5zdHlsZS5tYXJnaW5MZWZ0ID0gXCItXCIgKyBwYWRkaW5nLmxlZnQgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMuX3N0YXR1c0NhcmQuc3R5bGUubWFyZ2luUmlnaHQgPSBcIi1cIiArIHBhZGRpbmcucmlnaHQgKyBcInB4XCI7XHJcblxyXG5cdFx0XHRVdGlscy5hcHBlbmRDaGlsZCh0aGlzLl9hY3Rpb25DYXJkQ29udGFpbmVyLCB0aGlzLl9zdGF0dXNDYXJkKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgbGF5b3V0Q2hhbmdlZCgpIHtcclxuXHRcdHRoaXMuX293bmVyLmdldFJvb3RFbGVtZW50KCkudXBkYXRlTGF5b3V0KCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGhpZGVBY3Rpb25DYXJkKCkge1xyXG5cdFx0dmFyIHByZXZpb3VzbHlFeHBhbmRlZEFjdGlvbiA9IHRoaXMuX2V4cGFuZGVkQWN0aW9uO1xyXG5cclxuXHRcdHRoaXMuX2V4cGFuZGVkQWN0aW9uID0gbnVsbDtcclxuXHRcdHRoaXMuX2FjdGlvbkNhcmQgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMucmVmcmVzaENvbnRhaW5lcigpO1xyXG5cclxuXHRcdGlmIChwcmV2aW91c2x5RXhwYW5kZWRBY3Rpb24pIHtcclxuXHRcdFx0dGhpcy5sYXlvdXRDaGFuZ2VkKCk7XHJcblxyXG5cdFx0XHRyYWlzZUlubGluZUNhcmRFeHBhbmRlZEV2ZW50KHByZXZpb3VzbHlFeHBhbmRlZEFjdGlvbiwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzaG93QWN0aW9uQ2FyZChhY3Rpb246IFNob3dDYXJkQWN0aW9uLCBzdXBwcmVzc1N0eWxlOiBib29sZWFuID0gZmFsc2UsIHJhaXNlRXZlbnQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcblx0XHRpZiAoYWN0aW9uLmNhcmQgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0KDxJbmxpbmVBZGFwdGl2ZUNhcmQ+YWN0aW9uLmNhcmQpLnN1cHByZXNzU3R5bGUgPSBzdXBwcmVzc1N0eWxlO1xyXG5cclxuXHRcdHZhciByZW5kZXJlZENhcmQgPSBhY3Rpb24uY2FyZC5yZW5kZXIoKTtcclxuXHJcblx0XHR0aGlzLl9hY3Rpb25DYXJkID0gcmVuZGVyZWRDYXJkO1xyXG5cdFx0dGhpcy5fZXhwYW5kZWRBY3Rpb24gPSBhY3Rpb247XHJcblxyXG5cdFx0dGhpcy5yZWZyZXNoQ29udGFpbmVyKCk7XHJcblxyXG5cdFx0aWYgKHJhaXNlRXZlbnQpIHtcclxuXHRcdFx0dGhpcy5sYXlvdXRDaGFuZ2VkKCk7XHJcblxyXG5cdFx0XHRyYWlzZUlubGluZUNhcmRFeHBhbmRlZEV2ZW50KGFjdGlvbiwgdHJ1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNvbGxhcHNlRXhwYW5kZWRBY3Rpb24oKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR0aGlzLmJ1dHRvbnNbaV0uc3RhdGUgPSBBY3Rpb25CdXR0b25TdGF0ZS5Ob3JtYWw7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5oaWRlQWN0aW9uQ2FyZCgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBleHBhbmRTaG93Q2FyZEFjdGlvbihhY3Rpb246IFNob3dDYXJkQWN0aW9uLCByYWlzZUV2ZW50OiBib29sZWFuKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5idXR0b25zW2ldLmFjdGlvbiAhPT0gYWN0aW9uKSB7XHJcblx0XHRcdFx0dGhpcy5idXR0b25zW2ldLnN0YXRlID0gQWN0aW9uQnV0dG9uU3RhdGUuU3ViZHVlZDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmJ1dHRvbnNbaV0uc3RhdGUgPSBBY3Rpb25CdXR0b25TdGF0ZS5FeHBhbmRlZDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc2hvd0FjdGlvbkNhcmQoXHJcblx0XHRcdGFjdGlvbixcclxuXHRcdFx0ISh0aGlzLl9vd25lci5pc0F0VGhlVmVyeUxlZnQoKSAmJiB0aGlzLl9vd25lci5pc0F0VGhlVmVyeVJpZ2h0KCkpLFxyXG5cdFx0XHRyYWlzZUV2ZW50KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYWN0aW9uQ2xpY2tlZChhY3Rpb25CdXR0b246IEFjdGlvbkJ1dHRvbikge1xyXG5cdFx0aWYgKCEoYWN0aW9uQnV0dG9uLmFjdGlvbiBpbnN0YW5jZW9mIFNob3dDYXJkQWN0aW9uKSkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHRoaXMuYnV0dG9uc1tpXS5zdGF0ZSA9IEFjdGlvbkJ1dHRvblN0YXRlLk5vcm1hbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5oaWRlU3RhdHVzQ2FyZCgpO1xyXG5cdFx0XHR0aGlzLmhpZGVBY3Rpb25DYXJkKCk7XHJcblxyXG5cdFx0XHRhY3Rpb25CdXR0b24uYWN0aW9uLmV4ZWN1dGUoKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmhpZGVTdGF0dXNDYXJkKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5fb3duZXIuaG9zdENvbmZpZy5hY3Rpb25zLnNob3dDYXJkLmFjdGlvbk1vZGUgPT09IEVudW1zLlNob3dDYXJkQWN0aW9uTW9kZS5Qb3B1cCkge1xyXG5cdFx0XHRcdGFjdGlvbkJ1dHRvbi5hY3Rpb24uZXhlY3V0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGFjdGlvbkJ1dHRvbi5hY3Rpb24gPT09IHRoaXMuX2V4cGFuZGVkQWN0aW9uKSB7XHJcblx0XHRcdFx0dGhpcy5jb2xsYXBzZUV4cGFuZGVkQWN0aW9uKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5leHBhbmRTaG93Q2FyZEFjdGlvbihhY3Rpb25CdXR0b24uYWN0aW9uLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRQYXJlbnRDb250YWluZXIoKTogQ29udGFpbmVyIHtcclxuXHRcdGlmICh0aGlzLl9vd25lciBpbnN0YW5jZW9mIENvbnRhaW5lcikge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fb3duZXI7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX293bmVyLmdldFBhcmVudENvbnRhaW5lcigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBmaW5kQWN0aW9uQnV0dG9uKGFjdGlvbjogQWN0aW9uKTogQWN0aW9uQnV0dG9uIHtcclxuXHRcdGZvciAobGV0IGFjdGlvbkJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcclxuXHRcdFx0aWYgKGFjdGlvbkJ1dHRvbi5hY3Rpb24gPT0gYWN0aW9uKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFjdGlvbkJ1dHRvbjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0aXRlbXM6IEFycmF5PEFjdGlvbj4gPSBbXTtcclxuXHRidXR0b25zOiBBcnJheTxBY3Rpb25CdXR0b24+ID0gW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKG93bmVyOiBDYXJkRWxlbWVudCkge1xyXG5cdFx0dGhpcy5fb3duZXIgPSBvd25lcjtcclxuXHR9XHJcblxyXG5cdHBhcnNlKGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdFx0dGhpcy5jbGVhcigpO1xyXG5cclxuXHRcdGlmIChqc29uICYmIGpzb24gaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cdFx0XHRmb3IgKGxldCBqc29uQWN0aW9uIG9mIGpzb24pIHtcclxuXHRcdFx0XHRsZXQgYWN0aW9uID0gY3JlYXRlQWN0aW9uSW5zdGFuY2UoXHJcblx0XHRcdFx0XHR0aGlzLl9vd25lcixcclxuXHRcdFx0XHRcdGpzb25BY3Rpb24sXHJcblx0XHRcdFx0XHRlcnJvcnMpO1xyXG5cclxuXHRcdFx0XHRpZiAoYWN0aW9uKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFkZEFjdGlvbihhY3Rpb24pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0aWYgKHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRsZXQgcmVzdWx0ID0gW107XHJcblxyXG5cdFx0XHRmb3IgKGxldCBhY3Rpb24gb2YgdGhpcy5pdGVtcykge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGFjdGlvbi50b0pTT04oKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93U3RhdHVzQ2FyZChzdGF0dXM6IEFkYXB0aXZlQ2FyZCkge1xyXG5cdFx0c3RhdHVzLnNldFBhcmVudCh0aGlzLl9vd25lcik7XHJcblxyXG5cdFx0dGhpcy5fc3RhdHVzQ2FyZCA9IHN0YXR1cy5yZW5kZXIoKTtcclxuXHJcblx0XHR0aGlzLnJlZnJlc2hDb250YWluZXIoKTtcclxuXHR9XHJcblxyXG5cdGhpZGVTdGF0dXNDYXJkKCkge1xyXG5cdFx0dGhpcy5fc3RhdHVzQ2FyZCA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5yZWZyZXNoQ29udGFpbmVyKCk7XHJcblx0fVxyXG5cclxuXHRnZXRBY3Rpb25CeUlkKGlkOiBzdHJpbmcpOiBBY3Rpb24ge1xyXG5cdFx0dmFyIHJlc3VsdDogQWN0aW9uID0gbnVsbDtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5pdGVtc1tpXS5nZXRBY3Rpb25CeUlkKGlkKTtcclxuXHJcblx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+IHtcclxuXHRcdHZhciByZXN1bHQ6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4gPSBbXTtcclxuXHJcblx0XHRpZiAodGhpcy5fb3duZXIuaG9zdENvbmZpZy5hY3Rpb25zLm1heEFjdGlvbnMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPiB0aGlzLl9vd25lci5ob3N0Q29uZmlnLmFjdGlvbnMubWF4QWN0aW9ucykge1xyXG5cdFx0XHRyZXN1bHQucHVzaChcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLlRvb01hbnlBY3Rpb25zLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJBIG1heGltdW0gb2YgXCIgKyB0aGlzLl9vd25lci5ob3N0Q29uZmlnLmFjdGlvbnMubWF4QWN0aW9ucyArIFwiIGFjdGlvbnMgYXJlIGFsbG93ZWQuXCJcclxuXHRcdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5pdGVtcy5sZW5ndGggPiAwICYmICF0aGlzLl9vd25lci5ob3N0Q29uZmlnLnN1cHBvcnRzSW50ZXJhY3Rpdml0eSkge1xyXG5cdFx0XHRyZXN1bHQucHVzaChcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLkludGVyYWN0aXZpdHlOb3RBbGxvd2VkLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJJbnRlcmFjdGl2aXR5IGlzIG5vdCBhbGxvd2VkLlwiXHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICghaXNBY3Rpb25BbGxvd2VkKHRoaXMuaXRlbXNbaV0sIHRoaXMuX293bmVyLmdldEZvcmJpZGRlbkFjdGlvblR5cGVzKCkpKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IuQWN0aW9uVHlwZU5vdEFsbG93ZWQsXHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiQWN0aW9ucyBvZiB0eXBlIFwiICsgdGhpcy5pdGVtc1tpXS5nZXRKc29uVHlwZU5hbWUoKSArIFwiIGFyZSBub3QgYWxsb3dlLlwiXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh0aGlzLml0ZW1zW2ldLnZhbGlkYXRlKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIob3JpZW50YXRpb246IEVudW1zLk9yaWVudGF0aW9uLCBpc0Rlc2lnbk1vZGU6IGJvb2xlYW4pOiBIVE1MRWxlbWVudCB7XHJcblx0XHRpZiAoIXRoaXMuX293bmVyLmhvc3RDb25maWcuc3VwcG9ydHNJbnRlcmFjdGl2aXR5KSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdGxldCBtYXhBY3Rpb25zID0gdGhpcy5fb3duZXIuaG9zdENvbmZpZy5hY3Rpb25zLm1heEFjdGlvbnMgPyBNYXRoLm1pbih0aGlzLl9vd25lci5ob3N0Q29uZmlnLmFjdGlvbnMubWF4QWN0aW9ucywgdGhpcy5pdGVtcy5sZW5ndGgpIDogdGhpcy5pdGVtcy5sZW5ndGg7XHJcblx0XHRsZXQgZm9yYmlkZGVuQWN0aW9uVHlwZXMgPSB0aGlzLl9vd25lci5nZXRGb3JiaWRkZW5BY3Rpb25UeXBlcygpO1xyXG5cclxuXHRcdHRoaXMuX2FjdGlvbkNhcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0dGhpcy5fcmVuZGVyZWRBY3Rpb25Db3VudCA9IDA7XHJcblxyXG5cdFx0aWYgKHRoaXMuX293bmVyLmhvc3RDb25maWcuYWN0aW9ucy5wcmVFeHBhbmRTaW5nbGVTaG93Q2FyZEFjdGlvbiAmJiBtYXhBY3Rpb25zID09IDEgJiYgdGhpcy5pdGVtc1swXSBpbnN0YW5jZW9mIFNob3dDYXJkQWN0aW9uICYmIGlzQWN0aW9uQWxsb3dlZCh0aGlzLml0ZW1zWzBdLCBmb3JiaWRkZW5BY3Rpb25UeXBlcykpIHtcclxuXHRcdFx0dGhpcy5zaG93QWN0aW9uQ2FyZCg8U2hvd0NhcmRBY3Rpb24+dGhpcy5pdGVtc1swXSwgdHJ1ZSk7XHJcblx0XHRcdHRoaXMuX3JlbmRlcmVkQWN0aW9uQ291bnQgPSAxO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGxldCBidXR0b25TdHJpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGJ1dHRvblN0cmlwLmNsYXNzTmFtZSA9IHRoaXMuX293bmVyLmhvc3RDb25maWcubWFrZUNzc0NsYXNzTmFtZShcImFjLWFjdGlvblNldFwiKTtcclxuXHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG5cclxuXHRcdFx0aWYgKG9yaWVudGF0aW9uID09IEVudW1zLk9yaWVudGF0aW9uLkhvcml6b250YWwpIHtcclxuXHRcdFx0XHRidXR0b25TdHJpcC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gXCJyb3dcIjtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuX293bmVyLmhvcml6b250YWxBbGlnbm1lbnQgJiYgdGhpcy5fb3duZXIuaG9zdENvbmZpZy5hY3Rpb25zLmFjdGlvbkFsaWdubWVudCAhPSBFbnVtcy5BY3Rpb25BbGlnbm1lbnQuU3RyZXRjaCkge1xyXG5cdFx0XHRcdFx0c3dpdGNoICh0aGlzLl9vd25lci5ob3Jpem9udGFsQWxpZ25tZW50KSB7XHJcblx0XHRcdFx0XHRcdGNhc2UgRW51bXMuSG9yaXpvbnRhbEFsaWdubWVudC5DZW50ZXI6XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQ6XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImZsZXgtZW5kXCI7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImZsZXgtc3RhcnRcIjtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRzd2l0Y2ggKHRoaXMuX293bmVyLmhvc3RDb25maWcuYWN0aW9ucy5hY3Rpb25BbGlnbm1lbnQpIHtcclxuXHRcdFx0XHRcdFx0Y2FzZSBFbnVtcy5BY3Rpb25BbGlnbm1lbnQuQ2VudGVyOlxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvblN0cmlwLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSBFbnVtcy5BY3Rpb25BbGlnbm1lbnQuUmlnaHQ6XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImZsZXgtZW5kXCI7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImZsZXgtc3RhcnRcIjtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuZmxleERpcmVjdGlvbiA9IFwiY29sdW1uXCI7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLl9vd25lci5ob3Jpem9udGFsQWxpZ25tZW50ICYmIHRoaXMuX293bmVyLmhvc3RDb25maWcuYWN0aW9ucy5hY3Rpb25BbGlnbm1lbnQgIT0gRW51bXMuQWN0aW9uQWxpZ25tZW50LlN0cmV0Y2gpIHtcclxuXHRcdFx0XHRcdHN3aXRjaCAodGhpcy5fb3duZXIuaG9yaXpvbnRhbEFsaWdubWVudCkge1xyXG5cdFx0XHRcdFx0XHRjYXNlIEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQuQ2VudGVyOlxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvblN0cmlwLnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQ6XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuYWxpZ25JdGVtcyA9IFwiZmxleC1lbmRcIjtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRidXR0b25TdHJpcC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJmbGV4LXN0YXJ0XCI7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0c3dpdGNoICh0aGlzLl9vd25lci5ob3N0Q29uZmlnLmFjdGlvbnMuYWN0aW9uQWxpZ25tZW50KSB7XHJcblx0XHRcdFx0XHRcdGNhc2UgRW51bXMuQWN0aW9uQWxpZ25tZW50LkNlbnRlcjpcclxuXHRcdFx0XHRcdFx0XHRidXR0b25TdHJpcC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSBFbnVtcy5BY3Rpb25BbGlnbm1lbnQuUmlnaHQ6XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuYWxpZ25JdGVtcyA9IFwiZmxleC1lbmRcIjtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSBFbnVtcy5BY3Rpb25BbGlnbm1lbnQuU3RyZXRjaDpcclxuXHRcdFx0XHRcdFx0XHRidXR0b25TdHJpcC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJzdHJldGNoXCI7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uU3RyaXAuc3R5bGUuYWxpZ25JdGVtcyA9IFwiZmxleC1zdGFydFwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHBhcmVudENvbnRhaW5lclN0eWxlID0gdGhpcy5nZXRQYXJlbnRDb250YWluZXIoKS5zdHlsZTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChpc0FjdGlvbkFsbG93ZWQodGhpcy5pdGVtc1tpXSwgZm9yYmlkZGVuQWN0aW9uVHlwZXMpKSB7XHJcblx0XHRcdFx0XHRsZXQgYWN0aW9uQnV0dG9uOiBBY3Rpb25CdXR0b24gPSB0aGlzLmZpbmRBY3Rpb25CdXR0b24odGhpcy5pdGVtc1tpXSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFhY3Rpb25CdXR0b24pIHtcclxuXHRcdFx0XHRcdFx0YWN0aW9uQnV0dG9uID0gbmV3IEFjdGlvbkJ1dHRvbih0aGlzLml0ZW1zW2ldLCBwYXJlbnRDb250YWluZXJTdHlsZSk7XHJcblx0XHRcdFx0XHRcdGFjdGlvbkJ1dHRvbi5vbkNsaWNrID0gKGFiKSA9PiB7IHRoaXMuYWN0aW9uQ2xpY2tlZChhYik7IH07XHJcblxyXG5cdFx0XHRcdFx0XHR0aGlzLmJ1dHRvbnMucHVzaChhY3Rpb25CdXR0b24pO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGFjdGlvbkJ1dHRvbi5yZW5kZXIodGhpcy5fb3duZXIuaG9zdENvbmZpZy5hY3Rpb25zLmFjdGlvbkFsaWdubWVudCk7XHJcblxyXG5cdFx0XHRcdFx0YnV0dG9uU3RyaXAuYXBwZW5kQ2hpbGQoYWN0aW9uQnV0dG9uLmFjdGlvbi5yZW5kZXJlZEVsZW1lbnQpO1xyXG5cclxuXHRcdFx0XHRcdHRoaXMuX3JlbmRlcmVkQWN0aW9uQ291bnQrKztcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5fcmVuZGVyZWRBY3Rpb25Db3VudCA+PSB0aGlzLl9vd25lci5ob3N0Q29uZmlnLmFjdGlvbnMubWF4QWN0aW9ucyB8fCBpID09IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGVsc2UgaWYgKHRoaXMuX293bmVyLmhvc3RDb25maWcuYWN0aW9ucy5idXR0b25TcGFjaW5nID4gMCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgc3BhY2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gRW51bXMuT3JpZW50YXRpb24uSG9yaXpvbnRhbCkge1xyXG5cdFx0XHRcdFx0XHRcdHNwYWNlci5zdHlsZS5mbGV4ID0gXCIwIDAgYXV0b1wiO1xyXG5cdFx0XHRcdFx0XHRcdHNwYWNlci5zdHlsZS53aWR0aCA9IHRoaXMuX293bmVyLmhvc3RDb25maWcuYWN0aW9ucy5idXR0b25TcGFjaW5nICsgXCJweFwiO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHNwYWNlci5zdHlsZS5oZWlnaHQgPSB0aGlzLl9vd25lci5ob3N0Q29uZmlnLmFjdGlvbnMuYnV0dG9uU3BhY2luZyArIFwicHhcIjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQoYnV0dG9uU3RyaXAsIHNwYWNlcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgYnV0dG9uU3RyaXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRidXR0b25TdHJpcENvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcblx0XHRcdGJ1dHRvblN0cmlwQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvblN0cmlwKTtcclxuXHJcblx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGVsZW1lbnQsIGJ1dHRvblN0cmlwQ29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRVdGlscy5hcHBlbmRDaGlsZChlbGVtZW50LCB0aGlzLl9hY3Rpb25DYXJkQ29udGFpbmVyKTtcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5idXR0b25zW2ldLnN0YXRlID09IEFjdGlvbkJ1dHRvblN0YXRlLkV4cGFuZGVkKSB7XHJcblx0XHRcdFx0dGhpcy5leHBhbmRTaG93Q2FyZEFjdGlvbig8U2hvd0NhcmRBY3Rpb24+dGhpcy5idXR0b25zW2ldLmFjdGlvbiwgZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9yZW5kZXJlZEFjdGlvbkNvdW50ID4gMCA/IGVsZW1lbnQgOiBudWxsO1xyXG5cdH1cclxuXHJcblx0YWRkQWN0aW9uKGFjdGlvbjogQWN0aW9uKSB7XHJcblx0XHRpZiAoIWFjdGlvbikge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgYWN0aW9uIHBhcmFtZXRlciBjYW5ub3QgYmUgbnVsbC5cIik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCghYWN0aW9uLnBhcmVudCB8fCBhY3Rpb24ucGFyZW50ID09PSB0aGlzLl9vd25lcikgJiYgdGhpcy5pdGVtcy5pbmRleE9mKGFjdGlvbikgPCAwKSB7XHJcblx0XHRcdHRoaXMuaXRlbXMucHVzaChhY3Rpb24pO1xyXG5cclxuXHRcdFx0aWYgKCFhY3Rpb24ucGFyZW50KSB7XHJcblx0XHRcdFx0YWN0aW9uLnNldFBhcmVudCh0aGlzLl9vd25lcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGludm9rZVNldENvbGxlY3Rpb24oYWN0aW9uLCB0aGlzKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgYWN0aW9uIGFscmVhZHkgYmVsb25ncyB0byBhbm90aGVyIGVsZW1lbnQuXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVtb3ZlQWN0aW9uKGFjdGlvbjogQWN0aW9uKTogYm9vbGVhbiB7XHJcblx0XHRpZiAodGhpcy5leHBhbmRlZEFjdGlvbiAmJiB0aGlzLl9leHBhbmRlZEFjdGlvbiA9PSBhY3Rpb24pIHtcclxuXHRcdFx0dGhpcy5jb2xsYXBzZUV4cGFuZGVkQWN0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGFjdGlvbkluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKGFjdGlvbik7XHJcblxyXG5cdFx0aWYgKGFjdGlvbkluZGV4ID49IDApIHtcclxuXHRcdFx0dGhpcy5pdGVtcy5zcGxpY2UoYWN0aW9uSW5kZXgsIDEpO1xyXG5cclxuXHRcdFx0YWN0aW9uLnNldFBhcmVudChudWxsKTtcclxuXHJcblx0XHRcdGludm9rZVNldENvbGxlY3Rpb24oYWN0aW9uLCBudWxsKTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5idXR0b25zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuYnV0dG9uc1tpXS5hY3Rpb24gPT0gYWN0aW9uKSB7XHJcblx0XHRcdFx0XHR0aGlzLmJ1dHRvbnMuc3BsaWNlKGksIDEpO1xyXG5cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Y2xlYXIoKSB7XHJcblx0XHR0aGlzLml0ZW1zID0gW107XHJcblx0XHR0aGlzLmJ1dHRvbnMgPSBbXTtcclxuXHJcblx0XHR0aGlzLl9leHBhbmRlZEFjdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLl9yZW5kZXJlZEFjdGlvbkNvdW50ID0gMDtcclxuXHR9XHJcblxyXG5cdGdldEFsbElucHV0cygpOiBBcnJheTxJbnB1dD4ge1xyXG5cdFx0dmFyIHJlc3VsdDogQXJyYXk8SW5wdXQ+ID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBhY3Rpb24gPSB0aGlzLml0ZW1zW2ldO1xyXG5cclxuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChhY3Rpb24uZ2V0QWxsSW5wdXRzKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRSZXNvdXJjZUluZm9ybWF0aW9uKCk6IEFycmF5PElSZXNvdXJjZUluZm9ybWF0aW9uPiB7XHJcblx0XHRsZXQgcmVzdWx0OiBBcnJheTxJUmVzb3VyY2VJbmZvcm1hdGlvbj4gPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh0aGlzLml0ZW1zW2ldLmdldFJlc291cmNlSW5mb3JtYXRpb24oKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGdldCByZW5kZXJlZEFjdGlvbkNvdW50KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVuZGVyZWRBY3Rpb25Db3VudDtcclxuXHR9XHJcblxyXG5cdGdldCBleHBhbmRlZEFjdGlvbigpOiBTaG93Q2FyZEFjdGlvbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZXhwYW5kZWRBY3Rpb247XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uU2V0IGV4dGVuZHMgQ2FyZEVsZW1lbnQge1xyXG5cdHByaXZhdGUgX2FjdGlvbkNvbGxlY3Rpb246IEFjdGlvbkNvbGxlY3Rpb247XHJcblxyXG5cdHByb3RlY3RlZCBpbnRlcm5hbFJlbmRlcigpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5yZW5kZXIodGhpcy5vcmllbnRhdGlvbiA/IHRoaXMub3JpZW50YXRpb24gOiB0aGlzLmhvc3RDb25maWcuYWN0aW9ucy5hY3Rpb25zT3JpZW50YXRpb24sIHRoaXMuaXNEZXNpZ25Nb2RlKCkpO1xyXG5cdH1cclxuXHJcblx0b3JpZW50YXRpb24/OiBFbnVtcy5PcmllbnRhdGlvbiA9IG51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLl9hY3Rpb25Db2xsZWN0aW9uID0gbmV3IEFjdGlvbkNvbGxlY3Rpb24odGhpcyk7XHJcblx0fVxyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gc3VwZXIudG9KU09OKCk7XHJcblxyXG5cdFx0VXRpbHMuc2V0RW51bVByb3BlcnR5KEVudW1zLk9yaWVudGF0aW9uLCByZXN1bHQsIFwib3JpZW50YXRpb25cIiwgdGhpcy5vcmllbnRhdGlvbik7XHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwiYWN0aW9uc1wiLCB0aGlzLl9hY3Rpb25Db2xsZWN0aW9uLnRvSlNPTigpKTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0aXNCbGVlZGluZygpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9hY3Rpb25Db2xsZWN0aW9uLmV4cGFuZGVkQWN0aW9uID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Z2V0SnNvblR5cGVOYW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXCJBY3Rpb25TZXRcIjtcclxuXHR9XHJcblxyXG5cdGdldEFjdGlvbkNvdW50KCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5pdGVtcy5sZW5ndGg7XHJcblx0fVxyXG5cclxuXHRnZXRBY3Rpb25BdChpbmRleDogbnVtYmVyKTogQWN0aW9uIHtcclxuXHRcdGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5nZXRBY3Rpb25Db3VudCgpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9hY3Rpb25Db2xsZWN0aW9uLml0ZW1zW2luZGV4XTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRzdXBlci5nZXRBY3Rpb25BdChpbmRleCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+IHtcclxuXHRcdHJldHVybiB0aGlzLl9hY3Rpb25Db2xsZWN0aW9uLnZhbGlkYXRlKCk7XHJcblx0fVxyXG5cclxuXHRwYXJzZShqc29uOiBhbnksIGVycm9ycz86IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pIHtcclxuXHRcdHN1cGVyLnBhcnNlKGpzb24sIGVycm9ycyk7XHJcblxyXG5cdFx0dmFyIGpzb25PcmllbnRhdGlvbiA9IGpzb25bXCJvcmllbnRhdGlvblwiXTtcclxuXHJcblx0XHRpZiAoanNvbk9yaWVudGF0aW9uKSB7XHJcblx0XHRcdHRoaXMub3JpZW50YXRpb24gPSBVdGlscy5nZXRFbnVtVmFsdWVPckRlZmF1bHQoRW51bXMuT3JpZW50YXRpb24sIGpzb25PcmllbnRhdGlvbiwgRW51bXMuT3JpZW50YXRpb24uSG9yaXpvbnRhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5wYXJzZShqc29uW1wiYWN0aW9uc1wiXSwgZXJyb3JzKTtcclxuXHR9XHJcblxyXG5cdGFkZEFjdGlvbihhY3Rpb246IEFjdGlvbikge1xyXG5cdFx0dGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5hZGRBY3Rpb24oYWN0aW9uKTtcclxuXHR9XHJcblxyXG5cdGdldEFsbElucHV0cygpOiBBcnJheTxJbnB1dD4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24uZ2V0QWxsSW5wdXRzKCk7XHJcblx0fVxyXG5cclxuXHRnZXRSZXNvdXJjZUluZm9ybWF0aW9uKCk6IEFycmF5PElSZXNvdXJjZUluZm9ybWF0aW9uPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5nZXRSZXNvdXJjZUluZm9ybWF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJTcGVlY2goKTogc3RyaW5nIHtcclxuXHRcdC8vIFRPRE86IFdoYXQncyB0aGUgcmlnaHQgdGhpbmcgdG8gZG8gaGVyZT9cclxuXHRcdHJldHVybiBcIlwiO1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzSW50ZXJhY3RpdmUoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kSW1hZ2Uge1xyXG5cdHVybDogc3RyaW5nO1xyXG5cdG1vZGU6IEVudW1zLkJhY2tncm91bmRJbWFnZU1vZGUgPSBFbnVtcy5CYWNrZ3JvdW5kSW1hZ2VNb2RlLlN0cmV0Y2g7XHJcblx0aG9yaXpvbnRhbEFsaWdubWVudDogRW51bXMuSG9yaXpvbnRhbEFsaWdubWVudCA9IEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQuTGVmdDtcclxuXHR2ZXJ0aWNhbEFsaWdubWVudDogRW51bXMuVmVydGljYWxBbGlnbm1lbnQgPSBFbnVtcy5WZXJ0aWNhbEFsaWdubWVudC5Ub3A7XHJcblxyXG5cdHBhcnNlKGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdFx0dGhpcy51cmwgPSBqc29uW1widXJsXCJdO1xyXG5cdFx0dGhpcy5tb2RlID0gVXRpbHMuZ2V0RW51bVZhbHVlT3JEZWZhdWx0KEVudW1zLkJhY2tncm91bmRJbWFnZU1vZGUsIGpzb25bXCJtb2RlXCJdLCB0aGlzLm1vZGUpO1xyXG5cdFx0dGhpcy5ob3Jpem9udGFsQWxpZ25tZW50ID0gVXRpbHMuZ2V0RW51bVZhbHVlT3JEZWZhdWx0KEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQsIGpzb25bXCJob3Jpem9udGFsQWxpZ25tZW50XCJdLCB0aGlzLmhvcml6b250YWxBbGlnbm1lbnQpO1xyXG5cdFx0dGhpcy52ZXJ0aWNhbEFsaWdubWVudCA9IFV0aWxzLmdldEVudW1WYWx1ZU9yRGVmYXVsdChFbnVtcy5WZXJ0aWNhbEFsaWdubWVudCwganNvbltcInZlcnRpY2FsQWxpZ25tZW50XCJdLCB0aGlzLnZlcnRpY2FsQWxpZ25tZW50KTtcclxuXHR9XHJcblxyXG5cdGFwcGx5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRpZiAodGhpcy51cmwpIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnXCIgKyB0aGlzLnVybCArIFwiJylcIjtcclxuXHJcblx0XHRcdHN3aXRjaCAodGhpcy5tb2RlKSB7XHJcblx0XHRcdFx0Y2FzZSBFbnVtcy5CYWNrZ3JvdW5kSW1hZ2VNb2RlLlJlcGVhdDpcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9IFwicmVwZWF0XCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEVudW1zLkJhY2tncm91bmRJbWFnZU1vZGUuUmVwZWF0SG9yaXpvbnRhbGx5OlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gXCJyZXBlYXQteFwiO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBFbnVtcy5CYWNrZ3JvdW5kSW1hZ2VNb2RlLlJlcGVhdFZlcnRpY2FsbHk6XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSBcInJlcGVhdC15XCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEVudW1zLkJhY2tncm91bmRJbWFnZU1vZGUuU3RyZXRjaDpcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gXCJuby1yZXBlYXRcIjtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcImNvdmVyXCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3dpdGNoICh0aGlzLmhvcml6b250YWxBbGlnbm1lbnQpIHtcclxuXHRcdFx0XHRjYXNlIEVudW1zLkhvcml6b250YWxBbGlnbm1lbnQuQ2VudGVyOlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25YID0gXCJjZW50ZXJcIjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgRW51bXMuSG9yaXpvbnRhbEFsaWdubWVudC5SaWdodDpcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWCA9IFwicmlnaHRcIjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzd2l0Y2ggKHRoaXMudmVydGljYWxBbGlnbm1lbnQpIHtcclxuXHRcdFx0XHRjYXNlIEVudW1zLlZlcnRpY2FsQWxpZ25tZW50LkNlbnRlcjpcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiY2VudGVyXCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIEVudW1zLlZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbTpcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWSA9IFwiYm90dG9tXCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRhaW5lciBleHRlbmRzIENhcmRFbGVtZW50Q29udGFpbmVyIHtcclxuXHRwcml2YXRlIF9zZWxlY3RBY3Rpb246IEFjdGlvbjtcclxuXHRwcml2YXRlIF9pdGVtczogQXJyYXk8Q2FyZEVsZW1lbnQ+ID0gW107XHJcblx0cHJpdmF0ZSBfcmVuZGVyZWRJdGVtczogQXJyYXk8Q2FyZEVsZW1lbnQ+ID0gW107XHJcblx0cHJpdmF0ZSBfc3R5bGU/OiBzdHJpbmcgPSBudWxsO1xyXG5cclxuXHRwcml2YXRlIGlzRWxlbWVudEFsbG93ZWQoZWxlbWVudDogQ2FyZEVsZW1lbnQsIGZvcmJpZGRlbkVsZW1lbnRUeXBlczogQXJyYXk8c3RyaW5nPikge1xyXG5cdFx0aWYgKCF0aGlzLmhvc3RDb25maWcuc3VwcG9ydHNJbnRlcmFjdGl2aXR5ICYmIGVsZW1lbnQuaXNJbnRlcmFjdGl2ZSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGZvcmJpZGRlbkVsZW1lbnRUeXBlcykge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZvcmJpZGRlbkVsZW1lbnRUeXBlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmIChlbGVtZW50LmdldEpzb25UeXBlTmFtZSgpID09PSBmb3JiaWRkZW5FbGVtZW50VHlwZXNbaV0pIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgaW5zZXJ0SXRlbUF0KFxyXG5cdFx0aXRlbTogQ2FyZEVsZW1lbnQsXHJcblx0XHRpbmRleDogbnVtYmVyLFxyXG5cdFx0Zm9yY2VJbnNlcnQ6IGJvb2xlYW4pIHtcclxuXHRcdGlmICghaXRlbS5wYXJlbnQgfHwgZm9yY2VJbnNlcnQpIHtcclxuXHRcdFx0aWYgKGl0ZW0uaXNTdGFuZGFsb25lKSB7XHJcblx0XHRcdFx0aWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHRoaXMuX2l0ZW1zLnB1c2goaXRlbSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5faXRlbXMuc3BsaWNlKGluZGV4LCAwLCBpdGVtKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGl0ZW0uc2V0UGFyZW50KHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnRzIG9mIHR5cGUgXCIgKyBpdGVtLmdldEpzb25UeXBlTmFtZSgpICsgXCIgY2Fubm90IGJlIHVzZWQgYXMgc3RhbmRhbG9uZSBlbGVtZW50cy5cIik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZWxlbWVudCBhbHJlYWR5IGJlbG9uZ3MgdG8gYW5vdGhlciBjb250YWluZXIuXCIpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCBoYXNFeHBsaWNpdFN0eWxlKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3N0eWxlICE9IG51bGw7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0SXRlbXNDb2xsZWN0aW9uUHJvcGVydHlOYW1lKCk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gXCJpdGVtc1wiO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGlzTGFzdEVsZW1lbnRCbGVlZGluZygpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9yZW5kZXJlZEl0ZW1zLmxlbmd0aCA+IDAgPyB0aGlzLl9yZW5kZXJlZEl0ZW1zW3RoaXMuX3JlbmRlcmVkSXRlbXMubGVuZ3RoIC0gMV0uaXNCbGVlZGluZygpIDogZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgYXBwbHlQYWRkaW5nKCkge1xyXG5cdFx0aWYgKCF0aGlzLnJlbmRlcmVkRWxlbWVudCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMucGFkZGluZykge1xyXG5cdFx0XHR2YXIgcGh5c2ljYWxQYWRkaW5nID0gdGhpcy5wYWRkaW5nLnRvU3BhY2luZ0RlZmluaXRpb24odGhpcy5ob3N0Q29uZmlnKTtcclxuXHJcblx0XHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LnN0eWxlLnBhZGRpbmdUb3AgPSBwaHlzaWNhbFBhZGRpbmcudG9wICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVkRWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwaHlzaWNhbFBhZGRpbmcucmlnaHQgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LnN0eWxlLnBhZGRpbmdCb3R0b20gPSBwaHlzaWNhbFBhZGRpbmcuYm90dG9tICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVkRWxlbWVudC5zdHlsZS5wYWRkaW5nTGVmdCA9IHBoeXNpY2FsUGFkZGluZy5sZWZ0ICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy5oYXNCYWNrZ3JvdW5kKSB7XHJcblx0XHRcdHZhciBwaHlzaWNhbE1hcmdpbjogU3BhY2luZ0RlZmluaXRpb24gPSBuZXcgU3BhY2luZ0RlZmluaXRpb24oKTtcclxuXHRcdFx0dmFyIHBoeXNpY2FsUGFkZGluZzogU3BhY2luZ0RlZmluaXRpb24gPSBuZXcgU3BhY2luZ0RlZmluaXRpb24oKTtcclxuXHJcblx0XHRcdHZhciB1c2VBdXRvUGFkZGluZyA9ICh0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmNhbkNvbnRlbnRCbGVlZCgpIDogZmFsc2UpICYmIEFkYXB0aXZlQ2FyZC51c2VBdXRvbWF0aWNDb250YWluZXJCbGVlZGluZztcclxuXHJcblx0XHRcdGlmICh1c2VBdXRvUGFkZGluZykge1xyXG5cdFx0XHRcdHZhciBlZmZlY3RpdmVQYWRkaW5nID0gdGhpcy5nZXROb25aZXJvUGFkZGluZygpO1xyXG5cdFx0XHRcdHZhciBlZmZlY3RpdmVNYXJnaW46IFBhZGRpbmdEZWZpbml0aW9uID0gbmV3IFBhZGRpbmdEZWZpbml0aW9uKFxyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZy50b3AsXHJcblx0XHRcdFx0XHRlZmZlY3RpdmVQYWRkaW5nLnJpZ2h0LFxyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZy5ib3R0b20sXHJcblx0XHRcdFx0XHRlZmZlY3RpdmVQYWRkaW5nLmxlZnQpO1xyXG5cclxuXHRcdFx0XHRpZiAoIXRoaXMuaXNBdFRoZVZlcnlUb3AoKSkge1xyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZy50b3AgPSBFbnVtcy5TcGFjaW5nLk5vbmU7XHJcblx0XHRcdFx0XHRlZmZlY3RpdmVNYXJnaW4udG9wID0gRW51bXMuU3BhY2luZy5Ob25lO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCF0aGlzLmlzQXRUaGVWZXJ5Qm90dG9tKCkpIHtcclxuXHRcdFx0XHRcdGVmZmVjdGl2ZVBhZGRpbmcuYm90dG9tID0gRW51bXMuU3BhY2luZy5Ob25lO1xyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlTWFyZ2luLmJvdHRvbSA9IEVudW1zLlNwYWNpbmcuTm9uZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghdGhpcy5pc0F0VGhlVmVyeUxlZnQoKSkge1xyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZy5sZWZ0ID0gRW51bXMuU3BhY2luZy5Ob25lO1xyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlTWFyZ2luLmxlZnQgPSBFbnVtcy5TcGFjaW5nLk5vbmU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIXRoaXMuaXNBdFRoZVZlcnlSaWdodCgpKSB7XHJcblx0XHRcdFx0XHRlZmZlY3RpdmVQYWRkaW5nLnJpZ2h0ID0gRW51bXMuU3BhY2luZy5Ob25lO1xyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlTWFyZ2luLnJpZ2h0ID0gRW51bXMuU3BhY2luZy5Ob25lO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGVmZmVjdGl2ZVBhZGRpbmcubGVmdCAhPSBFbnVtcy5TcGFjaW5nLk5vbmUgfHwgZWZmZWN0aXZlUGFkZGluZy5yaWdodCAhPSBFbnVtcy5TcGFjaW5nLk5vbmUpIHtcclxuXHRcdFx0XHRcdGlmIChlZmZlY3RpdmVQYWRkaW5nLmxlZnQgPT0gRW51bXMuU3BhY2luZy5Ob25lKSB7XHJcblx0XHRcdFx0XHRcdGVmZmVjdGl2ZVBhZGRpbmcubGVmdCA9IGVmZmVjdGl2ZVBhZGRpbmcucmlnaHQ7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGVmZmVjdGl2ZVBhZGRpbmcucmlnaHQgPT0gRW51bXMuU3BhY2luZy5Ob25lKSB7XHJcblx0XHRcdFx0XHRcdGVmZmVjdGl2ZVBhZGRpbmcucmlnaHQgPSBlZmZlY3RpdmVQYWRkaW5nLmxlZnQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoZWZmZWN0aXZlUGFkZGluZy50b3AgIT0gRW51bXMuU3BhY2luZy5Ob25lIHx8IGVmZmVjdGl2ZVBhZGRpbmcuYm90dG9tICE9IEVudW1zLlNwYWNpbmcuTm9uZSkge1xyXG5cdFx0XHRcdFx0aWYgKGVmZmVjdGl2ZVBhZGRpbmcudG9wID09IEVudW1zLlNwYWNpbmcuTm9uZSkge1xyXG5cdFx0XHRcdFx0XHRlZmZlY3RpdmVQYWRkaW5nLnRvcCA9IGVmZmVjdGl2ZVBhZGRpbmcuYm90dG9tO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChlZmZlY3RpdmVQYWRkaW5nLmJvdHRvbSA9PSBFbnVtcy5TcGFjaW5nLk5vbmUpIHtcclxuXHRcdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZy5ib3R0b20gPSBlZmZlY3RpdmVQYWRkaW5nLnRvcDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChlZmZlY3RpdmVQYWRkaW5nLnRvcCAhPSBFbnVtcy5TcGFjaW5nLk5vbmVcclxuXHRcdFx0XHRcdHx8IGVmZmVjdGl2ZVBhZGRpbmcucmlnaHQgIT0gRW51bXMuU3BhY2luZy5Ob25lXHJcblx0XHRcdFx0XHR8fCBlZmZlY3RpdmVQYWRkaW5nLmJvdHRvbSAhPSBFbnVtcy5TcGFjaW5nLk5vbmVcclxuXHRcdFx0XHRcdHx8IGVmZmVjdGl2ZVBhZGRpbmcubGVmdCAhPSBFbnVtcy5TcGFjaW5nLk5vbmUpIHtcclxuXHRcdFx0XHRcdGlmIChlZmZlY3RpdmVQYWRkaW5nLnRvcCA9PSBFbnVtcy5TcGFjaW5nLk5vbmUpIHtcclxuXHRcdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZy50b3AgPSBFbnVtcy5TcGFjaW5nLkRlZmF1bHQ7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGVmZmVjdGl2ZVBhZGRpbmcucmlnaHQgPT0gRW51bXMuU3BhY2luZy5Ob25lKSB7XHJcblx0XHRcdFx0XHRcdGVmZmVjdGl2ZVBhZGRpbmcucmlnaHQgPSBFbnVtcy5TcGFjaW5nLkRlZmF1bHQ7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGVmZmVjdGl2ZVBhZGRpbmcuYm90dG9tID09IEVudW1zLlNwYWNpbmcuTm9uZSkge1xyXG5cdFx0XHRcdFx0XHRlZmZlY3RpdmVQYWRkaW5nID0gT2JqZWN0LmFzc2lnbihcclxuXHRcdFx0XHRcdFx0XHR7fSxcclxuXHRcdFx0XHRcdFx0XHRlZmZlY3RpdmVQYWRkaW5nLFxyXG5cdFx0XHRcdFx0XHRcdHsgYm90dG9tOiBFbnVtcy5TcGFjaW5nLkRlZmF1bHQgfVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChlZmZlY3RpdmVQYWRkaW5nLmxlZnQgPT0gRW51bXMuU3BhY2luZy5Ob25lKSB7XHJcblx0XHRcdFx0XHRcdGVmZmVjdGl2ZVBhZGRpbmcgPSBPYmplY3QuYXNzaWduKFxyXG5cdFx0XHRcdFx0XHRcdHt9LFxyXG5cdFx0XHRcdFx0XHRcdGVmZmVjdGl2ZVBhZGRpbmcsXHJcblx0XHRcdFx0XHRcdFx0eyBsZWZ0OiBFbnVtcy5TcGFjaW5nLkRlZmF1bHQgfVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGVmZmVjdGl2ZVBhZGRpbmcudG9wID09IEVudW1zLlNwYWNpbmcuTm9uZSAmJlxyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZy5yaWdodCA9PSBFbnVtcy5TcGFjaW5nLk5vbmUgJiZcclxuXHRcdFx0XHRcdGVmZmVjdGl2ZVBhZGRpbmcuYm90dG9tID09IEVudW1zLlNwYWNpbmcuTm9uZSAmJlxyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZy5sZWZ0ID09IEVudW1zLlNwYWNpbmcuTm9uZSkge1xyXG5cdFx0XHRcdFx0ZWZmZWN0aXZlUGFkZGluZyA9IG5ldyBQYWRkaW5nRGVmaW5pdGlvbihcclxuXHRcdFx0XHRcdFx0RW51bXMuU3BhY2luZy5QYWRkaW5nLFxyXG5cdFx0XHRcdFx0XHRFbnVtcy5TcGFjaW5nLlBhZGRpbmcsXHJcblx0XHRcdFx0XHRcdEVudW1zLlNwYWNpbmcuUGFkZGluZyxcclxuXHRcdFx0XHRcdFx0RW51bXMuU3BhY2luZy5QYWRkaW5nKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHBoeXNpY2FsTWFyZ2luID0gZWZmZWN0aXZlTWFyZ2luLnRvU3BhY2luZ0RlZmluaXRpb24odGhpcy5ob3N0Q29uZmlnKTtcclxuXHRcdFx0XHRwaHlzaWNhbFBhZGRpbmcgPSBlZmZlY3RpdmVQYWRkaW5nLnRvU3BhY2luZ0RlZmluaXRpb24odGhpcy5ob3N0Q29uZmlnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRwaHlzaWNhbFBhZGRpbmcgPSBuZXcgUGFkZGluZ0RlZmluaXRpb24oXHJcblx0XHRcdFx0XHRFbnVtcy5TcGFjaW5nLlBhZGRpbmcsXHJcblx0XHRcdFx0XHRFbnVtcy5TcGFjaW5nLlBhZGRpbmcsXHJcblx0XHRcdFx0XHRFbnVtcy5TcGFjaW5nLlBhZGRpbmcsXHJcblx0XHRcdFx0XHRFbnVtcy5TcGFjaW5nLlBhZGRpbmdcclxuXHRcdFx0XHQpLnRvU3BhY2luZ0RlZmluaXRpb24odGhpcy5ob3N0Q29uZmlnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gXCItXCIgKyBwaHlzaWNhbE1hcmdpbi50b3AgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCItXCIgKyBwaHlzaWNhbE1hcmdpbi5yaWdodCArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUubWFyZ2luQm90dG9tID0gXCItXCIgKyBwaHlzaWNhbE1hcmdpbi5ib3R0b20gKyBcInB4XCI7XHJcblx0XHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LnN0eWxlLm1hcmdpbkxlZnQgPSBcIi1cIiArIHBoeXNpY2FsTWFyZ2luLmxlZnQgKyBcInB4XCI7XHJcblxyXG5cdFx0XHR0aGlzLnJlbmRlcmVkRWxlbWVudC5zdHlsZS5wYWRkaW5nVG9wID0gcGh5c2ljYWxQYWRkaW5nLnRvcCArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gcGh5c2ljYWxQYWRkaW5nLnJpZ2h0ICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVkRWxlbWVudC5zdHlsZS5wYWRkaW5nQm90dG9tID0gcGh5c2ljYWxQYWRkaW5nLmJvdHRvbSArIFwicHhcIjtcclxuXHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSBwaHlzaWNhbFBhZGRpbmcubGVmdCArIFwicHhcIjtcclxuXHJcblx0XHRcdGlmICh0aGlzLnNlcGFyYXRvckVsZW1lbnQpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5zZXBhcmF0b3JPcmllbnRhdGlvbiA9PSBFbnVtcy5PcmllbnRhdGlvbi5Ib3Jpem9udGFsKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlcGFyYXRvckVsZW1lbnQuc3R5bGUubWFyZ2luTGVmdCA9IFwiLVwiICsgcGh5c2ljYWxNYXJnaW4ubGVmdCArIFwicHhcIjtcclxuXHRcdFx0XHRcdHRoaXMuc2VwYXJhdG9yRWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodCA9IFwiLVwiICsgcGh5c2ljYWxNYXJnaW4ucmlnaHQgKyBcInB4XCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXBhcmF0b3JFbGVtZW50LnN0eWxlLm1hcmdpblRvcCA9IFwiLVwiICsgcGh5c2ljYWxNYXJnaW4udG9wICsgXCJweFwiO1xyXG5cdFx0XHRcdFx0dGhpcy5zZXBhcmF0b3JFbGVtZW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiLVwiICsgcGh5c2ljYWxNYXJnaW4uYm90dG9tICsgXCJweFwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmlzTGFzdEVsZW1lbnRCbGVlZGluZygpKSB7XHJcblx0XHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LnN0eWxlLnBhZGRpbmdCb3R0b20gPSBcIjBweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGludGVybmFsUmVuZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHRoaXMuX3JlbmRlcmVkSXRlbXMgPSBbXTtcclxuXHJcblx0XHQvLyBDYWNoZSBob3N0Q29uZmlnIHRvIGF2b2lkIHdhbGtpbmcgdGhlIHBhcmVudCBoaWVyYXJjaHkgc2V2ZXJhbCB0aW1lc1xyXG5cdFx0bGV0IGhvc3RDb25maWcgPSB0aGlzLmhvc3RDb25maWc7XHJcblxyXG5cdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuXHRcdGlmICh0aGlzLnJ0bCAhPSBudWxsICYmIHRoaXMucnRsKSB7XHJcblx0XHRcdGVsZW1lbnQuZGlyID0gXCJydGxcIjtcclxuXHRcdH1cclxuXHJcblx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtY29udGFpbmVyXCIpKTtcclxuXHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG5cdFx0ZWxlbWVudC5zdHlsZS5mbGV4RGlyZWN0aW9uID0gXCJjb2x1bW5cIjtcclxuXHJcblx0XHRpZiAoQWRhcHRpdmVDYXJkLnVzZUFkdmFuY2VkQ2FyZEJvdHRvbVRydW5jYXRpb24pIHtcclxuXHRcdFx0Ly8gRm9yY2VzIHRoZSBjb250YWluZXIgdG8gYmUgYXQgbGVhc3QgYXMgdGFsbCBhcyBpdHMgY29udGVudC5cclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gRml4ZXMgYSBxdWlyayBpbiBDaHJvbWUgd2hlcmUsIGZvciBuZXN0ZWQgZmxleCBlbGVtZW50cywgdGhlXHJcblx0XHRcdC8vIGlubmVyIGVsZW1lbnQncyBoZWlnaHQgd291bGQgbmV2ZXIgZXhjZWVkIHRoZSBvdXRlciBlbGVtZW50J3NcclxuXHRcdFx0Ly8gaGVpZ2h0LiBUaGlzIGNhdXNlZCBvdmVyZmxvdyB0cnVuY2F0aW9uIHRvIGJyZWFrIC0tIGNvbnRhaW5lcnNcclxuXHRcdFx0Ly8gd291bGQgYWx3YXlzIGJlIG1lYXN1cmVkIGFzIG5vdCBvdmVyZmxvd2luZywgc2luY2UgdGhlaXIgaGVpZ2h0c1xyXG5cdFx0XHQvLyB3ZXJlIGNvbnN0cmFpbmVkIGJ5IHRoZWlyIHBhcmVudHMgYXMgb3Bwb3NlZCB0byB0cnVseSByZWZsZWN0aW5nXHJcblx0XHRcdC8vIHRoZSBoZWlnaHQgb2YgdGhlaXIgY29udGVudC5cclxuXHRcdFx0Ly9cclxuXHRcdFx0Ly8gU2VlIHRoZSBcIkJyb3dzZXIgUmVuZGVyaW5nIE5vdGVzXCIgc2VjdGlvbiBvZiB0aGlzIGFuc3dlcjpcclxuXHRcdFx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzYyNDcxNDAvd2h5LWRvZXNudC1mbGV4LWl0ZW0tc2hyaW5rLXBhc3QtY29udGVudC1zaXplXHJcblx0XHRcdGVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gJy13ZWJraXQtbWluLWNvbnRlbnQnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN3aXRjaCAodGhpcy52ZXJ0aWNhbENvbnRlbnRBbGlnbm1lbnQpIHtcclxuXHRcdFx0Y2FzZSBFbnVtcy5WZXJ0aWNhbEFsaWdubWVudC5DZW50ZXI6XHJcblx0XHRcdFx0ZWxlbWVudC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiY2VudGVyXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgRW51bXMuVmVydGljYWxBbGlnbm1lbnQuQm90dG9tOlxyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImZsZXgtZW5kXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0ZWxlbWVudC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiZmxleC1zdGFydFwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmhhc0JhY2tncm91bmQpIHtcclxuXHRcdFx0aWYgKHRoaXMuYmFja2dyb3VuZEltYWdlKSB7XHJcblx0XHRcdFx0dGhpcy5iYWNrZ3JvdW5kSW1hZ2UuYXBwbHkoZWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBzdHlsZURlZmluaXRpb24gPSB0aGlzLmhvc3RDb25maWcuY29udGFpbmVyU3R5bGVzLmdldFN0eWxlQnlOYW1lKHRoaXMuc3R5bGUsIHRoaXMuaG9zdENvbmZpZy5jb250YWluZXJTdHlsZXMuZ2V0U3R5bGVCeU5hbWUodGhpcy5kZWZhdWx0U3R5bGUpKTtcclxuXHJcblx0XHRcdGlmICghVXRpbHMuaXNOdWxsT3JFbXB0eShzdHlsZURlZmluaXRpb24uYmFja2dyb3VuZENvbG9yKSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gVXRpbHMuc3RyaW5nVG9Dc3NDb2xvcihzdHlsZURlZmluaXRpb24uYmFja2dyb3VuZENvbG9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNlbGVjdEFjdGlvbiAmJiBob3N0Q29uZmlnLnN1cHBvcnRzSW50ZXJhY3Rpdml0eSkge1xyXG5cdFx0XHRlbGVtZW50LmNsYXNzTGlzdC5hZGQoaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtc2VsZWN0YWJsZVwiKSk7XHJcblx0XHRcdGVsZW1lbnQudGFiSW5kZXggPSAwO1xyXG5cdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XHJcblx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0aGlzLnNlbGVjdEFjdGlvbi50aXRsZSk7XHJcblxyXG5cdFx0XHRlbGVtZW50Lm9uY2xpY2sgPSAoZSkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNlbGVjdEFjdGlvbiAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlbGVjdEFjdGlvbi5leGVjdXRlKCk7XHJcblx0XHRcdFx0XHRlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbGVtZW50Lm9ua2V5cHJlc3MgPSAoZSkgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLnNlbGVjdEFjdGlvbiAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHQvLyBFbnRlciBvciBzcGFjZSBwcmVzc2VkXHJcblx0XHRcdFx0XHRpZiAoZS5rZXlDb2RlID09IDEzIHx8IGUua2V5Q29kZSA9PSAzMikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdEFjdGlvbi5leGVjdXRlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciByZW5kZXJlZEVsZW1lbnQgPSB0aGlzLmlzRWxlbWVudEFsbG93ZWQodGhpcy5faXRlbXNbaV0sIHRoaXMuZ2V0Rm9yYmlkZGVuRWxlbWVudFR5cGVzKCkpID8gdGhpcy5faXRlbXNbaV0ucmVuZGVyKCkgOiBudWxsO1xyXG5cclxuXHRcdFx0XHRpZiAocmVuZGVyZWRFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5fcmVuZGVyZWRJdGVtcy5sZW5ndGggPiAwICYmIHRoaXMuX2l0ZW1zW2ldLnNlcGFyYXRvckVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5faXRlbXNbaV0uc2VwYXJhdG9yRWxlbWVudC5zdHlsZS5mbGV4ID0gXCIwIDAgYXV0b1wiO1xyXG5cclxuXHRcdFx0XHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQoZWxlbWVudCwgdGhpcy5faXRlbXNbaV0uc2VwYXJhdG9yRWxlbWVudCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0VXRpbHMuYXBwZW5kQ2hpbGQoZWxlbWVudCwgcmVuZGVyZWRFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0XHR0aGlzLl9yZW5kZXJlZEl0ZW1zLnB1c2godGhpcy5faXRlbXNbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLmlzRGVzaWduTW9kZSgpKSB7XHJcblx0XHRcdFx0dmFyIHBsYWNlaG9sZGVyRWxlbWVudCA9IHRoaXMuY3JlYXRlUGxhY2Vob2xkZXJFbGVtZW50KCk7XHJcblx0XHRcdFx0cGxhY2Vob2xkZXJFbGVtZW50LnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XHJcblx0XHRcdFx0cGxhY2Vob2xkZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xyXG5cclxuXHRcdFx0XHRlbGVtZW50LmFwcGVuZENoaWxkKHBsYWNlaG9sZGVyRWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCB0cnVuY2F0ZU92ZXJmbG93KG1heEhlaWdodDogbnVtYmVyKTogYm9vbGVhbiB7XHJcblx0XHQvLyBBZGQgMSB0byBhY2NvdW50IGZvciByb3VuZGluZyBkaWZmZXJlbmNlcyBiZXR3ZWVuIGJyb3dzZXJzXHJcblx0XHR2YXIgYm91bmRhcnkgPSB0aGlzLnJlbmRlcmVkRWxlbWVudC5vZmZzZXRUb3AgKyBtYXhIZWlnaHQgKyAxO1xyXG5cclxuXHRcdHZhciBoYW5kbGVFbGVtZW50ID0gKGNhcmRFbGVtZW50OiBDYXJkRWxlbWVudCkgPT4ge1xyXG5cdFx0XHRsZXQgZWx0ID0gY2FyZEVsZW1lbnQucmVuZGVyZWRFbGVtZW50O1xyXG5cclxuXHRcdFx0aWYgKGVsdCkge1xyXG5cdFx0XHRcdHN3aXRjaCAoVXRpbHMuZ2V0Rml0U3RhdHVzKGVsdCwgYm91bmRhcnkpKSB7XHJcblx0XHRcdFx0XHRjYXNlIEVudW1zLkNvbnRhaW5lckZpdFN0YXR1cy5GdWxseUluQ29udGFpbmVyOlxyXG5cdFx0XHRcdFx0XHRsZXQgc2l6ZUNoYW5nZWQgPSBjYXJkRWxlbWVudFsncmVzZXRPdmVyZmxvdyddKCk7XHJcblx0XHRcdFx0XHRcdC8vIElmIHRoZSBlbGVtZW50J3Mgc2l6ZSBjaGFuZ2VkIGFmdGVyIHJlc2V0dGluZyBjb250ZW50LFxyXG5cdFx0XHRcdFx0XHQvLyB3ZSBoYXZlIHRvIGNoZWNrIGlmIGl0IHN0aWxsIGZpdHMgZnVsbHkgaW4gdGhlIGNhcmRcclxuXHRcdFx0XHRcdFx0aWYgKHNpemVDaGFuZ2VkKSB7XHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlRWxlbWVudChjYXJkRWxlbWVudCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIEVudW1zLkNvbnRhaW5lckZpdFN0YXR1cy5PdmVyZmxvd2luZzpcclxuXHRcdFx0XHRcdFx0bGV0IG1heEhlaWdodCA9IGJvdW5kYXJ5IC0gZWx0Lm9mZnNldFRvcDtcclxuXHRcdFx0XHRcdFx0Y2FyZEVsZW1lbnRbJ2hhbmRsZU92ZXJmbG93J10obWF4SGVpZ2h0KTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlIEVudW1zLkNvbnRhaW5lckZpdFN0YXR1cy5GdWxseU91dE9mQ29udGFpbmVyOlxyXG5cdFx0XHRcdFx0XHRjYXJkRWxlbWVudFsnaGFuZGxlT3ZlcmZsb3cnXSgwKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGZvciAobGV0IGl0ZW0gb2YgdGhpcy5faXRlbXMpIHtcclxuXHRcdFx0aGFuZGxlRWxlbWVudChpdGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCB1bmRvT3ZlcmZsb3dUcnVuY2F0aW9uKCkge1xyXG5cdFx0Zm9yIChsZXQgaXRlbSBvZiB0aGlzLl9pdGVtcykge1xyXG5cdFx0XHRpdGVtWydyZXNldE92ZXJmbG93J10oKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXQgaGFzQmFja2dyb3VuZCgpOiBib29sZWFuIHtcclxuXHRcdHZhciBwYXJlbnRDb250YWluZXIgPSB0aGlzLmdldFBhcmVudENvbnRhaW5lcigpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmJhY2tncm91bmRJbWFnZSAhPSB1bmRlZmluZWQgfHwgKHRoaXMuaGFzRXhwbGljaXRTdHlsZSAmJiAocGFyZW50Q29udGFpbmVyID8gcGFyZW50Q29udGFpbmVyLnN0eWxlICE9IHRoaXMuc3R5bGUgOiBmYWxzZSkpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldCBkZWZhdWx0U3R5bGUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBFbnVtcy5Db250YWluZXJTdHlsZS5EZWZhdWx0O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldCBhbGxvd0N1c3RvbVN0eWxlKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRiYWNrZ3JvdW5kSW1hZ2U6IEJhY2tncm91bmRJbWFnZTtcclxuXHR2ZXJ0aWNhbENvbnRlbnRBbGlnbm1lbnQ6IEVudW1zLlZlcnRpY2FsQWxpZ25tZW50ID0gRW51bXMuVmVydGljYWxBbGlnbm1lbnQuVG9wO1xyXG5cdHJ0bD86IGJvb2xlYW4gPSBudWxsO1xyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gc3VwZXIudG9KU09OKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NlbGVjdEFjdGlvbikge1xyXG5cdFx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwic2VsZWN0QWN0aW9uXCIsIHRoaXMuX3NlbGVjdEFjdGlvbi50b0pTT04oKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuYmFja2dyb3VuZEltYWdlKSB7XHJcblx0XHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJiYWNrZ3JvdW5kSW1hZ2VcIiwgdGhpcy5iYWNrZ3JvdW5kSW1hZ2UudXJsKTtcclxuXHRcdH1cclxuXHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwic3R5bGVcIiwgdGhpcy5zdHlsZSwgXCJkZWZhdWx0XCIpO1xyXG5cdFx0VXRpbHMuc2V0RW51bVByb3BlcnR5KEVudW1zLlZlcnRpY2FsQWxpZ25tZW50LCByZXN1bHQsIFwidmVydGljYWxDb250ZW50QWxpZ25tZW50XCIsIHRoaXMudmVydGljYWxDb250ZW50QWxpZ25tZW50LCBFbnVtcy5WZXJ0aWNhbEFsaWdubWVudC5Ub3ApO1xyXG5cclxuXHRcdGlmICh0aGlzLl9pdGVtcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGxldCBlbGVtZW50cyA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLl9pdGVtcykge1xyXG5cdFx0XHRcdGVsZW1lbnRzLnB1c2goZWxlbWVudC50b0pTT04oKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgdGhpcy5nZXRJdGVtc0NvbGxlY3Rpb25Qcm9wZXJ0eU5hbWUoKSwgZWxlbWVudHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtQ291bnQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGg7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtQXQoaW5kZXg6IG51bWJlcik6IENhcmRFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLl9pdGVtc1tpbmRleF07XHJcblx0fVxyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIkNvbnRhaW5lclwiO1xyXG5cdH1cclxuXHJcblx0aXNCbGVlZGluZygpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLmlzTGFzdEVsZW1lbnRCbGVlZGluZygpO1xyXG5cdH1cclxuXHJcblx0aXNGaXJzdEVsZW1lbnQoZWxlbWVudDogQ2FyZEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuX2l0ZW1zW2ldLmlzVmlzaWJsZSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLl9pdGVtc1tpXSA9PSBlbGVtZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aXNMYXN0RWxlbWVudChlbGVtZW50OiBDYXJkRWxlbWVudCk6IGJvb2xlYW4ge1xyXG5cdFx0Zm9yICh2YXIgaSA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdGlmICh0aGlzLl9pdGVtc1tpXS5pc1Zpc2libGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5faXRlbXNbaV0gPT0gZWxlbWVudDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGlzUnRsKCk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHRoaXMucnRsICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucnRsO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGxldCBwYXJlbnRDb250YWluZXIgPSB0aGlzLmdldFBhcmVudENvbnRhaW5lcigpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHBhcmVudENvbnRhaW5lciA/IHBhcmVudENvbnRhaW5lci5pc1J0bCgpIDogZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+IHtcclxuXHRcdHZhciByZXN1bHQ6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4gPSBbXTtcclxuXHJcblx0XHRpZiAodGhpcy5fc3R5bGUpIHtcclxuXHRcdFx0dmFyIHN0eWxlRGVmaW5pdGlvbiA9IHRoaXMuaG9zdENvbmZpZy5jb250YWluZXJTdHlsZXMuZ2V0U3R5bGVCeU5hbWUodGhpcy5fc3R5bGUpO1xyXG5cclxuXHRcdFx0aWYgKCFzdHlsZURlZmluaXRpb24pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0ZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5JbnZhbGlkUHJvcGVydHlWYWx1ZSxcclxuXHRcdFx0XHRcdFx0bWVzc2FnZTogXCJVbmtub3duIGNvbnRhaW5lciBzdHlsZTogXCIgKyB0aGlzLl9zdHlsZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICghdGhpcy5ob3N0Q29uZmlnLnN1cHBvcnRzSW50ZXJhY3Rpdml0eSAmJiB0aGlzLl9pdGVtc1tpXS5pc0ludGVyYWN0aXZlKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IuSW50ZXJhY3Rpdml0eU5vdEFsbG93ZWQsXHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiSW50ZXJhY3Rpdml0eSBpcyBub3QgYWxsb3dlZC5cIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghdGhpcy5pc0VsZW1lbnRBbGxvd2VkKHRoaXMuX2l0ZW1zW2ldLCB0aGlzLmdldEZvcmJpZGRlbkVsZW1lbnRUeXBlcygpKSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLkludGVyYWN0aXZpdHlOb3RBbGxvd2VkLFxyXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBcIkVsZW1lbnRzIG9mIHR5cGUgXCIgKyB0aGlzLl9pdGVtc1tpXS5nZXRKc29uVHlwZU5hbWUoKSArIFwiIGFyZSBub3QgYWxsb3dlZCBpbiB0aGlzIGNvbnRhaW5lci5cIlxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQodGhpcy5faXRlbXNbaV0udmFsaWRhdGUoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHBhcnNlKGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdFx0c3VwZXIucGFyc2UoanNvbiwgZXJyb3JzKTtcclxuXHJcblx0XHR0aGlzLnNldFNob3VsZEZhbGxiYWNrKGZhbHNlKTtcclxuXHJcblx0XHR0aGlzLl9pdGVtcyA9IFtdO1xyXG5cdFx0dGhpcy5fcmVuZGVyZWRJdGVtcyA9IFtdO1xyXG5cclxuXHRcdGxldCBqc29uQmFja2dyb3VuZEltYWdlID0ganNvbltcImJhY2tncm91bmRJbWFnZVwiXTtcclxuXHJcblx0XHRpZiAoanNvbkJhY2tncm91bmRJbWFnZSkge1xyXG5cdFx0XHR0aGlzLmJhY2tncm91bmRJbWFnZSA9IG5ldyBCYWNrZ3JvdW5kSW1hZ2UoKTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YganNvbkJhY2tncm91bmRJbWFnZSA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdHRoaXMuYmFja2dyb3VuZEltYWdlLnVybCA9IGpzb25CYWNrZ3JvdW5kSW1hZ2U7XHJcblx0XHRcdFx0dGhpcy5iYWNrZ3JvdW5kSW1hZ2UubW9kZSA9IEVudW1zLkJhY2tncm91bmRJbWFnZU1vZGUuU3RyZXRjaDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YganNvbkJhY2tncm91bmRJbWFnZSA9PT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdHRoaXMuYmFja2dyb3VuZEltYWdlID0gbmV3IEJhY2tncm91bmRJbWFnZSgpO1xyXG5cdFx0XHRcdHRoaXMuYmFja2dyb3VuZEltYWdlLnBhcnNlKGpzb25bXCJiYWNrZ3JvdW5kSW1hZ2VcIl0sIGVycm9ycyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnZlcnRpY2FsQ29udGVudEFsaWdubWVudCA9IFV0aWxzLmdldEVudW1WYWx1ZU9yRGVmYXVsdChFbnVtcy5WZXJ0aWNhbEFsaWdubWVudCwganNvbltcInZlcnRpY2FsQ29udGVudEFsaWdubWVudFwiXSwgdGhpcy52ZXJ0aWNhbENvbnRlbnRBbGlnbm1lbnQpO1xyXG5cclxuXHRcdHRoaXMuX3N0eWxlID0ganNvbltcInN0eWxlXCJdO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0QWN0aW9uID0gY3JlYXRlQWN0aW9uSW5zdGFuY2UoXHJcblx0XHRcdHRoaXMsXHJcblx0XHRcdGpzb25bXCJzZWxlY3RBY3Rpb25cIl0sXHJcblx0XHRcdGVycm9ycyk7XHJcblxyXG5cdFx0aWYgKGpzb25bdGhpcy5nZXRJdGVtc0NvbGxlY3Rpb25Qcm9wZXJ0eU5hbWUoKV0gIT0gbnVsbCkge1xyXG5cdFx0XHRsZXQgaXRlbXMgPSBqc29uW3RoaXMuZ2V0SXRlbXNDb2xsZWN0aW9uUHJvcGVydHlOYW1lKCldIGFzIEFycmF5PGFueT47XHJcblxyXG5cdFx0XHR0aGlzLmNsZWFyKCk7XHJcblxyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50SW5zdGFuY2UodGhpcywgaXRlbXNbaV0sIGVycm9ycyk7XHJcblxyXG5cdFx0XHRcdGlmIChlbGVtZW50KSB7XHJcblx0XHRcdFx0XHR0aGlzLmluc2VydEl0ZW1BdChlbGVtZW50LCAtMSwgdHJ1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpbmRleE9mKGNhcmRFbGVtZW50OiBDYXJkRWxlbWVudCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXRlbXMuaW5kZXhPZihjYXJkRWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRhZGRJdGVtKGl0ZW06IENhcmRFbGVtZW50KSB7XHJcblx0XHR0aGlzLmluc2VydEl0ZW1BdChpdGVtLCAtMSwgZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0aW5zZXJ0SXRlbUJlZm9yZShpdGVtOiBDYXJkRWxlbWVudCwgaW5zZXJ0QmVmb3JlOiBDYXJkRWxlbWVudCkge1xyXG5cdFx0dGhpcy5pbnNlcnRJdGVtQXQoaXRlbSwgdGhpcy5faXRlbXMuaW5kZXhPZihpbnNlcnRCZWZvcmUpLCBmYWxzZSk7XHJcblx0fVxyXG5cclxuXHRpbnNlcnRJdGVtQWZ0ZXIoaXRlbTogQ2FyZEVsZW1lbnQsIGluc2VydEFmdGVyOiBDYXJkRWxlbWVudCkge1xyXG5cdFx0dGhpcy5pbnNlcnRJdGVtQXQoaXRlbSwgdGhpcy5faXRlbXMuaW5kZXhPZihpbnNlcnRBZnRlcikgKyAxLCBmYWxzZSk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmVJdGVtKGl0ZW06IENhcmRFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0XHR2YXIgaXRlbUluZGV4ID0gdGhpcy5faXRlbXMuaW5kZXhPZihpdGVtKTtcclxuXHJcblx0XHRpZiAoaXRlbUluZGV4ID49IDApIHtcclxuXHRcdFx0dGhpcy5faXRlbXMuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XHJcblxyXG5cdFx0XHRpdGVtLnNldFBhcmVudChudWxsKTtcclxuXHJcblx0XHRcdHRoaXMudXBkYXRlTGF5b3V0KCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRjbGVhcigpIHtcclxuXHRcdHRoaXMuX2l0ZW1zID0gW107XHJcblx0fVxyXG5cclxuXHRjYW5Db250ZW50QmxlZWQoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNCYWNrZ3JvdW5kID8gZmFsc2UgOiBzdXBlci5jYW5Db250ZW50QmxlZWQoKTtcclxuXHR9XHJcblxyXG5cdGdldEFsbElucHV0cygpOiBBcnJheTxJbnB1dD4ge1xyXG5cdFx0dmFyIHJlc3VsdDogQXJyYXk8SW5wdXQ+ID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbTogQ2FyZEVsZW1lbnQgPSB0aGlzLl9pdGVtc1tpXTtcclxuXHJcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoaXRlbS5nZXRBbGxJbnB1dHMoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGdldFJlc291cmNlSW5mb3JtYXRpb24oKTogQXJyYXk8SVJlc291cmNlSW5mb3JtYXRpb24+IHtcclxuXHRcdGxldCByZXN1bHQ6IEFycmF5PElSZXNvdXJjZUluZm9ybWF0aW9uPiA9IFtdO1xyXG5cclxuXHRcdGlmICh0aGlzLmJhY2tncm91bmRJbWFnZSAmJiAhVXRpbHMuaXNOdWxsT3JFbXB0eSh0aGlzLmJhY2tncm91bmRJbWFnZS51cmwpKSB7XHJcblx0XHRcdHJlc3VsdC5wdXNoKHsgdXJsOiB0aGlzLmJhY2tncm91bmRJbWFnZS51cmwsIG1pbWVUeXBlOiBcImltYWdlXCIgfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldEl0ZW1Db3VudCgpOyBpKyspIHtcclxuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh0aGlzLmdldEl0ZW1BdChpKS5nZXRSZXNvdXJjZUluZm9ybWF0aW9uKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRFbGVtZW50QnlJZChpZDogc3RyaW5nKTogQ2FyZEVsZW1lbnQge1xyXG5cdFx0dmFyIHJlc3VsdDogQ2FyZEVsZW1lbnQgPSBzdXBlci5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG5cdFx0aWYgKCFyZXN1bHQpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHJlc3VsdCA9IHRoaXMuX2l0ZW1zW2ldLmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcblx0XHRcdFx0aWYgKHJlc3VsdCkge1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGdldEFjdGlvbkJ5SWQoaWQ6IHN0cmluZyk6IEFjdGlvbiB7XHJcblx0XHR2YXIgcmVzdWx0OiBBY3Rpb24gPSBzdXBlci5nZXRBY3Rpb25CeUlkKGlkKTtcclxuXHJcblx0XHRpZiAoIXJlc3VsdCkge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RBY3Rpb24pIHtcclxuXHRcdFx0XHRyZXN1bHQgPSB0aGlzLnNlbGVjdEFjdGlvbi5nZXRBY3Rpb25CeUlkKGlkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFyZXN1bHQpIHtcclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLl9pdGVtc1tpXS5nZXRBY3Rpb25CeUlkKGlkKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmVzdWx0KSB7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJTcGVlY2goKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLnNwZWFrICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3BlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gcmVuZGVyIGVhY2ggaXRlbVxyXG5cdFx0bGV0IHNwZWFrID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5faXRlbXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRzcGVhayA9ICcnO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciByZXN1bHQgPSB0aGlzLl9pdGVtc1tpXS5yZW5kZXJTcGVlY2goKTtcclxuXHJcblx0XHRcdFx0aWYgKHJlc3VsdCkge1xyXG5cdFx0XHRcdFx0c3BlYWsgKz0gcmVzdWx0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzcGVhaztcclxuXHR9XHJcblxyXG5cdHVwZGF0ZUxheW91dChwcm9jZXNzQ2hpbGRyZW46IGJvb2xlYW4gPSB0cnVlKSB7XHJcblx0XHRzdXBlci51cGRhdGVMYXlvdXQocHJvY2Vzc0NoaWxkcmVuKTtcclxuXHJcblx0XHR0aGlzLmFwcGx5UGFkZGluZygpO1xyXG5cclxuXHRcdGlmIChwcm9jZXNzQ2hpbGRyZW4pIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHRoaXMuX2l0ZW1zW2ldLnVwZGF0ZUxheW91dCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgc3R5bGUoKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLmFsbG93Q3VzdG9tU3R5bGUpIHtcclxuXHRcdFx0aWYgKHRoaXMuX3N0eWxlICYmIHRoaXMuaG9zdENvbmZpZy5jb250YWluZXJTdHlsZXMuZ2V0U3R5bGVCeU5hbWUodGhpcy5fc3R5bGUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3N0eWxlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5kZWZhdWx0U3R5bGU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXQgc3R5bGUodmFsdWU6IHN0cmluZykge1xyXG5cdFx0dGhpcy5fc3R5bGUgPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdGdldCBwYWRkaW5nKCk6IFBhZGRpbmdEZWZpbml0aW9uIHtcclxuXHRcdHJldHVybiB0aGlzLmdldFBhZGRpbmcoKTtcclxuXHR9XHJcblxyXG5cdHNldCBwYWRkaW5nKHZhbHVlOiBQYWRkaW5nRGVmaW5pdGlvbikge1xyXG5cdFx0dGhpcy5zZXRQYWRkaW5nKHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdGdldCBzZWxlY3RBY3Rpb24oKTogQWN0aW9uIHtcclxuXHRcdHJldHVybiB0aGlzLl9zZWxlY3RBY3Rpb247XHJcblx0fVxyXG5cclxuXHRzZXQgc2VsZWN0QWN0aW9uKHZhbHVlOiBBY3Rpb24pIHtcclxuXHRcdHRoaXMuX3NlbGVjdEFjdGlvbiA9IHZhbHVlO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zZWxlY3RBY3Rpb24pIHtcclxuXHRcdFx0dGhpcy5fc2VsZWN0QWN0aW9uLnNldFBhcmVudCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIENvbHVtbldpZHRoID0gVXRpbHMuU2l6ZUFuZFVuaXQgfCBcImF1dG9cIiB8IFwic3RyZXRjaFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbHVtbiBleHRlbmRzIENvbnRhaW5lciB7XHJcblx0cHJpdmF0ZSBfY29tcHV0ZWRXZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBhZGp1c3RSZW5kZXJlZEVsZW1lbnRTaXplKHJlbmRlcmVkRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdGlmICh0aGlzLmlzRGVzaWduTW9kZSgpKSB7XHJcblx0XHRcdHJlbmRlcmVkRWxlbWVudC5zdHlsZS5taW5XaWR0aCA9IFwiMjBweFwiO1xyXG5cdFx0XHRyZW5kZXJlZEVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gXCIyMHB4XCI7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmVuZGVyZWRFbGVtZW50LnN0eWxlLm1pbldpZHRoID0gXCIwXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMud2lkdGggPT09IFwiYXV0b1wiKSB7XHJcblx0XHRcdHJlbmRlcmVkRWxlbWVudC5zdHlsZS5mbGV4ID0gXCIwIDEgYXV0b1wiO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAodGhpcy53aWR0aCA9PT0gXCJzdHJldGNoXCIpIHtcclxuXHRcdFx0cmVuZGVyZWRFbGVtZW50LnN0eWxlLmZsZXggPSBcIjEgMSA1MHB4XCI7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0bGV0IHNpemVBbmRVbml0ID0gPFV0aWxzLlNpemVBbmRVbml0PnRoaXMud2lkdGg7XHJcblxyXG5cdFx0XHRpZiAoc2l6ZUFuZFVuaXQudW5pdCA9PSBFbnVtcy5TaXplVW5pdC5QaXhlbCkge1xyXG5cdFx0XHRcdHJlbmRlcmVkRWxlbWVudC5zdHlsZS5mbGV4ID0gXCIwIDAgYXV0b1wiO1xyXG5cdFx0XHRcdHJlbmRlcmVkRWxlbWVudC5zdHlsZS53aWR0aCA9IHNpemVBbmRVbml0LnBoeXNpY2FsU2l6ZSArIFwicHhcIjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyZW5kZXJlZEVsZW1lbnQuc3R5bGUuZmxleCA9IFwiMSAxIFwiICsgKHRoaXMuX2NvbXB1dGVkV2VpZ2h0ID4gMCA/IHRoaXMuX2NvbXB1dGVkV2VpZ2h0IDogc2l6ZUFuZFVuaXQucGh5c2ljYWxTaXplKSArIFwiJVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0IHNlcGFyYXRvck9yaWVudGF0aW9uKCk6IEVudW1zLk9yaWVudGF0aW9uIHtcclxuXHRcdHJldHVybiBFbnVtcy5PcmllbnRhdGlvbi5WZXJ0aWNhbDtcclxuXHR9XHJcblxyXG5cdHdpZHRoOiBDb2x1bW5XaWR0aCA9IFwiYXV0b1wiO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih3aWR0aDogQ29sdW1uV2lkdGggPSBcImF1dG9cIikge1xyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XHJcblx0fVxyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIkNvbHVtblwiO1xyXG5cdH1cclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHN1cGVyLnRvSlNPTigpO1xyXG5cclxuXHRcdGlmICh0aGlzLndpZHRoIGluc3RhbmNlb2YgVXRpbHMuU2l6ZUFuZFVuaXQpIHtcclxuXHRcdFx0aWYgKHRoaXMud2lkdGgudW5pdCA9PSBFbnVtcy5TaXplVW5pdC5QaXhlbCkge1xyXG5cdFx0XHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJ3aWR0aFwiLCB0aGlzLndpZHRoLnBoeXNpY2FsU2l6ZSArIFwicHhcIik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcIndpZHRoXCIsIHRoaXMud2lkdGgucGh5c2ljYWxTaXplKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJ3aWR0aFwiLCB0aGlzLndpZHRoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHZhciBqc29uV2lkdGggPSBqc29uW1wid2lkdGhcIl07XHJcblxyXG5cdFx0aWYgKGpzb25XaWR0aCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGpzb25XaWR0aCA9IGpzb25bXCJzaXplXCJdO1xyXG5cclxuXHRcdFx0aWYgKGpzb25XaWR0aCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0cmFpc2VQYXJzZUVycm9yKFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLkRlcHJlY2F0ZWQsXHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IFwiVGhlIFxcXCJDb2x1bW4uc2l6ZVxcXCIgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkLiBVc2UgdGhlIFxcXCJDb2x1bW4ud2lkdGhcXFwiIHByb3BlcnR5IGluc3RlYWQuXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRlcnJvcnNcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGludmFsaWRXaWR0aCA9IGZhbHNlO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdHRoaXMud2lkdGggPSBVdGlscy5TaXplQW5kVW5pdC5wYXJzZShqc29uV2lkdGgpO1xyXG5cdFx0fVxyXG5cdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBqc29uV2lkdGggPT09IFwic3RyaW5nXCIgJiYgKGpzb25XaWR0aCA9PT0gXCJhdXRvXCIgfHwganNvbldpZHRoID09PSBcInN0cmV0Y2hcIikpIHtcclxuXHRcdFx0XHR0aGlzLndpZHRoID0ganNvbldpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGludmFsaWRXaWR0aCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaW52YWxpZFdpZHRoKSB7XHJcblx0XHRcdHJhaXNlUGFyc2VFcnJvcihcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLkludmFsaWRQcm9wZXJ0eVZhbHVlLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJJbnZhbGlkIGNvbHVtbiB3aWR0aDpcIiArIGpzb25XaWR0aCArIFwiIC0gZGVmYXVsdGluZyB0byBcXFwiYXV0b1xcXCJcIlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZXJyb3JzXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgaGFzVmlzaWJsZVNlcGFyYXRvcigpOiBib29sZWFuIHtcclxuXHRcdGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudCBpbnN0YW5jZW9mIENvbHVtblNldCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXBhcmF0b3JFbGVtZW50ICYmICF0aGlzLnBhcmVudC5pc0xlZnRNb3N0RWxlbWVudCh0aGlzKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQgaXNTdGFuZGFsb25lKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbHVtblNldCBleHRlbmRzIENhcmRFbGVtZW50Q29udGFpbmVyIHtcclxuXHRwcml2YXRlIF9jb2x1bW5zOiBBcnJheTxDb2x1bW4+ID0gW107XHJcblx0cHJpdmF0ZSBfc2VsZWN0QWN0aW9uOiBBY3Rpb247XHJcblxyXG5cdHByb3RlY3RlZCBhcHBseVBhZGRpbmcoKSB7XHJcblx0XHRpZiAodGhpcy5wYWRkaW5nKSB7XHJcblx0XHRcdGlmICh0aGlzLnJlbmRlcmVkRWxlbWVudCkge1xyXG5cdFx0XHRcdHZhciBwaHlzaWNhbFBhZGRpbmcgPSB0aGlzLnBhZGRpbmcudG9TcGFjaW5nRGVmaW5pdGlvbih0aGlzLmhvc3RDb25maWcpO1xyXG5cclxuXHRcdFx0XHR0aGlzLnJlbmRlcmVkRWxlbWVudC5zdHlsZS5wYWRkaW5nVG9wID0gcGh5c2ljYWxQYWRkaW5nLnRvcCArIFwicHhcIjtcclxuXHRcdFx0XHR0aGlzLnJlbmRlcmVkRWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwaHlzaWNhbFBhZGRpbmcucmlnaHQgKyBcInB4XCI7XHJcblx0XHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUucGFkZGluZ0JvdHRvbSA9IHBoeXNpY2FsUGFkZGluZy5ib3R0b20gKyBcInB4XCI7XHJcblx0XHRcdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSBwaHlzaWNhbFBhZGRpbmcubGVmdCArIFwicHhcIjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGludGVybmFsUmVuZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdGlmICh0aGlzLl9jb2x1bW5zLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Ly8gQ2FjaGUgaG9zdENvbmZpZyB0byBhdm9pZCB3YWxraW5nIHRoZSBwYXJlbnQgaGllcmFyY2h5IHNldmVyYWwgdGltZXNcclxuXHRcdFx0bGV0IGhvc3RDb25maWcgPSB0aGlzLmhvc3RDb25maWc7XHJcblxyXG5cdFx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gaG9zdENvbmZpZy5tYWtlQ3NzQ2xhc3NOYW1lKFwiYWMtY29sdW1uU2V0XCIpO1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuXHJcblx0XHRcdGlmIChBZGFwdGl2ZUNhcmQudXNlQWR2YW5jZWRDYXJkQm90dG9tVHJ1bmNhdGlvbikge1xyXG5cdFx0XHRcdC8vIFNlZSBjb21tZW50IGluIENvbnRhaW5lci5pbnRlcm5hbFJlbmRlcigpXHJcblx0XHRcdFx0ZWxlbWVudC5zdHlsZS5taW5IZWlnaHQgPSAnLXdlYmtpdC1taW4tY29udGVudCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdEFjdGlvbiAmJiBob3N0Q29uZmlnLnN1cHBvcnRzSW50ZXJhY3Rpdml0eSkge1xyXG5cdFx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChob3N0Q29uZmlnLm1ha2VDc3NDbGFzc05hbWUoXCJhYy1zZWxlY3RhYmxlXCIpKTtcclxuXHJcblx0XHRcdFx0ZWxlbWVudC5vbmNsaWNrID0gKGUpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0QWN0aW9uLmV4ZWN1dGUoKTtcclxuXHRcdFx0XHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHN3aXRjaCAodGhpcy5ob3Jpem9udGFsQWxpZ25tZW50KSB7XHJcblx0XHRcdFx0Y2FzZSBFbnVtcy5Ib3Jpem9udGFsQWxpZ25tZW50LkNlbnRlcjpcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBFbnVtcy5Ib3Jpem9udGFsQWxpZ25tZW50LlJpZ2h0OlxyXG5cdFx0XHRcdFx0ZWxlbWVudC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9IFwiZmxleC1lbmRcIjtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRlbGVtZW50LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJmbGV4LXN0YXJ0XCI7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRvdGFsV2VpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgY29sdW1uIG9mIHRoaXMuX2NvbHVtbnMpIHtcclxuXHRcdFx0XHRpZiAoY29sdW1uLndpZHRoIGluc3RhbmNlb2YgVXRpbHMuU2l6ZUFuZFVuaXQgJiYgKGNvbHVtbi53aWR0aC51bml0ID09IEVudW1zLlNpemVVbml0LldlaWdodCkpIHtcclxuXHRcdFx0XHRcdHRvdGFsV2VpZ2h0ICs9IGNvbHVtbi53aWR0aC5waHlzaWNhbFNpemU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmVuZGVyZWRDb2x1bW5Db3VudDogbnVtYmVyID0gMDtcclxuXHJcblx0XHRcdGZvciAobGV0IGNvbHVtbiBvZiB0aGlzLl9jb2x1bW5zKSB7XHJcblx0XHRcdFx0aWYgKGNvbHVtbi53aWR0aCBpbnN0YW5jZW9mIFV0aWxzLlNpemVBbmRVbml0ICYmIGNvbHVtbi53aWR0aC51bml0ID09IEVudW1zLlNpemVVbml0LldlaWdodCAmJiB0b3RhbFdlaWdodCA+IDApIHtcclxuXHRcdFx0XHRcdHZhciBjb21wdXRlZFdlaWdodCA9IDEwMCAvIHRvdGFsV2VpZ2h0ICogY29sdW1uLndpZHRoLnBoeXNpY2FsU2l6ZTtcclxuXHJcblx0XHRcdFx0XHQvLyBCZXN0IHdheSB0byBlbXVsYXRlIFwiaW50ZXJuYWxcIiBhY2Nlc3MgSSBrbm93IG9mXHJcblx0XHRcdFx0XHRjb2x1bW5bXCJfY29tcHV0ZWRXZWlnaHRcIl0gPSBjb21wdXRlZFdlaWdodDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHZhciByZW5kZXJlZENvbHVtbiA9IGNvbHVtbi5yZW5kZXIoKTtcclxuXHJcblx0XHRcdFx0aWYgKHJlbmRlcmVkQ29sdW1uKSB7XHJcblx0XHRcdFx0XHRpZiAocmVuZGVyZWRDb2x1bW5Db3VudCA+IDAgJiYgY29sdW1uLnNlcGFyYXRvckVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0Y29sdW1uLnNlcGFyYXRvckVsZW1lbnQuc3R5bGUuZmxleCA9IFwiMCAwIGF1dG9cIjtcclxuXHJcblx0XHRcdFx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGVsZW1lbnQsIGNvbHVtbi5zZXBhcmF0b3JFbGVtZW50KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRVdGlscy5hcHBlbmRDaGlsZChlbGVtZW50LCByZW5kZXJlZENvbHVtbik7XHJcblxyXG5cdFx0XHRcdFx0cmVuZGVyZWRDb2x1bW5Db3VudCsrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlbmRlcmVkQ29sdW1uQ291bnQgPiAwID8gZWxlbWVudCA6IG51bGw7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgdHJ1bmNhdGVPdmVyZmxvdyhtYXhIZWlnaHQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0Zm9yIChsZXQgY29sdW1uIG9mIHRoaXMuX2NvbHVtbnMpIHtcclxuXHRcdFx0Y29sdW1uWydoYW5kbGVPdmVyZmxvdyddKG1heEhlaWdodCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgdW5kb092ZXJmbG93VHJ1bmNhdGlvbigpIHtcclxuXHRcdGZvciAobGV0IGNvbHVtbiBvZiB0aGlzLl9jb2x1bW5zKSB7XHJcblx0XHRcdGNvbHVtblsncmVzZXRPdmVyZmxvdyddKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gc3VwZXIudG9KU09OKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NlbGVjdEFjdGlvbikge1xyXG5cdFx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwic2VsZWN0QWN0aW9uXCIsIHRoaXMuc2VsZWN0QWN0aW9uLnRvSlNPTigpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fY29sdW1ucy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGxldCBjb2x1bW5zID0gW107XHJcblxyXG5cdFx0XHRmb3IgKGxldCBjb2x1bW4gb2YgdGhpcy5fY29sdW1ucykge1xyXG5cdFx0XHRcdGNvbHVtbnMucHVzaChjb2x1bW4udG9KU09OKCkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwiY29sdW1uc1wiLCBjb2x1bW5zKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0aXNGaXJzdEVsZW1lbnQoZWxlbWVudDogQ2FyZEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fY29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5fY29sdW1uc1tpXS5pc1Zpc2libGUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fY29sdW1uc1tpXSA9PSBlbGVtZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Z2V0Q291bnQoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb2x1bW5zLmxlbmd0aDtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1Db3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q291bnQoKTtcclxuXHR9XHJcblxyXG5cdGdldENvbHVtbkF0KGluZGV4OiBudW1iZXIpOiBDb2x1bW4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbHVtbnNbaW5kZXhdO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbUF0KGluZGV4OiBudW1iZXIpOiBDYXJkRWxlbWVudCB7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRDb2x1bW5BdChpbmRleCk7XHJcblx0fVxyXG5cclxuXHRnZXRKc29uVHlwZU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcIkNvbHVtblNldFwiO1xyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0QWN0aW9uID0gY3JlYXRlQWN0aW9uSW5zdGFuY2UoXHJcblx0XHRcdHRoaXMsXHJcblx0XHRcdGpzb25bXCJzZWxlY3RBY3Rpb25cIl0sXHJcblx0XHRcdGVycm9ycyk7XHJcblxyXG5cdFx0aWYgKGpzb25bXCJjb2x1bW5zXCJdICE9IG51bGwpIHtcclxuXHRcdFx0bGV0IGpzb25Db2x1bW5zID0ganNvbltcImNvbHVtbnNcIl0gYXMgQXJyYXk8YW55PjtcclxuXHJcblx0XHRcdHRoaXMuX2NvbHVtbnMgPSBbXTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwganNvbkNvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRsZXQgY29sdW1uID0gbmV3IENvbHVtbigpO1xyXG5cdFx0XHRcdGNvbHVtbi5zZXRQYXJlbnQodGhpcyk7XHJcblx0XHRcdFx0Y29sdW1uLnBhcnNlKGpzb25Db2x1bW5zW2ldLCBlcnJvcnMpO1xyXG5cclxuXHRcdFx0XHR0aGlzLl9jb2x1bW5zLnB1c2goY29sdW1uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFsaWRhdGUoKTogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPiB7XHJcblx0XHR2YXIgcmVzdWx0OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+ID0gW107XHJcblx0XHR2YXIgd2VpZ2h0ZWRDb2x1bW5zOiBudW1iZXIgPSAwO1xyXG5cdFx0dmFyIHN0cmV0Y2hlZENvbHVtbnM6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgdGhpcy5fY29sdW1uc1tpXS53aWR0aCA9PT0gXCJudW1iZXJcIikge1xyXG5cdFx0XHRcdHdlaWdodGVkQ29sdW1ucysrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHRoaXMuX2NvbHVtbnNbaV0ud2lkdGggPT09IFwic3RyZXRjaFwiKSB7XHJcblx0XHRcdFx0c3RyZXRjaGVkQ29sdW1ucysrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXN1bHQgPSByZXN1bHQuY29uY2F0KHRoaXMuX2NvbHVtbnNbaV0udmFsaWRhdGUoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHdlaWdodGVkQ29sdW1ucyA+IDAgJiYgc3RyZXRjaGVkQ29sdW1ucyA+IDApIHtcclxuXHRcdFx0cmVzdWx0LnB1c2goXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5IaW50LFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJJdCBpcyBub3QgcmVjb21tZW5kZWQgdG8gdXNlIHdlaWdodGVkIGFuZCBzdHJldGNoZWQgY29sdW1ucyBpbiB0aGUgc2FtZSBDb2x1bW5TZXQsIGJlY2F1c2UgaW4gc3VjaCBhIHNpdHVhdGlvbiBzdHJldGNoZWQgY29sdW1ucyB3aWxsIGFsd2F5cyBnZXQgdGhlIG1pbmltdW0gYW1vdW50IG9mIHNwYWNlLlwiXHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZUxheW91dChwcm9jZXNzQ2hpbGRyZW46IGJvb2xlYW4gPSB0cnVlKSB7XHJcblx0XHRzdXBlci51cGRhdGVMYXlvdXQocHJvY2Vzc0NoaWxkcmVuKTtcclxuXHJcblx0XHR0aGlzLmFwcGx5UGFkZGluZygpO1xyXG5cclxuXHRcdGlmIChwcm9jZXNzQ2hpbGRyZW4pIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0dGhpcy5fY29sdW1uc1tpXS51cGRhdGVMYXlvdXQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkQ29sdW1uKGNvbHVtbjogQ29sdW1uKSB7XHJcblx0XHRpZiAoIWNvbHVtbi5wYXJlbnQpIHtcclxuXHRcdFx0dGhpcy5fY29sdW1ucy5wdXNoKGNvbHVtbik7XHJcblxyXG5cdFx0XHRjb2x1bW4uc2V0UGFyZW50KHRoaXMpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIlRoaXMgY29sdW1uIGFscmVhZHkgYmVsb25ncyB0byBhbm90aGVyIENvbHVtblNldC5cIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW1vdmVJdGVtKGl0ZW06IENhcmRFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0XHRpZiAoaXRlbSBpbnN0YW5jZW9mIENvbHVtbikge1xyXG5cdFx0XHR2YXIgaXRlbUluZGV4ID0gdGhpcy5fY29sdW1ucy5pbmRleE9mKGl0ZW0pO1xyXG5cclxuXHRcdFx0aWYgKGl0ZW1JbmRleCA+PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5fY29sdW1ucy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcclxuXHJcblx0XHRcdFx0aXRlbS5zZXRQYXJlbnQobnVsbCk7XHJcblxyXG5cdFx0XHRcdHRoaXMudXBkYXRlTGF5b3V0KCk7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0aW5kZXhPZihjYXJkRWxlbWVudDogQ2FyZEVsZW1lbnQpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIGNhcmRFbGVtZW50IGluc3RhbmNlb2YgQ29sdW1uID8gdGhpcy5fY29sdW1ucy5pbmRleE9mKGNhcmRFbGVtZW50KSA6IC0xO1xyXG5cdH1cclxuXHJcblx0aXNMZWZ0TW9zdEVsZW1lbnQoZWxlbWVudDogQ2FyZEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiB0aGlzLl9jb2x1bW5zLmluZGV4T2YoPENvbHVtbj5lbGVtZW50KSA9PSAwO1xyXG5cdH1cclxuXHJcblx0aXNSaWdodE1vc3RFbGVtZW50KGVsZW1lbnQ6IENhcmRFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29sdW1ucy5pbmRleE9mKDxDb2x1bW4+ZWxlbWVudCkgPT0gdGhpcy5fY29sdW1ucy5sZW5ndGggLSAxO1xyXG5cdH1cclxuXHJcblx0Z2V0QWxsSW5wdXRzKCk6IEFycmF5PElucHV0PiB7XHJcblx0XHR2YXIgcmVzdWx0OiBBcnJheTxJbnB1dD4gPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdCh0aGlzLl9jb2x1bW5zW2ldLmdldEFsbElucHV0cygpKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0Z2V0UmVzb3VyY2VJbmZvcm1hdGlvbigpOiBBcnJheTxJUmVzb3VyY2VJbmZvcm1hdGlvbj4ge1xyXG5cdFx0bGV0IHJlc3VsdDogQXJyYXk8SVJlc291cmNlSW5mb3JtYXRpb24+ID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQodGhpcy5fY29sdW1uc1tpXS5nZXRSZXNvdXJjZUluZm9ybWF0aW9uKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRFbGVtZW50QnlJZChpZDogc3RyaW5nKTogQ2FyZEVsZW1lbnQge1xyXG5cdFx0dmFyIHJlc3VsdDogQ2FyZEVsZW1lbnQgPSBzdXBlci5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG5cdFx0aWYgKCFyZXN1bHQpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0cmVzdWx0ID0gdGhpcy5fY29sdW1uc1tpXS5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG5cdFx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRBY3Rpb25CeUlkKGlkOiBzdHJpbmcpOiBBY3Rpb24ge1xyXG5cdFx0dmFyIHJlc3VsdDogQWN0aW9uID0gbnVsbDtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0cmVzdWx0ID0gdGhpcy5fY29sdW1uc1tpXS5nZXRBY3Rpb25CeUlkKGlkKTtcclxuXHJcblx0XHRcdGlmIChyZXN1bHQpIHtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJTcGVlY2goKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLnNwZWFrICE9IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3BlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gcmVuZGVyIGVhY2ggaXRlbVxyXG5cdFx0bGV0IHNwZWFrID0gJyc7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2NvbHVtbnMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2NvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRzcGVhayArPSB0aGlzLl9jb2x1bW5zW2ldLnJlbmRlclNwZWVjaCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHNwZWFrO1xyXG5cdH1cclxuXHJcblx0Z2V0IHBhZGRpbmcoKTogUGFkZGluZ0RlZmluaXRpb24ge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0UGFkZGluZygpO1xyXG5cdH1cclxuXHJcblx0c2V0IHBhZGRpbmcodmFsdWU6IFBhZGRpbmdEZWZpbml0aW9uKSB7XHJcblx0XHR0aGlzLnNldFBhZGRpbmcodmFsdWUpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHNlbGVjdEFjdGlvbigpOiBBY3Rpb24ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdEFjdGlvbjtcclxuXHR9XHJcblxyXG5cdHNldCBzZWxlY3RBY3Rpb24odmFsdWU6IEFjdGlvbikge1xyXG5cdFx0dGhpcy5fc2VsZWN0QWN0aW9uID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NlbGVjdEFjdGlvbikge1xyXG5cdFx0XHR0aGlzLl9zZWxlY3RBY3Rpb24uc2V0UGFyZW50KHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmFpc2VJbWFnZUxvYWRlZEV2ZW50KGltYWdlOiBJbWFnZSkge1xyXG5cdGxldCBjYXJkID0gaW1hZ2UuZ2V0Um9vdEVsZW1lbnQoKSBhcyBBZGFwdGl2ZUNhcmQ7XHJcblx0bGV0IG9uSW1hZ2VMb2FkZWRIYW5kbGVyID0gKGNhcmQgJiYgY2FyZC5vbkltYWdlTG9hZGVkKSA/IGNhcmQub25JbWFnZUxvYWRlZCA6IEFkYXB0aXZlQ2FyZC5vbkltYWdlTG9hZGVkO1xyXG5cclxuXHRpZiAob25JbWFnZUxvYWRlZEhhbmRsZXIpIHtcclxuXHRcdG9uSW1hZ2VMb2FkZWRIYW5kbGVyKGltYWdlKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhaXNlQW5jaG9yQ2xpY2tlZEV2ZW50KGVsZW1lbnQ6IENhcmRFbGVtZW50LCBhbmNob3I6IEhUTUxBbmNob3JFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0bGV0IGNhcmQgPSBlbGVtZW50LmdldFJvb3RFbGVtZW50KCkgYXMgQWRhcHRpdmVDYXJkO1xyXG5cdGxldCBvbkFuY2hvckNsaWNrZWRIYW5kbGVyID0gKGNhcmQgJiYgY2FyZC5vbkFuY2hvckNsaWNrZWQpID8gY2FyZC5vbkFuY2hvckNsaWNrZWQgOiBBZGFwdGl2ZUNhcmQub25BbmNob3JDbGlja2VkO1xyXG5cclxuXHRyZXR1cm4gb25BbmNob3JDbGlja2VkSGFuZGxlciAhPSBudWxsID8gb25BbmNob3JDbGlja2VkSGFuZGxlcihlbGVtZW50LCBhbmNob3IpIDogZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhaXNlRXhlY3V0ZUFjdGlvbkV2ZW50KGFjdGlvbjogQWN0aW9uKSB7XHJcblx0bGV0IGNhcmQgPSBhY3Rpb24ucGFyZW50LmdldFJvb3RFbGVtZW50KCkgYXMgQWRhcHRpdmVDYXJkO1xyXG5cdGxldCBvbkV4ZWN1dGVBY3Rpb25IYW5kbGVyID0gKGNhcmQgJiYgY2FyZC5vbkV4ZWN1dGVBY3Rpb24pID8gY2FyZC5vbkV4ZWN1dGVBY3Rpb24gOiBBZGFwdGl2ZUNhcmQub25FeGVjdXRlQWN0aW9uO1xyXG5cclxuXHRpZiAob25FeGVjdXRlQWN0aW9uSGFuZGxlcikge1xyXG5cdFx0YWN0aW9uLnByZXBhcmUoYWN0aW9uLnBhcmVudC5nZXRSb290RWxlbWVudCgpLmdldEFsbElucHV0cygpKTtcclxuXHJcblx0XHRvbkV4ZWN1dGVBY3Rpb25IYW5kbGVyKGFjdGlvbik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWlzZUlubGluZUNhcmRFeHBhbmRlZEV2ZW50KGFjdGlvbjogU2hvd0NhcmRBY3Rpb24sIGlzRXhwYW5kZWQ6IGJvb2xlYW4pIHtcclxuXHRsZXQgY2FyZCA9IGFjdGlvbi5wYXJlbnQuZ2V0Um9vdEVsZW1lbnQoKSBhcyBBZGFwdGl2ZUNhcmQ7XHJcblx0bGV0IG9uSW5saW5lQ2FyZEV4cGFuZGVkSGFuZGxlciA9IChjYXJkICYmIGNhcmQub25JbmxpbmVDYXJkRXhwYW5kZWQpID8gY2FyZC5vbklubGluZUNhcmRFeHBhbmRlZCA6IEFkYXB0aXZlQ2FyZC5vbklubGluZUNhcmRFeHBhbmRlZDtcclxuXHJcblx0aWYgKG9uSW5saW5lQ2FyZEV4cGFuZGVkSGFuZGxlcikge1xyXG5cdFx0b25JbmxpbmVDYXJkRXhwYW5kZWRIYW5kbGVyKGFjdGlvbiwgaXNFeHBhbmRlZCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWlzZUVsZW1lbnRWaXNpYmlsaXR5Q2hhbmdlZEV2ZW50KGVsZW1lbnQ6IENhcmRFbGVtZW50LCBzaG91bGRVcGRhdGVMYXlvdXQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcblx0bGV0IHJvb3RFbGVtZW50ID0gZWxlbWVudC5nZXRSb290RWxlbWVudCgpO1xyXG5cclxuXHRpZiAoc2hvdWxkVXBkYXRlTGF5b3V0KSB7XHJcblx0XHRyb290RWxlbWVudC51cGRhdGVMYXlvdXQoKTtcclxuXHR9XHJcblxyXG5cdGxldCBjYXJkID0gcm9vdEVsZW1lbnQgYXMgQWRhcHRpdmVDYXJkO1xyXG5cdGxldCBvbkVsZW1lbnRWaXNpYmlsaXR5Q2hhbmdlZEhhbmRsZXIgPSAoY2FyZCAmJiBjYXJkLm9uRWxlbWVudFZpc2liaWxpdHlDaGFuZ2VkKSA/IGNhcmQub25FbGVtZW50VmlzaWJpbGl0eUNoYW5nZWQgOiBBZGFwdGl2ZUNhcmQub25FbGVtZW50VmlzaWJpbGl0eUNoYW5nZWQ7XHJcblxyXG5cdGlmIChvbkVsZW1lbnRWaXNpYmlsaXR5Q2hhbmdlZEhhbmRsZXIgIT0gbnVsbCkge1xyXG5cdFx0b25FbGVtZW50VmlzaWJpbGl0eUNoYW5nZWRIYW5kbGVyKGVsZW1lbnQpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmFpc2VQYXJzZUVsZW1lbnRFdmVudChlbGVtZW50OiBDYXJkRWxlbWVudCwganNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0bGV0IGNhcmQgPSBlbGVtZW50LmdldFJvb3RFbGVtZW50KCkgYXMgQWRhcHRpdmVDYXJkO1xyXG5cdGxldCBvblBhcnNlRWxlbWVudEhhbmRsZXIgPSAoY2FyZCAmJiBjYXJkLm9uUGFyc2VFbGVtZW50KSA/IGNhcmQub25QYXJzZUVsZW1lbnQgOiBBZGFwdGl2ZUNhcmQub25QYXJzZUVsZW1lbnQ7XHJcblxyXG5cdGlmIChvblBhcnNlRWxlbWVudEhhbmRsZXIgIT0gbnVsbCkge1xyXG5cdFx0b25QYXJzZUVsZW1lbnRIYW5kbGVyKGVsZW1lbnQsIGpzb24sIGVycm9ycyk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWlzZVBhcnNlQWN0aW9uRXZlbnQoYWN0aW9uOiBBY3Rpb24sIGpzb246IGFueSwgZXJyb3JzPzogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPikge1xyXG5cdGxldCBjYXJkID0gYWN0aW9uLnBhcmVudCA/IGFjdGlvbi5wYXJlbnQuZ2V0Um9vdEVsZW1lbnQoKSBhcyBBZGFwdGl2ZUNhcmQgOiBudWxsO1xyXG5cdGxldCBvblBhcnNlQWN0aW9uSGFuZGxlciA9IChjYXJkICYmIGNhcmQub25QYXJzZUFjdGlvbikgPyBjYXJkLm9uUGFyc2VBY3Rpb24gOiBBZGFwdGl2ZUNhcmQub25QYXJzZUFjdGlvbjtcclxuXHJcblx0aWYgKG9uUGFyc2VBY3Rpb25IYW5kbGVyICE9IG51bGwpIHtcclxuXHRcdG9uUGFyc2VBY3Rpb25IYW5kbGVyKGFjdGlvbiwganNvbiwgZXJyb3JzKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhaXNlUGFyc2VFcnJvcihlcnJvcjogSG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yLCBlcnJvcnM6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pIHtcclxuXHRpZiAoZXJyb3JzKSB7XHJcblx0XHRlcnJvcnMucHVzaChlcnJvcik7XHJcblx0fVxyXG5cclxuXHRpZiAoQWRhcHRpdmVDYXJkLm9uUGFyc2VFcnJvciAhPSBudWxsKSB7XHJcblx0XHRBZGFwdGl2ZUNhcmQub25QYXJzZUVycm9yKGVycm9yKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVR5cGVSZWdpc3RyYXRpb248VD4ge1xyXG5cdHR5cGVOYW1lOiBzdHJpbmcsXHJcblx0Y3JlYXRlSW5zdGFuY2U6ICgpID0+IFQ7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb250YWluZXJXaXRoQWN0aW9ucyBleHRlbmRzIENvbnRhaW5lciB7XHJcblx0cHJpdmF0ZSBfYWN0aW9uQ29sbGVjdGlvbjogQWN0aW9uQ29sbGVjdGlvbjtcclxuXHJcblx0cHJvdGVjdGVkIGdldCByZW5kZXJJZkVtcHR5KCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGludGVybmFsUmVuZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHZhciBlbGVtZW50ID0gc3VwZXIuaW50ZXJuYWxSZW5kZXIoKTtcclxuXHJcblx0XHR2YXIgcmVuZGVyZWRBY3Rpb25zID0gdGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5yZW5kZXIodGhpcy5ob3N0Q29uZmlnLmFjdGlvbnMuYWN0aW9uc09yaWVudGF0aW9uLCBmYWxzZSk7XHJcblxyXG5cdFx0aWYgKHJlbmRlcmVkQWN0aW9ucykge1xyXG5cdFx0XHRVdGlscy5hcHBlbmRDaGlsZChcclxuXHRcdFx0XHRlbGVtZW50LFxyXG5cdFx0XHRcdFV0aWxzLnJlbmRlclNlcGFyYXRpb24oXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHNwYWNpbmc6IHRoaXMuaG9zdENvbmZpZy5nZXRFZmZlY3RpdmVTcGFjaW5nKHRoaXMuaG9zdENvbmZpZy5hY3Rpb25zLnNwYWNpbmcpLFxyXG5cdFx0XHRcdFx0XHRsaW5lVGhpY2tuZXNzOiBudWxsLFxyXG5cdFx0XHRcdFx0XHRsaW5lQ29sb3I6IG51bGxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRFbnVtcy5PcmllbnRhdGlvbi5Ib3Jpem9udGFsKSk7XHJcblx0XHRcdFV0aWxzLmFwcGVuZENoaWxkKGVsZW1lbnQsIHJlbmRlcmVkQWN0aW9ucyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMucmVuZGVySWZFbXB0eSkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudC5jaGlsZHJlbi5sZW5ndGggPiAwID8gZWxlbWVudCA6IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgaXNMYXN0RWxlbWVudEJsZWVkaW5nKCk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24ucmVuZGVyZWRBY3Rpb25Db3VudCA9PSAwKSB7XHJcblx0XHRcdHJldHVybiBzdXBlci5pc0xhc3RFbGVtZW50QmxlZWRpbmcoKSA/ICF0aGlzLmlzRGVzaWduTW9kZSgpIDogZmFsc2U7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24uaXRlbXMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5leHBhbmRlZEFjdGlvbiAhPSBudWxsICYmICF0aGlzLmhvc3RDb25maWcuYWN0aW9ucy5wcmVFeHBhbmRTaW5nbGVTaG93Q2FyZEFjdGlvbjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5leHBhbmRlZEFjdGlvbiAhPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5fYWN0aW9uQ29sbGVjdGlvbiA9IG5ldyBBY3Rpb25Db2xsZWN0aW9uKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0dG9KU09OKCkge1xyXG5cdFx0bGV0IHJlc3VsdCA9IHN1cGVyLnRvSlNPTigpO1xyXG5cclxuXHRcdFV0aWxzLnNldFByb3BlcnR5KHJlc3VsdCwgXCJhY3Rpb25zXCIsIHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24udG9KU09OKCkpO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRBY3Rpb25Db3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24uaXRlbXMubGVuZ3RoO1xyXG5cdH1cclxuXHJcblx0Z2V0QWN0aW9uQXQoaW5kZXg6IG51bWJlcik6IEFjdGlvbiB7XHJcblx0XHRpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuZ2V0QWN0aW9uQ291bnQoKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5pdGVtc1tpbmRleF07XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0c3VwZXIuZ2V0QWN0aW9uQXQoaW5kZXgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0QWN0aW9uQnlJZChpZDogc3RyaW5nKTogQWN0aW9uIHtcclxuXHRcdHZhciByZXN1bHQ6IEFjdGlvbiA9IHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24uZ2V0QWN0aW9uQnlJZChpZCk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdCA/IHJlc3VsdCA6IHN1cGVyLmdldEFjdGlvbkJ5SWQoaWQpO1xyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHRzdXBlci5wYXJzZShqc29uLCBlcnJvcnMpO1xyXG5cclxuXHRcdHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24ucGFyc2UoanNvbltcImFjdGlvbnNcIl0pO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGUoKTogQXJyYXk8SG9zdENvbmZpZy5JVmFsaWRhdGlvbkVycm9yPiB7XHJcblx0XHR2YXIgcmVzdWx0ID0gc3VwZXIudmFsaWRhdGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5fYWN0aW9uQ29sbGVjdGlvbikge1xyXG5cdFx0XHRyZXN1bHQgPSByZXN1bHQuY29uY2F0KHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24udmFsaWRhdGUoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdGlzTGFzdEVsZW1lbnQoZWxlbWVudDogQ2FyZEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBzdXBlci5pc0xhc3RFbGVtZW50KGVsZW1lbnQpICYmIHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24uaXRlbXMubGVuZ3RoID09IDA7XHJcblx0fVxyXG5cclxuXHRhZGRBY3Rpb24oYWN0aW9uOiBBY3Rpb24pIHtcclxuXHRcdHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24uYWRkQWN0aW9uKGFjdGlvbik7XHJcblx0fVxyXG5cclxuXHRjbGVhcigpIHtcclxuXHRcdHN1cGVyLmNsZWFyKCk7XHJcblxyXG5cdFx0dGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5jbGVhcigpO1xyXG5cdH1cclxuXHJcblx0Z2V0QWxsSW5wdXRzKCk6IEFycmF5PElucHV0PiB7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0QWxsSW5wdXRzKCkuY29uY2F0KHRoaXMuX2FjdGlvbkNvbGxlY3Rpb24uZ2V0QWxsSW5wdXRzKCkpO1xyXG5cdH1cclxuXHJcblx0Z2V0UmVzb3VyY2VJbmZvcm1hdGlvbigpOiBBcnJheTxJUmVzb3VyY2VJbmZvcm1hdGlvbj4ge1xyXG5cdFx0cmV0dXJuIHN1cGVyLmdldFJlc291cmNlSW5mb3JtYXRpb24oKS5jb25jYXQodGhpcy5fYWN0aW9uQ29sbGVjdGlvbi5nZXRSZXNvdXJjZUluZm9ybWF0aW9uKCkpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzU3RhbmRhbG9uZSgpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUeXBlUmVnaXN0cnk8VD4ge1xyXG5cdHByaXZhdGUgX2l0ZW1zOiBBcnJheTxJVHlwZVJlZ2lzdHJhdGlvbjxUPj4gPSBbXTtcclxuXHJcblx0cHJpdmF0ZSBmaW5kVHlwZVJlZ2lzdHJhdGlvbih0eXBlTmFtZTogc3RyaW5nKTogSVR5cGVSZWdpc3RyYXRpb248VD4ge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5faXRlbXNbaV0udHlwZU5hbWUgPT09IHR5cGVOYW1lKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2l0ZW1zW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMucmVzZXQoKTtcclxuXHR9XHJcblxyXG5cdGNsZWFyKCkge1xyXG5cdFx0dGhpcy5faXRlbXMgPSBbXTtcclxuXHR9XHJcblxyXG5cdGFic3RyYWN0IHJlc2V0KCk7XHJcblxyXG5cdHJlZ2lzdGVyVHlwZSh0eXBlTmFtZTogc3RyaW5nLCBjcmVhdGVJbnN0YW5jZTogKCkgPT4gVCkge1xyXG5cdFx0dmFyIHJlZ2lzdHJhdGlvbkluZm8gPSB0aGlzLmZpbmRUeXBlUmVnaXN0cmF0aW9uKHR5cGVOYW1lKTtcclxuXHJcblx0XHRpZiAocmVnaXN0cmF0aW9uSW5mbyAhPSBudWxsKSB7XHJcblx0XHRcdHJlZ2lzdHJhdGlvbkluZm8uY3JlYXRlSW5zdGFuY2UgPSBjcmVhdGVJbnN0YW5jZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZWdpc3RyYXRpb25JbmZvID0ge1xyXG5cdFx0XHRcdHR5cGVOYW1lOiB0eXBlTmFtZSxcclxuXHRcdFx0XHRjcmVhdGVJbnN0YW5jZTogY3JlYXRlSW5zdGFuY2VcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5faXRlbXMucHVzaChyZWdpc3RyYXRpb25JbmZvKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVucmVnaXN0ZXJUeXBlKHR5cGVOYW1lOiBzdHJpbmcpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMuX2l0ZW1zW2ldLnR5cGVOYW1lID09PSB0eXBlTmFtZSkge1xyXG5cdFx0XHRcdHRoaXMuX2l0ZW1zLnNwbGljZShpLCAxKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVJbnN0YW5jZSh0eXBlTmFtZTogc3RyaW5nKTogVCB7XHJcblx0XHR2YXIgcmVnaXN0cmF0aW9uSW5mbyA9IHRoaXMuZmluZFR5cGVSZWdpc3RyYXRpb24odHlwZU5hbWUpO1xyXG5cclxuXHRcdHJldHVybiByZWdpc3RyYXRpb25JbmZvID8gcmVnaXN0cmF0aW9uSW5mby5jcmVhdGVJbnN0YW5jZSgpIDogbnVsbDtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1Db3VudCgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2l0ZW1zLmxlbmd0aDtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1BdChpbmRleDogbnVtYmVyKTogSVR5cGVSZWdpc3RyYXRpb248VD4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2l0ZW1zW2luZGV4XTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbGVtZW50VHlwZVJlZ2lzdHJ5IGV4dGVuZHMgVHlwZVJlZ2lzdHJ5PENhcmRFbGVtZW50PiB7XHJcblx0cmVzZXQoKSB7XHJcblx0XHR0aGlzLmNsZWFyKCk7XHJcblxyXG5cdFx0dGhpcy5yZWdpc3RlclR5cGUoXCJDb250YWluZXJcIiwgKCkgPT4geyByZXR1cm4gbmV3IENvbnRhaW5lcigpOyB9KTtcclxuXHRcdHRoaXMucmVnaXN0ZXJUeXBlKFwiVGV4dEJsb2NrXCIsICgpID0+IHsgcmV0dXJuIG5ldyBUZXh0QmxvY2soKTsgfSk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyVHlwZShcIkltYWdlXCIsICgpID0+IHsgcmV0dXJuIG5ldyBJbWFnZSgpOyB9KTtcclxuXHRcdHRoaXMucmVnaXN0ZXJUeXBlKFwiSW1hZ2VTZXRcIiwgKCkgPT4geyByZXR1cm4gbmV3IEltYWdlU2V0KCk7IH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlclR5cGUoXCJNZWRpYVwiLCAoKSA9PiB7IHJldHVybiBuZXcgTWVkaWEoKTsgfSk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyVHlwZShcIkZhY3RTZXRcIiwgKCkgPT4geyByZXR1cm4gbmV3IEZhY3RTZXQoKTsgfSk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyVHlwZShcIkNvbHVtblNldFwiLCAoKSA9PiB7IHJldHVybiBuZXcgQ29sdW1uU2V0KCk7IH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlclR5cGUoXCJJbnB1dC5UZXh0XCIsICgpID0+IHsgcmV0dXJuIG5ldyBUZXh0SW5wdXQoKTsgfSk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyVHlwZShcIklucHV0LkRhdGVcIiwgKCkgPT4geyByZXR1cm4gbmV3IERhdGVJbnB1dCgpOyB9KTtcclxuXHRcdHRoaXMucmVnaXN0ZXJUeXBlKFwiSW5wdXQuVGltZVwiLCAoKSA9PiB7IHJldHVybiBuZXcgVGltZUlucHV0KCk7IH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlclR5cGUoXCJJbnB1dC5OdW1iZXJcIiwgKCkgPT4geyByZXR1cm4gbmV3IE51bWJlcklucHV0KCk7IH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlclR5cGUoXCJJbnB1dC5DaG9pY2VTZXRcIiwgKCkgPT4geyByZXR1cm4gbmV3IENob2ljZVNldElucHV0KCk7IH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlclR5cGUoXCJJbnB1dC5Ub2dnbGVcIiwgKCkgPT4geyByZXR1cm4gbmV3IFRvZ2dsZUlucHV0KCk7IH0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvblR5cGVSZWdpc3RyeSBleHRlbmRzIFR5cGVSZWdpc3RyeTxBY3Rpb24+IHtcclxuXHRyZXNldCgpIHtcclxuXHRcdHRoaXMuY2xlYXIoKTtcclxuXHJcblx0XHR0aGlzLnJlZ2lzdGVyVHlwZShcIkFjdGlvbi5PcGVuVXJsXCIsICgpID0+IHsgcmV0dXJuIG5ldyBPcGVuVXJsQWN0aW9uKCk7IH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlclR5cGUoXCJBY3Rpb24uU3VibWl0XCIsICgpID0+IHsgcmV0dXJuIG5ldyBTdWJtaXRBY3Rpb24oKTsgfSk7XHJcblx0XHR0aGlzLnJlZ2lzdGVyVHlwZShcIkFjdGlvbi5TaG93Q2FyZFwiLCAoKSA9PiB7IHJldHVybiBuZXcgU2hvd0NhcmRBY3Rpb24oKTsgfSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYXJrZG93blByb2Nlc3NpbmdSZXN1bHQge1xyXG5cdGRpZFByb2Nlc3M6IGJvb2xlYW47XHJcblx0b3V0cHV0SHRtbD86IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFkYXB0aXZlQ2FyZCBleHRlbmRzIENvbnRhaW5lcldpdGhBY3Rpb25zIHtcclxuXHRwcml2YXRlIHN0YXRpYyBjdXJyZW50VmVyc2lvbjogSG9zdENvbmZpZy5WZXJzaW9uID0gbmV3IEhvc3RDb25maWcuVmVyc2lvbigxLCAxKTtcclxuXHJcblx0c3RhdGljIHVzZUF1dG9tYXRpY0NvbnRhaW5lckJsZWVkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0c3RhdGljIHVzZUFkdmFuY2VkVGV4dEJsb2NrVHJ1bmNhdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblx0c3RhdGljIHVzZUFkdmFuY2VkQ2FyZEJvdHRvbVRydW5jYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzdGF0aWMgdXNlTWFya2Rvd25JblJhZGlvQnV0dG9uQW5kQ2hlY2tib3g6IGJvb2xlYW4gPSB0cnVlO1xyXG5cdHN0YXRpYyBhbGxvd01hcmtGb3JUZXh0SGlnaGxpZ2h0aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHN0YXRpYyByZWFkb25seSBlbGVtZW50VHlwZVJlZ2lzdHJ5ID0gbmV3IEVsZW1lbnRUeXBlUmVnaXN0cnkoKTtcclxuXHRzdGF0aWMgcmVhZG9ubHkgYWN0aW9uVHlwZVJlZ2lzdHJ5ID0gbmV3IEFjdGlvblR5cGVSZWdpc3RyeSgpO1xyXG5cclxuXHRzdGF0aWMgb25BbmNob3JDbGlja2VkOiAoZWxlbWVudDogQ2FyZEVsZW1lbnQsIGFuY2hvcjogSFRNTEFuY2hvckVsZW1lbnQpID0+IGJvb2xlYW4gPSBudWxsO1xyXG5cdHN0YXRpYyBvbkV4ZWN1dGVBY3Rpb246IChhY3Rpb246IEFjdGlvbikgPT4gdm9pZCA9IG51bGw7XHJcblx0c3RhdGljIG9uRWxlbWVudFZpc2liaWxpdHlDaGFuZ2VkOiAoZWxlbWVudDogQ2FyZEVsZW1lbnQpID0+IHZvaWQgPSBudWxsO1xyXG5cdHN0YXRpYyBvbkltYWdlTG9hZGVkOiAoaW1hZ2U6IEltYWdlKSA9PiB2b2lkID0gbnVsbDtcclxuXHRzdGF0aWMgb25JbmxpbmVDYXJkRXhwYW5kZWQ6IChhY3Rpb246IFNob3dDYXJkQWN0aW9uLCBpc0V4cGFuZGVkOiBib29sZWFuKSA9PiB2b2lkID0gbnVsbDtcclxuXHRzdGF0aWMgb25QYXJzZUVsZW1lbnQ6IChlbGVtZW50OiBDYXJkRWxlbWVudCwganNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSA9PiB2b2lkID0gbnVsbDtcclxuXHRzdGF0aWMgb25QYXJzZUFjdGlvbjogKGVsZW1lbnQ6IEFjdGlvbiwganNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSA9PiB2b2lkID0gbnVsbDtcclxuXHRzdGF0aWMgb25QYXJzZUVycm9yOiAoZXJyb3I6IEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcikgPT4gdm9pZCA9IG51bGw7XHJcblx0c3RhdGljIG9uUHJvY2Vzc01hcmtkb3duOiAodGV4dDogc3RyaW5nLCByZXN1bHQ6IElNYXJrZG93blByb2Nlc3NpbmdSZXN1bHQpID0+IHZvaWQgPSBudWxsO1xyXG5cclxuXHRzdGF0aWMgZ2V0IHByb2Nlc3NNYXJrZG93bigpOiAodGV4dDogc3RyaW5nKSA9PiBzdHJpbmcge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiVGhlIHByb2Nlc3NNYXJrZG93biBldmVudCBoYXMgYmVlbiByZW1vdmVkLiBQbGVhc2UgdXBkYXRlIHlvdXIgY29kZSBhbmQgc2V0IG9uUHJvY2Vzc01hcmtkb3duIGluc3RlYWQuXCIpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgc2V0IHByb2Nlc3NNYXJrZG93bih2YWx1ZTogKHRleHQ6IHN0cmluZykgPT4gc3RyaW5nKSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcHJvY2Vzc01hcmtkb3duIGV2ZW50IGhhcyBiZWVuIHJlbW92ZWQuIFBsZWFzZSB1cGRhdGUgeW91ciBjb2RlIGFuZCBzZXQgb25Qcm9jZXNzTWFya2Rvd24gaW5zdGVhZC5cIilcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhcHBseU1hcmtkb3duKHRleHQ6IHN0cmluZyk6IElNYXJrZG93blByb2Nlc3NpbmdSZXN1bHQge1xyXG5cdFx0bGV0IHJlc3VsdDogSU1hcmtkb3duUHJvY2Vzc2luZ1Jlc3VsdCA9IHtcclxuXHRcdFx0ZGlkUHJvY2VzczogZmFsc2VcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKEFkYXB0aXZlQ2FyZC5vblByb2Nlc3NNYXJrZG93bikge1xyXG5cdFx0XHRBZGFwdGl2ZUNhcmQub25Qcm9jZXNzTWFya2Rvd24odGV4dCwgcmVzdWx0KTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHdpbmRvd1tcIm1hcmtkb3duaXRcIl0pIHtcclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIG1hcmtkb3duaXRcclxuXHRcdFx0cmVzdWx0Lm91dHB1dEh0bWwgPSB3aW5kb3dbXCJtYXJrZG93bml0XCJdKCkucmVuZGVyKHRleHQpO1xyXG5cdFx0XHRyZXN1bHQuZGlkUHJvY2VzcyA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zb2xlLndhcm4oXCJNYXJrZG93biBwcm9jZXNzaW5nIGlzbid0IGVuYWJsZWQuIFBsZWFzZSBzZWUgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvYWRhcHRpdmVjYXJkcyNzdXBwb3J0aW5nLW1hcmtkb3duXCIpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX2NhcmRUeXBlTmFtZT86IHN0cmluZyA9IFwiQWRhcHRpdmVDYXJkXCI7XHJcblx0cHJpdmF0ZSBfZmFsbGJhY2tDYXJkOiBBZGFwdGl2ZUNhcmQgPSBudWxsO1xyXG5cclxuXHRwcml2YXRlIGlzVmVyc2lvblN1cHBvcnRlZCgpOiBib29sZWFuIHtcclxuXHRcdGlmICh0aGlzLmJ5cGFzc1ZlcnNpb25DaGVjaykge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRsZXQgdW5zdXBwb3J0ZWRWZXJzaW9uOiBib29sZWFuID1cclxuXHRcdFx0XHQhdGhpcy52ZXJzaW9uIHx8XHJcblx0XHRcdFx0IXRoaXMudmVyc2lvbi5pc1ZhbGlkIHx8XHJcblx0XHRcdFx0KEFkYXB0aXZlQ2FyZC5jdXJyZW50VmVyc2lvbi5tYWpvciA8IHRoaXMudmVyc2lvbi5tYWpvcikgfHxcclxuXHRcdFx0XHQoQWRhcHRpdmVDYXJkLmN1cnJlbnRWZXJzaW9uLm1ham9yID09IHRoaXMudmVyc2lvbi5tYWpvciAmJiBBZGFwdGl2ZUNhcmQuY3VycmVudFZlcnNpb24ubWlub3IgPCB0aGlzLnZlcnNpb24ubWlub3IpO1xyXG5cclxuXHRcdFx0cmV0dXJuICF1bnN1cHBvcnRlZFZlcnNpb247XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0IHJlbmRlcklmRW1wdHkoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRJdGVtc0NvbGxlY3Rpb25Qcm9wZXJ0eU5hbWUoKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBcImJvZHlcIjtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhcHBseVBhZGRpbmcoKSB7XHJcblx0XHRpZiAoIXRoaXMucmVuZGVyZWRFbGVtZW50KSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZWZmZWN0aXZlUGFkZGluZyA9IHRoaXMucGFkZGluZyA/IHRoaXMucGFkZGluZy50b1NwYWNpbmdEZWZpbml0aW9uKHRoaXMuaG9zdENvbmZpZykgOiB0aGlzLmludGVybmFsUGFkZGluZy50b1NwYWNpbmdEZWZpbml0aW9uKHRoaXMuaG9zdENvbmZpZyk7XHJcblxyXG5cdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUucGFkZGluZ1RvcCA9IGVmZmVjdGl2ZVBhZGRpbmcudG9wICsgXCJweFwiO1xyXG5cdFx0dGhpcy5yZW5kZXJlZEVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gZWZmZWN0aXZlUGFkZGluZy5yaWdodCArIFwicHhcIjtcclxuXHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LnN0eWxlLnBhZGRpbmdCb3R0b20gPSBlZmZlY3RpdmVQYWRkaW5nLmJvdHRvbSArIFwicHhcIjtcclxuXHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gZWZmZWN0aXZlUGFkZGluZy5sZWZ0ICsgXCJweFwiO1xyXG5cclxuXHRcdGlmICh0aGlzLmlzTGFzdEVsZW1lbnRCbGVlZGluZygpKSB7XHJcblx0XHRcdHRoaXMucmVuZGVyZWRFbGVtZW50LnN0eWxlLnBhZGRpbmdCb3R0b20gPSBcIjBweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGludGVybmFsUmVuZGVyKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHZhciByZW5kZXJlZEVsZW1lbnQgPSBzdXBlci5pbnRlcm5hbFJlbmRlcigpO1xyXG5cclxuXHRcdGlmIChBZGFwdGl2ZUNhcmQudXNlQWR2YW5jZWRDYXJkQm90dG9tVHJ1bmNhdGlvbikge1xyXG5cdFx0XHQvLyBVbmxpa2UgY29udGFpbmVycywgdGhlIHJvb3QgY2FyZCBlbGVtZW50IHNob3VsZCBiZSBhbGxvd2VkIHRvXHJcblx0XHRcdC8vIGJlIHNob3J0ZXIgdGhhbiBpdHMgY29udGVudCAob3RoZXJ3aXNlIHRoZSBvdmVyZmxvdyB0cnVuY2F0aW9uXHJcblx0XHRcdC8vIGxvZ2ljIHdvdWxkIG5ldmVyIGdldCB0cmlnZ2VyZWQpXHJcblx0XHRcdHJlbmRlcmVkRWxlbWVudC5zdHlsZS5taW5IZWlnaHQgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZW5kZXJlZEVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0IGJ5cGFzc1ZlcnNpb25DaGVjaygpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXQgZGVmYXVsdFBhZGRpbmcoKTogUGFkZGluZ0RlZmluaXRpb24ge1xyXG5cdFx0cmV0dXJuIG5ldyBQYWRkaW5nRGVmaW5pdGlvbihcclxuXHRcdFx0RW51bXMuU3BhY2luZy5QYWRkaW5nLFxyXG5cdFx0XHRFbnVtcy5TcGFjaW5nLlBhZGRpbmcsXHJcblx0XHRcdEVudW1zLlNwYWNpbmcuUGFkZGluZyxcclxuXHRcdFx0RW51bXMuU3BhY2luZy5QYWRkaW5nKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXQgYWxsb3dDdXN0b21QYWRkaW5nKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldCBhbGxvd0N1c3RvbVN0eWxlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaG9zdENvbmZpZy5hZGFwdGl2ZUNhcmQgJiYgdGhpcy5ob3N0Q29uZmlnLmFkYXB0aXZlQ2FyZC5hbGxvd0N1c3RvbVN0eWxlO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldCBoYXNCYWNrZ3JvdW5kKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRvbkFuY2hvckNsaWNrZWQ6IChlbGVtZW50OiBDYXJkRWxlbWVudCwgYW5jaG9yOiBIVE1MQW5jaG9yRWxlbWVudCkgPT4gYm9vbGVhbiA9IG51bGw7XHJcblx0b25FeGVjdXRlQWN0aW9uOiAoYWN0aW9uOiBBY3Rpb24pID0+IHZvaWQgPSBudWxsO1xyXG5cdG9uRWxlbWVudFZpc2liaWxpdHlDaGFuZ2VkOiAoZWxlbWVudDogQ2FyZEVsZW1lbnQpID0+IHZvaWQgPSBudWxsO1xyXG5cdG9uSW1hZ2VMb2FkZWQ6IChpbWFnZTogSW1hZ2UpID0+IHZvaWQgPSBudWxsO1xyXG5cdG9uSW5saW5lQ2FyZEV4cGFuZGVkOiAoYWN0aW9uOiBTaG93Q2FyZEFjdGlvbiwgaXNFeHBhbmRlZDogYm9vbGVhbikgPT4gdm9pZCA9IG51bGw7XHJcblx0b25QYXJzZUVsZW1lbnQ6IChlbGVtZW50OiBDYXJkRWxlbWVudCwganNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSA9PiB2b2lkID0gbnVsbDtcclxuXHRvblBhcnNlQWN0aW9uOiAoZWxlbWVudDogQWN0aW9uLCBqc29uOiBhbnksIGVycm9ycz86IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4pID0+IHZvaWQgPSBudWxsO1xyXG5cclxuXHR2ZXJzaW9uPzogSG9zdENvbmZpZy5WZXJzaW9uID0gbmV3IEhvc3RDb25maWcuVmVyc2lvbigxLCAwKTtcclxuXHRmYWxsYmFja1RleHQ6IHN0cmluZztcclxuXHRkZXNpZ25Nb2RlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdGdldEpzb25UeXBlTmFtZSgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFwiQWRhcHRpdmVDYXJkXCI7XHJcblx0fVxyXG5cclxuXHR0b0pTT04oKSB7XHJcblx0XHRsZXQgcmVzdWx0ID0gc3VwZXIudG9KU09OKCk7XHJcblxyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcIiRzY2hlbWFcIiwgXCJodHRwOi8vYWRhcHRpdmVjYXJkcy5pby9zY2hlbWFzL2FkYXB0aXZlLWNhcmQuanNvblwiKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuYnlwYXNzVmVyc2lvbkNoZWNrICYmIHRoaXMudmVyc2lvbikge1xyXG5cdFx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwidmVyc2lvblwiLCB0aGlzLnZlcnNpb24udG9TdHJpbmcoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcImZhbGxiYWNrVGV4dFwiLCB0aGlzLmZhbGxiYWNrVGV4dCk7XHJcblx0XHRVdGlscy5zZXRQcm9wZXJ0eShyZXN1bHQsIFwibGFuZ1wiLCB0aGlzLmxhbmcpO1xyXG5cdFx0VXRpbHMuc2V0UHJvcGVydHkocmVzdWx0LCBcInNwZWFrXCIsIHRoaXMuc3BlYWspO1xyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0ZSgpOiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+IHtcclxuXHRcdHZhciByZXN1bHQ6IEFycmF5PEhvc3RDb25maWcuSVZhbGlkYXRpb25FcnJvcj4gPSBbXTtcclxuXHJcblx0XHRpZiAodGhpcy5fY2FyZFR5cGVOYW1lICE9IFwiQWRhcHRpdmVDYXJkXCIpIHtcclxuXHRcdFx0cmVzdWx0LnB1c2goXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5NaXNzaW5nQ2FyZFR5cGUsXHJcblx0XHRcdFx0XHRtZXNzYWdlOiBcIkludmFsaWQgb3IgbWlzc2luZyBjYXJkIHR5cGUuIE1ha2Ugc3VyZSB0aGUgY2FyZCdzIHR5cGUgcHJvcGVydHkgaXMgc2V0IHRvIFxcXCJBZGFwdGl2ZUNhcmRcXFwiLlwiXHJcblx0XHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmJ5cGFzc1ZlcnNpb25DaGVjayAmJiAhdGhpcy52ZXJzaW9uKSB7XHJcblx0XHRcdHJlc3VsdC5wdXNoKFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IuUHJvcGVydHlDYW50QmVOdWxsLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJUaGUgdmVyc2lvbiBwcm9wZXJ0eSBtdXN0IGJlIHNwZWNpZmllZC5cIlxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoIXRoaXMuaXNWZXJzaW9uU3VwcG9ydGVkKCkpIHtcclxuXHRcdFx0cmVzdWx0LnB1c2goXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0ZXJyb3I6IEVudW1zLlZhbGlkYXRpb25FcnJvci5VbnN1cHBvcnRlZENhcmRWZXJzaW9uLFxyXG5cdFx0XHRcdFx0bWVzc2FnZTogXCJUaGUgc3BlY2lmaWVkIGNhcmQgdmVyc2lvbiAoXCIgKyB0aGlzLnZlcnNpb24gKyBcIikgaXMgbm90IHN1cHBvcnRlZC4gVGhlIG1heGltdW0gc3VwcG9ydGVkIGNhcmQgdmVyc2lvbiBpcyBcIiArIEFkYXB0aXZlQ2FyZC5jdXJyZW50VmVyc2lvblxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQuY29uY2F0KHN1cGVyLnZhbGlkYXRlKCkpO1xyXG5cdH1cclxuXHJcblx0cGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxIb3N0Q29uZmlnLklWYWxpZGF0aW9uRXJyb3I+KSB7XHJcblx0XHR0aGlzLl9mYWxsYmFja0NhcmQgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuX2NhcmRUeXBlTmFtZSA9IGpzb25bXCJ0eXBlXCJdO1xyXG5cclxuXHRcdHZhciBsYW5nSWQgPSBqc29uW1wibGFuZ1wiXTtcclxuXHJcblx0XHRpZiAobGFuZ0lkICYmIHR5cGVvZiBsYW5nSWQgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR0aGlzLmxhbmcgPSBsYW5nSWQ7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRyYWlzZVBhcnNlRXJyb3IoXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IuSW52YWxpZFByb3BlcnR5VmFsdWUsXHJcblx0XHRcdFx0XHRcdG1lc3NhZ2U6IGUubWVzc2FnZVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGVycm9yc1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnZlcnNpb24gPSBIb3N0Q29uZmlnLlZlcnNpb24ucGFyc2UoanNvbltcInZlcnNpb25cIl0sIGVycm9ycyk7XHJcblxyXG5cdFx0dGhpcy5mYWxsYmFja1RleHQgPSBqc29uW1wiZmFsbGJhY2tUZXh0XCJdO1xyXG5cclxuXHRcdGxldCBmYWxsYmFja0VsZW1lbnQgPSBjcmVhdGVFbGVtZW50SW5zdGFuY2UobnVsbCwganNvbltcImZhbGxiYWNrXCJdLCBlcnJvcnMpO1xyXG5cclxuXHRcdGlmIChmYWxsYmFja0VsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy5fZmFsbGJhY2tDYXJkID0gbmV3IEFkYXB0aXZlQ2FyZCgpO1xyXG5cdFx0XHR0aGlzLl9mYWxsYmFja0NhcmQuYWRkSXRlbShmYWxsYmFja0VsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHN1cGVyLnBhcnNlKGpzb24sIGVycm9ycyk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIodGFyZ2V0PzogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRsZXQgZmFsbGJhY2sgPSBmYWxzZTtcclxuXHRcdGxldCByZW5kZXJlZENhcmQ6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdGlmICh0aGlzLnNob3VsZEZhbGxiYWNrKCkpIHtcclxuXHRcdFx0aWYgKHRoaXMuX2ZhbGxiYWNrQ2FyZCkge1xyXG5cdFx0XHRcdHRoaXMuX2ZhbGxiYWNrQ2FyZC5ob3N0Q29uZmlnID0gdGhpcy5ob3N0Q29uZmlnO1xyXG5cclxuXHRcdFx0XHRyZW5kZXJlZENhcmQgPSB0aGlzLl9mYWxsYmFja0NhcmQucmVuZGVyKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0bGV0IGVycm9yVGV4dCA9ICFVdGlscy5pc051bGxPckVtcHR5KHRoaXMuZmFsbGJhY2tUZXh0KSA/IHRoaXMuZmFsbGJhY2tUZXh0IDogXCJUaGUgY2FyZCBjb3VsZCBub3QgYmUgcmVuZGVyZWQuIEl0IGlzIGVpdGhlciBtYWxmb3JtZWQgb3IgdXNlcyBmZWF0dXJlcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgaG9zdC5cIjtcclxuXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGxldCBmYWxsYmFja0NhcmQgPSBuZXcgQWRhcHRpdmVDYXJkKCk7XHJcblx0XHRcdFx0XHRmYWxsYmFja0NhcmQuaG9zdENvbmZpZyA9IHRoaXMuaG9zdENvbmZpZztcclxuXHRcdFx0XHRcdGZhbGxiYWNrQ2FyZC5wYXJzZShcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiQWRhcHRpdmVDYXJkXCIsXHJcblx0XHRcdFx0XHRcdFx0dmVyc2lvbjogXCIxLjBcIixcclxuXHRcdFx0XHRcdFx0XHRib2R5OiBbXHJcblx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiVGV4dEJsb2NrXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRleHQ6IGVycm9yVGV4dCxcclxuXHRcdFx0XHRcdFx0XHRcdFx0d3JhcDogdHJ1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdF1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0cmVuZGVyZWRDYXJkID0gZmFsbGJhY2tDYXJkLnJlbmRlcigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0cmVuZGVyZWRDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0XHRcdHJlbmRlcmVkQ2FyZC5pbm5lckhUTUwgPSBlcnJvclRleHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0cmVuZGVyZWRDYXJkID0gc3VwZXIucmVuZGVyKCk7XHJcblxyXG5cdFx0XHRpZiAocmVuZGVyZWRDYXJkKSB7XHJcblx0XHRcdFx0cmVuZGVyZWRDYXJkLnRhYkluZGV4ID0gMDtcclxuXHJcblx0XHRcdFx0aWYgKCFVdGlscy5pc051bGxPckVtcHR5KHRoaXMuc3BlYWspKSB7XHJcblx0XHRcdFx0XHRyZW5kZXJlZENhcmQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0aGlzLnNwZWFrKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGFyZ2V0KSB7XHJcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChyZW5kZXJlZENhcmQpO1xyXG5cclxuXHRcdFx0dGhpcy51cGRhdGVMYXlvdXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyZWRDYXJkO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlTGF5b3V0KHByb2Nlc3NDaGlsZHJlbjogYm9vbGVhbiA9IHRydWUpIHtcclxuXHRcdHN1cGVyLnVwZGF0ZUxheW91dChwcm9jZXNzQ2hpbGRyZW4pO1xyXG5cclxuXHRcdGlmIChBZGFwdGl2ZUNhcmQudXNlQWR2YW5jZWRDYXJkQm90dG9tVHJ1bmNhdGlvbiAmJiB0aGlzLmlzUmVuZGVyZWQoKSkge1xyXG5cdFx0XHR2YXIgY2FyZCA9IHRoaXMucmVuZGVyZWRFbGVtZW50O1xyXG5cdFx0XHR2YXIgcGFkZGluZyA9IHRoaXMuaG9zdENvbmZpZy5nZXRFZmZlY3RpdmVTcGFjaW5nKEVudW1zLlNwYWNpbmcuRGVmYXVsdCk7XHJcblxyXG5cdFx0XHR0aGlzWydoYW5kbGVPdmVyZmxvdyddKGNhcmQub2Zmc2V0SGVpZ2h0IC0gcGFkZGluZyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjYW5Db250ZW50QmxlZWQoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHNob3VsZEZhbGxiYWNrKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIHN1cGVyLnNob3VsZEZhbGxiYWNrKCkgfHwgIXRoaXMuaXNWZXJzaW9uU3VwcG9ydGVkKCk7XHJcblx0fVxyXG5cclxuXHRnZXQgaGFzVmlzaWJsZVNlcGFyYXRvcigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIElubGluZUFkYXB0aXZlQ2FyZCBleHRlbmRzIEFkYXB0aXZlQ2FyZCB7XHJcblx0cHJvdGVjdGVkIGdldCBieXBhc3NWZXJzaW9uQ2hlY2soKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXQgZGVmYXVsdFBhZGRpbmcoKTogUGFkZGluZ0RlZmluaXRpb24ge1xyXG5cdFx0cmV0dXJuIG5ldyBQYWRkaW5nRGVmaW5pdGlvbihcclxuXHRcdFx0dGhpcy5zdXBwcmVzc1N0eWxlID8gRW51bXMuU3BhY2luZy5Ob25lIDogRW51bXMuU3BhY2luZy5QYWRkaW5nLFxyXG5cdFx0XHRFbnVtcy5TcGFjaW5nLlBhZGRpbmcsXHJcblx0XHRcdHRoaXMuc3VwcHJlc3NTdHlsZSA/IEVudW1zLlNwYWNpbmcuTm9uZSA6IEVudW1zLlNwYWNpbmcuUGFkZGluZyxcclxuXHRcdFx0RW51bXMuU3BhY2luZy5QYWRkaW5nKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXQgZGVmYXVsdFN0eWxlKCk6IHN0cmluZyB7XHJcblx0XHRpZiAodGhpcy5zdXBwcmVzc1N0eWxlKSB7XHJcblx0XHRcdHJldHVybiBFbnVtcy5Db250YWluZXJTdHlsZS5EZWZhdWx0O1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmhvc3RDb25maWcuYWN0aW9ucy5zaG93Q2FyZC5zdHlsZSA/IHRoaXMuaG9zdENvbmZpZy5hY3Rpb25zLnNob3dDYXJkLnN0eWxlIDogRW51bXMuQ29udGFpbmVyU3R5bGUuRW1waGFzaXM7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdXBwcmVzc1N0eWxlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHJlbmRlcih0YXJnZXQ/OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0dmFyIHJlbmRlcmVkQ2FyZCA9IHN1cGVyLnJlbmRlcih0YXJnZXQpO1xyXG5cdFx0cmVuZGVyZWRDYXJkLnNldEF0dHJpYnV0ZShcImFyaWEtbGl2ZVwiLCBcInBvbGl0ZVwiKTtcclxuXHRcdHJlbmRlcmVkQ2FyZC5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyZWRDYXJkO1xyXG5cdH1cclxuXHJcblx0Z2V0Rm9yYmlkZGVuQWN0aW9uVHlwZXMoKTogQXJyYXk8YW55PiB7XHJcblx0XHRyZXR1cm4gW1Nob3dDYXJkQWN0aW9uXTtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRIb3N0Q29uZmlnOiBIb3N0Q29uZmlnLkhvc3RDb25maWcgPSBuZXcgSG9zdENvbmZpZy5Ib3N0Q29uZmlnKFxyXG5cdHtcclxuXHRcdHN1cHBvcnRzSW50ZXJhY3Rpdml0eTogdHJ1ZSxcclxuXHRcdGZvbnRGYW1pbHk6IFwiU2Vnb2UgVUlcIixcclxuXHRcdHNwYWNpbmc6IHtcclxuXHRcdFx0c21hbGw6IDEwLFxyXG5cdFx0XHRkZWZhdWx0OiAyMCxcclxuXHRcdFx0bWVkaXVtOiAzMCxcclxuXHRcdFx0bGFyZ2U6IDQwLFxyXG5cdFx0XHRleHRyYUxhcmdlOiA1MCxcclxuXHRcdFx0cGFkZGluZzogMjBcclxuXHRcdH0sXHJcblx0XHRzZXBhcmF0b3I6IHtcclxuXHRcdFx0bGluZVRoaWNrbmVzczogMSxcclxuXHRcdFx0bGluZUNvbG9yOiBcIiNFRUVFRUVcIlxyXG5cdFx0fSxcclxuXHRcdGZvbnRTaXplczoge1xyXG5cdFx0XHRzbWFsbDogMTIsXHJcblx0XHRcdGRlZmF1bHQ6IDE0LFxyXG5cdFx0XHRtZWRpdW06IDE3LFxyXG5cdFx0XHRsYXJnZTogMjEsXHJcblx0XHRcdGV4dHJhTGFyZ2U6IDI2XHJcblx0XHR9LFxyXG5cdFx0Zm9udFdlaWdodHM6IHtcclxuXHRcdFx0bGlnaHRlcjogMjAwLFxyXG5cdFx0XHRkZWZhdWx0OiA0MDAsXHJcblx0XHRcdGJvbGRlcjogNjAwXHJcblx0XHR9LFxyXG5cdFx0aW1hZ2VTaXplczoge1xyXG5cdFx0XHRzbWFsbDogNDAsXHJcblx0XHRcdG1lZGl1bTogODAsXHJcblx0XHRcdGxhcmdlOiAxNjBcclxuXHRcdH0sXHJcblx0XHRjb250YWluZXJTdHlsZXM6IHtcclxuXHRcdFx0ZGVmYXVsdDoge1xyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjRkZGRkZGXCIsXHJcblx0XHRcdFx0Zm9yZWdyb3VuZENvbG9yczoge1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDoge1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBcIiMzMzMzMzNcIixcclxuXHRcdFx0XHRcdFx0c3VidGxlOiBcIiNFRTMzMzMzM1wiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0ZGFyazoge1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBcIiMwMDAwMDBcIixcclxuXHRcdFx0XHRcdFx0c3VidGxlOiBcIiM2NjAwMDAwMFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0bGlnaHQ6IHtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogXCIjRkZGRkZGXCIsXHJcblx0XHRcdFx0XHRcdHN1YnRsZTogXCIjMzMwMDAwMDBcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGFjY2VudDoge1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBcIiMyRTg5RkNcIixcclxuXHRcdFx0XHRcdFx0c3VidGxlOiBcIiM4ODJFODlGQ1wiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0YXR0ZW50aW9uOiB7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IFwiI2NjMzMwMFwiLFxyXG5cdFx0XHRcdFx0XHRzdWJ0bGU6IFwiI0REY2MzMzAwXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRnb29kOiB7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IFwiIzU0YTI1NFwiLFxyXG5cdFx0XHRcdFx0XHRzdWJ0bGU6IFwiI0RENTRhMjU0XCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR3YXJuaW5nOiB7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IFwiI2U2OTUwMFwiLFxyXG5cdFx0XHRcdFx0XHRzdWJ0bGU6IFwiI0REZTY5NTAwXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGVtcGhhc2lzOiB7XHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMwODAwMDAwMFwiLFxyXG5cdFx0XHRcdGZvcmVncm91bmRDb2xvcnM6IHtcclxuXHRcdFx0XHRcdGRlZmF1bHQ6IHtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogXCIjMzMzMzMzXCIsXHJcblx0XHRcdFx0XHRcdHN1YnRsZTogXCIjRUUzMzMzMzNcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGRhcms6IHtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogXCIjMDAwMDAwXCIsXHJcblx0XHRcdFx0XHRcdHN1YnRsZTogXCIjNjYwMDAwMDBcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGxpZ2h0OiB7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6IFwiI0ZGRkZGRlwiLFxyXG5cdFx0XHRcdFx0XHRzdWJ0bGU6IFwiIzMzMDAwMDAwXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRhY2NlbnQ6IHtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDogXCIjMkU4OUZDXCIsXHJcblx0XHRcdFx0XHRcdHN1YnRsZTogXCIjODgyRTg5RkNcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGF0dGVudGlvbjoge1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBcIiNjYzMzMDBcIixcclxuXHRcdFx0XHRcdFx0c3VidGxlOiBcIiNERGNjMzMwMFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Z29vZDoge1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBcIiM1NGEyNTRcIixcclxuXHRcdFx0XHRcdFx0c3VidGxlOiBcIiNERDU0YTI1NFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0d2FybmluZzoge1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OiBcIiNlNjk1MDBcIixcclxuXHRcdFx0XHRcdFx0c3VidGxlOiBcIiNERGU2OTUwMFwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0YWN0aW9uczoge1xyXG5cdFx0XHRtYXhBY3Rpb25zOiA1LFxyXG5cdFx0XHRzcGFjaW5nOiBFbnVtcy5TcGFjaW5nLkRlZmF1bHQsXHJcblx0XHRcdGJ1dHRvblNwYWNpbmc6IDEwLFxyXG5cdFx0XHRzaG93Q2FyZDoge1xyXG5cdFx0XHRcdGFjdGlvbk1vZGU6IEVudW1zLlNob3dDYXJkQWN0aW9uTW9kZS5JbmxpbmUsXHJcblx0XHRcdFx0aW5saW5lVG9wTWFyZ2luOiAxNlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRhY3Rpb25zT3JpZW50YXRpb246IEVudW1zLk9yaWVudGF0aW9uLkhvcml6b250YWwsXHJcblx0XHRcdGFjdGlvbkFsaWdubWVudDogRW51bXMuQWN0aW9uQWxpZ25tZW50LkxlZnRcclxuXHRcdH0sXHJcblx0XHRhZGFwdGl2ZUNhcmQ6IHtcclxuXHRcdFx0YWxsb3dDdXN0b21TdHlsZTogZmFsc2VcclxuXHRcdH0sXHJcblx0XHRpbWFnZVNldDoge1xyXG5cdFx0XHRpbWFnZVNpemU6IEVudW1zLlNpemUuTWVkaXVtLFxyXG5cdFx0XHRtYXhJbWFnZUhlaWdodDogMTAwXHJcblx0XHR9LFxyXG5cdFx0ZmFjdFNldDoge1xyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGNvbG9yOiBFbnVtcy5UZXh0Q29sb3IuRGVmYXVsdCxcclxuXHRcdFx0XHRzaXplOiBFbnVtcy5UZXh0U2l6ZS5EZWZhdWx0LFxyXG5cdFx0XHRcdGlzU3VidGxlOiBmYWxzZSxcclxuXHRcdFx0XHR3ZWlnaHQ6IEVudW1zLlRleHRXZWlnaHQuQm9sZGVyLFxyXG5cdFx0XHRcdHdyYXA6IHRydWUsXHJcblx0XHRcdFx0bWF4V2lkdGg6IDE1MCxcclxuXHRcdFx0fSxcclxuXHRcdFx0dmFsdWU6IHtcclxuXHRcdFx0XHRjb2xvcjogRW51bXMuVGV4dENvbG9yLkRlZmF1bHQsXHJcblx0XHRcdFx0c2l6ZTogRW51bXMuVGV4dFNpemUuRGVmYXVsdCxcclxuXHRcdFx0XHRpc1N1YnRsZTogZmFsc2UsXHJcblx0XHRcdFx0d2VpZ2h0OiBFbnVtcy5UZXh0V2VpZ2h0LkRlZmF1bHQsXHJcblx0XHRcdFx0d3JhcDogdHJ1ZSxcclxuXHRcdFx0fSxcclxuXHRcdFx0c3BhY2luZzogMTBcclxuXHRcdH1cclxuXHR9KTtcclxuIiwiZXhwb3J0IGVudW0gU2l6ZSB7XHJcbiAgICBBdXRvLFxyXG4gICAgU3RyZXRjaCxcclxuICAgIFNtYWxsLFxyXG4gICAgTWVkaXVtLFxyXG4gICAgTGFyZ2VcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU2l6ZVVuaXQge1xyXG4gICAgV2VpZ2h0LFxyXG4gICAgUGl4ZWxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVGV4dFNpemUge1xyXG4gICAgU21hbGwsXHJcbiAgICBEZWZhdWx0LFxyXG4gICAgTWVkaXVtLFxyXG4gICAgTGFyZ2UsXHJcbiAgICBFeHRyYUxhcmdlXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNwYWNpbmcge1xyXG4gICAgTm9uZSxcclxuICAgIFNtYWxsLFxyXG4gICAgRGVmYXVsdCxcclxuICAgIE1lZGl1bSxcclxuICAgIExhcmdlLFxyXG4gICAgRXh0cmFMYXJnZSxcclxuICAgIFBhZGRpbmdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVGV4dFdlaWdodCB7XHJcbiAgICBMaWdodGVyLFxyXG4gICAgRGVmYXVsdCxcclxuICAgIEJvbGRlclxyXG59XHJcblxyXG5leHBvcnQgZW51bSBUZXh0Q29sb3Ige1xyXG4gICAgRGVmYXVsdCxcclxuICAgIERhcmssXHJcbiAgICBMaWdodCxcclxuICAgIEFjY2VudCxcclxuICAgIEdvb2QsXHJcbiAgICBXYXJuaW5nLFxyXG4gICAgQXR0ZW50aW9uXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEhvcml6b250YWxBbGlnbm1lbnQge1xyXG4gICAgTGVmdCxcclxuICAgIENlbnRlcixcclxuICAgIFJpZ2h0XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFZlcnRpY2FsQWxpZ25tZW50IHtcclxuICAgIFRvcCxcclxuICAgIENlbnRlcixcclxuICAgIEJvdHRvbVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBBY3Rpb25BbGlnbm1lbnQge1xyXG4gICAgTGVmdCxcclxuICAgIENlbnRlcixcclxuICAgIFJpZ2h0LFxyXG4gICAgU3RyZXRjaFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBJbWFnZVN0eWxlIHtcclxuICAgIERlZmF1bHQsXHJcbiAgICBQZXJzb25cclxufVxyXG5cclxuZXhwb3J0IGVudW0gU2hvd0NhcmRBY3Rpb25Nb2RlIHtcclxuICAgIElubGluZSxcclxuICAgIFBvcHVwXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE9yaWVudGF0aW9uIHtcclxuICAgIEhvcml6b250YWwsXHJcbiAgICBWZXJ0aWNhbFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBCYWNrZ3JvdW5kSW1hZ2VNb2RlIHtcclxuICAgIFN0cmV0Y2gsXHJcbiAgICBSZXBlYXRIb3Jpem9udGFsbHksXHJcbiAgICBSZXBlYXRWZXJ0aWNhbGx5LFxyXG4gICAgUmVwZWF0XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEFjdGlvbkljb25QbGFjZW1lbnQge1xyXG4gICAgTGVmdE9mVGl0bGUsXHJcbiAgICBBYm92ZVRpdGxlXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIElucHV0VGV4dFN0eWxlIHtcclxuICAgIFRleHQsXHJcbiAgICBUZWwsXHJcbiAgICBVcmwsXHJcbiAgICBFbWFpbFxyXG59XHJcblxyXG4vKlxyXG4gICAgVGhpcyBzaG91bGQgcmVhbGx5IGJlIGEgc3RyaW5nIGVudW0sIGUuZy5cclxuXHJcbiAgICAgICAgZXhwb3J0IGVudW0gQ29udGFpbmVyU3R5bGUge1xyXG4gICAgICAgICAgICBEZWZhdWx0ID0gXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgICAgIEVtcGhhc2lzID0gXCJlbXBoYXNpc1wiXHJcbiAgICAgICAgfVxyXG5cclxuICAgIEhvd2V2ZXIsIHNvbWUgaG9zdHMgZG8gbm90IHVzZSBhIHZlcnNpb24gb2YgVHlwZVNjcmlwdFxyXG4gICAgcmVjZW50IGVub3VnaCB0byB1bmRlcnN0YW5kIHN0cmluZyBlbnVtcy4gVGhpcyBpc1xyXG4gICAgYSBjb21wYXRpYmxlIGNvbnN0cnVjdCB0aGF0IGRvZXMgbm90IHJlcXVpcmUgdXNpbmdcclxuICAgIGEgbW9yZSByZWNlbnQgdmVyc2lvbiBvZiBUeXBlU2NyaXB0LlxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyU3R5bGUge1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IERlZmF1bHQgPSBcImRlZmF1bHRcIjtcclxuICAgIHN0YXRpYyByZWFkb25seSBFbXBoYXNpcyA9IFwiZW1waGFzaXNcIjtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmFsaWRhdGlvbkVycm9yIHtcclxuICAgIEhpbnQsXHJcbiAgICBBY3Rpb25UeXBlTm90QWxsb3dlZCxcclxuICAgIENvbGxlY3Rpb25DYW50QmVFbXB0eSxcclxuICAgIERlcHJlY2F0ZWQsXHJcbiAgICBFbGVtZW50VHlwZU5vdEFsbG93ZWQsXHJcbiAgICBJbnRlcmFjdGl2aXR5Tm90QWxsb3dlZCxcclxuICAgIEludmFsaWRQcm9wZXJ0eVZhbHVlLFxyXG4gICAgTWlzc2luZ0NhcmRUeXBlLFxyXG4gICAgUHJvcGVydHlDYW50QmVOdWxsLFxyXG4gICAgVG9vTWFueUFjdGlvbnMsXHJcbiAgICBVbmtub3duQWN0aW9uVHlwZSxcclxuICAgIFVua25vd25FbGVtZW50VHlwZSxcclxuICAgIFVuc3VwcG9ydGVkQ2FyZFZlcnNpb25cclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ29udGFpbmVyRml0U3RhdHVzIHtcclxuICAgIEZ1bGx5SW5Db250YWluZXIsXHJcbiAgICBPdmVyZmxvd2luZyxcclxuICAgIEZ1bGx5T3V0T2ZDb250YWluZXJcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbnVtcyBmcm9tIFwiLi9lbnVtc1wiO1xyXG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbkVycm9yIHtcclxuICAgIGVycm9yOiBFbnVtcy5WYWxpZGF0aW9uRXJyb3IsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0Q29sb3JEZWZpbml0aW9uIHtcclxuICAgIGRlZmF1bHQ6IHN0cmluZyA9IFwiIzAwMDAwMFwiO1xyXG4gICAgc3VidGxlOiBzdHJpbmcgPSBcIiM2NjY2NjZcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmo/OiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdCA9IG9ialtcImRlZmF1bHRcIl0gfHwgdGhpcy5kZWZhdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnN1YnRsZSA9IG9ialtcInN1YnRsZVwiXSB8fCB0aGlzLnN1YnRsZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBZGFwdGl2ZUNhcmRDb25maWcge1xyXG4gICAgYWxsb3dDdXN0b21TdHlsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9iaj86IGFueSkge1xyXG4gICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgdGhpcy5hbGxvd0N1c3RvbVN0eWxlID0gb2JqW1wiYWxsb3dDdXN0b21TdHlsZVwiXSB8fCB0aGlzLmFsbG93Q3VzdG9tU3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VTZXRDb25maWcge1xyXG4gICAgaW1hZ2VTaXplOiBFbnVtcy5TaXplID0gRW51bXMuU2l6ZS5NZWRpdW07XHJcbiAgICBtYXhJbWFnZUhlaWdodDogbnVtYmVyID0gMTAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9iaj86IGFueSkge1xyXG4gICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZVNpemUgPSBvYmpbXCJpbWFnZVNpemVcIl0gIT0gbnVsbCA/IG9ialtcImltYWdlU2l6ZVwiXSA6IHRoaXMuaW1hZ2VTaXplO1xyXG4gICAgICAgICAgICB0aGlzLm1heEltYWdlSGVpZ2h0ID0gVXRpbHMuZ2V0VmFsdWVPckRlZmF1bHQ8bnVtYmVyPihvYmpbXCJtYXhJbWFnZUhlaWdodFwiXSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9KU09OKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGltYWdlU2l6ZTogRW51bXMuU2l6ZVt0aGlzLmltYWdlU2l6ZV0sXHJcbiAgICAgICAgICAgIG1heEltYWdlSGVpZ2h0OiB0aGlzLm1heEltYWdlSGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWVkaWFDb25maWcge1xyXG4gICAgZGVmYXVsdFBvc3Rlcjogc3RyaW5nO1xyXG4gICAgYWxsb3dJbmxpbmVQbGF5YmFjazogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob2JqPzogYW55KSB7XHJcbiAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRQb3N0ZXIgPSBvYmpbXCJkZWZhdWx0UG9zdGVyXCJdO1xyXG4gICAgICAgICAgICB0aGlzLmFsbG93SW5saW5lUGxheWJhY2sgPSBvYmpbXCJhbGxvd0lubGluZVBsYXliYWNrXCJdIHx8IHRoaXMuYWxsb3dJbmxpbmVQbGF5YmFjaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9KU09OKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRQb3N0ZXI6IHRoaXMuZGVmYXVsdFBvc3RlcixcclxuICAgICAgICAgICAgYWxsb3dJbmxpbmVQbGF5YmFjazogdGhpcy5hbGxvd0lubGluZVBsYXliYWNrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjdFRleHREZWZpbml0aW9uIHtcclxuICAgIHNpemU6IEVudW1zLlRleHRTaXplID0gRW51bXMuVGV4dFNpemUuRGVmYXVsdDtcclxuICAgIGNvbG9yOiBFbnVtcy5UZXh0Q29sb3IgPSBFbnVtcy5UZXh0Q29sb3IuRGVmYXVsdDs7XHJcbiAgICBpc1N1YnRsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgd2VpZ2h0OiBFbnVtcy5UZXh0V2VpZ2h0ID0gRW51bXMuVGV4dFdlaWdodC5EZWZhdWx0O1xyXG4gICAgd3JhcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob2JqPzogYW55KSB7XHJcbiAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICB0aGlzLnNpemUgPSBVdGlscy5wYXJzZUhvc3RDb25maWdFbnVtKEVudW1zLlRleHRTaXplLCBvYmpbXCJzaXplXCJdLCBFbnVtcy5UZXh0U2l6ZS5EZWZhdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5jb2xvciA9IFV0aWxzLnBhcnNlSG9zdENvbmZpZ0VudW0oRW51bXMuVGV4dENvbG9yLCBvYmpbXCJjb2xvclwiXSwgRW51bXMuVGV4dENvbG9yLkRlZmF1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLmlzU3VidGxlID0gb2JqW1wiaXNTdWJ0bGVcIl0gfHwgdGhpcy5pc1N1YnRsZTtcclxuICAgICAgICAgICAgdGhpcy53ZWlnaHQgPSBVdGlscy5wYXJzZUhvc3RDb25maWdFbnVtKEVudW1zLlRleHRXZWlnaHQsIG9ialtcIndlaWdodFwiXSwgdGhpcy5nZXREZWZhdWx0V2VpZ2h0KCkpO1xyXG4gICAgICAgICAgICB0aGlzLndyYXAgPSBvYmpbXCJ3cmFwXCJdICE9IG51bGwgPyBvYmpbXCJ3cmFwXCJdIDogdGhpcy53cmFwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXREZWZhdWx0V2VpZ2h0KCkge1xyXG5cdFx0cmV0dXJuIEVudW1zLlRleHRXZWlnaHQuRGVmYXVsdDtcclxuICAgIH1cclxuXHJcbiAgICB0b0pTT04oKTogYW55IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzaXplOiBFbnVtcy5UZXh0U2l6ZVt0aGlzLnNpemVdLFxyXG4gICAgICAgICAgICBjb2xvcjogRW51bXMuVGV4dENvbG9yW3RoaXMuY29sb3JdLFxyXG4gICAgICAgICAgICBpc1N1YnRsZTogdGhpcy5pc1N1YnRsZSxcclxuICAgICAgICAgICAgd2VpZ2h0OiBFbnVtcy5UZXh0V2VpZ2h0W3RoaXMud2VpZ2h0XSxcclxuICAgICAgICAgICAgd3JhcDogdGhpcy53cmFwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjdFRpdGxlRGVmaW5pdGlvbiBleHRlbmRzIEZhY3RUZXh0RGVmaW5pdGlvbiB7XHJcbiAgICBtYXhXaWR0aD86IG51bWJlciA9IDE1MDtcclxuICAgIHdlaWdodDogRW51bXMuVGV4dFdlaWdodCA9IEVudW1zLlRleHRXZWlnaHQuQm9sZGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9iaj86IGFueSkge1xyXG4gICAgICAgIHN1cGVyKG9iaik7XHJcblxyXG4gICAgICAgIGlmIChvYmopIHtcclxuICAgICAgICAgICAgdGhpcy5tYXhXaWR0aCA9IG9ialtcIm1heFdpZHRoXCJdICE9IG51bGwgPyBvYmpbXCJtYXhXaWR0aFwiXSA6IHRoaXMubWF4V2lkdGg7XHJcblx0XHRcdHRoaXMud2VpZ2h0ID0gVXRpbHMucGFyc2VIb3N0Q29uZmlnRW51bShFbnVtcy5UZXh0V2VpZ2h0LCBvYmpbXCJ3ZWlnaHRcIl0sIEVudW1zLlRleHRXZWlnaHQuQm9sZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVmYXVsdFdlaWdodCgpIHtcclxuICAgICAgICByZXR1cm4gRW51bXMuVGV4dFdlaWdodC5Cb2xkZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGYWN0U2V0Q29uZmlnIHtcclxuICAgIHJlYWRvbmx5IHRpdGxlOiBGYWN0VGl0bGVEZWZpbml0aW9uID0gbmV3IEZhY3RUaXRsZURlZmluaXRpb24oKTtcclxuICAgIHJlYWRvbmx5IHZhbHVlOiBGYWN0VGV4dERlZmluaXRpb24gPSBuZXcgRmFjdFRleHREZWZpbml0aW9uKCk7XHJcbiAgICBzcGFjaW5nOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmo/OiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBuZXcgRmFjdFRpdGxlRGVmaW5pdGlvbihvYmpbXCJ0aXRsZVwiXSk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBuZXcgRmFjdFRleHREZWZpbml0aW9uKG9ialtcInZhbHVlXCJdKTtcclxuICAgICAgICAgICAgdGhpcy5zcGFjaW5nID0gb2JqLnNwYWNpbmcgJiYgb2JqLnNwYWNpbmcgIT0gbnVsbCA/IG9iai5zcGFjaW5nICYmIG9iai5zcGFjaW5nIDogdGhpcy5zcGFjaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3dDYXJkQWN0aW9uQ29uZmlnIHtcclxuICAgIGFjdGlvbk1vZGU6IEVudW1zLlNob3dDYXJkQWN0aW9uTW9kZSA9IEVudW1zLlNob3dDYXJkQWN0aW9uTW9kZS5JbmxpbmU7XHJcbiAgICBpbmxpbmVUb3BNYXJnaW46IG51bWJlciA9IDE2O1xyXG4gICAgc3R5bGU/OiBzdHJpbmcgPSBFbnVtcy5Db250YWluZXJTdHlsZS5FbXBoYXNpcztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmo/OiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uTW9kZSA9IFV0aWxzLnBhcnNlSG9zdENvbmZpZ0VudW0oRW51bXMuU2hvd0NhcmRBY3Rpb25Nb2RlLCBvYmpbXCJhY3Rpb25Nb2RlXCJdLCBFbnVtcy5TaG93Q2FyZEFjdGlvbk1vZGUuSW5saW5lKTtcclxuICAgICAgICAgICAgdGhpcy5pbmxpbmVUb3BNYXJnaW4gPSBvYmpbXCJpbmxpbmVUb3BNYXJnaW5cIl0gIT0gbnVsbCA/IG9ialtcImlubGluZVRvcE1hcmdpblwiXSA6IHRoaXMuaW5saW5lVG9wTWFyZ2luO1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb2JqW1wic3R5bGVcIl0gJiYgdHlwZW9mIG9ialtcInN0eWxlXCJdID09PSBcInN0cmluZ1wiID8gb2JqW1wic3R5bGVcIl0gOiBFbnVtcy5Db250YWluZXJTdHlsZS5FbXBoYXNpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9KU09OKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFjdGlvbk1vZGU6IEVudW1zLlNob3dDYXJkQWN0aW9uTW9kZVt0aGlzLmFjdGlvbk1vZGVdLFxyXG4gICAgICAgICAgICBpbmxpbmVUb3BNYXJnaW46IHRoaXMuaW5saW5lVG9wTWFyZ2luLFxyXG4gICAgICAgICAgICBzdHlsZTogdGhpcy5zdHlsZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjdGlvbnNDb25maWcge1xyXG4gICAgbWF4QWN0aW9uczogbnVtYmVyID0gNTtcclxuICAgIHNwYWNpbmc6IEVudW1zLlNwYWNpbmcgPSBFbnVtcy5TcGFjaW5nLkRlZmF1bHQ7XHJcbiAgICBidXR0b25TcGFjaW5nOiBudW1iZXIgPSAyMDtcclxuICAgIHJlYWRvbmx5IHNob3dDYXJkOiBTaG93Q2FyZEFjdGlvbkNvbmZpZyA9IG5ldyBTaG93Q2FyZEFjdGlvbkNvbmZpZygpO1xyXG4gICAgcHJlRXhwYW5kU2luZ2xlU2hvd0NhcmRBY3Rpb24/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBhY3Rpb25zT3JpZW50YXRpb246IEVudW1zLk9yaWVudGF0aW9uID0gRW51bXMuT3JpZW50YXRpb24uSG9yaXpvbnRhbDtcclxuICAgIGFjdGlvbkFsaWdubWVudDogRW51bXMuQWN0aW9uQWxpZ25tZW50ID0gRW51bXMuQWN0aW9uQWxpZ25tZW50LkxlZnQ7XHJcbiAgICBpY29uUGxhY2VtZW50OiBFbnVtcy5BY3Rpb25JY29uUGxhY2VtZW50ID0gRW51bXMuQWN0aW9uSWNvblBsYWNlbWVudC5MZWZ0T2ZUaXRsZTtcclxuICAgIGFsbG93VGl0bGVUb1dyYXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGljb25TaXplOiBudW1iZXIgPSAyNDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmo/OiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF4QWN0aW9ucyA9IG9ialtcIm1heEFjdGlvbnNcIl0gIT0gbnVsbCA/IG9ialtcIm1heEFjdGlvbnNcIl0gOiB0aGlzLm1heEFjdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuc3BhY2luZyA9IFV0aWxzLnBhcnNlSG9zdENvbmZpZ0VudW0oRW51bXMuU3BhY2luZywgb2JqLnNwYWNpbmcgJiYgb2JqLnNwYWNpbmcsIEVudW1zLlNwYWNpbmcuRGVmYXVsdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uU3BhY2luZyA9IG9ialtcImJ1dHRvblNwYWNpbmdcIl0gIT0gbnVsbCA/IG9ialtcImJ1dHRvblNwYWNpbmdcIl0gOiB0aGlzLmJ1dHRvblNwYWNpbmc7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NhcmQgPSBuZXcgU2hvd0NhcmRBY3Rpb25Db25maWcob2JqW1wic2hvd0NhcmRcIl0pO1xyXG4gICAgICAgICAgICB0aGlzLnByZUV4cGFuZFNpbmdsZVNob3dDYXJkQWN0aW9uID0gVXRpbHMuZ2V0VmFsdWVPckRlZmF1bHQ8Ym9vbGVhbj4ob2JqW1wicHJlRXhwYW5kU2luZ2xlU2hvd0NhcmRBY3Rpb25cIl0sIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zT3JpZW50YXRpb24gPSBVdGlscy5wYXJzZUhvc3RDb25maWdFbnVtKEVudW1zLk9yaWVudGF0aW9uLCBvYmpbXCJhY3Rpb25zT3JpZW50YXRpb25cIl0sIEVudW1zLk9yaWVudGF0aW9uLkhvcml6b250YWwpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbkFsaWdubWVudCA9IFV0aWxzLnBhcnNlSG9zdENvbmZpZ0VudW0oRW51bXMuQWN0aW9uQWxpZ25tZW50LCBvYmpbXCJhY3Rpb25BbGlnbm1lbnRcIl0sIEVudW1zLkFjdGlvbkFsaWdubWVudC5MZWZ0KTtcclxuICAgICAgICAgICAgdGhpcy5pY29uUGxhY2VtZW50ID0gVXRpbHMucGFyc2VIb3N0Q29uZmlnRW51bShFbnVtcy5BY3Rpb25JY29uUGxhY2VtZW50LCBvYmpbXCJpY29uUGxhY2VtZW50XCJdLCBFbnVtcy5BY3Rpb25JY29uUGxhY2VtZW50LkxlZnRPZlRpdGxlKTtcclxuICAgICAgICAgICAgdGhpcy5hbGxvd1RpdGxlVG9XcmFwID0gb2JqW1wiYWxsb3dUaXRsZVRvV3JhcFwiXSAhPSBudWxsID8gb2JqW1wiYWxsb3dUaXRsZVRvV3JhcFwiXSA6IHRoaXMuYWxsb3dUaXRsZVRvV3JhcDtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZUFuZFVuaXQgPSBVdGlscy5TaXplQW5kVW5pdC5wYXJzZShvYmpbXCJpY29uU2l6ZVwiXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNpemVBbmRVbml0LnVuaXQgPT0gRW51bXMuU2l6ZVVuaXQuUGl4ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmljb25TaXplID0gc2l6ZUFuZFVuaXQucGh5c2ljYWxTaXplO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTd2FsbG93IHRoaXMsIGtlZXAgZGVmYXVsdCBpY29uIHNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b0pTT04oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWF4QWN0aW9uczogdGhpcy5tYXhBY3Rpb25zLFxyXG4gICAgICAgICAgICBzcGFjaW5nOiBFbnVtcy5TcGFjaW5nW3RoaXMuc3BhY2luZ10sXHJcbiAgICAgICAgICAgIGJ1dHRvblNwYWNpbmc6IHRoaXMuYnV0dG9uU3BhY2luZyxcclxuICAgICAgICAgICAgc2hvd0NhcmQ6IHRoaXMuc2hvd0NhcmQsXHJcbiAgICAgICAgICAgIHByZUV4cGFuZFNpbmdsZVNob3dDYXJkQWN0aW9uOiB0aGlzLnByZUV4cGFuZFNpbmdsZVNob3dDYXJkQWN0aW9uLFxyXG4gICAgICAgICAgICBhY3Rpb25zT3JpZW50YXRpb246IEVudW1zLk9yaWVudGF0aW9uW3RoaXMuYWN0aW9uc09yaWVudGF0aW9uXSxcclxuICAgICAgICAgICAgYWN0aW9uQWxpZ25tZW50OiBFbnVtcy5BY3Rpb25BbGlnbm1lbnRbdGhpcy5hY3Rpb25BbGlnbm1lbnRdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyU3R5bGVEZWZpbml0aW9uIHtcclxuICAgIHByaXZhdGUgZ2V0VGV4dENvbG9yRGVmaW5pdGlvbk9yRGVmYXVsdChvYmo6IGFueSwgZGVmYXVsdFZhbHVlOiB7IGRlZmF1bHQ6IHN0cmluZywgc3VidGxlOiBzdHJpbmcgfSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dENvbG9yRGVmaW5pdGlvbihvYmogPyBvYmogOiBkZWZhdWx0VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcclxuXHJcbiAgICByZWFkb25seSBmb3JlZ3JvdW5kQ29sb3JzID0ge1xyXG4gICAgICAgIGRlZmF1bHQ6IG5ldyBUZXh0Q29sb3JEZWZpbml0aW9uKCksXHJcbiAgICAgICAgZGFyazogbmV3IFRleHRDb2xvckRlZmluaXRpb24oKSxcclxuICAgICAgICBsaWdodDogbmV3IFRleHRDb2xvckRlZmluaXRpb24oKSxcclxuICAgICAgICBhY2NlbnQ6IG5ldyBUZXh0Q29sb3JEZWZpbml0aW9uKCksXHJcbiAgICAgICAgZ29vZDogbmV3IFRleHRDb2xvckRlZmluaXRpb24oKSxcclxuICAgICAgICB3YXJuaW5nOiBuZXcgVGV4dENvbG9yRGVmaW5pdGlvbigpLFxyXG4gICAgICAgIGF0dGVudGlvbjogbmV3IFRleHRDb2xvckRlZmluaXRpb24oKVxyXG4gICAgfTtcclxuXHJcbiAgICBoaWdobGlnaHRCYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XHJcbiAgICBoaWdobGlnaHRGb3JlZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XHJcblxyXG4gICAgcGFyc2Uob2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gb2JqW1wiYmFja2dyb3VuZENvbG9yXCJdO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iai5mb3JlZ3JvdW5kQ29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVncm91bmRDb2xvcnMuZGVmYXVsdCA9IHRoaXMuZ2V0VGV4dENvbG9yRGVmaW5pdGlvbk9yRGVmYXVsdChvYmouZm9yZWdyb3VuZENvbG9yc1tcImRlZmF1bHRcIl0sIHsgZGVmYXVsdDogXCIjMzMzMzMzXCIsIHN1YnRsZTogXCIjRUUzMzMzMzNcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yZWdyb3VuZENvbG9ycy5kYXJrID0gdGhpcy5nZXRUZXh0Q29sb3JEZWZpbml0aW9uT3JEZWZhdWx0KG9iai5mb3JlZ3JvdW5kQ29sb3JzW1wiZGFya1wiXSwgeyBkZWZhdWx0OiBcIiMwMDAwMDBcIiwgc3VidGxlOiBcIiM2NjAwMDAwMFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JlZ3JvdW5kQ29sb3JzLmxpZ2h0ID0gdGhpcy5nZXRUZXh0Q29sb3JEZWZpbml0aW9uT3JEZWZhdWx0KG9iai5mb3JlZ3JvdW5kQ29sb3JzW1wibGlnaHRcIl0sIHsgZGVmYXVsdDogXCIjRkZGRkZGXCIsIHN1YnRsZTogXCIjMzMwMDAwMDBcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yZWdyb3VuZENvbG9ycy5hY2NlbnQgPSB0aGlzLmdldFRleHRDb2xvckRlZmluaXRpb25PckRlZmF1bHQob2JqLmZvcmVncm91bmRDb2xvcnNbXCJhY2NlbnRcIl0sIHsgZGVmYXVsdDogXCIjMkU4OUZDXCIsIHN1YnRsZTogXCIjODgyRTg5RkNcIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yZWdyb3VuZENvbG9ycy5nb29kID0gdGhpcy5nZXRUZXh0Q29sb3JEZWZpbml0aW9uT3JEZWZhdWx0KG9iai5mb3JlZ3JvdW5kQ29sb3JzW1wiZ29vZFwiXSwgeyBkZWZhdWx0OiBcIiM1NEEyNTRcIiwgc3VidGxlOiBcIiNERDU0QTI1NFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JlZ3JvdW5kQ29sb3JzLndhcm5pbmcgPSB0aGlzLmdldFRleHRDb2xvckRlZmluaXRpb25PckRlZmF1bHQob2JqLmZvcmVncm91bmRDb2xvcnNbXCJ3YXJuaW5nXCJdLCB7IGRlZmF1bHQ6IFwiI0U2OTUwMFwiLCBzdWJ0bGU6IFwiI0RERTY5NTAwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcmVncm91bmRDb2xvcnMuYXR0ZW50aW9uID0gdGhpcy5nZXRUZXh0Q29sb3JEZWZpbml0aW9uT3JEZWZhdWx0KG9iai5mb3JlZ3JvdW5kQ29sb3JzW1wiYXR0ZW50aW9uXCJdLCB7IGRlZmF1bHQ6IFwiI0NDMzMwMFwiLCBzdWJ0bGU6IFwiI0REQ0MzMzAwXCIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0QmFja2dyb3VuZENvbG9yID0gb2JqW1wiaGlnaGxpZ2h0QmFja2dyb3VuZENvbG9yXCJdO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodEZvcmVncm91bmRDb2xvciA9IG9ialtcImhpZ2hsaWdodEZvcmVncm91bmRDb2xvclwiXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iob2JqPzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5wYXJzZShvYmopO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0J1aWx0SW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCdWlsdEluQ29udGFpbmVyU3R5bGVEZWZpbml0aW9uIGV4dGVuZHMgQ29udGFpbmVyU3R5bGVEZWZpbml0aW9uIHtcclxuICAgIGdldCBpc0J1aWx0SW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUxpbmVIZWlnaHREZWZpbml0aW9ucyB7XHJcbiAgICBzbWFsbDogbnVtYmVyO1xyXG4gICAgbWVkaXVtOiBudW1iZXI7XHJcbiAgICBkZWZhdWx0OiBudW1iZXI7XHJcbiAgICBsYXJnZTogbnVtYmVyO1xyXG4gICAgZXh0cmFMYXJnZTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udGFpbmVyU3R5bGVTZXQge1xyXG4gICAgcHJpdmF0ZSBfYWxsU3R5bGVzOiBvYmplY3QgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihvYmo/OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9hbGxTdHlsZXNbRW51bXMuQ29udGFpbmVyU3R5bGUuRGVmYXVsdF0gPSBuZXcgQnVpbHRJbkNvbnRhaW5lclN0eWxlRGVmaW5pdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX2FsbFN0eWxlc1tFbnVtcy5Db250YWluZXJTdHlsZS5FbXBoYXNpc10gPSBuZXcgQnVpbHRJbkNvbnRhaW5lclN0eWxlRGVmaW5pdGlvbigpO1xyXG5cclxuICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FsbFN0eWxlc1tFbnVtcy5Db250YWluZXJTdHlsZS5EZWZhdWx0XS5wYXJzZShvYmpbRW51bXMuQ29udGFpbmVyU3R5bGUuRGVmYXVsdF0pO1xyXG4gICAgICAgICAgICB0aGlzLl9hbGxTdHlsZXNbRW51bXMuQ29udGFpbmVyU3R5bGUuRW1waGFzaXNdLnBhcnNlKG9ialtFbnVtcy5Db250YWluZXJTdHlsZS5FbXBoYXNpc10pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tU3R5bGVBcnJheSA9IG9ialtcImN1c3RvbVN0eWxlc1wiXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXN0b21TdHlsZUFycmF5ICYmIEFycmF5LmlzQXJyYXkoY3VzdG9tU3R5bGVBcnJheSkpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGN1c3RvbVN0eWxlIG9mIGN1c3RvbVN0eWxlQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tU3R5bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlTmFtZSA9IGN1c3RvbVN0eWxlW1wibmFtZVwiXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZU5hbWUgJiYgdHlwZW9mIHN0eWxlTmFtZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FsbFN0eWxlcy5oYXNPd25Qcm9wZXJ0eShzdHlsZU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWxsU3R5bGVzW3N0eWxlTmFtZV0ucGFyc2UoY3VzdG9tU3R5bGVbXCJzdHlsZVwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbGxTdHlsZXNbc3R5bGVOYW1lXSA9IG5ldyBDb250YWluZXJTdHlsZURlZmluaXRpb24oY3VzdG9tU3R5bGVbXCJzdHlsZVwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9KU09OKCkge1xyXG4gICAgICAgIHZhciBjdXN0b21TdHlsZUFycmF5OiBBcnJheTxhbnk+ID0gW107XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2FsbFN0eWxlcykuZm9yRWFjaChcclxuICAgICAgICAgICAgKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hbGxTdHlsZXNba2V5XS5pc0J1aWx0SW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21TdHlsZUFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLl9hbGxTdHlsZXNba2V5XVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdDogYW55ID0ge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB0aGlzLmRlZmF1bHQsXHJcbiAgICAgICAgICAgIGVtcGhhc2lzOiB0aGlzLmVtcGhhc2lzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VzdG9tU3R5bGVBcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5jdXN0b21TdHlsZXMgPSBjdXN0b21TdHlsZUFycmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHlsZUJ5TmFtZShuYW1lOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogQ29udGFpbmVyU3R5bGVEZWZpbml0aW9uID0gbnVsbCk6IENvbnRhaW5lclN0eWxlRGVmaW5pdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FsbFN0eWxlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHRoaXMuX2FsbFN0eWxlc1tuYW1lXSA6IGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGVmYXVsdCgpOiBDb250YWluZXJTdHlsZURlZmluaXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbGxTdHlsZXNbRW51bXMuQ29udGFpbmVyU3R5bGUuRGVmYXVsdF07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGVtcGhhc2lzKCk6IENvbnRhaW5lclN0eWxlRGVmaW5pdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FsbFN0eWxlc1tFbnVtcy5Db250YWluZXJTdHlsZS5FbXBoYXNpc107XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBWZXJzaW9uIHtcclxuICAgIHByaXZhdGUgX3ZlcnNpb25TdHJpbmc6IHN0cmluZztcclxuICAgIHByaXZhdGUgX21ham9yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9taW5vcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IobWFqb3I6IG51bWJlciA9IDEsIG1pbm9yOiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgdGhpcy5fbWFqb3IgPSBtYWpvcjtcclxuICAgICAgICB0aGlzLl9taW5vciA9IG1pbm9yO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwYXJzZSh2ZXJzaW9uU3RyaW5nOiBzdHJpbmcsIGVycm9ycz86IEFycmF5PElWYWxpZGF0aW9uRXJyb3I+KTogVmVyc2lvbiB7XHJcbiAgICAgICAgaWYgKCF2ZXJzaW9uU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBWZXJzaW9uKCk7XHJcbiAgICAgICAgcmVzdWx0Ll92ZXJzaW9uU3RyaW5nID0gdmVyc2lvblN0cmluZztcclxuXHJcbiAgICAgICAgdmFyIHJlZ0V4ID0gLyhcXGQrKS4oXFxkKykvZ2k7XHJcbiAgICAgICAgdmFyIG1hdGNoZXMgPSByZWdFeC5leGVjKHZlcnNpb25TdHJpbmcpO1xyXG5cclxuICAgICAgICBpZiAobWF0Y2hlcyAhPSBudWxsICYmIG1hdGNoZXMubGVuZ3RoID09IDMpIHtcclxuICAgICAgICAgICAgcmVzdWx0Ll9tYWpvciA9IHBhcnNlSW50KG1hdGNoZXNbMV0pO1xyXG4gICAgICAgICAgICByZXN1bHQuX21pbm9yID0gcGFyc2VJbnQobWF0Y2hlc1syXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQuX2lzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghcmVzdWx0Ll9pc1ZhbGlkICYmIGVycm9ycykge1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogRW51bXMuVmFsaWRhdGlvbkVycm9yLkludmFsaWRQcm9wZXJ0eVZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW52YWxpZCB2ZXJzaW9uIHN0cmluZzogXCIgKyByZXN1bHQuX3ZlcnNpb25TdHJpbmdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuX2lzVmFsaWQgPyB0aGlzLl92ZXJzaW9uU3RyaW5nIDogdGhpcy5fbWFqb3IgKyBcIi5cIiArIHRoaXMuX21pbm9yO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBhcmVUbyhvdGhlclZlcnNpb246IFZlcnNpb24pOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkIHx8ICFvdGhlclZlcnNpb24uaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29tcGFyZSBpbnZhbGlkIHZlcnNpb24uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWFqb3IgPiBvdGhlclZlcnNpb24ubWFqb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMubWFqb3IgPCBvdGhlclZlcnNpb24ubWFqb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLm1pbm9yID4gb3RoZXJWZXJzaW9uLm1pbm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5taW5vciA8IG90aGVyVmVyc2lvbi5taW5vcikge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWFqb3IoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFqb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pbm9yKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbm9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1ZhbGlkO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBIb3N0Q2FwYWJpbGl0eVZlcnNpb24gPSBWZXJzaW9uIHwgXCIqXCI7XHJcbmV4cG9ydCB0eXBlIEhvc3RDYXBhYmlsaXR5TWFwID0geyBba2V5OiBzdHJpbmddOiBIb3N0Q2FwYWJpbGl0eVZlcnNpb24gfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBIb3N0Q2FwYWJpbGl0aWVzIHtcclxuICAgIHByaXZhdGUgc2V0Q2FwYWJpbGl0eShuYW1lOiBzdHJpbmcsIHZlcnNpb246IEhvc3RDYXBhYmlsaXR5VmVyc2lvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5jYXBhYmlsaXRpZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXBhYmlsaXRpZXMgPSB7IH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhcGFiaWxpdGllc1tuYW1lXSA9IHZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgY2FwYWJpbGl0aWVzOiBIb3N0Q2FwYWJpbGl0eU1hcCA9IG51bGw7XHJcblxyXG4gICAgcGFyc2UoanNvbjogYW55LCBlcnJvcnM/OiBBcnJheTxJVmFsaWRhdGlvbkVycm9yPikge1xyXG4gICAgICAgIGlmIChqc29uKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5hbWUgaW4ganNvbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25WZXJzaW9uID0ganNvbltuYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGpzb25WZXJzaW9uID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb25WZXJzaW9uID09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2FwYWJpbGl0eShuYW1lLCBcIipcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmVyc2lvbiA9IFZlcnNpb24ucGFyc2UoanNvblZlcnNpb24sIGVycm9ycyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVyc2lvbi5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENhcGFiaWxpdHkobmFtZSwgdmVyc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFzQ2FwYWJpbGl0eShuYW1lOiBzdHJpbmcsIHZlcnNpb246IEhvc3RDYXBhYmlsaXR5VmVyc2lvbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcGFiaWxpdGllcyAmJiB0aGlzLmNhcGFiaWxpdGllcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICBpZiAodmVyc2lvbiA9PSBcIipcIiB8fCB0aGlzLmNhcGFiaWxpdGllc1tuYW1lXSA9PSBcIipcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uLmNvbXBhcmVUbyg8VmVyc2lvbj50aGlzLmNhcGFiaWxpdGllc1tuYW1lXSkgPD0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBhcmVBbGxNZXQoaG9zdENhcGFiaWxpdGllczogSG9zdENhcGFiaWxpdGllcyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNhcGFiaWxpdGllcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjYXBhYmlsaXR5TmFtZSBpbiB0aGlzLmNhcGFiaWxpdGllcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFob3N0Q2FwYWJpbGl0aWVzLmhhc0NhcGFiaWxpdHkoY2FwYWJpbGl0eU5hbWUsIHRoaXMuY2FwYWJpbGl0aWVzW2NhcGFiaWxpdHlOYW1lXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSG9zdENvbmZpZyB7XHJcbiAgICByZWFkb25seSBob3N0Q2FwYWJpbGl0aWVzID0gbmV3IEhvc3RDYXBhYmlsaXRpZXMoKTtcclxuXHJcbiAgICBjaG9pY2VTZXRJbnB1dFZhbHVlU2VwYXJhdG9yOiBzdHJpbmcgPSBcIixcIjtcclxuICAgIHN1cHBvcnRzSW50ZXJhY3Rpdml0eTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBsaW5lSGVpZ2h0cz86IElMaW5lSGVpZ2h0RGVmaW5pdGlvbnM7XHJcblxyXG4gICAgZm9udEZhbWlseT86IHN0cmluZyA9IFwiU2Vnb2UgVUksU2Vnb2UsU2Vnb2UgV1AsSGVsdmV0aWNhIE5ldWUsSGVsdmV0aWNhLHNhbnMtc2VyaWZcIjtcclxuXHJcbiAgICByZWFkb25seSBzcGFjaW5nID0ge1xyXG4gICAgICAgIHNtYWxsOiAzLFxyXG4gICAgICAgIGRlZmF1bHQ6IDgsXHJcbiAgICAgICAgbWVkaXVtOiAyMCxcclxuICAgICAgICBsYXJnZTogMzAsXHJcbiAgICAgICAgZXh0cmFMYXJnZTogNDAsXHJcbiAgICAgICAgcGFkZGluZzogMTVcclxuICAgIH07XHJcblxyXG4gICAgcmVhZG9ubHkgc2VwYXJhdG9yID0ge1xyXG4gICAgICAgIGxpbmVUaGlja25lc3M6IDEsXHJcbiAgICAgICAgbGluZUNvbG9yOiBcIiNFRUVFRUVcIlxyXG4gICAgfTtcclxuXHJcbiAgICByZWFkb25seSBmb250U2l6ZXMgPSB7XHJcbiAgICAgICAgc21hbGw6IDEyLFxyXG4gICAgICAgIGRlZmF1bHQ6IDE0LFxyXG4gICAgICAgIG1lZGl1bTogMTcsXHJcbiAgICAgICAgbGFyZ2U6IDIxLFxyXG4gICAgICAgIGV4dHJhTGFyZ2U6IDI2XHJcbiAgICB9O1xyXG5cclxuICAgIHJlYWRvbmx5IGZvbnRXZWlnaHRzID0ge1xyXG4gICAgICAgIGxpZ2h0ZXI6IDIwMCxcclxuICAgICAgICBkZWZhdWx0OiA0MDAsXHJcbiAgICAgICAgYm9sZGVyOiA2MDBcclxuICAgIH07XHJcbiAgICByZWFkb25seSBpbWFnZVNpemVzID0ge1xyXG4gICAgICAgIHNtYWxsOiA0MCxcclxuICAgICAgICBtZWRpdW06IDgwLFxyXG4gICAgICAgIGxhcmdlOiAxNjBcclxuICAgIH07XHJcblxyXG4gICAgcmVhZG9ubHkgY29udGFpbmVyU3R5bGVzOiBDb250YWluZXJTdHlsZVNldCA9IG5ldyBDb250YWluZXJTdHlsZVNldCgpO1xyXG4gICAgcmVhZG9ubHkgYWN0aW9uczogQWN0aW9uc0NvbmZpZyA9IG5ldyBBY3Rpb25zQ29uZmlnKCk7XHJcbiAgICByZWFkb25seSBhZGFwdGl2ZUNhcmQ6IEFkYXB0aXZlQ2FyZENvbmZpZyA9IG5ldyBBZGFwdGl2ZUNhcmRDb25maWcoKTtcclxuICAgIHJlYWRvbmx5IGltYWdlU2V0OiBJbWFnZVNldENvbmZpZyA9IG5ldyBJbWFnZVNldENvbmZpZygpO1xyXG4gICAgcmVhZG9ubHkgbWVkaWE6IE1lZGlhQ29uZmlnID0gbmV3IE1lZGlhQ29uZmlnKCk7XHJcbiAgICByZWFkb25seSBmYWN0U2V0OiBGYWN0U2V0Q29uZmlnID0gbmV3IEZhY3RTZXRDb25maWcoKTtcclxuXHJcbiAgICBjc3NDbGFzc05hbWVQcmVmaXg6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3Iob2JqPzogYW55KSB7XHJcbiAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIiB8fCBvYmogaW5zdGFuY2VvZiBTdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IEpTT04ucGFyc2Uob2JqIGFzIHN0cmluZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hvaWNlU2V0SW5wdXRWYWx1ZVNlcGFyYXRvciA9IChvYmogJiYgdHlwZW9mIG9ialtcImNob2ljZVNldElucHV0VmFsdWVTZXBhcmF0b3JcIl0gPT09IFwic3RyaW5nXCIpID8gb2JqW1wiY2hvaWNlU2V0SW5wdXRWYWx1ZVNlcGFyYXRvclwiXSA6IHRoaXMuY2hvaWNlU2V0SW5wdXRWYWx1ZVNlcGFyYXRvcjtcclxuICAgICAgICAgICAgdGhpcy5zdXBwb3J0c0ludGVyYWN0aXZpdHkgPSAob2JqICYmIHR5cGVvZiBvYmpbXCJzdXBwb3J0c0ludGVyYWN0aXZpdHlcIl0gPT09IFwiYm9vbGVhblwiKSA/IG9ialtcInN1cHBvcnRzSW50ZXJhY3Rpdml0eVwiXSA6IHRoaXMuc3VwcG9ydHNJbnRlcmFjdGl2aXR5O1xyXG4gICAgICAgICAgICB0aGlzLmZvbnRGYW1pbHkgPSBvYmpbXCJmb250RmFtaWx5XCJdIHx8IHRoaXMuZm9udEZhbWlseTtcclxuICAgICAgICAgICAgdGhpcy5mb250U2l6ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBzbWFsbDogb2JqLmZvbnRTaXplcyAmJiBvYmouZm9udFNpemVzW1wic21hbGxcIl0gfHwgdGhpcy5mb250U2l6ZXMuc21hbGwsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBvYmouZm9udFNpemVzICYmIG9iai5mb250U2l6ZXNbXCJkZWZhdWx0XCJdIHx8IHRoaXMuZm9udFNpemVzLmRlZmF1bHQsXHJcbiAgICAgICAgICAgICAgICBtZWRpdW06IG9iai5mb250U2l6ZXMgJiYgb2JqLmZvbnRTaXplc1tcIm1lZGl1bVwiXSB8fCB0aGlzLmZvbnRTaXplcy5tZWRpdW0sXHJcbiAgICAgICAgICAgICAgICBsYXJnZTogb2JqLmZvbnRTaXplcyAmJiBvYmouZm9udFNpemVzW1wibGFyZ2VcIl0gfHwgdGhpcy5mb250U2l6ZXMubGFyZ2UsXHJcbiAgICAgICAgICAgICAgICBleHRyYUxhcmdlOiBvYmouZm9udFNpemVzICYmIG9iai5mb250U2l6ZXNbXCJleHRyYUxhcmdlXCJdIHx8IHRoaXMuZm9udFNpemVzLmV4dHJhTGFyZ2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmoubGluZUhlaWdodHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGluZUhlaWdodHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc21hbGw6IG9iai5saW5lSGVpZ2h0c1tcInNtYWxsXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG9iai5saW5lSGVpZ2h0c1tcImRlZmF1bHRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWVkaXVtOiBvYmoubGluZUhlaWdodHNbXCJtZWRpdW1cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGFyZ2U6IG9iai5saW5lSGVpZ2h0c1tcImxhcmdlXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhTGFyZ2U6IG9iai5saW5lSGVpZ2h0c1tcImV4dHJhTGFyZ2VcIl1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZvbnRXZWlnaHRzID0ge1xyXG4gICAgICAgICAgICAgICAgbGlnaHRlcjogb2JqLmZvbnRXZWlnaHRzICYmIG9iai5mb250V2VpZ2h0c1tcImxpZ2h0ZXJcIl0gfHwgdGhpcy5mb250V2VpZ2h0cy5saWdodGVyLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogb2JqLmZvbnRXZWlnaHRzICYmIG9iai5mb250V2VpZ2h0c1tcImRlZmF1bHRcIl0gfHwgdGhpcy5mb250V2VpZ2h0cy5kZWZhdWx0LFxyXG4gICAgICAgICAgICAgICAgYm9sZGVyOiBvYmouZm9udFdlaWdodHMgJiYgb2JqLmZvbnRXZWlnaHRzW1wiYm9sZGVyXCJdIHx8IHRoaXMuZm9udFdlaWdodHMuYm9sZGVyXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmltYWdlU2l6ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBzbWFsbDogb2JqLmltYWdlU2l6ZXMgJiYgb2JqLmltYWdlU2l6ZXNbXCJzbWFsbFwiXSB8fCB0aGlzLmltYWdlU2l6ZXMuc21hbGwsXHJcbiAgICAgICAgICAgICAgICBtZWRpdW06IG9iai5pbWFnZVNpemVzICYmIG9iai5pbWFnZVNpemVzW1wibWVkaXVtXCJdIHx8IHRoaXMuaW1hZ2VTaXplcy5tZWRpdW0sXHJcbiAgICAgICAgICAgICAgICBsYXJnZTogb2JqLmltYWdlU2l6ZXMgJiYgb2JqLmltYWdlU2l6ZXNbXCJsYXJnZVwiXSB8fCB0aGlzLmltYWdlU2l6ZXMubGFyZ2UsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclN0eWxlcyA9IG5ldyBDb250YWluZXJTdHlsZVNldChvYmpbXCJjb250YWluZXJTdHlsZXNcIl0pO1xyXG4gICAgICAgICAgICB0aGlzLnNwYWNpbmcgPSB7XHJcbiAgICAgICAgICAgICAgICBzbWFsbDogb2JqLnNwYWNpbmcgJiYgb2JqLnNwYWNpbmdbXCJzbWFsbFwiXSB8fCB0aGlzLnNwYWNpbmcuc21hbGwsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBvYmouc3BhY2luZyAmJiBvYmouc3BhY2luZ1tcImRlZmF1bHRcIl0gfHwgdGhpcy5zcGFjaW5nLmRlZmF1bHQsXHJcbiAgICAgICAgICAgICAgICBtZWRpdW06IG9iai5zcGFjaW5nICYmIG9iai5zcGFjaW5nW1wibWVkaXVtXCJdIHx8IHRoaXMuc3BhY2luZy5tZWRpdW0sXHJcbiAgICAgICAgICAgICAgICBsYXJnZTogb2JqLnNwYWNpbmcgJiYgb2JqLnNwYWNpbmdbXCJsYXJnZVwiXSB8fCB0aGlzLnNwYWNpbmcubGFyZ2UsXHJcbiAgICAgICAgICAgICAgICBleHRyYUxhcmdlOiBvYmouc3BhY2luZyAmJiBvYmouc3BhY2luZ1tcImV4dHJhTGFyZ2VcIl0gfHwgdGhpcy5zcGFjaW5nLmV4dHJhTGFyZ2UsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBvYmouc3BhY2luZyAmJiBvYmouc3BhY2luZ1tcInBhZGRpbmdcIl0gfHwgdGhpcy5zcGFjaW5nLnBhZGRpbmdcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VwYXJhdG9yID0ge1xyXG4gICAgICAgICAgICAgICAgbGluZVRoaWNrbmVzczogb2JqLnNlcGFyYXRvciAmJiBvYmouc2VwYXJhdG9yW1wibGluZVRoaWNrbmVzc1wiXSB8fCB0aGlzLnNlcGFyYXRvci5saW5lVGhpY2tuZXNzLFxyXG4gICAgICAgICAgICAgICAgbGluZUNvbG9yOiBvYmouc2VwYXJhdG9yICYmIG9iai5zZXBhcmF0b3JbXCJsaW5lQ29sb3JcIl0gfHwgdGhpcy5zZXBhcmF0b3IubGluZUNvbG9yXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucyA9IG5ldyBBY3Rpb25zQ29uZmlnKG9iai5hY3Rpb25zIHx8IHRoaXMuYWN0aW9ucyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRhcHRpdmVDYXJkID0gbmV3IEFkYXB0aXZlQ2FyZENvbmZpZyhvYmouYWRhcHRpdmVDYXJkIHx8IHRoaXMuYWRhcHRpdmVDYXJkKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZVNldCA9IG5ldyBJbWFnZVNldENvbmZpZyhvYmpbXCJpbWFnZVNldFwiXSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjdFNldCA9IG5ldyBGYWN0U2V0Q29uZmlnKG9ialtcImZhY3RTZXRcIl0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVmZmVjdGl2ZVNwYWNpbmcoc3BhY2luZzogRW51bXMuU3BhY2luZyk6IG51bWJlciB7XHJcbiAgICAgICAgc3dpdGNoIChzcGFjaW5nKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRW51bXMuU3BhY2luZy5TbWFsbDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYWNpbmcuc21hbGw7XHJcbiAgICAgICAgICAgIGNhc2UgRW51bXMuU3BhY2luZy5EZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BhY2luZy5kZWZhdWx0O1xyXG4gICAgICAgICAgICBjYXNlIEVudW1zLlNwYWNpbmcuTWVkaXVtOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BhY2luZy5tZWRpdW07XHJcbiAgICAgICAgICAgIGNhc2UgRW51bXMuU3BhY2luZy5MYXJnZTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYWNpbmcubGFyZ2U7XHJcbiAgICAgICAgICAgIGNhc2UgRW51bXMuU3BhY2luZy5FeHRyYUxhcmdlOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3BhY2luZy5leHRyYUxhcmdlO1xyXG4gICAgICAgICAgICBjYXNlIEVudW1zLlNwYWNpbmcuUGFkZGluZzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYWNpbmcucGFkZGluZztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYWtlQ3NzQ2xhc3NOYW1lKC4uLmNsYXNzTmFtZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiIFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jc3NDbGFzc05hbWVQcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSB0aGlzLmNzc0NsYXNzTmFtZVByZWZpeCArIFwiLVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXN1bHQgKz0gY2xhc3NOYW1lc1tpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuIiwiYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RUZXh0Rm9ybWF0dGVyIHtcclxuICAgIHByaXZhdGUgX3JlZ3VsYXJFeHByZXNzaW9uOiBSZWdFeHA7XHJcblxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGludGVybmFsRm9ybWF0KGxhbmc6IHN0cmluZywgbWF0Y2hlczogUmVnRXhwRXhlY0FycmF5KTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJlZ3VsYXJFeHByZXNzaW9uOiBSZWdFeHApIHtcclxuICAgICAgICB0aGlzLl9yZWd1bGFyRXhwcmVzc2lvbiA9IHJlZ3VsYXJFeHByZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm1hdChsYW5nOiBzdHJpbmcsIGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBtYXRjaGVzO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChtYXRjaGVzID0gdGhpcy5fcmVndWxhckV4cHJlc3Npb24uZXhlYyhpbnB1dCkpICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UobWF0Y2hlc1swXSwgdGhpcy5pbnRlcm5hbEZvcm1hdChsYW5nLCBtYXRjaGVzKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGF0ZUZvcm1hdHRlciBleHRlbmRzIEFic3RyYWN0VGV4dEZvcm1hdHRlciB7XHJcbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxGb3JtYXQobGFuZzogc3RyaW5nLCBtYXRjaGVzOiBSZWdFeHBFeGVjQXJyYXkpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShtYXRjaGVzWzFdKSk7XHJcbiAgICAgICAgdmFyIGZvcm1hdCA9IG1hdGNoZXNbMl0gIT0gdW5kZWZpbmVkID8gbWF0Y2hlc1syXS50b0xvd2VyQ2FzZSgpIDogXCJjb21wYWN0XCI7XHJcblxyXG4gICAgICAgIGlmIChmb3JtYXQgIT0gXCJjb21wYWN0XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxhbmcsIHsgZGF5OiBcIm51bWVyaWNcIiwgd2Vla2RheTogZm9ybWF0LCBtb250aDogZm9ybWF0LCB5ZWFyOiBcIm51bWVyaWNcIiB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGltZUZvcm1hdHRlciBleHRlbmRzIEFic3RyYWN0VGV4dEZvcm1hdHRlciB7XHJcbiAgICBwcm90ZWN0ZWQgaW50ZXJuYWxGb3JtYXQobGFuZzogc3RyaW5nLCBtYXRjaGVzOiBSZWdFeHBFeGVjQXJyYXkpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZShtYXRjaGVzWzFdKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRlLnRvTG9jYWxlVGltZVN0cmluZyhsYW5nLCB7IGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnMi1kaWdpdCcgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRUZXh0KGxhbmc6IHN0cmluZywgdGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGZvcm1hdHRlcnM6IEFycmF5PEFic3RyYWN0VGV4dEZvcm1hdHRlcj4gPSBbXHJcbiAgICAgICAgbmV3IERhdGVGb3JtYXR0ZXIoL1xce3syfURBVEVcXCgoXFxkezR9LVxcZHsyfS1cXGR7Mn1UXFxkezJ9OlxcZHsyfTpcXGR7Mn0oPzpafCg/Oig/Oi18XFwrKVxcZHsyfTpcXGR7Mn0pKSkoPzosID8oQ09NUEFDVHxMT05HfFNIT1JUKSk/XFwpXFx9ezJ9L2cpLFxyXG4gICAgICAgIG5ldyBUaW1lRm9ybWF0dGVyKC9cXHt7Mn1USU1FXFwoKFxcZHs0fS1cXGR7Mn0tXFxkezJ9VFxcZHsyfTpcXGR7Mn06XFxkezJ9KD86WnwoPzooPzotfFxcKylcXGR7Mn06XFxkezJ9KSkpXFwpXFx9ezJ9L2cpXHJcbiAgICBdO1xyXG5cclxuICAgIHZhciByZXN1bHQgPSB0ZXh0O1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZm9ybWF0dGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlcnNbaV0uZm9ybWF0KGxhbmcsIHJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBFbnVtcyBmcm9tIFwiLi9lbnVtc1wiO1xyXG5cclxuLyoqXHJcbiAqIEZhc3QgVVVJRCBnZW5lcmF0b3IsIFJGQzQxMjIgdmVyc2lvbiA0IGNvbXBsaWFudC5cclxuICogQGF1dGhvciBKZWZmIFdhcmQgKGpjd2FyZC5jb20pLlxyXG4gKiBAbGljZW5zZSBNSVQgbGljZW5zZVxyXG4gKiBAbGluayBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9ob3ctdG8tY3JlYXRlLWEtZ3VpZC11dWlkLWluLWphdmFzY3JpcHQvMjE5NjMxMzYjMjE5NjMxMzZcclxuICoqL1xyXG5leHBvcnQgY2xhc3MgVVVJRCB7XHJcblx0cHJpdmF0ZSBzdGF0aWMgbHV0ID0gW107XHJcblxyXG5cdHN0YXRpYyBnZW5lcmF0ZSgpOiBzdHJpbmcge1xyXG5cdFx0bGV0IGQwID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwO1xyXG5cdFx0bGV0IGQxID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwO1xyXG5cdFx0bGV0IGQyID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwO1xyXG5cdFx0bGV0IGQzID0gTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYgfCAwO1xyXG5cclxuXHRcdHJldHVybiBVVUlELmx1dFtkMCAmIDB4ZmZdICsgVVVJRC5sdXRbZDAgPj4gOCAmIDB4ZmZdICsgVVVJRC5sdXRbZDAgPj4gMTYgJiAweGZmXSArIFVVSUQubHV0W2QwID4+IDI0ICYgMHhmZl0gKyAnLScgK1xyXG5cdFx0XHRVVUlELmx1dFtkMSAmIDB4ZmZdICsgVVVJRC5sdXRbZDEgPj4gOCAmIDB4ZmZdICsgJy0nICsgVVVJRC5sdXRbZDEgPj4gMTYgJiAweDBmIHwgMHg0MF0gKyBVVUlELmx1dFtkMSA+PiAyNCAmIDB4ZmZdICsgJy0nICtcclxuXHRcdFx0VVVJRC5sdXRbZDIgJiAweDNmIHwgMHg4MF0gKyBVVUlELmx1dFtkMiA+PiA4ICYgMHhmZl0gKyAnLScgKyBVVUlELmx1dFtkMiA+PiAxNiAmIDB4ZmZdICsgVVVJRC5sdXRbZDIgPj4gMjQgJiAweGZmXSArXHJcblx0XHRcdFVVSUQubHV0W2QzICYgMHhmZl0gKyBVVUlELmx1dFtkMyA+PiA4ICYgMHhmZl0gKyBVVUlELmx1dFtkMyA+PiAxNiAmIDB4ZmZdICsgVVVJRC5sdXRbZDMgPj4gMjQgJiAweGZmXTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpbml0aWFsaXplKCkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xyXG5cdFx0XHRVVUlELmx1dFtpXSA9IChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcblVVSUQuaW5pdGlhbGl6ZSgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvbnRlbnRUeXBlcyA9IHtcclxuXHRhcHBsaWNhdGlvbkpzb246IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG5cdGFwcGxpY2F0aW9uWFd3d0Zvcm1VcmxlbmNvZGVkOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNlcGFyYXRpb25EZWZpbml0aW9uIHtcclxuXHRzcGFjaW5nOiBudW1iZXIsXHJcblx0bGluZVRoaWNrbmVzcz86IG51bWJlcixcclxuXHRsaW5lQ29sb3I/OiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSW5wdXQge1xyXG5cdGlkOiBzdHJpbmc7XHJcblx0dmFsdWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlT3JEZWZhdWx0PFQ+KG9iajogYW55LCBkZWZhdWx0VmFsdWU6IFQpOiBUIHtcclxuXHRyZXR1cm4gb2JqID8gPFQ+b2JqIDogZGVmYXVsdFZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOdWxsT3JFbXB0eSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IFwiXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlOiBOb2RlLCBjaGlsZDogTm9kZSkge1xyXG5cdGlmIChjaGlsZCAhPSBudWxsICYmIGNoaWxkICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0bm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJvcGVydHkodGFyZ2V0OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55ID0gdW5kZWZpbmVkKSB7XHJcblx0aWYgKHByb3BlcnR5VmFsdWUgJiYgKCFkZWZhdWx0VmFsdWUgfHwgZGVmYXVsdFZhbHVlICE9PSBwcm9wZXJ0eVZhbHVlKSkge1xyXG5cdFx0dGFyZ2V0W3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0eVZhbHVlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVudW1Qcm9wZXJ0eShlbnVtVHlwZTogeyBbczogbnVtYmVyXTogc3RyaW5nIH0sIHRhcmdldDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogbnVtYmVyLCBkZWZhdWx0VmFsdWU/OiBudW1iZXIpIHtcclxuXHRpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQgfHwgZGVmYXVsdFZhbHVlICE9PSBwcm9wZXJ0eVZhbHVlKSB7XHJcblx0XHR0YXJnZXRbcHJvcGVydHlOYW1lXSA9IGVudW1UeXBlW3Byb3BlcnR5VmFsdWVdO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudW1WYWx1ZU9yRGVmYXVsdCh0YXJnZXRFbnVtOiB7IFtzOiBudW1iZXJdOiBzdHJpbmcgfSwgbmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcblx0aWYgKGlzTnVsbE9yRW1wdHkobmFtZSkpIHtcclxuXHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XHJcblx0fVxyXG5cclxuXHRmb3IgKHZhciBrZXkgaW4gdGFyZ2V0RW51bSkge1xyXG5cdFx0bGV0IGlzVmFsdWVQcm9wZXJ0eSA9IHBhcnNlSW50KGtleSwgMTApID49IDBcclxuXHJcblx0XHRpZiAoaXNWYWx1ZVByb3BlcnR5KSB7XHJcblx0XHRcdGxldCB2YWx1ZSA9IHRhcmdldEVudW1ba2V5XTtcclxuXHJcblx0XHRcdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRpZiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcGFyc2VJbnQoa2V5LCAxMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIb3N0Q29uZmlnRW51bSh0YXJnZXRFbnVtOiB7IFtzOiBudW1iZXJdOiBzdHJpbmcgfSwgdmFsdWU6IHN0cmluZyB8IG51bWJlciwgZGVmYXVsdFZhbHVlOiBhbnkpOiBhbnkge1xyXG5cdGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcclxuXHRcdHJldHVybiBnZXRFbnVtVmFsdWVPckRlZmF1bHQodGFyZ2V0RW51bSwgdmFsdWUsIGRlZmF1bHRWYWx1ZSk7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcclxuXHRcdHJldHVybiBnZXRWYWx1ZU9yRGVmYXVsdDx0eXBlb2YgdGFyZ2V0RW51bT4odmFsdWUsIGRlZmF1bHRWYWx1ZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJldHVybiBkZWZhdWx0VmFsdWU7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VwYXJhdGlvbihzZXBhcmF0aW9uRGVmaW5pdGlvbjogSVNlcGFyYXRpb25EZWZpbml0aW9uLCBvcmllbnRhdGlvbjogRW51bXMuT3JpZW50YXRpb24pOiBIVE1MRWxlbWVudCB7XHJcblx0aWYgKHNlcGFyYXRpb25EZWZpbml0aW9uLnNwYWNpbmcgPiAwIHx8IHNlcGFyYXRpb25EZWZpbml0aW9uLmxpbmVUaGlja25lc3MgPiAwKSB7XHJcblx0XHR2YXIgc2VwYXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcblx0XHRpZiAob3JpZW50YXRpb24gPT0gRW51bXMuT3JpZW50YXRpb24uSG9yaXpvbnRhbCkge1xyXG5cdFx0XHRpZiAoc2VwYXJhdGlvbkRlZmluaXRpb24ubGluZVRoaWNrbmVzcykge1xyXG5cdFx0XHRcdHNlcGFyYXRvci5zdHlsZS5tYXJnaW5Ub3AgPSAoc2VwYXJhdGlvbkRlZmluaXRpb24uc3BhY2luZyAvIDIpICsgXCJweFwiO1xyXG5cdFx0XHRcdHNlcGFyYXRvci5zdHlsZS5wYWRkaW5nVG9wID0gKHNlcGFyYXRpb25EZWZpbml0aW9uLnNwYWNpbmcgLyAyKSArIFwicHhcIjtcclxuXHRcdFx0XHRzZXBhcmF0b3Iuc3R5bGUuYm9yZGVyVG9wID0gc2VwYXJhdGlvbkRlZmluaXRpb24ubGluZVRoaWNrbmVzcyArIFwicHggc29saWQgXCIgKyBzdHJpbmdUb0Nzc0NvbG9yKHNlcGFyYXRpb25EZWZpbml0aW9uLmxpbmVDb2xvcik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0c2VwYXJhdG9yLnN0eWxlLmhlaWdodCA9IHNlcGFyYXRpb25EZWZpbml0aW9uLnNwYWNpbmcgKyBcInB4XCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRpZiAoc2VwYXJhdGlvbkRlZmluaXRpb24ubGluZVRoaWNrbmVzcykge1xyXG5cdFx0XHRcdHNlcGFyYXRvci5zdHlsZS5tYXJnaW5MZWZ0ID0gKHNlcGFyYXRpb25EZWZpbml0aW9uLnNwYWNpbmcgLyAyKSArIFwicHhcIjtcclxuXHRcdFx0XHRzZXBhcmF0b3Iuc3R5bGUucGFkZGluZ0xlZnQgPSAoc2VwYXJhdGlvbkRlZmluaXRpb24uc3BhY2luZyAvIDIpICsgXCJweFwiO1xyXG5cdFx0XHRcdHNlcGFyYXRvci5zdHlsZS5ib3JkZXJMZWZ0ID0gc2VwYXJhdGlvbkRlZmluaXRpb24ubGluZVRoaWNrbmVzcyArIFwicHggc29saWQgXCIgKyBzdHJpbmdUb0Nzc0NvbG9yKHNlcGFyYXRpb25EZWZpbml0aW9uLmxpbmVDb2xvcik7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0c2VwYXJhdG9yLnN0eWxlLndpZHRoID0gc2VwYXJhdGlvbkRlZmluaXRpb24uc3BhY2luZyArIFwicHhcIjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHNlcGFyYXRvci5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcblxyXG5cdFx0cmV0dXJuIHNlcGFyYXRvcjtcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0Nzc0NvbG9yKGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdHZhciByZWdFeCA9IC8jKFswLTlBLUZdezJ9KShbMC05QS1GXXsyfSkoWzAtOUEtRl17Mn0pKFswLTlBLUZdezJ9KT8vZ2k7XHJcblxyXG5cdHZhciBtYXRjaGVzID0gcmVnRXguZXhlYyhjb2xvcik7XHJcblxyXG5cdGlmIChtYXRjaGVzICYmIG1hdGNoZXNbNF0pIHtcclxuXHRcdHZhciBhID0gcGFyc2VJbnQobWF0Y2hlc1sxXSwgMTYpIC8gMjU1O1xyXG5cdFx0dmFyIHIgPSBwYXJzZUludChtYXRjaGVzWzJdLCAxNik7XHJcblx0XHR2YXIgZyA9IHBhcnNlSW50KG1hdGNoZXNbM10sIDE2KTtcclxuXHRcdHZhciBiID0gcGFyc2VJbnQobWF0Y2hlc1s0XSwgMTYpO1xyXG5cclxuXHRcdHJldHVybiBcInJnYmEoXCIgKyByICsgXCIsXCIgKyBnICsgXCIsXCIgKyBiICsgXCIsXCIgKyBhICsgXCIpXCI7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0cmV0dXJuIGNvbG9yO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0cmluZ1dpdGhTdWJzdGl0dXRpb25zIHtcclxuXHRwcml2YXRlIF9pc1Byb2Nlc3NlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgX29yaWdpbmFsOiBzdHJpbmcgPSBudWxsO1xyXG5cdHByaXZhdGUgX3Byb2Nlc3NlZDogc3RyaW5nID0gbnVsbDtcclxuXHJcblx0c3Vic3RpdHV0ZUlucHV0VmFsdWVzKGlucHV0czogQXJyYXk8SUlucHV0PiwgY29udGVudFR5cGU6IHN0cmluZykge1xyXG5cdFx0dGhpcy5fcHJvY2Vzc2VkID0gdGhpcy5fb3JpZ2luYWw7XHJcblxyXG5cdFx0dmFyIHJlZ0V4ID0gL1xce3syfShbYS16MC05XyRAXSspLnZhbHVlXFx9ezJ9L2dpO1xyXG5cdFx0dmFyIG1hdGNoZXM7XHJcblxyXG5cdFx0d2hpbGUgKChtYXRjaGVzID0gcmVnRXguZXhlYyh0aGlzLl9vcmlnaW5hbCkpICE9IG51bGwpIHtcclxuXHRcdFx0dmFyIG1hdGNoZWRJbnB1dDogSUlucHV0ID0gbnVsbDtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKGlucHV0c1tpXS5pZC50b0xvd2VyQ2FzZSgpID09IG1hdGNoZXNbMV0udG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRcdFx0bWF0Y2hlZElucHV0ID0gaW5wdXRzW2ldO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobWF0Y2hlZElucHV0KSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlRm9yUmVwbGFjZSA9IFwiXCI7XHJcblxyXG5cdFx0XHRcdGlmIChtYXRjaGVkSW5wdXQudmFsdWUpIHtcclxuXHRcdFx0XHRcdHZhbHVlRm9yUmVwbGFjZSA9IG1hdGNoZWRJbnB1dC52YWx1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjb250ZW50VHlwZSA9PT0gQ29udGVudFR5cGVzLmFwcGxpY2F0aW9uSnNvbikge1xyXG5cdFx0XHRcdFx0dmFsdWVGb3JSZXBsYWNlID0gSlNPTi5zdHJpbmdpZnkodmFsdWVGb3JSZXBsYWNlKTtcclxuXHRcdFx0XHRcdHZhbHVlRm9yUmVwbGFjZSA9IHZhbHVlRm9yUmVwbGFjZS5zbGljZSgxLCAtMSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKGNvbnRlbnRUeXBlID09PSBDb250ZW50VHlwZXMuYXBwbGljYXRpb25YV3d3Rm9ybVVybGVuY29kZWQpIHtcclxuXHRcdFx0XHRcdHZhbHVlRm9yUmVwbGFjZSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZUZvclJlcGxhY2UpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5fcHJvY2Vzc2VkID0gdGhpcy5fcHJvY2Vzc2VkLnJlcGxhY2UobWF0Y2hlc1swXSwgdmFsdWVGb3JSZXBsYWNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLl9pc1Byb2Nlc3NlZCA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRnZXRPcmlnaW5hbCgpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMuX29yaWdpbmFsO1xyXG5cdH1cclxuXHJcblx0Z2V0KCk6IHN0cmluZyB7XHJcblx0XHRpZiAoIXRoaXMuX2lzUHJvY2Vzc2VkKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9vcmlnaW5hbDtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fcHJvY2Vzc2VkO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0KHZhbHVlOiBzdHJpbmcpIHtcclxuXHRcdHRoaXMuX29yaWdpbmFsID0gdmFsdWU7XHJcblx0XHR0aGlzLl9pc1Byb2Nlc3NlZCA9IGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpemVBbmRVbml0IHtcclxuXHRwaHlzaWNhbFNpemU6IG51bWJlcjtcclxuXHR1bml0OiBFbnVtcy5TaXplVW5pdDtcclxuXHJcblx0c3RhdGljIHBhcnNlKGlucHV0OiBhbnkpOiBTaXplQW5kVW5pdCB7XHJcblx0XHRsZXQgcmVzdWx0ID0gbmV3IFNpemVBbmRVbml0KDAsIEVudW1zLlNpemVVbml0LldlaWdodCk7XHJcblxyXG5cdFx0bGV0IHJlZ0V4cCA9IC9eKFswLTldKykocHh8XFwqKT8kL2c7XHJcblx0XHRsZXQgbWF0Y2hlcyA9IHJlZ0V4cC5leGVjKGlucHV0KTtcclxuXHJcblx0XHRpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCA+PSAyKSB7XHJcblx0XHRcdHJlc3VsdC5waHlzaWNhbFNpemUgPSBwYXJzZUludChtYXRjaGVzWzFdKTtcclxuXHJcblx0XHRcdGlmIChtYXRjaGVzLmxlbmd0aCA9PSAzKSB7XHJcblx0XHRcdFx0aWYgKG1hdGNoZXNbMl0gPT0gXCJweFwiKSB7XHJcblx0XHRcdFx0XHRyZXN1bHQudW5pdCA9IEVudW1zLlNpemVVbml0LlBpeGVsO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNpemU6IFwiICsgaW5wdXQpO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IocGh5c2ljYWxTaXplOiBudW1iZXIsIHVuaXQ6IEVudW1zLlNpemVVbml0KSB7XHJcblx0XHR0aGlzLnBoeXNpY2FsU2l6ZSA9IHBoeXNpY2FsU2l6ZTtcclxuXHRcdHRoaXMudW5pdCA9IHVuaXQ7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJ1bmNhdGUoZWxlbWVudDogSFRNTEVsZW1lbnQsXHJcblx0bWF4SGVpZ2h0OiBudW1iZXIsXHJcblx0bGluZUhlaWdodD86IG51bWJlcikge1xyXG5cdHZhciBmaXRzID0gKCkgPT4ge1xyXG5cdFx0Ly8gQWxsb3cgYSBvbmUgcGl4ZWwgb3ZlcmZsb3cgdG8gYWNjb3VudCBmb3Igcm91bmRpbmcgZGlmZmVyZW5jZXNcclxuXHRcdC8vIGJldHdlZW4gYnJvd3NlcnNcclxuXHRcdHJldHVybiBtYXhIZWlnaHQgLSBlbGVtZW50LnNjcm9sbEhlaWdodCA+PSAtMS4wO1xyXG5cdH07XHJcblxyXG5cdGlmIChmaXRzKCkpIHJldHVybjtcclxuXHJcblx0dmFyIGZ1bGxUZXh0ID0gZWxlbWVudC5pbm5lckhUTUw7XHJcblx0dmFyIHRydW5jYXRlQXQgPSAoaWR4KSA9PiB7XHJcblx0XHRlbGVtZW50LmlubmVySFRNTCA9IGZ1bGxUZXh0LnN1YnN0cmluZygwLCBpZHgpICsgJy4uLic7XHJcblx0fVxyXG5cclxuXHR2YXIgYnJlYWthYmxlSW5kaWNlcyA9IGZpbmRCcmVha2FibGVJbmRpY2VzKGZ1bGxUZXh0KTtcclxuXHR2YXIgbG8gPSAwO1xyXG5cdHZhciBoaSA9IGJyZWFrYWJsZUluZGljZXMubGVuZ3RoO1xyXG5cdHZhciBiZXN0QnJlYWtJZHggPSAwO1xyXG5cclxuXHQvLyBEbyBhIGJpbmFyeSBzZWFyY2ggZm9yIHRoZSBsb25nZXN0IHN0cmluZyB0aGF0IGZpdHNcclxuXHR3aGlsZSAobG8gPCBoaSkge1xyXG5cdFx0dmFyIG1pZCA9IE1hdGguZmxvb3IoKGxvICsgaGkpIC8gMik7XHJcblx0XHR0cnVuY2F0ZUF0KGJyZWFrYWJsZUluZGljZXNbbWlkXSk7XHJcblxyXG5cdFx0aWYgKGZpdHMoKSkge1xyXG5cdFx0XHRiZXN0QnJlYWtJZHggPSBicmVha2FibGVJbmRpY2VzW21pZF07XHJcblx0XHRcdGxvID0gbWlkICsgMTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRoaSA9IG1pZDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRydW5jYXRlQXQoYmVzdEJyZWFrSWR4KTtcclxuXHJcblx0Ly8gSWYgd2UgaGF2ZSBleHRyYSByb29tLCB0cnkgdG8gZXhwYW5kIHRoZSBzdHJpbmcgbGV0dGVyIGJ5IGxldHRlclxyXG5cdC8vIChjb3ZlcnMgdGhlIGNhc2Ugd2hlcmUgd2UgaGF2ZSB0byBicmVhayBpbiB0aGUgbWlkZGxlIG9mIGEgbG9uZyB3b3JkKVxyXG5cdGlmIChsaW5lSGVpZ2h0ICYmIG1heEhlaWdodCAtIGVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID49IGxpbmVIZWlnaHQgLSAxLjApIHtcclxuXHRcdGxldCBpZHggPSBmaW5kTmV4dENoYXJhY3RlcihmdWxsVGV4dCwgYmVzdEJyZWFrSWR4KTtcclxuXHJcblx0XHR3aGlsZSAoaWR4IDwgZnVsbFRleHQubGVuZ3RoKSB7XHJcblx0XHRcdHRydW5jYXRlQXQoaWR4KTtcclxuXHJcblx0XHRcdGlmIChmaXRzKCkpIHtcclxuXHRcdFx0XHRiZXN0QnJlYWtJZHggPSBpZHg7XHJcblx0XHRcdFx0aWR4ID0gZmluZE5leHRDaGFyYWN0ZXIoZnVsbFRleHQsIGlkeCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0cnVuY2F0ZUF0KGJlc3RCcmVha0lkeCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQnJlYWthYmxlSW5kaWNlcyhodG1sOiBzdHJpbmcpOiBBcnJheTxudW1iZXI+IHtcclxuXHR2YXIgcmVzdWx0czogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cdHZhciBpZHggPSBmaW5kTmV4dENoYXJhY3RlcihodG1sLCAtMSk7XHJcblxyXG5cdHdoaWxlIChpZHggPCBodG1sLmxlbmd0aCkge1xyXG5cdFx0aWYgKGh0bWxbaWR4XSA9PSAnICcpIHtcclxuXHRcdFx0cmVzdWx0cy5wdXNoKGlkeCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWR4ID0gZmluZE5leHRDaGFyYWN0ZXIoaHRtbCwgaWR4KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kTmV4dENoYXJhY3RlcihodG1sOiBzdHJpbmcsIGN1cnJJZHg6IG51bWJlcik6IG51bWJlciB7XHJcblx0Y3VycklkeCArPSAxO1xyXG5cclxuXHQvLyBJZiB3ZSBmb3VuZCB0aGUgc3RhcnQgb2YgYW4gSFRNTCB0YWcsIGtlZXAgYWR2YW5jaW5nIHVudGlsIHdlIGdldFxyXG5cdC8vIHBhc3QgaXQsIHNvIHdlIGRvbid0IGVuZCB1cCB0cnVuY2F0aW5nIGluIHRoZSBtaWRkbGUgb2YgdGhlIHRhZ1xyXG5cdHdoaWxlIChjdXJySWR4IDwgaHRtbC5sZW5ndGggJiYgaHRtbFtjdXJySWR4XSA9PSAnPCcpIHtcclxuXHRcdHdoaWxlIChjdXJySWR4IDwgaHRtbC5sZW5ndGggJiYgaHRtbFtjdXJySWR4KytdICE9ICc+Jyk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY3VycklkeDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpdFN0YXR1cyhlbGVtZW50OiBIVE1MRWxlbWVudCwgY29udGFpbmVyRW5kOiBudW1iZXIpOiBFbnVtcy5Db250YWluZXJGaXRTdGF0dXMge1xyXG5cdHZhciBzdGFydCA9IGVsZW1lbnQub2Zmc2V0VG9wO1xyXG5cdHZhciBlbmQgPSBzdGFydCArIGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cclxuXHRpZiAoZW5kIDw9IGNvbnRhaW5lckVuZCkge1xyXG5cdFx0cmV0dXJuIEVudW1zLkNvbnRhaW5lckZpdFN0YXR1cy5GdWxseUluQ29udGFpbmVyO1xyXG5cdH1cclxuXHRlbHNlIGlmIChzdGFydCA8IGNvbnRhaW5lckVuZCkge1xyXG5cdFx0cmV0dXJuIEVudW1zLkNvbnRhaW5lckZpdFN0YXR1cy5PdmVyZmxvd2luZztcclxuXHR9XHJcblx0ZWxzZSB7XHJcblx0XHRyZXR1cm4gRW51bXMuQ29udGFpbmVyRml0U3RhdHVzLkZ1bGx5T3V0T2ZDb250YWluZXI7XHJcblx0fVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==