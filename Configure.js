(function () {
'use strict';

// This is where all the data is stored
var _data = {};

// Read data from `_data`
var read = function (path) {
    var p, r, o;

    if (!path) {
        return _data;
    }

    path = path.split('.');
    o = _data;

    while (path.length > 0) {
        p = path.shift();

        if (typeof o[p] === 'undefined') {
            return null;
        }

        r = o[p];
        o = r || {};
    }

    return r;
};

// Set data in `_data`
var write = function (path, data) {
    var p = null;
    var o = _data;

    path = path.split('.');

    while (path.length > 0) {
        p = path.shift();

        if (path.length <= 0) {
            o[p] = data;
            return true;
        }
        if (typeof o[p] != 'object' || o[p] === null) {
            o[p] = {};
        }

        o = o[p];
    }
};

// Reset `_data`, optionally to another default value
var reset = function (data) {
    _data = typeof data === 'undefined' ? {} : data;
};

// Exposed object
var Configure = {
    read : read,
    write : write,
    reset : reset
};

if (typeof window != 'undefined') {
    window.Configure = Configure;
} else if (typeof exports != 'undefined') {
    exports.Configure = Configure;
}
}());