import React, { Component } from "react";
import { 
    Box, 
    Container, 
    Row, 
    Column, 
    FooterLink, 
    Heading, 
  } from "./FooterStyles"; 
    
  
class Footer extends Component {
    render() {
        return ( 
      <Box className="flow-text white-text text-darken-1"> 
        <Container> 
          <Row> 
            <Column> 
              <Heading>About Us</Heading> 
              
            </Column> 
            <Column> 
              <Heading>Partnership</Heading> 
              
            </Column> 
            <Column> 
              <Heading>Contact Us</Heading> 
              
            </Column> 
            <Column> 
              <Heading>Social Media</Heading> 
              
            </Column> 
          </Row> 
        </Container> 
      </Box> 
    ); 
  }
}

  export default Footer; 