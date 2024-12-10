import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

const UploadProductPage = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    continents: 1,
    images: [],
  });

  const userData = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((pervState) => ({
      ...pervState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 백엔드에 요청보내고 백엔드에서 데이터베이스에 저장

    // 1. 백엔드에 요청보낼 body 생성
    const body = {
      writer: userData._id,
      ...product, // 나머지 state값 그대로 전달
    };
    // 2. 생성한 body를 /products 라우터로 보낸다(axiosInstance 이용)
    try {
      await axiosInstance.post("/products", body);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <secton>
      <div className="text-tenter m-7">
        <h1>예상 상품 업로드</h1>
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="title">이름</label>
          <input
            name="title"
            id="title"
            onChange={handleChange}
            value={product.title}
            className="w-full px-4 py-2 bg-white border rounded-md "
          />
        </div>

        <div className="mt-4">
          <label htmlFor="description">설명</label>
          <input
            name="description"
            id="description"
            onChange={handleChange}
            value={product.description}
            className="w-full px-4 py-2 bg-white border rounded-md "
          />
        </div>

        <div className="mt-4">
          <label htmlFor="price">가격</label>
          <input
            name="price"
            id="price"
            type="number"
            onChange={handleChange}
            value={product.price}
            className="w-full px-4 py-2 bg-white border rounded-md "
          />
        </div>

        <div className="mt-4">
          <label htmlFor="continents">지역</label>
          <select
            className="w-full px-4 mt-2 bg-white border rounded-md"
            name="continents"
            id="continents"
            onChange={handleChange}
            value={product.continents}
          >
            {continents.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 text-white bg-black rounded-md hover:bg-gray-700 py-2"
          >
            생성하기
          </button>
        </div>
      </form>
    </secton>
  );
};

export default UploadProductPage;
