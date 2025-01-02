"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Upload, Trash2, FileSpreadsheet, ArrowUpDown } from 'lucide-react'
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ProviderRate {
  id: string
  tipoProveedor: string
  tipoContrato: string
  categoria: string
  actividad: string
  region: string
  unidadTarifa: string
  rangoMinimo: number
  rangoMaximo: number
  fechaInicio: string
  fechaFin: string
  costo: number
  usuarioModificacion: string
  fechaModificacion: string
}

// Generate mock data
const mockData: ProviderRate[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  tipoProveedor: "Guía land",
  tipoContrato: "Relación de dependencia",
  categoria: "A+",
  actividad: ["Legoland", "Land"][Math.floor(Math.random() * 2)],
  region: ["Quito and Surroundings", "Northern Highlands", "Central Highlands"][Math.floor(Math.random() * 3)],
  unidadTarifa: "Horas",
  rangoMinimo: [1, 10, 26][Math.floor(Math.random() * 3)],
  rangoMaximo: [9, 25, 999][Math.floor(Math.random() * 3)],
  fechaInicio: "01/06/2024",
  fechaFin: "31/05/2025",
  costo: [8.45, 9.55, 10.15][Math.floor(Math.random() * 3)],
  usuarioModificacion: "jandrade@metropolitan-touring.com",
  fechaModificacion: "10/06/2024 04:43"
}))

type SortConfig = {
  key: keyof ProviderRate
  direction: 'asc' | 'desc'
}

export function ProviderRatesTable() {
  const [selectedRates, setSelectedRates] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'asc' })
  const itemsPerPage = 15
  const totalPages = Math.ceil(mockData.length / itemsPerPage)

  const handleSort = (key: keyof ProviderRate) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const sortedData = [...mockData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="default" className="bg-[#002856] hover:bg-[#001f42]">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo
          </Button>
          <Button variant="secondary">
            <Upload className="h-4 w-4 mr-2" />
            Carga masiva
          </Button>
          <Button 
            variant="destructive" 
            disabled={selectedRates.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exportar a excel
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={selectedRates.length === currentData.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRates(currentData.map(rate => rate.id))
                    } else {
                      setSelectedRates([])
                    }
                  }}
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Tipo de proveedor</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('tipoProveedor')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Tipo de contrato</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('tipoContrato')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Categoría</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('categoria')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Actividad</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('actividad')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Región</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('region')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Unidad tarifa</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('unidadTarifa')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Rango mínimo</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('rangoMinimo')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Rango máximo</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('rangoMaximo')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Fecha inicio</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('fechaInicio')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Fecha fin</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('fechaFin')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Costo</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('costo')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Usuario modificación</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('usuarioModificacion')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Fecha modificación</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('fechaModificacion')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedRates.includes(rate.id)}
                    onChange={() => {
                      setSelectedRates(prev =>
                        prev.includes(rate.id)
                          ? prev.filter(id => id !== rate.id)
                          : [...prev, rate.id]
                      )
                    }}
                  />
                </TableCell>
                <TableCell>{rate.tipoProveedor}</TableCell>
                <TableCell>{rate.tipoContrato}</TableCell>
                <TableCell>{rate.categoria}</TableCell>
                <TableCell>{rate.actividad}</TableCell>
                <TableCell>{rate.region}</TableCell>
                <TableCell>{rate.unidadTarifa}</TableCell>
                <TableCell>{rate.rangoMinimo}</TableCell>
                <TableCell>{rate.rangoMaximo}</TableCell>
                <TableCell>{rate.fechaInicio}</TableCell>
                <TableCell>{rate.fechaFin}</TableCell>
                <TableCell>${rate.costo.toFixed(2)}</TableCell>
                <TableCell>{rate.usuarioModificacion}</TableCell>
                <TableCell>{rate.fechaModificacion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

