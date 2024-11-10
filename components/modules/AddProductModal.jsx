import { useAddProduct } from "@/services/mutation";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

function AddProductModal({ setIsShowAddProductModal }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [errors, setErrors] = useState({});
  const { mutate } = useAddProduct();
  const changeHandler = (e) => {
    setProduct((product) => ({
      ...product,
      [e.target.name]: e.target.value,
    }));
  };
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (product.name.trim() === "" || product.name == null) {
      validationErrors.name = "وارد کردن نام محصول الزامی است.";
    }
    if (product.price.trim() === "" || product.price == null) {
      validationErrors.price = "وارد کردن قیمت محصول الزامی است.";
    }
    if (product.quantity.trim() === "" || product.quantity == null) {
      validationErrors.quantity = "وارد کردن تعداد محصول الزامی است.";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      mutate(product, {
        onSuccess: () => {
          toast.success("محصول با موفقیت ثبت شد.");
          setIsShowAddProductModal(false);
        },
        onError: (error) => {
          console.log(error);

          if (error.status === 401) {
            toast.error("اعتبار توکن شما به اتمام رسیده است");
            router.push("/login");
          }
          setIsShowAddProductModal(false);
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
          <h3 className="font-semibold">ایجاد محصول جدید</h3>
          <div className="w-full mt-7">
            <label className="inline-block mb-1">نام کالا</label>
            <input
              className="rounded-lg bg-[#f2f2f2] px-1 py-2 w-full"
              type="text"
              name="name"
              value={product.name}
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
              value={product.quantity}
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
              value={product.price}
              onChange={changeHandler}
              placeholder="قیمت"
            />
            <p className="text-red-500 font-[Vazir] text-xs md:text-sm w-full mt-2 px-2">
              {errors.price}
            </p>
          </div>
          <div className="w-full flex justify-between items-center gap-2">
            <button
              className="w-1/2 bg-[#55A3F0] rounded-lg text-white font-[Vazir] text-sm md:text-base px-7 py-1.5 my-5"
              type="submit"
            >
              ایجاد
            </button>
            <button
              className="w-1/2 bg-[#dfdfdf] rounded-lg font-[Vazir] text-sm md:text-base px-7 py-1.5 my-5"
              onClick={() => setIsShowAddProductModal(false)}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProductModal;
