export interface User {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'lawyer' | 'assistant'
}

export interface Expediente {
  id: string
  numero: string
  titulo: string
  cliente: string
  estado: 'Abierto' | 'Cerrado' | 'En Pausa'
  fechaInicio: string
  descripcion?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
