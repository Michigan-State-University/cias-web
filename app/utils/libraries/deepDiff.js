/* eslint-disable */
!(function(e, t) {
  typeof exports === 'object' && typeof module === 'object'
    ? (module.exports = t())
    : typeof define === 'function' && define.amd
    ? define([], t)
    : typeof exports === 'object'
    ? (exports['return-deep-diff'] = t())
    : (e['return-deep-diff'] = t());
})(this, function() {
  return (function(e) {
    function t(n) {
      if (r[n]) return r[n].exports;
      const o = (r[n] = { exports: {}, id: n, loaded: !1 });
      return e[n].call(o.exports, o, o.exports, t), (o.loaded = !0), o.exports;
    }
    var r = {};
    return (t.m = e), (t.c = r), (t.p = ''), t(0);
  })([
    function(e, t, r) {
      e.exports = r(1);
    },
    function(e, t, r) {
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      const o = r(2);
      const f = n(o);
      e.exports = f.default;
    },
    function(e, t, r) {
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function o(e, t) {
        const r =
          arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if ((typeof e === 'undefined' ? 'undefined' : f(e)) !== 'object')
          throw new TypeError('First parameter must be an object');
        if ((typeof t === 'undefined' ? 'undefined' : f(t)) !== 'object')
          throw new TypeError('Second parameter must be an object');
        const n = {};
        return (
          Object.keys(t).forEach(function(u) {
            return e.hasOwnProperty(u)
              ? e[u] === null || t[u] === null
                ? void (e[u] !== t[u] && (n[u] = t[u]))
                : f(t[u]) === 'object'
                ? t[u] instanceof Array
                  ? void ((0, i.default)(t[u], e[u]) || (n[u] = t[u]))
                  : e[u] instanceof Object
                  ? ((n[u] = o(e[u], t[u], r)),
                    void (n[u] === null && delete n[u]))
                  : void (n[u] = t[u])
                : void (e[u] !== t[u] && (n[u] = t[u]))
              : void (r && (n[u] = t[u]));
          }),
          Object.keys(n).length === 0 ? null : n
        );
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      var f =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                typeof Symbol === 'function' &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            };
      const u = r(3);
      var i = n(u);
      t.default = o;
    },
    function(e, t, r) {
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function o(e, t) {
        if (!(e instanceof Array))
          throw new TypeError('arrayEqual 1st parameter must be an array');
        if (!(t instanceof Array)) return !1;
        if (e.length !== t.length) return !1;
        for (let r = 0, n = e.length; r < n; r++)
          if (e[r] instanceof Array && t[r] instanceof Array) {
            if (!o(e[r], t[r])) return !1;
          } else if (e[r] instanceof Object && t[r] instanceof Object) {
            if ((0, u.default)(e[r], t[r], !0) !== null) return !1;
          } else if (e[r] !== t[r]) return !1;
        return !0;
      }
      Object.defineProperty(t, '__esModule', { value: !0 });
      const f = r(2);
      var u = n(f);
      t.default = o;
    },
  ]);
});
