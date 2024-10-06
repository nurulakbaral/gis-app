import * as React from 'react'
import { Icon, LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, MapContainerProps, LayerGroup, Marker, LayersControl } from 'react-leaflet'
import { useDisclosure } from '@mantine/hooks'
import { type DrawerRootProps, Drawer, Box, Modal, Button, ModalProps } from '@mantine/core'
import Image from 'next/image'
import { PencilIcon } from '@heroicons/react/16/solid'

/**
 * ==============================
 * Layer Edit
 * ==============================
 */

export interface TLayerEditProps extends Omit<ModalProps, 'opened' | 'onClose'> {
  layerDetail: null | TMapLayer
}

export function LayerEdit({ layerDetail, ...props }: TLayerEditProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <React.Fragment>
      <Modal.Root {...props} opened={opened} onClose={close}>
        <Modal.Overlay className='z-[99999999999]' />

        <Modal.Content className='z-[99999999999]'>
          <p>{layerDetail?.description}</p>
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
  layerDetail: null | TMapLayer
  useDisclosureState: ReturnType<typeof useDisclosure>
}

export function LayerDetail({ layerDetail, useDisclosureState, ...props }: TLayerDetailProps) {
  const [ope, { close }] = useDisclosureState

  return (
    <Drawer.Root {...props} onClose={close} opened={ope}>
      <Drawer.Content className='z-[9999999999]'>
        <Box className='relative'>
          <Image
            className='w-full'
            src={layerDetail?.imageUrl || ''}
            alt={layerDetail?.name || ''}
            width={200}
            height={200}
          />
          <Drawer.CloseButton className='absolute top-2 right-2 bg-white rounded-full' />
        </Box>

        <Drawer.Header className='flex items-center justify-between'>
          <Drawer.Title className='text-3xl'>{layerDetail?.name}</Drawer.Title>
          <LayerEdit layerDetail={layerDetail} />
        </Drawer.Header>

        <Drawer.Body>
          <Box>{layerDetail?.description}</Box>
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
  const [stateLayerList, setStateLayerList] = React.useState(layerList)
  const [currentLayer, setCurrentLayer] = React.useState<null | TMapLayer>(null)
  const [opened, { open, close, toggle }] = useDisclosure(false)
  const Icons = {
    point: IconPin,
    monas: IconMonas,
    indonesia: IconIndonesia,
  }

  return (
    <React.Fragment>
      <LayerDetail layerDetail={currentLayer} useDisclosureState={[opened, { open, close, toggle }]} />

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
              {stateLayerList
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
              {stateLayerList
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
