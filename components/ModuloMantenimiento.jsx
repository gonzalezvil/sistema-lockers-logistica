import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ModuloMantenimiento() {
  const [codigoPunto, setCodigoPunto] = useState('')
  const [legajoOperario, setLegajoOperario] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [mensaje, setMensaje] = useState(null)

  const registrarTarea = async (e) => {
    e.preventDefault()
    setMensaje(null)

    const { error } = await supabase.from('tarea').insert([
      {
        codigo_punto: codigoPunto,
        legajo_operario: legajoOperario,
        fecha: new Date().toISOString(),
        descripcion: descripcion
      }
    ])

    if (error) {
      setMensaje({ tipo: 'error', texto: 'Error al registrar tarea: ' + error.message })
    } else {
      setMensaje({ tipo: 'exito', texto: 'Tarea de mantenimiento registrada con éxito.' })
      setCodigoPunto('')
      setLegajoOperario('')
      setDescripcion('')
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 mt-8">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Registro de Mantenimiento de Lockers</h2>
      
      {mensaje && (
        <div className={p-4 mb-4 rounded-lg text-sm ${mensaje.tipo === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={registrarTarea} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Código del Punto de Retiro</label>
          <input
            type="text"
            value={codigoPunto}
            onChange={(e) => setCodigoPunto(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            placeholder="Ej. PTO-01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Legajo Operario</label>
          <input
            type="text"
            value={legajoOperario}
            onChange={(e) => setLegajoOperario(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            placeholder="Ej. OP-102"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Descripción de la Tarea</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            rows="3"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            placeholder="Detalles del mantenimiento realizado..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar Tarea
        </button>
      </form>
    </div>
  )
}
