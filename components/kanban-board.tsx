"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LetterSentPopup} from "./popup";
import { ViewSKUList } from "@/components/viewSKUList"
import { SearchBar } from "./searchBar"
import {ConfirmationPopUp} from "./confirmationPopUp"



interface SKU {
  id: string;
  name: string;
  selected: boolean;
  comment?: string
}

interface Task {
  provider: string;
  id: string;
  title: string;
  assignee: string;
  priority?: "low" | "medium" | "high";
  skus: SKU[],
  state: string;
}





// Mock data generator
const generateMockTasks = (type: string): Task[] => {
  const types = {
    solicitud: "SOL",
    modificacion: "MOD",
    cancelacion: "CAN"
  }

  const providers = ["Finch Bay", "Casa Gangotena" , "Mashpi"];

/*   return Array.from({ length: 15 }, (_, i) => ({
    id: `${types[type as keyof typeof types]}-${i + 1000}`,
    title: `Reserva ${types[type as keyof typeof types]} #${i + 1}`,
    assignee: ["Juan Pérez", "María García", "Carlos López"][Math.floor(Math.random() * 3)],
    state: columns[Math.floor(Math.random() * columns.length)].id,
    skus: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
      id: `${i + 1000}-${j + 1}`,
      name: ["FBH_Night_RCA-2_[2-0-0]_EXT", "FBH_Night_SPBY4_[2-0-2]_EXT", "VAN_GYE-GCE_PRV-4-5_[0-1-0]_EXT",
        "GPS_FD Land Tour (Tortuga Bay - Lunch - ECD)_PRV-4-5_[1-0-0]_EXT", "GPS_HD HIGHLAND TOUR_PRV-4-5_[1-0-0]_LOC"][Math.floor(Math.random() * 5)],
      selected: false
    }))
  })) */


    return Array.from({length:10}, (_, i) => ({
      provider: providers[Math.floor(Math.random() * 3)],
      id: `${types[type as keyof typeof types]}-${i + 1000}`,
      title: `Reserva ${types[type as keyof typeof types]} #${i + 1}`,
      assignee: ["Juan Pérez", "María García", "Carlos López"][Math.floor(Math.random() * 3)],
      state: "new",
      skus: Array.from({length:10}, (_, j) => ({
        id: `${i + 1000}-${j + 1}`,
        name: ["FBH_Night_RCA-2_[2-0-0]_EXT", "FBH_Night_SPBY4_[2-0-2]_EXT", "VAN_GYE-GCE_PRV-4-5_[0-1-0]_EXT",
          "GPS_FD Land Tour (Tortuga Bay - Lunch - ECD)_PRV-4-5_[1-0-0]_EXT", "GPS_HD HIGHLAND TOUR_PRV-4-5_[1-0-0]_LOC"][Math.floor(Math.random() * 5)],
          selected: true
      }))
    }))
}

interface KanbanBoardProps {
  type: string
}

  const countTasksByState = (tasks: Task[]) => {
    let countNew = 0;
    let countPending = 0;
    let countLetterSent = 0;
    let countTotalReserved = 0;
    let countPartialReserved = 0;
    let countDenied = 0;
    let countTotalWithPassengers = 0;

    tasks.forEach(task => {
      if (task.state === "new") {
        countNew++;
      } else if (task.state === "pending") {
        countPending++;
      } else if (task.state === "letter_sent") {
        countLetterSent++;
      } else if (task.state === "total_reserved") {
        countTotalReserved++;
      } else if (task.state === "partial_reserved") {
        countPartialReserved++;
      } else if (task.state === "denied") {
        countDenied++;
      } else if (task.state === "total_with_passengers") {
        countTotalWithPassengers++;
      }
    });
    return {
      new: countNew,
      pending: countPending,
      letter_sent: countLetterSent,
      total_reserved: countTotalReserved,
      partial_reserved: countPartialReserved,
      denied: countDenied,
      total_with_passengers: countTotalWithPassengers
    }
  }

