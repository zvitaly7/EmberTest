import Controller from '@ember/controller';
import {action} from '@ember/object';
import fetch from 'fetch';
import Band from "../../models/band";
import {inject as service} from '@ember/service';

export default class BandsNewController extends Controller {
  @service catalog;
  @service router;

  @action
  async saveBand() {
    let response = await fetch('/bands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({
        data: {
          type: 'bands',
          attributes: {
            name: this.name
          }
        }
      })
    });
    let json = await response.json();
    let {id, attributes} = json.data;
    let record = new Band({id, ...attributes});
    this.catalog.add('band', record);
    this.router.transitionTo('bands.band.songs', id);
  }
}
