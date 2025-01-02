import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface DashboardHeaderProps {
  lastLogin: string
  userRole: string
}

export function DashboardHeader({ lastLogin, userRole }: DashboardHeaderProps) {
  const today = new Date()
  const formattedDate = today.toLocaleDateString("es", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })

  const copyEmail = () => {
    navigator.clipboard.writeText("dpulloquinga@metropolitan-touring.com")
    toast({
      description: "Email copiado al portapapeles",
    })
  }

  return (
    <Card className="bg-white shadow">
      <CardContent className="p-6">
        <div className="mb-4 flex justify-end">
          <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Ecuador
          </span>
        </div>
        <div className="md:flex md:items-center md:justify-between mt-2">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-[#002856] sm:truncate sm:text-3xl sm:tracking-tight">
              ¡Bienvenido!
            </h2>
            <div className="mt-1 flex items-center">
              <p className="text-sm text-gray-600">dpulloquinga@metropolitan-touring.com</p>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={copyEmail}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copiar email</span>
              </Button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Fecha actual: {formattedDate}
            </p>
            
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <div className="text-sm text-gray-500">
              <p>Último inicio de sesión: {lastLogin}</p>
              <p>Rol: {userRole}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

