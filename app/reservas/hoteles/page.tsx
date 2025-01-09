"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { KanbanBoard } from "@/components/kanban-board"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeaderXTS} from "@/components/headerXTS"


export default function HotelReservationsPage() {
  const [activeTab, setActiveTab] = useState("solicitud")

  return (

      <div>
        <HeaderXTS  />

    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      <Card className="border-l-4 border-l-[#002856]">
        <CardContent className="pt-6">
          <Tabs
            defaultValue="solicitud"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="w-full justify-start border-b rounded-none h-full p-0 ">
              <TabsTrigger
                  value="solicitud"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#002856] rounded-none px-8 py-4"


              >

                Solicitud Reserva
                <div className="flex justify-center items-center bg-red-500 rounded-full ml-2">
                  <span className="text-xs text-white px-2">20</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                  value="modificacion"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#002856] rounded-none px-8 py-4"
              >
                Modificación Reserva
                <div className="flex justify-center items-center bg-red-500 rounded-full ml-2">
                  <span className="text-xs text-white px-2">2</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                  value="cancelacion"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#002856] rounded-none px-8 py-4"
              >
                Cancelación de Reserva
                <div className="flex justify-center items-center bg-red-500 rounded-full ml-2">
                  <span className="text-xs text-white px-2">8</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                  value="roomlist"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-[#002856] rounded-none px-8 py-4"
              >
                Enviar Rooming List
                <div className="flex justify-center items-center bg-red-500 rounded-full ml-2">
                  <span className="text-xs text-white px-2">11</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{opacity: 0, y: 20}}
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
      </div>
  )
}

