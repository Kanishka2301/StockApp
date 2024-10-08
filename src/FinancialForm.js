import React, { useState } from "react";
import "./FinancialForm.css";
import { FadeLoader } from "react-spinners";

const API_KEY = process.env.REACT_APP_GEMINI_APP;

const FinancialForm = ({ setResult }) => {
  const [values, setValues] = useState({
    marketPrice: "60",
    eps: "10",
    bookValue: "30",
    sales: "15",
    annualDividends: "4",
    previousEps: "4",
    currentEps: "5",
    totalDebt: "100",
    totalEquity: "200",
    netIncome: "35",
  });
  const [isSent, setIsSent] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainingPrompt = [
      {
        parts: [
          {
            text: "From next prompt I am going to send you some parameters for predicting stock market share, tell me if it is overvalued or undervalued, buy or not",
          },
        ],
        role: "user",
      },
      {
        role: "model",
        parts: [
          {
            text: "okay",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "calculate P/E ratio, P/B ratio, P/S ratio, Dividend Yield, Earnings Growth in %, Debt-to-Equity ratio, RDE %, and give a response",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "okay",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Always give response in form of HTML div and table tags",
          },
        ],
      },
    ];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    const messageToSend = [
      ...trainingPrompt,
      {
        role: "user",
        parts: [
          {
            text: JSON.stringify(values),
          },
        ],
      },
    ];

    setIsSent(false);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: messageToSend,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const resjson = await res.json();
      console.log("Response JSON:", resjson);

      if (resjson.candidates && resjson.candidates.length > 0) {
        let responseMessage = resjson.candidates[0].content.parts[0].text;
        console.log(responseMessage);
        setResult(responseMessage); // Pass the result to parent App.js
      } else {
        console.error("No candidates in response:", resjson);
        setResult("<p>No data available from the model.</p>");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResult(
        "<p>Error fetching stock analysis data. Please try again later.</p>"
      );
    } finally {
      setIsSent(true);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label>Market Price per share:</label>
        <input
          type="number"
          name="marketPrice"
          value={values.marketPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Earnings per share (EPS):</label>
        <input
          type="number"
          name="eps"
          value={values.eps}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Book Value per share:</label>
        <input
          type="number"
          name="bookValue"
          value={values.bookValue}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Sales per share:</label>
        <input
          type="number"
          name="sales"
          value={values.sales}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Annual Dividends per share:</label>
        <input
          type="number"
          name="annualDividends"
          value={values.annualDividends}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Previous Year’s EPS:</label>
        <input
          type="number"
          name="previousEps"
          value={values.previousEps}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Current Year’s EPS:</label>
        <input
          type="number"
          name="currentEps"
          value={values.currentEps}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Total Debt:</label>
        <input
          type="number"
          name="totalDebt"
          value={values.totalDebt}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Total Equity:</label>
        <input
          type="number"
          name="totalEquity"
          value={values.totalEquity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Net Income:</label>
        <input
          type="number"
          name="netIncome"
          value={values.netIncome}
          onChange={handleChange}
          required
        />
      </div>
      {isSent ? (
        <button type="submit">Submit</button>
      ) : (
        <FadeLoader className="loader" />
      )}
    </form>
  );
};

export default FinancialForm;
