import { useState, useEffect } from 'react'
export function useLocalStorage(key_name: string) {
  const [key, setKey] = useState<string | null>(null)

  useEffect(() => {
    function getKey() {
      if (!key_name) return
      setKey(localStorage.getItem(key_name))
    }
    window.addEventListener('load', getKey)
    window.addEventListener('storage', getKey)

    return () => {
      window.removeEventListener('load', getKey)
      window.removeEventListener('storage', getKey)
    }
  })
  return { key }
}
