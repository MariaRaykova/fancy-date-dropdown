import React, { useState } from "react";
import Select, { StylesConfig, Props, components, MenuProps, ControlProps, CSSObjectWithLabel, ActionMeta } from "react-select";
import DefaultOptionsComponent from "../DefaultOptionsComponent"
import MenuComponentWithDropdownOptions from "../MenuComponentWithDropdownOptions"
import { DefaultOptionType, defaultOptions } from "../types"
import "./index.css";

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
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    background: "white",
    borderRadius: 0,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    // @ts-ignore
    borderColor: state.isFocused || state.isSelected ? "#CCE5E8" : "#CCE5E8",
    boxShadow: state.isFocused ? 0 : 0,
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
  
  const onShowDropdownClick = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }
  const handleChangeStart = (data: Date) => {
    setStartValue(data)
  }
  const handleChangeEnd = (data: Date) => {
    setEndValue(data)
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
        // @ts-ignore
        isOpenDropdown={isOpenDropdown}
        onShowDropdownClick={onShowDropdownClick}
        handleStart={handleChangeStart}
        clearStartValue={clearStartValue}
        startValue={startValue}
        handleEnd={handleChangeEnd}
        clearEndValue={clearEndValue}
        endValue={endValue}
        components={{
          Menu: MenuComponentWithDropdownOptions,
          Option: DefaultOptionsComponent
        }}
        options={defaultOptions}
        styles={customStyles}
        closeMenuOnSelect={false}
      />
    </div>
  );
}
export default Dropdown;
