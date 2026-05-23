'use client'

import { useState } from 'react'

export function GlucoseLogger({
  createGlucoseLog,
}: {
  createGlucoseLog: (valor: number, type: string) => Promise<void>
}) {
  const [valor, setValor] = useState<number | ''>('')
  const [type, setType] = useState<string>('Pre')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof valor === 'number') {
      await createGlucoseLog(valor, type)
      setValor('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-forge-black border-2 border-shield-gray rounded-none p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="glucemia" className="text-saga-cream">Glucemia</label>
        <input
          id="glucemia"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value === '' ? '' : Number(e.target.value))}
          className="bg-forge-black border-2 border-shield-gray text-saga-cream rounded-none p-2"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="tipo" className="text-saga-cream">Tipo</label>
        <select
          id="tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-forge-black border-2 border-shield-gray text-saga-cream rounded-none p-2"
        >
          <option value="Pre">Pre</option>
          <option value="Post">Post</option>
        </select>
      </div>
      <button type="submit" className="bg-viking-red font-space text-saga-cream rounded-none p-2 mt-2">
        Registrar
      </button>
    </form>
  )
}
