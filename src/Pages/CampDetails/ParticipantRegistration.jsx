import { useForm } from "react-hook-form";
import UsePrimaryBtn from "../../CustomHooks/UsePrimaryBtn";
import {
  X,
  Tag,
  MapPin,
  Stethoscope,
  UserRound,
  Mail,
  Phone,
  ShieldAlert,
  Cake,
  AlertCircle,
} from "lucide-react";

const ParticipantRegistration = ({
  isOpen,
  onClose,
  camp,
  user,
  handleJoinCamp,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleJoinCamp(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Join Camp</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Confirm your details to register for this camp
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-5">
            {/* Read-only summary */}
            <div className="bg-CPC-sky rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-start gap-2.5">
                <Stethoscope className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-black uppercase font-bold tracking-wide">
                    Camp
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {camp.name}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Tag className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-black uppercase font-bold tracking-wide">
                    Fee
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {camp.price}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-black uppercase font-bold tracking-wide">
                    Location
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {camp.location}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <UserRound className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-black uppercase font-bold tracking-wide">
                    Healthcare professional
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {camp.leadBy}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <UserRound className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-black uppercase font-bold tracking-wide">
                    Participant
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {user?.displayName ? user.displayName : "testName"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-black uppercase font-bold tracking-wide">
                    Email
                  </p>
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {user?.email ? user.email : "testEmail"}
                  </p>
                </div>
              </div>
            </div>

            {/* Editable fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Cake className="w-4 h-4 text-slate-400" />
                  Age
                </label>
                <input
                  type="number"
                  {...register("age", { required: true, max: 60, min: 14 })}
                  className="border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-colors p-2.5 w-full text-slate-800 rounded-xl text-sm"
                  placeholder="Enter your age"
                />
                {errors.age?.type === "required" && (
                  <p className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="w-3.5 h-3.5" /> This field is
                    required
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
                  <Phone className="w-4 h-4 text-slate-400" />
                  Phone Number
                </label>
                <input
                  type="number"
                  {...register("phone", {
                    required: true,
                    maxLength: 12,
                    minLength: 6,
                  })}
                  className="border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-colors p-2.5 w-full text-slate-800 rounded-xl text-sm"
                  placeholder="e.g. 01712345678"
                />
                {errors.phone?.type === "required" && (
                  <p className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="w-3.5 h-3.5" /> This field is
                    required
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
                  <UserRound className="w-4 h-4 text-slate-400" />
                  Gender
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-colors p-2.5 w-full text-slate-800 rounded-xl text-sm bg-white"
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
                  <ShieldAlert className="w-4 h-4 text-slate-400" />
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
                  placeholder="Contact number"
                />
                {errors.emergencyContact?.type === "required" && (
                  <p className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="w-3.5 h-3.5" /> This field is
                    required
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
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 px-6 py-5 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
            <UsePrimaryBtn onClick={onClose} type="button" isLogout blackBorder>
              Cancel
            </UsePrimaryBtn>
            <UsePrimaryBtn blackBorder type="submit">
              Submit
            </UsePrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantRegistration;
