import { j as ge } from './jsx-runtime.u17CrQMm.js'
import { r as E } from './index.B02hbnpo.js'
function ze(e) {
  var t,
    r,
    o = ''
  if (typeof e == 'string' || typeof e == 'number') o += e
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var i = e.length
      for (t = 0; t < i; t++)
        e[t] && (r = ze(e[t])) && (o && (o += ' '), (o += r))
    } else for (r in e) e[r] && (o && (o += ' '), (o += r))
  return o
}
function Be() {
  for (var e, t, r = 0, o = '', i = arguments.length; r < i; r++)
    (e = arguments[r]) && (t = ze(e)) && (o && (o += ' '), (o += t))
  return o
}
const Fe = (e, t) => {
    const r = new Array(e.length + t.length)
    for (let o = 0; o < e.length; o++) r[o] = e[o]
    for (let o = 0; o < t.length; o++) r[e.length + o] = t[o]
    return r
  },
  Ve = (e, t) => ({ classGroupId: e, validator: t }),
  Ce = (e = new Map(), t = null, r) => ({
    nextPart: e,
    validators: t,
    classGroupId: r,
  }),
  K = '-',
  he = [],
  We = 'arbitrary..',
  _e = (e) => {
    const t = Ue(e),
      { conflictingClassGroups: r, conflictingClassGroupModifiers: o } = e
    return {
      getClassGroupId: (a) => {
        if (a.startsWith('[') && a.endsWith(']')) return $e(a)
        const b = a.split(K),
          c = b[0] === '' && b.length > 1 ? 1 : 0
        return Re(b, c, t)
      },
      getConflictingClassGroupIds: (a, b) => {
        if (b) {
          const c = o[a],
            p = r[a]
          return c ? (p ? Fe(p, c) : c) : p || he
        }
        return r[a] || he
      },
    }
  },
  Re = (e, t, r) => {
    if (e.length - t === 0) return r.classGroupId
    const i = e[t],
      m = r.nextPart.get(i)
    if (m) {
      const p = Re(e, t + 1, m)
      if (p) return p
    }
    const a = r.validators
    if (a === null) return
    const b = t === 0 ? e.join(K) : e.slice(t).join(K),
      c = a.length
    for (let p = 0; p < c; p++) {
      const k = a[p]
      if (k.validator(b)) return k.classGroupId
    }
  },
  $e = (e) =>
    e.slice(1, -1).indexOf(':') === -1
      ? void 0
      : (() => {
          const t = e.slice(1, -1),
            r = t.indexOf(':'),
            o = t.slice(0, r)
          return o ? We + o : void 0
        })(),
  Ue = (e) => {
    const { theme: t, classGroups: r } = e
    return De(r, t)
  },
  De = (e, t) => {
    const r = Ce()
    for (const o in e) {
      const i = e[o]
      ae(i, r, o, t)
    }
    return r
  },
  ae = (e, t, r, o) => {
    const i = e.length
    for (let m = 0; m < i; m++) {
      const a = e[m]
      Xe(a, t, r, o)
    }
  },
  Xe = (e, t, r, o) => {
    if (typeof e == 'string') {
      Ye(e, t, r)
      return
    }
    if (typeof e == 'function') {
      qe(e, t, r, o)
      return
    }
    He(e, t, r, o)
  },
  Ye = (e, t, r) => {
    const o = e === '' ? t : Ae(t, e)
    o.classGroupId = r
  },
  qe = (e, t, r, o) => {
    if (Je(e)) {
      ae(e(o), t, r, o)
      return
    }
    ;(t.validators === null && (t.validators = []), t.validators.push(Ve(r, e)))
  },
  He = (e, t, r, o) => {
    const i = Object.entries(e),
      m = i.length
    for (let a = 0; a < m; a++) {
      const [b, c] = i[a]
      ae(c, Ae(t, b), r, o)
    }
  },
  Ae = (e, t) => {
    let r = e
    const o = t.split(K),
      i = o.length
    for (let m = 0; m < i; m++) {
      const a = o[m]
      let b = r.nextPart.get(a)
      ;(b || ((b = Ce()), r.nextPart.set(a, b)), (r = b))
    }
    return r
  },
  Je = (e) => 'isThemeGetter' in e && e.isThemeGetter === !0,
  Qe = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} }
    let t = 0,
      r = Object.create(null),
      o = Object.create(null)
    const i = (m, a) => {
      ;((r[m] = a), t++, t > e && ((t = 0), (o = r), (r = Object.create(null))))
    }
    return {
      get(m) {
        let a = r[m]
        if (a !== void 0) return a
        if ((a = o[m]) !== void 0) return (i(m, a), a)
      },
      set(m, a) {
        m in r ? (r[m] = a) : i(m, a)
      },
    }
  },
  ne = '!',
  we = ':',
  Ke = [],
  xe = (e, t, r, o, i) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: r,
    maybePostfixModifierPosition: o,
    isExternal: i,
  }),
  Ze = (e) => {
    const { prefix: t, experimentalParseClassName: r } = e
    let o = (i) => {
      const m = []
      let a = 0,
        b = 0,
        c = 0,
        p
      const k = i.length
      for (let w = 0; w < k; w++) {
        const f = i[w]
        if (a === 0 && b === 0) {
          if (f === we) {
            ;(m.push(i.slice(c, w)), (c = w + 1))
            continue
          }
          if (f === '/') {
            p = w
            continue
          }
        }
        f === '[' ? a++ : f === ']' ? a-- : f === '(' ? b++ : f === ')' && b--
      }
      const z = m.length === 0 ? i : i.slice(c)
      let R = z,
        h = !1
      z.endsWith(ne)
        ? ((R = z.slice(0, -1)), (h = !0))
        : z.startsWith(ne) && ((R = z.slice(1)), (h = !0))
      const x = p && p > c ? p - c : void 0
      return xe(m, h, R, x)
    }
    if (t) {
      const i = t + we,
        m = o
      o = (a) =>
        a.startsWith(i) ? m(a.slice(i.length)) : xe(Ke, !1, a, void 0, !0)
    }
    if (r) {
      const i = o
      o = (m) => r({ className: m, parseClassName: i })
    }
    return o
  },
  eo = (e) => {
    const t = new Map()
    return (
      e.orderSensitiveModifiers.forEach((r, o) => {
        t.set(r, 1e6 + o)
      }),
      (r) => {
        const o = []
        let i = []
        for (let m = 0; m < r.length; m++) {
          const a = r[m],
            b = a[0] === '[',
            c = t.has(a)
          b || c
            ? (i.length > 0 && (i.sort(), o.push(...i), (i = [])), o.push(a))
            : i.push(a)
        }
        return (i.length > 0 && (i.sort(), o.push(...i)), o)
      }
    )
  },
  oo = (e) => ({
    cache: Qe(e.cacheSize),
    parseClassName: Ze(e),
    sortModifiers: eo(e),
    ..._e(e),
  }),
  ro = /\s+/,
  to = (e, t) => {
    const {
        parseClassName: r,
        getClassGroupId: o,
        getConflictingClassGroupIds: i,
        sortModifiers: m,
      } = t,
      a = [],
      b = e.trim().split(ro)
    let c = ''
    for (let p = b.length - 1; p >= 0; p -= 1) {
      const k = b[p],
        {
          isExternal: z,
          modifiers: R,
          hasImportantModifier: h,
          baseClassName: x,
          maybePostfixModifierPosition: w,
        } = r(k)
      if (z) {
        c = k + (c.length > 0 ? ' ' + c : c)
        continue
      }
      let f = !!w,
        g = o(f ? x.substring(0, w) : x)
      if (!g) {
        if (!f) {
          c = k + (c.length > 0 ? ' ' + c : c)
          continue
        }
        if (((g = o(x)), !g)) {
          c = k + (c.length > 0 ? ' ' + c : c)
          continue
        }
        f = !1
      }
      const C = R.length === 0 ? '' : R.length === 1 ? R[0] : m(R).join(':'),
        I = h ? C + ne : C,
        L = I + g
      if (a.indexOf(L) > -1) continue
      a.push(L)
      const T = i(g, f)
      for (let B = 0; B < T.length; ++B) {
        const $ = T[B]
        a.push(I + $)
      }
      c = k + (c.length > 0 ? ' ' + c : c)
    }
    return c
  },
  so = (...e) => {
    let t = 0,
      r,
      o,
      i = ''
    for (; t < e.length; )
      (r = e[t++]) && (o = Se(r)) && (i && (i += ' '), (i += o))
    return i
  },
  Se = (e) => {
    if (typeof e == 'string') return e
    let t,
      r = ''
    for (let o = 0; o < e.length; o++)
      e[o] && (t = Se(e[o])) && (r && (r += ' '), (r += t))
    return r
  },
  no = (e, ...t) => {
    let r, o, i, m
    const a = (c) => {
        const p = t.reduce((k, z) => z(k), e())
        return (
          (r = oo(p)),
          (o = r.cache.get),
          (i = r.cache.set),
          (m = b),
          b(c)
        )
      },
      b = (c) => {
        const p = o(c)
        if (p) return p
        const k = to(c, r)
        return (i(c, k), k)
      }
    return ((m = a), (...c) => m(so(...c)))
  },
  ao = [],
  y = (e) => {
    const t = (r) => r[e] || ao
    return ((t.isThemeGetter = !0), t)
  },
  Me = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Ie = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  io = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  lo = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  co =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  mo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  uo = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  bo =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  j = (e) => io.test(e),
  u = (e) => !!e && !Number.isNaN(Number(e)),
  O = (e) => !!e && Number.isInteger(Number(e)),
  se = (e) => e.endsWith('%') && u(e.slice(0, -1)),
  G = (e) => lo.test(e),
  Pe = () => !0,
  po = (e) => co.test(e) && !mo.test(e),
  ie = () => !1,
  fo = (e) => uo.test(e),
  go = (e) => bo.test(e),
  ho = (e) => !s(e) && !n(e),
  wo = (e) => N(e, Le, ie),
  s = (e) => Me.test(e),
  V = (e) => N(e, Te, po),
  ke = (e) => N(e, Ao, u),
  xo = (e) => N(e, Oe, Pe),
  ko = (e) => N(e, je, ie),
  ye = (e) => N(e, Ee, ie),
  yo = (e) => N(e, Ge, go),
  J = (e) => N(e, Ne, fo),
  n = (e) => Ie.test(e),
  U = (e) => W(e, Te),
  vo = (e) => W(e, je),
  ve = (e) => W(e, Ee),
  zo = (e) => W(e, Le),
  Co = (e) => W(e, Ge),
  Q = (e) => W(e, Ne, !0),
  Ro = (e) => W(e, Oe, !0),
  N = (e, t, r) => {
    const o = Me.exec(e)
    return o ? (o[1] ? t(o[1]) : r(o[2])) : !1
  },
  W = (e, t, r = !1) => {
    const o = Ie.exec(e)
    return o ? (o[1] ? t(o[1]) : r) : !1
  },
  Ee = (e) => e === 'position' || e === 'percentage',
  Ge = (e) => e === 'image' || e === 'url',
  Le = (e) => e === 'length' || e === 'size' || e === 'bg-size',
  Te = (e) => e === 'length',
  Ao = (e) => e === 'number',
  je = (e) => e === 'family-name',
  Oe = (e) => e === 'number' || e === 'weight',
  Ne = (e) => e === 'shadow',
  So = () => {
    const e = y('color'),
      t = y('font'),
      r = y('text'),
      o = y('font-weight'),
      i = y('tracking'),
      m = y('leading'),
      a = y('breakpoint'),
      b = y('container'),
      c = y('spacing'),
      p = y('radius'),
      k = y('shadow'),
      z = y('inset-shadow'),
      R = y('text-shadow'),
      h = y('drop-shadow'),
      x = y('blur'),
      w = y('perspective'),
      f = y('aspect'),
      g = y('ease'),
      C = y('animate'),
      I = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      L = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      T = () => [...L(), n, s],
      B = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      $ = () => ['auto', 'contain', 'none'],
      l = () => [n, s, c],
      M = () => [j, 'full', 'auto', ...l()],
      le = () => [O, 'none', 'subgrid', n, s],
      ce = () => ['auto', { span: ['full', O, n, s] }, O, n, s],
      D = () => [O, 'auto', n, s],
      de = () => ['auto', 'min', 'max', 'fr', n, s],
      Z = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      _ = () => [
        'start',
        'end',
        'center',
        'stretch',
        'center-safe',
        'end-safe',
      ],
      P = () => ['auto', ...l()],
      F = () => [
        j,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...l(),
      ],
      ee = () => [
        j,
        'screen',
        'full',
        'dvw',
        'lvw',
        'svw',
        'min',
        'max',
        'fit',
        ...l(),
      ],
      oe = () => [
        j,
        'screen',
        'full',
        'lh',
        'dvh',
        'lvh',
        'svh',
        'min',
        'max',
        'fit',
        ...l(),
      ],
      d = () => [e, n, s],
      me = () => [...L(), ve, ye, { position: [n, s] }],
      ue = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      be = () => ['auto', 'cover', 'contain', zo, wo, { size: [n, s] }],
      re = () => [se, U, V],
      A = () => ['', 'none', 'full', p, n, s],
      S = () => ['', u, U, V],
      X = () => ['solid', 'dashed', 'dotted', 'double'],
      pe = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      v = () => [u, se, ve, ye],
      fe = () => ['', 'none', x, n, s],
      Y = () => ['none', u, n, s],
      q = () => ['none', u, n, s],
      te = () => [u, n, s],
      H = () => [j, 'full', ...l()]
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [G],
        breakpoint: [G],
        color: [Pe],
        container: [G],
        'drop-shadow': [G],
        ease: ['in', 'out', 'in-out'],
        font: [ho],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [G],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [G],
        shadow: [G],
        spacing: ['px', u],
        text: [G],
        'text-shadow': [G],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', j, s, n, f] }],
        container: ['container'],
        columns: [{ columns: [u, s, n, b] }],
        'break-after': [{ 'break-after': I() }],
        'break-before': [{ 'break-before': I() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: T() }],
        overflow: [{ overflow: B() }],
        'overflow-x': [{ 'overflow-x': B() }],
        'overflow-y': [{ 'overflow-y': B() }],
        overscroll: [{ overscroll: $() }],
        'overscroll-x': [{ 'overscroll-x': $() }],
        'overscroll-y': [{ 'overscroll-y': $() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: M() }],
        'inset-x': [{ 'inset-x': M() }],
        'inset-y': [{ 'inset-y': M() }],
        start: [{ 'inset-s': M(), start: M() }],
        end: [{ 'inset-e': M(), end: M() }],
        'inset-bs': [{ 'inset-bs': M() }],
        'inset-be': [{ 'inset-be': M() }],
        top: [{ top: M() }],
        right: [{ right: M() }],
        bottom: [{ bottom: M() }],
        left: [{ left: M() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [O, 'auto', n, s] }],
        basis: [{ basis: [j, 'full', 'auto', b, ...l()] }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [u, j, 'auto', 'initial', 'none', s] }],
        grow: [{ grow: ['', u, n, s] }],
        shrink: [{ shrink: ['', u, n, s] }],
        order: [{ order: [O, 'first', 'last', 'none', n, s] }],
        'grid-cols': [{ 'grid-cols': le() }],
        'col-start-end': [{ col: ce() }],
        'col-start': [{ 'col-start': D() }],
        'col-end': [{ 'col-end': D() }],
        'grid-rows': [{ 'grid-rows': le() }],
        'row-start-end': [{ row: ce() }],
        'row-start': [{ 'row-start': D() }],
        'row-end': [{ 'row-end': D() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': de() }],
        'auto-rows': [{ 'auto-rows': de() }],
        gap: [{ gap: l() }],
        'gap-x': [{ 'gap-x': l() }],
        'gap-y': [{ 'gap-y': l() }],
        'justify-content': [{ justify: [...Z(), 'normal'] }],
        'justify-items': [{ 'justify-items': [..._(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ..._()] }],
        'align-content': [{ content: ['normal', ...Z()] }],
        'align-items': [{ items: [..._(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ..._(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': Z() }],
        'place-items': [{ 'place-items': [..._(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ..._()] }],
        p: [{ p: l() }],
        px: [{ px: l() }],
        py: [{ py: l() }],
        ps: [{ ps: l() }],
        pe: [{ pe: l() }],
        pbs: [{ pbs: l() }],
        pbe: [{ pbe: l() }],
        pt: [{ pt: l() }],
        pr: [{ pr: l() }],
        pb: [{ pb: l() }],
        pl: [{ pl: l() }],
        m: [{ m: P() }],
        mx: [{ mx: P() }],
        my: [{ my: P() }],
        ms: [{ ms: P() }],
        me: [{ me: P() }],
        mbs: [{ mbs: P() }],
        mbe: [{ mbe: P() }],
        mt: [{ mt: P() }],
        mr: [{ mr: P() }],
        mb: [{ mb: P() }],
        ml: [{ ml: P() }],
        'space-x': [{ 'space-x': l() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': l() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: F() }],
        'inline-size': [{ inline: ['auto', ...ee()] }],
        'min-inline-size': [{ 'min-inline': ['auto', ...ee()] }],
        'max-inline-size': [{ 'max-inline': ['none', ...ee()] }],
        'block-size': [{ block: ['auto', ...oe()] }],
        'min-block-size': [{ 'min-block': ['auto', ...oe()] }],
        'max-block-size': [{ 'max-block': ['none', ...oe()] }],
        w: [{ w: [b, 'screen', ...F()] }],
        'min-w': [{ 'min-w': [b, 'screen', 'none', ...F()] }],
        'max-w': [
          { 'max-w': [b, 'screen', 'none', 'prose', { screen: [a] }, ...F()] },
        ],
        h: [{ h: ['screen', 'lh', ...F()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...F()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...F()] }],
        'font-size': [{ text: ['base', r, U, V] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [o, Ro, xo] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              se,
              s,
            ],
          },
        ],
        'font-family': [{ font: [vo, ko, t] }],
        'font-features': [{ 'font-features': [s] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [i, n, s] }],
        'line-clamp': [{ 'line-clamp': [u, 'none', n, ke] }],
        leading: [{ leading: [m, ...l()] }],
        'list-image': [{ 'list-image': ['none', n, s] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', n, s] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'placeholder-color': [{ placeholder: d() }],
        'text-color': [{ text: d() }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [{ decoration: [...X(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: [u, 'from-font', 'auto', n, V] },
        ],
        'text-decoration-color': [{ decoration: d() }],
        'underline-offset': [{ 'underline-offset': [u, 'auto', n, s] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: l() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              n,
              s,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', n, s] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: me() }],
        'bg-repeat': [{ bg: ue() }],
        'bg-size': [{ bg: be() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  { to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
                  O,
                  n,
                  s,
                ],
                radial: ['', n, s],
                conic: [O, n, s],
              },
              Co,
              yo,
            ],
          },
        ],
        'bg-color': [{ bg: d() }],
        'gradient-from-pos': [{ from: re() }],
        'gradient-via-pos': [{ via: re() }],
        'gradient-to-pos': [{ to: re() }],
        'gradient-from': [{ from: d() }],
        'gradient-via': [{ via: d() }],
        'gradient-to': [{ to: d() }],
        rounded: [{ rounded: A() }],
        'rounded-s': [{ 'rounded-s': A() }],
        'rounded-e': [{ 'rounded-e': A() }],
        'rounded-t': [{ 'rounded-t': A() }],
        'rounded-r': [{ 'rounded-r': A() }],
        'rounded-b': [{ 'rounded-b': A() }],
        'rounded-l': [{ 'rounded-l': A() }],
        'rounded-ss': [{ 'rounded-ss': A() }],
        'rounded-se': [{ 'rounded-se': A() }],
        'rounded-ee': [{ 'rounded-ee': A() }],
        'rounded-es': [{ 'rounded-es': A() }],
        'rounded-tl': [{ 'rounded-tl': A() }],
        'rounded-tr': [{ 'rounded-tr': A() }],
        'rounded-br': [{ 'rounded-br': A() }],
        'rounded-bl': [{ 'rounded-bl': A() }],
        'border-w': [{ border: S() }],
        'border-w-x': [{ 'border-x': S() }],
        'border-w-y': [{ 'border-y': S() }],
        'border-w-s': [{ 'border-s': S() }],
        'border-w-e': [{ 'border-e': S() }],
        'border-w-bs': [{ 'border-bs': S() }],
        'border-w-be': [{ 'border-be': S() }],
        'border-w-t': [{ 'border-t': S() }],
        'border-w-r': [{ 'border-r': S() }],
        'border-w-b': [{ 'border-b': S() }],
        'border-w-l': [{ 'border-l': S() }],
        'divide-x': [{ 'divide-x': S() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': S() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...X(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...X(), 'hidden', 'none'] }],
        'border-color': [{ border: d() }],
        'border-color-x': [{ 'border-x': d() }],
        'border-color-y': [{ 'border-y': d() }],
        'border-color-s': [{ 'border-s': d() }],
        'border-color-e': [{ 'border-e': d() }],
        'border-color-bs': [{ 'border-bs': d() }],
        'border-color-be': [{ 'border-be': d() }],
        'border-color-t': [{ 'border-t': d() }],
        'border-color-r': [{ 'border-r': d() }],
        'border-color-b': [{ 'border-b': d() }],
        'border-color-l': [{ 'border-l': d() }],
        'divide-color': [{ divide: d() }],
        'outline-style': [{ outline: [...X(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [u, n, s] }],
        'outline-w': [{ outline: ['', u, U, V] }],
        'outline-color': [{ outline: d() }],
        shadow: [{ shadow: ['', 'none', k, Q, J] }],
        'shadow-color': [{ shadow: d() }],
        'inset-shadow': [{ 'inset-shadow': ['none', z, Q, J] }],
        'inset-shadow-color': [{ 'inset-shadow': d() }],
        'ring-w': [{ ring: S() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: d() }],
        'ring-offset-w': [{ 'ring-offset': [u, V] }],
        'ring-offset-color': [{ 'ring-offset': d() }],
        'inset-ring-w': [{ 'inset-ring': S() }],
        'inset-ring-color': [{ 'inset-ring': d() }],
        'text-shadow': [{ 'text-shadow': ['none', R, Q, J] }],
        'text-shadow-color': [{ 'text-shadow': d() }],
        opacity: [{ opacity: [u, n, s] }],
        'mix-blend': [
          { 'mix-blend': [...pe(), 'plus-darker', 'plus-lighter'] },
        ],
        'bg-blend': [{ 'bg-blend': pe() }],
        'mask-clip': [
          {
            'mask-clip': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
          'mask-no-clip',
        ],
        'mask-composite': [
          { mask: ['add', 'subtract', 'intersect', 'exclude'] },
        ],
        'mask-image-linear-pos': [{ 'mask-linear': [u] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': v() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': v() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': d() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': d() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': v() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': v() }],
        'mask-image-t-from-color': [{ 'mask-t-from': d() }],
        'mask-image-t-to-color': [{ 'mask-t-to': d() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': v() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': v() }],
        'mask-image-r-from-color': [{ 'mask-r-from': d() }],
        'mask-image-r-to-color': [{ 'mask-r-to': d() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': v() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': v() }],
        'mask-image-b-from-color': [{ 'mask-b-from': d() }],
        'mask-image-b-to-color': [{ 'mask-b-to': d() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': v() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': v() }],
        'mask-image-l-from-color': [{ 'mask-l-from': d() }],
        'mask-image-l-to-color': [{ 'mask-l-to': d() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': v() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': v() }],
        'mask-image-x-from-color': [{ 'mask-x-from': d() }],
        'mask-image-x-to-color': [{ 'mask-x-to': d() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': v() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': v() }],
        'mask-image-y-from-color': [{ 'mask-y-from': d() }],
        'mask-image-y-to-color': [{ 'mask-y-to': d() }],
        'mask-image-radial': [{ 'mask-radial': [n, s] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': v() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': v() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': d() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': d() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          {
            'mask-radial': [
              { closest: ['side', 'corner'], farthest: ['side', 'corner'] },
            ],
          },
        ],
        'mask-image-radial-pos': [{ 'mask-radial-at': L() }],
        'mask-image-conic-pos': [{ 'mask-conic': [u] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': v() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': v() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': d() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': d() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          {
            'mask-origin': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
        ],
        'mask-position': [{ mask: me() }],
        'mask-repeat': [{ mask: ue() }],
        'mask-size': [{ mask: be() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', n, s] }],
        filter: [{ filter: ['', 'none', n, s] }],
        blur: [{ blur: fe() }],
        brightness: [{ brightness: [u, n, s] }],
        contrast: [{ contrast: [u, n, s] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', h, Q, J] }],
        'drop-shadow-color': [{ 'drop-shadow': d() }],
        grayscale: [{ grayscale: ['', u, n, s] }],
        'hue-rotate': [{ 'hue-rotate': [u, n, s] }],
        invert: [{ invert: ['', u, n, s] }],
        saturate: [{ saturate: [u, n, s] }],
        sepia: [{ sepia: ['', u, n, s] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', n, s] }],
        'backdrop-blur': [{ 'backdrop-blur': fe() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [u, n, s] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [u, n, s] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', u, n, s] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [u, n, s] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', u, n, s] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [u, n, s] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [u, n, s] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', u, n, s] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': l() }],
        'border-spacing-x': [{ 'border-spacing-x': l() }],
        'border-spacing-y': [{ 'border-spacing-y': l() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              n,
              s,
            ],
          },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [u, 'initial', n, s] }],
        ease: [{ ease: ['linear', 'initial', g, n, s] }],
        delay: [{ delay: [u, n, s] }],
        animate: [{ animate: ['none', C, n, s] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [w, n, s] }],
        'perspective-origin': [{ 'perspective-origin': T() }],
        rotate: [{ rotate: Y() }],
        'rotate-x': [{ 'rotate-x': Y() }],
        'rotate-y': [{ 'rotate-y': Y() }],
        'rotate-z': [{ 'rotate-z': Y() }],
        scale: [{ scale: q() }],
        'scale-x': [{ 'scale-x': q() }],
        'scale-y': [{ 'scale-y': q() }],
        'scale-z': [{ 'scale-z': q() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: te() }],
        'skew-x': [{ 'skew-x': te() }],
        'skew-y': [{ 'skew-y': te() }],
        transform: [{ transform: [n, s, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: T() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: H() }],
        'translate-x': [{ 'translate-x': H() }],
        'translate-y': [{ 'translate-y': H() }],
        'translate-z': [{ 'translate-z': H() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: d() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: d() }],
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              n,
              s,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': l() }],
        'scroll-mx': [{ 'scroll-mx': l() }],
        'scroll-my': [{ 'scroll-my': l() }],
        'scroll-ms': [{ 'scroll-ms': l() }],
        'scroll-me': [{ 'scroll-me': l() }],
        'scroll-mbs': [{ 'scroll-mbs': l() }],
        'scroll-mbe': [{ 'scroll-mbe': l() }],
        'scroll-mt': [{ 'scroll-mt': l() }],
        'scroll-mr': [{ 'scroll-mr': l() }],
        'scroll-mb': [{ 'scroll-mb': l() }],
        'scroll-ml': [{ 'scroll-ml': l() }],
        'scroll-p': [{ 'scroll-p': l() }],
        'scroll-px': [{ 'scroll-px': l() }],
        'scroll-py': [{ 'scroll-py': l() }],
        'scroll-ps': [{ 'scroll-ps': l() }],
        'scroll-pe': [{ 'scroll-pe': l() }],
        'scroll-pbs': [{ 'scroll-pbs': l() }],
        'scroll-pbe': [{ 'scroll-pbe': l() }],
        'scroll-pt': [{ 'scroll-pt': l() }],
        'scroll-pr': [{ 'scroll-pr': l() }],
        'scroll-pb': [{ 'scroll-pb': l() }],
        'scroll-pl': [{ 'scroll-pl': l() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          { 'will-change': ['auto', 'scroll', 'contents', 'transform', n, s] },
        ],
        fill: [{ fill: ['none', ...d()] }],
        'stroke-w': [{ stroke: [u, U, V, ke] }],
        stroke: [{ stroke: ['none', ...d()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'inset-bs',
          'inset-be',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pbs', 'pbe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mbs', 'mbe', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-bs',
          'border-w-be',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-bs',
          'border-color-be',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mbs',
          'scroll-mbe',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pbs',
          'scroll-pbe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    }
  },
  Mo = no(So)
function Io(...e) {
  return Mo(Be(e))
}
const Po = 40,
  Eo = 15,
  Go = 80
function jo({
  mode: e = 'guided',
  density: t = 28,
  speed: r = 1,
  height: o = 650,
  className: i = '',
}) {
  const m = E.useRef(null),
    a = E.useRef(null),
    b = E.useRef([]),
    c = E.useRef(0),
    p = E.useRef(!1),
    k = E.useCallback(
      (h, x) => {
        const w = [],
          f = Math.max(4, Math.floor(600 / t))
        for (let g = 0; g < h; g += f)
          for (let C = 0; C < x; C += f) {
            const I = Math.random() * 0.25 + 0.15
            w.push({ x: g, y: C, brightness: I, targetBrightness: I, size: f })
          }
        return w
      },
      [t],
    ),
    z = E.useCallback(() => {
      const h = m.current
      if (!h) return
      const x = h.getContext('2d')
      if (!x) return
      const w = h.width,
        f = h.height
      ;((x.fillStyle = '#0a0a0a'),
        x.fillRect(0, 0, w, f),
        b.current.forEach((g) => {
          p.current ||
            ((g.brightness += (g.targetBrightness - g.brightness) * 0.02 * r),
            Math.random() < 0.003 * r &&
              (g.targetBrightness = Math.random() * 0.25 + 0.15))
          const C = g.brightness,
            I = Math.floor(C * Po),
            L = Math.floor(C * Eo),
            T = Math.floor(C * Go)
          ;((x.fillStyle = `rgba(${I}, ${L}, ${T}, ${C})`),
            x.fillRect(g.x, g.y, g.size - 1, g.size - 1))
        }),
        p.current || (c.current = requestAnimationFrame(z)))
    }, [r]),
    R = E.useCallback(() => {
      const h = m.current,
        x = a.current
      if (!h) return
      const w = Math.min(window.devicePixelRatio || 1, 2)
      let f, g
      ;(x
        ? ((f = x.getBoundingClientRect().width), (g = o))
        : ((f = window.innerWidth), (g = o)),
        (h.width = f * w),
        (h.height = g * w),
        (h.style.width = `${f}px`),
        (h.style.height = `${g}px`))
      const C = h.getContext('2d')
      ;(C && C.scale(w, w), (b.current = k(f, g)))
    }, [o, k])
  return (
    E.useEffect(() => {
      if (e === 'none') return
      const h = window.matchMedia('(prefers-reduced-motion: reduce)')
      p.current = h.matches
      const x = (f) => {
        ;((p.current = f.matches),
          f.matches ? cancelAnimationFrame(c.current) : z())
      }
      return (
        h.addEventListener('change', x),
        m.current &&
          (R(), window.addEventListener('resize', R), p.current || z()),
        () => {
          ;(cancelAnimationFrame(c.current),
            window.removeEventListener('resize', R),
            h.removeEventListener('change', x))
        }
      )
    }, [z, R, e]),
    e === 'none'
      ? null
      : ge.jsx('div', {
          ref: a,
          className: 'absolute inset-0 overflow-hidden',
          style: { height: `${o}px` },
          children: ge.jsx('canvas', {
            ref: m,
            className: Io('absolute inset-0 pointer-events-none', i),
            style: {
              maskImage: `linear-gradient(to bottom, 
            rgba(0, 0, 0, 1) 0%, 
            rgba(0, 0, 0, 1) 50%, 
            rgba(0, 0, 0, 0.4) 75%, 
            transparent 100%
          )`,
              WebkitMaskImage: `linear-gradient(to bottom, 
            rgba(0, 0, 0, 1) 0%, 
            rgba(0, 0, 0, 1) 50%, 
            rgba(0, 0, 0, 0.4) 75%, 
            transparent 100%
          )`,
            },
            'aria-hidden': 'true',
          }),
        })
  )
}
export { jo as PixelBackground }
