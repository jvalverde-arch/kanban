
interface AddCommentPopupProps {
    onClose: () => void;
    setIsConfirmed: (isConfirmed: boolean) => void;
}




export const ConfirmationPopUp = ({onClose,setIsConfirmed }: AddCommentPopupProps) => {
    return (

            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
    <h2 className="text-xl font-bold mb-4">¿Estás seguro que quieres pasar de estado?</h2>
    <div className="flex justify-end gap-4">
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"

        onClick={() => {
            setIsConfirmed(false);
          onClose();
        }}
      >
        Cancelar
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        onClick={() => {
            setIsConfirmed(true);
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
