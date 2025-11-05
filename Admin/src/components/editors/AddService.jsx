import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  GripVertical,
  Target,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowRight
} from "lucide-react";

const AddService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "Target",
    gradient: "from-red-500 to-red-600",
    order: 0,
    status: "active"
  });

  const modalRef = useRef(null);

  // Icon mapping
  const iconMap = {
    Target,
    Users,
    TrendingUp,
    Award,
    ChevronRight,
    ArrowRight
  };

  // Gradient options
  const gradientOptions = [
    "from-red-500 to-red-600",
    "from-red-400 to-red-500",
    "from-red-600 to-red-700",
    "from-blue-500 to-blue-600",
    "from-green-500 to-green-600",
    "from-purple-500 to-purple-600",
    "from-yellow-500 to-yellow-600",
    "from-pink-500 to-pink-600"
  ];

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAddModal(false);
        setEditingService(null);
      }
    };

    if (showAddModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddModal]);

  // Fetch services from API
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5001/api/services/admin/all");
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
      } else {
        console.error("Failed to fetch services:", data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    try {
      if (!newService.title || !newService.description) {
        alert("Please fill in all required fields");
        return;
      }

      const response = await fetch("http://localhost:5001/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      const data = await response.json();

      if (data.success) {
        setServices([...services, data.data]);
        setNewService({
          title: "",
          description: "",
          icon: "Target",
          gradient: "from-red-500 to-red-600",
          order: 0,
          status: "active"
        });
        setShowAddModal(false);
        alert("Service added successfully!");
      } else {
        alert("Failed to add service: " + data.message);
      }
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Error adding service");
    }
  };

  const handleUpdateService = async () => {
    try {
      if (!editingService.title || !editingService.description) {
        alert("Please fill in all required fields");
        return;
      }

      const response = await fetch(`http://localhost:5001/api/services/${editingService._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingService),
      });

      const data = await response.json();

      if (data.success) {
        setServices(services.map(service => 
          service._id === editingService._id ? data.data : service
        ));
        setEditingService(null);
        alert("Service updated successfully!");
      } else {
        alert("Failed to update service: " + data.message);
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Error updating service");
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/services/${serviceId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setServices(services.filter(service => service._id !== serviceId));
        alert("Service deleted successfully!");
      } else {
        alert("Failed to delete service: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Error deleting service");
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setServices(items);

    // Update order in database
    try {
      const response = await fetch("http://localhost:5001/api/services/admin/order", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ services: items }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error("Failed to update service order:", data.message);
        // Revert to original order if update failed
        fetchServices();
      }
    } catch (error) {
      console.error("Error updating service order:", error);
      // Revert to original order if update failed
      fetchServices();
    }
  };

  const openEditModal = (service) => {
    setEditingService({ ...service });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingService(null);
    setNewService({
      title: "",
      description: "",
      icon: "Target",
      gradient: "from-red-500 to-red-600",
      order: 0,
      status: "active"
    });
  };

  const currentService = editingService || newService;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Service Management
            </h1>
            <p className="text-gray-600">
              Add, edit, delete, and reorder services for the Complete Service Portfolio section
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Service</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="services">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {services.map((service, index) => {
                    const IconComponent = iconMap[service.icon] || Target;
                    return (
                      <Draggable key={service._id} draggableId={service._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
                              snapshot.isDragging ? "shadow-xl" : ""
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div {...provided.dragHandleProps} className="cursor-grab">
                                  <GripVertical className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {service.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm mt-1">
                                    {service.description}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      service.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {service.status}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      Order: {service.order}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => openEditModal(service)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteService(service._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        {services.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first service</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Add First Service
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={currentService.title}
                    onChange={(e) => {
                      if (editingService) {
                        setEditingService({ ...editingService, title: e.target.value });
                      } else {
                        setNewService({ ...newService, title: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter service title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon *
                  </label>
                  <select
                    value={currentService.icon}
                    onChange={(e) => {
                      if (editingService) {
                        setEditingService({ ...editingService, icon: e.target.value });
                      } else {
                        setNewService({ ...newService, icon: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {Object.keys(iconMap).map(iconName => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={currentService.description}
                  onChange={(e) => {
                    if (editingService) {
                      setEditingService({ ...editingService, description: e.target.value });
                    } else {
                      setNewService({ ...newService, description: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows="3"
                  placeholder="Enter service description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gradient *
                  </label>
                  <select
                    value={currentService.gradient}
                    onChange={(e) => {
                      if (editingService) {
                        setEditingService({ ...editingService, gradient: e.target.value });
                      } else {
                        setNewService({ ...newService, gradient: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {gradientOptions.map(gradient => (
                      <option key={gradient} value={gradient}>
                        {gradient}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={currentService.status}
                    onChange={(e) => {
                      if (editingService) {
                        setEditingService({ ...editingService, status: e.target.value });
                      } else {
                        setNewService({ ...newService, status: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${currentService.gradient} rounded-lg flex items-center justify-center`}>
                      {iconMap[currentService.icon] && React.createElement(iconMap[currentService.icon], { className: "w-6 h-6 text-white" })}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        {currentService.title || "Service Title"}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {currentService.description || "Service description will appear here"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingService ? handleUpdateService : handleAddService}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingService ? "Update Service" : "Add Service"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddService;
