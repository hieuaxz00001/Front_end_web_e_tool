import React, { useEffect, useRef, useState } from 'react'
import tracking_60px from './../image/tracking_60px.png'
import $ from 'jquery'
import NavDuAn from './NavDuAn'

const NavLeft = props => {
  const [showDialogModal, setShowDialogModal] = useState(props.visible)
  const [showDuAn, setShowDuAnn] = useState(false)
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

  return (
    <div className='wrapper'>
      <NavDuAn visible={showDuAn} />
      <nav className='block-sidebar active' id='sidebar'>
        <div className>
          <div id='dismiss' className='border-radius-20'>
            <i className='fas fa-arrow-left' />
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
              <p>Nguyễn Văn A</p>
              <p>nguyenvana@gmail.com</p>
              <p>Đăng xuất</p>
            </div>
          </div>
          <ul className='list-unstyled components'>
            <li>
              <a href>
                <i className='fas fa-search' /> Tìm kiếm
              </a>
            </li>
            <li onClick={()=>handleShowDuAn()}>
              <a href>
                <i className='fas fa-route' />
                Dự án
              </a>
            </li>
            <li>
              <a href>
                <i className='fas fa-layer-group' />
                Kiểu bản đồ
              </a>
            </li>
            <li>
              <a href>
                <i className='fas fa-cog' /> Cài đặt
              </a>
            </li>
          </ul>
          <ul className='list-unstyled components'>
            <li>
              <a href>
                <i className='fas fa-info-circle' />
                Thông tin
              </a>
            </li>
            <li>
              <a href>
                <i className='fas fa-question-circle' />
                Hỗ trợ
              </a>
            </li>
          </ul>
          <ul className='CTAs'>
            <li>Phiên bản 1.0.0</li>
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
      </nav>
      <div className='block-control'>
        <ul>
          <li>
            <div id='sidebarCollapse' title='Mở menu'>
              <i className='fas fa-align-left' />
            </div>
          </li>
          <li>
            <div title='Tìm kiếm'>
              <i className='fas fa-search' />
            </div>
          </li>
          <li onClick={()=>handleShowDuAn()}>
            <div title='Dự án'>
              <i className='fas fa-route' />
            </div>
          </li>
          <li>
            <div title='Kiểu bản đồ'>
              <i className='fas fa-layer-group' />
            </div>
          </li>
          <li>
            <div title='Cài đặt'>
              <i className='fas fa-cog' />
            </div>
          </li>
          <li>
            <div title='Thông tin'>
              <i className='fas fa-info-circle' />
            </div>
          </li>
          <li>
            <div title='Hỗ trợ'>
              <i className='fas fa-question-circle' />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default NavLeft