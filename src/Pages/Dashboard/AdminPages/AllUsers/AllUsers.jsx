import Swal from "sweetalert2";
import UseAxios from "../../../../CustomHooks/UseAxios";
import UseUsers from "../../../../CustomHooks/UseUsers";
import toast from "react-hot-toast";
import { Users, ShieldCheck, ShieldPlus } from "lucide-react";

const AllUsers = () => {
  // hooks
  const [users, refetch] = UseUsers();
  const axiosPublic = UseAxios();

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Do you want to make him admin?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make him Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/users/admin/${user.email}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              // refetching data
              refetch();
              // showing alert
              Swal.fire({
                title: "Added New Admin!",
                text: `${user.name} is now an admin`,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            // showing an alert
            toast.error(error);
          });
      }
    });
  };

  if (!users || users.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center p-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400">
            <Users className="w-7 h-7" />
          </span>
          <h1 className="text-xl font-bold text-slate-800">No users found</h1>
          <p className="text-slate-500 text-sm">
            Registered users will show up here once they sign up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              All Users
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Everyone registered on Carepoint Camp
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100 self-start sm:self-auto">
            <Users className="w-3.5 h-3.5" />
            Total Users: {users.length}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs tracking-wide">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{user.email}</td>
                    <td className="px-4 py-3">
                      {user?.userRole === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Admin
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleMakeAdmin(user)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                        >
                          <ShieldPlus className="w-3.5 h-3.5" />
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
