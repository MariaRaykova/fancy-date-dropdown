import React, { FC, useState } from "react";
import { components, OptionProps } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { DefaultOptionType, defaultOptions } from "../Dropdown"
import "./index.css"

// @ts-ignore
const Option = (props) => {
    //  const {data, selectOption,selectProps,} = props;
    // @ts-ignore

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { showDatepickerCalendar } = props.selectProps;
    library.add(faCaretDown);
    library.add(faCaretUp);

    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        // @ts-ignore
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
export default Option