import { useState } from "react"
import { Input } from "./field"
import { Button } from "./button"
import { cn } from "@/lib/utils"

type Props = {
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  ariaInvalid?: boolean
  /** Localized labels. Default to English. */
  addLabel?: string
  removeLabel?: string
}

/**
 * Editable list of URL strings. Used for the `file_links` question type:
 * the client pastes one or more Drive/WeTransfer URLs.
 */
export function FileLinks({
  value,
  onChange,
  placeholder,
  ariaInvalid,
  addLabel = "Add",
  removeLabel = "remove",
}: Props) {
  const [draft, setDraft] = useState("")

  function add() {
    const trimmed = draft.trim()
    if (!trimmed) return
    onChange([...value, trimmed])
    setDraft("")
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx))
  }

  return (
    <div className={cn("flex flex-col gap-2")}>
      {value.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {value.map((url, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 border border-border bg-surface px-3 py-2"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate font-mono text-sm text-primary hover:text-secondary"
              >
                {url}
              </a>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="font-mono text-xs text-muted hover:text-primary px-2"
                aria-label={`${removeLabel} ${idx + 1}`}
              >
                {removeLabel}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex gap-2">
        <Input
          type="url"
          inputMode="url"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              add()
            }
          }}
          placeholder={placeholder ?? "https://drive.google.com/..."}
          aria-invalid={ariaInvalid || undefined}
        />
        <Button type="button" variant="ghost" onClick={add} disabled={!draft.trim()}>
          {addLabel}
        </Button>
      </div>
    </div>
  )
}
