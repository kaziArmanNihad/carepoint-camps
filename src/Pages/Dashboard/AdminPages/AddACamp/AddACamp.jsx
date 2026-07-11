import { useForm } from "react-hook-form";
import UseAxios from "../../../../CustomHooks/UseAxios";
import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import toast from "react-hot-toast";
import { PlusCircle } from "lucide-react";

const AddACamp = () => {
  // context api
  const { user } = useContext(AuthContext);

  // hooks
  const axiosPublic = UseAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const campInfo = {
      ...data,
      email: user.email,
    };
    axiosPublic
      .post("/camps", campInfo)
      .then((res) => {
        if (res.data.insertedId) {
          // reseting the form
          reset();

          // showing an alert
          toast.success("New Camp added");
        }
      })
      .catch((error) => {
        console.log(error);

        // showing an alert
        toast.error(error);
      });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition";
  const labelClass = "text-xs font-medium text-slate-500 mb-1 block";
  const errorClass = "text-red-500 text-xs mt-1.5";

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Add a Camp
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Fill in the details below to publish a new medical camp
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Camp Name */}
              <div>
                <label className={labelClass}>Camp Name</label>
                <input
                  type="text"
                  placeholder="Rural Health Outreach"
                  className={inputClass}
                  {...register("name", { required: true })}
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
                  placeholder="500"
                  className={inputClass}
                  {...register("price", { required: true })}
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
                  placeholder="Dhaka, Bangladesh"
                  className={inputClass}
                  {...register("location", { required: true })}
                />
                {errors.location?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>

              {/* Healthcare Professional */}
              <div>
                <label className={labelClass}>Healthcare Professional</label>
                <input
                  type="text"
                  placeholder="Doctor / lead name"
                  className={inputClass}
                  {...register("leadBy", { required: true })}
                />
                {errors.leadBy?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>

              {/* Profession Name */}
              <div>
                <label className={labelClass}>Profession Name</label>
                <input
                  type="text"
                  placeholder="Cardiologist"
                  className={inputClass}
                  {...register("role", { required: true })}
                />
                {errors.role?.type === "required" && (
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
                  placeholder="0"
                  className={inputClass}
                  defaultValue={0}
                  {...register("participant_count")}
                />
              </div>

              {/* Camp Image */}
              <div>
                <label className={labelClass}>Camp Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  className={inputClass}
                  {...register("image", { required: true })}
                />
                {errors.image?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>

              {/* Camp Description */}
              <div className="md:col-span-2">
                <label className={labelClass}>Camp Description</label>
                <textarea
                  className={`${inputClass} h-28 resize-none`}
                  placeholder="Briefly describe the camp's purpose and services offered"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description?.type === "required" && (
                  <p role="alert" className={errorClass}>
                    This field is required
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-600 hover:border-green-300 hover:text-green-700 hover:bg-green-50 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Add Camp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddACamp;
