require("./global-leakage.js")
var test = require('tap').test
var g = require('../')
var sync = require('../sync')
test('sync throws if provided callback', function (t) {
  t.throws(function () {
    sync('*', function() {})
  })
  t.throws(function () {
    sync('*', {}, function() {})
  })

  t.throws(function () {
    sync.GlobSync('*', {}, function() {})
  })

  t.throws(function () {
    sync.GlobSync('*', function() {})
  })

  t.throws(function () {
    sync.GlobSync()
  })

  t.throws(function () {
    sync()
  })

  t.throws(function () {
    g()
  })

  t.throws(function () {
    g.Glob()
  })

  t.end()
})


