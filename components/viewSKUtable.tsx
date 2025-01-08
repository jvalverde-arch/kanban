import React, {useState} from 'react';
import {SavedPopUp} from "@/components/saved";
import {ShowColorInformation} from "@/components/showColorInformation";

interface SKU {
    id: string;
    name: string;
    selected: boolean;
    comment?: string;
    skuData?: object;
}

interface AddCommentPopupProps {
    taskID: string;
    skus: SKU[]; // The SKUs for the given taskID
    onClose: () => void;
}

export const ViewSKUTable = ({taskID, skus: initialSkus, onClose}: AddCommentPopupProps) => {
    const [skus, setSkus] = useState<SKU[]>(initialSkus);
    const [showSaved, setShowSaved] = useState(false);
    const [showColorInformation, setShowColorInformation] = useState(false);

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

        const estandard = Math.floor(Math.random() * 1000);

        return {
            initDate: randomDate(),
            endDate: randomDate(),
            type: types[Math.floor(Math.random() * types.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            adt: Math.floor(Math.random() * 5).toString(),
            chd: Math.floor(Math.random() * 3).toString(),
            inf: Math.floor(Math.random() * 2).toString(),
            quantity: Math.floor(Math.random() * 10).toString(),
            estandardCost: estandard,
            pactCost: estandard,

        };
    };

    const addRandomDataToSKU = () => {
        const updatedSkus = skus.map((sku) => ({...sku, skuData: generateRandomData()}));
        setSkus(updatedSkus);
    };

    React.useEffect(() => {
        addRandomDataToSKU();
    }, []);

    const handleCommentChange = (skuId: string, newComment: string) => {
        setSkus((prevSkus) =>
            prevSkus.map((sku) =>
                sku.id === skuId ? {...sku, comment: newComment} : sku
            )
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90em] h-[50em] flex flex-col">
                <div className="flex flex-row justify-between items-center gap-2">
                    <h2 className="text-xl font-bold mb-4">SKUs for Task: {taskID}</h2>
<div className="flex justify-between">
    <button className="bg-blue-400 hover:bg-blue-100 text-white px-2 py-1 rounded-md" onClick={() => setShowColorInformation(true)}>
        information
    </button>
    <div className="w-5 h-5"></div>
    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md" onClick={onClose}>
        X
    </button>
</div>
                </div>
                <div className="flex flex-col gap-6 bg-black mt-2 mb-4">
                    <div className="flex flex-col min-h-[0.1em] gap-2"></div>
                </div>
                <div className="flex-1 overflow-y-auto border rounded-md">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2 bg-blue-400 border-l border-r text-white"></th>
                            <th className="py-2 bg-blue-400 border-l border-r"></th>
                            <th className="py-2 bg-blue-400 border-l border-r"></th>
                            <th className="py-2 bg-blue-400 border-l border-r"></th>
                            <th className="py-2 bg-blue-400 border-l border-r"></th>
                            <th className="py-2 bg-blue-500  border text-white" colSpan={3}>Pasajeros</th>
                            <th className="py-2 bg-blue-400 border-l border-r"></th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white border" colSpan={3}>Comentarios</th>
                            <th className="py-2 bg-blue-500 border-l border-r  text-white border" colSpan={2}>Costos</th>
                        </tr>
                        <tr>
                            <th className="py-2 bg-blue-400 border-l border-r text-white ">SKU ID</th>
                            <th className="py-2 bg-blue-400 border-l border-r text-white">InitDate</th>
                            <th className="py-2 bg-blue-400 border-l border-r text-white">EndDate</th>
                            <th className="py-2 bg-blue-400 border-l border-r text-white">Type</th>
                            <th className="py-2 bg-blue-400 border-l border-r text-white">Description</th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white">ADT</th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white">CHD</th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white">INF</th>
                            <th className="py-2 bg-blue-400 border-l border-r text-white">Quantity</th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white">Reservas</th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white">Operativo</th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white">Servicio</th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white">Costo Estandar</th>
                            <th className="py-2 bg-blue-500 border-l border-r text-white">Costo Pactado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {skus.map((sku) => (
                            <tr key={sku.id}>
                                <td className="border px-4 py-2 text-xs">{sku.name}</td>
                                <td className="border px-4 py-2 text-xs">{sku.skuData?.initDate}</td>
                                <td className="border px-4 py-2 text-xs">{sku.skuData?.endDate}</td>
                                <td className="border px-4 py-2 text-xs">{sku.skuData?.type}</td>
                                <td className="border px-4 py-2 text-xs">{sku.skuData?.description}</td>
                                <td className="border px-4 py-2 text-center text-xs">{sku.skuData?.adt}</td>
                                <td className="border px-4 py-2 text-center text-xs">{sku.skuData?.chd}</td>
                                <td className="border px-4 py-2 text-center text-xs">{sku.skuData?.inf}</td>
                                <td className="border px-4 py-2 text-center text-xs">{sku.skuData?.quantity}</td>
                                <td className="border px-4 py-2 text-center text-xs w-5 ">
                                    <div className="flex-row justify-center items-center w-40">
                                        <div className="flex-grow h-full">
                                            <textarea
                                                className="border px-2 py-1 rounded-md text-xs w-full h-auto resize-none overflow-hidden"
                                                value={sku.comment || ''}
                                                onChange={(e) => handleCommentChange(sku.id, e.target.value)}
                                                onInput={(e) => {
                                                    const target = e.target as HTMLTextAreaElement;
                                                    target.style.height = 'auto'; // Reinicia la altura para recalcular
                                                    target.style.height = `${target.scrollHeight}px`; // Ajusta la altura al contenido
                                                }}
                                            />
                                        </div>
                                        <div className="w-2"></div>
                                    </div>
                                    <div className="flex-row justify-center items-center w-40">
<button
    onClick={(e) => {
        setShowSaved(true);
    }}
    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md">
    ✓
</button>
                                    </div>
                                </td>
                                <td className="border px-4 py-2 text-center text-xs">Aqui comentarios Operativo</td>
                                <td className="border px-4 py-2 text-center text-xs">Aqui comentarios Servicio</td>
                                <td className="border px-4 py-2 text-center text-xs">${sku.skuData?.estandardCost}</td>
                                <td className="border px-4 py-2 text-center text-xs">
                                    <div className="flex-row">
                                        <p style={{display: 'inline'}}>$</p>
                                        <input
                                            type="text"
                                            className="border px-2 py-1 rounded-md text-xs"
                                            defaultValue={sku.skuData?.pactCost || ''}
                                            onInput={(e) => {
                                                const target = e.target as HTMLInputElement;
                                                target.style.height = 'auto'; // Reinicia la altura para recalcular
                                                target.style.height = `${target.scrollHeight}px`; // Ajusta la altura al contenido
                                            }}
                                            style={{
                                                height: 'auto',
                                                minHeight: '1.5em',
                                                display: 'inline',
                                                width: 'calc(100% - 1em)' // Adjust width to fit the input and dollar sign
                                            }} // Establece altura inicial y mínima
                                        />
                                    </div>
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md mt-1"
                                            onClick={(e) => {
                                                setShowSaved(true);

                                                // Set the tr bg color to green
                                                const tr = (e.target as HTMLElement).closest('tr');
                                                if (tr) {
                                                    tr.style.backgroundColor = 'rgb(255 237 213 / var(--tw-bg-opacity, 1))';
                                                }
                                            }}>
                                            ✓
                                        </button>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showSaved && <SavedPopUp onClose={() => setShowSaved(false)}/>}
            {showColorInformation && <ShowColorInformation onClose={() => setShowColorInformation(false)}/>}
        </div>

    );
};
