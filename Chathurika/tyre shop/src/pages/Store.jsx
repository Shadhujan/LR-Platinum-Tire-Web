import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    brand: "Yamaha",
    model: "R1M",
    price: 8000000,
    imageUrl: "/bike-card.png",
    category: "Bikes",
  },
  {
    id: 2,
    brand: "Kawasaki",
    model: "Ninja ZX-10R",
    price: 7500000,
    imageUrl: "/bike-card.png",
    category: "Tyres",
  },
  {
    id: 3,
    brand: "Ducati",
    model: "Panigale V4",
    price: 9000000,
    imageUrl: "/bike-card.png",
    category: "Gears & Accessories",
  },
  {
    id: 4,
    brand: "BMW",
    model: "S1000RR",
    price: 8500000,
    category: "Gears & Accessories",
    imageUrl: "/bike-card.png",
  },
  {
    id: 5,
    brand: "Yamaha",
    model: "R1M",
    price: 8000000,
    category: "Gears & Accessories",
    imageUrl: "/bike-card.png",
  },
  {
    id: 6,
    brand: "Yamaha",
    model: "R1M",
    price: 8000000,
    imageUrl: "/bike-card.png",
    category: "Tyres",
  },
  {
    id: 7,
    brand: "Yamaha",
    model: "R1M",
    price: 8000000,
    imageUrl: "/bike-card.png",
    category: "Tyres",
  },
  {
    id: 8,
    brand: "Yamaha",
    model: "R1M",
    price: 8000000,
    imageUrl: "/bike-card.png",
    category: "Tyres",
  },
  {
    id: 9,
    brand: "Yamaha",
    model: "R1M",
    price: 8000000,
    imageUrl: "/bike-card.png",
    category: "Tyres",
  },
  {
    id: 10,
    brand: "Yamaha",
    model: "R1M",
    price: 8000000,
    imageUrl: "/bike-card.png",
    category: "Bikes",
  },
];
function Store() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Bikes");

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  const handleCategory = (id) => {
    switch (id) {
      case 1:
        console.log("Bikes");
        setCategory("Bikes");
        break;
      case 2:
        console.log("Tyres");
        setCategory("Tyres");
        break;
      case 3:
        console.log("Gears & Accessories");
        setCategory("Gears & Accessories");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="">
        <div className="max-w-max h-">
          <div className="flex w-full justify-evenly mb-3 bg-slate-50 ">
            <div className="flex-1 justify-center flex">
              <img
                src="/bike-banner.png"
                alt="banner"
                className="w-[450px] h-fit "
              />
            </div>
            <div className="text-right flex-1 pr-5">
              <h1 className="text-[#ff0000] font-extrabold text-6xl leading-relaxed italic">
                LR PLATINUM TYRE
              </h1>
              <p className="font-bold p-5">
                At our dealership, we pride ourselves on being your official
                motorcycle dealership partner. With a wide selection of top
                brands, expert service, and a passion for riding, we are
                dedicated to meeting all your motorcycle needs. Whether you`re
                looking for a new ride, quality parts, or professional
                maintenance, our knowledgeable team is here to support you every
                mile of the way. Ride with confidence, knowing you have a
                trusted partner by your side.
              </p>
              <div className="flex flex-wrap justify-end">
                <img src="/logo/1.png" alt="" className="h-20" />
                <img src="/logo/2.png" alt="" className="h-20" />
                <img src="/logo/3.png" alt="" className="h-20" />
                <img src="/logo/5.png" alt="" className="h-20" />
                <img src="/logo/4.jpeg" alt="" className="h-20" />
                <img src="/logo/6.png" alt="" className="h-28" />
                <img src="/logo/8.png" alt="" className="h-28" />
                <img src="/logo/7.png" alt="" className="h-28" />
                <img src="/logo/9.png" alt="" className="h-20" />
                <img src="/logo/10.png" alt="" className="h-32" />
                <img src="/logo/11.png" alt="" className="h-32" />
                <img src="/logo/13.png" alt="" className="h-32" />
              </div>
              <div className="w-full flex justify-center leading-loose h-fit pt-4">
                <button className="bg-[#FF0000] p-1 mb-2 text-white justify-center flex align-middle items-center gap-2 pl-3 pr-3">
                  CONTACT US
                  <Icon icon="carbon:next-filled" style={{ color: "white" }} />
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex justify-between p-3 font-bold text-lg">
            <div className="flex-1">In Stock</div>
            <div className="flex  flex-1 justify-evenly">
              <p className="" onClick={() => handleCategory(1)}>
                Bikes
              </p>
              <p className="" onClick={() => handleCategory(2)}>
                Tyres
              </p>
              <p className="" onClick={() => handleCategory(3)}>
                Gears & Accessories
              </p>
              <Icon icon="ic:round-menu" style={{ color: "black" }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-5 mt-2 p-3 justify-center">
            {filteredProducts.map((product) => (
              <div
                className="border border-1 w-fit p-3 shadow-none hover:shadow-lg duration-300 transition-all font-bold"
                key={product.id}
                onClick={() => {
                  localStorage.setItem(
                    "selectedProduct",
                    JSON.stringify(product)
                  );
                  navigate(`/store/${product.id}`);
                }}
              >
                <img
                  src="/bike-card.png"
                  alt={product.model}
                  className="w-60 h-max-60"
                />
                <div className="flex justify-between">
                  <p>{product.brand}</p>
                  <p>Rs. {product.price.toLocaleString()}</p>
                </div>
                <p className="mb-2">{product.model}</p>
                <button className="bg-[#ff0000] pl-5 pr-5 pt-0 pb-0 text-white hover:bg-red-500">
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[600px] bg-gradient-to-bl from-[#000000] via-[#212121] to-[#000000]">
        <div className="flex w-full text-white  align-middle  p-20">
          <div>
            <h1 className="flex-1 w-full outline-text text-8xl font-bold mr-5">
              SHOP
            </h1>
            <h1 className="flex-1 outline-text text-8xl font-bold mt-4 ml-10">
              MORE
            </h1>
            <div className=" -translate-y-28">
              <img className=" ml-10 " src="/ad-bike.png" alt="banner bike" />
              <div className="">
                <ul className="flex text-white ml-10 justify-evenly ">
                  <li>• 999cc</li>
                  <li>• 199 bhp</li>
                  <li>• 188 mph</li>
                  <li>• 16v, inline four</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-80 flex-1 justify-center items-center flex flex-col">
            <div className="flex flex-wrap justify-center ">
              <img src="/hel-1.png" className="w-44" alt="" />
              <img src="/hel-2.png" className="w-44" alt="" />
              <img src="/hel-3.png" className="w-44" alt="" />
            </div>
            <div className="w-[500px] font-bold  text-lg">
              <p>BMW s100rr</p>
              <p>
                The BMW SIOOORR (2015-2019) is a high- performance sportbike
                with a 999cc engine delivering up to 199 horsepower. It features
                advanced electronics, including multiple riding modes and
                dynamic traction control, for a customizable ride. Known for its
                aggressive design and exceptional handling, it`s a favorite
                among enthusiasts and racers for both track and road use.
              </p>
              <div className="w-full flex justify-center leading-loose h-fit pt-4">
                <button className="bg-[#FF0000] mb-2 text-white justify-center flex align-middle items-center gap-2 pl-3 pr-3">
                  EXPLORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
