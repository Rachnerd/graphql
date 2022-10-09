import { DefaultTemplate } from "components/templates/main-template/main-template";
import { createComponent } from "@lit-labs/react";
import React from "react";

export const OvDefaultTemplate = createComponent(
  React,
  "ov-default-template",
  DefaultTemplate,
  {}
);
