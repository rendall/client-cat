import React, { Component } from "react";
import { Breed } from "../common";
import { CAT_IMG, BREEDS_API } from "../constants";
import "./Card.css";
import { Spinner } from "./Spinner";

interface CardProps {
  id: string;
  onCloseClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

interface CardState {
  breed?: Breed | null;
  error?: string;
}

export class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
  }

  componentWillMount = () => {
    const URI = `${BREEDS_API}/${this.props.id}`;
    console.log("componentWillMount", URI);
    fetch(URI)
      .then(response => response.json())
      .then(json => this.setState({ breed: json }))
      .then(() => console.log("state:", this.state))
      .catch(reason => this.setState({ error: reason }));
  };

  onCardClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    this.setState({ breed: null });

  doShowError = () => this.state && this.state.error;
  doShowCard = () => this.state && this.state.breed;

  render() {
    return (
      <div className="Card">
        {this.doShowError() ? (
          <p>{this.state.error}</p>
        ) : this.doShowCard() ? (
          <article>
            <img
              className="Card-Image"
              src={this.state.breed!.image || CAT_IMG}
            />
            <h2 className="Card-Name">{this.state.breed!.name}</h2>
            <p className="Card-Description">
              {createDescription(this.state.breed!)}
            </p>
            <button
              className="Card-Button--close"
              onClick={this.props.onCloseClick}
            >
              X
            </button>
          </article>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const aAn = (word: string) =>
  "aeiou".indexOf(word.trim()[0]) >= 0 ? "an" : "a"; // This function returns 'a' or 'an' depending on whether 'word' starts with a vowel
const createDescription = (breed: Breed): string =>
  `The ${breed.name} has ${aAn(
    breed.temperament
  )} ${breed.temperament.toLowerCase()} temperament`;
