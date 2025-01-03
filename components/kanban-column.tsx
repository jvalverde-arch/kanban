interface KanbanColumnProps {
  title: string
  children: React.ReactNode
  color: string
  count: number
  onDragOver: (event: React.DragEvent) => void
  onDrop: (event: React.DragEvent) => void
}

export function KanbanColumn({
  title,
  color,
  children,
  count,
  onDragOver,
  onDrop
}: KanbanColumnProps) {

  console.log(count)
  console.log(title)
  return (
    <div
      className={`min-w-[350px] rounded-lg p-4 ${color} shadow-sm transition-transform duration-200 ease-in-out transform hover:scale-[200em]}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-sm text-[#002856]">{title}</h3>
      <div className="flex justify-center items-center bg-red-500 rounded-full ml-2">
        <span className="text-xs text-white px-2">{count}</span>
      </div>
      </div>
      <div className="space-y-3">
      {children}
      </div>
    </div>
  )
}

