/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, X = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tt = Symbol(), at = /* @__PURE__ */ new WeakMap();
let yt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = at.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && at.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const wt = (n) => new yt(typeof n == "string" ? n : n + "", void 0, tt), At = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new yt(e, n, tt);
}, St = (n, t) => {
  if (X) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = D.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, rt = X ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return wt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: Mt, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: Ht, getOwnPropertySymbols: Pt, getPrototypeOf: zt } = Object, g = globalThis, nt = g.trustedTypes, Nt = nt ? nt.emptyScript : "", B = g.reactiveElementPolyfillSupport, C = (n, t) => n, Q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Nt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, gt = (n, t) => !Et(n, t), ot = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: gt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ot) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Mt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const l = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = zt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, i = [...Ht(e), ...Pt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(rt(s));
    } else t !== void 0 && e.push(rt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return St(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var r;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((r = i.converter) == null ? void 0 : r.toAttribute) !== void 0 ? i.converter : Q).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r, a;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), o = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((r = l.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? l.converter : Q;
      this._$Em = s;
      const h = o.fromAttribute(e, l.type);
      this[s] = h ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var a;
    if (t !== void 0) {
      const l = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? gt)(r, e) || i.useDefault && i.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, a] of s) {
        const { wrapped: l } = a, o = this[r];
        l !== !0 || this._$AL.has(r) || o === void 0 || this.C(r, void 0, a, o);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[C("elementProperties")] = /* @__PURE__ */ new Map(), w[C("finalized")] = /* @__PURE__ */ new Map(), B == null || B({ ReactiveElement: w }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, lt = (n) => n, L = H.trustedTypes, ht = L ? L.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, bt = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, _t = "?" + y, Rt = `<${_t}>`, k = document, N = () => k.createComment(""), R = (n) => n === null || typeof n != "object" && typeof n != "function", et = Array.isArray, Ot = (n) => et(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", Z = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, dt = />/g, _ = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, ut = /"/g, $t = /^(?:script|style|textarea|title)$/i, vt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), c = vt(1), jt = vt(2), A = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), mt = /* @__PURE__ */ new WeakMap(), $ = k.createTreeWalker(k, 129);
function kt(n, t) {
  if (!et(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ht !== void 0 ? ht.createHTML(t) : t;
}
const It = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = M;
  for (let l = 0; l < e; l++) {
    const o = n[l];
    let h, u, d = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, u = a.exec(o), u !== null); ) m = a.lastIndex, a === M ? u[1] === "!--" ? a = ct : u[1] !== void 0 ? a = dt : u[2] !== void 0 ? ($t.test(u[2]) && (s = RegExp("</" + u[2], "g")), a = _) : u[3] !== void 0 && (a = _) : a === _ ? u[0] === ">" ? (a = s ?? M, d = -1) : u[1] === void 0 ? d = -2 : (d = a.lastIndex - u[2].length, h = u[1], a = u[3] === void 0 ? _ : u[3] === '"' ? ut : pt) : a === ut || a === pt ? a = _ : a === ct || a === dt ? a = M : (a = _, s = void 0);
    const f = a === _ && n[l + 1].startsWith("/>") ? " " : "";
    r += a === M ? o + Rt : d >= 0 ? (i.push(h), o.slice(0, d) + bt + o.slice(d) + y + f) : o + y + (d === -2 ? l : f);
  }
  return [kt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class O {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const l = t.length - 1, o = this.parts, [h, u] = It(t, e);
    if (this.el = O.createElement(h, i), $.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = $.nextNode()) !== null && o.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(bt)) {
          const m = u[a++], f = s.getAttribute(d).split(y), b = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: r, name: b[2], strings: f, ctor: b[1] === "." ? Ut : b[1] === "?" ? Dt : b[1] === "@" ? Lt : V }), s.removeAttribute(d);
        } else d.startsWith(y) && (o.push({ type: 6, index: r }), s.removeAttribute(d));
        if ($t.test(s.tagName)) {
          const d = s.textContent.split(y), m = d.length - 1;
          if (m > 0) {
            s.textContent = L ? L.emptyScript : "";
            for (let f = 0; f < m; f++) s.append(d[f], N()), $.nextNode(), o.push({ type: 2, index: ++r });
            s.append(d[m], N());
          }
        }
      } else if (s.nodeType === 8) if (s.data === _t) o.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(y, d + 1)) !== -1; ) o.push({ type: 7, index: r }), d += y.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(n, t, e = n, i) {
  var a, l;
  if (t === A) return t;
  let s = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const r = R(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = S(n, s._$AS(n, t.values), s, i)), t;
}
class Tt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    $.currentNode = s;
    let r = $.nextNode(), a = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let h;
        o.type === 2 ? h = new j(r, r.nextSibling, this, t) : o.type === 1 ? h = new o.ctor(r, o.name, o.strings, this, t) : o.type === 6 && (h = new qt(r, this, t)), this._$AV.push(h), o = i[++l];
      }
      a !== (o == null ? void 0 : o.index) && (r = $.nextNode(), a++);
    }
    return $.currentNode = k, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class j {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), R(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ot(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && R(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = O.createElement(kt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const a = new Tt(s, this), l = a.u(this.options);
      a.p(e), this.T(l), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = mt.get(t.strings);
    return e === void 0 && mt.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    et(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new j(this.O(N()), this.O(N()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = lt(t).nextSibling;
      lt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class V {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = S(this, t, e, 0), a = !R(t) || t !== this._$AH && t !== A, a && (this._$AH = t);
    else {
      const l = t;
      let o, h;
      for (t = r[0], o = 0; o < r.length - 1; o++) h = S(this, l[i + o], e, o), h === A && (h = this._$AH[o]), a || (a = !R(h) || h !== this._$AH[o]), h === p ? t = p : t !== p && (t += (h ?? "") + r[o + 1]), this._$AH[o] = h;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ut extends V {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Dt extends V {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Lt extends V {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? p) === A) return;
    const i = this._$AH, s = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class qt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const F = H.litHtmlPolyfillSupport;
F == null || F(O, j), (H.litHtmlVersions ?? (H.litHtmlVersions = [])).push("3.3.3");
const Wt = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new j(t.insertBefore(N(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const v = globalThis;
class P extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Wt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return A;
  }
}
var ft;
P._$litElement$ = !0, P.finalized = !0, (ft = v.litElementHydrateSupport) == null || ft.call(v, { LitElement: P });
const G = v.litElementPolyfillSupport;
G == null || G({ LitElement: P });
(v.litElementVersions ?? (v.litElementVersions = [])).push("4.2.2");
const Vt = {
  play: "M8 5L19 12L8 19Z",
  pause: "M7 5H10V19H7ZM14 5H17V19H14Z",
  previous: "M6 5V19M18 5L8 12L18 19Z",
  next: "M18 5V19M6 5L16 12L6 19Z",
  shuffle: "M3 6H5C10 6 14 18 19 18H21M17 14L21 18L17 22M3 18H5C7 18 8 16 9 14M14 9C16 6 17 6 21 6M17 2L21 6L17 10",
  devices: "M3 4H17V14H3ZM8 14V18M5 18H11M16 10H22V21H16Z",
  queue: "M3 6H21M3 12H15M3 18H11M18 15L22 18L18 21Z"
};
function x(n) {
  return jt`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d=${Vt[n]} /></svg>`;
}
const K = [
  "Home",
  "Zoeken",
  "Bibliotheek",
  "Afspeellijsten",
  "Favorieten",
  "Recent afgespeeld",
  "Radio",
  "Wachtrij",
  "Instellingen"
], Bt = [
  "Qmusic",
  "Qmusic 90s & 00s",
  "Radio 538",
  "Radio Veronica",
  "Sky Radio",
  "NPO Radio 2"
];
function z(n, t, e = []) {
  return ["metz", ...e].some(
    (i) => i.trim() && `${n} ${t}`.toLocaleLowerCase().includes(i.toLocaleLowerCase().trim())
  );
}
function xt(n) {
  return typeof n == "string" && (/^https?:\/\//i.test(n) || /^\/(?!\/)/.test(n)) ? n : "";
}
function T(n, t = 0) {
  var i, s, r, a, l, o;
  const e = n.track ?? n.media_item ?? (!n.uri && !n.media_content_id && n.album ? n.album : n);
  return {
    id: e.id ?? e.item_id ?? e.uri ?? e.media_content_id ?? "",
    uri: e.uri ?? e.media_content_id ?? "",
    title: e.name ?? e.title ?? "Onbekend",
    artist: Array.isArray(e.artists) ? e.artists.map((h) => typeof h == "string" ? h : h.name).join(", ") : e.artist ?? "",
    album: typeof e.album == "string" ? e.album : ((i = e.album) == null ? void 0 : i.name) ?? "",
    image: xt(
      e.image ?? e.image_url ?? e.thumbnail ?? ((r = (s = e.images) == null ? void 0 : s[0]) == null ? void 0 : r.url) ?? ((o = (l = (a = e.album) == null ? void 0 : a.images) == null ? void 0 : l[0]) == null ? void 0 : o.url)
    ),
    duration: e.duration_ms ? e.duration_ms / 1e3 : e.duration ?? 0,
    kind: e.type ?? e.media_type ?? e.media_content_type ?? "track",
    position: t,
    playable: !!(e.uri ?? e.media_content_id) && e.available !== !1 && e.is_playable !== !1 && !e.is_local && e.can_play !== !1,
    browsable: e.can_expand ?? ["playlist", "album", "artist", "show", "podcast"].includes(
      e.type ?? e.media_type
    )
  };
}
function J(n) {
  const t = Math.max(0, Math.floor(Number(n) || 0));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function U(n) {
  const t = (n == null ? void 0 : n.attributes) ?? {}, e = (n == null ? void 0 : n.state) === "playing" && t.media_position_updated_at ? Math.max(
    0,
    (Date.now() - Date.parse(t.media_position_updated_at)) / 1e3
  ) : 0;
  return Math.min(
    t.media_duration || 1 / 0,
    Math.max(
      0,
      (t.media_position || 0) + (Number.isFinite(e) ? e : 0)
    )
  );
}
class Zt {
  constructor(t, e) {
    this.hass = t, this.config = e, this.cooldown = 0, this.cache = /* @__PURE__ */ new Map();
  }
  has(t, e) {
    var i;
    return !!((i = this.hass.services[t]) != null && i[e]);
  }
  async call(t, e, i = {}, s = !1, r) {
    if (Date.now() < this.cooldown)
      throw new Error(
        "API-limiet bereikt. Wacht een minuut voordat je opnieuw probeert."
      );
    if (!this.has(t, e))
      throw new Error(
        `Actie ${t}.${e} ontbreekt in jouw installatie. Werk de integratie bij of gebruik de oorspronkelijke integratiekaart.`
      );
    return s ? (await this.hass.callWS({
      type: "call_service",
      domain: t,
      service: e,
      service_data: i,
      ...r ? { target: r } : {},
      return_response: !0
    })).response ?? {} : (await this.hass.callService(t, e, i, r), {});
  }
  async read(t, e, i = {}, s) {
    const r = JSON.stringify([t, e, i, s]), a = this.cache.get(r);
    if (a && a.until > Date.now()) return a.value;
    const l = this.call(t, e, i, !0, s).catch((o) => {
      throw /429|rate.?limit|too many/i.test(String((o == null ? void 0 : o.message) ?? o)) && (this.cooldown = Date.now() + 6e4), o;
    });
    this.cache.set(r, { until: Date.now() + 3e4, value: l }), this.cache.size > 100 && this.cache.delete(this.cache.keys().next().value);
    try {
      return await l;
    } catch (o) {
      throw this.cache.delete(r), o;
    }
  }
  sp(t, e = {}, i = !1) {
    return i ? this.read("spotifyplus", t, {
      entity_id: this.config.spotify_entity,
      ...e
    }) : this.call("spotifyplus", t, {
      entity_id: this.config.spotify_entity,
      ...e
    });
  }
  async spotify(t, e, i, s = 0, r) {
    var f, b, it, st;
    let a = "get_playlist_favorites", l = { limit: 50, offset: Number(s) || 0 };
    if (r) {
      const E = {
        playlist: ["get_playlist_items", "playlist_id"],
        album: ["get_album_tracks", "album_id"],
        artist: ["get_artist_top_tracks", "artist_id"],
        show: ["get_show_episodes", "show_id"]
      }[r.kind];
      if (!E)
        throw new Error(
          "Deze collectie kan niet via SpotifyPlus worden geopend."
        );
      a = E[0], l[E[1]] = r.id, r.kind === "artist" && (l = { artist_id: r.id });
    } else i ? (a = "search_all", l = {
      criteria: i,
      criteria_type: "album,artist,playlist,track,show,episode",
      limit_total: 50
    }) : t === "Wachtrij" ? (a = "get_player_queue_info", l = {}) : t === "Recent afgespeeld" ? (a = "get_player_recent_tracks", l = { limit: 50, ...s ? { before: Number(s) } : {} }) : e === "track" || t === "Favorieten" ? a = "get_track_favorites" : e === "album" ? a = "get_album_favorites" : e === "artist" ? (a = "get_artists_followed", l = { limit: 50, ...s ? { after: s } : {} }) : e === "show" && (a = "get_show_favorites");
    const h = (await this.sp(a, l, !0)).result;
    if (h == null)
      throw new Error(
        "Onbekend SpotifyPlus-responseformaat: result ontbreekt."
      );
    let u = [];
    if (i)
      for (const I of [
        "albums",
        "artists",
        "playlists",
        "tracks",
        "shows",
        "episodes"
      ])
        u.push(...((f = h[I]) == null ? void 0 : f.items) ?? []);
    else
      u = Array.isArray(h) ? h : h.items ?? ((b = h.artists) == null ? void 0 : b.items) ?? h.queue ?? [];
    const d = h.artists ?? h, m = ((it = d.cursors) == null ? void 0 : it.after) ?? (t === "Recent afgespeeld" ? (st = d.cursors) == null ? void 0 : st.before : void 0);
    return {
      items: u.map(
        (I, E) => T(
          I,
          (t === "Recent afgespeeld" ? 0 : Number(s) || 0) + E
        )
      ),
      more: !i && t !== "Wachtrij" && (r == null ? void 0 : r.kind) !== "artist" && (!!d.next || !!m && u.length === 50),
      total: d.total,
      next: m
    };
  }
  async maEntry() {
    if (this.config.ma_config_entry_id) return this.config.ma_config_entry_id;
    const e = (await this.hass.callWS({
      type: "config/entity_registry/list"
    })).find(
      (i) => {
        var s;
        return i.entity_id === ((s = this.config.ma_players[0]) == null ? void 0 : s.entity) && i.platform === "music_assistant";
      }
    );
    if (!(e != null && e.config_entry_id))
      throw new Error(
        "Stel ma_config_entry_id in voor Music Assistant zoeken en bibliotheek."
      );
    return e.config_entry_id;
  }
  async ma(t, e, i, s, r, a) {
    if (a)
      return {
        items: ((await this.hass.callWS({
          type: "media_player/browse_media",
          entity_id: r,
          media_content_id: a.uri,
          media_content_type: a.kind
        })).children ?? []).map((d, m) => T(d, m)),
        more: !1
      };
    if (t === "Wachtrij") {
      const u = await this.read(
        "music_assistant",
        "get_queue",
        {},
        { entity_id: r }
      ), d = u[r] ?? u;
      return {
        items: [d.current_item, d.next_item].filter(Boolean).map(T),
        more: !1,
        note: `${d.items ?? 0} items. De HA-API geeft alleen het huidige en volgende item terug; de volledige wachtrij staat in Music Assistant.`
      };
    }
    const l = await this.maEntry();
    let o;
    i ? o = await this.read("music_assistant", "search", {
      config_entry_id: l,
      name: i,
      media_type: t === "Radio" ? ["radio"] : ["track", "album", "artist", "playlist", "radio"],
      limit: 50
    }) : o = await this.read("music_assistant", "get_library", {
      config_entry_id: l,
      media_type: t === "Radio" ? "radio" : e,
      ...t === "Favorieten" ? { favorite: !0 } : {},
      ...t === "Recent afgespeeld" ? { order_by: "last_played_desc" } : {},
      limit: 50,
      offset: s
    });
    const h = i ? Object.values(o).filter(Array.isArray).flat() : o.items ?? [];
    return {
      items: h.map((u, d) => T(u, s + d)),
      more: !i && h.length === 50
    };
  }
  async devices(t, e) {
    if (t) {
      const i = (await this.sp("get_player_devices", { refresh: !0 }, !0)).result;
      return (Array.isArray(i) ? i : (i == null ? void 0 : i.devices) ?? []).map((r) => ({
        id: r.id,
        name: r.name,
        active: !!r.is_active,
        available: !!r.id && !r.is_restricted
      })).filter(
        (r) => !z(r.id, r.name, this.config.excluded_devices)
      );
    }
    return this.config.ma_players.map((i) => {
      const s = this.hass.states[i.entity];
      return {
        id: i.entity,
        entity: i.entity,
        name: i.name ?? (s == null ? void 0 : s.attributes.friendly_name) ?? i.entity,
        active: i.entity === e,
        available: !!s && !["unavailable", "unknown"].includes(s.state)
      };
    }).filter((i) => !z(i.id, i.name, this.config.excluded_devices));
  }
  async play(t, e, i, s, r = !1) {
    if (!t) {
      const a = this.hass.states[e];
      if (!this.config.ma_players.some((l) => l.entity === e) || !a || ["unknown", "unavailable"].includes(a.state) || z(
        e,
        a.attributes.friendly_name ?? "",
        this.config.excluded_devices
      ))
        throw new Error(
          "De gekozen Music Assistant-kamer is niet beschikbaar."
        );
    }
    if (!i.uri || !i.playable)
      throw new Error("Dit item is niet afspeelbaar.");
    return t ? s && ["playlist", "album"].includes(s.kind) ? this.sp("player_media_play_context", {
      context_uri: s.uri,
      offset_position: i.position,
      shuffle: r
    }) : ["playlist", "album", "artist", "show"].includes(i.kind) ? this.sp("player_media_play_context", {
      context_uri: i.uri,
      shuffle: r
    }) : this.sp("player_media_play_tracks", { uris: i.uri, shuffle: r }) : this.call(
      "music_assistant",
      "play_media",
      {
        media_id: (s == null ? void 0 : s.kind) === "playlist" ? s.uri : i.uri,
        media_type: (s == null ? void 0 : s.kind) === "playlist" ? "playlist" : i.kind,
        ...(s == null ? void 0 : s.kind) === "playlist" && i.uri !== s.uri ? { start_item: i.uri } : {},
        enqueue: "replace",
        shuffle: r
      },
      !1,
      { entity_id: e }
    );
  }
}
const Ft = At`
  :host {
    display: block;
    container-type: inline-size;
    color: #fff;
    font:
      14px/1.5 system-ui,
      -apple-system,
      sans-serif;
    --accent: #1ed760;
    background: #121212;
    color-scheme: dark;
    border-radius: 12px;
    overflow: hidden;
  }
  svg {
    vertical-align: middle;
  }
  * {
    box-sizing: border-box;
  }
  button,
  input,
  select {
    font: inherit;
    color: inherit;
  }
  button,
  select {
    min-height: 44px;
    border: 0;
    border-radius: 8px;
    background: #242424;
    padding: 8px 12px;
    cursor: pointer;
  }
  button:hover {
    background: #343434;
  }
  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  button.active,
  .accent {
    background: var(--accent);
    color: #08190d;
  }
  input {
    min-width: 0;
    min-height: 44px;
    background: #242424;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 8px;
    width: 100%;
  }
  input[type="range"] {
    padding: 0;
    min-height: 28px;
    accent-color: var(--accent);
  }
  h1,
  h2,
  p {
    margin: 0 0 12px;
  }
  h1 {
    font-size: clamp(24px, 4cqi, 42px);
    line-height: 1.15;
  }
  h2 {
    font-size: 18px;
  }
  .app {
    height: var(--height, calc(100dvh - 72px));
    min-height: 380px;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    background: #121212;
    position: relative;
  }
  header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-bottom: 1px solid #292929;
    flex-wrap: wrap;
  }
  header strong {
    margin-right: auto;
    font-size: 19px;
    letter-spacing: -0.7px;
  }
  .workspace {
    display: grid;
    min-height: 0;
    grid-template-columns: minmax(0, 1fr);
  }
  aside {
    display: none;
    background: #181818;
    padding: 16px;
    overflow: auto;
  }
  .nav button {
    display: block;
    width: 100%;
    text-align: left;
    margin-bottom: 6px;
  }
  main {
    overflow: auto;
    padding: 16px;
    min-width: 0;
    overscroll-behavior: contain;
  }
  .toolbar {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .toolbar input {
    flex: 1;
    min-width: 120px;
  }
  .muted,
  small {
    color: #b3b3b3;
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .tile {
    display: flex;
    align-items: center;
    text-align: left;
    gap: 10px;
    padding: 8px;
    min-width: 0;
  }
  .tile span,
  .metadata {
    min-width: 0;
    flex: 1;
  }
  .tile b,
  .metadata b,
  .metadata small {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img,
  .art {
    width: 44px;
    height: 44px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 5px;
    background: #242424;
  }
  .art {
    display: inline-grid;
    place-items: center;
    font-size: 24px;
    color: #888;
  }
  .hero {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 12px 0 20px;
  }
  .hero img,
  .hero .art {
    width: 100px;
    height: 100px;
  }
  .tracks {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .track {
    display: grid;
    grid-template-columns: 26px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #252525;
  }
  .track .play {
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
    min-width: 0;
    background: transparent;
    padding: 8px 0;
  }
  .album,
  .duration {
    display: none;
  }
  .position {
    color: #b3b3b3;
    text-align: center;
  }
  .player {
    background: #181818;
    border-top: 1px solid #343434;
    padding: 10px max(12px, env(safe-area-inset-right)) 8px
      max(12px, env(safe-area-inset-left));
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 8px;
    align-items: center;
  }
  .now {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    text-align: left;
    background: transparent;
    padding: 0;
  }
  .progress {
    grid-column: 1/-1;
    height: 3px;
    background: #444;
  }
  .progress div {
    height: 100%;
    background: var(--accent);
  }
  .desktop-controls,
  .volume {
    display: none;
  }
  .bottom {
    display: flex;
    padding: 6px 8px calc(6px + env(safe-area-inset-bottom));
    background: #181818;
    justify-content: space-around;
    gap: 4px;
  }
  .bottom button {
    background: transparent;
    padding: 8px;
    font-size: 12px;
  }
  .bottom button.active {
    color: var(--accent);
  }
  .error {
    background: #4a2020;
    border: 1px solid #a44;
    padding: 12px;
    border-radius: 8px;
    overflow-wrap: anywhere;
    margin-bottom: 12px;
  }
  .note {
    padding: 12px;
    background: #242424;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  .skeleton {
    height: 64px;
    border-radius: 8px;
    background: linear-gradient(90deg, #242424, #333, #242424);
    margin: 8px 0;
    animation: pulse 1.4s ease-in-out infinite;
  }
  @keyframes pulse {
    50% {
      opacity: 0.4;
    }
  }
  .overlay {
    position: absolute;
    inset: 0;
    background: #000a;
    z-index: 10;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .sheet {
    background: #181818;
    border: 1px solid #444;
    border-radius: 16px 16px 0 0;
    padding: 20px max(20px, env(safe-area-inset-right))
      calc(20px + env(safe-area-inset-bottom));
    max-height: 100%;
    overflow: auto;
    width: 100%;
    max-width: 600px;
  }
  .sheet .large {
    display: block;
    width: min(65cqi, 280px);
    height: min(65cqi, 280px);
    margin: 20px auto;
  }
  .sheet .controls {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .device {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
  }
  .device > button:first-child {
    flex: 1;
    text-align: left;
  }
  .device.active {
    color: var(--accent);
  }
  .sheet .close {
    float: right;
  }
  .right-art {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }
  .full-progress {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 12px 0;
  }
  .full-progress input {
    flex: 1;
  }
  label {
    display: block;
    margin: 8px 0;
  }
  .settings {
    overflow-wrap: anywhere;
  }
  .settings code {
    color: var(--accent);
  }
  .more {
    margin-top: 16px;
    width: 100%;
  }
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
  .roomy .player {
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .roomy .now img,
  .roomy .now .art {
    width: 56px;
    height: 56px;
  }
  @container (min-width:700px) {
    .workspace {
      grid-template-columns: 180px minmax(0, 1fr);
    }
    .left {
      display: block;
    }
    .bottom {
      display: none;
    }
    .tiles {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    .album,
    .duration {
      display: block;
      color: #b3b3b3;
    }
    .track {
      grid-template-columns: 28px minmax(0, 2fr) minmax(0, 1fr) 50px auto;
    }
    .album {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .player {
      grid-template-columns: minmax(0, 1fr) minmax(200px, 1.3fr) auto;
    }
    .desktop-controls {
      display: block;
      text-align: center;
    }
    .desktop-controls .controls {
      display: flex;
      gap: 4px;
      justify-content: center;
    }
    .mobile-toggle {
      display: none;
    }
    .volume {
      display: block;
      max-width: 120px;
    }
    .player > .progress {
      display: none;
    }
    .sheet {
      border-radius: 16px;
      margin: 24px;
    }
    .overlay {
      align-items: center;
    }
  }
  @container (min-width:1100px) {
    .workspace {
      grid-template-columns: 200px minmax(0, 1fr) 240px;
    }
    .right {
      display: block;
    }
    .workspace.no-right {
      grid-template-columns: 200px minmax(0, 1fr);
    }
    .player {
      grid-template-columns: minmax(0, 1fr) minmax(300px, 1.2fr) auto auto;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
    }
  }
`, W = class W extends P {
  constructor() {
    super(...arguments), this.source = "spotify", this.session = "spotify", this.view = "Home", this.kind = "playlist", this.query = "", this.filter = "", this.page = { items: [], more: !1 }, this.loading = !1, this.busy = !1, this.error = "", this.sheet = "", this.devices = [], this.player = "", this.tick = 0, this.requestId = 0, this.cursor = 0, this.initialized = !1, this.manualSession = !1;
  }
  setConfig(t) {
    var e, i, s;
    if (!((e = t.spotify_entity) != null && e.startsWith("media_player.")))
      throw new Error("spotify_entity moet een media_player-entiteit zijn.");
    if (t.ma_players && (!Array.isArray(t.ma_players) || t.ma_players.some((r) => {
      var a;
      return !((a = r.entity) != null && a.startsWith("media_player."));
    })))
      throw new Error(
        "ma_players moet een lijst met entity en optioneel name zijn."
      );
    if (t.default_source && !["spotify", "music_assistant", "radio"].includes(t.default_source))
      throw new Error("Ongeldige default_source.");
    this.config = {
      ...t,
      ma_players: (t.ma_players ?? []).filter(
        (r) => !z(r.entity, r.name ?? "", t.excluded_devices)
      )
    }, this.source = t.default_source ?? "spotify", this.player = t.default_player ?? ((i = this.config.ma_players[0]) == null ? void 0 : i.entity) ?? "";
    try {
      const r = JSON.parse(localStorage.getItem(this.storageKey) ?? "{}");
      ["spotify", "music_assistant", "radio"].includes(r.source) && (this.source = r.source), K.includes(r.view) && (this.view = r.view), this.config.ma_players.some((a) => a.entity === r.player) && (this.player = r.player);
    } catch {
    }
    this.config.ma_players.some((r) => r.entity === this.player) || (this.player = ((s = this.config.ma_players[0]) == null ? void 0 : s.entity) ?? ""), this.session = this.source, this.manualSession = !1, this.initialized = !1, this.api = void 0, this.requestId++;
  }
  static getStubConfig() {
    return {
      spotify_entity: "media_player.woonkamer_spotifyplus_jeroen_dunk",
      ma_players: []
    };
  }
  getCardSize() {
    return 12;
  }
  get storageKey() {
    return `dunk-music:${this.config.storage_key ?? this.config.spotify_entity}`;
  }
  save() {
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          source: this.source,
          view: this.view,
          player: this.player
        })
      );
    } catch {
    }
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate(), this.timer = setInterval(() => this.tick++, 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this.timer), clearTimeout(this.searchTimer), this.requestId++, this.initialized = !1;
  }
  updated(t) {
    var e;
    this.hass && this.config && (this.api ? this.api.hass = this.hass : this.api = new Zt(this.hass, this.config), this.initialized ? t.has("hass") && this.detectSession() : (this.players.some((i) => i.entity === this.player) || (this.player = ((e = this.players[0]) == null ? void 0 : e.entity) ?? ""), this.initialized = !0, this.detectSession(), this.load()));
  }
  detectSession() {
    if (this.manualSession) return;
    const t = this.hass.states[this.config.spotify_entity], e = this.hass.states[this.player];
    (t == null ? void 0 : t.state) === "playing" && (e == null ? void 0 : e.state) !== "playing" ? this.session = "spotify" : (e == null ? void 0 : e.state) === "playing" && (t == null ? void 0 : t.state) !== "playing" && (this.session = "music_assistant");
  }
  get players() {
    return this.config.ma_players.filter(
      (t) => {
        var e, i;
        return !z(
          t.entity,
          ((i = (e = this.hass) == null ? void 0 : e.states[t.entity]) == null ? void 0 : i.attributes.friendly_name) ?? t.name ?? "",
          this.config.excluded_devices
        );
      }
    );
  }
  get entity() {
    return this.session === "spotify" ? this.config.spotify_entity : this.player;
  }
  get state() {
    var t;
    return (t = this.hass) == null ? void 0 : t.states[this.entity];
  }
  get available() {
    return !!this.state && !["unknown", "unavailable"].includes(this.state.state);
  }
  supports(t) {
    var e;
    return this.available && ((((e = this.state) == null ? void 0 : e.attributes.supported_features) ?? 0) & t) !== 0;
  }
  async action(t) {
    if (!this.busy) {
      this.busy = !0, this.error = "";
      try {
        await t();
      } catch (e) {
        this.error = e instanceof Error ? e.message : String(e);
      } finally {
        this.busy = !1;
      }
    }
  }
  async load(t = !1) {
    if (!this.api || this.view === "Instellingen") return;
    const e = ++this.requestId;
    this.loading = !0, this.error = "", t || (this.cursor = 0, this.page = { items: [], more: !1 });
    try {
      const i = this.source === "spotify" ? await this.api.spotify(
        this.view,
        this.kind,
        this.query,
        this.cursor,
        this.parent
      ) : await this.api.ma(
        this.view,
        this.kind,
        this.query,
        Number(this.cursor),
        this.player,
        this.parent
      );
      if (e !== this.requestId) return;
      this.page = {
        ...i,
        items: t ? [...this.page.items, ...i.items] : i.items
      }, this.cursor = i.next ?? Number(this.cursor) + i.items.length;
    } catch (i) {
      e === this.requestId && (this.error = i instanceof Error ? i.message : String(i));
    } finally {
      e === this.requestId && (this.loading = !1);
    }
  }
  navigate(t) {
    clearTimeout(this.searchTimer), this.requestId++, this.loading = !1, this.view = t, this.parent = void 0, this.query = "", this.filter = "", t === "Radio" && (this.source = "radio"), (t === "Afspeellijsten" || t === "Home") && (this.kind = "playlist"), (t === "Favorieten" || t === "Recent afgespeeld") && (this.kind = "track"), this.save(), this.load();
  }
  changeSource(t) {
    this.source = t, this.navigate(t === "radio" ? "Radio" : "Home");
  }
  open(t) {
    this.parent = t, this.filter = "", this.query = "", this.load();
  }
  play(t, e = !1) {
    this.action(async () => {
      if (this.source !== "spotify" && !this.player)
        throw new Error("Selecteer eerst een Music Assistant-luidspreker.");
      await this.api.play(
        this.source === "spotify",
        this.player,
        t,
        this.parent,
        e
      ), this.session = this.source, this.manualSession = !0;
    });
  }
  control(t, e = {}) {
    this.action(
      () => this.api.call("media_player", t, {
        entity_id: this.entity,
        ...e
      })
    );
  }
  modal(t) {
    var e;
    this.opener = (e = this.shadowRoot) == null ? void 0 : e.activeElement, this.sheet = t, this.updateComplete.then(
      () => {
        var i, s;
        return (s = (i = this.shadowRoot) == null ? void 0 : i.querySelector(".sheet .close")) == null ? void 0 : s.focus();
      }
    );
  }
  close() {
    this.sheet = "", this.updateComplete.then(() => {
      var t;
      return (t = this.opener) == null ? void 0 : t.focus();
    });
  }
  trap(t) {
    if (t.key === "Escape" && (t.stopPropagation(), this.close()), t.key === "Tab") {
      const e = [
        ...this.shadowRoot.querySelectorAll(
          ".sheet button:not(:disabled),.sheet input:not(:disabled),.sheet select:not(:disabled)"
        )
      ], i = e[0], s = e.at(-1);
      t.shiftKey && this.shadowRoot.activeElement === i ? (t.preventDefault(), s == null || s.focus()) : !t.shiftKey && this.shadowRoot.activeElement === s && (t.preventDefault(), i == null || i.focus());
    }
  }
  showDevices() {
    this.devices = [], this.modal("devices"), this.action(async () => {
      this.devices = await this.api.devices(
        this.session === "spotify",
        this.player
      );
    });
  }
  selectDevice(t, e = !1) {
    t.available && this.action(async () => {
      var i, s;
      this.session === "spotify" ? await this.api.sp("player_transfer_playback", {
        device_id: t.id,
        play: ((i = this.state) == null ? void 0 : i.state) === "playing"
      }) : (e && await this.api.call(
        "music_assistant",
        "transfer_queue",
        {
          source_player: this.player,
          auto_play: ((s = this.state) == null ? void 0 : s.state) === "playing"
        },
        !1,
        { entity_id: t.id }
      ), this.player = t.id, this.save()), this.api.cache.clear(), this.devices = await this.api.devices(
        this.session === "spotify",
        this.player
      );
    });
  }
  art(t, e = "", i = "") {
    return t ? c`<img
          class=${i}
          src=${xt(t)}
          alt=${e}
          loading="lazy"
          @error=${(s) => {
      s.target.style.visibility = "hidden";
    }}
        />` : c`<span class=${`art ${i}`} aria-hidden="true">♪</span>`;
  }
  controls(t = !1) {
    var i, s;
    const e = ((i = this.state) == null ? void 0 : i.attributes) ?? {};
    return c`<div class="controls">
      <button
        title="Shuffle"
        aria-label="Shuffle"
        aria-pressed=${!!e.shuffle}
        class=${e.shuffle ? "active" : ""}
        ?disabled=${!this.supports(32768) || this.busy}
        @click=${() => this.control("shuffle_set", { shuffle: !e.shuffle })}
      >
        ${x("shuffle")}</button
      ><button
        aria-label="Vorig nummer"
        ?disabled=${!this.supports(16) || this.busy}
        @click=${() => this.control("media_previous_track")}
      >
        ${x("previous")}</button
      >${this.toggle()}<button
        aria-label="Volgend nummer"
        ?disabled=${!this.supports(32) || this.busy}
        @click=${() => this.control("media_next_track")}
      >
        ${x("next")}</button
      ><button
        aria-label=${`Herhalen: ${e.repeat ?? "off"}`}
        class=${e.repeat && e.repeat !== "off" ? "active" : ""}
        ?disabled=${!this.supports(262144) || this.busy}
        @click=${() => this.control("repeat_set", { repeat: e.repeat === "off" ? "all" : e.repeat === "all" ? "one" : "off" })}
      >
        ↻${e.repeat === "one" ? "1" : ""}
      </button>
      ${t ? c`<button
              aria-label="Wachtrij openen"
              @click=${() => {
      this.source = this.session, this.navigate("Wachtrij");
    }}
            >
              ${x("queue")}
            </button>` : p}
      ${t && this.session === "spotify" && ((s = e.media_content_id) != null && s.startsWith("spotify:track:")) ? c`<button
              aria-label="Favorieten huidig nummer"
              @click=${() => {
      this.menuItem = {
        id: e.media_content_id.split(":").at(-1),
        uri: e.media_content_id,
        title: e.media_title,
        kind: "track",
        playable: !0
      }, this.modal("options");
    }}
            >
              ♡
            </button>` : p}
    </div>`;
  }
  toggle() {
    var t, e, i;
    return c`<button
      class="accent"
      aria-label=${((t = this.state) == null ? void 0 : t.state) === "playing" ? "Pauzeren" : "Afspelen"}
      ?disabled=${this.busy || !this.supports(((e = this.state) == null ? void 0 : e.state) === "playing" ? 1 : 16384)}
      @click=${() => {
      var s;
      return this.control(((s = this.state) == null ? void 0 : s.state) === "playing" ? "media_pause" : "media_play");
    }}
    >
      ${x(((i = this.state) == null ? void 0 : i.state) === "playing" ? "pause" : "play")}
    </button>`;
  }
  seek() {
    var e;
    const t = ((e = this.state) == null ? void 0 : e.attributes.media_duration) ?? 0;
    return c`<div class="full-progress">
      <small>${J(U(this.state))}</small
      ><input
        aria-label="Afspeelpositie"
        type="range"
        min="0"
        max=${t || 1}
        .value=${String(U(this.state))}
        ?disabled=${!t || !this.supports(2) || this.busy}
        @change=${(i) => this.control("media_seek", { seek_position: Number(i.target.value) })}
      /><small>−${J(t - U(this.state))}</small>
    </div>`;
  }
  volume() {
    var t;
    return c`<input
      type="range"
      aria-label="Volume"
      min="0"
      max="1"
      step="0.01"
      .value=${String(((t = this.state) == null ? void 0 : t.attributes.volume_level) ?? 0)}
      ?disabled=${!this.supports(4) || this.busy}
      @change=${(e) => this.control("volume_set", { volume_level: Number(e.target.value) })}
    />`;
  }
  track(t) {
    return c`<div class="track" role="listitem">
      <span class="position">${t.position + 1}</span
      ><button
        class="play"
        ?disabled=${!t.playable || this.busy}
        @click=${() => this.play(t)}
      >
        ${this.art(t.image)}<span class="metadata"
          ><b>${t.title}</b><small>${t.artist}</small></span
        ></button
      ><span class="album">${t.album}</span
      ><span class="duration">${t.duration ? J(t.duration) : "—"}</span
      ><button
        aria-label=${`Opties voor ${t.title}`}
        @click=${() => {
      this.menuItem = t, this.modal("options");
    }}
      >
        •••
      </button>
    </div>`;
  }
  content() {
    if (this.view === "Instellingen") return this.settings();
    const t = this.page.items.filter(
      (s) => `${s.title} ${s.artist} ${s.album}`.toLowerCase().includes(this.filter.toLowerCase())
    ), e = t.filter((s) => s.browsable), i = t.filter((s) => !s.browsable);
    return c`${this.parent ? c`<button
                @click=${() => {
      this.parent = void 0, this.filter = "", this.load();
    }}
              >
                ← Terug
              </button>
              <div class="hero">
                ${this.art(this.parent.image)}
                <div>
                  <h1>${this.parent.title}</h1>
                  <p class="muted">
                    ${this.page.total ?? this.page.items.length}${this.page.more && this.page.total == null ? "+" : ""}
                    nummers
                  </p>
                  <button
                    class="accent"
                    ?disabled=${this.busy || !this.parent.playable}
                    @click=${() => this.play(this.parent)}
                  >
                    Alles afspelen
                  </button>
                  <button
                    ?disabled=${this.busy || !this.parent.playable}
                    @click=${() => this.play(this.parent, !0)}
                  >
                    Shuffle afspelen
                  </button>
                </div>
              </div>
              <input
                aria-label="Zoeken binnen afspeellijst"
                placeholder="Zoek in geladen nummers"
                .value=${this.filter}
                @input=${(s) => this.filter = s.target.value}
              />` : c`<h1>${this.view}</h1>
              <div class="toolbar">
                ${["Bibliotheek", "Home", "Zoeken"].includes(this.view) ? c`<select
                        aria-label="Bibliotheektype"
                        .value=${this.kind}
                        @change=${(s) => {
      this.kind = s.target.value, this.load();
    }}
                      >
                        ${[
      ["playlist", "Afspeellijsten"],
      ["track", "Nummers"],
      ["album", "Albums"],
      ["artist", "Artiesten"],
      [
        this.source === "spotify" ? "show" : "podcast",
        "Podcasts"
      ]
    ].map(
      ([s, r]) => c`<option value=${s}>${r}</option>`
    )}
                      </select>` : p}<input
                  aria-label="Muziek zoeken"
                  placeholder="Wat wil je luisteren?"
                  .value=${this.query}
                  @input=${(s) => {
      this.query = s.target.value, clearTimeout(this.searchTimer), this.requestId++, this.searchTimer = setTimeout(() => void this.load(), 400);
    }}
                /><button
                  aria-label="Vernieuwen"
                  ?disabled=${this.loading}
                  @click=${() => {
      var s;
      (s = this.api) == null || s.cache.clear(), this.load();
    }}
                >
                  ↻
                </button>
              </div>`}
      ${this.source === "radio" && !this.parent ? c`<p class="muted">
                Kies eerst de gewenste kamer. Snelkoppelingen zoeken echte
                stations in Music Assistant.
              </p>
              <div class="tiles">
                ${(this.config.radio_stations ?? Bt.map((s) => ({ name: s }))).map(
      (s) => c`<button
                      class="tile"
                      @click=${() => {
        s.uri ? this.play({
          id: s.uri,
          uri: s.uri,
          title: s.name,
          artist: "",
          album: "",
          image: s.image ?? "",
          duration: 0,
          position: 0,
          kind: "radio",
          playable: !0,
          browsable: !1
        }) : (this.query = s.name, this.load());
      }}
                    >
                      ${this.art(s.image ?? "")}<b>${s.name}</b>
                    </button>`
    )}
              </div>
              <br />` : p}
      ${this.page.note ? c`<p class="note">${this.page.note}</p>` : p}
      <div class="tiles">
        ${e.map(
      (s) => c`<button class="tile" @click=${() => this.open(s)}>
              ${this.art(s.image)}<span
                ><b>${s.title}</b><small>${s.artist || s.kind}</small></span
              >
            </button>`
    )}
      </div>
      <div class="tracks" role="list" aria-label="Nummers">
        ${i.map((s) => this.track(s))}
      </div>
      ${this.loading ? c`<div role="status" aria-label="Laden">
              <div class="skeleton"></div>
              <div class="skeleton"></div>
              <div class="skeleton"></div>
            </div>` : !t.length && !this.error ? c`<p class="note">
                Geen resultaten. Kies een andere collectie of zoekopdracht.
              </p>` : p}${this.page.more ? c`<button class="more" ?disabled=${this.loading} @click=${() => void this.load(!0)}>Meer laden</button>` : p}`;
  }
  settings() {
    var t;
    return c`<div class="settings">
      <h1>Instellingen</h1>
      <p>Dunk Music 0.1.0</p>
      <p>Configuratie via kaart-YAML. Geen tokens of wachtwoorden nodig.</p>
      <p>
        Spotify: <code>${this.config.spotify_entity}</code> —
        ${((t = this.hass.states[this.config.spotify_entity]) == null ? void 0 : t.state) ?? "ontbreekt"}
      </p>
      <h2>Music Assistant-kamers</h2>
      ${this.players.map((e) => {
      const i = this.hass.states[e.entity];
      return c`<label
          >${e.name ?? e.entity} · ${(i == null ? void 0 : i.state) ?? "ontbreekt"}<input
            aria-label=${`Volume ${e.name ?? e.entity}`}
            type="range"
            min="0"
            max="1"
            step="0.01"
            .value=${String((i == null ? void 0 : i.attributes.volume_level) ?? 0)}
            ?disabled=${!i || i.state === "unavailable" || !(i.attributes.supported_features & 4) || this.busy}
            @change=${(s) => void this.action(() => this.api.call("media_player", "volume_set", { entity_id: e.entity, volume_level: Number(s.target.value) }))}
        /></label>`;
    })}
      <h2>Beschikbare koppelingen</h2>
      ${["spotifyplus", "music_assistant"].map((e) => c`<p>${e}: ${Object.keys(this.hass.services[e] ?? {}).length} acties</p>`)}
      <p>
        Niet ondersteunde acties tonen een foutmelding; er wordt geen
        alternatieve of fictieve actie verstuurd. Google TV: controleer in
        Ontwikkelaarstools welke entiteit de Music Assistant-speler is en pas
        ma_players aan.
      </p>
      <button
        @click=${() => {
      this.session = "music_assistant", this.showDevices();
    }}
      >
        Kamers en groepen
      </button>
    </div>`;
  }
  favorite(t) {
    const e = this.menuItem;
    e && this.action(async () => {
      await this.api.sp(
        t ? "remove_track_favorites" : "save_track_favorites",
        { ids: e.id }
      ), this.api.cache.clear(), this.close(), this.view === "Favorieten" && await this.load();
    });
  }
  sheetContent() {
    var e, i, s, r, a, l, o;
    if (this.sheet === "devices")
      return c`<h2 id="dialog-title">
          ${this.session === "spotify" ? "Spotify Connect" : "Music Assistant-kamers"}
        </h2>
        <p class="muted">
          ${this.session === "spotify" ? "Overzetten gebeurt pas na je keuze. Status volgt de integratie." : "Selecteer een kamer zonder afspelen, of kies expliciet Overzetten / Groeperen."}
        </p>
        ${this.devices.map((h) => {
        var u, d;
        return c`<div class=${`device ${h.active ? "active" : ""}`}><button ?disabled=${!h.available || this.busy} @click=${() => this.selectDevice(h)}>${h.name} · ${h.available ? h.active ? "Actief" : "Beschikbaar" : "Niet beschikbaar"}</button>${this.session !== "spotify" && !h.active ? c`<button ?disabled=${!h.available || this.busy || !((u = this.api) != null && u.has("music_assistant", "transfer_queue"))} @click=${() => this.selectDevice(h, !0)}>Overzetten</button>${this.supports(524288) ? c`<button ?disabled=${!h.available || this.busy || !((((d = this.hass.states[h.id]) == null ? void 0 : d.attributes.supported_features) ?? 0) & 524288)} @click=${() => void this.action(() => this.api.call("media_player", "join", { entity_id: this.player, group_members: [h.id] }))}>Groeperen</button>` : p}` : p}</div>`;
      })}${this.devices.length ? p : c`<p>Geen apparaten geladen of beschikbaar.</p>`}${this.session !== "spotify" && this.supports(524288) ? c`<button ?disabled=${this.busy} @click=${() => this.control("unjoin")}>Groep verlaten</button>` : p}`;
    if (this.sheet === "options")
      return c`<h2 id="dialog-title">${(e = this.menuItem) == null ? void 0 : e.title}</h2>
        <div class="controls">
          ${this.source === "spotify" && ((i = this.menuItem) == null ? void 0 : i.kind) === "track" ? c`<button ?disabled=${this.busy || !((s = this.api) != null && s.has("spotifyplus", "save_track_favorites"))} @click=${() => this.favorite(!1)}>♡ Favoriet toevoegen</button><button ?disabled=${this.busy || !((r = this.api) != null && r.has("spotifyplus", "remove_track_favorites"))} @click=${() => this.favorite(!0)}>Favoriet verwijderen</button>` : c`<p>Favorieten beheren voor dit type doe je in de bronapp.</p>`}<button
            ?disabled=${this.busy || !((a = this.menuItem) != null && a.playable)}
            @click=${() => void this.action(async () => {
        this.source === "spotify" ? await this.api.sp("add_player_queue_items", {
          uris: this.menuItem.uri
        }) : await this.api.call(
          "music_assistant",
          "play_media",
          {
            media_id: this.menuItem.uri,
            media_type: this.menuItem.kind,
            enqueue: "add"
          },
          !1,
          { entity_id: this.player }
        ), this.close();
      })}
          >
            Aan wachtrij toevoegen
          </button>
        </div>`;
    const t = ((l = this.state) == null ? void 0 : l.attributes) ?? {};
    return c`<h2 id="dialog-title">
        Nu afgespeeld ·
        ${this.session === "spotify" ? "Spotify Connect" : "Music Assistant"}
      </h2>
      ${this.art(t.entity_picture ?? "", t.media_title, "large")}
      <h2>${t.media_title ?? "Geen actieve muziek"}</h2>
      <p>${t.media_artist ?? ""}</p>
      ${this.seek()}${this.controls()}<label>Volume${this.volume()}</label
      ><button @click=${() => this.showDevices()}>
        ${t.source ?? t.friendly_name ?? "Apparaat kiezen"}</button
      ><button
        @click=${() => {
      this.source = this.session, this.close(), this.navigate("Wachtrij");
    }}
      >
        Wachtrij</button
      >${this.session === "spotify" && ((o = t.media_content_id) != null && o.startsWith("spotify:track:")) ? c`<button
              @click=${() => {
      this.menuItem = {
        id: t.media_content_id.split(":").at(-1),
        uri: t.media_content_id,
        title: t.media_title,
        kind: "track"
      }, this.sheet = "options";
    }}
            >
              ♡ Favorieten
            </button>` : p}`;
  }
  render() {
    var r;
    if (!this.config || !this.hass) return c`<p>Home Assistant laden…</p>`;
    const t = ((r = this.state) == null ? void 0 : r.attributes) ?? {}, e = (this.config.navigation ?? K).filter((a) => K.includes(a)), i = /^#[\da-f]{6}$/i.test(this.config.accent_color ?? "") ? this.config.accent_color : "#1ed760", s = /^(\d+(px|vh|dvh)|calc\([\d\s()+*/.\-a-z]+\))$/.test(
      this.config.height ?? ""
    ) ? this.config.height : "calc(100dvh - 72px)";
    return c`<div
      class=${this.config.mobile_compact === !1 ? "app roomy" : "app"}
      style=${`--accent:${i};--height:${s}`}
    >
      <header ?inert=${!!this.sheet}>
        <strong>Dunk Music<span class="sr"> 0.1.0</span></strong
        ><select
          aria-label="Muziekbron"
          .value=${this.source}
          @change=${(a) => this.changeSource(a.target.value)}
        >
          <option value="spotify">Spotify</option>
          <option value="music_assistant">Music Assistant</option>
          <option value="radio">Radio</option></select
        >${this.source !== "spotify" ? c`<select
                aria-label="Doelkamer"
                .value=${this.player}
                @change=${(a) => {
      this.player = a.target.value, this.save(), this.load();
    }}
              >
                ${this.players.map((a) => {
      var l, o;
      return c`<option value=${a.entity} ?disabled=${!this.hass.states[a.entity] || ["unknown", "unavailable"].includes((l = this.hass.states[a.entity]) == null ? void 0 : l.state)}>${a.name ?? ((o = this.hass.states[a.entity]) == null ? void 0 : o.attributes.friendly_name) ?? a.entity}</option>`;
    })}
              </select>` : p}<select
          aria-label="Bedien afspeelsessie"
          .value=${this.session === "spotify" ? "spotify" : "music_assistant"}
          @change=${(a) => {
      this.session = a.target.value, this.manualSession = !0;
    }}
        >
          <option value="spotify">Speler: Spotify</option>
          <option value="music_assistant">Speler: Music Assistant</option>
        </select>
      </header>
      <div
        ?inert=${!!this.sheet}
        class=${`workspace ${this.config.desktop_now_playing === !1 ? "no-right" : ""}`}
      >
        <aside class="left nav" aria-label="Hoofdnavigatie">
          ${e.map((a) => c`<button class=${this.view === a ? "active" : ""} @click=${() => this.navigate(a)}>${a}</button>`)}
        </aside>
        <main>
          ${this.error ? c`<div class="error" role="alert">${this.error}</div>` : p}${this.content()}
        </main>
        ${this.config.desktop_now_playing !== !1 ? c`<aside class="right">
                <h2>Nu afgespeeld</h2>
                ${this.art(t.entity_picture ?? "", t.media_title, "right-art")}
                <h2>${t.media_title ?? "Geen muziek"}</h2>
                <p class="muted">${t.media_artist}</p>
                <p>
                  ${this.session === "spotify" ? "Spotify Connect" : "Music Assistant"}
                </p>
                <button @click=${() => this.modal("now")}>
                  Volledige speler
                </button>
              </aside>` : p}
      </div>
      <footer
        ?inert=${!!this.sheet}
        class="player"
        aria-label="Permanente muziekspeler"
      >
        <button class="now" @click=${() => this.modal("now")}>
          ${this.art(t.entity_picture ?? "")}<span class="metadata"
            ><b>${t.media_title ?? "Geen actieve muziek"}</b
            ><small
              >${t.media_artist ?? ""} ·
              ${t.source ?? t.friendly_name ?? "Geen apparaat"}</small
            ></span
          >
        </button>
        <div class="desktop-controls">${this.controls(!0)}${this.seek()}</div>
        <span class="mobile-toggle">${this.toggle()}</span
        ><button aria-label="Apparaten" @click=${() => this.showDevices()}>
          ${x("devices")}
        </button>
        <div class="volume">${this.volume()}</div>
        <div class="progress" aria-hidden="true">
          <div
            style=${`width:${Math.min(100, 100 * U(this.state) / (t.media_duration || 1))}%`}
          ></div>
        </div>
      </footer>
      <nav ?inert=${!!this.sheet} class="bottom" aria-label="Mobiele navigatie">
        ${e.filter((a) => ["Home", "Zoeken", "Bibliotheek"].includes(a)).map((a) => c`<button class=${this.view === a ? "active" : ""} @click=${() => this.navigate(a)}>${a}</button>`)}<button
          @click=${() => this.modal("nav")}
        >
          Meer
        </button>
      </nav>
      ${this.sheet ? c`<div
              class="overlay"
              @click=${(a) => {
      a.target === a.currentTarget && this.close();
    }}
            >
              <section
                class="sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                @keydown=${this.trap}
              >
                <button
                  class="close"
                  aria-label="Sluiten"
                  @click=${() => this.close()}
                >
                  ✕</button
                >${this.error ? c`<p class="error" role="alert">${this.error}</p>` : p}${this.sheet === "nav" ? c`<h2 id="dialog-title">Navigatie</h2>
                        <div class="nav">
                          ${e.map(
      (a) => c`<button
                                @click=${() => {
        this.close(), this.navigate(a);
      }}
                              >
                                ${a}
                              </button>`
    )}
                        </div>` : this.sheetContent()}
              </section>
            </div>` : p}
    </div>`;
  }
};
W.styles = Ft, W.properties = {
  hass: { attribute: !1 },
  config: { state: !0 },
  source: { state: !0 },
  session: { state: !0 },
  view: { state: !0 },
  kind: { state: !0 },
  query: { state: !0 },
  filter: { state: !0 },
  page: { state: !0 },
  parent: { state: !0 },
  loading: { state: !0 },
  busy: { state: !0 },
  error: { state: !0 },
  sheet: { state: !0 },
  devices: { state: !0 },
  player: { state: !0 },
  tick: { state: !0 },
  menuItem: { state: !0 }
};
let Y = W;
customElements.get("dunk-music-card") || customElements.define("dunk-music-card", Y);
const q = window;
q.customCards = q.customCards ?? [];
q.customCards.some((n) => n.type === "dunk-music-card") || q.customCards.push({
  type: "dunk-music-card",
  name: "Dunk Music",
  description: "SpotifyPlus en Music Assistant in één muziekdashboard",
  preview: !1
});
export {
  Y as DunkMusicCard
};
//# sourceMappingURL=dunk-music.js.map
