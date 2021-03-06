import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import { List } from "./components/List";
import { Card } from "./components/Card";
import { Filter } from "./components/Filter";
import { Spinner } from "./components/Spinner";
import { Toggle } from "./components/Toggle";
import { BREEDS_API } from "./constants";
import { BreedItem } from "./common";
import { uniq, formatReason, normalizeCountry, XFetch } from "./utilities";
import "./App.css";
import { setPreventTabbing, onEscape } from "./keyboard";

interface AppProps {}
interface AppState {
  breeds: BreedItem[];
  breedList: BreedItem[];
  card?: string | null;
  error?: string;
  filteredCountries: string[];
  lastFocus?: EventTarget;
  escapeListener?: () => void;
}

class App extends Component<AppProps, AppState> {
  componentWillMount = () => {
    XFetch(BREEDS_API)
      .then(
        response => response.json(),
        (error: Error | string) => this.setState({ error: formatReason(error) })
      )
      .then(json =>
        this.setState({ breeds: json, breedList: json, filteredCountries: [] })
      );
  };

  componentWillUpdate = (prevProps: AppProps, prevState: AppState) => {
    const isCardChange =
      !!prevState && !!this.state && prevState.card !== this.state.card;

    if (isCardChange) {
      const didCardClose = !prevState.card && !!this.state.card;
      const didCardOpen = !didCardClose;
      setPreventTabbing(didCardOpen);
      if (didCardClose)
        // handle focus
        (this.state.lastFocus as HTMLButtonElement).focus();
      if (didCardOpen)
        // handle escape key
        this.setState({ escapeListener: onEscape(this.onEscapeKey) });
      else this.state.escapeListener!();
    }
  };

  onItemClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    this.setState({
      card: event.currentTarget.id,
      lastFocus: event.currentTarget
    });
  onCardClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    this.setState({ card: null });
  onEscapeKey = (event: KeyboardEvent) => this.setState({ card: null });

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

  onOverlayClick = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    this.setState({ card: null });
  }

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
        {this.doShowError() ? (
          <p className="Error">{this.state.error}</p>
        ) : null}
        {this.doShowCard() ? (
          <Card id={this.state.card!} onCloseClick={this.onCardClose} />
        ) : null}
        {this.doShowList() ? <Toggle /> : null}
        {this.doShowCard() ? (
          <div className="dialog-overlay" tabIndex={-1} onClick={this.onOverlayClick} />
        ) : null}
        {this.doShowList() ? (
          <div className="panel-selection">
            <Filter
              countries={this.extractCountries(this.state.breeds)}
              onFilterChange={this.onFilterChange}
              onSearchChange={this.onSearchChange}
            />
          </div>
        ) : null}
        {this.doShowList() ? (
          <div className="panel-display">
            <List
              breedList={this.state.breedList}
              onItemClick={this.onItemClick}
            />
          </div>
        ) : this.doShowError() ? null : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default hot(App);
