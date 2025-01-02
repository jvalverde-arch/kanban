import React from 'react';
import { Button } from '@/components/ui/button';

export const LetterSentPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 min-w-[50em] min-h-[50em] gap-2">
        <h2 className="text-xl font-bold mb-4">Enviar Carta</h2>
        <div className = "flex flex-col min-h-[45em] gap-2 bg-slate-200">
        </div>
        <br></br>
        <div className="flex flex-row items-center justify-center gap-2">
          <Button 
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >Enviar Carta con email</Button>
                    <Button 
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >Enviar Carta sin email</Button>
          <Button 
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white"
            >Cancelar</Button>
        </div>
      </div>
    </div>
  );
};
