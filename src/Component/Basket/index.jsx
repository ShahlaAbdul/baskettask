import React, { useEffect, useState } from "react";
import './style.css'


function Basket() {
  const [fetchData, setFetchData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    getFetch();
  }, []);

  async function getFetch() {
    const data = await fetch("https://northwind.vercel.app/api/products");
    const res = await data.json();
    setFetchData(res);
  }

  function addBasket(item) {
    if (!basket.find((x) => x.id === item.id)) {
      item.count = 1;
      setBasket([...basket, item]);
    } else {
      setBasket(
        basket.map((x) => {
          if (x.id === item.id) x.count++;
          return x;
        })
      );
    }
  }

  function removeBasket(item) {
    if (item.count > 1) {
      item.count--;
      setBasket(
        basket.map((x) => {
          if (x.id === item.id) return item;
          else return x;
        })
      );
    }
  }

  function allRemove(item) {
    setBasket(basket.filter((x) => x !== item));
  }

  return (
    <div className="basket_container">
      <div className="basket">
        <h2>Basket</h2>
        <ul className="newbasket">
          {basket.map((x) => {
            return (
              <ul className="product" key={x.id}>
               <img src="https://thesaltymarshmallow.com/wp-content/uploads/2018/08/oreo-milkshakes1.jpg" alt="" />
                <div className="basket_element">
                  <li>{x.id}</li>
                  <li>{x.name}</li>
                </div>
                <div className="addRemoveBtns">
                  <button onClick={() => removeBasket(x)}>-</button>
                  <span>{x.count}</span>
                  <button onClick={() => addBasket(x)}>+</button>
                </div>
                <button onClick={() => allRemove(x)}>Delete Item</button>
              </ul>
            );
          })}
        </ul>
      </div>
      <div className="myproducts">
        <ul >
          {fetchData.map((x) => {
            return (
              <ul className="allproduct" key={x.id}>
                
                <div className="list">
                  <li>{x.id}</li>
                  <li>{x.name}</li>
                </div>
                <button onClick={() => addBasket(x)}>add</button>
              </ul>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Basket;




