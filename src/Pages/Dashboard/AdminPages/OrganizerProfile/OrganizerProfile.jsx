import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { Link } from "react-router-dom";
import { MdEmail, MdEdit, MdVerified } from "react-icons/md";
import { FaUserShield, FaUserAlt } from "react-icons/fa";

const OrganizerProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Organizer Profile
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Your account information and role within Carepoint Camp
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-teal-50 ring-2 ring-teal-100 flex items-center justify-center">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user?.displayName || "Organizer avatar"}
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
                    {user?.displayName || "Unnamed Organizer"}
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
                <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100">
                  <FaUserShield className="w-3 h-3" />
                  Admin
                </span>
              </div>
            </div>

            {/* Trigger for the update page */}
            <div className="flex gap-2 self-start sm:self-center">
              <Link to="/dashboard/organizerProfileUpdate">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                >
                  <MdEdit className="w-4 h-4" />
                  Update
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;
