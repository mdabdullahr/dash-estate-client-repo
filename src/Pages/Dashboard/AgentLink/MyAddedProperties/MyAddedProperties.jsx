import React, { useState, useEffect } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../../../Shared/Loading/Loading";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch, // === ADDED: to watch image file ===
    formState: { errors },
  } = useForm();

  const imageFile = watch("image"); // === ADDED: watch for image file selection ===

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/agent/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (selectedProperty) {
      reset({
        title: selectedProperty.title,
        location: selectedProperty.location,
        minPrice: selectedProperty.minPrice,
        maxPrice: selectedProperty.maxPrice,
      });
      setImagePreview(selectedProperty.image);
    }
  }, [selectedProperty, reset]);

  // === UPDATED: Update image preview immediately when user selects new image ===
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const previewUrl = URL.createObjectURL(imageFile[0]);
      setImagePreview(previewUrl);

      // Cleanup to avoid memory leaks
      return () => URL.revokeObjectURL(previewUrl);
    } else if (selectedProperty) {
      setImagePreview(selectedProperty.image);
    } else {
      setImagePreview("");
    }
  }, [imageFile, selectedProperty]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(
        `/properties/${selectedProperty._id}`,
        {
          ...data,
          image: data.imageUrl,
          verificationStatus: "pending",
        }
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Property updated successfully.", "success");
      queryClient.invalidateQueries(["myProperties", user?.email]);
      setIsModalOpen(false);
      setSelectedProperty(null);
      setImagePreview("");
    },
    onError: () => {
      toast.error("Update failed.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/properties/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire("Deleted!", "Property deleted successfully.", "success");
        queryClient.invalidateQueries(["myProperties", user?.email]);
      } else {
        Swal.fire("Failed!", "Delete failed!", "error");
      }
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this property!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleUpdate = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      setImageUploading(true);

      let imageUrl = imagePreview;

      // === UPDATED: Only upload if new image selected ===
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );
        const imageData = await res.json();

        if (!imageData.success) {
          setImageUploading(false);
          toast.error("Image upload failed");
          return; // === UPDATED: Return early if upload fails ===
        }

        imageUrl = imageData.data.url;
      }

      setImageUploading(false);

      updateMutation.mutate({
        ...data,
        imageUrl,
      });
    } catch (err) {
      console.log(err);
      setImageUploading(false);
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {isLoading ? (
        <Loading />
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {properties.map((property) => (
            <div
              key={property._id}
              className="overflow-hidden transform transition duration-600 hover:shadow-xl hover:border border-gray-200 group rounded-lg"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600">📍 {property.location}</p>

                <div className="flex items-center gap-3 mt-1">
                  <img
                    src={property.agentImage || user?.photoURL}
                    alt="agent"
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="text-sm text-gray-700">
                    {property.agentName}
                  </span>
                </div>

                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-medium capitalize ${
                      property.verificationStatus === "verified"
                        ? "text-green-600"
                        : property.verificationStatus === "rejected"
                        ? "text-red-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {property.verificationStatus}
                  </span>
                </p>

                <p className="text-sm text-gray-700">
                  💰 ${property.minPrice} - ${property.maxPrice}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleUpdate(property)}
                    disabled={property.verificationStatus === "rejected"}
                    className={`
    px-3 py-1 text-sm border rounded transition
    ${
      property.verificationStatus === "rejected"
        ? "border-gray-300 text-gray-400 cursor-not-allowed opacity-50"
        : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer"
    }
  `}
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(property._id)}
                    className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/60"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white max-w-2xl w-full mx-4 p-6 rounded-xl shadow relative">
            <button
              className="absolute top-2 right-3 text-xl cursor-pointer"
              onClick={() => {
                setIsModalOpen(false);
                setImagePreview("");
                setSelectedProperty(null);
              }}
              aria-label="Close modal"
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Update Property
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium">Property Title</label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-green-500"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Property Location</label>
                  <input
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-green-500"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm">{errors.location.message}</p>
                  )}
                </div>
              </div>

              {/* Agent Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={user?.displayName}
                    readOnly
                    className="w-full border border-gray-200 bg-gray-100 rounded-md px-4 py-2 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Agent Email
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="w-full border border-gray-200 bg-gray-100 rounded-md px-4 py-2 text-gray-600"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Minimum Price
                  </label>
                  <input
                    type="number"
                    {...register("minPrice", {
                      required: "Min price is required",
                      min: { value: 0, message: "Price cannot be negative" }, // === ADDED ===
                    })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    placeholder="Min Price"
                  />
                  {errors.minPrice && (
                    <p className="text-red-500 text-sm">{errors.minPrice.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Maximum Price
                  </label>
                  <input
                    type="number"
                    {...register("maxPrice", {
                      required: "Max price is required",
                      min: { value: 0, message: "Price cannot be negative" }, // === ADDED ===
                      validate: (value) => {
                        if (
                          parseFloat(value) <
                          parseFloat(watch("minPrice") || 0)
                        ) {
                          return "Max price cannot be less than min price"; // === ADDED ===
                        }
                        return true;
                      },
                    })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md"
                    placeholder="Max Price"
                  />
                  {errors.maxPrice && (
                    <p className="text-red-500 text-sm">{errors.maxPrice.message}</p>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-2 font-medium">Upload Image</label>
                <label
                  htmlFor="imageUpload"
                  className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-4 py-8 transition duration-200 ${
                    imagePreview
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  {imagePreview ? (
                    <FaCheckCircle size={36} className="text-green-400 mb-2" />
                  ) : (
                    <FiUploadCloud size={36} className="text-gray-500 mb-2" />
                  )}

                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded-md mb-2 shadow"
                    />
                  )}

                  <p className="text-sm text-gray-500 mb-1">
                    {imagePreview
                      ? "Image uploaded successfully"
                      : "Click to upload or drag & drop"}
                  </p>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  {...register("image")}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={imageUploading}
                className="w-full cursor-pointer bg-green-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {imageUploading ? "Updating..." : "Update Property"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;
