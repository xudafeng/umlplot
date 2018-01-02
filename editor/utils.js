'use strict';

const utf8bytes = require('utf8-bytes');
const pakoDeflate = require('pako/lib/deflate.js');
const pakoInflate = require('pako/lib/inflate.js');

const encode64 = require('../lib/encode64');
const decode64 = require('../lib/decode64');
const Utf8ArrayToStr = require('../lib/utf8arraytostring');

exports.encode = text => {
  const data = utf8bytes(text);
  const deflated = pakoDeflate.deflate(data, {
    level: 9,
    to: 'string',
    raw: true
  });
  return encode64(deflated);
};

exports.decode = text => {
  var t = decode64(text);
  var inflated = pakoInflate.inflate(t, {
    raw: true
  });
  return Utf8ArrayToStr(inflated);
};

exports.getUrlParams = k => {
  var params = {};
  var url = location.href;
  var idx = url.indexOf('?');

  if (idx > 0) {
    var queryStr = url.substring(idx + 1);
    var args = queryStr.split('&');
    for (var i = 0; i < args.length; i++) {
      var a = args[i];
      var nv = args[i] = a.split('=');
      params[nv[0]] = nv.length > 1 ? nv[1] : true;
    }
  }
  return params[k];
};
