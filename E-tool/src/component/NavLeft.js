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

const NavLeft = props => {
  const [showDialogModal, setShowDialogModal] = useState(props.visible)
  const [userLogin, setUserLogin] = useState(props.userLogin)
  const [showDuAn, setShowDuAnn] = useState(false)
  const [isLogout, setIsLogout] = useState(false)
  useEffect(() => {
    $('#dismiss, .overlay').on('click', function () {
      $('#sidebar').removeClass('active')
      $('.overlay').removeClass('active')
    })

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').addClass('active')
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
  }
  const logOut = () => {
    setIsLogout(true)
  }
  return (
    <div className='wrapper position-absolute'>
      {!isLogout ? '' : <Navigate to='/login' />}
      <nav className='block-sidebar active position-relative' id='sidebar'>
        <NavDuAn visible={showDuAn} />
        {/* <NavKieuBanDo visible={false} /> */}
        <div className>
          <div id='dismiss' className='border-radius-20'>

          <img src='https://img.icons8.com/external-kmg-design-glyph-kmg-design/17/28b351/external-left-arrows-kmg-design-glyph-kmg-design.png'/>
          </div>
          <div className='sidebar-header'>
            <div className='header-nav-left d-flex align-items-center '>
              <div>
                <img src={tracking_60px} alt='' />
              </div>
              <div className='header-nav-left-content'>
                <span>Đánh giá, cảm nhận về môi trường</span>
                <span>Khảo sát môi trường thực</span>
              </div>
            </div>
            <div className='body-nav-left'>
              <img
                src='https://spec.edu.vn//admin/plugin_admin/dist/img/avatar5.png'
                alt=''
              />
              <p>{userLogin.ten}</p>
              <p>{userLogin.gmail}</p>
              <p className='fw-bold' onClick={() => logOut()}>
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
            <li>
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
      <div className='block-control'>
        <ul>
          
          <li>
            <div id='sidebarCollapse' title='Mở menu'>
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
          <li>
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
  )
}
export default NavLeft
