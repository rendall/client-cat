import React, { Component } from "react";
import { Breed } from "../common";
import { CAT_IMG, BREEDS_API } from "../constants";
import "./Search.css";

interface SearchProps {
  onSearchChange:(event: React.ChangeEvent<HTMLInputElement>) => void
}

interface SearchState {
}


export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
  }

  render(){
    return (
      <div className="Search"> 
      <input className="Search-Field" onChange={this.props.onSearchChange}></input>
      </div>)
  }
}