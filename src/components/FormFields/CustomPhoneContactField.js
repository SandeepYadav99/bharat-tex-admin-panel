import React, { useCallback } from "react";

import PhoneInput from "react-phone-input-2";

const CustomPhoneContactField = ({
  isError,
  errorText,
  icon,
  label,
  onChange,
  onTextChange,
  inputProps,
  value,
  inputStyle,
  isValid,
  onMount,
  ...rest
}) => {
  // const handleChange = useCallback(
  //   (e) => {
  //     onChange && onChange(e);
  //     onTextChange && onTextChange(e);
  //   },
  //   [onChange, onTextChange]
  // );
  const handleChange = useCallback(
    (value, country, e, formattedValue) => {
      console.log(value, country, e, formattedValue);
      const countryCodeRegex = /\+(\d+)/;
      const match = formattedValue.match(countryCodeRegex);
      const countryCode = match ? match[1] : null;
      const restOfPhoneNumber = formattedValue
        .replace(countryCodeRegex, "")
        .replace(/-/g, "");

      const formattedPhoneNumber = countryCode
        ? `+${countryCode} ${restOfPhoneNumber}`
        : formattedValue;

      onTextChange && onTextChange(formattedPhoneNumber);
      onChange && onChange(formattedPhoneNumber, country, e, formattedValue);
    },
    [onChange, onTextChange]
  );

  const handleValidation = useCallback(
    (value, country, e, formattedValue) => {
      // Perform custom validation here
      // Return true if the phone number is valid, false otherwise
      // Example: return formattedValue.length >= 10;
      return formattedValue.length >= 10;
    },
    []
  );
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PhoneInput
        defaultErrorMessage={isError}
        inputProps={{
          name: "Phone No",
        }}
        country={"in"}
        // country={country_code ? country_code.toLowerCase() : 'us'}
        value={value}
        onChange={handleChange}
        inputStyle={{
          width: "100%",
          border: errorText ? "1px solid red" : "1px solid #ccc",
        }}
         specialLabel=""
        isValid={isValid}
        {...rest}
      />
      {errorText ? (
        <span style={{ color: "red", textAlign: "right", fontSize: "12px" }}>
          {errorText}
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default CustomPhoneContactField;
