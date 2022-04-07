import React, { useState } from "react";
import Select, { StylesConfig, Props } from "react-select";
import DefaultOptionsComponent from "../DefaultOptionsComponent"
import MenuComponentWithDropdownOptions from "../MenuComponentWithDropdownOptions"
import "./index.css";

export interface DefaultOptionType {
  readonly value: string;
  readonly label: string;
}
export const defaultOptions: DefaultOptionType[] = [
  { value: 'today', label: 'Today' },
  { value: 'twoDays', label: 'Last 48 hours' },
  { value: 'sevenDays', label: 'Last 7 days' },
  { value: 'fourteenDays', label: 'Last 14 days' },
  { value: 'thirtyDays', label: 'Last 30 days' },
  { value: "dateRange", label: "Date range" }
];
type IsMulti = false;

const customStyles: StylesConfig<DefaultOptionType, IsMulti> = {
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
      fontWeight: state.isFocused ? "bold" : "normal",
      ":active": {
        backgroundColor: state.isFocused ? "#EBEDF5" : "white",
        color: state.isSelected ? "#375D6F" : "#375D6F",
      },
      minHeeight: "40px",
      lineHeight: "40px",
      padding: 0,
      margin: 0,
    }
  ),
  // control: (base, state: ControlProps<DefaultOptionType, boolean>) => ({
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

const Dropdown = (props: Props<DefaultOptionType, IsMulti>) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const showCalendar = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true)
  }

  return (
    <form className="container">
      <label className="label" id="aria-label" htmlFor="aria-example-input">
        Dropdown Menu
      </label>
      <Select
        {...props}
        isClearable
        components={{
          Menu: MenuComponentWithDropdownOptions,
          Option: DefaultOptionsComponent
        }}
        // @ts-ignore
        showDropdown={showDropdown}
        options={defaultOptions}
        styles={customStyles}
        showDatepickerCalendar={showCalendar}
      />
    </form>
  );
}
export default Dropdown;