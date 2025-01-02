import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AddCommentPopup } from "@/components/addComment"


interface SKU {
  id: string
  name: string
  selected: boolean
  comment?: string
}

interface Task {
  provider: string
  id: string
  title: string
  assignee: string
  priority?: "low" | "medium" | "high"
  skus: SKU[]
}

interface KanbanCardProps {
  task: Task
  onDragStart: (event: React.DragEvent) => void
  onSKUUpdate: (task: Task) => void
}

export function KanbanCard({ task, onDragStart, onSKUUpdate }: KanbanCardProps) {
  const [skus, setSkus] = useState<SKU[]>(task.skus || [])
  const [showSkus, setShowSkus] = useState(false)
  const [allSkus, setAllSkus] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [comment, setAddComment] = useState(false)

  const handleCheckboxChange = (id: string) => {
    const updatedSkus = skus.map(sku => sku.id === id ? { ...sku, selected: !sku.selected } : sku)
    setSkus(updatedSkus)
    onSKUUpdate({ ...task, skus: updatedSkus })
  }

  const selectAllSkus = () => {
    const newSkus = skus.map(sku => ({ ...sku, selected: !allSkus }))
    setSkus(newSkus)
    onSKUUpdate({ ...task, skus: newSkus })
    setAllSkus(!allSkus)
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu({ x: event.clientX, y: event.clientY })
  }

  const closeContextMenu = () => {
    setContextMenu(null)
  }

  const addComment = (taskId: string) => () => {
    event.preventDefault()
    setAddComment(true)
  }

  const closeAddComment = () => {
    setAddComment(false)
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onContextMenu={handleContextMenu}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="text-sm text-black font-bold">{task.title}</h4>
              <h6 className="font-medium text-sm text-gray-900">{task.provider}</h6>
            </div>
          </div>
          <div className="flex flex-row gap-1 align-middle">
            <p className="text-xs">Select All SKUs</p>
            <input type="checkbox" onChange={selectAllSkus} checked={allSkus} />
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between"
          onClick={() => setShowSkus(!showSkus)}
        >
          {showSkus ? 'Hide' : 'Show'} SKUs
          {showSkus ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {showSkus && (
          <div className="flex flex-col gap-2">
            {skus.length > 0 ? (
              skus.map(sku => (
                <div key={sku.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`sku-${sku.id}`}
                    checked={sku.selected}
                    onChange={() => handleCheckboxChange(sku.id)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`sku-${sku.id}`} className="text-xs text-gray-700">{sku.name}</label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No SKUs available</p>
            )}
          </div>
        )}
      </div>
      {contextMenu && (
        <div
          className="absolute bg-white border shadow-lg p-2 rounded-md z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={closeContextMenu}
        >
          <p className="text-sm hover:bg-gray-100 px-2 py-1 cursor-pointer" onClick={addComment(task.id)}>Agregar Comentario</p>
        </div>
      )}
      {comment &&
        <AddCommentPopup
          taskID={task.id}
          skus={task.skus}
          onClose={() => setAddComment(false)}
        >
        </AddCommentPopup>

      }

    </div>
  )
}