export function KanbanBoard({ type }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(generateMockTasks(type));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPartialPopup, setShowPartialPopup] = useState(false);
  const [taskMoving, setTaskMoving] = useState<Task | null>(null);


  // State for column visibility
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    new: true,
    pending: true,
    letter_sent: true,
    total_reserved: true,
    partial_reserved: true,
    denied: true,
    total_with_passengers: true,
  });


const columns = type === "solicitud" ? [
  { id: "new", title: "Solicitud Nueva Reserva", color: "bg-gray-100" },
  { id: "pending", title: "Reserva pendiente", color: "bg-orange-100" },
  { id: "letter_sent", title: "Carta enviada", color: "bg-green-100" },
  { id: "total_reserved", title: "Reservado Total", color: "bg-green-200" },
  { id: "partial_reserved", title: "Reservado Parcial", color: "bg-yellow-200" },
  { id: "denied", title: "Negado", color: "bg-red-200" },
  { id: "total_with_passengers", title: "Reservado total con lista pasajeros", color: "bg-blue-200" },
] : type === "modificacion" ? [
  { id: "new", title: "Modificación Solicitud Reserva", color: "bg-gray-100" },
  { id: "pending", title: "Modificación pendiente", color: "bg-orange-100" },
  { id: "letter_sent", title: "Carta modificación enviada", color: "bg-green-100" },
  { id: "total_reserved", title: "Reservado Total", color: "bg-green-200" },
  { id: "partial_reserved", title: "Reservado Parcial", color: "bg-yellow-200" },
  { id: "denied", title: "Negado", color: "bg-red-200" },
  { id: "total_with_passengers", title: "Modificado total con lista pasajeros", color: "bg-blue-200" },
] : type === "cancelacion" ? [
  { id: "new", title: "Solicitud Cancelación Reserva", color: "bg-gray-100" },
  { id: "pending", title: "Cancelación pendiente", color: "bg-orange-100" },
  { id: "letter_sent", title: "Carta cancelación enviada", color: "bg-orange-300" },
  { id: "total_reserved", title: "Cancelado", color: "bg-red-200" },
] : [];





const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns((prev) => ({
        ...prev,
        [columnId]: !prev[columnId],
    }));
};



