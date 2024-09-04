import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EditProductModal from "./EditProductModal"; // Adjust the import path as needed

const ProductDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {}; // Use destructuring to get the product
  
    const [selectedImage, setSelectedImage] = useState(product?.thumbnail);
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(product);
  
    const handleGoBack = () => {
      navigate("/");
    };
  
    const handleEditClick = () => {
      setEditProduct(product); // Set the product data to be edited
      setEditModalOpen(true); // Open the modal
    };
  
    const handleSaveEdit = (updatedProduct) => {
      setEditProduct(updatedProduct); // Update the product state with edited data
      setEditModalOpen(false); // Close the modal
    };
  
    if (!product) {
      return <div>Product not found!</div>;
    }
  
    const colorOptions = product.colors || ["#000000", "#FFFFFF", "#FF0000"];
    const imageOptions = product.images || [product.thumbnail];
  
    return (
      <div
        className="bg-slate-800 py-10 min-h-screen grid place-items-center bg-cover bg-center"
        style={{
          backgroundImage: "url(https://example.com/your-background-image.jpg)",
        }}
      >
        <div className="w-full max-w-4xl px-4 bg-white p-6 rounded shadow-lg">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleGoBack}
            className="bg-gray-600 text-white py-2 px-4 rounded mb-4 hover:bg-gray-700 transition duration-300"
          >
            Go Back
          </motion.button>
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
           
            <div className="flex flex-col items-center sm:items-start sm:ml-8 mt-4 sm:mt-0 sm:w-3/5 w-full">
              <h2 className="text-2xl font-bold mb-2">{editProduct.brand || editProduct.title}</h2>
              <p className="text-gray-700 mb-2">Category: {editProduct.category}</p>
              <p className="text-gray-700 mb-2">Price: ${editProduct.price}</p>
              <p className="text-gray-700 mb-2">Discount: {editProduct.discountPercentage}%</p>
              <p className="text-gray-700 mb-4 text-center sm:text-left">{editProduct.description}</p>
  
              
              <button
                onClick={handleEditClick}
                className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition duration-300"
              >
                Edit
              </button>
            </div>
          </div>
  
          {/* Edit Product Modal */}
          <EditProductModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            product={editProduct}
            onSave={handleSaveEdit}
          />
        </div>
      </div>
    );
  };
  
  export default ProductDetailsPage;
  
