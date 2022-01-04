import axios from "axios";
import useAuth from "./useAuth";

const UseRazorPay = () => {
  const { user } = useAuth();
  const loadRazorpay = (price, setPaymentId, placeOrder) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        const result = await axios.post(
          "https://mysterious-falls-17889.herokuapp.com/create-order",
          {
            amount: price * 100,
          }
        );
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(
          "https://mysterious-falls-17889.herokuapp.com/get-razorpay-key"
        );

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: user?.displayName,
          description: "Drone Payment",
          order_id: order_id,
          handler: async function (response) {
            console.log(response);
            setPaymentId(response.payment_id);
            placeOrder();
          },
          prefill: {
            name: user?.displayName,
            email: user?.email,
            contact: "",
          },
          notes: {
            address: "",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
      }
    };
    document.body.appendChild(script);
  };
  return {
    loadRazorpay,
  };
};

export default UseRazorPay;
