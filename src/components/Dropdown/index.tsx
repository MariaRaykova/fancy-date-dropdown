import React, { useState } from "react";
import Select, { StylesConfig, Props, components } from "react-select";
import { DefaultOptionType, defaultOptions } from "../types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./index.css"

library.add(faCaretDown);
library.add(faCaretUp);
library.add(faTrashCan);

const customStyles: StylesConfig<DefaultOptionType> = {
  container: (base, state) => ({
    ...base,
    width: "285px",
    position: "relative",
  }),
  option: (base, state) => (
    {
      ...base,
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: state.isFocused ? "#EBEDF5" : "white",
      color: state.isSelected ? "#375D6F" : "#375D6F",
      fontWeight: state.isFocused ? "900" : "500",
      ":active": {
        backgroundColor: state.isFocused ? "#EBEDF5" : "white",
        color: state.isSelected ? "#375D6F" : "#375D6F",
      },
      minHeight: "45px",
      lineHeight: "45px",
      padding: 0,
      margin: 0,
    }
  ),
  control: (base, state) => ({
    ...base,
    background: "white",
    borderRadius: 0,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderColor: state.isFocused ? "#CCE5E8" : "#CCE5E8",
    boxShadow: 'none',
    whiteSpace: "nowrap",
    width: "100%",
    color: "",
    '&:hover': {
      borderColor: state.isFocused ? '' : '',
    },
  }),
  menu: base => ({
    ...base,
    border: "2px solid #CCE5E8",
    width: "285px",
    borderRadius: 0,
    padding: 0,
    hyphens: "auto",
    marginTop: 0,
    textAlign: "left"
  }),
  menuList: base => ({
    ...base,
    overflowY: "auto"
  }),
  indicatorSeparator: base => ({
    ...base,
    display: "none"
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.isFocused ? "rotate(180deg)" : ''
  }),
  noOptionsMessage: base => ({
    ...base,
    color: "white"
  }),
  valueContainer: base => ({
    ...base,
    overflowX: "hidden",
    textAlign: "left"
  }),
  input: base => ({
    ...base,
    display: "inline-block"
  })
};

const Dropdown = (props: Props<DefaultOptionType>) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
  const [startValue, setStartValue] = useState<Date | null>(null)
  const [endValue, setEndValue] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [showStart, setShowStart] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);

  const onShowDropdownClick = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }
  const handleChangeStart = (data: Date) => {
    setStartValue(data)
    setShowStart(false)
  }
  const handleChangeEnd = (data: Date) => {
    setEndValue(data)
    setShowEnd(false)
  }
  const clearStartValue = () => {
    setStartValue(null);
  }
  const clearEndValue = () => {
    setEndValue(null);
  }

  return (
    <div className="container">
      <label className="label" id="aria-label" htmlFor="aria-example-input">
        Dropdown Menu
      </label>
      <Select
        {...props}
        components={{
          Menu: (props) => (
            <components.Menu {...props}>
              <div className="datepicker-wrapper">
                <div>{props.children}</div>

                {isOpenDropdown && (
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
                            <span
                              className="trash"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearStartValue()
                              }}
                            >
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
                            <span
                              className="trash"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearEndValue()
                              }}
                            >
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
                        />
                      )}
                    </div>
                    <div>
                    </div>
                  </div>
                )}
              </div>
            </components.Menu>
          ),
          Option: (props) => (
            <components.Option {...props}  >
              <label
                className="option-container"
                onClick={(event) => {
                  if (props.data.value === "dateRange") {
                    event.stopPropagation();
                    onShowDropdownClick()
                    setIsOpen(!isOpen)
                  }
                  props.selectOption(props.data)
                }}
              >
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
            </components.Option>
          )
        }}
        options={defaultOptions}
        styles={customStyles}
        closeMenuOnSelect={false}
      />
    </div>
  );
}
export default Dropdown;