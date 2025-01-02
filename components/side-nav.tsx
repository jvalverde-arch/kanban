"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, ChevronRight, ChevronDown, ChevronLeft, Bell, User, Maximize, Minimize, BookOpen, Anchor, Lock, BookMarked, Cog, CalendarCheck, ClipboardList, BarChart3, AlertCircle, Info, AlertTriangle, ChevronUp } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface SideNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type NotificationType = 'info' | 'warning' | 'error';

interface Notification {
  id: number;
  message: string;
  read: boolean;
  createdAt: Date;
  type: NotificationType;
}

const navigation = [
  { 
    name: "Administración catálogos", 
    href: "#", 
    icon: BookOpen,
    subItems: [
      { name: "Proveedores", href: "/catalogos/proveedores" },
      { name: "Tarifas de proveedores", href: "/catalogos/tarifas-proveedores" },
      { name: "Administración de vuelos", href: "/catalogos/administracion-vuelos" },
      { name: "Embarcaciones", href: "#" },
      { name: "Catálogos", href: "#" },
    ]
  },
  { 
    name: "Embarcaciones", 
    href: "#", 
    icon: Anchor,
    subItems: [
      { name: "Programación", href: "#" },
      { name: "Mantenimiento", href: "#" },
    ]
  },
  { 
    name: "Bloqueos", 
    href: "#", 
    icon: Lock,
    subItems: [
      { name: "Crear Bloqueo", href: "#" },
      { name: "Gestionar Bloqueos", href: "#" },
    ]
  },
  { 
    name: "Booking", 
    href: "#", 
    icon: BookMarked,
    subItems: [
      { name: "Nuevo Booking", href: "#" },
      { name: "Gestión de Bookings", href: "#" },
    ]
  },
  { 
    name: "Operaciones", 
    href: "#", 
    icon: Cog,
    subItems: [
      { name: "Planificación", href: "#" },
      { name: "Ejecución", href: "#" },
    ]
  },
  { 
    name: "Reservas", 
    href: "#", 
    icon: CalendarCheck,
    subItems: [
      { name: "Nueva Reserva", href: "#" },
      { name: "Gestión de Reservas", href: "#" },
    ]
  },
  { 
    name: "Gestión órdenes", 
    href: "#", 
    icon: ClipboardList,
    subItems: [
      { name: "Órdenes de Pago", href: "#" },
      { name: "Órdenes de Trabajo", href: "#" },
    ]
  },
  { 
    name: "Reportes", 
    href: "#", 
    icon: BarChart3,
    subItems: [
      { name: "Financieros", href: "#" },
      { name: "Operativos", href: "#" },
    ]
  },
]

export function SideNav({ isOpen, setIsOpen }: SideNavProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const pathname = usePathname()
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Nueva reserva creada para el cliente Juan Pérez. Por favor, revise los detalles y confirme la disponibilidad de las fechas seleccionadas.", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 5), type: 'info' },
    { id: 2, message: "Actualización de itinerario pendiente para la reserva #1234. Se requiere confirmación urgente del proveedor de transporte.", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 30), type: 'warning' },
    { id: 3, message: "Error en el proceso de pago para la reserva #5678. La transacción ha sido rechazada por el banco. Por favor, contacte al cliente para una forma de pago alternativa.", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), type: 'error' },
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const notificationsPerPage = 10

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " años";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " días";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutos";
    return Math.floor(seconds) + " segundos";
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  }

  const truncateMessage = (message: string, maxLength: number = 160) => {
    if (message.length <= maxLength) return message;
    return `${message.substring(0, maxLength - 3)}...`;
  }

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  return (
    <>
      <Button
        variant="ghost"
        className="fixed left-4 top-4 z-50 lg:hidden"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 lg:w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="h-8 w-auto"
              viewBox="0 0 58.39 70.03"
              fill="#002856"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M37.03,19.45h-12.22c-2.01,0-3.94.85-5.3,2.33l-10.85,11.83C1.76,41.13,0,46.69,0,51.13c0,10.02,6.16,16.91,14.51,18.88.56.13,1.09-.31,1.09-.88h0c0-.32-.18-.62-.45-.78-4.45-2.58-7.33-5.73-7.33-10.82,0-4.08,3.3-7.75,6.14-10.84l23.71-25.81c.5-.55.11-1.43-.63-1.43Z"/>
              <path d="M21.36,50.58h12.22c2.01,0,3.94-.85,5.3-2.33l10.85-11.83c6.9-7.52,8.66-13.08,8.66-17.52C58.39,8.88,52.23,2,43.88.02c-.56-.13-1.09.31-1.09.88h0c0,.32.18.62.45.78,4.45,2.58,7.33,5.73,7.33,10.82,0-4.08,3.3-7.75,6.14-10.84l23.71,25.81c-.5.55-.11-1.43.63-1.43Z"/>
            </svg>
            <span className="font-semibold text-lg text-[#002856]">Explorer</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-1 px-2 py-4">
            {navigation.map((item) => (
              <Collapsible
                key={item.name}
                open={activeItem === item.name}
                onOpenChange={() => setActiveItem(activeItem === item.name ? null : item.name)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-gray-500" />
                    <span>{item.name === "Administración catálogos" ? "Catálogos" : item.name}</span>
                  </div>
                  {item.subItems && (
                    <ChevronRight className={cn("h-4 w-4 transition-transform", activeItem === item.name && "rotate-90")} />
                  )}
                </CollapsibleTrigger>
                {item.subItems && (
                  <CollapsibleContent>
                    <ul className="mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "block rounded-md py-2 pl-10 pr-3 text-sm transition-colors",
                              pathname === subItem.href 
                                ? "bg-gray-100 text-[#002856] font-medium" 
                                : "hover:bg-gray-100"
                            )}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                )}
              </Collapsible>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full relative"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Notificaciones</span>
                  <span className="text-sm text-gray-500">
                    Página {currentPage} de {totalPages}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {currentNotifications.map(notif => (
                  <DropdownMenuItem 
                    key={notif.id} 
                    onClick={() => handleNotificationClick(notif.id)}
                    className={cn(
                      "flex items-start gap-2 py-2",
                      notif.read ? 'opacity-50' : ''
                    )}
                  >
                    {getNotificationIcon(notif.type)}
                    <div className="flex flex-col">
                      <span className="font-medium">{truncateMessage(notif.message)}</span>
                      <span className="text-xs text-gray-500">
                        {notif.read ? 'Leído' : 'Nuevo'} • Hace {getTimeAgo(notif.createdAt)}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-2 px-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-500">
                      Página {currentPage} de {totalPages}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full" size="icon">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">shadcn</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Button
        variant="outline"
        className={cn(
          "fixed z-50 flex items-center gap-2 bg-white shadow-md hover:bg-gray-100 transition-all duration-300",
          isOpen 
            ? "left-[17rem] lg:left-[18rem]" 
            : "left-4"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="hidden lg:inline-block text-sm font-medium">
          {isOpen ? "Cerrar menú" : "Abrir menú"}
        </span>
      </Button>
    </>
  )
}

