import { hot } from 'react-hot-loader/root'
import React, { Component} from "react";
import { List } from './components/List';
import { Card } from './components/Card';
import { Search } from './components/Search';
import { BREEDS_API } from './constants';
import { BreedItem } from './common';
import "./App.css";

interface AppProps {}
interface AppState {
  breeds:BreedItem[],
  breedList:BreedItem[],
  card?:string | null,
  error?:string 
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }

  componentWillMount = () => {
    fetch(BREEDS_API)
      .then(response => response.json())
      .then(json => this.setState({ breeds: json, breedList: json }))
      .catch(reason => this.setState({ error: reason }));
  };

  onItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => this.setState({ card: event.currentTarget.id });
  onCardClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.setState({ card: null });
  onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    const searchBreeds:BreedItem[] = value === ""? this.state.breeds : this.state.breeds.filter( breed => breed.name.toLowerCase().indexOf(value.toLowerCase()) >= 0)
    this.setState({breedList:searchBreeds})
  };

  doShowError = () => this.state && this.state.error;
  doShowCard = () => this.state && this.state.card;
  doShowList = () =>
    this.state && this.state.breeds && this.state.breeds.length > 0;

  render() {
    return (
      <div className="App">
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


export default hot(App)