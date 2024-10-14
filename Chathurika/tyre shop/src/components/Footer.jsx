import { Icon } from "@iconify/react/dist/iconify.js";

function Footer() {
  return (
    <div>
      <div className="flex w-100 justify-evenly bg-[#1a1a1a] text-white pt-12 pb-12">
        <div>
          <p>MOTORCYCLES</p>
          <p>GEARS</p>
          <p>HELMETS</p>
          <p>SPARE PARTS</p>
        </div>
        <div>
          <p>EXPLORE/HELP</p>
          <p>STORE</p>
          <p>CONTACT</p>
          <p>ABOUT</p>
          <p>PRIVACY POLICY</p>
          <p>TERMS & CONDITIONS</p>
          <p>CAREERS</p>
        </div>
        <div>
          <p>SOCIAL MEDIA</p>
          <p className="flex items-center">
            <Icon
              className="flex align-middle items-center mr-2"
              icon="ic:outline-facebook"
            />
            FACEBOOK
          </p>
          <p className="flex items-center">
            <Icon
              icon="ri:instagram-fill"
              className="flex align-middle items-center mr-2"
            />
            INSTAGRAM
          </p>
          <p className="flex items-center">
            <Icon
              className="flex items-center mr-2"
              icon="mingcute:whatsapp-fill"
            />
            WHATSAPP
          </p>
          <p className="flex items-center mr-2">
            <Icon
              className="flex align-middle items-center mr-2"
              icon="mage:tiktok-circle"
            />
            TIKTOK
          </p>
        </div>
      </div>
      <div className="bg-black text-white flex justify-center items-center w-full h-10">
        © 2024 - LR PLATINUM TYRES. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
