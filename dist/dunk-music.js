/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, rt = (n) => n, L = T.trustedTypes, nt = L ? L.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, gt = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, bt = "?" + g, St = `<${bt}>`, w = document, O = () => w.createComment(""), N = (n) => n === null || typeof n != "object" && typeof n != "function", tt = Array.isArray, Et = (n) => tt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ot = /-->/g, lt = />/g, $ = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, ct = /"/g, _t = /^(?:script|style|textarea|title)$/i, $t = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), c = $t(1), Mt = $t(2), y = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), v = w.createTreeWalker(w, 129);
function vt(n, t) {
  if (!tt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nt !== void 0 ? nt.createHTML(t) : t;
}
const Ct = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = P;
  for (let h = 0; h < e; h++) {
    const o = n[h];
    let l, d, p = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, d = a.exec(o), d !== null); ) m = a.lastIndex, a === P ? d[1] === "!--" ? a = ot : d[1] !== void 0 ? a = lt : d[2] !== void 0 ? (_t.test(d[2]) && (s = RegExp("</" + d[2], "g")), a = $) : d[3] !== void 0 && (a = $) : a === $ ? d[0] === ">" ? (a = s ?? P, p = -1) : d[1] === void 0 ? p = -2 : (p = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? $ : d[3] === '"' ? ct : ht) : a === ct || a === ht ? a = $ : a === ot || a === lt ? a = P : (a = $, s = void 0);
    const f = a === $ && n[h + 1].startsWith("/>") ? " " : "";
    r += a === P ? o + St : p >= 0 ? (i.push(l), o.slice(0, p) + gt + o.slice(p) + g + f) : o + g + (p === -2 ? h : f);
  }
  return [vt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
let Y = class kt {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const h = t.length - 1, o = this.parts, [l, d] = Ct(t, e);
    if (this.el = kt.createElement(l, i), v.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (s = v.nextNode()) !== null && o.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const p of s.getAttributeNames()) if (p.endsWith(gt)) {
          const m = d[a++], f = s.getAttribute(p).split(g), _ = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: r, name: _[2], strings: f, ctor: _[1] === "." ? Tt : _[1] === "?" ? Rt : _[1] === "@" ? Ht : W }), s.removeAttribute(p);
        } else p.startsWith(g) && (o.push({ type: 6, index: r }), s.removeAttribute(p));
        if (_t.test(s.tagName)) {
          const p = s.textContent.split(g), m = p.length - 1;
          if (m > 0) {
            s.textContent = L ? L.emptyScript : "";
            for (let f = 0; f < m; f++) s.append(p[f], O()), v.nextNode(), o.push({ type: 2, index: ++r });
            s.append(p[m], O());
          }
        }
      } else if (s.nodeType === 8) if (s.data === bt) o.push({ type: 2, index: r });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(g, p + 1)) !== -1; ) o.push({ type: 7, index: r }), p += g.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = w.createElement("template");
    return i.innerHTML = t, i;
  }
};
function M(n, t, e = n, i) {
  var a, h;
  if (t === y) return t;
  let s = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const r = N(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== r && ((h = s == null ? void 0 : s._$AO) == null || h.call(s, !1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = M(n, s._$AS(n, t.values), s, i)), t;
}
class Pt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? w).importNode(e, !0);
    v.currentNode = s;
    let r = v.nextNode(), a = 0, h = 0, o = i[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let l;
        o.type === 2 ? l = new z(r, r.nextSibling, this, t) : o.type === 1 ? l = new o.ctor(r, o.name, o.strings, this, t) : o.type === 6 && (l = new Ot(r, this, t)), this._$AV.push(l), o = i[++h];
      }
      a !== (o == null ? void 0 : o.index) && (r = v.nextNode(), a++);
    }
    return v.currentNode = w, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class z {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = M(this, t, e), N(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Et(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Y.createElement(vt(i.h, i.h[0]), this.options)), i);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === s) this._$AH.p(e);
    else {
      const a = new Pt(s, this), h = a.u(this.options);
      a.p(e), this.T(h), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new Y(t)), e;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t) s === e.length ? e.push(i = new z(this.O(O()), this.O(O()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = rt(t).nextSibling;
      rt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = M(this, t, e, 0), a = !N(t) || t !== this._$AH && t !== y, a && (this._$AH = t);
    else {
      const h = t;
      let o, l;
      for (t = r[0], o = 0; o < r.length - 1; o++) l = M(this, h[i + o], e, o), l === y && (l = this._$AH[o]), a || (a = !N(l) || l !== this._$AH[o]), l === u ? t = u : t !== u && (t += (l ?? "") + r[o + 1]), this._$AH[o] = l;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Tt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Rt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ht extends W {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = M(this, t, e, 0) ?? u) === y) return;
    const i = this._$AH, s = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== u && (i === u || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ot {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const Z = T.litHtmlPolyfillSupport;
Z == null || Z(Y, z), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.3.3");
const Nt = (n, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new z(t.insertBefore(O(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = { ATTRIBUTE: 1, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, zt = (n) => (...t) => ({ _$litDirective$: n, values: t });
let jt = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = (n) => n.strings === void 0, Ut = {}, Dt = (n, t = Ut) => n._$AH = t;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = zt(class extends jt {
  constructor(n) {
    if (super(n), n.type !== x.PROPERTY && n.type !== x.ATTRIBUTE && n.type !== x.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!It(n)) throw Error("`live` bindings can only contain a single expression");
  }
  render(n) {
    return n;
  }
  update(n, [t]) {
    if (t === y || t === u) return t;
    const e = n.element, i = n.name;
    if (n.type === x.PROPERTY) {
      if (t === e[i]) return y;
    } else if (n.type === x.BOOLEAN_ATTRIBUTE) {
      if (!!t === e.hasAttribute(i)) return y;
    } else if (n.type === x.ATTRIBUTE && e.getAttribute(i) === t + "") return y;
    return Dt(n), t;
  }
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, et = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, it = Symbol(), dt = /* @__PURE__ */ new WeakMap();
let wt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== it) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = dt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && dt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const qt = (n) => new wt(typeof n == "string" ? n : n + "", void 0, it), Bt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new wt(e, n, it);
}, Wt = (n, t) => {
  if (et) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = D.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, ut = et ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return qt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Vt, defineProperty: Zt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: Gt, getOwnPropertySymbols: Kt, getPrototypeOf: Jt } = Object, b = globalThis, mt = b.trustedTypes, Yt = mt ? mt.emptyScript : "", F = b.reactiveElementPolyfillSupport, R = (n, t) => n, Q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Yt : null;
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
} }, xt = (n, t) => !Vt(n, t), ft = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class S extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ft) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Zt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const h = s == null ? void 0 : s.call(this);
      r == null || r.call(this, a), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const t = Jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const e = this.properties, i = [...Gt(e), ...Kt(e)];
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
      for (const s of i) e.unshift(ut(s));
    } else t !== void 0 && e.push(ut(t));
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
    return Wt(t, this.constructor.elementStyles), t;
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
      const h = i.getPropertyOptions(s), o = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((r = h.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? h.converter : Q;
      this._$Em = s;
      const l = o.fromAttribute(e, h.type);
      this[s] = l ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    var a;
    if (t !== void 0) {
      const h = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = h.getPropertyOptions(t)), !((i.hasChanged ?? xt)(r, e) || i.useDefault && i.reflect && r === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(h._$Eu(t, i)))) return;
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
        const { wrapped: h } = a, o = this[r];
        h !== !0 || this._$AL.has(r) || o === void 0 || this.C(r, void 0, a, o);
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
}
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[R("elementProperties")] = /* @__PURE__ */ new Map(), S[R("finalized")] = /* @__PURE__ */ new Map(), F == null || F({ ReactiveElement: S }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class H extends S {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Nt(e, this.renderRoot, this.renderOptions);
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
    return y;
  }
}
var yt;
H._$litElement$ = !0, H.finalized = !0, (yt = k.litElementHydrateSupport) == null || yt.call(k, { LitElement: H });
const G = k.litElementPolyfillSupport;
G == null || G({ LitElement: H });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.2");
const Qt = {
  play: "M8 5L19 12L8 19Z",
  pause: "M7 5H10V19H7ZM14 5H17V19H14Z",
  previous: "M6 5V19M18 5L8 12L18 19Z",
  next: "M18 5V19M6 5L16 12L6 19Z",
  shuffle: "M3 6H5C10 6 14 18 19 18H21M17 14L21 18L17 22M3 18H5C7 18 8 16 9 14M14 9C16 6 17 6 21 6M17 2L21 6L17 10",
  devices: "M3 4H17V14H3ZM8 14V18M5 18H11M16 10H22V21H16Z",
  queue: "M3 6H21M3 12H15M3 18H11M18 15L22 18L18 21Z"
};
function A(n) {
  return Mt`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d=${Qt[n]} /></svg>`;
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
], Xt = [
  "Qmusic",
  "Qmusic 90s & 00s",
  "Radio 538",
  "Radio Veronica",
  "Sky Radio",
  "NPO Radio 2"
];
function E(n, t, e = []) {
  return ["metz", ...e].some(
    (i) => i.trim() && `${n} ${t}`.toLocaleLowerCase().includes(i.toLocaleLowerCase().trim())
  );
}
function At(n) {
  return typeof n == "string" && (/^https?:\/\//i.test(n) || /^\/(?!\/)/.test(n)) ? n : "";
}
function I(n, t = 0) {
  var s, r, a, h, o, l;
  const e = n ?? {}, i = e.track ?? e.show ?? e.episode ?? e.media_item ?? (!e.uri && !e.media_content_id && e.album ? e.album : e);
  return {
    id: i.id ?? i.item_id ?? i.uri ?? i.media_content_id ?? "",
    uri: i.uri ?? i.media_content_id ?? "",
    title: i.name ?? i.title ?? "Onbekend",
    artist: Array.isArray(i.artists) ? i.artists.map((d) => typeof d == "string" ? d : d.name).join(", ") : i.artist ?? "",
    album: typeof i.album == "string" ? i.album : ((s = i.album) == null ? void 0 : s.name) ?? "",
    image: At(
      i.image ?? i.image_url ?? i.thumbnail ?? ((a = (r = i.images) == null ? void 0 : r[0]) == null ? void 0 : a.url) ?? ((l = (o = (h = i.album) == null ? void 0 : h.images) == null ? void 0 : o[0]) == null ? void 0 : l.url)
    ),
    duration: i.duration_ms ? i.duration_ms / 1e3 : i.duration ?? 0,
    kind: i.type ?? i.media_type ?? i.media_content_type ?? "track",
    position: t,
    playable: !!(i.uri ?? i.media_content_id) && i.available !== !1 && i.is_playable !== !1 && !i.is_local && i.can_play !== !1,
    browsable: i.can_expand ?? ["playlist", "album", "artist", "show", "podcast"].includes(
      i.type ?? i.media_type
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
class te {
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
    const h = this.call(t, e, i, !0, s).catch((o) => {
      throw /429|rate.?limit|too many/i.test(String((o == null ? void 0 : o.message) ?? o)) && (this.cooldown = Date.now() + 6e4), o;
    });
    this.cache.set(r, { until: Date.now() + 3e4, value: h }), this.cache.size > 100 && this.cache.delete(this.cache.keys().next().value);
    try {
      return await h;
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
    var f, _, st, at;
    let a = "get_playlist_favorites", h = { limit: 50, offset: Number(s) || 0 };
    if (r) {
      const C = {
        playlist: ["get_playlist_items", "playlist_id"],
        album: ["get_album_tracks", "album_id"],
        artist: ["get_artist_top_tracks", "artist_id"],
        show: ["get_show_episodes", "show_id"]
      }[r.kind];
      if (!C)
        throw new Error(
          "Deze collectie kan niet via SpotifyPlus worden geopend."
        );
      a = C[0], h[C[1]] = r.id, r.kind === "artist" && (h = { artist_id: r.id });
    } else i ? (a = "search_all", h = {
      criteria: i,
      criteria_type: "album,artist,playlist,track,show,episode",
      limit_total: 50
    }) : t === "Wachtrij" ? (a = "get_player_queue_info", h = {}) : t === "Recent afgespeeld" ? (a = "get_player_recent_tracks", h = { limit: 50, ...s ? { before: Number(s) } : {} }) : e === "track" || t === "Favorieten" ? a = "get_track_favorites" : e === "album" ? a = "get_album_favorites" : e === "artist" ? (a = "get_artists_followed", h = { limit: 50, ...s ? { after: s } : {} }) : e === "show" && (a = "get_show_favorites");
    const l = (await this.sp(a, h, !0)).result;
    if (l == null)
      throw new Error(
        "Onbekend SpotifyPlus-responseformaat: result ontbreekt."
      );
    let d = [];
    if (i)
      for (const j of [
        "albums",
        "artists",
        "playlists",
        "tracks",
        "shows",
        "episodes"
      ])
        d.push(...((f = l[j]) == null ? void 0 : f.items) ?? []);
    else
      d = Array.isArray(l) ? l : l.items ?? ((_ = l.artists) == null ? void 0 : _.items) ?? l.queue ?? [];
    const p = l.artists ?? l, m = ((st = p.cursors) == null ? void 0 : st.after) ?? (t === "Recent afgespeeld" ? (at = p.cursors) == null ? void 0 : at.before : void 0);
    return {
      items: d.map(
        (j, C) => I(
          j,
          (t === "Recent afgespeeld" ? 0 : Number(s) || 0) + C
        )
      ),
      more: !i && t !== "Wachtrij" && (r == null ? void 0 : r.kind) !== "artist" && (!!p.next || !!m && d.length === 50),
      total: p.total,
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
        })).children ?? []).map((p, m) => I(p, m)),
        more: !1
      };
    if (t === "Wachtrij") {
      const d = await this.read(
        "music_assistant",
        "get_queue",
        {},
        { entity_id: r }
      ), p = d[r] ?? d;
      return {
        items: [p.current_item, p.next_item].filter(Boolean).map(I),
        more: !1,
        note: `${p.items ?? 0} items. De HA-API geeft alleen het huidige en volgende item terug; de volledige wachtrij staat in Music Assistant.`
      };
    }
    const h = await this.maEntry();
    let o;
    i ? o = await this.read("music_assistant", "search", {
      config_entry_id: h,
      name: i,
      media_type: t === "Radio" ? ["radio"] : ["track", "album", "artist", "playlist", "radio"],
      limit: 50
    }) : o = await this.read("music_assistant", "get_library", {
      config_entry_id: h,
      media_type: t === "Radio" ? "radio" : e,
      ...t === "Favorieten" ? { favorite: !0 } : {},
      ...t === "Recent afgespeeld" ? { order_by: "last_played_desc" } : {},
      limit: 50,
      offset: s
    });
    const l = i ? Object.values(o).filter(Array.isArray).flat() : o.items ?? [];
    return {
      items: l.map((d, p) => I(d, s + p)),
      more: !i && l.length === 50
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
        (r) => !E(r.id, r.name, this.config.excluded_devices)
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
    }).filter((i) => !E(i.id, i.name, this.config.excluded_devices));
  }
  async allDevices(t, e) {
    const i = await Promise.allSettled([
      this.devices(!0, t),
      this.devices(!1, t)
    ]), s = [], r = [];
    return i.forEach((a, h) => {
      var l, d, p;
      const o = h === 0 ? "spotify" : "music_assistant";
      if (a.status === "rejected") {
        r.push(
          `${h === 0 ? "Spotify Connect" : "Music Assistant"}: ${((l = a.reason) == null ? void 0 : l.message) ?? a.reason}`
        );
        return;
      }
      for (const m of a.value)
        E(
          m.id,
          ((d = this.hass.states[m.entity ?? ""]) == null ? void 0 : d.attributes.friendly_name) ?? m.name,
          this.config.excluded_devices
        ) || s.push({
          ...m,
          provider: o,
          active: o === "spotify" ? m.active : ((p = this.hass.states[m.id]) == null ? void 0 : p.state) === "playing",
          selected: o === "spotify" ? e === "spotify" && m.active : m.id === t
        });
    }), { devices: s, warnings: r };
  }
  async play(t, e, i, s, r = !1) {
    if (!t) {
      const a = this.hass.states[e];
      if (!this.config.ma_players.some((h) => h.entity === e) || !a || ["unknown", "unavailable"].includes(a.state) || E(
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
const ee = Bt`
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
`, B = class B extends H {
  constructor() {
    super(...arguments), this.source = "spotify", this.session = "spotify", this.view = "Home", this.kind = "playlist", this.query = "", this.filter = "", this.page = { items: [], more: !1 }, this.loading = !1, this.busy = !1, this.error = "", this.sheet = "", this.devices = [], this.player = "", this.tick = 0, this.requestId = 0, this.cursor = 0, this.initialized = !1, this.manualSession = !1, this.manualPlayer = !1;
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
        (r) => !E(r.entity, r.name ?? "", t.excluded_devices)
      )
    }, this.source = t.default_source ?? "spotify", this.player = t.default_player ?? ((i = this.config.ma_players[0]) == null ? void 0 : i.entity) ?? "";
    try {
      const r = JSON.parse(localStorage.getItem(this.storageKey) ?? "{}");
      ["spotify", "music_assistant", "radio"].includes(r.source) && (this.source = r.source), K.includes(r.view) && (this.view = r.view), this.config.ma_players.some((a) => a.entity === r.player) && (this.player = r.player);
    } catch {
    }
    this.config.ma_players.some((r) => r.entity === this.player) || (this.player = ((s = this.config.ma_players[0]) == null ? void 0 : s.entity) ?? ""), this.session = this.source, this.manualSession = !1, this.manualPlayer = !1, this.initialized = !1, this.api = void 0, this.requestId++;
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
    this.hass && this.config && (this.api ? this.api.hass = this.hass : this.api = new te(this.hass, this.config), this.initialized ? t.has("hass") && this.detectSession() : (this.players.some((i) => i.entity === this.player) || (this.player = ((e = this.players[0]) == null ? void 0 : e.entity) ?? ""), this.initialized = !0, this.detectSession(), this.load()));
  }
  detectSession() {
    var i;
    if (!this.manualPlayer && ((i = this.hass.states[this.player]) == null ? void 0 : i.state) !== "playing") {
      const s = this.players.find(
        (r) => {
          var a;
          return ((a = this.hass.states[r.entity]) == null ? void 0 : a.state) === "playing";
        }
      );
      s && (this.player = s.entity, this.save());
    }
    const t = this.hass.states[this.config.spotify_entity], e = this.hass.states[this.player];
    this.manualSession && (t == null ? void 0 : t.state) === "playing" && (e == null ? void 0 : e.state) === "playing" || ((t == null ? void 0 : t.state) === "playing" && (e == null ? void 0 : e.state) !== "playing" ? this.session = "spotify" : (e == null ? void 0 : e.state) === "playing" && (t == null ? void 0 : t.state) !== "playing" && (this.session = "music_assistant"));
  }
  get players() {
    return this.config.ma_players.filter(
      (t) => {
        var e, i;
        return !E(
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
  async refreshDevices() {
    const t = await this.api.allDevices(this.player, this.session);
    this.devices = t.devices, this.error = t.warnings.join(" · ");
  }
  showDevices() {
    this.devices = [], this.modal("devices"), this.action(() => this.refreshDevices());
  }
  selectDevice(t, e = !1) {
    t.available && this.action(async () => {
      var i, s;
      if (t.provider === "spotify")
        await this.api.sp("player_transfer_playback", {
          device_id: t.id,
          play: ((i = this.hass.states[this.config.spotify_entity]) == null ? void 0 : i.state) === "playing"
        }), this.session = "spotify";
      else {
        if (e) {
          if (this.session === "spotify" || !this.player || t.id === this.player)
            throw new Error(
              "Overzetten is alleen beschikbaar tussen Music Assistant-kamers."
            );
          await this.api.call(
            "music_assistant",
            "transfer_queue",
            {
              source_player: this.player,
              auto_play: ((s = this.state) == null ? void 0 : s.state) === "playing"
            },
            !1,
            { entity_id: t.id }
          );
        }
        this.player = t.id, this.manualPlayer = !0, this.session = "music_assistant";
      }
      this.manualSession = !0, this.detectSession(), t.provider === "spotify" && this.source !== "spotify" ? this.changeSource("spotify") : t.provider === "music_assistant" && this.source === "spotify" && this.changeSource("music_assistant"), this.save(), this.api.cache.clear(), await this.refreshDevices();
    });
  }
  art(t, e = "", i = "") {
    return t ? c`<img
          class=${i}
          src=${At(t)}
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
        ${A("shuffle")}</button
      ><button
        aria-label="Vorig nummer"
        ?disabled=${!this.supports(16) || this.busy}
        @click=${() => this.control("media_previous_track")}
      >
        ${A("previous")}</button
      >${this.toggle()}<button
        aria-label="Volgend nummer"
        ?disabled=${!this.supports(32) || this.busy}
        @click=${() => this.control("media_next_track")}
      >
        ${A("next")}</button
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
              ${A("queue")}
            </button>` : u}
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
            </button>` : u}
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
      ${A(((i = this.state) == null ? void 0 : i.state) === "playing" ? "pause" : "play")}
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
                      </select>` : u}<input
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
                ${(this.config.radio_stations ?? Xt.map((s) => ({ name: s }))).map(
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
              <br />` : u}
      ${this.page.note ? c`<p class="note">${this.page.note}</p>` : u}
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
              </p>` : u}${this.page.more ? c`<button class="more" ?disabled=${this.loading} @click=${() => void this.load(!0)}>Meer laden</button>` : u}`;
  }
  settings() {
    var t;
    return c`<div class="settings">
      <h1>Instellingen</h1>
      <p>Dunk Music 0.1.1</p>
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
    var e, i, s, r, a, h, o;
    if (this.sheet === "devices")
      return c`<h2 id="dialog-title">Alle apparaten</h2>
        <p class="muted">
          Spotify Connect en Music Assistant in één lijst. Een Music
          Assistant-kamer kiezen start geen muziek. Spotify Connect verplaatst
          alleen de Spotify-sessie.
        </p>
        ${this.busy && !this.devices.length ? c`<p role="status">Apparaten laden…</p>` : u}
        ${this.devices.map(
        (l) => {
          var d, p;
          return c`<div
              class=${`device ${l.active || l.selected ? "active" : ""}`}
            >
              <button
                ?disabled=${!l.available || this.busy}
                @click=${() => this.selectDevice(l)}
              >
                ${l.name} ·
                ${l.provider === "spotify" ? "Spotify Connect" : "Music Assistant"}
                ·
                ${l.available ? l.active ? l.provider === "spotify" ? "Actief" : "Speelt" : l.selected ? "Geselecteerd" : "Beschikbaar" : "Niet beschikbaar"}
              </button>
              ${l.provider === "music_assistant" && this.session !== "spotify" && l.id !== this.player ? c`
                      <button
                        ?disabled=${!l.available || this.busy || !((d = this.api) != null && d.has("music_assistant", "transfer_queue"))}
                        @click=${() => this.selectDevice(l, !0)}
                      >
                        Overzetten
                      </button>
                      ${this.supports(524288) ? c`<button ?disabled=${!l.available || this.busy || !((((p = this.hass.states[l.id]) == null ? void 0 : p.attributes.supported_features) ?? 0) & 524288)} @click=${() => void this.action(() => this.api.call("media_player", "join", { entity_id: this.player, group_members: [l.id] }))}>Groeperen</button>` : u}
                    ` : u}
            </div>`;
        }
      )}
        ${!this.busy && !this.devices.length ? c`<p>Geen apparaten beschikbaar.</p>` : u}
        ${this.session !== "spotify" && this.supports(524288) ? c`<button ?disabled=${this.busy} @click=${() => this.control("unjoin")}>Groep verlaten</button>` : u}`;
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
    const t = ((h = this.state) == null ? void 0 : h.attributes) ?? {};
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
            </button>` : u}`;
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
        <strong>Dunk Music<span class="sr"> 0.1.1</span></strong
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
      this.player = a.target.value, this.manualPlayer = !0, this.save(), this.load();
    }}
              >
                ${this.players.map((a) => {
      var h, o;
      return c`<option value=${a.entity} ?disabled=${!this.hass.states[a.entity] || ["unknown", "unavailable"].includes((h = this.hass.states[a.entity]) == null ? void 0 : h.state)}>${a.name ?? ((o = this.hass.states[a.entity]) == null ? void 0 : o.attributes.friendly_name) ?? a.entity}</option>`;
    })}
              </select>` : u}<select
          aria-label="Bedien afspeelsessie"
          .value=${Lt(this.session === "spotify" ? "spotify" : "music_assistant")}
          @change=${(a) => {
      this.session = a.target.value, this.manualSession = !0, this.manualPlayer = !1, this.detectSession();
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
          ${this.error ? c`<div class="error" role="alert">${this.error}</div>` : u}${this.content()}
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
              </aside>` : u}
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
          ${A("devices")}
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
                >${this.error ? c`<p class="error" role="alert">${this.error}</p>` : u}${this.sheet === "nav" ? c`<h2 id="dialog-title">Navigatie</h2>
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
            </div>` : u}
    </div>`;
  }
};
B.styles = ee, B.properties = {
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
let X = B;
customElements.get("dunk-music-card") || customElements.define("dunk-music-card", X);
const q = window;
q.customCards = q.customCards ?? [];
q.customCards.some((n) => n.type === "dunk-music-card") || q.customCards.push({
  type: "dunk-music-card",
  name: "Dunk Music",
  description: "SpotifyPlus en Music Assistant in één muziekdashboard",
  preview: !1
});
export {
  X as DunkMusicCard
};
//# sourceMappingURL=dunk-music.js.map
