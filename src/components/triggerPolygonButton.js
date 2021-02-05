import React, {useState} from 'react';

/*
    This function renders a button that changes its button text and click event. 
    Using useState, it has been separated
    because buttonText has to be re-rendered everytime it changes.
    It takes button event props from the higher component to stay connected from the higher component.

    Param(s):
        - initialButtonEvent: a button event to be triggered before text change
        - secondButtonEvent: a button event to be triggered after text change
    
    Return:
        - a button that triggers an event based on the button text.
*/

const TriggerPolygonButton = ({
    initialButtonEvent,      //function given from the higher component
    secondButtonEvent        //function given from the higher component
})=>{
    const [buttonText, setButtonText] = useState("다각형확인"); //ensuring re-rendering 
  
    return (
        <button
            onClick={()=>{
                switch (buttonText){
                    case "주변다각형":
                        secondButtonEvent();
                        setButtonText("다각형확인");
                        break
                    default:
                        initialButtonEvent();
                        setButtonText("주변다각형");
                }
            }}
        >
            {buttonText}
        </button>
    );
};

export {TriggerPolygonButton};
