import { API_URL } from "../constants/constant";



export async function ExchangeRates() {
  try {
    const url = "https://open.er-api.com/v6/latest/USD";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "list failed");
    }
    
    const currency = await response.json();
    return currency;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the customer list");
  }
}

export async function ExchangeRatesMethod() {
  try {
    const url = "https://api.coinbase.com/v2/exchange-rates?currency=USD";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "list failed");
    }
    
    const currency = await response.json();
    return currency;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching the customer list");
  }
}