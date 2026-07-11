import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import UseParticipant from "../../../../CustomHooks/UseParticipant";
import UseAxios from "../../../../CustomHooks/UseAxios";
import UsePrimaryBtn from "../../../../CustomHooks/UsePrimaryBtn";
import toast from "react-hot-toast";
import {
  Cake,
  Phone,
  UserRound,
  ShieldAlert,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

const ParticipantProfileUpdate = () => {
  // state
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = UseAxios();

  const [participant, refetch] = UseParticipant();

  const updatedDoc = participant.find((participant) => participant._id === id);

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // handle Submit
  const onSubmit = (data) => {
    reset();
    console.log("updated data", data);
    axiosPublic.patch(`/participants/${id}`, data).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // refetching data
        refetch();

        // navigating the user
        navigate("/dashboard/ParticipantProfile");
        // showing an alert
        toast.success("Data Updated Successfully");
      }
    });
  };

  const handleCancel = () => {
    reset();
    navigate(-1);
  };

  if (!updatedDoc) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-3">
        <span className="loading loading-infinity loading-xl text-teal-600"></span>
        <p className="text-slate-500 font-medium tracking-wide">
          Loading participant…
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center items-start p-4 md:p-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-slate-100">
        {/* Header */}
        <div className="px-6 md:px-8 pt-6 pb-5 border-b border-slate-100">
          <button
            onClick={handleCancel}
            className="group flex items-center gap-1.5 text-black hover:text-slate-800 text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Update Participant Information
          </h1>
          <p className="text-sm text-black mt-1">
            Editing details for {updatedDoc.userName || "this participant"}
          </p>
        </div>

        {/* form content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 p-6 md:p-8">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <Cake className="w-4 h-4 text-teal-600" />
                Age
              </label>
              <input
                type="number"
                {...register("age", { required: true, max: 60, min: 13 })}
                className="border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-colors p-2.5 w-full text-slate-800 rounded-xl text-sm"
                defaultValue={updatedDoc.age}
              />
              {errors.age?.type === "required" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> This field is required
                </p>
              )}
              {errors.age?.type === "max" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> Age must be under 60
                </p>
              )}
              {errors.age?.type === "min" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> Age must be over 13
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <Phone className="w-4 h-4 text-teal-600" />
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: true,
                  maxLength: 12,
                  minLength: 6,
                })}
                className="border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-colors p-2.5 w-full text-slate-800 rounded-xl text-sm"
                defaultValue={updatedDoc.phone}
              />
              {errors.phone?.type === "required" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> This field is required
                </p>
              )}
              {errors.phone?.type === "maxLength" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> Must be under 12
                  characters
                </p>
              )}
              {errors.phone?.type === "minLength" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> Must be over 6
                  characters
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <UserRound className="w-4 h-4 text-teal-600" />
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-colors p-2.5 w-full text-slate-800 rounded-xl text-sm bg-white"
                defaultValue={updatedDoc.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" />{" "}
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <ShieldAlert className="w-4 h-4 text-teal-600" />
                Emergency Contact
              </label>
              <input
                type="tel"
                {...register("emergencyContact", {
                  required: true,
                  maxLength: 12,
                  minLength: 6,
                })}
                className="border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-colors p-2.5 w-full text-slate-800 rounded-xl text-sm"
                defaultValue={updatedDoc.emergencyContact}
              />
              {errors.emergencyContact?.type === "required" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> This field is required
                </p>
              )}
              {errors.emergencyContact?.type === "maxLength" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> Must be under 12
                  characters
                </p>
              )}
              {errors.emergencyContact?.type === "minLength" && (
                <p className="flex items-center gap-1 text-red-500 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> Must be over 6
                  characters
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 justify-end items-center px-6 md:px-8 py-5 border-t border-slate-100 bg-white rounded-b-2xl">
            <UsePrimaryBtn
              onClick={handleCancel}
              type="button"
              isLogout
              blackBorder
            >
              Cancel
            </UsePrimaryBtn>
            <UsePrimaryBtn type="submit" blackBorder>
              Submit
            </UsePrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantProfileUpdate;
