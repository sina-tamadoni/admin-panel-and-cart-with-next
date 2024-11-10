import Close from "../icons/Close";

function DeleteAllProductsModal({
  setIsShowDeleteAllModal,
  deleteSelectedItemsHandler,
}) {
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 opacity-50"></div>
      <div className="backdrop-blur-sm fixed w-screen h-screen top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white w-[400px] m-auto rounded-xl">
          <Close />
          <div className="font-[Vazir] mt-10 text-sm md:text-base">
            آیا از حذف محصولات انتخاب شده اطمینان دارید؟
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              className="text-white font-[Vazir] text-sm md:text-base px-7 py-1.5 mt-5 mb-8 rounded-md bg-[#f43f53]"
              onClick={deleteSelectedItemsHandler}
            >
              حذف
            </button>
            <button
              className="text-[#282828] font-[Vazir] text-sm md:text-base px-7 py-1.5 mt-5 mb-8 rounded-md bg-[#dfdfdf]"
              onClick={() => setIsShowDeleteAllModal(false)}
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteAllProductsModal;
