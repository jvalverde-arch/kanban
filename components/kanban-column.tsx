interface KanbanColumnProps {
  title: string
  children: React.ReactNode
  onDragOver: (event: React.DragEvent) => void
  onDrop: (event: React.DragEvent) => void
}

export function KanbanColumn({
  title,
  children,
  onDragOver,
  onDrop
}: KanbanColumnProps) {
  return (
    <div
      className="min-w-[350px] bg-gray-50 rounded-lg p-4"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h3 className="font-medium text-sm text-[#002856] mb-4">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

