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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Types_1 = require("../../type/Types");
function fetchQueryResultPromise(mySqlQueryConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var source, database, sql, response, header, rows, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    source = mySqlQueryConfig.source, database = mySqlQueryConfig.database, sql = mySqlQueryConfig.sql;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(source.url, {
                            database: database,
                            sql: sql
                        })];
                case 2:
                    response = _a.sent();
                    header = response.data.header;
                    rows = response.data.rows;
                    result = {
                        type: Types_1.QueryType.MYSQL,
                        header: header,
                        rows: rows
                    };
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fetchQueryResultPromise = fetchQueryResultPromise;
function fetchQueryResultMapPromise(mySqlQueryConfigMap) {
    return __awaiter(this, void 0, void 0, function () {
        var responseMap, _a, _b, _i, key, mySqlQueryConfig, _c, _d, error_2;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    responseMap = {};
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, , 7]);
                    _a = [];
                    for (_b in mySqlQueryConfigMap)
                        _a.push(_b);
                    _i = 0;
                    _e.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    key = _a[_i];
                    mySqlQueryConfig = mySqlQueryConfigMap[key];
                    _c = responseMap;
                    _d = key;
                    return [4 /*yield*/, fetchQueryResultPromise(mySqlQueryConfig)];
                case 3:
                    _c[_d] = _e.sent();
                    _e.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _e.sent();
                    throw error_2;
                case 7: return [2 /*return*/, responseMap];
            }
        });
    });
}
exports.fetchQueryResultMapPromise = fetchQueryResultMapPromise;
