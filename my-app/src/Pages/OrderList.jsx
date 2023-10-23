import React, { useEffect, useState } from "react";
import getBackendApiLink from "../BackEnd";
import Header from "../UI/Header";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import "./Home.css";

const backendApiLink = getBackendApiLink();

export default function OrderList() {
  const navigate = useNavigate();
  const [OrdersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPizza();
  }, [navigate]);

  async function fetchPizza() {
    try {
      let result = await axios.get(backendApiLink + `/orders`, {
        headers: { "Content-Type": "application/json" },
      });

      setOrdersData(JSON.parse(JSON.stringify(result.data)));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching pizza data:", error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Header></Header>
      <h1>Order list</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {OrdersData.map((Order, index) => {
            const toppings = Order.toppings || [];
            {console.log(index)}
            return (
              <div
                className="delayed-animation"
              >
                <li key={index}>
                  <strong>Size:</strong> {Order.size} <br />
                  <strong>Toppings:</strong>
                  <ul>
                    {toppings.map((topping, toppingIndex) => (
                      <li key={toppingIndex}>{topping}</li>
                    ))}
                  </ul>
                  <strong>Price:</strong> ${Order.price}
                </li>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
}
