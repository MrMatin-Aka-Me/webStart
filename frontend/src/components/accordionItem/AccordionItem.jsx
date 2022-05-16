import React from 'react';
import './AccordionItem.css'
import {useDispatch, useSelector} from "react-redux";
import {editShowedComponent} from "store/reducers/siteCreatingInfo";


const AccordionItem = ({showComponent, heading, targetId, ...props}) => {

    const dispatch = useDispatch()
    const {showedComponentId} = useSelector(state => state.siteCreatingInfo)

    const handleOnBtnClick = () => {
        dispatch(editShowedComponent(showComponent))
    }

    console.log(showedComponentId,showComponent)

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={"heading" + targetId}>
                <button className={'accordion-button btn-rm-focus-border ' + (showComponent !== showedComponentId ? 'collapsed' : '')} type="button"
                        aria-expanded={showComponent === showedComponentId}
                        onClick={handleOnBtnClick}
                >
                    {heading}
                </button>
            </h2>
            <div id={"collapse" + targetId} className={'accordion-collapse collapse ' + (showComponent !== showedComponentId ? '' : 'show')}
                 aria-labelledby="headingOne">
                {props.children}
            </div>
        </div>
    );
};

export default AccordionItem;