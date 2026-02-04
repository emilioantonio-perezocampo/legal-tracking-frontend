import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar, Clock, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    { title: "Expedientes Activos", value: "24", icon: Briefcase, color: "text-blue-600" },
    { title: "Audiencias esta semana", value: "3", icon: Calendar, color: "text-green-600" },
    { title: "Tareas pendientes", value: "12", icon: Clock, color: "text-orange-600" },
    { title: "Alertas urgentes", value: "2", icon: AlertCircle, color: "text-red-600" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido de nuevo a LegalTracking.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              No hay actividad reciente para mostrar.
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-sm text-muted-foreground">
              No hay eventos próximos.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
