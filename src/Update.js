import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Update = () => {
  const params = useParams();
  const index = parseInt(params.index, 10);
  const [purchase, setPurchase] = useState('');
  const [sell, setSell] = useState('');
  const [image, setImage] = useState('');
  const [pl, setPl] = useState('');
  const [dataToUpdate, setDataToUpdate] = useState('');


  useEffect(() => {
    const existingData = localStorage.getItem("data");

    if (existingData) {
      const dataList = JSON.parse(existingData);
      if (index >= 0 && index < dataList.length) {
        const dataToUpdate = dataList[index];
        setDataToUpdate(dataToUpdate);
        setImage(dataToUpdate.image);
        setPurchase(dataToUpdate.purchase);
        setSell(dataToUpdate.sell);
        calculatePL(dataToUpdate.purchase, dataToUpdate.sell);
      }
    }
  }, [index]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = JSON.parse(localStorage.getItem("data"));
    if (index >= 0 && index < updatedData.length) {
      updatedData[index] = {
        ...dataToUpdate,
        image: image,
        purchase: parseFloat(purchase),
        sell: parseFloat(sell),
      };

      localStorage.setItem("data", JSON.stringify(updatedData));
    }
    window.history.back();
  };


  const purchaseChange = (e) => {
    setPurchase(e.target.value);
    calculatePL(e.target.value, sell);
  };

  const sellChange = (e) => {
    setSell(e.target.value);
    calculatePL(purchase, e.target.value);
  };

  const imageChange = (e) => {
    setImage(e.target.value);
  };
  const calculatePL = (purchaseValue, sellValue) => {
    const pOrL = parseFloat(purchaseValue) - parseFloat(sellValue);
    if (pOrL > 0) {
      setPl("loss: Rs " + Math.abs(pOrL));
    } else if (pOrL < 0) {
      setPl("profit: Rs " + Math.abs(pOrL));
    } else {
      setPl(0);
    }
  };

  return (
    <div className="form">
      <h1>UPDATE</h1>
      <form>
        <label htmlFor="image">Image Link</label>
        <input
          type="text"
          name="image"
          placeholder="Enter image link"
          value={image}
          onChange={imageChange}
        />


        <label htmlFor="purchase">PURCHASE</label>
        <input
          type="number"
          name="purchase"
          placeholder="Enter purchase value"
          value={purchase}
          onChange={purchaseChange}
        />

        <label htmlFor="sell">SELL</label>
        <input
          type="number"
          name="sell"
          placeholder="Enter sell value"
          value={sell}
          onChange={sellChange}
        />

        <div>{pl}</div>
        <button type="submit" onClick={handleUpdate}>update</button>
      </form>
      <button type="button" onClick={()=>window.history.back()}>BACK</button>
    </div>
  )
}

export default Update;
