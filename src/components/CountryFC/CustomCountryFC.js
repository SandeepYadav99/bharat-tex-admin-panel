import React from "react";
import CountryPhone from "../country/index";

export function CustomCountryFC({
  value,
  error,
  label,
  country_code,
  input,
  helperText,
}) {
  return (
    <div
      style={{
        marginTop: "8px",
        marginBottom: "4px",
        position: "relative",
      }}
    >
      <CountryPhone
        {...input}
        inputProps={{
          name: input.name,
          onBlur: input.onBlur,
          onChange: input.onChange,
          onDragStart: input.onDragStart,
          onDrop: input.onDrop,
          onFocus: input.onFocus,
        }}
        placeholder={label}
        inputStyle={error ? { borderColor: "red" } : {}}
        country={country_code ? country_code.toLowerCase() : "us"}
        value={value}
        onChange={this._handleChange}
      />
      <p
        style={{
          color: "#f44336",
          right: "0px",
          bottom: "-10px",
          margin: "0px",
          position: "absolute",
          marginLeft: "5px",
          fontSize: "0.60rem",
        }}
      >
        {helperText}
      </p>
    </div>
  );
}

export const CountryContactFC = ({
  input,
  label,
  maxLimit,
  // meta: { touched, error },
  ...custom
}) => {
  return (
    <CustomCountryFC
      // error={touched && error ? true : false}
      // helperText={
      //   (touched && error ? true : false)
      //     ? custom.errorText
      //       ? custom.errorText
      //       : error
      //     : ""
      // }
      input={input}
      {...input}
      {...custom}
      label={label}
      // helperText={touched && error}
      variant={"outlined"}
    />
  );
};
