import { observer } from 'mobx-react'
import * as React from 'react'
import Map from './Map'
import MapStore from './MapStore'
import LoadingSpinner from '../LoadingSpinner'

class FinderForm extends React.Component {
  componentDidMount() {
    MapStore.loadPudos()
  }

  public render() {
    if (!MapStore.data) return <LoadingSpinner />
    return <Map />
  }
}
export default observer(FinderForm)
