import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UseParticipant from "../../../../CustomHooks/UseParticipant";
import { Link } from "react-router-dom";
import UsePrimaryBtn from "../../../../CustomHooks/UsePrimaryBtn";

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
      <div className="w-full h-full my-10 flex flex-col justify-center items-center">
        <p className="w-96 h-full loading loading-infinity loading-xl"></p>
        <h1 className="text-4xl">Loading Data...</h1>
      </div>
    );
  }

  if (participantProfile.length === 0) {
    return (
      <div className="bg-sky-100 w-full h-screen overflow-hidden">
        <div className="w-4/5 h-80 mx-auto my-10 flex justify-center items-center flex-col gap-5">
          <h1 className="text-6xl text-center text-CPC-ocean font-bold">
            No Participants Found!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-sky-100 overflow-hidden">
      <div className="w-11/12 min-h-full mx-auto my-10 rounded-xl bg-CPC-ocean p-5">
        <h1 className="p-3 text-2xl text-center font-bold text-white uppercase">
          Participant Information
        </h1>
        {/* table content */}
        <div className="overflow-x-auto my-5">
          <table className="table-auto min-w-full text-left text-sm text-white">
            {/* head */}
            <thead>
              <tr className="text-white uppercase bg-CPC-sky">
                <th className="p-2">SL</th>
                <th className="p-2">Camp Name</th>
                <th className="p-2">Location</th>
                <th className="p-2">Name</th>
                <th className="p-2">Age</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Emergency Contact</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {participantProfile.map((participant, index) => (
                <tr key={participant._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{participant.name}</td>
                  <td className="p-2">{participant.location}</td>
                  <td className="p-2">{participant.userName}</td>
                  <td className="p-2">{participant.age}</td>
                  <td className="p-2">{participant.phone}</td>
                  <td className="p-2">{participant.gender}</td>
                  <td className="p-2">{participant.emergencyContact}</td>
                  <td className="p-2">
                    <Link
                      to={`/dashboard/participantProfileUpdate/${participant._id}`}
                    >
                      <UsePrimaryBtn isUpdate>Update</UsePrimaryBtn>
                    </Link>
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

export default ParticipantInformations;
