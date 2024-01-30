import React from "react";
import country_code from "../../assets/country_code.json";
import styles from "./Style.module.css";

const CountryInputField = ({
  handleCountryCodeChange,
  countryCode,
  setCountryCode,
  isError,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <select
        value={countryCode}
        onChange={handleCountryCodeChange}
        className={styles.selectContainer}
        error={isError}
      >
        {country_code?.map((val) => {
          return <option key={val?.dial_code}>{val?.dial_code} </option>;
        })}
      </select>
    </div>
  );
};

export default CountryInputField;
