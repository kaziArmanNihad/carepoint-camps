import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UseParticipant from "../../../../CustomHooks/UseParticipant";
import { Link } from "react-router-dom";
import UsePrimaryBtn from "../../../../CustomHooks/UsePrimaryBtn";
import { UserX, MapPin, Pencil } from "lucide-react";

const genderBadgeStyles = {
  Male: "bg-sky-50 text-sky-700",
  Female: "bg-pink-50 text-pink-700",
  Other: "bg-slate-100 text-slate-700",
};

const ParticipantInformations = () => {
  // context api
  const { user } = useContext(AuthContext);

  // hooks
  const [participant] = UseParticipant();

  const participantProfile = participant.filter(
    (participant) => participant.userEmail === user.email,
  );

  // checking the user
  if (!user) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-3">
        <span className="loading loading-infinity loading-xl text-teal-600"></span>
        <p className="text-slate-500 font-medium tracking-wide">
          Loading data…
        </p>
      </div>
    );
  }

  if (participantProfile.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center p-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400">
            <UserX className="w-7 h-7" />
          </span>
          <h1 className="text-xl font-bold text-slate-800">
            No participants found
          </h1>
          <p className="text-slate-500 text-sm">
            Once you join a camp, your registration details will show up here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Participant Information
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Everything you&#39;ve submitted for the camps you&#39;ve joined
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-300 text-slate-500 uppercase text-xs tracking-wide">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Camp</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Age</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Gender</th>
                  <th className="px-4 py-3 font-semibold">Emergency Contact</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {participantProfile.map((participant, index) => (
                  <tr
                    key={participant._id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {participant.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        {participant.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {participant.userName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {participant.age}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {participant.phone}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          genderBadgeStyles[participant.gender] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {participant.gender}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {participant.emergencyContact}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/dashboard/participantProfileUpdate/${participant._id}`}
                      >
                        <UsePrimaryBtn>
                          <span className="flex items-center gap-1.5">
                            <Pencil className="w-3.5 h-3.5" />
                            Update
                          </span>
                        </UsePrimaryBtn>
                      </Link>
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

export default ParticipantInformations;
