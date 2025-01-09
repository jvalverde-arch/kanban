import Link from "next/link"
import { Bell, ChevronDown, Maximize2 } from 'lucide-react'

export function HeaderXTS() {
    return (
        <header className="w-full">
            <div className="bg-[#4B57C9] text-white">
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 py-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xwz2CaXq3y2XMnZWBiJFN8EKqdCw9n.png"
                            alt="Logo"
                            className="h-8 w-8"
                        />
                    </Link>

                    {/* Right section */}
                    <div className="flex items-center gap-4">
                        <button className="p-1 hover:bg-white/10 rounded">
                            <Maximize2 className="h-5 w-5" />
                        </button>
                        <button className="p-1 hover:bg-white/10 rounded">
                            <Bell className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-sm">JC</span>
                            </div>
                            <span className="text-sm">Juan Francisco Cisneros</span>
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="border-t border-white/20">
                    <ul className="flex px-4">
                        <li>
                            <button className="px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-1">
                                Administración catálogos
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </li>
                        <li>
                            <button className="px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-1">
                                Embarcaciones
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </li>
                        <li>
                            <button className="px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-1">
                                Bloqueos
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </li>
                        <li>
                            <button className="px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-1">
                                Booking
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </li>
                        <li>
                            <button className="px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-1">
                                Operaciones
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </li>
                        <li>
                            <button className="px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-1">
                                Reservas
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </li>
                        <li>
                            <button className="px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-1">
                                Gestión órdenes
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </li>
                        <li>
                            <button className="px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-1">
                                Reportes
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

