import { Icon } from "components/icon/icon";
import { createComponent } from "@lit-labs/react";
import React from "react";

type Constructor<T = {}> = new (...args: any[]) => T;

export const OvIcon = createComponent(
  React,
  "ov-icon",
  Icon as unknown as Constructor<HTMLElement>,
  {}
);
