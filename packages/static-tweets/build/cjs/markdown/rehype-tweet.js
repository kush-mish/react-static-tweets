"use strict";
exports.__esModule = true;
var url_1 = require("url");
var unist_util_visit_1 = require("unist-util-visit");
var mdast_util_to_string_1 = require("mdast-util-to-string");
var TWITTER_URL = 'https://twitter.com';
var ABSOLUTE_URL = /^https?:\/\/|^\/\//i;
var HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
function visitAnchor(node) {
    if (!node.properties)
        return;
    var href = node.properties.href;
    if (!href)
        return;
    var isAbsoluteUrl = ABSOLUTE_URL.test(href);
    if (!isAbsoluteUrl) {
        node.properties.href = url_1.resolve(TWITTER_URL, href);
    }
}
function rehypeTweet(context) {
    // Nodes may have custom data required by the UI
    function visitData(node) {
        var _a;
        var ctx = context.get(node.properties.dataId);
        if (ctx === null || ctx === void 0 ? void 0 : ctx.data)
            node.data = ctx.data;
        // Add markdown content to the tweet container
        if (ctx === null || ctx === void 0 ? void 0 : ctx.nodes) {
            (_a = node.children).unshift.apply(_a, ctx.nodes);
        }
        delete node.properties.dataId;
    }
    function visitHeading(node) {
        var text = mdast_util_to_string_1.toString(node);
        if (!text)
            return;
        var id = context.slugger.slug(text);
        node.data = { id: id };
    }
    return function transformer(tree) {
        unist_util_visit_1.visit(tree, function (node) { var _a; return (_a = node.properties) === null || _a === void 0 ? void 0 : _a.dataId; }, visitData);
        unist_util_visit_1.visit(tree, function (node) { return node.tagName === 'a'; }, visitAnchor);
        unist_util_visit_1.visit(tree, function (node) { return HEADINGS.includes(node.tagName); }, visitHeading);
    };
}
exports["default"] = rehypeTweet;
//# sourceMappingURL=rehype-tweet.js.map