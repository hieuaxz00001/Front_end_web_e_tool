import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thayDoiMap } from '../action_reducer/TypeMapActiveActionReducer'

const NavKieuBanDo = props => {
  const dispatch = useDispatch()

  const [showKieuBanDo, setShowKieuBanDo] = useState(props.visible)
  const kieuMap = useSelector(state => state.typeMap)
  useEffect(() => {
    setShowKieuBanDo(props.visible)
  }, [props])
  const handleChangeTypeMap = type => {
    const action = thayDoiMap(type)
    dispatch(action)
  }
  const renderUI = () => {
    if (showKieuBanDo) {
      return (
        <div
          className='position-absolute bg-light shadow rounded'
          style={{ zIndex: 1000, left: '100%', overflowY: 'unset' }}
        >
          <div className='position-relative'></div>

          <nav
            className='block-sidebar mb-4'
            id='side-control'
            style={{ width: '250px' }}
          >
            <div className='side-control-header d-flex fs-4 p-2 justify-content-between align-items-center'>
              <h6 className='m-0'>
                {/* <strong>Kiểu bản đồ</strong> */}
                <strong>Map style</strong>
              </h6>
            </div>
            <div className='side-control-body'>
              <ul className='pt-1 ps-3 pe-2'>
                {kieuMap.listTypeMap.map(item => {
                  return (
                    <li className='d-flex justify-content-between align-items-center  mb-2'>
                      <div className=' d-flex align-items-center'>
                        <img
                          className='border rounder shadow-sm'
                          width={'50px'}
                          height={'50px'}
                          src={item.image}
                          alt=''
                        ></img>
                        <p className='ms-2 mb-0 fw-bold'>{item.type}</p>
                      </div>
                      <div
                        className=' input-group me-2 '
                        style={{ width: 'auto' }}
                      >
                        <input
                          onClick={() => handleChangeTypeMap(item.type)}
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
