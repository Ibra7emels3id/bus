import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ContextData } from '../context/ContextApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Key Stripe
const stripePromise = loadStripe('pk_test_51PDqAJP7DuJ1bxg9C8hrMTzsSl9qWrMA0oRfdqGKPdxcjO0LwgVWHRTQxxMjxpEn1AJYB9Dta5DfXW8f21hmQMD500wQY8u1pG');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret2, setClientSecret] = useState(null);
    const { UserData } = useContext(ContextData);
    const [dataCart, setData] = useState({});
    const navegate = useNavigate()


    // Change input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    console.log(clientSecret2?.productId);


    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SOME_URL}/api/reservations`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Filter User data 
            const filterData = data.filter((it) => it.email === UserData?.user?.email);

            // Latest reservation
            filterData.sort((a, b) => new Date(b.NewDate) - new Date(a.NewDate));

            // Latest reservation Length
            const firstReservation = filterData[0];

            // Set new reservation
            setClientSecret(firstReservation);

        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };


    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_SOME_URL}/create-payment-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: clientSecret2.totalPrice,
                    currency: 'USD',
                    customer: UserData?.user?._id,
                    email: UserData?.user?.email,
                    inTime: clientSecret2?.inTime,
                    outTime: clientSecret2?.outTime,
                    date: clientSecret2?.date,
                    from: clientSecret2?.from,
                    to: clientSecret2?.to,
                    name: UserData?.user?.name,
                    productId: clientSecret2?.productId,
                    lengthChairs: clientSecret2?.lengthChairs,
                    items: clientSecret2.chair.map(item => {
                        return {
                            chair: item.chairNumber,
                            price: item.price,
                            email: item.email,
                            chairId: item.chairId,
                            UserId: UserData?.user?.userId,
                            status: item?.status
                        }
                    })

                }),
            });

            const data = await response.json();
            const clientSecret = data.clientSecret;

            if (!clientSecret) {
                throw new Error('Client secret is missing from the response');
            }

            // Confirm Payment client Secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: dataCart.name,
                    },
                },
            });

            if (result.error) {
                console.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    toast.success('Payment succeeded!');
                    return navegate('/')
                }
            }

        } catch (error) {
            console.error('Error during payment:', error.message);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [UserData?.user]);



    return (
        <form onSubmit={handlePayment} className="space-y-6 m-auto w-[95%]">
            <div className="flex flex-col space-y-4">
                <label className="block text-sm font-medium text-gray-700">Card Information</label>
                <div className="mt-1">
                    <CardElement className="block w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <input
                        onChange={handleInputChange}
                        name='name'
                        type="text"
                        className="block w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter Your Name Cart"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm p-3 border focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="example@mail.com"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || isLoading}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {isLoading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

const CheckoutPage = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="w-full max-w-md">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default CheckoutPage;
