// regression test to make sure that slash-ended patterns
// don't match files when using a different cwd.
var glob = require('../')
var sync = require('../sync')
var test = require('tap').test
var pattern = '../{*.md,test}/'
var expect = [ '../test/' ]
var cwd = __dirname
var opt = { cwd: cwd }
process.chdir(__dirname + '/..')

test('slashes only match directories', function (t) {
  var _sync = sync(pattern, { cwd: cwd })
  t.same(_sync, expect, 'sync test')
  glob(pattern, { cwd: cwd }, function (er, async) {
    if (er)
      throw er
    t.same(async, expect, 'async test')
    t.end()
  })
})
