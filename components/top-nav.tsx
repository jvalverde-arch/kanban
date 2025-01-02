"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Bell, Menu, X, ChevronDown, User, LogOut, BookOpen, Anchor, Lock, BookMarked, Cog, CalendarCheck, ClipboardList, BarChart3, Maximize, Minimize } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigation = [
  { 
    name: "Administración catálogos", 
    href: "#", 
    icon: BookOpen,
    current: false,
    subItems: [
      { name: "Proveedores", href: "#" },
      { name: "Tarifas de proveedores", href: "#" },
      { name: "Administración de vuelos", href: "#" },
      { name: "Embarcaciones", href: "#" },
      { name: "Catálogos", href: "#" },
    ]
  },
  { 
    name: "Embarcaciones", 
    href: "#", 
    icon: Anchor,
    current: false,
    subItems: [
      { name: "Programación", href: "#" },
      { name: "Mantenimiento", href: "#" },
    ]
  },
  { 
    name: "Bloqueos", 
    href: "#", 
    icon: Lock,
    current: false,
    subItems: [
      { name: "Crear Bloqueo", href: "#" },
      { name: "Gestionar Bloqueos", href: "#" },
    ]
  },
  { 
    name: "Booking", 
    href: "#", 
    icon: BookMarked,
    current: true,
    subItems: [
      { name: "Nuevo Booking", href: "#" },
      { name: "Gestión de Bookings", href: "#" },
    ]
  },
  { 
    name: "Operaciones", 
    href: "#", 
    icon: Cog,
    current: false,
    subItems: [
      { name: "Planificación", href: "#" },
      { name: "Ejecución", href: "#" },
    ]
  },
  { 
    name: "Reservas", 
    href: "#", 
    icon: CalendarCheck,
    current: false,
    subItems: [
      { name: "Nueva Reserva", href: "#" },
      { name: "Gestión de Reservas", href: "#" },
    ]
  },
  { 
    name: "Gestión órdenes", 
    href: "#", 
    icon: ClipboardList,
    current: false,
    subItems: [
      { name: "Órdenes de Pago", href: "#" },
      { name: "Órdenes de Trabajo", href: "#" },
    ]
  },
  { 
    name: "Reportes", 
    href: "#", 
    icon: BarChart3,
    current: false,
    subItems: [
      { name: "Financieros", href: "#" },
      { name: "Operativos", href: "#" },
    ]
  },
]

export function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  return (
    <nav className="sticky top-0 z-50 bg-[#002856] shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <svg
                  className="h-10 w-auto"
                  viewBox="0 0 58.39 70.03"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M37.03,19.45h-12.22c-2.01,0-3.94.85-5.3,2.33l-10.85,11.83C1.76,41.13,0,46.69,0,51.13c0,10.02,6.16,16.91,14.51,18.88.56.13,1.09-.31,1.09-.88h0c0-.32-.18-.62-.45-.78-4.45-2.58-7.33-5.73-7.33-10.82,0-4.08,3.3-7.75,6.14-10.84l23.71-25.81c.5-.55.11-1.43-.63-1.43Z"/>
                    <path d="M21.36,50.58h12.22c2.01,0,3.94-.85,5.3-2.33l10.85-11.83c6.9-7.52,8.66-13.08,8.66-17.52C58.39,8.88,52.23,2,43.88.02c-.56-.13-1.09.31-1.09.88h0c0,.32.18.62.45.78,4.45,2.58,7.33,5.73,7.33,10.82,0,4.08-3.3,7.75-6.14,10.84l-23.71,25.81c-.5.55-.11-1.43.63-1.43Z"/>
                  </g>
                </svg>
              </Link>
            </div>
            <div className="hidden md:block w-full">
              <NavigationMenu className="flex justify-center">
                <NavigationMenuList className="flex space-x-1 py-1 bg-[#002856] rounded-md w-full justify-center">
                  {navigation.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenu>
                        <NavigationMenuTrigger
                          className={cn(
                            "bg-[#002856] text-white hover:bg-[#ffd100] hover:text-[#002856] focus:bg-[#ffd100] focus:text-[#002856]",
                            "rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out whitespace-nowrap flex items-center gap-2"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[200px] gap-1 p-2 bg-white rounded-md shadow-lg">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-[#f0f9ff] hover:text-[#00acd8] focus:bg-[#f0f9ff] focus:text-[#00acd8] text-[#002856]"
                                  >
                                    {subItem.name}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenu>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="rounded-full text-white hover:bg-white hover:text-[#002856] transition-colors duration-150 ease-in-out"
            >
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle fullscreen</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full text-white hover:bg-white hover:text-[#002856] transition-colors duration-150 ease-in-out"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-1 rounded-full hover:bg-[#003b7a] transition-colors duration-150 ease-in-out">
                  <Avatar className="h-8 w-8 border-2 border-[#00acd8]">
                    <AvatarImage src="" alt="Usuario" />
                    <AvatarFallback className="bg-[#00acd8] text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 bg-white rounded-md shadow-lg">
                <DropdownMenuItem className="hover:bg-[#f0f9ff] hover:text-[#00acd8] focus:bg-[#f0f9ff] focus:text-[#00acd8]">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-[#f0f9ff] hover:text-[#00acd8] focus:bg-[#f0f9ff] focus:text-[#00acd8]">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#003b7a] hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#002856] transition-colors duration-150 ease-in-out"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
                <SheetHeader>
                  <SheetTitle className="text-[#002856]">Menu</SheetTitle>
                </SheetHeader>
                <ul className="mt-5 space-y-2 px-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={cn(
                          item.current
                            ? "bg-[#00acd8] text-white"
                            : "text-[#002856] hover:bg-[#f0f9ff] hover:text-[#00acd8]",
                          "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-150 ease-in-out flex items-center gap-2"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </a>
                      {item.subItems && (
                        <ul className="mt-2 space-y-1 pl-10">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <a
                                href={subItem.href}
                                className="block rounded-md py-2 pl-3 pr-4 text-sm font-medium text-[#002856] hover:bg-[#f0f9ff] hover:text-[#00acd8] transition-colors duration-150 ease-in-out"
                              >
                                {subItem.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

