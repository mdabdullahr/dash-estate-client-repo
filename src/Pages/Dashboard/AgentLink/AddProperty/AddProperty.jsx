import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiUploadCloud } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AddProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const imageHostingKey = import.meta.env.VITE_IMGBB_KEY;
  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageUploaded(false);
    }
  }, [imageFile]);

  const addPropertyMutation = useMutation({
    mutationFn: async (newProperty) => {
      setImageUploading(true);
      setImageUploaded(false);

      const formData = new FormData();
      formData.append("image", newProperty.image[0]);

      const imgRes = await fetch(imageHostingUrl, {
        method: "POST",
        body: formData,
      });

      const imgData = await imgRes.json();

      if (!imgData.success) throw new Error("Image upload failed");

      const imageUrl = imgData.data.url;
      console.log(imageUrl);
      setImageUploaded(true);
      setImageUploading(false);

      const propertyInfo = {
        title: newProperty.title,
        location: newProperty.location,
        image: imageUrl,
        agentName: user?.displayName,
        agentEmail: user?.email,
        agentImage: user?.photoURL,
        minPrice: parseFloat(newProperty.minPrice),
        maxPrice: parseFloat(newProperty.maxPrice),
        verificationStatus: "pending",
        timestamp: new Date(),
      };

      const res = await axiosSecure.post("/properties", propertyInfo);
      return res.data;
    },

    // ✅ UPDATED: success alert via Swal
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Property Added!",
          text: "Your property was successfully submitted.",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        reset();
        setImagePreview(null);
        setImageUploaded(false);
        queryClient.invalidateQueries({ queryKey: ["properties"] });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    },

    // ✅ UPDATED: error alert via Swal
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error?.message || "Something went wrong during submission.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      console.error("Upload error:", error);
      setImageUploading(false);
    },
  });

  const onSubmit = (data) => {
    addPropertyMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">
          Add Your Property
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter your details for Add Property
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Property Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full border border-gray-300 outline-0 focus:border-green-500 rounded-md px-4 py-2 text-gray-800"
                placeholder="Example: Lake View Apartment"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="w-full border border-gray-300 outline-0 focus:border-green-500 rounded-md px-4 py-2 text-gray-800"
                placeholder="Example: Gulshan 2"
              />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.location.message}
                </p>
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
                value={user?.displayName || ""}
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
                value={user?.email || ""}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded-md px-4 py-2 text-gray-600"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Minimum Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Minimum Price
              </label>
              <input
                type="number"
                step="1"
                {...register("minPrice", {
                  required: "Minimum price is required",
                  min: {
                    value: 0,
                    message: "Price cannot be negative",
                  },
                })}
                className="w-full border border-gray-300 outline-0 focus:border-green-500 rounded-md px-4 py-2 text-gray-800"
                placeholder="e.g. 100000"
              />
              {errors.minPrice && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.minPrice.message}
                </p>
              )}
            </div>

            {/* Maximum Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Maximum Price
              </label>
              <input
                type="number"
                step="1"
                {...register("maxPrice", {
                  required: "Maximum price is required",
                  min: {
                    value: 0,
                    message: "Price cannot be negative",
                  },
                })}
                className="w-full border border-gray-300 outline-0 focus:border-green-500 rounded-md px-4 py-2 text-gray-800"
                placeholder="e.g. 200000"
              />
              {errors.maxPrice && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.maxPrice.message}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>

            <label
              htmlFor="imageUpload"
              className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-4 py-8 transition duration-200 ${
                imagePreview
                  ? "border-green-400 bg-green-50"
                  : "border-gray-300 hover:border-green-500"
              }`}
            >
              {/* Icon */}
              {imagePreview ? (
                <FaCheckCircle size={36} className="text-green-400 mb-2" />
              ) : (
                <FiUploadCloud size={36} className="text-gray-500 mb-2" />
              )}

              {/* Preview Image */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-20 object-cover rounded-md mb-2 shadow"
                />
              )}

              {/* Text */}
              <p className="text-sm text-gray-500 mb-1">
                {imagePreview
                  ? "Image Uploaded Successfully"
                  : "Click to upload or drag & drop"}
              </p>
              <p className="text-xs text-gray-400">
                {imagePreview
                  ? "Upload Another Image by Clicking Here"
                  : "(JPG, PNG, or WebP)"}
              </p>

              <input
                id="imageUpload"
                type="file"
                {...register("image", { required: "Image is required" })}
                accept="image/*"
                className="hidden"
              />
            </label>

            {errors.image && (
              <p className="text-sm text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={imageUploading}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded-md transition duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {imageUploading ? "Adding..." : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
