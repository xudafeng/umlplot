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

exports.getHashData = () => {
  var hash = location.hash;
  return hash.split('#data=')[1];
};
