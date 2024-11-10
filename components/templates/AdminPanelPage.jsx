import { useGetProducts } from "@/services/queries";
import React, { useEffect, useState } from "react";
import ProductCard from "../modules/ProductCard";
import EditModal from "../modules/EditModal";
import { useDeleteSelectedItems } from "@/services/mutation";
import useDebounce from "@/hooks/useDebounce";
import toast from "react-hot-toast";
import AddProductModal from "../modules/AddProductModal";
import DeleteAllProductsModal from "../modules/DeleteAllProductsModal";
import Loader from "../modules/Loader";
import { useRouter } from "next/router";

function AdminPanelPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isShowCheckedBox, setIsShowCheckedBox] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAddProductModal, setIsShowAddProductModal] = useState(false);
  const [isShowDeleteAllModal, setIsShowDeleteAllModal] = useState(false);
  const [ids, setids] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedQuery = useDebounce(searchValue, 500);
  const [page, setPage] = useState(1);
  const { data, error, isPending } = useGetProducts(page, debouncedQuery);
  const router = useRouter();
  const pageNumbers = [];

  for (let i = 1; i <= data?.data.totalPages; i++) {
    pageNumbers.push(i);
  }

  const { mutate } = useDeleteSelectedItems();
  const deleteSelectedItemsHandler = () => {
    const productsIds = {
      ids,
    };
    mutate(
      { data: productsIds },
      {
        onSuccess: () => {
          toast.success("کالاهای انتخاب شده با موفقیت حذف شدند");
          setIsShowDeleteAllModal(false);
        },
        onError: (error) => {
          if (error.status === 401) {
            toast.error("اعتبار توکن شما به اتمام رسیده است");
            router.push("/login");
          }
          setIsShowDeleteAllModal(false);
        },
      }
    );
  };
  useEffect(() => {
    if (debouncedQuery) {
    }
  }, [debouncedQuery]);

  const editHandler = (id) => {
    setIsShowEditModal(true);
    const products = data.data.data;
    const selectedProduct = products.find((product) => product.id === id);
    setSelectedProduct(selectedProduct);
  };
  if (isPending) return <Loader />;
  return (
    <div className="container mx-auto bg-transparent px-4 my-4 flex flex-col h-screen">
      <div className="bg-white w-full h-10 px-4 flex items-center border rounded-xl ">
        <div className="flex items-center gap-2 w-full">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="#282828"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="#282828"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            className="outline-none font-[Vazir] text-xs md:text-sm w-full"
            type="text"
            name=""
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="جستجو کالا"
          />
        </div>
      </div>

      {!error ? (
        <>
          <div className="flex justify-between items-center mt-7 py-1">
            <div className="flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4624 23.125V18.25"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4624 9.3125V6.875"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.4624 15.8125C21.2573 15.8125 22.7124 14.3574 22.7124 12.5625C22.7124 10.7676 21.2573 9.3125 19.4624 9.3125C17.6675 9.3125 16.2124 10.7676 16.2124 12.5625C16.2124 14.3574 17.6675 15.8125 19.4624 15.8125Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5376 23.125V20.6875"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5376 11.75V6.875"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5376 20.6875C12.3325 20.6875 13.7876 19.2324 13.7876 17.4375C13.7876 15.6426 12.3325 14.1875 10.5376 14.1875C8.74267 14.1875 7.2876 15.6426 7.2876 17.4375C7.2876 19.2324 8.74267 20.6875 10.5376 20.6875Z"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-[Vazir] text-sm md:text-base md:font-bold text-[#282828]">
                مدیریت کالا
              </span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <button
                className="px-4 py-2 cursor-pointer bg-red-400 font-[Vazir] text-xs md:text-sm text-white flex justify-center items-center text-center rounded-lg"
                onClick={() => {
                  setIsShowCheckedBox((prev) => !prev);
                  setids([]);
                }}
              >
                حذف گروهی محصولات
              </button>
              <button
                className="px-4 py-2 cursor-pointer bg-[#55A3F0] font-[Vazir] text-xs md:text-sm text-white flex justify-center items-center text-center rounded-lg"
                onClick={() => setIsShowAddProductModal(true)}
              >
                افزودن محصول
              </button>
            </div>
          </div>
          <div className="overflow-auto rounded-2xl border border-[#ddd] mt-12">
            <table className="w-full table-fixed border-collapse font-[Vazir]">
              <thead className="bg-[#f2f2f2] border-b border-[#ddd]">
                <tr>
                  {isShowCheckedBox && (
                    <th className="w-10 md:w-4 p-3 text-xs md:text-sm font-semibold tracking-wide text-center">
                      {!!ids.length && isShowCheckedBox ? (
                        <button
                          title="حذف محصولات انتخاب شده"
                          className="flex justify-center items-center w-full"
                          onClick={() => setIsShowDeleteAllModal(true)}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.5 4.98333C14.725 4.70833 11.9333 4.56666 9.15 4.56666C7.5 4.56666 5.85 4.65 4.2 4.81666L2.5 4.98333"
                              stroke="#F43F5E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.08325 4.14167L7.26659 3.05C7.39992 2.25833 7.49992 1.66667 8.90825 1.66667H11.0916C12.4999 1.66667 12.6083 2.29167 12.7333 3.05833L12.9166 4.14167"
                              stroke="#F43F5E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.7082 7.61667L15.1665 16.0083C15.0748 17.3167 14.9998 18.3333 12.6748 18.3333H7.32484C4.99984 18.3333 4.92484 17.3167 4.83317 16.0083L4.2915 7.61667"
                              stroke="#F43F5E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.6084 13.75H11.3834"
                              stroke="#F43F5E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.91675 10.4167H12.0834"
                              stroke="#F43F5E"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      ) : null}
                    </th>
                  )}
                  <th className="p-3 w-20 text-xs md:text-sm font-semibold tracking-wide text-center">
                    نام کالا
                  </th>
                  <th className="p-3 w-20 text-xs md:text-sm font-semibold tracking-wide text-center">
                    موجودی
                  </th>
                  <th className="p-3 w-20 text-xs md:text-sm font-semibold tracking-wide text-center">
                    قیمت
                  </th>
                  <th className="p-3 w-32 text-xs md:text-sm font-semibold tracking-wide text-center overflow-hidden whitespace-nowrap text-ellipsis">
                    شناسه‌ی کالا
                  </th>
                  <th className="p-3 w-20 text-xs md:text-sm font-semibold tracking-wide text-center"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#ddd]">
                {data?.data.data.map((product) => (
                  <ProductCard
                    key={product.id}
                    data={data}
                    product={product}
                    isShowCheckedBox={isShowCheckedBox}
                    setIsShowEditModal={setIsShowEditModal}
                    onEdit={editHandler}
                    ids={ids}
                    setids={setids}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex mx-auto px-4 my-4 w-full justify-center items-center text-lg text-pretty font-[Vazir] text-center">
          کالای مورد نظر یافت نشد!
        </div>
      )}

      {isShowAddProductModal && (
        <AddProductModal setIsShowAddProductModal={setIsShowAddProductModal} />
      )}

      <div className="flex justify-center items-center gap-4">
        {pageNumbers.map((number) => (
          <button
            className={`${
              page === number
                ? "bg-[#55a3f0] text-white rounded-full font-serif text-xl w-10 h-10 flex justify-center items-center p-2 mt-4"
                : "rounded-full border-2 border-[#8d8d8d] text-[#8d8d8d] font-serif text-xl w-10 h-10 flex justify-center items-center p-2 mt-4"
            }`}
            key={number}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}
      </div>

      {isShowEditModal && (
        <EditModal
          selectedProduct={selectedProduct}
          setIsShowEditModal={setIsShowEditModal}
        />
      )}
      {isShowDeleteAllModal && (
        <DeleteAllProductsModal
          setIsShowDeleteAllModal={setIsShowDeleteAllModal}
          deleteSelectedItemsHandler={deleteSelectedItemsHandler}
        />
      )}
    </div>
  );
}

export default AdminPanelPage;
