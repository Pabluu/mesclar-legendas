import React from "react";

const Label = ({ texto, htmlFor, ...attr }) => {
  return (
    <label htmlFor={htmlFor} {...attr}>
      {texto}
    </label>
  );
};

export default Label;
