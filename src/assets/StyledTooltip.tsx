import { Divider, Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    fontSize: 14,
    padding: "5px 10px",
    borderRadius: 8,
    color: "black",
    fontFamily: "Figtree",
    boxShadow: "0px 1px 6px 1.2px rgba(0,0,0,0.1)",
  },
}));

export default StyledTooltip;
