import React, { Component } from "react";
import { CAT_IMG } from "../../constants";
import { BreedItem } from "../../common";
import "./Item.css";

interface ItemProps {
  item: BreedItem;
  onItemClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export class Item extends Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
  }
  render() {
    return (
      <button
        className="Item"
        id={this.props.item._id}
        onClick={this.props.onItemClick}
      >
        <div className="Item-ImageContainer">
          <img className="Item-Image" src={this.props.item.image || CAT_IMG} />
        </div>

        <h2 className="Item-Name">{this.props.item.name}</h2>
      </button>
    );
  }
}
