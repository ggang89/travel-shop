import ImageGallery from 'react-image-gallery';
import { useEffect, useState } from 'react';

const ProductImage = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      let images = [];

      product.images.map(imageName => {
        return images.push({
          oroginal:`${import.meta.env.VITE_SERVER_URL}/${imageName}`,
          thumbnail:`${import.meta.env.VITE_SERVER_URL}/${imageName}`
        })
      })
      setImages(images)
      
    }
  },[product])
  return <ImageGallery item={images} />;
}

export default ProductImage