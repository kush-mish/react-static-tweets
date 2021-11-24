"use strict";
exports.__esModule = true;
var hast_util_sanitize_1 = require("hast-util-sanitize");
var githubSchema = hast_util_sanitize_1.defaultSchema;
githubSchema.tagNames.push('video', 'source');
// Allow className for all elements
githubSchema.attributes['*'].push('className');
// Allow specific attributes that are required for the page to render properly
githubSchema.attributes.div = ['dataType', 'dataId'];
githubSchema.attributes.blockquote = ['dataId'];
githubSchema.attributes.img = ['dataType', 'src', 'height', 'width'];
githubSchema.attributes.video = [
    'poster',
    'controls',
    'preload',
    'playsInline',
    'autoPlay',
    'muted',
    'loop'
];
githubSchema.attributes.source = ['src'];
exports["default"] = githubSchema;
//# sourceMappingURL=schema.js.map