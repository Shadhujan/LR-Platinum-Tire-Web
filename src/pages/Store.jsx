import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";




function Store() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Bikes");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/products"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <>
      <div>
  <div>
    <div>
      <div>
        <img src="/bike-banner.png" alt="banner" width="300" height="auto" />
      </div>
      <div>
        <h1>LR PLATINUM TYRE</h1>
        <p>
          At our dealership, we pride ourselves on being your official
          motorcycle dealership partner. With a wide selection of top brands,
          expert service, and a passion for riding, we are dedicated to meeting
          all your motorcycle needs. Whether you're looking for a new ride,
          quality parts, or professional maintenance, our knowledgeable team is
          here to support you every mile of the way. Ride with confidence,
          knowing you have a trusted partner by your side.
        </p>
        <div>
          <img src="/logo/1.png" alt="" width="50" height="auto" />
          <img src="/logo/2.png" alt="" width="50" height="auto" />
          <img src="/logo/3.png" alt="" width="50" height="auto" />
          <img src="/logo/5.png" alt="" width="50" height="auto" />
          <img src="/logo/4.jpeg" alt="" width="50" height="auto" />
          <img src="/logo/6.png" alt="" width="50" height="auto" />
          <img src="/logo/8.png" alt="" width="50" height="auto" />
          <img src="/logo/7.png" alt="" width="50" height="auto" />
          <img src="/logo/9.png" alt="" width="50" height="auto" />
          <img src="/logo/10.png" alt="" width="50" height="auto" />
          <img src="/logo/11.png" alt="" width="50" height="auto" />
          <img src="/logo/13.png" alt="" width="50" height="auto" />
        </div>
        <div>
          <button>CONTACT US</button>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <div>In Stock</div>
      <div>
        <p onClick={() => handleCategory(1)}>Bikes</p>
        <p onClick={() => handleCategory(2)}>Tyres</p>
        <p onClick={() => handleCategory(3)}>Gears & Accessories</p>
      </div>
    </div>
    <div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} onClick={() => {
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            navigate(`/store/${product._id}`);
          }}>
            <img
              src={product.images || "/default-image.png"}
              alt={product.model}
              width="150"
              height="auto"
            />
            <div>
              <p>{product.brand}</p>
              <p>Rs. {product.price.toLocaleString()}</p>
            </div>
            <p>{product.model}</p>
            <button>Explore</button>
          </div>
        ))
      ) : (
        <p>No products available in this category.</p>
      )}
    </div>
  </div>
</div>

<div>
  <div>
    <div>
      <h1>SHOP</h1>
      <h1>MORE</h1>
      <div>
        <img src="/ad-bike.png" alt="banner bike" width="300" height="auto" />
        <div>
          <ul>
            <li>• 999cc</li>
            <li>• 199 bhp</li>
            <li>• 188 mph</li>
            <li>• 16v, inline four</li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <div>
        <img src="/hel-1.png" alt="" width="100" height="auto" />
        <img src="/hel-2.png" alt="" width="100" height="auto" />
        <img src="/hel-3.png" alt="" width="100" height="auto" />
      </div>
      <div>
        <p>BMW s100rr</p>
        <p>
          The BMW S1000RR (2015-2019) is a high-performance sportbike with a
          999cc engine delivering up to 199 horsepower. It features advanced
          electronics, including multiple riding modes and dynamic traction
          control, for a customizable ride. Known for its aggressive design and
          exceptional handling, it's a favorite among enthusiasts and racers for
          both track and road use.
        </p>
        <div>
          <button>EXPLORE</button>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default Store;
