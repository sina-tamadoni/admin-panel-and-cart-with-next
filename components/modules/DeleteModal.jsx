import toast from "react-hot-toast";
import { useDeleteProduct } from "@/services/mutation";
import Close from "../icons/Close";
import { useRouter } from "next/router";

function DeleteModal({ id, setIsShowDeleteModal }) {
  const { mutate } = useDeleteProduct();
  const router = useRouter();
  const deleteHandler = (id) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("محصول مورد نظر با موفقیت حذف شد.");
        setIsShowDeleteModal(false);
      },
      onError: (error) => {
        if (error.status === 401) {
          toast.error("اعتبار توکن شما به اتمام رسیده است");
          router.push("/login");
        }
        setIsShowDeleteModal(false);
      },
    });
  };
  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 opacity-50"></div>
      <div className="backdrop-blur-sm fixed w-screen h-screen top-0 left-0 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white w-[400px] m-auto rounded-xl">
          <Close />
          <div className="font-[Vazir] mt-10 text-sm md:text-base">
            آیا از حذف این محصول اطمینان دارید؟
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              className="text-white font-[Vazir] text-sm md:text-base px-7 py-1.5 mt-5 mb-8 rounded-md bg-[#f43f53]"
              onClick={() => deleteHandler(id)}
            >
              حذف
            </button>
            <button
              className="text-[#282828] font-[Vazir] text-sm md:text-base px-7 py-1.5 mt-5 mb-8 rounded-md bg-[#dfdfdf]"
              onClick={() => setIsShowDeleteModal(false)}
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
