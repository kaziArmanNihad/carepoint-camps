import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { useForm } from "react-hook-form";
import UseUsers from "../../../../CustomHooks/UseUsers";
import { useNavigate } from "react-router";
import UseAxios from "../../../../CustomHooks/UseAxios";
import toast from "react-hot-toast";

const OrganizerProfileUpdate = () => {
  const { user, updateUser } = useContext(AuthContext);

  // state
  const navigate = useNavigate();

  // hooks
  const [users, refetch] = UseUsers();
  const axiosPublic = UseAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // finding data
  const userDetails = users.find((value) => value.email === user.email);

  const onSubmit = (data) => {
    updateUser(data.name, data.photo)
      .then(() => {
        const updateInfo = {
          name: data.name,
          photo: data.photo,
        };

        axiosPublic
          .patch(`/users/${userDetails._id}`, updateInfo)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              // refetching data and and navigating the user
              refetch();
              navigate(-1);
              // showing an alert
              toast.success("Profile updated successfully");
            }
          })
          .catch((error) => {
            console.log(error);

            // showing an alert
            toast.error(error);
          });
      })
      .catch((error) => {
        console.log(error);

        // showing an alert
        toast.error(error);
      });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
          <h1 className="text-xl font-semibold text-slate-800 mb-6">
            Update Organizer Profile
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1  gap-5">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition"
                  defaultValue={user.displayName}
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p role="alert" className="text-red-500 text-xs mt-1.5">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">
                  Photo URL
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition"
                  defaultValue={user.photoURL}
                  {...register("photo", { required: true })}
                />
                {errors.photo?.type === "required" && (
                  <p role="alert" className="text-red-500 text-xs mt-1.5">
                    This field is required
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:border-green-300 hover:text-green-700 hover:bg-green-50 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfileUpdate;
