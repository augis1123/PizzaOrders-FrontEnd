import Header from "../UI/Header";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import getBackendApiLink from "../BackEnd";

const backendApiLink = getBackendApiLink();

export default function Home() {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [price, setPrice] = useState(0);
  const [toppingDropdowns, setToppingDropdowns] = useState([
    {
      selectedToppings: [],
      id: 0,
    },
  ]);

  useEffect(() => {
    fetchSizes();
    fetchToppings();
  }, [navigate]);

  async function fetchSizes() {
    let result = await axios.get(backendApiLink + `/size`, {
      headers: { "Content-Type": "application/json" },
    });

    setSizes(JSON.parse(JSON.stringify(result.data)));
  }

  async function fetchToppings() {
    let result = await axios.get(backendApiLink + `/topping`, {
      headers: { "Content-Type": "application/json" },
    });

    setToppings(JSON.parse(JSON.stringify(result.data)));
  }

  const handleCalculateClick = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const pizzaData = {
      size: selectedSize,
      toppings: [],
    };

    toppingDropdowns.forEach((dropdown) => {
      pizzaData.toppings.push(...dropdown.selectedToppings);
    });

    let json = JSON.stringify(pizzaData);

    try {
      const response = await axios.put(
        backendApiLink + `/pizza/calculatePrice`,
        json,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setPrice(response.data);
    } catch (error) {
      console.error("Error calculating price:", error);
    }
  };

  const handleOrderClick = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const pizzaData = {
      size: selectedSize,
      toppings: [],
      price: price,
    };

    toppingDropdowns.forEach((dropdown) => {
      pizzaData.toppings.push(...dropdown.selectedToppings);
    });

    let json = JSON.stringify(pizzaData);
    try {
      const response = await axios.put(
        backendApiLink + `/pizza/calculatePrice`,
        json,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setPrice(response.data);
    } catch (error) {
      console.error("Error calculating price:", error);
    }

    try {
      const pizzaResponse = await axios.post(
        backendApiLink + `/pizza`,
        pizzaData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const pizzaId = pizzaResponse.data.id;
      const orderResponse = await axios.post(
        backendApiLink + `/orders/${pizzaId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Pizza ordered successfully:", orderResponse);

      resetForm();
    } catch (error) {
      console.error("Error ordering pizza:", error);
    }
  };

  const resetForm = () => {
    setSelectedSize("");
    setToppingDropdowns([
      {
        selectedToppings: [],
        id: 0,
      },
    ]);
    setPrice(0);
  };

  const addToppingDropdown = () => {
    const newId = new Date().getTime();
    setToppingDropdowns([
      ...toppingDropdowns,
      { selectedToppings: [], id: newId },
    ]);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <form>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          {toppingDropdowns.map((item) => (
            <div key={item.id}>
              <select
                multiple
                value={item.selectedToppings}
                onChange={(e) => {
                  const selectedToppings = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setToppingDropdowns((prevState) =>
                    prevState.map((prevItem) =>
                      prevItem.id === item.id
                        ? { ...prevItem, selectedToppings }
                        : prevItem
                    )
                  );
                }}
              >
                {toppings.map((topping) => (
                  <option key={topping.id} value={topping.id}>
                    {topping.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <br />
          <Button variant="contained" onClick={addToppingDropdown}>
            Add Topping
          </Button>
          <br />
          <Button
            variant="contained"
            onClick={handleCalculateClick}
            disabled={!selectedSize}
          >
            Calculate
          </Button>
          <Button
            variant="contained"
            onClick={handleOrderClick}
            disabled={!selectedSize}
          >
            Order
          </Button>

          {price > 0 && <p>Calculated Price: ${price}</p>}
          <br />
        </form>
      </div>
    </div>
  );
}
