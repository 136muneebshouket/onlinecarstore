
import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const Jodit = ({value, setValue }) => {
  const editor = useRef(null);
  return (
    <JoditEditor
      ref={editor}
      value={value}
      onChange={(newContent) => {
        setValue(newContent);
      }}
    />
  );
};

export default Jodit;
