import * as React from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, MapContainerProps } from 'react-leaflet'

function LocationMarker() {
  let icon = L.icon({ iconUrl: '/icons/marker-icon.png' })
  let [position, _setPosition] = React.useState<any>([-6.2426, 106.9045])
  let _mapEvent = useMapEvents({
    zoomend(e) {},
    click() {},
    locationfound(e) {},
  })

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export interface MapsProps extends MapContainerProps {}

export default function Maps({ ...props }: MapsProps) {
  return (
    <MapContainer
      className='h-[640px] w-full rounded-lg'
      center={[-6.2426, 106.9045]}
      zoom={5}
      scrollWheelZoom={true}
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker />
    </MapContainer>
  )
}
