/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, nt = (o) => o, T = Y.trustedTypes, rt = T ? T.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, yt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + v, Mt = `<${ft}>`, E = document, z = () => E.createComment(""), P = (o) => o === null || typeof o != "object" && typeof o != "function", At = Array.isArray, St = (o) => At(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, ct = />/g, x = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), gt = /'/g, ht = /"/g, vt = /^(?:script|style|textarea|title)$/i, wt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), c = wt(1), jt = wt(2), C = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), D = E.createTreeWalker(E, 129);
function kt(o, t) {
  if (!At(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return rt !== void 0 ? rt.createHTML(t) : t;
}
const Zt = (o, t) => {
  const e = o.length - 1, i = [];
  let s, A = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = W;
  for (let l = 0; l < e; l++) {
    const n = o[l];
    let r, h, g = -1, u = 0;
    for (; u < n.length && (a.lastIndex = u, h = a.exec(n), h !== null); ) u = a.lastIndex, a === W ? h[1] === "!--" ? a = lt : h[1] !== void 0 ? a = ct : h[2] !== void 0 ? (vt.test(h[2]) && (s = RegExp("</" + h[2], "g")), a = x) : h[3] !== void 0 && (a = x) : a === x ? h[0] === ">" ? (a = s ?? W, g = -1) : h[1] === void 0 ? g = -2 : (g = a.lastIndex - h[2].length, r = h[1], a = h[3] === void 0 ? x : h[3] === '"' ? ht : gt) : a === ht || a === gt ? a = x : a === lt || a === ct ? a = W : (a = x, s = void 0);
    const d = a === x && o[l + 1].startsWith("/>") ? " " : "";
    A += a === W ? n + Mt : g >= 0 ? (i.push(r), n.slice(0, g) + yt + n.slice(g) + v + d) : n + v + (g === -2 ? l : d);
  }
  return [kt(o, A + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
let et = class xt {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let A = 0, a = 0;
    const l = t.length - 1, n = this.parts, [r, h] = Zt(t, e);
    if (this.el = xt.createElement(r, i), D.currentNode = this.el.content, e === 2 || e === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (s = D.nextNode()) !== null && n.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const g of s.getAttributeNames()) if (g.endsWith(yt)) {
          const u = h[a++], d = s.getAttribute(g).split(v), m = /([.?@])?(.*)/.exec(u);
          n.push({ type: 1, index: A, name: m[2], strings: d, ctor: m[1] === "." ? Wt : m[1] === "?" ? Ht : m[1] === "@" ? Yt : F }), s.removeAttribute(g);
        } else g.startsWith(v) && (n.push({ type: 6, index: A }), s.removeAttribute(g));
        if (vt.test(s.tagName)) {
          const g = s.textContent.split(v), u = g.length - 1;
          if (u > 0) {
            s.textContent = T ? T.emptyScript : "";
            for (let d = 0; d < u; d++) s.append(g[d], z()), D.nextNode(), n.push({ type: 2, index: ++A });
            s.append(g[u], z());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ft) n.push({ type: 2, index: A });
      else {
        let g = -1;
        for (; (g = s.data.indexOf(v, g + 1)) !== -1; ) n.push({ type: 7, index: A }), g += v.length - 1;
      }
      A++;
    }
  }
  static createElement(t, e) {
    const i = E.createElement("template");
    return i.innerHTML = t, i;
  }
};
function G(o, t, e = o, i) {
  var a, l;
  if (t === C) return t;
  let s = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const A = P(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== A && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), A === void 0 ? s = void 0 : (s = new A(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = G(o, s._$AS(o, t.values), s, i)), t;
}
class Gt {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? E).importNode(e, !0);
    D.currentNode = s;
    let A = D.nextNode(), a = 0, l = 0, n = i[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let r;
        n.type === 2 ? r = new U(A, A.nextSibling, this, t) : n.type === 1 ? r = new n.ctor(A, n.name, n.strings, this, t) : n.type === 6 && (r = new Nt(A, this, t)), this._$AV.push(r), n = i[++l];
      }
      a !== (n == null ? void 0 : n.index) && (A = D.nextNode(), a++);
    }
    return D.currentNode = E, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
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
    t = G(this, t, e), P(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : St(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(E.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var A;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = et.createElement(kt(i.h, i.h[0]), this.options)), i);
    if (((A = this._$AH) == null ? void 0 : A._$AD) === s) this._$AH.p(e);
    else {
      const a = new Gt(s, this), l = a.u(this.options);
      a.p(e), this.T(l), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new et(t)), e;
  }
  k(t) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const A of t) s === e.length ? e.push(i = new U(this.O(z()), this.O(z()), this, this.options)) : i = e[s], i._$AI(A), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t !== this._$AB; ) {
      const s = nt(t).nextSibling;
      nt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, A) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = A, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(t, e = this, i, s) {
    const A = this.strings;
    let a = !1;
    if (A === void 0) t = G(this, t, e, 0), a = !P(t) || t !== this._$AH && t !== C, a && (this._$AH = t);
    else {
      const l = t;
      let n, r;
      for (t = A[0], n = 0; n < A.length - 1; n++) r = G(this, l[i + n], e, n), r === C && (r = this._$AH[n]), a || (a = !P(r) || r !== this._$AH[n]), r === p ? t = p : t !== p && (t += (r ?? "") + A[n + 1]), this._$AH[n] = r;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Wt extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ht extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Yt extends F {
  constructor(t, e, i, s, A) {
    super(t, e, i, s, A), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = G(this, t, e, 0) ?? p) === C) return;
    const i = this._$AH, s = t === p && i !== p || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, A = t !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i), A && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    G(this, t);
  }
}
const K = Y.litHtmlPolyfillSupport;
K == null || K(et, U), (Y.litHtmlVersions ?? (Y.litHtmlVersions = [])).push("3.3.3");
const Ot = (o, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const A = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new U(t.insertBefore(z(), A), A, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = { ATTRIBUTE: 1, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, zt = (o) => (...t) => ({ _$litDirective$: o, values: t });
let Pt = class {
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
const Ut = (o) => o.strings === void 0, Lt = {}, Xt = (o, t = Lt) => o._$AH = t;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = zt(class extends Pt {
  constructor(o) {
    if (super(o), o.type !== M.PROPERTY && o.type !== M.ATTRIBUTE && o.type !== M.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!Ut(o)) throw Error("`live` bindings can only contain a single expression");
  }
  render(o) {
    return o;
  }
  update(o, [t]) {
    if (t === C || t === p) return t;
    const e = o.element, i = o.name;
    if (o.type === M.PROPERTY) {
      if (t === e[i]) return C;
    } else if (o.type === M.BOOLEAN_ATTRIBUTE) {
      if (!!t === e.hasAttribute(i)) return C;
    } else if (o.type === M.ATTRIBUTE && e.getAttribute(i) === t + "") return C;
    return Xt(o), t;
  }
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, at = X.ShadowRoot && (X.ShadyCSS === void 0 || X.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ot = Symbol(), dt = /* @__PURE__ */ new WeakMap();
let Bt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (at && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = dt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && dt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Qt = (o) => new Bt(typeof o == "string" ? o : o + "", void 0, ot), Jt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, A) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[A + 1], o[0]);
  return new Bt(e, o, ot);
}, Ft = (o, t) => {
  if (at) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = X.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, ut = at ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Qt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Vt, defineProperty: Kt, getOwnPropertyDescriptor: qt, getOwnPropertyNames: _t, getOwnPropertySymbols: $t, getPrototypeOf: te } = Object, w = globalThis, It = w.trustedTypes, ee = It ? It.emptyScript : "", q = w.reactiveElementPolyfillSupport, N = (o, t) => o, it = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? ee : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, Dt = (o, t) => !Vt(o, t), Ct = { attribute: !0, type: String, converter: it, reflect: !1, useDefault: !1, hasChanged: Dt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class j extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Kt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: A } = qt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const l = s == null ? void 0 : s.call(this);
      A == null || A.call(this, a), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const t = te(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const e = this.properties, i = [..._t(e), ...$t(e)];
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
    return Ft(t, this.constructor.elementStyles), t;
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
    var A;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((A = i.converter) == null ? void 0 : A.toAttribute) !== void 0 ? i.converter : it).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var A, a;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), n = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((A = l.converter) == null ? void 0 : A.fromAttribute) !== void 0 ? l.converter : it;
      this._$Em = s;
      const r = n.fromAttribute(e, l.type);
      this[s] = r ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, A) {
    var a;
    if (t !== void 0) {
      const l = this.constructor;
      if (s === !1 && (A = this[t]), i ?? (i = l.getPropertyOptions(t)), !((i.hasChanged ?? Dt)(A, e) || i.useDefault && i.reflect && A === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(l._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: A }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), A !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [A, a] of this._$Ep) this[A] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [A, a] of s) {
        const { wrapped: l } = a, n = this[A];
        l !== !0 || this._$AL.has(A) || n === void 0 || this.C(A, void 0, a, n);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var A;
        return (A = s.hostUpdate) == null ? void 0 : A.call(s);
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
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[N("elementProperties")] = /* @__PURE__ */ new Map(), j[N("finalized")] = /* @__PURE__ */ new Map(), q == null || q({ ReactiveElement: j }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis;
class O extends j {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ot(e, this.renderRoot, this.renderOptions);
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
    return C;
  }
}
var bt;
O._$litElement$ = !0, O.finalized = !0, (bt = R.litElementHydrateSupport) == null || bt.call(R, { LitElement: O });
const _ = R.litElementPolyfillSupport;
_ == null || _({ LitElement: O });
(R.litElementVersions ?? (R.litElementVersions = [])).push("4.2.2");
const ie = {
  play: "M8 5L19 12L8 19Z",
  pause: "M7 5H10V19H7ZM14 5H17V19H14Z",
  previous: "M6 5V19M18 5L8 12L18 19Z",
  next: "M18 5V19M6 5L16 12L6 19Z",
  shuffle: "M3 6H5C10 6 14 18 19 18H21M17 14L21 18L17 22M3 18H5C7 18 8 16 9 14M14 9C16 6 17 6 21 6M17 2L21 6L17 10",
  devices: "M3 4H17V14H3ZM8 14V18M5 18H11M16 10H22V21H16Z",
  queue: "M3 6H21M3 12H15M3 18H11M18 15L22 18L18 21Z"
};
function S(o) {
  return jt`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d=${ie[o]} /></svg>`;
}
const B = { qmusic: "data:image/png;base64,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", q90: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAG2GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OTc3NywgMjAyMy8wNi8yNS0yMzo1NzoxNCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTliZjE0ZjktY2UyMC00ZGU5LTljZTMtYjk3ZGMzMjg0NGM4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI4MDA3RTBGNDYxRjExRUNBNjIyQzYyNEREREVCQjk0IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5NjBhN2ZkLTA3OTMtNDg1My04ZTQ1LTliYTA4YWJhOTEzZiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjEtMTEtMjlUMTU6MDk6MTArMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTA4LTI5VDExOjU4OjQ2KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA4LTI5VDExOjU4OjQ2KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmExNmM5NjU4LWZmNmUtNDBmNS04YjNjLTc2ODU5MGUzNTVlNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDplOWJmMTRmOS1jZTIwLTRkZTktOWNlMy1iOTdkYzMyODQ0YzgiLz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Yzg1NGQyMjMtYThkMy00NjgzLWI5ZDMtZGVhYjE2ZjVjOGMxIiBzdEV2dDp3aGVuPSIyMDIzLTA4LTI5VDExOjU2OjA3KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMSAoMjAyMzA4MjYubS4yMzA0IDgyNGRiMzUpICAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTk2MGE3ZmQtMDc5My00ODUzLThlNDUtOWJhMDhhYmE5MTNmIiBzdEV2dDp3aGVuPSIyMDIzLTA4LTI5VDExOjU4OjQ2KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjUuMSAoMjAyMzA4MjYubS4yMzA0IDgyNGRiMzUpICAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rwXCIAAAl4klEQVR4nO3de/wtU/3H8dc5IZHScaZyiVSDKJdEg2ah6IIURZF09evqVj8l/dy6K0X3yxEhSqGSpIuwpjJCRVGMkJNUk/vlcBzO7481X4/dPntm7z0z+zLfeT8fj+/jcc6embXWfM+Zz55Zs9ZnzVm6dCkiIk0wd9INEBEZlAKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0hgKWiDSGApaINIYClog0xnKTbsC4zZkzZ9JNECAN/DWBZwFrA08F5gOPB1bu2G0u8AhwZ/bzb+BW4AbgBi9O7hlfi6fT0qVLJ92EsZrTuhNWwBqrNPBXBp4HbAlsAWyEC1Qr1lD8TcCVwG+BCLjMi5MHaii3MVp3/bbuhBWwRioN/McC2wAvA3YENmZ8XQ+LgAuAc4GzvDj5z5jqnZjWXb+tO2EFrNqlgf9E4FXAnsD2wOMm2iBnCfAzYAHwIy9OHp5we0aidddv605YAasWaeCviAtSe+HuplaYaIOKLQSOAxZ4cXLvpBtTp9Zdv607YQWsStLA94F3AG8GnjTh5gzrNuATwBe8OFk86cbUoXXXb+tOWAFraGngzwF2Bg4Edphwc+pwI3CwFyc/nHRDqmrd9du6E1bAGlga+HNx/VKHAptMuDmjcDbwLi9O/jXphpTVuuu3dSesgNVXGviPAd4A/B/wzAk3Z9RS4I1enPxk0g0po3XXb+tOWAGrUBr4uwCfxI2XapMPA0d5cdKoC6J112/rTlgBq6c08LcAPg1sO+m2TNBZwD5NGnzauuu3dSesgPVf0sBfDXdH9bZJt2VKXAjs5sXJXZNuyCBad/227oQVsIBH3/y9BTgGWG3CzZk2lwA7eHFy/6Qb0k/rrt/WnbACFmngbwCcgJtCI739Enj5tI/Xatv127psDW2W3VUdgBs8OQ3TZ7otBe4AZrIwrIQbQf8EYNzfNC8Cvoq7C5UpoTuslkgDf23gm7i5fpO0CPg9cDlwPZAAfwX+5cXJ3b0OSAN/OWB1YE1gPeD5wObAZow+8B7sxcnxI66jtNZdv6074RYGrDTw98A9Aj5hAtUvAi4Czgcs8CcvTpbUUXAa+I8DXgK8EjevcRRThR4Ctvbi5PIRlF1Z667f1p1wiwJWGvjL4zrVDx5z1Xfjhgh8D7hwHMMEsuC1N3AQ8Jyai78e2GQaO+Fbd/227oRbErDSwF8d+C7wwjFVuRSXh+ok4DwvTh4cU73LSAN/V1yg3qDGYj/txcn7ayyvFq27flt3wi0IWGngbwmcAzxlHNUBJwJf9eLkpjHUN5A08FcA3g8cST0vlx4GNvbi5JoayqpN667f1p3wLA9YaeDvBpzG6DujFwKfAb7uxcmiEddVWhr4m+MeT9epobifenHyshrKqU3rrt/WnfAsDlhp4B8IfJbRpiS+GfgocPK0j1GakQb+fNzj6gtqKG57L04uqqGcWrTu+m3dCc/CgJWNrzoOl69qVO7CBaovNmmu3Yw08FfCBa2qwzp+6cXJi2toUi1ad/227oRnWcDKgtWXcVlAR+Fh4AvAR7w4uX1EdYxFlnv+Yqrn9trci5Pf1dCkytp2/Woh1QbL8lYtYHTB6hLcxXlw04MVQDaheVeg6rnsX0NzpATdYTVUFqxOwY09qttdwCHACU3LDzWINPB3x3XEl3U/sHreyPxxatv1qzus5voSowlW5wEbeXGyYDYGKwAvTs7G9WeVtRJudL2MmQJWA6WB/xHg7TUXez/wdi9Odvbi5Jaay55G+wNV3nLuWVdDZHB6JGyYbOjC8TUX+ydgTy9O/lxzuVMtDfyvA/uVPHwx8KRJT9dp2/WrO6wGyfpejq+52FOBoG3BKvNp3JSiMlbApaCRMVLAaog08DfGdbLX5RFc6pR9vTi5r8ZyG8OLkwS3nH1Zbc5/PxEKWA2QjdQ+B1i5piLvAXaZ5jxPY/S9CseOa2K5ZBSwplyWvO5M6pkLB/BPYNumrsM3AmfhBseWsVn27yNjooA1/Y6mvkePvwLbeHHy+5rKazwvTu4Erih5+GOBdetrjfSjgDXF0sDfHrdMfB3+DGznxckNNZU3m0QVjl2vtlZIX7qdnVJZv9W3qOdL5a+4LAP/qqGs2eiSCsf6tbVC+tId1vRaAKxRQzk34O6sFKzyVUnK9/S6GiH9KWBNoTTwX41bVKGqfwMv9eLk7zWUNZvdVOFYLUI7RgpYUyYN/FVx8wSruh+3EOj1NZQ1q2UZU8tmcJhXZ1ukmALW9DmW6rnYHwH2mpacTQ2hgNUAClhTJA38rYC31lDU4V6cnFNDOW1SdrT/NK6gPWspYE2JLHPosTUU9QPcUvQynFoWd5XRUsCaHnsAW1cs4ybgTbM1j9WIaYhPAyhgTYFsDb1PVizmYVy/1V01NKmNys7TnNiCsW2kgDUd3kL1KR4f9eIkrqMxLVU2YDU+132TKGBNWDZ5tuoS6FcCH6uhOa2UBv7ywFNLHq6ANUYKWJO3N9XurpYC+3lx8lBN7WmjtYCyqWhvq7MhUkwBa4KyN4NVJzd/xYuTy+poT4tV+cJYWFsrpC8FrMl6EfDsCsffARxeU1vabNMKx2omwRgpYE3Wuyoe/+HZsMDpFHhehWMVsMZIY08mJA38p+JWIS5rIW6J+qmVpch5MbAFsD4wHzcyfDnc3eHNwFXAb4DfeHFSNvNnVc8vedxSIKmzIVJMAWty3ky13//HvDipsq7eSGRjyl6HG6ph6N+ZPbMY7O1p4H8b+NI4V/BJA38tXDAt40YvTh6osz1STI+Ek1NlIc5/ACfV1ZA6pIH/mDTw/wc32v5kXFrnYd68zQPeDVydBv6paeA/rf5W9rRjhWOrJP6TEhSwJiAN/GdSraP3uGm6u0oDfyMgBr4GrF6xuDnAPsA1aeC/uWrbBvCyCsf+prZWyEAUsCZjjwrHPgCcWFdDqkoD/w3A5ZTvB8rzeODENPAXjGplmjTwHw/sXKEIBawxU8CajN0rHPudaXkzmAb+h3CLu644wmreBpyd9Y3VbRfKT8m5G/hjjW2RAShgjVka+E8ENq9QxDdrakolWbD66JiqewVwahr4df9/3bfCsedP8K1maylgjV9I+d/7QqotSVWLNPD3ZHzBasae1DhINutHrNJ/pQSJE6CANX7bVTj2bC9OHqmrIWWkgb8uk+tDOzIN/LoWlX0P5ecPLgHOq6kdMgQFrPHbpsKxP6qtFeUtoHy/T1VzgAVp4FfqM8sW+nhLhSKsFyd3VGmDlKOANUbZZOfnlDx8ERN+HEwDf1fcyPVJ8oF3VizjIOAJFY4/uWL9UpIC1nitg3tdX0Y8BWOvPjjh+md8KA38Uos/ZNOFDqpQ993AmRWOlwoUsMbruRWOneio6jTwNwOCSbahw2rAXiWP/SDwxAp1n+bFyf0VjpcKFLDGy69w7O9ra0U5r5lw/d2GHgWfBv6GwAEV6z2h4vFSgQLWeFVZIPWa2lpRTpUR4QB3AsfgJka/FTirYnnbpIE/7DSgz1FtwvnFWpx2spStYbzK5g0HuKG2VgwpDfxVgI0rFPF7YCcvTv7Z8dmJaeDviAtcq5Qocw5ugvV3Btk5m0K0Q4l6On284vFSke6wxqtswLptwmlMNqX8mKV7gV27ghUAXpz8HHhHhXYNtI5jGvhrA1+oUA/A5V6c/KxiGVKRAtZ4PbbkcXfW2YgSquQ8X+DFyd8Ltn+b8o+7G/bbIRtKchLVOtpBqxJNBQWs8So7gffeWlsxvCopY84t2pitUl121Pg6A+xzOC53fhWXAD+sWIbUQAFrvFaadANKKjXmKXPTAPvcUrLsJxVtTAN/J+CokmV3em8WWGXCFLCaYZTpW0ZtkL6veSXLzn1plGUsPW3A+oucrhW1p4cC1njdVfK4+bW2Ynh3Vjh2kP6vTUuWXbR47JHAqiXLnbGI6RndLyhgjdudJY9bbVRZNwd0a4Vjty/amOUHK9vH9O+cMh8LvLZkmZ2O8OLk5hrKkZooYI1XlQt/g9paMbwqS1nt2yfYvpXy2R/+kvP5hpSfsznjCuD4imVIzRSwxqvKt/VmtbVieH/E5ZIvYy3gTb02pIG/EvC+kuVC/nSlsn1iMx4E9vXiZEnFcqRmCljjVeVOpUoerUq8OHkI+G2FIj6eZUno9iFgjQrlXp7z+d0VygT4oBcnk54KJT0oYI3X1RWO3TUbBDkpVcYhecDJne1PA/95wPsrlLkIuDhn2x9xd0llnIseBaeWAtZ4XUv5QaCrM+BUlBE5G7c0e1k7kb1xy+YmnkG1uaw/8+JkUa8N2TSmgeYYdrkZeJPGXE0vBawxylZZqTKm56CamjI0L05uonoe84+mgb87cDrwrIplnd5n+9HAPUOU9wCwuxcnt5VvkoyaAtb4/bLCsbulgV/1Qq/i8xWPn4PL1rlLxXJS4AdFO3hxciPweorHas14CHitFydXVGyXjJgC1vj9uMKxjwE+W1dDhpVlK6iaV76OfrgFg6SL9uLkR7gxXtcX7PYPXOobLdvVAHOWLm3X4/qcOZPst3bSwL+OatlHd/HipErgKy0N/K2Y7BLt9wFP9+LkP4MekK0avTtuHcKn4x7/bgEuBM6ccOqeSlp3/bbuhKcjYB0NHFGhiFuBTb046TnSe9TSwP8y1VeuKesYL04OnVDdU6dt168eCSfjBKDKMuerA98awdLtgzoU+NsE6r0D+NQE6pUpoYA1AV6cLKR6fqUdcTnKx86Lk7uBPYBxLzt2pBcnt4+5TpkiCliT89EaynhPGvhH1VDO0Lw4uQx49xirvAL4yhjrkymkPqwJSgP/+8Craijqc7gkc4/UUNZQsoB55IirWQJs4cXJH0ZcT+O07frVHdZkHYq7GKs6EDgzDfxVayhrKF6cHAV8acTVHKlgJaCANVFenFxL9cGYM3YD/pAG/gtrKm8Y+wPfGFHZt1Hf70gaTgFr8o6gWtqZTusANg38b6aBXyULwsCyej4BvHpEVawG/DoN/Crj1mSWUB/WFEgDf3vgAuoZBT7jPuBE4HgvTmpdhDVLyLcDsC9uCfvl6yw/x73Am704OXMMdTVG667f1p3wFAYsgDTwj6FaupU8S4GfAd8DflR2sGka+PMAgxtOsQcuZcwkfB44ZJCpOW3Quuu3dSc8vQFrOeDnwHYjrGYpLq3wb4A/4B5Fb8IlvHsQNwl4Vdyio2vi0jJvgFumfjOmpwvhd8DrvDipkhBxVmjd9du6E57SgAWQBv6Tcelnqqy03Bb3Ae/y4uSUSTdkklp3/bbuhKc4YAGkgb8+8Csmv7RXU5wKvK2tj4itu35bd8JTHrAA0sDfHJc36wmTbktD/AJ4WZYgsVXadv1OS5+EdMgSye0IDJxCpeV2AA6fdCNk9HSHNcXSwN8Il5Z47Um3pQHuA57mxckdk27IOLXt+tUd1hTz4uRqYEvg0km3ZQTqfnxbGXdXKrOYAtaU8+LkX7jxTxNJJTMC9wHvAdYjfyHUsia52KyMgQJWA3hxstiLk4Nwizf8Y8LNqeIc4LlenHwpG32/NXBSjeWXXfJeGkIBq0GyPO4b4fJCNanz4lLgxV6cvDJbzQZw6wd6cfIW4G24POtV/bOGMmSKqdO9odLA3xSXLnia+20s8AkvTs7vt2Ma+M/FTR9av0J9xouTqqv6NErrrt/WnfAsCVgz0sA3wGHASyfdlsz9uMDzOS9OhuqjSgP/8bjcWvuWqPdaYMNJJDGcpNZdv6074VkWsGakgf9s3Eo2rwfmjbn6R4CLcMvPfyfL+V5aGvh74x57hxk4+xIvTn5epd4mat3127oTnqUBa0Ya+Mvj1t97FbAz8JQRVXUXbjT+ecCPvTi5tc7C08BfFzgN2GqA3Q/x4uTYOutvitZdv6074VkesDqlgT8H10lvgOcDm+OGE6w4ZFF3AwluGMIfgF8DV4368SvLYHEE8AFghR67XAcc7MXJeaNsxzRr3fXbuhNuUcDqJQtiawJrAU8GHo8LBo8DHou7c7oLuDP7+fukFmydkWWx2AkXfJfHvQ2MAdu2Pqturbt+W3fCLQ9YMru07frVOCwRaQwFLBFpDAUsEWkMBSwRaQwFLBFpDAUsEWkMBSwRaQwFLBFpDAUsEWkMBSwRaQwFLBFpjOUm3YBpYUz4FOAVwIuApwOr4iYB34RLo3KOtdG/KtaxPPCS7GcDYDXcpOMU+BtuxefvWxtpPUKRHlo/+dmY8PHAx4F34DIB5HkI+CrwIWuje4ap05hwDvBW4ChcpoQiDwInAP9nbXTnMPW0lTHhBrj0OavjvmjuwX0JXAVcYW1UOaODMeHKuEUzngXMx6Xo+RewELjE2mgi+eRbd/227oQ7ApYx4TOAn+ByRA0qAV5ubfTXQXY2JlwJ+Daw6xB1ANwM7GJt9Mchj2sFY8IVgLcD+wN+wa7/xn0BHGttNPQiq8aEz8aloH4N+XnEluLy1x9jbfSTYeuoonXXb+tOOAtYxoTzcau5PKNEMTcBW1obpUU7ZY+AP6b8QhG3A1tbG11b8vhZyZhwI1ze+GcPcdh/gH0HDSjZXfHhuASCjxminu8Db7Y2umuIY0pr2/Xb5k73r1AuWIHr4/raAPsdTrVVbeYBZ2SBTwBjwucDv2G4YAXuMe5cY8K9BqhjDrAAOJrhghXAboA1JnzikMfJAFoZsIwJt8bd4lexmzFhWFDH2sChFesA2AT36NN6xoQecC7DLU7RaS5wsjHhFn32ex+uz7GsjXFfNMoWWbNWBizggIJti3Cd6wfj7sLuL1nOgRR34l8OHAm8H/d483DBvu81Jmzrv1Wnz1J9UY3lgRPzfp9Zv+bHKtYBbtm1fWooRzq0rg9r223N43D9GSv12LwECK2N4pkPOh5BegWfB4B51kaLOj/Mvln/ATw1pxmHWRt9ouuY5wMXkH/3EFob/Spn26xnTLge8Beg6K7ldtzLCo/+b2NfZ210Ro96FuBWos6zFLf4xWLcy5rHFux7A+DX8ZYytzEtu37b+K29Bb2DFcC3OoMVgLXR5cC3cvZfEXhBj883IT9YXdAdrDrqKXqEnJaFUiflbeQHq3txi6961kabWRuthRtP97eC8vbr/iAbuvD6gmN+DqxrbbSBtdHGuMBYtLzYM4AXF2yXIbUxYG1asC1vIc6fDlne5gX7n1qw7XTcoqS9FJXZBkXDQt5sbXRq552MtdGFwMtx4+d62bZHx/gOuIG8vVwN7Gpt9GgQtDa6x9roEFwHfZ5XFGyTIbUxYD2tYNv1Q34OsE6Pz55VsP/VeRuyV+ELczY/s6DMWc2YcB6wfs7m66yNzuy1wdroz8BZOcctB2zZ9VnRoq2ftTZ6IGfbRwqOG2QhWBlQGwOWV7Btcc7n9xYc86QenxV1DN9esA3cWoC9jGoF5ybYqGDbxX2OjQq2bdj19+cU7GtzN9hoIfmPn0VlypDaGLDKeLBgW6/+sLzHCsh/5OtnlZLHzQZrFWwrHLyLmz6Tp7tjvqiefvM78+pZMRuOITXQ5Ofqei2hXhSwyhr4y8WYcHXcI9R83LCMq6yN/j6CNs3UtxxuFel5wL+tjepeKbooWOf1Uc0oGi6yap+/D2NRwbaV6R9YZQAKWLNENq7o9bjxX8t00BsTXgkcB5xa12t2Y8ItgffiOref0PH5LcDZuPl7N9dQVd5b3ap6fdmMQpvvjmulgDULGBOuixt8WvQmcRPgm8BbjQlfa210a8U6j8QNfO011GBN3KTktxgTvimvU7xF+k7vyV4s7IwbdjMzJOY63Ni8i0c5lqtJ1IfVcMaEz8QNbB102EMIRMaEa1So8/24VDn9pp6sjJuisn3ZumY7Y8J5xoTHA7cCp+AC/R7Zz4dwudj+ZEyo4REoYDValmLl++QPUs3zTOCsrO9p2Do3xeUPG9Rc4LQs75h0MCbcDJez60CKH0+fDZxjTPjZts9PVMBqtncBzy15bAD8T4nj8tKtLMHdJfSaK7I61SYTzzrGhD5uoHK/KUSdDgY+M5oWNYMC1mCm9e5g/4Jti3Hf3ncX7PO+YSrLkhHu1GPTt4D51kZr4IYG/KLHPq8dpq7ZLHtBcjouRfawDm7z42EbA1bRa/C8HEarjqAdlRgTPp38fF5XAE+3NpqZ03hazn7PMCbcZIhqN2HZyb7X05GwztroH8DeLPt7foEx4bC5pWar3XApncs6rq2/yzYGrKKBhHmjkss+do1SUVrn/WbeAmaZJPbDLajRS25Orx56DYD8tbXRks4Pskys13XtNzfn+Dbat2DbtbgXGp8hf1bEMwFTc5saoY0Bq/tC6pQ3U3/vUTSkoqJO2v+ar5gFrStz9h1myk+v/qllAmfWmb/6EOW2Ta8MHwB/AJ5nbXS0tdH/4oY45D3SD7tGwKzQxoB1RcG2rYwJj5q53TYmfEw23uiF42naUIpSpzyvx2dJzr63DVHnX3p8tpUx4XZdn70dN+q90/1otPeMvC+J462NHk0YaW10A/mP89N41z9ybRw4eg0uI0Je1oYjgXcaE16Pu/We1knH1wH34cY6dfuUMeH21kad01LeixsC0ZmI8H7gwkErtDZKjAmvZdnMCV/NEhA+DHwAl8u+28+72tNmS+h97d3X47O81ZnKdNg3XusClrXRUmPCU3CD8vI8OfuZWtZGDxoT/pDej6shcIox4Rtn+pesje7GreBT1fG41NGd1scFvjWyn16KEt21zV/pnS5nd6B7VsBFwD9Zdn7qWJcTmxatC1iZz+OGBJRdzGBafAx4Hb0f7fcG1sym4VRasbrLibg89Ot2fV701uuLbU7v3MNF9A5YexkTnt05lcna6ArUH/ioNvZhkWUTKFpAohGsja4BPlywy7bA74pW9ylR52J6pBcucCZwUF31zxInFWw73ZhQY9ZytDJgAVgbnQz834C7/2mUbanoo8Ayiyl0WAO4qPNlQhXZ1JBNB9h1Ca4/cE/1Xf03a6NLWfbRb8bywHeMCY8tM3VqtmttwAKwNvoYbob8NTm7LMKlv3312Bo1pCwYvAE4uWC3ubjgcYEx4bDzDh+V5UD/CYP1R73K2ujD1kbtWtZlcO8kPx02uFkIFxoTFqX0bp1WBywAa6PzcANGt8DNzTscOAy30OpTrI2OID918lSwNnrI2uhNuLlmRSP5twUuzyYwDyULVhGDr97znraOxh6EtdF/cIteFPUvvhC40phw9/G0avrplhP35hC3sOnlk25LFdZGxxsTXoJ7ROy1OAa4ybYXGxO+JHs06SsLPD9guLE/L8PdnR42xDGtYm10nTHhVrjVrLvzy894Ei6zxnHAIW1/vG79HdZskwWhTYDvFOz2BOCn2eKkgzgA2K7H54/gsjccmHPcB40J9+i1wZhwK2PC840JDzMmnNaxbiNnbXQjbvWevAGiMw7GpZgZVfbVRlDAmoWsje6yNtoLlz4m73H2icCZ/Tp2s0fBI3psWgTsZG30EWujz+OGivTyTWPCjXt8/mXc4+XHgIXGhKcbE65a1JbZytroPmujfXCLxfYaPDpjJ+BcY8JRrBnQCApYs5i10QJcvvX7c3Z5LvCOPsW8ht7ZKva0NupcYPZ9uOyY3VYCfpClAAbAmHBr/vtN4/LAXsCr+rRlVrM2+gYuc+zvC3bbHvj6eFo0fVoXsIwJtzQm/Jsx4Z1dP5eV/ObqtVrK1HTSWxv9EtinYJf9+2Sx7JX/6iRro3O76lmCS+t7Y4/918W9qp/phD+qxz4P4wZUtpq10bXA1hSvEL5P3qP2bNe6gIVLJLc27pGo8+f5LDt6exC91izMu6OpIi89TF/WRt8HzsvZvB7FK1Vv1uOzL+bUczsui0CvhWd3BI4xJnxl9udu37M2uqmgHU021NCObIXpNwILCnb7RBvTJbfxLWHRW5a8lC2rFhzTa4HNolfVRWVBfnbTR7MqGBOug+tU756ysRDYw9ronz2O/x6975YANiA/m0P3nMoluDQoPVkb/cmY8A24idbd3ofrPO72ML37yWbkLRFf1ZL+u9Ri6C+bbM7rO3EvULbssctMTqx+K1/PKm0MWLcUbFuT3hdj0WDLXguU3lSwv59TB8aEK5K/+nBnmUH2020dYCt6B4uilYuLcmt1j6WaS5/VcqyNfpCl5Tm6x+Zed/WfszbKC5gA9wzRvm5Fbb2z6++97gwH1Z2JtdOjATfry1u7a/ti4M/dg2ytjR42JjyK/LvjF9KygNXGR8KrC7blzbnbpuCYXtN2ijpNX1OwbVfy/+P/ruPPRTmser2RK/ocilct7l7FeS75Y4Y6fQS3mGo/N+NG4Rf5R8G2fmlWirKcdq/NWLQ6dl767Bl52T0eIrvjzlY5+ivu/0fnz9XAITnHRwV1Fj3Kz0ptDFgx+Y+F+3VPXTEmfDL5b9IezsrrdgX5jwF7GhMuM9Unm4JRtCLKBR1/vpL8fpH3ZI+MnWWvQ+9HsRlXFWzrNW3pTQX7A48Oxt2X4nmYS4DXWRv1u7P5c8G2rfocm5fdE5ZNSJg3RQt639ECYEw4n/z+z7903DmtQH6XwEY5nxf1f7WuD6t1ASu7OC7K2TwPiI0J32NMuJMx4btxAWl+zv4X9rrYrI0eAs4qaMZ3jQlPMSZ8nTHhLsaEH8Y9JuY9DqZ0DBnIcqb/Jmff+bjpNx80JtzZmPBQ3Aj+vHO4zNqo6M7ipz0+29+YcJAsrE+kuP/pUmujS/oVkvXJ5S15v6kx4ba9NmSLxeZlPlgK/La7PQXNOLBgqtF7yQ8ej36hZf9X8h5vX5TdgXXbuaBNRVlnZ6XWBaxM0duXdYAv4JLdfZHiN4dF5Xye/G/HubgJy98GfoSbv9idUrjTl7O0Lp2KJiDPxy12ei7wCfKDFbgBnEVOZ9mgszzwY2PCnp34xoTLGRO+DXfnVpQnaxtjwqI7v07nFmw7w5jwvxZlyNb9+zG9M7KCC5bdKZt/Rn5H/FbANzoXhDUmnJt9qX2goG3dSRPzMryuBXzNmPDRLoFszmfPN7KZ7oA7681ZurRdk+nnzJkzs0jC76iWF/sqYDNro0fydjAmPIHqC4guBDayNvqvb+bslfbFDLfqTbcrgC2LziGr61Pk97H8HNfJvxBYBTeJ/NUs27Gc5xHgpdZGvdYy7GzD8yjOxw/uUfkmXIAOKO6Q38/a6IQe9ZwB7Flw3D24u9vFuCEfeXfF4Pqunpbdcc+U/3rcOo55bsX9u84DXkz+OfwHWOPii23RZPdZp5UBC8CYcHPcf7yiN2R5HgS2ybJB5jImXAW4hPz+iX4WAy/Oy9aZ9XtdRrm883cCQTZQsZAx4cpZPc8uUc8g7sAFzuv7tONcih+RBvU3YL0ed61k04j+QD39QwdZG32uq/y5uH69qr/LQ62Njmnb9dvWR8KZ1LN70HvgZ5HFuGkp/b7tye6KXkpxp3ae+4DdilILWxstxKUoyevfyfNv3F1N32CV1XMfsAvFQ0IGcRK9F1V4EvDDLMAXOYBqQw9mvKNXsAKwNrqKepaD/y3wpR7lPwK8G3dnWdY1wHEVjm+s1gYsAGujc3BDFgYNKFfh7qzOGaKOW3CPJ8dSnKuq0y9w69Pljb/pLP9PuH6ibw9Y9jnA5tZGQ/V/ZEtObUvxG7s81wDG2ugtuADea7mvDXH54vu1YU8G/z32coi10fl99jmMaos8/B14dfcCszOsjS4E/rdk2f/BJUecmulf49TaR8JO2W36y4FX4AbjrYl7/XwHrh/iUuC7wPn9+nuKZGlU9gFeghtd7uE6sG/D3SVZ4Axro8tKlv8c3JCD7XBTblbBTRNKcP0ipwxyZ9injsfhFqE4mP5jk64GPgmc3vl7y5YEuxg3MbrTPdZGfRcGMSZ8ES5AD7Oy0YPAAdZGA00czt7YfZnh+yAvBV7T583rTB374V7wFA067XQtsKu10aOLAbfu+m3dCfcIWDK8LHC9HDc9ZH3cAM4HcY+NVwI/KwqOxoRbsGx/lM0maw9S/2q4O6H9cIE5z0O4aUlHWBvlrfFXVM8OuIGt/YZx3Ah8GliQd2eVU/6GuDe6u5Lfb3Ynbnm1T2WreD+qdddv605YAWtWyaYzbYdLy7IG7s74Htxj55XABdZGd9RQz7q4t3Y+LjiviOsLXAj8Cri8Sv56Y8K1cVlaN8a9IVyMe7S8FLcIbc/xbK27ftt2wiLSXK3udBeRZlHAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxlDAEpHGUMASkcZQwBKRxvh/MJdJ8q0twLwAAAAASUVORK5CYII=", radio538: "data:image/png;base64,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", sky: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAkKADAAQAAAABAAAAkAAAAADMBWeLAAAACXBIWXMAAAsTAAALEwEAmpwYAAACymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xOTI8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE5MjwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpvgFXYAAA2PklEQVR4Ae1dB5hV1bX+7507vfdhZoCBoXcQREAEMWLDGjWJMaZootEYzXvRPKNpphqfMbElxpJn1ERjTAALaiygUUCkD2UYhpmB6b2X2+b9/773DNdRceCCmuTsb849956z69r/WWvttdY+48AtZf2wk02BI6SA8wjL2cVsChgK2ACygRAWBWwAhUU+u7ANIBsDYVHABlBY5LML2wCyMRAWBWwAhUU+u7ANIBsDYVHABlBY5LML2wCyMRAWBWwAhUU+u7ANIBsDYVHABlBY5LML2wCyMRAWBWwAhUU+u7ANIBsDYVHABlBY5LML2wCyMRAWBWwAhUU+u7ANIBsDYVHABlBY5LML2wCyMRAWBWwAhUU+u7ANIBsDYVHABlBY5LML2wCyMRAWBWwAhUU+u7ANIBsDYVHABlBY5LML2wCyMRAWBWwAhUU+u7ANIBsDYVHABlBY5LML2wCyMRAWBWwAhUU+u7ANIBsDYVHABlBY5LMLuz4WErzfe2EdH0tP7EbDpMCxA5ABSQhSHBZCeLa+vqvzIXl1vX/Q79C8A3WFXrS/fxwUOPoA0sRrgp06QiSkn9d1r9/PY9BQBSgDKn6orDmUx1zkOVjAlLd+ButTNivZwLIo8ZGdjw6ABkBDwGjO/X443B44e/rg6PXwcMPRx7OH4PHx4H0LE2akApsmP8KJfhfPrgj0R0TwzN+RLh76zms89/MsYPY7eWb+d2NMoGKN6o++6DQ42SAbTJGwfocHIE2QAKNJJYdxdvcgorULzuZOODoFGq+5biZSE2cxJJUJTQMTrUnnTQOAQAZl1dEvkBEwfoIKAlK0jsjAEUWQ6bvO6ovAJu5ngKl6gnUaDqY2BhrUTd5WC3Y6EgocOYA0CeICmteWDkTUtCKiqRPoI3cRF4ngESkOETI5gyducI+VVQAKFlF2P7+rqmii0DAwjw9Ot5cAZV4jFoOVGIA5CCL2KdoFf4xAFYX+WB4GXASYxcHE3Uy/gmASntSY6V+w8eApWLt9+gAKHBmARGhOgqO3D5Hl9QRPh2YA0OTFscqBCdFl/RhiYlZCwEg4L7+nRjuQycPBH629QBK/e8iFKrr9xChnOHSSDQB4ye0Der0EdT8crMO0Ls4n8LB//QKWQBUTAJdfILM4l0SiKlW9Kmjpa4PHEPpQMNt/cjp8AImYFBERLZ2I3FVFEFFMUZyYJ1r3xBWOMGn6esjAkiKB9Bgn6hu82LnWw6tOTFvowraN/M6mRs2NQnUvRWYogNSmfgsEwVEN9ERf2Df11dHNOvzdyh1I0rPIsfpjyaEILH9cAFiGe0n/kkg0wGL2YD0BbqXiVgtB0AVq/I/6PDwABcHjampH5LZKEpaE4xMdECUWMY+MfsKdJF5hghPVbT6UvtSDxRfE4/InCzBxQhqSkqLRxcl/9vkKfO/WWuQvjEItQRQZBJFpPfghzvOeZMDFD/XZJKsggUVdzdFDYPm6iE8WFocJcisDKAOqaPgtcejimKWLKakt0cU6zEV+/IdwqaEDSATik+hs70ZkEcEjAmoywuA4Fq2lNo2Ic8BPUVXyTC9OPC8W1z8zBosW5CEjNcbKZs6Tx6cjd9guXH7pPoxdFo2y7gCIEqh3Sey5fdSVeNb0qnv8GkgDX97nQlBBR5SVl5n55+jyIKK9L1CJ8Ga4FSEmIBFU/vgYngks6VjkVhLrA2JV9DK0CdRltfrvBqyhA0hE9voRVVITIGiY4NF8cK7h45eJSU7s2OkmN3PgvkdG4aJlhchICwDHz0nQXOiB9vNLJEH8uQvHY/uudvz6qWaMGh8FByvqo16UQHYUHUsgsq/N5E4dRJT0eRb/8KRGQjOqg3pIxBaVgvcdfT5yqy6gkdxK+UUHKe1xkfAnEFDx4lRU+S1QBRcapu7306n+xTmVY0j/cE7Eoy7gqmlC5M5aIJa4C4PzaEo4v8iMciCBD+3e53rx5evS8O2rJ2LSuDRNFxVpihbOjWMQgT1chUVSId64vR6zp23A1DOjsH2jG87xnMAWsrLt1Mk0W/MjkRAfAQ/B9R5dybRwhB8ClpLVL9FGtDBPA89qmyA3yno8ORW5lF+gIqcyepV0KqtDBpQqrwpVVgPW93+d9OEcSOPigB1eH1zVrQQSR6iBH2ESeLpIsHHUdfY0ccX0thd/+us4nHNWIeKpT1nAcVpEDraj60oCj1JVNbnAMKCszocVj0zC3NnD0NHZh/a2Puzd14b7nqjEmko3UuKc6DmaILKGHkoD9dVStNU53tNq0NFDZb2+k3oV75OTGUWdoBKnMuKPnMrPFeCA6FPdBlQkkMwZBlQ8WWDl109a+nAAaRCOCDg7aRzsoD4gtm4R8TBHMwCeRIKHImvCuGj88Z2ZmDM9y9TkI0giBgFH9JTosq5X1nTiuX9U4KqHqoDOfnz/8lycc9ooUz47PSD2Zk3LQn5eAhYcvxFZZ0djf8ii6zC7PLTs1sSH5hagDHUJ+OB9rQBlYHXK7KFxUlGX6OtPJKASYg2nGuBSlgI3ACircpYTtj4haQgAYk/5BDg7uo2u0U+xc6TiS0ruOOo7e9b04itfTMWtN81AXna84ToiigUS0abfEI5Nk9ARbL+iqgOvrqnEVffuh/stD0adQQV6dATOPX2EIaWXLhJxLT+5jUvKruFYEoO8JgB+1EQP9t90zvoQ95Z6r1MQGM52GriaacFHi3k4+wUocigfQaWzX/aqKNo1rAFoXKasUMmKPupxWWMJnj8cQGaw9G1xmasuH2mSilAgsbWiF9/7WTZuvG4GEkgsH29EWMRh5WpDk29EGNuua+zG8lXluO//KrHt1T4MPzkKyRfGouitXtx8bTYKRyabLrmCIsTJSfJQ2X9i5X6iNQLtXJKF0+/Q8YqDmv6FXjyc76Yj/BjoEAcoUA3YIgh40lmc3il1wdKlEijqksihxKWkS0USUJIESu8CVODSRynyPhxAgjg7afxawT4Huzmkk4poWV0gsbWiB7f9Jh/XXTUd0VFOgsdP8BysVJzCSY4hrtPW4caLr+7Hbb8rw6YX+pCxJBKTz43FgR6uxGRtrO7HOafmG64l/chwn+B5c1ED7rm9EcNPjUYV88eyCZY44kQKgNoaelmJ5lp4V6/DqXOgMwKTOIqSGjKiL0gTXja6VGMnnHX03ZAuRjlPJKCSY+EjoPpjyakoCo0eZepirwbqZIWq8ximIQCIratDnGxO7cGHZwidEhmkMI+n2Cpe1Yuf/yoP1399OqKoUBp9JwiewLgDIBCnemNdJe787V6sfLQDKYuiMObsGLTQWLSnw480ujOqGn0494sJGDs21fRCYkpzwJNx9j/3wgEgyzHwcB9qoi36qg/vl3TfzZs5WjHy6GMHe4mmTp5JkqM7P6YT/AjtjNAq+1KQS2kx42ggoGo7A+qozAdJFHXkUP2JcQETgmxS6riIYnEoDU4EOsppaABSuzxCx/Vh/VARgWcsxVbxuj7ccFMmrr86AB5xDEvfMboO84qDVJIoDz1WjB/eUA0cF4lJNCiWd/rNEU00MgvSOYl16z04//qRSKV1WuJOHMsShbtLmnDr3fUonBaJBs686K++qO+D+y+w6hBdJUk4Te/iKion8GTxZmUtzQNbeAxnRzKcGJkZAR/7Ut1HDseMhwIpqznyNNDp4Bd1lnYnkwgQcaiIOjmz2wM6lFZ5EnfJBJNEHnUoEy2h4iaMJqSeI+/VQMmhAUjZQ/SUgdKH+CKFeTSX0CX7PVi2NB7/818zEUOfmTXRKmqBRxzkrXdqcPW3i7B1uxtTzolFKyvY1eYHXWKgtDOTr4fQrxnl5M2cnmla18Rp4hW9oe+rXyf4qv2InO1EH8GnbgvIAh/tlKYenozVOoUAiCU4vARhO+vtJGeRuAuS2IArlepGNcHzxVOSMP+/U7CPS7r6/b1YtbkLtV39GJ7vQhVlNBnjR5fEVaw0IPJ4jePUSk/W84hK6lBa5Yk7pcbDR0D1x1HcyQ4VypnC5EpDMCSyY5ydqD1ViKhqO+j7sgbwPmfRUpPuYtHGWj92LT8BEwpT3qXzCDwCjsTAn/6+B5ddWIx0Kcg0/lVLx1GzwQlXE/xpDI8HqjmZCxNw189PQFICVyy6wbuqq4ocbOIlbyGVzrAOKpmdBGEaUZfIQzSvpxgUsFVGQQMtrWxnH1FDjhKTF4E8oqeReaTrsPuIIfpiGENS73Vg75/moSA/kQp6P3rolBW3vPuh3fjdM60YMdKFOnIilfnYk4hvgUKD5oLCDFo0kO6UkQhfWqKxQxne7OP4rfxH0PkPHzP7oAb6Y/goBmbrkM2oQs1/JllH48t9ePZX4w14jNiydJ4geHroFrjj/q0Ez25MO5vslqirILsQRwkVmaKJRI1Aia0+LJyfYcCjOjV2dVHpnc116HiNISY0b7eQo4ym+Kxr9mHvs73Yt6XP0FKcwgLPsqlx+N4NObjirGRks5JSWsTbCAQyTkPzeBK9pt6Ha05IQGZ6rGlID3BivAuTxqTiSxePAnb4kEykC+z8+/iTiCHg6FCSgq0Bk/ZOciZXST2iNlcgqriStj0ayDQgdXwIc2vqG/QxZBEm/05gtoIdG1SR9VOO0Xw6Rku29+G/v5+FpUsKzC2zLOc3q58SG/c+vAPfuboCx9HrvqvdZyZYIovPxLsmwxqfRBFGOml4zDB1Wh9aufW6/fjrKvrpprvQTBBM4qpv58penPOlRFx3ZyHqGnpwyU9KEZnmRBvBNTU7Er/9yXHIz4mHm09pU3Mv3ny7BjffvQ9lLB/P5yWOtMUOP0ZfE49oRUAaqErfYjwSRV9gBSkF/tA0sfoZ7tnQYYiVDOTVQ8YyxrAtKz4B5eC1iOp26k6d8BakwZNHdcDoACTwYXKjoQGI9JHXWRF9Dk2iOMH70EyXYtnHWOUpBy7//Bg6P8k62WELQEKQlN4/P12MG64uxyyCZxvDN9QR6SsqqgGHJomdZHKD2novl+4JGDMqsPpSnZYo3FPajMdWtmP4FPrAWNHOlT245RfDcN2VU5CRErBQNzX34dofViAhPwIzZsZiWFacaSaK4k7fL6QTV8r9BRfsRMapMYg2Y+zHxMmpXPFY4xCtAz0sLaVIZ48Vx+1XfBJ/yTzjcrKgmTFVT0cvwypJgveMS9WLq0Ywfy/FpJV0XU1Eq55g0jeP6gmZY5WINh5dmhjklQ4m5Y3kdcOx+b2P9+hCJDZ4x6pSYTicC9eeBjjbeuAen2cC6wKrCqumDz9rzB+S2DH22lhEKUPNCA5RIoMsZM8bbtx6WzbGFAYco9JPlIzIIWXWb6rFZRftwdSzYrGplc7RQ9SnkrIjKRoRG704e2E64ujMtZ566+F/8+06oMKPHMqfXQTPg48W4gc3zDbgkWFR6cS52UhJpm7U7kde+sFWVYe4ilKyotnosdHKua7Lh5knRWNMQcBYqfvKKwB1Uw/a8E4jMCYCHWKZwYnh3gHGLTnRzTq6aGTu6XMii0hM5mFWfKqESdn1wPg8tHl1uozTXyBT0pgFlI5e9rXXwXoccLOejKh+pMf5TT3Kp+xdPU5zX9+tIzueiw8/VYgmlzkSWWEmrwVGqJJMakwFqEdG0F8XtbsyoC8FHw6TZwgfH86BNBpRjbLSnxoHZxPlJrmBuRbSgLJp5IQYjSR+LFo0zHAfa9VljITsXGNLL35y+y7jLacfFNQsDpk0Ri3howxSHAOrL11XHzSZLe1urP1nExHiwoblvfjL8gm46Nyxpl6B1rJSpyTHID8/Eq0v9GDMiHjDbSwOZoG8uIzLYaZ4cpXiEh++8JV05OcmsqmAoh6gOsNFWvtwxyvtGDGC1m6KRNFd0RojYvqRkcBJJjBEDz+RsHElQTnRgYwCD9oIBnEp3kIX84xK8CCVx7bqeMTF+E3ct+IJxGMLUlkhgax6BfBNqzhdSVT2T3AzIpP1kQij0gkM9m1Xh5Ocnf1m/oqVMRg+rw9LpnaYshs2J6Bzawxyzuij+CbXZt1q3ySiup9Lf2d9FyKTGuApyAmgd4ii7MMBZDXEVqW9uyKbzcRZl62zOhTJRpv41C44LQYj8pPMrYF+BHv90isVePaJTkyljaeYnIDzZAZk1TP4rAclhdynnZzqpAtiMXJ4YqBekiAwqQwHKW/Fo2vonW/yY/mKiTj3jNHME4itFsC85EDyj7XTRVAvew7Lji4I1KPKhE2pAFLqi7ZTLI1zgioVcMCPxQuyIREXEMMHabtvH31X692IopGzg07dnLh+VL0diS/8djNOOvkN9PUlEKDiFn7U/iSTEQML8feVGcgc40YjuUZuAvM/G4XrX3wThRPW4xuXfxOVfZHITvKiqjQKJ5xbi6uve4rAjFcPCRKuBhvTsOb5uXjovjwgG5izoAnX3fgUdbho3HzLBdhWkozORj9ueqQIcxevJTfdxbFRJ2ydgDdenI/f3DIWmcd7CXiZhEOSuC+5uutAC3xZKcZdErCSvitXSIGDX4cGIKFAYox2BH9qbIALSbu3eC7rE72F/moO4Oy5sUhLNrxoQO/WRLbSPfHMC7VwHMdBUS5xzg4JHqubSeR4Jeu9uO4XWSa0NVAqQAThsqiI3KekC39/flYQPAFQBLodcK42kfP9/tESNMm2MMVFzhEAuMCj6HvVVk+/W9GWLmTluVBOuSRXyOygvcl6EHRWkQ1b2CbHxM1LhgNESBdpcCA5tQWZaStA6WXyaYz5fKizbyjF/rKrUFwbh6w0L9paXJj1uTZMnfsiMpPX4aJLl+H2L01G7AWUgR20T8V6kJ6z3OiGgrxVz/gJ9yE5/V786oqpSDjdjYzsv0JiMzHuHOAtF3656jV86vQfmXIM0TNAyUzdgIKrHkVS8q/w40tmIPcsgVhOamawklgoHyBna2dwiW/dOPRZ/RpaEqW5FPRlUR+QMB+UdEXcRJRLoB4SbUXycQiWO9NNq2lRFT3pXCFp84QZ3aB6Bv/UICn6jSI0dUa64QYyXWh6pIy3MzzirscP4OHHJuA8cR72U13VIbEk4G7e0Ygrrl2He19opXnBgQtnxyAtNaBYG9Gl+pkOVHfi9X/0IT89Ap0vu3H9+VnIySIHYGXKZ4mxTrb50jpyoDku9FjiK1hHr5vec9ZVsvsK/M9Vz+DOnz6O6uZPITd7FZaedwCdb0UiM9GPzjcjcfElO6mTrSMIKX2XvAbMcKOXuo60d4+HtBaWukfijp89hB99+0ls2vE1E8t35vmPYszSTnR2RjJfKjlsMlobYnDRd+pZz12GrEW7r8TPv/s4bv/hH7Gr5MsGUKcsewJLvtyK6hoXdcoAnTRukwzBCNROTqAGYD0xwdsfdBo6gFQhuZAvJYE+F5rHtUkrpBFhx7D9BOoHXFV1yWFkkqU7EFgJUVg6Mx77yrxmy05Qbw3me+9JdWol0UrDUt6sSHreD4pFjVdp+85GLJiTii9/for5bXRD3hRw2js9eOCRnZg1ZT2e3duL6YUMxP+nF/Nnp9CWw4m2KjElgeJigoIpAAEHTj9luPkdwmjN77L9bXjpjW7kpVGB5hIx9EnWSoeMGL3d0Xjl/iQ8dksmDY+JhoPExosmXJW1uTDyzE7MPOE1Y29q75qA/OFP49orylG5i/pSauCRk1jt7/dhw9ZUrLwjH3f86Cw0tM1juO86LDy1Ae5OxmlFtHCsbdhR78DUOdX017WgsXkJfnnLMjz9uzw88aMR+N0vl1FRPx7JiW9j7qIaYFME4vVUisChiTRzcM+d5nmoaegAUo2kpAKefDnkQlrZhHRAFcnBWJDqxGtbe6j995g+BIFNkUoDHW0pl3ym0KyWnERbBrmBcHioTsRwUHKenjY/HsNyEkydwq0Aojrrmt34wbUB8Ehh13UdO0uaceW31+JrXyrF+LOiSPQIuGXh5AROnMhlOWddyqeSARsD6Ne93Yz0eS6s2+HBzT/OROGoFHPfcCl+s/BWVEw3QbnPxGDroQkhA6UauQfzjhyzAY/veATLK+9DXu7fuZoqQNHGdMTO9aHkDRcuuWQv8jP+gV1brseKx6818fwnLn2LNCbIqFw7uYQPMAI/8rPcKDyvE1v3RaGlYYThJnEJXTSpWC1zPiLovolT9CPDi5pHYMv6GBy3jLrmxd14bUcC9b+R5l5kHHVFpveluaoLPpgmU+h3c+G9H+9bz3uzhVyhMufLZIdlRxALCY5BUyPJFk2Ft+odDzZurQ8pJOknEUAfKaMPX35jJna/6YafVkeJFM3r4I6oWtl/5KvCFj+mTU9BEq17xhQQwvnOPHm4sRLruhVX9PKa/Zh8yno8sa4LkxQCQsNgF3WuDp7zZ0aiwOJk7LzFhRqp/zz4YgdGZnAK9vhx7rKRRgxr9aPm1HdxBDcR//aWZjr6ItDHDkpS89ZA0jhEi/iEIkye9DBG5C0391594ev4y93DkJXlxbBpbsxd+Bak2xyozEJNTRIXHzMwqvARfPUbB2ht59LapVrULv2JVTEoXZ6IGRN6kJ611wC0q42SYMBORMWf+dxddFOwTFpGOSbN6cbGRxOx/S8JOGNOO0XlXtNeX2fgITS1h3ZcjYlBmCVicFKDJ936oDR43j4oX+C6KEmC+mOiyYUoTszjd7AV9aeRAj17cRR+cG+F0SkMp7BkFbNqok85MR/rXpsNX7MfNXQ1yOXATRXvApFqpXphlseaosnjA9wgtIMCZawsxCZfoB/PvlSGUxdvwQgqyqO5ZN/NlZ7sZ/HkOJVs65QTyMmk1zCJs1i937GLSvEeHzbV+nDjLRmYMTXLAMMp1DAF+QFqGrr4dLcjYyTdJQTlYIuGlxOplUnF3ovw+/t+zxXQSeZ3fDKffLKmireicP5nK5E34i/8mYwzzvoubvzeFxAfW2LAuOCUzaY9P+04Wr47nBE0nlbgip8V4zvffxYZSRu54fIUrPhrFmISfWRYCZz3FEzNorng9TyusLJo+1qNm3/6LC67tQJf/WUpvvKtp5Ectxmt7bOw+tVhiCYX7OzjyK3Bq0XzlHCc3K5kiG6xW9ObD/44PAAN1EM2nUNLBSdPqLWS+iM3QXQ8n5oSN/73t0XUhbjNmMq34Ry8L8VX3+fOysGaJ4/HSZku7GXeKTTwGa95sDI9IfKMtxCkWXOo/wSNeRrnexP7wOvrN9bi7NN2MNw1xnA1bYFWHZxnOkZZapsfk6cmURc4qP+oP8L3q2sbkHUcM9EU8JlPjzI2LBMqYrUXHGbF/naseZEBblwo6PkZTGdXhBdSz72eaNx3zRS89erZ5sFYdPKtuPaOUtYPnHH+c5ANvL5uCcr3fAv7S6/DgbIvGA4xdcY9+PRNVeQmXFZTHUqMJQiuug7X3PRlTB33MH11oyjyLkHLO3GIi6cZIYpxQa5WJGb0YeXdmXjjpesNB5w28QF885bLcNUNX8b4gifMqvAfKy/D+seSyaG86By8lNf4SFx/SuDh4q8hpaEt40Or0gyS4tqu4s1LgWsfKRKyzUdK735u9hs/PRp33dmIeCL/hmumM3aHcSoEjjhSAER+buFJx6P3z8W3f7wFTz3YhslnxmAHg8aIP1DaGO97De02F9KZmZNpDcya0dBOiUMAr71BBZEpkmhpaPbSn8W8vCFOJleEZOLkcRS/TJp4Y9on8urJVV7b3In6jT787Nd5mCXuwwzqq5X0Tc/Kzh0UX6zUa+7RPsNfIolX+kh6PxobUlDRvgQNDfTXjWZ804OTMbzwGuQX7MboiVU4/opUSptI7K0+Dw/c/lk8+2sadMZJmAH3/5FumknrMW5KAza8Mow7T85m7xgoRreIn+6IxtpcvLxiNp58IouG2D60NsfgQNVFcLtp42qLROxCD266fg4aqu/FgqVvIil1P8vTNlc/Gi+vPAkP3FaA3DM/YAnPZbE/jVGOiaSznqj3f1JNP0M/hhDOEZo9+J2EFJvTO3+it5Rxyw8bFEF1Xbd4iJtM5nJ9B8NRz7s0AbffMp0+LBqpOAtGdDC7BShZkn985xbc+cM6o7MUE0SqYziRtI87Ve+6fwSu/dq04KSrhXcna3ldUtqCceeuw8hcikRyPVmIpUIJjFnUzZpLqZutnItJ3N2qMgKRQLJmbRUWz9+EyafHYNVD8zA8l/oFb4Yqz6Kn7Fhfu34tntraTTHoYpSk8hzsi9xfvbQQQ8ZsmtiTkhn6wSfdU8trtD/FcnWVHN+P2jqOTvloSs7mkl796KQvrLtao6a7Ios6m+pq5odoqkOGpT183sf3I6uQFm2KIAYnwtfKPGScUdQoZItKZpbaF8i68umGOaGTWHBg28vUe0iPnHluOppp/2FVA4nFiRYSyQv3zBHwpSbyaWDFoQMbyPzeL4fPgYLtcfbNFl9ffhodcvRD8eUEhhK8L0VOXETcZMJp0Vi+vgvbPr8ej901DfNmDzOTY02eQCTu9LObZvO8Bd+/uRqjT4lBGd0hYiCi3oSxFtcITKrKaszmtr5ysBI3YwtTsfqBaQYM02ghlvOxl1xHBs46KuzD8yKRxqdscNqzTzPeh7tvmWnAI8U5NFbbAlMVt+M89XAnxp0RhRrJRasDwQqla6XSvhJPBkFXGJf4lPKR/cgcSW5Gomix0MQJzE3jODjZNGCjiQY9VcP5xbA8tss88q0J+LkEmO6Z4fJLxAS3WQy00pKt/GL8Scyj+6364MFFKXKWMWzD60RZZaIpn7+A4KDC3cxyqpdNBLoukOiP5g7P+EyaaAQe3h0ieFjNu/RW/T6MpJ4wQCubLJlRbwG7UKA47wRWIhzkbgKhcHQU+ij058/ZiKefLzUdNJNOJBglm5MfQ9l3/ZVTcdmVqdi3z4Nh1DG8ig0ZFjFgNbY6J9fEkytK6J3XS4KEWxKanERgXDQvDytfnIJtz/Qgn/og6chBUs/R2jpZdhNeMGV4nYRSGMjzq2rxi3vG4OQF+RRTWs0F8piM/LDouWVbI39xEcFIxh5OssYZmjSHtP+hk+DoJZpUTvPRzn7pmodcSAb8Lp7ppTI6lES+VnKqq4MVKJ+fwGD16OKkd/LQuYP11ZMtddLQqIWS2tKqV/e6eVhJNqlmOnNbeTOCFm9nqpfRnbKlBcCjMhGsy6mM7Jf2/3sK0+EZzpAO2X/UkcNI7MoRJjXEDujdOp4CynvJzUGt6wpxgP2UZ70c9cQzo3HhWTtwzx+KjN/JApFWU3rqExkgfsOVE6ho+CFneR1XUIvnxyB9ENfoYNjmtT/diyf+vtd0nnNuksAoEJ29dBT+9twUFDGQbCwnW5Mmvu1gzGq/6Wcgv7rb0dFLg2EGrv7i5EAdnHVtXuylWV/J4j76vWI1TROMN+qSUvU+hNYlVa/QDHE/JX1KP9I1N/UYdo/SIvBd99X1YPcN2AJldYf5mN86VFZ1cYgmf6D2g3lMgeCHsKE25cXvMqIusMFAYSMxNCB2e2hBZ7iwnK/uycPgGUVfS2hHQiv7kO9HDiBVrEeMFPOlJ3NZT3apV9pphCFJ/ZIokh1mDwk/47w4fPMr+3D7XVsYisDXqrAOTZK1XB7FfV5XM/Z4dx1XCow5XjAtnoo40RSS9tKR2Vjsx7durMLLrx8wXMwfBIbqE4jOP3M0nn9lGnY934sk1j8zw4WyLW4DDlVlGRFT6aH/0qWTGSIilBG7e5rw5HPlJn5b/bLAWVLWiqde6KBR0MXQWHKSdw/TlLU+dCv0tvXbumb9tvJbZ+v64HzWdStf6PmD7mliRXs9xEn08icSOB1UtNvKXBif1o78GdS5ZoyCNzedGZWLyWo48GtIn+EBSE2ol5w070iuXMSLxSMHdURZhCtZz4uoF829MB4/uPEAtyiXqYbAJPG+JiyK7GLMqAQqnhxUA6MBRycaW49AIbyqLhP7w7CJqSdH46yvF/FNHY1GNMkSrTwWiM5YMhIvrZmOkl0ebNbbPxgpuerVKtOmQjwCug7f6EHFQGJrPznP1ddtxPRx1EiZBB5WZ9Lad6jnlQaC/K1rwVufuJO4nERnfLQfig2q3x+NulXRWDSmBZ/5ahnyFiWgMbeQSlS0eefBwVEe/lDCB5CoSe+mPz4WntGUo+JCmsVBSROvJF6iF0NhUhS2bmpm4BU9wBZf5j0VNfJZHkaqOMNHUrFjMpPJm9pwuPxVLqXHuECXG9xJDrostqC0oo0gkCgMtGSB6NSTRmDXK/Nx42fSEc/Yne89WIsnl5cYESrQKJ/cPxu21OGSa97Gmiofpk3iOIJJulUTY3/+8UoDcLwLHdSluKAzQLbyfBLOoo/4SAz1qwyGhEZS/2su4jL/mVict7geN/15A6Zf2ImG6Nl4pX4S6e6Ck362/veZq8MZz5Gtwga3oE5QhHhz0syLNp3NDDobFO6haRVaNb9mddXM1UoCjWWcdA1eSZPpoT2igfHLIBNIpwKdkxlYNYk76UnZubsJrz/TjRHcwbGfCnpBugtr6eG/4lvv4N5fzBx4PUzABUFwMJZzAgPgv/n1KeRcb2I3CfvZr+7BVy6pw8yZKQa8JXs68esVBGWRFzczDDY9+G6igTaLm/DX/+vAxLP4ogaKr2B3TZ8/rg89ogKM9F4Zy5MZqZjE2SxhFGLLGxxknheXfbUCsxbtgicmHVv2LsCL20cYT0F8DFdzpKW2ioabjg6A1AvJUT7RntHZiG6rMICyOJEILg1DK1+tOrSsBg2E8xfkDARr8YoBUFtbL/74ajvGZDkxKs2FFK3wgvd0XruRnIAcQyCUdVnW5lFcnq+u8eCMz7+NB/93EhackGcct8ofRVeA0noGzL+5xYPRMyKRfkIUHl7NN2TcRaeoUqETs2dG450iH04+IYvDCOhR4lAKuF+9upqAJrh5XZsBePrYkprWQ6jnKZbcJo6BbFFUmCuKKaZKXJh7dheWPLIDE2e/Da+rAGu3nok/vENdp4/vd0pwM9SGoSR0kxytdPQAFORC2g3pGZuFyB0kumxD0l3YW0mkYXScyjm6dXkX7v9DIV+/kmvGYa2e9OP1tTU4sJpWlEWRWJQbTScgg/lJLYmnOnr416zhUnpOBLokKZlfrooDBFFuKkNuyR2WLt6Gb3ynCieflE1HZpzRbd7a0IBv3FKBzAncv0VFXvr2cAaNRY1QbDXBzbprGr0YwwCySZOoVDJJydbyv6q6A9//fQPGzYtCHUVvmBzf1H24H+yikZlqWysp2ZrUtwOtEWj7h5QCPz77nVosPms7csdtQFv3XGzc/FX8+o0xfNi4ESKlF8kxHnQQOEcTPOrW0QOQajMg4vacbIqy9h449rcgjkZCzi1XLYzbreCsb/Phsacm4OLzxxp/k4pJQRaIahq68ZPflmPMaVHYu8eLZBoUY7kfTXHFmuSdFCXPPNGFqdxDtoegEW8RccXVGgkesfIJNCDes6IF99xGoEmpl/2HuQpYZyV1pkge4iDa9qwnWSAcTuW6arUHv7lvOLIyaMoXYINs5qXXKoF9Xni426OTCwDFZ5sJVbXHKKlPasPqXxRtQ/JxxhI8nd0RqGI4CNocGHFGN7746G7MWrgGSemlqGk6F8+9+iPc/8+RJCrDZrN60eN00+nLrUzkUsciHV0AqYcaOcVZX0E2YrktobmyB817eZE2nSuuTcGVj47nq+loqlU2XpZGYTgQv9//yG5s39SHmYsptsrc9KbHKpbfyHmJkldeJVfL41Nk2mDZIE30UxZW1VdKYBWM4daecVE0EgY4RgTl3X5eNxESysf8KqqluOjq0rKFP048cVhgpwRnTuKrloD+xZ+rEUt9q57lBVSVPVZJfVIyMVL8kczlt/Zz+nq4W3cHp6rcgZT5fLfSTbVYuGQrRk++gwNZjJLy8/HI89/F8k2053B1mpnOzZWRjMX2kCsztkjP9bHq99EHkHrLCYmlgbGnMBfLUqqx8FLuK18wDDPppIyn/d3iOBJNsgYr/fmvxfjRDVXkILFcIWm4XE2kBeKqZSMqLm7ET+9oxBjqL9XcezxYD7EIpAHV0JkrR6kYkJJHQOI52JS5pg/yQ2QTXMWMkPzGt1Ixkc7d0PTCa/tRTs974bIYo2sJcFY7ofnC+W7q44f6Jg4aI2Mf3R99NKE3HCDb2c6Lwz24+Au1mHdyCSZPWctY6Re4E+VzWLvlMfx59Qxs3ct+0+qckd/Dh4irRj4Vfrf4M9Mx6HOg4sDn0QeQ6bQDaeRCVY4oHHf6BHzrs9zioxlkCthzAsttiSWlJ/62B5deXIICeuPFQTSpmObCK/9swPQpmbQW9+GWO3fxVR800TO/bBzBoqb84A8LXEHbogHPe/Lwgjwl0WprlxfL7ss39iZrB0dVXRd++8dK4KRI85KqowWeIBlMsJw4ppbdCdRpJBp76W6oreWUbOXkj/XgU2c049SflGHirHWMqf4b6MRHedUNePbp/8ID7xSipykO0Wke5BV0U0RRjMuPwgasNgaP+Vj8PjJv/If0xBpAIemwl/9y4IkLk/GZhWl08mrhGAg51RMnL/xDj+/mDtUKFJ4VgxpyHkkTI1FYtpMBYAHE8OIwbqxjzFAbdRrNOa+EldSGdns0tPhw1uRY/Omu+QP77SVS73u4CNdcXmZeaqX3EklEHmlSUfVXh/QagT+RRj7zugFuHqwsJTL28uJEN5YubcOceVU47rhtGD7mDxAPbulZgh17zsWqNxfgmd0U//4IxKR4kB3lg95T2ukjcJhEU7XxUaZjwoGsQXCjKApSHPjsn1uQyrX70lkBr7pevfvO5lrcdu8erKB9ZRJf51JGziNLgIigyaI5CDl0PzgzqY/worhOI+0ARwM8IjCd9Cawv+FtD75263gDHgFcFmpZtq+5qQJjGd6xj368I21THMawA44nloqwuI0utBA0DSUUTyWceO4Tu+iCekybX4Fxk4q5n24FkmKbTPTGvsr/5uuMF+CpDRNQWsOITC7B09LcNGR60EzfWIU4jhLrV7LoHvj10XweEwBZXZfdZz9/5PKFBqf9sRkvO3yI6u3BU89V4e6f0jE5w2XePraTT7icrqGE0FPazFmWJDd+K/42irJVeRhnEVqx2HtqaTv6QiLtRjInBHawNvM1wTfeVkS9g0tkXpUYPJS4VDeC82cMewKNjiiCJZa6jF7S4OBkl7VwJLt40F6ZzGCwsz/XgOOOJ+edtBt5eS/SV1VnANDQcQbWbzgHa7ZNx993sl89UYhPZhx1To+JsWoWt6Geowftk5COKYA0RllKGykS8rhB+1OPN5EfbwUejsGEM+MY9OXFXoKHBmnD2gcTROBR0gRq0o9GUp/I3JBFtlJL7nPNTyciPbgJso/Ln1/euw0vrOrC2LnRKKWlm1v9P7BtMz7WJe4ovSuGXCaaDj8p735GCdZU8i1p2/Rk+DCPuyMmf7oRU6ZXYPT4rcjOeZEG1cDOlVb38dhc+jW8s20eVmwvRHk9TQmUXTnc8uxK7kYLAVijuBQRge18HKKKLb9vOiY6UGhLIrLGHc9VkcsfiQnpbZgS/xZefGAEKvkuv8xURtcFA6RCyx2r7+pLBsGjV9Z9RS+qum2eWRk20t919wNFuPXGGkykLamYomvwq+vM/AUnUROpuBq+KojOWMb6cOVT00HIl/E4wJv5fDPbedx5enwtCieXc9/XDqRnvjDwLgBik5EB/4Wde4/Duq0T8fxe+t/6WTbRw+hJr3mgWlmnz7JVHCuChFnvMeVA6pvordRFQsTQqLW+KgUJhcfh4htWY/VD47HpQDzyR/eini8H0LOqJ9kqYwoe5Q9r/iVv9D81tH9tU1U7brunBM893YVxXLLvIni4UcToSVK21SGqRgYoAotWTE5Ort6MUVfJSd/FC8l+jFjYg5O/3oRpM/dj+LhiZGWWITHxTaMIqxpaF1DWdAl2ly7Bxp2T8GJxDlo6aPOi8zOPuo3b0Uduw39z9TGspo6UzMecAw3uWBpfONDcFoszJtVg0fi/Yd1fpmP5fTkYfW4X6rrlGXcYESCCH6tE7BjR1EY2kEq7QEs1hRpNBOOHRRrOo7AT5ZGvSXoMTVr0XHOZ3RWB+pogYJhj/CluTJrdionT6jBuQjlyRm7h3vi9tBhXDljJe3ypaGhdhvIDxxM0U/H8rnxuhmR4Jo2EKXEevn7Pz4eLi02KKT9BaUQU2z6W4z+adP3IAaTO50T4UNsSi6Vjm3HugsdR/M983PXN6UhZ0oN4bv+VSNMqSVQ82sqiNTHiLNJvFB6aRCOPhxe62Kj2S7qoy2gy6xka6hVgdjOTOnN8Hy44sZ07TuoxclwlcvPKkJr5Jl/LwvdHModyCXiKf29q/BJjkudg++5JWL6ToGmkXkMwRlJEpdOf0keOLDHm+YSLKA7lkOkjBxCfMbNKGcYnr6YlGnMzenD5hY9xk2E7fnPTadj9egyGLe1DNNm69i7p0EpIok1g0iQNJWkiNecCjBFDPKsOvblLb3rTm73kJuEiiS8oYHQeY42b21n7Ph7aDZFDDjG1F4tndWDKFAFmP7LzS+ncpWsjbr1ZETKXSWqrx8vdpS0XoLRsAbaXjsXG4lxslTJMQCYneBkdwMB25hOn0U6JfzVOExjpez8/cgCpCyK8lrqZNIQ18A0TMZT5v7p8JQpzf4HVy7+Ln98+mk8939g634uUdDpnqazyv4cb8abYYIHCpIEv/MVK9VN1C2haCelVc/JeSwRpJcdL6Gdbbgan1zUTPUW6okQdhFteJk9jnNH4NowubGAg2wFk5u1EYspGhjbxtbkO8ZVA/TqLQ3b1nIz65ukoL5+F9bvHYlVZFrrbqNNI5MV7kRfpBUOS6QXX9m1+CXaQ3w6OQZX9C6ePBUAD9CJBE+jhjKXi2MD939/93DqcveRqtNbNwRuvnYoXnhmJTU8mMDtJPo7PeZb0BnGQgC/McCXe1bwIkLLy+ikSPASZ/ocJtyzQa82DJidQSTcCJpPxQ9P7uHW5iy6AduQUNCInr4FBZLVITd/F6IFNRhyFTrK+K8n10dpyCaoaZpDTjMP2khF4tpx+qF7yMXJMV5wXmS6fMRO0sw8SU+rbv3P6eAE0QNl+jKLCWlYdhzMn1uCqS+/DqIwH0cRXmewrnYt9u0dhZ1EGdpQkomQvd7jy9Sg0LgX2wZg6OMWxnCpuDnFwIh18y1deng8FfKtFdnYX32rWi9SMJmTltiA5o4qKbiP1ljq+CGI3twUz7IR1cDsfD4G1wvxWtQEuczy3IJ+Msqqp2FE+ErvKMrGxjvnoTgABk8XDwYdAe766CBqz7GaFgTpVy793+oQAKEDkkRRpFRIB3MT1w7PXY8mCe5Ae/U8T0tPlG42ujgx0tY7ga1py6GCN5GvkGBBG0WA871HUM2jqj4vvRkRkDWITWnhUEyBlRpxpQq1Jlc7Sz/9W5+hnULmjjaKtxXAKjzeFW2HmUxcag2oCprhsNN4sz8bWOsZlsy2jMMV6MTI6IFbpfWGUSlCn0RD+g4Cj4Sp9ogCkDqVRPDkYDNXUSAV7RBMuPvltzJjyONLjXx1Y5QgA1Gp4yKb83kSth1oN38ZOC4xej6J8TkcXy7ebOgQklezzxKO9/QI0to5HZd1wVB4Yju37M/E6X7eCbooluqvEZZKpAOuVu1LGuymWpM/8u4smjnxI6RMFIItDiD/kcpVW3UV7Pq27iwsbsWjmbkwd/wbfr/MM7TPlZkWlEWoirUO/VYcOwcZKBizkLp2di9HaOpHvQhyF8tphFJlZPKdgczMD94McxhXrQ1aMl0ZhvjGVFbdRLFmbBE3FrPRgP60W/nPPnygAvWsaOHkp1C3oQmPMM7kBX3eCWDdOL2jCrFFV3OC3H+mpB7jcr+USmU5aIkaKtF7qrXczu/ty0dqWRU6WyzecpWNvfSq2NSSitp0ikgHmBoFR5GUsm0OwRhEwWmYbXYZ1mLdtqENsX4BRElDt9G4KfHIBFNLPBIoPHQoI7xSYaOAzs8llMmjNHcfYmlRe1gTXEgX7GS5hVkZegk4XeQL1KygfV0mKLVaotJtAYbAigSPllxfsdNgU+JcAkBEZmmB+SSankAWZGCA4uI2IXmr9mybtVdT9eB76Hxda6vfz/zLI0CtwSBx1ETC2ODpsjByygJ7NT3wy2CAQdG4jYBSnI7DohZYRfG+KLMsSdUpaeutVJ7Je+6VAq5CVmMdyjViXrbOVxT4fHgX+JQCkIQ1MdBAouiajoVZk4i4fmELyK8+hsn5gHfaND6QAH1E72RQ4cgrYADpy2tklSQEbQDYMwqKADaCwyGcXtgFkYyAsCtgACot8dmEbQDYGwqKADaCwyGcXtgFkYyAsCtgACot8dmEbQDYGwqKADaCwyGcXtgFkYyAsCtgACot8dmEbQDYGwqKADaCwyGcXtgFkYyAsCtgACot8dmEbQDYGwqKADaCwyGcXtgFkYyAsCtgACot8dmEbQDYGwqKADaCwyGcXtgFkYyAsCtgACot8dmEbQDYGwqKADaCwyGcXtgFkYyAsCtgACot8dmEbQDYGwqKADaCwyGcXtgFkYyAsCtgACot8dmEbQDYGwqKADaCwyGcXtgFkYyAsCvw/mJiNfNBp0O0AAAAASUVORK5CYII=", veronica: "data:image/webp;base64,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Oi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjkgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTA1LTMwVDEyOjAyOjQzKzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wNS0zMFQxNDoyNToxNSswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNC0wNS0zMFQxNDoyNToxNSswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iQWRvYmUgUkdCICgxOTk4KSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowM2U5NjQ0OC0xZmQ5LTQzZTUtODVkMC0zOTMwYTIwNjJlNzciIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MTQzZDJkNy0yZjMyLTJiNGUtOTY4Mi05YjE4ZDQ3ZWM4NDEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNjUyYjhiOS1jZWNmLTQ0NjctODg5ZC1jY2VhYTEzNDQ2MTIiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmY2NTJiOGI5LWNlY2YtNDQ2Ny04ODlkLWNjZWFhMTM0NDYxMiIgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMFQxMjowMjo0MyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI1LjkgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzZTk2NDQ4LTFmZDktNDNlNS04NWQwLTM5MzBhMjA2MmU3NyIgc3RFdnQ6d2hlbj0iMjAyNC0wNS0zMFQxNDoyNToxNSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI1LjkgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz4A", npo: "data:image/png;base64,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" }, se = new Set(Object.values(B));
function Ae(o) {
  return se.has(o);
}
const $ = [
  "Home",
  "Zoeken",
  "Bibliotheek",
  "Afspeellijsten",
  "Favorieten",
  "Recent afgespeeld",
  "Radio",
  "Wachtrij",
  "Instellingen"
];
function Z(o, t, e = []) {
  return ["metz", ...e].some(
    (i) => i.trim() && `${o} ${t}`.toLocaleLowerCase().includes(i.toLocaleLowerCase().trim())
  );
}
function Rt(o) {
  return typeof o == "string" && o.startsWith("data:") && Ae(o) || typeof o == "string" && (/^https?:\/\//i.test(o) || /^\/(?!\/)/.test(o)) ? o : "";
}
function H(o, t = 0) {
  var s, A, a, l, n, r;
  const e = o ?? {}, i = e.track ?? e.show ?? e.episode ?? e.media_item ?? (!e.uri && !e.media_content_id && e.album ? e.album : e);
  return {
    id: i.id ?? i.item_id ?? i.uri ?? i.media_content_id ?? "",
    uri: i.uri ?? i.media_content_id ?? "",
    title: i.name ?? i.title ?? "Onbekend",
    artist: Array.isArray(i.artists) ? i.artists.map((h) => typeof h == "string" ? h : h.name).join(", ") : i.artist ?? "",
    album: typeof i.album == "string" ? i.album : ((s = i.album) == null ? void 0 : s.name) ?? "",
    image: Rt(
      i.image ?? i.image_url ?? i.thumbnail ?? ((a = (A = i.images) == null ? void 0 : A[0]) == null ? void 0 : a.url) ?? ((r = (n = (l = i.album) == null ? void 0 : l.images) == null ? void 0 : n[0]) == null ? void 0 : r.url)
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
function tt(o) {
  const t = Math.max(0, Math.floor(Number(o) || 0));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}
function L(o) {
  const t = (o == null ? void 0 : o.attributes) ?? {}, e = (o == null ? void 0 : o.state) === "playing" && t.media_position_updated_at ? Math.max(
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
const mt = [
  {
    name: "Qmusic",
    uri: "https://stream.qmusic.nl/qmusic/mp3",
    image: B.qmusic
  },
  {
    name: "Qmusic 90s & 00s",
    uri: "https://stream.qmusic.nl/90s-00s/mp3",
    image: B.q90
  },
  {
    name: "Radio 538",
    uri: "https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO538.mp3",
    image: B.radio538
  },
  {
    name: "Radio Veronica",
    uri: "https://playerservices.streamtheworld.com/api/livestream-redirect/VERONICA.mp3",
    image: B.veronica
  },
  {
    name: "Sky Radio",
    uri: "https://playerservices.streamtheworld.com/api/livestream-redirect/SKYRADIO.mp3",
    image: B.sky
  },
  {
    name: "NPO Radio 2",
    uri: "https://icecast.omroep.nl/radio2-bb-mp3",
    image: B.npo
  }
];
function f(o) {
  return o.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
}
function ae(o) {
  return (o.radio_stations ?? mt).map((t, e) => {
    const i = mt.find(
      (s) => f(s.name) === f(t.name)
    );
    return H(
      {
        ...i,
        ...t,
        name: t.name,
        uri: t.uri || (i == null ? void 0 : i.uri),
        image: t.image || (i == null ? void 0 : i.image),
        media_type: "radio"
      },
      e
    );
  });
}
class oe {
  constructor(t, e) {
    this.hass = t, this.config = e, this.cooldown = 0, this.deviceWarnings = [], this.cache = /* @__PURE__ */ new Map();
  }
  has(t, e) {
    var i;
    return !!((i = this.hass.services[t]) != null && i[e]);
  }
  async call(t, e, i = {}, s = !1, A) {
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
      ...A ? { target: A } : {},
      return_response: !0
    })).response ?? {} : (await this.hass.callService(t, e, i, A), {});
  }
  async read(t, e, i = {}, s) {
    const A = JSON.stringify([t, e, i, s]), a = this.cache.get(A);
    if (a && a.until > Date.now()) return a.value;
    const l = this.call(t, e, i, !0, s).catch((n) => {
      throw /429|rate.?limit|too many/i.test(String((n == null ? void 0 : n.message) ?? n)) && (this.cooldown = Date.now() + 6e4), n;
    });
    this.cache.set(A, { until: Date.now() + 3e4, value: l }), this.cache.size > 100 && this.cache.delete(this.cache.keys().next().value);
    try {
      return await l;
    } catch (n) {
      throw this.cache.delete(A), n;
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
  async spotify(t, e, i, s = 0, A) {
    var d, m, b, y;
    let a = "get_playlist_favorites", l = { limit: 50, offset: Number(s) || 0 };
    if (A) {
      const k = {
        playlist: ["get_playlist_items", "playlist_id"],
        album: ["get_album_tracks", "album_id"],
        artist: ["get_artist_top_tracks", "artist_id"],
        show: ["get_show_episodes", "show_id"]
      }[A.kind];
      if (!k)
        throw new Error(
          "Deze collectie kan niet via SpotifyPlus worden geopend."
        );
      a = k[0], l[k[1]] = A.id, A.kind === "artist" && (l = { artist_id: A.id });
    } else i ? (a = "search_all", l = {
      criteria: i,
      criteria_type: "album,artist,playlist,track,show,episode",
      limit_total: 50
    }) : t === "Wachtrij" ? (a = "get_player_queue_info", l = {}) : t === "Recent afgespeeld" ? (a = "get_player_recent_tracks", l = { limit: 50, ...s ? { before: Number(s) } : {} }) : e === "track" || t === "Favorieten" ? a = "get_track_favorites" : e === "album" ? a = "get_album_favorites" : e === "artist" ? (a = "get_artists_followed", l = { limit: 50, ...s ? { after: s } : {} }) : e === "show" && (a = "get_show_favorites");
    const r = (await this.sp(a, l, !0)).result;
    if (r == null)
      throw new Error(
        "Onbekend SpotifyPlus-responseformaat: result ontbreekt."
      );
    let h = [];
    if (i)
      for (const I of [
        "albums",
        "artists",
        "playlists",
        "tracks",
        "shows",
        "episodes"
      ])
        h.push(...((d = r[I]) == null ? void 0 : d.items) ?? []);
    else
      h = Array.isArray(r) ? r : r.items ?? ((m = r.artists) == null ? void 0 : m.items) ?? r.queue ?? [];
    const g = r.artists ?? r, u = ((b = g.cursors) == null ? void 0 : b.after) ?? (t === "Recent afgespeeld" ? (y = g.cursors) == null ? void 0 : y.before : void 0);
    return {
      items: h.map(
        (I, k) => H(
          I,
          (t === "Recent afgespeeld" ? 0 : Number(s) || 0) + k
        )
      ),
      more: !i && t !== "Wachtrij" && (A == null ? void 0 : A.kind) !== "artist" && (!!g.next || !!u && h.length === 50),
      total: g.total,
      next: u
    };
  }
  async maEntry(t) {
    if (this.config.ma_config_entry_id) return this.config.ma_config_entry_id;
    const e = await this.hass.callWS({
      type: "config/entity_registry/list"
    }), i = new Set(this.config.ma_players.map((A) => A.entity)), s = e.find(
      (A) => A.entity_id === t && A.platform === "music_assistant"
    ) ?? e.find(
      (A) => i.has(A.entity_id) && A.platform === "music_assistant"
    );
    if (!(s != null && s.config_entry_id))
      throw new Error(
        "Stel ma_config_entry_id in voor Music Assistant zoeken en bibliotheek."
      );
    return s.config_entry_id;
  }
  async ma(t, e, i, s, A, a) {
    if (a)
      return {
        items: ((await this.hass.callWS({
          type: "media_player/browse_media",
          entity_id: A,
          media_content_id: a.uri,
          media_content_type: a.kind
        })).children ?? []).map((g, u) => H(g, u)),
        more: !1
      };
    if (t === "Wachtrij") {
      const h = await this.read(
        "music_assistant",
        "get_queue",
        {},
        { entity_id: A }
      ), g = h[A] ?? h;
      return {
        items: [g.current_item, g.next_item].filter(Boolean).map(H),
        more: !1,
        note: `${g.items ?? 0} items. De HA-API geeft alleen het huidige en volgende item terug; de volledige wachtrij staat in Music Assistant.`
      };
    }
    const l = await this.maEntry(A);
    let n;
    i ? n = await this.read("music_assistant", "search", {
      config_entry_id: l,
      name: i,
      media_type: t === "Radio" ? ["radio"] : ["track", "album", "artist", "playlist", "radio"],
      limit: 50
    }) : n = await this.read("music_assistant", "get_library", {
      config_entry_id: l,
      media_type: t === "Radio" ? "radio" : e,
      ...t === "Favorieten" ? { favorite: !0 } : {},
      ...t === "Recent afgespeeld" ? { order_by: "last_played_desc" } : {},
      limit: 50,
      offset: s
    });
    const r = i ? Object.values(n).filter(Array.isArray).flat() : n.items ?? [];
    return {
      items: r.map((h, g) => H(h, s + g)),
      more: !i && r.length === 50
    };
  }
  async radio(t, e, i) {
    const s = e ? [] : ae(this.config).filter(
      (n) => f(n.title).includes(f(t))
    );
    let A = { items: [], more: !1 }, a = "";
    try {
      A = await this.ma("Radio", "radio", t, e, i);
    } catch (n) {
      a = `Music Assistant-radiozoekfunctie/bibliotheek niet geladen: ${n instanceof Error ? n.message : String(n)} De meegeleverde zenders blijven beschikbaar via Music Assistant-afspelen.`;
    }
    const l = s.map((n) => {
      const r = A.items.find(
        (h) => h.uri && h.kind === "radio" && f(h.title) === f(n.title)
      );
      return r ? { ...r, image: r.image || n.image } : n;
    });
    for (const n of A.items)
      l.some(
        (r) => r.uri === n.uri || f(r.title) === f(n.title)
      ) || l.push(n);
    return { items: l, more: A.more, note: a || void 0 };
  }
  async devices(t, e) {
    if (t) {
      this.deviceWarnings = [];
      const i = ["get_player_devices"];
      this.has("spotifyplus", "get_spotify_connect_devices") ? i.push("get_spotify_connect_devices") : this.deviceWarnings.push(
        "Lokale SpotifyPlus-detectie ontbreekt: get_spotify_connect_devices is niet beschikbaar."
      );
      const s = await Promise.allSettled(
        i.map((l) => this.sp(l, { refresh: !0 }, !0))
      ), A = /* @__PURE__ */ new Map();
      let a = !1;
      if (s.forEach((l, n) => {
        var g, u;
        if (l.status === "rejected") {
          this.deviceWarnings.push(
            `${i[n]}: ${((g = l.reason) == null ? void 0 : g.message) ?? l.reason}`
          );
          return;
        }
        const r = l.value.result, h = n === 0 ? Array.isArray(r) ? r : r == null ? void 0 : r.devices : r == null ? void 0 : r.Items;
        if (!Array.isArray(h)) {
          this.deviceWarnings.push(
            `${i[n]}: onbekend responseformaat.`
          );
          return;
        }
        a = !0;
        for (const d of h)
          if (n === 0) {
            if (!d.id) continue;
            A.set(d.id, {
              id: d.id,
              name: d.name,
              active: !!d.is_active,
              available: !d.is_restricted
            });
          } else {
            const m = ((u = d.DiscoveryResult) == null ? void 0 : u.IsDynamicDevice) === !1 || d.IsChromeCast === !0, b = d.Id || (d.Name ? `local:${d.Name}` : "");
            if (!b) continue;
            const y = d.DeviceIdActivated, I = A.get(b) ?? (y ? A.get(y) : void 0);
            y && y !== b && A.delete(y);
            const k = h.filter((Et) => Et.Name === d.Name).length === 1;
            A.set(b, {
              id: b,
              name: d.Name ?? (I == null ? void 0 : I.name) ?? b,
              active: !!d.IsActiveDevice || !!(I != null && I.active),
              available: !!(d.Id || d.Name && k) && (!d.IsRestricted || !!d.IsChromeCast || !!d.IsSonos),
              local: m,
              cast: !!d.IsChromeCast,
              transferId: d.Id || d.Name
            });
          }
      }), !a) throw new Error(this.deviceWarnings.join(" · "));
      return [...A.values()].filter(
        (l) => !Z(l.id, l.name, this.config.excluded_devices)
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
    }).filter((i) => !Z(i.id, i.name, this.config.excluded_devices));
  }
  async allDevices(t, e) {
    const i = await Promise.allSettled([
      this.devices(!0, t),
      this.devices(!1, t)
    ]), s = [], A = [];
    return i.forEach((a, l) => {
      var r, h, g;
      const n = l === 0 ? "spotify" : "music_assistant";
      if (a.status === "rejected") {
        A.push(
          `${l === 0 ? "Spotify Connect" : "Music Assistant"}: ${((r = a.reason) == null ? void 0 : r.message) ?? a.reason}`
        );
        return;
      }
      for (const u of a.value)
        Z(
          u.id,
          ((h = this.hass.states[u.entity ?? ""]) == null ? void 0 : h.attributes.friendly_name) ?? u.name,
          this.config.excluded_devices
        ) || s.push({
          ...u,
          provider: n,
          active: n === "spotify" ? u.active : ((g = this.hass.states[u.id]) == null ? void 0 : g.state) === "playing",
          selected: n === "spotify" ? e === "spotify" && u.active : u.id === t
        });
    }), {
      devices: s,
      warnings: [.../* @__PURE__ */ new Set([...A, ...this.deviceWarnings])]
    };
  }
  async play(t, e, i, s, A = !1) {
    if (!t) {
      const a = this.hass.states[e];
      if (!this.config.ma_players.some((l) => l.entity === e) || !a || ["unknown", "unavailable"].includes(a.state) || Z(
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
      shuffle: A
    }) : ["playlist", "album", "artist", "show"].includes(i.kind) ? this.sp("player_media_play_context", {
      context_uri: i.uri,
      shuffle: A
    }) : this.sp("player_media_play_tracks", { uris: i.uri, shuffle: A }) : this.call(
      "music_assistant",
      "play_media",
      {
        media_id: (s == null ? void 0 : s.kind) === "playlist" ? s.uri : i.uri,
        media_type: (s == null ? void 0 : s.kind) === "playlist" ? "playlist" : i.kind,
        ...(s == null ? void 0 : s.kind) === "playlist" && i.uri !== s.uri ? { start_item: i.uri } : {},
        enqueue: "replace",
        shuffle: A
      },
      !1,
      { entity_id: e }
    );
  }
}
const ne = Jt`
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
  .version {
    font-size: 11px;
    font-weight: 400;
    margin-left: 8px;
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
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 8px 0;
  }
  .device > button:first-child {
    flex: 1 1 160px;
    min-width: 0;
    overflow-wrap: anywhere;
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
`, J = class J extends O {
  constructor() {
    super(...arguments), this.source = "spotify", this.session = "spotify", this.view = "Home", this.kind = "playlist", this.query = "", this.filter = "", this.page = { items: [], more: !1 }, this.loading = !1, this.busy = !1, this.error = "", this.sheet = "", this.devices = [], this.player = "", this.tick = 0, this.requestId = 0, this.cursor = 0, this.initialized = !1, this.manualSession = !1, this.manualPlayer = !1;
  }
  setConfig(t) {
    var e, i, s;
    if (!((e = t.spotify_entity) != null && e.startsWith("media_player.")))
      throw new Error("spotify_entity moet een media_player-entiteit zijn.");
    if (t.ma_players && (!Array.isArray(t.ma_players) || t.ma_players.some((A) => {
      var a;
      return !((a = A.entity) != null && a.startsWith("media_player."));
    })))
      throw new Error(
        "ma_players moet een lijst met entity en optioneel name zijn."
      );
    if (t.default_source && !["spotify", "music_assistant", "radio"].includes(t.default_source))
      throw new Error("Ongeldige default_source.");
    this.config = {
      ...t,
      ma_players: (t.ma_players ?? []).filter(
        (A) => !Z(A.entity, A.name ?? "", t.excluded_devices)
      )
    }, this.source = t.default_source ?? "spotify", this.player = t.default_player ?? ((i = this.config.ma_players[0]) == null ? void 0 : i.entity) ?? "";
    try {
      const A = JSON.parse(localStorage.getItem(this.storageKey) ?? "{}");
      ["spotify", "music_assistant", "radio"].includes(A.source) && (this.source = A.source), $.includes(A.view) && (this.view = A.view), this.config.ma_players.some((a) => a.entity === A.player) && (this.player = A.player);
    } catch {
    }
    this.config.ma_players.some((A) => A.entity === this.player) || (this.player = ((s = this.config.ma_players[0]) == null ? void 0 : s.entity) ?? ""), this.session = this.source, this.manualSession = !1, this.manualPlayer = !1, this.initialized = !1, this.api = void 0, this.requestId++;
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
    this.hass && this.config && (this.api ? this.api.hass = this.hass : this.api = new oe(this.hass, this.config), this.initialized ? t.has("hass") && this.detectSession() : (this.players.some((i) => i.entity === this.player) || (this.player = ((e = this.players[0]) == null ? void 0 : e.entity) ?? ""), this.initialized = !0, this.detectSession(), this.load()));
  }
  detectSession() {
    var i;
    if (!this.manualPlayer && ((i = this.hass.states[this.player]) == null ? void 0 : i.state) !== "playing") {
      const s = this.players.find(
        (A) => {
          var a;
          return ((a = this.hass.states[A.entity]) == null ? void 0 : a.state) === "playing";
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
        return !Z(
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
  get radioView() {
    return this.source === "radio" && ["Radio", "Home", "Zoeken"].includes(this.view) && !this.parent;
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
      ) : this.radioView ? await this.api.radio(this.query, Number(this.cursor), this.player) : await this.api.ma(
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
          device_id: t.transferId ?? t.id,
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
          src=${Rt(t)}
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
        ${S("shuffle")}</button
      ><button
        aria-label="Vorig nummer"
        ?disabled=${!this.supports(16) || this.busy}
        @click=${() => this.control("media_previous_track")}
      >
        ${S("previous")}</button
      >${this.toggle()}<button
        aria-label="Volgend nummer"
        ?disabled=${!this.supports(32) || this.busy}
        @click=${() => this.control("media_next_track")}
      >
        ${S("next")}</button
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
              ${S("queue")}
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
      ${S(((i = this.state) == null ? void 0 : i.state) === "playing" ? "pause" : "play")}
    </button>`;
  }
  seek() {
    var e;
    const t = ((e = this.state) == null ? void 0 : e.attributes.media_duration) ?? 0;
    return c`<div class="full-progress">
      <small>${tt(L(this.state))}</small
      ><input
        aria-label="Afspeelpositie"
        type="range"
        min="0"
        max=${t || 1}
        .value=${String(L(this.state))}
        ?disabled=${!t || !this.supports(2) || this.busy}
        @change=${(i) => this.control("media_seek", { seek_position: Number(i.target.value) })}
      /><small>−${tt(t - L(this.state))}</small>
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
      ><span class="duration">${t.duration ? tt(t.duration) : "—"}</span
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
      ([s, A]) => c`<option value=${s}>${A}</option>`
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
      ${this.radioView ? c`<p class="muted">
                Kies bovenaan een doelkamer en klik een zender om radio af te
                spelen. De standaardzenders werken ook zonder opgeslagen
                radiofavorieten.
              </p>
              <div class="tiles radio-tiles">
                ${t.filter((s) => s.kind === "radio").map(
      (s) => {
        var A;
        return c`<button
                        class="tile"
                        aria-label=${`Speel ${s.title}`}
                        ?disabled=${this.busy || !((A = this.api) != null && A.has("music_assistant", "play_media")) && !!s.uri}
                        @click=${() => {
          s.uri ? this.play(s) : (this.query = s.title, this.load());
        }}
                      >
                        ${this.art(s.image, s.title)}<span
                          ><b>${s.title}</b
                          ><small
                            >${s.uri ? "Afspelen" : "Zoeken in Music Assistant"}</small
                          ></span
                        >
                      </button>`;
      }
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
        ${i.filter((s) => !this.radioView || s.kind !== "radio").map((s) => this.track(s))}
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
      <p>Dunk Music 0.1.2</p>
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
    var e, i, s, A, a, l, n;
    if (this.sheet === "devices")
      return c`<h2 id="dialog-title">Alle apparaten</h2>
        <p class="muted">
          Spotify Connect en Music Assistant in één lijst. Een Music
          Assistant-kamer kiezen start geen muziek. Spotify Connect verplaatst
          alleen de Spotify-sessie.
        </p>
        ${this.busy && !this.devices.length ? c`<p role="status">Apparaten laden…</p>` : p}
        ${this.devices.map(
        (r) => {
          var h, g;
          return c`<div
              class=${`device ${r.active || r.selected ? "active" : ""}`}
            >
              <button
                ?disabled=${!r.available || this.busy}
                @click=${() => this.selectDevice(r)}
              >
                ${r.name} ·
                ${r.provider === "spotify" ? r.cast ? "Spotify Connect · Google Cast" : r.local ? "Spotify Connect · Lokaal" : "Spotify Connect" : "Music Assistant"}
                ·
                ${r.available ? r.active ? r.provider === "spotify" ? "Actief" : "Speelt" : r.selected ? "Geselecteerd" : "Beschikbaar" : "Niet beschikbaar"}
              </button>
              ${r.provider === "music_assistant" && this.session !== "spotify" && r.id !== this.player ? c`
                      <button
                        ?disabled=${!r.available || this.busy || !((h = this.api) != null && h.has("music_assistant", "transfer_queue"))}
                        @click=${() => this.selectDevice(r, !0)}
                      >
                        Overzetten
                      </button>
                      ${this.supports(524288) ? c`<button ?disabled=${!r.available || this.busy || !((((g = this.hass.states[r.id]) == null ? void 0 : g.attributes.supported_features) ?? 0) & 524288)} @click=${() => void this.action(() => this.api.call("media_player", "join", { entity_id: this.player, group_members: [r.id] }))}>Groeperen</button>` : p}
                    ` : p}
            </div>`;
        }
      )}
        ${!this.busy && !this.devices.length ? c`<p>Geen apparaten beschikbaar.</p>` : p}
        ${this.session !== "spotify" && this.supports(524288) ? c`<button ?disabled=${this.busy} @click=${() => this.control("unjoin")}>Groep verlaten</button>` : p}`;
    if (this.sheet === "options")
      return c`<h2 id="dialog-title">${(e = this.menuItem) == null ? void 0 : e.title}</h2>
        <div class="controls">
          ${this.source === "spotify" && ((i = this.menuItem) == null ? void 0 : i.kind) === "track" ? c`<button ?disabled=${this.busy || !((s = this.api) != null && s.has("spotifyplus", "save_track_favorites"))} @click=${() => this.favorite(!1)}>♡ Favoriet toevoegen</button><button ?disabled=${this.busy || !((A = this.api) != null && A.has("spotifyplus", "remove_track_favorites"))} @click=${() => this.favorite(!0)}>Favoriet verwijderen</button>` : c`<p>Favorieten beheren voor dit type doe je in de bronapp.</p>`}<button
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
      >${this.session === "spotify" && ((n = t.media_content_id) != null && n.startsWith("spotify:track:")) ? c`<button
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
    var A;
    if (!this.config || !this.hass) return c`<p>Home Assistant laden…</p>`;
    const t = ((A = this.state) == null ? void 0 : A.attributes) ?? {}, e = (this.config.navigation ?? $).filter((a) => $.includes(a)), i = /^#[\da-f]{6}$/i.test(this.config.accent_color ?? "") ? this.config.accent_color : "#1ed760", s = /^(\d+(px|vh|dvh)|calc\([\d\s()+*/.\-a-z]+\))$/.test(
      this.config.height ?? ""
    ) ? this.config.height : "calc(100dvh - 72px)";
    return c`<div
      class=${this.config.mobile_compact === !1 ? "app roomy" : "app"}
      style=${`--accent:${i};--height:${s}`}
    >
      <header ?inert=${!!this.sheet}>
        <strong>Dunk Music<small class="version"> v0.1.2</small></strong
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
      var l, n;
      return c`<option value=${a.entity} ?disabled=${!this.hass.states[a.entity] || ["unknown", "unavailable"].includes((l = this.hass.states[a.entity]) == null ? void 0 : l.state)}>${a.name ?? ((n = this.hass.states[a.entity]) == null ? void 0 : n.attributes.friendly_name) ?? a.entity}</option>`;
    })}
              </select>` : p}<select
          aria-label="Bedien afspeelsessie"
          .value=${Tt(this.session === "spotify" ? "spotify" : "music_assistant")}
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
          ${S("devices")}
        </button>
        <div class="volume">${this.volume()}</div>
        <div class="progress" aria-hidden="true">
          <div
            style=${`width:${Math.min(100, 100 * L(this.state) / (t.media_duration || 1))}%`}
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
J.styles = ne, J.properties = {
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
let st = J;
customElements.get("dunk-music-card") || customElements.define("dunk-music-card", st);
const Q = window;
Q.customCards = Q.customCards ?? [];
Q.customCards.some((o) => o.type === "dunk-music-card") || Q.customCards.push({
  type: "dunk-music-card",
  name: "Dunk Music",
  description: "SpotifyPlus en Music Assistant in één muziekdashboard",
  preview: !1
});
export {
  st as DunkMusicCard
};
//# sourceMappingURL=dunk-music.js.map
