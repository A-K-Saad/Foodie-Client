import React, { useState } from "react";
import Ripple from "material-ripple-effects";
import Alert from "../../../hooks/Alert";
import UploadImage from "../../../hooks/UploadImage";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const { sweetAlert, fireToast } = Alert();
  const ripple = new Ripple();
  const { uploadImage } = UploadImage();

  const handleProduct = async (e) => {
    setIsAdding(true);
    e.preventDefault();
    fetch("https://foodie-mart-aks.onrender.com/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        price: parseFloat(price),
        category: category,
        description: description,
        photo: photo,
      }),
    })
      .then(() => {
        e.target.reset();
        setIsAdding(false);
        fireToast("success", "Added Product Successfully!");
      })
      .catch(() => {
        sweetAlert("error", "OOPS!", "Failed To Add Product!");
      });
  };

  return (
    <div className="p-2 md:p-8 m-auto">
      <form onSubmit={handleProduct} className="m-auto bg-white p-7 shadow-sm">
        <label className="block text-sm font-bold mb-2 mt-4" htmlFor="name">
          Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter Product Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label className="block text-sm font-bold mb-2 mt-4" htmlFor="price">
          Price:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          min="0"
          step="any"
          placeholder="Enter Product Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label className="block text-sm font-bold mb-2 mt-4" htmlFor="category">
          Category:
        </label>
        <select
          className="form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          defaultValue="Select The Product Category"
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled defaultValue>
            Select The Product Category
          </option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Delicatessens">Delicatessens</option>
          <option value="Beverage">Beverage</option>
        </select>
        <label
          className="block text-sm font-bold mb-2 mt-4"
          htmlFor="description"
        >
          Description:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          placeholder="Enter Product Description"
          required
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="photo" className="block text-sm font-bold mb-2 mt-4">
          Product Image:
        </label>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer">
          <i className="fas fa-cloud-upload-alt mr-2"></i>
          <input
            id="photo"
            onMouseUp={(e) => ripple.create(e, "light")}
            type="file"
            className="custom-file-input cursor-pointer"
            onChange={(e) => {
              uploadImage(e.target.files[0], setPhoto);
              e.target.click();
            }}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center mt-4"
          type="submit"
          onMouseUp={(e) => ripple.create(e, "light")}
        >
          {!isAdding ? (
            "Add Product"
          ) : (
            <img
              src="https://i.ibb.co/nkCByxZ/loader.gif"
              alt="Loading"
              className="w-6 m-auto"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
