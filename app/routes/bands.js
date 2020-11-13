import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import fetch from 'fetch';
import Band from "../models/band";


export default class BandsRoute extends Route {
  @service catalog;

  async model() {
    await fetch('/bands').then(response =>
      response.json()).then(result => {
        result.data.map(item => {
          let {id, attributes, relationships} = item;
          let rels = {};
          let relationshipNames = Object.keys(relationships);
          relationshipNames.forEach(name => {
            rels[name] = relationships[name].links.related;
          })
          let record = new Band({id, ...attributes}, rels);
          this.catalog.add('band', record);
        })
      }
    )
    console.log(this.catalog.bands)
    return this.catalog.bands

  }
}
