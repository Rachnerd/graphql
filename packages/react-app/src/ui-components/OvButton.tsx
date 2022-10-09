import { Button } from "components/atoms/button/button";
import { createComponent } from "@lit-labs/react";
import React from "react";

type Constructor<T = {}> = new (...args: any[]) => T;

export const OvButton = createComponent(
  React,
  "ov-button",
  Button as unknown as Constructor<HTMLElement>,
  {}
);
