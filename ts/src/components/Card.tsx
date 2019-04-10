import React, { Component } from "react";
import { Breed } from "../common";
import { CAT_IMG, BREEDS_API } from "../constants";

interface CardProps {
  id:string;
  onCloseClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface CardState {
  breed?: Breed;
  error?:string;
}


export class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
  }

  componentWillMount = () => {
    const URI = `${ BREEDS_API }/${this.props.id}`
    console.log("componentWillMount", URI)
    fetch(URI)
      .then(response => response.json())
      .then(json => this.setState({breed: json}))
      .then(() => console.log("state:", this.state))
      .catch(reason => this.setState({error:reason}));
  }

  onCardClose= (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => this.setState({card:null}) 

  doShowError = () => this.state && this.state.error
  doShowCard = () => this.state && this.state.breed
  
  render(){
    return (
      <div className="Card"> 
      { this.doShowError()? 
        <p>{this.state.error}</p> 
        : this.doShowCard()?
        <article>
          <img src={this.state.breed!.image || CAT_IMG} />
          <h2>{this.state.breed!.name}</h2>
          <p>{createDescription(this.state.breed!)}</p>
          <button onClick={this.props.onCloseClick}>close</button>
        </article>
        : 
        <p>Card: Please wait</p>
      }</div>)
  }
}

const aAn = (word: string) => ("aeiou".indexOf(word[0]) >= 0 ? "an" : "a"); // This function returns 'a' or 'an' depending on whether 'word' starts with a vowel
const createDescription = (breed: Breed): string => `The ${breed.name} has ${aAn( breed.temperament)} ${breed.temperament.toLowerCase()} temperament`;