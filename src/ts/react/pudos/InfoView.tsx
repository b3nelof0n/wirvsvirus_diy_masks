import { InfoWindow } from '@react-google-maps/api'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import MapStore from './MapStore'

class InfoView extends React.Component {
  public render() {
    const obj = MapStore.infoObject
    return (
      <InfoWindow
        onCloseClick={() => (MapStore.infoObject = undefined)}
        position={{ lat: obj.lat, lng: obj.lng }}
        options={{ maxWidth: 410 }}
      >
        <div>
          <div>{obj.name}</div>
          <div>{obj.adress}</div>
          <div>{obj.phone}</div>
          <div>
            {obj.stock} x {obj.price} {obj.currency}
          </div>
          <div>
            {obj.pictures.map(photo => (
              <img src={photo} width="20" height="20" />
            ))}
          </div>
        </div>
      </InfoWindow>
    )
  }
}

export default observer(InfoView)
