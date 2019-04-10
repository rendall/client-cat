import React, { Component} from "react";
import { Item } from './List/Item'

interface ListProps {
  breedList:BreedItem[]
  onItemClick:((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void)
}

export class List extends Component<ListProps>{
  constructor(props:ListProps) {
    super(props);
  }
  render(){
    return (
      <ul>
        {this.props.breedList.map(breedItem => (
          <Item
            key={breedItem._id}
            item={breedItem}
            onItemClick={this.props.onItemClick}
          />
        ))}
      </ul>
    );
  }
}
