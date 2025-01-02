"use client"

import { useState, useMemo } from "react"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, ArrowUpDown, Search } from 'lucide-react'
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState as useState2 } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface Provider {
  id: string
  naturaleza: string
  especialidad: string
  contrato: string
  categoria: string
  acronimo: string
  razonSocial: string
  nombreComercial: string
  representanteLegal: string
  nombre: string
  apellido: string
  nombreCompleto: string
  identificacion: string
  tipoIdentificacion: string
}

// Generate 100 mock data entries
const mockData: Provider[] = Array.from({ length: 100 }, (_, i) => ({
  id: `${i + 1}`,
  naturaleza: ["PMTS", "PMTL", "PMTG"][Math.floor(Math.random() * 3)],
  especialidad: ["Hotel", "Transporte", "Guía"][Math.floor(Math.random() * 3)],
  contrato: ["Estandar", "Premium", "VIP"][Math.floor(Math.random() * 3)],
  categoria: ["3 estrellas", "4 estrellas", "5 estrellas"][Math.floor(Math.random() * 3)],
  acronimo: `PRV${i + 1}`,
  razonSocial: `Proveedor ${i + 1} S.A.`,
  nombreComercial: `Proveedor ${i + 1}`,
  representanteLegal: `Representante ${i + 1}`,
  nombre: `Nombre${i + 1}`,
  apellido: `Apellido${i + 1}`,
  nombreCompleto: `Nombre${i + 1} Apellido${i + 1}`,
  identificacion: `ID${i + 1}`,
  tipoIdentificacion: ["RUC", "Cédula", "Pasaporte"][Math.floor(Math.random() * 3)]
}))

type SortConfig = {
  key: keyof Provider
  direction: 'asc' | 'desc'
}

export function ProvidersTable() {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', direction: 'asc' })
  const [filters, setFilters] = useState<Partial<Provider>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleProvider = (providerId: string) => {
    setSelectedProviders(prev =>
      prev.includes(providerId)
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    )
  }

  const handleDeleteSelected = () => {
    // Implement delete functionality
    console.log("Deleting providers:", selectedProviders)
  }

  const handleSort = (key: keyof Provider) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleFilter = (key: keyof Provider, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }))
    setCurrentPage(1)
  }

  const filteredAndSortedData = useMemo(() => {
    return mockData
      .filter(provider => 
        Object.entries(filters).every(([key, value]) => 
          provider[key as keyof Provider].toLowerCase().includes(value.toLowerCase())
        )
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
  }, [mockData, filters, sortConfig])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-[#002856] hover:bg-[#001f42]">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <MultiStepForm onClose={() => setIsModalOpen(false)} />
            </DialogContent>
          </Dialog>
          <Button 
            variant="destructive" 
            disabled={selectedProviders.length === 0}
            onClick={handleDeleteSelected}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Buscar..."
            className="w-64"
            onChange={(e) => handleFilter('nombreCompleto', e.target.value)}
          />
          <Select 
            value={itemsPerPage.toString()} 
            onValueChange={(value) => {
              setItemsPerPage(Number(value))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Registros por página" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 por página</SelectItem>
              <SelectItem value="20">20 por página</SelectItem>
              <SelectItem value="50">50 por página</SelectItem>
              <SelectItem value="100">100 por página</SelectItem>
            </SelectContent>
          </Select>
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
                  checked={selectedProviders.length === paginatedData.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProviders(paginatedData.map(p => p.id))
                    } else {
                      setSelectedProviders([])
                    }
                  }}
                />
              </TableHead>
              {(Object.keys(mockData[0]) as Array<keyof Provider>).map((key) => (
                <TableHead key={key}>
                  <div className="flex items-center justify-between">
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSort(key)}>
                          Sort {sortConfig.key === key && sortConfig.direction === 'asc' ? 'Descending' : 'Ascending'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Input
                            placeholder={`Filter ${key}`}
                            onChange={(e) => handleFilter(key, e.target.value)}
                            className="w-full"
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedProviders.includes(provider.id)}
                    onChange={() => toggleProvider(provider.id)}
                  />
                </TableCell>
                {(Object.keys(provider) as Array<keyof Provider>).map((key) => (
                  <TableCell key={key}>{provider[key]}</TableCell>
                ))}
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

function MultiStepForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Nuevo Proveedor</h2>
        <p className="text-sm text-gray-500">Paso {step} de {totalSteps}</p>
      </div>
      {step === 1 && (
        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Naturaleza de Proveedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="experiencia">Experiencia</SelectItem>
              <SelectItem value="experiencia-gps">Experiencia GPS</SelectItem>
              <SelectItem value="pmts">PMTS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <Input placeholder="Razón Social" />
          <Input placeholder="Nombre Comercial" />
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <Input placeholder="Representante Legal" />
          <Input placeholder="Identificación" />
        </div>
      )}
      {step === 4 && (
        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-estrellas">3 Estrellas</SelectItem>
              <SelectItem value="4-estrellas">4 Estrellas</SelectItem>
              <SelectItem value="5-estrellas">5 Estrellas</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Especialidad" />
        </div>
      )}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(prev => Math.max(prev - 1, 1))}
          disabled={step === 1}
        >
          Anterior
        </Button>
        <Button
          onClick={() => {
            if (step < totalSteps) {
              setStep(prev => prev + 1)
            } else {
              // Handle form submission here
              console.log('Form submitted')
              onClose()
            }
          }}
        >
          {step < totalSteps ? 'Siguiente' : 'Guardar'}
        </Button>
      </div>
    </div>
  )
}

