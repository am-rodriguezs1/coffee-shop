export class Coffee {
  id: number;
  name: string;
  type: string;
  region: string;
  flavor: string;
  height: number;
  image: string;

  constructor(
    id: number,
    name: string,
    type: string,
    region: string,
    flavor: string,
    height: number,
    image: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.region = region;
    this.flavor = flavor;
    this.height = height;
    this.image = image;
  }
}
