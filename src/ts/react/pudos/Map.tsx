import { Circle, GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { observer } from 'mobx-react'
import * as React from 'react'
import markerMask from '../../../img/marker/pin_maske.png'
import MapStore from './MapStore'
import InfoView from './InfoView'

const MAPS_API_KEY = window.localStorage.getItem('google-maps-key') || 'YOUR_MAPS_KEY_HERE'

const createIcon = (marker: string) => ({
  url: marker,
  // This marker is 20 pixels wide by 32 pixels high.
  size: { width: 40, height: 40 },
  // The origin for this image is (0, 0).
  origin: { x: 0, y: 0 },
  // The anchor for this image is the base of the flagpole at (0, 32).
  anchor: { x: 20, y: 39 },
})

const icons = {
  pin_mask: createIcon(markerMask),
}

class Map extends React.Component {
  public render() {
    let latDiff = 0.01
    let lonDiff = 0.01
    let minDist = 100000

    if (!MapStore.data || !MapStore.data.length || !MapStore.geoPosition) {
      return (
        <div className="google-maps" style={{ backgroundColor: 'red' }}>
          &nbsp;
        </div>
      )
    }

    return (
      <LoadScript id="script-loader" googleMapsApiKey={MAPS_API_KEY}>
        <GoogleMap
          id="googlemap"
          zoom={15}
          options={{
            minZoom: 10,
            zoom: 15,
            streetViewControl: false,
            mapTypeControl: false,
            restriction: {
              latLngBounds: {
                north: 55,
                south: 47,
                west: 5,
                east: 16,
              },
            },
            clickableIcons: false,
            styles: [
              {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }],
              },
              {
                featureType: 'transit',
                stylers: [{ visibility: 'off' }],
              },
            ],
          }}
          mapContainerClassName="google-maps"
          center={{
            lat: MapStore.geoPosition.lat,
            lng: MapStore.geoPosition.lng,
          }}
        >
          <Circle
            center={{
              lat: MapStore.geoPosition.lat,
              lng: MapStore.geoPosition.lng,
            }}
            radius={250}
            options={{
              clickable: false,
              strokeColor: '#000000',
              strokeOpacity: 0.5,
              strokeWeight: 2,
              fillColor: '#000000',
              fillOpacity: 0.1,
            }}
          />
          {MapStore.data.map((p, i) => (
            <Marker
              onClick={() => {
                MapStore.infoObject = p
                const listEntry = document.getElementById('pudo' + i)
                const list = document.getElementById('result-list')
                if (listEntry && list) {
                  list.scrollTo({ top: listEntry.offsetTop })
                }
              }}
              key={i}
              position={{ lat: p.lat, lng: p.lng }}
              icon={icons['pin_mask']}
            />
          ))}
          {!!MapStore.infoObject && <InfoView />}
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default observer(Map)
