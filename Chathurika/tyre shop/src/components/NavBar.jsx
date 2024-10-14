import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-between bg-white h-20 items-center align-middle p-5 text-lg">
      <div>
        <img
          src="/logo.png"
          className="w-16"
          alt=""
          onClick={() => {
            navigate("/admin/store");
          }}
        />
      </div>
      <div className="flex flex-row gap-6">
        <div>
          <a href="/">HOME</a>
        </div>
        <div>
          <a href="/store">STORE</a>
        </div>
        <div>
          <a href="/contact-us">CONTACT</a>
        </div>
        <div className="flex justify-center align-middle items-center">
          <Icon icon="mdi:cart" style={{ color: "black" }} className="" />
        </div>
        <div className="flex items-center align-middle justify-center">
          <Icon icon="tabler:search" style={{ color: "black" }} />
        </div>
        <div className="flex items-center align-middle justify-center">
          <Icon icon="mdi:account" style={{ color: "black" }} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
