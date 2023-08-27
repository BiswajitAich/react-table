import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [show, setShow] = useState(false);
  const [showHide, setShowHide] = useState("more");

  const handleShow = (e) => {
    e.preventDefault();
    if (show === false) {
      setShow(true);
      setShowHide("less");
    } else {
      setShow(false);
      setShowHide("more");
    }
  };

  return (
    <>
      <div>
        <div className="div-0">
          <div className="div-1"></div>
          <div className="div-2"></div>
        </div>
        <div className="div-3">
          <div>Create your Profit table</div>
          <Link to="/Table">GO</Link>
          <button onClick={handleShow} className="show">See {showHide}</button>
          {show ? (
            <div className="show-text">
              The data will be stored in 'Local Storage' of the browser (device)
              so when the data of the browser is deleted, the data will also be
              lost.
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
