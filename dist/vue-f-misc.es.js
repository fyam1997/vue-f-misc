var ws = Object.defineProperty;
var Ss = (e, t, n) => t in e ? ws(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var it = (e, t, n) => Ss(e, typeof t != "symbol" ? t + "" : t, n);
import { ref as J, watch as ee, toRaw as Oe, computed as x, inject as Ee, provide as tt, reactive as vn, watchEffect as mt, toRef as D, capitalize as Co, Fragment as Se, shallowRef as U, camelize as Bl, isVNode as Cs, Comment as xs, unref as le, warn as Aa, getCurrentInstance as ks, defineComponent as jn, h as Va, onBeforeUnmount as bt, readonly as Fl, onScopeDispose as He, effectScope as Ll, TransitionGroup as Ml, Transition as qt, createVNode as p, mergeProps as K, toRefs as Is, createElementVNode as C, normalizeStyle as ve, normalizeClass as X, toValue as gt, isRef as ul, onBeforeMount as Ta, nextTick as Be, withDirectives as et, vShow as yn, onMounted as Hn, useId as Jt, onUpdated as _s, Text as Es, resolveDynamicComponent as Ps, toDisplayString as mn, Teleport as As, onDeactivated as Vs, cloneVNode as Ts, createTextVNode as xo, useTemplateRef as Ds, resolveComponent as cl, createElementBlock as oa, openBlock as dn, renderList as Os, createBlock as ko, withCtx as ct, normalizeProps as Bs, guardReactiveProps as Fs } from "vue";
const dl = (e, t) => t.some((n) => e instanceof n);
let bi, pi;
function Ls() {
  return bi || (bi = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Ms() {
  return pi || (pi = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const fl = /* @__PURE__ */ new WeakMap(), Na = /* @__PURE__ */ new WeakMap(), Da = /* @__PURE__ */ new WeakMap();
function Rs(e) {
  const t = new Promise((n, a) => {
    const l = () => {
      e.removeEventListener("success", i), e.removeEventListener("error", o);
    }, i = () => {
      n(Kt(e.result)), l();
    }, o = () => {
      a(e.error), l();
    };
    e.addEventListener("success", i), e.addEventListener("error", o);
  });
  return Da.set(t, e), t;
}
function Ns(e) {
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
    return Kt(e[t]);
  },
  set(e, t, n) {
    return e[t] = n, !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
  }
};
function Io(e) {
  vl = e(vl);
}
function $s(e) {
  return Ms().includes(e) ? function(...t) {
    return e.apply(ml(this), t), Kt(this.request);
  } : function(...t) {
    return Kt(e.apply(ml(this), t));
  };
}
function zs(e) {
  return typeof e == "function" ? $s(e) : (e instanceof IDBTransaction && Ns(e), dl(e, Ls()) ? new Proxy(e, vl) : e);
}
function Kt(e) {
  if (e instanceof IDBRequest)
    return Rs(e);
  if (Na.has(e))
    return Na.get(e);
  const t = zs(e);
  return t !== e && (Na.set(e, t), Da.set(t, e)), t;
}
const ml = (e) => Da.get(e);
function js(e, t, { blocked: n, upgrade: a, blocking: l, terminated: i } = {}) {
  const o = indexedDB.open(e, t), r = Kt(o);
  return a && o.addEventListener("upgradeneeded", (s) => {
    a(Kt(o.result), s.oldVersion, s.newVersion, Kt(o.transaction), s);
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
const Hs = ["get", "getKey", "getAll", "getAllKeys", "count"], Ws = ["put", "add", "delete", "clear"], $a = /* @__PURE__ */ new Map();
function wi(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if ($a.get(t))
    return $a.get(t);
  const n = t.replace(/FromIndex$/, ""), a = t !== n, l = Ws.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (a ? IDBIndex : IDBObjectStore).prototype) || !(l || Hs.includes(n))
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
Io((e) => ({
  ...e,
  get: (t, n, a) => wi(t, n) || e.get(t, n, a),
  has: (t, n) => !!wi(t, n) || e.has(t, n)
}));
const Gs = ["continue", "continuePrimaryKey", "advance"], Si = {}, gl = /* @__PURE__ */ new WeakMap(), _o = /* @__PURE__ */ new WeakMap(), Ks = {
  get(e, t) {
    if (!Gs.includes(t))
      return e[t];
    let n = Si[t];
    return n || (n = Si[t] = function(...a) {
      gl.set(this, _o.get(this)[t](...a));
    }), n;
  }
};
async function* Us(...e) {
  let t = this;
  if (t instanceof IDBCursor || (t = await t.openCursor(...e)), !t)
    return;
  t = t;
  const n = new Proxy(t, Ks);
  for (_o.set(n, t), Da.set(n, ml(t)); t; )
    yield n, t = await (gl.get(n) || t.continue()), gl.delete(n);
}
function Ci(e, t) {
  return t === Symbol.asyncIterator && dl(e, [IDBIndex, IDBObjectStore, IDBCursor]) || t === "iterate" && dl(e, [IDBIndex, IDBObjectStore]);
}
Io((e) => ({
  ...e,
  get(t, n, a) {
    return Ci(t, n) ? Us : e.get(t, n, a);
  },
  has(t, n) {
    return Ci(t, n) || e.has(t, n);
  }
}));
class Ys {
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
class Xs extends Ys {
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
function qs(e) {
  let t;
  return new Promise(async (n) => {
    t || (t = await e()), n(t);
  });
}
var Qs = /* @__PURE__ */ ((e) => (e.APIConfig = "APIConfig", e))(Qs || {});
const Js = qs(() => js("shared", 1, {
  upgrade(e) {
    e.createObjectStore(
      "APIConfig"
      /* APIConfig */
    );
  }
}));
function Pn(e) {
  return new Xs(Js, "APIConfig", e);
}
class Eo {
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
it(Eo, "KEY", Symbol("APIConfigStore"));
async function Po() {
  return typeof google < "u" ? Promise.resolve() : new Promise((e, t) => {
    const n = document.createElement("script");
    n.addEventListener("load", () => {
      e();
    }), n.addEventListener("error", (a) => {
      t(a);
    }), n.src = "https://accounts.google.com/gsi/client?hl=fr", n.async = !0, n.defer = !0, document.head.appendChild(n);
  });
}
async function Ao(e, t) {
  return new Promise((n, a) => {
    google.accounts.oauth2.initTokenClient({
      client_id: t,
      callback: (i) => n(i.access_token),
      error_callback: a,
      scope: e
    }).requestAccessToken();
  });
}
async function Vo(e) {
  return new Promise((t) => {
    google.accounts.oauth2.revoke(e, () => {
      t();
    });
  });
}
async function Zs(e, t = "") {
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
async function To(e, t) {
  const n = await Zs(e, t);
  if (n.length > 0)
    return n[0].id;
}
async function eu(e, t) {
  const n = await fetch(`https://www.googleapis.com/drive/v3/files/${e}?alt=media`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${t}`
    }
  });
  return n.ok ? await n.text() : Promise.reject(n);
}
async function tu({ name: e, content: t, token: n }) {
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
async function nu({ id: e, name: t, content: n, token: a }) {
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
async function Zf({ id: e, token: t }) {
  const n = await fetch(`https://content.googleapis.com/drive/v3/files/${e}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${t}`
    }
  });
  if (!n.ok)
    return Promise.reject(n);
}
async function au(e, t) {
  await Po();
  const n = await Ao("https://www.googleapis.com/auth/drive.appdata", e);
  try {
    const a = await To(n, `name='${t}'`);
    return a === void 0 ? void 0 : await eu(a, n);
  } catch (a) {
    console.error(a);
    return;
  } finally {
    await Vo(n);
  }
}
async function lu(e, t, n) {
  await Po();
  const a = await Ao("https://www.googleapis.com/auth/drive.appdata", e);
  try {
    const l = await To(a, `name='${t}'`);
    l ? await nu({
      id: l,
      name: t,
      content: n,
      token: a
    }) : await tu({
      name: t,
      content: n,
      token: a
    });
  } catch (l) {
    console.error(l);
  } finally {
    await Vo(a);
  }
}
function za(e, t, n) {
  const a = J();
  return a.value = e.lastValue ?? t, e.collect((l) => {
    l === void 0 ? a.value = t : a.value = l;
  }), ee(a, async (l) => {
    const i = Oe(l);
    await e.emit(i);
  }, n), a;
}
const cn = class cn {
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
    await lu(this.store.googleClientID, "APIConfigs.json", JSON.stringify(a));
  }
  async loadBackup() {
    if (!confirm("Will overwrite the local configuration. New Added config will be kept."))
      return;
    const t = await au(this.store.googleClientID, "APIConfigs.json"), n = JSON.parse(t), a = this.idList.value;
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
      const n = Ee(Eo.KEY);
      if (!n)
        throw new Error("please provide APIConfigStore");
      const a = new cn(n);
      return tt(cn.KEY, a), a;
    };
    return Ee(cn.KEY, t, !0);
  }
};
it(cn, "KEY", Symbol("APIConfigViewModel"));
let hl = cn;
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
function xi(e, t, n) {
  iu(e, t), t.set(e, n);
}
function iu(e, t) {
  if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function ki(e, t, n) {
  return e.set(Do(e, t), n), n;
}
function xt(e, t) {
  return e.get(Do(e, t));
}
function Do(e, t, n) {
  if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
  throw new TypeError("Private element is not present on this object");
}
function Oo(e, t, n) {
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
function ou(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Oo(e, t.split("."), n));
}
function rt(e, t, n) {
  if (t === !0) return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean") return n;
  if (e !== Object(e)) {
    if (typeof t != "function") return n;
    const l = t(e, n);
    return typeof l > "u" ? n : l;
  }
  if (typeof t == "string") return ou(e, t, n);
  if (Array.isArray(t)) return Oo(e, t, n);
  if (typeof t != "function") return n;
  const a = t(e, n);
  return typeof a > "u" ? n : a;
}
function ie(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (e == null || e === "")
    return;
  const n = Number(e);
  return isNaN(n) ? String(e) : isFinite(n) ? `${n}${t}` : void 0;
}
function yl(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Ii(e) {
  let t;
  return e !== null && typeof e == "object" && ((t = Object.getPrototypeOf(e)) === Object.prototype || t === null);
}
function Bo(e) {
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
function _i(e, t, n) {
  const a = /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  for (const i in e)
    t.some((o) => o instanceof RegExp ? o.test(i) : o === i) ? a[i] = e[i] : l[i] = e[i];
  return [a, l];
}
function Zt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((a) => delete n[a]), n;
}
const Fo = /^on[^a-z]/, Lo = (e) => Fo.test(e), ru = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"], su = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Enter", "Escape", "Tab", " "];
function uu(e) {
  return e.isComposing && su.includes(e.key);
}
function Mo(e) {
  const [t, n] = _i(e, [Fo]), a = Zt(t, ru), [l, i] = _i(n, ["class", "style", "id", /^data-/]);
  return Object.assign(l, t), Object.assign(i, a), [l, i];
}
function Ke(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function cu(e, t) {
  let n = 0;
  const a = function() {
    for (var l = arguments.length, i = new Array(l), o = 0; o < l; o++)
      i[o] = arguments[o];
    clearTimeout(n), n = setTimeout(() => e(...i), le(t));
  };
  return a.clear = () => {
    clearTimeout(n);
  }, a.immediate = e, a;
}
function dt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function Ei(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function du(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let a = 0;
  for (; a < e.length; )
    n.push(e.substr(a, t)), a += t;
  return n;
}
function kt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const a = {};
  for (const l in e)
    a[l] = e[l];
  for (const l in t) {
    const i = e[l], o = t[l];
    if (Ii(i) && Ii(o)) {
      a[l] = kt(i, o, n);
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
function Ro(e) {
  return e.map((t) => t.type === Se ? Ro(t.children) : t).flat();
}
function Ut() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Ut.cache.has(e)) return Ut.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Ut.cache.set(e, t), t;
}
Ut.cache = /* @__PURE__ */ new Map();
function xn(e, t) {
  if (!t || typeof t != "object") return [];
  if (Array.isArray(t))
    return t.map((n) => xn(e, n)).flat(1);
  if (t.suspense)
    return xn(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => xn(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return xn(e, t.component.subTree).flat(1);
  }
  return [];
}
var nn = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap();
class fu {
  constructor(t) {
    xi(this, nn, []), xi(this, jt, 0), this.size = t;
  }
  get isFull() {
    return xt(nn, this).length === this.size;
  }
  push(t) {
    xt(nn, this)[xt(jt, this)] = t, ki(jt, this, (xt(jt, this) + 1) % this.size);
  }
  values() {
    return xt(nn, this).slice(xt(jt, this)).concat(xt(nn, this).slice(0, xt(jt, this)));
  }
  clear() {
    xt(nn, this).length = 0, ki(jt, this, 0);
  }
}
function Nl(e) {
  const t = vn({});
  mt(() => {
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
function ma(e, t) {
  return e.includes(t);
}
function No(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Ue = () => [Function, Array];
function Pi(e, t) {
  return t = "on" + Co(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function $o(e) {
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
function zo(e, t, n) {
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
    const r = zo(n, t);
    r ? r.focus() : An(e, t === "next" ? "first" : "last");
  }
}
function vu() {
}
function ga(e, t) {
  if (!(Pe && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`))) return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function $l(e) {
  return e.some((t) => Cs(t) ? t.type === xs ? !1 : t.type !== Se || $l(t.children) : !0) ? e : null;
}
function mu(e, t) {
  if (!Pe || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function gu(e, t) {
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
    get: () => Bo(e.value)
  }), t;
}
function ha(e) {
  const t = e.key.length === 1, n = !e.ctrlKey && !e.metaKey && !e.altKey;
  return t && n;
}
function wl(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "bigint";
}
function hu(e) {
  const t = {};
  for (const n in e)
    t[Bl(n)] = e[n];
  return t;
}
function yu(e) {
  const t = ["checked", "disabled"];
  return Object.fromEntries(Object.entries(e).filter((n) => {
    let [a, l] = n;
    return t.includes(a) ? !!l : l !== void 0;
  }));
}
const jo = ["top", "bottom"], bu = ["start", "end", "left", "right"];
function Sl(e, t) {
  let [n, a] = e.split(" ");
  return a || (a = ma(jo, n) ? "start" : ma(bu, n) ? "top" : "center"), {
    side: Ai(n, t),
    align: Ai(a, t)
  };
}
function Ai(e, t) {
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
function Vi(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function Ti(e) {
  return ma(jo, e.side) ? "y" : "x";
}
class ft {
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
function Di(e, t) {
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
function Ho(e) {
  return Array.isArray(e) ? new ft({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function pu(e) {
  if (e === document.documentElement)
    return visualViewport ? new ft({
      x: visualViewport.scale > 1 ? 0 : visualViewport.offsetLeft,
      y: visualViewport.scale > 1 ? 0 : visualViewport.offsetTop,
      width: visualViewport.width * visualViewport.scale,
      height: visualViewport.height * visualViewport.scale
    }) : new ft({
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  {
    const t = e.getBoundingClientRect();
    return new ft({
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
      return new ft(t);
    const u = n.transformOrigin, c = t.x - r - (1 - i) * parseFloat(u), d = t.y - s - (1 - o) * parseFloat(u.slice(u.indexOf(" ") + 1)), m = i ? t.width / i : e.offsetWidth + 1, v = o ? t.height / o : e.offsetHeight + 1;
    return new ft({
      x: c,
      y: d,
      width: m,
      height: v
    });
  } else
    return new ft(t);
}
function sn(e, t, n) {
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
const ra = /* @__PURE__ */ new WeakMap();
function wu(e, t) {
  Object.keys(t).forEach((n) => {
    if (Lo(n)) {
      const a = No(n), l = ra.get(e);
      if (t[n] == null)
        l == null || l.forEach((i) => {
          const [o, r] = i;
          o === a && (e.removeEventListener(a, r), l.delete(i));
        });
      else if (!l || ![...l].some((i) => i[0] === a && i[1] === t[n])) {
        e.addEventListener(a, t[n]);
        const i = l || /* @__PURE__ */ new Set();
        i.add([a, t[n]]), ra.has(e) || ra.set(e, i);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function Su(e, t) {
  Object.keys(t).forEach((n) => {
    if (Lo(n)) {
      const a = No(n), l = ra.get(e);
      l == null || l.forEach((i) => {
        const [o, r] = i;
        o === a && (e.removeEventListener(a, r), l.delete(i));
      });
    } else
      e.removeAttribute(n);
  });
}
const an = 2.4, Oi = 0.2126729, Bi = 0.7151522, Fi = 0.072175, Cu = 0.55, xu = 0.58, ku = 0.57, Iu = 0.62, Zn = 0.03, Li = 1.45, _u = 5e-4, Eu = 1.25, Pu = 1.25, Mi = 0.078, Ri = 12.82051282051282, ea = 0.06, Ni = 1e-3;
function $i(e, t) {
  const n = (e.r / 255) ** an, a = (e.g / 255) ** an, l = (e.b / 255) ** an, i = (t.r / 255) ** an, o = (t.g / 255) ** an, r = (t.b / 255) ** an;
  let s = n * Oi + a * Bi + l * Fi, u = i * Oi + o * Bi + r * Fi;
  if (s <= Zn && (s += (Zn - s) ** Li), u <= Zn && (u += (Zn - u) ** Li), Math.abs(u - s) < _u) return 0;
  let c;
  if (u > s) {
    const d = (u ** Cu - s ** xu) * Eu;
    c = d < Ni ? 0 : d < Mi ? d - d * Ri * ea : d - ea;
  } else {
    const d = (u ** Iu - s ** ku) * Pu;
    c = d > -Ni ? 0 : d > -Mi ? d - d * Ri * ea : d + ea;
  }
  return c * 100;
}
function Yt(e) {
  Aa(`Vuetify: ${e}`);
}
function Wo(e) {
  Aa(`Vuetify error: ${e}`);
}
function Au(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, Aa(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
function Cl(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Vu(e) {
  return Cl(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const zi = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Tu = {
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
  hsl: (e, t, n, a) => ji({
    h: e,
    s: t,
    l: n,
    a
  }),
  hsla: (e, t, n, a) => ji({
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
function kn(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && Yt(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && zi.test(e)) {
    const {
      groups: t
    } = e.match(zi), {
      fn: n,
      values: a
    } = t, l = a.split(/,\s*|\s*\/\s*|\s+/).map((i, o) => i.endsWith("%") || // unitless slv are %
    o > 0 && o < 3 && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(i) / 100 : parseFloat(i));
    return Tu[n](...l);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((a) => a + a).join("") : [6, 8].includes(t.length) || Yt(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && Yt(`'${e}' is not a valid hex(a) color`), Du(t);
  } else if (typeof e == "object") {
    if (ja(e, ["r", "g", "b"]))
      return e;
    if (ja(e, ["h", "s", "l"]))
      return Ln(Go(e));
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
function ji(e) {
  return Ln(Go(e));
}
function Go(e) {
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
function Du(e) {
  e = Ou(e);
  let [t, n, a, l] = du(e, 2).map((i) => parseInt(i, 16));
  return l = l === void 0 ? l : l / 255, {
    r: t,
    g: n,
    b: a,
    a: l
  };
}
function Ou(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = Ei(Ei(e, 6), 8, "F")), e;
}
function Bu(e) {
  const t = Math.abs($i(kn(0), kn(e)));
  return Math.abs($i(kn(16777215), kn(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function Le(e, t) {
  const n = ks();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function pt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = Le(e).type;
  return Ut((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
function Fu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Le("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const ya = Symbol.for("vuetify:defaults");
function jl() {
  const e = Ee(ya);
  if (!e) throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function bn(e, t) {
  const n = jl(), a = J(e), l = x(() => {
    if (le(t == null ? void 0 : t.disabled)) return n.value;
    const o = le(t == null ? void 0 : t.scoped), r = le(t == null ? void 0 : t.reset), s = le(t == null ? void 0 : t.root);
    if (a.value == null && !(o || r || s)) return n.value;
    let u = kt(a.value, {
      prev: n.value
    });
    if (o) return u;
    if (r || s) {
      const c = Number(r || 1 / 0);
      for (let d = 0; d <= c && !(!u || !("prev" in u)); d++)
        u = u.prev;
      return u && typeof s == "string" && s in u && (u = kt(kt(u, {
        prev: u
      }), u[s])), u;
    }
    return u.prev ? kt(u.prev, u) : u;
  });
  return tt(ya, l), l;
}
function Lu(e, t) {
  return e.props && (typeof e.props[t] < "u" || typeof e.props[Ut(t)] < "u");
}
function Mu() {
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
      if (Lu(a.vnode, u)) return c;
      const d = (g = l.value) == null ? void 0 : g[u];
      if (d !== void 0) return d;
      const m = (h = (f = n.value) == null ? void 0 : f.global) == null ? void 0 : h[u];
      return m !== void 0 ? m : c;
    }
  }), o = U();
  mt(() => {
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
    const s = Fu(ya, a);
    tt(ya, x(() => o.value ? kt((s == null ? void 0 : s.value) ?? {}, o.value) : s == null ? void 0 : s.value));
  }
  return {
    props: i,
    provideSubDefaults: r
  };
}
function Wn(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return Yt("The component is missing an explicit name, unable to generate default prop value"), e;
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
      } = Mu(a, a._as ?? e.name, i), s = e._setup(o, l);
      return r(), s;
    };
  }
  return e;
}
function Z() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? Wn : jn)(t);
}
function Ko(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return Z()({
    name: n ?? Co(Bl(e.replace(/__/g, "-"))),
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
function Uo(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; ) e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const ba = "cubic-bezier(0.4, 0, 0.2, 1)", Ru = "cubic-bezier(0.0, 0, 0.2, 1)", Nu = "cubic-bezier(0.4, 0, 1, 1)";
function Yo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? $u(e) : Hl(e)) return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function pa(e, t) {
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
function $u(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function zu(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function oe(e) {
  const t = Le("useRender");
  t.render = e;
}
function Mn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = pl(), a = J();
  if (Pe) {
    const l = new ResizeObserver((i) => {
      i.length && (t === "content" ? a.value = i[0].contentRect : a.value = i[0].target.getBoundingClientRect());
    });
    bt(() => {
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
function Qt(e, t) {
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
  const i = Le("useProxiedModel"), o = J(e[t] !== void 0 ? e[t] : n), r = Ut(t), u = r !== t ? x(() => {
    var d, m, v, g;
    return e[t], !!(((d = i.vnode.props) != null && d.hasOwnProperty(t) || (m = i.vnode.props) != null && m.hasOwnProperty(r)) && ((v = i.vnode.props) != null && v.hasOwnProperty(`onUpdate:${t}`) || (g = i.vnode.props) != null && g.hasOwnProperty(`onUpdate:${r}`)));
  }) : x(() => {
    var d, m;
    return e[t], !!((d = i.vnode.props) != null && d.hasOwnProperty(t) && ((m = i.vnode.props) != null && m.hasOwnProperty(`onUpdate:${t}`)));
  });
  Qt(() => !u.value, () => {
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
const Xo = Symbol.for("vuetify:locale");
function Ba() {
  const e = Ee(Xo);
  if (!e) throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Rt() {
  const e = Ee(Xo);
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
  const t = Ee(xl, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  const n = D(() => e.theme ?? t.name.value), a = D(() => t.themes.value[n.value]), l = D(() => t.isDisabled ? void 0 : `${t.prefix}theme--${n.value}`), i = {
    ...t,
    name: n,
    current: a,
    themeClasses: l
  };
  return tt(xl, i), i;
}
function ju() {
  Le("useTheme");
  const e = Ee(xl, null);
  if (!e) throw new Error("Could not find Vuetify theme injection");
  return e;
}
const Ne = M({
  tag: {
    type: [String, Object, Function],
    default: "div"
  }
}, "tag"), Hu = M({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function nt(e, t, n) {
  return Z()({
    name: e,
    props: Hu({
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
        const r = a.group ? Ml : qt;
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
function qo(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return Z()({
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
      const o = a.group ? Ml : qt;
      return () => Va(o, {
        name: a.disabled ? "" : e,
        css: !a.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...a.disabled ? {} : t
      }, i.default);
    }
  });
}
function Qo() {
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
const Wu = M({
  target: [Object, Array]
}, "v-dialog-transition"), Ga = /* @__PURE__ */ new WeakMap(), Wl = Z()({
  name: "VDialogTransition",
  props: Wu(),
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
        const o = Wi(e.target, l), {
          x: r,
          y: s,
          sx: u,
          sy: c,
          speed: d
        } = o;
        Ga.set(l, o);
        const m = sn(l, [{
          transform: `translate(${r}px, ${s}px) scale(${u}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * d,
          easing: Ru
        });
        (v = Hi(l)) == null || v.forEach((g) => {
          sn(g, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * d,
            easing: ba
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
        !Ga.has(l) || Array.isArray(e.target) || e.target.offsetParent || e.target.getClientRects().length ? o = Wi(e.target, l) : o = Ga.get(l);
        const {
          x: r,
          y: s,
          sx: u,
          sy: c,
          speed: d
        } = o;
        sn(l, [{}, {
          transform: `translate(${r}px, ${s}px) scale(${u}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * d,
          easing: Nu
        }).finished.then(() => i()), (v = Hi(l)) == null || v.forEach((g) => {
          sn(g, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * d,
            easing: ba
          });
        });
      },
      onAfterLeave(l) {
        l.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? p(qt, K({
      name: "dialog-transition"
    }, a, {
      css: !1
    }), n) : p(qt, {
      name: "dialog-transition"
    }, n);
  }
});
function Hi(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function Wi(e, t) {
  const n = Ho(e), a = zl(t), [l, i] = getComputedStyle(t).transformOrigin.split(" ").map((b) => parseFloat(b)), [o, r] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
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
const Gi = nt("fade-transition");
nt("scale-transition");
nt("scroll-x-transition");
nt("scroll-x-reverse-transition");
nt("scroll-y-transition");
nt("scroll-y-reverse-transition");
nt("slide-x-transition");
nt("slide-x-reverse-transition");
const Jo = nt("slide-y-transition");
nt("slide-y-reverse-transition");
const Gu = qo("expand-transition", Qo()), Zo = qo("expand-x-transition", Qo("", !0)), Ku = M({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Fe = Z(!1)({
  name: "VDefaultsProvider",
  props: Ku(),
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
    } = Is(e);
    return bn(a, {
      reset: i,
      root: o,
      scoped: r,
      disabled: l
    }), () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n);
    };
  }
}), Nt = M({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function $t(e) {
  return {
    dimensionStyles: x(() => {
      const n = {}, a = ie(e.height), l = ie(e.maxHeight), i = ie(e.maxWidth), o = ie(e.minHeight), r = ie(e.minWidth), s = ie(e.width);
      return a != null && (n.height = a), l != null && (n.maxHeight = l), i != null && (n.maxWidth = i), o != null && (n.minHeight = o), r != null && (n.minWidth = r), s != null && (n.width = s), n;
    })
  };
}
function Uu(e) {
  return {
    aspectStyles: x(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const er = M({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...de(),
  ...Nt()
}, "VResponsive"), Ki = Z()({
  name: "VResponsive",
  props: er(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: a
    } = Uu(e), {
      dimensionStyles: l
    } = $t(e);
    return oe(() => {
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
    const t = gt(e), n = [], a = {};
    if (t.background)
      if (Cl(t.background)) {
        if (a.backgroundColor = t.background, !t.text && Vu(t.background)) {
          const l = kn(t.background);
          if (l.a == null || l.a === 1) {
            const i = Bu(l);
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
function ht(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = Gl(() => ({
    text: gt(e)
  }));
  return {
    textColorClasses: t,
    textColorStyles: n
  };
}
function Lt(e) {
  const {
    colorClasses: t,
    colorStyles: n
  } = Gl(() => ({
    background: gt(e)
  }));
  return {
    backgroundColorClasses: t,
    backgroundColorStyles: n
  };
}
const wt = M({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function St(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
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
const pn = M({
  transition: {
    type: null,
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), Ot = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: a,
    disabled: l,
    group: i,
    ...o
  } = e, {
    component: r = i ? Ml : qt,
    ...s
  } = yl(a) ? a : {};
  let u;
  return yl(a) ? u = K(s, yu({
    disabled: l,
    group: i
  }), o) : u = K({
    name: l || !a ? "" : a
  }, o), Va(r, u, n);
};
function Yu(e, t) {
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
    l && (!n.quiet || u.init) && (!n.once || c || u.init) && l(c, r, s), c && n.once ? tr(e, t) : u.init = !0;
  }, i);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: o
  }, o.observe(e);
}
function tr(e, t) {
  var a;
  const n = (a = e._observe) == null ? void 0 : a[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const wa = {
  mounted: Yu,
  unmounted: tr
}, Xu = M({
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
  ...er(),
  ...de(),
  ...wt(),
  ...pn()
}, "VImg"), nr = Z()({
  name: "VImg",
  directives: {
    vIntersect: wa
  },
  props: Xu(),
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
    } = Lt(() => e.color), {
      roundedClasses: o
    } = St(e), r = Le("VImg"), s = U(""), u = J(), c = U(e.eager ? "loading" : "idle"), d = U(), m = U(), v = x(() => e.src && typeof e.src == "object" ? {
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
    let _ = -1;
    bt(() => {
      clearTimeout(_);
    });
    function w(O) {
      let B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const F = () => {
        if (clearTimeout(_), r.isUnmounted) return;
        const {
          naturalHeight: N,
          naturalWidth: H
        } = O;
        N || H ? (d.value = H, m.value = N) : !O.complete && c.value === "loading" && B != null ? _ = window.setTimeout(F, B) : (O.currentSrc.endsWith(".svg") || O.currentSrc.startsWith("data:image/svg+xml")) && (d.value = 1, m.value = 1);
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
      return p(Ot, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [et(B ? C("picture", {
          class: "v-img__picture"
        }, [B, O]) : O, [[yn, c.value === "loaded"]])]
      });
    }, E = () => p(Ot, {
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
    }), P = () => a.placeholder ? p(Ot, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(c.value === "loading" || c.value === "error" && !a.error) && C("div", {
        class: "v-img__placeholder"
      }, [a.placeholder()])]
    }) : null, R = () => a.error ? p(Ot, {
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
    return oe(() => {
      const O = Ki.filterProps(e);
      return et(p(Ki, K({
        class: ["v-img", {
          "v-img--absolute": e.absolute,
          "v-img--booting": !j.value
        }, l.value, o.value, e.class],
        style: [{
          width: ie(e.width === "auto" ? d.value : e.width)
        }, i.value, e.style]
      }, O, {
        aspectRatio: g.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => C(Se, null, [p(T, null, null), p(E, null, null), p(Y, null, null), p(P, null, null), p(R, null, null)]),
        default: a.default
      }), [[wa, {
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
}), en = M({
  border: [Boolean, Number, String]
}, "border");
function tn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
  return {
    borderClasses: x(() => {
      const a = e.border;
      return a === !0 || a === "" ? `${t}--border` : typeof a == "string" || a === 0 ? String(a).split(" ").map((l) => `border-${l}`) : [];
    })
  };
}
const wn = M({
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
function Sn(e) {
  return {
    elevationClasses: D(() => {
      const n = ul(e) ? e.value : e.elevation;
      return n == null ? [] : [`elevation-${n}`];
    })
  };
}
function qu() {
  const e = U(!1);
  return Hn(() => {
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
const Qu = [null, "default", "comfortable", "compact"], Ct = M({
  density: {
    type: String,
    default: "default",
    validator: (e) => Qu.includes(e)
  }
}, "density");
function Pt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
  return {
    densityClasses: D(() => `${t}--density-${e.density}`)
  };
}
const Ju = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function Gn(e, t) {
  return C(Se, null, [e && C("span", {
    key: "overlay",
    class: X(`${t}__overlay`)
  }, null), C("span", {
    key: "underlay",
    class: X(`${t}__underlay`)
  }, null)]);
}
const zt = M({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => Ju.includes(e)
  }
}, "variant");
function Kn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
  const n = D(() => {
    const {
      variant: i
    } = gt(e);
    return `${t}--variant-${i}`;
  }), {
    colorClasses: a,
    colorStyles: l
  } = Gl(() => {
    const {
      variant: i,
      color: o
    } = gt(e);
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
const ar = M({
  baseColor: String,
  divided: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...en(),
  ...de(),
  ...Ct(),
  ...wn(),
  ...wt(),
  ...Ne(),
  ...Re(),
  ...zt()
}, "VBtnGroup"), Ui = Z()({
  name: "VBtnGroup",
  props: ar(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ye(e), {
      densityClasses: l
    } = Pt(e), {
      borderClasses: i
    } = tn(e), {
      elevationClasses: o
    } = Sn(e), {
      roundedClasses: r
    } = St(e);
    bn({
      VBtn: {
        height: D(() => e.direction === "horizontal" ? "auto" : null),
        baseColor: D(() => e.baseColor),
        color: D(() => e.color),
        density: D(() => e.density),
        flat: !0,
        variant: D(() => e.variant)
      }
    }), oe(() => p(e.tag, {
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
}, "group"), lr = M({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function ir(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const a = Le("useGroupItem");
  if (!a)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const l = Jt();
  tt(Symbol.for(`${t.description}:id`), l);
  const i = Ee(t, null);
  if (!i) {
    if (!n) return i;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const o = D(() => e.value), r = x(() => !!(i.disabled.value || e.disabled));
  i.register({
    id: l,
    value: o,
    disabled: r
  }, a), bt(() => {
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
  const a = vn([]), l = De(e, "modelValue", [], (m) => m == null ? [] : or(a, Ke(m)), (m) => {
    const v = ec(a, m);
    return e.multiple ? v : v[0];
  }), i = Le("useGroup");
  function o(m, v) {
    const g = m, f = Symbol.for(`${t.description}:id`), b = xn(f, i == null ? void 0 : i.vnode).indexOf(v);
    le(g.value) == null && (g.value = b, g.useIndexAsValue = !0), b > -1 ? a.splice(b, 0, g) : a.push(g);
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
  Hn(() => {
    s();
  }), bt(() => {
    n = !0;
  }), _s(() => {
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
    if (e.multiple && Yt('This method is not supported when using "multiple" prop'), l.value.length) {
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
    getItemIndex: (m) => Zu(a, m)
  };
  return tt(t, d), d;
}
function Zu(e, t) {
  const n = or(e, [t]);
  return n.length ? e.findIndex((a) => a.id === n[0]) : -1;
}
function or(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.find((o) => Ze(a, o.value)), i = e[a];
    (l == null ? void 0 : l.value) != null ? n.push(l.id) : i != null && n.push(i.id);
  }), n;
}
function ec(e, t) {
  const n = [];
  return t.forEach((a) => {
    const l = e.findIndex((i) => i.id === a);
    if (~l) {
      const i = e[l];
      n.push(i.value != null ? i.value : l);
    }
  }), n;
}
const rr = Symbol.for("vuetify:v-btn-toggle"), tc = M({
  ...ar(),
  ...Kl()
}, "VBtnToggle");
Z()({
  name: "VBtnToggle",
  props: tc(),
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
    } = Ul(e, rr);
    return oe(() => {
      const s = Ui.filterProps(e);
      return p(Ui, K({
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
const ye = [String, Function, Object, Array], nc = Symbol.for("vuetify:icons"), Fa = M({
  icon: {
    type: ye
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: [String, Object, Function],
    required: !0
  }
}, "icon"), Yi = Z()({
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
}), ac = Wn({
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
Wn({
  name: "VLigatureIcon",
  props: Fa(),
  setup(e) {
    return () => p(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
Wn({
  name: "VClassIcon",
  props: Fa(),
  setup(e) {
    return () => p(e.tag, {
      class: X(e.icon)
    }, null);
  }
});
const lc = (e) => {
  const t = Ee(nc);
  if (!t) throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: x(() => {
      var s;
      const a = gt(e);
      if (!a) return {
        component: Yi
      };
      let l = a;
      if (typeof l == "string" && (l = l.trim(), l.startsWith("$") && (l = (s = t.aliases) == null ? void 0 : s[l.slice(1)])), l || Yt(`Could not find aliased icon "${a}"`), Array.isArray(l))
        return {
          component: ac,
          icon: l
        };
      if (typeof l != "string")
        return {
          component: Yi,
          icon: l
        };
      const i = Object.keys(t.sets).find((u) => typeof l == "string" && l.startsWith(`${u}:`)), o = i ? l.slice(i.length + 1) : l;
      return {
        component: t.sets[i ?? t.defaultSet].component,
        icon: o
      };
    })
  };
}, ic = ["x-small", "small", "default", "large", "x-large"], Un = M({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Yn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
  return Nl(() => {
    const n = e.size;
    let a, l;
    return ma(ic, n) ? a = `${t}--size-${n}` : n && (l = {
      width: ie(n),
      height: ie(n)
    }), {
      sizeClasses: a,
      sizeStyles: l
    };
  });
}
const oc = M({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: ye,
  opacity: [String, Number],
  ...de(),
  ...Un(),
  ...Ne({
    tag: "i"
  }),
  ...Re()
}, "VIcon"), Te = Z()({
  name: "VIcon",
  props: oc(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const l = U(), {
      themeClasses: i
    } = ju(), {
      iconData: o
    } = lc(() => l.value || e.icon), {
      sizeClasses: r
    } = Yn(e), {
      textColorClasses: s,
      textColorStyles: u
    } = ht(() => e.color);
    return oe(() => {
      var m, v;
      const c = (m = a.default) == null ? void 0 : m.call(a);
      c && (l.value = (v = Ro(c).filter((g) => g.type === Es && g.children && typeof g.children == "string")[0]) == null ? void 0 : v.children);
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
          fontSize: ie(e.size),
          height: ie(e.size),
          width: ie(e.size)
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
function sr(e, t) {
  const n = J(), a = U(!1);
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
const rc = M({
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
  ...Un(),
  ...Ne({
    tag: "div"
  }),
  ...Re()
}, "VProgressCircular"), sc = Z()({
  name: "VProgressCircular",
  props: rc(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = 20, l = 2 * Math.PI * a, i = J(), {
      themeClasses: o
    } = Ye(e), {
      sizeClasses: r,
      sizeStyles: s
    } = Yn(e), {
      textColorClasses: u,
      textColorStyles: c
    } = ht(() => e.color), {
      textColorClasses: d,
      textColorStyles: m
    } = ht(() => e.bgColor), {
      intersectionRef: v,
      isIntersecting: g
    } = sr(), {
      resizeRef: f,
      contentRect: h
    } = Mn(), b = D(() => dt(parseFloat(e.modelValue), 0, 100)), y = D(() => Number(e.width)), _ = D(() => s.value ? Number(e.size) : h.value ? h.value.width : Math.max(y.value, 32)), w = D(() => a / (1 - y.value / _.value) * 2), I = D(() => y.value / _.value * w.value), T = D(() => ie((100 - b.value) / 100 * l));
    return mt(() => {
      v.value = i.value, f.value = i.value;
    }), oe(() => p(e.tag, {
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
}), Xi = {
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
  } = Rt();
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
      return i !== "center" && (t ? s[Xi[i]] = `calc(100% - ${r(i)}px)` : s[i] = 0), o !== "center" ? t ? s[Xi[o]] = `calc(100% - ${r(o)}px)` : s[o] = 0 : (i === "center" ? s.top = s.left = "50%" : s[{
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
const uc = M({
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
  ...wt(),
  ...Ne(),
  ...Re()
}, "VProgressLinear"), cc = Z()({
  name: "VProgressLinear",
  props: uc(),
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
    } = Rt(), {
      themeClasses: o
    } = Ye(e), {
      locationStyles: r
    } = Xl(e), {
      textColorClasses: s,
      textColorStyles: u
    } = ht(() => e.color), {
      backgroundColorClasses: c,
      backgroundColorStyles: d
    } = Lt(() => e.bgColor || e.color), {
      backgroundColorClasses: m,
      backgroundColorStyles: v
    } = Lt(() => e.bufferColor || e.bgColor || e.color), {
      backgroundColorClasses: g,
      backgroundColorStyles: f
    } = Lt(() => e.color), {
      roundedClasses: h
    } = St(e), {
      intersectionRef: b,
      isIntersecting: y
    } = sr(), _ = x(() => parseFloat(e.max)), w = x(() => parseFloat(e.height)), I = x(() => dt(parseFloat(e.bufferValue) / _.value * 100, 0, 100)), T = x(() => dt(parseFloat(a.value) / _.value * 100, 0, 100)), E = x(() => l.value !== e.reverse), P = x(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), R = Pe && ((j = window.matchMedia) == null ? void 0 : j.call(window, "(forced-colors: active)").matches);
    function Y(O) {
      if (!b.value) return;
      const {
        left: B,
        right: F,
        width: N
      } = b.value.getBoundingClientRect(), H = E.value ? N - O.clientX + (F - N) : O.clientX - B;
      a.value = Math.round(H / N * _.value);
    }
    return oe(() => p(e.tag, {
      ref: b,
      class: X(["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && y.value,
        "v-progress-linear--reverse": E.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, h.value, o.value, i.value, e.class]),
      style: ve([{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? ie(w.value) : 0,
        "--v-progress-linear-height": ie(w.value),
        ...e.absolute ? r.value : {}
      }, e.style]),
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : Math.min(parseFloat(a.value), _.value),
      onClick: e.clickable && Y
    }, {
      default: () => [e.stream && C("div", {
        key: "stream",
        class: X(["v-progress-linear__stream", s.value]),
        style: {
          ...u.value,
          [E.value ? "left" : "right"]: ie(-w.value),
          borderTop: `${ie(w.value / 2)} dotted`,
          opacity: parseFloat(e.bufferOpacity),
          top: `calc(50% - ${ie(w.value / 4)})`,
          width: ie(100 - I.value, "%"),
          "--v-progress-linear-stream-to": ie(w.value * (E.value ? 1 : -1))
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
          width: ie(I.value, "%")
        }])
      }, null), p(qt, {
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
            width: ie(T.value, "%")
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
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
  return {
    loaderClasses: D(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function ur(e, t) {
  var a;
  let {
    slots: n
  } = t;
  return C("div", {
    class: X(`${e.name}__loader`)
  }, [((a = n.default) == null ? void 0 : a.call(n, {
    color: e.color,
    isActive: e.active
  })) || p(cc, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const dc = ["static", "relative", "fixed", "absolute", "sticky"], cr = M({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => dc.includes(e)
    )
  }
}, "position");
function dr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
  return {
    positionClasses: D(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function fc() {
  const e = Le("useRoute");
  return x(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function vc() {
  var e, t;
  return (t = (e = Le("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function La(e, t) {
  var c, d;
  const n = Ps("RouterLink"), a = D(() => !!(e.href || e.to)), l = x(() => (a == null ? void 0 : a.value) || Pi(t, "click") || Pi(e, "click"));
  if (typeof n == "string" || !("useLink" in n)) {
    const m = D(() => e.href);
    return {
      isLink: a,
      isClickable: l,
      href: m,
      linkProps: vn({
        href: m
      })
    };
  }
  const i = n.useLink({
    to: D(() => e.to || ""),
    replace: D(() => e.replace)
  }), o = x(() => e.to ? i : void 0), r = fc(), s = x(() => {
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
    linkProps: vn({
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
function mc(e, t) {
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
function gc(e, t) {
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
const kl = Symbol("rippleStop"), hc = 80;
function qi(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Il(e) {
  return e.constructor.name === "TouchEvent";
}
function fr(e) {
  return e.constructor.name === "KeyboardEvent";
}
const yc = function(e, t) {
  var d;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, a = 0, l = 0;
  if (!fr(e)) {
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
}, Sa = {
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
    } = yc(e, t, n), d = `${i * 2}px`;
    l.className = "v-ripple__animation", l.style.width = d, l.style.height = d, t.appendChild(a);
    const m = window.getComputedStyle(t);
    m && m.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), l.classList.add("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--visible"), qi(l, `translate(${r}, ${s}) scale3d(${o},${o},${o})`), l.dataset.activated = String(performance.now()), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        l.classList.remove("v-ripple__animation--enter"), l.classList.add("v-ripple__animation--in"), qi(l, `translate(${u}, ${c}) scale3d(1,1,1)`);
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
function vr(e) {
  return typeof e > "u" || !!e;
}
function Rn(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[kl])) {
    if (e[kl] = !0, Il(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch) return;
    if (t.center = n._ripple.centered || fr(e), n._ripple.class && (t.class = n._ripple.class), Il(e)) {
      if (n._ripple.showTimerCommit) return;
      n._ripple.showTimerCommit = () => {
        Sa.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var a;
        (a = n == null ? void 0 : n._ripple) != null && a.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, hc);
    } else
      Sa.show(e, n, t);
  }
}
function Qi(e) {
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
    }), Sa.hide(t);
  }
}
function mr(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Nn = !1;
function Ji(e, t) {
  !Nn && t.includes(e.keyCode) && (Nn = !0, Rn(e));
}
function gr(e) {
  Nn = !1, Je(e);
}
function hr(e) {
  Nn && (Nn = !1, Je(e));
}
function yr(e, t, n) {
  const {
    value: a,
    modifiers: l
  } = t, i = vr(a);
  i || Sa.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = i, e._ripple.centered = l.center, e._ripple.circle = l.circle;
  const o = yl(a) ? a : {};
  o.class && (e._ripple.class = o.class);
  const r = o.keys ?? [bl.enter, bl.space];
  if (e._ripple.keyDownHandler = (s) => Ji(s, r), i && !n) {
    if (l.stop) {
      e.addEventListener("touchstart", Qi, {
        passive: !0
      }), e.addEventListener("mousedown", Qi);
      return;
    }
    e.addEventListener("touchstart", Rn, {
      passive: !0
    }), e.addEventListener("touchend", Je, {
      passive: !0
    }), e.addEventListener("touchmove", mr, {
      passive: !0
    }), e.addEventListener("touchcancel", Je), e.addEventListener("mousedown", Rn), e.addEventListener("mouseup", Je), e.addEventListener("mouseleave", Je), e.addEventListener("keydown", (s) => Ji(s, r)), e.addEventListener("keyup", gr), e.addEventListener("blur", hr), e.addEventListener("dragstart", Je, {
      passive: !0
    });
  } else !i && n && br(e);
}
function br(e) {
  var t;
  e.removeEventListener("mousedown", Rn), e.removeEventListener("touchstart", Rn), e.removeEventListener("touchend", Je), e.removeEventListener("touchmove", mr), e.removeEventListener("touchcancel", Je), e.removeEventListener("mouseup", Je), e.removeEventListener("mouseleave", Je), (t = e._ripple) != null && t.keyDownHandler && e.removeEventListener("keydown", e._ripple.keyDownHandler), e.removeEventListener("keyup", gr), e.removeEventListener("dragstart", Je), e.removeEventListener("blur", hr);
}
function bc(e, t) {
  yr(e, t, !1);
}
function pc(e) {
  br(e), delete e._ripple;
}
function wc(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = vr(t.oldValue);
  yr(e, t, n);
}
const _t = {
  mounted: bc,
  unmounted: pc,
  updated: wc
}, Sc = M({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: rr
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
  ...en(),
  ...de(),
  ...Ct(),
  ...Nt(),
  ...wn(),
  ...lr(),
  ...ql(),
  ...Yl(),
  ...cr(),
  ...wt(),
  ...Ma(),
  ...Un(),
  ...Ne({
    tag: "button"
  }),
  ...Re(),
  ...zt({
    variant: "elevated"
  })
}, "VBtn"), Bt = Z()({
  name: "VBtn",
  props: Sc(),
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
    } = tn(e), {
      densityClasses: o
    } = Pt(e), {
      dimensionStyles: r
    } = $t(e), {
      elevationClasses: s
    } = Sn(e), {
      loaderClasses: u
    } = Ql(e), {
      locationStyles: c
    } = Xl(e), {
      positionClasses: d
    } = dr(e), {
      roundedClasses: m
    } = St(e), {
      sizeClasses: v,
      sizeStyles: g
    } = Yn(e), f = ir(e, e.symbol, !1), h = La(e, n), b = x(() => {
      var j;
      return e.active !== void 0 ? e.active : h.isLink.value ? (j = h.isActive) == null ? void 0 : j.value : f == null ? void 0 : f.isSelected.value;
    }), y = D(() => b.value ? e.activeColor ?? e.color : e.color), _ = x(() => {
      var O, B;
      return {
        color: (f == null ? void 0 : f.isSelected.value) && (!h.isLink.value || ((O = h.isActive) == null ? void 0 : O.value)) || !f || ((B = h.isActive) == null ? void 0 : B.value) ? y.value ?? e.baseColor : e.baseColor,
        variant: e.variant
      };
    }), {
      colorClasses: w,
      colorStyles: I,
      variantClasses: T
    } = Kn(_), E = x(() => (f == null ? void 0 : f.disabled.value) || e.disabled), P = D(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), R = x(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function Y(j) {
      var O;
      E.value || h.isLink.value && (j.metaKey || j.ctrlKey || j.shiftKey || j.button !== 0 || n.target === "_blank") || ((O = h.navigate) == null || O.call(h, j), f == null || f.toggle());
    }
    return gc(h, f == null ? void 0 : f.select), oe(() => {
      const j = h.isLink.value ? "a" : e.tag, O = !!(e.prependIcon || a.prepend), B = !!(e.appendIcon || a.append), F = !!(e.icon && e.icon !== !0);
      return et(p(j, K({
        type: j === "a" ? void 0 : "button",
        class: ["v-btn", f == null ? void 0 : f.selectedClass.value, {
          "v-btn--active": b.value,
          "v-btn--block": e.block,
          "v-btn--disabled": E.value,
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
        disabled: E.value || void 0,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: Y,
        value: R.value
      }, h.linkProps), {
        default: () => {
          var N;
          return [Gn(!0, "v-btn"), !e.icon && O && C("span", {
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
              return [((H = a.default) == null ? void 0 : H.call(a)) ?? mn(e.text)];
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
          }, [((N = a.loader) == null ? void 0 : N.call(a)) ?? p(sc, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            width: "2"
          }, null)])];
        }
      }), [[_t, !E.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: f
    };
  }
}), Cc = M({
  start: Boolean,
  end: Boolean,
  icon: ye,
  image: String,
  text: String,
  ...en(),
  ...de(),
  ...Ct(),
  ...wt(),
  ...Un(),
  ...Ne(),
  ...Re(),
  ...zt({
    variant: "flat"
  })
}, "VAvatar"), Mt = Z()({
  name: "VAvatar",
  props: Cc(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: a
    } = Ye(e), {
      borderClasses: l
    } = tn(e), {
      colorClasses: i,
      colorStyles: o,
      variantClasses: r
    } = Kn(e), {
      densityClasses: s
    } = Pt(e), {
      roundedClasses: u
    } = St(e), {
      sizeClasses: c,
      sizeStyles: d
    } = Yn(e);
    return oe(() => p(e.tag, {
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
      }) : e.image ? p(nr, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? p(Te, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, Gn(!1, "v-avatar")]
    })), {};
  }
}), xc = M({
  text: String,
  onClick: Ue(),
  ...de(),
  ...Re()
}, "VLabel"), pr = Z()({
  name: "VLabel",
  props: xc(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return oe(() => {
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
}), wr = Symbol.for("vuetify:selection-control-group"), Sr = M({
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
  ...Ct(),
  ...Re()
}, "SelectionControlGroup"), kc = M({
  ...Sr({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
Z()({
  name: "VSelectionControlGroup",
  props: kc(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = De(e, "modelValue"), l = Jt(), i = D(() => e.id || `v-selection-control-group-${l}`), o = D(() => e.name || i.value), r = /* @__PURE__ */ new Set();
    return tt(wr, {
      modelValue: a,
      forceUpdate: () => {
        r.forEach((s) => s());
      },
      onForceUpdate: (s) => {
        r.add(s), He(() => {
          r.delete(s);
        });
      }
    }), bn({
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
    }), oe(() => {
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
const Cr = M({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...de(),
  ...Sr()
}, "VSelectionControl");
function Ic(e) {
  const t = Ee(wr, void 0), {
    densityClasses: n
  } = Pt(e), a = De(e, "modelValue"), l = x(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), i = x(() => e.falseValue !== void 0 ? e.falseValue : !1), o = x(() => !!e.multiple || e.multiple == null && Array.isArray(a.value)), r = x({
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
  } = ht(() => {
    if (!(e.error || e.disabled))
      return r.value ? e.color : e.baseColor;
  }), {
    backgroundColorClasses: c,
    backgroundColorStyles: d
  } = Lt(() => r.value && !e.error && !e.disabled ? e.color : e.baseColor), m = x(() => r.value ? e.trueIcon : e.falseIcon);
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
const Zi = Z()({
  name: "VSelectionControl",
  directives: {
    vRipple: _t
  },
  inheritAttrs: !1,
  props: Cr(),
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
    } = Ic(e), v = Jt(), g = U(!1), f = U(!1), h = J(), b = D(() => e.id || `input-${v}`), y = D(() => !e.disabled && !e.readonly);
    l == null || l.onForceUpdate(() => {
      h.value && (h.value.checked = r.value);
    });
    function _(E) {
      y.value && (g.value = !0, ga(E.target, ":focus-visible") !== !1 && (f.value = !0));
    }
    function w() {
      g.value = !1, f.value = !1;
    }
    function I(E) {
      E.stopPropagation();
    }
    function T(E) {
      if (!y.value) {
        h.value && (h.value.checked = r.value);
        return;
      }
      e.readonly && l && Be(() => l.forceUpdate()), r.value = E.target.checked;
    }
    return oe(() => {
      var j, O;
      const E = a.label ? a.label({
        label: e.label,
        props: {
          for: b.value
        }
      }) : e.label, [P, R] = Mo(n), Y = C("input", K({
        ref: h,
        checked: r.value,
        disabled: !!e.disabled,
        id: b.value,
        onBlur: w,
        onFocus: _,
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
          onFocus: _,
          onBlur: w,
          id: b.value
        }
      })) ?? C(Se, null, [o.value && p(Te, {
        key: "icon",
        icon: o.value
      }, null), Y])]), [[_t, e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), E && p(pr, {
        for: b.value,
        onClick: I
      }, {
        default: () => [E]
      })]);
    }), {
      isFocused: g,
      input: h
    };
  }
}), _c = M({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: ye,
    default: "$checkboxIndeterminate"
  },
  ...Cr({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), xr = Z()({
  name: "VCheckboxBtn",
  props: _c(),
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
    return oe(() => {
      const s = Zt(Zi.filterProps(e), ["modelValue"]);
      return p(Zi, K(s, {
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
function kr(e) {
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
      d.key !== "Enter" && d.key !== " " || (d.preventDefault(), d.stopPropagation(), $o(s, new PointerEvent("click", d)));
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
const Ec = M({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...de(),
  ...pn({
    transition: {
      component: Jo,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), Pc = Z()({
  name: "VMessages",
  props: Ec(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = x(() => Ke(e.messages)), {
      textColorClasses: l,
      textColorStyles: i
    } = ht(() => e.color);
    return oe(() => p(Ot, {
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
}), Ir = M({
  focused: Boolean,
  "onUpdate:focused": Ue()
}, "focus");
function _r(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
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
const Ac = Symbol.for("vuetify:form");
function Jl(e) {
  const t = Ee(Ac, null);
  return {
    ...t,
    isReadonly: x(() => !!((e == null ? void 0 : e.readonly) ?? (t == null ? void 0 : t.isReadonly.value))),
    isDisabled: x(() => !!((e == null ? void 0 : e.disabled) ?? (t == null ? void 0 : t.isDisabled.value)))
  };
}
const Vc = Symbol.for("vuetify:rules");
function Tc(e) {
  const t = Ee(Vc, null);
  return t ? t(e) : D(e);
}
const Dc = M({
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
  ...Ir()
}, "validation");
function Oc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Jt();
  const a = De(e, "modelValue"), l = x(() => e.validationValue === void 0 ? a.value : e.validationValue), i = Jl(e), o = Tc(() => e.rules), r = J([]), s = U(!0), u = x(() => !!(Ke(a.value === "" ? null : a.value).length || Ke(l.value === "" ? null : l.value).length)), c = x(() => {
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
  })), f = Le("validation"), h = x(() => e.name ?? le(n));
  Ta(() => {
    var w;
    (w = i.register) == null || w.call(i, {
      id: h.value,
      vm: f,
      validate: _,
      reset: b,
      resetValidation: y
    });
  }), bt(() => {
    var w;
    (w = i.unregister) == null || w.call(i, h.value);
  }), Hn(async () => {
    var w;
    d.value.lazy || await _(!d.value.eager), (w = i.update) == null || w.call(i, h.value, m.value, c.value);
  }), Qt(() => d.value.input || d.value.invalidInput && m.value === !1, () => {
    ee(l, () => {
      if (l.value != null)
        _();
      else if (e.focused) {
        const w = ee(() => e.focused, (I) => {
          I || _(), w();
        });
      }
    });
  }), Qt(() => d.value.blur, () => {
    ee(() => e.focused, (w) => {
      w || _();
    });
  }), ee([m, c], () => {
    var w;
    (w = i.update) == null || w.call(i, h.value, m.value, c.value);
  });
  async function b() {
    a.value = null, await Be(), await y();
  }
  async function y() {
    s.value = !0, d.value.lazy ? r.value = [] : await _(!d.value.eager);
  }
  async function _() {
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
    validate: _,
    validationClasses: g
  };
}
const Er = M({
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
  ...Ct(),
  ...Oa(Nt(), ["maxWidth", "minWidth", "width"]),
  ...Re(),
  ...Dc()
}, "VInput"), eo = Z()({
  name: "VInput",
  props: {
    ...Er()
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
    } = Pt(e), {
      dimensionStyles: o
    } = $t(e), {
      themeClasses: r
    } = Ye(e), {
      rtlClasses: s
    } = Rt(), {
      InputIcon: u
    } = kr(e), c = Jt(), d = x(() => e.id || `input-${c}`), m = x(() => `${d.value}-messages`), {
      errorMessages: v,
      isDirty: g,
      isDisabled: f,
      isReadonly: h,
      isPristine: b,
      isValid: y,
      isValidating: _,
      reset: w,
      resetValidation: I,
      validate: T,
      validationClasses: E
    } = Oc(e, "v-input", d), P = x(() => ({
      id: d,
      messagesId: m,
      isDirty: g,
      isDisabled: f,
      isReadonly: h,
      isPristine: b,
      isValid: y,
      isValidating: _,
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
    return oe(() => {
      var H, te, ne, me;
      const O = !!(a.prepend || e.prependIcon), B = !!(a.append || e.appendIcon), F = j.value.length > 0, N = !e.hideDetails || e.hideDetails === "auto" && (F || !!a.details);
      return C("div", {
        class: X(["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--focused": e.focused,
          "v-input--glow": e.glow,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, i.value, r.value, s.value, E.value, e.class]),
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
      }, [p(Pc, {
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
function Xn(e) {
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
const Bc = Symbol.for("vuetify:display"), Fc = M({
  mobile: {
    type: Boolean,
    default: !1
  },
  mobileBreakpoint: [Number, String]
}, "display");
function Zl() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    mobile: null
  }, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : pt();
  const n = Ee(Bc);
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
const Lc = Symbol.for("vuetify:goto");
function Mc() {
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
function Rc(e) {
  return ei(e) ?? (document.scrollingElement || document.body);
}
function ei(e) {
  return typeof e == "string" ? document.querySelector(e) : Bo(e);
}
function Xa(e, t, n) {
  if (typeof e == "number") return t && n ? -e : e;
  let a = ei(e), l = 0;
  for (; a; )
    l += t ? a.offsetLeft : a.offsetTop, a = a.offsetParent;
  return l;
}
async function to(e, t, n, a) {
  const l = n ? "scrollLeft" : "scrollTop", i = kt((a == null ? void 0 : a.options) ?? Mc(), t), o = a == null ? void 0 : a.rtl.value, r = (typeof e == "number" ? e : ei(e)) ?? 0, s = i.container === "parent" && r instanceof HTMLElement ? r.parentElement : Rc(i.container), u = typeof i.easing == "function" ? i.easing : i.patterns[i.easing];
  if (!u) throw new TypeError(`Easing function "${i.easing}" not found.`);
  let c;
  if (typeof r == "number")
    c = Xa(r, n, o);
  else if (c = Xa(r, n, o) - Xa(s, n, o), i.layout) {
    const g = window.getComputedStyle(r).getPropertyValue("--v-layout-top");
    g && (c -= parseInt(g, 10));
  }
  c += i.offset, c = $c(s, c, !!o, !!n);
  const d = s[l] ?? 0;
  if (c === d) return Promise.resolve(c);
  const m = performance.now();
  return new Promise((v) => requestAnimationFrame(function g(f) {
    const b = (f - m) / i.duration, y = Math.floor(d + (c - d) * u(dt(b, 0, 1)));
    if (s[l] = y, b >= 1 && Math.abs(y - s[l]) < 10)
      return v(c);
    if (b > 2)
      return Yt("Scroll target is not reachable"), v(s[l]);
    requestAnimationFrame(g);
  }));
}
function Nc() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = Ee(Lc), {
    isRtl: n
  } = Rt();
  if (!t) throw new Error("[Vuetify] Could not find injected goto instance");
  const a = {
    ...t,
    // can be set via VLocaleProvider
    rtl: D(() => t.rtl.value || n.value)
  };
  async function l(i, o) {
    return to(i, kt(e, o), !1, a);
  }
  return l.horizontal = async (i, o) => to(i, kt(e, o), !0, a), l;
}
function $c(e, t, n, a) {
  const {
    scrollWidth: l,
    scrollHeight: i
  } = e, [o, r] = e === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [e.offsetWidth, e.offsetHeight];
  let s, u;
  return a ? n ? (s = -(l - o), u = 0) : (s = 0, u = l - o) : (s = 0, u = i + -r), dt(t, s, u);
}
function zc(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isRtl: a,
    isHorizontal: l
  } = e;
  const i = $n(l, n), o = Pr(l, a, n), r = $n(l, t), s = Ar(l, t), u = r * 0.4;
  return o > s ? s - u : o + i < s + r ? s - i + r + u : o;
}
function jc(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isHorizontal: a
  } = e;
  const l = $n(a, n), i = Ar(a, t), o = $n(a, t);
  return i - l / 2 + o / 2;
}
function no(e, t) {
  const n = e ? "scrollWidth" : "scrollHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Hc(e, t) {
  const n = e ? "clientWidth" : "clientHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Pr(e, t, n) {
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
function Ar(e, t) {
  const n = e ? "offsetLeft" : "offsetTop";
  return (t == null ? void 0 : t[n]) || 0;
}
const Wc = Symbol.for("vuetify:v-slide-group"), Vr = M({
  centerActive: Boolean,
  contentClass: null,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: Wc
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
  ...Fc({
    mobile: null
  }),
  ...Ne(),
  ...Kl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), ao = Z()({
  name: "VSlideGroup",
  props: Vr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: a
    } = Rt(), {
      displayClasses: l,
      mobile: i
    } = Zl(e), o = Ul(e, e.symbol), r = U(!1), s = U(0), u = U(0), c = U(0), d = x(() => e.direction === "horizontal"), {
      resizeRef: m,
      contentRect: v
    } = Mn(), {
      resizeRef: g,
      contentRect: f
    } = Mn(), h = Nc(), b = x(() => ({
      container: m.el,
      duration: 200,
      easing: "easeOutQuart"
    })), y = x(() => o.selected.value.length ? o.items.value.findIndex((k) => k.id === o.selected.value[0]) : -1), _ = x(() => o.selected.value.length ? o.items.value.findIndex((k) => k.id === o.selected.value[o.selected.value.length - 1]) : -1);
    if (Pe) {
      let k = -1;
      ee(() => [o.selected.value, v.value, f.value, d.value], () => {
        cancelAnimationFrame(k), k = requestAnimationFrame(() => {
          if (v.value && f.value) {
            const A = d.value ? "width" : "height";
            u.value = v.value[A], c.value = f.value[A], r.value = u.value + 1 < c.value;
          }
          if (y.value >= 0 && g.el) {
            const A = g.el.children[_.value];
            I(A, e.centerActive);
          }
        });
      });
    }
    const w = U(!1);
    function I(k, A) {
      let z = 0;
      A ? z = jc({
        containerElement: m.el,
        isHorizontal: d.value,
        selectedElement: k
      }) : z = zc({
        containerElement: m.el,
        isHorizontal: d.value,
        isRtl: a.value,
        selectedElement: k
      }), T(z);
    }
    function T(k) {
      if (!Pe || !m.el) return;
      const A = $n(d.value, m.el), z = Pr(d.value, a.value, m.el);
      if (!(no(d.value, m.el) <= A || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
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
    function E(k) {
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
      const k = no(d.value, m.el), A = Hc(d.value, m.el);
      return k - A - Math.abs(s.value) > 1;
    });
    return oe(() => p(e.tag, {
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
        }, [((k = n.prev) == null ? void 0 : k.call(n, te.value)) ?? p(Gi, null, {
          default: () => [p(Te, {
            icon: a.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), C("div", {
          key: "container",
          ref: m,
          class: X(["v-slide-group__container", e.contentClass]),
          onScroll: E
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
        }, [((z = n.next) == null ? void 0 : z.call(n, te.value)) ?? p(Gi, null, {
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
}), Tr = Symbol.for("vuetify:v-chip-group"), Gc = M({
  baseColor: String,
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Ze
  },
  ...Vr(),
  ...de(),
  ...Kl({
    selectedClass: "v-chip--selected"
  }),
  ...Ne(),
  ...Re(),
  ...zt({
    variant: "tonal"
  })
}, "VChipGroup");
Z()({
  name: "VChipGroup",
  props: Gc(),
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
    } = Ul(e, Tr);
    return bn({
      VChip: {
        baseColor: D(() => e.baseColor),
        color: D(() => e.color),
        disabled: D(() => e.disabled),
        filter: D(() => e.filter),
        variant: D(() => e.variant)
      }
    }), oe(() => {
      const u = ao.filterProps(e);
      return p(ao, K(u, {
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
const Kc = M({
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
  ...en(),
  ...de(),
  ...Ct(),
  ...wn(),
  ...lr(),
  ...wt(),
  ...Ma(),
  ...Un(),
  ...Ne({
    tag: "span"
  }),
  ...Re(),
  ...zt({
    variant: "tonal"
  })
}, "VChip"), Dr = Z()({
  name: "VChip",
  directives: {
    vRipple: _t
  },
  props: Kc(),
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
    } = tn(e), {
      densityClasses: r
    } = Pt(e), {
      elevationClasses: s
    } = Sn(e), {
      roundedClasses: u
    } = St(e), {
      sizeClasses: c
    } = Yn(e), {
      themeClasses: d
    } = Ye(e), m = De(e, "modelValue"), v = ir(e, Tr, !1), g = La(e, n), f = D(() => e.link !== !1 && g.isLink.value), h = x(() => !e.disabled && e.link !== !1 && (!!v || e.link || g.isClickable.value)), b = D(() => ({
      "aria-label": i(e.closeLabel),
      disabled: e.disabled,
      onClick(E) {
        E.preventDefault(), E.stopPropagation(), m.value = !1, a("click:close", E);
      }
    })), {
      colorClasses: y,
      colorStyles: _,
      variantClasses: w
    } = Kn(() => ({
      color: !v || v.isSelected.value ? e.color ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    function I(E) {
      var P;
      a("click", E), h.value && ((P = g.navigate) == null || P.call(g, E), v == null || v.toggle());
    }
    function T(E) {
      (E.key === "Enter" || E.key === " ") && (E.preventDefault(), I(E));
    }
    return () => {
      var F;
      const E = g.isLink.value ? "a" : e.tag, P = !!(e.appendIcon || e.appendAvatar), R = !!(P || l.append), Y = !!(l.close || e.closable), j = !!(l.filter || e.filter) && v, O = !!(e.prependIcon || e.prependAvatar), B = !!(O || l.prepend);
      return m.value && et(p(E, K({
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": h.value,
          "v-chip--filter": j,
          "v-chip--pill": e.pill,
          [`${e.activeClass}`]: e.activeClass && ((F = g.isActive) == null ? void 0 : F.value)
        }, d.value, o.value, y.value, r.value, s.value, u.value, c.value, w.value, v == null ? void 0 : v.selectedClass.value, e.class],
        style: [_.value, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        tabindex: h.value ? 0 : void 0,
        onClick: I,
        onKeydown: h.value && !f.value && T
      }, g.linkProps), {
        default: () => {
          var N;
          return [Gn(h.value, "v-chip"), j && p(Zo, {
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
            }, null)]), [[yn, v.isSelected.value]])]
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
          }, null), e.prependAvatar && p(Mt, {
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
          })) ?? mn(e.text)]), R && C("div", {
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
          }, null), e.appendAvatar && p(Mt, {
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
      }), [[_t, h.value && e.ripple, null]]);
    };
  }
}), Uc = M({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...de(),
  ...Re()
}, "VDivider"), ti = Z()({
  name: "VDivider",
  props: Uc(),
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
    } = ht(() => e.color), r = x(() => {
      const s = {};
      return e.length && (s[e.vertical ? "height" : "width"] = ie(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = ie(e.thickness)), s;
    });
    return oe(() => {
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
}), _l = Symbol.for("vuetify:list");
function Or() {
  let {
    filterable: e
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    filterable: !1
  };
  const t = Ee(_l, {
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
  return tt(_l, n), t;
}
function Br() {
  return Ee(_l, null);
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
}, Fr = (e) => {
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
}, Yc = (e) => {
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
}, Xc = (e) => {
  const t = Fr(e);
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
}, qc = {
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
}, Lr = {
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
}, Qc = {
  open: Lr.open,
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
}, Mr = (e) => {
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
}, Jc = (e) => {
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
}, Zc = (e) => {
  const t = Mr(e);
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
}, Rr = (e) => {
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
}, ed = (e) => {
  const t = Rr(e);
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
}, zn = Symbol.for("vuetify:nested"), Nr = {
  id: U(),
  root: {
    register: () => null,
    unregister: () => null,
    children: J(/* @__PURE__ */ new Map()),
    parents: J(/* @__PURE__ */ new Map()),
    disabled: J(/* @__PURE__ */ new Set()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: J(!1),
    selectable: J(!1),
    opened: J(/* @__PURE__ */ new Set()),
    activated: J(/* @__PURE__ */ new Set()),
    selected: J(/* @__PURE__ */ new Map()),
    selectedValues: J([]),
    getPath: () => []
  }
}, td = M({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, "nested"), nd = (e) => {
  let t = !1;
  const n = U(/* @__PURE__ */ new Map()), a = U(/* @__PURE__ */ new Map()), l = U(/* @__PURE__ */ new Set()), i = De(e, "opened", e.opened, (f) => new Set(Array.isArray(f) ? f.map((h) => Oe(h)) : f), (f) => [...f.values()]), o = x(() => {
    if (typeof e.activeStrategy == "object") return e.activeStrategy;
    if (typeof e.activeStrategy == "function") return e.activeStrategy(e.mandatory);
    switch (e.activeStrategy) {
      case "leaf":
        return Yc(e.mandatory);
      case "single-leaf":
        return Xc(e.mandatory);
      case "independent":
        return ni(e.mandatory);
      case "single-independent":
      default:
        return Fr(e.mandatory);
    }
  }), r = x(() => {
    if (typeof e.selectStrategy == "object") return e.selectStrategy;
    if (typeof e.selectStrategy == "function") return e.selectStrategy(e.mandatory);
    switch (e.selectStrategy) {
      case "single-leaf":
        return Zc(e.mandatory);
      case "leaf":
        return Jc(e.mandatory);
      case "independent":
        return ai(e.mandatory);
      case "single-independent":
        return Mr(e.mandatory);
      case "trunk":
        return ed(e.mandatory);
      case "classic":
      default:
        return Rr(e.mandatory);
    }
  }), s = x(() => {
    if (typeof e.openStrategy == "object") return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Qc;
      case "single":
        return qc;
      case "multiple":
      default:
        return Lr;
    }
  }), u = De(e, "activated", e.activated, (f) => o.value.in(f, n.value, a.value), (f) => o.value.out(f, n.value, a.value)), c = De(e, "selected", e.selected, (f) => r.value.in(f, n.value, a.value, l.value), (f) => r.value.out(f, n.value, a.value));
  bt(() => {
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
          const _ = d(f).map(String).join(" -> "), w = d(h).concat(f).map(String).join(" -> ");
          Wo(`Multiple nodes with the same ID
	${_}
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
          for (const _ of y)
            if (!u.value.has(_)) {
              u.value = y;
              return;
            }
          for (const _ of u.value)
            if (!y.has(_)) {
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
}, $r = (e, t, n) => {
  const a = Ee(zn, Nr), l = Symbol("nested item"), i = x(() => Oe(gt(e)) ?? l), o = {
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
    a.isGroupActivator || a.root.register(i.value, a.id.value, gt(t), n);
  }), bt(() => {
    a.isGroupActivator || a.root.unregister(i.value);
  }), n && tt(zn, o), o;
}, ad = () => {
  const e = Ee(zn, Nr);
  tt(zn, {
    ...e,
    isGroupActivator: !0
  });
}, ld = Wn({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ad(), () => {
      var a;
      return (a = n.default) == null ? void 0 : a.call(n);
    };
  }
}), id = M({
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
}, "VListGroup"), lo = Z()({
  name: "VListGroup",
  props: id(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: a,
      open: l,
      id: i
    } = $r(() => e.value, () => e.disabled, !0), o = x(() => `v-list-group--id-${String(e.rawId ?? i.value)}`), r = Br(), {
      isBooted: s
    } = qu();
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
    return oe(() => p(e.tag, {
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
        default: () => [p(ld, null, {
          default: () => [n.activator({
            props: c.value,
            isOpen: a.value
          })]
        })]
      }), p(Ot, {
        transition: {
          component: Gu
        },
        disabled: !s.value
      }, {
        default: () => {
          var v;
          return [et(C("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": o.value
          }, [(v = n.default) == null ? void 0 : v.call(n)]), [[yn, a.value]])];
        }
      })]
    })), {
      isOpen: a
    };
  }
}), od = M({
  opacity: [Number, String],
  ...de(),
  ...Ne()
}, "VListItemSubtitle"), rd = Z()({
  name: "VListItemSubtitle",
  props: od(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return oe(() => p(e.tag, {
      class: X(["v-list-item-subtitle", e.class]),
      style: ve([{
        "--v-list-item-subtitle-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), sd = Ko("v-list-item-title"), ud = M({
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
  ...en(),
  ...de(),
  ...Ct(),
  ...Nt(),
  ...wn(),
  ...wt(),
  ...Ma(),
  ...Ne(),
  ...Re(),
  ...zt({
    variant: "text"
  })
}, "VListItem"), gn = Z()({
  name: "VListItem",
  directives: {
    vRipple: _t
  },
  props: ud(),
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
    } = $r(o, () => e.disabled, !1), y = Br(), _ = x(() => {
      var $;
      return e.active !== !1 && (e.active || (($ = i.isActive) == null ? void 0 : $.value) || (g.activatable.value ? s.value : d.value));
    }), w = D(() => e.link !== !1 && i.isLink.value), I = x(() => !!y && (g.selectable.value || g.activatable.value || e.value != null)), T = x(() => !e.disabled && e.link !== !1 && (e.link || i.isClickable.value || I.value)), E = D(() => e.rounded || e.nav), P = D(() => e.color ?? e.activeColor), R = D(() => ({
      color: _.value ? P.value ?? e.baseColor : e.baseColor,
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
    } = tn(e), {
      colorClasses: B,
      colorStyles: F,
      variantClasses: N
    } = Kn(R), {
      densityClasses: H
    } = Pt(e), {
      dimensionStyles: te
    } = $t(e), {
      elevationClasses: ne
    } = Sn(e), {
      roundedClasses: me
    } = St(E), S = D(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), k = D(() => e.ripple !== void 0 && e.ripple && (y != null && y.filterable) ? {
      keys: [bl.enter]
    } : e.ripple), A = x(() => ({
      isActive: _.value,
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
    return oe(() => {
      const $ = w.value ? "a" : e.tag, he = a.title || e.title != null, W = a.subtitle || e.subtitle != null, be = !!(e.appendAvatar || e.appendIcon), fe = !!(be || a.append), xe = !!(e.prependAvatar || e.prependIcon), pe = !!(xe || a.prepend);
      return y == null || y.updateHasPrepend(pe), e.activeColor && Au("active-color", ["color", "base-color"]), et(p($, K({
        class: ["v-list-item", {
          "v-list-item--active": _.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": T.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !pe && (y == null ? void 0 : y.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && _.value
        }, j.value, O.value, B.value, H.value, ne.value, S.value, me.value, N.value, e.class],
        style: [F.value, te.value, e.style],
        tabindex: T.value ? y ? -2 : 0 : void 0,
        "aria-selected": I.value ? g.activatable.value ? s.value : g.selectable.value ? d.value : _.value : void 0,
        onClick: z,
        onKeydown: T.value && !w.value && ge
      }, i.linkProps), {
        default: () => {
          var V;
          return [Gn(T.value || _.value, "v-list-item"), pe && C("div", {
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
          }) : C(Se, null, [e.prependAvatar && p(Mt, {
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
          }, [he && p(sd, {
            key: "title"
          }, {
            default: () => {
              var G;
              return [((G = a.title) == null ? void 0 : G.call(a, {
                title: e.title
              })) ?? mn(e.title)];
            }
          }), W && p(rd, {
            key: "subtitle"
          }, {
            default: () => {
              var G;
              return [((G = a.subtitle) == null ? void 0 : G.call(a, {
                subtitle: e.subtitle
              })) ?? mn(e.subtitle)];
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
          }, null), e.appendAvatar && p(Mt, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), C("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[_t, T.value && k.value]]);
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
}), cd = M({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...de(),
  ...Ne()
}, "VListSubheader"), li = Z()({
  name: "VListSubheader",
  props: cd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: a,
      textColorStyles: l
    } = ht(() => e.color);
    return oe(() => {
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
}), dd = M({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), zr = Z()({
  name: "VListChildren",
  props: dd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Or(), () => {
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
        }, d = lo.filterProps(r);
        return o ? p(lo, K(d, {
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
            }) : p(gn, h, c);
          },
          default: () => p(zr, {
            items: o,
            returnObject: e.returnObject
          }, n)
        }) : n.item ? n.item({
          props: r
        }) : p(gn, K(r, {
          value: e.returnObject ? u : r.value
        }), c);
      }));
    };
  }
}), jr = M({
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
function Tt(e, t) {
  const n = rt(t, e.itemTitle, t), a = rt(t, e.itemValue, n), l = rt(t, e.itemChildren), i = rt(t, e.itemType, "item"), o = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? Zt(t, ["children"]) : t : void 0 : rt(t, e.itemProps), r = {
    title: n,
    value: a,
    ...o
  };
  return {
    type: i,
    title: String(r.title ?? ""),
    value: r.value,
    props: r,
    children: i === "item" && Array.isArray(l) ? Hr(e, l) : void 0,
    raw: t
  };
}
function Hr(e, t) {
  const n = Oa(e, ["itemTitle", "itemValue", "itemChildren", "itemProps", "itemType", "returnObject", "valueComparator"]), a = [];
  for (const l of t)
    a.push(Tt(n, l));
  return a;
}
function Wr(e) {
  const t = x(() => Hr(e, e.items)), n = x(() => t.value.some((r) => r.value === null)), a = U(/* @__PURE__ */ new Map()), l = U([]);
  mt(() => {
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
        h.push(Tt(f, b));
        continue;
      }
      const y = s.get(b);
      if (v || !y) {
        for (const _ of v ? u : c)
          if (g(b, _.value)) {
            h.push(_);
            continue e;
          }
        h.push(Tt(f, b));
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
function fd(e, t) {
  const n = rt(t, e.itemType, "item"), a = wl(t) ? t : rt(t, e.itemTitle), l = wl(t) ? t : rt(t, e.itemValue, void 0), i = rt(t, e.itemChildren), o = e.itemProps === !0 ? Zt(t, ["children"]) : rt(t, e.itemProps), r = {
    title: a,
    value: l,
    ...o
  };
  return {
    type: n,
    title: r.title,
    value: r.value,
    props: r,
    children: n === "item" && i ? Gr(e, i) : void 0,
    raw: t
  };
}
function Gr(e, t) {
  const n = [];
  for (const a of t)
    n.push(fd(e, a));
  return n;
}
function vd(e) {
  return {
    items: x(() => Gr(e, e.items))
  };
}
const md = M({
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
  ...td({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...en(),
  ...de(),
  ...Ct(),
  ...Nt(),
  ...wn(),
  ...jr(),
  ...wt(),
  ...Ne(),
  ...Re(),
  ...zt({
    variant: "text"
  })
}, "VList"), Kr = Z()({
  name: "VList",
  props: md(),
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
    } = vd(e), {
      themeClasses: l
    } = Ye(e), {
      backgroundColorClasses: i,
      backgroundColorStyles: o
    } = Lt(() => e.bgColor), {
      borderClasses: r
    } = tn(e), {
      densityClasses: s
    } = Pt(e), {
      dimensionStyles: u
    } = $t(e), {
      elevationClasses: c
    } = Sn(e), {
      roundedClasses: d
    } = St(e), {
      children: m,
      open: v,
      parents: g,
      select: f,
      getPath: h
    } = nd(e), b = D(() => e.lines ? `v-list--${e.lines}-line` : void 0), y = D(() => e.activeColor), _ = D(() => e.baseColor), w = D(() => e.color);
    Or({
      filterable: e.filterable
    }), bn({
      VListGroup: {
        activeColor: y,
        baseColor: _,
        color: w,
        expandIcon: D(() => e.expandIcon),
        collapseIcon: D(() => e.collapseIcon)
      },
      VListItem: {
        activeClass: D(() => e.activeClass),
        activeColor: y,
        baseColor: _,
        color: w,
        density: D(() => e.density),
        disabled: D(() => e.disabled),
        lines: D(() => e.lines),
        nav: D(() => e.nav),
        slim: D(() => e.slim),
        variant: D(() => e.variant)
      }
    });
    const I = U(!1), T = J();
    function E(B) {
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
    return oe(() => p(e.tag, {
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
      onFocusin: E,
      onFocusout: P,
      onFocus: R,
      onKeydown: Y,
      onMousedown: j
    }, {
      default: () => [p(zr, {
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
function gd(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function io(e, t) {
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
const Ur = {
  static: bd,
  // specific viewport position, usually centered
  connected: wd
  // connected to a certain element
}, hd = M({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Ur
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
function yd(e, t) {
  const n = J({}), a = J();
  Pe && Qt(() => !!(t.isActive.value && e.locationStrategy), (r) => {
    var s, u;
    ee(() => e.locationStrategy, r), He(() => {
      window.removeEventListener("resize", l), visualViewport == null || visualViewport.removeEventListener("resize", i), visualViewport == null || visualViewport.removeEventListener("scroll", o), a.value = void 0;
    }), window.addEventListener("resize", l, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("resize", i, {
      passive: !0
    }), visualViewport == null || visualViewport.addEventListener("scroll", o, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? a.value = (s = e.locationStrategy(t, e, n)) == null ? void 0 : s.updateLocation : a.value = (u = Ur[e.locationStrategy](t, e, n)) == null ? void 0 : u.updateLocation;
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
function bd() {
}
function pd(e, t) {
  const n = zl(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function wd(e, t, n) {
  (Array.isArray(e.target.value) || zu(e.target.value)) && Object.assign(n.value, {
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
      preferredAnchor: Vi(b),
      preferredOrigin: Vi(y)
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
  const v = new fu(4), g = new ResizeObserver(() => {
    if (!d) return;
    if (requestAnimationFrame((y) => {
      y !== m && v.clear(), requestAnimationFrame((_) => {
        m = _;
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
    let [_, w] = b, [I, T] = y;
    I && !Array.isArray(I) && g.unobserve(I), _ && !Array.isArray(_) && g.observe(_), T && g.unobserve(T), w && g.observe(w);
  }, {
    immediate: !0
  }), He(() => {
    g.disconnect();
  });
  let f = new ft({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  function h() {
    if (d = !1, requestAnimationFrame(() => d = !0), !e.target.value || !e.contentEl.value) return;
    (Array.isArray(e.target.value) || e.target.value.offsetParent || e.target.value.getClientRects().length) && (f = Ho(e.target.value));
    const b = pd(e.contentEl.value, e.isRtl.value), y = pa(e.contentEl.value), _ = 12;
    y.length || (y.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (b.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), b.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = y.reduce((B, F) => {
      const N = pu(F);
      return B ? new ft({
        x: Math.max(B.left, N.left),
        y: Math.max(B.top, N.top),
        width: Math.min(B.right, N.right) - Math.max(B.left, N.left),
        height: Math.min(B.bottom, N.bottom) - Math.max(B.top, N.top)
      }) : N;
    }, void 0);
    w.x += _, w.y += _, w.width -= _ * 2, w.height -= _ * 2;
    let I = {
      anchor: l.value,
      origin: i.value
    };
    function T(B) {
      const F = new ft(b), N = io(B.anchor, f), H = io(B.origin, F);
      let {
        x: te,
        y: ne
      } = gd(N, H);
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
        overflows: Di(F, w),
        x: te,
        y: ne
      };
    }
    let E = 0, P = 0;
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
        Wo("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: B,
        y: F,
        overflows: N
      } = T(I);
      E += B, P += F, b.x += B, b.y += F;
      {
        const H = Ti(I.anchor), te = N.x.before || N.x.after, ne = N.y.before || N.y.after;
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
      N.x.before && (E += N.x.before, b.x += N.x.before), N.x.after && (E -= N.x.after, b.x -= N.x.after), N.y.before && (P += N.y.before, b.y += N.y.before), N.y.after && (P -= N.y.after, b.y -= N.y.after);
      {
        const H = Di(b, w);
        R.x = w.width - H.x.before - H.x.after, R.y = w.height - H.y.before - H.y.after, E += H.x.before, b.x += H.x.before, P += H.y.before, b.y += H.y.before;
      }
      break;
    }
    const O = Ti(I.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${I.anchor.side} ${I.anchor.align}`,
      transformOrigin: `${I.origin.side} ${I.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: ie(Qa(P)),
      left: e.isRtl.value ? void 0 : ie(Qa(E)),
      right: e.isRtl.value ? ie(Qa(-E)) : void 0,
      minWidth: ie(O === "y" ? Math.min(o.value, f.width) : o.value),
      maxWidth: ie(oo(dt(R.x, o.value === 1 / 0 ? 0 : o.value, s.value))),
      maxHeight: ie(oo(dt(R.y, r.value === 1 / 0 ? 0 : r.value, u.value)))
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
      contentBox: _
    } = b;
    _.height > y.y && requestAnimationFrame(() => {
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
function oo(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let El = !0;
const Ca = [];
function Sd(e) {
  !El || Ca.length ? (Ca.push(e), Pl()) : (El = !1, e(), Pl());
}
let ro = -1;
function Pl() {
  cancelAnimationFrame(ro), ro = requestAnimationFrame(() => {
    const e = Ca.shift();
    e && e(), Ca.length ? Pl() : El = !0;
  });
}
const sa = {
  none: null,
  close: kd,
  block: Id,
  reposition: _d
}, Cd = M({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in sa
  }
}, "VOverlay-scroll-strategies");
function xd(e, t) {
  if (!Pe) return;
  let n;
  mt(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = Ll(), await new Promise((a) => setTimeout(a)), n.active && n.run(() => {
      var a;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (a = sa[e.scrollStrategy]) == null || a.call(sa, t, e, n);
    }));
  }), He(() => {
    n == null || n.stop();
  });
}
function kd(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Yr(e.targetEl.value ?? e.contentEl.value, t);
}
function Id(e, t) {
  var o;
  const n = (o = e.root.value) == null ? void 0 : o.offsetParent, a = [.../* @__PURE__ */ new Set([...pa(e.targetEl.value, t.contained ? n : void 0), ...pa(e.contentEl.value, t.contained ? n : void 0)])].filter((r) => !r.classList.contains("v-overlay-scroll-blocked")), l = window.innerWidth - document.documentElement.offsetWidth, i = ((r) => Hl(r) && r)(n || document.documentElement);
  i && e.root.value.classList.add("v-overlay--scroll-blocked"), a.forEach((r, s) => {
    r.style.setProperty("--v-body-scroll-x", ie(-r.scrollLeft)), r.style.setProperty("--v-body-scroll-y", ie(-r.scrollTop)), r !== document.documentElement && r.style.setProperty("--v-scrollbar-offset", ie(l)), r.classList.add("v-overlay-scroll-blocked");
  }), He(() => {
    a.forEach((r, s) => {
      const u = parseFloat(r.style.getPropertyValue("--v-body-scroll-x")), c = parseFloat(r.style.getPropertyValue("--v-body-scroll-y")), d = r.style.scrollBehavior;
      r.style.scrollBehavior = "auto", r.style.removeProperty("--v-body-scroll-x"), r.style.removeProperty("--v-body-scroll-y"), r.style.removeProperty("--v-scrollbar-offset"), r.classList.remove("v-overlay-scroll-blocked"), r.scrollLeft = -u, r.scrollTop = -c, r.style.scrollBehavior = d;
    }), i && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function _d(e, t, n) {
  let a = !1, l = -1, i = -1;
  function o(r) {
    Sd(() => {
      var c, d;
      const s = performance.now();
      (d = (c = e.updateLocation).value) == null || d.call(c, r), a = (performance.now() - s) / (1e3 / 60) > 2;
    });
  }
  i = (typeof requestIdleCallback > "u" ? (r) => r() : requestIdleCallback)(() => {
    n.run(() => {
      Yr(e.targetEl.value ?? e.contentEl.value, (r) => {
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
function Yr(e, t) {
  const n = [document, ...pa(e)];
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
const Al = Symbol.for("vuetify:v-menu"), Ed = M({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function Pd(e, t) {
  let n = () => {
  };
  function a(o) {
    n == null || n();
    const r = Number(o ? e.openDelay : e.closeDelay);
    return new Promise((s) => {
      n = mu(r, () => {
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
const Ad = M({
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
  ...Ed()
}, "VOverlay-activator");
function Vd(e, t) {
  let {
    isActive: n,
    isTop: a,
    contentEl: l
  } = t;
  const i = Le("useActivator"), o = J();
  let r = !1, s = !1, u = !0;
  const c = x(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = x(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !c.value), {
    runOpenDelay: m,
    runCloseDelay: v
  } = Pd(e, (P) => {
    P === (e.openOnHover && r || c.value && s) && !(e.openOnHover && n.value && !a.value) && (n.value !== P && (u = !0), n.value = P);
  }), g = J(), f = {
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
      ga(P.target, ":focus-visible") !== !1 && (s = !0, P.stopPropagation(), o.value = P.currentTarget || P.target, m());
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
      const R = Ee(Al, null);
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
  const _ = pl();
  mt(() => {
    _.value && Be(() => {
      o.value = _.el;
    });
  });
  const w = pl(), I = x(() => e.target === "cursor" && g.value ? g.value : w.value ? w.el : Xr(e.target, i) || o.value), T = x(() => Array.isArray(I.value) ? void 0 : I.value);
  let E;
  return ee(() => !!e.activator, (P) => {
    P && Pe ? (E = Ll(), E.run(() => {
      Td(e, i, {
        activatorEl: o,
        activatorEvents: h
      });
    })) : E && E.stop();
  }, {
    flush: "post",
    immediate: !0
  }), He(() => {
    E == null || E.stop();
  }), {
    activatorEl: o,
    activatorRef: _,
    target: I,
    targetEl: T,
    targetRef: w,
    activatorEvents: h,
    contentEvents: b,
    scrimEvents: y
  };
}
function Td(e, t, n) {
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
    s && wu(s, K(l.value, u));
  }
  function o() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && Su(s, K(l.value, u));
  }
  function r() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const u = Xr(s, t);
    return a.value = (u == null ? void 0 : u.nodeType) === Node.ELEMENT_NODE ? u : void 0, a.value;
  }
}
function Xr(e, t) {
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
function Dd() {
  if (!Pe) return U(!1);
  const {
    ssr: e
  } = Zl();
  if (e) {
    const t = U(!1);
    return Hn(() => {
      t.value = !0;
    }), t;
  } else
    return U(!0);
}
const Od = M({
  eager: Boolean
}, "lazy");
function Bd(e, t) {
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
const so = Symbol.for("vuetify:stack"), Cn = vn([]);
function Fd(e, t, n) {
  const a = Le("useStack"), l = !n, i = Ee(so, void 0), o = vn({
    activeChildren: /* @__PURE__ */ new Set()
  });
  tt(so, o);
  const r = U(Number(gt(t)));
  Qt(e, () => {
    var d;
    const c = (d = Cn.at(-1)) == null ? void 0 : d[1];
    r.value = c ? c + 10 : Number(gt(t)), l && Cn.push([a.uid, r.value]), i == null || i.activeChildren.add(a.uid), He(() => {
      if (l) {
        const m = Oe(Cn).findIndex((v) => v[0] === a.uid);
        Cn.splice(m, 1);
      }
      i == null || i.activeChildren.delete(a.uid);
    });
  });
  const s = U(!0);
  l && mt(() => {
    var d;
    const c = ((d = Cn.at(-1)) == null ? void 0 : d[0]) === a.uid;
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
function Ld(e) {
  return {
    teleportTarget: x(() => {
      const n = e();
      if (n === !0 || !Pe) return;
      const a = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (a == null) {
        Aa(`Unable to locate target ${n}`);
        return;
      }
      let l = [...a.children].find((i) => i.matches(".v-overlay-container"));
      return l || (l = document.createElement("div"), l.className = "v-overlay-container", a.appendChild(l)), l;
    })
  };
}
function Md() {
  return !0;
}
function qr(e, t, n) {
  if (!e || Qr(e, n) === !1) return !1;
  const a = Uo(t);
  if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && a.host === e.target) return !1;
  const l = (typeof n.value == "object" && n.value.include || (() => []))();
  return l.push(t), !l.some((i) => i == null ? void 0 : i.contains(e.target));
}
function Qr(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || Md)(e);
}
function Rd(e, t, n) {
  const a = typeof n.value == "function" ? n.value : n.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && qr(e, t, n) && setTimeout(() => {
    Qr(e, n) && a && a(e);
  }, 0);
}
function uo(e, t) {
  const n = Uo(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const co = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (l) => Rd(l, e, t), a = (l) => {
      e._clickOutside.lastMousedownWasOutside = qr(l, e, t);
    };
    uo(e, (l) => {
      l.addEventListener("click", n, !0), l.addEventListener("mousedown", a, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: a
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (uo(e, (n) => {
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
function Nd(e) {
  const {
    modelValue: t,
    color: n,
    ...a
  } = e;
  return p(qt, {
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
  ...Ad(),
  ...de(),
  ...Nt(),
  ...Od(),
  ...hd(),
  ...Cd(),
  ...Re(),
  ...pn()
}, "VOverlay"), xa = Z()({
  name: "VOverlay",
  directives: {
    vClickOutside: co
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
    const i = Le("VOverlay"), o = J(), r = J(), s = J(), u = De(e, "modelValue"), c = x({
      get: () => u.value,
      set: (W) => {
        W && e.disabled || (u.value = W);
      }
    }), {
      themeClasses: d
    } = Ye(e), {
      rtlClasses: m,
      isRtl: v
    } = Rt(), {
      hasContent: g,
      onAfterLeave: f
    } = Bd(e, c), h = Lt(() => typeof e.scrim == "string" ? e.scrim : null), {
      globalTop: b,
      localTop: y,
      stackStyles: _
    } = Fd(c, () => e.zIndex, e._disableGlobalStack), {
      activatorEl: w,
      activatorRef: I,
      target: T,
      targetEl: E,
      targetRef: P,
      activatorEvents: R,
      contentEvents: Y,
      scrimEvents: j
    } = Vd(e, {
      isActive: c,
      isTop: y,
      contentEl: s
    }), {
      teleportTarget: O
    } = Ld(() => {
      var fe, xe, pe;
      const W = e.attach || e.contained;
      if (W) return W;
      const be = ((fe = w == null ? void 0 : w.value) == null ? void 0 : fe.getRootNode()) || ((pe = (xe = i.proxy) == null ? void 0 : xe.$el) == null ? void 0 : pe.getRootNode());
      return be instanceof ShadowRoot ? be : !1;
    }), {
      dimensionStyles: B
    } = $t(e), F = Dd(), {
      scopeId: N
    } = ii();
    ee(() => e.disabled, (W) => {
      W && (c.value = !1);
    });
    const {
      contentStyles: H,
      updateLocation: te
    } = yd(e, {
      isRtl: v,
      contentEl: s,
      target: T,
      isActive: c
    });
    xd(e, {
      root: o,
      contentEl: s,
      targetEl: E,
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
    }), bt(() => {
      Pe && window.removeEventListener("keydown", S);
    });
    function S(W) {
      var be, fe, xe;
      W.key === "Escape" && b.value && ((be = s.value) != null && be.contains(document.activeElement) || l("keydown", W), e.persistent ? ge() : (c.value = !1, (fe = s.value) != null && fe.contains(document.activeElement) && ((xe = w.value) == null || xe.focus())));
    }
    function k(W) {
      W.key === "Escape" && !b.value || l("keydown", W);
    }
    const A = vc();
    Qt(() => e.closeOnBack, () => {
      mc(A, (W) => {
        b.value && c.value ? (W(!1), e.persistent ? ge() : c.value = !1) : W();
      });
    });
    const z = J();
    ee(() => c.value && (e.absolute || e.contained) && O.value == null, (W) => {
      if (W) {
        const be = Yo(o.value);
        be && be !== document.scrollingElement && (z.value = be.scrollTop);
      }
    });
    function ge() {
      e.noClickAnimation || s.value && sn(s.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: ba
      });
    }
    function $() {
      l("afterEnter");
    }
    function he() {
      f(), l("afterLeave");
    }
    return oe(() => {
      var W;
      return C(Se, null, [(W = n.activator) == null ? void 0 : W.call(n, {
        isActive: c.value,
        targetRef: P,
        props: K({
          ref: I
        }, R.value, e.activatorProps)
      }), F.value && g.value && p(As, {
        disabled: !O.value,
        to: O.value
      }, {
        default: () => [C("div", K({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": c.value,
            "v-overlay--contained": e.contained
          }, d.value, m.value, e.class],
          style: [_.value, {
            "--v-overlay-opacity": e.opacity,
            top: ie(z.value)
          }, e.style],
          ref: o,
          onKeydown: k
        }, N, a), [p(Nd, K({
          color: h,
          modelValue: c.value && !!e.scrim,
          ref: r
        }, j.value), null), p(Ot, {
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
            })]), [[yn, c.value], [co, {
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
}), $d = M({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  disableInitialFocus: Boolean,
  ...Zt(oi({
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
}, "VMenu"), Jr = Z()({
  name: "VMenu",
  props: $d(),
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
    } = Rt(), o = Jt(), r = D(() => e.id || `v-menu-${o}`), s = J(), u = Ee(Al, null), c = U(/* @__PURE__ */ new Set());
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
          !c.value.size && !e.persistent && (h == null || (b = s.value) != null && b.contentEl && !gu(h, s.value.contentEl)) && (a.value = !1, u == null || u.closeParents());
        }, 40);
      }
    }), bt(() => {
      u == null || u.unregister(), document.removeEventListener("focusin", d);
    }), Vs(() => a.value = !1);
    async function d(h) {
      var _, w, I;
      const b = h.relatedTarget, y = h.target;
      await Be(), a.value && b !== y && ((_ = s.value) != null && _.contentEl) && // We're the topmost menu
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
      var b, y, _, w, I;
      if (!e.disabled)
        if (h.key === "Tab" || h.key === "Enter" && !e.closeOnContentClick) {
          if (h.key === "Enter" && (h.target instanceof HTMLTextAreaElement || h.target instanceof HTMLInputElement && h.target.closest("form"))) return;
          h.key === "Enter" && h.preventDefault(), zo(Fn((b = s.value) == null ? void 0 : b.contentEl, !1), h.shiftKey ? "prev" : "next", (E) => E.tabIndex >= 0) || (a.value = !1, (_ = (y = s.value) == null ? void 0 : y.activatorEl) == null || _.focus());
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
    return oe(() => {
      const h = xa.filterProps(e);
      return p(xa, K({
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
          for (var b = arguments.length, y = new Array(b), _ = 0; _ < b; _++)
            y[_] = arguments[_];
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
    }), Xn({
      id: r,
      ΨopenChildren: c
    }, s);
  }
}), zd = M({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...de(),
  ...pn({
    transition: {
      component: Jo
    }
  })
}, "VCounter"), jd = Z()({
  name: "VCounter",
  functional: !0,
  props: zd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = D(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return oe(() => p(Ot, {
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
      }) : a.value]), [[yn, e.active]])]
    })), {};
  }
}), Hd = M({
  floating: Boolean,
  ...de()
}, "VFieldLabel"), ta = Z()({
  name: "VFieldLabel",
  props: Hd(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return oe(() => p(pr, {
      class: X(["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class]),
      style: ve(e.style),
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
}), Wd = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], Zr = M({
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
    validator: (e) => Wd.includes(e)
  },
  "onClick:clear": Ue(),
  "onClick:appendInner": Ue(),
  "onClick:prependInner": Ue(),
  ...de(),
  ...ql(),
  ...wt(),
  ...Re()
}, "VField"), fo = Z()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Ir(),
    ...Zr()
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
    } = _r(e), {
      InputIcon: d
    } = kr(e), {
      roundedClasses: m
    } = St(e), {
      rtlClasses: v
    } = Rt(), g = D(() => e.dirty || e.active), f = D(() => !!(e.label || l.label)), h = D(() => !e.singleLine && f.value), b = Jt(), y = x(() => e.id || `input-${b}`), _ = D(() => `${y.value}-messages`), w = J(), I = J(), T = J(), E = x(() => ["plain", "underlined"].includes(e.variant)), P = x(() => e.error || e.disabled ? void 0 : g.value && s.value ? e.color : e.baseColor), R = x(() => {
      if (!(!e.iconColor || e.glow && !s.value))
        return e.iconColor === !0 ? P.value : e.iconColor;
    }), {
      backgroundColorClasses: Y,
      backgroundColorStyles: j
    } = Lt(() => e.bgColor), {
      textColorClasses: O,
      textColorStyles: B
    } = ht(P);
    ee(g, (H) => {
      if (h.value) {
        const te = w.value.$el, ne = I.value.$el;
        requestAnimationFrame(() => {
          const me = zl(te), S = ne.getBoundingClientRect(), k = S.x - me.x, A = S.y - me.y - (me.height / 2 - S.height / 2), z = S.width / 0.75, ge = Math.abs(z - me.width) > 1 ? {
            maxWidth: ie(z)
          } : void 0, $ = getComputedStyle(te), he = getComputedStyle(ne), W = parseFloat($.transitionDuration) * 1e3 || 150, be = parseFloat(he.getPropertyValue("--v-field-label-scale")), fe = he.getPropertyValue("color");
          te.style.visibility = "visible", ne.style.visibility = "hidden", sn(te, {
            transform: `translate(${k}px, ${A}px) scale(${be})`,
            color: fe,
            ...ge
          }, {
            duration: W,
            easing: ba,
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
    return oe(() => {
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
          "v-field--center-affix": e.centerAffix ?? !E.value,
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
      }, null), p(ur, {
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
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && h.value && p(ta, {
        key: "floating-label",
        ref: I,
        class: X([O.value]),
        floating: !0,
        for: y.value,
        style: ve(B.value)
      }, {
        default: () => [S()]
      }), f.value && p(ta, {
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
          "aria-describedby": _.value
        },
        focus: u,
        blur: c
      })) ?? C("div", {
        id: y.value,
        class: "v-field__input",
        "aria-describedby": _.value
      }, null)]), ne && p(Zo, {
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
        })]), [[yn, e.dirty]])]
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
      }, [p(ta, {
        ref: I,
        floating: !0,
        for: y.value
      }, {
        default: () => [S()]
      })]), C("div", {
        class: "v-field__outline__end"
      }, null)]), E.value && h.value && p(ta, {
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
function Gd(e) {
  function t(n, a) {
    var l, i;
    !e.autofocus || !n || (i = (l = a[0].target) == null ? void 0 : l.focus) == null || i.call(l);
  }
  return {
    onIntersect: t
  };
}
const Kd = ["color", "file", "time", "date", "datetime-local", "week", "month"], ri = M({
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
  ...Er(),
  ...Zr()
}, "VTextField"), Xt = Z()({
  name: "VTextField",
  directives: {
    vIntersect: wa
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
    } = _r(e), {
      onIntersect: u
    } = Gd(e), c = x(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), d = x(() => {
      if (n.maxlength) return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), m = x(() => ["plain", "underlined"].includes(e.variant)), v = J(), g = J(), f = J(), h = x(() => Kd.includes(e.type) || e.persistentPlaceholder || o.value || e.active);
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
    function _(T) {
      a("click:control", T);
    }
    function w(T, E) {
      T.stopPropagation(), b(), Be(() => {
        i.value = null, E(), $o(e["onClick:clear"], T);
      });
    }
    function I(T) {
      var P;
      const E = T.target;
      if (i.value = E.value, (P = e.modelModifiers) != null && P.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const R = [E.selectionStart, E.selectionEnd];
        Be(() => {
          E.selectionStart = R[0], E.selectionEnd = R[1];
        });
      }
    }
    return oe(() => {
      const T = !!(l.counter || e.counter !== !1 && e.counter != null), E = !!(T || l.details), [P, R] = Mo(n), {
        modelValue: Y,
        ...j
      } = eo.filterProps(e), O = fo.filterProps(e);
      return p(eo, K({
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
          return p(fo, K({
            ref: g,
            onMousedown: y,
            onClick: _,
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
              }, A, R), null), [[wa, {
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
              }, [l.default(), z]) : Ts(z, {
                class: k
              }), e.suffix && C("span", {
                class: "v-text-field__suffix"
              }, [C("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: E ? (B) => {
          var F;
          return C(Se, null, [(F = l.details) == null ? void 0 : F.call(l, B), T && C(Se, null, [C("span", null, null), p(jd, {
            active: e.persistentCounter || o.value,
            value: c.value,
            max: d.value,
            disabled: e.disabled
          }, l.counter)])]);
        } : void 0
      });
    }), Xn({}, v, g, f);
  }
}), Ud = M({
  renderless: Boolean,
  ...de()
}, "VVirtualScrollItem"), Yd = Z()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Ud(),
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
    }), oe(() => {
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
}), Xd = -1, qd = 1, Ja = 100, Qd = M({
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
function Jd(e, t) {
  const n = Zl(), a = U(0);
  mt(() => {
    a.value = parseFloat(e.itemHeight || 0);
  });
  const l = U(0), i = U(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (a.value || 16)
  ) || 1), o = U(0), r = U(0), s = J(), u = J();
  let c = 0;
  const {
    resizeRef: d,
    contentRect: m
  } = Mn();
  mt(() => {
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
  function _(S) {
    return f[S] || a.value;
  }
  const w = cu(() => {
    const S = performance.now();
    h[0] = 0;
    const k = t.value.length;
    for (let A = 1; A <= k - 1; A++)
      h[A] = (h[A - 1] || 0) + _(A - 1);
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
  function E(S) {
    S = dt(S, 0, t.value.length - 1);
    const k = Math.floor(S), A = S % 1, z = k + 1, ge = h[k] || 0, $ = h[z] || ge;
    return ge + ($ - ge) * A;
  }
  function P(S) {
    return Zd(h, S);
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
    const S = R - c, k = Math.sign(Y), A = Math.max(0, S - Ja), z = dt(P(A), 0, t.value.length), ge = S + v.value + Ja, $ = dt(P(ge) + 1, z + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (k !== Xd || z < l.value) && (k !== qd || $ > i.value)
    ) {
      const he = E(l.value) - E(z), W = E($) - E(i.value);
      Math.max(he, W) > Ja ? (l.value = z, i.value = $) : (z <= 0 && (l.value = z), $ >= t.value.length && (i.value = $));
    }
    o.value = E(l.value), r.value = E(t.value.length) - E(i.value);
  }
  function ne(S) {
    const k = E(S);
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
function Zd(e, t) {
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
const ef = M({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Qd(),
  ...de(),
  ...Nt()
}, "VVirtualScroll"), es = Z()({
  name: "VVirtualScroll",
  props: ef(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const a = Le("VVirtualScroll"), {
      dimensionStyles: l
    } = $t(e), {
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
    } = Jd(e, D(() => e.items));
    return Qt(() => e.renderless, () => {
      function f() {
        var y, _;
        const b = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[b]("scroll", s, {
          passive: !0
        }), document[b]("scrollend", u)) : ((y = o.value) == null || y[b]("scroll", s, {
          passive: !0
        }), (_ = o.value) == null || _[b]("scrollend", u));
      }
      Hn(() => {
        o.value = Yo(a.vnode.el, !0), f(!0);
      }), He(f);
    }), oe(() => {
      const f = g.value.map((h) => p(Yd, {
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
          paddingTop: ie(m.value)
        }
      }, null), f, C("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: ie(v.value)
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
          paddingTop: ie(m.value),
          paddingBottom: ie(v.value)
        }
      }, [f])]);
    }), {
      calculateVisibleItems: i,
      scrollToIndex: d
    };
  }
});
function ts(e, t) {
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
const ns = M({
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
  ...jr({
    itemChildren: !1
  })
}, "Select"), tf = M({
  ...ns(),
  ...Zt(ri({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...pn({
    transition: {
      component: Wl
    }
  })
}, "VSelect");
Z()({
  name: "VSelect",
  props: tf(),
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
    } = Ba(), l = J(), i = J(), o = J(), {
      items: r,
      transformIn: s,
      transformOut: u
    } = Wr(e), c = De(e, "modelValue", [], (S) => s(S === null ? [null] : Ke(S)), (S) => {
      const k = u(S);
      return e.multiple ? k : k[0] ?? null;
    }), d = x(() => typeof e.counterValue == "function" ? e.counterValue(c.value) : typeof e.counterValue == "number" ? e.counterValue : c.value.length), m = Jl(e), v = x(() => c.value.map((S) => S.value)), g = U(!1);
    let f = "", h = -1, b;
    const y = x(() => e.hideSelected ? r.value.filter((S) => !c.value.some((k) => (e.valueComparator || Ze)(k, S))) : r.value), _ = x(() => e.hideNoData && !y.value.length || m.isReadonly.value || m.isDisabled.value), w = De(e, "menu"), I = x({
      get: () => w.value,
      set: (S) => {
        var k;
        w.value && !S && ((k = i.value) != null && k.ΨopenChildren.size) || S && _.value || (w.value = S);
      }
    }), T = D(() => I.value ? e.closeText : e.openText), E = x(() => {
      var S;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((S = e.menuProps) == null ? void 0 : S.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), P = J(), R = ts(P, l);
    function Y(S) {
      e.openOnClear && (I.value = !0);
    }
    function j() {
      _.value || (I.value = !I.value);
    }
    function O(S) {
      ha(S) && B(S);
    }
    function B(S) {
      var fe, xe, pe;
      if (!S.key || m.isReadonly.value) return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(S.key) && S.preventDefault(), ["Enter", "ArrowDown", " "].includes(S.key) && (I.value = !0), ["Escape", "Tab"].includes(S.key) && (I.value = !1), S.key === "Home" ? (fe = P.value) == null || fe.focus("first") : S.key === "End" && ((xe = P.value) == null || xe.focus("last"));
      const k = 1e3;
      if (!ha(S)) return;
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
      else if (ga(l.value, ":autofill") || ga(l.value, ":-webkit-autofill")) {
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
    }), oe(() => {
      const S = !!(e.chips || n.chip), k = !!(!e.hideNoData || y.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), A = c.value.length > 0, z = Xt.filterProps(e), ge = A || !g.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return p(Xt, K({
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
        default: () => C(Se, null, [p(Jr, K({
          ref: i,
          modelValue: I.value,
          "onUpdate:modelValue": ($) => I.value = $,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: _.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: H,
          onAfterLeave: te
        }, E.value), {
          default: () => [k && p(Kr, K({
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
              return [($ = n["prepend-item"]) == null ? void 0 : $.call(n), !y.value.length && !e.hideNoData && (((he = n["no-data"]) == null ? void 0 : he.call(n)) ?? p(gn, {
                key: "no-data",
                title: a(e.noDataText)
              }, null)), p(es, {
                ref: o,
                renderless: !0,
                items: y.value,
                itemKey: "value"
              }, {
                default: (be) => {
                  var we, re, Ie;
                  let {
                    item: fe,
                    index: xe,
                    itemRef: pe
                  } = be;
                  const V = hu(fe.props), G = K(fe.props, {
                    ref: pe,
                    key: fe.value,
                    onClick: () => F(fe, null)
                  });
                  return fe.type === "divider" ? ((we = n.divider) == null ? void 0 : we.call(n, {
                    props: fe.raw,
                    index: xe
                  })) ?? p(ti, K(fe.props, {
                    key: `divider-${xe}`
                  }), null) : fe.type === "subheader" ? ((re = n.subheader) == null ? void 0 : re.call(n, {
                    props: fe.raw,
                    index: xe
                  })) ?? p(li, K(fe.props, {
                    key: `subheader-${xe}`
                  }), null) : ((Ie = n.item) == null ? void 0 : Ie.call(n, {
                    item: fe,
                    index: xe,
                    props: G
                  })) ?? p(gn, K(G, {
                    role: "option"
                  }), {
                    prepend: (ze) => {
                      let {
                        isSelected: at
                      } = ze;
                      return C(Se, null, [e.multiple && !e.hideSelected ? p(xr, {
                        key: fe.value,
                        modelValue: at,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, V.prependAvatar && p(Mt, {
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
            }) : p(Dr, K({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: $.title,
              disabled: $.props.disabled
            }, be), null) : xe ?? C("span", {
              class: "v-select__selection-text"
            }, [$.title, e.multiple && he < c.value.length - 1 && C("span", {
              class: "v-select__selection-comma"
            }, [xo(",")])])]);
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
    }), Xn({
      isFocused: g,
      menu: I,
      select: F
    }, l);
  }
});
const nf = (e, t, n) => {
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
const af = M({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function lf(e, t, n) {
  var r;
  const a = [], l = (n == null ? void 0 : n.default) ?? nf, i = n != null && n.filterKeys ? Ke(n.filterKeys) : !1, o = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
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
          const y = rt(c, b), _ = (r = n == null ? void 0 : n.customKeyFilter) == null ? void 0 : r[b];
          if (v = _ ? _(y, t, u) : l(y, t, u), v !== -1 && v !== !1)
            _ ? d[b] = Za(v, t) : m[b] = Za(v, t);
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
function of(e, t, n, a) {
  const l = U([]), i = U(/* @__PURE__ */ new Map()), o = x(() => le(t));
  mt(() => {
    const s = typeof n == "function" ? n() : le(n), u = typeof s != "string" && typeof s != "number" ? "" : String(s), c = lf(o.value, u, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...le(a == null ? void 0 : a.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), d = le(t), m = [], v = /* @__PURE__ */ new Map();
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
function rf(e, t, n) {
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
const sf = M({
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
}, "VDialog"), as = Z()({
  name: "VDialog",
  props: sf(),
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
    } = ii(), o = J();
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
    bt(() => {
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
    }), oe(() => {
      const c = xa.filterProps(e), d = K({
        "aria-haspopup": "dialog"
      }, e.activatorProps), m = K({
        tabindex: -1
      }, e.contentProps);
      return p(xa, K({
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
    }), Xn({}, o);
  }
}), si = Z()({
  name: "VCardActions",
  props: de(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return bn({
      VBtn: {
        slim: !0,
        variant: "text"
      }
    }), oe(() => {
      var a;
      return C("div", {
        class: X(["v-card-actions", e.class]),
        style: ve(e.style)
      }, [(a = n.default) == null ? void 0 : a.call(n)]);
    }), {};
  }
}), uf = M({
  opacity: [Number, String],
  ...de(),
  ...Ne()
}, "VCardSubtitle"), cf = Z()({
  name: "VCardSubtitle",
  props: uf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return oe(() => p(e.tag, {
      class: X(["v-card-subtitle", e.class]),
      style: ve([{
        "--v-card-subtitle-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), df = Ko("v-card-title"), ff = M({
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
  ...Ct()
}, "VCardItem"), vf = Z()({
  name: "VCardItem",
  props: ff(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return oe(() => {
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
      }, n.prepend) : C(Se, null, [e.prependAvatar && p(Mt, {
        key: "prepend-avatar",
        density: e.density,
        image: e.prependAvatar
      }, null), e.prependIcon && p(Te, {
        key: "prepend-icon",
        density: e.density,
        icon: e.prependIcon
      }, null)])]), C("div", {
        class: "v-card-item__content"
      }, [r && p(df, {
        key: "title"
      }, {
        default: () => {
          var c;
          return [((c = n.title) == null ? void 0 : c.call(n)) ?? mn(e.title)];
        }
      }), s && p(cf, {
        key: "subtitle"
      }, {
        default: () => {
          var c;
          return [((c = n.subtitle) == null ? void 0 : c.call(n)) ?? mn(e.subtitle)];
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
      }, null), e.appendAvatar && p(Mt, {
        key: "append-avatar",
        density: e.density,
        image: e.appendAvatar
      }, null)])])]);
    }), {};
  }
}), mf = M({
  opacity: [Number, String],
  ...de(),
  ...Ne()
}, "VCardText"), ui = Z()({
  name: "VCardText",
  props: mf(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return oe(() => p(e.tag, {
      class: X(["v-card-text", e.class]),
      style: ve([{
        "--v-card-text-opacity": e.opacity
      }, e.style])
    }, n)), {};
  }
}), gf = M({
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
  ...en(),
  ...de(),
  ...Ct(),
  ...Nt(),
  ...wn(),
  ...ql(),
  ...Yl(),
  ...cr(),
  ...wt(),
  ...Ma(),
  ...Ne(),
  ...Re(),
  ...zt({
    variant: "elevated"
  })
}, "VCard"), ls = Z()({
  name: "VCard",
  directives: {
    vRipple: _t
  },
  props: gf(),
  setup(e, t) {
    let {
      attrs: n,
      slots: a
    } = t;
    const {
      themeClasses: l
    } = Ye(e), {
      borderClasses: i
    } = tn(e), {
      colorClasses: o,
      colorStyles: r,
      variantClasses: s
    } = Kn(e), {
      densityClasses: u
    } = Pt(e), {
      dimensionStyles: c
    } = $t(e), {
      elevationClasses: d
    } = Sn(e), {
      loaderClasses: m
    } = Ql(e), {
      locationStyles: v
    } = Xl(e), {
      positionClasses: g
    } = dr(e), {
      roundedClasses: f
    } = St(e), h = La(e, n);
    return oe(() => {
      const b = e.link !== !1 && h.isLink.value, y = !e.disabled && e.link !== !1 && (e.link || h.isClickable.value), _ = b ? "a" : e.tag, w = !!(a.title || e.title != null), I = !!(a.subtitle || e.subtitle != null), T = w || I, E = !!(a.append || e.appendAvatar || e.appendIcon), P = !!(a.prepend || e.prependAvatar || e.prependIcon), R = !!(a.image || e.image), Y = T || P || E, j = !!(a.text || e.text != null);
      return et(p(_, K({
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
          }, a.image) : p(nr, {
            key: "image-img",
            cover: !0,
            src: e.image
          }, null)]), p(ur, {
            name: "v-card",
            active: !!e.loading,
            color: typeof e.loading == "boolean" ? void 0 : e.loading
          }, {
            default: a.loader
          }), Y && p(vf, {
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
          }), j && p(ui, {
            key: "text"
          }, {
            default: () => {
              var B;
              return [((B = a.text) == null ? void 0 : B.call(a)) ?? e.text];
            }
          }), (O = a.default) == null ? void 0 : O.call(a), a.actions && p(si, null, {
            default: a.actions
          }), Gn(y, "v-card")];
        }
      }), [[_t, y && e.ripple]]);
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
  ...af({
    filterKeys: ["title"]
  }),
  ...ns({
    hideNoData: !0,
    returnObject: !0
  }),
  ...Zt(ri({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...pn({
    transition: !1
  })
}, "VCombobox"), yf = Z()({
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
    } = Ba(), i = J(), o = U(!1), r = U(!0), s = U(!1), u = J(), c = J(), d = U(-1);
    let m = !1;
    const {
      items: v,
      transformIn: g,
      transformOut: f
    } = Wr(e), {
      textColorClasses: h,
      textColorStyles: b
    } = ht(() => {
      var V;
      return (V = i.value) == null ? void 0 : V.color;
    }), y = De(e, "modelValue", [], (V) => g(Ke(V)), (V) => {
      const G = f(V);
      return e.multiple ? G : G[0] ?? null;
    }), _ = Jl(e), w = x(() => !!(e.chips || a.chip)), I = x(() => w.value || !!a.selection), T = U(!e.multiple && !I.value ? ((pe = y.value[0]) == null ? void 0 : pe.title) ?? "" : ""), E = x({
      get: () => T.value,
      set: (V) => {
        var G;
        if (T.value = V ?? "", !e.multiple && !I.value && (y.value = [Tt(e, V)], Be(() => {
          var we;
          return (we = c.value) == null ? void 0 : we.scrollToIndex(0);
        })), V && e.multiple && ((G = e.delimiters) != null && G.length)) {
          const we = V.split(new RegExp(`(?:${e.delimiters.join("|")})+`));
          we.length > 1 && (we.forEach((re) => {
            re = re.trim(), re && W(Tt(e, re));
          }), T.value = "");
        }
        V || (d.value = -1), r.value = !V;
      }
    }), P = x(() => typeof e.counterValue == "function" ? e.counterValue(y.value) : typeof e.counterValue == "number" ? e.counterValue : e.multiple ? y.value.length : E.value.length), {
      filteredItems: R,
      getMatches: Y
    } = of(e, v, () => r.value ? "" : E.value), j = x(() => e.hideSelected ? R.value.filter((V) => !y.value.some((G) => G.value === V.value)) : R.value), O = x(() => e.hideNoData && !j.value.length || _.isReadonly.value || _.isDisabled.value), B = De(e, "menu"), F = x({
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
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && E.value === ((G = j.value[0]) == null ? void 0 : G.title)) && j.value.length > 0 && !r.value && !s.value;
    }), ne = J(), me = ts(ne, i);
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
      (ha(V) || V.key === "Backspace") && ((G = i.value) == null || G.focus());
    }
    function ge(V) {
      var re, Ie, ze, at;
      if (uu(V) || _.isReadonly.value) return;
      const G = (re = i.value) == null ? void 0 : re.selectionStart, we = y.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(V.key) && V.preventDefault(), ["Enter", "ArrowDown"].includes(V.key) && (F.value = !0), ["Escape"].includes(V.key) && (F.value = !1), ["Enter", "Escape", "Tab"].includes(V.key) && (te.value && ["Enter", "Tab"].includes(V.key) && !y.value.some((ue) => {
        let {
          value: lt
        } = ue;
        return lt === j.value[0].value;
      }) && W(R.value[0]), r.value = !0), V.key === "ArrowDown" && te.value && ((Ie = ne.value) == null || Ie.focus("next")), V.key === "Enter" && E.value && (W(Tt(e, E.value)), I.value && (T.value = "")), ["Backspace", "Delete"].includes(V.key)) {
        if (!e.multiple && I.value && y.value.length > 0 && !E.value) return W(y.value[0], !1);
        if (~d.value) {
          V.preventDefault();
          const ue = d.value;
          W(y.value[d.value], !1), d.value = ue >= we - 1 ? we - 2 : ue;
        } else V.key === "Backspace" && !E.value && (d.value = we - 1);
        return;
      }
      if (e.multiple)
        if (V.key === "ArrowLeft") {
          if (d.value < 0 && G && G > 0) return;
          const ue = d.value > -1 ? d.value - 1 : we - 1;
          y.value[ue] ? d.value = ue : (d.value = -1, (ze = i.value) == null || ze.setSelectionRange(E.value.length, E.value.length));
        } else if (V.key === "ArrowRight") {
          if (d.value < 0) return;
          const ue = d.value + 1;
          y.value[ue] ? d.value = ue : (d.value = -1, (at = i.value) == null || at.setSelectionRange(0, 0));
        } else ~d.value && ha(V) && (d.value = -1);
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
          const we = y.value.findIndex((Ie) => (e.valueComparator || Ze)(Ie.value, V.value)), re = G ?? !~we;
          if (~we) {
            const Ie = re ? [...y.value, V] : [...y.value];
            Ie.splice(we, 1), y.value = Ie;
          } else re && (y.value = [...y.value, V]);
          e.clearOnSelect && (E.value = "");
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
      if (!(V || V === G) && (d.value = -1, F.value = !1, E.value)) {
        if (e.multiple) {
          W(Tt(e, E.value));
          return;
        }
        if (!I.value) return;
        y.value.some((we) => {
          let {
            title: re
          } = we;
          return re === E.value;
        }) ? T.value = "" : W(Tt(e, E.value));
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
    }), oe(() => {
      const V = !!(!e.hideNoData || j.value.length || a["prepend-item"] || a["append-item"] || a["no-data"]), G = y.value.length > 0, we = Xt.filterProps(e);
      return p(Xt, K({
        ref: i
      }, we, {
        modelValue: E.value,
        "onUpdate:modelValue": [(re) => E.value = re, xe],
        focused: o.value,
        "onUpdate:focused": (re) => o.value = re,
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
        readonly: _.isReadonly.value,
        placeholder: G ? void 0 : e.placeholder,
        "onClick:clear": S,
        "onMousedown:control": k,
        onKeydown: ge
      }), {
        ...a,
        default: () => C(Se, null, [p(Jr, K({
          ref: u,
          modelValue: F.value,
          "onUpdate:modelValue": (re) => F.value = re,
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
          default: () => [V && p(Kr, K({
            ref: ne,
            filterable: !0,
            selected: H.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (re) => re.preventDefault(),
            onKeydown: z,
            onFocusin: be,
            onFocusout: fe,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, me, e.listProps), {
            default: () => {
              var re, Ie, ze;
              return [(re = a["prepend-item"]) == null ? void 0 : re.call(a), !j.value.length && !e.hideNoData && (((Ie = a["no-data"]) == null ? void 0 : Ie.call(a)) ?? p(gn, {
                key: "no-data",
                title: l(e.noDataText)
              }, null)), p(es, {
                ref: c,
                renderless: !0,
                items: j.value,
                itemKey: "value"
              }, {
                default: (at) => {
                  var gi, hi, yi;
                  let {
                    item: ue,
                    index: lt,
                    itemRef: Xe
                  } = at;
                  const mi = K(ue.props, {
                    ref: Xe,
                    key: ue.value,
                    active: te.value && lt === 0 ? !0 : void 0,
                    onClick: () => W(ue, null)
                  });
                  return ue.type === "divider" ? ((gi = a.divider) == null ? void 0 : gi.call(a, {
                    props: ue.raw,
                    index: lt
                  })) ?? p(ti, K(ue.props, {
                    key: `divider-${lt}`
                  }), null) : ue.type === "subheader" ? ((hi = a.subheader) == null ? void 0 : hi.call(a, {
                    props: ue.raw,
                    index: lt
                  })) ?? p(li, K(ue.props, {
                    key: `subheader-${lt}`
                  }), null) : ((yi = a.item) == null ? void 0 : yi.call(a, {
                    item: ue,
                    index: lt,
                    props: mi
                  })) ?? p(gn, K(mi, {
                    role: "option"
                  }), {
                    prepend: (Jn) => {
                      let {
                        isSelected: ps
                      } = Jn;
                      return C(Se, null, [e.multiple && !e.hideSelected ? p(xr, {
                        key: ue.value,
                        modelValue: ps,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, ue.props.prependAvatar && p(Mt, {
                        image: ue.props.prependAvatar
                      }, null), ue.props.prependIcon && p(Te, {
                        icon: ue.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var Jn;
                      return r.value ? ue.title : rf("v-combobox", ue.title, (Jn = Y(ue)) == null ? void 0 : Jn.title);
                    }
                  });
                }
              }), (ze = a["append-item"]) == null ? void 0 : ze.call(a)];
            }
          })]
        }), y.value.map((re, Ie) => {
          function ze(Xe) {
            Xe.stopPropagation(), Xe.preventDefault(), W(re, !1);
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
            item: re,
            index: Ie,
            props: at
          }) : a.selection({
            item: re,
            index: Ie
          })) : void 0;
          if (!(ue && !lt))
            return C("div", {
              key: re.value,
              class: X(["v-combobox__selection", Ie === d.value && ["v-combobox__selection--selected", h.value]]),
              style: ve(Ie === d.value ? b.value : {})
            }, [w.value ? a.chip ? p(Fe, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: re.title
                }
              }
            }, {
              default: () => [lt]
            }) : p(Dr, K({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: re.title,
              disabled: re.props.disabled
            }, at), null) : lt ?? C("span", {
              class: "v-combobox__selection-text"
            }, [re.title, e.multiple && Ie < y.value.length - 1 && C("span", {
              class: "v-combobox__selection-comma"
            }, [xo(",")])])]);
        })]),
        "append-inner": function() {
          var at, ue;
          for (var re = arguments.length, Ie = new Array(re), ze = 0; ze < re; ze++)
            Ie[ze] = arguments[ze];
          return C(Se, null, [(at = a["append-inner"]) == null ? void 0 : at.call(a, ...Ie), (!e.hideNoData || e.items.length) && e.menuIcon ? p(Te, {
            class: "v-combobox__menu-icon",
            color: (ue = i.value) == null ? void 0 : ue.fieldIconColor,
            icon: e.menuIcon,
            onMousedown: A,
            onClick: vu,
            "aria-label": l(N.value),
            title: l(N.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), Xn({
      isFocused: o,
      isPristine: r,
      menu: F,
      search: E,
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
function vo(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(l) {
      return Object.getOwnPropertyDescriptor(e, l).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function yt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vo(Object(n), !0).forEach(function(a) {
      bf(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vo(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function ua(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ua = function(t) {
    return typeof t;
  } : ua = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ua(e);
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
function It(e) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(e);
}
var At = It(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), qn = It(/Edge/i), mo = It(/firefox/i), Vn = It(/safari/i) && !It(/chrome/i) && !It(/android/i), ci = It(/iP(ad|od|hone)/i), is = It(/chrome/i) && It(/android/i), os = {
  capture: !1,
  passive: !1
};
function ce(e, t, n) {
  e.addEventListener(t, n, !At && os);
}
function se(e, t, n) {
  e.removeEventListener(t, n, !At && os);
}
function ka(e, t) {
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
function rs(e) {
  return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
}
function ut(e, t, n, a) {
  if (e) {
    n = n || document;
    do {
      if (t != null && (t[0] === ">" ? e.parentNode === n && ka(e, t) : ka(e, t)) || a && e === n)
        return e;
      if (e === n) break;
    } while (e = rs(e));
  }
  return null;
}
var go = /\s+/g;
function qe(e, t, n) {
  if (e && t)
    if (e.classList)
      e.classList[n ? "add" : "remove"](t);
    else {
      var a = (" " + e.className + " ").replace(go, " ").replace(" " + t + " ", " ");
      e.className = (a + (n ? " " + t : "")).replace(go, " ");
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
function fn(e, t) {
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
function ss(e, t, n) {
  if (e) {
    var a = e.getElementsByTagName(t), l = 0, i = a.length;
    if (n)
      for (; l < i; l++)
        n(a[l], l);
    return a;
  }
  return [];
}
function vt() {
  var e = document.scrollingElement;
  return e || document.documentElement;
}
function Ve(e, t, n, a, l) {
  if (!(!e.getBoundingClientRect && e !== window)) {
    var i, o, r, s, u, c, d;
    if (e !== window && e.parentNode && e !== vt() ? (i = e.getBoundingClientRect(), o = i.top, r = i.left, s = i.bottom, u = i.right, c = i.height, d = i.width) : (o = 0, r = 0, s = window.innerHeight, u = window.innerWidth, c = window.innerHeight, d = window.innerWidth), (t || n) && e !== window && (l = l || e.parentNode, !At))
      do
        if (l && l.getBoundingClientRect && (q(l, "transform") !== "none" || n && q(l, "position") !== "static")) {
          var m = l.getBoundingClientRect();
          o -= m.top + parseInt(q(l, "border-top-width")), r -= m.left + parseInt(q(l, "border-left-width")), s = o + i.height, u = r + i.width;
          break;
        }
      while (l = l.parentNode);
    if (a && e !== window) {
      var v = fn(l || e), g = v && v.a, f = v && v.d;
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
function ho(e, t, n) {
  for (var a = Ft(e, !0), l = Ve(e)[t]; a; ) {
    var i = Ve(a)[n], o = void 0;
    if (o = l >= i, !o) return a;
    if (a === vt()) break;
    a = Ft(a, !1);
  }
  return !1;
}
function hn(e, t, n, a) {
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
function di(e, t) {
  for (var n = e.lastElementChild; n && (n === Q.ghost || q(n, "display") === "none" || t && !ka(n, t)); )
    n = n.previousElementSibling;
  return n || null;
}
function ot(e, t) {
  var n = 0;
  if (!e || !e.parentNode)
    return -1;
  for (; e = e.previousElementSibling; )
    e.nodeName.toUpperCase() !== "TEMPLATE" && e !== Q.clone && (!t || ka(e, t)) && n++;
  return n;
}
function yo(e) {
  var t = 0, n = 0, a = vt();
  if (e)
    do {
      var l = fn(e), i = l.a, o = l.d;
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
function Ft(e, t) {
  if (!e || !e.getBoundingClientRect) return vt();
  var n = e, a = !1;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var l = q(n);
      if (n.clientWidth < n.scrollWidth && (l.overflowX == "auto" || l.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (l.overflowY == "auto" || l.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body) return vt();
        if (a || t) return n;
        a = !0;
      }
    }
  while (n = n.parentNode);
  return vt();
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
function us(e, t) {
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
function cs(e, t, n) {
  e.scrollLeft += t, e.scrollTop += n;
}
function ds(e) {
  var t = window.Polymer, n = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0);
}
function fs(e, t, n) {
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
            var i = yt({}, e[e.length - 1].rect);
            if (l.thisAnimationDuration) {
              var o = fn(l, !0);
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
        var s = 0, u = r.target, c = u.fromRect, d = Ve(u), m = u.prevFromRect, v = u.prevToRect, g = r.rect, f = fn(u, !0);
        f && (d.top -= f.f, d.left -= f.e), u.toRect = d, u.thisAnimationDuration && el(m, d) && !el(c, d) && // Make sure animatingRect is on line between toRect & fromRect
        (g.top - d.top) / (g.left - d.left) === (c.top - d.top) / (c.left - d.left) && (s = Ef(g, m, v, l.options)), el(d, c) || (u.prevFromRect = c, u.prevToRect = d, s || (s = l.options.animation), l.animate(u, g, d, s)), s && (i = !0, o = Math.max(o, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(t), i ? t = setTimeout(function() {
        typeof a == "function" && a();
      }, o) : typeof a == "function" && a(), e = [];
    },
    animate: function(a, l, i, o) {
      if (o) {
        q(a, "transition", ""), q(a, "transform", "");
        var r = fn(this.el), s = r && r.a, u = r && r.d, c = (l.left - i.left) / (s || 1), d = (l.top - i.top) / (u || 1);
        a.animatingX = !!c, a.animatingY = !!d, q(a, "transform", "translate3d(" + c + "px," + d + "px,0)"), this.forRepaintDummy = _f(a), q(a, "transition", "transform " + o + "ms" + (this.options.easing ? " " + this.options.easing : "")), q(a, "transform", "translate3d(0,0,0)"), typeof a.animated == "number" && clearTimeout(a.animated), a.animated = setTimeout(function() {
          q(a, "transition", ""), q(a, "transform", ""), a.animated = !1, a.animatingX = !1, a.animatingY = !1;
        }, o);
      }
    }
  };
}
function _f(e) {
  return e.offsetWidth;
}
function Ef(e, t, n, a) {
  return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * a.animation;
}
var ln = [], tl = {
  initializeByDefault: !0
}, Qn = {
  mount: function(t) {
    for (var n in tl)
      tl.hasOwnProperty(n) && !(n in t) && (t[n] = tl[n]);
    ln.forEach(function(a) {
      if (a.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), ln.push(t);
  },
  pluginEvent: function(t, n, a) {
    var l = this;
    this.eventCanceled = !1, a.cancel = function() {
      l.eventCanceled = !0;
    };
    var i = t + "Global";
    ln.forEach(function(o) {
      n[o.pluginName] && (n[o.pluginName][i] && n[o.pluginName][i](yt({
        sortable: n
      }, a)), n.options[o.pluginName] && n[o.pluginName][t] && n[o.pluginName][t](yt({
        sortable: n
      }, a)));
    });
  },
  initializePlugins: function(t, n, a, l) {
    ln.forEach(function(r) {
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
    return ln.forEach(function(l) {
      typeof l.eventProperties == "function" && Et(a, l.eventProperties.call(n[l.pluginName], t));
    }), a;
  },
  modifyOption: function(t, n, a) {
    var l;
    return ln.forEach(function(i) {
      t[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (l = i.optionListeners[n].call(t[i.pluginName], a));
    }), l;
  }
};
function Pf(e) {
  var t = e.sortable, n = e.rootEl, a = e.name, l = e.targetEl, i = e.cloneEl, o = e.toEl, r = e.fromEl, s = e.oldIndex, u = e.newIndex, c = e.oldDraggableIndex, d = e.newDraggableIndex, m = e.originalEvent, v = e.putSortable, g = e.extraEventProperties;
  if (t = t || n && n[Ge], !!t) {
    var f, h = t.options, b = "on" + a.charAt(0).toUpperCase() + a.substr(1);
    window.CustomEvent && !At && !qn ? f = new CustomEvent(a, {
      bubbles: !0,
      cancelable: !0
    }) : (f = document.createEvent("Event"), f.initEvent(a, !0, !0)), f.to = o || n, f.from = r || n, f.item = l || n, f.clone = i, f.oldIndex = s, f.newIndex = u, f.oldDraggableIndex = c, f.newDraggableIndex = d, f.originalEvent = m, f.pullMode = v ? v.lastPutMode : void 0;
    var y = yt(yt({}, g), Qn.getEventProperties(a, t));
    for (var _ in y)
      f[_] = y[_];
    n && n.dispatchEvent(f), h[b] && h[b].call(t, f);
  }
}
var Af = ["evt"], We = function(t, n) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, l = a.evt, i = wf(a, Af);
  Qn.pluginEvent.bind(Q)(t, n, yt({
    dragEl: L,
    parentEl: _e,
    ghostEl: ae,
    rootEl: Ce,
    nextEl: Gt,
    lastDownEl: ca,
    cloneEl: ke,
    cloneHidden: Dt,
    dragStarted: In,
    putSortable: Me,
    activeSortable: Q.active,
    originalEvent: l,
    oldIndex: un,
    oldDraggableIndex: Dn,
    newIndex: Qe,
    newDraggableIndex: Vt,
    hideGhostForTarget: hs,
    unhideGhostForTarget: ys,
    cloneNowHidden: function() {
      Dt = !0;
    },
    cloneNowShown: function() {
      Dt = !1;
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
  Pf(yt({
    putSortable: Me,
    cloneEl: ke,
    targetEl: L,
    rootEl: Ce,
    oldIndex: un,
    oldDraggableIndex: Dn,
    newIndex: Qe,
    newDraggableIndex: Vt
  }, e));
}
var L, _e, ae, Ce, Gt, ca, ke, Dt, un, Qe, Dn, Vt, na, Me, rn = !1, Ia = !1, _a = [], Ht, st, nl, al, bo, po, In, on, On, Bn = !1, aa = !1, da, $e, ll = [], Vl = !1, Ea = [], Ra = typeof document < "u", la = ci, wo = qn || At ? "cssFloat" : "float", Vf = Ra && !is && !ci && "draggable" in document.createElement("div"), vs = function() {
  if (Ra) {
    if (At)
      return !1;
    var e = document.createElement("x");
    return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
  }
}(), ms = function(t, n) {
  var a = q(t), l = parseInt(a.width) - parseInt(a.paddingLeft) - parseInt(a.paddingRight) - parseInt(a.borderLeftWidth) - parseInt(a.borderRightWidth), i = hn(t, 0, n), o = hn(t, 1, n), r = i && q(i), s = o && q(o), u = r && parseInt(r.marginLeft) + parseInt(r.marginRight) + Ve(i).width, c = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + Ve(o).width;
  if (a.display === "flex")
    return a.flexDirection === "column" || a.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (a.display === "grid")
    return a.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && r.float && r.float !== "none") {
    var d = r.float === "left" ? "left" : "right";
    return o && (s.clear === "both" || s.clear === d) ? "vertical" : "horizontal";
  }
  return i && (r.display === "block" || r.display === "flex" || r.display === "table" || r.display === "grid" || u >= l && a[wo] === "none" || o && a[wo] === "none" && u + c > l) ? "vertical" : "horizontal";
}, Tf = function(t, n, a) {
  var l = a ? t.left : t.top, i = a ? t.right : t.bottom, o = a ? t.width : t.height, r = a ? n.left : n.top, s = a ? n.right : n.bottom, u = a ? n.width : n.height;
  return l === r || i === s || l + o / 2 === r + u / 2;
}, Df = function(t, n) {
  var a;
  return _a.some(function(l) {
    var i = l[Ge].options.emptyInsertThreshold;
    if (!(!i || di(l))) {
      var o = Ve(l), r = t >= o.left - i && t <= o.right + i, s = n >= o.top - i && n <= o.bottom + i;
      if (r && s)
        return a = l;
    }
  }), a;
}, gs = function(t) {
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
  (!l || ua(l) != "object") && (l = {
    name: l
  }), a.name = l.name, a.checkPull = n(l.pull, !0), a.checkPut = n(l.put), a.revertClone = l.revertClone, t.group = a;
}, hs = function() {
  !vs && ae && q(ae, "display", "none");
}, ys = function() {
  !vs && ae && q(ae, "display", "");
};
Ra && !is && document.addEventListener("click", function(e) {
  if (Ia)
    return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Ia = !1, !1;
}, !0);
var Wt = function(t) {
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
      return ms(e, this.options);
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
    supportPointer: Q.supportPointer !== !1 && "PointerEvent" in window && (!Vn || ci),
    emptyInsertThreshold: 5
  };
  Qn.initializePlugins(this, e, n);
  for (var a in n)
    !(a in t) && (t[a] = n[a]);
  gs(t);
  for (var l in this)
    l.charAt(0) === "_" && typeof this[l] == "function" && (this[l] = this[l].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : Vf, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? ce(e, "pointerdown", this._onTapStart) : (ce(e, "mousedown", this._onTapStart), ce(e, "touchstart", this._onTapStart)), this.nativeDraggable && (ce(e, "dragover", this), ce(e, "dragenter", this)), _a.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Et(this, If());
}
Q.prototype = /** @lends Sortable.prototype */
{
  constructor: Q,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (on = null);
  },
  _getDirection: function(t, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, L) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var n = this, a = this.el, l = this.options, i = l.preventOnFilter, o = t.type, r = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, s = (r || t).target, u = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || s, c = l.filter;
      if (zf(a), !L && !(/mousedown|pointerdown/.test(o) && t.button !== 0 || l.disabled) && !u.isContentEditable && !(!this.nativeDraggable && Vn && s && s.tagName.toUpperCase() === "SELECT") && (s = ut(s, l.draggable, a, !1), !(s && s.animated) && ca !== s)) {
        if (un = ot(s), Dn = ot(s, l.draggable), typeof c == "function") {
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
      if (Ce = i, L = a, _e = L.parentNode, Gt = L.nextSibling, ca = a, na = o.group, Q.dragged = L, Ht = {
        target: L,
        clientX: (n || t).clientX,
        clientY: (n || t).clientY
      }, bo = Ht.clientX - u.left, po = Ht.clientY - u.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, L.style["will-change"] = "all", s = function() {
        if (We("delayEnded", l, {
          evt: t
        }), Q.eventCanceled) {
          l._onDrop();
          return;
        }
        l._disableDelayedDragEvents(), !mo && l.nativeDraggable && (L.draggable = !0), l._triggerDragStart(t, n), je({
          sortable: l,
          name: "choose",
          originalEvent: t
        }), qe(L, o.chosenClass, !0);
      }, o.ignore.split(",").forEach(function(c) {
        ss(L, c.trim(), il);
      }), ce(r, "dragover", Wt), ce(r, "mousemove", Wt), ce(r, "touchmove", Wt), o.supportPointer ? (ce(r, "pointerup", l._onDrop), !this.nativeDraggable && ce(r, "pointercancel", l._onDrop)) : (ce(r, "mouseup", l._onDrop), ce(r, "touchend", l._onDrop), ce(r, "touchcancel", l._onDrop)), mo && this.nativeDraggable && (this.options.touchStartThreshold = 4, L.draggable = !0), We("delayStart", this, {
        evt: t
      }), o.delay && (!o.delayOnTouchOnly || n) && (!this.nativeDraggable || !(qn || At))) {
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
      document.selection ? fa(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, n) {
    if (rn = !1, Ce && L) {
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
      this._lastX = st.clientX, this._lastY = st.clientY, hs();
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
        } while (n = rs(n));
      ys();
    }
  },
  _onTouchMove: function(t) {
    if (Ht) {
      var n = this.options, a = n.fallbackTolerance, l = n.fallbackOffset, i = t.touches ? t.touches[0] : t, o = ae && fn(ae, !0), r = ae && o && o.a, s = ae && o && o.d, u = la && $e && yo($e), c = (i.clientX - Ht.clientX + l.x) / (r || 1) + (u ? u[0] - ll[0] : 0) / (r || 1), d = (i.clientY - Ht.clientY + l.y) / (s || 1) + (u ? u[1] - ll[1] : 0) / (s || 1);
      if (!Q.active && !rn) {
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
      var t = this.options.fallbackOnBody ? document.body : Ce, n = Ve(L, !0, la, !0, t), a = this.options;
      if (la) {
        for ($e = t; q($e, "position") === "static" && q($e, "transform") === "none" && $e !== document; )
          $e = $e.parentNode;
        $e !== document.body && $e !== document.documentElement ? ($e === document && ($e = vt()), n.top += $e.scrollTop, n.left += $e.scrollLeft) : $e = vt(), ll = yo($e);
      }
      ae = L.cloneNode(!0), qe(ae, a.ghostClass, !1), qe(ae, a.fallbackClass, !0), qe(ae, a.dragClass, !0), q(ae, "transition", ""), q(ae, "transform", ""), q(ae, "box-sizing", "border-box"), q(ae, "margin", 0), q(ae, "top", n.top), q(ae, "left", n.left), q(ae, "width", n.width), q(ae, "height", n.height), q(ae, "opacity", "0.8"), q(ae, "position", la ? "absolute" : "fixed"), q(ae, "zIndex", "100000"), q(ae, "pointerEvents", "none"), Q.ghost = ae, t.appendChild(ae), q(ae, "transform-origin", bo / parseInt(ae.style.width) * 100 + "% " + po / parseInt(ae.style.height) * 100 + "%");
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
    We("setupClone", this), Q.eventCanceled || (ke = ds(L), ke.removeAttribute("id"), ke.draggable = !1, ke.style["will-change"] = "", this._hideClone(), qe(ke, this.options.chosenClass, !1), Q.clone = ke), a.cloneId = fa(function() {
      We("clone", a), !Q.eventCanceled && (a.options.removeCloneOnHide || Ce.insertBefore(ke, L), a._hideClone(), je({
        sortable: a,
        name: "clone"
      }));
    }), !n && qe(L, i.dragClass, !0), n ? (Ia = !0, a._loopId = setInterval(a._emulateDragOver, 50)) : (se(document, "mouseup", a._onDrop), se(document, "touchend", a._onDrop), se(document, "touchcancel", a._onDrop), l && (l.effectAllowed = "move", i.setData && i.setData.call(a, l, L)), ce(document, "drop", a), q(L, "transform", "translateZ(0)")), rn = !0, a._dragStartId = fa(a._dragStarted.bind(a, n, t)), ce(document, "selectstart", a), In = !0, window.getSelection().removeAllRanges(), Vn && q(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var n = this.el, a = t.target, l, i, o, r = this.options, s = r.group, u = Q.active, c = na === s, d = r.sort, m = Me || u, v, g = this, f = !1;
    if (Vl) return;
    function h(ne, me) {
      We(ne, g, yt({
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
          return ia(Ce, n, L, l, k, Ve(k), t, A);
        },
        changed: _
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
      }), g !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (a === L && !L.animated || a === n && !a.animated) && (on = null), !r.dragoverBubble && !t.rootEl && a !== document && (L.parentNode[Ge]._isOutsideThisEl(t.target), !ne && Wt(t)), !r.dragoverBubble && t.stopPropagation && t.stopPropagation(), f = !0;
    }
    function _() {
      Qe = ot(L), Vt = ot(L, r.draggable), je({
        sortable: g,
        name: "change",
        toEl: n,
        newIndex: Qe,
        newDraggableIndex: Vt,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), a = ut(a, r.draggable, n, !0), h("dragOver"), Q.eventCanceled) return f;
    if (L.contains(t.target) || a.animated && a.animatingX && a.animatingY || g._ignoreWhileAnimating === a)
      return y(!1);
    if (Ia = !1, u && !r.disabled && (c ? d || (o = _e !== Ce) : Me === this || (this.lastPutMode = na.checkPull(this, u, L, t)) && s.checkPut(this, u, L, t))) {
      if (v = this._getDirection(t, a) === "vertical", l = Ve(L), h("dragOverValid"), Q.eventCanceled) return f;
      if (o)
        return _e = Ce, b(), this._hideClone(), h("revert"), Q.eventCanceled || (Gt ? Ce.insertBefore(L, Gt) : Ce.appendChild(L)), y(!0);
      var w = di(n, r.draggable);
      if (!w || Mf(t, v, this) && !w.animated) {
        if (w === L)
          return y(!1);
        if (w && n === t.target && (a = w), a && (i = Ve(a)), ia(Ce, n, L, l, a, i, t, !!a) !== !1)
          return b(), w && w.nextSibling ? n.insertBefore(L, w.nextSibling) : n.appendChild(L), _e = n, _(), y(!0);
      } else if (w && Lf(t, v, this)) {
        var I = hn(n, 0, r, !0);
        if (I === L)
          return y(!1);
        if (a = I, i = Ve(a), ia(Ce, n, L, l, a, i, t, !1) !== !1)
          return b(), n.insertBefore(L, I), _e = n, _(), y(!0);
      } else if (a.parentNode === n) {
        i = Ve(a);
        var T = 0, E, P = L.parentNode !== n, R = !Tf(L.animated && L.toRect || l, a.animated && a.toRect || i, v), Y = v ? "top" : "left", j = ho(a, "top", "top") || ho(L, "top", "top"), O = j ? j.scrollTop : void 0;
        on !== a && (E = i[Y], Bn = !1, aa = !R && r.invertSwap || P), T = Rf(t, a, i, v, R ? 1 : r.swapThreshold, r.invertedSwapThreshold == null ? r.swapThreshold : r.invertedSwapThreshold, aa, on === a);
        var B;
        if (T !== 0) {
          var F = ot(L);
          do
            F -= T, B = _e.children[F];
          while (B && (q(B, "display") === "none" || B === ae));
        }
        if (T === 0 || B === a)
          return y(!1);
        on = a, On = T;
        var N = a.nextElementSibling, H = !1;
        H = T === 1;
        var te = ia(Ce, n, L, l, a, i, t, H);
        if (te !== !1)
          return (te === 1 || te === -1) && (H = te === 1), Vl = !0, setTimeout(Ff, 30), b(), H && !N ? n.appendChild(L) : a.parentNode.insertBefore(L, H ? N : a), j && cs(j, 0, O - j.scrollTop), _e = L.parentNode, E !== void 0 && !aa && (da = Math.abs(E - Ve(a)[Y])), _(), y(!0);
      }
      if (n.contains(L))
        return y(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    se(document, "mousemove", this._onTouchMove), se(document, "touchmove", this._onTouchMove), se(document, "pointermove", this._onTouchMove), se(document, "dragover", Wt), se(document, "mousemove", Wt), se(document, "touchmove", Wt);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    se(t, "mouseup", this._onDrop), se(t, "touchend", this._onDrop), se(t, "pointerup", this._onDrop), se(t, "pointercancel", this._onDrop), se(t, "touchcancel", this._onDrop), se(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var n = this.el, a = this.options;
    if (Qe = ot(L), Vt = ot(L, a.draggable), We("drop", this, {
      evt: t
    }), _e = L && L.parentNode, Qe = ot(L), Vt = ot(L, a.draggable), Q.eventCanceled) {
      this._nulling();
      return;
    }
    rn = !1, aa = !1, Bn = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Tl(this.cloneId), Tl(this._dragStartId), this.nativeDraggable && (se(document, "drop", this), se(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Vn && q(document.body, "user-select", ""), q(L, "transform", ""), t && (In && (t.cancelable && t.preventDefault(), !a.dropBubble && t.stopPropagation()), ae && ae.parentNode && ae.parentNode.removeChild(ae), (Ce === _e || Me && Me.lastPutMode !== "clone") && ke && ke.parentNode && ke.parentNode.removeChild(ke), L && (this.nativeDraggable && se(L, "dragend", this), il(L), L.style["will-change"] = "", In && !rn && qe(L, Me ? Me.options.ghostClass : this.options.ghostClass, !1), qe(L, this.options.chosenClass, !1), je({
      sortable: this,
      name: "unchoose",
      toEl: _e,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Ce !== _e ? (Qe >= 0 && (je({
      rootEl: _e,
      name: "add",
      toEl: _e,
      fromEl: Ce,
      originalEvent: t
    }), je({
      sortable: this,
      name: "remove",
      toEl: _e,
      originalEvent: t
    }), je({
      rootEl: _e,
      name: "sort",
      toEl: _e,
      fromEl: Ce,
      originalEvent: t
    }), je({
      sortable: this,
      name: "sort",
      toEl: _e,
      originalEvent: t
    })), Me && Me.save()) : Qe !== un && Qe >= 0 && (je({
      sortable: this,
      name: "update",
      toEl: _e,
      originalEvent: t
    }), je({
      sortable: this,
      name: "sort",
      toEl: _e,
      originalEvent: t
    })), Q.active && ((Qe == null || Qe === -1) && (Qe = un, Vt = Dn), je({
      sortable: this,
      name: "end",
      toEl: _e,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    We("nulling", this), Ce = L = _e = ae = Gt = ke = ca = Dt = Ht = st = In = Qe = Vt = un = Dn = on = On = Me = na = Q.dragged = Q.ghost = Q.clone = Q.active = null, Ea.forEach(function(t) {
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
    var l = Qn.modifyOption(this, t, n);
    typeof l < "u" ? a[t] = l : a[t] = n, t === "group" && gs(a);
  },
  /**
   * Destroy
   */
  destroy: function() {
    We("destroy", this);
    var t = this.el;
    t[Ge] = null, se(t, "mousedown", this._onTapStart), se(t, "touchstart", this._onTapStart), se(t, "pointerdown", this._onTapStart), this.nativeDraggable && (se(t, "dragover", this), se(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), _a.splice(_a.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!Dt) {
      if (We("hideClone", this), Q.eventCanceled) return;
      q(ke, "display", "none"), this.options.removeCloneOnHide && ke.parentNode && ke.parentNode.removeChild(ke), Dt = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Dt) {
      if (We("showClone", this), Q.eventCanceled) return;
      L.parentNode == Ce && !this.options.group.revertClone ? Ce.insertBefore(ke, L) : Gt ? Ce.insertBefore(ke, Gt) : Ce.appendChild(ke), this.options.group.revertClone && this.animate(L, ke), q(ke, "display", ""), Dt = !1;
    }
  }
};
function Bf(e) {
  e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
}
function ia(e, t, n, a, l, i, o, r) {
  var s, u = e[Ge], c = u.options.onMove, d;
  return window.CustomEvent && !At && !qn ? s = new CustomEvent("move", {
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
  var a = Ve(hn(n.el, 0, n.options, !0)), l = fs(n.el, n.options, ae), i = 10;
  return t ? e.clientX < l.left - i || e.clientY < a.top && e.clientX < a.right : e.clientY < l.top - i || e.clientY < a.bottom && e.clientX < a.left;
}
function Mf(e, t, n) {
  var a = Ve(di(n.el, n.options.draggable)), l = fs(n.el, n.options, ae), i = 10;
  return t ? e.clientX > l.right + i || e.clientY > a.bottom && e.clientX > a.left : e.clientY > l.bottom + i || e.clientX > a.right && e.clientY > a.top;
}
function Rf(e, t, n, a, l, i, o, r) {
  var s = a ? e.clientY : e.clientX, u = a ? n.height : n.width, c = a ? n.top : n.left, d = a ? n.bottom : n.right, m = !1;
  if (!o) {
    if (r && da < u * l) {
      if (!Bn && (On === 1 ? s > c + u * i / 2 : s < d - u * i / 2) && (Bn = !0), Bn)
        m = !0;
      else if (On === 1 ? s < c + da : s > d - da)
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
function fa(e) {
  return setTimeout(e, 0);
}
function Tl(e) {
  return clearTimeout(e);
}
Ra && ce(document, "touchmove", function(e) {
  (Q.active || rn) && e.cancelable && e.preventDefault();
});
Q.utils = {
  on: ce,
  off: se,
  css: q,
  find: ss,
  is: function(t, n) {
    return !!ut(t, n, t, !1);
  },
  extend: xf,
  throttle: us,
  closest: ut,
  toggleClass: qe,
  clone: ds,
  index: ot,
  nextTick: fa,
  cancelNextTick: Tl,
  detectDirection: ms,
  getChild: hn,
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
    a.utils && (Q.utils = yt(yt({}, Q.utils), a.utils)), Qn.mount(a);
  });
};
Q.create = function(e, t) {
  return new Q(e, t);
};
Q.version = Sf;
var Ae = [], _n, Dl, Ol = !1, ol, rl, Pa, En;
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
      this.sortable.nativeDraggable ? se(document, "dragover", this._handleAutoScroll) : (se(document, "pointermove", this._handleFallbackAutoScroll), se(document, "touchmove", this._handleFallbackAutoScroll), se(document, "mousemove", this._handleFallbackAutoScroll)), So(), va(), kf();
    },
    nulling: function() {
      Pa = Dl = _n = Ol = En = ol = rl = null, Ae.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, !0);
    },
    _handleAutoScroll: function(n, a) {
      var l = this, i = (n.touches ? n.touches[0] : n).clientX, o = (n.touches ? n.touches[0] : n).clientY, r = document.elementFromPoint(i, o);
      if (Pa = n, a || this.options.forceAutoScrollFallback || qn || At || Vn) {
        sl(n, this.options, r, a);
        var s = Ft(r, !0);
        Ol && (!En || i !== ol || o !== rl) && (En && So(), En = setInterval(function() {
          var u = Ft(document.elementFromPoint(i, o), !0);
          u !== s && (s = u, va()), sl(n, l.options, u, a);
        }, 10), ol = i, rl = o);
      } else {
        if (!this.options.bubbleScroll || Ft(r, !0) === vt()) {
          va();
          return;
        }
        sl(n, this.options, Ft(r, !1), !1);
      }
    }
  }, Et(e, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function va() {
  Ae.forEach(function(e) {
    clearInterval(e.pid);
  }), Ae = [];
}
function So() {
  clearInterval(En);
}
var sl = us(function(e, t, n, a) {
  if (t.scroll) {
    var l = (e.touches ? e.touches[0] : e).clientX, i = (e.touches ? e.touches[0] : e).clientY, o = t.scrollSensitivity, r = t.scrollSpeed, s = vt(), u = !1, c;
    Dl !== n && (Dl = n, va(), _n = t.scroll, c = t.scrollFn, _n === !0 && (_n = Ft(n, !0)));
    var d = 0, m = _n;
    do {
      var v = m, g = Ve(v), f = g.top, h = g.bottom, b = g.left, y = g.right, _ = g.width, w = g.height, I = void 0, T = void 0, E = v.scrollWidth, P = v.scrollHeight, R = q(v), Y = v.scrollLeft, j = v.scrollTop;
      v === s ? (I = _ < E && (R.overflowX === "auto" || R.overflowX === "scroll" || R.overflowX === "visible"), T = w < P && (R.overflowY === "auto" || R.overflowY === "scroll" || R.overflowY === "visible")) : (I = _ < E && (R.overflowX === "auto" || R.overflowX === "scroll"), T = w < P && (R.overflowY === "auto" || R.overflowY === "scroll"));
      var O = I && (Math.abs(y - l) <= o && Y + _ < E) - (Math.abs(b - l) <= o && !!Y), B = T && (Math.abs(h - i) <= o && j + w < P) - (Math.abs(f - i) <= o && !!j);
      if (!Ae[d])
        for (var F = 0; F <= d; F++)
          Ae[F] || (Ae[F] = {});
      (Ae[d].vx != O || Ae[d].vy != B || Ae[d].el !== v) && (Ae[d].el = v, Ae[d].vx = O, Ae[d].vy = B, clearInterval(Ae[d].pid), (O != 0 || B != 0) && (u = !0, Ae[d].pid = setInterval((function() {
        a && this.layer === 0 && Q.active._onTouchMove(Pa);
        var N = Ae[this.layer].vy ? Ae[this.layer].vy * r : 0, H = Ae[this.layer].vx ? Ae[this.layer].vx * r : 0;
        typeof c == "function" && c.call(Q.dragged.parentNode[Ge], H, N, e, Pa, Ae[this.layer].el) !== "continue" || cs(Ae[this.layer].el, H, N);
      }).bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && m !== s && (m = Ft(m, !1)));
    Ol = u;
  }
}, 30), bs = function(t) {
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
function fi() {
}
fi.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var n = t.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(t) {
    var n = t.dragEl, a = t.putSortable;
    this.sortable.captureAnimationState(), a && a.captureAnimationState();
    var l = hn(this.sortable.el, this.startIndex, this.options);
    l ? this.sortable.el.insertBefore(n, l) : this.sortable.el.appendChild(n), this.sortable.animateAll(), a && a.animateAll();
  },
  drop: bs
};
Et(fi, {
  pluginName: "revertOnSpill"
});
function vi() {
}
vi.prototype = {
  onSpill: function(t) {
    var n = t.dragEl, a = t.putSortable, l = a || this.sortable;
    l.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), l.animateAll();
  },
  drop: bs
};
Et(vi, {
  pluginName: "removeOnSpill"
});
Q.mount(new jf());
Q.mount(vi, fi);
const Hf = { ref: "items" }, Wf = /* @__PURE__ */ jn({
  __name: "IndexManagePanel",
  props: {
    list: {},
    titleReadonly: { type: Boolean },
    idProp: {},
    titleProp: {}
  },
  setup(e) {
    const t = e, n = Ds("items");
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
      return dn(), oa("div", Hf, [
        (dn(!0), oa(Se, null, Os(t.list, (r) => (dn(), oa("div", {
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
}, Kf = /* @__PURE__ */ Gf(Wf, [["__scopeId", "data-v-9990c78f"]]), Uf = /* @__PURE__ */ jn({
  __name: "IndexManageDialog",
  props: {
    list: {},
    titleReadonly: { type: Boolean },
    idProp: {},
    titleProp: {}
  },
  setup(e) {
    const t = e, n = J(!1);
    return (a, l) => (dn(), ko(le(as), {
      "max-width": "600",
      "scroll-strategy": "none",
      modelValue: n.value,
      "onUpdate:modelValue": l[2] || (l[2] = (i) => n.value = i),
      scrollable: ""
    }, {
      activator: ct(() => [
        p(le(Bt), {
          icon: "md:edit",
          variant: "plain",
          onClick: l[0] || (l[0] = (i) => n.value = !0),
          title: "Manage Configs"
        })
      ]),
      default: ct(() => [
        p(le(ls), null, {
          default: ct(() => [
            p(le(ui), { class: "flex-grow-1" }, {
              default: ct(() => [
                p(Kf, Bs(Fs(t)), null, 16)
              ]),
              _: 1
            }),
            p(le(si), null, {
              default: ct(() => [
                p(le(Bt), {
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
}), Yf = { class: "d-flex flex-column ga-4" }, Xf = { class: "w-100 d-flex flex-row flex-wrap" }, qf = /* @__PURE__ */ jn({
  __name: "APIConfigPanel",
  setup(e) {
    const t = hl.injectOrCreate(), n = t.config, a = t.idList, l = t.selectedIndex;
    function i(o) {
      o && typeof o == "object" && "id" in o && t.selectConfig(o.id);
    }
    return (o, r) => {
      const s = cl("v-spacer");
      return dn(), oa("div", Yf, [
        C("div", Xf, [
          p(le(Bt), {
            icon: "md:backup",
            variant: "plain",
            onClick: r[0] || (r[0] = (u) => le(t).saveBackup()),
            title: "Upload to drive"
          }),
          p(le(Bt), {
            icon: "md:cloud_download",
            variant: "plain",
            onClick: r[1] || (r[1] = (u) => le(t).loadBackup()),
            title: "Download from drive"
          }),
          p(s),
          p(Uf, {
            list: le(a),
            idProp: "id",
            titleProp: "name"
          }, null, 8, ["list"]),
          p(le(Bt), {
            icon: "md:note_add",
            variant: "plain",
            onClick: r[2] || (r[2] = (u) => le(t).addConfig()),
            title: "Add config"
          }),
          p(le(Bt), {
            icon: "md:delete",
            variant: "plain",
            onClick: r[3] || (r[3] = (u) => le(t).deleteConfig()),
            title: "Delete config"
          })
        ]),
        p(le(yf), {
          variant: "outlined",
          "model-value": le(l),
          items: le(a),
          "item-title": "name",
          "item-value": "id",
          "onUpdate:modelValue": i,
          "hide-details": ""
        }, null, 8, ["model-value", "items"]),
        p(le(Xt), {
          variant: "outlined",
          label: "BaseURL",
          modelValue: le(n).baseURL,
          "onUpdate:modelValue": r[4] || (r[4] = (u) => le(n).baseURL = u),
          class: "flex-grow-0",
          "hide-details": ""
        }, null, 8, ["modelValue"]),
        p(le(Xt), {
          variant: "outlined",
          label: "ApiKey",
          type: "password",
          modelValue: le(n).apiKey,
          "onUpdate:modelValue": r[5] || (r[5] = (u) => le(n).apiKey = u),
          class: "flex-grow-0",
          "hide-details": ""
        }, null, 8, ["modelValue"]),
        p(le(Xt), {
          variant: "outlined",
          label: "Model",
          modelValue: le(n).model,
          "onUpdate:modelValue": r[6] || (r[6] = (u) => le(n).model = u),
          class: "flex-grow-0",
          "hide-details": ""
        }, null, 8, ["modelValue"])
      ]);
    };
  }
}), ev = /* @__PURE__ */ jn({
  __name: "APIConfigDialog",
  setup(e) {
    const t = J(!1);
    return (n, a) => (dn(), ko(le(as), {
      "max-width": "600",
      "scroll-strategy": "none",
      modelValue: t.value,
      "onUpdate:modelValue": a[2] || (a[2] = (l) => t.value = l),
      scrollable: ""
    }, {
      activator: ct(() => [
        p(le(Bt), {
          class: "text-none",
          "prepend-icon": "md:settings",
          variant: "outlined",
          onClick: a[0] || (a[0] = (l) => t.value = !0),
          text: "Config API"
        })
      ]),
      default: ct(() => [
        p(le(ls), null, {
          default: ct(() => [
            p(le(ui), { class: "flex-grow-1" }, {
              default: ct(() => [
                p(qf)
              ]),
              _: 1
            }),
            p(le(si), null, {
              default: ct(() => [
                p(le(Bt), {
                  class: "text-none w-100",
                  text: "Done",
                  onClick: a[1] || (a[1] = (l) => t.value = !1)
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
});
export {
  ev as APIConfigDialog,
  qf as APIConfigPanel,
  Eo as APIConfigStore,
  hl as APIConfigViewModel,
  Xs as DBDataFlow,
  Uf as IndexManageDialog,
  Kf as IndexManagePanel,
  Ys as SharedFlow,
  Qs as SharedStore,
  Pn as apiConfig,
  Ao as authorizeDrive,
  qs as cachedDB,
  tu as createDriveTextFile,
  Zf as deleteDriveFile,
  eu as getDriveFile,
  To as getDriveFileID,
  au as getSimpleDriveFile,
  Zs as listDriveFiles,
  Po as loadGoogleAuth,
  Vo as logoutToken,
  lu as setSimpleDriveFile,
  nu as updateDriveTextFile,
  za as useSharedFlow
};
