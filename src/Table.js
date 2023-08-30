import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Table = () => {
  const [dataList, setDataList] = useState([]);
  const [tPurchase, setTPurchaseconst parsedData = JSON.parse(existingData);
     
  useEffect(() => {
    const existingData = localStorage.getItem("data");
    if (existingData) {
     const parsedData = JSON.parse(existingData);;
       parsedData.sort((a, b) => {
       const dateA = new Date(a.date);
       const dateB = new Date(b.date);
       return dateA - dateB;
     });
    }
  }, []);

  const handleDelete = (index) => {
    const updatedData = dataList.filter((_, i) => i !== index);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setDataList(updatedData);
  }

  const handelTotal = () => {
    const parseData = JSON.parse(localStorage.getItem("data"));
    const totalPurchase = parseData.reduce((total, data) => total + parseFloat(data.purchase), 0);
    const totalSell = parseData.reduce((total, data) => total + parseFloat(data.sell), 0);
    setTPurchase(totalPurchase);
    setTSell(totalSell);
    setTPOrL(totalSell - totalPurchase);
  };

  return (
    <div className="table">
      <h1>TABLE</h1>
      <div className="table-2">
      {dataList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>SL No°</th>
              <th>DATE</th>
              <th>IMAGE</th>
              <th>PURCHASE</th>
              <th>SELL</th>
              <th>PROFIT/LOSS</th>
              <th>update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.date}</td>
                <td className="image">
                  <a href={data.image} target="_blank" rel="noopener noreferrer">
                    <img src={data.image} alt={data.image} style={{ width: "80px", height: "auto" }} />
                  </a>
                </td>
                <td>{data.purchase}</td>
                <td>{data.sell}</td>
                <td>{data.sell - data.purchase}</td>
                <td><Link to={"/update/" + index} className="update">update</Link></td>
                <td><button onClick={() => handleDelete(index)} >delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-result">
          <div>no result found!</div>
          <div>
            <Link to="/TableInput">Click here to add</Link>
          </div>
        </div>
      )}
      </div>
      <div className="cals">
        <div>Total Purchase :Rs{tPurchase}</div>
        <div>Total Sell :Rs{tSell}</div>
        {tPOrL > 0 ? (
          <div>total Profit :Rs{Math.abs(tPOrL)}</div>
        ) : tPOrL < 0 ? (
          <div>total loss :Rs{Math.abs(tPOrL)}</div>
        ) : (
          <div>total :Rs{Math.abs(tPOrL)}</div>
        )}
        <button type="button" onClick={handelTotal}> refresh </button>
      </div>
    </div>
  );
};

export default Table;
