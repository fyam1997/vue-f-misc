var ys = Object.defineProperty;
var bs = (e, t, n) => t in e ? ys(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var it = (e, t, n) => bs(e, typeof t != "symbol" ? t + "" : t, n);
import { ref as Z, watch as ee, toRaw as Oe, computed as x, inject as _e, provide as tt, reactive as dn, watchEffect as vt, toRef as D, capitalize as wo, Fragment as Se, shallowRef as U, camelize as Bl, isVNode as ps, Comment as ws, unref as re, warn as Pa, getCurrentInstance as Ss, defineComponent as Aa, h as Va, onBeforeUnmount as yt, readonly as Fl, onScopeDispose as He, effectScope as Ll, TransitionGroup as Ml, Transition as Yt, createVNode as p, mergeProps as K, toRefs as Cs, createElementVNode as C, normalizeStyle as ve, normalizeClass as X, toValue as mt, isRef as ul, onBeforeMount as Ta, nextTick as Be, withDirectives as et, vShow as gn, onMounted as jn, useId as qt, onUpdated as xs, Text as ks, resolveDynamicComponent as Is, toDisplayString as fn, Teleport as Es, onDeactivated as _s, cloneVNode as Ps, createTextVNode as So, useTemplateRef as As, resolveComponent as cl, createElementBlock as ia, openBlock as _n, renderList as Vs, createBlock as Ts, withCtx as wn, normalizeProps as Ds, guardReactiveProps as Os } from "vue";
const dl = (e, t) => t.some((n) => e instanceof n);
let hi, yi;
function Bs() {
  return hi || (hi = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Fs() {
  return yi || (yi = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const fl = /* @__PURE__ */ new WeakMap(), Na = /* @__PURE__ */ new WeakMap(), Da = /* @__PURE__ */ new WeakMap();
function Ls(e) {
  const t = new Promise((n, a) => {
    const l = () => {
      e.removeEventListener("success", i), e.removeEventListener("error", o);
    }, i = () => {
      n(Wt(e.result)), l();
    }, o = () => {
      a(e.error), l();
    };
    e.addEventListener("success", i), e.addEventListener("error", o);
  });
  return Da.set(t, e), t;
}
function Ms(e) {
  if (fl.has(e))
    return;
  const t = new Promise((n, a) => {
    const l = () => {
      e.removeEventListener("complete", i), e.removeEventListener("error", o), e.removeEventListener("abort", o);
    }, i = () => {
      n(), l();
    }, o = () => {
      a(e.error || new DOMException("AbortError", "AbortError")), l();
    };
    e.addEventListener("complete", i), e.addEventListener("error", o), e.addEventListener("abort", o);
  });
  fl.set(e, t);
}
let vl = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done")
        return fl.get(e);
      if (t === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return Wt(e[t]);
  },
  set(e, t, n) {
    return e[t] = n, !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
  }
};
function Co(e) {
  vl = e(vl);
}
function Rs(e) {
  return Fs().includes(e) ? function(...t) {
    return e.apply(ml(this), t), Wt(this.request);
  } : function(...t) {
    return Wt(e.apply(ml(this), t));
  };
}
function Ns(e) {
  return typeof e == "function" ? Rs(e) : (e instanceof IDBTransaction && Ms(e), dl(e, Bs()) ? new Proxy(e, vl) : e);
}
function Wt(e) {
  if (e instanceof IDBRequest)
    return Ls(e);
  if (Na.has(e))
    return Na.get(e);
  const t = Ns(e);
  return t !== e && (Na.set(e, t), Da.set(t, e)), t;
}
const ml = (e) => Da.get(e);
function $s(e, t, { blocked: n, upgrade: a, blocking: l, terminated: i } = {}) {
  const o = indexedDB.open(e, t), r = Wt(o);
  return a && o.addEventListener("upgradeneeded", (s) => {
    a(Wt(o.result), s.oldVersion, s.newVersion, Wt(o.transaction), s);
  }), n && o.addEventListener("blocked", (s) => n(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    s.oldVersion,
    s.newVersion,
    s
  )), r.then((s) => {
    i && s.addEventListener("close", () => i()), l && s.addEventListener("versionchange", (u) => l(u.oldVersion, u.newVersion, u));
  }).catch(() => {
  }), r;
}
const zs = ["get", "getKey", "getAll", "getAllKeys", "count"], js = ["put", "add", "delete", "clear"], $a = /* @__PURE__ */ new Map();
function bi(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if ($a.get(t))
    return $a.get(t);
  const n = t.replace(/FromIndex$/, ""), a = t !== n, l = js.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (a ? IDBIndex : IDBObjectStore).prototype) || !(l || zs.includes(n))
  )
    return;
  const i = async function(o, ...r) {
    const s = this.transaction(o, l ? "readwrite" : "readonly");
    let u = s.store;
    return a && (u = u.index(r.shift())), (await Promise.all([
      u[n](...r),
      l && s.done
    ]))[0];
  };
  return $a.set(t, i), i;
}
Co((e) => ({
  ...e,
  get: (t, n, a) => bi(t, n) || e.get(t, n, a),
  has: (t, n) => !!bi(t, n) || e.has(t, n)
}));
const Hs = ["continue", "continuePrimaryKey", "advance"], pi = {}, gl = /* @__PURE__ */ new WeakMap(), xo = /* @__PURE__ */ new WeakMap(), Ws = {
  get(e, t) {
    if (!Hs.includes(t))
      return e[t];
    let n = pi[t];
    return n || (n = pi[t] = function(...a) {
      gl.set(this, xo.get(this)[t](...a));
    }), n;
  }
};
async function* Gs(...e) {
  let t = this;
  if (t instanceof IDBCursor || (t = await t.openCursor(...e)), !t)
    return;
  t = t;
  const n = new Proxy(t, Ws);
  for (xo.set(n, t), Da.set(n, ml(t)); t; )
    yield n, t = await (gl.get(n) || t.continue()), gl.delete(n);
}
function wi(e, t) {
  return t === Symbol.asyncIterator && dl(e, [IDBIndex, IDBObjectStore, IDBCursor]) || t === "iterate" && dl(e, [IDBIndex, IDBObjectStore]);
}
Co((e) => ({
  ...e,
  get(t, n, a) {
    return wi(t, n) ? Gs : e.get(t, n, a);
  },
  has(t, n) {
    return wi(t, n) || e.has(t, n);
  }
}));
class Ks {
  constructor() {
    it(this, "collectors", []);
    it(this, "lastValue");
  }
  async emit(t) {
    this.lastValue !== t && (this.lastValue = t, this.collectors.forEach((n) => n(t)));
  }
  collect(t) {
    this.collectors.push(t);
  }
  removeObserver(t) {
    this.collectors = this.collectors.filter((n) => n !== t);
  }
}
class Us extends Ks {
  constructor(t, n, a) {
    super(), this.db = t, this.store = n, this.key = a;
  }
  async emit(t) {
    t === void 0 ? await (await this.db).delete(this.store, this.key) : await (await this.db).put(this.store, t, this.key), await super.emit(t);
  }
  async loadValue() {
    const t = await (await this.db).get(this.store, this.key);
    return await this.emit(t), t;
  }
  async setKey(t) {
    return this.key = t, this.loadValue();
  }
}
function Ys(e) {
  let t;
  return new Promise(async (n) => {
    t || (t = await e()), n(t);
  });
}
var Xs = /* @__PURE__ */ ((e) => (e.APIConfig = "APIConfig", e))(Xs || {});
const qs = Ys(() => $s("shared", 1, {
  upgrade(e) {
    e.createObjectStore(
      "APIConfig"
      /* APIConfig */
    );
  }
}));
function Pn(e) {
  return new Us(qs, "APIConfig", e);
}
class ko {
  constructor(t) {
    it(this, "id", Pn("selectedID"));
    it(this, "idList", Pn("index"));
    it(this, "config", Pn(0));
    this.googleClientID = t;
  }
  async init() {
    if (await this.idList.loadValue() === void 0) {
      const l = Date.now();
      await this.idList.emit([{ id: l, name: "New Config " + l }]);
    }
    let n = await this.id.loadValue();
    n === void 0 && (n = this.idList.lastValue[0].id, await this.id.emit(n)), await this.config.setKey(n) === void 0 && await this.config.emit({ baseURL: "", apiKey: "", model: "" });
  }
}
it(ko, "KEY", Symbol("APIConfigStore"));
async function Io() {
  return typeof google < "u" ? Promise.resolve() : new Promise((e, t) => {
    const n = document.createElement("script");
    n.addEventListener("load", () => {
      e();
    }), n.addEventListener("error", (a) => {
      t(a);
    }), n.src = "https://accounts.google.com/gsi/client?hl=fr", n.async = !0, n.defer = !0, document.head.appendChild(n);
  });
}
async function Eo(e, t) {
  return new Promise((n, a) => {
    google.accounts.oauth2.initTokenClient({
      client_id: t,
      callback: (i) => n(i.access_token),
      error_callback: a,
      scope: e
    }).requestAccessToken();
  });
}
async function _o(e) {
  return new Promise((t) => {
    google.accounts.oauth2.revoke(e, () => {
      t();
    });
  });
}
async function Qs(e, t = "") {
  const n = new URL("https://www.googleapis.com/drive/v3/files");
  n.searchParams.set("spaces", "appDataFolder"), t !== "" && n.searchParams.set("q", t);
  const a = await fetch(n, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${e}`
    }
  });
  return a.ok ? (await a.json()).files.map((i) => ({ id: i.id, name: i.name })) : Promise.reject(a);
}
async function Po(e, t) {
  const n = await Qs(e, t);
  if (n.length > 0)
    return n[0].id;
}
async function Js(e, t) {
  const n = await fetch(`https://www.googleapis.com/drive/v3/files/${e}?alt=media`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${t}`
    }
  });
  return n.ok ? await n.text() : Promise.reject(n);
}
async function Zs({ name: e, content: t, token: n }) {
  const a = {
    name: e,
    mimeType: "text/plain",
    parents: ["appDataFolder"]
  }, l = new FormData();
  l.append("metadata", new Blob([JSON.stringify(a)], { type: "application/json" })), l.append("file", new Blob([t], { type: "text/plain" }));
  const i = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${n}`
    },
    body: l
  });
  return i.ok ? await i.json() : Promise.reject(i);
}
async function eu({ id: e, name: t, content: n, token: a }) {
  const l = {
    name: t,
    mimeType: "text/plain"
  }, i = new FormData();
  i.append("metadata", new Blob([JSON.stringify(l)], { type: "application/json" })), i.append("file", new Blob([n], { type: "text/plain" }));
  const o = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${e}?uploadType=multipart`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${a}`
    },
    body: i
  });
  return o.ok ? await o.json() : Promise.reject(o);
}
async function Jf({ id: e, token: t }) {
  const n = await fetch(`https://content.googleapis.com/drive/v3/files/${e}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${t}`
    }
  });
  if (!n.ok)
    return Promise.reject(n);
}
async function tu(e, t) {
  await Io();
  const n = await Eo("https://www.googleapis.com/auth/drive.appdata", e);
  try {
    const a = await Po(n, `name='${t}'`);
    return a === void 0 ? void 0 : await Js(a, n);
  } catch (a) {
    console.error(a);
    return;
  } finally {
    await _o(n);
  }
}
async function nu(e, t, n) {
  await Io();
  const a = await Eo("https://www.googleapis.com/auth/drive.appdata", e);
  try {
    const l = await Po(a, `name='${t}'`);
    l ? await eu({
      id: l,
      name: t,
      content: n,
      token: a
    }) : await Zs({
      name: t,
      content: n,
      token: a
    });
  } catch (l) {
    console.error(l);
  } finally {
    await _o(a);
  }
}
function za(e, t, n) {
  const a = Z();
  return a.value = e.lastValue ?? t, e.collect((l) => {
    l === void 0 ? a.value = t : a.value = l;
  }), ee(a, async (l) => {
    const i = Oe(l);
    await e.emit(i);
  }, n), a;
}
const un = class un {
  constructor(t) {
    it(this, "id");
    it(this, "idList");
    it(this, "config");
    it(this, "selectedIndex");
    this.store = t, this.id = za(t.id, 0), this.idList = za(t.idList, [], { deep: !0 }), this.config = za(t.config, { baseURL: "", apiKey: "", model: "" }, { deep: !0 }), this.selectedIndex = x(() => this.idList.value.find((a) => a.id == this.id.value) || { id: 0, name: "" });
  }
  async saveBackup() {
    if (!confirm("Will overwrite the previously uploaded configuration."))
      return;
    const t = [], n = this.idList.value;
    for (const l of n) {
      const i = await Pn(l.id).loadValue();
      i !== void 0 && t.push({
        index: l,
        config: i
      });
    }
    const a = { configs: t };
    await nu(this.store.googleClientID, "APIConfigs.json", JSON.stringify(a));
  }
  async loadBackup() {
    if (!confirm("Will overwrite the local configuration. New Added config will be kept."))
      return;
    const t = await tu(this.store.googleClientID, "APIConfigs.json"), n = JSON.parse(t), a = this.idList.value;
    for (const l of n.configs) {
      const i = a.findIndex((o) => o.id === l.index.id);
      i !== -1 ? a[i] = l.index : a.push(l.index), await Pn(l.index.id).emit(l.config);
    }
    this.idList.value = a;
  }
  async addConfig() {
    const t = Date.now();
    this.idList.value.push({ id: t, name: "New Config " + t }), await this.selectConfig(t);
  }
  async deleteConfig() {
    const t = this.id.value;
    await this.store.config.emit(void 0);
    const n = this.idList.value, a = n.findIndex((o) => o.id === t);
    n.length === 1 && await this.addConfig(), n.splice(a, 1);
    const l = Math.min(a, n.length - 1), i = n[l].id;
    await this.selectConfig(i);
  }
  async selectConfig(t) {
    this.id.value = t, await this.store.config.setKey(t);
  }
  static injectOrCreate() {
    const t = () => {
      const n = _e(ko.KEY);
      if (!n)
        throw new Error("please provide APIConfigStore");
      const a = new un(n);
      return tt(un.KEY, a), a;
    };
    return _e(un.KEY, t, !0);
  }
};
it(un, "KEY", Symbol("APIConfigViewModel"));
let hl = un;
function M(e, t) {
  return (n) => Object.keys(e).reduce((a, l) => {
    const o = typeof e[l] == "object" && e[l] != null && !Array.isArray(e[l]) ? e[l] : {
      type: e[l]
    };
    return n && l in n ? a[l] = {
      ...o,
      default: n[l]
    } : a[l] = o, t && !a[l].source && (a[l].source = t), a;
  }, {});
}
const de = M({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), Pe = typeof window < "u", Rl = Pe && "IntersectionObserver" in window;
function Si(e, t, n) {
  au(e, t), t.set(e, n);
}
function au(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Ci(e, t, n) {
  return e.set(Ao(e, t), n), n;
}
function Ct(e, t) {
  return e.get(Ao(e, t));
}
function Ao(e, t, n) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function Vo(e, t, n) {
  const a = t.length - 1;
  if (a < 0) return e === void 0 ? n : e;
  for (let l = 0; l < a; l++) {
    if (e == null)
      return n;
    e = e[t[l]];
  }
  return e == null || e[t[a]] === void 0 ? n : e[t[a]];
}
function Ze(e, t) {
  if (e === t) return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((a) => Ze(e[a], t[a]));
}
function lu(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Vo(e, t.split("."), n));
}
function rt(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const l = t(e, n);
    return typeof l > "u" ? n : l;
  }
  if (typeof t == "string") return lu(e, t, n);
  if (Array.isArray(t)) return Vo(e, t, n);
  if (typeof t != "function") return n;
  const a = t(e, n);
  return typeof a > "u" ? n : a;
}
function le(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (e == null || e === "")
    return;
  const n = Number(e);
  return isNaN(n) ? String(e) : isFinite(n) ? `${n}${t}` : void 0;
}
function yl(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function xi(e) {
  let t;
  return e !== null && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || t === null);
}
function To(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const bl = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
function ja(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function Oa(e, t) {
  const n = {};
  for (const a of t)
    Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
  return n;
}
function ki(e, t, n) {
  const a = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  for (const i in e)
    t.some((o) => o instanceof RegExp ? o.test(i) : o === i) ? a[i] = e[i] : l[i] = e[i];
  return [a, l];
}
function Qt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((a) => delete n[a]), n;
}
const Do = /^on[^a-z]/, Oo = (e) => Do.test(e), iu = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"], ou = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Enter", "Escape", "Tab", " "];
function ru(e) {
  return e.isComposing && ou.includes(e.key);
}
function Bo(e) {
  const [t, n] = ki(e, [Do]), a = Qt(t, iu), [l, i] = ki(n, ["class", "style", "id", /^data-/]);
  return Object.assign(l, t), Object.assign(i, a), [l, i];
}
function Ke(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function su(e, t) {
  let n = 0;
  const a = function() {
    for (var l = arguments.length, i = new Array(l), o = 0; o < l; o++)
      i[o] = arguments[o];
    clearTimeout(n), n = setTimeout(() => e(...i), re(t));
  };
  return a.clear = () => {
    clearTimeout(n);
  }, a.immediate = e, a;
}
function ct(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Ii(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function uu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let a = 0;
  for (; a < e.length; )
    n.push(e.substr(a, t)), a += t;
  return n;
}
function xt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const a = {};
  for (const l in e)
    a[l] = e[l];
  for (const l in t) {
    const i = e[l], o = t[l];
    if (xi(i) && xi(o)) {
      a[l] = xt(i, o, n);
      continue;
    }
    if (n && Array.isArray(i) && Array.isArray(o)) {
      a[l] = n(i, o);
      continue;
    }
    a[l] = o;
  }
  return a;
}
function Fo(e) {
  return e.map((t) => t.type === Se ? Fo(t.children) : t).flat();
}
function Gt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Gt.cache.has(e)) return Gt.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Gt.cache.set(e, t), t;
}
Gt.cache = /* @__PURE__ */ new Map();
function Cn(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => Cn(e, n)).flat(1);
  if (t.suspense)
    return Cn(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => Cn(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Cn(e, t.component.subTree).flat(1);
  }
  return [];
}
var en = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new WeakMap();
class cu {
  constructor(t) {
    Si(this, en, []), Si(this, $t, 0), this.size = t;
  }
  get isFull() {
    return Ct(en, this).length === this.size;
  }
  push(t) {
    Ct(en, this)[Ct($t, this)] = t, Ci($t, this, (Ct($t, this) + 1) % this.size);
  }
  values() {
    return Ct(en, this).slice(Ct($t, this)).concat(Ct(en, this).slice(0, Ct($t, this)));
  }
  clear() {
    Ct(en, this).length = 0, Ci($t, this, 0);
  }
}
function Nl(e) {
  const t = dn({});
  vt(() => {
    const a = e();
    for (const l in a)
      t[l] = a[l];
  }, {
    flush: "sync"
  });
  const n = {};
  for (const a in t)
    n[a] = D(() => t[a]);
  return n;
}
function va(e, t) {
  return e.includes(t);
}
function Lo(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Ue = () => [Function, Array];
function Ei(e, t) {
  return t = "on" + wo(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Mo(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  if (Array.isArray(e))
    for (const l of e)
      l(...n);
  else typeof e == "function" && e(...n);
}
function Fn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((a) => `${a}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Ro(e, t, n) {
  let a, l = e.indexOf(document.activeElement);
  const i = t === "next" ? 1 : -1;
  do
    l += i, a = e[l];
  while ((!a || a.offsetParent == null || !((n == null ? void 0 : n(a)) ?? !0)) && l < e.length && l >= 0);
  return a;
}
function An(e, t) {
  var a, l, i, o;
  const n = Fn(e);
  if (t == null)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((a = n[0]) == null || a.focus());
  else if (t === "first")
    (l = n[0]) == null || l.focus();
  else if (t === "last")
    (i = n.at(-1)) == null || i.focus();
  else if (typeof t == "number")
    (o = n[t]) == null || o.focus();
  else {
    const r = Ro(n, t);
    r ? r.focus() : An(e, t === "next" ? "first" : "last");
  }
}
function du() {
}
function ma(e, t) {
  if (!(Pe && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function $l(e) {
  return e.some((t) => ps(t) ? t.type === ws ? !1 : t.type !== Se || $l(t.children) : !0) ? e : null;
}
function fu(e, t) {
  if (!Pe || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function vu(e, t) {
  const n = e.clientX, a = e.clientY, l = t.getBoundingClientRect(), i = l.left, o = l.top, r = l.right, s = l.bottom;
  return n >= i && n <= r && a >= o && a <= s;
}
function pl() {
  const e = U(), t = (n) => {
    e.value = n;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (n) => e.value = n
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => To(e.value)
  }), t;
}
function ga(e) {
  const t = e.key.length === 1, n = !e.ctrlKey && !e.metaKey && !e.altKey;
  return t && n;
}
function wl(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "bigint";
}
function mu(e) {
  const t = {};
  for (const n in e)
    t[Bl(n)] = e[n];
  return t;
}
function gu(e) {
  const t = ["checked", "disabled"];
  return Object.fromEntries(Object.entries(e).filter((n) => {
    let [a, l] = n;
    return t.includes(a) ? !!l : l !== void 0;
  }));
}
const No = ["top", "bottom"], hu = ["start", "end", "left", "right"];
function Sl(e, t) {
  let [n, a] = e.split(" ");
  return a || (a = va(No, n) ? "start" : va(hu, n) ? "top" : "center"), {
    side: _i(n, t),
    align: _i(a, t)
  };
}
function _i(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function Ha(e) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.side],
    align: e.align
  };
}
function Wa(e) {
  return {
    side: e.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.align]
  };
}
function Pi(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Ai(e) {
  return va(No, e.side) ? "y" : "x";
}
class dt {
  constructor(t) {
    let {
      x: n,
      y: a,
      width: l,
      height: i
    } = t;
    this.x = n, this.y = a, this.width = l, this.height = i;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function Vi(e, t) {
  return {
    x: {
      before: Math.max(0, t.left - e.left),
      after: Math.max(0, e.right - t.right)
    },
    y: {
      before: Math.max(0, t.top - e.top),
      after: Math.max(0, e.bottom - t.bottom)
    }
  };
}
function $o(e) {
  return Array.isArray(e) ? new dt({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function yu(e) {
  if (e === document.documentElement)
    return visualViewport ? new dt({
      x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
      y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
      width: visualViewport.width * visualViewport.scale,
      height: visualViewport.height * visualViewport.scale
    }) : new dt({
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  {
    const t = e.getBoundingClientRect();
    return new dt({
      x: t.x,
      y: t.y,
      width: e.clientWidth,
      height: e.clientHeight
    });
  }
}
function zl(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), a = n.transform;
  if (a) {
    let l, i, o, r, s;
    if (a.startsWith("matrix3d("))
      l = a.slice(9, -1).split(/, /), i = Number(l[0]), o = Number(l[5]), r = Number(l[12]), s = Number(l[13]);
    else if (a.startsWith("matrix("))
      l = a.slice(7, -1).split(/, /), i = Number(l[0]), o = Number(l[3]), r = Number(l[4]), s = Number(l[5]);
    else
      return new dt(t);
    const u = n.transformOrigin, c = t.x - r - (1 - i) * parseFloat(u), d = t.y - s - (1 - o) * parseFloat(u.slice(u.indexOf(" ") + 1)), m = i ? t.width / i : e.offsetWidth + 1, v = o ? t.height / o : e.offsetHeight + 1;
    return new dt({
      x: c,
      y: d,
      width: m,
      height: v
    });
  } else
    return new dt(t);
}
function on(e, t, n) {
  if (typeof e.animate > "u") return {
    finished: Promise.resolve()
  };
  let a;
  try {
    a = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof a.finished > "u" && (a.finished = new Promise((l) => {
    a.onfinish = () => {
      l(a);
    };
  })), a;
}
const oa = /* @__PURE__ */ new WeakMap();
function bu(e, t) {
  Object.keys(t).forEach((n) => {
    if (Oo(n)) {
      const a = Lo(n), l = oa.get(e);
      if (t[n] == null)
        l == null || l.forEach((i) => {
          const [o, r] = i;
          o === a && (e.removeEventListener(a, r), l.delete(i));
        });
      else if (!l || ![...l].some((i) => i[0] === a && i[1] === t[n])) {
        e.addEventListener(a, t[n]);
        const i = l || /* @__PURE__ */ new Set();
        i.add([a, t[n]]), oa.has(e) || oa.set(e, i);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function pu(e, t) {
  Object.keys(t).forEach((n) => {
    if (Oo(n)) {
      const a = Lo(n), l = oa.get(e);
      l == null || l.forEach((i) => {
        const [o, r] = i;
        o === a && (e.removeEventListener(a, r), l.delete(i));
      });
    } else
      e.removeAttribute(n);
  });
}
const tn = 2.4, Ti = 0.2126729, Di = 0.7151522, Oi = 0.072175, wu = 0.55, Su = 0.58, Cu = 0.57, xu = 0.62, Jn = 0.03, Bi = 1.45, ku = 5e-4, Iu = 1.25, Eu = 1.25, Fi = 0.078, Li = 12.82051282051282, Zn = 0.06, Mi = 1e-3;
function Ri(e, t) {
  const n = (e.r / 255) ** tn, a = (e.g / 255) ** tn, l = (e.b / 255) ** tn, i = (t.r / 255) ** tn, o = (t.g / 255) ** tn, r = (t.b / 255) ** tn;
  let s = n * Ti + a * Di + l * Oi, u = i * Ti + o * Di + r * Oi;
  if (s <= Jn && (s += (Jn - s) ** Bi), u <= Jn && (u += (Jn - u) ** Bi), Math.abs(u - s) < ku) return 0;
  let c;
  if (u > s) {
    const d = (u ** wu - s ** Su) * Iu;
    c = d < Mi ? 0 : d < Fi ? d - d * Li * Zn : d - Zn;
  } else {
    const d = (u ** xu - s ** Cu) * Eu;
    c = d > -Mi ? 0 : d > -Fi ? d - d * Li * Zn : d + Zn;
  }
  return c * 100;
}
function Kt(e) {
  Pa(`Vuetify: ${e}`);
}
function zo(e) {
  Pa(`Vuetify error: ${e}`);
}
function _u(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, Pa(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
function Cl(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Pu(e) {
  return Cl(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Ni = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Au = {
  rgb: (e, t, n, a) => ({
    r: e,
    g: t,
    b: n,
    a
  }),
  rgba: (e, t, n, a) => ({
    r: e,
    g: t,
    b: n,
    a
  }),
  hsl: (e, t, n, a) => $i({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsla: (e, t, n, a) => $i({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsv: (e, t, n, a) => Ln({
    h: e,
    s: t,
    v: n,
    a
  }),
  hsva: (e, t, n, a) => Ln({
    h: e,
    s: t,
    v: n,
    a
  })
};
function xn(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && Kt(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Ni.test(e)) {
    const {
      groups: t
    } = e.match(Ni), {
      fn: n,
      values: a
    } = t, l = a.split(/,\s*|\s*\/\s*|\s+/).map((i, o) => i.endsWith("%") || // unitless slv are %
    o > 0 && o < 3 && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(i) / 100 : parseFloat(i));
    return Au[n](...l);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((a) => a + a).join("") : [6, 8].includes(t.length) || Kt(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && Kt(`'${e}' is not a valid hex(a) color`), Vu(t);
  } else if (typeof e == "object") {
    if (ja(e, ["r", "g", "b"]))
      return e;
    if (ja(e, ["h", "s", "l"]))
      return Ln(jo(e));
    if (ja(e, ["h", "s", "v"]))
      return Ln(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Ln(e) {
  const {
    h: t,
    s: n,
    v: a,
    a: l
  } = e, i = (r) => {
    const s = (r + t / 60) % 6;
    return a - a * n * Math.max(Math.min(s, 4 - s, 1), 0);
  }, o = [i(5), i(3), i(1)].map((r) => Math.round(r * 255));
  return {
    r: o[0],
    g: o[1],
    b: o[2],
    a: l
  };
}
function $i(e) {
  return Ln(jo(e));
}
function jo(e) {
  const {
    h: t,
    s: n,
    l: a,
    a: l
  } = e, i = a + n * Math.min(a, 1 - a), o = i === 0 ? 0 : 2 - 2 * a / i;
  return {
    h: t,
    s: o,
    v: i,
    a: l
  };
}
function Vu(e) {
  e = Tu(e);
  let [t, n, a, l] = uu(e, 2).map((i) => parseInt(i, 16));
  return l = l === void 0 ? l : l / 255, {
    r: t,
    g: n,
    b: a,
    a: l
  };
}
function Tu(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Ii(Ii(e, 6), 8, "F")), e;
}
function Du(e) {
  const t = Math.abs(Ri(xn(0), xn(e)));
  return Math.abs(Ri(xn(16777215), xn(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function Le(e, t) {
  const n = Ss();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function bt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Le(e).type;
  return Gt((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
function Ou(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Le("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const ha = Symbol.for("vuetify:defaults");
function jl() {
  const e = _e(ha);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function hn(e, t) {
  const n = jl(), a = Z(e), l = x(() => {
    if (re(t == null ? void 0 : t.disabled)) return n.value;
    const o = re(t == null ? void 0 : t.scoped), r = re(t == null ? void 0 : t.reset), s = re(t == null ? void 0 : t.root);
    if (a.value == null && !(o || r || s)) return n.value;
    let u = xt(a.value, {
      prev: n.value
    });
    if (o) return u;
    if (r || s) {
      const c = Number(r || 1 / 0);
      for (let d = 0; d <= c && !(!u || !("prev" in u)); d++)
        u = u.prev;
      return u && typeof s == "string" && s in u && (u = xt(xt(u, {
        prev: u
      }), u[s])), u;
    }
    return u.prev ? xt(u.prev, u) : u;
  });
  return tt(ha, l), l;
}
function Bu(e, t) {
  return e.props && (typeof e.props[t] < "u" || typeof e.props[Gt(t)] < "u");
}
function Fu() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : jl();
  const a = Le("useDefaults");
  if (t = t ?? a.type.name ?? a.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const l = x(() => {
    var s;
    return (s = n.value) == null ? void 0 : s[e._as ?? t];
  }), i = new Proxy(e, {
    get(s, u) {
      var v, g, f, h;
      const c = Reflect.get(s, u);
      if (u === "class" || u === "style")
        return [(v = l.value) == null ? void 0 : v[u], c].filter((b) => b != null);
      if (Bu(a.vnode, u)) return c;
      const d = (g = l.value) == null ? void 0 : g[u];
      if (d !== void 0) return d;
      const m = (h = (f = n.value) == null ? void 0 : f.global) == null ? void 0 : h[u];
      return m !== void 0 ? m : c;
    }
  }), o = U();
  vt(() => {
    if (l.value) {
      const s = Object.entries(l.value).filter((u) => {
        let [c] = u;
        return c.startsWith(c[0].toUpperCase());
      });
      o.value = s.length ? Object.fromEntries(s) : void 0;
    } else
      o.value = void 0;
  });
  function r() {
    const s = Ou(ha, a);
    tt(ha, x(() => o.value ? xt((s == null ? void 0 : s.value) ?? {}, o.value) : s == null ? void 0 : s.value));
  }
  return {
    props: i,
    provideSubDefaults: r
  };
}
function Hn(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return Kt("The component is missing an explicit name, unable to generate default prop value"), e;
  if (e._setup) {
    e.props = M(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(a) {
      return Oa(a, t);
    }, e.props._as = String, e.setup = function(a, l) {
      const i = jl();
      if (!i.value) return e._setup(a, l);
      const {
        props: o,
        provideSubDefaults: r
      } = Fu(a, a._as ?? e.name, i), s = e._setup(o, l);
      return r(), s;
    };
  }
  return e;
}
function J() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? Hn : Aa)(t);
}
function Ho(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return J()({
    name: n ?? wo(Bl(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...de()
    },
    setup(a, l) {
      let {
        slots: i
      } = l;
      return () => {
        var o;
        return Va(a.tag, {
          class: [e, a.class],
          style: a.style
        }, (o = i.default) == null ? void 0 : o.call(i));
      };
    }
  });
}
function Wo(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const ya = "cubic-bezier(0.4, 0, 0.2, 1)", Lu = "cubic-bezier(0.0, 0, 0.2, 1)", Mu = "cubic-bezier(0.4, 0, 1, 1)";
function Go(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? Ru(e) : Hl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function ba(e, t) {
  const n = [];
  if (t && e && !t.contains(e)) return n;
  for (; e && (Hl(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Hl(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function Ru(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function Nu(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ie(e) {
  const t = Le("useRender");
  t.render = e;
}
function Mn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = pl(), a = Z();
  if (Pe) {
    const l = new ResizeObserver((i) => {
      i.length && (t === "content" ? a.value = i[0].contentRect : a.value = i[0].target.getBoundingClientRect());
    });
    yt(() => {
      l.disconnect();
    }), ee(() => n.el, (i, o) => {
      o && (l.unobserve(o), a.value = void 0), i && l.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: Fl(a)
  };
}
function Xt(e, t) {
  let n;
  function a() {
    n = Ll(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), a();
    }) : t());
  }
  ee(e, (l) => {
    l && !n ? a() : l || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), He(() => {
    n == null || n.stop();
  });
}
function De(e, t, n) {
  let a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (d) => d, l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (d) => d;
  const i = Le("useProxiedModel"), o = Z(e[t] !== void 0 ? e[t] : n), r = Gt(t), u = r !== t ? x(() => {
    var d, m, v, g;
    return e[t], !!(((d = i.vnode.props) != null && d.hasOwnProperty(t) || (m = i.vnode.props) != null && m.hasOwnProperty(r)) && ((v = i.vnode.props) != null && v.hasOwnProperty(`onUpdate:${t}`) || (g = i.vnode.props) != null && g.hasOwnProperty(`onUpdate:${r}`)));
  }) : x(() => {
    var d, m;
    return e[t], !!((d = i.vnode.props) != null && d.hasOwnProperty(t) && ((m = i.vnode.props) != null && m.hasOwnProperty(`onUpdate:${t}`)));
  });
  Xt(() => !u.value, () => {
    ee(() => e[t], (d) => {
      o.value = d;
    });
  });
  const c = x({
    get() {
      const d = e[t];
      return a(u.value ? d : o.value);
    },
    set(d) {
      const m = l(d), v = Oe(u.value ? e[t] : o.value);
      v === m || a(v) === d || (o.value = m, i == null || i.emit(`update:${t}`, m));
    }
  });
  return Object.defineProperty(c, "externalValue", {
    get: () => u.value ? e[t] : o.value
  }), c;
}
const Ko = Symbol.for("vuetify:locale");
function Ba() {
  const e = _e(Ko);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Lt() {
  const e = _e(Ko);
  if (!e) throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const xl = Symbol.for("vuetify:theme"), Re = M({
  theme: String
}, "theme");
function Ye(e) {
  Le("provideTheme");
  const t = _e(xl, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = D(() => e.theme ?? t.name.value), a = D(() => t.themes.value[n.value]), l = D(() => t.isDisabled ? void 0 : `${t.prefix}theme--${n.value}`), i = {
    ...t,
    name: n,
    current: a,
    themeClasses: l
  };
  return tt(xl, i), i;
}
function $u() {
  Le("useTheme");
  const e = _e(xl, null);
  if (!e) throw new Error("Could not find Vuetify theme injection");
  return e;
}
const Ne = M({
  tag: {
    type: [String, Object, Function],
    default: "div"
  }
}, "tag"), zu = M({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function nt(e, t, n) {
  return J()({
    name: e,
    props: zu({
      mode: n,
      origin: t
    }),
    setup(a, l) {
      let {
        slots: i
      } = l;
      const o = {
        onBeforeEnter(r) {
          a.origin && (r.style.transformOrigin = a.origin);
        },
        onLeave(r) {
          if (a.leaveAbsolute) {
            const {
              offsetTop: s,
              offsetLeft: u,
              offsetWidth: c,
              offsetHeight: d
            } = r;
            r._transitionInitialStyles = {
              position: r.style.position,
              top: r.style.top,
              left: r.style.left,
              width: r.style.width,
              height: r.style.height
            }, r.style.position = "absolute", r.style.top = `${s}px`, r.style.left = `${u}px`, r.style.width = `${c}px`, r.style.height = `${d}px`;
          }
          a.hideOnLeave && r.style.setProperty("display", "none", "important");
        },
        onAfterLeave(r) {
          if (a.leaveAbsolute && (r != null && r._transitionInitialStyles)) {
            const {
              position: s,
              top: u,
              left: c,
              width: d,
              height: m
            } = r._transitionInitialStyles;
            delete r._transitionInitialStyles, r.style.position = s || "", r.style.top = u || "", r.style.left = c || "", r.style.width = d || "", r.style.height = m || "";
          }
        }
      };
      return () => {
        const r = a.group ? Ml : Yt;
        return Va(r, {
          name: a.disabled ? "" : e,
          css: !a.disabled,
          ...a.group ? void 0 : {
            mode: a.mode
          },
          ...a.disabled ? {} : o
        }, i.default);
      };
    }
  });
}
function Uo(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return J()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean,
      group: Boolean
    },
    setup(a, l) {
      let {
        slots: i
      } = l;
      const o = a.group ? Ml : Yt;
      return () => Va(o, {
        name: a.disabled ? "" : e,
        css: !a.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...a.disabled ? {} : t
      }, i.default);
    }
  });
}
function Yo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", a = Bl(`offset-${n}`);
  return {
    onBeforeEnter(o) {
      o._parent = o.parentNode, o._initialStyle = {
        transition: o.style.transition,
        overflow: o.style.overflow,
        [n]: o.style[n]
      };
    },
    onEnter(o) {
      const r = o._initialStyle;
      if (!r) return;
      o.style.setProperty("transition", "none", "important"), o.style.overflow = "hidden";
      const s = `${o[a]}px`;
      o.style[n] = "0", o.offsetHeight, o.style.transition = r.transition, e && o._parent && o._parent.classList.add(e), requestAnimationFrame(() => {
        o.style[n] = s;
      });
    },
    onAfterEnter: i,
    onEnterCancelled: i,
    onLeave(o) {
      o._initialStyle = {
        transition: "",
        overflow: o.style.overflow,
        [n]: o.style[n]
      }, o.style.overflow = "hidden", o.style[n] = `${o[a]}px`, o.offsetHeight, requestAnimationFrame(() => o.style[n] = "0");
    },
    onAfterLeave: l,
    onLeaveCancelled: l
  };
  function l(o) {
    e && o._parent && o._parent.classList.remove(e), i(o);
  }
  function i(o) {
    if (!o._initialStyle) return;
    const r = o._initialStyle[n];
    o.style.overflow = o._initialStyle.overflow, r != null && (o.style[n] = r), delete o._initialStyle;
  }
}
const ju = M({
  target: [Object, Array]
}, "v-dialog-transition"), Ga = /* @__PURE__ */ new WeakMap(), Wl = J()({
  name: "VDialogTransition",
  props: ju(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = {
      onBeforeEnter(l) {
        l.style.pointerEvents = "none", l.style.visibility = "hidden";
      },
      async onEnter(l, i) {
        var v;
        await new Promise((g) => requestAnimationFrame(g)), await new Promise((g) => requestAnimationFrame(g)), l.style.visibility = "";
        const o = ji(e.target, l), {
          x: r,
          y: s,
          sx: u,
          sy: c,
          speed: d
        } = o;
        Ga.set(l, o);
        const m = on(l, [{
          transform: `translate(${r}px, ${s}px) scale(${u}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: Lu
        });
        (v = zi(l)) == null || v.forEach((g) => {
          on(g, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: ya
          });
        }), m.finished.then(() => i());
      },
      onAfterEnter(l) {
        l.style.removeProperty("pointer-events");
      },
      onBeforeLeave(l) {
        l.style.pointerEvents = "none";
      },
      async onLeave(l, i) {
        var v;
        await new Promise((g) => requestAnimationFrame(g));
        let o;
        !Ga.has(l) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? o = ji(e.target, l) : o = Ga.get(l);
        const {
          x: r,
          y: s,
          sx: u,
          sy: c,
          speed: d
        } = o;
        on(l, [{}, {
          transform: `translate(${r}px, ${s}px) scale(${u}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: Mu
        }).finished.then(() => i()), (v = zi(l)) == null || v.forEach((g) => {
          on(g, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: ya
          });
        });
      },
      onAfterLeave(l) {
        l.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? p(Yt, K({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), n) : p(Yt, {
      name: "dialog-transition"
    }, n);
  }
});
function zi(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function ji(e, t) {
  const n = $o(e), a = zl(t), [l, i] = getComputedStyle(t).transformOrigin.split(" ").map((b) => parseFloat(b)), [o, r] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let s = n.left + n.width / 2;
  o === "left" || r === "left" ? s -= n.width / 2 : (o === "right" || r === "right") && (s += n.width / 2);
  let u = n.top + n.height / 2;
  o === "top" || r === "top" ? u -= n.height / 2 : (o === "bottom" || r === "bottom") && (u += n.height / 2);
  const c = n.width / a.width, d = n.height / a.height, m = Math.max(1, c, d), v = c / m || 0, g = d / m || 0, f = a.width * a.height / (window.innerWidth * window.innerHeight), h = f > 0.12 ? Math.min(1.5, (f - 0.12) * 10 + 1) : 1;
  return {
    x: s - (l + a.left),
    y: u - (i + a.top),
    sx: v,
    sy: g,
    speed: h
  };
}
nt("fab-transition", "center center", "out-in");
nt("dialog-bottom-transition");
nt("dialog-top-transition");
const Hi = nt("fade-transition");
nt("scale-transition");
nt("scroll-x-transition");
nt("scroll-x-reverse-transition");
nt("scroll-y-transition");
nt("scroll-y-reverse-transition");
nt("slide-x-transition");
nt("slide-x-reverse-transition");
const Xo = nt("slide-y-transition");
nt("slide-y-reverse-transition");
const Hu = Uo("expand-transition", Yo()), qo = Uo("expand-x-transition", Yo("", !0)), Wu = M({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Fe = J(!1)({
  name: "VDefaultsProvider",
  props: Wu(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: a,
      disabled: l,
      reset: i,
      root: o,
      scoped: r
    } = Cs(e);
    return hn(a, {
      reset: i,
      root: o,
      scoped: r,
      disabled: l
    }), () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n);
    };
  }
}), Mt = M({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function Rt(e) {
  return {
    dimensionStyles: x(() => {
      const n = {}, a = le(e.height), l = le(e.maxHeight), i = le(e.maxWidth), o = le(e.minHeight), r = le(e.minWidth), s = le(e.width);
      return a != null && (n.height = a), l != null && (n.maxHeight = l), i != null && (n.maxWidth = i), o != null && (n.minHeight = o), r != null && (n.minWidth = r), s != null && (n.width = s), n;
    })
  };
}
function Gu(e) {
  return {
    aspectStyles: x(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const Qo = M({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...de(),
  ...Mt()
}, "VResponsive"), Wi = J()({
  name: "VResponsive",
  props: Qo(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: a
    } = Gu(e), {
      dimensionStyles: l
    } = Rt(e);
    return ie(() => {
      var i;
      return C("div", {
        class: X(["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class]),
        style: ve([l.value, e.style])
      }, [C("div", {
        class: "v-responsive__sizer",
        style: ve(a.value)
      }, null), (i = n.additional) == null ? void 0 : i.call(n), n.default && C("div", {
        class: X(["v-responsive__content", e.contentClass])
      }, [n.default()])]);
    }), {};
  }
});
function Gl(e) {
  return Nl(() => {
    const t = mt(e), n = [], a = {};
    if (t.background)
      if (Cl(t.background)) {
        if (a.backgroundColor = t.background, !t.text && Pu(t.background)) {
          const l = xn(t.background);
          if (l.a == null || l.a === 1) {
            const i = Du(l);
            a.color = i, a.caretColor = i;
          }
        }
      } else
        n.push(`bg-${t.background}`);
    return t.text && (Cl(t.text) ? (a.color = t.text, a.caretColor = t.text) : n.push(`text-${t.text}`)), {
      colorClasses: n,
      colorStyles: a
    };
  });
}
function gt(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = Gl(() => ({
    text: mt(e)
  }));
  return {
    textColorClasses: t,
    textColorStyles: n
  };
}
function Bt(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = Gl(() => ({
    background: mt(e)
  }));
  return {
    backgroundColorClasses: t,
    backgroundColorStyles: n
  };
}
const pt = M({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function wt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  return {
    roundedClasses: x(() => {
      const a = ul(e) ? e.value : e.rounded, l = ul(e) ? e.value : e.tile, i = [];
      if (a === !0 || a === "")
        i.push(`${t}--rounded`);
      else if (typeof a == "string" || a === 0)
        for (const o of String(a).split(" "))
          i.push(`rounded-${o}`);
      else (l || a === !1) && i.push("rounded-0");
      return i;
    })
  };
}
const yn = M({
  transition: {
    type: null,
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), Dt = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: a,
    disabled: l,
    group: i,
    ...o
  } = e, {
    component: r = i ? Ml : Yt,
    ...s
  } = yl(a) ? a : {};
  let u;
  return yl(a) ? u = K(s, gu({
    disabled: l,
    group: i
  }), o) : u = K({
    name: l || !a ? "" : a
  }, o), Va(r, u, n);
};
function Ku(e, t) {
  if (!Rl) return;
  const n = t.modifiers || {}, a = t.value, {
    handler: l,
    options: i
  } = typeof a == "object" ? a : {
    handler: a,
    options: {}
  }, o = new IntersectionObserver(function() {
    var d;
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 ? arguments[1] : void 0;
    const u = (d = e._observe) == null ? void 0 : d[t.instance.$.uid];
    if (!u) return;
    const c = r.some((m) => m.isIntersecting);
    l && (!n.quiet || u.init) && (!n.once || c || u.init) && l(c, r, s), c && n.once ? Jo(e, t) : u.init = !0;
  }, i);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: o
  }, o.observe(e);
}
function Jo(e, t) {
  var a;
  const n = (a = e._observe) == null ? void 0 : a[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const pa = {
  mounted: Ku,
  unmounted: Jo
}, Uu = M({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ...Qo(),
  ...de(),
  ...pt(),
  ...yn()
}, "VImg"), Zo = J()({
  name: "VImg",
  directives: {
    vIntersect: pa
  },
  props: Uu(),
  emits: {
    loadstart: (e) => !0,
    load: (e) => !0,
    error: (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const {
      backgroundColorClasses: l,
      backgroundColorStyles: i
    } = Bt(() => e.color), {
      roundedClasses: o
    } = wt(e), r = Le("VImg"), s = U(""), u = Z(), c = U(e.eager ? "loading" : "idle"), d = U(), m = U(), v = x(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), g = x(() => v.value.aspect || d.value / m.value || 0);
    ee(() => e.src, () => {
      f(c.value !== "idle");
    }), ee(g, (O, B) => {
      !O && B && u.value && w(u.value);
    }), Ta(() => f());
    function f(O) {
      if (!(e.eager && O) && !(Rl && !O && !e.eager)) {
        if (c.value = "loading", v.value.lazySrc) {
          const B = new Image();
          B.src = v.value.lazySrc, w(B, null);
        }
        v.value.src && Be(() => {
          var B;
          n("loadstart", ((B = u.value) == null ? void 0 : B.currentSrc) || v.value.src), setTimeout(() => {
            var F;
            if (!r.isUnmounted)
              if ((F = u.value) != null && F.complete) {
                if (u.value.naturalWidth || b(), c.value === "error") return;
                g.value || w(u.value, null), c.value === "loading" && h();
              } else
                g.value || w(u.value), y();
          });
        });
      }
    }
    function h() {
      var O;
      r.isUnmounted || (y(), w(u.value), c.value = "loaded", n("load", ((O = u.value) == null ? void 0 : O.currentSrc) || v.value.src));
    }
    function b() {
      var O;
      r.isUnmounted || (c.value = "error", n("error", ((O = u.value) == null ? void 0 : O.currentSrc) || v.value.src));
    }
    function y() {
      const O = u.value;
      O && (s.value = O.currentSrc || O.src);
    }
    let E = -1;
    yt(() => {
      clearTimeout(E);
    });
    function w(O) {
      let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const F = () => {
        if (clearTimeout(E), r.isUnmounted) return;
        const {
          naturalHeight: N,
          naturalWidth: H
        } = O;
        N || H ? (d.value = H, m.value = N) : !O.complete && c.value === "loading" && B != null ? E = window.setTimeout(F, B) : (O.currentSrc.endsWith(".svg") || O.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, m.value = 1);
      };
      F();
    }
    const I = D(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), T = () => {
      var F;
      if (!v.value.src || c.value === "idle") return null;
      const O = C("img", {
        class: X(["v-img__img", I.value]),
        style: {
          objectPosition: e.position
        },
        crossorigin: e.crossorigin,
        src: v.value.src,
        srcset: v.value.srcset,
        alt: e.alt,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable,
        sizes: e.sizes,
        ref: u,
        onLoad: h,
        onError: b
      }, null), B = (F = a.sources) == null ? void 0 : F.call(a);
      return p(Dt, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [et(B ? C("picture", {
          class: "v-img__picture"
        }, [B, O]) : O, [[gn, c.value === "loaded"]])]
      });
    }, _ = () => p(Dt, {
      transition: e.transition
    }, {
      default: () => [v.value.lazySrc && c.value !== "loaded" && C("img", {
        class: X(["v-img__img", "v-img__img--preload", I.value]),
        style: {
          objectPosition: e.position
        },
        crossorigin: e.crossorigin,
        src: v.value.lazySrc,
        alt: e.alt,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), P = () => a.placeholder ? p(Dt, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !a.error) && C("div", {
        class: "v-img__placeholder"
      }, [a.placeholder()])]
    }) : null, R = () => a.error ? p(Dt, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [c.value === "error" && C("div", {
        class: "v-img__error"
      }, [a.error()])]
    }) : null, Y = () => e.gradient ? C("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, j = U(!1);
    {
      const O = ee(g, (B) => {
        B && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            j.value = !0;
          });
        }), O());
      });
    }
    return ie(() => {
      const O = Wi.filterProps(e);
      return et(p(Wi, K({
        class: ["v-img", {
          "v-img--absolute": e.absolute,
          "v-img--booting": !j.value
        }, l.value, o.value, e.class],
        style: [{
          width: le(e.width === "auto" ? d.value : e.width)
        }, i.value, e.style]
      }, O, {
        aspectRatio: g.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => C(Se, null, [p(T, null, null), p(_, null, null), p(Y, null, null), p(P, null, null), p(R, null, null)]),
        default: a.default
      }), [[pa, {
        handler: f,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: s,
      image: u,
      state: c,
      naturalWidth: d,
      naturalHeight: m
    };
  }
}), Jt = M({
  border: [Boolean, Number, String]
}, "border");
function Zt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  return {
    borderClasses: x(() => {
      const a = e.border;
      return a === !0 || a === "" ? `${t}--border` : typeof a == "string" || a === 0 ? String(a).split(" ").map((l) => `border-${l}`) : [];
    })
  };
}
const bn = M({
  elevation: {
    type: [Number, String],
    validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      t <= 24;
    }
  }
}, "elevation");
function pn(e) {
  return {
    elevationClasses: D(() => {
      const n = ul(e) ? e.value : e.elevation;
      return n == null ? [] : [`elevation-${n}`];
    })
  };
}
function Yu() {
  const e = U(!1);
  return jn(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: D(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: Fl(e)
  };
}
const Xu = [null, "default", "comfortable", "compact"], St = M({
  density: {
    type: String,
    default: "default",
    validator: (e) => Xu.includes(e)
  }
}, "density");
function _t(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  return {
    densityClasses: D(() => `${t}--density-${e.density}`)
  };
}
const qu = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Wn(e, t) {
  return C(Se, null, [e && C("span", {
    key: "overlay",
    class: X(`${t}__overlay`)
  }, null), C("span", {
    key: "underlay",
    class: X(`${t}__underlay`)
  }, null)]);
}
const Nt = M({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => qu.includes(e)
  }
}, "variant");
function Gn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  const n = D(() => {
    const {
      variant: i
    } = mt(e);
    return `${t}--variant-${i}`;
  }), {
    colorClasses: a,
    colorStyles: l
  } = Gl(() => {
    const {
      variant: i,
      color: o
    } = mt(e);
    return {
      [["elevated", "flat"].includes(i) ? "background" : "text"]: o
    };
  });
  return {
    colorClasses: a,
    colorStyles: l,
    variantClasses: n
  };
}
const er = M({
  baseColor: String,
  divided: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...Jt(),
  ...de(),
  ...St(),
  ...bn(),
  ...pt(),
  ...Ne(),
  ...Re(),
  ...Nt()
}, "VBtnGroup"), Gi = J()({
  name: "VBtnGroup",
  props: er(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ye(e), {
      densityClasses: l
    } = _t(e), {
      borderClasses: i
    } = Zt(e), {
      elevationClasses: o
    } = pn(e), {
      roundedClasses: r
    } = wt(e);
    hn({
      VBtn: {
        height: D(() => e.direction === "horizontal" ? "auto" : null),
        baseColor: D(() => e.baseColor),
        color: D(() => e.color),
        density: D(() => e.density),
        flat: !0,
        variant: D(() => e.variant)
      }
    }), ie(() => p(e.tag, {
      class: X(["v-btn-group", `v-btn-group--${e.direction}`, {
        "v-btn-group--divided": e.divided
      }, a.value, i.value, l.value, o.value, r.value, e.class]),
      style: ve(e.style)
    }, n));
  }
}), Kl = M({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), tr = M({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function nr(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const a = Le("useGroupItem");
  if (!a)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const l = qt();
  tt(Symbol.for(`${t.description}:id`), l);
  const i = _e(t, null);
  if (!i) {
    if (!n) return i;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const o = D(() => e.value), r = x(() => !!(i.disabled.value || e.disabled));
  i.register({
    id: l,
    value: o,
    disabled: r
  }, a), yt(() => {
    i.unregister(l);
  });
  const s = x(() => i.isSelected(l)), u = x(() => i.items.value[0].id === l), c = x(() => i.items.value[i.items.value.length - 1].id === l), d = x(() => s.value && [i.selectedClass.value, e.selectedClass]);
  return ee(s, (m) => {
    a.emit("group:selected", {
      value: m
    });
  }, {
    flush: "sync"
  }), {
    id: l,
    isSelected: s,
    isFirst: u,
    isLast: c,
    toggle: () => i.select(l, !s.value),
    select: (m) => i.select(l, m),
    selectedClass: d,
    value: o,
    disabled: r,
    group: i
  };
}
function Ul(e, t) {
  let n = !1;
  const a = dn([]), l = De(e, "modelValue", [], (m) => m == null ? [] : ar(a, Ke(m)), (m) => {
    const v = Ju(a, m);
    return e.multiple ? v : v[0];
  }), i = Le("useGroup");
  function o(m, v) {
    const g = m, f = Symbol.for(`${t.description}:id`), b = Cn(f, i == null ? void 0 : i.vnode).indexOf(v);
    re(g.value) == null && (g.value = b, g.useIndexAsValue = !0), b > -1 ? a.splice(b, 0, g) : a.push(g);
  }
  function r(m) {
    if (n) return;
    s();
    const v = a.findIndex((g) => g.id === m);
    a.splice(v, 1);
  }
  function s() {
    const m = a.find((v) => !v.disabled);
    m && e.mandatory === "force" && !l.value.length && (l.value = [m.id]);
  }
  jn(() => {
    s();
  }), yt(() => {
    n = !0;
  }), xs(() => {
    for (let m = 0; m < a.length; m++)
      a[m].useIndexAsValue && (a[m].value = m);
  });
  function u(m, v) {
    const g = a.find((f) => f.id === m);
    if (!(v && (g != null && g.disabled)))
      if (e.multiple) {
        const f = l.value.slice(), h = f.findIndex((y) => y === m), b = ~h;
        if (v = v ?? !b, b && e.mandatory && f.length <= 1 || !b && e.max != null && f.length + 1 > e.max) return;
        h < 0 && v ? f.push(m) : h >= 0 && !v && f.splice(h, 1), l.value = f;
      } else {
        const f = l.value.includes(m);
        if (e.mandatory && f || !f && !v) return;
        l.value = v ?? !f ? [m] : [];
      }
  }
  function c(m) {
    if (e.multiple && Kt('This method is not supported when using "multiple" prop'), l.value.length) {
      const v = l.value[0], g = a.findIndex((b) => b.id === v);
      let f = (g + m) % a.length, h = a[f];
      for (; h.disabled && f !== g; )
        f = (f + m) % a.length, h = a[f];
      if (h.disabled) return;
      l.value = [a[f].id];
    } else {
      const v = a.find((g) => !g.disabled);
      v && (l.value = [v.id]);
    }
  }
  const d = {
    register: o,
    unregister: r,
    selected: l,
    select: u,
    disabled: D(() => e.disabled),
    prev: () => c(a.length - 1),
    next: () => c(1),
    isSelected: (m) => l.value.includes(m),
    selectedClass: D(() => e.selectedClass),
    items: D(() => a),
    getItemIndex: (m) => Qu(a, m)
  };
  return tt(t, d), d;
}
function Qu(e, t) {
  const n = ar(e, [t]);
  return n.length ? e.findIndex((a) => a.id === n[0]) : -1;
}
function ar(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.find((o) => Ze(a, o.value)), i = e[a];
    (l == null ? void 0 : l.value) != null ? n.push(l.id) : i != null && n.push(i.id);
  }), n;
}
function Ju(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.findIndex((i) => i.id === a);
    if (~l) {
      const i = e[l];
      n.push(i.value != null ? i.value : l);
    }
  }), n;
}
const lr = Symbol.for("vuetify:v-btn-toggle"), Zu = M({
  ...er(),
  ...Kl()
}, "VBtnToggle");
J()({
  name: "VBtnToggle",
  props: Zu(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: a,
      next: l,
      prev: i,
      select: o,
      selected: r
    } = Ul(e, lr);
    return ie(() => {
      const s = Gi.filterProps(e);
      return p(Gi, K({
        class: ["v-btn-toggle", e.class]
      }, s, {
        style: e.style
      }), {
        default: () => {
          var u;
          return [(u = n.default) == null ? void 0 : u.call(n, {
            isSelected: a,
            next: l,
            prev: i,
            select: o,
            selected: r
          })];
        }
      });
    }), {
      next: l,
      prev: i,
      select: o
    };
  }
});
const ye = [String, Function, Object, Array], ec = Symbol.for("vuetify:icons"), Fa = M({
  icon: {
    type: ye
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: [String, Object, Function],
    required: !0
  }
}, "icon"), Ki = J()({
  name: "VComponentIcon",
  props: Fa(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const a = e.icon;
      return p(e.tag, null, {
        default: () => {
          var l;
          return [e.icon ? p(a, null, null) : (l = n.default) == null ? void 0 : l.call(n)];
        }
      });
    };
  }
}), tc = Hn({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: Fa(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => p(e.tag, K(n, {
      style: null
    }), {
      default: () => [C("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((a) => Array.isArray(a) ? C("path", {
        d: a[0],
        "fill-opacity": a[1]
      }, null) : C("path", {
        d: a
      }, null)) : C("path", {
        d: e.icon
      }, null)])]
    });
  }
});
Hn({
  name: "VLigatureIcon",
  props: Fa(),
  setup(e) {
    return () => p(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
Hn({
  name: "VClassIcon",
  props: Fa(),
  setup(e) {
    return () => p(e.tag, {
      class: X(e.icon)
    }, null);
  }
});
const nc = (e) => {
  const t = _e(ec);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: x(() => {
      var s;
      const a = mt(e);
      if (!a) return {
        component: Ki
      };
      let l = a;
      if (typeof l == "string" && (l = l.trim(), l.startsWith("$") && (l = (s = t.aliases) == null ? void 0 : s[l.slice(1)])), l || Kt(`Could not find aliased icon "${a}"`), Array.isArray(l))
        return {
          component: tc,
          icon: l
        };
      if (typeof l != "string")
        return {
          component: Ki,
          icon: l
        };
      const i = Object.keys(t.sets).find((u) => typeof l == "string" && l.startsWith(`${u}:`)), o = i ? l.slice(i.length + 1) : l;
      return {
        component: t.sets[i ?? t.defaultSet].component,
        icon: o
      };
    })
  };
}, ac = ["x-small", "small", "default", "large", "x-large"], Kn = M({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Un(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  return Nl(() => {
    const n = e.size;
    let a, l;
    return va(ac, n) ? a = `${t}--size-${n}` : n && (l = {
      width: le(n),
      height: le(n)
    }), {
      sizeClasses: a,
      sizeStyles: l
    };
  });
}
const lc = M({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: ye,
  opacity: [String, Number],
  ...de(),
  ...Kn(),
  ...Ne({
    tag: "i"
  }),
  ...Re()
}, "VIcon"), Te = J()({
  name: "VIcon",
  props: lc(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = U(), {
      themeClasses: i
    } = $u(), {
      iconData: o
    } = nc(() => l.value || e.icon), {
      sizeClasses: r
    } = Un(e), {
      textColorClasses: s,
      textColorStyles: u
    } = gt(() => e.color);
    return ie(() => {
      var m, v;
      const c = (m = a.default) == null ? void 0 : m.call(a);
      c && (l.value = (v = Fo(c).filter((g) => g.type === ks && g.children && typeof g.children == "string")[0]) == null ? void 0 : v.children);
      const d = !!(n.onClick || n.onClickOnce);
      return p(o.value.component, {
        tag: e.tag,
        icon: o.value.icon,
        class: X(["v-icon", "notranslate", i.value, r.value, s.value, {
          "v-icon--clickable": d,
          "v-icon--disabled": e.disabled,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class]),
        style: ve([{
          "--v-icon-opacity": e.opacity
        }, r.value ? void 0 : {
          fontSize: le(e.size),
          height: le(e.size),
          width: le(e.size)
        }, u.value, e.style]),
        role: d ? "button" : void 0,
        "aria-hidden": !d,
        tabindex: d ? e.disabled ? -1 : 0 : void 0
      }, {
        default: () => [c]
      });
    }), {};
  }
});
function ir(e, t) {
  const n = Z(), a = U(!1);
  if (Rl) {
    const l = new IntersectionObserver((i) => {
      a.value = !!i.find((o) => o.isIntersecting);
    }, t);
    He(() => {
      l.disconnect();
    }), ee(n, (i, o) => {
      o && (l.unobserve(o), a.value = !1), i && l.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: a
  };
}
const ic = M({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...de(),
  ...Kn(),
  ...Ne({
    tag: "div"
  }),
  ...Re()
}, "VProgressCircular"), oc = J()({
  name: "VProgressCircular",
  props: ic(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = 20, l = 2 * Math.PI * a, i = Z(), {
      themeClasses: o
    } = Ye(e), {
      sizeClasses: r,
      sizeStyles: s
    } = Un(e), {
      textColorClasses: u,
      textColorStyles: c
    } = gt(() => e.color), {
      textColorClasses: d,
      textColorStyles: m
    } = gt(() => e.bgColor), {
      intersectionRef: v,
      isIntersecting: g
    } = ir(), {
      resizeRef: f,
      contentRect: h
    } = Mn(), b = D(() => ct(parseFloat(e.modelValue), 0, 100)), y = D(() => Number(e.width)), E = D(() => s.value ? Number(e.size) : h.value ? h.value.width : Math.max(y.value, 32)), w = D(() => a / (1 - y.value / E.value) * 2), I = D(() => y.value / E.value * w.value), T = D(() => le((100 - b.value) / 100 * l));
    return vt(() => {
      v.value = i.value, f.value = i.value;
    }), ie(() => p(e.tag, {
      ref: i,
      class: X(["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": g.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, o.value, r.value, u.value, e.class]),
      style: ve([s.value, c.value, e.style]),
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : b.value
    }, {
      default: () => [C("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${w.value} ${w.value}`
      }, [C("circle", {
        class: X(["v-progress-circular__underlay", d.value]),
        style: ve(m.value),
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": I.value,
        "stroke-dasharray": l,
        "stroke-dashoffset": 0
      }, null), C("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: a,
        "stroke-width": I.value,
        "stroke-dasharray": l,
        "stroke-dashoffset": T.value
      }, null)]), n.default && C("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: b.value
      })])]
    })), {};
  }
}), Ui = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Yl = M({
  location: String
}, "location");
function Xl(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: a
  } = Lt();
  return {
    locationStyles: x(() => {
      if (!e.location) return {};
      const {
        side: i,
        align: o
      } = Sl(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, a.value);
      function r(u) {
        return n ? n(u) : 0;
      }
      const s = {};
      return i !== "center" && (t ? s[Ui[i]] = `calc(100% - ${r(i)}px)` : s[i] = 0), o !== "center" ? t ? s[Ui[o]] = `calc(100% - ${r(o)}px)` : s[o] = 0 : (i === "center" ? s.top = s.left = "50%" : s[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[i]] = "50%", s.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[i]), s;
    })
  };
}
const rc = M({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: !0
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  bufferColor: String,
  bufferOpacity: [Number, String],
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...de(),
  ...Yl({
    location: "top"
  }),
  ...pt(),
  ...Ne(),
  ...Re()
}, "VProgressLinear"), sc = J()({
  name: "VProgressLinear",
  props: rc(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    var j;
    let {
      slots: n
    } = t;
    const a = De(e, "modelValue"), {
      isRtl: l,
      rtlClasses: i
    } = Lt(), {
      themeClasses: o
    } = Ye(e), {
      locationStyles: r
    } = Xl(e), {
      textColorClasses: s,
      textColorStyles: u
    } = gt(() => e.color), {
      backgroundColorClasses: c,
      backgroundColorStyles: d
    } = Bt(() => e.bgColor || e.color), {
      backgroundColorClasses: m,
      backgroundColorStyles: v
    } = Bt(() => e.bufferColor || e.bgColor || e.color), {
      backgroundColorClasses: g,
      backgroundColorStyles: f
    } = Bt(() => e.color), {
      roundedClasses: h
    } = wt(e), {
      intersectionRef: b,
      isIntersecting: y
    } = ir(), E = x(() => parseFloat(e.max)), w = x(() => parseFloat(e.height)), I = x(() => ct(parseFloat(e.bufferValue) / E.value * 100, 0, 100)), T = x(() => ct(parseFloat(a.value) / E.value * 100, 0, 100)), _ = x(() => l.value !== e.reverse), P = x(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), R = Pe && ((j = window.matchMedia) == null ? void 0 : j.call(window, "(forced-colors: active)").matches);
    function Y(O) {
      if (!b.value) return;
      const {
        left: B,
        right: F,
        width: N
      } = b.value.getBoundingClientRect(), H = _.value ? N - O.clientX + (F - N) : O.clientX - B;
      a.value = Math.round(H / N * E.value);
    }
    return ie(() => p(e.tag, {
      ref: b,
      class: X(["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && y.value,
        "v-progress-linear--reverse": _.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, h.value, o.value, i.value, e.class]),
      style: ve([{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? le(w.value) : 0,
        "--v-progress-linear-height": le(w.value),
        ...e.absolute ? r.value : {}
      }, e.style]),
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : Math.min(parseFloat(a.value), E.value),
      onClick: e.clickable && Y
    }, {
      default: () => [e.stream && C("div", {
        key: "stream",
        class: X(["v-progress-linear__stream", s.value]),
        style: {
          ...u.value,
          [_.value ? "left" : "right"]: le(-w.value),
          borderTop: `${le(w.value / 2)} dotted`,
          opacity: parseFloat(e.bufferOpacity),
          top: `calc(50% - ${le(w.value / 4)})`,
          width: le(100 - I.value, "%"),
          "--v-progress-linear-stream-to": le(w.value * (_.value ? 1 : -1))
        }
      }, null), C("div", {
        class: X(["v-progress-linear__background", R ? void 0 : c.value]),
        style: ve([d.value, {
          opacity: parseFloat(e.bgOpacity),
          width: e.stream ? 0 : void 0
        }])
      }, null), C("div", {
        class: X(["v-progress-linear__buffer", R ? void 0 : m.value]),
        style: ve([v.value, {
          opacity: parseFloat(e.bufferOpacity),
          width: le(I.value, "%")
        }])
      }, null), p(Yt, {
        name: P.value
      }, {
        default: () => [e.indeterminate ? C("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((O) => C("div", {
          key: O,
          class: X(["v-progress-linear__indeterminate", O, R ? void 0 : g.value]),
          style: ve(f.value)
        }, null))]) : C("div", {
          class: X(["v-progress-linear__determinate", R ? void 0 : g.value]),
          style: ve([f.value, {
            width: le(T.value, "%")
          }])
        }, null)]
      }), n.default && C("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: T.value,
        buffer: I.value
      })])]
    })), {};
  }
}), ql = M({
  loading: [Boolean, String]
}, "loader");
function Ql(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  return {
    loaderClasses: D(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function or(e, t) {
  var a;
  let {
    slots: n
  } = t;
  return C("div", {
    class: X(`${e.name}__loader`)
  }, [((a = n.default) == null ? void 0 : a.call(n, {
    color: e.color,
    isActive: e.active
  })) || p(sc, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const uc = ["static", "relative", "fixed", "absolute", "sticky"], rr = M({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => uc.includes(e)
    )
  }
}, "position");
function sr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  return {
    positionClasses: D(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function cc() {
  const e = Le("useRoute");
  return x(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function dc() {
  var e, t;
  return (t = (e = Le("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function La(e, t) {
  var c, d;
  const n = Is("RouterLink"), a = D(() => !!(e.href || e.to)), l = x(() => (a == null ? void 0 : a.value) || Ei(t, "click") || Ei(e, "click"));
  if (typeof n == "string" || !("useLink" in n)) {
    const m = D(() => e.href);
    return {
      isLink: a,
      isClickable: l,
      href: m,
      linkProps: dn({
        href: m
      })
    };
  }
  const i = n.useLink({
    to: D(() => e.to || ""),
    replace: D(() => e.replace)
  }), o = x(() => e.to ? i : void 0), r = cc(), s = x(() => {
    var m, v, g;
    return o.value ? e.exact ? r.value ? ((g = o.value.isExactActive) == null ? void 0 : g.value) && Ze(o.value.route.value.query, r.value.query) : ((v = o.value.isExactActive) == null ? void 0 : v.value) ?? !1 : ((m = o.value.isActive) == null ? void 0 : m.value) ?? !1 : !1;
  }), u = x(() => {
    var m;
    return e.to ? (m = o.value) == null ? void 0 : m.route.value.href : e.href;
  });
  return {
    isLink: a,
    isClickable: l,
    isActive: s,
    route: (c = o.value) == null ? void 0 : c.route,
    navigate: (d = o.value) == null ? void 0 : d.navigate,
    href: u,
    linkProps: dn({
      href: u,
      "aria-current": D(() => s.value ? "page" : void 0)
    })
  };
}
const Ma = M({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let Ka = !1;
function fc(e, t) {
  let n = !1, a, l;
  Pe && (e != null && e.beforeEach) && (Be(() => {
    window.addEventListener("popstate", i), a = e.beforeEach((o, r, s) => {
      Ka ? n ? t(s) : s() : setTimeout(() => n ? t(s) : s()), Ka = !0;
    }), l = e == null ? void 0 : e.afterEach(() => {
      Ka = !1;
    });
  }), He(() => {
    window.removeEventListener("popstate", i), a == null || a(), l == null || l();
  }));
  function i(o) {
    var r;
    (r = o.state) != null && r.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
function vc(e, t) {
  ee(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n != null && t && Be(() => {
      t(n);
    });
  }, {
    immediate: !0
  });
}
const kl = Symbol("rippleStop"), mc = 80;
function Yi(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Il(e) {
  return e.constructor.name === "TouchEvent";
}
function ur(e) {
  return e.constructor.name === "KeyboardEvent";
}
const gc = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = 0, l = 0;
  if (!ur(e)) {
    const m = t.getBoundingClientRect(), v = Il(e) ? e.touches[e.touches.length - 1] : e;
    a = v.clientX - m.left, l = v.clientY - m.top;
  }
  let i = 0, o = 0.3;
  (d = t._ripple) != null && d.circle ? (o = 0.15, i = t.clientWidth / 2, i = n.center ? i : i + Math.sqrt((a - i) ** 2 + (l - i) ** 2) / 4) : i = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const r = `${(t.clientWidth - i * 2) / 2}px`, s = `${(t.clientHeight - i * 2) / 2}px`, u = n.center ? r : `${a - i}px`, c = n.center ? s : `${l - i}px`;
  return {
    radius: i,
    scale: o,
    x: u,
    y: c,
    centerX: r,
    centerY: s
  };
}, wa = {
  /* eslint-disable max-statements */
  show(e, t) {
    var v;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((v = t == null ? void 0 : t._ripple) != null && v.enabled))
      return;
    const a = document.createElement("span"), l = document.createElement("span");
    a.appendChild(l), a.className = "v-ripple__container", n.class && (a.className += ` ${n.class}`);
    const {
      radius: i,
      scale: o,
      x: r,
      y: s,
      centerX: u,
      centerY: c
    } = gc(e, t, n), d = `${i * 2}px`;
    l.className = "v-ripple__animation", l.style.width = d, l.style.height = d, t.appendChild(a);
    const m = window.getComputedStyle(t);
    m && m.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), l.classList.add("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--visible"), Yi(l, `translate(${r}, ${s}) scale3d(${o},${o},${o})`), l.dataset.activated = String(performance.now()), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        l.classList.remove("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--in"), Yi(l, `translate(${u}, ${c}) scale3d(1,1,1)`);
      });
    });
  },
  hide(e) {
    var i;
    if (!((i = e == null ? void 0 : e._ripple) != null && i.enabled)) return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0) return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding) return;
    n.dataset.isHiding = "true";
    const a = performance.now() - Number(n.dataset.activated), l = Math.max(250 - a, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var r;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((r = n.parentNode) == null ? void 0 : r.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, l);
  }
};
function cr(e) {
  return typeof e > "u" || !!e;
}
function Rn(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[kl])) {
    if (e[kl] = !0, Il(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || ur(e), n._ripple.class && (t.class = n._ripple.class), Il(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        wa.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var a;
        (a = n == null ? void 0 : n._ripple) != null && a.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, mc);
    } else
      wa.show(e, n, t);
  }
}
function Xi(e) {
  e[kl] = !0;
}
function Je(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        Je(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), wa.hide(t);
  }
}
function dr(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Nn = !1;
function qi(e, t) {
  !Nn && t.includes(e.keyCode) && (Nn = !0, Rn(e));
}
function fr(e) {
  Nn = !1, Je(e);
}
function vr(e) {
  Nn && (Nn = !1, Je(e));
}
function mr(e, t, n) {
  const {
    value: a,
    modifiers: l
  } = t, i = cr(a);
  i || wa.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = i, e._ripple.centered = l.center, e._ripple.circle = l.circle;
  const o = yl(a) ? a : {};
  o.class && (e._ripple.class = o.class);
  const r = o.keys ?? [bl.enter, bl.space];
  if (e._ripple.keyDownHandler = (s) => qi(s, r), i && !n) {
    if (l.stop) {
      e.addEventListener("touchstart", Xi, {
        passive: !0
      }), e.addEventListener("mousedown", Xi);
      return;
    }
    e.addEventListener("touchstart", Rn, {
      passive: !0
    }), e.addEventListener("touchend", Je, {
      passive: !0
    }), e.addEventListener("touchmove", dr, {
      passive: !0
    }), e.addEventListener("touchcancel", Je), e.addEventListener("mousedown", Rn), e.addEventListener("mouseup", Je), e.addEventListener("mouseleave", Je), e.addEventListener("keydown", (s) => qi(s, r)), e.addEventListener("keyup", fr), e.addEventListener("blur", vr), e.addEventListener("dragstart", Je, {
      passive: !0
    });
  } else !i && n && gr(e);
}
function gr(e) {
  var t;
  e.removeEventListener("mousedown", Rn), e.removeEventListener("touchstart", Rn), e.removeEventListener("touchend", Je), e.removeEventListener("touchmove", dr), e.removeEventListener("touchcancel", Je), e.removeEventListener("mouseup", Je), e.removeEventListener("mouseleave", Je), (t = e._ripple) != null && t.keyDownHandler && e.removeEventListener("keydown", e._ripple.keyDownHandler), e.removeEventListener("keyup", fr), e.removeEventListener("dragstart", Je), e.removeEventListener("blur", vr);
}
function hc(e, t) {
  mr(e, t, !1);
}
function yc(e) {
  gr(e), delete e._ripple;
}
function bc(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = cr(t.oldValue);
  mr(e, t, n);
}
const It = {
  mounted: hc,
  unmounted: yc,
  updated: bc
}, pc = M({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: lr
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: ye,
  appendIcon: ye,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...Jt(),
  ...de(),
  ...St(),
  ...Mt(),
  ...bn(),
  ...tr(),
  ...ql(),
  ...Yl(),
  ...rr(),
  ...pt(),
  ...Ma(),
  ...Kn(),
  ...Ne({
    tag: "button"
  }),
  ...Re(),
  ...Nt({
    variant: "elevated"
  })
}, "VBtn"), rn = J()({
  name: "VBtn",
  props: pc(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ye(e), {
      borderClasses: i
    } = Zt(e), {
      densityClasses: o
    } = _t(e), {
      dimensionStyles: r
    } = Rt(e), {
      elevationClasses: s
    } = pn(e), {
      loaderClasses: u
    } = Ql(e), {
      locationStyles: c
    } = Xl(e), {
      positionClasses: d
    } = sr(e), {
      roundedClasses: m
    } = wt(e), {
      sizeClasses: v,
      sizeStyles: g
    } = Un(e), f = nr(e, e.symbol, !1), h = La(e, n), b = x(() => {
      var j;
      return e.active !== void 0 ? e.active : h.isLink.value ? (j = h.isActive) == null ? void 0 : j.value : f == null ? void 0 : f.isSelected.value;
    }), y = D(() => b.value ? e.activeColor ?? e.color : e.color), E = x(() => {
      var O, B;
      return {
        color: (f == null ? void 0 : f.isSelected.value) && (!h.isLink.value || ((O = h.isActive) == null ? void 0 : O.value)) || !f || ((B = h.isActive) == null ? void 0 : B.value) ? y.value ?? e.baseColor : e.baseColor,
        variant: e.variant
      };
    }), {
      colorClasses: w,
      colorStyles: I,
      variantClasses: T
    } = Gn(E), _ = x(() => (f == null ? void 0 : f.disabled.value) || e.disabled), P = D(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), R = x(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function Y(j) {
      var O;
      _.value || h.isLink.value && (j.metaKey || j.ctrlKey || j.shiftKey || j.button !== 0 || n.target === "_blank") || ((O = h.navigate) == null || O.call(h, j), f == null || f.toggle());
    }
    return vc(h, f == null ? void 0 : f.select), ie(() => {
      const j = h.isLink.value ? "a" : e.tag, O = !!(e.prependIcon || a.prepend), B = !!(e.appendIcon || a.append), F = !!(e.icon && e.icon !== !0);
      return et(p(j, K({
        type: j === "a" ? void 0 : "button",
        class: ["v-btn", f == null ? void 0 : f.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": _.value,
          "v-btn--elevated": P.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--readonly": e.readonly,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, l.value, i.value, w.value, o.value, s.value, u.value, d.value, m.value, v.value, T.value, e.class],
        style: [I.value, r.value, c.value, g.value, e.style],
        "aria-busy": e.loading ? !0 : void 0,
        disabled: _.value || void 0,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: Y,
        value: R.value
      }, h.linkProps), {
        default: () => {
          var N;
          return [Wn(!0, "v-btn"), !e.icon && O && C("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [a.prepend ? p(Fe, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, a.prepend) : p(Te, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), C("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!a.default && F ? p(Te, {
            key: "content-icon",
            icon: e.icon
          }, null) : p(Fe, {
            key: "content-defaults",
            disabled: !F,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var H;
              return [((H = a.default) == null ? void 0 : H.call(a)) ?? fn(e.text)];
            }
          })]), !e.icon && B && C("span", {
            key: "append",
            class: "v-btn__append"
          }, [a.append ? p(Fe, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, a.append) : p(Te, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && C("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((N = a.loader) == null ? void 0 : N.call(a)) ?? p(oc, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            width: "2"
          }, null)])];
        }
      }), [[It, !_.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: f
    };
  }
}), wc = M({
  start: Boolean,
  end: Boolean,
  icon: ye,
  image: String,
  text: String,
  ...Jt(),
  ...de(),
  ...St(),
  ...pt(),
  ...Kn(),
  ...Ne(),
  ...Re(),
  ...Nt({
    variant: "flat"
  })
}, "VAvatar"), Ft = J()({
  name: "VAvatar",
  props: wc(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ye(e), {
      borderClasses: l
    } = Zt(e), {
      colorClasses: i,
      colorStyles: o,
      variantClasses: r
    } = Gn(e), {
      densityClasses: s
    } = _t(e), {
      roundedClasses: u
    } = wt(e), {
      sizeClasses: c,
      sizeStyles: d
    } = Un(e);
    return ie(() => p(e.tag, {
      class: X(["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, a.value, l.value, i.value, s.value, u.value, c.value, r.value, e.class]),
      style: ve([o.value, d.value, e.style])
    }, {
      default: () => [n.default ? p(Fe, {
        key: "content-defaults",
        defaults: {
          VImg: {
            cover: !0,
            src: e.image
          },
          VIcon: {
            icon: e.icon
          }
        }
      }, {
        default: () => [n.default()]
      }) : e.image ? p(Zo, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? p(Te, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Wn(!1, "v-avatar")]
    })), {};
  }
}), Sc = M({
  text: String,
  onClick: Ue(),
  ...de(),
  ...Re()
}, "VLabel"), hr = J()({
  name: "VLabel",
  props: Sc(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => {
      var a;
      return C("label", {
        class: X(["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class]),
        style: ve(e.style),
        onClick: e.onClick
      }, [e.text, (a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), yr = Symbol.for("vuetify:selection-control-group"), br = M({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: ye,
  trueIcon: ye,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: Ze
  },
  ...de(),
  ...St(),
  ...Re()
}, "SelectionControlGroup"), Cc = M({
  ...br({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
J()({
  name: "VSelectionControlGroup",
  props: Cc(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = De(e, "modelValue"), l = qt(), i = D(() => e.id || `v-selection-control-group-${l}`), o = D(() => e.name || i.value), r = /* @__PURE__ */ new Set();
    return tt(yr, {
      modelValue: a,
      forceUpdate: () => {
        r.forEach((s) => s());
      },
      onForceUpdate: (s) => {
        r.add(s), He(() => {
          r.delete(s);
        });
      }
    }), hn({
      [e.defaultsTarget]: {
        color: D(() => e.color),
        disabled: D(() => e.disabled),
        density: D(() => e.density),
        error: D(() => e.error),
        inline: D(() => e.inline),
        modelValue: a,
        multiple: D(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)),
        name: o,
        falseIcon: D(() => e.falseIcon),
        trueIcon: D(() => e.trueIcon),
        readonly: D(() => e.readonly),
        ripple: D(() => e.ripple),
        type: D(() => e.type),
        valueComparator: D(() => e.valueComparator)
      }
    }), ie(() => {
      var s;
      return C("div", {
        class: X(["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class]),
        style: ve(e.style),
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(s = n.default) == null ? void 0 : s.call(n)]);
    }), {};
  }
});
const pr = M({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...de(),
  ...br()
}, "VSelectionControl");
function xc(e) {
  const t = _e(yr, void 0), {
    densityClasses: n
  } = _t(e), a = De(e, "modelValue"), l = x(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), i = x(() => e.falseValue !== void 0 ? e.falseValue : !1), o = x(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), r = x({
    get() {
      const v = t ? t.modelValue.value : a.value;
      return o.value ? Ke(v).some((g) => e.valueComparator(g, l.value)) : e.valueComparator(v, l.value);
    },
    set(v) {
      if (e.readonly) return;
      const g = v ? l.value : i.value;
      let f = g;
      o.value && (f = v ? [...Ke(a.value), g] : Ke(a.value).filter((h) => !e.valueComparator(h, l.value))), t ? t.modelValue.value = f : a.value = f;
    }
  }), {
    textColorClasses: s,
    textColorStyles: u
  } = gt(() => {
    if (!(e.error || e.disabled))
      return r.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = Bt(() => r.value && !e.error && !e.disabled ? e.color : e.baseColor), m = x(() => r.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: l,
    falseValue: i,
    model: r,
    textColorClasses: s,
    textColorStyles: u,
    backgroundColorClasses: c,
    backgroundColorStyles: d,
    icon: m
  };
}
const Qi = J()({
  name: "VSelectionControl",
  directives: {
    vRipple: It
  },
  inheritAttrs: !1,
  props: pr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      group: l,
      densityClasses: i,
      icon: o,
      model: r,
      textColorClasses: s,
      textColorStyles: u,
      backgroundColorClasses: c,
      backgroundColorStyles: d,
      trueValue: m
    } = xc(e), v = qt(), g = U(!1), f = U(!1), h = Z(), b = D(() => e.id || `input-${v}`), y = D(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      h.value && (h.value.checked = r.value);
    });
    function E(_) {
      y.value && (g.value = !0, ma(_.target, ":focus-visible") !== !1 && (f.value = !0));
    }
    function w() {
      g.value = !1, f.value = !1;
    }
    function I(_) {
      _.stopPropagation();
    }
    function T(_) {
      if (!y.value) {
        h.value && (h.value.checked = r.value);
        return;
      }
      e.readonly && l && Be(() => l.forceUpdate()), r.value = _.target.checked;
    }
    return ie(() => {
      var j, O;
      const _ = a.label ? a.label({
        label: e.label,
        props: {
          for: b.value
        }
      }) : e.label, [P, R] = Bo(n), Y = C("input", K({
        ref: h,
        checked: r.value,
        disabled: !!e.disabled,
        id: b.value,
        onBlur: w,
        onFocus: E,
        onInput: T,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: m.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? r.value : void 0
      }, R), null);
      return C("div", K({
        class: ["v-selection-control", {
          "v-selection-control--dirty": r.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": f.value,
          "v-selection-control--inline": e.inline
        }, i.value, e.class]
      }, P, {
        style: e.style
      }), [C("div", {
        class: X(["v-selection-control__wrapper", s.value]),
        style: ve(u.value)
      }, [(j = a.default) == null ? void 0 : j.call(a, {
        backgroundColorClasses: c,
        backgroundColorStyles: d
      }), et(C("div", {
        class: X(["v-selection-control__input"])
      }, [((O = a.input) == null ? void 0 : O.call(a, {
        model: r,
        textColorClasses: s,
        textColorStyles: u,
        backgroundColorClasses: c,
        backgroundColorStyles: d,
        inputNode: Y,
        icon: o.value,
        props: {
          onFocus: E,
          onBlur: w,
          id: b.value
        }
      })) ?? C(Se, null, [o.value && p(Te, {
        key: "icon",
        icon: o.value
      }, null), Y])]), [[It, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), _ && p(hr, {
        for: b.value,
        onClick: I
      }, {
        default: () => [_]
      })]);
    }), {
      isFocused: g,
      input: h
    };
  }
}), kc = M({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: ye,
    default: "$checkboxIndeterminate"
  },
  ...pr({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), wr = J()({
  name: "VCheckboxBtn",
  props: kc(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = De(e, "indeterminate"), l = De(e, "modelValue");
    function i(s) {
      a.value && (a.value = !1);
    }
    const o = D(() => a.value ? e.indeterminateIcon : e.falseIcon), r = D(() => a.value ? e.indeterminateIcon : e.trueIcon);
    return ie(() => {
      const s = Qt(Qi.filterProps(e), ["modelValue"]);
      return p(Qi, K(s, {
        modelValue: l.value,
        "onUpdate:modelValue": [(u) => l.value = u, i],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: o.value,
        trueIcon: r.value,
        "aria-checked": a.value ? "mixed" : void 0
      }), n);
    }), {};
  }
});
function Sr(e) {
  const {
    t
  } = Ba();
  function n(a) {
    let {
      name: l,
      color: i,
      ...o
    } = a;
    const r = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[l], s = e[`onClick:${l}`];
    function u(d) {
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), Mo(s, new PointerEvent("click", d)));
    }
    const c = s && r ? t(`$vuetify.input.${r}`, e.label ?? "") : void 0;
    return p(Te, K({
      icon: e[`${l}Icon`],
      "aria-label": c,
      onClick: s,
      onKeydown: u,
      color: i
    }, o), null);
  }
  return {
    InputIcon: n
  };
}
const Ic = M({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...de(),
  ...yn({
    transition: {
      component: Xo,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Ec = J()({
  name: "VMessages",
  props: Ic(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = x(() => Ke(e.messages)), {
      textColorClasses: l,
      textColorStyles: i
    } = gt(() => e.color);
    return ie(() => p(Dt, {
      transition: e.transition,
      tag: "div",
      class: X(["v-messages", l.value, e.class]),
      style: ve([i.value, e.style])
    }, {
      default: () => [e.active && a.value.map((o, r) => C("div", {
        class: "v-messages__message",
        key: `${r}-${a.value}`
      }, [n.message ? n.message({
        message: o
      }) : o]))]
    })), {};
  }
}), Cr = M({
  focused: Boolean,
  "onUpdate:focused": Ue()
}, "focus");
function xr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  const n = De(e, "focused"), a = D(() => ({
    [`${t}--focused`]: n.value
  }));
  function l() {
    n.value = !0;
  }
  function i() {
    n.value = !1;
  }
  return {
    focusClasses: a,
    isFocused: n,
    focus: l,
    blur: i
  };
}
const _c = Symbol.for("vuetify:form");
function Jl(e) {
  const t = _e(_c, null);
  return {
    ...t,
    isReadonly: x(() => !!((e == null ? void 0 : e.readonly) ?? (t == null ? void 0 : t.isReadonly.value))),
    isDisabled: x(() => !!((e == null ? void 0 : e.disabled) ?? (t == null ? void 0 : t.isDisabled.value)))
  };
}
const Pc = Symbol.for("vuetify:rules");
function Ac(e) {
  const t = _e(Pc, null);
  return t ? t(e) : D(e);
}
const Vc = M({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...Cr()
}, "validation");
function Tc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : qt();
  const a = De(e, "modelValue"), l = x(() => e.validationValue === void 0 ? a.value : e.validationValue), i = Jl(e), o = Ac(() => e.rules), r = Z([]), s = U(!0), u = x(() => !!(Ke(a.value === "" ? null : a.value).length || Ke(l.value === "" ? null : l.value).length)), c = x(() => {
    var w;
    return (w = e.errorMessages) != null && w.length ? Ke(e.errorMessages).concat(r.value).slice(0, Math.max(0, Number(e.maxErrors))) : r.value;
  }), d = x(() => {
    var T;
    let w = (e.validateOn ?? ((T = i.validateOn) == null ? void 0 : T.value)) || "input";
    w === "lazy" && (w = "input lazy"), w === "eager" && (w = "input eager");
    const I = new Set((w == null ? void 0 : w.split(" ")) ?? []);
    return {
      input: I.has("input"),
      blur: I.has("blur") || I.has("input") || I.has("invalid-input"),
      invalidInput: I.has("invalid-input"),
      lazy: I.has("lazy"),
      eager: I.has("eager")
    };
  }), m = x(() => {
    var w;
    return e.error || (w = e.errorMessages) != null && w.length ? !1 : e.rules.length ? s.value ? r.value.length || d.value.lazy ? null : !0 : !r.value.length : !0;
  }), v = U(!1), g = x(() => ({
    [`${t}--error`]: m.value === !1,
    [`${t}--dirty`]: u.value,
    [`${t}--disabled`]: i.isDisabled.value,
    [`${t}--readonly`]: i.isReadonly.value
  })), f = Le("validation"), h = x(() => e.name ?? re(n));
  Ta(() => {
    var w;
    (w = i.register) == null || w.call(i, {
      id: h.value,
      vm: f,
      validate: E,
      reset: b,
      resetValidation: y
    });
  }), yt(() => {
    var w;
    (w = i.unregister) == null || w.call(i, h.value);
  }), jn(async () => {
    var w;
    d.value.lazy || await E(!d.value.eager), (w = i.update) == null || w.call(i, h.value, m.value, c.value);
  }), Xt(() => d.value.input || d.value.invalidInput && m.value === !1, () => {
    ee(l, () => {
      if (l.value != null)
        E();
      else if (e.focused) {
        const w = ee(() => e.focused, (I) => {
          I || E(), w();
        });
      }
    });
  }), Xt(() => d.value.blur, () => {
    ee(() => e.focused, (w) => {
      w || E();
    });
  }), ee([m, c], () => {
    var w;
    (w = i.update) == null || w.call(i, h.value, m.value, c.value);
  });
  async function b() {
    a.value = null, await Be(), await y();
  }
  async function y() {
    s.value = !0, d.value.lazy ? r.value = [] : await E(!d.value.eager);
  }
  async function E() {
    let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const I = [];
    v.value = !0;
    for (const T of o.value) {
      if (I.length >= Number(e.maxErrors ?? 1))
        break;
      const P = await (typeof T == "function" ? T : () => T)(l.value);
      if (P !== !0) {
        if (P !== !1 && typeof P != "string") {
          console.warn(`${P} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        I.push(P || "");
      }
    }
    return r.value = I, v.value = !1, s.value = w, r.value;
  }
  return {
    errorMessages: c,
    isDirty: u,
    isDisabled: i.isDisabled,
    isReadonly: i.isReadonly,
    isPristine: s,
    isValid: m,
    isValidating: v,
    reset: b,
    resetValidation: y,
    validate: E,
    validationClasses: g
  };
}
const kr = M({
  id: String,
  appendIcon: ye,
  baseColor: String,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  color: String,
  glow: Boolean,
  iconColor: [Boolean, String],
  prependIcon: ye,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["horizontal", "vertical"].includes(e)
  },
  "onClick:prepend": Ue(),
  "onClick:append": Ue(),
  ...de(),
  ...St(),
  ...Oa(Mt(), ["maxWidth", "minWidth", "width"]),
  ...Re(),
  ...Vc()
}, "VInput"), Ji = J()({
  name: "VInput",
  props: {
    ...kr()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: l
    } = t;
    const {
      densityClasses: i
    } = _t(e), {
      dimensionStyles: o
    } = Rt(e), {
      themeClasses: r
    } = Ye(e), {
      rtlClasses: s
    } = Lt(), {
      InputIcon: u
    } = Sr(e), c = qt(), d = x(() => e.id || `input-${c}`), m = x(() => `${d.value}-messages`), {
      errorMessages: v,
      isDirty: g,
      isDisabled: f,
      isReadonly: h,
      isPristine: b,
      isValid: y,
      isValidating: E,
      reset: w,
      resetValidation: I,
      validate: T,
      validationClasses: _
    } = Tc(e, "v-input", d), P = x(() => ({
      id: d,
      messagesId: m,
      isDirty: g,
      isDisabled: f,
      isReadonly: h,
      isPristine: b,
      isValid: y,
      isValidating: E,
      reset: w,
      resetValidation: I,
      validate: T
    })), R = D(() => e.error || e.disabled ? void 0 : e.focused ? e.color : e.baseColor), Y = D(() => {
      if (e.iconColor)
        return e.iconColor === !0 ? R.value : e.iconColor;
    }), j = x(() => {
      var O;
      return (O = e.errorMessages) != null && O.length || !b.value && v.value.length ? v.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ie(() => {
      var H, te, ne, me;
      const O = !!(a.prepend || e.prependIcon), B = !!(a.append || e.appendIcon), F = j.value.length > 0, N = !e.hideDetails || e.hideDetails === "auto" && (F || !!a.details);
      return C("div", {
        class: X(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, i.value, r.value, s.value, _.value, e.class]),
        style: ve([o.value, e.style])
      }, [O && C("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(H = a.prepend) == null ? void 0 : H.call(a, P.value), e.prependIcon && p(u, {
        key: "prepend-icon",
        name: "prepend",
        color: Y.value
      }, null)]), a.default && C("div", {
        class: "v-input__control"
      }, [(te = a.default) == null ? void 0 : te.call(a, P.value)]), B && C("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && p(u, {
        key: "append-icon",
        name: "append",
        color: Y.value
      }, null), (ne = a.append) == null ? void 0 : ne.call(a, P.value)]), N && C("div", {
        id: m.value,
        class: "v-input__details",
        role: "alert",
        "aria-live": "polite"
      }, [p(Ec, {
        active: F,
        messages: j.value
      }, {
        message: a.message
      }), (me = a.details) == null ? void 0 : me.call(a, P.value)])]);
    }), {
      reset: w,
      resetValidation: I,
      validate: T,
      isValid: y,
      errorMessages: v
    };
  }
}), Ua = Symbol("Forwarded refs");
function Ya(e, t) {
  let n = e;
  for (; n; ) {
    const a = Reflect.getOwnPropertyDescriptor(n, t);
    if (a) return a;
    n = Object.getPrototypeOf(n);
  }
}
function Yn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    n[a - 1] = arguments[a];
  return e[Ua] = n, new Proxy(e, {
    get(l, i) {
      if (Reflect.has(l, i))
        return Reflect.get(l, i);
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const o of n)
          if (o.value && Reflect.has(o.value, i)) {
            const r = Reflect.get(o.value, i);
            return typeof r == "function" ? r.bind(o.value) : r;
          }
      }
    },
    has(l, i) {
      if (Reflect.has(l, i))
        return !0;
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const o of n)
        if (o.value && Reflect.has(o.value, i))
          return !0;
      return !1;
    },
    set(l, i, o) {
      if (Reflect.has(l, i))
        return Reflect.set(l, i, o);
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__")) return !1;
      for (const r of n)
        if (r.value && Reflect.has(r.value, i))
          return Reflect.set(r.value, i, o);
      return !1;
    },
    getOwnPropertyDescriptor(l, i) {
      var r;
      const o = Reflect.getOwnPropertyDescriptor(l, i);
      if (o) return o;
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const s of n) {
          if (!s.value) continue;
          const u = Ya(s.value, i) ?? ("_" in s.value ? Ya((r = s.value._) == null ? void 0 : r.setupState, i) : void 0);
          if (u) return u;
        }
        for (const s of n) {
          const u = s.value && s.value[Ua];
          if (!u) continue;
          const c = u.slice();
          for (; c.length; ) {
            const d = c.shift(), m = Ya(d.value, i);
            if (m) return m;
            const v = d.value && d.value[Ua];
            v && c.push(...v);
          }
        }
      }
    }
  });
}
const Dc = Symbol.for("vuetify:display"), Oc = M({
  mobile: {
    type: Boolean,
    default: !1
  },
  mobileBreakpoint: [Number, String]
}, "display");
function Zl() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    mobile: null
  }, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : bt();
  const n = _e(Dc);
  if (!n) throw new Error("Could not find Vuetify display injection");
  const a = x(() => e.mobile ? !0 : typeof e.mobileBreakpoint == "number" ? n.width.value < e.mobileBreakpoint : e.mobileBreakpoint ? n.width.value < n.thresholds.value[e.mobileBreakpoint] : e.mobile === null ? n.mobile.value : !1), l = D(() => t ? {
    [`${t}--mobile`]: a.value
  } : {});
  return {
    ...n,
    displayClasses: l,
    mobile: a
  };
}
const Bc = Symbol.for("vuetify:goto");
function Fc() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: {
      linear: (e) => e,
      easeInQuad: (e) => e ** 2,
      easeOutQuad: (e) => e * (2 - e),
      easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
      easeInCubic: (e) => e ** 3,
      easeOutCubic: (e) => --e ** 3 + 1,
      easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
      easeInQuart: (e) => e ** 4,
      easeOutQuart: (e) => 1 - --e ** 4,
      easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
      easeInQuint: (e) => e ** 5,
      easeOutQuint: (e) => 1 + --e ** 5,
      easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5
    }
  };
}
function Lc(e) {
  return ei(e) ?? (document.scrollingElement || document.body);
}
function ei(e) {
  return typeof e == "string" ? document.querySelector(e) : To(e);
}
function Xa(e, t, n) {
  if (typeof e == "number") return t && n ? -e : e;
  let a = ei(e), l = 0;
  for (; a; )
    l += t ? a.offsetLeft : a.offsetTop, a = a.offsetParent;
  return l;
}
async function Zi(e, t, n, a) {
  const l = n ? "scrollLeft" : "scrollTop", i = xt((a == null ? void 0 : a.options) ?? Fc(), t), o = a == null ? void 0 : a.rtl.value, r = (typeof e == "number" ? e : ei(e)) ?? 0, s = i.container === "parent" && r instanceof HTMLElement ? r.parentElement : Lc(i.container), u = typeof i.easing == "function" ? i.easing : i.patterns[i.easing];
  if (!u) throw new TypeError(`Easing function "${i.easing}" not found.`);
  let c;
  if (typeof r == "number")
    c = Xa(r, n, o);
  else if (c = Xa(r, n, o) - Xa(s, n, o), i.layout) {
    const g = window.getComputedStyle(r).getPropertyValue("--v-layout-top");
    g && (c -= parseInt(g, 10));
  }
  c += i.offset, c = Rc(s, c, !!o, !!n);
  const d = s[l] ?? 0;
  if (c === d) return Promise.resolve(c);
  const m = performance.now();
  return new Promise((v) => requestAnimationFrame(function g(f) {
    const b = (f - m) / i.duration, y = Math.floor(d + (c - d) * u(ct(b, 0, 1)));
    if (s[l] = y, b >= 1 && Math.abs(y - s[l]) < 10)
      return v(c);
    if (b > 2)
      return Kt("Scroll target is not reachable"), v(s[l]);
    requestAnimationFrame(g);
  }));
}
function Mc() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = _e(Bc), {
    isRtl: n
  } = Lt();
  if (!t) throw new Error("[Vuetify] Could not find injected goto instance");
  const a = {
    ...t,
    // can be set via VLocaleProvider
    rtl: D(() => t.rtl.value || n.value)
  };
  async function l(i, o) {
    return Zi(i, xt(e, o), !1, a);
  }
  return l.horizontal = async (i, o) => Zi(i, xt(e, o), !0, a), l;
}
function Rc(e, t, n, a) {
  const {
    scrollWidth: l,
    scrollHeight: i
  } = e, [o, r] = e === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [e.offsetWidth, e.offsetHeight];
  let s, u;
  return a ? n ? (s = -(l - o), u = 0) : (s = 0, u = l - o) : (s = 0, u = i + -r), ct(t, s, u);
}
function Nc(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isRtl: a,
    isHorizontal: l
  } = e;
  const i = $n(l, n), o = Ir(l, a, n), r = $n(l, t), s = Er(l, t), u = r * 0.4;
  return o > s ? s - u : o + i < s + r ? s - i + r + u : o;
}
function $c(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isHorizontal: a
  } = e;
  const l = $n(a, n), i = Er(a, t), o = $n(a, t);
  return i - l / 2 + o / 2;
}
function eo(e, t) {
  const n = e ? "scrollWidth" : "scrollHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function zc(e, t) {
  const n = e ? "clientWidth" : "clientHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Ir(e, t, n) {
  if (!n)
    return 0;
  const {
    scrollLeft: a,
    offsetWidth: l,
    scrollWidth: i
  } = n;
  return e ? t ? i - l + a : a : n.scrollTop;
}
function $n(e, t) {
  const n = e ? "offsetWidth" : "offsetHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Er(e, t) {
  const n = e ? "offsetLeft" : "offsetTop";
  return (t == null ? void 0 : t[n]) || 0;
}
const jc = Symbol.for("vuetify:v-slide-group"), _r = M({
  centerActive: Boolean,
  contentClass: null,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: jc
  },
  nextIcon: {
    type: ye,
    default: "$next"
  },
  prevIcon: {
    type: ye,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...de(),
  ...Oc({
    mobile: null
  }),
  ...Ne(),
  ...Kl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), to = J()({
  name: "VSlideGroup",
  props: _r(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: a
    } = Lt(), {
      displayClasses: l,
      mobile: i
    } = Zl(e), o = Ul(e, e.symbol), r = U(!1), s = U(0), u = U(0), c = U(0), d = x(() => e.direction === "horizontal"), {
      resizeRef: m,
      contentRect: v
    } = Mn(), {
      resizeRef: g,
      contentRect: f
    } = Mn(), h = Mc(), b = x(() => ({
      container: m.el,
      duration: 200,
      easing: "easeOutQuart"
    })), y = x(() => o.selected.value.length ? o.items.value.findIndex((k) => k.id === o.selected.value[0]) : -1), E = x(() => o.selected.value.length ? o.items.value.findIndex((k) => k.id === o.selected.value[o.selected.value.length - 1]) : -1);
    if (Pe) {
      let k = -1;
      ee(() => [o.selected.value, v.value, f.value, d.value], () => {
        cancelAnimationFrame(k), k = requestAnimationFrame(() => {
          if (v.value && f.value) {
            const A = d.value ? "width" : "height";
            u.value = v.value[A], c.value = f.value[A], r.value = u.value + 1 < c.value;
          }
          if (y.value >= 0 && g.el) {
            const A = g.el.children[E.value];
            I(A, e.centerActive);
          }
        });
      });
    }
    const w = U(!1);
    function I(k, A) {
      let z = 0;
      A ? z = $c({
        containerElement: m.el,
        isHorizontal: d.value,
        selectedElement: k
      }) : z = Nc({
        containerElement: m.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: k
      }), T(z);
    }
    function T(k) {
      if (!Pe || !m.el) return;
      const A = $n(d.value, m.el), z = Ir(d.value, a.value, m.el);
      if (!(eo(d.value, m.el) <= A || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(k - z) < 16)) {
        if (d.value && a.value && m.el) {
          const {
            scrollWidth: $,
            offsetWidth: he
          } = m.el;
          k = $ - he - k;
        }
        d.value ? h.horizontal(k, b.value) : h(k, b.value);
      }
    }
    function _(k) {
      const {
        scrollTop: A,
        scrollLeft: z
      } = k.target;
      s.value = d.value ? z : A;
    }
    function P(k) {
      if (w.value = !0, !(!r.value || !g.el)) {
        for (const A of k.composedPath())
          for (const z of g.el.children)
            if (z === A) {
              I(z);
              return;
            }
      }
    }
    function R(k) {
      w.value = !1;
    }
    let Y = !1;
    function j(k) {
      var A;
      !Y && !w.value && !(k.relatedTarget && ((A = g.el) != null && A.contains(k.relatedTarget))) && N(), Y = !1;
    }
    function O() {
      Y = !0;
    }
    function B(k) {
      if (!g.el) return;
      function A(z) {
        k.preventDefault(), N(z);
      }
      d.value ? k.key === "ArrowRight" ? A(a.value ? "prev" : "next") : k.key === "ArrowLeft" && A(a.value ? "next" : "prev") : k.key === "ArrowDown" ? A("next") : k.key === "ArrowUp" && A("prev"), k.key === "Home" ? A("first") : k.key === "End" && A("last");
    }
    function F(k, A) {
      if (!k) return;
      let z = k;
      do
        z = z == null ? void 0 : z[A === "next" ? "nextElementSibling" : "previousElementSibling"];
      while (z != null && z.hasAttribute("disabled"));
      return z;
    }
    function N(k) {
      if (!g.el) return;
      let A;
      if (!k)
        A = Fn(g.el)[0];
      else if (k === "next") {
        if (A = F(g.el.querySelector(":focus"), k), !A) return N("first");
      } else if (k === "prev") {
        if (A = F(g.el.querySelector(":focus"), k), !A) return N("last");
      } else k === "first" ? (A = g.el.firstElementChild, A != null && A.hasAttribute("disabled") && (A = F(A, "next"))) : k === "last" && (A = g.el.lastElementChild, A != null && A.hasAttribute("disabled") && (A = F(A, "prev")));
      A && A.focus({
        preventScroll: !0
      });
    }
    function H(k) {
      const A = d.value && a.value ? -1 : 1, z = (k === "prev" ? -A : A) * u.value;
      let ge = s.value + z;
      if (d.value && a.value && m.el) {
        const {
          scrollWidth: $,
          offsetWidth: he
        } = m.el;
        ge += $ - he;
      }
      T(ge);
    }
    const te = x(() => ({
      next: o.next,
      prev: o.prev,
      select: o.select,
      isSelected: o.isSelected
    })), ne = x(() => {
      switch (e.showArrows) {
        // Always show arrows on desktop & mobile
        case "always":
          return !0;
        // Always show arrows on desktop
        case "desktop":
          return !i.value;
        // Show arrows on mobile when overflowing.
        // This matches the default 2.2 behavior
        case !0:
          return r.value || Math.abs(s.value) > 0;
        // Always show on mobile
        case "mobile":
          return i.value || r.value || Math.abs(s.value) > 0;
        // https://material.io/components/tabs#scrollable-tabs
        // Always show arrows when
        // overflowed on desktop
        default:
          return !i.value && (r.value || Math.abs(s.value) > 0);
      }
    }), me = x(() => Math.abs(s.value) > 1), S = x(() => {
      if (!m.value) return !1;
      const k = eo(d.value, m.el), A = zc(d.value, m.el);
      return k - A - Math.abs(s.value) > 1;
    });
    return ie(() => p(e.tag, {
      class: X(["v-slide-group", {
        "v-slide-group--vertical": !d.value,
        "v-slide-group--has-affixes": ne.value,
        "v-slide-group--is-overflowing": r.value
      }, l.value, e.class]),
      style: ve(e.style),
      tabindex: w.value || o.selected.value.length ? -1 : 0,
      onFocus: j
    }, {
      default: () => {
        var k, A, z;
        return [ne.value && C("div", {
          key: "prev",
          class: X(["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !me.value
          }]),
          onMousedown: O,
          onClick: () => me.value && H("prev")
        }, [((k = n.prev) == null ? void 0 : k.call(n, te.value)) ?? p(Hi, null, {
          default: () => [p(Te, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), C("div", {
          key: "container",
          ref: m,
          class: X(["v-slide-group__container", e.contentClass]),
          onScroll: _
        }, [C("div", {
          ref: g,
          class: "v-slide-group__content",
          onFocusin: P,
          onFocusout: R,
          onKeydown: B
        }, [(A = n.default) == null ? void 0 : A.call(n, te.value)])]), ne.value && C("div", {
          key: "next",
          class: X(["v-slide-group__next", {
            "v-slide-group__next--disabled": !S.value
          }]),
          onMousedown: O,
          onClick: () => S.value && H("next")
        }, [((z = n.next) == null ? void 0 : z.call(n, te.value)) ?? p(Hi, null, {
          default: () => [p(Te, {
            icon: a.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: o.selected,
      scrollTo: H,
      scrollOffset: s,
      focus: N,
      hasPrev: me,
      hasNext: S
    };
  }
}), Pr = Symbol.for("vuetify:v-chip-group"), Hc = M({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Ze
  },
  ..._r(),
  ...de(),
  ...Kl({
    selectedClass: "v-chip--selected"
  }),
  ...Ne(),
  ...Re(),
  ...Nt({
    variant: "tonal"
  })
}, "VChipGroup");
J()({
  name: "VChipGroup",
  props: Hc(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ye(e), {
      isSelected: l,
      select: i,
      next: o,
      prev: r,
      selected: s
    } = Ul(e, Pr);
    return hn({
      VChip: {
        baseColor: D(() => e.baseColor),
        color: D(() => e.color),
        disabled: D(() => e.disabled),
        filter: D(() => e.filter),
        variant: D(() => e.variant)
      }
    }), ie(() => {
      const u = to.filterProps(e);
      return p(to, K(u, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, a.value, e.class],
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
            isSelected: l,
            select: i,
            next: o,
            prev: r,
            selected: s.value
          })];
        }
      });
    }), {};
  }
});
const Wc = M({
  activeClass: String,
  appendAvatar: String,
  appendIcon: ye,
  baseColor: String,
  closable: Boolean,
  closeIcon: {
    type: ye,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: ye,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: ye,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: Ue(),
  onClickOnce: Ue(),
  ...Jt(),
  ...de(),
  ...St(),
  ...bn(),
  ...tr(),
  ...pt(),
  ...Ma(),
  ...Kn(),
  ...Ne({
    tag: "span"
  }),
  ...Re(),
  ...Nt({
    variant: "tonal"
  })
}, "VChip"), Ar = J()({
  name: "VChip",
  directives: {
    vRipple: It
  },
  props: Wc(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      t: i
    } = Ba(), {
      borderClasses: o
    } = Zt(e), {
      densityClasses: r
    } = _t(e), {
      elevationClasses: s
    } = pn(e), {
      roundedClasses: u
    } = wt(e), {
      sizeClasses: c
    } = Un(e), {
      themeClasses: d
    } = Ye(e), m = De(e, "modelValue"), v = nr(e, Pr, !1), g = La(e, n), f = D(() => e.link !== !1 && g.isLink.value), h = x(() => !e.disabled && e.link !== !1 && (!!v || e.link || g.isClickable.value)), b = D(() => ({
      "aria-label": i(e.closeLabel),
      disabled: e.disabled,
      onClick(_) {
        _.preventDefault(), _.stopPropagation(), m.value = !1, a("click:close", _);
      }
    })), {
      colorClasses: y,
      colorStyles: E,
      variantClasses: w
    } = Gn(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function I(_) {
      var P;
      a("click", _), h.value && ((P = g.navigate) == null || P.call(g, _), v == null || v.toggle());
    }
    function T(_) {
      (_.key === "Enter" || _.key === " ") && (_.preventDefault(), I(_));
    }
    return () => {
      var F;
      const _ = g.isLink.value ? "a" : e.tag, P = !!(e.appendIcon || e.appendAvatar), R = !!(P || l.append), Y = !!(l.close || e.closable), j = !!(l.filter || e.filter) && v, O = !!(e.prependIcon || e.prependAvatar), B = !!(O || l.prepend);
      return m.value && et(p(_, K({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": h.value,
          "v-chip--filter": j,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((F = g.isActive) == null ? void 0 : F.value)
        }, d.value, o.value, y.value, r.value, s.value, u.value, c.value, w.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [E.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: h.value ? 0 : void 0,
        onClick: I,
        onKeydown: h.value && !f.value && T
      }, g.linkProps), {
        default: () => {
          var N;
          return [Wn(h.value, "v-chip"), j && p(qo, {
            key: "filter"
          }, {
            default: () => [et(C("div", {
              class: "v-chip__filter"
            }, [l.filter ? p(Fe, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, l.filter) : p(Te, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[gn, v.isSelected.value]])]
          }), B && C("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [l.prepend ? p(Fe, {
            key: "prepend-defaults",
            disabled: !O,
            defaults: {
              VAvatar: {
                image: e.prependAvatar,
                start: !0
              },
              VIcon: {
                icon: e.prependIcon,
                start: !0
              }
            }
          }, l.prepend) : C(Se, null, [e.prependIcon && p(Te, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && p(Ft, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), C("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((N = l.default) == null ? void 0 : N.call(l, {
            isSelected: v == null ? void 0 : v.isSelected.value,
            selectedClass: v == null ? void 0 : v.selectedClass.value,
            select: v == null ? void 0 : v.select,
            toggle: v == null ? void 0 : v.toggle,
            value: v == null ? void 0 : v.value.value,
            disabled: e.disabled
          })) ?? fn(e.text)]), R && C("div", {
            key: "append",
            class: "v-chip__append"
          }, [l.append ? p(Fe, {
            key: "append-defaults",
            disabled: !P,
            defaults: {
              VAvatar: {
                end: !0,
                image: e.appendAvatar
              },
              VIcon: {
                end: !0,
                icon: e.appendIcon
              }
            }
          }, l.append) : C(Se, null, [e.appendIcon && p(Te, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && p(Ft, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), Y && C("button", K({
            key: "close",
            class: "v-chip__close",
            type: "button",
            "data-testid": "close-chip"
          }, b.value), [l.close ? p(Fe, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, l.close) : p(Te, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[It, h.value && e.ripple, null]]);
    };
  }
}), Gc = M({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...de(),
  ...Re()
}, "VDivider"), ti = J()({
  name: "VDivider",
  props: Gc(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ye(e), {
      textColorClasses: i,
      textColorStyles: o
    } = gt(() => e.color), r = x(() => {
      const s = {};
      return e.length && (s[e.vertical ? "height" : "width"] = le(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = le(e.thickness)), s;
    });
    return ie(() => {
      const s = C("hr", {
        class: X([{
          "v-divider": !0,
          "v-divider--inset": e.inset,
          "v-divider--vertical": e.vertical
        }, l.value, i.value, e.class]),
        style: ve([r.value, o.value, {
          "--v-border-opacity": e.opacity
        }, e.style]),
        "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
        role: `${n.role || "separator"}`
      }, null);
      return a.default ? C("div", {
        class: X(["v-divider__wrapper", {
          "v-divider__wrapper--vertical": e.vertical,
          "v-divider__wrapper--inset": e.inset
        }])
      }, [s, C("div", {
        class: "v-divider__content"
      }, [a.default()]), s]) : s;
    }), {};
  }
}), El = Symbol.for("vuetify:list");
function Vr() {
  let {
    filterable: e
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    filterable: !1
  };
  const t = _e(El, {
    filterable: !1,
    hasPrepend: U(!1),
    updateHasPrepend: () => null
  }), n = {
    filterable: t.filterable || e,
    hasPrepend: U(!1),
    updateHasPrepend: (a) => {
      a && (n.hasPrepend.value = a);
    }
  };
  return tt(El, n), t;
}
function Tr() {
  return _e(El, null);
}
const ni = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: a,
        value: l,
        activated: i
      } = n;
      return a = Oe(a), e && !l && i.size === 1 && i.has(a) || (l ? i.add(a) : i.delete(a)), i;
    },
    in: (n, a, l) => {
      let i = /* @__PURE__ */ new Set();
      if (n != null)
        for (const o of Ke(n))
          i = t.activate({
            id: o,
            value: !0,
            activated: new Set(i),
            children: a,
            parents: l
          });
      return i;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, Dr = (e) => {
  const t = ni(e);
  return {
    activate: (a) => {
      let {
        activated: l,
        id: i,
        ...o
      } = a;
      i = Oe(i);
      const r = l.has(i) ? /* @__PURE__ */ new Set([i]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...o,
        id: i,
        activated: r
      });
    },
    in: (a, l, i) => {
      let o = /* @__PURE__ */ new Set();
      if (a != null) {
        const r = Ke(a);
        r.length && (o = t.in(r.slice(0, 1), l, i));
      }
      return o;
    },
    out: (a, l, i) => t.out(a, l, i)
  };
}, Kc = (e) => {
  const t = ni(e);
  return {
    activate: (a) => {
      let {
        id: l,
        activated: i,
        children: o,
        ...r
      } = a;
      return l = Oe(l), o.has(l) ? i : t.activate({
        id: l,
        activated: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Uc = (e) => {
  const t = Dr(e);
  return {
    activate: (a) => {
      let {
        id: l,
        activated: i,
        children: o,
        ...r
      } = a;
      return l = Oe(l), o.has(l) ? i : t.activate({
        id: l,
        activated: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Yc = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (n) {
      const i = /* @__PURE__ */ new Set();
      i.add(t);
      let o = l.get(t);
      for (; o != null; )
        i.add(o), o = l.get(o);
      return i;
    } else
      return a.delete(t), a;
  },
  select: () => null
}, Or = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (n) {
      let i = l.get(t);
      for (a.add(t); i != null && i !== t; )
        a.add(i), i = l.get(i);
      return a;
    } else
      a.delete(t);
    return a;
  },
  select: () => null
}, Xc = {
  open: Or.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: a,
      parents: l
    } = e;
    if (!n) return a;
    const i = [];
    let o = l.get(t);
    for (; o != null; )
      i.push(o), o = l.get(o);
    return new Set(i);
  }
}, ai = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: l,
        selected: i
      } = n;
      if (a = Oe(a), e && !l) {
        const o = Array.from(i.entries()).reduce((r, s) => {
          let [u, c] = s;
          return c === "on" && r.push(u), r;
        }, []);
        if (o.length === 1 && o[0] === a) return i;
      }
      return i.set(a, l ? "on" : "off"), i;
    },
    in: (n, a, l, i) => {
      const o = /* @__PURE__ */ new Map();
      for (const r of n || [])
        t.select({
          id: r,
          value: !0,
          selected: o,
          children: a,
          parents: l,
          disabled: i
        });
      return o;
    },
    out: (n) => {
      const a = [];
      for (const [l, i] of n.entries())
        i === "on" && a.push(l);
      return a;
    }
  };
  return t;
}, Br = (e) => {
  const t = ai(e);
  return {
    select: (a) => {
      let {
        selected: l,
        id: i,
        ...o
      } = a;
      i = Oe(i);
      const r = l.has(i) ? /* @__PURE__ */ new Map([[i, l.get(i)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...o,
        id: i,
        selected: r
      });
    },
    in: (a, l, i, o) => a != null && a.length ? t.in(a.slice(0, 1), l, i, o) : /* @__PURE__ */ new Map(),
    out: (a, l, i) => t.out(a, l, i)
  };
}, qc = (e) => {
  const t = ai(e);
  return {
    select: (a) => {
      let {
        id: l,
        selected: i,
        children: o,
        ...r
      } = a;
      return l = Oe(l), o.has(l) ? i : t.select({
        id: l,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Qc = (e) => {
  const t = Br(e);
  return {
    select: (a) => {
      let {
        id: l,
        selected: i,
        children: o,
        ...r
      } = a;
      return l = Oe(l), o.has(l) ? i : t.select({
        id: l,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Fr = (e) => {
  const t = {
    select: (n) => {
      let {
        id: a,
        value: l,
        selected: i,
        children: o,
        parents: r,
        disabled: s
      } = n;
      a = Oe(a);
      const u = new Map(i), c = [a];
      for (; c.length; ) {
        const m = c.shift();
        s.has(m) || i.set(Oe(m), l ? "on" : "off"), o.has(m) && c.push(...o.get(m));
      }
      let d = Oe(r.get(a));
      for (; d; ) {
        let m = !0, v = !0;
        for (const g of o.get(d)) {
          const f = Oe(g);
          if (!s.has(f) && (i.get(f) !== "on" && (m = !1), i.has(f) && i.get(f) !== "off" && (v = !1), !m && !v))
            break;
        }
        i.set(d, m ? "on" : v ? "off" : "indeterminate"), d = Oe(r.get(d));
      }
      return e && !l && Array.from(i.entries()).reduce((v, g) => {
        let [f, h] = g;
        return h === "on" && v.push(f), v;
      }, []).length === 0 ? u : i;
    },
    in: (n, a, l, i) => {
      let o = /* @__PURE__ */ new Map();
      for (const r of n || [])
        o = t.select({
          id: r,
          value: !0,
          selected: o,
          children: a,
          parents: l,
          disabled: i
        });
      return o;
    },
    out: (n, a) => {
      const l = [];
      for (const [i, o] of n.entries())
        o === "on" && !a.has(i) && l.push(i);
      return l;
    }
  };
  return t;
}, Jc = (e) => {
  const t = Fr(e);
  return {
    select: t.select,
    in: t.in,
    out: (a, l, i) => {
      const o = [];
      for (const [r, s] of a.entries())
        if (s === "on") {
          if (i.has(r)) {
            const u = i.get(r);
            if (a.get(u) === "on") continue;
          }
          o.push(r);
        }
      return o;
    }
  };
}, zn = Symbol.for("vuetify:nested"), Lr = {
  id: U(),
  root: {
    register: () => null,
    unregister: () => null,
    children: Z(/* @__PURE__ */ new Map()),
    parents: Z(/* @__PURE__ */ new Map()),
    disabled: Z(/* @__PURE__ */ new Set()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: Z(!1),
    selectable: Z(!1),
    opened: Z(/* @__PURE__ */ new Set()),
    activated: Z(/* @__PURE__ */ new Set()),
    selected: Z(/* @__PURE__ */ new Map()),
    selectedValues: Z([]),
    getPath: () => []
  }
}, Zc = M({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, "nested"), ed = (e) => {
  let t = !1;
  const n = U(/* @__PURE__ */ new Map()), a = U(/* @__PURE__ */ new Map()), l = U(/* @__PURE__ */ new Set()), i = De(e, "opened", e.opened, (f) => new Set(Array.isArray(f) ? f.map((h) => Oe(h)) : f), (f) => [...f.values()]), o = x(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    if (typeof e.activeStrategy == "function") return e.activeStrategy(e.mandatory);
    switch (e.activeStrategy) {
      case "leaf":
        return Kc(e.mandatory);
      case "single-leaf":
        return Uc(e.mandatory);
      case "independent":
        return ni(e.mandatory);
      case "single-independent":
      default:
        return Dr(e.mandatory);
    }
  }), r = x(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    if (typeof e.selectStrategy == "function") return e.selectStrategy(e.mandatory);
    switch (e.selectStrategy) {
      case "single-leaf":
        return Qc(e.mandatory);
      case "leaf":
        return qc(e.mandatory);
      case "independent":
        return ai(e.mandatory);
      case "single-independent":
        return Br(e.mandatory);
      case "trunk":
        return Jc(e.mandatory);
      case "classic":
      default:
        return Fr(e.mandatory);
    }
  }), s = x(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Xc;
      case "single":
        return Yc;
      case "multiple":
      default:
        return Or;
    }
  }), u = De(e, "activated", e.activated, (f) => o.value.in(f, n.value, a.value), (f) => o.value.out(f, n.value, a.value)), c = De(e, "selected", e.selected, (f) => r.value.in(f, n.value, a.value, l.value), (f) => r.value.out(f, n.value, a.value));
  yt(() => {
    t = !0;
  });
  function d(f) {
    const h = [];
    let b = Oe(f);
    for (; b != null; )
      h.unshift(b), b = a.value.get(b);
    return h;
  }
  const m = Le("nested"), v = /* @__PURE__ */ new Set(), g = {
    id: U(),
    root: {
      opened: i,
      activatable: D(() => e.activatable),
      selectable: D(() => e.selectable),
      activated: u,
      selected: c,
      selectedValues: x(() => {
        const f = [];
        for (const [h, b] of c.value.entries())
          b === "on" && f.push(h);
        return f;
      }),
      register: (f, h, b, y) => {
        if (v.has(f)) {
          const E = d(f).map(String).join(" -> "), w = d(h).concat(f).map(String).join(" -> ");
          zo(`Multiple nodes with the same ID
	${E}
	${w}`);
          return;
        } else
          v.add(f);
        h && f !== h && a.value.set(f, h), b && l.value.add(f), y && n.value.set(f, []), h != null && n.value.set(h, [...n.value.get(h) || [], f]);
      },
      unregister: (f) => {
        if (t) return;
        v.delete(f), n.value.delete(f), l.value.delete(f);
        const h = a.value.get(f);
        if (h) {
          const b = n.value.get(h) ?? [];
          n.value.set(h, b.filter((y) => y !== f));
        }
        a.value.delete(f);
      },
      open: (f, h, b) => {
        m.emit("click:open", {
          id: f,
          value: h,
          path: d(f),
          event: b
        });
        const y = s.value.open({
          id: f,
          value: h,
          opened: new Set(i.value),
          children: n.value,
          parents: a.value,
          event: b
        });
        y && (i.value = y);
      },
      openOnSelect: (f, h, b) => {
        const y = s.value.select({
          id: f,
          value: h,
          selected: new Map(c.value),
          opened: new Set(i.value),
          children: n.value,
          parents: a.value,
          event: b
        });
        y && (i.value = y);
      },
      select: (f, h, b) => {
        m.emit("click:select", {
          id: f,
          value: h,
          path: d(f),
          event: b
        });
        const y = r.value.select({
          id: f,
          value: h,
          selected: new Map(c.value),
          children: n.value,
          parents: a.value,
          disabled: l.value,
          event: b
        });
        y && (c.value = y), g.root.openOnSelect(f, h, b);
      },
      activate: (f, h, b) => {
        if (!e.activatable)
          return g.root.select(f, !0, b);
        m.emit("click:activate", {
          id: f,
          value: h,
          path: d(f),
          event: b
        });
        const y = o.value.activate({
          id: f,
          value: h,
          activated: new Set(u.value),
          children: n.value,
          parents: a.value,
          event: b
        });
        if (y.size !== u.value.size)
          u.value = y;
        else {
          for (const E of y)
            if (!u.value.has(E)) {
              u.value = y;
              return;
            }
          for (const E of u.value)
            if (!y.has(E)) {
              u.value = y;
              return;
            }
        }
      },
      children: n,
      parents: a,
      disabled: l,
      getPath: d
    }
  };
  return tt(zn, g), g.root;
}, Mr = (e, t, n) => {
  const a = _e(zn, Lr), l = Symbol("nested item"), i = x(() => Oe(mt(e)) ?? l), o = {
    ...a,
    id: i,
    open: (r, s) => a.root.open(i.value, r, s),
    openOnSelect: (r, s) => a.root.openOnSelect(i.value, r, s),
    isOpen: x(() => a.root.opened.value.has(i.value)),
    parent: x(() => a.root.parents.value.get(i.value)),
    activate: (r, s) => a.root.activate(i.value, r, s),
    isActivated: x(() => a.root.activated.value.has(i.value)),
    select: (r, s) => a.root.select(i.value, r, s),
    isSelected: x(() => a.root.selected.value.get(i.value) === "on"),
    isIndeterminate: x(() => a.root.selected.value.get(i.value) === "indeterminate"),
    isLeaf: x(() => !a.root.children.value.get(i.value)),
    isGroupActivator: a.isGroupActivator
  };
  return Ta(() => {
    a.isGroupActivator || a.root.register(i.value, a.id.value, mt(t), n);
  }), yt(() => {
    a.isGroupActivator || a.root.unregister(i.value);
  }), n && tt(zn, o), o;
}, td = () => {
  const e = _e(zn, Lr);
  tt(zn, {
    ...e,
    isGroupActivator: !0
  });
}, nd = Hn({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return td(), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), ad = M({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: ye,
    default: "$collapse"
  },
  disabled: Boolean,
  expandIcon: {
    type: ye,
    default: "$expand"
  },
  rawId: [String, Number],
  prependIcon: ye,
  appendIcon: ye,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...de(),
  ...Ne()
}, "VListGroup"), no = J()({
  name: "VListGroup",
  props: ad(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: a,
      open: l,
      id: i
    } = Mr(() => e.value, () => e.disabled, !0), o = x(() => `v-list-group--id-${String(e.rawId ?? i.value)}`), r = Tr(), {
      isBooted: s
    } = Yu();
    function u(v) {
      var g;
      ["INPUT", "TEXTAREA"].includes((g = v.target) == null ? void 0 : g.tagName) || l(!a.value, v);
    }
    const c = x(() => ({
      onClick: u,
      class: "v-list-group__header",
      id: o.value
    })), d = x(() => a.value ? e.collapseIcon : e.expandIcon), m = x(() => ({
      VListItem: {
        active: a.value,
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && d.value,
        appendIcon: e.appendIcon || !e.subgroup && d.value,
        title: e.title,
        value: e.value
      }
    }));
    return ie(() => p(e.tag, {
      class: X(["v-list-group", {
        "v-list-group--prepend": r == null ? void 0 : r.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": a.value
      }, e.class]),
      style: ve(e.style)
    }, {
      default: () => [n.activator && p(Fe, {
        defaults: m.value
      }, {
        default: () => [p(nd, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: a.value
          })]
        })]
      }), p(Dt, {
        transition: {
          component: Hu
        },
        disabled: !s.value
      }, {
        default: () => {
          var v;
          return [et(C("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": o.value
          }, [(v = n.default) == null ? void 0 : v.call(n)]), [[gn, a.value]])];
        }
      })]
    })), {
      isOpen: a
    };
  }
}), ld = M({
  opacity: [Number, String],
  ...de(),
  ...Ne()
}, "VListItemSubtitle"), id = J()({
  name: "VListItemSubtitle",
  props: ld(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => p(e.tag, {
      class: X(["v-list-item-subtitle", e.class]),
      style: ve([{
        "--v-list-item-subtitle-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), od = Ho("v-list-item-title"), rd = M({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: ye,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: ye,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  value: null,
  onClick: Ue(),
  onClickOnce: Ue(),
  ...Jt(),
  ...de(),
  ...St(),
  ...Mt(),
  ...bn(),
  ...pt(),
  ...Ma(),
  ...Ne(),
  ...Re(),
  ...Nt({
    variant: "text"
  })
}, "VListItem"), vn = J()({
  name: "VListItem",
  directives: {
    vRipple: It
  },
  props: rd(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: a,
      emit: l
    } = t;
    const i = La(e, n), o = x(() => e.value === void 0 ? i.href.value : e.value), {
      activate: r,
      isActivated: s,
      select: u,
      isOpen: c,
      isSelected: d,
      isIndeterminate: m,
      isGroupActivator: v,
      root: g,
      parent: f,
      openOnSelect: h,
      id: b
    } = Mr(o, () => e.disabled, !1), y = Tr(), E = x(() => {
      var $;
      return e.active !== !1 && (e.active || (($ = i.isActive) == null ? void 0 : $.value) || (g.activatable.value ? s.value : d.value));
    }), w = D(() => e.link !== !1 && i.isLink.value), I = x(() => !!y && (g.selectable.value || g.activatable.value || e.value != null)), T = x(() => !e.disabled && e.link !== !1 && (e.link || i.isClickable.value || I.value)), _ = D(() => e.rounded || e.nav), P = D(() => e.color ?? e.activeColor), R = D(() => ({
      color: E.value ? P.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    ee(() => {
      var $;
      return ($ = i.isActive) == null ? void 0 : $.value;
    }, ($) => {
      $ && Y();
    }), Ta(() => {
      var $;
      ($ = i.isActive) != null && $.value && Y();
    });
    function Y() {
      f.value != null && g.open(f.value, !0), h(!0);
    }
    const {
      themeClasses: j
    } = Ye(e), {
      borderClasses: O
    } = Zt(e), {
      colorClasses: B,
      colorStyles: F,
      variantClasses: N
    } = Gn(R), {
      densityClasses: H
    } = _t(e), {
      dimensionStyles: te
    } = Rt(e), {
      elevationClasses: ne
    } = pn(e), {
      roundedClasses: me
    } = wt(_), S = D(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), k = D(() => e.ripple !== void 0 && e.ripple && (y != null && y.filterable) ? {
      keys: [bl.enter]
    } : e.ripple), A = x(() => ({
      isActive: E.value,
      select: u,
      isOpen: c.value,
      isSelected: d.value,
      isIndeterminate: m.value
    }));
    function z($) {
      var he, W;
      l("click", $), !["INPUT", "TEXTAREA"].includes((he = $.target) == null ? void 0 : he.tagName) && T.value && ((W = i.navigate) == null || W.call(i, $), !v && (g.activatable.value ? r(!s.value, $) : (g.selectable.value || e.value != null) && u(!d.value, $)));
    }
    function ge($) {
      const he = $.target;
      ["INPUT", "TEXTAREA"].includes(he.tagName) || ($.key === "Enter" || $.key === " " && !(y != null && y.filterable)) && ($.preventDefault(), $.stopPropagation(), $.target.dispatchEvent(new MouseEvent("click", $)));
    }
    return ie(() => {
      const $ = w.value ? "a" : e.tag, he = a.title || e.title != null, W = a.subtitle || e.subtitle != null, be = !!(e.appendAvatar || e.appendIcon), fe = !!(be || a.append), xe = !!(e.prependAvatar || e.prependIcon), pe = !!(xe || a.prepend);
      return y == null || y.updateHasPrepend(pe), e.activeColor && _u("active-color", ["color", "base-color"]), et(p($, K({
        class: ["v-list-item", {
          "v-list-item--active": E.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": T.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !pe && (y == null ? void 0 : y.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && E.value
        }, j.value, O.value, B.value, H.value, ne.value, S.value, me.value, N.value, e.class],
        style: [F.value, te.value, e.style],
        tabindex: T.value ? y ? -2 : 0 : void 0,
        "aria-selected": I.value ? g.activatable.value ? s.value : g.selectable.value ? d.value : E.value : void 0,
        onClick: z,
        onKeydown: T.value && !w.value && ge
      }, i.linkProps), {
        default: () => {
          var V;
          return [Wn(T.value || E.value, "v-list-item"), pe && C("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [a.prepend ? p(Fe, {
            key: "prepend-defaults",
            disabled: !xe,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.prependAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.prependIcon
              },
              VListItemAction: {
                start: !0
              }
            }
          }, {
            default: () => {
              var G;
              return [(G = a.prepend) == null ? void 0 : G.call(a, A.value)];
            }
          }) : C(Se, null, [e.prependAvatar && p(Ft, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && p(Te, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), C("div", {
            class: "v-list-item__spacer"
          }, null)]), C("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [he && p(od, {
            key: "title"
          }, {
            default: () => {
              var G;
              return [((G = a.title) == null ? void 0 : G.call(a, {
                title: e.title
              })) ?? fn(e.title)];
            }
          }), W && p(id, {
            key: "subtitle"
          }, {
            default: () => {
              var G;
              return [((G = a.subtitle) == null ? void 0 : G.call(a, {
                subtitle: e.subtitle
              })) ?? fn(e.subtitle)];
            }
          }), (V = a.default) == null ? void 0 : V.call(a, A.value)]), fe && C("div", {
            key: "append",
            class: "v-list-item__append"
          }, [a.append ? p(Fe, {
            key: "append-defaults",
            disabled: !be,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.appendAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.appendIcon
              },
              VListItemAction: {
                end: !0
              }
            }
          }, {
            default: () => {
              var G;
              return [(G = a.append) == null ? void 0 : G.call(a, A.value)];
            }
          }) : C(Se, null, [e.appendIcon && p(Te, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && p(Ft, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), C("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[It, T.value && k.value]]);
    }), {
      activate: r,
      isActivated: s,
      isGroupActivator: v,
      isSelected: d,
      list: y,
      select: u,
      root: g,
      id: b,
      link: i
    };
  }
}), sd = M({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...de(),
  ...Ne()
}, "VListSubheader"), li = J()({
  name: "VListSubheader",
  props: sd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: a,
      textColorStyles: l
    } = gt(() => e.color);
    return ie(() => {
      const i = !!(n.default || e.title);
      return p(e.tag, {
        class: X(["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, a.value, e.class]),
        style: ve([{
          textColorStyles: l
        }, e.style])
      }, {
        default: () => {
          var o;
          return [i && C("div", {
            class: "v-list-subheader__text"
          }, [((o = n.default) == null ? void 0 : o.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
}), ud = M({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), Rr = J()({
  name: "VListChildren",
  props: ud(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Vr(), () => {
      var a, l;
      return ((a = n.default) == null ? void 0 : a.call(n)) ?? ((l = e.items) == null ? void 0 : l.map((i) => {
        var m, v;
        let {
          children: o,
          props: r,
          type: s,
          raw: u
        } = i;
        if (s === "divider")
          return ((m = n.divider) == null ? void 0 : m.call(n, {
            props: r
          })) ?? p(ti, r, null);
        if (s === "subheader")
          return ((v = n.subheader) == null ? void 0 : v.call(n, {
            props: r
          })) ?? p(li, r, null);
        const c = {
          subtitle: n.subtitle ? (g) => {
            var f;
            return (f = n.subtitle) == null ? void 0 : f.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          prepend: n.prepend ? (g) => {
            var f;
            return (f = n.prepend) == null ? void 0 : f.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          append: n.append ? (g) => {
            var f;
            return (f = n.append) == null ? void 0 : f.call(n, {
              ...g,
              item: u
            });
          } : void 0,
          title: n.title ? (g) => {
            var f;
            return (f = n.title) == null ? void 0 : f.call(n, {
              ...g,
              item: u
            });
          } : void 0
        }, d = no.filterProps(r);
        return o ? p(no, K(d, {
          value: e.returnObject ? u : r == null ? void 0 : r.value,
          rawId: r == null ? void 0 : r.value
        }), {
          activator: (g) => {
            let {
              props: f
            } = g;
            const h = {
              ...r,
              ...f,
              value: e.returnObject ? u : r.value
            };
            return n.header ? n.header({
              props: h
            }) : p(vn, h, c);
          },
          default: () => p(Rr, {
            items: o,
            returnObject: e.returnObject
          }, n)
        }) : n.item ? n.item({
          props: r
        }) : p(vn, K(r, {
          value: e.returnObject ? u : r.value
        }), c);
      }));
    };
  }
}), Nr = M({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  itemType: {
    type: [Boolean, String, Array, Function],
    default: "type"
  },
  returnObject: Boolean,
  valueComparator: Function
}, "list-items");
function Vt(e, t) {
  const n = rt(t, e.itemTitle, t), a = rt(t, e.itemValue, n), l = rt(t, e.itemChildren), i = rt(t, e.itemType, "item"), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? Qt(t, ["children"]) : t : void 0 : rt(t, e.itemProps), r = {
    title: n,
    value: a,
    ...o
  };
  return {
    type: i,
    title: String(r.title ?? ""),
    value: r.value,
    props: r,
    children: i === "item" && Array.isArray(l) ? $r(e, l) : void 0,
    raw: t
  };
}
function $r(e, t) {
  const n = Oa(e, ["itemTitle", "itemValue", "itemChildren", "itemProps", "itemType", "returnObject", "valueComparator"]), a = [];
  for (const l of t)
    a.push(Vt(n, l));
  return a;
}
function zr(e) {
  const t = x(() => $r(e, e.items)), n = x(() => t.value.some((r) => r.value === null)), a = U(/* @__PURE__ */ new Map()), l = U([]);
  vt(() => {
    const r = t.value, s = /* @__PURE__ */ new Map(), u = [];
    for (let c = 0; c < r.length; c++) {
      const d = r[c];
      if (wl(d.value) || d.value === null) {
        let m = s.get(d.value);
        m || (m = [], s.set(d.value, m)), m.push(d);
      } else
        u.push(d);
    }
    a.value = s, l.value = u;
  });
  function i(r) {
    const s = a.value, u = t.value, c = l.value, d = n.value, m = e.returnObject, v = !!e.valueComparator, g = e.valueComparator || Ze, f = Oa(e, ["itemTitle", "itemValue", "itemChildren", "itemProps", "itemType", "returnObject", "valueComparator"]), h = [];
    e: for (const b of r) {
      if (!d && b === null) continue;
      if (m && typeof b == "string") {
        h.push(Vt(f, b));
        continue;
      }
      const y = s.get(b);
      if (v || !y) {
        for (const E of v ? u : c)
          if (g(b, E.value)) {
            h.push(E);
            continue e;
          }
        h.push(Vt(f, b));
        continue;
      }
      h.push(...y);
    }
    return h;
  }
  function o(r) {
    return e.returnObject ? r.map((s) => {
      let {
        raw: u
      } = s;
      return u;
    }) : r.map((s) => {
      let {
        value: u
      } = s;
      return u;
    });
  }
  return {
    items: t,
    transformIn: i,
    transformOut: o
  };
}
function cd(e, t) {
  const n = rt(t, e.itemType, "item"), a = wl(t) ? t : rt(t, e.itemTitle), l = wl(t) ? t : rt(t, e.itemValue, void 0), i = rt(t, e.itemChildren), o = e.itemProps === !0 ? Qt(t, ["children"]) : rt(t, e.itemProps), r = {
    title: a,
    value: l,
    ...o
  };
  return {
    type: n,
    title: r.title,
    value: r.value,
    props: r,
    children: n === "item" && i ? jr(e, i) : void 0,
    raw: t
  };
}
function jr(e, t) {
  const n = [];
  for (const a of t)
    n.push(cd(e, a));
  return n;
}
function dd(e) {
  return {
    items: x(() => jr(e, e.items))
  };
}
const fd = M({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  filterable: Boolean,
  expandIcon: ye,
  collapseIcon: ye,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  "onClick:open": Ue(),
  "onClick:select": Ue(),
  "onUpdate:opened": Ue(),
  ...Zc({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...Jt(),
  ...de(),
  ...St(),
  ...Mt(),
  ...bn(),
  ...Nr(),
  ...pt(),
  ...Ne(),
  ...Re(),
  ...Nt({
    variant: "text"
  })
}, "VList"), Hr = J()({
  name: "VList",
  props: fd(),
  emits: {
    "update:selected": (e) => !0,
    "update:activated": (e) => !0,
    "update:opened": (e) => !0,
    "click:open": (e) => !0,
    "click:activate": (e) => !0,
    "click:select": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      items: a
    } = dd(e), {
      themeClasses: l
    } = Ye(e), {
      backgroundColorClasses: i,
      backgroundColorStyles: o
    } = Bt(() => e.bgColor), {
      borderClasses: r
    } = Zt(e), {
      densityClasses: s
    } = _t(e), {
      dimensionStyles: u
    } = Rt(e), {
      elevationClasses: c
    } = pn(e), {
      roundedClasses: d
    } = wt(e), {
      children: m,
      open: v,
      parents: g,
      select: f,
      getPath: h
    } = ed(e), b = D(() => e.lines ? `v-list--${e.lines}-line` : void 0), y = D(() => e.activeColor), E = D(() => e.baseColor), w = D(() => e.color);
    Vr({
      filterable: e.filterable
    }), hn({
      VListGroup: {
        activeColor: y,
        baseColor: E,
        color: w,
        expandIcon: D(() => e.expandIcon),
        collapseIcon: D(() => e.collapseIcon)
      },
      VListItem: {
        activeClass: D(() => e.activeClass),
        activeColor: y,
        baseColor: E,
        color: w,
        density: D(() => e.density),
        disabled: D(() => e.disabled),
        lines: D(() => e.lines),
        nav: D(() => e.nav),
        slim: D(() => e.slim),
        variant: D(() => e.variant)
      }
    });
    const I = U(!1), T = Z();
    function _(B) {
      I.value = !0;
    }
    function P(B) {
      I.value = !1;
    }
    function R(B) {
      var F;
      !I.value && !(B.relatedTarget && ((F = T.value) != null && F.contains(B.relatedTarget))) && O();
    }
    function Y(B) {
      const F = B.target;
      if (!(!T.value || ["INPUT", "TEXTAREA"].includes(F.tagName))) {
        if (B.key === "ArrowDown")
          O("next");
        else if (B.key === "ArrowUp")
          O("prev");
        else if (B.key === "Home")
          O("first");
        else if (B.key === "End")
          O("last");
        else
          return;
        B.preventDefault();
      }
    }
    function j(B) {
      I.value = !0;
    }
    function O(B) {
      if (T.value)
        return An(T.value, B);
    }
    return ie(() => p(e.tag, {
      ref: T,
      class: X(["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, l.value, i.value, r.value, s.value, c.value, b.value, d.value, e.class]),
      style: ve([o.value, u.value, e.style]),
      tabindex: e.disabled ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: _,
      onFocusout: P,
      onFocus: R,
      onKeydown: Y,
      onMousedown: j
    }, {
      default: () => [p(Rr, {
        items: a.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: v,
      select: f,
      focus: O,
      children: m,
      parents: g,
      getPath: h
    };
  }
});
function qa(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function vd(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function ao(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: a
    } = e, l = a === "left" ? 0 : a === "center" ? t.width / 2 : a === "right" ? t.width : a, i = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return qa({
      x: l,
      y: i
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: a
    } = e, l = n === "left" ? 0 : n === "right" ? t.width : n, i = a === "top" ? 0 : a === "center" ? t.height / 2 : a === "bottom" ? t.height : a;
    return qa({
      x: l,
      y: i
    }, t);
  }
  return qa({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const Wr = {
  static: hd,
  // specific viewport position, usually centered
  connected: bd
  // connected to a certain element
}, md = M({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Wr
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function gd(e, t) {
  const n = Z({}), a = Z();
  Pe && Xt(() => !!(t.isActive.value && e.locationStrategy), (r) => {
    var s, u;
    ee(() => e.locationStrategy, r), He(() => {
      window.removeEventListener("resize", l), visualViewport == null || visualViewport.removeEventListener("resize", i), visualViewport == null || visualViewport.removeEventListener("scroll", o), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", i, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", o, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (s = e.locationStrategy(t, e, n)) == null ? void 0 : s.updateLocation : a.value = (u = Wr[e.locationStrategy](t, e, n)) == null ? void 0 : u.updateLocation;
  });
  function l(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  function i(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  function o(r) {
    var s;
    (s = a.value) == null || s.call(a, r);
  }
  return {
    contentStyles: n,
    updateLocation: a
  };
}
function hd() {
}
function yd(e, t) {
  const n = zl(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function bd(e, t, n) {
  (Array.isArray(e.target.value) || Nu(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: l,
    preferredOrigin: i
  } = Nl(() => {
    const b = Sl(t.location, e.isRtl.value), y = t.origin === "overlap" ? b : t.origin === "auto" ? Ha(b) : Sl(t.origin, e.isRtl.value);
    return b.side === y.side && b.align === Wa(y).align ? {
      preferredAnchor: Pi(b),
      preferredOrigin: Pi(y)
    } : {
      preferredAnchor: b,
      preferredOrigin: y
    };
  }), [o, r, s, u] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((b) => x(() => {
    const y = parseFloat(t[b]);
    return isNaN(y) ? 1 / 0 : y;
  })), c = x(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const b = t.offset.split(" ").map(parseFloat);
      return b.length < 2 && b.push(0), b;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let d = !1, m = -1;
  const v = new cu(4), g = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((y) => {
      y !== m && v.clear(), requestAnimationFrame((E) => {
        m = E;
      });
    }), v.isFull) {
      const y = v.values();
      if (Ze(y.at(-1), y.at(-3)) && !Ze(y.at(-1), y.at(-2)))
        return;
    }
    const b = h();
    b && v.push(b.flipped);
  });
  ee([e.target, e.contentEl], (b, y) => {
    let [E, w] = b, [I, T] = y;
    I && !Array.isArray(I) && g.unobserve(I), E && !Array.isArray(E) && g.observe(E), T && g.unobserve(T), w && g.observe(w);
  }, {
    immediate: !0
  }), He(() => {
    g.disconnect();
  });
  let f = new dt({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  function h() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (f = $o(e.target.value));
    const b = yd(e.contentEl.value, e.isRtl.value), y = ba(e.contentEl.value), E = 12;
    y.length || (y.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (b.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), b.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = y.reduce((B, F) => {
      const N = yu(F);
      return B ? new dt({
        x: Math.max(B.left, N.left),
        y: Math.max(B.top, N.top),
        width: Math.min(B.right, N.right) - Math.max(B.left, N.left),
        height: Math.min(B.bottom, N.bottom) - Math.max(B.top, N.top)
      }) : N;
    }, void 0);
    w.x += E, w.y += E, w.width -= E * 2, w.height -= E * 2;
    let I = {
      anchor: l.value,
      origin: i.value
    };
    function T(B) {
      const F = new dt(b), N = ao(B.anchor, f), H = ao(B.origin, F);
      let {
        x: te,
        y: ne
      } = vd(N, H);
      switch (B.anchor.side) {
        case "top":
          ne -= c.value[0];
          break;
        case "bottom":
          ne += c.value[0];
          break;
        case "left":
          te -= c.value[0];
          break;
        case "right":
          te += c.value[0];
          break;
      }
      switch (B.anchor.align) {
        case "top":
          ne -= c.value[1];
          break;
        case "bottom":
          ne += c.value[1];
          break;
        case "left":
          te -= c.value[1];
          break;
        case "right":
          te += c.value[1];
          break;
      }
      return F.x += te, F.y += ne, F.width = Math.min(F.width, s.value), F.height = Math.min(F.height, u.value), {
        overflows: Vi(F, w),
        x: te,
        y: ne
      };
    }
    let _ = 0, P = 0;
    const R = {
      x: 0,
      y: 0
    }, Y = {
      x: !1,
      y: !1
    };
    let j = -1;
    for (; ; ) {
      if (j++ > 10) {
        zo("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: B,
        y: F,
        overflows: N
      } = T(I);
      _ += B, P += F, b.x += B, b.y += F;
      {
        const H = Ai(I.anchor), te = N.x.before || N.x.after, ne = N.y.before || N.y.after;
        let me = !1;
        if (["x", "y"].forEach((S) => {
          if (S === "x" && te && !Y.x || S === "y" && ne && !Y.y) {
            const k = {
              anchor: {
                ...I.anchor
              },
              origin: {
                ...I.origin
              }
            }, A = S === "x" ? H === "y" ? Wa : Ha : H === "y" ? Ha : Wa;
            k.anchor = A(k.anchor), k.origin = A(k.origin);
            const {
              overflows: z
            } = T(k);
            (z[S].before <= N[S].before && z[S].after <= N[S].after || z[S].before + z[S].after < (N[S].before + N[S].after) / 2) && (I = k, me = Y[S] = !0);
          }
        }), me) continue;
      }
      N.x.before && (_ += N.x.before, b.x += N.x.before), N.x.after && (_ -= N.x.after, b.x -= N.x.after), N.y.before && (P += N.y.before, b.y += N.y.before), N.y.after && (P -= N.y.after, b.y -= N.y.after);
      {
        const H = Vi(b, w);
        R.x = w.width - H.x.before - H.x.after, R.y = w.height - H.y.before - H.y.after, _ += H.x.before, b.x += H.x.before, P += H.y.before, b.y += H.y.before;
      }
      break;
    }
    const O = Ai(I.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${I.anchor.side} ${I.anchor.align}`,
      transformOrigin: `${I.origin.side} ${I.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: le(Qa(P)),
      left: e.isRtl.value ? void 0 : le(Qa(_)),
      right: e.isRtl.value ? le(Qa(-_)) : void 0,
      minWidth: le(O === "y" ? Math.min(o.value, f.width) : o.value),
      maxWidth: le(lo(ct(R.x, o.value === 1 / 0 ? 0 : o.value, s.value))),
      maxHeight: le(lo(ct(R.y, r.value === 1 / 0 ? 0 : r.value, u.value)))
    }), {
      available: R,
      contentBox: b,
      flipped: Y
    };
  }
  return ee(() => [l.value, i.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => h()), Be(() => {
    const b = h();
    if (!b) return;
    const {
      available: y,
      contentBox: E
    } = b;
    E.height > y.y && requestAnimationFrame(() => {
      h(), requestAnimationFrame(() => {
        h();
      });
    });
  }), {
    updateLocation: h
  };
}
function Qa(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function lo(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let _l = !0;
const Sa = [];
function pd(e) {
  !_l || Sa.length ? (Sa.push(e), Pl()) : (_l = !1, e(), Pl());
}
let io = -1;
function Pl() {
  cancelAnimationFrame(io), io = requestAnimationFrame(() => {
    const e = Sa.shift();
    e && e(), Sa.length ? Pl() : _l = !0;
  });
}
const ra = {
  none: null,
  close: Cd,
  block: xd,
  reposition: kd
}, wd = M({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in ra
  }
}, "VOverlay-scroll-strategies");
function Sd(e, t) {
  if (!Pe) return;
  let n;
  vt(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = Ll(), await new Promise((a) => setTimeout(a)), n.active && n.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (a = ra[e.scrollStrategy]) == null || a.call(ra, t, e, n);
    }));
  }), He(() => {
    n == null || n.stop();
  });
}
function Cd(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Gr(e.targetEl.value ?? e.contentEl.value, t);
}
function xd(e, t) {
  var o;
  const n = (o = e.root.value) == null ? void 0 : o.offsetParent, a = [.../* @__PURE__ */ new Set([...ba(e.targetEl.value, t.contained ? n : void 0), ...ba(e.contentEl.value, t.contained ? n : void 0)])].filter((r) => !r.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, i = ((r) => Hl(r) && r)(n || document.documentElement);
  i && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((r, s) => {
    r.style.setProperty("--v-body-scroll-x", le(-r.scrollLeft)), r.style.setProperty("--v-body-scroll-y", le(-r.scrollTop)), r !== document.documentElement && r.style.setProperty("--v-scrollbar-offset", le(l)), r.classList.add("v-overlay-scroll-blocked");
  }), He(() => {
    a.forEach((r, s) => {
      const u = parseFloat(r.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(r.style.getPropertyValue("--v-body-scroll-y")), d = r.style.scrollBehavior;
      r.style.scrollBehavior = "auto", r.style.removeProperty("--v-body-scroll-x"), r.style.removeProperty("--v-body-scroll-y"), r.style.removeProperty("--v-scrollbar-offset"), r.classList.remove("v-overlay-scroll-blocked"), r.scrollLeft = -u, r.scrollTop = -c, r.style.scrollBehavior = d;
    }), i && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function kd(e, t, n) {
  let a = !1, l = -1, i = -1;
  function o(r) {
    pd(() => {
      var c, d;
      const s = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, r), a = (performance.now() - s) / (1e3 / 60) > 2;
    });
  }
  i = (typeof requestIdleCallback > "u" ? (r) => r() : requestIdleCallback)(() => {
    n.run(() => {
      Gr(e.targetEl.value ?? e.contentEl.value, (r) => {
        a ? (cancelAnimationFrame(l), l = requestAnimationFrame(() => {
          l = requestAnimationFrame(() => {
            o(r);
          });
        })) : o(r);
      });
    });
  }), He(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(i), cancelAnimationFrame(l);
  });
}
function Gr(e, t) {
  const n = [document, ...ba(e)];
  n.forEach((a) => {
    a.addEventListener("scroll", t, {
      passive: !0
    });
  }), He(() => {
    n.forEach((a) => {
      a.removeEventListener("scroll", t);
    });
  });
}
const Al = Symbol.for("vuetify:v-menu"), Id = M({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Ed(e, t) {
  let n = () => {
  };
  function a(o) {
    n == null || n();
    const r = Number(o ? e.openDelay : e.closeDelay);
    return new Promise((s) => {
      n = fu(r, () => {
        t == null || t(o), s(o);
      });
    });
  }
  function l() {
    return a(!0);
  }
  function i() {
    return a(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: l,
    runCloseDelay: i
  };
}
const _d = M({
  target: [String, Object],
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...Id()
}, "VOverlay-activator");
function Pd(e, t) {
  let {
    isActive: n,
    isTop: a,
    contentEl: l
  } = t;
  const i = Le("useActivator"), o = Z();
  let r = !1, s = !1, u = !0;
  const c = x(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = x(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !c.value), {
    runOpenDelay: m,
    runCloseDelay: v
  } = Ed(e, (P) => {
    P === (e.openOnHover && r || c.value && s) && !(e.openOnHover && n.value && !a.value) && (n.value !== P && (u = !0), n.value = P);
  }), g = Z(), f = {
    onClick: (P) => {
      P.stopPropagation(), o.value = P.currentTarget || P.target, n.value || (g.value = [P.clientX, P.clientY]), n.value = !n.value;
    },
    onMouseenter: (P) => {
      var R;
      (R = P.sourceCapabilities) != null && R.firesTouchEvents || (r = !0, o.value = P.currentTarget || P.target, m());
    },
    onMouseleave: (P) => {
      r = !1, v();
    },
    onFocus: (P) => {
      ma(P.target, ":focus-visible") !== !1 && (s = !0, P.stopPropagation(), o.value = P.currentTarget || P.target, m());
    },
    onBlur: (P) => {
      s = !1, P.stopPropagation(), v();
    }
  }, h = x(() => {
    const P = {};
    return d.value && (P.onClick = f.onClick), e.openOnHover && (P.onMouseenter = f.onMouseenter, P.onMouseleave = f.onMouseleave), c.value && (P.onFocus = f.onFocus, P.onBlur = f.onBlur), P;
  }), b = x(() => {
    const P = {};
    if (e.openOnHover && (P.onMouseenter = () => {
      r = !0, m();
    }, P.onMouseleave = () => {
      r = !1, v();
    }), c.value && (P.onFocusin = () => {
      s = !0, m();
    }, P.onFocusout = () => {
      s = !1, v();
    }), e.closeOnContentClick) {
      const R = _e(Al, null);
      P.onClick = () => {
        n.value = !1, R == null || R.closeParents();
      };
    }
    return P;
  }), y = x(() => {
    const P = {};
    return e.openOnHover && (P.onMouseenter = () => {
      u && (r = !0, u = !1, m());
    }, P.onMouseleave = () => {
      r = !1, v();
    }), P;
  });
  ee(a, (P) => {
    var R;
    P && (e.openOnHover && !r && (!c.value || !s) || c.value && !s && (!e.openOnHover || !r)) && !((R = l.value) != null && R.contains(document.activeElement)) && (n.value = !1);
  }), ee(n, (P) => {
    P || setTimeout(() => {
      g.value = void 0;
    });
  }, {
    flush: "post"
  });
  const E = pl();
  vt(() => {
    E.value && Be(() => {
      o.value = E.el;
    });
  });
  const w = pl(), I = x(() => e.target === "cursor" && g.value ? g.value : w.value ? w.el : Kr(e.target, i) || o.value), T = x(() => Array.isArray(I.value) ? void 0 : I.value);
  let _;
  return ee(() => !!e.activator, (P) => {
    P && Pe ? (_ = Ll(), _.run(() => {
      Ad(e, i, {
        activatorEl: o,
        activatorEvents: h
      });
    })) : _ && _.stop();
  }, {
    flush: "post",
    immediate: !0
  }), He(() => {
    _ == null || _.stop();
  }), {
    activatorEl: o,
    activatorRef: E,
    target: I,
    targetEl: T,
    targetRef: w,
    activatorEvents: h,
    contentEvents: b,
    scrimEvents: y
  };
}
function Ad(e, t, n) {
  let {
    activatorEl: a,
    activatorEvents: l
  } = n;
  ee(() => e.activator, (s, u) => {
    if (u && s !== u) {
      const c = r(u);
      c && o(c);
    }
    s && Be(() => i());
  }, {
    immediate: !0
  }), ee(() => e.activatorProps, () => {
    i();
  }), He(() => {
    o();
  });
  function i() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && bu(s, K(l.value, u));
  }
  function o() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && pu(s, K(l.value, u));
  }
  function r() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = Kr(s, t);
    return a.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, a.value;
  }
}
function Kr(e, t) {
  var a, l;
  if (!e) return;
  let n;
  if (e === "parent") {
    let i = (l = (a = t == null ? void 0 : t.proxy) == null ? void 0 : a.$el) == null ? void 0 : l.parentNode;
    for (; i != null && i.hasAttribute("data-no-activator"); )
      i = i.parentNode;
    n = i;
  } else typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
function Vd() {
  if (!Pe) return U(!1);
  const {
    ssr: e
  } = Zl();
  if (e) {
    const t = U(!1);
    return jn(() => {
      t.value = !0;
    }), t;
  } else
    return U(!0);
}
const Td = M({
  eager: Boolean
}, "lazy");
function Dd(e, t) {
  const n = U(!1), a = D(() => n.value || e.eager || t.value);
  ee(t, () => n.value = !0);
  function l() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: a,
    onAfterLeave: l
  };
}
function ii() {
  const t = Le("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const oo = Symbol.for("vuetify:stack"), Sn = dn([]);
function Od(e, t, n) {
  const a = Le("useStack"), l = !n, i = _e(oo, void 0), o = dn({
    activeChildren: /* @__PURE__ */ new Set()
  });
  tt(oo, o);
  const r = U(Number(mt(t)));
  Xt(e, () => {
    var d;
    const c = (d = Sn.at(-1)) == null ? void 0 : d[1];
    r.value = c ? c + 10 : Number(mt(t)), l && Sn.push([a.uid, r.value]), i == null || i.activeChildren.add(a.uid), He(() => {
      if (l) {
        const m = Oe(Sn).findIndex((v) => v[0] === a.uid);
        Sn.splice(m, 1);
      }
      i == null || i.activeChildren.delete(a.uid);
    });
  });
  const s = U(!0);
  l && vt(() => {
    var d;
    const c = ((d = Sn.at(-1)) == null ? void 0 : d[0]) === a.uid;
    setTimeout(() => s.value = c);
  });
  const u = D(() => !o.activeChildren.size);
  return {
    globalTop: Fl(s),
    localTop: u,
    stackStyles: D(() => ({
      zIndex: r.value
    }))
  };
}
function Bd(e) {
  return {
    teleportTarget: x(() => {
      const n = e();
      if (n === !0 || !Pe) return;
      const a = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (a == null) {
        Pa(`Unable to locate target ${n}`);
        return;
      }
      let l = [...a.children].find((i) => i.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function Fd() {
  return !0;
}
function Ur(e, t, n) {
  if (!e || Yr(e, n) === !1) return !1;
  const a = Wo(t);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const l = (typeof n.value == "object" && n.value.include || (() => []))();
  return l.push(t), !l.some((i) => i == null ? void 0 : i.contains(e.target));
}
function Yr(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || Fd)(e);
}
function Ld(e, t, n) {
  const a = typeof n.value == "function" ? n.value : n.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && Ur(e, t, n) && setTimeout(() => {
    Yr(e, n) && a && a(e);
  }, 0);
}
function ro(e, t) {
  const n = Wo(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const so = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (l) => Ld(l, e, t), a = (l) => {
      e._clickOutside.lastMousedownWasOutside = Ur(l, e, t);
    };
    ro(e, (l) => {
      l.addEventListener("click", n, !0), l.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: a
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (ro(e, (n) => {
      var i;
      if (!n || !((i = e._clickOutside) != null && i[t.instance.$.uid])) return;
      const {
        onClick: a,
        onMousedown: l
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", a, !0), n.removeEventListener("mousedown", l, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function Md(e) {
  const {
    modelValue: t,
    color: n,
    ...a
  } = e;
  return p(Yt, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && C("div", K({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, a), null)]
  });
}
const oi = M({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: !0
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ..._d(),
  ...de(),
  ...Mt(),
  ...Td(),
  ...md(),
  ...wd(),
  ...Re(),
  ...yn()
}, "VOverlay"), Ca = J()({
  name: "VOverlay",
  directives: {
    vClickOutside: so
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...oi()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    keydown: (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: a,
      emit: l
    } = t;
    const i = Le("VOverlay"), o = Z(), r = Z(), s = Z(), u = De(e, "modelValue"), c = x({
      get: () => u.value,
      set: (W) => {
        W && e.disabled || (u.value = W);
      }
    }), {
      themeClasses: d
    } = Ye(e), {
      rtlClasses: m,
      isRtl: v
    } = Lt(), {
      hasContent: g,
      onAfterLeave: f
    } = Dd(e, c), h = Bt(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: b,
      localTop: y,
      stackStyles: E
    } = Od(c, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: w,
      activatorRef: I,
      target: T,
      targetEl: _,
      targetRef: P,
      activatorEvents: R,
      contentEvents: Y,
      scrimEvents: j
    } = Pd(e, {
      isActive: c,
      isTop: y,
      contentEl: s
    }), {
      teleportTarget: O
    } = Bd(() => {
      var fe, xe, pe;
      const W = e.attach || e.contained;
      if (W) return W;
      const be = ((fe = w == null ? void 0 : w.value) == null ? void 0 : fe.getRootNode()) || ((pe = (xe = i.proxy) == null ? void 0 : xe.$el) == null ? void 0 : pe.getRootNode());
      return be instanceof ShadowRoot ? be : !1;
    }), {
      dimensionStyles: B
    } = Rt(e), F = Vd(), {
      scopeId: N
    } = ii();
    ee(() => e.disabled, (W) => {
      W && (c.value = !1);
    });
    const {
      contentStyles: H,
      updateLocation: te
    } = gd(e, {
      isRtl: v,
      contentEl: s,
      target: T,
      isActive: c
    });
    Sd(e, {
      root: o,
      contentEl: s,
      targetEl: _,
      isActive: c,
      updateLocation: te
    });
    function ne(W) {
      l("click:outside", W), e.persistent ? ge() : c.value = !1;
    }
    function me(W) {
      return c.value && b.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || W.target === r.value || W instanceof MouseEvent && W.shadowTarget === r.value);
    }
    Pe && ee(c, (W) => {
      W ? window.addEventListener("keydown", S) : window.removeEventListener("keydown", S);
    }, {
      immediate: !0
    }), yt(() => {
      Pe && window.removeEventListener("keydown", S);
    });
    function S(W) {
      var be, fe, xe;
      W.key === "Escape" && b.value && ((be = s.value) != null && be.contains(document.activeElement) || l("keydown", W), e.persistent ? ge() : (c.value = !1, (fe = s.value) != null && fe.contains(document.activeElement) && ((xe = w.value) == null || xe.focus())));
    }
    function k(W) {
      W.key === "Escape" && !b.value || l("keydown", W);
    }
    const A = dc();
    Xt(() => e.closeOnBack, () => {
      fc(A, (W) => {
        b.value && c.value ? (W(!1), e.persistent ? ge() : c.value = !1) : W();
      });
    });
    const z = Z();
    ee(() => c.value && (e.absolute || e.contained) && O.value == null, (W) => {
      if (W) {
        const be = Go(o.value);
        be && be !== document.scrollingElement && (z.value = be.scrollTop);
      }
    });
    function ge() {
      e.noClickAnimation || s.value && on(s.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: ya
      });
    }
    function $() {
      l("afterEnter");
    }
    function he() {
      f(), l("afterLeave");
    }
    return ie(() => {
      var W;
      return C(Se, null, [(W = n.activator) == null ? void 0 : W.call(n, {
        isActive: c.value,
        targetRef: P,
        props: K({
          ref: I
        }, R.value, e.activatorProps)
      }), F.value && g.value && p(Es, {
        disabled: !O.value,
        to: O.value
      }, {
        default: () => [C("div", K({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": c.value,
            "v-overlay--contained": e.contained
          }, d.value, m.value, e.class],
          style: [E.value, {
            "--v-overlay-opacity": e.opacity,
            top: le(z.value)
          }, e.style],
          ref: o,
          onKeydown: k
        }, N, a), [p(Md, K({
          color: h,
          modelValue: c.value && !!e.scrim,
          ref: r
        }, j.value), null), p(Dt, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: T.value,
          onAfterEnter: $,
          onAfterLeave: he
        }, {
          default: () => {
            var be;
            return [et(C("div", K({
              ref: s,
              class: ["v-overlay__content", e.contentClass],
              style: [B.value, H.value]
            }, Y.value, e.contentProps), [(be = n.default) == null ? void 0 : be.call(n, {
              isActive: c
            })]), [[gn, c.value], [so, {
              handler: ne,
              closeConditional: me,
              include: () => [w.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: w,
      scrimEl: r,
      target: T,
      animateClick: ge,
      contentEl: s,
      globalTop: b,
      localTop: y,
      updateLocation: te
    };
  }
}), Rd = M({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  disableInitialFocus: Boolean,
  ...Qt(oi({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: Wl
    }
  }), ["absolute"])
}, "VMenu"), Xr = J()({
  name: "VMenu",
  props: Rd(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = De(e, "modelValue"), {
      scopeId: l
    } = ii(), {
      isRtl: i
    } = Lt(), o = qt(), r = D(() => e.id || `v-menu-${o}`), s = Z(), u = _e(Al, null), c = U(/* @__PURE__ */ new Set());
    tt(Al, {
      register() {
        c.value.add(o);
      },
      unregister() {
        c.value.delete(o);
      },
      closeParents(h) {
        setTimeout(() => {
          var b;
          !c.value.size && !e.persistent && (h == null || (b = s.value) != null && b.contentEl && !vu(h, s.value.contentEl)) && (a.value = !1, u == null || u.closeParents());
        }, 40);
      }
    }), yt(() => {
      u == null || u.unregister(), document.removeEventListener("focusin", d);
    }), _s(() => a.value = !1);
    async function d(h) {
      var E, w, I;
      const b = h.relatedTarget, y = h.target;
      await Be(), a.value && b !== y && ((E = s.value) != null && E.contentEl) && // We're the topmost menu
      ((w = s.value) != null && w.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(y) && // It isn't inside the menu body
      !s.value.contentEl.contains(y) && ((I = Fn(s.value.contentEl)[0]) == null || I.focus());
    }
    ee(a, (h) => {
      h ? (u == null || u.register(), Pe && !e.disableInitialFocus && document.addEventListener("focusin", d, {
        once: !0
      })) : (u == null || u.unregister(), Pe && document.removeEventListener("focusin", d));
    }, {
      immediate: !0
    });
    function m(h) {
      u == null || u.closeParents(h);
    }
    function v(h) {
      var b, y, E, w, I;
      if (!e.disabled)
        if (h.key === "Tab" || h.key === "Enter" && !e.closeOnContentClick) {
          if (h.key === "Enter" && (h.target instanceof HTMLTextAreaElement || h.target instanceof HTMLInputElement && h.target.closest("form"))) return;
          h.key === "Enter" && h.preventDefault(), Ro(Fn((b = s.value) == null ? void 0 : b.contentEl, !1), h.shiftKey ? "prev" : "next", (_) => _.tabIndex >= 0) || (a.value = !1, (E = (y = s.value) == null ? void 0 : y.activatorEl) == null || E.focus());
        } else e.submenu && h.key === (i.value ? "ArrowRight" : "ArrowLeft") && (a.value = !1, (I = (w = s.value) == null ? void 0 : w.activatorEl) == null || I.focus());
    }
    function g(h) {
      var y;
      if (e.disabled) return;
      const b = (y = s.value) == null ? void 0 : y.contentEl;
      b && a.value ? h.key === "ArrowDown" ? (h.preventDefault(), h.stopImmediatePropagation(), An(b, "next")) : h.key === "ArrowUp" ? (h.preventDefault(), h.stopImmediatePropagation(), An(b, "prev")) : e.submenu && (h.key === (i.value ? "ArrowRight" : "ArrowLeft") ? a.value = !1 : h.key === (i.value ? "ArrowLeft" : "ArrowRight") && (h.preventDefault(), An(b, "first"))) : (e.submenu ? h.key === (i.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(h.key)) && (a.value = !0, h.preventDefault(), setTimeout(() => setTimeout(() => g(h))));
    }
    const f = x(() => K({
      "aria-haspopup": "menu",
      "aria-expanded": String(a.value),
      "aria-controls": r.value,
      onKeydown: g
    }, e.activatorProps));
    return ie(() => {
      const h = Ca.filterProps(e);
      return p(Ca, K({
        ref: s,
        id: r.value,
        class: ["v-menu", e.class],
        style: e.style
      }, h, {
        modelValue: a.value,
        "onUpdate:modelValue": (b) => a.value = b,
        absolute: !0,
        activatorProps: f.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": m,
        onKeydown: v
      }, l), {
        activator: n.activator,
        default: function() {
          for (var b = arguments.length, y = new Array(b), E = 0; E < b; E++)
            y[E] = arguments[E];
          return p(Fe, {
            root: "VMenu"
          }, {
            default: () => {
              var w;
              return [(w = n.default) == null ? void 0 : w.call(n, ...y)];
            }
          });
        }
      });
    }), Yn({
      id: r,
      ΨopenChildren: c
    }, s);
  }
}), Nd = M({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...de(),
  ...yn({
    transition: {
      component: Xo
    }
  })
}, "VCounter"), $d = J()({
  name: "VCounter",
  functional: !0,
  props: Nd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = D(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ie(() => p(Dt, {
      transition: e.transition
    }, {
      default: () => [et(C("div", {
        class: X(["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class]),
        style: ve(e.style)
      }, [n.default ? n.default({
        counter: a.value,
        max: e.max,
        value: e.value
      }) : a.value]), [[gn, e.active]])]
    })), {};
  }
}), zd = M({
  floating: Boolean,
  ...de()
}, "VFieldLabel"), ea = J()({
  name: "VFieldLabel",
  props: zd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => p(hr, {
      class: X(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: ve(e.style),
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
}), jd = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], qr = M({
  appendInnerIcon: ye,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: ye,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  glow: Boolean,
  error: Boolean,
  flat: Boolean,
  iconColor: [Boolean, String],
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: ye,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => jd.includes(e)
  },
  "onClick:clear": Ue(),
  "onClick:appendInner": Ue(),
  "onClick:prependInner": Ue(),
  ...de(),
  ...ql(),
  ...pt(),
  ...Re()
}, "VField"), uo = J()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Cr(),
    ...qr()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      themeClasses: i
    } = Ye(e), {
      loaderClasses: o
    } = Ql(e), {
      focusClasses: r,
      isFocused: s,
      focus: u,
      blur: c
    } = xr(e), {
      InputIcon: d
    } = Sr(e), {
      roundedClasses: m
    } = wt(e), {
      rtlClasses: v
    } = Lt(), g = D(() => e.dirty || e.active), f = D(() => !!(e.label || l.label)), h = D(() => !e.singleLine && f.value), b = qt(), y = x(() => e.id || `input-${b}`), E = D(() => `${y.value}-messages`), w = Z(), I = Z(), T = Z(), _ = x(() => ["plain", "underlined"].includes(e.variant)), P = x(() => e.error || e.disabled ? void 0 : g.value && s.value ? e.color : e.baseColor), R = x(() => {
      if (!(!e.iconColor || e.glow && !s.value))
        return e.iconColor === !0 ? P.value : e.iconColor;
    }), {
      backgroundColorClasses: Y,
      backgroundColorStyles: j
    } = Bt(() => e.bgColor), {
      textColorClasses: O,
      textColorStyles: B
    } = gt(P);
    ee(g, (H) => {
      if (h.value) {
        const te = w.value.$el, ne = I.value.$el;
        requestAnimationFrame(() => {
          const me = zl(te), S = ne.getBoundingClientRect(), k = S.x - me.x, A = S.y - me.y - (me.height / 2 - S.height / 2), z = S.width / 0.75, ge = Math.abs(z - me.width) > 1 ? {
            maxWidth: le(z)
          } : void 0, $ = getComputedStyle(te), he = getComputedStyle(ne), W = parseFloat($.transitionDuration) * 1e3 || 150, be = parseFloat(he.getPropertyValue("--v-field-label-scale")), fe = he.getPropertyValue("color");
          te.style.visibility = "visible", ne.style.visibility = "hidden", on(te, {
            transform: `translate(${k}px, ${A}px) scale(${be})`,
            color: fe,
            ...ge
          }, {
            duration: W,
            easing: ya,
            direction: H ? "normal" : "reverse"
          }).finished.then(() => {
            te.style.removeProperty("visibility"), ne.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const F = x(() => ({
      isActive: g,
      isFocused: s,
      controlRef: T,
      blur: c,
      focus: u
    }));
    function N(H) {
      H.target !== document.activeElement && H.preventDefault();
    }
    return ie(() => {
      var k, A, z;
      const H = e.variant === "outlined", te = !!(l["prepend-inner"] || e.prependInnerIcon), ne = !!(e.clearable || l.clear) && !e.disabled, me = !!(l["append-inner"] || e.appendInnerIcon || ne), S = () => l.label ? l.label({
        ...F.value,
        label: e.label,
        props: {
          for: y.value
        }
      }) : e.label;
      return C("div", K({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": me,
          "v-field--center-affix": e.centerAffix ?? !_.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--glow": e.glow,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": te,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !S(),
          [`v-field--variant-${e.variant}`]: !0
        }, i.value, Y.value, r.value, o.value, m.value, v.value, e.class],
        style: [j.value, e.style],
        onClick: N
      }, n), [C("div", {
        class: "v-field__overlay"
      }, null), p(or, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: l.loader
      }), te && C("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && p(d, {
        key: "prepend-icon",
        name: "prependInner",
        color: R.value
      }, null), (k = l["prepend-inner"]) == null ? void 0 : k.call(l, F.value)]), C("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && h.value && p(ea, {
        key: "floating-label",
        ref: I,
        class: X([O.value]),
        floating: !0,
        for: y.value,
        style: ve(B.value)
      }, {
        default: () => [S()]
      }), f.value && p(ea, {
        key: "label",
        ref: w,
        for: y.value
      }, {
        default: () => [S()]
      }), ((A = l.default) == null ? void 0 : A.call(l, {
        ...F.value,
        props: {
          id: y.value,
          class: "v-field__input",
          "aria-describedby": E.value
        },
        focus: u,
        blur: c
      })) ?? C("div", {
        id: y.value,
        class: "v-field__input",
        "aria-describedby": E.value
      }, null)]), ne && p(qo, {
        key: "clear"
      }, {
        default: () => [et(C("div", {
          class: "v-field__clearable",
          onMousedown: (ge) => {
            ge.preventDefault(), ge.stopPropagation();
          }
        }, [p(Fe, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [l.clear ? l.clear({
            ...F.value,
            props: {
              onFocus: u,
              onBlur: c,
              onClick: e["onClick:clear"],
              tabindex: -1
            }
          }) : p(d, {
            name: "clear",
            onFocus: u,
            onBlur: c,
            tabindex: -1
          }, null)]
        })]), [[gn, e.dirty]])]
      }), me && C("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(z = l["append-inner"]) == null ? void 0 : z.call(l, F.value), e.appendInnerIcon && p(d, {
        key: "append-icon",
        name: "appendInner",
        color: R.value
      }, null)]), C("div", {
        class: X(["v-field__outline", O.value]),
        style: ve(B.value)
      }, [H && C(Se, null, [C("div", {
        class: "v-field__outline__start"
      }, null), h.value && C("div", {
        class: "v-field__outline__notch"
      }, [p(ea, {
        ref: I,
        floating: !0,
        for: y.value
      }, {
        default: () => [S()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), _.value && h.value && p(ea, {
        ref: I,
        floating: !0,
        for: y.value
      }, {
        default: () => [S()]
      })])]);
    }), {
      controlRef: T,
      fieldIconColor: R
    };
  }
});
function Hd(e) {
  function t(n, a) {
    var l, i;
    !e.autofocus || !n || (i = (l = a[0].target) == null ? void 0 : l.focus) == null || i.call(l);
  }
  return {
    onIntersect: t
  };
}
const Wd = ["color", "file", "time", "date", "datetime-local", "week", "month"], ri = M({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...kr(),
  ...qr()
}, "VTextField"), Ut = J()({
  name: "VTextField",
  directives: {
    vIntersect: pa
  },
  inheritAttrs: !1,
  props: ri(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const i = De(e, "modelValue"), {
      isFocused: o,
      focus: r,
      blur: s
    } = xr(e), {
      onIntersect: u
    } = Hd(e), c = x(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), d = x(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), m = x(() => ["plain", "underlined"].includes(e.variant)), v = Z(), g = Z(), f = Z(), h = x(() => Wd.includes(e.type) || e.persistentPlaceholder || o.value || e.active);
    function b() {
      o.value || r(), Be(() => {
        f.value !== document.activeElement && Be(() => {
          var T;
          return (T = f.value) == null ? void 0 : T.focus();
        });
      });
    }
    function y(T) {
      a("mousedown:control", T), T.target !== f.value && (b(), T.preventDefault());
    }
    function E(T) {
      a("click:control", T);
    }
    function w(T, _) {
      T.stopPropagation(), b(), Be(() => {
        i.value = null, _(), Mo(e["onClick:clear"], T);
      });
    }
    function I(T) {
      var P;
      const _ = T.target;
      if (i.value = _.value, (P = e.modelModifiers) != null && P.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const R = [_.selectionStart, _.selectionEnd];
        Be(() => {
          _.selectionStart = R[0], _.selectionEnd = R[1];
        });
      }
    }
    return ie(() => {
      const T = !!(l.counter || e.counter !== !1 && e.counter != null), _ = !!(T || l.details), [P, R] = Bo(n), {
        modelValue: Y,
        ...j
      } = Ji.filterProps(e), O = uo.filterProps(e);
      return p(Ji, K({
        ref: v,
        modelValue: i.value,
        "onUpdate:modelValue": (B) => i.value = B,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": m.value
        }, e.class],
        style: e.style
      }, P, j, {
        centerAffix: !m.value,
        focused: o.value
      }), {
        ...l,
        default: (B) => {
          let {
            id: F,
            isDisabled: N,
            isDirty: H,
            isReadonly: te,
            isValid: ne,
            reset: me
          } = B;
          return p(uo, K({
            ref: g,
            onMousedown: y,
            onClick: E,
            "onClick:clear": (S) => w(S, me),
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, O, {
            id: F.value,
            active: h.value || H.value,
            dirty: H.value || e.dirty,
            disabled: N.value,
            focused: o.value,
            error: ne.value === !1
          }), {
            ...l,
            default: (S) => {
              let {
                props: {
                  class: k,
                  ...A
                }
              } = S;
              const z = et(C("input", K({
                ref: f,
                value: i.value,
                onInput: I,
                autofocus: e.autofocus,
                readonly: te.value,
                disabled: N.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: b,
                onBlur: s
              }, A, R), null), [[pa, {
                handler: u
              }, null, {
                once: !0
              }]]);
              return C(Se, null, [e.prefix && C("span", {
                class: "v-text-field__prefix"
              }, [C("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), l.default ? C("div", {
                class: X(k),
                "data-no-activator": ""
              }, [l.default(), z]) : Ps(z, {
                class: k
              }), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [C("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: _ ? (B) => {
          var F;
          return C(Se, null, [(F = l.details) == null ? void 0 : F.call(l, B), T && C(Se, null, [C("span", null, null), p($d, {
            active: e.persistentCounter || o.value,
            value: c.value,
            max: d.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), Yn({}, v, g, f);
  }
}), Gd = M({
  renderless: Boolean,
  ...de()
}, "VVirtualScrollItem"), Kd = J()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Gd(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: a,
      slots: l
    } = t;
    const {
      resizeRef: i,
      contentRect: o
    } = Mn(void 0, "border");
    ee(() => {
      var r;
      return (r = o.value) == null ? void 0 : r.height;
    }, (r) => {
      r != null && a("update:height", r);
    }), ie(() => {
      var r, s;
      return e.renderless ? C(Se, null, [(r = l.default) == null ? void 0 : r.call(l, {
        itemRef: i
      })]) : C("div", K({
        ref: i,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(s = l.default) == null ? void 0 : s.call(l)]);
    });
  }
}), Ud = -1, Yd = 1, Ja = 100, Xd = M({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  itemKey: {
    type: [String, Array, Function],
    default: null
  },
  height: [Number, String]
}, "virtual");
function qd(e, t) {
  const n = Zl(), a = U(0);
  vt(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = U(0), i = U(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (a.value || 16)
  ) || 1), o = U(0), r = U(0), s = Z(), u = Z();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: m
  } = Mn();
  vt(() => {
    d.value = s.value;
  });
  const v = x(() => {
    var S;
    return s.value === document.documentElement ? n.height.value : ((S = m.value) == null ? void 0 : S.height) || parseInt(e.height) || 0;
  }), g = x(() => !!(s.value && u.value && v.value && a.value));
  let f = Array.from({
    length: t.value.length
  }), h = Array.from({
    length: t.value.length
  });
  const b = U(0);
  let y = -1;
  function E(S) {
    return f[S] || a.value;
  }
  const w = su(() => {
    const S = performance.now();
    h[0] = 0;
    const k = t.value.length;
    for (let A = 1; A <= k - 1; A++)
      h[A] = (h[A - 1] || 0) + E(A - 1);
    b.value = Math.max(b.value, performance.now() - S);
  }, b), I = ee(g, (S) => {
    S && (I(), c = u.value.offsetTop, w.immediate(), H(), ~y && Be(() => {
      Pe && window.requestAnimationFrame(() => {
        ne(y), y = -1;
      });
    }));
  });
  He(() => {
    w.clear();
  });
  function T(S, k) {
    const A = f[S], z = a.value;
    a.value = z ? Math.min(a.value, k) : k, (A !== k || z !== a.value) && (f[S] = k, w());
  }
  function _(S) {
    S = ct(S, 0, t.value.length - 1);
    const k = Math.floor(S), A = S % 1, z = k + 1, ge = h[k] || 0, $ = h[z] || ge;
    return ge + ($ - ge) * A;
  }
  function P(S) {
    return Qd(h, S);
  }
  let R = 0, Y = 0, j = 0;
  ee(v, (S, k) => {
    k && (H(), S < k && requestAnimationFrame(() => {
      Y = 0, H();
    }));
  });
  let O = -1;
  function B() {
    if (!s.value || !u.value) return;
    const S = s.value.scrollTop, k = performance.now();
    k - j > 500 ? (Y = Math.sign(S - R), c = u.value.offsetTop) : Y = S - R, R = S, j = k, window.clearTimeout(O), O = window.setTimeout(F, 500), H();
  }
  function F() {
    !s.value || !u.value || (Y = 0, j = 0, window.clearTimeout(O), H());
  }
  let N = -1;
  function H() {
    cancelAnimationFrame(N), N = requestAnimationFrame(te);
  }
  function te() {
    if (!s.value || !v.value || !a.value) return;
    const S = R - c, k = Math.sign(Y), A = Math.max(0, S - Ja), z = ct(P(A), 0, t.value.length), ge = S + v.value + Ja, $ = ct(P(ge) + 1, z + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (k !== Ud || z < l.value) && (k !== Yd || $ > i.value)
    ) {
      const he = _(l.value) - _(z), W = _($) - _(i.value);
      Math.max(he, W) > Ja ? (l.value = z, i.value = $) : (z <= 0 && (l.value = z), $ >= t.value.length && (i.value = $));
    }
    o.value = _(l.value), r.value = _(t.value.length) - _(i.value);
  }
  function ne(S) {
    const k = _(S);
    !s.value || S && !k ? y = S : s.value.scrollTop = k;
  }
  const me = x(() => t.value.slice(l.value, i.value).map((S, k) => {
    const A = k + l.value;
    return {
      raw: S,
      index: A,
      key: rt(S, e.itemKey, A)
    };
  }));
  return ee(t, () => {
    f = Array.from({
      length: t.value.length
    }), h = Array.from({
      length: t.value.length
    }), w.immediate(), H();
  }, {
    deep: 1
  }), {
    calculateVisibleItems: H,
    containerRef: s,
    markerRef: u,
    computedItems: me,
    paddingTop: o,
    paddingBottom: r,
    scrollToIndex: ne,
    handleScroll: B,
    handleScrollend: F,
    handleItemResize: T
  };
}
function Qd(e, t) {
  let n = e.length - 1, a = 0, l = 0, i = null, o = -1;
  if (e[n] < t)
    return n;
  for (; a <= n; )
    if (l = a + n >> 1, i = e[l], i > t)
      n = l - 1;
    else if (i < t)
      o = l, a = l + 1;
    else return i === t ? l : a;
  return o;
}
const Jd = M({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Xd(),
  ...de(),
  ...Mt()
}, "VVirtualScroll"), Qr = J()({
  name: "VVirtualScroll",
  props: Jd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Le("VVirtualScroll"), {
      dimensionStyles: l
    } = Rt(e), {
      calculateVisibleItems: i,
      containerRef: o,
      markerRef: r,
      handleScroll: s,
      handleScrollend: u,
      handleItemResize: c,
      scrollToIndex: d,
      paddingTop: m,
      paddingBottom: v,
      computedItems: g
    } = qd(e, D(() => e.items));
    return Xt(() => e.renderless, () => {
      function f() {
        var y, E;
        const b = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[b]("scroll", s, {
          passive: !0
        }), document[b]("scrollend", u)) : ((y = o.value) == null || y[b]("scroll", s, {
          passive: !0
        }), (E = o.value) == null || E[b]("scrollend", u));
      }
      jn(() => {
        o.value = Go(a.vnode.el, !0), f(!0);
      }), He(f);
    }), ie(() => {
      const f = g.value.map((h) => p(Kd, {
        key: h.key,
        renderless: e.renderless,
        "onUpdate:height": (b) => c(h.index, b)
      }, {
        default: (b) => {
          var y;
          return (y = n.default) == null ? void 0 : y.call(n, {
            item: h.raw,
            index: h.index,
            ...b
          });
        }
      }));
      return e.renderless ? C(Se, null, [C("div", {
        ref: r,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: le(m.value)
        }
      }, null), f, C("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: le(v.value)
        }
      }, null)]) : C("div", {
        ref: o,
        class: X(["v-virtual-scroll", e.class]),
        onScrollPassive: s,
        onScrollend: u,
        style: ve([l.value, e.style])
      }, [C("div", {
        ref: r,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: le(m.value),
          paddingBottom: le(v.value)
        }
      }, [f])]);
    }), {
      calculateVisibleItems: i,
      scrollToIndex: d
    };
  }
});
function Jr(e, t) {
  const n = U(!1);
  let a;
  function l(r) {
    cancelAnimationFrame(a), n.value = !0, a = requestAnimationFrame(() => {
      a = requestAnimationFrame(() => {
        n.value = !1;
      });
    });
  }
  async function i() {
    await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => {
      if (n.value) {
        const s = ee(n, () => {
          s(), r();
        });
      } else r();
    });
  }
  async function o(r) {
    var c, d;
    if (r.key === "Tab" && ((c = t.value) == null || c.focus()), !["PageDown", "PageUp", "Home", "End"].includes(r.key)) return;
    const s = (d = e.value) == null ? void 0 : d.$el;
    if (!s) return;
    (r.key === "Home" || r.key === "End") && s.scrollTo({
      top: r.key === "Home" ? 0 : s.scrollHeight,
      behavior: "smooth"
    }), await i();
    const u = s.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (r.key === "PageDown" || r.key === "Home") {
      const m = s.getBoundingClientRect().top;
      for (const v of u)
        if (v.getBoundingClientRect().top >= m) {
          v.focus();
          break;
        }
    } else {
      const m = s.getBoundingClientRect().bottom;
      for (const v of [...u].reverse())
        if (v.getBoundingClientRect().bottom <= m) {
          v.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: l,
    onKeydown: o
  };
}
const Zr = M({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: ye,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  noAutoScroll: Boolean,
  ...Nr({
    itemChildren: !1
  })
}, "Select"), Zd = M({
  ...Zr(),
  ...Qt(ri({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...yn({
    transition: {
      component: Wl
    }
  })
}, "VSelect");
J()({
  name: "VSelect",
  props: Zd(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: a
    } = Ba(), l = Z(), i = Z(), o = Z(), {
      items: r,
      transformIn: s,
      transformOut: u
    } = zr(e), c = De(e, "modelValue", [], (S) => s(S === null ? [null] : Ke(S)), (S) => {
      const k = u(S);
      return e.multiple ? k : k[0] ?? null;
    }), d = x(() => typeof e.counterValue == "function" ? e.counterValue(c.value) : typeof e.counterValue == "number" ? e.counterValue : c.value.length), m = Jl(e), v = x(() => c.value.map((S) => S.value)), g = U(!1);
    let f = "", h = -1, b;
    const y = x(() => e.hideSelected ? r.value.filter((S) => !c.value.some((k) => (e.valueComparator || Ze)(k, S))) : r.value), E = x(() => e.hideNoData && !y.value.length || m.isReadonly.value || m.isDisabled.value), w = De(e, "menu"), I = x({
      get: () => w.value,
      set: (S) => {
        var k;
        w.value && !S && ((k = i.value) != null && k.ΨopenChildren.size) || S && E.value || (w.value = S);
      }
    }), T = D(() => I.value ? e.closeText : e.openText), _ = x(() => {
      var S;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((S = e.menuProps) == null ? void 0 : S.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), P = Z(), R = Jr(P, l);
    function Y(S) {
      e.openOnClear && (I.value = !0);
    }
    function j() {
      E.value || (I.value = !I.value);
    }
    function O(S) {
      ga(S) && B(S);
    }
    function B(S) {
      var fe, xe, pe;
      if (!S.key || m.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(S.key) && S.preventDefault(), ["Enter", "ArrowDown", " "].includes(S.key) && (I.value = !0), ["Escape", "Tab"].includes(S.key) && (I.value = !1), S.key === "Home" ? (fe = P.value) == null || fe.focus("first") : S.key === "End" && ((xe = P.value) == null || xe.focus("last"));
      const k = 1e3;
      if (!ga(S)) return;
      const A = performance.now();
      A - b > k && (f = "", h = -1), f += S.key.toLowerCase(), b = A;
      const z = y.value;
      function ge() {
        let V = $();
        return V || f.at(-1) === f.at(-2) && (f = f.slice(0, -1), V = $(), V) || (h = -1, V = $(), V) ? V : (f = S.key.toLowerCase(), $());
      }
      function $() {
        for (let V = h + 1; V < z.length; V++) {
          const G = z[V];
          if (G.title.toLowerCase().startsWith(f))
            return [G, V];
        }
      }
      const he = ge();
      if (!he) return;
      const [W, be] = he;
      h = be, (pe = P.value) == null || pe.focus(be), e.multiple || (c.value = [W]);
    }
    function F(S) {
      let k = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!S.props.disabled)
        if (e.multiple) {
          const A = c.value.findIndex((ge) => (e.valueComparator || Ze)(ge.value, S.value)), z = k ?? !~A;
          if (~A) {
            const ge = z ? [...c.value, S] : [...c.value];
            ge.splice(A, 1), c.value = ge;
          } else z && (c.value = [...c.value, S]);
        } else {
          const A = k !== !1;
          c.value = A ? [S] : [], Be(() => {
            I.value = !1;
          });
        }
    }
    function N(S) {
      var k;
      (k = P.value) != null && k.$el.contains(S.relatedTarget) || (I.value = !1);
    }
    function H() {
      var S;
      e.eager && ((S = o.value) == null || S.calculateVisibleItems());
    }
    function te() {
      var S;
      g.value && ((S = l.value) == null || S.focus());
    }
    function ne(S) {
      g.value = !0;
    }
    function me(S) {
      if (S == null) c.value = [];
      else if (ma(l.value, ":autofill") || ma(l.value, ":-webkit-autofill")) {
        const k = r.value.find((A) => A.title === S);
        k && F(k);
      } else l.value && (l.value.value = "");
    }
    return ee(I, () => {
      if (!e.hideSelected && I.value && c.value.length) {
        const S = y.value.findIndex((k) => c.value.some((A) => (e.valueComparator || Ze)(A.value, k.value)));
        Pe && !e.noAutoScroll && window.requestAnimationFrame(() => {
          var k;
          S >= 0 && ((k = o.value) == null || k.scrollToIndex(S));
        });
      }
    }), ee(() => e.items, (S, k) => {
      I.value || g.value && !k.length && S.length && (I.value = !0);
    }), ie(() => {
      const S = !!(e.chips || n.chip), k = !!(!e.hideNoData || y.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), A = c.value.length > 0, z = Ut.filterProps(e), ge = A || !g.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return p(Ut, K({
        ref: l
      }, z, {
        modelValue: c.value.map(($) => $.props.value).join(", "),
        "onUpdate:modelValue": me,
        focused: g.value,
        "onUpdate:focused": ($) => g.value = $,
        validationValue: c.externalValue,
        counterValue: d.value,
        dirty: A,
        class: ["v-select", {
          "v-select--active-menu": I.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": c.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: ge,
        "onClick:clear": Y,
        "onMousedown:control": j,
        onBlur: N,
        onKeydown: B,
        "aria-label": a(T.value),
        title: a(T.value)
      }), {
        ...n,
        default: () => C(Se, null, [p(Xr, K({
          ref: i,
          modelValue: I.value,
          "onUpdate:modelValue": ($) => I.value = $,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: E.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: H,
          onAfterLeave: te
        }, _.value), {
          default: () => [k && p(Hr, K({
            ref: P,
            selected: v.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: ($) => $.preventDefault(),
            onKeydown: O,
            onFocusin: ne,
            tabindex: "-1",
            "aria-live": "polite",
            "aria-label": `${e.label}-list`,
            color: e.itemColor ?? e.color
          }, R, e.listProps), {
            default: () => {
              var $, he, W;
              return [($ = n["prepend-item"]) == null ? void 0 : $.call(n), !y.value.length && !e.hideNoData && (((he = n["no-data"]) == null ? void 0 : he.call(n)) ?? p(vn, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), p(Qr, {
                ref: o,
                renderless: !0,
                items: y.value,
                itemKey: "value"
              }, {
                default: (be) => {
                  var we, oe, Ie;
                  let {
                    item: fe,
                    index: xe,
                    itemRef: pe
                  } = be;
                  const V = mu(fe.props), G = K(fe.props, {
                    ref: pe,
                    key: fe.value,
                    onClick: () => F(fe, null)
                  });
                  return fe.type === "divider" ? ((we = n.divider) == null ? void 0 : we.call(n, {
                    props: fe.raw,
                    index: xe
                  })) ?? p(ti, K(fe.props, {
                    key: `divider-${xe}`
                  }), null) : fe.type === "subheader" ? ((oe = n.subheader) == null ? void 0 : oe.call(n, {
                    props: fe.raw,
                    index: xe
                  })) ?? p(li, K(fe.props, {
                    key: `subheader-${xe}`
                  }), null) : ((Ie = n.item) == null ? void 0 : Ie.call(n, {
                    item: fe,
                    index: xe,
                    props: G
                  })) ?? p(vn, K(G, {
                    role: "option"
                  }), {
                    prepend: (ze) => {
                      let {
                        isSelected: at
                      } = ze;
                      return C(Se, null, [e.multiple && !e.hideSelected ? p(wr, {
                        key: fe.value,
                        modelValue: at,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, V.prependAvatar && p(Ft, {
                        image: V.prependAvatar
                      }, null), V.prependIcon && p(Te, {
                        icon: V.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (W = n["append-item"]) == null ? void 0 : W.call(n)];
            }
          })]
        }), c.value.map(($, he) => {
          function W(pe) {
            pe.stopPropagation(), pe.preventDefault(), F($, !1);
          }
          const be = {
            "onClick:close": W,
            onKeydown(pe) {
              pe.key !== "Enter" && pe.key !== " " || (pe.preventDefault(), pe.stopPropagation(), W(pe));
            },
            onMousedown(pe) {
              pe.preventDefault(), pe.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, fe = S ? !!n.chip : !!n.selection, xe = fe ? $l(S ? n.chip({
            item: $,
            index: he,
            props: be
          }) : n.selection({
            item: $,
            index: he
          })) : void 0;
          if (!(fe && !xe))
            return C("div", {
              key: $.value,
              class: "v-select__selection"
            }, [S ? n.chip ? p(Fe, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: $.title
                }
              }
            }, {
              default: () => [xe]
            }) : p(Ar, K({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: $.title,
              disabled: $.props.disabled
            }, be), null) : xe ?? C("span", {
              class: "v-select__selection-text"
            }, [$.title, e.multiple && he < c.value.length - 1 && C("span", {
              class: "v-select__selection-comma"
            }, [So(",")])])]);
        })]),
        "append-inner": function() {
          var be, fe;
          for (var $ = arguments.length, he = new Array($), W = 0; W < $; W++)
            he[W] = arguments[W];
          return C(Se, null, [(be = n["append-inner"]) == null ? void 0 : be.call(n, ...he), e.menuIcon ? p(Te, {
            class: "v-select__menu-icon",
            color: (fe = l.value) == null ? void 0 : fe.fieldIconColor,
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), Yn({
      isFocused: g,
      menu: I,
      select: F
    }, l);
  }
});
const ef = (e, t, n) => {
  if (e == null || t == null) return -1;
  if (!t.length) return 0;
  e = e.toString().toLocaleLowerCase(), t = t.toString().toLocaleLowerCase();
  const a = [];
  let l = e.indexOf(t);
  for (; ~l; )
    a.push([l, l + t.length]), l = e.indexOf(t, l + t.length);
  return a.length ? a : -1;
};
function Za(e, t) {
  if (!(e == null || typeof e == "boolean" || e === -1))
    return typeof e == "number" ? [[e, e + t.length]] : Array.isArray(e[0]) ? e : [e];
}
const tf = M({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function nf(e, t, n) {
  var r;
  const a = [], l = (n == null ? void 0 : n.default) ?? ef, i = n != null && n.filterKeys ? Ke(n.filterKeys) : !1, o = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length)) return a;
  e: for (let s = 0; s < e.length; s++) {
    const [u, c = u] = Ke(e[s]), d = {}, m = {};
    let v = -1;
    if ((t || o > 0) && !(n != null && n.noFilter)) {
      if (typeof u == "object") {
        if (u.type === "divider" || u.type === "subheader")
          continue;
        const h = i || Object.keys(c);
        for (const b of h) {
          const y = rt(c, b), E = (r = n == null ? void 0 : n.customKeyFilter) == null ? void 0 : r[b];
          if (v = E ? E(y, t, u) : l(y, t, u), v !== -1 && v !== !1)
            E ? d[b] = Za(v, t) : m[b] = Za(v, t);
          else if ((n == null ? void 0 : n.filterMode) === "every")
            continue e;
        }
      } else
        v = l(u, t, u), v !== -1 && v !== !1 && (m.title = Za(v, t));
      const g = Object.keys(m).length, f = Object.keys(d).length;
      if (!g && !f || (n == null ? void 0 : n.filterMode) === "union" && f !== o && !g || (n == null ? void 0 : n.filterMode) === "intersection" && (f !== o || !g)) continue;
    }
    a.push({
      index: s,
      matches: {
        ...m,
        ...d
      }
    });
  }
  return a;
}
function af(e, t, n, a) {
  const l = U([]), i = U(/* @__PURE__ */ new Map()), o = x(() => re(t));
  vt(() => {
    const s = typeof n == "function" ? n() : re(n), u = typeof s != "string" && typeof s != "number" ? "" : String(s), c = nf(o.value, u, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...re(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = re(t), m = [], v = /* @__PURE__ */ new Map();
    c.forEach((g) => {
      let {
        index: f,
        matches: h
      } = g;
      const b = d[f];
      m.push(b), v.set(b.value, h);
    }), l.value = m, i.value = v;
  });
  function r(s) {
    return i.value.get(s.value);
  }
  return {
    filteredItems: l,
    filteredMatches: i,
    getMatches: r
  };
}
function lf(e, t, n) {
  return n == null || !n.length ? t : n.map((a, l) => {
    const i = l === 0 ? 0 : n[l - 1][1], o = [C("span", {
      class: X(`${e}__unmask`)
    }, [t.slice(i, a[0])]), C("span", {
      class: X(`${e}__mask`)
    }, [t.slice(a[0], a[1])])];
    return l === n.length - 1 && o.push(C("span", {
      class: X(`${e}__unmask`)
    }, [t.slice(a[1])])), C(Se, null, [o]);
  });
}
const of = M({
  fullscreen: Boolean,
  retainFocus: {
    type: Boolean,
    default: !0
  },
  scrollable: Boolean,
  ...oi({
    origin: "center center",
    scrollStrategy: "block",
    transition: {
      component: Wl
    },
    zIndex: 2400
  })
}, "VDialog"), rf = J()({
  name: "VDialog",
  props: of(),
  emits: {
    "update:modelValue": (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: a
    } = t;
    const l = De(e, "modelValue"), {
      scopeId: i
    } = ii(), o = Z();
    function r(c) {
      var v, g;
      const d = c.relatedTarget, m = c.target;
      if (d !== m && ((v = o.value) != null && v.contentEl) && // We're the topmost dialog
      ((g = o.value) != null && g.globalTop) && // It isn't the document or the dialog body
      ![document, o.value.contentEl].includes(m) && // It isn't inside the dialog body
      !o.value.contentEl.contains(m)) {
        const f = Fn(o.value.contentEl);
        if (!f.length) return;
        const h = f[0], b = f[f.length - 1];
        d === h ? b.focus() : h.focus();
      }
    }
    yt(() => {
      document.removeEventListener("focusin", r);
    }), Pe && ee(() => l.value && e.retainFocus, (c) => {
      c ? document.addEventListener("focusin", r) : document.removeEventListener("focusin", r);
    }, {
      immediate: !0
    });
    function s() {
      var c;
      n("afterEnter"), (e.scrim || e.retainFocus) && ((c = o.value) != null && c.contentEl) && !o.value.contentEl.contains(document.activeElement) && o.value.contentEl.focus({
        preventScroll: !0
      });
    }
    function u() {
      n("afterLeave");
    }
    return ee(l, async (c) => {
      var d;
      c || (await Be(), (d = o.value.activatorEl) == null || d.focus({
        preventScroll: !0
      }));
    }), ie(() => {
      const c = Ca.filterProps(e), d = K({
        "aria-haspopup": "dialog"
      }, e.activatorProps), m = K({
        tabindex: -1
      }, e.contentProps);
      return p(Ca, K({
        ref: o,
        class: ["v-dialog", {
          "v-dialog--fullscreen": e.fullscreen,
          "v-dialog--scrollable": e.scrollable
        }, e.class],
        style: e.style
      }, c, {
        modelValue: l.value,
        "onUpdate:modelValue": (v) => l.value = v,
        "aria-modal": "true",
        activatorProps: d,
        contentProps: m,
        height: e.fullscreen ? void 0 : e.height,
        width: e.fullscreen ? void 0 : e.width,
        maxHeight: e.fullscreen ? void 0 : e.maxHeight,
        maxWidth: e.fullscreen ? void 0 : e.maxWidth,
        role: "dialog",
        onAfterEnter: s,
        onAfterLeave: u
      }, i), {
        activator: a.activator,
        default: function() {
          for (var v = arguments.length, g = new Array(v), f = 0; f < v; f++)
            g[f] = arguments[f];
          return p(Fe, {
            root: "VDialog"
          }, {
            default: () => {
              var h;
              return [(h = a.default) == null ? void 0 : h.call(a, ...g)];
            }
          });
        }
      });
    }), Yn({}, o);
  }
}), es = J()({
  name: "VCardActions",
  props: de(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return hn({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), ie(() => {
      var a;
      return C("div", {
        class: X(["v-card-actions", e.class]),
        style: ve(e.style)
      }, [(a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), sf = M({
  opacity: [Number, String],
  ...de(),
  ...Ne()
}, "VCardSubtitle"), uf = J()({
  name: "VCardSubtitle",
  props: sf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => p(e.tag, {
      class: X(["v-card-subtitle", e.class]),
      style: ve([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), cf = Ho("v-card-title"), df = M({
  appendAvatar: String,
  appendIcon: ye,
  prependAvatar: String,
  prependIcon: ye,
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...de(),
  ...St()
}, "VCardItem"), ff = J()({
  name: "VCardItem",
  props: df(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => {
      var u;
      const a = !!(e.prependAvatar || e.prependIcon), l = !!(a || n.prepend), i = !!(e.appendAvatar || e.appendIcon), o = !!(i || n.append), r = !!(e.title != null || n.title), s = !!(e.subtitle != null || n.subtitle);
      return C("div", {
        class: X(["v-card-item", e.class]),
        style: ve(e.style)
      }, [l && C("div", {
        key: "prepend",
        class: "v-card-item__prepend"
      }, [n.prepend ? p(Fe, {
        key: "prepend-defaults",
        disabled: !a,
        defaults: {
          VAvatar: {
            density: e.density,
            image: e.prependAvatar
          },
          VIcon: {
            density: e.density,
            icon: e.prependIcon
          }
        }
      }, n.prepend) : C(Se, null, [e.prependAvatar && p(Ft, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && p(Te, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), C("div", {
        class: "v-card-item__content"
      }, [r && p(cf, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? fn(e.title)];
        }
      }), s && p(uf, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? fn(e.subtitle)];
        }
      }), (u = n.default) == null ? void 0 : u.call(n)]), o && C("div", {
        key: "append",
        class: "v-card-item__append"
      }, [n.append ? p(Fe, {
        key: "append-defaults",
        disabled: !i,
        defaults: {
          VAvatar: {
            density: e.density,
            image: e.appendAvatar
          },
          VIcon: {
            density: e.density,
            icon: e.appendIcon
          }
        }
      }, n.append) : C(Se, null, [e.appendIcon && p(Te, {
        key: "append-icon",
        density: e.density,
        icon: e.appendIcon
      }, null), e.appendAvatar && p(Ft, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), vf = M({
  opacity: [Number, String],
  ...de(),
  ...Ne()
}, "VCardText"), ts = J()({
  name: "VCardText",
  props: vf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ie(() => p(e.tag, {
      class: X(["v-card-text", e.class]),
      style: ve([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), mf = M({
  appendAvatar: String,
  appendIcon: ye,
  disabled: Boolean,
  flat: Boolean,
  hover: Boolean,
  image: String,
  link: {
    type: Boolean,
    default: void 0
  },
  prependAvatar: String,
  prependIcon: ye,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: {
    type: [String, Number, Boolean],
    default: void 0
  },
  text: {
    type: [String, Number, Boolean],
    default: void 0
  },
  title: {
    type: [String, Number, Boolean],
    default: void 0
  },
  ...Jt(),
  ...de(),
  ...St(),
  ...Mt(),
  ...bn(),
  ...ql(),
  ...Yl(),
  ...rr(),
  ...pt(),
  ...Ma(),
  ...Ne(),
  ...Re(),
  ...Nt({
    variant: "elevated"
  })
}, "VCard"), gf = J()({
  name: "VCard",
  directives: {
    vRipple: It
  },
  props: mf(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ye(e), {
      borderClasses: i
    } = Zt(e), {
      colorClasses: o,
      colorStyles: r,
      variantClasses: s
    } = Gn(e), {
      densityClasses: u
    } = _t(e), {
      dimensionStyles: c
    } = Rt(e), {
      elevationClasses: d
    } = pn(e), {
      loaderClasses: m
    } = Ql(e), {
      locationStyles: v
    } = Xl(e), {
      positionClasses: g
    } = sr(e), {
      roundedClasses: f
    } = wt(e), h = La(e, n);
    return ie(() => {
      const b = e.link !== !1 && h.isLink.value, y = !e.disabled && e.link !== !1 && (e.link || h.isClickable.value), E = b ? "a" : e.tag, w = !!(a.title || e.title != null), I = !!(a.subtitle || e.subtitle != null), T = w || I, _ = !!(a.append || e.appendAvatar || e.appendIcon), P = !!(a.prepend || e.prependAvatar || e.prependIcon), R = !!(a.image || e.image), Y = T || P || _, j = !!(a.text || e.text != null);
      return et(p(E, K({
        class: ["v-card", {
          "v-card--disabled": e.disabled,
          "v-card--flat": e.flat,
          "v-card--hover": e.hover && !(e.disabled || e.flat),
          "v-card--link": y
        }, l.value, i.value, o.value, u.value, d.value, m.value, g.value, f.value, s.value, e.class],
        style: [r.value, c.value, v.value, e.style],
        onClick: y && h.navigate,
        tabindex: e.disabled ? -1 : void 0
      }, h.linkProps), {
        default: () => {
          var O;
          return [R && C("div", {
            key: "image",
            class: "v-card__image"
          }, [a.image ? p(Fe, {
            key: "image-defaults",
            disabled: !e.image,
            defaults: {
              VImg: {
                cover: !0,
                src: e.image
              }
            }
          }, a.image) : p(Zo, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), p(or, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), Y && p(ff, {
            key: "item",
            prependAvatar: e.prependAvatar,
            prependIcon: e.prependIcon,
            title: e.title,
            subtitle: e.subtitle,
            appendAvatar: e.appendAvatar,
            appendIcon: e.appendIcon
          }, {
            default: a.item,
            prepend: a.prepend,
            title: a.title,
            subtitle: a.subtitle,
            append: a.append
          }), j && p(ts, {
            key: "text"
          }, {
            default: () => {
              var B;
              return [((B = a.text) == null ? void 0 : B.call(a)) ?? e.text];
            }
          }), (O = a.default) == null ? void 0 : O.call(a), a.actions && p(es, null, {
            default: a.actions
          }), Wn(y, "v-card")];
        }
      }), [[It, y && e.ripple]]);
    }), {};
  }
}), hf = M({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: {
    type: Boolean,
    default: !0
  },
  delimiters: Array,
  ...tf({
    filterKeys: ["title"]
  }),
  ...Zr({
    hideNoData: !0,
    returnObject: !0
  }),
  ...Qt(ri({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...yn({
    transition: !1
  })
}, "VCombobox"), yf = J()({
  name: "VCombobox",
  props: hf(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:search": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    var pe;
    let {
      emit: n,
      slots: a
    } = t;
    const {
      t: l
    } = Ba(), i = Z(), o = U(!1), r = U(!0), s = U(!1), u = Z(), c = Z(), d = U(-1);
    let m = !1;
    const {
      items: v,
      transformIn: g,
      transformOut: f
    } = zr(e), {
      textColorClasses: h,
      textColorStyles: b
    } = gt(() => {
      var V;
      return (V = i.value) == null ? void 0 : V.color;
    }), y = De(e, "modelValue", [], (V) => g(Ke(V)), (V) => {
      const G = f(V);
      return e.multiple ? G : G[0] ?? null;
    }), E = Jl(e), w = x(() => !!(e.chips || a.chip)), I = x(() => w.value || !!a.selection), T = U(!e.multiple && !I.value ? ((pe = y.value[0]) == null ? void 0 : pe.title) ?? "" : ""), _ = x({
      get: () => T.value,
      set: (V) => {
        var G;
        if (T.value = V ?? "", !e.multiple && !I.value && (y.value = [Vt(e, V)], Be(() => {
          var we;
          return (we = c.value) == null ? void 0 : we.scrollToIndex(0);
        })), V && e.multiple && ((G = e.delimiters) != null && G.length)) {
          const we = V.split(new RegExp(`(?:${e.delimiters.join("|")})+`));
          we.length > 1 && (we.forEach((oe) => {
            oe = oe.trim(), oe && W(Vt(e, oe));
          }), T.value = "");
        }
        V || (d.value = -1), r.value = !V;
      }
    }), P = x(() => typeof e.counterValue == "function" ? e.counterValue(y.value) : typeof e.counterValue == "number" ? e.counterValue : e.multiple ? y.value.length : _.value.length), {
      filteredItems: R,
      getMatches: Y
    } = af(e, v, () => r.value ? "" : _.value), j = x(() => e.hideSelected ? R.value.filter((V) => !y.value.some((G) => G.value === V.value)) : R.value), O = x(() => e.hideNoData && !j.value.length || E.isReadonly.value || E.isDisabled.value), B = De(e, "menu"), F = x({
      get: () => B.value,
      set: (V) => {
        var G;
        B.value && !V && ((G = u.value) != null && G.ΨopenChildren.size) || V && O.value || (B.value = V);
      }
    }), N = D(() => F.value ? e.closeText : e.openText);
    ee(T, (V) => {
      m ? Be(() => m = !1) : o.value && !F.value && (F.value = !0), n("update:search", V);
    }), ee(y, (V) => {
      var G;
      !e.multiple && !I.value && (T.value = ((G = V[0]) == null ? void 0 : G.title) ?? "");
    });
    const H = x(() => y.value.map((V) => V.value)), te = x(() => {
      var G;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && _.value === ((G = j.value[0]) == null ? void 0 : G.title)) && j.value.length > 0 && !r.value && !s.value;
    }), ne = Z(), me = Jr(ne, i);
    function S(V) {
      m = !0, e.openOnClear && (F.value = !0);
    }
    function k() {
      O.value || (F.value = !0);
    }
    function A(V) {
      O.value || (o.value && (V.preventDefault(), V.stopPropagation()), F.value = !F.value);
    }
    function z(V) {
      var G;
      (ga(V) || V.key === "Backspace") && ((G = i.value) == null || G.focus());
    }
    function ge(V) {
      var oe, Ie, ze, at;
      if (ru(V) || E.isReadonly.value) return;
      const G = (oe = i.value) == null ? void 0 : oe.selectionStart, we = y.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(V.key) && V.preventDefault(), ["Enter", "ArrowDown"].includes(V.key) && (F.value = !0), ["Escape"].includes(V.key) && (F.value = !1), ["Enter", "Escape", "Tab"].includes(V.key) && (te.value && ["Enter", "Tab"].includes(V.key) && !y.value.some((ue) => {
        let {
          value: lt
        } = ue;
        return lt === j.value[0].value;
      }) && W(R.value[0]), r.value = !0), V.key === "ArrowDown" && te.value && ((Ie = ne.value) == null || Ie.focus("next")), V.key === "Enter" && _.value && (W(Vt(e, _.value)), I.value && (T.value = "")), ["Backspace", "Delete"].includes(V.key)) {
        if (!e.multiple && I.value && y.value.length > 0 && !_.value) return W(y.value[0], !1);
        if (~d.value) {
          V.preventDefault();
          const ue = d.value;
          W(y.value[d.value], !1), d.value = ue >= we - 1 ? we - 2 : ue;
        } else V.key === "Backspace" && !_.value && (d.value = we - 1);
        return;
      }
      if (e.multiple)
        if (V.key === "ArrowLeft") {
          if (d.value < 0 && G && G > 0) return;
          const ue = d.value > -1 ? d.value - 1 : we - 1;
          y.value[ue] ? d.value = ue : (d.value = -1, (ze = i.value) == null || ze.setSelectionRange(_.value.length, _.value.length));
        } else if (V.key === "ArrowRight") {
          if (d.value < 0) return;
          const ue = d.value + 1;
          y.value[ue] ? d.value = ue : (d.value = -1, (at = i.value) == null || at.setSelectionRange(0, 0));
        } else ~d.value && ga(V) && (d.value = -1);
    }
    function $() {
      var V;
      e.eager && ((V = c.value) == null || V.calculateVisibleItems());
    }
    function he() {
      var V;
      o.value && (r.value = !0, (V = i.value) == null || V.focus());
    }
    function W(V) {
      let G = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!V || V.props.disabled))
        if (e.multiple) {
          const we = y.value.findIndex((Ie) => (e.valueComparator || Ze)(Ie.value, V.value)), oe = G ?? !~we;
          if (~we) {
            const Ie = oe ? [...y.value, V] : [...y.value];
            Ie.splice(we, 1), y.value = Ie;
          } else oe && (y.value = [...y.value, V]);
          e.clearOnSelect && (_.value = "");
        } else {
          const we = G !== !1;
          y.value = we ? [V] : [], T.value = we && !I.value ? V.title : "", Be(() => {
            F.value = !1, r.value = !0;
          });
        }
    }
    function be(V) {
      o.value = !0, setTimeout(() => {
        s.value = !0;
      });
    }
    function fe(V) {
      s.value = !1;
    }
    function xe(V) {
      (V == null || V === "" && !e.multiple && !I.value) && (y.value = []);
    }
    return ee(o, (V, G) => {
      if (!(V || V === G) && (d.value = -1, F.value = !1, _.value)) {
        if (e.multiple) {
          W(Vt(e, _.value));
          return;
        }
        if (!I.value) return;
        y.value.some((we) => {
          let {
            title: oe
          } = we;
          return oe === _.value;
        }) ? T.value = "" : W(Vt(e, _.value));
      }
    }), ee(F, () => {
      if (!e.hideSelected && F.value && y.value.length) {
        const V = j.value.findIndex((G) => y.value.some((we) => (e.valueComparator || Ze)(we.value, G.value)));
        Pe && window.requestAnimationFrame(() => {
          var G;
          V >= 0 && ((G = c.value) == null || G.scrollToIndex(V));
        });
      }
    }), ee(() => e.items, (V, G) => {
      F.value || o.value && !G.length && V.length && (F.value = !0);
    }), ie(() => {
      const V = !!(!e.hideNoData || j.value.length || a["prepend-item"] || a["append-item"] || a["no-data"]), G = y.value.length > 0, we = Ut.filterProps(e);
      return p(Ut, K({
        ref: i
      }, we, {
        modelValue: _.value,
        "onUpdate:modelValue": [(oe) => _.value = oe, xe],
        focused: o.value,
        "onUpdate:focused": (oe) => o.value = oe,
        validationValue: y.externalValue,
        counterValue: P.value,
        dirty: G,
        class: ["v-combobox", {
          "v-combobox--active-menu": F.value,
          "v-combobox--chips": !!e.chips,
          "v-combobox--selection-slot": !!I.value,
          "v-combobox--selecting-index": d.value > -1,
          [`v-combobox--${e.multiple ? "multiple" : "single"}`]: !0
        }, e.class],
        style: e.style,
        readonly: E.isReadonly.value,
        placeholder: G ? void 0 : e.placeholder,
        "onClick:clear": S,
        "onMousedown:control": k,
        onKeydown: ge
      }), {
        ...a,
        default: () => C(Se, null, [p(Xr, K({
          ref: u,
          modelValue: F.value,
          "onUpdate:modelValue": (oe) => F.value = oe,
          activator: "parent",
          contentClass: "v-combobox__content",
          disabled: O.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: $,
          onAfterLeave: he
        }, e.menuProps), {
          default: () => [V && p(Hr, K({
            ref: ne,
            filterable: !0,
            selected: H.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (oe) => oe.preventDefault(),
            onKeydown: z,
            onFocusin: be,
            onFocusout: fe,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, me, e.listProps), {
            default: () => {
              var oe, Ie, ze;
              return [(oe = a["prepend-item"]) == null ? void 0 : oe.call(a), !j.value.length && !e.hideNoData && (((Ie = a["no-data"]) == null ? void 0 : Ie.call(a)) ?? p(vn, {
                key: "no-data",
                title: l(e.noDataText)
              }, null)), p(Qr, {
                ref: c,
                renderless: !0,
                items: j.value,
                itemKey: "value"
              }, {
                default: (at) => {
                  var vi, mi, gi;
                  let {
                    item: ue,
                    index: lt,
                    itemRef: Xe
                  } = at;
                  const fi = K(ue.props, {
                    ref: Xe,
                    key: ue.value,
                    active: te.value && lt === 0 ? !0 : void 0,
                    onClick: () => W(ue, null)
                  });
                  return ue.type === "divider" ? ((vi = a.divider) == null ? void 0 : vi.call(a, {
                    props: ue.raw,
                    index: lt
                  })) ?? p(ti, K(ue.props, {
                    key: `divider-${lt}`
                  }), null) : ue.type === "subheader" ? ((mi = a.subheader) == null ? void 0 : mi.call(a, {
                    props: ue.raw,
                    index: lt
                  })) ?? p(li, K(ue.props, {
                    key: `subheader-${lt}`
                  }), null) : ((gi = a.item) == null ? void 0 : gi.call(a, {
                    item: ue,
                    index: lt,
                    props: fi
                  })) ?? p(vn, K(fi, {
                    role: "option"
                  }), {
                    prepend: (Qn) => {
                      let {
                        isSelected: hs
                      } = Qn;
                      return C(Se, null, [e.multiple && !e.hideSelected ? p(wr, {
                        key: ue.value,
                        modelValue: hs,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ue.props.prependAvatar && p(Ft, {
                        image: ue.props.prependAvatar
                      }, null), ue.props.prependIcon && p(Te, {
                        icon: ue.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Qn;
                      return r.value ? ue.title : lf("v-combobox", ue.title, (Qn = Y(ue)) == null ? void 0 : Qn.title);
                    }
                  });
                }
              }), (ze = a["append-item"]) == null ? void 0 : ze.call(a)];
            }
          })]
        }), y.value.map((oe, Ie) => {
          function ze(Xe) {
            Xe.stopPropagation(), Xe.preventDefault(), W(oe, !1);
          }
          const at = {
            "onClick:close": ze,
            onKeydown(Xe) {
              Xe.key !== "Enter" && Xe.key !== " " || (Xe.preventDefault(), Xe.stopPropagation(), ze(Xe));
            },
            onMousedown(Xe) {
              Xe.preventDefault(), Xe.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, ue = w.value ? !!a.chip : !!a.selection, lt = ue ? $l(w.value ? a.chip({
            item: oe,
            index: Ie,
            props: at
          }) : a.selection({
            item: oe,
            index: Ie
          })) : void 0;
          if (!(ue && !lt))
            return C("div", {
              key: oe.value,
              class: X(["v-combobox__selection", Ie === d.value && ["v-combobox__selection--selected", h.value]]),
              style: ve(Ie === d.value ? b.value : {})
            }, [w.value ? a.chip ? p(Fe, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: oe.title
                }
              }
            }, {
              default: () => [lt]
            }) : p(Ar, K({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: oe.title,
              disabled: oe.props.disabled
            }, at), null) : lt ?? C("span", {
              class: "v-combobox__selection-text"
            }, [oe.title, e.multiple && Ie < y.value.length - 1 && C("span", {
              class: "v-combobox__selection-comma"
            }, [So(",")])])]);
        })]),
        "append-inner": function() {
          var at, ue;
          for (var oe = arguments.length, Ie = new Array(oe), ze = 0; ze < oe; ze++)
            Ie[ze] = arguments[ze];
          return C(Se, null, [(at = a["append-inner"]) == null ? void 0 : at.call(a, ...Ie), (!e.hideNoData || e.items.length) && e.menuIcon ? p(Te, {
            class: "v-combobox__menu-icon",
            color: (ue = i.value) == null ? void 0 : ue.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: A,
            onClick: du,
            "aria-label": l(N.value),
            title: l(N.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Yn({
      isFocused: o,
      isPristine: r,
      menu: F,
      search: _,
      selectionIndex: d,
      filteredItems: R,
      select: W
    }, i);
  }
});
/**!
 * Sortable 1.15.6
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function co(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(l) {
      return Object.getOwnPropertyDescriptor(e, l).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function ht(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? co(Object(n), !0).forEach(function(a) {
      bf(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : co(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function sa(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? sa = function(t) {
    return typeof t;
  } : sa = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, sa(e);
}
function bf(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Et() {
  return Et = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, Et.apply(this, arguments);
}
function pf(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), l, i;
  for (i = 0; i < a.length; i++)
    l = a[i], !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function wf(e, t) {
  if (e == null) return {};
  var n = pf(e, t), a, l;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (l = 0; l < i.length; l++)
      a = i[l], !(t.indexOf(a) >= 0) && Object.prototype.propertyIsEnumerable.call(e, a) && (n[a] = e[a]);
  }
  return n;
}
var Sf = "1.15.6";
function kt(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var Pt = kt(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Xn = kt(/Edge/i), fo = kt(/firefox/i), Vn = kt(/safari/i) && !kt(/chrome/i) && !kt(/android/i), si = kt(/iP(ad|od|hone)/i), ns = kt(/chrome/i) && kt(/android/i), as = {
  capture: !1,
  passive: !1
};
function ce(e, t, n) {
  e.addEventListener(t, n, !Pt && as);
}
function se(e, t, n) {
  e.removeEventListener(t, n, !Pt && as);
}
function xa(e, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), e)
      try {
        if (e.matches)
          return e.matches(t);
        if (e.msMatchesSelector)
          return e.msMatchesSelector(t);
        if (e.webkitMatchesSelector)
          return e.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function ls(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function ut(e, t, n, a) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && xa(e, t) : xa(e, t)) || a && e === n)
        return e;
      if (e === n) break;
    } while (e = ls(e));
  }
  return null;
}
var vo = /\s+/g;
function qe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var a = (" " + e.className + " ").replace(vo, " ").replace(" " + t + " ", " ");
      e.className = (a + (n ? " " + t : "")).replace(vo, " ");
    }
}
function q(e, t, n) {
  var a = e && e.style;
  if (a) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
    !(t in a) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), a[t] = n + (typeof n == "string" ? "" : "px");
  }
}
function cn(e, t) {
  var n = "";
  if (typeof e == "string")
    n = e;
  else
    do {
      var a = q(e, "transform");
      a && a !== "none" && (n = a + " " + n);
    } while (!t && (e = e.parentNode));
  var l = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return l && new l(n);
}
function is(e, t, n) {
  if (e) {
    var a = e.getElementsByTagName(t), l = 0, i = a.length;
    if (n)
      for (; l < i; l++)
        n(a[l], l);
    return a;
  }
  return [];
}
function ft() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function Ve(e, t, n, a, l) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var i, o, r, s, u, c, d;
    if (e !== window && e.parentNode && e !== ft() ? (i = e.getBoundingClientRect(), o = i.top, r = i.left, s = i.bottom, u = i.right, c = i.height, d = i.width) : (o = 0, r = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (l = l || e.parentNode, !Pt))
      do
        if (l && l.getBoundingClientRect && (q(l, "transform") !== "none" || n && q(l, "position") !== "static")) {
          var m = l.getBoundingClientRect();
          o -= m.top + parseInt(q(l, "border-top-width")), r -= m.left + parseInt(q(l, "border-left-width")), s = o + i.height, u = r + i.width;
          break;
        }
      while (l = l.parentNode);
    if (a && e !== window) {
      var v = cn(l || e), g = v && v.a, f = v && v.d;
      v && (o /= f, r /= g, d /= g, c /= f, s = o + c, u = r + d);
    }
    return {
      top: o,
      left: r,
      bottom: s,
      right: u,
      width: d,
      height: c
    };
  }
}
function mo(e, t, n) {
  for (var a = Ot(e, !0), l = Ve(e)[t]; a; ) {
    var i = Ve(a)[n], o = void 0;
    if (o = l >= i, !o) return a;
    if (a === ft()) break;
    a = Ot(a, !1);
  }
  return !1;
}
function mn(e, t, n, a) {
  for (var l = 0, i = 0, o = e.children; i < o.length; ) {
    if (o[i].style.display !== "none" && o[i] !== Q.ghost && (a || o[i] !== Q.dragged) && ut(o[i], n.draggable, e, !1)) {
      if (l === t)
        return o[i];
      l++;
    }
    i++;
  }
  return null;
}
function ui(e, t) {
  for (var n = e.lastElementChild; n && (n === Q.ghost || q(n, "display") === "none" || t && !xa(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function ot(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== Q.clone && (!t || xa(e, t)) && n++;
  return n;
}
function go(e) {
  var t = 0, n = 0, a = ft();
  if (e)
    do {
      var l = cn(e), i = l.a, o = l.d;
      t += e.scrollLeft * i, n += e.scrollTop * o;
    } while (e !== a && (e = e.parentNode));
  return [t, n];
}
function Cf(e, t) {
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      for (var a in t)
        if (t.hasOwnProperty(a) && t[a] === e[n][a]) return Number(n);
    }
  return -1;
}
function Ot(e, t) {
  if (!e || !e.getBoundingClientRect) return ft();
  var n = e, a = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var l = q(n);
      if (n.clientWidth < n.scrollWidth && (l.overflowX == "auto" || l.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (l.overflowY == "auto" || l.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return ft();
        if (a || t) return n;
        a = !0;
      }
    }
  while (n = n.parentNode);
  return ft();
}
function xf(e, t) {
  if (e && t)
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
}
function el(e, t) {
  return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
}
var Tn;
function os(e, t) {
  return function() {
    if (!Tn) {
      var n = arguments, a = this;
      n.length === 1 ? e.call(a, n[0]) : e.apply(a, n), Tn = setTimeout(function() {
        Tn = void 0;
      }, t);
    }
  };
}
function kf() {
  clearTimeout(Tn), Tn = void 0;
}
function rs(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function ss(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function us(e, t, n) {
  var a = {};
  return Array.from(e.children).forEach(function(l) {
    var i, o, r, s;
    if (!(!ut(l, t.draggable, e, !1) || l.animated || l === n)) {
      var u = Ve(l);
      a.left = Math.min((i = a.left) !== null && i !== void 0 ? i : 1 / 0, u.left), a.top = Math.min((o = a.top) !== null && o !== void 0 ? o : 1 / 0, u.top), a.right = Math.max((r = a.right) !== null && r !== void 0 ? r : -1 / 0, u.right), a.bottom = Math.max((s = a.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
var Ge = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function If() {
  var e = [], t;
  return {
    captureAnimationState: function() {
      if (e = [], !!this.options.animation) {
        var a = [].slice.call(this.el.children);
        a.forEach(function(l) {
          if (!(q(l, "display") === "none" || l === Q.ghost)) {
            e.push({
              target: l,
              rect: Ve(l)
            });
            var i = ht({}, e[e.length - 1].rect);
            if (l.thisAnimationDuration) {
              var o = cn(l, !0);
              o && (i.top -= o.f, i.left -= o.e);
            }
            l.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(a) {
      e.push(a);
    },
    removeAnimationState: function(a) {
      e.splice(Cf(e, {
        target: a
      }), 1);
    },
    animateAll: function(a) {
      var l = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof a == "function" && a();
        return;
      }
      var i = !1, o = 0;
      e.forEach(function(r) {
        var s = 0, u = r.target, c = u.fromRect, d = Ve(u), m = u.prevFromRect, v = u.prevToRect, g = r.rect, f = cn(u, !0);
        f && (d.top -= f.f, d.left -= f.e), u.toRect = d, u.thisAnimationDuration && el(m, d) && !el(c, d) && // Make sure animatingRect is on line between toRect & fromRect
        (g.top - d.top) / (g.left - d.left) === (c.top - d.top) / (c.left - d.left) && (s = _f(g, m, v, l.options)), el(d, c) || (u.prevFromRect = c, u.prevToRect = d, s || (s = l.options.animation), l.animate(u, g, d, s)), s && (i = !0, o = Math.max(o, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof a == "function" && a();
      }, o) : typeof a == "function" && a(), e = [];
    },
    animate: function(a, l, i, o) {
      if (o) {
        q(a, "transition", ""), q(a, "transform", "");
        var r = cn(this.el), s = r && r.a, u = r && r.d, c = (l.left - i.left) / (s || 1), d = (l.top - i.top) / (u || 1);
        a.animatingX = !!c, a.animatingY = !!d, q(a, "transform", "translate3d(" + c + "px," + d + "px,0)"), this.forRepaintDummy = Ef(a), q(a, "transition", "transform " + o + "ms" + (this.options.easing ? " " + this.options.easing : "")), q(a, "transform", "translate3d(0,0,0)"), typeof a.animated == "number" && clearTimeout(a.animated), a.animated = setTimeout(function() {
          q(a, "transition", ""), q(a, "transform", ""), a.animated = !1, a.animatingX = !1, a.animatingY = !1;
        }, o);
      }
    }
  };
}
function Ef(e) {
  return e.offsetWidth;
}
function _f(e, t, n, a) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * a.animation;
}
var nn = [], tl = {
  initializeByDefault: !0
}, qn = {
  mount: function(t) {
    for (var n in tl)
      tl.hasOwnProperty(n) && !(n in t) && (t[n] = tl[n]);
    nn.forEach(function(a) {
      if (a.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), nn.push(t);
  },
  pluginEvent: function(t, n, a) {
    var l = this;
    this.eventCanceled = !1, a.cancel = function() {
      l.eventCanceled = !0;
    };
    var i = t + "Global";
    nn.forEach(function(o) {
      n[o.pluginName] && (n[o.pluginName][i] && n[o.pluginName][i](ht({
        sortable: n
      }, a)), n.options[o.pluginName] && n[o.pluginName][t] && n[o.pluginName][t](ht({
        sortable: n
      }, a)));
    });
  },
  initializePlugins: function(t, n, a, l) {
    nn.forEach(function(r) {
      var s = r.pluginName;
      if (!(!t.options[s] && !r.initializeByDefault)) {
        var u = new r(t, n, t.options);
        u.sortable = t, u.options = t.options, t[s] = u, Et(a, u.defaults);
      }
    });
    for (var i in t.options)
      if (t.options.hasOwnProperty(i)) {
        var o = this.modifyOption(t, i, t.options[i]);
        typeof o < "u" && (t.options[i] = o);
      }
  },
  getEventProperties: function(t, n) {
    var a = {};
    return nn.forEach(function(l) {
      typeof l.eventProperties == "function" && Et(a, l.eventProperties.call(n[l.pluginName], t));
    }), a;
  },
  modifyOption: function(t, n, a) {
    var l;
    return nn.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (l = i.optionListeners[n].call(t[i.pluginName], a));
    }), l;
  }
};
function Pf(e) {
  var t = e.sortable, n = e.rootEl, a = e.name, l = e.targetEl, i = e.cloneEl, o = e.toEl, r = e.fromEl, s = e.oldIndex, u = e.newIndex, c = e.oldDraggableIndex, d = e.newDraggableIndex, m = e.originalEvent, v = e.putSortable, g = e.extraEventProperties;
  if (t = t || n && n[Ge], !!t) {
    var f, h = t.options, b = "on" + a.charAt(0).toUpperCase() + a.substr(1);
    window.CustomEvent && !Pt && !Xn ? f = new CustomEvent(a, {
      bubbles: !0,
      cancelable: !0
    }) : (f = document.createEvent("Event"), f.initEvent(a, !0, !0)), f.to = o || n, f.from = r || n, f.item = l || n, f.clone = i, f.oldIndex = s, f.newIndex = u, f.oldDraggableIndex = c, f.newDraggableIndex = d, f.originalEvent = m, f.pullMode = v ? v.lastPutMode : void 0;
    var y = ht(ht({}, g), qn.getEventProperties(a, t));
    for (var E in y)
      f[E] = y[E];
    n && n.dispatchEvent(f), h[b] && h[b].call(t, f);
  }
}
var Af = ["evt"], We = function(t, n) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, l = a.evt, i = wf(a, Af);
  qn.pluginEvent.bind(Q)(t, n, ht({
    dragEl: L,
    parentEl: Ee,
    ghostEl: ae,
    rootEl: Ce,
    nextEl: Ht,
    lastDownEl: ua,
    cloneEl: ke,
    cloneHidden: Tt,
    dragStarted: kn,
    putSortable: Me,
    activeSortable: Q.active,
    originalEvent: l,
    oldIndex: sn,
    oldDraggableIndex: Dn,
    newIndex: Qe,
    newDraggableIndex: At,
    hideGhostForTarget: vs,
    unhideGhostForTarget: ms,
    cloneNowHidden: function() {
      Tt = !0;
    },
    cloneNowShown: function() {
      Tt = !1;
    },
    dispatchSortableEvent: function(r) {
      je({
        sortable: n,
        name: r,
        originalEvent: l
      });
    }
  }, i));
};
function je(e) {
  Pf(ht({
    putSortable: Me,
    cloneEl: ke,
    targetEl: L,
    rootEl: Ce,
    oldIndex: sn,
    oldDraggableIndex: Dn,
    newIndex: Qe,
    newDraggableIndex: At
  }, e));
}
var L, Ee, ae, Ce, Ht, ua, ke, Tt, sn, Qe, Dn, At, ta, Me, ln = !1, ka = !1, Ia = [], zt, st, nl, al, ho, yo, kn, an, On, Bn = !1, na = !1, ca, $e, ll = [], Vl = !1, Ea = [], Ra = typeof document < "u", aa = si, bo = Xn || Pt ? "cssFloat" : "float", Vf = Ra && !ns && !si && "draggable" in document.createElement("div"), cs = function() {
  if (Ra) {
    if (Pt)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
}(), ds = function(t, n) {
  var a = q(t), l = parseInt(a.width) - parseInt(a.paddingLeft) - parseInt(a.paddingRight) - parseInt(a.borderLeftWidth) - parseInt(a.borderRightWidth), i = mn(t, 0, n), o = mn(t, 1, n), r = i && q(i), s = o && q(o), u = r && parseInt(r.marginLeft) + parseInt(r.marginRight) + Ve(i).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Ve(o).width;
  if (a.display === "flex")
    return a.flexDirection === "column" || a.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (a.display === "grid")
    return a.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && r.float && r.float !== "none") {
    var d = r.float === "left" ? "left" : "right";
    return o && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (r.display === "block" || r.display === "flex" || r.display === "table" || r.display === "grid" || u >= l && a[bo] === "none" || o && a[bo] === "none" && u + c > l) ? "vertical" : "horizontal";
}, Tf = function(t, n, a) {
  var l = a ? t.left : t.top, i = a ? t.right : t.bottom, o = a ? t.width : t.height, r = a ? n.left : n.top, s = a ? n.right : n.bottom, u = a ? n.width : n.height;
  return l === r || i === s || l + o / 2 === r + u / 2;
}, Df = function(t, n) {
  var a;
  return Ia.some(function(l) {
    var i = l[Ge].options.emptyInsertThreshold;
    if (!(!i || ui(l))) {
      var o = Ve(l), r = t >= o.left - i && t <= o.right + i, s = n >= o.top - i && n <= o.bottom + i;
      if (r && s)
        return a = l;
    }
  }), a;
}, fs = function(t) {
  function n(i, o) {
    return function(r, s, u, c) {
      var d = r.options.group.name && s.options.group.name && r.options.group.name === s.options.group.name;
      if (i == null && (o || d))
        return !0;
      if (i == null || i === !1)
        return !1;
      if (o && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(r, s, u, c), o)(r, s, u, c);
      var m = (o ? r : s).options.group.name;
      return i === !0 || typeof i == "string" && i === m || i.join && i.indexOf(m) > -1;
    };
  }
  var a = {}, l = t.group;
  (!l || sa(l) != "object") && (l = {
    name: l
  }), a.name = l.name, a.checkPull = n(l.pull, !0), a.checkPut = n(l.put), a.revertClone = l.revertClone, t.group = a;
}, vs = function() {
  !cs && ae && q(ae, "display", "none");
}, ms = function() {
  !cs && ae && q(ae, "display", "");
};
Ra && !ns && document.addEventListener("click", function(e) {
  if (ka)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), ka = !1, !1;
}, !0);
var jt = function(t) {
  if (L) {
    t = t.touches ? t.touches[0] : t;
    var n = Df(t.clientX, t.clientY);
    if (n) {
      var a = {};
      for (var l in t)
        t.hasOwnProperty(l) && (a[l] = t[l]);
      a.target = a.rootEl = n, a.preventDefault = void 0, a.stopPropagation = void 0, n[Ge]._onDragOver(a);
    }
  }
}, Of = function(t) {
  L && L.parentNode[Ge]._isOutsideThisEl(t.target);
};
function Q(e, t) {
  if (!(e && e.nodeType && e.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
  this.el = e, this.options = t = Et({}, t), e[Ge] = this;
  var n = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return ds(e, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(o, r) {
      o.setData("Text", r.textContent);
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
    supportPointer: Q.supportPointer !== !1 && "PointerEvent" in window && (!Vn || si),
    emptyInsertThreshold: 5
  };
  qn.initializePlugins(this, e, n);
  for (var a in n)
    !(a in t) && (t[a] = n[a]);
  fs(t);
  for (var l in this)
    l.charAt(0) === "_" && typeof this[l] == "function" && (this[l] = this[l].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Vf, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? ce(e, "pointerdown", this._onTapStart) : (ce(e, "mousedown", this._onTapStart), ce(e, "touchstart", this._onTapStart)), this.nativeDraggable && (ce(e, "dragover", this), ce(e, "dragenter", this)), Ia.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Et(this, If());
}
Q.prototype = /** @lends Sortable.prototype */
{
  constructor: Q,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (an = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, L) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, a = this.el, l = this.options, i = l.preventOnFilter, o = t.type, r = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (r || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, c = l.filter;
      if (zf(a), !L && !(/mousedown|pointerdown/.test(o) && t.button !== 0 || l.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Vn && s && s.tagName.toUpperCase() === "SELECT") && (s = ut(s, l.draggable, a, !1), !(s && s.animated) && ua !== s)) {
        if (sn = ot(s), Dn = ot(s, l.draggable), typeof c == "function") {
          if (c.call(this, t, s, this)) {
            je({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: a,
              fromEl: a
            }), We("filter", n, {
              evt: t
            }), i && t.preventDefault();
            return;
          }
        } else if (c && (c = c.split(",").some(function(d) {
          if (d = ut(u, d.trim(), a, !1), d)
            return je({
              sortable: n,
              rootEl: d,
              name: "filter",
              targetEl: s,
              fromEl: a,
              toEl: a
            }), We("filter", n, {
              evt: t
            }), !0;
        }), c)) {
          i && t.preventDefault();
          return;
        }
        l.handle && !ut(u, l.handle, a, !1) || this._prepareDragStart(t, r, s);
      }
    }
  },
  _prepareDragStart: function(t, n, a) {
    var l = this, i = l.el, o = l.options, r = i.ownerDocument, s;
    if (a && !L && a.parentNode === i) {
      var u = Ve(a);
      if (Ce = i, L = a, Ee = L.parentNode, Ht = L.nextSibling, ua = a, ta = o.group, Q.dragged = L, zt = {
        target: L,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, ho = zt.clientX - u.left, yo = zt.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, L.style["will-change"] = "all", s = function() {
        if (We("delayEnded", l, {
          evt: t
        }), Q.eventCanceled) {
          l._onDrop();
          return;
        }
        l._disableDelayedDragEvents(), !fo && l.nativeDraggable && (L.draggable = !0), l._triggerDragStart(t, n), je({
          sortable: l,
          name: "choose",
          originalEvent: t
        }), qe(L, o.chosenClass, !0);
      }, o.ignore.split(",").forEach(function(c) {
        is(L, c.trim(), il);
      }), ce(r, "dragover", jt), ce(r, "mousemove", jt), ce(r, "touchmove", jt), o.supportPointer ? (ce(r, "pointerup", l._onDrop), !this.nativeDraggable && ce(r, "pointercancel", l._onDrop)) : (ce(r, "mouseup", l._onDrop), ce(r, "touchend", l._onDrop), ce(r, "touchcancel", l._onDrop)), fo && this.nativeDraggable && (this.options.touchStartThreshold = 4, L.draggable = !0), We("delayStart", this, {
        evt: t
      }), o.delay && (!o.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Xn || Pt))) {
        if (Q.eventCanceled) {
          this._onDrop();
          return;
        }
        o.supportPointer ? (ce(r, "pointerup", l._disableDelayedDrag), ce(r, "pointercancel", l._disableDelayedDrag)) : (ce(r, "mouseup", l._disableDelayedDrag), ce(r, "touchend", l._disableDelayedDrag), ce(r, "touchcancel", l._disableDelayedDrag)), ce(r, "mousemove", l._delayedDragTouchMoveHandler), ce(r, "touchmove", l._delayedDragTouchMoveHandler), o.supportPointer && ce(r, "pointermove", l._delayedDragTouchMoveHandler), l._dragStartTimer = setTimeout(s, o.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var n = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    L && il(L), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    se(t, "mouseup", this._disableDelayedDrag), se(t, "touchend", this._disableDelayedDrag), se(t, "touchcancel", this._disableDelayedDrag), se(t, "pointerup", this._disableDelayedDrag), se(t, "pointercancel", this._disableDelayedDrag), se(t, "mousemove", this._delayedDragTouchMoveHandler), se(t, "touchmove", this._delayedDragTouchMoveHandler), se(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, n) {
    n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? ce(document, "pointermove", this._onTouchMove) : n ? ce(document, "touchmove", this._onTouchMove) : ce(document, "mousemove", this._onTouchMove) : (ce(L, "dragend", this), ce(Ce, "dragstart", this._onDragStart));
    try {
      document.selection ? da(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (ln = !1, Ce && L) {
      We("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && ce(document, "dragover", Of);
      var a = this.options;
      !t && qe(L, a.dragClass, !1), qe(L, a.ghostClass, !0), Q.active = this, t && this._appendGhost(), je({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (st) {
      this._lastX = st.clientX, this._lastY = st.clientY, vs();
      for (var t = document.elementFromPoint(st.clientX, st.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(st.clientX, st.clientY), t !== n); )
        n = t;
      if (L.parentNode[Ge]._isOutsideThisEl(t), n)
        do {
          if (n[Ge]) {
            var a = void 0;
            if (a = n[Ge]._onDragOver({
              clientX: st.clientX,
              clientY: st.clientY,
              target: t,
              rootEl: n
            }), a && !this.options.dragoverBubble)
              break;
          }
          t = n;
        } while (n = ls(n));
      ms();
    }
  },
  _onTouchMove: function(t) {
    if (zt) {
      var n = this.options, a = n.fallbackTolerance, l = n.fallbackOffset, i = t.touches ? t.touches[0] : t, o = ae && cn(ae, !0), r = ae && o && o.a, s = ae && o && o.d, u = aa && $e && go($e), c = (i.clientX - zt.clientX + l.x) / (r || 1) + (u ? u[0] - ll[0] : 0) / (r || 1), d = (i.clientY - zt.clientY + l.y) / (s || 1) + (u ? u[1] - ll[1] : 0) / (s || 1);
      if (!Q.active && !ln) {
        if (a && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < a)
          return;
        this._onDragStart(t, !0);
      }
      if (ae) {
        o ? (o.e += c - (nl || 0), o.f += d - (al || 0)) : o = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: c,
          f: d
        };
        var m = "matrix(".concat(o.a, ",").concat(o.b, ",").concat(o.c, ",").concat(o.d, ",").concat(o.e, ",").concat(o.f, ")");
        q(ae, "webkitTransform", m), q(ae, "mozTransform", m), q(ae, "msTransform", m), q(ae, "transform", m), nl = c, al = d, st = i;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!ae) {
      var t = this.options.fallbackOnBody ? document.body : Ce, n = Ve(L, !0, aa, !0, t), a = this.options;
      if (aa) {
        for ($e = t; q($e, "position") === "static" && q($e, "transform") === "none" && $e !== document; )
          $e = $e.parentNode;
        $e !== document.body && $e !== document.documentElement ? ($e === document && ($e = ft()), n.top += $e.scrollTop, n.left += $e.scrollLeft) : $e = ft(), ll = go($e);
      }
      ae = L.cloneNode(!0), qe(ae, a.ghostClass, !1), qe(ae, a.fallbackClass, !0), qe(ae, a.dragClass, !0), q(ae, "transition", ""), q(ae, "transform", ""), q(ae, "box-sizing", "border-box"), q(ae, "margin", 0), q(ae, "top", n.top), q(ae, "left", n.left), q(ae, "width", n.width), q(ae, "height", n.height), q(ae, "opacity", "0.8"), q(ae, "position", aa ? "absolute" : "fixed"), q(ae, "zIndex", "100000"), q(ae, "pointerEvents", "none"), Q.ghost = ae, t.appendChild(ae), q(ae, "transform-origin", ho / parseInt(ae.style.width) * 100 + "% " + yo / parseInt(ae.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, n) {
    var a = this, l = t.dataTransfer, i = a.options;
    if (We("dragStart", this, {
      evt: t
    }), Q.eventCanceled) {
      this._onDrop();
      return;
    }
    We("setupClone", this), Q.eventCanceled || (ke = ss(L), ke.removeAttribute("id"), ke.draggable = !1, ke.style["will-change"] = "", this._hideClone(), qe(ke, this.options.chosenClass, !1), Q.clone = ke), a.cloneId = da(function() {
      We("clone", a), !Q.eventCanceled && (a.options.removeCloneOnHide || Ce.insertBefore(ke, L), a._hideClone(), je({
        sortable: a,
        name: "clone"
      }));
    }), !n && qe(L, i.dragClass, !0), n ? (ka = !0, a._loopId = setInterval(a._emulateDragOver, 50)) : (se(document, "mouseup", a._onDrop), se(document, "touchend", a._onDrop), se(document, "touchcancel", a._onDrop), l && (l.effectAllowed = "move", i.setData && i.setData.call(a, l, L)), ce(document, "drop", a), q(L, "transform", "translateZ(0)")), ln = !0, a._dragStartId = da(a._dragStarted.bind(a, n, t)), ce(document, "selectstart", a), kn = !0, window.getSelection().removeAllRanges(), Vn && q(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, a = t.target, l, i, o, r = this.options, s = r.group, u = Q.active, c = ta === s, d = r.sort, m = Me || u, v, g = this, f = !1;
    if (Vl) return;
    function h(ne, me) {
      We(ne, g, ht({
        evt: t,
        isOwner: c,
        axis: v ? "vertical" : "horizontal",
        revert: o,
        dragRect: l,
        targetRect: i,
        canSort: d,
        fromSortable: m,
        target: a,
        completed: y,
        onMove: function(k, A) {
          return la(Ce, n, L, l, k, Ve(k), t, A);
        },
        changed: E
      }, me));
    }
    function b() {
      h("dragOverAnimationCapture"), g.captureAnimationState(), g !== m && m.captureAnimationState();
    }
    function y(ne) {
      return h("dragOverCompleted", {
        insertion: ne
      }), ne && (c ? u._hideClone() : u._showClone(g), g !== m && (qe(L, Me ? Me.options.ghostClass : u.options.ghostClass, !1), qe(L, r.ghostClass, !0)), Me !== g && g !== Q.active ? Me = g : g === Q.active && Me && (Me = null), m === g && (g._ignoreWhileAnimating = a), g.animateAll(function() {
        h("dragOverAnimationComplete"), g._ignoreWhileAnimating = null;
      }), g !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (a === L && !L.animated || a === n && !a.animated) && (an = null), !r.dragoverBubble && !t.rootEl && a !== document && (L.parentNode[Ge]._isOutsideThisEl(t.target), !ne && jt(t)), !r.dragoverBubble && t.stopPropagation && t.stopPropagation(), f = !0;
    }
    function E() {
      Qe = ot(L), At = ot(L, r.draggable), je({
        sortable: g,
        name: "change",
        toEl: n,
        newIndex: Qe,
        newDraggableIndex: At,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), a = ut(a, r.draggable, n, !0), h("dragOver"), Q.eventCanceled) return f;
    if (L.contains(t.target) || a.animated && a.animatingX && a.animatingY || g._ignoreWhileAnimating === a)
      return y(!1);
    if (ka = !1, u && !r.disabled && (c ? d || (o = Ee !== Ce) : Me === this || (this.lastPutMode = ta.checkPull(this, u, L, t)) && s.checkPut(this, u, L, t))) {
      if (v = this._getDirection(t, a) === "vertical", l = Ve(L), h("dragOverValid"), Q.eventCanceled) return f;
      if (o)
        return Ee = Ce, b(), this._hideClone(), h("revert"), Q.eventCanceled || (Ht ? Ce.insertBefore(L, Ht) : Ce.appendChild(L)), y(!0);
      var w = ui(n, r.draggable);
      if (!w || Mf(t, v, this) && !w.animated) {
        if (w === L)
          return y(!1);
        if (w && n === t.target && (a = w), a && (i = Ve(a)), la(Ce, n, L, l, a, i, t, !!a) !== !1)
          return b(), w && w.nextSibling ? n.insertBefore(L, w.nextSibling) : n.appendChild(L), Ee = n, E(), y(!0);
      } else if (w && Lf(t, v, this)) {
        var I = mn(n, 0, r, !0);
        if (I === L)
          return y(!1);
        if (a = I, i = Ve(a), la(Ce, n, L, l, a, i, t, !1) !== !1)
          return b(), n.insertBefore(L, I), Ee = n, E(), y(!0);
      } else if (a.parentNode === n) {
        i = Ve(a);
        var T = 0, _, P = L.parentNode !== n, R = !Tf(L.animated && L.toRect || l, a.animated && a.toRect || i, v), Y = v ? "top" : "left", j = mo(a, "top", "top") || mo(L, "top", "top"), O = j ? j.scrollTop : void 0;
        an !== a && (_ = i[Y], Bn = !1, na = !R && r.invertSwap || P), T = Rf(t, a, i, v, R ? 1 : r.swapThreshold, r.invertedSwapThreshold == null ? r.swapThreshold : r.invertedSwapThreshold, na, an === a);
        var B;
        if (T !== 0) {
          var F = ot(L);
          do
            F -= T, B = Ee.children[F];
          while (B && (q(B, "display") === "none" || B === ae));
        }
        if (T === 0 || B === a)
          return y(!1);
        an = a, On = T;
        var N = a.nextElementSibling, H = !1;
        H = T === 1;
        var te = la(Ce, n, L, l, a, i, t, H);
        if (te !== !1)
          return (te === 1 || te === -1) && (H = te === 1), Vl = !0, setTimeout(Ff, 30), b(), H && !N ? n.appendChild(L) : a.parentNode.insertBefore(L, H ? N : a), j && rs(j, 0, O - j.scrollTop), Ee = L.parentNode, _ !== void 0 && !na && (ca = Math.abs(_ - Ve(a)[Y])), E(), y(!0);
      }
      if (n.contains(L))
        return y(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    se(document, "mousemove", this._onTouchMove), se(document, "touchmove", this._onTouchMove), se(document, "pointermove", this._onTouchMove), se(document, "dragover", jt), se(document, "mousemove", jt), se(document, "touchmove", jt);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    se(t, "mouseup", this._onDrop), se(t, "touchend", this._onDrop), se(t, "pointerup", this._onDrop), se(t, "pointercancel", this._onDrop), se(t, "touchcancel", this._onDrop), se(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, a = this.options;
    if (Qe = ot(L), At = ot(L, a.draggable), We("drop", this, {
      evt: t
    }), Ee = L && L.parentNode, Qe = ot(L), At = ot(L, a.draggable), Q.eventCanceled) {
      this._nulling();
      return;
    }
    ln = !1, na = !1, Bn = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Tl(this.cloneId), Tl(this._dragStartId), this.nativeDraggable && (se(document, "drop", this), se(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Vn && q(document.body, "user-select", ""), q(L, "transform", ""), t && (kn && (t.cancelable && t.preventDefault(), !a.dropBubble && t.stopPropagation()), ae && ae.parentNode && ae.parentNode.removeChild(ae), (Ce === Ee || Me && Me.lastPutMode !== "clone") && ke && ke.parentNode && ke.parentNode.removeChild(ke), L && (this.nativeDraggable && se(L, "dragend", this), il(L), L.style["will-change"] = "", kn && !ln && qe(L, Me ? Me.options.ghostClass : this.options.ghostClass, !1), qe(L, this.options.chosenClass, !1), je({
      sortable: this,
      name: "unchoose",
      toEl: Ee,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Ce !== Ee ? (Qe >= 0 && (je({
      rootEl: Ee,
      name: "add",
      toEl: Ee,
      fromEl: Ce,
      originalEvent: t
    }), je({
      sortable: this,
      name: "remove",
      toEl: Ee,
      originalEvent: t
    }), je({
      rootEl: Ee,
      name: "sort",
      toEl: Ee,
      fromEl: Ce,
      originalEvent: t
    }), je({
      sortable: this,
      name: "sort",
      toEl: Ee,
      originalEvent: t
    })), Me && Me.save()) : Qe !== sn && Qe >= 0 && (je({
      sortable: this,
      name: "update",
      toEl: Ee,
      originalEvent: t
    }), je({
      sortable: this,
      name: "sort",
      toEl: Ee,
      originalEvent: t
    })), Q.active && ((Qe == null || Qe === -1) && (Qe = sn, At = Dn), je({
      sortable: this,
      name: "end",
      toEl: Ee,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    We("nulling", this), Ce = L = Ee = ae = Ht = ke = ua = Tt = zt = st = kn = Qe = At = sn = Dn = an = On = Me = ta = Q.dragged = Q.ghost = Q.clone = Q.active = null, Ea.forEach(function(t) {
      t.checked = !0;
    }), Ea.length = nl = al = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        L && (this._onDragOver(t), Bf(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var t = [], n, a = this.el.children, l = 0, i = a.length, o = this.options; l < i; l++)
      n = a[l], ut(n, o.draggable, this.el, !1) && t.push(n.getAttribute(o.dataIdAttr) || $f(n));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, n) {
    var a = {}, l = this.el;
    this.toArray().forEach(function(i, o) {
      var r = l.children[o];
      ut(r, this.options.draggable, l, !1) && (a[i] = r);
    }, this), n && this.captureAnimationState(), t.forEach(function(i) {
      a[i] && (l.removeChild(a[i]), l.appendChild(a[i]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(t, n) {
    return ut(t, n || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, n) {
    var a = this.options;
    if (n === void 0)
      return a[t];
    var l = qn.modifyOption(this, t, n);
    typeof l < "u" ? a[t] = l : a[t] = n, t === "group" && fs(a);
  },
  /**
   * Destroy
   */
  destroy: function() {
    We("destroy", this);
    var t = this.el;
    t[Ge] = null, se(t, "mousedown", this._onTapStart), se(t, "touchstart", this._onTapStart), se(t, "pointerdown", this._onTapStart), this.nativeDraggable && (se(t, "dragover", this), se(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Ia.splice(Ia.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Tt) {
      if (We("hideClone", this), Q.eventCanceled) return;
      q(ke, "display", "none"), this.options.removeCloneOnHide && ke.parentNode && ke.parentNode.removeChild(ke), Tt = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Tt) {
      if (We("showClone", this), Q.eventCanceled) return;
      L.parentNode == Ce && !this.options.group.revertClone ? Ce.insertBefore(ke, L) : Ht ? Ce.insertBefore(ke, Ht) : Ce.appendChild(ke), this.options.group.revertClone && this.animate(L, ke), q(ke, "display", ""), Tt = !1;
    }
  }
};
function Bf(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function la(e, t, n, a, l, i, o, r) {
  var s, u = e[Ge], c = u.options.onMove, d;
  return window.CustomEvent && !Pt && !Xn ? s = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (s = document.createEvent("Event"), s.initEvent("move", !0, !0)), s.to = t, s.from = e, s.dragged = n, s.draggedRect = a, s.related = l || t, s.relatedRect = i || Ve(t), s.willInsertAfter = r, s.originalEvent = o, e.dispatchEvent(s), c && (d = c.call(u, s, o)), d;
}
function il(e) {
  e.draggable = !1;
}
function Ff() {
  Vl = !1;
}
function Lf(e, t, n) {
  var a = Ve(mn(n.el, 0, n.options, !0)), l = us(n.el, n.options, ae), i = 10;
  return t ? e.clientX < l.left - i || e.clientY < a.top && e.clientX < a.right : e.clientY < l.top - i || e.clientY < a.bottom && e.clientX < a.left;
}
function Mf(e, t, n) {
  var a = Ve(ui(n.el, n.options.draggable)), l = us(n.el, n.options, ae), i = 10;
  return t ? e.clientX > l.right + i || e.clientY > a.bottom && e.clientX > a.left : e.clientY > l.bottom + i || e.clientX > a.right && e.clientY > a.top;
}
function Rf(e, t, n, a, l, i, o, r) {
  var s = a ? e.clientY : e.clientX, u = a ? n.height : n.width, c = a ? n.top : n.left, d = a ? n.bottom : n.right, m = !1;
  if (!o) {
    if (r && ca < u * l) {
      if (!Bn && (On === 1 ? s > c + u * i / 2 : s < d - u * i / 2) && (Bn = !0), Bn)
        m = !0;
      else if (On === 1 ? s < c + ca : s > d - ca)
        return -On;
    } else if (s > c + u * (1 - l) / 2 && s < d - u * (1 - l) / 2)
      return Nf(t);
  }
  return m = m || o, m && (s < c + u * i / 2 || s > d - u * i / 2) ? s > c + u / 2 ? 1 : -1 : 0;
}
function Nf(e) {
  return ot(L) < ot(e) ? 1 : -1;
}
function $f(e) {
  for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, a = 0; n--; )
    a += t.charCodeAt(n);
  return a.toString(36);
}
function zf(e) {
  Ea.length = 0;
  for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
    var a = t[n];
    a.checked && Ea.push(a);
  }
}
function da(e) {
  return setTimeout(e, 0);
}
function Tl(e) {
  return clearTimeout(e);
}
Ra && ce(document, "touchmove", function(e) {
  (Q.active || ln) && e.cancelable && e.preventDefault();
});
Q.utils = {
  on: ce,
  off: se,
  css: q,
  find: is,
  is: function(t, n) {
    return !!ut(t, n, t, !1);
  },
  extend: xf,
  throttle: os,
  closest: ut,
  toggleClass: qe,
  clone: ss,
  index: ot,
  nextTick: da,
  cancelNextTick: Tl,
  detectDirection: ds,
  getChild: mn,
  expando: Ge
};
Q.get = function(e) {
  return e[Ge];
};
Q.mount = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(a) {
    if (!a.prototype || !a.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(a));
    a.utils && (Q.utils = ht(ht({}, Q.utils), a.utils)), qn.mount(a);
  });
};
Q.create = function(e, t) {
  return new Q(e, t);
};
Q.version = Sf;
var Ae = [], In, Dl, Ol = !1, ol, rl, _a, En;
function jf() {
  function e() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var t in this)
      t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
  }
  return e.prototype = {
    dragStarted: function(n) {
      var a = n.originalEvent;
      this.sortable.nativeDraggable ? ce(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? ce(document, "pointermove", this._handleFallbackAutoScroll) : a.touches ? ce(document, "touchmove", this._handleFallbackAutoScroll) : ce(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var a = n.originalEvent;
      !this.options.dragOverBubble && !a.rootEl && this._handleAutoScroll(a);
    },
    drop: function() {
      this.sortable.nativeDraggable ? se(document, "dragover", this._handleAutoScroll) : (se(document, "pointermove", this._handleFallbackAutoScroll), se(document, "touchmove", this._handleFallbackAutoScroll), se(document, "mousemove", this._handleFallbackAutoScroll)), po(), fa(), kf();
    },
    nulling: function() {
      _a = Dl = In = Ol = En = ol = rl = null, Ae.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, a) {
      var l = this, i = (n.touches ? n.touches[0] : n).clientX, o = (n.touches ? n.touches[0] : n).clientY, r = document.elementFromPoint(i, o);
      if (_a = n, a || this.options.forceAutoScrollFallback || Xn || Pt || Vn) {
        sl(n, this.options, r, a);
        var s = Ot(r, !0);
        Ol && (!En || i !== ol || o !== rl) && (En && po(), En = setInterval(function() {
          var u = Ot(document.elementFromPoint(i, o), !0);
          u !== s && (s = u, fa()), sl(n, l.options, u, a);
        }, 10), ol = i, rl = o);
      } else {
        if (!this.options.bubbleScroll || Ot(r, !0) === ft()) {
          fa();
          return;
        }
        sl(n, this.options, Ot(r, !1), !1);
      }
    }
  }, Et(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function fa() {
  Ae.forEach(function(e) {
    clearInterval(e.pid);
  }), Ae = [];
}
function po() {
  clearInterval(En);
}
var sl = os(function(e, t, n, a) {
  if (t.scroll) {
    var l = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, r = t.scrollSpeed, s = ft(), u = !1, c;
    Dl !== n && (Dl = n, fa(), In = t.scroll, c = t.scrollFn, In === !0 && (In = Ot(n, !0)));
    var d = 0, m = In;
    do {
      var v = m, g = Ve(v), f = g.top, h = g.bottom, b = g.left, y = g.right, E = g.width, w = g.height, I = void 0, T = void 0, _ = v.scrollWidth, P = v.scrollHeight, R = q(v), Y = v.scrollLeft, j = v.scrollTop;
      v === s ? (I = E < _ && (R.overflowX === "auto" || R.overflowX === "scroll" || R.overflowX === "visible"), T = w < P && (R.overflowY === "auto" || R.overflowY === "scroll" || R.overflowY === "visible")) : (I = E < _ && (R.overflowX === "auto" || R.overflowX === "scroll"), T = w < P && (R.overflowY === "auto" || R.overflowY === "scroll"));
      var O = I && (Math.abs(y - l) <= o && Y + E < _) - (Math.abs(b - l) <= o && !!Y), B = T && (Math.abs(h - i) <= o && j + w < P) - (Math.abs(f - i) <= o && !!j);
      if (!Ae[d])
        for (var F = 0; F <= d; F++)
          Ae[F] || (Ae[F] = {});
      (Ae[d].vx != O || Ae[d].vy != B || Ae[d].el !== v) && (Ae[d].el = v, Ae[d].vx = O, Ae[d].vy = B, clearInterval(Ae[d].pid), (O != 0 || B != 0) && (u = !0, Ae[d].pid = setInterval((function() {
        a && this.layer === 0 && Q.active._onTouchMove(_a);
        var N = Ae[this.layer].vy ? Ae[this.layer].vy * r : 0, H = Ae[this.layer].vx ? Ae[this.layer].vx * r : 0;
        typeof c == "function" && c.call(Q.dragged.parentNode[Ge], H, N, e, _a, Ae[this.layer].el) !== "continue" || rs(Ae[this.layer].el, H, N);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Ot(m, !1)));
    Ol = u;
  }
}, 30), gs = function(t) {
  var n = t.originalEvent, a = t.putSortable, l = t.dragEl, i = t.activeSortable, o = t.dispatchSortableEvent, r = t.hideGhostForTarget, s = t.unhideGhostForTarget;
  if (n) {
    var u = a || i;
    r();
    var c = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, d = document.elementFromPoint(c.clientX, c.clientY);
    s(), u && !u.el.contains(d) && (o("spill"), this.onSpill({
      dragEl: l,
      putSortable: a
    }));
  }
};
function ci() {
}
ci.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, a = t.putSortable;
    this.sortable.captureAnimationState(), a && a.captureAnimationState();
    var l = mn(this.sortable.el, this.startIndex, this.options);
    l ? this.sortable.el.insertBefore(n, l) : this.sortable.el.appendChild(n), this.sortable.animateAll(), a && a.animateAll();
  },
  drop: gs
};
Et(ci, {
  pluginName: "revertOnSpill"
});
function di() {
}
di.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, a = t.putSortable, l = a || this.sortable;
    l.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), l.animateAll();
  },
  drop: gs
};
Et(di, {
  pluginName: "removeOnSpill"
});
Q.mount(new jf());
Q.mount(di, ci);
const Hf = { ref: "items" }, Wf = /* @__PURE__ */ Aa({
  __name: "IndexManagePanel",
  props: {
    list: {},
    titleReadonly: { type: Boolean },
    idProp: {},
    titleProp: {}
  },
  setup(e) {
    const t = e, n = As("items");
    return ee(n, (a) => {
      a && Q.create(
        a,
        {
          animation: 200,
          handle: ".handle",
          onEnd: (l) => {
            if (l.oldIndex !== void 0 && l.newIndex !== void 0) {
              const i = t.list.splice(l.oldIndex, 1)[0];
              t.list.splice(l.newIndex, 0, i);
            }
          }
        }
      );
    }), (a, l) => {
      const i = cl("v-icon-btn"), o = cl("VTextField");
      return _n(), ia("div", Hf, [
        (_n(!0), ia(Se, null, Vs(t.list, (r) => (_n(), ia("div", {
          class: "d-flex flex-row align-center pt-2",
          key: r[t.idProp ?? "id"]
        }, [
          p(i, {
            class: "handle",
            icon: "md:drag_handle",
            variant: "plain"
          }),
          p(o, {
            class: "pr-6",
            modelValue: r[t.titleProp ?? "name"],
            "onUpdate:modelValue": (s) => r[t.titleProp ?? "name"] = s,
            "hide-details": "",
            readonly: t.titleReadonly
          }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly"])
        ]))), 128))
      ], 512);
    };
  }
}), Gf = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, l] of t)
    n[a] = l;
  return n;
}, Kf = /* @__PURE__ */ Gf(Wf, [["__scopeId", "data-v-3935a862"]]), Uf = /* @__PURE__ */ Aa({
  __name: "IndexManageDialog",
  props: {
    list: {},
    titleReadonly: { type: Boolean },
    idProp: {},
    titleProp: {}
  },
  setup(e) {
    const t = e, n = Z(!1);
    return (a, l) => (_n(), Ts(re(rf), {
      "max-width": "600",
      "scroll-strategy": "none",
      modelValue: n.value,
      "onUpdate:modelValue": l[2] || (l[2] = (i) => n.value = i),
      scrollable: ""
    }, {
      activator: wn(() => [
        p(re(rn), {
          icon: "md:edit",
          variant: "plain",
          onClick: l[0] || (l[0] = (i) => n.value = !0),
          title: "Manage Configs"
        })
      ]),
      default: wn(() => [
        p(re(gf), null, {
          default: wn(() => [
            p(re(ts), { class: "flex-grow-1" }, {
              default: wn(() => [
                p(Kf, Ds(Os(t)), null, 16)
              ]),
              _: 1
            }),
            p(re(es), null, {
              default: wn(() => [
                p(re(rn), {
                  class: "text-none w-100",
                  text: "Done",
                  onClick: l[1] || (l[1] = (i) => n.value = !1)
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), Yf = { class: "d-flex flex-column ga-4" }, Xf = { class: "w-100 d-flex flex-row flex-wrap" }, Zf = /* @__PURE__ */ Aa({
  __name: "APIConfigPanel",
  setup(e) {
    const t = hl.injectOrCreate(), n = t.config, a = t.idList, l = t.selectedIndex;
    function i(o) {
      o && typeof o == "object" && "id" in o && t.selectConfig(o.id);
    }
    return (o, r) => {
      const s = cl("v-spacer");
      return _n(), ia("div", Yf, [
        C("div", Xf, [
          p(re(rn), {
            icon: "md:backup",
            variant: "plain",
            onClick: r[0] || (r[0] = (u) => re(t).saveBackup()),
            title: "Upload to drive"
          }),
          p(re(rn), {
            icon: "md:cloud_download",
            variant: "plain",
            onClick: r[1] || (r[1] = (u) => re(t).loadBackup()),
            title: "Download from drive"
          }),
          p(s),
          p(Uf, {
            list: re(a),
            idProp: "id",
            titleProp: "name"
          }, null, 8, ["list"]),
          p(re(rn), {
            icon: "md:note_add",
            variant: "plain",
            onClick: r[2] || (r[2] = (u) => re(t).addConfig()),
            title: "Add config"
          }),
          p(re(rn), {
            icon: "md:delete",
            variant: "plain",
            onClick: r[3] || (r[3] = (u) => re(t).deleteConfig()),
            title: "Delete config"
          })
        ]),
        p(re(yf), {
          variant: "outlined",
          "model-value": re(l),
          items: re(a),
          "item-title": "name",
          "item-value": "id",
          "onUpdate:modelValue": i,
          "hide-details": ""
        }, null, 8, ["model-value", "items"]),
        p(re(Ut), {
          variant: "outlined",
          label: "BaseURL",
          modelValue: re(n).baseURL,
          "onUpdate:modelValue": r[4] || (r[4] = (u) => re(n).baseURL = u),
          class: "flex-grow-0",
          "hide-details": ""
        }, null, 8, ["modelValue"]),
        p(re(Ut), {
          variant: "outlined",
          label: "ApiKey",
          type: "password",
          modelValue: re(n).apiKey,
          "onUpdate:modelValue": r[5] || (r[5] = (u) => re(n).apiKey = u),
          class: "flex-grow-0",
          "hide-details": ""
        }, null, 8, ["modelValue"]),
        p(re(Ut), {
          variant: "outlined",
          label: "Model",
          modelValue: re(n).model,
          "onUpdate:modelValue": r[6] || (r[6] = (u) => re(n).model = u),
          class: "flex-grow-0",
          "hide-details": ""
        }, null, 8, ["modelValue"])
      ]);
    };
  }
});
export {
  Zf as APIConfigDialog,
  Zf as APIConfigPanel,
  ko as APIConfigStore,
  hl as APIConfigViewModel,
  Us as DBDataFlow,
  Uf as IndexManageDialog,
  Kf as IndexManagePanel,
  Ks as SharedFlow,
  Xs as SharedStore,
  Pn as apiConfig,
  Eo as authorizeDrive,
  Ys as cachedDB,
  Zs as createDriveTextFile,
  Jf as deleteDriveFile,
  Js as getDriveFile,
  Po as getDriveFileID,
  tu as getSimpleDriveFile,
  Qs as listDriveFiles,
  Io as loadGoogleAuth,
  _o as logoutToken,
  nu as setSimpleDriveFile,
  eu as updateDriveTextFile,
  za as useSharedFlow
};
