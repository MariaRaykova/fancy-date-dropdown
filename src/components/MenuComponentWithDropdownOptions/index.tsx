import React, { useEffect, useMemo, useState } from "react";
import { components, MenuProps } from "react-select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { DefaultOptionType } from "../types";
import "./index.css"

library.add(faCaretDown);
library.add(faCaretUp);
library.add(faTrashCan);

const MenuComponentWithDropdownOptions = (props: MenuProps<DefaultOptionType>) => {
    // @ts-ignore 
    const { handleStart, startValue, clearStartValue, handleEnd, endValue, clearEndValue } = props.selectProps
    const [showStart, setShowStart] = useState<boolean>(false);
    const [showEnd, setShowEnd] = useState<boolean>(false);

    const handleChangeStart = (value: Date) => {
        handleStart(value)
        setShowStart(false)
    }
    const handleChangeEnd = (value: Date) => {
        handleEnd(value)
        setShowEnd(false)
    }
    return (
        <>
            <components.Menu {...props}>
                <div className="datepicker-wrapper">
                    <div>{props.children}</div>
                    {/* @ts-ignore */}
                    {props.selectProps.isOpenDropdown && (
                        <div className="custom-range-boxes">
                            <div className="calendar-wrapper" onClick={() => setShowStart(!showStart)}>
                                <div className="labels-wrapper">
                                    <label className="text" >
                                        {startValue ? moment(startValue).format("MMM DD, YYYY") : "Start Date"}
                                    </label>
                                    <label>
                                        <span className="icon-label">
                                            <FontAwesomeIcon
                                                icon={showStart ? "caret-up" : "caret-down"}
                                                className={showStart ? "icon-open" : "icon-close"}
                                            />
                                        </span>
                                        {showStart || endValue && (
                                            <span className="trash" onClick={(e) => {
                                                e.stopPropagation();
                                                clearStartValue()
                                            }}>
                                                <FontAwesomeIcon icon="trash-can" />
                                            </span>
                                        )}
                                    </label>
                                </div>
                                {showStart && (
                                    <DatePicker
                                        selected={startValue}
                                        onChange={handleChangeStart}
                                        inline
                                    />
                                )}
                            </div>
                            <div className="calendar-wrapper" onClick={() => setShowEnd(!showEnd)}>
                                <div className="labels-wrapper">
                                    <label className="text">
                                        {endValue ? moment(endValue).format("MMM DD, YYYY") : "End Date"}
                                    </label>
                                    <label className="end">
                                        <span className="icon-label">
                                            <FontAwesomeIcon
                                                icon={showEnd ? "caret-up" : "caret-down"}
                                                className={showEnd ? "icon-open" : "icon-close"}
                                            />
                                        </span >
                                        {showEnd || endValue && (
                                            <span className="trash" onClick={(e) => {
                                                e.stopPropagation();
                                                clearEndValue()
                                            }}>
                                                <FontAwesomeIcon icon="trash-can" />
                                            </span>
                                        )}
                                    </label>
                                </div>
                                {showEnd && (
                                    <DatePicker
                                        selected={endValue}
                                        onChange={handleChangeEnd}
                                        inline
                                    />)}
                            </div>
                            <div>
                            </div>
                        </div>
                    )}
                </div>
            </components.Menu>
        </>
    );
};

export default MenuComponentWithDropdownOptions;
