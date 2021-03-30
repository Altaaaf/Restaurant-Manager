import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';

import './ManagerMenu.css';

import api from './api';

export default function ManagerMenu(){
  const [menu, setMenuItems] = useState([]);

  useEffect(() => {
    async function loadMenuItems(){
    try {
      
      const response = await api.get(`/menu`);
      setMenuItems(response.data);

    } catch (error) {
      alert(`Couldn't Load Menu Items. Please try again. Error: ${error}.`);
    }
  }
  loadMenuItems();
  }, [])

  return (
    <div className="admin-view-menu-container">
      <div className="admin-view-menu-content">
        <h1>Menu Items</h1>  

        <Link to='/admin/menu/new'>
          <FiEdit size={16} color="#0c71c3"/>
          Create Menu Item  
        </Link> 

        <ul>
          {menu.map((meal, index) => (
            <li key={index}>
              <strong>Menu Item ID:</strong>
              <p>{meal.index}</p>

              <strong>Name:</strong>
              <p>{meal.Name}</p>

              <strong>Price:</strong>
              <p>€{meal.Price}</p>

              <strong>Description:</strong>
              <p>{meal.Description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
