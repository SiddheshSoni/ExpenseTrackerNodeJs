import { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";

function Checkout() {
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const initializeSDK = async () => {
      const sdk = await load({
        mode: "sandbox",
      });

      setCashfree(sdk);
    };

    initializeSDK();
  }, []);

  const doPayment = async () => {
    try {
      if (!cashfree) {
        alert("Cashfree SDK is still loading...");
        return;
      }
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/pay", {
        method: "POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization':token
        },
      });

      if (!response.ok) {
        throw new Error("Unable to create payment.");
      }

      const data = await response.json();
      console.log(data);
      
      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      };

      const result = await cashfree.checkout(checkoutOptions);

      console.log(result);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="row">
      <p>Click below to open the checkout page in the current tab</p>

      <button
        className="btn btn-primary"
        onClick={doPayment}
        disabled={!cashfree}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;