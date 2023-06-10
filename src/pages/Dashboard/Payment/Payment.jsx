import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useSelectedClasses from "../../../hooks/useSelectedClasses";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [selectedClasses] = useSelectedClasses();
    const total = selectedClasses.reduce((sum, item) => item.price + sum, 0);
    const price = parseFloat(total.toFixed(2));
    console.log(price);
    return (
        <div className="payment">
            <SectionTitle heading="Payment"></SectionTitle>
            <h2 className="text-3xl">Please pay your money: ${total}</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    selectedClasses={selectedClasses}
                    price={price}
                ></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;
