import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import UseAxios from "../../CustomHooks/UseAxios";
import { useNavigate, useParams } from "react-router";
import UseCamps from "../../CustomHooks/UseCamps";
import ParticipantRegistration from "./ParticipantRegistration";
import UsePrimaryBtn from "../../CustomHooks/UsePrimaryBtn";
import toast from "react-hot-toast";
import {
  MapPin,
  CalendarDays,
  Users,
  Stethoscope,
  Tag,
  UserRound,
  Briefcase,
} from "lucide-react";

const CampDetails = () => {
  // context api
  const { user } = useContext(AuthContext);

  // states
  const axiosPublic = UseAxios();
  const navigate = useNavigate();
  const [modelOpen, setModelOpen] = useState(false);

  // hooks
  const [camp, refetch] = UseCamps();

  // collecting the selected id with the help of use params
  const { id } = useParams();

  // finding the food details
  const selectedCamp = camp.find((camp) => camp._id === id);

  const handleJoinCamp = (participantReq) => {
    const participantInfo = {
      campId: selectedCamp._id,
      image: selectedCamp.image,
      name: selectedCamp.name,
      leadBy: selectedCamp.leadBy,
      role: selectedCamp.role,
      location: selectedCamp.location,
      date: selectedCamp.date,
      price: selectedCamp.price,
      participant_count: Number(selectedCamp.participant_count) + 1,
      description: selectedCamp.description,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      age: participantReq.age,
      phone: participantReq.phone,
      gender: participantReq.gender,
      emergencyContact: participantReq.emergencyContact,
      paymentStatus: "pay",
      confirmationStatus: "pending",
    };
    console.log(participantInfo);

    // sending req to server
    axiosPublic.post("/participants", participantInfo).then((res) => {
      if (res.data.partticipantResult.insertedId) {
        // refetching the data
        refetch();

        // navigating the user
        navigate("/availableCamps");

        // showing alert
        toast.success("Your request accepted");
      }
    });
  };

  if (!selectedCamp || !user) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-3">
        <span className="loading loading-infinity loading-xl text-teal-600"></span>
        <p className="text-slate-500 font-medium tracking-wide">
          Loading camp details…
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-CPC-sky min-h-screen pb-16">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-20 pb-6">
        <span className="inline-flex items-center gap-1.5 bg-teal-500 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
          <Stethoscope className="w-3.5 h-3.5" />
          {selectedCamp.role}
        </span>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight max-w-2xl">
          {selectedCamp.name}
        </h1>
        <p className="flex items-center gap-1.5 text-slate-500 text-sm md:text-base mt-2">
          <UserRound className="w-4 h-4" />
          Led by {selectedCamp.leadBy}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: description */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              About this camp
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
              {selectedCamp.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Location
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {selectedCamp.location}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                  <CalendarDays className="w-4 h-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Date
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {selectedCamp.date}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                  <Users className="w-4 h-4" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Participants
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {selectedCamp.participant_count}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: booking card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sticky top-6">
              <div className="flex items-center gap-1.5 mb-1 text-teal-600">
                <Tag className="w-4 h-4" />
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  Registration fee
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-5">
                {selectedCamp.price}
              </p>

              <dl className="space-y-3.5 mb-6 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-500">
                    <UserRound className="w-3.5 h-3.5" />
                    Healthcare professional
                  </dt>
                  <dd className="font-medium text-slate-800 text-right">
                    {selectedCamp.leadBy}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-500">
                    <Briefcase className="w-3.5 h-3.5" />
                    Profession
                  </dt>
                  <dd className="font-medium text-slate-800 text-right">
                    {selectedCamp.role}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1.5 text-slate-500">
                    <Users className="w-3.5 h-3.5" />
                    Spots filled
                  </dt>
                  <dd className="font-medium text-slate-800 text-right">
                    {selectedCamp.participant_count}
                  </dd>
                </div>
              </dl>

              <UsePrimaryBtn
                blackBorder
                onClick={() => setModelOpen(true)}
                className="w-full justify-center"
              >
                Join Camp
              </UsePrimaryBtn>
              <UsePrimaryBtn
                className="w-full justify-center mt-2"
                onClick={() => navigate(-1)}
                type="button"
                isLogout
                blackBorder
              >
                Back
              </UsePrimaryBtn>

              <p className="text-xs text-slate-400 text-center mt-3">
                You&#39;ll confirm your details in the next step
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* model content */}
      {modelOpen && (
        <ParticipantRegistration
          isOpen={modelOpen}
          onClose={() => setModelOpen(false)}
          camp={selectedCamp}
          user={user}
          handleJoinCamp={handleJoinCamp}
        />
      )}
    </div>
  );
};

export default CampDetails;
