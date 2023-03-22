import React from "react";
import Input from "./Input";
import Label from "./Label";
import Section from "./Section";

const SectionInput = ({ textolabel, idlabel, forlabel, ...attr }) => {
  return (
    <Section {...attr}>
      <Label htmlFor={forlabel} id={idlabel} tabIndex="0" texto={textolabel} />
      <Input id={forlabel} type="file" accept=".srt" required />
      <Label htmlFor="" id={idlabel + "mini"} className="mini" />
    </Section>
  );
};

export default SectionInput;
