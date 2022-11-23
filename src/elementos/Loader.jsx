import React from 'react';

const Loader = () => {
    return ( 
        <>
            <svg className="svgLoader" >
                <circle className="circle_1" cx="50" cy="50" r="20" />
                <circle className="circle_2" cx="50" cy="50" r="40" />
            </svg>
        </>
    );
}
 
export {Loader};