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
import { Plus, Edit, Trash2, ArrowUpDown } from 'lucide-react'
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Flight {
  id: string
  flightNumber: string
  type: 'Nacional' | 'Internacional'
  departureLocation: string
  arrivalLocation: string
  departureTime: string
  arrivalTime: string
  operationDay: string
  active: boolean
  lastModified: string
  lastModifiedBy: string
}

// Generate mock data based on the image
const mockData: Flight[] = [
  {
    id: "1",
    flightNumber: "AV1639",
    type: "Nacional",
    departureLocation: "Baltra",
    arrivalLocation: "Guayaquil",
    departureTime: "13:52",
    arrivalTime: "16:44",
    operationDay: "LMMJVSD",
    active: true,
    lastModified: "19/07/2024 04:21 p. m.",
    lastModifiedBy: "jandrade@metropolitan-touring.com"
  },
  {
    id: "2",
    flightNumber: "AV1630",
    type: "Nacional",
    departureLocation: "Guayaquil",
    arrivalLocation: "San Cristobal",
    departureTime: "11:00",
    arrivalTime: "11:48",
    operationDay: "LMMJVSD",
    active: true,
    lastModified: "24/07/2024 12:51 p. m.",
    lastModifiedBy: "brecalde@metropolitan-touring.com"
  },
  // Add more mock data following the pattern
]

type SortConfig = {
  key: keyof Flight
  direction: 'asc' | 'desc'
}

export function FlightsTable() {
  const [selectedFlights, setSelectedFlights] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'flightNumber', direction: 'asc' })
  const itemsPerPage = 15
  const totalPages = Math.ceil(mockData.length / itemsPerPage)

  const handleSort = (key: keyof Flight) => {
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
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button 
            variant="destructive" 
            disabled={selectedFlights.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
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
                  checked={selectedFlights.length === currentData.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFlights(currentData.map(flight => flight.id))
                    } else {
                      setSelectedFlights([])
                    }
                  }}
                />
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Número de vuelo</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('flightNumber')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Tipo</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('type')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Lugar de salida</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('departureLocation')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Lugar de llegada</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('arrivalLocation')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Hora de salida</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('departureTime')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Hora de llegada</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('arrivalTime')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Día de operación</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('operationDay')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Activo</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('active')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Fecha última modificación</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('lastModified')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  <span>Usuario última modificación</span>
                  <Button variant="ghost" size="sm" onClick={() => handleSort('lastModifiedBy')}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedFlights.includes(flight.id)}
                    onChange={() => {
                      setSelectedFlights(prev =>
                        prev.includes(flight.id)
                          ? prev.filter(id => id !== flight.id)
                          : [...prev, flight.id]
                      )
                    }}
                  />
                </TableCell>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.type}</TableCell>
                <TableCell>{flight.departureLocation}</TableCell>
                <TableCell>{flight.arrivalLocation}</TableCell>
                <TableCell>{flight.departureTime}</TableCell>
                <TableCell>{flight.arrivalTime}</TableCell>
                <TableCell>{flight.operationDay}</TableCell>
                <TableCell>{flight.active ? 'Si' : 'No'}</TableCell>
                <TableCell>{flight.lastModified}</TableCell>
                <TableCell>{flight.lastModifiedBy}</TableCell>
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

