import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UseAdmin from "../../../../CustomHooks/UseAdmin";
import { MdEmail, MdEdit, MdVerified } from "react-icons/md";
import { FaUserShield, FaUserAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
  const navigate = useNavigate();

  const stats = isAdmin
    ? [
        { label: "Camps Managed", value: "—" },
        { label: "Total Participants", value: "—" },
        { label: "Requests Pending", value: "—" },
      ]
    : [
        { label: "Camps Joined", value: "—" },
        { label: "Payments Made", value: "—" },
        { label: "Upcoming Camps", value: "—" },
      ];

  return (
    <div className="font-poppins p-4 md:p-8 max-w-4xl mx-auto space-y-6 bg-slate-50 min-h-full">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account information and see your activity at a glance.
        </p>
      </div>

      {/* Profile card (read-only display) */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-teal-50 ring-2 ring-teal-100 flex items-center justify-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user?.displayName || "User avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserAlt className="w-10 h-10 text-teal-400" />
              )}
            </div>
          </div>

          {/* Name / email / role */}
          <div className="flex-1 w-full space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-800">
                  {user?.displayName || "Unnamed User"}
                </h2>
                {user?.emailVerified && (
                  <MdVerified
                    className="w-4 h-4 text-teal-500"
                    title="Email verified"
                  />
                )}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                <MdEmail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                  isAdmin
                    ? "bg-teal-50 text-teal-700 border border-teal-100"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                <FaUserShield className="w-3 h-3" />
                {isAdmin ? "Organizer" : "Participant"}
              </span>
            </div>
          </div>

          {/* Navigates to the dedicated edit page instead of opening a modal */}
          <div className="flex gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={() => navigate("/dashboard/ProfileUpdate")}
              className="flex items-center gap-1.5 bg-teal-50 text-teal-700 text-sm font-medium px-4 py-2 rounded-xl border border-teal-100 hover:bg-teal-100 transition-colors"
            >
              <MdEdit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow-md border border-slate-100 p-5"
          >
            <p className="text-2xl font-semibold text-slate-800">
              {stat.value}
            </p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
