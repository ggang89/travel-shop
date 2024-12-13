import { useEffect, useState } from "react";
import CardItem from "./Sections/CardItem";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchInput from "./Sections/SearchInput";
import axiosInstance from "../../utils/axios";

const LandingPage = () => {
  // skip. limit은 몽고디비에서 제공해주는 메소드
  const limit = 4;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    fetchProducts({skip,limit})
  },[])

  const fetchProducts = async ({ skip, limit, loadMore = false, filters = {}, searchTerm = "" }) => {
    const params = {
      skip,
      limit,
      filters,
      searchTerm
    }
    try {
      const response = await axiosInstance.get('/products', { params })
      console.log("params",params)
      if (loadMore) {
        setProducts([...products, ...response.data.products])
        console.log("product", products);
      } else {
        setProducts(response.data.product);
        console.log("product", products);
     }
      setHasMore(response.data.hasMore);
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      filters
    }
    fetchProducts(body);
    setSkip(skip+limit)
  }

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">여행 상품 사이트</h2>
      </div>

      {/* filter */}
      <div className="flex gap-3">
        <div className="w-1/2">
          <CheckBox />
        </div>
        <div className="w-1/2">
          <RadioBox />
        </div>
      </div>

      {/* search */}
      <div className="flex justify-end ">
        <SearchInput />
      </div>

      {/* card */}
      <div className="grid gird-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product) => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>

      {/* loadMore */}

      {hasMore && 
        <div className="flex justify-center mt-5">
          <button onClick={handleLoadMore } className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500">
            더보기
          </button>
        </div>
      }
    </section>
  );
};

export default LandingPage;
