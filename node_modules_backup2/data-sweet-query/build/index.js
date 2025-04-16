"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __importDefault(require("./main"));
function test() {
    console.log("test new module");
    main_1.default();
}
exports.test = test;
// export default test;
