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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
function getContainerClassName(dataType) {
    if (!dataType)
        return;
    var _a = dataType.split(' '), type = _a[0], count = _a[1];
    switch (type) {
        case 'image-container':
            return "image-container image-count-" + count;
        case 'gif-container':
        case 'video-container':
            return type;
    }
}
export default {
    div: function (props, components, i) {
        var data = props.data;
        var type = props.dataType || (data && data.type);
        if (type === 'tweet') {
            return (React.createElement(components.Tweet, { key: i, data: data }, props.children));
        }
        if (type === 'poll-container') {
            return React.createElement(components.Poll, { key: i, data: data });
        }
        var className = getContainerClassName(type);
        return (React.createElement(components.div, { key: i, className: className, data: data }, props.children));
    },
    img: function (_a, components, i) {
        var dataType = _a.dataType, props = __rest(_a, ["dataType"]);
        if (dataType === 'emoji-for-text') {
            return React.createElement(components.Emoji, { key: i, src: props.src, alt: props.alt });
        }
        if (dataType === 'media-image') {
            return React.createElement(components.img, __assign({ key: i }, props));
        }
        return null;
    },
    a: function (props, components, i) {
        var type = props.dataType;
        if (type === 'mention') {
            return (React.createElement(components.Mention, { key: i, href: props.href, children: props.children }));
        }
        if (type === 'hashtag') {
            return (React.createElement(components.Hashtag, { key: i, href: props.href, children: props.children }));
        }
        if (type === 'cashtag') {
            return (React.createElement(components.Cashtag, { key: i, href: props.href, children: props.children }));
        }
        if (type === 'quote-tweet') {
            return React.createElement(components.EmbeddedTweet, { key: i, href: props.href });
        }
        return (React.createElement(components.a, { key: i, href: props.href, title: props.title }, props.children));
    },
    blockquote: function (props, components, i) {
        var _a, _b;
        if (process.env.NEXT_PUBLIC_TWITTER_LOAD_WIDGETS === 'true') {
            var isEmbeddedTweet = (_a = props.className) === null || _a === void 0 ? void 0 : _a.includes('twitter-tweet');
            if (isEmbeddedTweet) {
                return React.createElement(components.EmbeddedTweet, __assign({}, props));
            }
        }
        else {
            var ast = (_b = props.data) === null || _b === void 0 ? void 0 : _b.ast;
            if (ast) {
                return React.createElement(components.EmbeddedTweet, { key: i, ast: ast[0] });
            }
        }
        return React.createElement(components.Blockquote, { key: i, children: props.children });
    }
};
//# sourceMappingURL=handlers.js.map