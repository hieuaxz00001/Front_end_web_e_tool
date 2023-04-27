import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormKhaoSat from './FormKhaoSat'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import NavLeft from './NavLeft'
import markerr from './../image/maker.png'
import markerr2 from './../image/icons8-street-view-100.png'
import esriConfig from '@arcgis/core/config'
import { getItemLocalStorage } from '../base/base'
import FormDiaDiem from './NavDiaDiem'
import { toast } from 'https://cdn.skypack.dev/wc-toast'
import $ from 'jquery'

import {
  changeIdFormKhaoSat,
  changeVisibleFormKhaoSat
} from '../action_reducer/BaseActionReducer'

esriConfig.apiKey =
  'AAPKd1c0b29161f34f41b53daf85636e59926tzbgZr3Cvwf2gzqx0j8fclreeQvvlZURxiIXZQD4CpHQrLn9xTgBsMy-UO4YYhI'
export var map = new Map({
  basemap: 'arcgis-topographic'
})
export var simpleMarkerSymbol = {
  type: 'picture-marker',
  url: markerr,
  width: '30px',
  height: '30px'
}
export var simpleMarkerSymbol2 = {
  type: 'picture-marker',
  url: markerr2,
  width: '40px',
  height: '40px'
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
  const dispatch = useDispatch()

  // const latitude = useSelector(state => state.baseMap.lat)
  // const longitude = useSelector(state => state.baseMap.lon)
  const userLogin = getItemLocalStorage('user')
  const listPointPhieuKhaoSat = useSelector(
    state => state.baseMap.listPointKhaoSat
  )
  const typeMap = useSelector(state => state.mapActive.type)
  const stateee = useSelector(state => state)

  const [current_lat, setCurrent_lat] = useState('')
  const [visibleFormInforMaker, setVisibleFormInforMaker] = useState('')
  const [idFormInforMaker, setIdFormInforMaker] = useState(null)
  const [current_lon, setCurrent_lon] = useState('')
  const [timer, setTimer] = useState(null)

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

  useEffect(() => {
    // map.removeAll()
    graphicsLayer.removeAll()

    view.map.basemap = typeMap
    if (listPointPhieuKhaoSat.length > 0) {
      let arr = []
      for (let i in listPointPhieuKhaoSat) {
        const point2 = {
          type: 'point',
          longitude: parseFloat(listPointPhieuKhaoSat[i][1]),
          latitude: parseFloat(listPointPhieuKhaoSat[i][0])
        }
        Graphic.prototype.idPhieuKhaoSat = null
        const pointGraphic2 = new Graphic({
          geometry: point2,
          symbol: simpleMarkerSymbol,
          idPhieuKhaoSat: listPointPhieuKhaoSat[i][2]
        })
        graphicsLayer.add(pointGraphic2)
        map.add(graphicsLayer)
        arr.push(pointGraphic2)
      }
    }
    // map = new Map({
    //   basemap: typeMap
    // })
    // graphicsLayer = new GraphicsLayer()
    // view = new MapView({
    //   center: [105.82972326668407, 20.992903563656817],
    //   container: 'viewDiv',
    //   map: map,
    //   zoom: 9,
    //   popup: {
    //     defaultPopupTemplateEnabled: false,
    //     dockEnabled: true,
    //     dockOptions: {
    //       buttonEnabled: false,
    //       breakpoint: false
    //     },
    //     autoOpenEnabled: false
    //   }
    // })
    // map.add(graphicsLayer)
  }, [typeMap])
  useEffect(() => {
    map = new Map({
      basemap: 'arcgis-topographic'
    })
    graphicsLayer = new GraphicsLayer()

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
  }, [])

  const openModal = () => {
    setShowDialog(true)
  }
  useEffect(() => {})
  useEffect(() => {
    map.removeAll()
    if (listPointPhieuKhaoSat.length > 0) {
      let arr = []
      for (let i in listPointPhieuKhaoSat) {
        const point2 = {
          type: 'point',
          longitude: parseFloat(listPointPhieuKhaoSat[i][1]),
          latitude: parseFloat(listPointPhieuKhaoSat[i][0])
        }
        Graphic.prototype.idPhieuKhaoSat = null
        const pointGraphic2 = new Graphic({
          geometry: point2,
          symbol: simpleMarkerSymbol,
          idPhieuKhaoSat: listPointPhieuKhaoSat[i][2]
        })
        graphicsLayer.add(pointGraphic2)
        map.add(graphicsLayer)
        arr.push(pointGraphic2)
      }
      view.on('click', function (event) {
        view.hitTest(event).then(function (response) {
          for (let k in graphicsLayer.graphics.items) {
            let item = graphicsLayer.graphics.items[k]

            if (response.results[0].graphic == item) {
              console.log('trùng')
              response.results[0].graphic.symbol = simpleMarkerSymbol2
              setVisibleFormInforMaker(true)
              setIdFormInforMaker(response.results[0].graphic.idPhieuKhaoSat)

              $('#table-infor-marker').css({
                top: `${event.screenPoint.y + 20 + 'px'}`,
                left: `${event.screenPoint.x + 20 + 'px'}`
              })
              break
            } else {
              console.log('không trùng')
              setVisibleFormInforMaker(false)
              setIdFormInforMaker(null)
            }
          }

          // const action = changeVisibleFormKhaoSat(true)
          // const action2 = changeIdFormKhaoSat(
          //   response.results[0].graphic.idPhieuKhaoSat
          // )
          // dispatch(action)
          // dispatch(action2)
        })
      })
      view.on('pointer-move', function (event) {
        view.hitTest(event).then(function (response) {
          for (let k in graphicsLayer.graphics.items) {
            let item = graphicsLayer.graphics.items[k]

            if (response.results[0].graphic == item) {
              if (
                response.results[0].graphic.symbol.url == simpleMarkerSymbol.url
              ) {
                response.results[0].graphic.symbol = simpleMarkerSymbol2
              }
              break
            } else {
              item.symbol = simpleMarkerSymbol
              // clearTimeout(timer)
              // setTimer(
              //   setTimeout(() => {
              //     setVisibleFormInforMaker(false)
              //     setIdFormInforMaker(null)
              //   }, 1000)
              // )
            }
          }
        })
      })
      view.on('pointer-out', function (event) {
        view.hitTest(event).then(function (response) {
          response.results[0].graphic.symbol = simpleMarkerSymbol
        })
      })
    }
  }, [listPointPhieuKhaoSat])

  return (
    <div style={styles.container}>
      <FormInForMaker id={idFormInforMaker} visible={visibleFormInforMaker} />
      <FormDiaDiem />
      <NavLeft visible={true} userLogin={userLogin} />
      <div className='position-absolute'>
        <FormKhaoSat />
      </div>
      <div id='viewDiv' style={styles.mapDiv}></div>
    </div>
  )
}
export default Basemap

