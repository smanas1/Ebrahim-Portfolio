import React from "react";
import { useGetAllProductsQuery } from "../store/api";

const ProductPage: React.FC = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) {
    return <div className="p-4">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading products: {JSON.stringify(error)}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{product.productName}</h2>
            <p className="text-gray-600">{product.category}</p>
            <p className="mt-2">{product.productDetails}</p>
            <div className="mt-4">
              <p className="text-sm">
                <strong>MOQ:</strong> {product.moq}
              </p>
              <p className="text-sm">
                <strong>Cost of Goods:</strong> {product.costOfGoods}
              </p>
              <p className="text-sm">
                <strong>Sample Cost:</strong> {product.sampleCost}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
