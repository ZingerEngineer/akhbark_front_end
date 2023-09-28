import { useState, useEffect } from 'react'
export function useLocalStorage(key_name: string) {
  const [key, setKey] = useState<string | null>(null)
  const [keysArray, setKeysArray] = useState<string[] | null>(null)

  useEffect(() => {
    function getKey() {
      if (!key_name) return 'key is not specified.'
      setKey(localStorage.getItem(key_name))
    }

    function getAllKeys() {
      let keysArrayTemp = []
      for (let key in localStorage) {
        if (typeof localStorage[key] !== 'function' && key !== 'length')
          keysArrayTemp.push(localStorage[key])
      }
      setKeysArray(keysArrayTemp)
    }
    window.addEventListener('load', getKey)
    window.addEventListener('storage', getKey)
    window.addEventListener('load', getAllKeys)
    window.addEventListener('storage', getAllKeys)

    return () => {
      window.removeEventListener('load', getKey)
      window.removeEventListener('storage', getKey)
      window.removeEventListener('load', getAllKeys)
      window.removeEventListener('storage', getAllKeys)
    }
  })
  return { key, keysArray }
}
