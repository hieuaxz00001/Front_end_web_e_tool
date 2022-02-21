import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormKhaoSat from './FormKhaoSat'
import Button from 'react-bootstrap/Button'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import { geolocated } from 'react-geolocated'
import NavLeft from './NavLeft'
import markerr from './../image/maker.png'

export const map = new Map({
  basemap: 'streets-navigation-vector'
})
// export const simpleMarkerSymbol = {
//   type: 'simple-marker',
//   // color: [226, 119, 40], // Orange
//   path:'./../image/marker.png',
//   outline: {
//     color: [255, 255, 255], // White
//     width: 1
//   }
// }
export const simpleMarkerSymbol = {
  type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
  url: markerr,
  width: "30px",
  height: "30px"
};
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

const Basemap = props => {
  const latitude = useSelector(state => state.baseMap.lat)
  const longitude = useSelector(state => state.baseMap.lon)
  const listPointPhieuKhaoSat = useSelector(
    state => state.baseMap.listPointKhaoSat
  )

  const graphicsLayer = new GraphicsLayer()
  const [status, setStatus] = useState('loading')
  const [options_draw, setOptions_draw] = useState('')
  const [list_point_of_polyline, setList_point_of_polyline] = useState([])
  const [list_point_of_polygon, setList_point_of_polygon] = useState([])
  const [current_lat, setCurrent_lat] = useState('')
  const [current_lon, setCurrent_lon] = useState('')
  const [lat_user, setLat_user] = useState(latitude)
  const [lon_user, setLon_user] = useState(longitude)
  const [showDialog, setShowDialog] = useState(false)
  const options = {
    url: 'https://js.arcgis.com/4.22/'
  }

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

  var handler = null

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
    console.log(map);
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
  useEffect(() => {
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
  return (
    <div style={styles.container}>
      <NavLeft visible={true} />
      <div className='position-absolute'>
        <FormKhaoSat visible={showDialog} lat={current_lat} lon={current_lon} />
      </div>
      <div id='viewDiv' style={styles.mapDiv}></div>
    </div>
  )
}
export default Basemap
