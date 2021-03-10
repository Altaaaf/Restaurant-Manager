import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

        //Button
        //  className='btns'
        //  buttonStyle='btn--outline'
        //  buttonSize='btn--large'
        // > Extra button for home if wanted
        ///Button>
        

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/home-page2.mp4' autoPlay loop muted />
      <h1>All-In-One Restuarant Management System </h1>
      <p>Track expenses,contact-less ordering options, generate reports, predictive analytics & 
        every thing you need to focus on your restaurant...not in your restaurant.</p>
      <div className='hero-btns'>
        
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          
          Free Demo <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
