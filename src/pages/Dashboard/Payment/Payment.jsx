import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useSelectedClasses from "../../../hooks/useSelectedClasses";
import { useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [selectedClasses] = useSelectedClasses();
    const location = useLocation();
    const queryClassId = new URLSearchParams(location.search).get("classId");
    const queryClass = selectedClasses.find(
        (currentClass) => currentClass?.classId === queryClassId
    );
    const price = parseFloat(queryClass?.price.toFixed(2)) || 0;

    return (
        <div className="payment">
            <SectionTitle
                heading="Payment"
                description="Welcome to the Payment Section! In this section, you can securely complete your payment and finalize your purchase. We offer a seamless and convenient payment process to ensure a smooth transaction. Enter your card details and simply click on the Pay Now button to proceed payment."
            ></SectionTitle>
            <div className="card-container max-w-[768px] mx-auto">
                <div className="border-2 border-red-100 px-4 py-10 rounded-lg flex flex-col items-center">
                    <div className="class-information space-y-4 mb-5">
                        <h2 className="text-xl font-semibold">
                            Class Name:{" "}
                            <span className="font-normal">
                                {queryClass?.name}
                            </span>
                        </h2>
                        <h2 className="text-xl font-semibold">
                            Pay Amount:{" "}
                            <span className="bg-blue-500 text-white rounded-md  px-2 py-0.5 font-normal">
                                ${queryClass?.price}
                            </span>
                        </h2>
                    </div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            queryClass={queryClass}
                            price={price}
                        ></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
