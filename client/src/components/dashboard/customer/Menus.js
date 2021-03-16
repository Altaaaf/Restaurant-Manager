import React, { useContext } from "react";
import { Context } from "../../../Context";
import data from "../../../menu.json";


export default function Input({ type, name, index }) {
  const [items, updateItem] = useContext(Context);
  return (
    <input
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      onChange={({ target }) => updateItem(type, index, target.value)}
      name={name.replace(" ", "-").toLowerCase()}
    />
  );
}

export function Menus({ meals }) {
    return (
      <section className="mains">
        {meals.map((meal, index) => (
          <article className="menu-item" key={index}>
            <h3 className="mains-name">{meal.name}</h3>
            <Input type="mains" name={meal.name} index={index} />
            <strong className="mains-price">${meal.price}</strong>
            <p className="mains-description">{meal.description}</p>
          </article>
        ))}
      </section>
    );
  }

  export function Extras({ type, items }) {
    return (
      <section className="extras">
        <h2 className="extras-heading">{type}</h2>
        {items.map((item, index) => (
          <article className="menu-item" key={index}>
            <div className="extras-name">{item.name}</div>
            <Input type={type} name={item.name} index={index} />
            <strong className="extras-price">${item.price}</strong>
          </article>
        ))}
      </section>
    );
  }

  export function Total() {
    const [items] = useContext(Context);
  
    const totalPrice = Object.keys(items).reduce((acc, curr) => {
      const [group, item] = curr.split("-");
      const amount = items[curr] * data[group][item].price;
      return acc + amount;
    }, 0);
  
    return (
      <div className="total">
        <span className="total-title">Total:</span>
        <span className="total-price">${totalPrice}</span>
      </div>
    );
  }