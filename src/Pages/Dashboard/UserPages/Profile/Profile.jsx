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
  const [localUser, setLocalUser] = useState(null);
  const displayUser = localUser || user;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(displayUser?.displayName || "");
  const [photoURL, setPhotoURL] = useState(displayUser?.photoURL || "");
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: string }

  const openEditModal = () => {
    // seed the form with the latest known values every time it opens
    setName(displayUser?.displayName || "");
    setPhotoURL(displayUser?.photoURL || "");
    setFeedback(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
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
      await updateUser(name.trim(), photoURL.trim());
      setLocalUser((prev) => ({
        ...(prev || user),
        displayName: name.trim(),
        photoURL: photoURL.trim(),
      }));
      setIsEditing(false);
    } catch (err) {
      setFeedback({
        type: "error",
        text: err?.message || "Something went wrong.",
      });
    } finally {
      setIsSaving(false);
      window.location.reload();
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

      {/* Profile card (read-only display) */}
      <div className="bg-CPC-sky rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-CPC-ocean/10 ring-2 ring-CPC-ocean/20 flex items-center justify-center">
              {displayUser?.photoURL ? (
                <img
                  src={displayUser.photoURL}
                  alt={displayUser?.displayName || "User avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserAlt className="w-10 h-10 text-CPC-ocean/50" />
              )}
            </div>
          </div>

          {/* Name / email / role */}
          <div className="flex-1 w-full space-y-3">
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
          </div>

          {/* Trigger for the modal */}
          <div className="flex gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={openEditModal}
              className="flex items-center gap-1.5 bg-CPC-ocean/10 text-CPC-ocean text-sm font-medium px-4 py-2 rounded-xl hover:bg-CPC-ocean/20 transition"
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
            className="bg-CPC-sky rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <p className="text-2xl font-semibold text-CPC-ocean">
              {stat.value}
            </p>
            <p className="text-sm text-black mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Edit Profile modal */}
      {isEditing && (
        <div
          className="fixed inset-[-40px] z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleCancel}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-800">
                Edit Profile
              </h3>
              <button
                type="button"
                onClick={handleCancel}
                aria-label="Close"
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-CPC-ocean/10 ring-2 ring-CPC-ocean/20 flex items-center justify-center">
                    {photoURL ? (
                      <img
                        src={photoURL}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserAlt className="w-8 h-8 text-CPC-ocean/50" />
                    )}
                  </div>
                  <span className="absolute bottom-0 right-0 bg-CPC-ocean text-white rounded-full p-1.5 shadow">
                    <MdOutlineCameraAlt className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

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
                  autoFocus
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

              {feedback && (
                <p
                  className={`text-sm ${
                    feedback.type === "success"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {feedback.text}
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-CPC-ocean text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:opacity-90 transition disabled:opacity-60"
                >
                  <MdCheck className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
