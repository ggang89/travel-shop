import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ProductImage from "./sections/ProductImage";
import ProductInfo from "./sections/ProductInfo";

const DetailProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance.get(
          `/products/${productId}?type=single`
        );
        console.log("Response",response);
        setProduct(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct()
  }, [productId]);

  if (!product) return null;

  return (
    <section>
      <div className="text-center">
        <h1 className="p-4 text-2xl">{product.title}</h1>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          {/* productImage */}
          <ProductImage product={product} />
        </div>
        <div className="w-1/2">
          {/* productInfo */}
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
};

export default DetailProductPage;
