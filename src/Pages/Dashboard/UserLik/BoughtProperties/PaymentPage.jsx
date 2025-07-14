import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./StripePromise";
import Payment from "./Payment";

const PaymentPage = () => (
  <div className="pt-32 max-w-4xl mx-auto p-4">
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  </div>
);

export default PaymentPage;
