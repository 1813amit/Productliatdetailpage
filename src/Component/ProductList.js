import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Visibility as EyeIcon } from '@mui/icons-material';

const theme = createTheme({
  typography: { fontFamily: "Poppins" },
  palette: {
    background: { paper: "#1e293b", default: "#0f172a" },
    mode: "dark",
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: { padding: "10px 4px" },
        body: { padding: "7px 15px", color: "#e2e8f0" },
      },
    },
  },
});

const EditProductModal = ({ open, onClose, product, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product || {});

  useEffect(() => {
    setUpdatedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-gray-800 p-5 rounded" style={{ margin: 'auto', maxWidth: 400 }}>
        <h2 className="text-white mb-4">Edit Product</h2>
        <TextField
          label="Brand"
          name="brand"
          value={updatedProduct?.brand || ""}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Category"
          name="category"
          value={updatedProduct?.category || ""}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={updatedProduct?.price || ""}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Discount Percentage"
          name="discountPercentage"
          type="number"
          value={updatedProduct?.discountPercentage || ""}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </Box>
    </Modal>
  );
};

const CreateProductModal = ({ open, onClose, onSave }) => {
  const [product, setProduct] = useState({
    id: null,
    name: "",
    brand: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(product);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-gray-800 p-5 rounded" style={{ margin: 'auto', maxWidth: 400 }}>
        <h2 className="text-white mb-4">Create Product</h2>
        <TextField
          label="Brand"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Discount Percentage"
          name="discountPercentage"
          type="number"
          value={product.discountPercentage}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Thumbnail URL"
          name="thumbnail"
          value={product.thumbnail}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </Box>
    </Modal>
  );
};

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { compareList = [] } = location.state || {};
  const [products, setProducts] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const processedData = data
            .filter(product => product.images && Array.isArray(product.images) && product.images.length > 0)
            .map((product, index) => ({
              ...product,
              displayId: index + 1,
              name: product.title,
              brand: product.brand || product.title,
              category: product.category.name,
              price: product.price,
              discountPercentage: product.discountPercentage || 0,
              thumbnail: product.images[0], // Verify that this is a valid image URL
            }));
          console.log("Processed Data:", processedData); // Debugging line
          setProducts(processedData);
        } else {
          console.error("Fetched data is not an array", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products", { position: "top-center" });
      });
  }, []);

  const handleEdit = (product) => {
    setEditProduct(product);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast.success("Product updated successfully", { position: "top-center" });
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    toast.success("Product deleted successfully", { position: "top-center" });
  };

  const handleCreate = () => {
    setCreateModalOpen(true);
  };

  const handleSaveNewProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setCreateModalOpen(false);
    toast.success("Product created successfully", { position: "top-center" });
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`, { state: { product: products.find(p => p.id === productId) } });
  };
  const placeholderImage = "https://via.placeholder.com/40"; // Placeholder image URL

  const columns = [
    { name: "displayId", label: "ID", options: { filter: false } },
    { name: "brand", label: "Name" },




    
    {
      name: "category",
      options: {
        customBodyRender: (value) => (
          <p
            className={`capitalize px-2 py-1 inline-block rounded-full text-sm ${
              value === "Electronics" ? "bg-pink-500" : "bg-blue-500"
            }`}
          >
            {value}
          </p>
        ),
      },
    },
    { name: "price" },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => {
          const product = products[tableMeta.rowIndex];
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="py-1 px-2 rounded text-sm bg-yellow-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="py-1 px-2 rounded text-sm bg-red-700 text-white"
              >
                Delete
              </button>
              <button
                onClick={() => handleViewDetails(product.id)}
                className="py-1 px-2 rounded text-sm bg-blue-500 text-white"
                title="View Details"
              >
                <EyeIcon />
              </button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    elevation: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    responsive: "standard",
    tableBodyHeight: "auto",
    tableBodyMaxHeight: "60vh",
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-slate-700 py-5 min-h-screen flex flex-col items-center sm:py-10">
        <div className="w-full max-w-4xl px-4 sm:w-10/12">
          <MUIDataTable
            title={"Product List"}
            data={products}
            columns={columns}
            options={options}
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={handleCreate}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Create Product
            </button>
          </div>
        </div>
        <ToastContainer />
        <EditProductModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={editProduct}
          onSave={handleSaveEdit}
        />
        <CreateProductModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSave={handleSaveNewProduct}
        />
      </div>
    </ThemeProvider>
  );
};

export default ProductList;




