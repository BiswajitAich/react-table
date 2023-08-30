import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const TableInput = () => {

  const [purchase, setPurchase] = useState('')
  const [sell, setSell] = useState('')
  const [image, setImage] = useState('')
  const [pl, setPl] = useState(0)
  const [error, setError] = useState(false)
  const [date, setDate] = useState(currentDate)

  const handelClear = (e) => {
    e.preventDefault();
    setPurchase('');
    setSell('');
  };
  useEffect(() => {
    const calculatedPl = Number(sell) - Number(purchase);
    if (calculatedPl > 0)
      setPl("Profit: Rs" + calculatedPl);
    else if (calculatedPl === 0)
      setPl(0);
    else setPl("Loss: Rs" + Math.abs(calculatedPl));
  }, [purchase, sell, pl]);

  const handelAdd = (e) => {
    e.preventDefault();
    if (purchase !== '' && sell !== '') {
      const existingData = localStorage.getItem("data");
      let newData = {
        image: image,
        purchase: purchase,
        sell: sell,
        date: date
      };
      if (existingData) {
        const parsedData = JSON.parse(existingData);
        const updatedData = [...parsedData, newData];
        localStorage.setItem("data", JSON.stringify(updatedData));
      } else {
        localStorage.setItem("data", JSON.stringify([newData]));
      }
      setImage('');
      setPurchase('');
      setSell('');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };


  return (
    <div>
      <h1>ADD NEW ROW</h1>
      <input 
        type="date"
        name="date" 
        value={date}
        onChange={(e) => setDate(e.target.value)}
        />
      <div className="form">
        <form>
          <label htmlFor="image">Image Link</label>
          <span>{error && purchase === '' ? "*Enter value!" : ""}</span>
          <input
            type="text"
            name="image"
            placeholder="Enter image link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label htmlFor="purchase">PURCHASE</label>
          <span>{error && purchase === '' ? "*Enter value!" : ""}</span>
          <input type="number" name="purchaae" placeholder="Enter purchase value" value={purchase} onChange={(e) => setPurchase(e.target.value)} />


          <label htmlFor="sell">SELL</label>
          <span>{error && sell === '' ? "*Enter value!" : ""}</span>
          <input type="number" name="sell" placeholder="Enter sell value" value={sell} onChange={(e) => setSell(e.target.value)} />

          <div>{pl}</div>
          <div className="table-input-btn">
          <button type="submit" onClick={handelAdd}>Add</button>
          <button onClick={handelClear}>clear</button>
          </div>
        </form>
      </div>
      <div className="back">
      <Link to="/Table">back to table</Link>
      </div>
    </div>
  )
}

export default TableInput; 
