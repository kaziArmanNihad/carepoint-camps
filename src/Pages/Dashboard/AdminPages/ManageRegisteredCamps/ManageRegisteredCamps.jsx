import toast from "react-hot-toast";
import UseAxios from "../../../../CustomHooks/UseAxios";
import UseParticipant from "../../../../CustomHooks/UseParticipant";
import Swal from "sweetalert2";
import { ClipboardX, CheckCircle2, Clock3, XCircle } from "lucide-react";

const ManageRegisteredCamps = () => {
  // hook
  const [Participant, refetch] = UseParticipant();
  const axiosPublic = UseAxios();

  const handleConfirmed = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirmed it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedInfo = {
          confirmationStatus: "Confirmed",
        };
        axiosPublic
          .put(`/participants/confirm/${id}`, updatedInfo)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              // refetching the data
              refetch();

              // showing an alert
              toast.success("Participant registation has been confirmed.");
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

  if (Participant.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center p-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400">
            <ClipboardX className="w-7 h-7" />
          </span>
          <h1 className="text-xl font-bold text-slate-800">
            No participants found
          </h1>
          <p className="text-slate-500 text-sm">
            Registrations for your camps will show up here once people sign up.
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
            Manage Registered Camps
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review payment and confirm registrations for your camps
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs tracking-wide">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Participant</th>
                  <th className="px-4 py-3 font-semibold">Camp Name</th>
                  <th className="px-4 py-3 font-semibold">Fees</th>
                  <th className="px-4 py-3 font-semibold">Payment</th>
                  <th className="px-4 py-3 font-semibold">Confirmation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Participant.map((person, index) => (
                  <tr
                    key={person._id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {person.userName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{person.name}</td>
                    <td className="px-4 py-3 text-slate-600">{person.price}</td>
                    <td className="px-4 py-3">
                      {person.paymentStatus === "pay" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                          <XCircle className="w-3.5 h-3.5" />
                          Unpaid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Paid
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {person.confirmationStatus === "pending" ? (
                        <button
                          type="button"
                          onClick={() => handleConfirmed(person._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-700 bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-colors"
                        >
                          <Clock3 className="w-3.5 h-3.5" />
                          {person.confirmationStatus}
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {person.confirmationStatus}
                        </span>
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

export default ManageRegisteredCamps;
