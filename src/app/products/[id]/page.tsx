import { getProductsDetails } from "@/app/actions/products.action";
import ProductDetailsComps from "@/components/products-comps/ProductDetailsComps";
import React from "react";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const productDetailsResult = await getProductsDetails(id);
  const productDetails = productDetailsResult?.data;

  return (
    <div className="container mx-auto my-8">
      <ProductDetailsComps productDetails={productDetails} />
    </div>
  );
}
