import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/inputs/Button";
import { api } from "~/utils/api";
import { USDollar } from "~/utils/currencies";

const Product = () => {
  const { data: sessionData } = useSession();
  const { data: products, isLoading } = api.product.getAllProduct.useQuery({
    userId: sessionData?.user.id as string,
  });
  const router = useRouter();

  if (isLoading) {
    <p>Loading.....</p>;
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product</h1>
        <Button
          label="Add Product"
          onCLick={() => void router.push("product/add-product")}
        />
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody className="border">
          {products &&
            products?.map((product) => {
              return (
                <tr key={product.id}>
                  <td className="flex items-center gap-3">
                    {product.image && (
                      <Image
                        src={`https://res.cloudinary.com/dscuoxn6m/image/upload/${product.image}`}
                        alt="Gambar"
                        width={50}
                        height={50}
                        className="object-cover w-12 h-12"
                      />
                    )}
                    {product.name}
                  </td>
                  <td>{product.sku}</td>
                  <td>{USDollar.format(product.price)}</td>
                  <td>{product.unit}</td>
                  <td>{product.category}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
