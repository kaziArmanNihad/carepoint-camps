import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { MdCheck, MdArrowBack, MdOutlineCameraAlt } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const ProfileUpdate = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: string }

  const handleCancel = () => {
    navigate(-1);
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
      // Full reload back to the profile page so the AuthContext user
      // reflects the updated name/photo (same refresh behavior the
      // modal version relied on, just triggered after navigating back).
      window.location.href = "/dashboard/profile";
    } catch (err) {
      setFeedback({
        type: "error",
        text: err?.message || "Something went wrong.",
      });
      setIsSaving(false);
    }
  };

  return (
    <div className="font-poppins p-4 md:p-8 max-w-2xl mx-auto space-y-6 bg-slate-50 min-h-full">
      <button
        type="button"
        onClick={handleCancel}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <MdArrowBack className="w-4 h-4" />
        Back to Profile
      </button>

      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-6">
          Edit Profile
        </h1>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-teal-50 ring-2 ring-teal-100 flex items-center justify-center">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserAlt className="w-10 h-10 text-teal-400" />
                )}
              </div>
              <span className="absolute bottom-0 right-0 bg-teal-600 text-white rounded-full p-1.5 shadow-md">
                <MdOutlineCameraAlt className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition"
              placeholder="Your name"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition"
              placeholder="https://..."
            />
          </div>

          {feedback && (
            <p
              className={`text-sm ${
                feedback.type === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {feedback.text}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-1.5 bg-teal-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-60"
            >
              <MdCheck className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 text-slate-600 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
