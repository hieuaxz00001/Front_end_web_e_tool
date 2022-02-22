import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormKhaoSat from './FormKhaoSat'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import NavLeft from './NavLeft'
import markerr from './../image/maker.png'
import esriConfig from '@arcgis/core/config'
import { getItemLocalStorage } from '../base/base'

esriConfig.apiKey =
  'AAPKd1c0b29161f34f41b53daf85636e59926tzbgZr3Cvwf2gzqx0j8fclreeQvvlZURxiIXZQD4CpHQrLn9xTgBsMy-UO4YYhI'
export var map = new Map({
  basemap: 'arcgis-topographic'
})
export var simpleMarkerSymbol = {
  type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
  url: markerr,
  width: '30px',
  height: '30px'
}
export var view = new MapView({
  center: [105.82972326668407, 20.992903563656817],
  container: 'viewDiv',
  map: map,
  zoom: 9,
  popup: {
    defaultPopupTemplateEnabled: false,
    dockEnabled: true,
    dockOptions: {
      buttonEnabled: false,
      breakpoint: false
    },
    autoOpenEnabled: false
  }
})
export var graphicsLayer = new GraphicsLayer()

const Basemap = props => {
  // const typeMap = useSelector(state => state.mapActive)

  // const latitude = useSelector(state => state.baseMap.lat)
  // const longitude = useSelector(state => state.baseMap.lon)
  const userLogin = getItemLocalStorage('user')
  const listPointPhieuKhaoSat = useSelector(
    state => state.baseMap.listPointKhaoSat
  )
  const [current_lat, setCurrent_lat] = useState('')
  const [current_lon, setCurrent_lon] = useState('')

  const [showDialog, setShowDialog] = useState(false)
  const styles = {
    container: {
      height: '100vh',
      width: '100vw'
    },
    mapDiv: {
      padding: 0,
      margin: 0,
      height: '100%',
      width: '100%'
    }
  }

  // useEffect(() => {
  //   console.log(typeMap)
  // }, [typeMap])
  useEffect(() => {
    map = new Map({
      basemap: 'arcgis-topographic'
    })
    graphicsLayer = new GraphicsLayer()
    simpleMarkerSymbol = {
      type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
      url: markerr,
      width: '30px',
      height: '30px'
    }
    view = new MapView({
      center: [105.82972326668407, 20.992903563656817],
      container: 'viewDiv',
      map: map,
      zoom: 9,
      popup: {
        defaultPopupTemplateEnabled: false,
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false
        },
        autoOpenEnabled: false
      }
    })
    map.add(graphicsLayer)
    view.on('click', event => {
      handlerClick(event)
    })
  }, [])
  const handlerClick = event => {
    var lat = Math.round(event.mapPoint.latitude * 1000) / 1000
    var lon = Math.round(event.mapPoint.longitude * 1000) / 1000
    setCurrent_lat(lat)
    setCurrent_lon(lon)
    const point = {
      //Create a point
      type: 'point',
      longitude: lon,
      latitude: lat
    }
    console.log(point)
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
    })
    graphicsLayer.add(pointGraphic)
    map.add(graphicsLayer)
    // view.popup.open({
    //   title: 'Reverse geocode: [' + lon + ', ' + lat + ']',
    //   location: event.mapPoint
    // })
    openModal()
  }

  const openModal = () => {
    setShowDialog(true)
  }
  useEffect(() => {
    map.removeAll()
    if (listPointPhieuKhaoSat.length > 0) {
      for (let i in listPointPhieuKhaoSat) {
        const point2 = {
          type: 'point',
          longitude: parseFloat(listPointPhieuKhaoSat[i][1]),
          latitude: parseFloat(listPointPhieuKhaoSat[i][0])
        }
        const pointGraphic2 = new Graphic({
          geometry: point2,
          symbol: simpleMarkerSymbol
        })
        graphicsLayer.add(pointGraphic2)
        map.add(graphicsLayer)
      }
    }
  }, [listPointPhieuKhaoSat])

  return (
    <div style={styles.container}>
      <NavLeft visible={true} userLogin={userLogin} />
      <div className='position-absolute'>
        <FormKhaoSat visible={showDialog} lat={current_lat} lon={current_lon} />
      </div>
      <div id='viewDiv' style={styles.mapDiv}></div>
    </div>
  )
}
export default Basemap
