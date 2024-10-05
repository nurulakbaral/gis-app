import * as React from 'react'
import { Icon } from 'leaflet'
import { MapContainer, TileLayer, MapContainerProps, GeoJSON, LayersControl, Popup, Marker } from 'react-leaflet'

const IconPin = new Icon({
  iconUrl: '/icons/icon-pin.png',
  iconSize: [32, 32],
})

const IconIndonesia = new Icon({
  iconUrl: '/icons/icon-indonesia.png',
  iconSize: [32, 32],
})

const IconMonas = new Icon({
  iconUrl: '/icons/icon-monas.png',
  iconSize: [32, 32],
})

export interface MapsProps extends MapContainerProps {}

export default function Maps({ ...props }: MapsProps) {
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

      <Marker icon={IconPin} position={[-6.194883674005233, 106.8178317822333]}>
        <Popup>
          <input type='text' className='w-full' />
        </Popup>
      </Marker>

      <Marker icon={IconPin} position={[-6.916050781473794, 107.61157008179057]}>
        <Popup>
          <input type='text' className='w-full' />
        </Popup>
      </Marker>

      <Marker icon={IconPin} position={[-8.407034444343934, 115.18446976008947]}>
        <Popup>
          <input type='text' className='w-full' />
        </Popup>
      </Marker>

      <Marker icon={IconPin} position={[0.5839205467192294, 116.41894214826006]}>
        <Popup>
          <input type='text' className='w-full' />
        </Popup>
      </Marker>

      <Marker icon={IconIndonesia} position={[-0.9607627964850126, 116.69823745742387]}>
        <Popup>
          <input type='text' className='w-full' />
        </Popup>
      </Marker>

      <Marker icon={IconMonas} position={[-6.175125722515539, 106.82719571412338]}>
        <Popup>
          <input type='text' className='w-full' />
        </Popup>
      </Marker>
    </MapContainer>
  )
}
