import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center my-10'>
            <p className='text-[#efb325] mb-4 italic'>{subHeading}</p>
            <h2 className='text-4xl border-y-2 w-[30%] py-4 mx-auto uppercase'>{heading}</h2>
        </div>
    );
};

export default SectionTitle;