import * as React from 'react'
import { Icon, LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, MapContainerProps, LayerGroup, Marker, LayersControl } from 'react-leaflet'
import { useDisclosure } from '@mantine/hooks'
import { type DrawerRootProps, Drawer, Box, Modal, Button, ModalProps } from '@mantine/core'
import Image from 'next/image'
import { PencilIcon } from '@heroicons/react/16/solid'
import { useStoreLocation } from './store'

/**
 * ==============================
 * Layer Edit
 * ==============================
 */

export interface TLayerEditProps extends Omit<ModalProps, 'opened' | 'onClose'> {}

export function LayerEdit({ ...props }: TLayerEditProps) {
  const geoLayer = useStoreLocation((state) => state.stores.geoLayer)
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <React.Fragment>
      <Modal.Root {...props} opened={opened} onClose={close}>
        <Modal.Overlay className='z-[99999999999]' />

        <Modal.Content className='z-[99999999999]'>
          <p>{geoLayer?.description}</p>
        </Modal.Content>
      </Modal.Root>

      <Button leftSection={<PencilIcon className='w-4 h-4 text-white' />} size='xs' onClick={open}>
        Edit Layer
      </Button>
    </React.Fragment>
  )
}

/**
 * ==============================
 * Layer Detail
 * ==============================
 */

export interface TLayerDetailProps extends Omit<DrawerRootProps, 'opened' | 'onClose'> {
  useDisclosureState: ReturnType<typeof useDisclosure>
}

export function LayerDetail({ useDisclosureState, ...props }: TLayerDetailProps) {
  const geoLayer = useStoreLocation((state) => state.stores.geoLayer)
  const [ope, { close }] = useDisclosureState

  return (
    <Drawer.Root {...props} onClose={close} opened={ope}>
      <Drawer.Content className='z-[9999999999]'>
        <Box className='relative'>
          <Image
            className='w-full'
            src={geoLayer?.imageUrl || ''}
            alt={geoLayer?.name || ''}
            width={200}
            height={200}
          />
          <Drawer.CloseButton className='absolute top-2 right-2 bg-white rounded-full' />
        </Box>

        <Drawer.Header className='flex items-center justify-between'>
          <Drawer.Title className='text-3xl'>{geoLayer?.name}</Drawer.Title>
          <LayerEdit />
        </Drawer.Header>

        <Drawer.Body>
          <Box>{geoLayer?.description}</Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
}

/**
 * ==============================
 * Maps
 * ==============================
 */

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

export type TGeoLayer = {
  id: string
  name: string
  iconName: 'point' | 'monas' | 'indonesia'
  position: LatLngExpression
  imageUrl: string
  description: string
  type: 'province' | 'location'
}

export interface TMapsProps extends MapContainerProps {}

export default function Maps({ ...props }: TMapsProps) {
  const { stores, actions } = useStoreLocation()
  const [opened, { open, close, toggle }] = useDisclosure(false)
  const Icons = {
    point: IconPin,
    monas: IconMonas,
    indonesia: IconIndonesia,
  }

  return (
    <React.Fragment>
      <LayerDetail useDisclosureState={[opened, { open, close, toggle }]} />

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
              {stores.geoLayerList
                ?.filter(({ type }) => type === 'province')
                .map((geoLayer) => (
                  <Marker
                    key={geoLayer.id}
                    icon={Icons[geoLayer.iconName]}
                    position={geoLayer.position}
                    eventHandlers={{
                      click: () => {
                        open()
                        actions.setGeoLayerDetail(geoLayer)
                      },
                    }}
                  />
                ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Locations Layer'>
            <LayerGroup>
              {stores.geoLayerList
                ?.filter(({ type }) => type === 'location')
                .map((geoLayer) => (
                  <Marker
                    key={geoLayer.id}
                    icon={Icons[geoLayer.iconName]}
                    position={geoLayer.position}
                    eventHandlers={{
                      click: () => {
                        open()
                        actions.setGeoLayerDetail(geoLayer)
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
