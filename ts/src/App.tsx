import { hot } from 'react-hot-loader/root'
import React, { Component} from "react";
import { List } from './components/List';
import { Card } from './components/Card';
import { BREEDS_API } from './constants';
import { BreedItem } from './common';
import "./App.css";

interface AppProps {}
interface AppState {
  breeds:BreedItem[],
  card?:string | null,
  error?:string 
}

class App extends Component<AppProps, AppState>{
  constructor(props:AppProps){
    super(props);
  }

  componentWillMount = () => {
    fetch(BREEDS_API)
      .then(response => response.json())
      .then(json => this.setState({breeds: json}))
      .catch(reason => this.setState({error:reason}));
  }

  onItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => this.setState({card:event.currentTarget.id}) 
  onCardClose= (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => this.setState({card:null}) 

  doShowError = () => this.state && this.state.error
  doShowCard = () => this.state && this.state.card
  doShowList = () => this.state && this.state.breeds && this.state.breeds.length > 0

  render(){
    return(
      <div className="App">
      {this.doShowError()? <p>{this.state.error}</p> 
        : this.doShowCard()? <Card id={this.state.card!} onCloseClick={this.onCardClose} />
        : this.doShowList()? <List breedList={this.state.breeds} onItemClick={this.onItemClick}/>
        : <p>App: please wait</p>
      }
      </div>
    );
  }
}


export default hot(App)