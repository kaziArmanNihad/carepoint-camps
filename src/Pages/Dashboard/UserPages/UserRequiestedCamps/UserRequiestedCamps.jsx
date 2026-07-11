import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UseParticipant from "../../../../CustomHooks/UseParticipant";
import Swal from "sweetalert2";
import UseAxios from "../../../../CustomHooks/UseAxios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipboardX, CreditCard, Clock3, CheckCircle2, X } from "lucide-react";

const UserRequiestedCamps = () => {
  // context api
  const { user } = useContext(AuthContext);

  // hooks
  const [participant, refetch] = UseParticipant();
  const axiosPublic = UseAxios();

  const participantRequiests = participant.filter(
    (participant) => participant.userEmail === user.email,
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/participants/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // refetching data
              refetch();

              // showing an alert
              toast.success("Your registation has been deleted.");
            }
          })
          .catch((error) => {
            console.log(error);

            // showing an alert
            toast.error(error);
          });
      }
    });
  };

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

  if (participantRequiests.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center p-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400">
            <ClipboardX className="w-7 h-7" />
          </span>
          <h1 className="text-xl font-bold text-slate-800">
            No requests found
          </h1>
          <p className="text-slate-500 text-sm">
            Camps you request to join will show up here for payment and status
            tracking.
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
            Requested Camps
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track payment and confirmation status for camps you&#39;ve requested
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs tracking-wide">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Camp Name</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Participant</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Confirmation</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {participantRequiests.map((participant, index) => (
                  <tr
                    key={participant._id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {participant.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      ${participant.price}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {participant.userName}
                    </td>
                    <td className="px-4 py-3">
                      {participant.paymentStatus === "pay" ? (
                        <Link to={`/dashboard/payment/${participant._id}`}>
                          <button
                            type="button"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            Pay
                          </button>
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Paid
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {participant.confirmationStatus === "pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-amber-50 text-amber-700">
                          <Clock3 className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Confirmed
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {participant.paymentStatus === "pay" ? (
                        <button
                          type="button"
                          onClick={() => handleDelete(participant._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors ml-auto"
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed ml-auto"
                        >
                          <X className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      )}
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

export default UserRequiestedCamps;
