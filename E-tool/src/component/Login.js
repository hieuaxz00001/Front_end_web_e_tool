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
          toast.success('Login success')
          setItemLocalStorage('user', rs.data)
          setTimeout(() => {
            setIsSuccess(true)
          }, 1000)
        } else {
          toast.error('Login fail')
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Login fail')
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
        style={{ overflowY: 'auto', height: '450px' }}
      >
        <div className='block-login_left col-12 col-sm-12 col-md-12 col-xl-5 col-xxl-5 col-lg-5'>
          <Form className='block-input' onSubmit={submitDisable}>
            <div className='input-header p-1 mt-4'>
              <div className='image-logo d-flex justify-content-center mb-4 mt-2'>
                <img width={125} height={145} src={logo} alt='' />
              </div>
            </div>
            <div className='input-content' style={{ padding: '0px 50px' }}>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Enter username'
                  name='username'
                  onChange={handleChangeUserName}
                  defaultValue={username}
                  className='form-control m-2 border shadow-sm rounded fs-09'
                />
              </div>
              <div className='input-group'>
                <input
                  type='password'
                  placeholder='Enter password'
                  name='pass'
                  onChange={handleChangePass}
                  defaultValue={pass}
                  className='form-control m-2 border shadow-sm rounded fs-09'
                />
              </div>

              <div className='input-group d-flex justify-content-end '>
                <Link to='/register' className='m-2 fs-08'>
                  Forgot password?
                </Link>
              </div>
              <div className='input-button p-1 d-flex justify-content-between'>
                <button
                  className='btn btn-success col-5 border-radius-20 fs-09'
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <button
                  className='btn btn-success  col-5 border-radius-20  fs-09'
                  onClick={() => {}}
                >
                  Exit
                </button>
              </div>
            </div>
          </Form>
        </div>
        <div className='block-login_right  h-100 col-12 col-sm-12 col-md-12 col-xl-7 col-xxl-7 col-lg-7 d-flex align-items-center'>
          <div
            className='content p-4 '
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <div className='col-9'>
              <p className='cl-white fs-6 ps-2 pe-2 text-start mb-0 col-12'>
              Assessment of the perception of the environment
              </p>
              <p
                className='cl-white fs-3 ps-2 pe-2 text-start fw-bold col-12'
                style={{ lineHeight: '1.3' }}
              >
                Manage, monitor, timely forecast, warn and announce performances
                 environmental quality variable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
