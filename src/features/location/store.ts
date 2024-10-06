import { create } from 'zustand'
import { TGeoLayer } from './Maps'

export interface TUseStoreLocation {
  stores: {
    geoLayerList: null | Array<TGeoLayer>
    geoLayer: null | TGeoLayer
  }
  actions: {
    initGeoLayerList: (payload: null | Array<TGeoLayer>) => void
    setGeoLayerDetail: (payload: TGeoLayer) => void
    editGeoLayer: (payload: TGeoLayer) => void
    deleteGeoLayer: (payload: TGeoLayer) => void
  }
}

export const INITIAL_VALUES_STORE_LOCATION: TUseStoreLocation['stores'] = {
  geoLayerList: null,
  geoLayer: null,
}

export const useStoreLocation = create<TUseStoreLocation>((set) => ({
  stores: INITIAL_VALUES_STORE_LOCATION,
  actions: {
    initGeoLayerList(payload) {
      set((state) => ({ stores: { ...state.stores, geoLayerList: payload } }))
    },
    setGeoLayerDetail(payload) {
      set((state) => ({ stores: { ...state.stores, geoLayer: payload } }))
    },
    editGeoLayer(payload) {
      set((state) => ({
        stores: {
          geoLayerList:
            state.stores.geoLayerList?.map((geoLayer) => (geoLayer.id === payload.id ? payload : geoLayer)) || [],
          geoLayer: payload,
        },
      }))
    },
    deleteGeoLayer(payload) {
      set((state) => ({
        stores: {
          geoLayerList: state.stores.geoLayerList?.filter((geoLayer) => geoLayer.id !== payload.id) || [],
          geoLayer: null,
        },
      }))
    },
  },
}))
