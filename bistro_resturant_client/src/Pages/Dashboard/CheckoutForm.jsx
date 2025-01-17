import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import UseCart from '../../Hooks/UseCart';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {

    const { user } = UseAuth();

    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');

    const [transactionId, setTransactionId] = useState('');

    const [clientSecret, setClientSecret] = useState('');

    const axiosSecure = UseAxiosSecure();
    const [cart, refetch] = UseCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalPrice]);

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        // Use your card Element with other Stripe API methods
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            setError(confirmError.message);
            console.log('confirm error', confirmError);
            return;
        }
        else {
            setError('');
            console.log('payment intent', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                console.log('transaction id', paymentIntent.id);

                // store payment info in database
                const payment = {
                    email: user?.email || 'anonymous',
                    transactionId: paymentIntent.id,
                    price: totalPrice,
                    date: new Date(),    // utc date convert, use moment.js/fate-fns
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'service pending',
                    // quantity: cart.length,
                }

                axiosSecure.post('/payments', payment)
                    .then(res => {
                        refetch();
                        console.log('payment saved', res.data);
                        if (res.data?.result?.insertedId) {
                            // display confirm
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Payment successful',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/dashboard/paymentHistory');
                        }
                    })
            }
        }
    }

    return (
        <form onSubmit={handlePaymentSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className="text-red-600">{error}</p>
            {
                transactionId && (
                    <p className="text-green-600">Transaction complete with transactionId: {transactionId}</p>
                )
            }
        </form>
    );
};

export default CheckoutForm;