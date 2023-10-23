import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import Button from "@mui/material/Button";

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <TopBar title="PizzaOrder" backButtonDisabled={true}>
      <Button
        onClick={() => navigate("/home/orderlist")}
        variant="contained"
        disableElevation
      >
        Order list
      </Button>
    </TopBar>
  );
}
