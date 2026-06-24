import { useId } from "react"
import { NativeSelect } from "@/components/ui/native-select"
import type { Section } from "@/lib/brief-schemas/template"

type Props = {
  sections: Section[]
  idPrefix?: string
  label: string
}

/**
 * Mobile section jumper. Native select for max compatibility — opens the
 * platform picker on iOS/Android. Hidden on lg+ (sidebar takes over there).
 */
export function BriefSectionJump({
  sections,
  idPrefix = "section-",
  label,
}: Props) {
  const id = useId()

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const target = e.target.value
    if (!target) return
    const el = document.getElementById(idPrefix + target)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    history.replaceState(null, "", `#${idPrefix}${target}`)
    // Reset the select so the same section can be re-selected to scroll again.
    e.target.value = ""
  }

  return (
    <div className="lg:hidden flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-xs uppercase text-muted">
        {label}
      </label>
      <NativeSelect id={id} value="" onChange={onChange}>
        <option value="" disabled>
          —
        </option>
        {sections.map((s, idx) => (
          <option key={s.id} value={s.id}>
            {String(idx + 1).padStart(2, "0")}. {s.title}
          </option>
        ))}
      </NativeSelect>
    </div>
  )
}
