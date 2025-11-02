/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "@/store/api";
import { Eye, Edit, Trash2, Plus, X } from "lucide-react";
import SidebarFilterComponent from "@/components/product/SidebarFilterComponent";

interface ProductFilters {
  category: string;
  minMoq: string;
  maxPrice: string;
  search: string;
  minSampleCost: string;
  maxSampleCost: string;
  minShipToUsa: string;
  maxShipToUsa: string;
  shipToUsaAvailable: "yes" | "no" | "";
  brandName: string;
  dateAdded: string;
}

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showProductModal, setShowProductModal] = useState(false);
  const [showViewProductModal, setShowViewProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [viewingProductId, setViewingProductId] = useState<string | null>(null);
  const [, setImagePreview] = useState<string | null>(null);
  const [multipleImagePreviews, setMultipleImagePreviews] = useState<string[]>(
    []
  );
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [productFilters, setProductFilters] = useState<ProductFilters>({
    category: "",
    minMoq: "",
    maxPrice: "",
    search: "",
    minSampleCost: "",
    maxSampleCost: "",
    minShipToUsa: "",
    maxShipToUsa: "",
    shipToUsaAvailable: "",
    brandName: "",
    dateAdded: "",
  });

  // Using the API to get products
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
    error: productsApiError,
  } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const {
    data: viewingProduct,
    isLoading: viewingProductLoading,
    isError: viewingProductError,
  } = useGetProductByIdQuery(viewingProductId || "", {
    skip: !viewingProductId,
  });

  // Filter products based on filters
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      // Search filter
      if (productFilters.search) {
        const searchTerm = productFilters.search.toLowerCase();
        const matchesSearch =
          product.productName?.toLowerCase().includes(searchTerm) ||
          product.productDetails?.toLowerCase().includes(searchTerm) ||
          product.category?.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (
        productFilters.category &&
        productFilters.category !== product.category
      ) {
        return false;
      }

      // Brand filter
      if (
        productFilters.brandName &&
        productFilters.brandName !== product.brandName
      ) {
        return false;
      }

      // MOQ filter
      if (productFilters.minMoq) {
        const minMoqValue = parseInt(productFilters.minMoq, 10);
        const productMoq = parseInt(product.moq, 10) || 0;
        if (productMoq < minMoqValue) return false;
      }

      // Price filter
      if (productFilters.maxPrice) {
        const maxPriceValue = parseFloat(productFilters.maxPrice);
        const productPrice = parseFloat(product.costOfGoods || "0");
        if (productPrice > maxPriceValue) return false;
      }

      // Sample cost filter
      if (productFilters.minSampleCost) {
        const minSampleValue = parseFloat(productFilters.minSampleCost);
        const productSample = parseFloat(product.sampleCost || "0");
        if (productSample < minSampleValue) return false;
      }
      if (productFilters.maxSampleCost) {
        const maxSampleValue = parseFloat(productFilters.maxSampleCost);
        const productSample = parseFloat(product.sampleCost || "0");
        if (productSample > maxSampleValue) return false;
      }

      // Ship to USA filter
      if (productFilters.minShipToUsa) {
        const minShipValue = parseFloat(productFilters.minShipToUsa);
        const productShip = parseFloat(product.shipToUsa || "0");
        if (productShip < minShipValue) return false;
      }
      if (productFilters.maxShipToUsa) {
        const maxShipValue = parseFloat(productFilters.maxShipToUsa);
        const productShip = parseFloat(product.shipToUsa || "0");
        if (productShip > maxShipValue) return false;
      }

      // Ship to USA availability filter
      if (productFilters.shipToUsaAvailable) {
        const productShip = parseFloat(product.shipToUsa || "0");
        if (productFilters.shipToUsaAvailable === "yes" && productShip <= 0) {
          return false;
        }
        if (productFilters.shipToUsaAvailable === "no" && productShip > 0) {
          return false;
        }
      }

      // Date added filter
      if (productFilters.dateAdded) {
        const filterDate = new Date(productFilters.dateAdded);
        const productDate = new Date(product.createdAt);
        // Compare dates without time component, handling null/undefined dates
        if (
          product.createdAt &&
          (productDate.getDate() !== filterDate.getDate() ||
            productDate.getMonth() !== filterDate.getMonth() ||
            productDate.getFullYear() !== filterDate.getFullYear())
        ) {
          return false;
        }
      }

      return true;
    });
  }, [products, productFilters]);

  // Extract unique categories and brands for filters
  const uniqueCategories = useMemo(() => {
    if (!products) return [];
    const unique = Array.from(
      new Set(
        products
          .map((p) => p.category)
          .filter((cat) => cat && cat.trim() !== "")
      )
    );
    return unique;
  }, [products]);

  const uniqueBrands = useMemo(() => {
    if (!products) return [];
    const unique = Array.from(
      new Set(
        products
          .map((p) => p.brandName)
          .filter((brand) => brand && brand.trim() !== "")
      )
    );
    return unique;
  }, [products]);

  const handleViewProduct = (id: string) => {
    setViewingProductId(id);
    setShowViewProductModal(true);
  };

  const handleProductFilterChange = (
    key: keyof ProductFilters,
    value: string | "yes" | "no" | ""
  ) => {
    setProductFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleProductClearFilter = (key: keyof ProductFilters) => {
    setProductFilters((prev) => ({ ...prev, [key]: "" }));
  };

  const handleProductResetFilters = () => {
    setProductFilters({
      category: "",
      minMoq: "",
      maxPrice: "",
      search: "",
      minSampleCost: "",
      maxSampleCost: "",
      minShipToUsa: "",
      maxShipToUsa: "",
      shipToUsaAvailable: "",
      brandName: "",
      dateAdded: "",
    });
  };

  // Handle image preview when user selects an image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = (event) => {
          if (event.target?.result) {
            setMultipleImagePreviews((prev) => [
              ...prev,
              event.target!.result as string,
            ]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle creating a new product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check if there are image files to upload
    const imageFiles = formData.getAll("productImage") as File[];

    let productData: any;
    if (imageFiles.length > 0 && imageFiles.some((file) => file.size > 0)) {
      // If image is present, send as multipart/form-data
      productData = new FormData();
      productData.append("productName", formData.get("productName") as string);
      productData.append("category", formData.get("category") as string);
      productData.append("brandName", formData.get("brandName") as string);
      productData.append("moq", formData.get("moq") as string);
      productData.append(
        "productDetails",
        formData.get("productDetails") as string
      );
      productData.append("costOfGoods", formData.get("costOfGoods") as string);
      productData.append("sampleCost", formData.get("sampleCost") as string);
      productData.append("shipToUsa", formData.get("shipToUsa") as string);

      // Add all image files with the same field name
      imageFiles.forEach((file, _index) => {
        if (file.size > 0) {
          productData.append(`pictures`, file); // Changed to match backend expectation
        }
      });
    } else {
      // If no image, send as regular object
      productData = {
        productName: formData.get("productName") as string,
        category: formData.get("category") as string,
        brandName: formData.get("brandName") as string,
        moq: formData.get("moq") as string,
        productDetails: formData.get("productDetails") as string,
        costOfGoods: formData.get("costOfGoods") as string,
        sampleCost: formData.get("sampleCost") as string,
        shipToUsa: formData.get("shipToUsa") as string,
      };
    }

    try {
      setIsProductLoading(true);
      await createProduct(productData).unwrap();
      setShowProductModal(false);
      setImagePreview(null);
      setMultipleImagePreviews([]);
      // Reset form
      form.reset();
    } catch (err) {
      console.error("Failed to create product:", err);
    } finally {
      setIsProductLoading(false);
    }
  };

  // Handle updating a product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check if there are image files to upload
    const imageFiles = formData.getAll("productImage") as File[];

    let productData: any;
    if (imageFiles.length > 0 && imageFiles.some((file) => file.size > 0)) {
      // If new images are present, send as multipart/form-data
      productData = new FormData();
      productData.append("_id", editingProduct._id);
      productData.append("productName", formData.get("productName") as string);
      productData.append("category", formData.get("category") as string);
      productData.append("brandName", formData.get("brandName") as string);
      productData.append("moq", formData.get("moq") as string);
      productData.append(
        "productDetails",
        formData.get("productDetails") as string
      );
      productData.append("costOfGoods", formData.get("costOfGoods") as string);
      productData.append("sampleCost", formData.get("sampleCost") as string);
      productData.append("shipToUsa", formData.get("shipToUsa") as string);

      // Add new image files with the same field name
      imageFiles.forEach((file, _index) => {
        if (file.size > 0) {
          productData.append(`pictures`, file); // Changed to match backend expectation
        }
      });
      
      // Also include any existing images that weren't removed
      if (editingProduct.pictures && editingProduct.pictures.length > 0) {
        productData.append('existingPictures', JSON.stringify(editingProduct.pictures));
      }
    } else {
      // If no new images uploaded, send the remaining existing images along with other data
      productData = {
        _id: editingProduct._id,
        productName: formData.get("productName") as string,
        category: formData.get("category") as string,
        brandName: formData.get("brandName") as string,
        moq: formData.get("moq") as string,
        productDetails: formData.get("productDetails") as string,
        costOfGoods: formData.get("costOfGoods") as string,
        sampleCost: formData.get("sampleCost") as string,
        shipToUsa: formData.get("shipToUsa") as string,
        // Send the remaining pictures
        pictures: editingProduct.pictures || [],
      };
    }

    try {
      setIsProductLoading(true);
      await updateProduct(productData).unwrap();
      setEditingProduct(null);
      setShowProductModal(false);
      setImagePreview(null);
      setMultipleImagePreviews([]);
    } catch (err) {
      console.error("Failed to update product:", err);
    } finally {
      setIsProductLoading(false);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  if (productsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {productsApiError?.toString()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <Button onClick={() => {
          setEditingProduct(null);
          setShowProductModal(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <SidebarFilterComponent
            filters={productFilters}
            categories={uniqueCategories}
            brands={uniqueBrands}
            onFilterChange={handleProductFilterChange}
            onClearFilter={handleProductClearFilter}
            onResetFilters={handleProductResetFilters}
          />
        </div>

        {/* Products Table */}
        <div className="flex-1 lg:w-3/4">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-2">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Brand
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MOQ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product.productName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {product.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {product.brandName || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {product.moq}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(
                            product.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setViewingProductId(product._id);
                                setShowViewProductModal(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingProduct(product);
                                setShowProductModal(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProduct(product._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowProductModal(false);
                  setEditingProduct(null);
                  setImagePreview(null);
                  setMultipleImagePreviews([]);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form
              onSubmit={
                editingProduct ? handleUpdateProduct : handleCreateProduct
              }
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <Input
                  type="text"
                  name="productName"
                  defaultValue={editingProduct?.productName || ""}
                  placeholder="Enter product name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Input
                  type="text"
                  name="category"
                  defaultValue={editingProduct?.category || ""}
                  placeholder="Enter category"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name
                </label>
                <Input
                  type="text"
                  name="brandName"
                  defaultValue={editingProduct?.brandName || ""}
                  placeholder="Enter brand name"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MOQ (Minimum Order Quantity)
                </label>
                <Input
                  type="text"
                  name="moq"
                  defaultValue={editingProduct?.moq || ""}
                  placeholder="Enter MOQ"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Details
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  name="productDetails"
                  defaultValue={editingProduct?.productDetails || ""}
                  rows={4}
                  placeholder="Enter product details"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost of Goods <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="costOfGoods"
                    defaultValue={editingProduct?.costOfGoods || ""}
                    placeholder="Enter cost of goods"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sample Cost <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="sampleCost"
                    defaultValue={editingProduct?.sampleCost || ""}
                    placeholder="Enter sample cost"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ship to USA <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="shipToUsa"
                    defaultValue={editingProduct?.shipToUsa || ""}
                    placeholder="Enter shipping details"
                    className="w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                <Input
                  type="file"
                  name="productImage"
                  accept="image/*"
                  multiple
                  className="w-full"
                  onChange={handleImageChange}
                />
                {multipleImagePreviews.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      New images to add:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {multipleImagePreviews.map((preview, index) => (
                        <div key={`new-${index}`} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-md border border-gray-300"
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            onClick={() => {
                              // Remove this preview from multipleImagePreviews
                              setMultipleImagePreviews(prev => prev.filter((_, i) => i !== index));
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {editingProduct &&
                  editingProduct.pictures &&
                  editingProduct.pictures.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        Current images:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {editingProduct.pictures.map(
                          (picture: string, index: number) => (
                            <div key={`existing-${editingProduct._id}-${index}`} className="relative">
                              <img
                                src={picture}
                                alt={`Current ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-md border border-gray-300"
                              />
                              <button
                                type="button"
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                onClick={() => {
                                  // Update the editingProduct to remove this specific image
                                  const updatedPictures = editingProduct.pictures.filter((_: any, i: number) => i !== index);
                                  setEditingProduct({
                                    ...editingProduct,
                                    pictures: updatedPictures
                                  });
                                }}
                              >
                                ×
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowProductModal(false);
                    setEditingProduct(null);
                    setImagePreview(null);
                    setMultipleImagePreviews([]);
                  }}
                  className="px-4 py-2"
                  disabled={isProductLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2"
                  disabled={isProductLoading}
                >
                  {isProductLoading ? (
                    <span className="flex items-center">
                      <span className="h-4 w-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></span>
                      {editingProduct ? "Updating..." : "Adding..."}
                    </span>
                  ) : editingProduct ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Details
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowViewProductModal(false);
                  setViewingProductId(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {viewingProductLoading && (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="h-8 w-8 border-t-2 border-r-2 border-blue-500 rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading product...</p>
                </div>
              </div>
            )}
            
            {viewingProductError && (
              <div className="text-red-500 text-center py-8">
                <p>Error loading product details.</p>
              </div>
            )}
            
            {viewingProduct && !viewingProductLoading && !viewingProductError && (
              <div className="space-y-6">
                {/* Product Images */}
                {viewingProduct.pictures && viewingProduct.pictures.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {viewingProduct.pictures.map((picture: string, index: number) => (
                      <div key={index} className="rounded-lg overflow-hidden border">
                        <img
                          src={picture}
                          alt={`Product ${index + 1}`}
                          className="w-full h-48 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Product Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Product Name</h4>
                      <p className="text-lg font-semibold">{viewingProduct.productName}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Category</h4>
                      <p className="text-gray-900">{viewingProduct.category}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Brand Name</h4>
                      <p className="text-gray-900">{viewingProduct.brandName || "-"}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">MOQ</h4>
                      <p className="text-gray-900">{viewingProduct.moq}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Cost of Goods</h4>
                      <p className="text-gray-900">${viewingProduct.costOfGoods}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Sample Cost</h4>
                      <p className="text-gray-900">${viewingProduct.sampleCost}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Ship to USA</h4>
                      <p className="text-gray-900">${viewingProduct.shipToUsa}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date Added</h4>
                      <p className="text-gray-900">
                        {new Date(viewingProduct.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Product Details */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Product Details</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-line">{viewingProduct.productDetails}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowViewProductModal(false);
                  setViewingProductId(null);
                }}
                className="px-4 py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;