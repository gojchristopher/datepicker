import { chakra } from "@chakra-ui/react";

export const Container = chakra("div", {
  baseStyle: {
    width: "fit-content",
    rounded: "8px",
    border: "1px",
    borderColor: "Gray.200",
    bgColor: "white",
    display: "flex",
  },
});

export const CalendarContainer = chakra("div", {
  baseStyle: {
    width: "fit-content",
    bgColor: "white",
    rounded: "8px",
    paddingX: "24px",
    paddingY: "20px",
    borderColor: "Gray.200",

    "& table": {
      marginTop: "12px",
    },

    "& th": {
      width: "40px",
      height: "40px",
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "20px",
    },
  },
});

export const CalendarItem = chakra("button", {
  baseStyle: {
    width: "40px",
    height: "40px",
    color: "neutrals.800",
    fontSize: "14px",
    lineHeight: "20px",
    rounded: "full",
    transition: "colors 300ms ease-in-out",

    _hover: {
      bgColor: "neutrals.200",
    },

    "&[data-placeholder]": {
      color: "neutrals.600",
      _hover: {
        bgColor: "neutrals.100",
      },
    },

    "&[data-today]": {
      bgColor: "neutrals.200",
    },

    "&[data-selected]": {
      color: "white",
      bgColor: "brand.primary.700",
    },

    "&[data-selected][data-placeholder]": {
      color: "neutrals.600",
      bgColor: "unset",
      textDecoration: "line-through",
    },

    "&[data-inrange]": {
      bgColor: "brand.primary.100",
      fontWeight: "medium",
    },

    "&[data-inrange][data-placeholder]": {
      bgColor: "unset",
      fontWeight: "normal",
      textDecoration: "line-through",
    },
  },
});

export const Divider = chakra("div", {
  baseStyle: {
    width: "full",
    borderStyle: "solid",
    borderColor: "Gray.200",
    borderTopWidth: "1px",

    _horizontal: {
      width: "auto",
      alignSelf: "stretch",
      borderTopWidth: "0px",
      borderLeftWidth: "1px",
    },
  },
});
