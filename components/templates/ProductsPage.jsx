import React, { useEffect, useState } from "react";
import CartIcon from "../icons/CartIcon";
import SearchIcon from "../icons/SearchIcon";
import Card from "../modules/Card";

function ProductsPage({ products, totalPages }) {
  const pageNumbers = [];
  const [searchValue, setSearchValue] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setDisplayedProducts(filteredProducts);
  }, [searchValue]);

  useEffect(() => {
    setDisplayedProducts(products);
  }, [products]);

  return (
    <div className="bg-[#eff3f6] rounded-xl p-4">
      <div className="flex justify-between bg-white border border-1 rounded-xl py-2 px-3 md:px-5 items-center min-h-11">
        <div className="flex flex-1 items-center gap-1 md:gap-3 bg-white">
          <SearchIcon />
          <input
            value={searchValue}
            type="text"
            placeholder="Search"
            className="w-full outline-none"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <CartIcon />
      </div>
      <div className="flex justify-around lg:justify-between items-center gap-y-8 flex-wrap my-10 max-w-[1200px] ">
        {displayedProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
