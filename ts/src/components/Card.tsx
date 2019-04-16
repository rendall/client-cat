import React, { Component, RefObject } from "react";
import { Breed } from "../common";
import { CAT_IMG, BREEDS_API } from "../constants";
import "./Card.css";
import { Spinner } from "./Spinner";
import { XFetch, formatReason } from "../utilities";

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

  closeButton?:HTMLButtonElement | null;

  componentWillMount = () => {
    const URI = `${BREEDS_API}/${this.props.id}`;
    XFetch(URI)
      .then(response => response.json())
      .then(json => this.setState({ breed: json }))
      .catch(reason => this.setState({ error: formatReason(reason) }));
  };

  componentDidUpdate = () => {
    if (this.closeButton) this.closeButton.focus()
  }


  doShowError = () => this.state && this.state.error;
  doShowCard = () => this.state && this.state.breed;

  render() {
    return (
      <div className="Card dialog" role="dialog" aria-labelledby="breed-name" aria-describedby="breed-description">
        {this.doShowError() ? (
          <div className="error">
            <p>{this.state.error}</p>
            <button
              className="Card-Button--close"
              onClick={this.props.onCloseClick}
              ref={ r => this.closeButton = r}
            >
              X
            </button>
          </div>
        ) : this.doShowCard() ? (
          <article>
            <div className="Card-Display">
              <div className="Card-ImageContainer">
                <img
                  className="Card-Image"
                  src={this.state.breed!.image || CAT_IMG}
                />
              </div>
            </div>
            <ul className="Card-Copy" id="breed-description">
              <li>
                <h2 className="Card-Name" id="breed-name">{this.state.breed!.name}</h2>
              </li>
              <li>
                <p className="Card-Country">{this.state.breed!.country}</p>
              </li>
              <li>
                <p className="Card-Description">
                  {createDescription(this.state.breed!)}
                </p>
              </li>
              <li>
                <p className="Card-Origin">
                  {formatOrigin(this.state.breed!.origin)}
                </p>
              </li>
            </ul>
            <button
              className="Card-Button--close"
              onClick={this.props.onCloseClick}
              ref={ r => this.closeButton = r}
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

const formatOrigin = (origin?: string) =>
  origin === undefined
    ? ""
    : origin.includes(":")
    ? origin
    : `Origin: ${origin}`;
const aAn = (word: string) =>
  `${"aeiouAEIOU".indexOf(word.trim()[0]) >= 0 ? "an" : "a"} ${word}`; // This function returns a word prepended with 'a' or 'an' depending on whether 'word' starts with a vowel
const createDescription = (breed: Breed): string => {
  const descs = ["coat", "color", "bodyType", "pattern", "temperament"]
    .filter(d => breed.hasOwnProperty(d))
    .map((d: string) => `${breed[d]} ${d}`)
    .map(d => aAn(d.toLowerCase()));
  const rawDescription =
    descs.length === 1
      ? descs[0]
      : descs.reduce(
          (all, desc, i) =>
            i === 0
              ? desc
              : i === descs.length - 1
              ? `${all}, and ${desc}`
              : `${all}, ${desc}`,
          ""
        );

  const replace: { [index: string]: string } = {
    "/": " or ",
    "an all pattern": "all patterns",
    bodytype: "body type",
    ";": " or ",
    "an all but": "all patterns except"
  };

  const description = Object.keys(replace).reduce(
    (all, key) => all.replace(key, replace[key]),
    rawDescription
  );
  return `The ${breed.name} has ${description}`;
};
