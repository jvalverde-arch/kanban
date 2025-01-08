
interface AddCommentPopupProps {
    onClose: () => void;
}




export const ShowColorInformation = ({onClose }: AddCommentPopupProps) => {
    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-bold mb-4">Informacion de Colores</h2>
                <div className="flex justify-center items-center flex-col">
                    <table className="table-auto">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">Color</th>
                            <th className="px-4 py-2">Codigo</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-orange-100">
                            <td className="border px-4 py-2">Naranja</td>
                            <td className="border px-4 py-2">Costo Pactado cambiado</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end gap-4 mt-10">
                <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};
