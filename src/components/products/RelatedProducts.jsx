import products from "../../data/products";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ product }) {
  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="mb-6">
        <p className="text-sm font-semibold text-emerald-500">
          You may also like
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-900">
          Related Products
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </section>
  );
}