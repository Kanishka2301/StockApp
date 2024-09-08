import React, { useState } from "react";

const FinancialForm = () => {
  const [values, setValues] = useState({
    marketPrice: "",
    eps: "",
    bookValue: "",
    sales: "",
    annualDividents: "",
    previousEps: "",
    currentEps: "",
    totalDebt: "",
    totalEquity: "",
    netIncome: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <label>Earnings per share(EPS):</label>
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
        <label>Annual Dividends per share:</label>
        <input
          type="number"
          name="annualDividends"
          value={values.annualDividents}
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
        <label>Previous Years EPS:</label>
        <input
          type="number"
          name="previousEps"
          value={values.previousEps}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Current Years EPS:</label>
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
    </form>
  );
};

export default FinancialForm;
