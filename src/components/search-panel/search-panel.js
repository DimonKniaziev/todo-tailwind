import React, {Component} from "react";
import './search-panel.scss';

export default class SearchPanel extends Component{
  state= {
    term: ''
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  }

  render() {
    return (
      <input placeholder="type to search" className="search-panel" value={this.state.term} onChange={this.onSearchChange}/>
    );
  }
}