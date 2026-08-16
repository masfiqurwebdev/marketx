import { notFound } from "next/navigation";
import products from "../../../data/products";
import ProductDetails from "../../../components/products/ProductDetails";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}