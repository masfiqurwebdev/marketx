export default function ProductDescription({ product }) {
  return (
    <section className="mt-12">
      <div className="border-b border-gray-200">
        <h2 className="inline-block border-b-2 border-emerald-500 pb-4 text-lg font-bold text-gray-900">
          Product Description
        </h2>
      </div>

      <div className="max-w-4xl py-6">
        <p className="text-sm leading-7 text-gray-500">
          The {product.name} is designed to deliver an excellent
          combination of style, performance, and reliability.
          Whether you're using it every day or for special
          occasions, this product is built to meet your needs.
        </p>

        <p className="mt-4 text-sm leading-7 text-gray-500">
          We carefully select products that provide great value
          and quality. Every item in our store goes through our
          quality selection process before being offered to
          customers.
        </p>

        <ul className="mt-6 space-y-3 text-sm text-gray-600">
          <li>✓ Premium quality materials</li>
          <li>✓ Modern and practical design</li>
          <li>✓ Excellent everyday performance</li>
          <li>✓ Carefully quality checked</li>
          <li>✓ Customer satisfaction focused</li>
        </ul>
      </div>
    </section>
  );
}