import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from the backend when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/cart/user/6717d0c74c3acd439bb4d498"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCartItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/update/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/remove/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2 className="h1">My Cart</h2>
        <a
          href="#"
          className="btn btn-link text-decoration-none text-dark fw-bold"
        >
          &lt; Continue Shopping
        </a>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center">There are no items in your cart.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th className="text-secondary">Product</th>
                <th className="text-secondary">Product Name</th>
                <th className="text-secondary">Quantity</th>
                <th className="text-secondary">Remove</th>
                <th className="text-secondary">Price</th>
                <th className="text-secondary">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={`${item.brand} ${item.productName}`}
                      className="img-fluid"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td className="text-dark fw-bold">
                    {item.productName} <br />
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-light p-2 mx-1"
                        style={{ backgroundColor: "#ff0000", color: "#fff" }}
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-light p-2 mx-1"
                        style={{ backgroundColor: "#a1a1a2", color: "#fff" }}
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item._id, item.quantity - 1);
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-light"
                      onClick={() => removeItem(item._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                  <td>Rs. {item.price.toLocaleString()}</td>
                  <td>Rs. {(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between mt-3">
            <h4>Total Price:</h4>
            <h4>Rs. {getTotalPrice().toLocaleString()}</h4>
          </div>
        </>
      )}

      <div className="d-flex mt-3">
        <button
          className="btn btn-lg w-full"
          style={{
            backgroundColor: "#ff0000",
            color: "#fff",
            borderRadius: "0", // Remove border roundness
            transition: "background-color 0.3s ease", // Add transition for hover animation
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#d00000")} // Darker red on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff0000")} // Original color when not hovered
        >
          Check Out
        </button>
      </div>
      <br />
    </div>
  );
};

export default Cart;
