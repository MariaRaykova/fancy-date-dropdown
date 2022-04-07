import React, { FC, useState } from "react";
import { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import "./index.css"

// @ts-ignore
const DefaultOptionsComponent = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { showDatepickerCalendar } = props.selectProps;
    library.add(faCaretDown);
    library.add(faCaretUp);

    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
      if (props.data.value === "dateRange" ) {
            event.stopPropagation();
            showDatepickerCalendar()
            setIsOpen(!isOpen)
        } else{
             props.selectOption(props.data)
        }
    };
    return (
        <>
            <components.Option {...props}  >
                <label onClick={onClickHandler} className="option-container"  >
                    {props.children}
                    {props.data.value === "dateRange" && props.isFocused ? (
                        <label className="icon" >
                            <FontAwesomeIcon
                                icon={ isOpen ? "caret-down" : "caret-up"}
                                className="checkbox-select-group-caret"
                            />
                        </label>
                    ) : ''}
                </label>
            </components.Option>
        </>
    );
};
export default DefaultOptionsComponent;