import { GlucoseLogger } from '../../components/GlucoseLogger';

export default function GlucosePage() {
  async function createGlucoseLog(valor: number, type: string) {
    'use server'
  }

  return (
    <main className="min-h-screen bg-forge-black p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-saga-cream text-2xl font-bold mb-6 text-center">Registro de Glucemia</h1>
        <GlucoseLogger createGlucoseLog={createGlucoseLog} />
      </div>
    </main>
  )
}
