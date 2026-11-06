'use client'
import DashboardLockers from '../components/DashboardLockers'
import ModuloMantenimiento from '../components/ModuloMantenimiento'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto space-y-10 px-4">
        <DashboardLockers />
        <ModuloMantenimiento />
      </div>
    </main>
  )
}
