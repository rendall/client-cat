import React, { Component } from "react";
import "./Search.css";

interface SearchProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SearchState {}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return (
      <div className="Search">
        <input className="Search-Field" onChange={this.props.onSearchChange} />
      </div>
    );
  }
}
