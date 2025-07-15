import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserShield, FaUserTie, FaTrash, FaBan } from "react-icons/fa";
import Loading from "../../../../Shared/Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ✅ Mutations
  const makeAdminMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/admin/${id}`),
    onSuccess: () => {
      Swal.fire("Success", "User promoted to admin", "success");
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  const makeAgentMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/agent/${id}`),
    onSuccess: () => {
      Swal.fire("Success", "User promoted to agent", "success");
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  const markFraudMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/fraud/${id}`),
    onSuccess: () => {
      Swal.fire("Success", "Agent marked as fraud", "success");
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "User has been deleted.", "success");
      queryClient.invalidateQueries(["all-users"]);
    },
  });

  // ✅ Handlers with SweetAlert
  const handleMakeAdmin = (id) => makeAdminMutation.mutate(id);
  const handleMakeAgent = (id) => makeAgentMutation.mutate(id);

  const handleMarkFraud = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This agent will be marked as fraud!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark fraud!",
    });

    if (confirm.isConfirmed) {
      markFraudMutation.mutate(id);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete User?",
      text: "User will be removed from DB & Firebase!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      deleteUserMutation.mutate(id);
    }
  };

  return (
    <div className="p-4 2xl:p-8 bg-gray-50 min-h-screen rounded-2xl">

      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="overflow-x-auto rounded-t-sm">
          <table className="table w-full">
            <thead className="text-white text-lg xl:text-xl bg-green-500">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>User Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => {
                const isFraud = user.status === "fraud";

                return (
                  <tr key={user._id} 
                  className={`${
                    idx % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}>
                    <td className="text-sm xl:text-lg font-semibold">{idx + 1}</td>
                    <td><img src={user.image} className="w-10 2xl:w-14 h-10 2xl:h-14 rounded-xl object-cover" alt="user-Image" /></td>
                    <td className="text-sm xl:text-lg font-semibold">{user.name}</td>
                    <td className="text-sm xl:text-lg">{user.address}</td>
                    <td className="text-sm xl:text-lg">{user.email}</td>
                    <td className="capitalize text-sm xl:text-lg font-semibold">{user.role}</td>
                    <td className="space-x-2 xl:space-x-5">
                      {!isFraud ? (
                        <>
                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleMakeAdmin(user._id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm xl:text-lg font-medium cursor-pointer"
                            >
                              <FaUserShield className="inline mr-1" size={15} />
                              Make Admin
                            </button>
                          )}
                          {user.role !== "agent" && (
                            <button
                              onClick={() => handleMakeAgent(user._id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm xl:text-lg font-medium cursor-pointer"
                            >
                              <FaUserTie className="inline mr-1" size={15} />
                              Make Agent
                            </button>
                          )}
                          {user.role === "agent" && (
                            <button
                              onClick={() => handleMarkFraud(user._id)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm xl:text-lg cursor-pointer"
                            >
                              <FaBan className="inline mr-1" size={15} />
                              Mark Fraud
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-red-600 font-semibold text-sm xl:text-lg">
                          🚫 Fraud
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm xl:text-lg font-medium cursor-pointer"
                      >
                        <FaTrash className="inline mr-1" size={12}/>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
