import React, { useState } from 'react';


interface SKU {
  id: string;
  name: string;
  selected: boolean;
  comment?: string
  skuData?: object
}




interface AddCommentPopupProps {
  taskID: string;
  skus: SKU[]; // The SKUs for the given taskID
  onClose: () => void;
}




export const ViewSKUTable = ({ taskID, skus: initialSkus, onClose }: AddCommentPopupProps) => {
  const [skus, setSkus] = useState<SKU[]>(initialSkus);

  






const generateRandomData = () => {
    const randomDate = () => {
        const start = new Date(2022, 0, 1);
        const end = new Date(2023, 0, 1);
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0];
    };

    const types = ["RCAM1", "RCAM2", "RCAM3"];
    const descriptions = [
        "Finch Bay Hotel - Finch Bay Rooms - Single",
        "Finch Bay Hotel - Finch Bay Rooms - Double",
        "Finch Bay Hotel - Finch Bay Rooms - Suite"
    ];

    return {
        initDate: randomDate(),
        endDate: randomDate(),
        type: types[Math.floor(Math.random() * types.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        adt: Math.floor(Math.random() * 5).toString(),
        chd: Math.floor(Math.random() * 3).toString(),
        inf: Math.floor(Math.random() * 2).toString(),
        quantity: Math.floor(Math.random() * 10).toString(),
    };
};

const addRandomDataToSKU = () => {
    const updatedSkus = skus.map(sku => ({ ...sku, skuData: generateRandomData() }));
    setSkus(updatedSkus);
};
React.useEffect(() => {
    addRandomDataToSKU();
},[]);






  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 min-w-[90em] min-h-[50em] gap-2 ">
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
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">SKU ID</th>
                <th className="py-2">InitDate</th>
                <th className="py-2">EndDate</th>
                <th className="py-2">Type</th>
                <th className="py-2">Description</th>
                <th className="py-2">ADT</th>
                <th className="py-2">CHD</th>
                <th className="py-2">INF</th>
                <th className="py-2">Quantity</th>
              </tr>
            </thead>
            <tbody className="overflow-x-auto">
              {skus.map((sku) => (
                <tr key={sku.id}>
                  <td className="border px-4 py-2 text-xs">{sku.name}</td>
                  <td className="border px-4 py-2 text-xs">
                    {sku.skuData?.initDate}
                  </td>
                    <td className="border px-4 py-2 text-xs">
                        {sku.skuData?.endDate}
                    </td>
                    <td className="border px-4 py-2 text-xs">
                        {sku.skuData?.type}
                    </td>
                    <td className="border px-4 py-2 text-xs">
                      {sku.skuData?.description}
                    </td>
                  <td className="border px-4 py-2 text-center text-xs">
                    {sku.skuData?.adt}
                  </td>
                  <td className="border px-4 py-2 text-center text-xs">
                    {sku.skuData?.chd}
                  </td>
                  <td className="border px-4 py-2 text-center text-xs">
                    {sku.skuData?.inf}
                  </td>
                    <td className="border px-4 py-2 text-center text-xs">
                        {sku.skuData?.quantity}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};