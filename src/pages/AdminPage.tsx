import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CatalogItem {
  id: number;
  car: string;
  category: string;
  supplier: string;
  colors: string[];
  images: {
    url: string;
    isUploaded: boolean;
  }[];
  isInDatabase: boolean;
}

const AdminPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [formData, setFormData] = useState({
    car: '',
    category: '',
    supplier: '',
    colors: [''],
    images: [{ url: '', isUploaded: false }]
  });

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
    // TODO: Fetch items from database
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      // TODO: Update item in database
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, isInDatabase: false }
          : item
      ));
    } else {
      // TODO: Add item to database
      const newItem: CatalogItem = {
        id: Date.now(),
        ...formData,
        isInDatabase: false
      };
      setItems([...items, newItem]);
    }
    resetForm();
  };

  const handleEdit = (item: CatalogItem) => {
    setEditingItem(item);
    setFormData({
      car: item.car,
      category: item.category,
      supplier: item.supplier,
      colors: item.colors,
      images: item.images
    });
  };

  const handleDelete = (id: number) => {
    // TODO: Delete item from database
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, '']
    });
  };

  const handleRemoveColor = (index: number) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index)
    });
  };

  // Helper function to validate hex color
  const isValidHex = (hex: string) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(hex);

  const handleColorChange = (index: number, value: string) => {
    let newColors = [...formData.colors];
    newColors[index] = value;
    setFormData({
      ...formData,
      colors: newColors
    });
  };

  const handleAddImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { url: '', isUploaded: false }]
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleImageChange = (index: number, value: string, isUploaded: boolean) => {
    const newImages = [...formData.images];
    newImages[index] = { url: value, isUploaded };
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleToggleDatabase = (id: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, isInDatabase: !item.isInDatabase }
        : item
    ));
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      car: '',
      category: '',
      supplier: '',
      colors: [''],
      images: [{ url: '', isUploaded: false }]
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Catalog Management</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Car</label>
                <input
                  type="text"
                  value={formData.car}
                  onChange={(e) => setFormData({...formData, car: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Colors Section */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                      type="color"
                      value={isValidHex(color) ? color : '#ffffff'}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="h-10 w-20"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      placeholder="#hexcode"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      maxLength={7}
                    />
                    {formData.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Color
                </button>
              </div>

              {/* Images Section */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={image.url}
                      onChange={(e) => handleImageChange(index, e.target.value, false)}
                      placeholder="Image URL"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageChange(index, '', true)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Upload Image
                    </button>
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Image
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {editingItem ? 'Update' : 'Add'} Item
              </button>
              {editingItem && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Current Items</h2>
          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">{item.car}</h3>
                    <p className="text-gray-600">Category: {item.category}</p>
                    <p className="text-gray-600">Supplier: {item.supplier}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleToggleDatabase(item.id)}
                      className={`${
                        item.isInDatabase 
                          ? 'bg-green-500 hover:bg-green-700' 
                          : 'bg-gray-500 hover:bg-gray-700'
                      } text-white font-bold py-2 px-4 rounded`}
                    >
                      {item.isInDatabase ? 'In Database' : 'Add to Database'}
                    </button>
                  </div>
                </div>
                
                {/* Colors Display */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Colors:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {item.colors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: isValidHex(color) ? color : '#ffffff' }}
                        />
                        <span>{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Images Display */}
                <div>
                  <h4 className="font-semibold mb-2">Images:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {item.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url}
                          alt={`${item.car} - Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                          {image.isUploaded ? 'Uploaded' : 'URL'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
