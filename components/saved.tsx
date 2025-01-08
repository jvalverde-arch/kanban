
interface AddCommentPopupProps {
    onClose: () => void;
}




export const SavedPopUp = ({onClose }: AddCommentPopupProps) => {
    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-bold mb-4">Guardado completado</h2>
                <p>Se han guardado correctamente los cambios</p>
                    <div className="flex justify-end gap-4">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};
