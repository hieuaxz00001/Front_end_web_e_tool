import React, { useEffect, useRef, useState } from 'react'
import tracking_60px from './../image/tracking_60px.png'
import $ from 'jquery'
import NavDuAn from './NavDuAn'
import NavKieuBanDo from './NavKieuBanDo'
import { Navigate } from 'react-router-dom'
import iconSearch from './../image/search_48px.png'
import iconDuAn from './../image/map_128px.png'
import iconKieuMap from './../image/sheets_48px.png'
import iconUser from './../image/male_user_100px.png'
import iconSetting from './../image/settings_100px.png'
import iconThongTin from './../image/about_48px.png'
import iconHoTro from './../image/help_60px.png'
import { type } from '@testing-library/user-event/dist/type'
import { getItemLocalStorage } from '../base/base'
import FormDiaDiem from './NavDiaDiem'
import imgUser from './../image/salary_male_100px.png'
import imgLogo from './../image/logo2.png'

const NavLeft = props => {
  const [showDialogModal, setShowDialogModal] = useState(props.visible)
  const [userLogin, setUserLogin] = useState(getItemLocalStorage('user'))
  const [showDuAn, setShowDuAnn] = useState(false)
  const [showTypeMap, setShowTypeMap] = useState(false)
  const [isLogout, setIsLogout] = useState(false)
  useEffect(() => {
    $('#dismiss, .overlay').on('click', function () {
      $('#sidebar').removeClass('active')
      $('#sidebar2').addClass('active')
      $('.overlay').removeClass('active')
    })

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').addClass('active')
      $('#sidebar2').removeClass('active')

      $('.overlay').addClass('active')
      $('.collapse.in').toggleClass('in')
      $('a[aria-expanded=true]').attr('aria-expanded', 'false')
    })
  }, [])
  const handleShowDuAn = () => {
    if (showDuAn) {
      setShowDuAnn(false)
    } else {
      setShowDuAnn(true)
    }
    setShowTypeMap(false)
  }
  const handleShowTypeMap = () => {
    setShowDuAnn(false)
    console.log(showTypeMap);
    if (showTypeMap) {
      setShowTypeMap(false)
    } else {
      setShowTypeMap(true)
    }
    console.log(showTypeMap);
  }

  const logOut = () => {
    setIsLogout(true)
  }
  // const hideNavLeft = () => {
  //   setShowDuAnn(false)
  // }
  return (
    <div className='wrapper position-absolute' style={{ zIndex: 1000000 }}>
      <div className='position-relative'>
        <NavDuAn visible={showDuAn} />
        <NavKieuBanDo visible={showTypeMap} />
        <nav className='block-sidebar active ' id='sidebar'>
          <div className>
            <div
              id='dismiss'
              className='border-radius-20 d-flex align-items-center justify-content-center'
            >
              <img src='https://img.icons8.com/material-outlined/20/28b351/menu--v2.png' />
            </div>
            <div className='sidebar-header'>
              <div className='header-nav-left d-flex align-items-center '>
                <div>
                  <img width={70} height={70} src={imgLogo} alt='' />
                </div>
                <div className='header-nav-left-content'>
                  <span>Đánh giá, cảm nhận về môi trường</span>
                  <span>Khảo sát môi trường thực</span>
                </div>
              </div>
              <div className='body-nav-left'>
                <img className='me-2' src={imgUser} alt='' />

                <p className='fw-bold fs-10'>{userLogin.ten}</p>
                <p>{userLogin.gmail}</p>
                <p
                  className='fw-bold fs-09'
                  style={{ color: '#00FF91' }}
                  onClick={() => logOut()}
                >
                  Đăng xuất
                </p>
              </div>
            </div>
            <ul className='list-unstyled components'>
              <li>
                <a className='d-flex align-items-center'>
                  <img
                    className='me-3'
                    width={20}
                    height={20}
                    src={iconSearch}
                    alt=''
                  />
                  <span>Tìm kiếm</span>
                </a>
              </li>
              <li onClick={() => handleShowDuAn()}>
                <a className='d-flex align-items-center'>
                  <img
                    className='me-3'
                    width={20}
                    height={20}
                    src={iconDuAn}
                    alt=''
                  />
                  <span>Dự án</span>
                </a>
              </li>
              <li onClick={() => handleShowTypeMap()}>
                <a className='d-flex align-items-center'>
                  <img
                    className='me-3'
                    width={20}
                    height={20}
                    src={iconKieuMap}
                    alt=''
                  />
                  <span>Kiểu bản đồ</span>
                </a>
              </li>
              <li>
                <a className='d-flex align-items-center'>
                  <img
                    className='me-3'
                    width={20}
                    height={20}
                    src={iconUser}
                    alt=''
                  />
                  <span>Quản lý người dùng</span>
                </a>
              </li>
              <li>
                <a className='d-flex align-items-center'>
                  <img
                    className='me-3'
                    width={20}
                    height={20}
                    src={iconSetting}
                    alt=''
                  />
                  <span>Cài đặt</span>
                </a>
              </li>
            </ul>
            <div className='CTAs'>
              <ul className=' list-unstyled components'>
                <li>
                  <a className='d-flex align-items-center'>
                    <img
                      className='me-3'
                      width={20}
                      height={20}
                      src={iconThongTin}
                      alt=''
                    />
                    <span>Thông tin</span>
                  </a>
                </li>
                <li>
                  <a className='d-flex align-items-center'>
                    <img
                      className='me-3'
                      width={20}
                      height={20}
                      src={iconHoTro}
                      alt=''
                    />
                    <span>Hỗ trợ</span>
                  </a>
                </li>
              </ul>
              <ul className='CTAx'>
                <li className='mt-2'>Phiên bản 1.0.0</li>
                <li>
                  <a
                    href='https://bootstrapious.com/p/bootstrap-sidebar'
                    className='article'
                  >
                    Bảo mật{' '}
                  </a>
                  <span>&nbsp; -&nbsp; </span>
                  <a
                    href='https://bootstrapious.com/p/bootstrap-sidebar'
                    className='article'
                  >
                    {' '}
                    Điều khoản{' '}
                  </a>
                  <span> &nbsp;-&nbsp; </span>
                  <a
                    href='https://bootstrapious.com/p/bootstrap-sidebar'
                    className='article'
                  >
                    {' '}
                    Giấy phép
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          className='block-control'
          id='sidebar2'
          style={{ height: '100vh' }}
        >
          <ul>
            <li>
              <div id='sidebarCollapse' title='Mở menu'>
                <img
                  className=''
                  width={25}
                  height={25}
                  src='https://img.icons8.com/material-outlined/20/616a64/menu--v2.png'
                  alt=''
                />
              </div>
            </li>
            <li>
              <div>
                <img
                  className=''
                  width={25}
                  height={25}
                  src={iconSearch}
                  alt=''
                />
              </div>
            </li>
            <li onClick={() => handleShowDuAn()}>
              <div title='Dự án'>
                <img
                  className=''
                  width={25}
                  height={25}
                  src={iconDuAn}
                  alt=''
                />
              </div>
            </li>
            <li onClick={() => handleShowTypeMap()}>
              <div title='Kiểu bản đồ'>
                <img
                  className=''
                  width={25}
                  height={25}
                  src={iconKieuMap}
                  alt=''
                />
              </div>
            </li>
            <li>
              <div title='Cài đặt'>
                <img
                  className=''
                  width={25}
                  height={25}
                  src={iconSetting}
                  alt=''
                />
              </div>
            </li>
            <li>
              <div title='Thông tin'>
                <img
                  className=''
                  width={25}
                  height={25}
                  src={iconThongTin}
                  alt=''
                />
              </div>
            </li>
            <li>
              <div title='Hỗ trợ'>
                <img
                  className=''
                  width={25}
                  height={25}
                  src={iconHoTro}
                  alt=''
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      {!isLogout ? '' : <Navigate to='/login' />}
    </div>
  )
}
export default NavLeft
