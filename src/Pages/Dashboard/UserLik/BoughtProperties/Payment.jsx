import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FiCreditCard } from "react-icons/fi";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { offerId } = useParams();

  const [clientSecret, setClientSecret] = useState("");
  const [offer, setOffer] = useState(null);
  const [loader, setLoader] = useState(false);

  console.log(stripe);
  console.log(clientSecret);
  console.log(offerId);

  // Fetch offer details & generate payment intent
  useEffect(() => {
    axiosSecure.get(`/offers/${offerId}`).then((res) => {
      setOffer(res.data);
      console.log(typeof res.data.offerAmount);

      axiosSecure
        .post("/create-payment-intent", { amount: res.data.offerAmount })
        .then((res) => setClientSecret(res.data.clientSecret));
    });
  }, [offerId, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setLoader(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      toast.error(confirmError.message);
      setLoader(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        transactionId: paymentIntent.id,
        status: "bought",
        paidAt: new Date().toISOString(),
      };

      await axiosSecure.patch(`/offers/payment/${offerId}`, paymentData);

      toast.success("Payment Successful!");
      navigate("/dashboard/bought");
    }

    setLoader(false);
  };

  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1500"
      className="max-w-2xl mx-auto pt-32 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200"
      >
        {/* Top bar */}
        <div className="bg-gradient-to-r from-orange-500 to-[#14203e] text-white px-6 py-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FiCreditCard /> Complete Your Payment
          </h2>
          {offer && (
            <p className="text-sm mt-1">
              Paying <span className="font-bold">${offer.offerAmount}</span> for{" "}
              <span className="italic">{offer.propertyTitle}</span>
            </p>
          )}
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          <label className="block font-medium text-gray-700">
            Card Details
            <CardElement className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition" />
          </label>

          <button
            type="submit"
            disabled={!stripe || !clientSecret || loader}
            className="w-full bg-orange-500 hover:bg-[#14203e] text-white font-medium py-3 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loader ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
