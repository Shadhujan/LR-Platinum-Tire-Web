import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDescription() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/products/products/${product._id}`
        );
        alert("Product deleted successfully");
        navigate("/admin/store");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
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
            {product.name}
            <span className="pl-5 ">{product.brand}</span>
          </h1>
          <h3 className="pb-4 text-3xl">
            Rs. {Number(product.price).toLocaleString()}
          </h3>
          <p>{product.description}</p>

          <div className="flex">
            <button
              className="bg-[#ff0000] text-white pl-3 pr-3 pt-1 pb-1 w-full ml-0 m-4 hover:bg-[#ff1010]"
              onClick={() => navigate(`/admin/store/${product._id}`)}
            >
              Edit
            </button>
            <button
              className="bg-[#ff0000] text-white pl-3 pr-3 pt-1 pb-1 w-full ml-0 m-4 hover:bg-[#ff1010]"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-black text-white pl-3 pr-3 pt-1 pb-1 w-full ml-0 m-4 hover:bg-[#333]"
              onClick={() => navigate("/admin/store")}
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
