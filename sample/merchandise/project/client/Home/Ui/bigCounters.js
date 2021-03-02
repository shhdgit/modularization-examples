"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bigCounters = void 0;

var _reactiveWidget = require("@autonomy/reactive-widget");

// 可以用 Future 来缓存一些跨 widget 的公共数据
const bigCounters = new _reactiveWidget.Future(async scene => {
  const allCounters = await scene.useServices().queryCounters();
  const bigCounters = [];

  for (const counter of allCounters) {
    if (counter.count >= 101) {
      bigCounters.push(counter);
    }
  }

  return bigCounters;
});
exports.bigCounters = bigCounters;