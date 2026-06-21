export type Dict = {
  gate: {
    eyebrow: string
    enterCode: string
    codeHelp: string
    unlock: string
    invalidCode: string
    networkError: string
    wrongLink: string
    backHome: string
  }
  relock: {
    title: string
    body: string
    cta: string
  }
  form: {
    eyebrow: string
    submit: string
    optional: string
    requiredMark: string
    fileLinks: {
      placeholder: string
      add: string
      remove: string
    }
    selectPlaceholder: string
  }
  thanks: {
    title: string
    body: string
    backHome: string
  }
  notFound: {
    title: string
    body: string
    backHome: string
  }
  validation: {
    required: string
    invalidUrl: string
    invalidEmail: string
    selectAtLeastOne: string
    addAtLeastOneLink: string
  }
}

export const en: Dict = {
  gate: {
    eyebrow: "Brief for",
    enterCode: "Enter your 6-digit access code",
    codeHelp: "You received this code via WhatsApp or email.",
    unlock: "Unlock",
    invalidCode: "Invalid code",
    networkError: "Network error. Try again.",
    wrongLink: "Wrong link?",
    backHome: "Back to luisgomez.dev",
  },
  relock: {
    title: "Session expired",
    body: "Re-enter the 6-digit access code to submit. Your answers are still here.",
    cta: "Unlock and submit",
  },
  form: {
    eyebrow: "Brief for",
    submit: "Submit brief",
    optional: "(optional)",
    requiredMark: "*",
    fileLinks: {
      placeholder: "https://drive.google.com/...",
      add: "Add",
      remove: "remove",
    },
    selectPlaceholder: "Select an option",
  },
  thanks: {
    title: "Got it.",
    body: "Your brief landed. I'll review it and get back to you soon.",
    backHome: "Back to luisgomez.dev",
  },
  notFound: {
    title: "Brief not found",
    body: "This link is invalid or the brief was removed.",
    backHome: "Back to luisgomez.dev",
  },
  validation: {
    required: "Required field",
    invalidUrl: "Invalid URL",
    invalidEmail: "Invalid email",
    selectAtLeastOne: "Select at least one",
    addAtLeastOneLink: "Add at least one link",
  },
}
