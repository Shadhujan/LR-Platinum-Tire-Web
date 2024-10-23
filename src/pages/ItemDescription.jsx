import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ItemDescription() {
  const navigate = useNavigate();
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const [quantity, setQuantity] = useState(1); // Adjust quantity based on user input

  console.log(product.images);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        userId: "6717d0c74c3acd439bb4d498", // Replace with actual user ID
        productId: product._id,
        productName: product.brand,
        image: product.images,
        quantity: quantity,
        price: product.price,
      });

      console.log("Item added to cart:", response.data);

      // Navigate to the cart page or show a success message
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-10 align-middle border border-1 p-10">
        <div className="flex-1 flex justify-end">
          <img
            src={product.images}
            alt={product.model}
            className="w-full h-fit"
          />
        </div>
        <div className="flex-1 font-bold">
          <h1 className="mb-5 text-3xl">
            {product.brand}
            <span className="pl-5 ">{product.model}</span>
          </h1>
          <h3 className="pb-4 text-3xl">
            Rs. {Number(product.price).toLocaleString()}
          </h3>
          <p>{product.description}</p>
          <button
            className="bg-[#ff0000] text-white pl-3 pr-3 pt-1 pb-1 w-full ml-0 m-4 hover:bg-[#ff1010]"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
            className="bg-black text-white pl-3 pr-3 pt-1 pb-1 w-full ml-0 m-4 hover:bg-[#333]"
            onClick={() => navigate("/store")}
          >
            Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDescription;
