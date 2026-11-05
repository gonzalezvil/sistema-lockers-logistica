[20:46, 5/11/2026] Guada Balbuena: # Sistema de Gestión de Lockers Logísticos

Aplicación web para la gestión integral y monitoreo operativo de una red de lockers inteligentes automatizados para entrega y retiro de encomiendas.

## 🚀 Funciones Logísticas Cubiertas
1. *Control de Disponibilidad y Capacidad por Punto:* Monitoreo en tiempo real del estado de casilleros (libre, ocupado, fuera de servicio) y cumplimiento de la capacidad máxima declarada.
2. *Planificación y Registro de Mantenimiento:* Registro de tareas preventivas y correctivas asociadas a cada punto de retiro y operario técnico.
3. *Gestión de Movimientos y Traslados:* Control de envíos, origen, destino y trazabilidad del retiro de encomiendas.

## 🛠️ Tecnologías Utilizadas
- *Frontend:* Next.js (React) + Tailwind CSS
- *Base de Datos:* …
[20:50, 5/11/2026] Guada Balbuena: # Configuración de conexión pública para Next.js / Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase_aqui
[20:55, 5/11/2026] Guada Balbuena: import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las credenciales de Supabase en las variables de entorno.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
[20:57, 5/11/2026] Guada Balbuena: import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function DashboardLockers() {
  const [puntos, setPuntos] = useState([])
  const [compartimentos, setCompartimentos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLogisticsData() {
      setLoading(true)
      
      const { data: puntosData } = await supabase.from('punto_retiro').select('*')
      const { data: compData } = await supabase.from('compartimento').select('*')

      setPuntos(puntosData || [])
      setCompartimentos(compData || [])
      setLoading(false)
    }

    fetchLogisticsData()
  }, [])

  if (loading) {
    return <div className="p-6 text-center text-slate-600">Cargando red de lockers y estados logísticos...</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Red de Lockers Logísticos - Panel de Control</h1>
        <p className="text-slate-600 mt-1">Gestión de disponibilidad, puntos de retiro y control de casilleros inteligentes.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-500 uppercase">Puntos de Retiro Activos</h2>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">{puntos.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-semibold text-slate-500 uppercase">Total de Compartimentos en Red</h2>
          <p className="text-4xl font-extrabold text-emerald-600 mt-2">{compartimentos.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Capacidad de Puntos de Retiro</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase">
              <th className="py-3 px-4">Código</th>
              <th className="py-3 px-4">Dirección</th>
              <th className="py-3 px-4">Capacidad Máxima</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {puntos.map((p) => (
              <tr key={p.codigo}>
                <td className="py-3 px-4 font-medium text-slate-900">{p.codigo}</td>
                <td className="py-3 px-4">{p.direccion}</td>
                <td className="py-3 px-4">{p.capacidad_maxima} casilleros</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
