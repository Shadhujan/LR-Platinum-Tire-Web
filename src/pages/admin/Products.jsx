import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [category, setCategory] = useState("Bikes"); // State for selected category
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products/products") // Replace with your actual backend API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); // Set the fetched products
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Stop loading on error
      });
  }, []);

  // Filter products based on selected category
  const filteredProducts = products.filter(
    (product) => product.productType === category
  );

  const handleCategory = (id) => {
    switch (id) {
      case 1:
        setCategory("Bikes");
        break;
      case 2:
        setCategory("Tyres");
        break;
      case 3:
        setCategory("Gears & Accessories");
        break;
      default:
        break;
    }
  };

  // Display loading or error state if applicable
  if (loading) {
    return <p className="text-center">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <hr />
      <div className="flex justify-between pl-16 p-3 font-bold text-lg">
        <Icon
          icon="icon-park-solid:add-one"
          style={{ color: "red",  marginRight:"90%"}}
          className="fixed bottom-5 right-5 text-4xl "
          onClick={() => navigate("/admin/add-product")}
        />
        <div className="flex-1">In Stock</div>
        <div className="flex  flex-1 justify-evenly">
          <p className="cursor-pointer" onClick={() => handleCategory(1)}>
            Bikes
          </p>
          <p className="cursor-pointer" onClick={() => handleCategory(2)}>
            Tyres
          </p>
          <p className="cursor-pointer" onClick={() => handleCategory(3)}>
            Gears & Accessories
          </p>
          <a href="http://localhost:5173/admin/add-product">
            <Icon icon="ic:round-menu" style={{ color: "black" }} />
          </a>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mt-2 p-3 border w-full justify-center items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              className="border border-1 w-fit p-3 shadow-none hover:shadow-lg duration-300 transition-all font-bold"
              key={product.id}
              onClick={() => {
                localStorage.setItem(
                  "selectedProduct",
                  JSON.stringify(product)
                );
              }}
            >
              <img
                src={product.images}
                alt={product.model}
                onClick={() => navigate(`/admin/store/${product._id}`)}
                className="w-60 h-max-60"
              />
              <div className="flex justify-between">
                <p>{product.brand}</p>
                <p>Rs. {product.price.toLocaleString()}</p>
              </div>
              <p className="mb-2">{product.model}</p>
              <button
                className="bg-[#ff0000] pl-5 pr-5 pt-0 pb-0 text-white hover:bg-red-500"
                onClick={() => navigate(`/admin/update-product/${product._id}`)}
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <p className="text-center font-bold text-lg">No items available</p>
        )}
      </div>
    </div>
  );
}

export default Products;
