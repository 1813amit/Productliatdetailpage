import React, { useState } from "react";
import { motion } from "framer-motion";

const EditProductModal = ({ open, onClose, product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <label className="block mb-2">
          <span className="text-gray-700">Title</span>
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-700">Price</span>
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
          />
        </label>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
