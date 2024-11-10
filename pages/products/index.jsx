import ProductsPage from "@/components/templates/ProductsPage";
import { useEffect, useState } from "react";

function Products({ data }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data.data);
  }, []);

  return <ProductsPage products={products} />;
}

export default Products;

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/products`);
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 5,
  };
}
