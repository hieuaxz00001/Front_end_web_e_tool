import React, { Component } from 'react'
import './../style/login.css'
import logo from './../image/logo_etool_web.png'
import { Form } from 'react-bootstrap'
import { ajaxCallPost, setItemLocalStorage } from '../base/base'
import { toast } from 'https://cdn.skypack.dev/wc-toast'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Basemap from './BaseMap'

const Login = props => {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const navigation = useNavigate()
  const submitDisable = event => {
    event.preventDefault()
  }
  const handleSubmit = event => {
    event.preventDefault()
    let user = {
      username: username,
      password: pass
    }
    ajaxCallPost('user/login', user)
      .then(rs => {
        console.log(rs)
        if (rs.data != null) {
          toast.success('Đăng nhập thành công')
          setItemLocalStorage('user', rs.data)
          setTimeout(() => {
           setIsSuccess(true)
          }, 1000)
        } else {
          toast.error('Đăng nhập thất bại')
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Đăng nhập thất bại')
      })
  }
  const handleChangeUserName = event => {
    setUsername(event.target.value)
  }
  const handleChangePass = event => {
    setPass(event.target.value)
    console.log(pass)
  }
  return (
    <div className='container d-flex justify-content-center bg-blue w-100 h-100 p-0 align-items-center'>
      {!isSuccess ? '' : <Navigate to='/' />}
      <div
        className='block-login shadow-lg rounded  d-flex col-8 bg-white'
        style={{ overflowY: 'auto', height: '550px' }}
      >
        <div className='block-login_left col-12 col-sm-12 col-md-12 col-xl-6 col-xxl-6 col-lg-6'>
          <Form className='block-input' onSubmit={submitDisable}>
            <div className='input-header p-1 mt-4'>
              <div className='image-logo d-flex justify-content-center mb-4 mt-2'>
                <img width={145} height={165} src={logo} alt='' />
              </div>
            </div>
            <div className='input-content' style={{ padding: '0px 30px' }}>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Nhập username'
                  name='username'
                  onChange={handleChangeUserName}
                  defaultValue={username}
                  className='form-control m-2 border shadow-sm rounded'
                />
              </div>
              <div className='input-group'>
                <input
                  type='password'
                  placeholder='Nhập password'
                  name='pass'
                  onChange={handleChangePass}
                  defaultValue={pass}
                  className='form-control m-2 border shadow-sm rounded'
                />
              </div>

              <div className='input-group d-flex justify-content-end '>
                <Link to='/register' className='m-2'>
                  Chưa có tài khoản?
                </Link>
              </div>
            </div>
            <div className='input-button p-1 d-flex justify-content-around'>
              <button className='btn btn-success' onClick={handleSubmit}>
                Đăng nhập
              </button>
              <button className='btn btn-success' onClick={() => {}}>
                Thoát
              </button>
            </div>
          </Form>
        </div>
        <div className='block-login_right  h-100 col-12 col-sm-12 col-md-12 col-xl-6 col-xxl-6 col-lg-6 d-flex align-items-center'>
          <div className='content p-4'>
            <p className='cl-white fs-5 ps-2 pe-2 text-start mb-0'>
              Đánh giá cảm nhận về môi trường
            </p>
            <p className='cl-white fs-2 ps-2 pe-2 text-start fw-bold'>
              Quản lý, giám sát, kịp thời dự báo, cảnh báo và công bố diễn biến
              chất lượng môi trường
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
