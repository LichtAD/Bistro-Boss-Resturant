import React from 'react';
import SectionTitle from '../components/SectionTitle';
import MenuItem from '../Shared/MenuItem';
import UseMenu from '../Hooks/UseMenu';

const PopularMenu = () => {

    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular');
    //             setMenu(popularItems);
    //         })
    // }, [])

    const [menu] = UseMenu();
    const popularItems = menu.filter(item => item.category === 'popular');

    return (
        <div className='mt-10 mb-20'>
            <SectionTitle heading='FROM OUR MENU' subHeading='---Check it out---'></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popularItems.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;