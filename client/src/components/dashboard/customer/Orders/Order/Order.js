import React, { useState } from "react";
import Total from "../OrderTotal/OrderTotal";
import "./Order.css";

const Order = (props) => {
  const orderContent = props.order.map((item, i) => {
    return (
        <li key={i} className="order-items">
            <span>{item.Name}</span>
            <span>{item.Quantity}</span>
            <span>{item.Price}</span>
            <span>{item.Total}</span>
        </li>
    );
  });

  return (
    <div className="order-container">
        <div className="order-number">{props.ordersLength - props.index}</div>
        <div className="order-header">
            <span>Name</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total</span>
        </div>
        <ul>{orderContent}</ul>
        <Total data={props.order} />
    </div>
  );
};

export default Order;