import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { Section } from "@/lib/brief-schemas/template"

type Props = {
  sections: Section[]
  /** id prefix used in the form (matches `section-${section.id}`). */
  idPrefix?: string
}

/**
 * Sidebar with the list of sections. Click → smooth scroll to anchor.
 * Highlights the section currently in view using IntersectionObserver.
 *
 * Hidden on mobile (form scrolls linearly there). Sticky on lg+ screens.
 */
export function BriefSectionNav({ sections, idPrefix = "section-" }: Props) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const targets = sections
      .map((s) => document.getElementById(idPrefix + s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost entry that is currently intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const id = visible[0].target.id.replace(idPrefix, "")
          setActiveId(id)
        }
      },
      {
        // Trigger near the top quarter of the viewport.
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [sections, idPrefix])

  function onClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(idPrefix + id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    // Set immediately for snappy feedback; observer will sync later.
    setActiveId(id)
    // Update the URL hash without triggering a jump.
    history.replaceState(null, "", `#${idPrefix}${id}`)
  }

  return (
    <nav aria-label="Secciones del brief" className="flex flex-col gap-1">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2">
        Secciones
      </p>
      <ol className="flex flex-col gap-px">
        {sections.map((s, idx) => {
          const isActive = s.id === activeId
          return (
            <li key={s.id}>
              <a
                href={`#${idPrefix}${s.id}`}
                onClick={(e) => onClick(e, s.id)}
                className={cn(
                  "block py-1.5 pl-3 pr-2 border-l-2 transition-colors",
                  "font-mono text-sm",
                  isActive
                    ? "border-accent text-primary"
                    : "border-border text-muted hover:text-secondary hover:border-muted",
                )}
              >
                <span className="text-muted mr-2 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {s.title}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
