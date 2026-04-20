"use client"

import { useEffect, useState } from "react"

export function useEntitySearch(
  value: string,
  onChange: (value: string) => void,
  delay = 300
) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [inputValue, delay, onChange, value])

  return { inputValue, setInputValue }
}