const setATask = (newTasksUpdated: Task[]) => {
  console.log("Task from another component", newTasksUpdated);

  // Crear nuevas tareas basadas en el estado
  const updatedTasks = newTasksUpdated.flatMap((task) => {
    if (task.state === "denied") {
      return [{ ...task, id: `${task.id}-Denied`, state: "denied" }];
    }
    if (task.state === "partial_reserved") {
      return [{ ...task, id: `${task.id}-Reserved`, state: "reserved" }];
    }
    return [];
  });

  console.log("Updated Tasks", updatedTasks);

  // Eliminar las tareas originales y añadir las nuevas
  setTasks([...tasks, ...updatedTasks]);
};





  const [count, setCount] = useState(countTasksByState(tasks));

    useEffect(() => {
    setCount(countTasksByState(tasks));
  }, [tasks]);





  const deleteTaskById = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };
  const handleDragStart = (event: React.DragEvent, taskId: string) => {
    event.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Permite que el evento de drop funcione correctamente
  };

  const handleDrop = (event: React.DragEvent, columnId: string) => {

  const taskId = event.dataTransfer.getData("text/plain");
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    console.error("Task not found");
    return;
  }
  setTaskMoving(task);


  if(columnId === task.state){
    toast.error("No se puede mover a la misma columna")
    console.log("No se puede mover a la misma columna")
    return;
  }


  if(task.state === "new" && columnId !== "pending"){
    toast.error("No se puede mover una nueva solicitud a una columna que no sea reserva pendiente")
    console.log("No se puede mover una nueva solicitud a una columna que no sea reserva pendiente")
    return;
  }
  if(task.state === "pending" && columnId !== "letter_sent"){
    toast.error("No se puede mover una solicitud pendiente a una columna que no sea carta enviada")
    console.log("No se puede mover una solicitud pendiente a una columna que no sea carta enviada")
    return;
  }
  //No se puede mover una solicitud carta enviada a una columna que no sea reservado total, reservado parcial o denegado
  if(task.state === "letter_sent" && columnId !== "total_reserved" && columnId !== "partial_reserved" && columnId !== "denied"){
    toast.error("No se puede mover una solicitud carta enviada a una columna que no sea reservado total, reservado parcial o denegado")
    console.log("No se puede mover una solicitud carta enviada a una columna que no sea reservado total, reservado parcial o denegado")
    return;
  }

  if(task.state === "total_reserved" && columnId !== "total_with_passengers"){
    toast.error("No se puede mover una solicitud reservado total a una columna que no sea reservado total con lista pasajeros")
    console.log("No se puede mover una solicitud reservado total a una columna que no sea reservado total con lista pasajeros")
    return;
  }

  if(task.state === "partial_reserved" && columnId !== "total_with_passengers"){
    toast.error("No se puede mover una solicitud reservado parcial a una columna que no sea reservado total con lista pasajeros")
    console.log("No se puede mover una solicitud reservado parcial a una columna que no sea reservado total con lista pasajeros")
    return;
  }

  if(task.state == "total_with_passengers"){
    toast.error("No se puede mover una solicitud reservado total con lista pasajeros a una columna distinta")
    console.log("No se puede mover una solicitud reservado total con lista pasajeros a una columna distinta")
    return;
  }

  if(task.state == "denied"){
    toast.error("No se puede mover una solicitud denegada a una columna distinta")
    console.log("No se puede mover una solicitud denegada a una columna distinta")
    return;
  }

    setShowConfirmation(true);





  const selectedSKUs = task.skus.filter(sku => sku.selected);

  if (selectedSKUs.length > 0) {
    // 1. Crear nueva tarea en la nueva columna solo con SKUs seleccionados
    const newTask = {
      ...task,
      skus: selectedSKUs,  // Solo los SKUs seleccionados
      id: `${taskId}-${Date.now()}`,
      state: columnId      // Nueva columna
    };

    // 2. Mantener la tarea original con solo los SKUs no seleccionados
    const updatedOriginalTask = {
      ...task,
      skus: task.skus.filter(sku => !sku.selected),
      id: `${taskId}-${Date.now()}-1`,
      state: task.state    // Mantener en la columna original
    };

    if(updatedOriginalTask.skus.length === 0){
      deleteTaskById(taskId)
    }else{
      console.log(updatedOriginalTask)
      tasks.push(updatedOriginalTask)
      deleteTaskById(taskId)
    }






    // 3. Actualizar el estado completo


    if (newTask.state === "letter_sent"){
      setShowPopup(true);
          setTasks(tasks => [
      ...tasks.map(t => t.id === taskId ? updatedOriginalTask : t),
      newTask
    ]);
    }

    else if (newTask.state === "partial_reserved"){
      setShowPartialPopup(true);
          setTasks(tasks => [
      ...tasks.map(t => t.id === taskId ? updatedOriginalTask : t),
      newTask


    ]);





    //update count
    setCount(countTasksByState(tasks));

    }else if(newTask.state === "total_with_passengers"){
      setShowPopup(true);
          setTasks(tasks => [
      ...tasks.map(t => t.id === taskId ? updatedOriginalTask : t),
      newTask

    ]);


    //update count
    setCount(countTasksByState(tasks));



    }else{
      setTasks(tasks => [
      ...tasks.map(t => t.id === taskId ? updatedOriginalTask : t),
      newTask
    ]);

    //update count
    setCount(countTasksByState(tasks));

      toast.success("Estado existoso")



    }



  }else{
    toast.error("No haz seleccionado ningún SKU")
  }
};



