import React, { Component } from "react"; 
import { Pagination } from "react-bootstrap"; 
import PropTypes from "prop-types";

export default class PaginationHandler extends Component {  

   constructor(props) {
    super(props);
    this.state = {
      paging: {
        offset: 0,
        limit: 10
      },
      active: 0
    };  
    }

  pagingHandler = (event) => {
    let offset = parseInt(event.target.id);
    this.setState({
      active: offset
    });
    this.props.pageHandler(event.target.id - 1);   };

  nextHandler = () => {
    let active = this.state.active;
    this.setState({
      active: active + 1
    });
    this.props.pageHandler(active + 1);   };

  backHandler = () => {
    let active = this.state.active;
    this.setState({
      active: active - 1
    });
    this.props.pageHandler(active - 1);   };

  renderPageNumbers = (pageNumbers, totalPages) => {
    let { active } = this.state;
    return (
      <Pagination>
        <Pagination.Prev disabled={active < 5} onClick={ active >5 && this.backHandler} />

        {
      pageNumbers.map(number => {
              if (
                number >= parseInt(active) - 3 &&
                number <= parseInt(active) + 3 
              ) {
                return (
                  <Pagination.Item
                    id={number}
                    active={number == active}
                    onClick={this.pagingHandler}
                  >
                    {number}
                  </Pagination.Item>
                );
              } else {
                return null;
              }
        })}
        <Pagination.Next onClick={ active <= totalPages -4 && this.nextHandler} />
      </Pagination>
    );   };

  buildComponent = (props, state) => {
    const { totalPages } = props;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pull-right">
      {this.renderPageNumbers(pageNumbers ,totalPages)}
      </div>
    );   
};

  render() {
    return this.buildComponent(this.props, this.state);
  } 

} 
   PaginationHandler.propTypes = 
   {
    paging: PropTypes.object,
    pageHandler: PropTypes.func,
    totalPages: PropTypes.object 
   };