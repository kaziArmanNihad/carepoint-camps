import { useNavigate, useParams } from "react-router";
import UseCamps from "../../../../CustomHooks/UseCamps";
import UseAxios from "../../../../CustomHooks/UseAxios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateManageCamps = () => {
  // state
  const { id } = useParams();
  const navigate = useNavigate();

  // hooks
  const [camp, refetch] = UseCamps();
  const axiosPublic = UseAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const updatedDoc = camp.find((camp) => camp._id === id);

  // handle Submit
  const onSubmit = (data) => {
    axiosPublic.patch(`/camps/${id}`, data).then((res) => {
      if (res.data.modifiedCount > 0) {
        // navigating the user
        navigate(-1);

        // refetching the data
        refetch();

        // clearing the form
        reset();

        // showing an alert
        toast.success("Data Updated Successfully");
      }
    });
  };

  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  // guard against camp data not being loaded yet
  if (!updatedDoc) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center">
        <span className="loading loading-infinity loading-xl text-teal-600"></span>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition";
  const labelClass = "text-xs font-medium text-slate-500 mb-1 block";
  const errorClass = "text-red-500 text-xs mt-1.5";

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
          <h1 className="text-xl font-semibold text-slate-800 mb-6">
            Update Camp
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Camp Name */}
              <div>
                <label className={labelClass}>Camp Name</label>
                <input
                  type="text"
                  placeholder="Camp Name"
                  className={inputClass}
                  {...register("name", { required: true })}
                  defaultValue={updatedDoc.name}
                />
                {errors.name?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>

              {/* Camp Fees */}
              <div>
                <label className={labelClass}>Camp Fees</label>
                <input
                  type="text"
                  placeholder="Camp Fees"
                  className={inputClass}
                  {...register("price", { required: true })}
                  defaultValue={updatedDoc.price}
                />
                {errors.price?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  className={inputClass}
                  {...register("date", { required: true })}
                  defaultValue={updatedDoc.date}
                />
                {errors.date?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  placeholder="Location"
                  {...register("location", { required: true })}
                  className={inputClass}
                  defaultValue={updatedDoc.location}
                />
                {errors.location?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>

              {/* Healthcare Professional Name */}
              <div>
                <label className={labelClass}>
                  Healthcare Professional Name
                </label>
                <input
                  type="text"
                  placeholder="Healthcare Professional Name"
                  className={inputClass}
                  {...register("leadBy", { required: true })}
                  defaultValue={updatedDoc.leadBy}
                />
                {errors.leadBy?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>

              {/* Participant Count */}
              <div>
                <label className={labelClass}>Participant Count</label>
                <input
                  type="number"
                  placeholder="Participant Count"
                  className={inputClass}
                  {...register("participant_count")}
                  defaultValue={updatedDoc.participant_count}
                />
              </div>

              {/* Camp Image URL */}
              <div className="md:col-span-2">
                <label className={labelClass}>Camp Image URL</label>
                <input
                  type="text"
                  placeholder="Camp Image"
                  {...register("image", { required: true })}
                  className={inputClass}
                  defaultValue={updatedDoc.image}
                />
                {errors.image?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateManageCamps;
