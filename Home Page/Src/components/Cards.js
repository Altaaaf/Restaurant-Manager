import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Explore Amazing Features</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/report.jpg'
              text='Generate reports for managers and staff with one click, 
              including daily revenue, monthly revenue, simple accounting report etc.'
              label='Generate Reports'
              path='/features'
            />
            <CardItem
              src='images/Analytics.jpg'
              text='We use machine learning to predict future profit margins or declines based on your data'
              label='Predictive Analytics'
              path='/features'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/expenses.jpg'
              text='Our expense tracking algorithims automatically calculates all of your detailed expenses'
              label='Expense Tracking'
              path='/features'
            />
            <CardItem
              src='images/res.jpg'
              text='Optional Contact-Less Ordering System to keep your customers as safe as possible 
              as restaurants begin to open at full-capacity'
              label='Contact-Less Ordering System'
              path='/features'
            />
            <CardItem
              src='images/menu.jpg'
              text='allow managers to update/edit menu, which will allow customers to view the updated menu in real time.'
              label='Menu Modification'
              path='/features'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
