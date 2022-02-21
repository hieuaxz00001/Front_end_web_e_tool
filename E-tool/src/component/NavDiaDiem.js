import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thayDoiToaDo, thayDoiToaDoPhieuKhaoSat } from '../action_reducer/BaseMapActionReducer'
import { ajaxCallGet } from '../base/base'
const FormDiaDiem = props => {
  const dispatch = useDispatch()
  const [show_dia_diem_khao_sat, setShow_dia_diem_khao_sat] = useState(
    props.visible
  )
  const [id_nhom_khao_sat, setId_nhom_khao_sat] = useState(props.idNhomKhaoSat)
  const [data_dia_diem, setData_dia_diem] = useState([])
  const [ten_nhom, setTen_nhom] = useState(props.tenNhom)
  const a = useSelector(state=>state.baseMap.listPointKhaoSat)
  useEffect(() => {
    ajaxCallGet(
      'phieu-khao-sat?queries=deleted=false,phuongAnQuyHoachId.id=' +
        id_nhom_khao_sat
    ).then(rs => {
      setData_dia_diem(rs.data)
      let listPointPhieuKhaoSat = []
      for(let i in rs.data){
        listPointPhieuKhaoSat.push([rs.data[i].vyDo,rs.data[i].kinhDo])
      }
      const action = thayDoiToaDoPhieuKhaoSat(listPointPhieuKhaoSat)
      dispatch(action)
    })
  }, [])
  useEffect(() => {
    console.log(props)
    setShow_dia_diem_khao_sat(props.visible)
    setId_nhom_khao_sat(props.idNhomKhaoSat)
    setTen_nhom(props.tenNhom)
  }, [props])

  const uiHtml = () => {
    if (show_dia_diem_khao_sat) {
      return (
        <div
          className='block-dia-diem border bg-body rounded shadow position-absolute pt-1 ps-2 pe-2 pb-4'
          style={{ width: '350px', top: '0', right: '100%', zIndex: 10 }}
        >
          <div className='block-dia-diem-header d-flex justify-content-between '>
            <h6 className='ps-2 pt-2 fs-6'>{ten_nhom}</h6>
            <i className='fas fa-align-left m-1 p-1 fs-5' />
          </div>
          <hr className='m-0 me-1 ms-1 bg-success opacity-75' />
          <div className='block-dia-diem-content'>
            <ul className='m-0 p-0'>
              {data_dia_diem.map((item, index) => {
                return (
                  <li
                    className='d-flex pt-2 pb-2 m-1 pe-2 ps-2 justify-content-between align-items-center'
                    key={index}
                  >
                    <div className='left'>
                      <i className='fas fa-map-marker-alt fs-6 m-1' />
                      <span className='ps-1 fs-6'>{item.diaDiem}</span>
                    </div>
                    <div className='right'>
                      <i className='fas fa-pen m-2 fs-6' />
                      <i className='fas fa-eye-slash m-2 fs-6' />
                      <i className='far fa-trash-alt m-2 fs-6' />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
  return uiHtml()
}
export default FormDiaDiem
