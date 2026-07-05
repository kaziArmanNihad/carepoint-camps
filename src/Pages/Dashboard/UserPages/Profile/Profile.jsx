import { useContext, useState } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UseAdmin from "../../../../CustomHooks/UseAdmin";
import {
  MdEmail,
  MdEdit,
  MdCheck,
  MdClose,
  MdOutlineCameraAlt,
  MdVerified,
} from "react-icons/md";
import { FaUserShield, FaUserAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
  const [localUser, setLocalUser] = useState(null); // optimistic override until context refreshes

  // Prefer the local optimistic override (set right after a successful save)
  // over the context user, since context won't refresh on its own.
  const displayUser = localUser || user;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(displayUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(displayUser?.photoURL || "");
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: string }

  const handleCancel = () => {
    setName(displayUser?.displayName || "");
    setPhotoURL(displayUser?.photoURL || "");
    setIsEditing(false);
    setFeedback(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFeedback({ type: "error", text: "Name can't be empty." });
      return;
    }

    setIsSaving(true);
    setFeedback(null);
    try {
      // updateUser(name, photo, email) — email omitted here since changing
      // it requires re-authentication in Firebase; add an email field only
      // if you've handled that flow elsewhere.
      await updateUser(name.trim(), photoURL.trim());
      setLocalUser((prev) => ({
        ...(prev || user),
        displayName: name.trim(),
        photoURL: photoURL.trim(),
      }));
      setFeedback({ type: "success", text: "Profile updated." });
      setIsEditing(false);
    } catch (err) {
      setFeedback({
        type: "error",
        text: err?.message || "Something went wrong.",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
    <div className="font-poppins p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-CPC-ocean">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account information and see your activity at a glance.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-CPC-sky rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSave}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-CPC-ocean/10 ring-2 ring-CPC-ocean/20 flex items-center justify-center">
                {(isEditing ? photoURL : displayUser?.photoURL) ? (
                  <img
                    src={isEditing ? photoURL : displayUser?.photoURL}
                    alt={displayUser?.displayName || "User avatar"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserAlt className="w-10 h-10 text-CPC-ocean/50" />
                )}
              </div>
              {isEditing && (
                <span className="absolute bottom-0 right-0 bg-CPC-ocean text-white rounded-full p-1.5 shadow">
                  <MdOutlineCameraAlt className="w-4 h-4" />
                </span>
              )}
            </div>

            {/* Name / email / role */}
            <div className="flex-1 w-full space-y-3">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-CPC-sky"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-CPC-sky"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {displayUser?.displayName || "Unnamed User"}
                    </h2>
                    {displayUser?.emailVerified && (
                      <MdVerified
                        className="w-4 h-4 text-CPC-sky"
                        title="Email verified"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-black mt-1">
                    <MdEmail className="w-4 h-4" />
                    <span>{displayUser?.email}</span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                      isAdmin
                        ? "bg-CPC-ocean/10 text-CPC-ocean"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <FaUserShield className="w-3 h-3" />
                    {isAdmin ? "Organizer" : "Participant"}
                  </span>
                </div>
              )}
            </div>

            {/* Edit / Save controls */}
            <div className="flex gap-2 self-start sm:self-center">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-1.5 bg-CPC-ocean text-white text-sm font-medium px-4 py-2 rounded-xl hover:opacity-90 transition disabled:opacity-60"
                  >
                    <MdCheck className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-200 transition"
                  >
                    <MdClose className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 bg-CPC-ocean/10 text-CPC-ocean text-sm font-medium px-4 py-2 rounded-xl hover:bg-CPC-ocean/20 transition"
                >
                  <MdEdit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {feedback && (
            <p
              className={`text-sm mt-4 ${
                feedback.type === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {feedback.text}
            </p>
          )}
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-CPC-sky rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <p className="text-2xl font-semibold text-CPC-ocean">
              {stat.value}
            </p>
            <p className="text-sm text-black mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
