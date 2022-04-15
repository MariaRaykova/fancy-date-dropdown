import React, { FC, useState } from "react";
import { components, OptionProps } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { DefaultOptionType } from "../types";
import "./index.css"

library.add(faCaretDown);
library.add(faCaretUp);
library.add(faTrashCan);

const DefaultOptionsComponent = (props: OptionProps<DefaultOptionType>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    // @ts-ignore
    const { onShowDropdownClick } = props.selectProps;

    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        if (props.data.value === "dateRange") {
            event.stopPropagation();
            onShowDropdownClick()
            setIsOpen(!isOpen)
        }
        props.selectOption(props.data)
    };
    return (
        <>
            <components.Option {...props}  >
                <label onClick={onClickHandler} className="option-container"  >
                    {props.children}
                    {props.data.value === "dateRange" && props.isFocused && (
                        <span className="icon" >
                            <FontAwesomeIcon
                                icon={isOpen ? "caret-down" : "caret-up"}
                                className="checkbox-select-group-caret"
                            />
                        </span>
                    )}
                </label>
            </ components.Option >
        </>
    );
};
export default DefaultOptionsComponent;
