import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// ! add publishable key
const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    return (
        <div>
            <SectionTitle subHeading="---Reservation---" heading="BOOK A TABLE"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;