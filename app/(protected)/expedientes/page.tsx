'use client'

import { ColumnDef } from "@tanstack/react-table"
import { ExpedientesTable } from "@/components/tables/expedientes-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, MoreHorizontal } from "lucide-react"

type Expediente = {
  id: string
  numero: string
  titulo: string
  cliente: string
  estado: "Abierto" | "Cerrado" | "En Pausa"
  fechaInicio: string
}

const columns: ColumnDef<Expediente>[] = [
  {
    accessorKey: "numero",
    header: "Número",
  },
  {
    accessorKey: "titulo",
    header: "Título",
    cell: ({ row }) => {
      return (
        <Link 
          href={`/expedientes/${row.original.id}`}
          className="font-medium text-primary hover:underline"
        >
          {row.getValue("titulo")}
        </Link>
      )
    }
  },
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("estado") as string
      return (
        <Badge variant={status === "Abierto" ? "default" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "fechaInicio",
    header: "Fecha de Inicio",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )
    },
  },
]

const data: Expediente[] = [
  {
    id: "1",
    numero: "EXP-2024-001",
    titulo: "Litigio Civil - Garcia vs Martinez",
    cliente: "Juan Garcia",
    estado: "Abierto",
    fechaInicio: "2024-01-15",
  },
  {
    id: "2",
    numero: "EXP-2024-002",
    titulo: "Contrato Arrendamiento Corporativo",
    cliente: "Acme Corp",
    estado: "Abierto",
    fechaInicio: "2024-01-20",
  },
  {
    id: "3",
    numero: "EXP-2023-150",
    titulo: "Divorcio Necesario - Perez",
    cliente: "Maria Perez",
    estado: "Cerrado",
    fechaInicio: "2023-11-05",
  },
]

export default function ExpedientesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expedientes</h1>
          <p className="text-muted-foreground">Gestiona y consulta todos tus casos legales.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Expediente
        </Button>
      </div>

      <ExpedientesTable columns={columns} data={data} />
    </div>
  )
}
