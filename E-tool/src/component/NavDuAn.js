import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { thayDoiToaDoPhieuKhaoSat } from '../action_reducer/BaseMapActionReducer'
import { thayDoiListDiaDiem } from '../action_reducer/ListDiaDiemActionReDucer'
import { ajaxCallGet, getItemLocalStorage } from '../base/base'
import FormDiaDiem from './NavDiaDiem'
import iconView from './../image/vision_60px.png'
import iconClose from './../image/delete_48px.png'
import iconDoc from './../image/bulleted_list_60px.png'

const NavDuAn = props => {
  const dispatch = useDispatch()
  const [showDuAn, setShowDuAn] = useState(false)
  const [show_dia_diem_khao_sat, setShow_dia_diem_khao_sat] = useState(false)
  const [user, setUser] = useState(getItemLocalStorage('user'))
  const [id_nhom_khao_sat, setId_nhom_khao_sat] = useState(null)
  const [dataDuAn, setDataDuAn] = useState([])
  const [tenNhom, setTenNhom] = useState('')
  useEffect(() => {
    ajaxCallGet(
      'phuong-an-has-user/get-list-phuong-an?queries=userId.id=' + user.id
    ).then(rs => {
      setDataDuAn(rs.data)
    })
  }, [])

  useEffect(() => {
    setShowDuAn(props.visible)
  }, [props.visible])

  const handleViewPhieuKhaoSat = (id_nhom_khao_sat, ten_nhom) => {
    ajaxCallGet(
      'phieu-khao-sat?queries=deleted=false,phuongAnQuyHoachId.id=' +
        id_nhom_khao_sat
    ).then(rs => {
      console.log(id_nhom_khao_sat)
      // setData_dia_diem(rs.data)
      let listPointPhieuKhaoSat = []
      for (let i in rs.data) {
        listPointPhieuKhaoSat.push([
          rs.data[i].vyDo,
          rs.data[i].kinhDo,
          rs.data[i].id
        ])
      }
      const action = thayDoiToaDoPhieuKhaoSat(listPointPhieuKhaoSat)
      dispatch(action)
      let obj = {
        idNhom: id_nhom_khao_sat,
        tenNhom: ten_nhom,
        active: true,
        list: rs.data
      }
      const action2 = thayDoiListDiaDiem(obj)
      dispatch(action2)
    })
  }

  const renderUI = () => {
    if (showDuAn) {
      return (
        <div
          className='position-absolute bg-light   bg-body rounded shadow'
          style={{
            zIndex: 1000,
            left: '101%',
            overflowY: 'unset',
            height: '100vh'
          }}
        >
          <nav
            className='block-sidebar'
            id='side-control'
            style={{ width: '300px' }}
          >
            <div className='side-control-header d-flex fs-4 p-2 justify-content-between align-items-center'>
              <h6 className='m-0 text-gr'>
                <strong>Dự án</strong>
              </h6>
              <button
                className='btn btn-success fs-09 border-radius-10 pt-1 pb-1 ps-3 pe-3  '
                style={{
                  padding: '2px 10px',
                  backgroundColor: '#35B14F!important'
                }}
              >
                Dự án mới
              </button>
            </div>
            <div className='side-control-body'>
              <h6 className='bg-gray p-2 d-flex justify-content-between align-items-center fs-09 text-gr'>
                <span>Tệp dữ liệu</span>{' '}
                <img
                  className='me-1'
                  width={17}
                  height={17}
                  src={iconDoc}
                  alt=''
                />
              </h6>
              <ul className='duan pt-1 ps-2 pe-2'>
                {dataDuAn.map((item, index) => {
                  var date = new Date(item.ngayTao * 1000)
                  // Hours part from the timestamp
                  var day = date.getDate()
                  // Minutes part from the timestamp
                  var mounth = date.getMonth()
                  // Seconds part from the timestamp
                  var year = date.getFullYear()
                  var formattedTime = day + '-' + mounth + '-' + year

                  return (
                    <li
                      onClick={() =>
                        handleViewPhieuKhaoSat(item.id, item.tenPhuongAn)
                      }
                      className='d-flex justify-content-between align-items-center'
                      key={index}
                    >
                      <div className='item-left_control fs-07 col-8'>
                        <p
                          className='m-0 fs-09  text-start text-gr'
                          style={{ fontWeight: '500' }}
                        >
                          {item.tenPhuongAn}
                        </p>
                        <p className='m-0 d-flex justify-content-between  text-start text-gr'>
                          <span>{item.dienTich}</span>{' '}
                          <span>{formattedTime}</span>
                        </p>
                      </div>
                      <div className='item-control-button d-flex '>
                        <img
                          className='me-1 hover-icon p-1'
                          width={27}
                          height={27}
                          src={iconClose}
                          alt=''
                        />
                        <img
                          className='me-1 hover-icon p-1'
                          width={27}
                          height={27}
                          src={iconView}
                          alt=''
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>
      )
    } else {
      return ''
    }
  }
  return renderUI()
}
export default NavDuAn
