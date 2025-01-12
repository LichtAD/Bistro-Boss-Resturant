import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';

const UseCart = () => {
    // tanstack query diye load krbo, instead of useeffect, array ta return korbe

    // axios thk localhost 5000 pacche
    const axiosSecure = UseAxiosSecure();

    const { user } = UseAuth();

    const { refetch, data: cart=[] } = useQuery({
        queryKey: ['cart', user?.email],    // cart and email mix kre key banabe tanstack query
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);  // FIXME: problem local host e data dekhai na
            return res.data;
        }
    })

    return [cart, refetch];
};

export default UseCart;