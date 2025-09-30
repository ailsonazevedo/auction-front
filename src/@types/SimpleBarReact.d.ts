declare module "simplebar-react" {
  import * as React from "react";

  export interface SimpleBarProps extends React.HTMLAttributes<HTMLDivElement> {
    autoHide?: boolean;
    clickOnTrack?: boolean;
    contentNodeProps?: React.HTMLAttributes<HTMLDivElement>;
    direction?: "ltr" | "rtl";
    forceVisible?: "x" | "y" | boolean;
    scrollableNodeProps?: React.HTMLAttributes<HTMLDivElement>;
    scrollbarMaxSize?: number;
    scrollbarMinSize?: number;
    timeout?: number;
  }

  export default class SimpleBar extends React.Component<SimpleBarProps> {}
}
