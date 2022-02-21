import React, { useEffect, useRef, useState } from 'react'
import { renderIntoDocument } from 'react-dom/cjs/react-dom-test-utils.production.min'
import { ajaxCallGet } from '../base/base'
import FormDiaDiem from './NavDiaDiem'

const NavDuAn = props => {
  const [showDuAn, setShowDuAn] = useState(false)
  const [show_dia_diem_khao_sat, setShow_dia_diem_khao_sat] = useState(false)
  const [id_nhom_khao_sat, setId_nhom_khao_sat] = useState(null)
  const [dataDuAn, setDataDuAn] = useState([])
  const [tenNhom, setTenNhom] = useState('')
  useEffect(() => {
    ajaxCallGet('phuong-an-quy-hoach?queries=deleted=false').then(rs => {
      setDataDuAn(rs.data)
    })
  }, [])

  useEffect(() => {
    setShowDuAn(props.visible)
  }, [props.visible])

  useEffect(() => {
    console.log(show_dia_diem_khao_sat)
    renderFormDiaDiem()
  }, [show_dia_diem_khao_sat])

  const handleViewPhieuKhaoSat = (id_nhom_khao_sat, ten_nhom) => {
    if (show_dia_diem_khao_sat) {
      setShow_dia_diem_khao_sat(false)
    } else {
      setShow_dia_diem_khao_sat(true)
    }
    setId_nhom_khao_sat(id_nhom_khao_sat)
    setTenNhom(ten_nhom)
  }
  const renderFormDiaDiem = () => {
    if (show_dia_diem_khao_sat) {
      return (
        <FormDiaDiem
          visible={show_dia_diem_khao_sat}
          idNhomKhaoSat={id_nhom_khao_sat}
          tenNhom={tenNhom}
        />
      )
    }
  }
  const renderUI = () => {
    if (showDuAn) {
      return (
        <div
          className='position-absolute bg-light h-100 '
          style={{ zIndex: 1000, right: '0' }}
        >
          <div className='position-relative'>{renderFormDiaDiem()}</div>

          <nav
            className='block-sidebar'
            id='side-control'
            style={{ width: '300px' }}
          >
            <div className='side-control-header d-flex fs-4 p-2 justify-content-between align-items-center'>
              <h6 className='m-0'>
                <strong>Dự án</strong>
              </h6>
              <button
                className='btn btn-success fs-09 border-radius-20 pt-1 pb-1 ps-3 pe-3'
                style={{
                  padding: '2px 10px',
                  backgroundColor: '#35B14F!important'
                }}
              >
                Dự án mới
              </button>
            </div>
            <div className='side-control-body'>
              <h6 className='bg-gray p-2 d-flex justify-content-between align-items-center fs-09'>
                <span>Tệp dữ liệu</span>{' '}
                <i className='far fa-file-alt fs-6 m-1' />
              </h6>
              <ul className='pt-1 ps-3 pe-2'>
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
                        <p className='m-0 fs-09 text-dark text-start fw-bold'>
                          {item.tenPhuongAn}
                        </p>
                        <p className='m-0 d-flex justify-content-between  text-start'>
                          <span>{item.dienTich}</span>{' '}
                          <span>{formattedTime}</span>
                        </p>
                      </div>
                      <div className='item-control-button d-flex '>
                        <i className='fas fa-times p-1 m-1 fs-09' />
                        <i className='fas fa-eye-slash p-1 m-1 fs-09' />
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
      return <div></div>
    }
  }
  return renderUI()
}
export default NavDuAn
