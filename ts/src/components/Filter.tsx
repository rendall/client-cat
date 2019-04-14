import React, { Component } from "react";
import "./Filter.css";
import { Search } from "./Search";

interface FilterProps {
  countries: string[];
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FilterState {}

export class Filter extends Component<FilterProps, FilterState> {
  constructor(props: FilterProps) {
    super(props);
  }

  onFocus = (event: React.FocusEvent<HTMLInputElement>) => (event.target.parentElement as HTMLLabelElement).classList.add("is-focused")
  onBlur = (event: React.FocusEvent<HTMLInputElement>) => (event.target.parentElement as HTMLLabelElement).classList.remove("is-focused")

  render() {
    return (
      <div className="Filter">
      <h2>Country Filter</h2>
        {this.props.countries.map(country => (
          <label className="Filter-Item" key={country}>
            <input
              name={country}
              type="checkbox"
              onChange={this.props.onFilterChange}
              tabIndex={0}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
            {country}
          </label>
        ))}
        <h2>Name Search</h2>
        <Search onSearchChange={this.props.onSearchChange} />
      </div>
    );
  }
}
