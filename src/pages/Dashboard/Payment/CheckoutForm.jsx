import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import "./CheckoutForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, queryClass }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post("/create-payment-intent", { price })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            // console.log("[error]", error);
            setCardError(error.message);
        } else {
            // console.log("[payment method]", paymentMethod);
            setCardError("");
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

        if (confirmError) {
            // console.log(confirmError);
        }

        setProcessing(false);

        if (paymentIntent?.status === "succeeded") {
            // console.log("payment done", queryClass);
            setTransactionId(paymentIntent.id);
            const payment = {
                email: user?.email,
                instructorName: queryClass?.instructorName,
                instructorEmail: queryClass?.instructorEmail,
                class: queryClass?.classId,
                className: queryClass?.name,
                classImage: queryClass?.image,
                selectedClass: queryClass?._id,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
            };
            axiosSecure.post("/payments", payment).then((res) => {
                if (
                    res.data.insertResult.insertedId &&
                    res.data.updateResult.modifiedCount > 0 &&
                    res.data.deleteResult.deletedCount > 0
                ) {
                    toast.success(
                        `Payment successfully done of ${queryClass?.name} class`,
                        {
                            position: "bottom-right",
                            hideProgressBar: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        }
                    );
                    // Navigate Student to Enrolled Classes Route
                    setTimeout(() => {
                        navigate("/dashboard/student/enrolled-classes", {
                            replace: true,
                        });
                    }, 1000);
                }
            });
        }
    };

    return (
        <div className="w-full mx-5">
            <form className="w-full" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                    className="w-auto mx-auto mt-4"
                />
                <div className="form-control text-center mt-5">
                    {cardError && (
                        <p className="text-red-600 font-semibold">
                            {cardError}
                        </p>
                    )}
                </div>
                <div className="form-control text-center mt-5">
                    {transactionId && (
                        <p className="text-green-500 font-semibold">
                            Payment successfully completed with Transaction ID:{" "}
                            {transactionId}
                        </p>
                    )}
                </div>
                <div className="form-control flex justify-center mt-10">
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret || processing}
                        className="w-full max-w-xs bg-red-500 text-white p-2 font-semibold rounded-md hover:bg-red-700 disabled:bg-gray-400"
                    >
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
