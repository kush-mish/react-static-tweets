"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetchTweetAst = void 0;
var github_slugger_1 = __importDefault(require("github-slugger"));
var api_1 = require("./twitter/api");
var tweet_html_1 = require("./twitter/embed/tweet-html");
var getTweetHtml_1 = __importDefault(require("./twitter/getTweetHtml"));
var htmlToAst_1 = __importDefault(require("./markdown/htmlToAst"));
var Context = /** @class */ (function () {
    function Context() {
        this.slugger = new github_slugger_1["default"]();
        this.map = [];
    }
    Context.prototype.get = function (id) {
        return this.map[Number(id)];
    };
    Context.prototype.add = function (data, nodes) {
        return this.map.push({ data: data, nodes: nodes }) - 1;
    };
    return Context;
}());
function fetchTweetAst(tweetId) {
    return __awaiter(this, void 0, void 0, function () {
        var tweetHtml, tweet, context, html, ast;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api_1.fetchTweetHtml(tweetId)];
                case 1:
                    tweetHtml = _a.sent();
                    tweet = tweetHtml && tweet_html_1.getTweetData(tweetHtml);
                    if (!tweet)
                        return [2 /*return*/, null];
                    context = new Context();
                    return [4 /*yield*/, getTweetHtml_1["default"](tweet, context)];
                case 2:
                    html = _a.sent();
                    return [4 /*yield*/, htmlToAst_1["default"](html, context)];
                case 3:
                    ast = _a.sent();
                    return [2 /*return*/, ast];
            }
        });
    });
}
exports.fetchTweetAst = fetchTweetAst;
//# sourceMappingURL=fetchTweetAst.js.map