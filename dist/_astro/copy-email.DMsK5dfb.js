import { j as e } from './jsx-runtime.u17CrQMm.js'
import { r as i } from './index.B02hbnpo.js'
const l = { author: { email: 'hello@luisgomez.dev' } }
function p({ className: a = '' }) {
  const [s, t] = i.useState(!1),
    o = l.author.email,
    n = i.useCallback(async () => {
      try {
        ;(await navigator.clipboard.writeText(o),
          t(!0),
          setTimeout(() => t(!1), 2e3))
      } catch {
        const r = document.createElement('textarea')
        ;((r.value = o),
          document.body.appendChild(r),
          r.select(),
          document.execCommand('copy'),
          document.body.removeChild(r),
          t(!0),
          setTimeout(() => t(!1), 2e3))
      }
    }, [o])
  return e.jsxs('button', {
    onClick: n,
    className: `group relative font-mono text-lg flex items-center gap-2 hover:text-secondary transition-colors ${a}`,
    'aria-label': s ? 'Email copied' : 'Copy email',
    children: [
      e.jsx('span', { children: o }),
      e.jsx('span', {
        className: 'opacity-50 group-hover:opacity-100 transition-opacity',
        children: s
          ? e.jsx('svg', {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '18',
              height: '18',
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              children: e.jsx('polyline', { points: '20 6 9 17 4 12' }),
            })
          : e.jsxs('svg', {
              xmlns: 'http://www.w3.org/2000/svg',
              width: '18',
              height: '18',
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              children: [
                e.jsx('rect', {
                  width: '14',
                  height: '14',
                  x: '8',
                  y: '8',
                  rx: '2',
                  ry: '2',
                }),
                e.jsx('path', {
                  d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2',
                }),
              ],
            }),
      }),
      s &&
        e.jsx('span', {
          className:
            'absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-muted bg-surface px-2 py-1',
          children: 'Copied!',
        }),
    ],
  })
}
export { p as CopyEmail }
