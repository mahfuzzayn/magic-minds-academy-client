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
    const navigate = useNavigate();
    const queryClassId = new URLSearchParams(location.search).get("classId");

    const queryClass = selectedClasses.find(
        (currentClass) => currentClass?.classId === queryClassId
    );
    const price = parseFloat(queryClass?.price.toFixed(2)) || 0;

    return (
        <div className="payment">
            <SectionTitle heading="Payment"></SectionTitle>
            <h2 className="text-3xl">Please pay your money: {price}</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    queryClass={queryClass}
                    price={price}
                ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;