const updateTask = (updatedTask: Task) => {
  // Crear un nuevo array de tareas usando map para evitar mutaciones
  const newTasks = tasks.map(task => {
    if (task.id === updatedTask.id) {
      // Retornar una nueva tarea con los SKUs actualizados
      return {
        ...task,
        skus: [...updatedTask.skus] // Crear una nueva copia del array de SKUs
      };
    }
    return task;
  });

  // Actualizar el estado con el nuevo array
  setTasks(newTasks);
};

  return (
      <div>
      <div className="mb-5 mt-2">
<SearchBar
    tasks={tasks}
    onSearch={setATask}
    setTasks={setTasks}
    columns={columns}
    setView={toggleColumnVisibility}
/>
      </div>
    <div className="grid grid-cols-7 gap-[22em] overflow-x-auto">
      {columns.filter(column => visibleColumns[column.id]).map((column) => (
    <KanbanColumn
      count={count[column.id]}
      key={column.id}
      title={column.title}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, column.id)}
      color={column.color}
    >
      {/* Proveedor: Finch Bay */}
      {tasks.some(task => task.state === column.id && task.provider === "Finch Bay") && (
        <div className="max-w-sm p-2 bg-slate-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div  className="flex flex-row bg-slate-500 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 justify-between">
          <h1 className="p-2 text-white">Finch Bay</h1>
          <button className="p-1 m-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 text-xs">
            Operar todo
          </button>
          </div>
          <div className="flex flex-col gap-2 p-2"></div>
          {tasks
            .filter(task => task.state === column.id && task.provider === "Finch Bay")
            .map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <KanbanCard
                  task={task}
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onSKUUpdate={updateTask}
                />
                <div className="flex flex-col gap-2 p-2"></div>
              </motion.div>
            ))}
        </div>
      )}

      {/* Proveedor: Mashpi */}
      {tasks.some(task => task.state === column.id && task.provider === "Mashpi") && (
        <div className="max-w-sm p-2 bg-slate-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div  className="flex flex-row bg-slate-500 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 justify-between">
          <h1 className="p-2 text-white">Mashpi</h1>
          <button className="p-1 m-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 text-xs">
            Operar todo
          </button>
          </div>
          <div className="flex flex-col gap-2 p-2"></div>
          {tasks
            .filter(task => task.state === column.id && task.provider === "Mashpi")
            .map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <KanbanCard
                  task={task}
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onSKUUpdate={updateTask}
                />
                 <div className="flex flex-col gap-2 p-2"></div>
              </motion.div>
            ))}
        </div>
      )}

      {/* Proveedor: Casa Gangotena */}
      {tasks.some(task => task.state === column.id && task.provider === "Casa Gangotena") && (
        <div className="max-w-sm p-2 bg-slate-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div  className="flex flex-row bg-slate-500 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 justify-between">
          <h1 className="p-2 text-white">Casa Gangotena</h1>
          <button className="p-1 m-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400 text-xs">
            Operar todo
          </button>
          </div>
          <div className="flex flex-col gap-2 p-2"></div>
          {tasks
            .filter(task => task.state === column.id && task.provider === "Casa Gangotena")
            .map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <KanbanCard
                  task={task}
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onSKUUpdate={updateTask}
                />
                 <div className="flex flex-col gap-2 p-2"></div>
              </motion.div>
            ))}
        </div>
      )}

      {showPartialPopup &&
        <ViewSKUList
          taskID={taskMoving?.id}
          skus={taskMoving?.skus}
          onClose={() => setShowPartialPopup(false)}
          isPartial={true}
          setTask={setATask}
          tasks={tasks}
        />
      }
    </KanbanColumn>
  ))}
  <ToastContainer position="top-right" autoClose={5000} />
  {showPopup && <LetterSentPopup onClose={() => setShowPopup(false)} />}
      {showConfirmation && <ConfirmationPopUp setIsConfirmed={setIsConfirmed} onClose={() => setShowConfirmation(false)} />}
</div>
</div>
  );
}
