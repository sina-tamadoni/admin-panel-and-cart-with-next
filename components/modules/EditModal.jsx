import { useEditProduct } from "@/services/mutation";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

function EditModal({ selectedProduct, setIsShowEditModal }) {
  const { id, name, price, quantity } = selectedProduct;
  const [editedProduct, setEditedProduct] = useState({
    id,
    name,
    price,
    quantity,
  });
  const [errors, setErrors] = useState({});
  const { mutate } = useEditProduct();
  const router = useRouter();

  const changeHandler = (e) => {
    setEditedProduct((product) => ({
      ...product,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (editedProduct.name.trim() === "" || editedProduct.name == null) {
      validationErrors.name = "وارد کردن نام محصول الزامی است.";
    }
    if (editedProduct.price.trim() === "" || editedProduct.price == null) {
      validationErrors.price = "وارد کردن قیمت محصول الزامی است.";
    }
    if (
      editedProduct.quantity.trim() === "" ||
      editedProduct.quantity == null
    ) {
      validationErrors.quantity = "وارد کردن تعداد محصول الزامی است.";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      mutate(editedProduct, {
        onSuccess: () => {
          toast.success("ویرایش با موفقیت انجام شد.");
          setIsShowEditModal(false);
        },
        onError: (error) => {
          if (error.status === 401) {
            toast.error("اعتبار توکن شما به اتمام رسیده است");
            router.push("/login");
          }
          setIsShowEditModal(false);
        },
      });
    }
  };

  return (
    <>
      <div className="w-screen h-screen fixed top-0 left-0 bg-gray-500 opacity-50"></div>

      <div className="backdrop-blur-sm fixed w-screen h-screen top-0 left-0 flex justify-center items-center">
        <form
          onSubmit={submitHandler}
          className="flex flex-col py-5 px-8 font-[Vazir] text-xs md:text-sm justify-center items-center bg-white w-[400px] m-auto rounded-xl"
        >
          <h3 className="font-semibold">ویرایش اطلاعات</h3>

          <div className="w-full mt-7">
            <label className="inline-block mb-1">نام کالا</label>
            <input
              className="rounded-lg bg-[#f2f2f2] px-1 py-2 w-full"
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={changeHandler}
              placeholder="نام کالا"
            />
            <p className="text-red-500 font-[Vazir] text-xs md:text-sm w-full mt-2 px-2">
              {errors.name}
            </p>
          </div>

          <div className="w-full mt-5">
            <label className="inline-block mb-1">تعداد موجودی</label>
            <input
              className="rounded-lg bg-[#f2f2f2] px-1 py-2 w-full"
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={changeHandler}
              placeholder="تعداد"
            />
            <p className="text-red-500 font-[Vazir] text-xs md:text-sm w-full mt-2 px-2">
              {errors.quantity}
            </p>
          </div>

          <div className="w-full mt-5">
            <label className="inline-block mb-1">قیمت</label>
            <input
              className="rounded-lg bg-[#f2f2f2] px-1 py-2 w-full"
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={changeHandler}
              placeholder="قیمت"
            />
            <p className="text-red-500 font-[Vazir] text-xs md:text-sm w-full mt-2 px-2">
              {errors.price}
            </p>
          </div>

          <div className="w-full flex justify-between items-center gap-2">
            <button
              className="w-1/2 bg-[#55A3F0] rounded-lg text-white font-[Vazir] text-xs md:text-sm px-7 py-2 my-5"
              type="submit"
            >
              ثبت اطلاعات جدید
            </button>
            <button
              className="w-1/2 bg-[#dfdfdf] rounded-lg font-[Vazir] text-xs md:text-sm px-7 py-2 my-5"
              onClick={() => setIsShowEditModal(false)}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditModal;
