import { action, observable } from 'mobx'

export interface GeoPosition {
  lat: number
  lng: number
}

export interface MapData extends GeoPosition {
  name?: string
    pictures: string[],
    adress: string,
    stock: number,
    price: number,
    currency: string,
    phone: string,
    notes: string
}

const demoData = require('../../../testdata.json')

class MapStore {
  @observable
  public data?: MapData[]

  @observable public infoObject?: MapData

  @observable public geoPosition: GeoPosition = { lat: 53.562204, lng: 10.003403 }

  @action
  public async loadPudos() {
    try {
      const response = await fetch(`http://dev.koffer.de/test.php`, {
        headers: { Authorization: 'Basic YOUR_AUTH_HERE' },
      })

      this.data = await response.json()
    } catch (e) {
      this.data = demoData
    }

    if(this.data?.length)  {
    this.geoPosition = this.data[0]
    }
  }
}

const store = new MapStore()

export default store
