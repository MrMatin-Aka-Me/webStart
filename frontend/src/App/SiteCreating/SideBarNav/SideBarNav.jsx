import React from 'react';
import AccordionItem from "components/accordionItem/AccordionItem";
import {v4 as uuidv4} from 'uuid';

const SideBarNav = ({items}) => {
    return (
        <>
            {items.map((item) => {
                return <AccordionItem key={uuidv4()} showComponent={item.showComponent} heading={item.heading} targetId={item.targetId}>
                    <ul>
                         {item.children.map(child => (
                            <li key={uuidv4()} className={'mb-2 mt-2'}>
                                <a href={child.url} className={'link'}>{child.linkText}</a>
                            </li>
                         ))}
                    </ul>
                </AccordionItem>
            })}
        </>
    );
};

export default SideBarNav;