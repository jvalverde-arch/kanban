interface KanbanColumnProps {
  title: string
  children: React.ReactNode
  color: string
  onDragOver: (event: React.DragEvent) => void
  onDrop: (event: React.DragEvent) => void
}

export function KanbanColumn({
  title,
  color,
  children,
  onDragOver,
  onDrop
}: KanbanColumnProps) {
  return (
    <div
      className={`min-w-[350px] rounded-lg p-4 ${color}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h3 className="font-bold text-sm text-[#002856] mb-4">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}

