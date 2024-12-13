import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import axiosInstance from "../utils/axios";

const FileUpload = ({ images, onImageChange }) => {
  const handleDrop = async (files) => {
    let formData = new FormData();

    const config = {
      // encype(제출된 폼 데이터의 인코딩 방법)의 속성값 중 하나로
      // <input type="file"> 경우 아래의 type 사용
      header: { "content-type": "multipart/form-data" }
    }

    formData.append("file", files[0]);

    try {
      const response = await axiosInstance.post(
        "/products/image",
        formData,
        config
      );
      // 기존에 있던 이미지 + 추가한 이미지의 이름을 넣은 새 배열을
      // product.images의 새 베열로 넣어줌
      onImageChange([...images, response.data.fileName]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  };

  return (
    <div className="flex gap-4">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="min-w-[300px] h-[300px] border flex items-center justify-center ">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-3xl cursor-pointer">➕</p>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              className="min-w-[300px] h-[300px]"
              src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
              alt={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  images: PropTypes.string,
  onImageChange: PropTypes.func,
};
