import React, { Component} from "react";
import { CAT_IMG } from "../../constants";
import { BreedItem } from "../../common";


interface ItemProps {
  item:BreedItem
  onItemClick:((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void)
}

export class Item extends Component<ItemProps>{
  constructor(props:ItemProps) {
    super(props);
  }
  render(){
    return (
      <li id={this.props.item._id} onClick={ this.props.onItemClick }>
        <img src={this.props.item.image || CAT_IMG} />
        <h2>{this.props.item.name}</h2>
        <p>{this.props.item.country}</p>
      </li>
    );
  }
}
