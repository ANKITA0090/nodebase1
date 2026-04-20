"use client"

import { useState } from "react"

let globalOpen = false
let globalSetOpen: ((open: boolean) => void) | null = null

export function useUpgradeModal() {
  const [open, setOpen] = useState(globalOpen)

  const setOpenAndSync = (value: boolean) => {
    globalOpen = value
    setOpen(value)
    if (globalSetOpen && globalSetOpen !== setOpenAndSync) {
      globalSetOpen(value)
    }
  }

  globalSetOpen = setOpenAndSync

  return {
    open,
    setOpen: setOpenAndSync,
    openModal: () => setOpenAndSync(true),
    closeModal: () => setOpenAndSync(false),
  }
}
