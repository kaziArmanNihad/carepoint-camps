import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UseParticipant from "../../../../CustomHooks/UseParticipant";
import Swal from "sweetalert2";
import UseAxios from "../../../../CustomHooks/UseAxios";
import { Link } from "react-router-dom";
import UsePrimaryBtn from "../../../../CustomHooks/UsePrimaryBtn";
import toast from "react-hot-toast";

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
      <div className="w-full h-full my-10 flex flex-col justify-center items-center">
        <p className="w-96 h-full loading loading-infinity loading-xl"></p>
        <h1 className="text-4xl">Loading Data...</h1>
      </div>
    );
  }

  if (participantRequiests.length === 0) {
    return (
      <div className="w-full h-screen bg-sky-100">
        <div className="w-4/5 h-80 mx-auto my-10 flex justify-center items-center flex-col gap-5">
          <h1 className="text-6xl text-center text-CPC-ocean font-bold">
            No Requiests Found!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-2 bg-sky-100 overflow-hidden">
      <div className="bg-CPC-ocean w-full md:w-11/12 min-h-full mx-auto my-10 rounded-xl p-5">
        <h1 className="text-center text-2xl font-bold p-4 text-white uppercase">
          Requested Camps
        </h1>
        {/* table content */}
        <div className="overflow-x-auto my-5">
          <table className="min-w-full divide-y divide-gray-200">
            {/* head */}
            <thead>
              <tr className="text-white uppercase bg-CPC-sky">
                <th className="px-4 py-2 text-left text-sm font-medium">SL</th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Camp Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Camp Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Participant Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Payment Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Confirmation Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {participantRequiests.map((participant, index) => (
                <tr key={participant._id} className="text-white">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{participant.name}</td>
                  <td className="px-4 py-2">{participant.price}</td>
                  <td className="px-4 py-2">{participant.userName}</td>
                  <td className="px-4 py-2">
                    {participant.paymentStatus === "pay" ? (
                      <Link to={`/dashboard/payment/${participant._id}`}>
                        <UsePrimaryBtn blackBorder>Pay</UsePrimaryBtn>
                      </Link>
                    ) : (
                      <UsePrimaryBtn disabled>Paid</UsePrimaryBtn>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {participant.confirmationStatus === "pending" ? (
                      <h1 className="p-2 rounded-xl uppercase text-yellow-500 text-2xl font-bold">
                        Pending
                      </h1>
                    ) : (
                      <h1 className="p-2 rounded-xl uppercase text-green-500 text-2xl font-bold">
                        Confirmed
                      </h1>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {participant.paymentStatus === "pay" ? (
                      <UsePrimaryBtn
                        onClick={() => handleDelete(participant._id)}
                        isLogout
                        blackBorder
                      >
                        Cancel
                      </UsePrimaryBtn>
                    ) : (
                      <UsePrimaryBtn disabled isLogout blackBorder>
                        Cancel
                      </UsePrimaryBtn>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRequiestedCamps;
