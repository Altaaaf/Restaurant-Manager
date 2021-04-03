import React, { Component } from "react";


class Button extends Component {
  render() {
    const { title, onClick } = this.props;
    return (
      <div onClick={onClick} className="profile-container">
        <h1>{title}</h1>
      </div>
    );
  }
}

export default Button;