import { useState } from "react";
import api from "./api";

const App = () => {
  const [outputValue, setOutputValue] = useState(0.0);
  const [valueInput, setValueInput] = useState();
  const [baseInput, setBaseInput] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [systemMessage, setSystemMessage] = useState("");

  const currencyCodes = ["BRL", "EUR", "USD", "JPY"];

  const handleValueInput = (event) => {
    setValueInput(event.target.value);
  };

  const handleBaseInput = (event) => {
    setBaseInput(event.target.value);
  };
  
  const handleTargetInput = (event) => {
    setTargetInput(event.target.value);
  };

  const handleGetConversionRate = async () => {
    if (!valueInput || !baseInput || !targetInput) {
      setSystemMessage("preencha todos os campos");
      return;
    }

    if (valueInput <= 0) {
      setSystemMessage("insira um valor maior que zero");
      return;
    }
    if (baseInput === targetInput) {
      setSystemMessage("insira moedas diferentes");
      return;
    }
    try {
      const { data } = await api.get(`${baseInput}/${targetInput}`);
      console.log(data);
      const conversionRateToday = data.conversion_rate;
      const resultData = (valueInput * conversionRateToday).toFixed(2);
      setOutputValue(resultData);
    } catch (err) {
      console.error(err);
      setSystemMessage("ocorreu um erro, tente novamente");
    }
  };
  return (
    <>
      <input
        type="text"
        name=""
        id=""
        onChange={handleValueInput}
        placeholder="Insira valor de entrada"
      />
      <br />
      <label htmlFor="base-input-select">Converter de:</label>
      <select onChange={handleBaseInput} id="base-input-select">
        <option selected disabled value="">
          --Escolha a moeda inicial--
        </option>
        {currencyCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <br />

      <label htmlFor="target-input-select">Para:</label>
      <select onChange={handleTargetInput} id="target-input-select">
        <option selected disabled value="">
          --Escolha a moeda final--
        </option>
        {currencyCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleGetConversionRate}>Converter</button>
      <div>{outputValue}</div>
      <br />
      <p>{systemMessage}</p>
    </>
  );
};

export default App;
