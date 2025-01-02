"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { KanbanBoard } from "@/components/kanban-board"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HotelReservationsPage() {
  const [activeTab, setActiveTab] = useState("solicitud")

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Card className="border-l-4 border-l-[#002856]">
        <CardContent className="pt-6">
          <Tabs
            defaultValue="solicitud"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="solicitud"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#002856] rounded-none px-8 py-4"
              >
                Solicitud Reserva
              </TabsTrigger>
              <TabsTrigger
                value="modificacion"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#002856] rounded-none px-8 py-4"
              >
                Modificación Reserva
              </TabsTrigger>
              <TabsTrigger
                value="cancelacion"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#002856] rounded-none px-8 py-4"
              >
                Cancelación de Reserva
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="pt-6"
            >
              <KanbanBoard type={activeTab} />
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

