var t = require('tap')
var glob = require('../')
var sync = require('../sync')
var path = require('path')
var fixtureDir = path.resolve(__dirname, 'fixtures')

var pattern = 'a*'
var expect = [
  'a',
  'a/abcdef',
  'a/abcfed',
]

if (process.platform !== 'win32')
  expect.push('a/symlink/a', 'a/symlink/a/b/c/a')

t.test('chdir', function (t) {
  var origCwd = process.cwd()
  process.chdir(fixtureDir)
  t.same(sync(pattern, { matchBase: true }), expect)
  glob(pattern, { matchBase: true }, function (er, res) {
    if (er)
      throw er
    t.same(res, expect)
    process.chdir(origCwd)
    t.end()
  })
})

t.test('cwd', function (t) {
  t.same(sync(pattern, { matchBase: true, cwd: fixtureDir }), expect)
  glob(pattern, { matchBase: true, cwd: fixtureDir }, function (er, res) {
    if (er)
      throw er
    t.same(res, expect)
    t.end()
  })
})

t.test('noglobstar', function (t) {
  t.throws(function () {
    glob(pattern, { matchBase:true, noglobstar: true })
  })
  t.throws(function () {
    sync(pattern, { matchBase:true, noglobstar: true })
  })
  t.end()
})
