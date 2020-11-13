export default class Albums {
  title = '';
  price = 0;

  constructor({title, price}) {
    this.title = title;
    this.price = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(price);
  }
}
