var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import handlers from './handlers';
var defaultHandler = function (name) { return function (props, components) {
    var Comp = components[name];
    return Comp ? React.createElement(Comp, __assign({}, props)) : React.createElement(name, props);
}; };
function handleNode(node, components, i) {
    if (i === void 0) { i = undefined; }
    if (!node) {
        return null;
    }
    if (typeof node === 'string') {
        return node;
    }
    var handler = handlers[node.tag] || defaultHandler(node.tag);
    if (!handler) {
        console.error('tweet error missing handler for:', node);
        return null;
    }
    var nodes = node.nodes;
    var props = __assign(__assign({}, node.props), { key: i });
    // Always send className as a string
    if (props.className && Array.isArray(props.className)) {
        props.className = props.className.join(' ');
    }
    if (node.data) {
        props.data = node.data;
    }
    if (nodes && Array.isArray(nodes)) {
        props.children = nodes.map(function (node, i) { return handleNode(node, components, i); });
    }
    var element = handler(props, components, i, node);
    if (!element) {
        console.error('A handler returned null for:', node);
    }
    return element;
}
export default function Node(_a) {
    var components = _a.components, node = _a.node;
    return handleNode(node, components);
}
//# sourceMappingURL=node.js.map