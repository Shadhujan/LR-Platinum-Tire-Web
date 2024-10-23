import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function AddProduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [images, setImages] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    console.log("HEre 33");

    if (selectedFile) {
      console.log("HEre");

      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      setLoading(true);
      try {
        const snapshot = await fileRef.put(selectedFile);
        const url = await snapshot.ref.getDownloadURL();
        setImages(url);
        console.log(url);
        "File uploaded successfully:", url;
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        brand,
        price,
        description,
        images, // this should be a URL after upload
        productType,
      };

      // Send POST request to backend
      await axios.post("http://localhost:5000/api/products/add", productData);
      navigate("/admin/store");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="flex flex-col pt-0 p-24 justify-center m-auto w-full">
      <h1 className="font-bold text-3xl translate-x-52">Add product</h1>
      <hr className="w-[800px] translate-x-52" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col font-bold justify-center mt-4 text-m m-auto"
      >
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-black border-2 border-slate-300 p-1 rounded-lg w-[800px]"
          required
        />

        <label htmlFor="Brand">Brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="outline-black border-2 border-slate-300 p-1 rounded-lg w-[800px]"
          required
        />

        <label htmlFor="Price">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="outline-black border-2 border-slate-300 p-1 rounded-lg w-[800px]"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="outline-black border-2 border-slate-300 p-1 rounded-lg w-[800px]"
          rows={5}
          required
        />

        <label htmlFor="productType">Product Type</label>
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="outline-black border-2 border-slate-300 p-1 rounded-lg w-[800px]"
          required
        >
          <option value="">Select a type</option>
          <option value="Gears & Accessories">Gears & Accessories</option>
          <option value="Tyres">Tyres</option>
          <option value="Bikes">Bikes</option>
        </select>

        <label htmlFor="Images">Images</label>
        <input
          type="file"
          name="imageData"
          accept="image/*"
          onChange={handleFileUpload}
          className="outline-none border-2 border-gray-100 rounded-lg p-1 w-fit mt-2"
        />

        {loading && <p>Uploading...</p>}
        <div className="flex justify-center">
          <button className="bg-[#ff0000] text-white pl-3 pr-3 pt-1 pb-1 w-96 ml-0 m-4 hover:bg-[#ff1010]">
            Add
          </button>
          <button
            type="button"
            className="bg-black text-white pl-3 pr-3 pt-1 pb-1 w-96 ml-0 m-4 hover:bg-[#ff1010]"
            onClick={() => navigate("/admin/store")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
