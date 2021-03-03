"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreetingWordsGateway = void 0;

var _io = require("@autonomy/io");

class GreetingWordsGateway extends _io.Gateway {
  static async getGreetingWords(scene) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'hello';
  }

}

exports.GreetingWordsGateway = GreetingWordsGateway;