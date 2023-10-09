import {
  require_classnames
} from "./chunk-NQS6WLNR.js";
import {
  require_react
} from "./chunk-32AJJKBB.js";
import {
  __commonJS,
  __toESM
} from "./chunk-HYZYPRER.js";

// node_modules/jsonp/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/jsonp/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/jsonp/node_modules/debug/src/debug.js
var require_debug = __commonJS({
  "node_modules/jsonp/node_modules/debug/src/debug.js"(exports, module) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled)
          return;
        var self = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%")
            return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports.init) {
        exports.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i])
          continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error)
        return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/jsonp/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/jsonp/node_modules/debug/src/browser.js"(exports, module) {
    exports = module.exports = require_debug();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2)
        return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match)
          return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/jsonp/index.js
var require_jsonp = __commonJS({
  "node_modules/jsonp/index.js"(exports, module) {
    var debug = require_browser()("jsonp");
    module.exports = jsonp8;
    var count = 0;
    function noop() {
    }
    function jsonp8(url, opts, fn) {
      if ("function" == typeof opts) {
        fn = opts;
        opts = {};
      }
      if (!opts)
        opts = {};
      var prefix = opts.prefix || "__jp";
      var id = opts.name || prefix + count++;
      var param = opts.param || "callback";
      var timeout = null != opts.timeout ? opts.timeout : 6e4;
      var enc = encodeURIComponent;
      var target = document.getElementsByTagName("script")[0] || document.head;
      var script;
      var timer;
      if (timeout) {
        timer = setTimeout(function() {
          cleanup();
          if (fn)
            fn(new Error("Timeout"));
        }, timeout);
      }
      function cleanup() {
        if (script.parentNode)
          script.parentNode.removeChild(script);
        window[id] = noop;
        if (timer)
          clearTimeout(timer);
      }
      function cancel() {
        if (window[id]) {
          cleanup();
        }
      }
      window[id] = function(data) {
        debug("jsonp got", data);
        cleanup();
        if (fn)
          fn(null, data);
      };
      url += (~url.indexOf("?") ? "&" : "?") + param + "=" + enc(id);
      url = url.replace("?&", "?");
      debug('jsonp req "%s"', url);
      script = document.createElement("script");
      script.src = url;
      target.parentNode.insertBefore(script, target);
      return cancel;
    }
  }
});

// node_modules/react-share/es/hocs/createIcon.js
var import_react = __toESM(require_react());
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function createIcon(iconConfig) {
  var Icon = function(_a) {
    var bgStyle = _a.bgStyle, borderRadius = _a.borderRadius, iconFillColor = _a.iconFillColor, round = _a.round, size = _a.size, rest = __rest(_a, ["bgStyle", "borderRadius", "iconFillColor", "round", "size"]);
    return import_react.default.createElement(
      "svg",
      __assign({ viewBox: "0 0 64 64", width: size, height: size }, rest),
      round ? import_react.default.createElement("circle", { cx: "32", cy: "32", r: "31", fill: iconConfig.color, style: bgStyle }) : import_react.default.createElement("rect", { width: "64", height: "64", rx: borderRadius, ry: borderRadius, fill: iconConfig.color, style: bgStyle }),
      import_react.default.createElement("path", { d: iconConfig.path, fill: iconFillColor })
    );
  };
  Icon.defaultProps = {
    bgStyle: {},
    borderRadius: 0,
    iconFillColor: "white",
    size: 64
  };
  return Icon;
}

// node_modules/react-share/es/EmailIcon.js
var EmailIcon = createIcon({
  color: "#7f7f7f",
  networkName: "email",
  path: "M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"
});
var EmailIcon_default = EmailIcon;

// node_modules/react-share/es/utils/objectToGetParams.js
function objectToGetParams(object) {
  var params = Object.entries(object).filter(function(_a) {
    var value = _a[1];
    return value !== void 0 && value !== null;
  }).map(function(_a) {
    var key = _a[0], value = _a[1];
    return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(String(value)));
  });
  return params.length > 0 ? "?".concat(params.join("&")) : "";
}

// node_modules/react-share/es/hocs/createShareButton.js
var import_react3 = __toESM(require_react());

