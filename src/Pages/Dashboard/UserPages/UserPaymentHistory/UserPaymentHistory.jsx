import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UsePayment from "../../../../CustomHooks/UsePayment";

const UserPaymentHistory = () => {
  // context api
  const { user } = useContext(AuthContext);

  // hooks
  const [payment] = UsePayment();

  // filtering data
  const filteredpaymentData = payment.filter(
    (payment) => payment.email === user.email,
  );

  if (filteredpaymentData.length === 0) {
    return (
      <div className="w-full h-screen overflow-hidden bg-sky-100">
        <div className="w-4/5 h-80 mx-auto my-10 flex justify-center items-center flex-col gap-5">
          <h1 className="text-6xl text-center text-CPC-ocean font-bold">
            Payment History Not Found!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-hidden p-2 bg-sky-100">
      <div className="w-full md:w-11/12 min-h-full mx-auto bg-CPC-ocean my-10 md:rounded-xl p-4">
        <h1 className="text-2xl text-center p-4 font-bold text-white uppercase">
          Payment History
        </h1>
        {/* table content */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            {/* head */}
            <thead>
              <tr className="text-white uppercase bg-CPC-sky">
                <th className="px-2 py-1 text-left">SL</th>
                <th className="px-2 py-1 text-left">Camp Name</th>
                <th className="px-2 py-1 text-left">Fees</th>
                <th className="px-2 py-1 text-left">Email</th>
                <th className="px-2 py-1 text-left">Date</th>
                <th className="px-2 py-1 text-left">Transaction Id</th>
              </tr>
            </thead>
            <tbody>
              {filteredpaymentData.map((payment, index) => (
                <tr key={index} className="text-white">
                  <td className="border-t border-white px-2 py-1">
                    {index + 1}
                  </td>
                  <td className="border-t border-white px-2 py-1">
                    {payment.campName}
                  </td>
                  <td className="border-t border-white px-2 py-1">
                    {payment.price}
                  </td>
                  <td className="border-t border-white px-2 py-1">
                    {payment.email}
                  </td>
                  <td className="border-t border-white px-2 py-1">
                    {payment.date}
                  </td>
                  <td className="border-t border-white px-2 py-1">
                    {payment.transectionId}
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

export default UserPaymentHistory;
