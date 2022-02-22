import { useState } from 'react'
import { useSelector } from 'react-redux'

const NavKieuBanDo = props => {
  const [showKieuBanDo, setShowKieuBanDo] = useState(true)
  const kieuMap = useSelector(state => state.typeMap)
  console.log(kieuMap);
  const renderUI = () => {
    if (showKieuBanDo) {
      return (
        <div
          className='position-absolute bg-light h-100 '
          style={{ zIndex: 1000, left: '100%', overflowY: 'unset' }}
        >
          <div className='position-relative'></div>

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
                {kieuMap.listTypeMap.map(item => {
                  return (
                    <li className='d-flex justify-content-between align-items-center  mb-2'>
                      <div className=' d-flex align-items-center'>
                        <img
                          className='border rounder shadow-sm'
                          width={'50px'}
                          height={'50px'}
                          src='https://cdn.tgdd.vn/Files/2020/11/10/1305861/googlemap_1280x720-800-resize.jpg'
                          alt=''
                        ></img>
                        <p className='ms-2 mb-0 fw-bold'>Map 1</p>
                      </div>
                      <div
                        className=' input-group me-2 '
                        style={{ width: 'auto' }}
                      >
                        <input
                          type={'radio'}
                          name='typeMap'
                          className='form-check-input shadow-sm'
                        ></input>
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
export default NavKieuBanDo
