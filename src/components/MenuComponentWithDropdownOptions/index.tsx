import React, { Fragment, useEffect, useState, FC } from "react";
import Select, { components } from "react-select";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.css"

// @ts-ignore
const MenuComponentWithDropdownOptions = (props) => {
    const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
    const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
    const [showStart, setShowStart] = useState<boolean>(false);
    const [showEnd, setShowEnd] = useState<boolean>(false);

    library.add(faCaretDown);
    library.add(faCaretUp);
    library.add(faTrashCan);

    const handleChangeStart = (value: Date) => {
        setCustomStartDate(value)
        setShowStart(false)
    }
    const handleChangeEnd = (value: Date) => {
        setCustomEndDate(value)
        setShowEnd(false)
    }
    return (
        <>
            <components.Menu {...props}>
                <div className="datepicker-wrapper">
                    <div>{props.children}</div>
                    {props.selectProps.showDropdown ? (
                        <div className="custom-range-boxes">
                            <components.Option {...props}  >
                                <div className="calendar-wrapper" onClick={() => setShowStart(!showStart)}>
                                    <div className="labels-wrapper">
                                        <label className="text" >
                                            {customStartDate ? customStartDate.toDateString() : "Start Date"}
                                        </label>
                                        <label>
                                            <label className="icon-label">
                                                <FontAwesomeIcon
                                                    icon={showStart ? "caret-up" : "caret-down"}
                                                    className={showStart ? "icon-open" : "icon-close"}
                                                />
                                            </label>
                                            {customStartDate ? (
                                                <label className="trash" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCustomStartDate(null)
                                                }}>
                                                    <FontAwesomeIcon icon="trash-can" />
                                                </label>
                                            ) : null}
                                        </label>
                                    </div>
                                    {showStart ? (
                                        <DatePicker
                                            className="range-date-picker"
                                            selected={customStartDate}
                                            onChange={handleChangeStart}
                                            inline
                                        />
                                    ) : ""}
                                </div>
                            </components.Option>
                            <components.Option {...props}  >
                                <div className="calendar-wrapper" onClick={() => setShowEnd(!showEnd)}>
                                    <div className="labels-wrapper">
                                        <label className="text">
                                            {customEndDate ? customEndDate.toDateString() : "End Date"}
                                        </label>
                                        <label className="end">
                                            <label className="icon-label">
                                                <FontAwesomeIcon
                                                    icon={showEnd ? "caret-up" : "caret-down"}
                                                    className={showEnd ? "icon-open" : "icon-close"}
                                                />
                                            </label>
                                            {customEndDate ? (
                                                <label className="trash" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCustomEndDate(null)
                                                }}>
                                                    <FontAwesomeIcon icon="trash-can" />
                                                </label>
                                            ) : null}
                                        </label>
                                    </div>
                                    {showEnd ? (
                                        <DatePicker
                                            className="range-date-picker"
                                            selected={customEndDate}
                                            onChange={handleChangeEnd}
                                            inline
                                        />) : ''}
                                </div>
                            </components.Option>
                            <div>
                            </div>
                        </div>
                    ) : ""}
                </div>
            </components.Menu>
        </>
    );
};

export default MenuComponentWithDropdownOptions;
