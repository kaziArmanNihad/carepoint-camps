import { useContext } from "react";
import { AuthContext } from "../../../../Auth/AuthProvider";
import UsePayment from "../../../../CustomHooks/UsePayment";
import { ReceiptText, Calendar, Hash, Mail } from "lucide-react";

const UserPaymentHistory = () => {
  // context api
  const { user } = useContext(AuthContext);

  // hooks
  const [payment] = UsePayment();

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

  // filtering data
  const filteredpaymentData = payment.filter(
    (payment) => payment.email === user.email,
  );

  if (filteredpaymentData.length === 0) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex justify-center items-center p-4">
        <div className="flex flex-col items-center gap-3 text-center max-w-sm">
          <span className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400">
            <ReceiptText className="w-7 h-7" />
          </span>
          <h1 className="text-xl font-bold text-slate-800">
            No payment history found
          </h1>
          <p className="text-slate-500 text-sm">
            Payments you make for camps will be recorded here.
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
            Payment History
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            A record of every payment you&#39;ve made across your camps
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white text-black uppercase text-xs tracking-wide border-b border-slate-300">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Camp Name</th>
                  <th className="px-4 py-3 font-semibold">Fees</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredpaymentData.map((payment, index) => (
                  <tr
                    key={payment._id || index}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-black">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-black">
                      {payment.campName}
                    </td>
                    <td className="px-4 py-3 text-black">${payment.price}</td>
                    <td className="px-4 py-3 text-black">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-black" />
                        {payment.email}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-black">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-black" />
                        {payment.date}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-black font-mono text-xs">
                      <span className="flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-black shrink-0" />
                        {payment.transectionId}
                      </span>
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

export default UserPaymentHistory;
