require("./global-leakage.js")
var test = require("tap").test
var glob = require('../')
var sync = require('../sync')
process.chdir(__dirname)

sync.GlobSync.prototype._process = glob.Glob.prototype._process = function () {
  throw new Error('should not call _process() in these tests')
}

test("create glob object without processing", function (t) {
  t.ok(glob('a', {noprocess:true}) instanceof glob.Glob)
  t.ok(sync.GlobSync('a', {noprocess:true}) instanceof sync.GlobSync)
  t.end()
})

test("non-string pattern is evil magic", function (t) {
  var patterns = [ 0, null, 12, {x:1}, undefined, /x/, NaN ]
  patterns.forEach(function (p) {
    t.throws('' + p, function () { glob.hasMagic(p) })
  })
  t.end()
})

test("detect magic in glob patterns", function (t) {
  t.notOk(glob.hasMagic(""), "no magic in ''")
  t.notOk(glob.hasMagic("a/b/c/"), "no magic a/b/c/")
  t.ok(glob.hasMagic("a/b/**/"), "magic in a/b/**/")
  t.ok(glob.hasMagic("a/b/?/"), "magic in a/b/?/")
  t.ok(glob.hasMagic("a/b/+(x|y)"), "magic in a/b/+(x|y)")
  t.notOk(glob.hasMagic("a/b/+(x|y)", {noext:true}), "no magic in a/b/+(x|y) noext")
  t.ok(glob.hasMagic('{a,b}'), 'magic in {a,b}')
  t.notOk(glob.hasMagic('{a,b}', {nobrace:true}), 'magic in {a,b} nobrace:true')
  t.end()
})
