export interface Breed {
  _id: string;
  name: string;
  country: string;
  origin: string;
  coat: string;
  bodyType: string;
  pattern: string;
  temperament: string;
  image: string;
  [key: string]: string;
}

// This is a more limited version of the Breed object
export interface BreedItem {
  _id: string;
  name: string;
  country: string;
  image: string;
}
