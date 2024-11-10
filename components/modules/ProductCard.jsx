import { useState } from "react";
import DeleteModal from "./DeleteModal";

function ProductCard({ product, onEdit, isShowCheckedBox, ids, setids }) {
  const { id, name, price, quantity } = product;
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);


  const selectHandler = (e, id) => {
    if (e.target.checked) {
      setids((prevProductsId) => [...prevProductsId, id]);
    } else {
      const filtered = ids.filter((productId) => productId !== id);
      setids(filtered);
    }
  };

  return (
    <>
      <tr key={id} className="">
        {isShowCheckedBox && (
          <td className="p-3 border-b border-[#ddd] text-center bg-blue-100">
            <input
              className="cursor-pointer"
              type="checkbox"
              name={name}
              id={id}
              onChange={(e) => selectHandler(e, id)}
            />
          </td>
        )}
        <td className="p-3 text-xs md:text-sm text-center">{name}</td>
        <td className="p-3 text-xs md:text-sm text-center">{quantity}</td>
        <td className="p-3 text-xs md:text-sm text-center">{price}</td>
        <td className="p-3 text-xs md:text-sm text-center overflow-hidden whitespace-nowrap text-ellipsis">
          {id}
        </td>
        <td className="p-3 text-xs md:text-sm text-center flex justify-center items-center gap-2">
          <button title="ویرایش" onClick={() => onEdit(id)}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.16675 1.66667H7.50008C3.33341 1.66667 1.66675 3.33333 1.66675 7.5V12.5C1.66675 16.6667 3.33341 18.3333 7.50008 18.3333H12.5001C16.6667 18.3333 18.3334 16.6667 18.3334 12.5V10.8333"
                stroke="#4ADE80"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3666 2.51666L6.7999 9.08333C6.5499 9.33333 6.2999 9.825 6.2499 10.1833L5.89157 12.6917C5.75823 13.6 6.3999 14.2333 7.30823 14.1083L9.81657 13.75C10.1666 13.7 10.6582 13.45 10.9166 13.2L17.4832 6.63333C18.6166 5.49999 19.1499 4.18333 17.4832 2.51666C15.8166 0.849995 14.4999 1.38333 13.3666 2.51666Z"
                stroke="#4ADE80"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.4248 3.45833C12.9831 5.45 14.5415 7.00833 16.5415 7.575"
                stroke="#4ADE80"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button title="حذف" onClick={() => setIsShowDeleteModal(true)}>
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
        </td>
      </tr>
      {isShowDeleteModal && (
        <DeleteModal id={id} setIsShowDeleteModal={setIsShowDeleteModal} />
      )}
    </>
  );
}

export default ProductCard;
