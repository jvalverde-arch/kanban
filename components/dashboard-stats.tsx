import { Building2, Utensils, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useMemo } from 'react'

const generateRandomStats = () => [
  {
    name: "Bookings",
    stats: [
      { name: "Abiertos", value: Math.floor(Math.random() * 100).toString() },
      { name: "Operando", value: Math.floor(Math.random() * 50).toString() },
    ],
  },
  {
    name: "Reservas",
    stats: [
      {
        name: "Pendientes por procesar Hoteles",
        value: Math.floor(Math.random() * 200).toString(),
        icon: Building2,
      },
      {
        name: "Pendientes por procesar Alimentos",
        value: Math.floor(Math.random() * 150).toString(),
        icon: Utensils,
      },
    ],
  },
]

export function DashboardStats() {
  const stats = useMemo(() => generateRandomStats(), [])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stats.map((section, index) => (
        <motion.div
          key={section.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card key={section.name}>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-[#002856]">
                {section.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {section.stats.map((stat) => (
                  <div
                    key={stat.name}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      {stat.icon && (
                        <stat.icon className="h-6 w-6 text-[#00acd8]" />
                      )}
                      <p className="text-sm font-medium text-gray-500">
                        {stat.name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-xl font-bold text-[#002856]">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

