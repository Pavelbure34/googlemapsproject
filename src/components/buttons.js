import React, {useState} from 'react';

/*
    This function renders buttons to render polygon on the map. 
*/

const Buttons = ()=>{
    const [toggleButton, setToggleButton] = useState(true);

    return (
        <>
            <button
                id="button2"
                onClick={()=>setToggleButton(!toggleButton)}
                className={(toggleButton)?"invisible":"visible"}
            >
                주변다각형
            </button>:<button
                id="button1"
                onClick={()=>setToggleButton(!toggleButton)}
                className={(toggleButton)?"visible":"invisible"}
            >
            다각형확인
            </button>
        </>
    );
};

export {Buttons};
