import * as React from 'react'
import { Icon, LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, MapContainerProps, Popup, Marker } from 'react-leaflet'

const IconPin = new Icon({
  iconUrl: '/icons/icon-pin.png',
  iconSize: [32, 32],
})

const IconMonas = new Icon({
  iconUrl: '/icons/icon-monas.png',
  iconSize: [32, 32],
})

const IconIndonesia = new Icon({
  iconUrl: '/icons/icon-indonesia.png',
  iconSize: [32, 32],
})

export type TMapLayer = {
  id: string
  name: string
  iconName: 'point' | 'monas' | 'indonesia'
  position: LatLngExpression
  imageUrl: string
  description: string
}

export interface TMapsProps extends MapContainerProps {
  layerList: Array<TMapLayer>
}

export default function Maps({ layerList, ...props }: TMapsProps) {
  const Icons = {
    point: IconPin,
    monas: IconMonas,
    indonesia: IconIndonesia,
  }

  return (
    <MapContainer
      className='h-[640px] w-full rounded-lg'
      center={[-2.5489, 118.0149]}
      zoom={5}
      scrollWheelZoom={true}
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {layerList.map(({ id, name, iconName, position, imageUrl, description }) => (
        <Marker key={id} icon={Icons[iconName]} position={position}>
          <Popup>
            <p>{name}</p>
            <p>{description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
