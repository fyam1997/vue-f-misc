var sn = Object.defineProperty;
var ln = (n, e, t) => e in n ? sn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var L = (n, e, t) => ln(n, typeof e != "symbol" ? e + "" : e, t);
import { ref as cn, watch as un, toRaw as dn, computed as fn, inject as Dt, provide as hn } from "vue";
const st = (n, e) => e.some((t) => n instanceof t);
let Et, St;
function pn() {
  return Et || (Et = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function gn() {
  return St || (St = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const lt = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap();
function mn(n) {
  const e = new Promise((t, i) => {
    const o = () => {
      n.removeEventListener("success", r), n.removeEventListener("error", a);
    }, r = () => {
      t(le(n.result)), o();
    }, a = () => {
      i(n.error), o();
    };
    n.addEventListener("success", r), n.addEventListener("error", a);
  });
  return Ve.set(e, n), e;
}
function vn(n) {
  if (lt.has(n))
    return;
  const e = new Promise((t, i) => {
    const o = () => {
      n.removeEventListener("complete", r), n.removeEventListener("error", a), n.removeEventListener("abort", a);
    }, r = () => {
      t(), o();
    }, a = () => {
      i(n.error || new DOMException("AbortError", "AbortError")), o();
    };
    n.addEventListener("complete", r), n.addEventListener("error", a), n.addEventListener("abort", a);
  });
  lt.set(n, e);
}
let ct = {
  get(n, e, t) {
    if (n instanceof IDBTransaction) {
      if (e === "done")
        return lt.get(n);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return le(n[e]);
  },
  set(n, e, t) {
    return n[e] = t, !0;
  },
  has(n, e) {
    return n instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in n;
  }
};
function Lt(n) {
  ct = n(ct);
}
function bn(n) {
  return gn().includes(n) ? function(...e) {
    return n.apply(ut(this), e), le(this.request);
  } : function(...e) {
    return le(n.apply(ut(this), e));
  };
}
function wn(n) {
  return typeof n == "function" ? bn(n) : (n instanceof IDBTransaction && vn(n), st(n, pn()) ? new Proxy(n, ct) : n);
}
function le(n) {
  if (n instanceof IDBRequest)
    return mn(n);
  if (Ue.has(n))
    return Ue.get(n);
  const e = wn(n);
  return e !== n && (Ue.set(n, e), Ve.set(e, n)), e;
}
const ut = (n) => Ve.get(n);
function yn(n, e, { blocked: t, upgrade: i, blocking: o, terminated: r } = {}) {
  const a = indexedDB.open(n, e), s = le(a);
  return i && a.addEventListener("upgradeneeded", (l) => {
    i(le(a.result), l.oldVersion, l.newVersion, le(a.transaction), l);
  }), t && a.addEventListener("blocked", (l) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    l.oldVersion,
    l.newVersion,
    l
  )), s.then((l) => {
    r && l.addEventListener("close", () => r()), o && l.addEventListener("versionchange", (c) => o(c.oldVersion, c.newVersion, c));
  }).catch(() => {
  }), s;
}
const Dn = ["get", "getKey", "getAll", "getAllKeys", "count"], En = ["put", "add", "delete", "clear"], Je = /* @__PURE__ */ new Map();
function _t(n, e) {
  if (!(n instanceof IDBDatabase && !(e in n) && typeof e == "string"))
    return;
  if (Je.get(e))
    return Je.get(e);
  const t = e.replace(/FromIndex$/, ""), i = e !== t, o = En.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (i ? IDBIndex : IDBObjectStore).prototype) || !(o || Dn.includes(t))
  )
    return;
  const r = async function(a, ...s) {
    const l = this.transaction(a, o ? "readwrite" : "readonly");
    let c = l.store;
    return i && (c = c.index(s.shift())), (await Promise.all([
      c[t](...s),
      o && l.done
    ]))[0];
  };
  return Je.set(e, r), r;
}
Lt((n) => ({
  ...n,
  get: (e, t, i) => _t(e, t) || n.get(e, t, i),
  has: (e, t) => !!_t(e, t) || n.has(e, t)
}));
const Sn = ["continue", "continuePrimaryKey", "advance"], It = {}, dt = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), _n = {
  get(n, e) {
    if (!Sn.includes(e))
      return n[e];
    let t = It[e];
    return t || (t = It[e] = function(...i) {
      dt.set(this, Rt.get(this)[e](...i));
    }), t;
  }
};
async function* In(...n) {
  let e = this;
  if (e instanceof IDBCursor || (e = await e.openCursor(...n)), !e)
    return;
  e = e;
  const t = new Proxy(e, _n);
  for (Rt.set(t, e), Ve.set(t, ut(e)); e; )
    yield t, e = await (dt.get(t) || e.continue()), dt.delete(t);
}
function Tt(n, e) {
  return e === Symbol.asyncIterator && st(n, [IDBIndex, IDBObjectStore, IDBCursor]) || e === "iterate" && st(n, [IDBIndex, IDBObjectStore]);
}
Lt((n) => ({
  ...n,
  get(e, t, i) {
    return Tt(e, t) ? In : n.get(e, t, i);
  },
  has(e, t) {
    return Tt(e, t) || n.has(e, t);
  }
}));
class Tn {
  constructor() {
    L(this, "collectors", []);
    L(this, "lastValue");
  }
  async emit(e) {
    this.lastValue !== e && (this.lastValue = e, this.collectors.forEach((t) => t(e)));
  }
  collect(e) {
    this.collectors.push(e);
  }
  removeObserver(e) {
    this.collectors = this.collectors.filter((t) => t !== e);
  }
}
class Cn extends Tn {
  constructor(e, t, i) {
    super(), this.db = e, this.store = t, this.key = i;
  }
  async emit(e) {
    e === void 0 ? await (await this.db).delete(this.store, this.key) : await (await this.db).put(this.store, e, this.key), await super.emit(e);
  }
  async loadValue() {
    const e = await (await this.db).get(this.store, this.key);
    return await this.emit(e), e;
  }
  async setKey(e) {
    return this.key = e, this.loadValue();
  }
}
function Pn(n) {
  let e;
  return new Promise(async (t) => {
    e || (e = await n()), t(e);
  });
}
var On = /* @__PURE__ */ ((n) => (n.APIConfig = "APIConfig", n))(On || {});
const xn = Pn(() => yn("shared", 1, {
  upgrade(n) {
    n.createObjectStore(
      "APIConfig"
      /* APIConfig */
    );
  }
}));
function _e(n) {
  return new Cn(xn, "APIConfig", n);
}
class Yt {
  constructor(e) {
    L(this, "id", _e("selectedID"));
    L(this, "idList", _e("index"));
    L(this, "config", _e(0));
    this.googleClientID = e;
  }
  async init() {
    if (await this.idList.loadValue() === void 0) {
      const o = Date.now();
      await this.idList.emit([{ id: o, name: "New Config " + o }]);
    }
    let t = await this.id.loadValue();
    t === void 0 && (t = this.idList.lastValue[0].id, await this.id.emit(t)), await this.config.setKey(t) === void 0 && await this.config.emit({ baseURL: "", apiKey: "", model: "" });
  }
}
L(Yt, "KEY", Symbol("APIConfigStore"));
async function jt() {
  return typeof google < "u" ? Promise.resolve() : new Promise((n, e) => {
    const t = document.createElement("script");
    t.addEventListener("load", () => {
      n();
    }), t.addEventListener("error", (i) => {
      e(i);
    }), t.src = "https://accounts.google.com/gsi/client?hl=fr", t.async = !0, t.defer = !0, document.head.appendChild(t);
  });
}
async function Xt(n, e) {
  return new Promise((t, i) => {
    google.accounts.oauth2.initTokenClient({
      client_id: e,
      callback: (r) => t(r.access_token),
      error_callback: i,
      scope: n
    }).requestAccessToken();
  });
}
async function Wt(n) {
  return new Promise((e) => {
    google.accounts.oauth2.revoke(n, () => {
      e();
    });
  });
}
async function An(n, e = "") {
  const t = new URL("https://www.googleapis.com/drive/v3/files");
  t.searchParams.set("spaces", "appDataFolder"), e !== "" && t.searchParams.set("q", e);
  const i = await fetch(t, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${n}`
    }
  });
  return i.ok ? (await i.json()).files.map((r) => ({ id: r.id, name: r.name })) : Promise.reject(i);
}
async function Ht(n, e) {
  const t = await An(n, e);
  if (t.length > 0)
    return t[0].id;
}
async function Nn(n, e) {
  const t = await fetch(`https://www.googleapis.com/drive/v3/files/${n}?alt=media`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${e}`
    }
  });
  return t.ok ? await t.text() : Promise.reject(t);
}
async function Mn({ name: n, content: e, token: t }) {
  const i = {
    name: n,
    mimeType: "text/plain",
    parents: ["appDataFolder"]
  }, o = new FormData();
  o.append("metadata", new Blob([JSON.stringify(i)], { type: "application/json" })), o.append("file", new Blob([e], { type: "text/plain" }));
  const r = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${t}`
    },
    body: o
  });
  return r.ok ? await r.json() : Promise.reject(r);
}
async function Fn({ id: n, name: e, content: t, token: i }) {
  const o = {
    name: e,
    mimeType: "text/plain"
  }, r = new FormData();
  r.append("metadata", new Blob([JSON.stringify(o)], { type: "application/json" })), r.append("file", new Blob([t], { type: "text/plain" }));
  const a = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${n}?uploadType=multipart`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${i}`
    },
    body: r
  });
  return a.ok ? await a.json() : Promise.reject(a);
}
async function di({ id: n, token: e }) {
  const t = await fetch(`https://content.googleapis.com/drive/v3/files/${n}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${e}`
    }
  });
  if (!t.ok)
    return Promise.reject(t);
}
async function Bn(n, e) {
  await jt();
  const t = await Xt("https://www.googleapis.com/auth/drive.appdata", n);
  try {
    const i = await Ht(t, `name='${e}'`);
    return i === void 0 ? void 0 : await Nn(i, t);
  } catch (i) {
    console.error(i);
    return;
  } finally {
    await Wt(t);
  }
}
async function kn(n, e, t) {
  await jt();
  const i = await Xt("https://www.googleapis.com/auth/drive.appdata", n);
  try {
    const o = await Ht(i, `name='${e}'`);
    o ? await Fn({
      id: o,
      name: e,
      content: t,
      token: i
    }) : await Mn({
      name: e,
      content: t,
      token: i
    });
  } catch (o) {
    console.error(o);
  } finally {
    await Wt(i);
  }
}
function qe(n, e, t) {
  const i = cn();
  return i.value = n.lastValue ?? e, n.collect((o) => {
    o === void 0 ? i.value = e : i.value = o;
  }), un(i, async (o) => {
    const r = dn(o);
    await n.emit(r);
  }, t), i;
}
const he = class he {
  constructor(e) {
    L(this, "id");
    L(this, "idList");
    L(this, "config");
    L(this, "selectedIndex");
    this.store = e, this.id = qe(e.id, 0), this.idList = qe(e.idList, [], { deep: !0 }), this.config = qe(e.config, { baseURL: "", apiKey: "", model: "" }, { deep: !0 }), this.selectedIndex = fn(() => this.idList.value.find((i) => i.id == this.id.value) || { id: 0, name: "" });
  }
  async saveBackup() {
    if (!confirm("Will overwrite the previously uploaded configuration."))
      return;
    const e = [], t = this.idList.value;
    for (const o of t) {
      const r = await _e(o.id).loadValue();
      r !== void 0 && e.push({
        index: o,
        config: r
      });
    }
    const i = { configs: e };
    await kn(this.store.googleClientID, "APIConfigs.json", JSON.stringify(i));
  }
  async loadBackup() {
    if (!confirm("Will overwrite the local configuration. New Added config will be kept."))
      return;
    const e = await Bn(this.store.googleClientID, "APIConfigs.json"), t = JSON.parse(e), i = this.idList.value;
    for (const o of t.configs) {
      const r = i.findIndex((a) => a.id === o.index.id);
      r !== -1 ? i[r] = o.index : i.push(o.index), await _e(o.index.id).emit(o.config);
    }
    this.idList.value = i;
  }
  async addConfig() {
    const e = Date.now();
    this.idList.value.push({ id: e, name: "New Config " + e }), await this.selectConfig(e);
  }
  async deleteConfig() {
    const e = this.id.value;
    await this.store.config.emit(void 0);
    const t = this.idList.value, i = t.findIndex((a) => a.id === e);
    t.length === 1 && await this.addConfig(), t.splice(i, 1);
    const o = Math.min(i, t.length - 1), r = t[o].id;
    await this.selectConfig(r);
  }
  async selectConfig(e) {
    this.id.value = e, await this.store.config.setKey(e);
  }
  static injectOrCreate() {
    const e = () => {
      const t = Dt(Yt.KEY);
      if (!t)
        throw new Error("please provide APIConfigStore");
      const i = new he(t);
      return hn(he.KEY, i), i;
    };
    return Dt(he.KEY, e, !0);
  }
};
L(he, "KEY", Symbol("APIConfigViewModel"));
let Ct = he;
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Pt(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(n);
    e && (i = i.filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    })), t.push.apply(t, i);
  }
  return t;
}
function z(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Pt(Object(t), !0).forEach(function(i) {
      Ln(n, i, t[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : Pt(Object(t)).forEach(function(i) {
      Object.defineProperty(n, i, Object.getOwnPropertyDescriptor(t, i));
    });
  }
  return n;
}
function Le(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Le = function(e) {
    return typeof e;
  } : Le = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Le(n);
}
function Ln(n, e, t) {
  return e in n ? Object.defineProperty(n, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[e] = t, n;
}
function U() {
  return U = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
    }
    return n;
  }, U.apply(this, arguments);
}
function Rn(n, e) {
  if (n == null) return {};
  var t = {}, i = Object.keys(n), o, r;
  for (r = 0; r < i.length; r++)
    o = i[r], !(e.indexOf(o) >= 0) && (t[o] = n[o]);
  return t;
}
function Yn(n, e) {
  if (n == null) return {};
  var t = Rn(n, e), i, o;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    for (o = 0; o < r.length; o++)
      i = r[o], !(e.indexOf(i) >= 0) && Object.prototype.propertyIsEnumerable.call(n, i) && (t[i] = n[i]);
  }
  return t;
}
var jn = "1.15.6";
function K(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var J = K(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), xe = K(/Edge/i), Ot = K(/firefox/i), Ie = K(/safari/i) && !K(/chrome/i) && !K(/android/i), mt = K(/iP(ad|od|hone)/i), Gt = K(/chrome/i) && K(/android/i), zt = {
  capture: !1,
  passive: !1
};
function v(n, e, t) {
  n.addEventListener(e, t, !J && zt);
}
function m(n, e, t) {
  n.removeEventListener(e, t, !J && zt);
}
function We(n, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), n)
      try {
        if (n.matches)
          return n.matches(e);
        if (n.msMatchesSelector)
          return n.msMatchesSelector(e);
        if (n.webkitMatchesSelector)
          return n.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function $t(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function W(n, e, t, i) {
  if (n) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? n.parentNode === t && We(n, e) : We(n, e)) || i && n === t)
        return n;
      if (n === t) break;
    } while (n = $t(n));
  }
  return null;
}
var xt = /\s+/g;
function B(n, e, t) {
  if (n && e)
    if (n.classList)
      n.classList[t ? "add" : "remove"](e);
    else {
      var i = (" " + n.className + " ").replace(xt, " ").replace(" " + e + " ", " ");
      n.className = (i + (t ? " " + e : "")).replace(xt, " ");
    }
}
function h(n, e, t) {
  var i = n && n.style;
  if (i) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (t = n.currentStyle), e === void 0 ? t : t[e];
    !(e in i) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), i[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function pe(n, e) {
  var t = "";
  if (typeof n == "string")
    t = n;
  else
    do {
      var i = h(n, "transform");
      i && i !== "none" && (t = i + " " + t);
    } while (!e && (n = n.parentNode));
  var o = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return o && new o(t);
}
function Vt(n, e, t) {
  if (n) {
    var i = n.getElementsByTagName(e), o = 0, r = i.length;
    if (t)
      for (; o < r; o++)
        t(i[o], o);
    return i;
  }
  return [];
}
function G() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function T(n, e, t, i, o) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var r, a, s, l, c, f, d;
    if (n !== window && n.parentNode && n !== G() ? (r = n.getBoundingClientRect(), a = r.top, s = r.left, l = r.bottom, c = r.right, f = r.height, d = r.width) : (a = 0, s = 0, l = window.innerHeight, c = window.innerWidth, f = window.innerHeight, d = window.innerWidth), (e || t) && n !== window && (o = o || n.parentNode, !J))
      do
        if (o && o.getBoundingClientRect && (h(o, "transform") !== "none" || t && h(o, "position") !== "static")) {
          var b = o.getBoundingClientRect();
          a -= b.top + parseInt(h(o, "border-top-width")), s -= b.left + parseInt(h(o, "border-left-width")), l = a + r.height, c = s + r.width;
          break;
        }
      while (o = o.parentNode);
    if (i && n !== window) {
      var D = pe(o || n), w = D && D.a, y = D && D.d;
      D && (a /= y, s /= w, d /= w, f /= y, l = a + f, c = s + d);
    }
    return {
      top: a,
      left: s,
      bottom: l,
      right: c,
      width: d,
      height: f
    };
  }
}
function At(n, e, t) {
  for (var i = te(n, !0), o = T(n)[e]; i; ) {
    var r = T(i)[t], a = void 0;
    if (a = o >= r, !a) return i;
    if (i === G()) break;
    i = te(i, !1);
  }
  return !1;
}
function ge(n, e, t, i) {
  for (var o = 0, r = 0, a = n.children; r < a.length; ) {
    if (a[r].style.display !== "none" && a[r] !== p.ghost && (i || a[r] !== p.dragged) && W(a[r], t.draggable, n, !1)) {
      if (o === e)
        return a[r];
      o++;
    }
    r++;
  }
  return null;
}
function vt(n, e) {
  for (var t = n.lastElementChild; t && (t === p.ghost || h(t, "display") === "none" || e && !We(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function R(n, e) {
  var t = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== p.clone && (!e || We(n, e)) && t++;
  return t;
}
function Nt(n) {
  var e = 0, t = 0, i = G();
  if (n)
    do {
      var o = pe(n), r = o.a, a = o.d;
      e += n.scrollLeft * r, t += n.scrollTop * a;
    } while (n !== i && (n = n.parentNode));
  return [e, t];
}
function Xn(n, e) {
  for (var t in n)
    if (n.hasOwnProperty(t)) {
      for (var i in e)
        if (e.hasOwnProperty(i) && e[i] === n[t][i]) return Number(t);
    }
  return -1;
}
function te(n, e) {
  if (!n || !n.getBoundingClientRect) return G();
  var t = n, i = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var o = h(t);
      if (t.clientWidth < t.scrollWidth && (o.overflowX == "auto" || o.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (o.overflowY == "auto" || o.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body) return G();
        if (i || e) return t;
        i = !0;
      }
    }
  while (t = t.parentNode);
  return G();
}
function Wn(n, e) {
  if (n && e)
    for (var t in e)
      e.hasOwnProperty(t) && (n[t] = e[t]);
  return n;
}
function Ze(n, e) {
  return Math.round(n.top) === Math.round(e.top) && Math.round(n.left) === Math.round(e.left) && Math.round(n.height) === Math.round(e.height) && Math.round(n.width) === Math.round(e.width);
}
var Te;
function Kt(n, e) {
  return function() {
    if (!Te) {
      var t = arguments, i = this;
      t.length === 1 ? n.call(i, t[0]) : n.apply(i, t), Te = setTimeout(function() {
        Te = void 0;
      }, e);
    }
  };
}
function Hn() {
  clearTimeout(Te), Te = void 0;
}
function Ut(n, e, t) {
  n.scrollLeft += e, n.scrollTop += t;
}
function Jt(n) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(n).cloneNode(!0) : t ? t(n).clone(!0)[0] : n.cloneNode(!0);
}
function qt(n, e, t) {
  var i = {};
  return Array.from(n.children).forEach(function(o) {
    var r, a, s, l;
    if (!(!W(o, e.draggable, n, !1) || o.animated || o === t)) {
      var c = T(o);
      i.left = Math.min((r = i.left) !== null && r !== void 0 ? r : 1 / 0, c.left), i.top = Math.min((a = i.top) !== null && a !== void 0 ? a : 1 / 0, c.top), i.right = Math.max((s = i.right) !== null && s !== void 0 ? s : -1 / 0, c.right), i.bottom = Math.max((l = i.bottom) !== null && l !== void 0 ? l : -1 / 0, c.bottom);
    }
  }), i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
var N = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Gn() {
  var n = [], e;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var i = [].slice.call(this.el.children);
        i.forEach(function(o) {
          if (!(h(o, "display") === "none" || o === p.ghost)) {
            n.push({
              target: o,
              rect: T(o)
            });
            var r = z({}, n[n.length - 1].rect);
            if (o.thisAnimationDuration) {
              var a = pe(o, !0);
              a && (r.top -= a.f, r.left -= a.e);
            }
            o.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(i) {
      n.push(i);
    },
    removeAnimationState: function(i) {
      n.splice(Xn(n, {
        target: i
      }), 1);
    },
    animateAll: function(i) {
      var o = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof i == "function" && i();
        return;
      }
      var r = !1, a = 0;
      n.forEach(function(s) {
        var l = 0, c = s.target, f = c.fromRect, d = T(c), b = c.prevFromRect, D = c.prevToRect, w = s.rect, y = pe(c, !0);
        y && (d.top -= y.f, d.left -= y.e), c.toRect = d, c.thisAnimationDuration && Ze(b, d) && !Ze(f, d) && // Make sure animatingRect is on line between toRect & fromRect
        (w.top - d.top) / (w.left - d.left) === (f.top - d.top) / (f.left - d.left) && (l = $n(w, b, D, o.options)), Ze(d, f) || (c.prevFromRect = f, c.prevToRect = d, l || (l = o.options.animation), o.animate(c, w, d, l)), l && (r = !0, a = Math.max(a, l), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, l), c.thisAnimationDuration = l);
      }), clearTimeout(e), r ? e = setTimeout(function() {
        typeof i == "function" && i();
      }, a) : typeof i == "function" && i(), n = [];
    },
    animate: function(i, o, r, a) {
      if (a) {
        h(i, "transition", ""), h(i, "transform", "");
        var s = pe(this.el), l = s && s.a, c = s && s.d, f = (o.left - r.left) / (l || 1), d = (o.top - r.top) / (c || 1);
        i.animatingX = !!f, i.animatingY = !!d, h(i, "transform", "translate3d(" + f + "px," + d + "px,0)"), this.forRepaintDummy = zn(i), h(i, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), h(i, "transform", "translate3d(0,0,0)"), typeof i.animated == "number" && clearTimeout(i.animated), i.animated = setTimeout(function() {
          h(i, "transition", ""), h(i, "transform", ""), i.animated = !1, i.animatingX = !1, i.animatingY = !1;
        }, a);
      }
    }
  };
}
function zn(n) {
  return n.offsetWidth;
}
function $n(n, e, t, i) {
  return Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * i.animation;
}
var ce = [], Qe = {
  initializeByDefault: !0
}, Ae = {
  mount: function(e) {
    for (var t in Qe)
      Qe.hasOwnProperty(t) && !(t in e) && (e[t] = Qe[t]);
    ce.forEach(function(i) {
      if (i.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), ce.push(e);
  },
  pluginEvent: function(e, t, i) {
    var o = this;
    this.eventCanceled = !1, i.cancel = function() {
      o.eventCanceled = !0;
    };
    var r = e + "Global";
    ce.forEach(function(a) {
      t[a.pluginName] && (t[a.pluginName][r] && t[a.pluginName][r](z({
        sortable: t
      }, i)), t.options[a.pluginName] && t[a.pluginName][e] && t[a.pluginName][e](z({
        sortable: t
      }, i)));
    });
  },
  initializePlugins: function(e, t, i, o) {
    ce.forEach(function(s) {
      var l = s.pluginName;
      if (!(!e.options[l] && !s.initializeByDefault)) {
        var c = new s(e, t, e.options);
        c.sortable = e, c.options = e.options, e[l] = c, U(i, c.defaults);
      }
    });
    for (var r in e.options)
      if (e.options.hasOwnProperty(r)) {
        var a = this.modifyOption(e, r, e.options[r]);
        typeof a < "u" && (e.options[r] = a);
      }
  },
  getEventProperties: function(e, t) {
    var i = {};
    return ce.forEach(function(o) {
      typeof o.eventProperties == "function" && U(i, o.eventProperties.call(t[o.pluginName], e));
    }), i;
  },
  modifyOption: function(e, t, i) {
    var o;
    return ce.forEach(function(r) {
      e[r.pluginName] && r.optionListeners && typeof r.optionListeners[t] == "function" && (o = r.optionListeners[t].call(e[r.pluginName], i));
    }), o;
  }
};
function Vn(n) {
  var e = n.sortable, t = n.rootEl, i = n.name, o = n.targetEl, r = n.cloneEl, a = n.toEl, s = n.fromEl, l = n.oldIndex, c = n.newIndex, f = n.oldDraggableIndex, d = n.newDraggableIndex, b = n.originalEvent, D = n.putSortable, w = n.extraEventProperties;
  if (e = e || t && t[N], !!e) {
    var y, Y = e.options, $ = "on" + i.charAt(0).toUpperCase() + i.substr(1);
    window.CustomEvent && !J && !xe ? y = new CustomEvent(i, {
      bubbles: !0,
      cancelable: !0
    }) : (y = document.createEvent("Event"), y.initEvent(i, !0, !0)), y.to = a || t, y.from = s || t, y.item = o || t, y.clone = r, y.oldIndex = l, y.newIndex = c, y.oldDraggableIndex = f, y.newDraggableIndex = d, y.originalEvent = b, y.pullMode = D ? D.lastPutMode : void 0;
    var O = z(z({}, w), Ae.getEventProperties(i, e));
    for (var j in O)
      y[j] = O[j];
    t && t.dispatchEvent(y), Y[$] && Y[$].call(e, y);
  }
}
var Kn = ["evt"], A = function(e, t) {
  var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = i.evt, r = Yn(i, Kn);
  Ae.pluginEvent.bind(p)(e, t, z({
    dragEl: u,
    parentEl: _,
    ghostEl: g,
    rootEl: E,
    nextEl: se,
    lastDownEl: Re,
    cloneEl: S,
    cloneHidden: ee,
    dragStarted: De,
    putSortable: C,
    activeSortable: p.active,
    originalEvent: o,
    oldIndex: fe,
    oldDraggableIndex: Ce,
    newIndex: k,
    newDraggableIndex: Q,
    hideGhostForTarget: tn,
    unhideGhostForTarget: nn,
    cloneNowHidden: function() {
      ee = !0;
    },
    cloneNowShown: function() {
      ee = !1;
    },
    dispatchSortableEvent: function(s) {
      x({
        sortable: t,
        name: s,
        originalEvent: o
      });
    }
  }, r));
};
function x(n) {
  Vn(z({
    putSortable: C,
    cloneEl: S,
    targetEl: u,
    rootEl: E,
    oldIndex: fe,
    oldDraggableIndex: Ce,
    newIndex: k,
    newDraggableIndex: Q
  }, n));
}
var u, _, g, E, se, Re, S, ee, fe, k, Ce, Q, Me, C, de = !1, He = !1, Ge = [], re, X, et, tt, Mt, Ft, De, ue, Pe, Oe = !1, Fe = !1, Ye, P, nt = [], ft = !1, ze = [], Ke = typeof document < "u", Be = mt, Bt = xe || J ? "cssFloat" : "float", Un = Ke && !Gt && !mt && "draggable" in document.createElement("div"), Zt = function() {
  if (Ke) {
    if (J)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
}(), Qt = function(e, t) {
  var i = h(e), o = parseInt(i.width) - parseInt(i.paddingLeft) - parseInt(i.paddingRight) - parseInt(i.borderLeftWidth) - parseInt(i.borderRightWidth), r = ge(e, 0, t), a = ge(e, 1, t), s = r && h(r), l = a && h(a), c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + T(r).width, f = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + T(a).width;
  if (i.display === "flex")
    return i.flexDirection === "column" || i.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (i.display === "grid")
    return i.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && s.float && s.float !== "none") {
    var d = s.float === "left" ? "left" : "right";
    return a && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return r && (s.display === "block" || s.display === "flex" || s.display === "table" || s.display === "grid" || c >= o && i[Bt] === "none" || a && i[Bt] === "none" && c + f > o) ? "vertical" : "horizontal";
}, Jn = function(e, t, i) {
  var o = i ? e.left : e.top, r = i ? e.right : e.bottom, a = i ? e.width : e.height, s = i ? t.left : t.top, l = i ? t.right : t.bottom, c = i ? t.width : t.height;
  return o === s || r === l || o + a / 2 === s + c / 2;
}, qn = function(e, t) {
  var i;
  return Ge.some(function(o) {
    var r = o[N].options.emptyInsertThreshold;
    if (!(!r || vt(o))) {
      var a = T(o), s = e >= a.left - r && e <= a.right + r, l = t >= a.top - r && t <= a.bottom + r;
      if (s && l)
        return i = o;
    }
  }), i;
}, en = function(e) {
  function t(r, a) {
    return function(s, l, c, f) {
      var d = s.options.group.name && l.options.group.name && s.options.group.name === l.options.group.name;
      if (r == null && (a || d))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (a && r === "clone")
        return r;
      if (typeof r == "function")
        return t(r(s, l, c, f), a)(s, l, c, f);
      var b = (a ? s : l).options.group.name;
      return r === !0 || typeof r == "string" && r === b || r.join && r.indexOf(b) > -1;
    };
  }
  var i = {}, o = e.group;
  (!o || Le(o) != "object") && (o = {
    name: o
  }), i.name = o.name, i.checkPull = t(o.pull, !0), i.checkPut = t(o.put), i.revertClone = o.revertClone, e.group = i;
}, tn = function() {
  !Zt && g && h(g, "display", "none");
}, nn = function() {
  !Zt && g && h(g, "display", "");
};
Ke && !Gt && document.addEventListener("click", function(n) {
  if (He)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), He = !1, !1;
}, !0);
var ae = function(e) {
  if (u) {
    e = e.touches ? e.touches[0] : e;
    var t = qn(e.clientX, e.clientY);
    if (t) {
      var i = {};
      for (var o in e)
        e.hasOwnProperty(o) && (i[o] = e[o]);
      i.target = i.rootEl = t, i.preventDefault = void 0, i.stopPropagation = void 0, t[N]._onDragOver(i);
    }
  }
}, Zn = function(e) {
  u && u.parentNode[N]._isOutsideThisEl(e.target);
};
function p(n, e) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = e = U({}, e), n[N] = this;
  var t = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(n.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return Qt(n, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(a, s) {
      a.setData("Text", s.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    // Disabled on Safari: #1571; Enabled on Safari IOS: #2244
    supportPointer: p.supportPointer !== !1 && "PointerEvent" in window && (!Ie || mt),
    emptyInsertThreshold: 5
  };
  Ae.initializePlugins(this, n, t);
  for (var i in t)
    !(i in e) && (e[i] = t[i]);
  en(e);
  for (var o in this)
    o.charAt(0) === "_" && typeof this[o] == "function" && (this[o] = this[o].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Un, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? v(n, "pointerdown", this._onTapStart) : (v(n, "mousedown", this._onTapStart), v(n, "touchstart", this._onTapStart)), this.nativeDraggable && (v(n, "dragover", this), v(n, "dragenter", this)), Ge.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), U(this, Gn());
}
p.prototype = /** @lends Sortable.prototype */
{
  constructor: p,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (ue = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, u) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, i = this.el, o = this.options, r = o.preventOnFilter, a = e.type, s = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (s || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, f = o.filter;
      if (ai(i), !u && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || o.disabled) && !c.isContentEditable && !(!this.nativeDraggable && Ie && l && l.tagName.toUpperCase() === "SELECT") && (l = W(l, o.draggable, i, !1), !(l && l.animated) && Re !== l)) {
        if (fe = R(l), Ce = R(l, o.draggable), typeof f == "function") {
          if (f.call(this, e, l, this)) {
            x({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              toEl: i,
              fromEl: i
            }), A("filter", t, {
              evt: e
            }), r && e.preventDefault();
            return;
          }
        } else if (f && (f = f.split(",").some(function(d) {
          if (d = W(c, d.trim(), i, !1), d)
            return x({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: i,
              toEl: i
            }), A("filter", t, {
              evt: e
            }), !0;
        }), f)) {
          r && e.preventDefault();
          return;
        }
        o.handle && !W(c, o.handle, i, !1) || this._prepareDragStart(e, s, l);
      }
    }
  },
  _prepareDragStart: function(e, t, i) {
    var o = this, r = o.el, a = o.options, s = r.ownerDocument, l;
    if (i && !u && i.parentNode === r) {
      var c = T(i);
      if (E = r, u = i, _ = u.parentNode, se = u.nextSibling, Re = i, Me = a.group, p.dragged = u, re = {
        target: u,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, Mt = re.clientX - c.left, Ft = re.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, u.style["will-change"] = "all", l = function() {
        if (A("delayEnded", o, {
          evt: e
        }), p.eventCanceled) {
          o._onDrop();
          return;
        }
        o._disableDelayedDragEvents(), !Ot && o.nativeDraggable && (u.draggable = !0), o._triggerDragStart(e, t), x({
          sortable: o,
          name: "choose",
          originalEvent: e
        }), B(u, a.chosenClass, !0);
      }, a.ignore.split(",").forEach(function(f) {
        Vt(u, f.trim(), it);
      }), v(s, "dragover", ae), v(s, "mousemove", ae), v(s, "touchmove", ae), a.supportPointer ? (v(s, "pointerup", o._onDrop), !this.nativeDraggable && v(s, "pointercancel", o._onDrop)) : (v(s, "mouseup", o._onDrop), v(s, "touchend", o._onDrop), v(s, "touchcancel", o._onDrop)), Ot && this.nativeDraggable && (this.options.touchStartThreshold = 4, u.draggable = !0), A("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || t) && (!this.nativeDraggable || !(xe || J))) {
        if (p.eventCanceled) {
          this._onDrop();
          return;
        }
        a.supportPointer ? (v(s, "pointerup", o._disableDelayedDrag), v(s, "pointercancel", o._disableDelayedDrag)) : (v(s, "mouseup", o._disableDelayedDrag), v(s, "touchend", o._disableDelayedDrag), v(s, "touchcancel", o._disableDelayedDrag)), v(s, "mousemove", o._delayedDragTouchMoveHandler), v(s, "touchmove", o._delayedDragTouchMoveHandler), a.supportPointer && v(s, "pointermove", o._delayedDragTouchMoveHandler), o._dragStartTimer = setTimeout(l, a.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    u && it(u), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    m(e, "mouseup", this._disableDelayedDrag), m(e, "touchend", this._disableDelayedDrag), m(e, "touchcancel", this._disableDelayedDrag), m(e, "pointerup", this._disableDelayedDrag), m(e, "pointercancel", this._disableDelayedDrag), m(e, "mousemove", this._delayedDragTouchMoveHandler), m(e, "touchmove", this._delayedDragTouchMoveHandler), m(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? v(document, "pointermove", this._onTouchMove) : t ? v(document, "touchmove", this._onTouchMove) : v(document, "mousemove", this._onTouchMove) : (v(u, "dragend", this), v(E, "dragstart", this._onDragStart));
    try {
      document.selection ? je(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (de = !1, E && u) {
      A("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && v(document, "dragover", Zn);
      var i = this.options;
      !e && B(u, i.dragClass, !1), B(u, i.ghostClass, !0), p.active = this, e && this._appendGhost(), x({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (X) {
      this._lastX = X.clientX, this._lastY = X.clientY, tn();
      for (var e = document.elementFromPoint(X.clientX, X.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(X.clientX, X.clientY), e !== t); )
        t = e;
      if (u.parentNode[N]._isOutsideThisEl(e), t)
        do {
          if (t[N]) {
            var i = void 0;
            if (i = t[N]._onDragOver({
              clientX: X.clientX,
              clientY: X.clientY,
              target: e,
              rootEl: t
            }), i && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = $t(t));
      nn();
    }
  },
  _onTouchMove: function(e) {
    if (re) {
      var t = this.options, i = t.fallbackTolerance, o = t.fallbackOffset, r = e.touches ? e.touches[0] : e, a = g && pe(g, !0), s = g && a && a.a, l = g && a && a.d, c = Be && P && Nt(P), f = (r.clientX - re.clientX + o.x) / (s || 1) + (c ? c[0] - nt[0] : 0) / (s || 1), d = (r.clientY - re.clientY + o.y) / (l || 1) + (c ? c[1] - nt[1] : 0) / (l || 1);
      if (!p.active && !de) {
        if (i && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < i)
          return;
        this._onDragStart(e, !0);
      }
      if (g) {
        a ? (a.e += f - (et || 0), a.f += d - (tt || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: f,
          f: d
        };
        var b = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        h(g, "webkitTransform", b), h(g, "mozTransform", b), h(g, "msTransform", b), h(g, "transform", b), et = f, tt = d, X = r;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!g) {
      var e = this.options.fallbackOnBody ? document.body : E, t = T(u, !0, Be, !0, e), i = this.options;
      if (Be) {
        for (P = e; h(P, "position") === "static" && h(P, "transform") === "none" && P !== document; )
          P = P.parentNode;
        P !== document.body && P !== document.documentElement ? (P === document && (P = G()), t.top += P.scrollTop, t.left += P.scrollLeft) : P = G(), nt = Nt(P);
      }
      g = u.cloneNode(!0), B(g, i.ghostClass, !1), B(g, i.fallbackClass, !0), B(g, i.dragClass, !0), h(g, "transition", ""), h(g, "transform", ""), h(g, "box-sizing", "border-box"), h(g, "margin", 0), h(g, "top", t.top), h(g, "left", t.left), h(g, "width", t.width), h(g, "height", t.height), h(g, "opacity", "0.8"), h(g, "position", Be ? "absolute" : "fixed"), h(g, "zIndex", "100000"), h(g, "pointerEvents", "none"), p.ghost = g, e.appendChild(g), h(g, "transform-origin", Mt / parseInt(g.style.width) * 100 + "% " + Ft / parseInt(g.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var i = this, o = e.dataTransfer, r = i.options;
    if (A("dragStart", this, {
      evt: e
    }), p.eventCanceled) {
      this._onDrop();
      return;
    }
    A("setupClone", this), p.eventCanceled || (S = Jt(u), S.removeAttribute("id"), S.draggable = !1, S.style["will-change"] = "", this._hideClone(), B(S, this.options.chosenClass, !1), p.clone = S), i.cloneId = je(function() {
      A("clone", i), !p.eventCanceled && (i.options.removeCloneOnHide || E.insertBefore(S, u), i._hideClone(), x({
        sortable: i,
        name: "clone"
      }));
    }), !t && B(u, r.dragClass, !0), t ? (He = !0, i._loopId = setInterval(i._emulateDragOver, 50)) : (m(document, "mouseup", i._onDrop), m(document, "touchend", i._onDrop), m(document, "touchcancel", i._onDrop), o && (o.effectAllowed = "move", r.setData && r.setData.call(i, o, u)), v(document, "drop", i), h(u, "transform", "translateZ(0)")), de = !0, i._dragStartId = je(i._dragStarted.bind(i, t, e)), v(document, "selectstart", i), De = !0, window.getSelection().removeAllRanges(), Ie && h(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, i = e.target, o, r, a, s = this.options, l = s.group, c = p.active, f = Me === l, d = s.sort, b = C || c, D, w = this, y = !1;
    if (ft) return;
    function Y(ye, rn) {
      A(ye, w, z({
        evt: e,
        isOwner: f,
        axis: D ? "vertical" : "horizontal",
        revert: a,
        dragRect: o,
        targetRect: r,
        canSort: d,
        fromSortable: b,
        target: i,
        completed: O,
        onMove: function(yt, an) {
          return ke(E, t, u, o, yt, T(yt), e, an);
        },
        changed: j
      }, rn));
    }
    function $() {
      Y("dragOverAnimationCapture"), w.captureAnimationState(), w !== b && b.captureAnimationState();
    }
    function O(ye) {
      return Y("dragOverCompleted", {
        insertion: ye
      }), ye && (f ? c._hideClone() : c._showClone(w), w !== b && (B(u, C ? C.options.ghostClass : c.options.ghostClass, !1), B(u, s.ghostClass, !0)), C !== w && w !== p.active ? C = w : w === p.active && C && (C = null), b === w && (w._ignoreWhileAnimating = i), w.animateAll(function() {
        Y("dragOverAnimationComplete"), w._ignoreWhileAnimating = null;
      }), w !== b && (b.animateAll(), b._ignoreWhileAnimating = null)), (i === u && !u.animated || i === t && !i.animated) && (ue = null), !s.dragoverBubble && !e.rootEl && i !== document && (u.parentNode[N]._isOutsideThisEl(e.target), !ye && ae(e)), !s.dragoverBubble && e.stopPropagation && e.stopPropagation(), y = !0;
    }
    function j() {
      k = R(u), Q = R(u, s.draggable), x({
        sortable: w,
        name: "change",
        toEl: t,
        newIndex: k,
        newDraggableIndex: Q,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), i = W(i, s.draggable, t, !0), Y("dragOver"), p.eventCanceled) return y;
    if (u.contains(e.target) || i.animated && i.animatingX && i.animatingY || w._ignoreWhileAnimating === i)
      return O(!1);
    if (He = !1, c && !s.disabled && (f ? d || (a = _ !== E) : C === this || (this.lastPutMode = Me.checkPull(this, c, u, e)) && l.checkPut(this, c, u, e))) {
      if (D = this._getDirection(e, i) === "vertical", o = T(u), Y("dragOverValid"), p.eventCanceled) return y;
      if (a)
        return _ = E, $(), this._hideClone(), Y("revert"), p.eventCanceled || (se ? E.insertBefore(u, se) : E.appendChild(u)), O(!0);
      var M = vt(t, s.draggable);
      if (!M || ni(e, D, this) && !M.animated) {
        if (M === u)
          return O(!1);
        if (M && t === e.target && (i = M), i && (r = T(i)), ke(E, t, u, o, i, r, e, !!i) !== !1)
          return $(), M && M.nextSibling ? t.insertBefore(u, M.nextSibling) : t.appendChild(u), _ = t, j(), O(!0);
      } else if (M && ti(e, D, this)) {
        var ne = ge(t, 0, s, !0);
        if (ne === u)
          return O(!1);
        if (i = ne, r = T(i), ke(E, t, u, o, i, r, e, !1) !== !1)
          return $(), t.insertBefore(u, ne), _ = t, j(), O(!0);
      } else if (i.parentNode === t) {
        r = T(i);
        var H = 0, ie, me = u.parentNode !== t, F = !Jn(u.animated && u.toRect || o, i.animated && i.toRect || r, D), ve = D ? "top" : "left", q = At(i, "top", "top") || At(u, "top", "top"), be = q ? q.scrollTop : void 0;
        ue !== i && (ie = r[ve], Oe = !1, Fe = !F && s.invertSwap || me), H = ii(e, i, r, D, F ? 1 : s.swapThreshold, s.invertedSwapThreshold == null ? s.swapThreshold : s.invertedSwapThreshold, Fe, ue === i);
        var V;
        if (H !== 0) {
          var oe = R(u);
          do
            oe -= H, V = _.children[oe];
          while (V && (h(V, "display") === "none" || V === g));
        }
        if (H === 0 || V === i)
          return O(!1);
        ue = i, Pe = H;
        var we = i.nextElementSibling, Z = !1;
        Z = H === 1;
        var Ne = ke(E, t, u, o, i, r, e, Z);
        if (Ne !== !1)
          return (Ne === 1 || Ne === -1) && (Z = Ne === 1), ft = !0, setTimeout(ei, 30), $(), Z && !we ? t.appendChild(u) : i.parentNode.insertBefore(u, Z ? we : i), q && Ut(q, 0, be - q.scrollTop), _ = u.parentNode, ie !== void 0 && !Fe && (Ye = Math.abs(ie - T(i)[ve])), j(), O(!0);
      }
      if (t.contains(u))
        return O(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    m(document, "mousemove", this._onTouchMove), m(document, "touchmove", this._onTouchMove), m(document, "pointermove", this._onTouchMove), m(document, "dragover", ae), m(document, "mousemove", ae), m(document, "touchmove", ae);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    m(e, "mouseup", this._onDrop), m(e, "touchend", this._onDrop), m(e, "pointerup", this._onDrop), m(e, "pointercancel", this._onDrop), m(e, "touchcancel", this._onDrop), m(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, i = this.options;
    if (k = R(u), Q = R(u, i.draggable), A("drop", this, {
      evt: e
    }), _ = u && u.parentNode, k = R(u), Q = R(u, i.draggable), p.eventCanceled) {
      this._nulling();
      return;
    }
    de = !1, Fe = !1, Oe = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), ht(this.cloneId), ht(this._dragStartId), this.nativeDraggable && (m(document, "drop", this), m(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Ie && h(document.body, "user-select", ""), h(u, "transform", ""), e && (De && (e.cancelable && e.preventDefault(), !i.dropBubble && e.stopPropagation()), g && g.parentNode && g.parentNode.removeChild(g), (E === _ || C && C.lastPutMode !== "clone") && S && S.parentNode && S.parentNode.removeChild(S), u && (this.nativeDraggable && m(u, "dragend", this), it(u), u.style["will-change"] = "", De && !de && B(u, C ? C.options.ghostClass : this.options.ghostClass, !1), B(u, this.options.chosenClass, !1), x({
      sortable: this,
      name: "unchoose",
      toEl: _,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), E !== _ ? (k >= 0 && (x({
      rootEl: _,
      name: "add",
      toEl: _,
      fromEl: E,
      originalEvent: e
    }), x({
      sortable: this,
      name: "remove",
      toEl: _,
      originalEvent: e
    }), x({
      rootEl: _,
      name: "sort",
      toEl: _,
      fromEl: E,
      originalEvent: e
    }), x({
      sortable: this,
      name: "sort",
      toEl: _,
      originalEvent: e
    })), C && C.save()) : k !== fe && k >= 0 && (x({
      sortable: this,
      name: "update",
      toEl: _,
      originalEvent: e
    }), x({
      sortable: this,
      name: "sort",
      toEl: _,
      originalEvent: e
    })), p.active && ((k == null || k === -1) && (k = fe, Q = Ce), x({
      sortable: this,
      name: "end",
      toEl: _,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    A("nulling", this), E = u = _ = g = se = S = Re = ee = re = X = De = k = Q = fe = Ce = ue = Pe = C = Me = p.dragged = p.ghost = p.clone = p.active = null, ze.forEach(function(e) {
      e.checked = !0;
    }), ze.length = et = tt = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        u && (this._onDragOver(e), Qn(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], t, i = this.el.children, o = 0, r = i.length, a = this.options; o < r; o++)
      t = i[o], W(t, a.draggable, this.el, !1) && e.push(t.getAttribute(a.dataIdAttr) || ri(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var i = {}, o = this.el;
    this.toArray().forEach(function(r, a) {
      var s = o.children[a];
      W(s, this.options.draggable, o, !1) && (i[r] = s);
    }, this), t && this.captureAnimationState(), e.forEach(function(r) {
      i[r] && (o.removeChild(i[r]), o.appendChild(i[r]));
    }), t && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, t) {
    return W(e, t || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, t) {
    var i = this.options;
    if (t === void 0)
      return i[e];
    var o = Ae.modifyOption(this, e, t);
    typeof o < "u" ? i[e] = o : i[e] = t, e === "group" && en(i);
  },
  /**
   * Destroy
   */
  destroy: function() {
    A("destroy", this);
    var e = this.el;
    e[N] = null, m(e, "mousedown", this._onTapStart), m(e, "touchstart", this._onTapStart), m(e, "pointerdown", this._onTapStart), this.nativeDraggable && (m(e, "dragover", this), m(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Ge.splice(Ge.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!ee) {
      if (A("hideClone", this), p.eventCanceled) return;
      h(S, "display", "none"), this.options.removeCloneOnHide && S.parentNode && S.parentNode.removeChild(S), ee = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ee) {
      if (A("showClone", this), p.eventCanceled) return;
      u.parentNode == E && !this.options.group.revertClone ? E.insertBefore(S, u) : se ? E.insertBefore(S, se) : E.appendChild(S), this.options.group.revertClone && this.animate(u, S), h(S, "display", ""), ee = !1;
    }
  }
};
function Qn(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function ke(n, e, t, i, o, r, a, s) {
  var l, c = n[N], f = c.options.onMove, d;
  return window.CustomEvent && !J && !xe ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = n, l.dragged = t, l.draggedRect = i, l.related = o || e, l.relatedRect = r || T(e), l.willInsertAfter = s, l.originalEvent = a, n.dispatchEvent(l), f && (d = f.call(c, l, a)), d;
}
function it(n) {
  n.draggable = !1;
}
function ei() {
  ft = !1;
}
function ti(n, e, t) {
  var i = T(ge(t.el, 0, t.options, !0)), o = qt(t.el, t.options, g), r = 10;
  return e ? n.clientX < o.left - r || n.clientY < i.top && n.clientX < i.right : n.clientY < o.top - r || n.clientY < i.bottom && n.clientX < i.left;
}
function ni(n, e, t) {
  var i = T(vt(t.el, t.options.draggable)), o = qt(t.el, t.options, g), r = 10;
  return e ? n.clientX > o.right + r || n.clientY > i.bottom && n.clientX > i.left : n.clientY > o.bottom + r || n.clientX > i.right && n.clientY > i.top;
}
function ii(n, e, t, i, o, r, a, s) {
  var l = i ? n.clientY : n.clientX, c = i ? t.height : t.width, f = i ? t.top : t.left, d = i ? t.bottom : t.right, b = !1;
  if (!a) {
    if (s && Ye < c * o) {
      if (!Oe && (Pe === 1 ? l > f + c * r / 2 : l < d - c * r / 2) && (Oe = !0), Oe)
        b = !0;
      else if (Pe === 1 ? l < f + Ye : l > d - Ye)
        return -Pe;
    } else if (l > f + c * (1 - o) / 2 && l < d - c * (1 - o) / 2)
      return oi(e);
  }
  return b = b || a, b && (l < f + c * r / 2 || l > d - c * r / 2) ? l > f + c / 2 ? 1 : -1 : 0;
}
function oi(n) {
  return R(u) < R(n) ? 1 : -1;
}
function ri(n) {
  for (var e = n.tagName + n.className + n.src + n.href + n.textContent, t = e.length, i = 0; t--; )
    i += e.charCodeAt(t);
  return i.toString(36);
}
function ai(n) {
  ze.length = 0;
  for (var e = n.getElementsByTagName("input"), t = e.length; t--; ) {
    var i = e[t];
    i.checked && ze.push(i);
  }
}
function je(n) {
  return setTimeout(n, 0);
}
function ht(n) {
  return clearTimeout(n);
}
Ke && v(document, "touchmove", function(n) {
  (p.active || de) && n.cancelable && n.preventDefault();
});
p.utils = {
  on: v,
  off: m,
  css: h,
  find: Vt,
  is: function(e, t) {
    return !!W(e, t, e, !1);
  },
  extend: Wn,
  throttle: Kt,
  closest: W,
  toggleClass: B,
  clone: Jt,
  index: R,
  nextTick: je,
  cancelNextTick: ht,
  detectDirection: Qt,
  getChild: ge,
  expando: N
};
p.get = function(n) {
  return n[N];
};
p.mount = function() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(i) {
    if (!i.prototype || !i.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));
    i.utils && (p.utils = z(z({}, p.utils), i.utils)), Ae.mount(i);
  });
};
p.create = function(n, e) {
  return new p(n, e);
};
p.version = jn;
var I = [], Ee, pt, gt = !1, ot, rt, $e, Se;
function si() {
  function n() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return n.prototype = {
    dragStarted: function(t) {
      var i = t.originalEvent;
      this.sortable.nativeDraggable ? v(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? v(document, "pointermove", this._handleFallbackAutoScroll) : i.touches ? v(document, "touchmove", this._handleFallbackAutoScroll) : v(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var i = t.originalEvent;
      !this.options.dragOverBubble && !i.rootEl && this._handleAutoScroll(i);
    },
    drop: function() {
      this.sortable.nativeDraggable ? m(document, "dragover", this._handleAutoScroll) : (m(document, "pointermove", this._handleFallbackAutoScroll), m(document, "touchmove", this._handleFallbackAutoScroll), m(document, "mousemove", this._handleFallbackAutoScroll)), kt(), Xe(), Hn();
    },
    nulling: function() {
      $e = pt = Ee = gt = Se = ot = rt = null, I.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, i) {
      var o = this, r = (t.touches ? t.touches[0] : t).clientX, a = (t.touches ? t.touches[0] : t).clientY, s = document.elementFromPoint(r, a);
      if ($e = t, i || this.options.forceAutoScrollFallback || xe || J || Ie) {
        at(t, this.options, s, i);
        var l = te(s, !0);
        gt && (!Se || r !== ot || a !== rt) && (Se && kt(), Se = setInterval(function() {
          var c = te(document.elementFromPoint(r, a), !0);
          c !== l && (l = c, Xe()), at(t, o.options, c, i);
        }, 10), ot = r, rt = a);
      } else {
        if (!this.options.bubbleScroll || te(s, !0) === G()) {
          Xe();
          return;
        }
        at(t, this.options, te(s, !1), !1);
      }
    }
  }, U(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Xe() {
  I.forEach(function(n) {
    clearInterval(n.pid);
  }), I = [];
}
function kt() {
  clearInterval(Se);
}
var at = Kt(function(n, e, t, i) {
  if (e.scroll) {
    var o = (n.touches ? n.touches[0] : n).clientX, r = (n.touches ? n.touches[0] : n).clientY, a = e.scrollSensitivity, s = e.scrollSpeed, l = G(), c = !1, f;
    pt !== t && (pt = t, Xe(), Ee = e.scroll, f = e.scrollFn, Ee === !0 && (Ee = te(t, !0)));
    var d = 0, b = Ee;
    do {
      var D = b, w = T(D), y = w.top, Y = w.bottom, $ = w.left, O = w.right, j = w.width, M = w.height, ne = void 0, H = void 0, ie = D.scrollWidth, me = D.scrollHeight, F = h(D), ve = D.scrollLeft, q = D.scrollTop;
      D === l ? (ne = j < ie && (F.overflowX === "auto" || F.overflowX === "scroll" || F.overflowX === "visible"), H = M < me && (F.overflowY === "auto" || F.overflowY === "scroll" || F.overflowY === "visible")) : (ne = j < ie && (F.overflowX === "auto" || F.overflowX === "scroll"), H = M < me && (F.overflowY === "auto" || F.overflowY === "scroll"));
      var be = ne && (Math.abs(O - o) <= a && ve + j < ie) - (Math.abs($ - o) <= a && !!ve), V = H && (Math.abs(Y - r) <= a && q + M < me) - (Math.abs(y - r) <= a && !!q);
      if (!I[d])
        for (var oe = 0; oe <= d; oe++)
          I[oe] || (I[oe] = {});
      (I[d].vx != be || I[d].vy != V || I[d].el !== D) && (I[d].el = D, I[d].vx = be, I[d].vy = V, clearInterval(I[d].pid), (be != 0 || V != 0) && (c = !0, I[d].pid = setInterval((function() {
        i && this.layer === 0 && p.active._onTouchMove($e);
        var we = I[this.layer].vy ? I[this.layer].vy * s : 0, Z = I[this.layer].vx ? I[this.layer].vx * s : 0;
        typeof f == "function" && f.call(p.dragged.parentNode[N], Z, we, n, $e, I[this.layer].el) !== "continue" || Ut(I[this.layer].el, Z, we);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (e.bubbleScroll && b !== l && (b = te(b, !1)));
    gt = c;
  }
}, 30), on = function(e) {
  var t = e.originalEvent, i = e.putSortable, o = e.dragEl, r = e.activeSortable, a = e.dispatchSortableEvent, s = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var c = i || r;
    s();
    var f = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, d = document.elementFromPoint(f.clientX, f.clientY);
    l(), c && !c.el.contains(d) && (a("spill"), this.onSpill({
      dragEl: o,
      putSortable: i
    }));
  }
};
function bt() {
}
bt.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, i = e.putSortable;
    this.sortable.captureAnimationState(), i && i.captureAnimationState();
    var o = ge(this.sortable.el, this.startIndex, this.options);
    o ? this.sortable.el.insertBefore(t, o) : this.sortable.el.appendChild(t), this.sortable.animateAll(), i && i.animateAll();
  },
  drop: on
};
U(bt, {
  pluginName: "revertOnSpill"
});
function wt() {
}
wt.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, i = e.putSortable, o = i || this.sortable;
    o.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), o.animateAll();
  },
  drop: on
};
U(wt, {
  pluginName: "removeOnSpill"
});
p.mount(new si());
p.mount(wt, bt);
export {
  Yt as APIConfigStore,
  Ct as APIConfigViewModel,
  Cn as DBDataFlow,
  Tn as SharedFlow,
  On as SharedStore,
  _e as apiConfig,
  Xt as authorizeDrive,
  Pn as cachedDB,
  Mn as createDriveTextFile,
  di as deleteDriveFile,
  Nn as getDriveFile,
  Ht as getDriveFileID,
  Bn as getSimpleDriveFile,
  An as listDriveFiles,
  jt as loadGoogleAuth,
  Wt as logoutToken,
  kn as setSimpleDriveFile,
  Fn as updateDriveTextFile,
  qe as useSharedFlow
};
