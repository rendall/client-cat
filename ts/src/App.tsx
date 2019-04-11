import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import { List } from "./components/List";
import { Card } from "./components/Card";
import { Search } from "./components/Search";
import { Filter } from "./components/Filter";
import { BREEDS_API } from "./constants";
import { BreedItem } from "./common";
import "./App.css";

interface AppProps {}
interface AppState {
  breeds: BreedItem[];
  breedList: BreedItem[];
  card?: string | null;
  error?: string;
  filteredCountries: string[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  componentWillMount = () => {
    fetch(BREEDS_API)
      .then(response => response.json())
      .then(json =>
        this.setState({ breeds: json, breedList: json, filteredCountries: [] })
      )
      .catch(reason => this.setState({ error: reason }));
  };

  onItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
    this.setState({ card: event.currentTarget.id });
  onCardClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    this.setState({ card: null });
  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const searchBreeds: BreedItem[] =
      value === ""
        ? this.state.breeds
        : this.state.breeds.filter(
            breed => breed.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
          );
    this.setState({ breedList: searchBreeds });
  };

  onFilterChange = (event: any) => {
    // Add country to (or remove it from) the array of filteredCountries
    const filtered = event.target.checked
      ? this.state.filteredCountries.concat([event.target.name])
      : this.state.filteredCountries.filter(
          country => country !== event.target.name
        );

    // If filteredCountries is empty, show all the countries
    if (filtered.length === 0) this.setState({ breedList: this.state.breeds });
    else {
      // otherwise filter those breeds whose countries contain
      const checkFilter = this.state.breeds
        .filter(breed => !!breed.country)
        .filter(breed =>
          filtered.some(country => breed.country.indexOf(country) >= 0)
        );
      this.setState({ breedList: checkFilter });
    }

    this.setState({ filteredCountries: filtered });
  };

  doShowError = () => this.state && this.state.error;
  doShowCard = () => this.state && this.state.card;
  doShowList = () =>
    this.state && this.state.breeds && this.state.breeds.length > 0;

  extractCountries = (items: BreedItem[]) =>
    uniq(
      items
        .filter(item => !!item.country)
        .map(item => normalizeCountry(item.country))
    ).sort();

  render() {
    return (
      <div className="App">
        {this.doShowList() ? (
          <Filter
            countries={this.extractCountries(this.state.breeds)}
            onFilterChange={this.onFilterChange}
          />
        ) : null}
        {this.doShowCard() ? (
          <Card id={this.state.card!} onCloseClick={this.onCardClose} />
        ) : null}
        {this.doShowError() ? (
          <p>{this.state.error}</p>
        ) : this.doShowList() ? (
          <List
            breedList={this.state.breedList}
            onItemClick={this.onItemClick}
          />
        ) : (
          <p>App: please wait</p>
        )}
        <Search onSearchChange={this.onSearchChange} />
      </div>
    );
  }
}

const uniq = (arr: any[], uq: any[] = [], i = 0): any[] =>
  i >= arr.length
    ? uq
    : uq.indexOf(arr[i]) === -1
    ? uniq(arr, uq.concat([arr[i]]), i + 1)
    : uniq(arr, uq, i + 1);
const normalizeCountry = (country: string) => {
  /** Reduce a country from the verbose 'Developed in Ukraine (with stock from Asia)' to just 'Ukraine' */
  const devStart = "Developed in ";
  const noDev = country.startsWith(devStart)
    ? country.substr(devStart.length)
    : country;
  const noThe = noDev.startsWith("the ") ? noDev.substr(4) : noDev;

  const parIndex = noThe.indexOf(" (");
  const noPar = parIndex >= 0 ? noThe.substr(0, parIndex) : noThe;
  const semiColIndex = noPar.indexOf("; ");
  const noSemiCol = semiColIndex >= 0 ? noPar.substr(0, semiColIndex) : noPar;
  const commaIndex = noSemiCol.indexOf(",");
  const noComma = commaIndex >= 0 ? noSemiCol.substr(0, commaIndex) : noSemiCol;
  const andIndex = noComma.indexOf(" and");
  const noAnd = andIndex >= 0 ? noComma.substr(0, andIndex) : noComma;
  return noAnd;
};

export default hot(App);
