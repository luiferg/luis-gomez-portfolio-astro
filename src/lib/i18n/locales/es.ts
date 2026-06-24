import type { Dict } from "./en"

// Mirror the English shape so TS catches drift between locales.
export const es: Dict = {
  gate: {
    eyebrow: "Brief para",
    enterCode: "Ingresa tu c\u00f3digo de acceso de 6 d\u00edgitos",
    codeHelp: "Recibiste este c\u00f3digo por WhatsApp o correo.",
    unlock: "Desbloquear",
    invalidCode: "C\u00f3digo inv\u00e1lido",
    networkError: "Error de red. Int\u00e9ntalo de nuevo.",
    wrongLink: "\u00bfEnlace incorrecto?",
    backHome: "Volver a luisgomez.dev",
  },
  relock: {
    title: "La sesi\u00f3n expir\u00f3",
    body: "Vuelve a ingresar el c\u00f3digo de 6 d\u00edgitos para enviar. Tus respuestas siguen aqu\u00ed.",
    cta: "Desbloquear y enviar",
  },
  form: {
    eyebrow: "Brief para",
    submit: "Enviar brief",
    optional: "(opcional)",
    requiredMark: "*",
    fileLinks: {
      placeholder: "https://drive.google.com/...",
      add: "Agregar",
      remove: "quitar",
    },
    selectPlaceholder: "Selecciona una opci\u00f3n",
    jumpToSection: "Ir a una secci\u00f3n",
    sectionsHeader: "Secciones",
  },
  thanks: {
    title: "Recibido.",
    body: "Tu brief lleg\u00f3. Lo revisar\u00e9 y te respondo pronto.",
    backHome: "Volver a luisgomez.dev",
  },
  notFound: {
    title: "Brief no encontrado",
    body: "Este enlace no es v\u00e1lido o el brief fue eliminado.",
    backHome: "Volver a luisgomez.dev",
  },
  validation: {
    required: "Campo obligatorio",
    invalidUrl: "URL inv\u00e1lida",
    invalidEmail: "Correo inv\u00e1lido",
    selectAtLeastOne: "Selecciona al menos uno",
    addAtLeastOneLink: "Agrega al menos un enlace",
  },
}