export const FormInForMaker = props => {
  if (props.visible) {
    return (
      <div
        id='table-infor-marker'
        className='row position-absolute infor-marker bg-light border shadow pt-1 pb-1 ps-2 pe-2 rounder border-radius-10'
        style={{ width: '500px', zIndex: '1001', left: '10vh' }}
      >
        <table
          className='table table-borderless table-infor-marker'
          style={{ border: 'none', borderBottom: 'none' }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid green' }}>
              <th scope='col' className='text-start fs-09'>
                <img
                  className='me-1'
                  width={20}
                  height={20}
                  src={markerr}
                  alt=''
                />
                {/* <span>Môi trường</span> */}
                <span>Environment</span>

              </th>
              <th scope='col' className='text-start fs-09'>
                <img
                  className='me-1'
                  width={20}
                  height={20}
                  src={markerr}
                  alt=''
                />
                {/* <span>Cộng đồng</span> */}
                <span>Community</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                className='text-start fs-08 ps-4'
                style={{ fontWeight: 600, color: '#686868' }}
              >
                {/* <span>Nhiệt độ:</span> */}
                <span>Temperature</span>
                <span>{props.id}</span>
              </th>
              <td className='text-start fs-08 ps-4'>
                {/* <span>Chế độ quần áo:</span> */}
                <span>Clothes mode</span>
                <span></span>
              </td>
            </tr>
            <tr>
              <th
                className='text-start fs-08 ps-4'
                style={{ fontWeight: 600, color: '#686868' }}
              >
                <span>Gió:</span>
                <span></span>
              </th>
              <td className='text-start fs-08 ps-4'>
                {/* <span>Mức độ tiện nghi nhiệt:</span> */}
                <span>Thermal comfort level</span>
                <span></span>
              </td>
            </tr>
            <tr>
              <th
                className='text-start fs-08 ps-4'
                style={{ fontWeight: 600, color: '#686868' }}
              >
                {/* <span>Nắng:</span> */}
                <span>Sunny</span>
                <span></span>
              </th>
              <td className='text-start fs-08 ps-4'>
                {/* <span>Tình trạng sức khỏe:</span> */}
                <span>Health status</span>
                <span></span>
              </td>
            </tr>
            <tr>
              <th
                className='text-start fs-08 ps-4'
                style={{ fontWeight: 600, color: '#686868' }}
              >
                {/* <span>Độ ẩm:</span> */}
                <span>humidity</span>
                <span></span>
              </th>
              <td className='text-start fs-08 ps-4'>
                {/* <span>Môi trường nhiệt:</span> */}
                <span>Thermal environment</span>
                <span></span>
              </td>
            </tr>
            <tr>
              <th
                className='text-start fs-08 ps-4'
                style={{ fontWeight: 600, color: '#686868' }}
              >
                {/* <span>Cây xanh, thảm cỏ:</span> */}
                <span>Green trees, grass</span>
                <span></span>
              </th>
              <td className='text-start fs-08 ps-4'>
                <span></span>
                <span></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return ''
  }
}
