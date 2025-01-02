import React, { useState } from 'react';

interface SKU {
  id: string;
  name: string;
  selected: boolean;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority?: "low" | "medium" | "high";
  skus: SKU[];
}

interface KanbanCardProps {
  task: Task;
  onDragStart: (event: React.DragEvent) => void;
  onSKUUpdate: (task: Task) => void;
}

export function KanbanCard({ task, onDragStart, onSKUUpdate }: KanbanCardProps) {
  const [skus, setSkus] = useState<SKU[]>(task.skus || []);

  const handleCheckboxChange = (id: string) => {
    const updatedSkus = skus.map(sku => sku.id === id ? { ...sku, selected: !sku.selected } : sku);
    setSkus(updatedSkus);
    onSKUUpdate({ ...task, skus: updatedSkus }); // Notificar al componente padre
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-medium text-sm text-gray-900">{task.title}</h4>
          <div className="mt-2 flex flex-col gap-2">
            {skus.length > 0 ? (
              skus.map(sku => (
                <div key={sku.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sku.selected}
                    onChange={() => handleCheckboxChange(sku.id)}
                  />
                  <span>{sku.name}</span>
                </div>
              ))
            ) : (
              <p>No SKUs available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}