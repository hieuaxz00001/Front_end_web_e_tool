import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import iconHiden from './../image/invisible_60px.png'
import iconPlace from './../image/place_marker_60px.png'
import iconDelete from './../image/delete_trash_64px.png'
import iconEdit from './../image/edit_60px.png'
import { Collapse } from 'react-collapse'
import {
  changeIdFormKhaoSat,
  changeVisibleFormKhaoSat
} from '../action_reducer/BaseActionReducer'

const FormDiaDiem = props => {
  const list = useSelector(state => state.listDiaDiem.listDiaDiem)
  const [show_dia_diem_khao_sat, setShow_dia_diem_khao_sat] = useState(
    list.active
  )
  const dispatch = useDispatch()

  const [id_nhom_khao_sat, setId_nhom_khao_sat] = useState(list.idNhom)
  const [data_dia_diem, setData_dia_diem] = useState(list.list)
  const [ten_nhom, setTen_nhom] = useState(list.tenNhom)
  useEffect(() => {
    setData_dia_diem(list.list)
    setShow_dia_diem_khao_sat(list.active)
    setId_nhom_khao_sat(list.idNhom)
    setTen_nhom(list.tenNhom)
  }, [list])
  const checkListDiaDiem = () => {
    if (data_dia_diem.length) {
      return ''
    } else {
      return <div className='mt-3 fs-6'>Không có địa điểm...</div>
    }
  }
  const viewFormKhaoSat = id => {
    console.log(id)
    const action = changeVisibleFormKhaoSat(true)
    const action2 = changeIdFormKhaoSat(id)
    dispatch(action)
    dispatch(action2)
  }
  const uiHtml = () => {
    if (show_dia_diem_khao_sat) {
      return (
        <div
          className='block-dia-diem border bg-body rounded shadow position-absolute pt-1 ps-1 pe-1 pb-4'
          style={{
            width: '300px',
            bottom: '20px',
            right: '0',
            zIndex: 10000,
            overflowY: 'unset'
          }}
        >
          <div className='block-dia-diem-header d-flex justify-content-between mb-1 align-items-center'>
            <h6 className='ps-2 pt-2 fs-10 ' style={{fontWeight:'600'}}>{ten_nhom}</h6>
            <button
              className='btn btn-success fs-08 border-radius-10 d-flex align-items-center'
              style={{ padding: '1px 10px', lineHeight: '1.3', height: '30px' }}
            >
              <img
                className='me-1'
                src='https://img.icons8.com/fluency-systems-regular/15/ffffff/plus.png'
              />
              <span className='fs-09'>ADD</span>
            </button>
          </div>
          <hr className='m-0 me-1 ms-1 bg-success opacity-75' />
          <div className='block-dia-diem-content'>
            <ul className='m-0 p-0 diadiem'>
              <Collapse isOpened={true}>
                {checkListDiaDiem()}
                {data_dia_diem.map((item, index) => {
                  return (
                    <li
                      className='d-flex pt-2 pb-2 m-1 pe-2 ps-2 justify-content-between align-items-center '
                      key={index}
                    >
                      <div className='left'>
                        <img
                          className='me-1'
                          width={20}
                          height={20}
                          src={iconPlace}
                          alt=''
                        />
                        <span className='ps-1 fs-09'>{item.diaDiem}</span>
                      </div>
                      <div className='right'>
                        <img
                          onClick={() => viewFormKhaoSat(item.id)}
                          className='me-2'
                          width={17}
                          height={17}
                          src={iconEdit}
                          alt=''
                        />
                        <img
                          className='me-2'
                          width={17}
                          height={17}
                          src={iconHiden}
                          alt=''
                        />
                        <img
                          className='m-0'
                          width={17}
                          height={17}
                          src={iconDelete}
                          alt=''
                        />
                      </div>
                    </li>
                  )
                })}
              </Collapse>
            </ul>
          </div>
        </div>
      )
    } else {
      return ''
    }
  }
  return uiHtml()
}
export default FormDiaDiem
