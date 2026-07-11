import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UseCamps from "../../../../CustomHooks/UseCamps";
import Swal from "sweetalert2";
import UseAxios from "../../../../CustomHooks/UseAxios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HomeIcon, Pencil, Trash2, PlusCircle } from "lucide-react";

const ManageCamps = () => {
  // context api
  const { user } = useContext(AuthContext);

  // hooks
  const [camp, refetch] = UseCamps();
  const axiosPublic = UseAxios();

  // filtering the data
  const filterCamps = camp.filter((camp) => camp.email === user.email);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/camps/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your camp has been deleted.",
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

  if (filterCamps.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center p-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400">
            <HomeIcon className="w-7 h-7" />
          </span>
          <h1 className="text-xl font-bold text-slate-800">
            No camps added yet
          </h1>
          <p className="text-slate-500 text-sm">
            Camps you create will show up here for you to manage.
          </p>
          <Link to="/dashboard/addACamp">
            <button
              type="button"
              className="flex items-center gap-1.5 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Add a Camp
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Manage Camps
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Camps you&#39;ve created and are responsible for
            </p>
          </div>
          <Link to="/dashboard/addACamp">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-400 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Add a Camp
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs tracking-wide">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Image</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Professional</th>
                  <th className="px-4 py-3 font-semibold">Fees</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Participants</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filterCamps.map((camp, index) => (
                  <tr
                    key={camp._id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={camp.image}
                        alt={camp.name}
                        className="object-cover h-12 w-16 rounded-lg border border-slate-100"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {camp.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{camp.leadBy}</td>
                    <td className="px-4 py-3 text-slate-600">{camp.price}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {camp.location}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{camp.date}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {camp.participant_count}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/dashboard/updateManageCamps/${camp._id}`}>
                          <button
                            type="button"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-teal-700 bg-teal-50 border border-teal-100 hover:bg-teal-100 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            Update
                          </button>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(camp._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
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

export default ManageCamps;
