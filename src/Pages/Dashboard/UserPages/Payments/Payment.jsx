import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router";
import UseParticipant from "../../../../CustomHooks/UseParticipant";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const { id } = useParams();

  // hooks
  const [participant] = UseParticipant();

  // finding the price
  const participantInfo = participant.find(
    (participant) => participant._id === id,
  );

  const campName = participantInfo.name;
  // converting the price property value string to number
  const price = Number(participantInfo.price.slice(1));

  return (
    <div className="w-full min-h-screen overflow-hidden bg-slate-50">
      <div className="bg-white w-full md:w-4/5 min-h-full mx-auto my-10 shadow-xl rounded-xl">
        <h1 className="text-2xl font-bold text-center p-3 text-black uppercase">
          Payment
        </h1>

        <div className="w-full md:w-4/5 h-auto mx-auto my-10 p-4 ">
          <Elements stripe={stripePromise}>
            <CheckoutForm price={price} campName={campName} id={id} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
