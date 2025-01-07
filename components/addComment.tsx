import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SKU {
  id: string;
  name: string;
  selected: boolean;
  comment?: string
}


interface AddCommentPopupProps {
  taskID: string;
  skus: SKU[]; // The SKUs for the given taskID
  onClose: () => void;
}

export const AddCommentPopup = ({ taskID, skus: initialSkus, onClose }: AddCommentPopupProps) => {
  const [skus, setSkus] = useState<SKU[]>(initialSkus);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 min-w-[50em] min-h-[50em] gap-2">
        <div className='flex flex-row justify-between items-center gap-2'>
            <h2 className="text-xl font-bold mb-4">SKUs for Task: {taskID}</h2>
            <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md" onClick={onClose}>
                X
            </button>
        </div>
        <div className="flex flex-col gap-6 bg-black mt-2 mb-4">
            <div className="flex flex-col min-h-[0.1em] gap-2"></div>
        </div>
        <div className="flex flex-col min-h-[45em] gap-2">
          {skus.length > 0 ? (
            skus.map((sku) => (
              <div key={sku.id} className="flex flex-row justify-between items-center gap-2">
                <label htmlFor={`sku-${sku.id}`} className="text-sm text-gray-700">
                  {sku.name}
                </label>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                    Add Comment
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No SKUs available for this task.</p>
          )}
           <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
              Confirmar
            </button>

        </div>
      </div>
    </div>
  );
};