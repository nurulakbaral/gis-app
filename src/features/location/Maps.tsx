import * as React from 'react'
import { Icon, LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, MapContainerProps, LayerGroup, Marker, LayersControl } from 'react-leaflet'
import { useDisclosure } from '@mantine/hooks'
import { Drawer, Button, Box } from '@mantine/core'
import Image from 'next/image'

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
  type: 'province' | 'location'
}

export interface TMapsProps extends MapContainerProps {
  layerList: Array<TMapLayer>
}

export default function Maps({ layerList, ...props }: TMapsProps) {
  const [currentLayer, setCurrentLayer] = React.useState<null | TMapLayer>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const Icons = {
    point: IconPin,
    monas: IconMonas,
    indonesia: IconIndonesia,
  }

  return (
    <React.Fragment>
      <Drawer.Root className='z-[9999999999]' opened={opened} onClose={close}>
        <Drawer.Content className='z-[9999999999]'>
          <Box className='relative'>
            <Image
              className='w-full'
              src={currentLayer?.imageUrl || ''}
              alt={currentLayer?.name || ''}
              width={200}
              height={200}
            />
            <Drawer.CloseButton className='absolute top-2 right-2 bg-white rounded-full' />
          </Box>

          <Drawer.Header>
            <Drawer.Title className='text-3xl'>{currentLayer?.name}</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>{currentLayer?.description}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      <MapContainer
        className='h-[calc(100vh-6rem)] w-full'
        center={[-2.5489, 118.0149]}
        zoom={5}
        scrollWheelZoom={true}
        {...props}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <LayersControl position='topright'>
          <LayersControl.Overlay name='Provinces Layer'>
            <LayerGroup>
              {layerList
                .filter(({ type }) => type === 'province')
                .map(({ id, name, iconName, position, imageUrl, description, type }) => (
                  <Marker
                    key={id}
                    icon={Icons[iconName]}
                    position={position}
                    eventHandlers={{
                      click: () => {
                        open()
                        setCurrentLayer({ id, name, iconName, position, imageUrl, description, type })
                      },
                    }}
                  />
                ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Locations Layer'>
            <LayerGroup>
              {layerList
                .filter(({ type }) => type === 'location')
                .map(({ id, name, iconName, position, imageUrl, description, type }) => (
                  <Marker
                    key={id}
                    icon={Icons[iconName]}
                    position={position}
                    eventHandlers={{
                      click: () => {
                        open()
                        setCurrentLayer({ id, name, iconName, position, imageUrl, description, type })
                      },
                    }}
                  />
                ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </React.Fragment>
  )
}