// node_modules/react-share/es/ShareButton.js
var import_react2 = __toESM(require_react());
var import_classnames = __toESM(require_classnames());
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __rest2 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var isPromise = function(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
};
var getBoxPositionOnWindowCenter = function(width, height) {
  return {
    left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
    top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2
  };
};
var getBoxPositionOnScreenCenter = function(width, height) {
  return {
    top: (window.screen.height - height) / 2,
    left: (window.screen.width - width) / 2
  };
};
function windowOpen(url, _a, onClose) {
  var height = _a.height, width = _a.width, configRest = __rest2(_a, ["height", "width"]);
  var config = __assign2({ height, width, location: "no", toolbar: "no", status: "no", directories: "no", menubar: "no", scrollbars: "yes", resizable: "no", centerscreen: "yes", chrome: "yes" }, configRest);
  var shareDialog = window.open(url, "", Object.keys(config).map(function(key) {
    return "".concat(key, "=").concat(config[key]);
  }).join(", "));
  if (onClose) {
    var interval_1 = window.setInterval(function() {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval_1);
          onClose(shareDialog);
        }
      } catch (e) {
        console.error(e);
      }
    }, 1e3);
  }
  return shareDialog;
}
var ShareButton = (
  /** @class */
  function(_super) {
    __extends(ShareButton2, _super);
    function ShareButton2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.openShareDialog = function(link) {
        var _a = _this.props, onShareWindowClose = _a.onShareWindowClose, _b = _a.windowHeight, windowHeight = _b === void 0 ? 400 : _b, _c = _a.windowPosition, windowPosition = _c === void 0 ? "windowCenter" : _c, _d = _a.windowWidth, windowWidth = _d === void 0 ? 550 : _d;
        var windowConfig = __assign2({ height: windowHeight, width: windowWidth }, windowPosition === "windowCenter" ? getBoxPositionOnWindowCenter(windowWidth, windowHeight) : getBoxPositionOnScreenCenter(windowWidth, windowHeight));
        windowOpen(link, windowConfig, onShareWindowClose);
      };
      _this.handleClick = function(event) {
        return __awaiter(_this, void 0, void 0, function() {
          var _a, beforeOnClick, disabled, networkLink, onClick, url, openShareDialogOnClick, opts, link, returnVal;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                _a = this.props, beforeOnClick = _a.beforeOnClick, disabled = _a.disabled, networkLink = _a.networkLink, onClick = _a.onClick, url = _a.url, openShareDialogOnClick = _a.openShareDialogOnClick, opts = _a.opts;
                link = networkLink(url, opts);
                if (disabled) {
                  return [
                    2
                    /*return*/
                  ];
                }
                event.preventDefault();
                if (!beforeOnClick)
                  return [3, 2];
                returnVal = beforeOnClick();
                if (!isPromise(returnVal))
                  return [3, 2];
                return [4, returnVal];
              case 1:
                _b.sent();
                _b.label = 2;
              case 2:
                if (openShareDialogOnClick) {
                  this.openShareDialog(link);
                }
                if (onClick) {
                  onClick(event, link);
                }
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      return _this;
    }
    ShareButton2.prototype.render = function() {
      var _a = this.props, beforeOnClick = _a.beforeOnClick, children = _a.children, className = _a.className, disabled = _a.disabled, disabledStyle = _a.disabledStyle, forwardedRef = _a.forwardedRef, networkLink = _a.networkLink, networkName = _a.networkName, onShareWindowClose = _a.onShareWindowClose, openShareDialogOnClick = _a.openShareDialogOnClick, opts = _a.opts, resetButtonStyle = _a.resetButtonStyle, style = _a.style, url = _a.url, windowHeight = _a.windowHeight, windowPosition = _a.windowPosition, windowWidth = _a.windowWidth, rest = __rest2(_a, ["beforeOnClick", "children", "className", "disabled", "disabledStyle", "forwardedRef", "networkLink", "networkName", "onShareWindowClose", "openShareDialogOnClick", "opts", "resetButtonStyle", "style", "url", "windowHeight", "windowPosition", "windowWidth"]);
      var newClassName = (0, import_classnames.default)("react-share__ShareButton", {
        "react-share__ShareButton--disabled": !!disabled,
        disabled: !!disabled
      }, className);
      var newStyle = resetButtonStyle ? __assign2(__assign2({ backgroundColor: "transparent", border: "none", padding: 0, font: "inherit", color: "inherit", cursor: "pointer" }, style), disabled && disabledStyle) : __assign2(__assign2({}, style), disabled && disabledStyle);
      return import_react2.default.createElement("button", __assign2({}, rest, { "aria-label": rest["aria-label"] || networkName, className: newClassName, onClick: this.handleClick, ref: forwardedRef, style: newStyle }), children);
    };
    ShareButton2.defaultProps = {
      disabledStyle: { opacity: 0.6 },
      openShareDialogOnClick: true,
      resetButtonStyle: true
    };
    return ShareButton2;
  }(import_react2.Component)
);
var ShareButton_default = ShareButton;

// node_modules/react-share/es/hocs/createShareButton.js
var __assign3 = function() {
  __assign3 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign3.apply(this, arguments);
};
function createShareButton(networkName, link, optsMap, defaultProps) {
  function CreatedButton(props, ref) {
    var opts = optsMap(props);
    var passedProps = __assign3({}, props);
    var optsKeys = Object.keys(opts);
    optsKeys.forEach(function(key) {
      delete passedProps[key];
    });
    return import_react3.default.createElement(ShareButton_default, __assign3({}, defaultProps, passedProps, { forwardedRef: ref, networkName, networkLink: link, opts: optsMap(props) }));
  }
  CreatedButton.displayName = "ShareButton-".concat(networkName);
  return (0, import_react3.forwardRef)(CreatedButton);
}
var createShareButton_default = createShareButton;

// node_modules/react-share/es/EmailShareButton.js
function emailLink(url, _a) {
  var subject = _a.subject, body = _a.body, separator = _a.separator;
  return "mailto:" + objectToGetParams({ subject, body: body ? body + separator + url : url });
}
var EmailShareButton = createShareButton_default("email", emailLink, function(props) {
  return {
    subject: props.subject,
    body: props.body,
    separator: props.separator || " "
  };
}, {
  openShareDialogOnClick: false,
  onClick: function(_, link) {
    window.location.href = link;
  }
});
var EmailShareButton_default = EmailShareButton;

// node_modules/react-share/es/FacebookIcon.js
var FacebookIcon = createIcon({
  color: "#3b5998",
  networkName: "facebook",
  path: "M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
});
var FacebookIcon_default = FacebookIcon;

// node_modules/react-share/es/FacebookMessengerIcon.js
var FacebookMessengerIcon = createIcon({
  color: "#2196F3",
  networkName: "facebookmessenger",
  path: "M 53.066406 21.871094 C 52.667969 21.339844 51.941406 21.179688 51.359375 21.496094 L 37.492188 29.058594 L 28.867188 21.660156 C 28.339844 21.207031 27.550781 21.238281 27.054688 21.730469 L 11.058594 37.726562 C 10.539062 38.25 10.542969 39.09375 11.0625 39.613281 C 11.480469 40.027344 12.121094 40.121094 12.640625 39.839844 L 26.503906 32.28125 L 35.136719 39.679688 C 35.667969 40.132812 36.457031 40.101562 36.949219 39.609375 L 52.949219 23.613281 C 53.414062 23.140625 53.464844 22.398438 53.066406 21.871094 Z M 53.066406 21.871094"
});
var FacebookMessengerIcon_default = FacebookMessengerIcon;

// node_modules/react-share/es/FacebookMessengerShareButton.js
function facebookMessengerLink(url, _a) {
  var appId = _a.appId, redirectUri = _a.redirectUri, to = _a.to;
  return "https://www.facebook.com/dialog/send" + objectToGetParams({
    link: url,
    redirect_uri: redirectUri || url,
    app_id: appId,
    to
  });
}
var FacebookMessengerShareButton = createShareButton_default("facebookmessenger", facebookMessengerLink, function(props) {
  return {
    appId: props.appId,
    redirectUri: props.redirectUri,
    to: props.to
  };
}, {
  windowWidth: 1e3,
  windowHeight: 820
});
var FacebookMessengerShareButton_default = FacebookMessengerShareButton;

// node_modules/react-share/es/utils/assert.js
var __extends2 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var AssertionError = (
  /** @class */
  function(_super) {
    __extends2(AssertionError2, _super);
    function AssertionError2(message) {
      var _this = _super.call(this, message) || this;
      _this.name = "AssertionError";
      return _this;
    }
    return AssertionError2;
  }(Error)
);
function assert(value, message) {
  if (!value) {
    throw new AssertionError(message);
  }
}

// node_modules/react-share/es/FacebookShareButton.js
function facebookLink(url, _a) {
  var quote = _a.quote, hashtag = _a.hashtag;
  assert(url, "facebook.url");
  return "https://www.facebook.com/sharer/sharer.php" + objectToGetParams({
    u: url,
    quote,
    hashtag
  });
}
var FacebookShareButton = createShareButton_default("facebook", facebookLink, function(props) {
  return {
    quote: props.quote,
    hashtag: props.hashtag
  };
}, {
  windowWidth: 550,
  windowHeight: 400
});
var FacebookShareButton_default = FacebookShareButton;

// node_modules/react-share/es/FacebookShareCount.js
var import_jsonp = __toESM(require_jsonp());

// node_modules/react-share/es/hocs/createShareCount.js
var import_react4 = __toESM(require_react());
var import_classnames2 = __toESM(require_classnames());
var __extends3 = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign4 = function() {
  __assign4 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign4.apply(this, arguments);
};
var __rest3 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var defaultChildren = function(shareCount) {
  return shareCount;
};
var SocialMediaShareCount = (
  /** @class */
  function(_super) {
    __extends3(SocialMediaShareCount2, _super);
    function SocialMediaShareCount2(props) {
      var _this = _super.call(this, props) || this;
      _this._isMounted = false;
      _this.state = { count: 0, isLoading: false };
      return _this;
    }
    SocialMediaShareCount2.prototype.componentDidMount = function() {
      this._isMounted = true;
      this.updateCount(this.props.url);
    };
    SocialMediaShareCount2.prototype.componentDidUpdate = function(prevProps) {
      if (this.props.url !== prevProps.url) {
        this.updateCount(this.props.url);
      }
    };
    SocialMediaShareCount2.prototype.componentWillUnmount = function() {
      this._isMounted = false;
    };
    SocialMediaShareCount2.prototype.updateCount = function(url) {
      var _this = this;
      this.setState({
        isLoading: true
      });
      this.props.getCount(url, function(count) {
        if (_this._isMounted) {
          _this.setState({
            count,
            isLoading: false
          });
        }
      });
    };
    SocialMediaShareCount2.prototype.render = function() {
      var _a = this.state, count = _a.count, isLoading = _a.isLoading;
      var _b = this.props, _c = _b.children, children = _c === void 0 ? defaultChildren : _c, className = _b.className, _ = _b.getCount, rest = __rest3(_b, ["children", "className", "getCount"]);
      return import_react4.default.createElement("span", __assign4({ className: (0, import_classnames2.default)("react-share__ShareCount", className) }, rest), !isLoading && count !== void 0 && children(count));
    };
    return SocialMediaShareCount2;
  }(import_react4.Component)
);
function createShareCount(getCount) {
  var ShareCount = function(props) {
    return import_react4.default.createElement(SocialMediaShareCount, __assign4({ getCount }, props));
  };
  ShareCount.displayName = "ShareCount(".concat(getCount.name, ")");
  return ShareCount;
}

// node_modules/react-share/es/FacebookShareCount.js
function getFacebookShareCount(shareUrl, callback) {
  var endpoint = "https://graph.facebook.com/?id=".concat(shareUrl, "&fields=og_object{engagement}");
  (0, import_jsonp.default)(endpoint, function(err, data) {
    callback(!err && data && data.og_object && data.og_object.engagement ? data.og_object.engagement.count : void 0);
  });
}
var FacebookShareCount_default = createShareCount(getFacebookShareCount);

// node_modules/react-share/es/HatenaIcon.js
var HatenaIcon = createIcon({
  color: "#009ad9",
  networkName: "hatena",
  path: "M 36.164062 33.554688 C 34.988281 32.234375 33.347656 31.5 31.253906 31.34375 C 33.125 30.835938 34.476562 30.09375 35.335938 29.09375 C 36.191406 28.09375 36.609375 26.78125 36.609375 25.101562 C 36.628906 23.875 36.332031 22.660156 35.75 21.578125 C 35.160156 20.558594 34.292969 19.71875 33.253906 19.160156 C 32.304688 18.640625 31.175781 18.265625 29.847656 18.042969 C 28.523438 17.824219 26.195312 17.730469 22.867188 17.730469 L 14.769531 17.730469 L 14.769531 47.269531 L 23.113281 47.269531 C 26.46875 47.269531 28.886719 47.15625 30.367188 46.929688 C 31.851562 46.695312 33.085938 46.304688 34.085938 45.773438 C 35.289062 45.148438 36.28125 44.179688 36.933594 42.992188 C 37.597656 41.796875 37.933594 40.402344 37.933594 38.816406 C 37.933594 36.621094 37.347656 34.867188 36.164062 33.554688 Z M 22.257812 24.269531 L 23.984375 24.269531 C 25.988281 24.269531 27.332031 24.496094 28.015625 24.945312 C 28.703125 25.402344 29.042969 26.183594 29.042969 27.285156 C 29.042969 28.390625 28.664062 29.105469 27.9375 29.550781 C 27.210938 29.992188 25.84375 30.199219 23.855469 30.199219 L 22.257812 30.199219 Z M 29.121094 41.210938 C 28.328125 41.691406 26.976562 41.925781 25.078125 41.925781 L 22.257812 41.925781 L 22.257812 35.488281 L 25.195312 35.488281 C 27.144531 35.488281 28.496094 35.738281 29.210938 36.230469 C 29.925781 36.726562 30.304688 37.582031 30.304688 38.832031 C 30.304688 40.078125 29.914062 40.742188 29.105469 41.222656 Z M 29.121094 41.210938 M 46.488281 39.792969 C 44.421875 39.792969 42.742188 41.46875 42.742188 43.535156 C 42.742188 45.605469 44.421875 47.28125 46.488281 47.28125 C 48.554688 47.28125 50.230469 45.605469 50.230469 43.535156 C 50.230469 41.46875 48.554688 39.792969 46.488281 39.792969 Z M 46.488281 39.792969 M 43.238281 17.730469 L 49.738281 17.730469 L 49.738281 37.429688 L 43.238281 37.429688 Z M 43.238281 17.730469 "
});
var HatenaIcon_default = HatenaIcon;

// node_modules/react-share/es/HatenaShareButton.js
function hatenaLink(url, _a) {
  var title = _a.title;
  assert(url, "hatena.url");
  return "http://b.hatena.ne.jp/add?mode=confirm&url=".concat(url, "&title=").concat(title);
}
var HatenaShareButton = createShareButton_default("hatena", hatenaLink, function(props) {
  return {
    title: props.title
  };
}, {
  windowWidth: 660,
  windowHeight: 460,
  windowPosition: "windowCenter"
});
var HatenaShareButton_default = HatenaShareButton;

// node_modules/react-share/es/HatenaShareCount.js
var import_jsonp2 = __toESM(require_jsonp());
function getHatenaShareCount(shareUrl, callback) {
  var url = "https://bookmark.hatenaapis.com/count/entry";
  (0, import_jsonp2.default)(url + objectToGetParams({
    url: shareUrl
  }), function(err, data) {
    callback(data ? data : void 0);
  });
}
var HatenaShareCount_default = createShareCount(getHatenaShareCount);

// node_modules/react-share/es/InstapaperIcon.js
var InstapaperIcon = createIcon({
  color: "#1F1F1F",
  networkName: "instapaper",
  path: "M35.688 43.012c0 2.425.361 2.785 3.912 3.056V48H24.401v-1.932c3.555-.27 3.912-.63 3.912-3.056V20.944c0-2.379-.36-2.785-3.912-3.056V16H39.6v1.888c-3.55.27-3.912.675-3.912 3.056v22.068h.001z"
});
var InstapaperIcon_default = InstapaperIcon;

// node_modules/react-share/es/InstapaperShareButton.js
function instapaperLink(url, _a) {
  var title = _a.title, description = _a.description;
  assert(url, "instapaper.url");
  return "http://www.instapaper.com/hello2" + objectToGetParams({
    url,
    title,
    description
  });
}
var InstapaperShareButton = createShareButton_default("instapaper", instapaperLink, function(props) {
  return {
    title: props.title,
    description: props.description
  };
}, {
  windowWidth: 500,
  windowHeight: 500,
  windowPosition: "windowCenter"
});
var InstapaperShareButton_default = InstapaperShareButton;

// node_modules/react-share/es/LineIcon.js
var LineIcon = createIcon({
  color: "#00b800",
  networkName: "line",
  path: "M52.62 30.138c0 3.693-1.432 7.019-4.42 10.296h.001c-4.326 4.979-14 11.044-16.201 11.972-2.2.927-1.876-.591-1.786-1.112l.294-1.765c.069-.527.142-1.343-.066-1.865-.232-.574-1.146-.872-1.817-1.016-9.909-1.31-17.245-8.238-17.245-16.51 0-9.226 9.251-16.733 20.62-16.733 11.37 0 20.62 7.507 20.62 16.733zM27.81 25.68h-1.446a.402.402 0 0 0-.402.401v8.985c0 .221.18.4.402.4h1.446a.401.401 0 0 0 .402-.4v-8.985a.402.402 0 0 0-.402-.401zm9.956 0H36.32a.402.402 0 0 0-.402.401v5.338L31.8 25.858a.39.39 0 0 0-.031-.04l-.002-.003-.024-.025-.008-.007a.313.313 0 0 0-.032-.026.255.255 0 0 1-.021-.014l-.012-.007-.021-.012-.013-.006-.023-.01-.013-.005-.024-.008-.014-.003-.023-.005-.017-.002-.021-.003-.021-.002h-1.46a.402.402 0 0 0-.402.401v8.985c0 .221.18.4.402.4h1.446a.401.401 0 0 0 .402-.4v-5.337l4.123 5.568c.028.04.063.072.101.099l.004.003a.236.236 0 0 0 .025.015l.012.006.019.01a.154.154 0 0 1 .019.008l.012.004.028.01.005.001a.442.442 0 0 0 .104.013h1.446a.4.4 0 0 0 .401-.4v-8.985a.402.402 0 0 0-.401-.401zm-13.442 7.537h-3.93v-7.136a.401.401 0 0 0-.401-.401h-1.447a.4.4 0 0 0-.401.401v8.984a.392.392 0 0 0 .123.29c.072.068.17.111.278.111h5.778a.4.4 0 0 0 .401-.401v-1.447a.401.401 0 0 0-.401-.401zm21.429-5.287c.222 0 .401-.18.401-.402v-1.446a.401.401 0 0 0-.401-.402h-5.778a.398.398 0 0 0-.279.113l-.005.004-.006.008a.397.397 0 0 0-.111.276v8.984c0 .108.043.206.112.278l.005.006a.401.401 0 0 0 .284.117h5.778a.4.4 0 0 0 .401-.401v-1.447a.401.401 0 0 0-.401-.401h-3.93v-1.519h3.93c.222 0 .401-.18.401-.402V29.85a.401.401 0 0 0-.401-.402h-3.93V27.93h3.93z"
});
var LineIcon_default = LineIcon;

// node_modules/react-share/es/LineShareButton.js
function lineLink(url, _a) {
  var title = _a.title;
  assert(url, "line.url");
  return "https://social-plugins.line.me/lineit/share" + objectToGetParams({
    url,
    text: title
  });
}
var LineShareButton = createShareButton_default("line", lineLink, function(props) {
  return {
    title: props.title
  };
}, {
  windowWidth: 500,
  windowHeight: 500
});
var LineShareButton_default = LineShareButton;

// node_modules/react-share/es/LinkedinIcon.js
var LinkedinIcon = createIcon({
  color: "#007fb1",
  networkName: "linkedin",
  path: "M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
});
var LinkedinIcon_default = LinkedinIcon;

// node_modules/react-share/es/LinkedinShareButton.js
function linkedinLink(url, _a) {
  var title = _a.title, summary = _a.summary, source = _a.source;
  assert(url, "linkedin.url");
  return "https://linkedin.com/shareArticle" + objectToGetParams({ url, mini: "true", title, summary, source });
}
var LinkedinShareButton = createShareButton_default("linkedin", linkedinLink, function(_a) {
  var title = _a.title, summary = _a.summary, source = _a.source;
  return { title, summary, source };
}, {
  windowWidth: 750,
  windowHeight: 600
});
var LinkedinShareButton_default = LinkedinShareButton;

// node_modules/react-share/es/LivejournalIcon.js
var LivejournalIcon = createIcon({
  color: "#21A5D8",
  networkName: "livejournal",
  path: "M18.3407821,28.1764706 L21.9441341,31.789916 L33.0055865,42.882353 C33.0055865,42.882353 33.0893855,42.9663866 33.0893855,42.9663866 L46.6648046,47 C46.6648046,47 46.6648046,47 46.7486034,47 C46.8324022,47 46.8324022,47 46.9162012,46.9159664 C47,46.8319327 47,46.8319327 47,46.7478991 L42.9776536,33.1344537 C42.9776536,33.1344537 42.9776536,33.1344537 42.8938548,33.0504202 L31.1620111,21.3697479 L31.1620111,21.3697479 L28.1452514,18.2605042 C27.3072626,17.4201681 26.5530726,17 25.7150838,17 C24.2905028,17 23.0335195,18.3445378 21.5251397,19.8571429 C21.273743,20.1092437 20.9385475,20.4453781 20.6871508,20.697479 C20.3519553,21.0336134 20.1005586,21.2857143 19.849162,21.5378151 C18.3407821,22.9663866 17.0837989,24.2268908 17,25.7394958 C17.0837989,26.4957983 17.5027933,27.3361345 18.3407821,28.1764706 Z M39.9012319,39.6134454 C39.7336341,39.4453781 39.4822374,37.6806724 40.2364275,36.8403362 C40.9906174,36.0840337 41.6610084,36 42.1638017,36 C42.3313995,36 42.4989973,36 42.5827961,36 L44.8453659,43.5630253 L43.5883828,44.8235295 L36.0464833,42.5546218 C35.9626843,42.2184874 35.8788855,41.2100841 36.8844722,40.2016807 C37.2196676,39.8655463 37.8900587,39.6134454 38.5604498,39.6134454 C39.147042,39.6134454 39.5660364,39.7815126 39.5660364,39.7815126 C39.6498353,39.8655463 39.8174331,39.8655463 39.8174331,39.7815126 C39.9850307,39.7815126 39.9850307,39.697479 39.9012319,39.6134454 Z"
});
var LivejournalIcon_default = LivejournalIcon;

// node_modules/react-share/es/LivejournalShareButton.js
function livejournalLink(url, _a) {
  var title = _a.title, description = _a.description;
  assert(url, "livejournal.url");
  return "https://www.livejournal.com/update.bml" + objectToGetParams({
    subject: title,
    event: description
  });
}
var LivejournalShareButton = createShareButton_default("livejournal", livejournalLink, function(props) {
  return {
    title: props.title,
    description: props.description
  };
}, {
  windowWidth: 660,
  windowHeight: 460
});
var LivejournalShareButton_default = LivejournalShareButton;

// node_modules/react-share/es/MailruIcon.js
var MailruIcon = createIcon({
  color: "#168DE2",
  networkName: "mailru",
  path: "M39.7107745,17 C41.6619755,17 43.3204965,18.732852 43.3204965,21.0072202 C43.3204965,23.2815885 41.7595357,25.0144404 39.7107745,25.0144404 C37.7595732,25.0144404 36.1010522,23.2815885 36.1010522,21.0072202 C36.1010522,18.732852 37.7595732,17 39.7107745,17 Z M24.3938451,17 C26.3450463,17 28.0035672,18.732852 28.0035672,21.0072202 C28.0035672,23.2815885 26.4426063,25.0144404 24.3938451,25.0144404 C22.4426439,25.0144404 20.7841229,23.2815885 20.7841229,21.0072202 C20.7841229,18.732852 22.4426439,17 24.3938451,17 Z M51.9057817,43.4259928 C51.7106617,44.0758123 51.4179815,44.6173285 50.9301812,44.9422383 C50.637501,45.1588448 50.2472607,45.267148 49.8570205,45.267148 C49.07654,45.267148 48.3936197,44.833935 48.0033795,44.0758123 L46.2472985,40.7184115 L45.759498,41.2599278 C42.5400162,44.9422383 37.466893,47 32.0035297,47 C26.5401664,47 21.5646034,44.9422383 18.2475614,41.2599278 L17.7597611,40.7184115 L16.00368,44.0758123 C15.6134398,44.833935 14.9305194,45.267148 14.1500389,45.267148 C13.7597986,45.267148 13.3695584,45.1588448 13.0768782,44.9422383 C12.0037176,44.2924187 11.7110374,42.7761733 12.2963978,41.5848375 L16.7841605,33.0288807 C17.1744007,32.270758 17.8573211,31.8375453 18.6378016,31.8375453 C19.0280418,31.8375453 19.4182821,31.9458485 19.7109623,32.1624548 C20.7841229,32.8122743 21.0768031,34.3285197 20.4914427,35.5198555 L20.1012025,36.2779783 L20.2963226,36.602888 C22.4426439,39.9602888 27.0279667,42.234657 31.9059697,42.234657 C36.7839727,42.234657 41.3692955,40.068592 43.5156167,36.602888 L43.7107367,36.2779783 L43.3204965,35.6281587 C43.0278165,35.0866425 42.9302562,34.436823 43.1253765,33.7870035 C43.3204965,33.137184 43.6131767,32.5956678 44.100977,32.270758 C44.3936572,32.0541515 44.7838975,31.9458485 45.1741377,31.9458485 C45.9546182,31.9458485 46.6375385,32.3790613 47.0277787,33.137184 L51.5155415,41.6931408 C52.003342,42.234657 52.100902,42.8844765 51.9057817,43.4259928 Z"
});
var MailruIcon_default = MailruIcon;

// node_modules/react-share/es/MailruShareButton.js
function mailruLink(url, _a) {
  var title = _a.title, description = _a.description, imageUrl = _a.imageUrl;
  assert(url, "mailru.url");
  return "https://connect.mail.ru/share" + objectToGetParams({
    url,
    title,
    description,
    image_url: imageUrl
  });
}
var MailruShareButton = createShareButton_default("mailru", mailruLink, function(props) {
  return {
    title: props.title,
    description: props.description,
    imageUrl: props.imageUrl
  };
}, {
  windowWidth: 660,
  windowHeight: 460
});
var MailruShareButton_default = MailruShareButton;

// node_modules/react-share/es/OKIcon.js
var OKIcon = createIcon({
  color: "#f2720c",
  networkName: "ok",
  path: "M39,30c-1,0-3,2-7,2s-6-2-7-2c-1.1,0-2,0.9-2,2c0,1,0.6,1.5,1,1.7c1.2,0.7,5,2.3,5,2.3l-4.3,5.4   c0,0-0.8,0.9-0.8,1.6c0,1.1,0.9,2,2,2c1,0,1.5-0.7,1.5-0.7S32,39,32,39c0,0,4.5,5.3,4.5,5.3S37,45,38,45c1.1,0,2-0.9,2-2   c0-0.6-0.8-1.6-0.8-1.6L35,36c0,0,3.8-1.6,5-2.3c0.4-0.3,1-0.7,1-1.7C41,30.9,40.1,30,39,30z M32,15c-3.9,0-7,3.1-7,7s3.1,7,7,7c3.9,0,7-3.1,7-7S35.9,15,32,15z M32,25.5   c-1.9,0-3.5-1.6-3.5-3.5c0-1.9,1.6-3.5,3.5-3.5c1.9,0,3.5,1.6,3.5,3.5C35.5,23.9,33.9,22.5,35,22.5z "
});
var OKIcon_default = OKIcon;

// node_modules/react-share/es/OKShareButton.js
function okLink(url, _a) {
  var title = _a.title, description = _a.description, image = _a.image;
  assert(url, "ok.url");
  return "https://connect.ok.ru/offer" + objectToGetParams({
    url,
    title,
    description,
    imageUrl: image
  });
}
var OKShareButton = createShareButton_default("ok", okLink, function(props) {
  return {
    title: props.title,
    description: props.description,
    image: props.image
  };
}, {
  windowWidth: 588,
  windowHeight: 480,
  windowPosition: "screenCenter"
});
var OKShareButton_default = OKShareButton;

// node_modules/react-share/es/OKShareCount.js
var import_jsonp3 = __toESM(require_jsonp());
function getOKShareCount(shareUrl, callback) {
  if (!window.OK) {
    window.OK = {
      Share: {
        count: function count(index2, _count) {
          window.OK.callbacks[index2](_count);
        }
      },
      callbacks: []
    };
  }
  var url = "https://connect.ok.ru/dk";
  var index = window.OK.callbacks.length;
  window.ODKL = {
    updateCount: function(index2, count) {
      var callbackIndex = index2 === "" ? 0 : parseInt(index2.replace("react-share-", ""), 10);
      window.OK.callbacks[callbackIndex](count === "" ? void 0 : parseInt(count, 10));
    }
  };
  window.OK.callbacks.push(callback);
  return (0, import_jsonp3.default)(url + objectToGetParams({
    "st.cmd": "extLike",
    uid: "react-share-".concat(index),
    ref: shareUrl
  }));
}
var OKShareCount_default = createShareCount(getOKShareCount);

// node_modules/react-share/es/PinterestIcon.js
var PinterestIcon = createIcon({
  color: "#cb2128",
  networkName: "pinterest",
  path: "M32,16c-8.8,0-16,7.2-16,16c0,6.6,3.9,12.2,9.6,14.7c0-1.1,0-2.5,0.3-3.7 c0.3-1.3,2.1-8.7,2.1-8.7s-0.5-1-0.5-2.5c0-2.4,1.4-4.1,3.1-4.1c1.5,0,2.2,1.1,2.2,2.4c0,1.5-0.9,3.7-1.4,5.7 c-0.4,1.7,0.9,3.1,2.5,3.1c3,0,5.1-3.9,5.1-8.5c0-3.5-2.4-6.1-6.7-6.1c-4.9,0-7.9,3.6-7.9,7.7c0,1.4,0.4,2.4,1.1,3.1 c0.3,0.3,0.3,0.5,0.2,0.9c-0.1,0.3-0.3,1-0.3,1.3c-0.1,0.4-0.4,0.6-0.8,0.4c-2.2-0.9-3.3-3.4-3.3-6.1c0-4.5,3.8-10,11.4-10 c6.1,0,10.1,4.4,10.1,9.2c0,6.3-3.5,11-8.6,11c-1.7,0-3.4-0.9-3.9-2c0,0-0.9,3.7-1.1,4.4c-0.3,1.2-1,2.5-1.6,3.4 c1.4,0.4,3,0.7,4.5,0.7c8.8,0,16-7.2,16-16C48,23.2,40.8,16,32,16z"
});
var PinterestIcon_default = PinterestIcon;

// node_modules/react-share/es/PinterestShareButton.js
function pinterestLink(url, _a) {
  var media = _a.media, description = _a.description;
  assert(url, "pinterest.url");
  assert(media, "pinterest.media");
  return "https://pinterest.com/pin/create/button/" + objectToGetParams({
    url,
    media,
    description
  });
}
var PinterestShareButton = createShareButton_default("pinterest", pinterestLink, function(props) {
  return {
    media: props.media,
    description: props.description
  };
}, {
  windowWidth: 1e3,
  windowHeight: 730
});
var PinterestShareButton_default = PinterestShareButton;

// node_modules/react-share/es/PinterestShareCount.js
var import_jsonp4 = __toESM(require_jsonp());
function getPinterestShareCount(shareUrl, callback) {
  var url = "https://api.pinterest.com/v1/urls/count.json";
  (0, import_jsonp4.default)(url + objectToGetParams({
    url: shareUrl
  }), function(err, data) {
    callback(data ? data.count : void 0);
  });
}
var PinterestShareCount_default = createShareCount(getPinterestShareCount);

// node_modules/react-share/es/PocketIcon.js
var PocketIcon = createIcon({
  color: "#EF3F56",
  networkName: "pocket",
  path: "M41.084 29.065l-7.528 7.882a2.104 2.104 0 0 1-1.521.666 2.106 2.106 0 0 1-1.522-.666l-7.528-7.882c-.876-.914-.902-2.43-.065-3.384.84-.955 2.228-.987 3.1-.072l6.015 6.286 6.022-6.286c.88-.918 2.263-.883 3.102.071.841.938.82 2.465-.06 3.383l-.015.002zm6.777-10.976C47.463 16.84 46.361 16 45.14 16H18.905c-1.2 0-2.289.82-2.716 2.044-.125.363-.189.743-.189 1.125v10.539l.112 2.096c.464 4.766 2.73 8.933 6.243 11.838.06.053.125.102.19.153l.04.033c1.882 1.499 3.986 2.514 6.259 3.014a14.662 14.662 0 0 0 6.13.052c.118-.042.235-.065.353-.087.03 0 .065-.022.098-.042a15.395 15.395 0 0 0 6.011-2.945l.039-.045.18-.153c3.502-2.902 5.765-7.072 6.248-11.852L48 29.674v-10.52c0-.366-.041-.728-.161-1.08l.022.015z"
});
var PocketIcon_default = PocketIcon;

// node_modules/react-share/es/PocketShareButton.js
function pocketLink(url, _a) {
  var title = _a.title;
  assert(url, "pocket.url");
  return "https://getpocket.com/save" + objectToGetParams({
    url,
    title
  });
}
var PocketShareButton = createShareButton_default("pocket", pocketLink, function(props) {
  return {
    title: props.title
  };
}, {
  windowWidth: 500,
  windowHeight: 500
});
var PocketShareButton_default = PocketShareButton;

// node_modules/react-share/es/RedditIcon.js
var RedditIcon = createIcon({
  color: "#ff4500",
  networkName: "reddit",
  path: "m 52.8165,31.942362 c 0,-2.4803 -2.0264,-4.4965 -4.5169,-4.4965 -1.2155,0 -2.3171,0.4862 -3.128,1.2682 -3.077,-2.0247 -7.2403,-3.3133 -11.8507,-3.4782 l 2.5211,-7.9373 6.8272,1.5997 -0.0102,0.0986 c 0,2.0281 1.6575,3.6771 3.6958,3.6771 2.0366,0 3.6924,-1.649 3.6924,-3.6771 0,-2.0281 -1.6575,-3.6788 -3.6924,-3.6788 -1.564,0 -2.8968,0.9758 -3.4357,2.3443 l -7.3593,-1.7255 c -0.3213,-0.0782 -0.6477,0.1071 -0.748,0.4233 L 32,25.212062 c -4.8246,0.0578 -9.1953,1.3566 -12.41,3.4425 -0.8058,-0.7446 -1.8751,-1.2104 -3.0583,-1.2104 -2.4905,0 -4.5152,2.0179 -4.5152,4.4982 0,1.649 0.9061,3.0787 2.2389,3.8607 -0.0884,0.4794 -0.1462,0.9639 -0.1462,1.4569 0,6.6487 8.1736,12.0581 18.2223,12.0581 10.0487,0 18.224,-5.4094 18.224,-12.0581 0,-0.4658 -0.0493,-0.9248 -0.1275,-1.377 1.4144,-0.7599 2.3885,-2.2304 2.3885,-3.9406 z m -29.2808,3.0872 c 0,-1.4756 1.207,-2.6775 2.6894,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 -1.4824,0 -2.6894,-1.2002 -2.6894,-2.6758 z m 15.4037,7.9373 c -1.3549,1.3481 -3.4816,2.0043 -6.5008,2.0043 l -0.0221,-0.0051 -0.0221,0.0051 c -3.0209,0 -5.1476,-0.6562 -6.5008,-2.0043 -0.2465,-0.2448 -0.2465,-0.6443 0,-0.8891 0.2465,-0.2465 0.6477,-0.2465 0.8942,0 1.105,1.0999 2.9393,1.6337 5.6066,1.6337 l 0.0221,0.0051 0.0221,-0.0051 c 2.6673,0 4.5016,-0.5355 5.6066,-1.6354 0.2465,-0.2465 0.6477,-0.2448 0.8942,0 0.2465,0.2465 0.2465,0.6443 0,0.8908 z m -0.3213,-5.2615 c -1.4824,0 -2.6877,-1.2002 -2.6877,-2.6758 0,-1.4756 1.2053,-2.6775 2.6877,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 z"
});
var RedditIcon_default = RedditIcon;

// node_modules/react-share/es/RedditShareButton.js
function redditLink(url, _a) {
  var title = _a.title;
  assert(url, "reddit.url");
  return "https://www.reddit.com/submit" + objectToGetParams({
    url,
    title
  });
}
var RedditShareButton = createShareButton_default("reddit", redditLink, function(props) {
  return {
    title: props.title
  };
}, {
  windowWidth: 660,
  windowHeight: 460,
  windowPosition: "windowCenter"
});
var RedditShareButton_default = RedditShareButton;

// node_modules/react-share/es/RedditShareCount.js
var import_jsonp5 = __toESM(require_jsonp());
function getRedditShareCount(shareUrl, callback) {
  var endpoint = "https://www.reddit.com/api/info.json?limit=1&url=".concat(shareUrl);
  (0, import_jsonp5.default)(endpoint, { param: "jsonp" }, function(err, response) {
    callback(!err && response && response.data && response.data.children.length > 0 && response.data.children[0].data.score ? response.data.children[0].data.score : void 0);
  });
}
var RedditShareCount_default = createShareCount(getRedditShareCount);

// node_modules/react-share/es/TelegramIcon.js
var TelegramIcon = createIcon({
  color: "#37aee2",
  networkName: "telegram",
  path: "m45.90873,15.44335c-0.6901,-0.0281 -1.37668,0.14048 -1.96142,0.41265c-0.84989,0.32661 -8.63939,3.33986 -16.5237,6.39174c-3.9685,1.53296 -7.93349,3.06593 -10.98537,4.24067c-3.05012,1.1765 -5.34694,2.05098 -5.4681,2.09312c-0.80775,0.28096 -1.89996,0.63566 -2.82712,1.72788c-0.23354,0.27218 -0.46884,0.62161 -0.58825,1.10275c-0.11941,0.48114 -0.06673,1.09222 0.16682,1.5716c0.46533,0.96052 1.25376,1.35737 2.18443,1.71383c3.09051,0.99037 6.28638,1.93508 8.93263,2.8236c0.97632,3.44171 1.91401,6.89571 2.84116,10.34268c0.30554,0.69185 0.97105,0.94823 1.65764,0.95525l-0.00351,0.03512c0,0 0.53908,0.05268 1.06412,-0.07375c0.52679,-0.12292 1.18879,-0.42846 1.79109,-0.99212c0.662,-0.62161 2.45836,-2.38812 3.47683,-3.38552l7.6736,5.66477l0.06146,0.03512c0,0 0.84989,0.59703 2.09312,0.68132c0.62161,0.04214 1.4399,-0.07726 2.14229,-0.59176c0.70766,-0.51626 1.1765,-1.34683 1.396,-2.29506c0.65673,-2.86224 5.00979,-23.57745 5.75257,-27.00686l-0.02107,0.08077c0.51977,-1.93157 0.32837,-3.70159 -0.87096,-4.74991c-0.60054,-0.52152 -1.2924,-0.7498 -1.98425,-0.77965l0,0.00176zm-0.2072,3.29069c0.04741,0.0439 0.0439,0.0439 0.00351,0.04741c-0.01229,-0.00351 0.14048,0.2072 -0.15804,1.32576l-0.01229,0.04214l-0.00878,0.03863c-0.75858,3.50668 -5.15554,24.40802 -5.74203,26.96472c-0.08077,0.34417 -0.11414,0.31959 -0.09482,0.29852c-0.1756,-0.02634 -0.50045,-0.16506 -0.52679,-0.1756l-13.13468,-9.70175c4.4988,-4.33199 9.09945,-8.25307 13.744,-12.43229c0.8218,-0.41265 0.68483,-1.68573 -0.29852,-1.70681c-1.04305,0.24584 -1.92279,0.99564 -2.8798,1.47502c-5.49971,3.2626 -11.11882,6.13186 -16.55882,9.49279c-2.792,-0.97105 -5.57873,-1.77704 -8.15298,-2.57601c2.2336,-0.89555 4.00889,-1.55579 5.75608,-2.23009c3.05188,-1.1765 7.01687,-2.7042 10.98537,-4.24067c7.94051,-3.06944 15.92667,-6.16346 16.62028,-6.43037l0.05619,-0.02283l0.05268,-0.02283c0.19316,-0.0878 0.30378,-0.09658 0.35471,-0.10009c0,0 -0.01756,-0.05795 -0.00351,-0.04566l-0.00176,0zm-20.91715,22.0638l2.16687,1.60145c-0.93418,0.91311 -1.81743,1.77353 -2.45485,2.38812l0.28798,-3.98957"
});
var TelegramIcon_default = TelegramIcon;

// node_modules/react-share/es/TelegramShareButton.js
function telegramLink(url, _a) {
  var title = _a.title;
  assert(url, "telegram.url");
  return "https://telegram.me/share/url" + objectToGetParams({
    url,
    text: title
  });
}
var TelegramShareButton = createShareButton_default("telegram", telegramLink, function(props) {
  return {
    title: props.title
  };
}, {
  windowWidth: 550,
  windowHeight: 400
});
var TelegramShareButton_default = TelegramShareButton;

// node_modules/react-share/es/TumblrIcon.js
var TumblrIcon = createIcon({
  color: "#2c4762",
  networkName: "tumblr",
  path: "M39.2,41c-0.6,0.3-1.6,0.5-2.4,0.5c-2.4,0.1-2.9-1.7-2.9-3v-9.3h6v-4.5h-6V17c0,0-4.3,0-4.4,0 c-0.1,0-0.2,0.1-0.2,0.2c-0.3,2.3-1.4,6.4-5.9,8.1v3.9h3V39c0,3.4,2.5,8.1,9,8c2.2,0,4.7-1,5.2-1.8L39.2,41z"
});
var TumblrIcon_default = TumblrIcon;

// node_modules/react-share/es/TumblrShareButton.js
function tumblrLink(url, _a) {
  var title = _a.title, caption = _a.caption, tags = _a.tags, posttype = _a.posttype;
  assert(url, "tumblr.url");
  return "https://www.tumblr.com/widgets/share/tool" + objectToGetParams({
    canonicalUrl: url,
    title,
    caption,
    tags,
    posttype
  });
}
var TumblrShareButton = createShareButton_default("tumblr", tumblrLink, function(props) {
  return {
    title: props.title,
    tags: (props.tags || []).join(","),
    caption: props.caption,
    posttype: props.posttype || "link"
  };
}, {
  windowWidth: 660,
  windowHeight: 460
});
var TumblrShareButton_default = TumblrShareButton;

// node_modules/react-share/es/TumblrShareCount.js
var import_jsonp6 = __toESM(require_jsonp());
function getTumblrShareCount(shareUrl, callback) {
  var endpoint = "https://api.tumblr.com/v2/share/stats";
  return (0, import_jsonp6.default)(endpoint + objectToGetParams({
    url: shareUrl
  }), function(err, data) {
    callback(!err && data && data.response ? data.response.note_count : void 0);
  });
}
var TumblrShareCount_default = createShareCount(getTumblrShareCount);

// node_modules/react-share/es/TwitterIcon.js
var TwitterIcon = createIcon({
  color: "#00aced",
  networkName: "twitter",
  path: "M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"
});
var TwitterIcon_default = TwitterIcon;

// node_modules/react-share/es/TwitterShareButton.js
function twitterLink(url, _a) {
  var title = _a.title, via = _a.via, _b = _a.hashtags, hashtags = _b === void 0 ? [] : _b, _c = _a.related, related = _c === void 0 ? [] : _c;
  assert(url, "twitter.url");
  assert(Array.isArray(hashtags), "twitter.hashtags is not an array");
  assert(Array.isArray(related), "twitter.related is not an array");
  return "https://twitter.com/share" + objectToGetParams({
    url,
    text: title,
    via,
    hashtags: hashtags.length > 0 ? hashtags.join(",") : void 0,
    related: related.length > 0 ? related.join(",") : void 0
  });
}
var TwitterShareButton = createShareButton_default("twitter", twitterLink, function(props) {
  return {
    hashtags: props.hashtags,
    title: props.title,
    via: props.via,
    related: props.related
  };
}, {
  windowWidth: 550,
  windowHeight: 400
});
var TwitterShareButton_default = TwitterShareButton;

// node_modules/react-share/es/ViberIcon.js
var ViberIcon = createIcon({
  color: "#7C529E",
  networkName: "viber",
  path: "m31.0,12.3c9.0,0.2 16.4,6.2 18.0,15.2c0.2,1.5 0.3,3.0 0.4,4.6a1.0,1.0 0 0 1 -0.8,1.2l-0.1,0a1.1,1.1 0 0 1 -1.0,-1.2l0,0c-0.0,-1.2 -0.1,-2.5 -0.3,-3.8a16.1,16.1 0 0 0 -13.0,-13.5c-1.0,-0.1 -2.0,-0.2 -3.0,-0.3c-0.6,-0.0 -1.4,-0.1 -1.6,-0.8a1.1,1.1 0 0 1 0.9,-1.2l0.6,0l0.0,-0.0zm10.6,39.2a19.9,19.9 0 0 1 -2.1,-0.6c-6.9,-2.9 -13.2,-6.6 -18.3,-12.2a47.5,47.5 0 0 1 -7.0,-10.7c-0.8,-1.8 -1.6,-3.7 -2.4,-5.6c-0.6,-1.7 0.3,-3.4 1.4,-4.7a11.3,11.3 0 0 1 3.7,-2.8a2.4,2.4 0 0 1 3.0,0.7a39.0,39.0 0 0 1 4.7,6.5a3.1,3.1 0 0 1 -0.8,4.2c-0.3,0.2 -0.6,0.5 -1.0,0.8a3.3,3.3 0 0 0 -0.7,0.7a2.1,2.1 0 0 0 -0.1,1.9c1.7,4.9 4.7,8.7 9.7,10.8a5.0,5.0 0 0 0 2.5,0.6c1.5,-0.1 2.0,-1.8 3.1,-2.7a2.9,2.9 0 0 1 3.5,-0.1c1.1,0.7 2.2,1.4 3.3,2.2a37.8,37.8 0 0 1 3.1,2.4a2.4,2.4 0 0 1 0.7,3.0a10.4,10.4 0 0 1 -4.4,4.8a10.8,10.8 0 0 1 -1.9,0.6c-0.7,-0.2 0.6,-0.2 0,0l0.0,0l0,-0.0zm3.1,-21.4a4.2,4.2 0 0 1 -0.0,0.6a1.0,1.0 0 0 1 -1.9,0.1a2.7,2.7 0 0 1 -0.1,-0.8a10.9,10.9 0 0 0 -1.4,-5.5a10.2,10.2 0 0 0 -4.2,-4.0a12.3,12.3 0 0 0 -3.4,-1.0c-0.5,-0.0 -1.0,-0.1 -1.5,-0.2a0.9,0.9 0 0 1 -0.9,-1.0l0,-0.1a0.9,0.9 0 0 1 0.9,-0.9l0.1,0a14.1,14.1 0 0 1 5.9,1.5a11.9,11.9 0 0 1 6.5,9.3c0,0.1 0.0,0.3 0.0,0.5c0,0.4 0.0,0.9 0.0,1.5l0,0l0.0,0.0zm-5.6,-0.2a1.1,1.1 0 0 1 -1.2,-0.9l0,-0.1a11.3,11.3 0 0 0 -0.2,-1.4a4.0,4.0 0 0 0 -1.5,-2.3a3.9,3.9 0 0 0 -1.2,-0.5c-0.5,-0.1 -1.1,-0.1 -1.6,-0.2a1.0,1.0 0 0 1 -0.8,-1.1l0,0l0,0a1.0,1.0 0 0 1 1.1,-0.8c3.4,0.2 6.0,2.0 6.3,6.2a2.8,2.8 0 0 1 0,0.8a0.8,0.8 0 0 1 -0.8,0.7l0,0l0.0,-0.0z"
});
var ViberIcon_default = ViberIcon;

// node_modules/react-share/es/ViberShareButton.js
function viberLink(url, _a) {
  var title = _a.title, separator = _a.separator;
  assert(url, "viber.url");
  return "viber://forward" + objectToGetParams({
    text: title ? title + separator + url : url
  });
}
var ViberShareButton = createShareButton_default("viber", viberLink, function(props) {
  return {
    title: props.title,
    separator: props.separator || " "
  };
}, {
  windowWidth: 660,
  windowHeight: 460
});
var ViberShareButton_default = ViberShareButton;

// node_modules/react-share/es/VKIcon.js
var VKIcon = createIcon({
  color: "#45668e",
  networkName: "vk",
  path: "M44.94,44.84h-0.2c-2.17-.36-3.66-1.92-4.92-3.37C39.1,40.66,38,38.81,36.7,39c-1.85.3-.93,3.52-1.71,4.9-0.62,1.11-3.29.91-5.12,0.71-5.79-.62-8.75-3.77-11.35-7.14A64.13,64.13,0,0,1,11.6,26a10.59,10.59,0,0,1-1.51-4.49C11,20.7,12.56,21,14.11,21c1.31,0,3.36-.29,4.32.2C19,21.46,19.57,23,20,24a37.18,37.18,0,0,0,3.31,5.82c0.56,0.81,1.41,2.35,2.41,2.14s1.06-2.63,1.1-4.18c0-1.77,0-4-.5-4.9S25,22,24.15,21.47c0.73-1.49,2.72-1.63,5.12-1.63,2,0,4.84-.23,5.62,1.12s0.25,3.85.2,5.71c-0.06,2.09-.41,4.25,1,5.21,1.09-.12,1.68-1.2,2.31-2A28,28,0,0,0,41.72,24c0.44-1,.91-2.65,1.71-3,1.21-.47,3.15-0.1,4.92-0.1,1.46,0,4.05-.41,4.52.61,0.39,0.85-.75,3-1.1,3.57a61.88,61.88,0,0,1-4.12,5.61c-0.58.78-1.78,2-1.71,3.27,0.05,0.94,1,1.67,1.71,2.35a33.12,33.12,0,0,1,3.92,4.18c0.47,0.62,1.5,2,1.4,2.76C52.66,45.81,46.88,44.24,44.94,44.84Z"
});
var VKIcon_default = VKIcon;

// node_modules/react-share/es/VKShareButton.js
function vkLink(url, _a) {
  var title = _a.title, image = _a.image, noParse = _a.noParse, noVkLinks = _a.noVkLinks;
  assert(url, "vk.url");
  return "https://vk.com/share.php" + objectToGetParams({
    url,
    title,
    image,
    noparse: noParse ? 1 : 0,
    no_vk_links: noVkLinks ? 1 : 0
  });
}
var VKShareButton = createShareButton_default("vk", vkLink, function(props) {
  return {
    title: props.title,
    image: props.image,
    noParse: props.noParse,
    noVkLinks: props.noVkLinks
  };
}, {
  windowWidth: 660,
  windowHeight: 460
});
var VKShareButton_default = VKShareButton;

// node_modules/react-share/es/VKShareCount.js
var import_jsonp7 = __toESM(require_jsonp());
function getVKShareCount(shareUrl, callback) {
  if (!window.VK)
    window.VK = {};
  window.VK.Share = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    count: function(index2, count) {
      return window.VK.callbacks[index2](count);
    }
  };
  window.VK.callbacks = [];
  var url = "https://vk.com/share.php";
  var index = window.VK.callbacks.length;
  window.VK.callbacks.push(callback);
  return (0, import_jsonp7.default)(url + objectToGetParams({
    act: "count",
    index,
    url: shareUrl
  }));
}
var VKShareCount_default = createShareCount(getVKShareCount);

// node_modules/react-share/es/WeiboIcon.js
var WeiboIcon = createIcon({
  color: "#CD201F",
  networkName: "weibo",
  path: "M40.9756152,15.0217119 C40.5000732,15.0546301 39.9999314,15.1204666 39.5325878,15.2192213 C38.6634928,15.4085016 38.0977589,16.2643757 38.2863368,17.1284787 C38.4667163,18.0008129 39.3194143,18.5686519 40.1885094,18.3793715 C42.8613908,17.8115326 45.7720411,18.6427174 47.7316073,20.8153207 C49.6911735,22.996153 50.2077122,25.975254 49.3714112,28.5840234 C49.1008441,29.4316684 49.5763861,30.3533789 50.4208857,30.6249537 C51.2653852,30.8965286 52.1754769,30.4192153 52.4542425,29.5715703 C53.6349013,25.9011885 52.9133876,21.7699494 50.1585171,18.7085538 C48.0923641,16.4042776 45.2063093,15.1533848 42.3530505,15.0217119 C41.8775084,14.9970227 41.4511594,14.9887937 40.9756152,15.0217119 Z M27.9227762,19.8277737 C24.9957268,20.140498 20.863421,22.4365431 17.2312548,26.0822378 C13.2711279,30.0571148 11,34.2871065 11,37.9328012 C11,44.9032373 19.8713401,49.125 28.5786978,49.125 C39.9917329,49.125 47.600423,42.4261409 47.600423,37.1427636 C47.600423,33.9496952 44.9603397,32.1638816 42.549827,31.4149913 C41.9594976,31.2339421 41.5167516,31.1434164 41.8283133,30.3616079 C42.5006339,28.66632 42.6236176,27.1932286 41.8939054,26.1480742 C40.5328692,24.1894405 36.7203236,24.2881952 32.448635,26.0822378 C32.448635,26.0822378 31.1203949,26.6912261 31.4647526,25.6213825 C32.1206742,23.4981576 32.0304845,21.712342 31.0056075,20.6836478 C30.2840938,19.9512176 29.2510184,19.6878718 27.9227762,19.8277737 Z M42.0906819,20.6836478 C41.6233383,20.6589586 41.1723917,20.716566 40.7132466,20.8153207 C39.9671353,20.9716828 39.4997917,21.7781784 39.6637721,22.5270687 C39.8277525,23.275959 40.5574647,23.7450433 41.303576,23.5804521 C42.1972686,23.3911718 43.2057485,23.6380596 43.8616701,24.3704897 C44.5175916,25.1029198 44.6733735,26.0657797 44.3864073,26.9381118 C44.1486363,27.6705419 44.5093932,28.4770397 45.2391054,28.7156963 C45.9688176,28.9461239 46.780521,28.5922524 47.0100936,27.8598223 C47.584026,26.0740087 47.2396661,24.0248493 45.8950269,22.5270687 C44.886547,21.4078489 43.4845162,20.7494842 42.0906819,20.6836478 Z M29.496988,29.9665891 C35.3100922,30.1723275 39.9917329,33.0691319 40.3852858,37.0769272 C40.8362324,41.6607904 35.5970585,45.9319315 28.6442899,46.6232144 C21.6915214,47.3144973 15.6488446,44.154347 15.197898,39.5787128 C14.7469514,34.9948495 20.059916,30.7237084 27.004486,30.0324256 C27.8735831,29.950131 28.6688875,29.9336709 29.496988,29.9665891 Z M25.5614586,34.3776322 C23.183744,34.5916017 20.9372116,35.9577073 19.9205332,37.9328012 C18.5348994,40.6238672 19.9041362,43.6029661 23.0689567,44.582284 C26.340366,45.5945202 30.1857056,44.0638213 31.5303448,41.1587879 C32.8503864,38.3195909 31.1613894,35.3734082 27.9227762,34.5751416 C27.1438688,34.3776322 26.356763,34.3035667 25.5614586,34.3776322 Z M24.052839,38.7228388 C24.3316067,38.7310678 24.5857748,38.8215935 24.8399449,38.9203482 C25.8648218,39.3400561 26.1845841,40.4428158 25.5614586,41.4221338 C24.9219361,42.3932227 23.5690963,42.8623069 22.5442194,42.4096807 C21.5357395,41.9652856 21.2487754,40.8542948 21.8882979,39.9078951 C22.3638421,39.2001542 23.2247386,38.7146097 24.052839,38.7228388 Z"
});
var WeiboIcon_default = WeiboIcon;

// node_modules/react-share/es/WeiboShareButton.js
function weiboLink(url, _a) {
  var title = _a.title, image = _a.image;
  assert(url, "weibo.url");
  return "http://service.weibo.com/share/share.php" + objectToGetParams({
    url,
    title,
    pic: image
  });
}
var WeiboShareButton = createShareButton_default("weibo", weiboLink, function(props) {
  return {
    title: props.title,
    image: props.image
  };
}, {
  windowWidth: 660,
  windowHeight: 550,
  windowPosition: "screenCenter"
});
var WeiboShareButton_default = WeiboShareButton;

// node_modules/react-share/es/WhatsappIcon.js
var WhatsappIcon = createIcon({
  color: "#25D366",
  networkName: "whatsapp",
  path: "m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915"
});
var WhatsappIcon_default = WhatsappIcon;

// node_modules/react-share/es/WhatsappShareButton.js
function isMobileOrTablet() {
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}
function whatsappLink(url, _a) {
  var title = _a.title, separator = _a.separator;
  assert(url, "whatsapp.url");
  return "https://" + (isMobileOrTablet() ? "api" : "web") + ".whatsapp.com/send" + objectToGetParams({
    text: title ? title + separator + url : url
  });
}
var WhatsappShareButton = createShareButton_default("whatsapp", whatsappLink, function(props) {
  return {
    title: props.title,
    separator: props.separator || " "
  };
}, {
  windowWidth: 550,
  windowHeight: 400
});
var WhatsappShareButton_default = WhatsappShareButton;

// node_modules/react-share/es/WorkplaceIcon.js
var WorkplaceIcon = createIcon({
  color: "#3b3d4a",
  networkName: "workplace",
  path: "M34.019,10.292c0.21,0.017,0.423,0.034,0.636,0.049 c3.657,0.262,6.976,1.464,9.929,3.635c3.331,2.448,5.635,5.65,6.914,9.584c0.699,2.152,0.983,4.365,0.885,6.623 c-0.136,3.171-1.008,6.13-2.619,8.867c-0.442,0.75-0.908,1.492-1.495,2.141c-0.588,0.651-1.29,1.141-2.146,1.383 c-1.496,0.426-3.247-0.283-3.961-1.642c-0.26-0.494-0.442-1.028-0.654-1.548c-1.156-2.838-2.311-5.679-3.465-8.519 c-0.017-0.042-0.037-0.082-0.065-0.145c-0.101,0.245-0.192,0.472-0.284,0.698c-1.237,3.051-2.475,6.103-3.711,9.155 c-0.466,1.153-1.351,1.815-2.538,2.045c-1.391,0.267-2.577-0.154-3.496-1.247c-0.174-0.209-0.31-0.464-0.415-0.717 c-2.128-5.22-4.248-10.442-6.37-15.665c-0.012-0.029-0.021-0.059-0.036-0.104c0.054-0.003,0.103-0.006,0.15-0.006 c1.498-0.001,2.997,0,4.495-0.004c0.12-0.001,0.176,0.03,0.222,0.146c1.557,3.846,3.117,7.691,4.679,11.536 c0.018,0.046,0.039,0.091,0.067,0.159c0.273-0.673,0.536-1.32,0.797-1.968c1.064-2.627,2.137-5.25,3.19-7.883 c0.482-1.208,1.376-1.917,2.621-2.135c1.454-0.255,2.644,0.257,3.522,1.449c0.133,0.18,0.229,0.393,0.313,0.603 c1.425,3.495,2.848,6.991,4.269,10.488c0.02,0.047,0.04,0.093,0.073,0.172c0.196-0.327,0.385-0.625,0.559-0.935 c0.783-1.397,1.323-2.886,1.614-4.461c0.242-1.312,0.304-2.634,0.187-3.962c-0.242-2.721-1.16-5.192-2.792-7.38 c-2.193-2.939-5.086-4.824-8.673-5.625c-1.553-0.346-3.124-0.405-4.705-0.257c-3.162,0.298-6.036,1.366-8.585,3.258 c-3.414,2.534-5.638,5.871-6.623,10.016c-0.417,1.76-0.546,3.547-0.384,5.348c0.417,4.601,2.359,8.444,5.804,11.517 c2.325,2.073,5.037,3.393,8.094,3.989c1.617,0.317,3.247,0.395,4.889,0.242c1-0.094,1.982-0.268,2.952-0.529 c0.04-0.01,0.081-0.018,0.128-0.028c0,1.526,0,3.047,0,4.586c-0.402,0.074-0.805,0.154-1.21,0.221 c-0.861,0.14-1.728,0.231-2.601,0.258c-0.035,0.002-0.071,0.013-0.108,0.021c-0.493,0-0.983,0-1.476,0 c-0.049-0.007-0.1-0.018-0.149-0.022c-0.315-0.019-0.629-0.033-0.945-0.058c-1.362-0.105-2.702-0.346-4.017-0.716 c-3.254-0.914-6.145-2.495-8.66-4.752c-2.195-1.971-3.926-4.29-5.176-6.963c-1.152-2.466-1.822-5.057-1.993-7.774 c-0.014-0.226-0.033-0.451-0.05-0.676c0-0.502,0-1.003,0-1.504c0.008-0.049,0.02-0.099,0.022-0.148 c0.036-1.025,0.152-2.043,0.338-3.052c0.481-2.616,1.409-5.066,2.8-7.331c2.226-3.625,5.25-6.386,9.074-8.254 c2.536-1.24,5.217-1.947,8.037-2.126c0.23-0.015,0.461-0.034,0.691-0.051C33.052,10.292,33.535,10.292,34.019,10.292z"
});
var WorkplaceIcon_default = WorkplaceIcon;

// node_modules/react-share/es/WorkplaceShareButton.js
function workplaceLink(url, _a) {
  var quote = _a.quote, hashtag = _a.hashtag;
  assert(url, "workplace.url");
  return "https://work.facebook.com/sharer.php" + objectToGetParams({
    u: url,
    quote,
    hashtag
  });
}
var WorkplaceShareButton = createShareButton_default("workplace", workplaceLink, function(props) {
  return {
    quote: props.quote,
    hashtag: props.hashtag
  };
}, {
  windowWidth: 550,
  windowHeight: 400
});
var WorkplaceShareButton_default = WorkplaceShareButton;
export {
  EmailIcon_default as EmailIcon,
  EmailShareButton_default as EmailShareButton,
  FacebookIcon_default as FacebookIcon,
  FacebookMessengerIcon_default as FacebookMessengerIcon,
  FacebookMessengerShareButton_default as FacebookMessengerShareButton,
  FacebookShareButton_default as FacebookShareButton,
  FacebookShareCount_default as FacebookShareCount,
  HatenaIcon_default as HatenaIcon,
  HatenaShareButton_default as HatenaShareButton,
  HatenaShareCount_default as HatenaShareCount,
  InstapaperIcon_default as InstapaperIcon,
  InstapaperShareButton_default as InstapaperShareButton,
  LineIcon_default as LineIcon,
  LineShareButton_default as LineShareButton,
  LinkedinIcon_default as LinkedinIcon,
  LinkedinShareButton_default as LinkedinShareButton,
  LivejournalIcon_default as LivejournalIcon,
  LivejournalShareButton_default as LivejournalShareButton,
  MailruIcon_default as MailruIcon,
  MailruShareButton_default as MailruShareButton,
  OKIcon_default as OKIcon,
  OKShareButton_default as OKShareButton,
  OKShareCount_default as OKShareCount,
  PinterestIcon_default as PinterestIcon,
  PinterestShareButton_default as PinterestShareButton,
  PinterestShareCount_default as PinterestShareCount,
  PocketIcon_default as PocketIcon,
  PocketShareButton_default as PocketShareButton,
  RedditIcon_default as RedditIcon,
  RedditShareButton_default as RedditShareButton,
  RedditShareCount_default as RedditShareCount,
  TelegramIcon_default as TelegramIcon,
  TelegramShareButton_default as TelegramShareButton,
  TumblrIcon_default as TumblrIcon,
  TumblrShareButton_default as TumblrShareButton,
  TumblrShareCount_default as TumblrShareCount,
  TwitterIcon_default as TwitterIcon,
  TwitterShareButton_default as TwitterShareButton,
  VKIcon_default as VKIcon,
  VKShareButton_default as VKShareButton,
  VKShareCount_default as VKShareCount,
  ViberIcon_default as ViberIcon,
  ViberShareButton_default as ViberShareButton,
  WeiboIcon_default as WeiboIcon,
  WeiboShareButton_default as WeiboShareButton,
  WhatsappIcon_default as WhatsappIcon,
  WhatsappShareButton_default as WhatsappShareButton,
  WorkplaceIcon_default as WorkplaceIcon,
  WorkplaceShareButton_default as WorkplaceShareButton
};
//# sourceMappingURL=react-share.js.map
