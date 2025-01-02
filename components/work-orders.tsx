import { Car, Train } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const workOrders = [
  { name: "Por procesar LAND", value: "0", icon: Car },
  { name: "Por procesar GPS", value: "0", icon: Train },
]

export function WorkOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-[#002856]">
          Órdenes de Trabajo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {workOrders.map((order) => (
            <div
              key={order.name}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <order.icon className="h-6 w-6 text-[#00acd8]" />
                <p className="text-sm font-medium text-gray-500">{order.name}</p>
              </div>
              <p className="text-xl font-bold text-[#002856]">{order.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

