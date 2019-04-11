import React, { Component } from "react";
import "./Filter.css";

interface FilterProps {
  countries: string[];
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FilterState {}

export class Filter extends Component<FilterProps, FilterState> {
  constructor(props: FilterProps) {
    super(props);
  }

  render() {
    return (
      <div className="Filter">
        {this.props.countries.map(country => (
          <label className="Filter-Item" key={country}>
            <input
              name={country}
              type="checkbox"
              onChange={this.props.onFilterChange}
            />
            {country}
          </label>
        ))}
      </div>
    );
  }
}
