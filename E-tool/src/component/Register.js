import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'https://cdn.skypack.dev/wc-toast'
import { Link, Navigate } from 'react-router-dom'
import logo from './../image/logo_etool_web.png'
import './../style/login.css'
import { ajaxCallPost, delay, setItemLocalStorage } from '../base/base'

const Register2 = () => {
  const [state, setState] = React.useState({
    hoTen: '',
    gmail: '',
    username: '',
    password: '',
    repassword: '',
    sdt: '',
    deleted: false
  })

  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (state.password != '' && state.repassword != '') {
      if (state.password != state.repassword) {
        console.log('kdkdkd')
        clearTimeout(timer)
        setTimer(
          setTimeout(() => {
            toast.error('Mật khẩu không khớp')
          }, 600)
        )
      }else{
        clearTimeout(timer)
      }
    }
  }, [state.password, state.repassword])
  const handleSubmit = event => {
    var form = document.getElementById('needs-validation')
    console.log(form)
    form.addEventListener('submit', handleVidate(event, form), false)
  }
  const handleVidate = (event, form) => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()
      registerUser()
    }
    form.classList.add('was-validated')
  }
  const handleChange = evt => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value
    })
  }
  const registerUser = () => {
    let user = {
      ten: state.hoTen,
      gmail: state.gmail,
      username: state.username,
      password: state.password,
      sdt: state.sdt,
      deleted: false
    }
    console.log(user)
    ajaxCallPost('user', user).then(rs => {
      toast.success('Successful account registration')
      setState({
        isSuccess: true
      })
      setItemLocalStorage('user', rs.data)
    })
  }
  return (
    <div className='container d-flex justify-content-center bg-blue w-100 h-100 p-0 align-items-center'>
      <div
        className='block-login shadow-lg rounded  d-flex col-8 bg-white'
        style={{ overflowY: 'auto', height: '600px' }}
      >
        <div className='block-login_left col-12 col-sm-12 col-md-12 col-xl-5 col-xxl-5 col-lg-5'>
          <Form
            className='block-input needs-validation'
            novalidate
            id='needs-validation'
          >
            <div className='input-header p-1 mt-4'>
              <div className='image-logo d-flex justify-content-center'>
                <img width={105} height={125} src={logo} alt='' />
              </div>
            </div>
            <div className='input-content' style={{ padding: '0px 50px' }}>
              <div className='input-group '>
                <input
                  type='text'
                  name='hoTen'
                  value={state.hoTen}
                  onChange={handleChange}
                  required
                  placeholder='Fullname'
                  className='form-control  m-2 border shadow-sm rounded fs-09'
                />
              </div>
              <div className='input-group'>
                <input
                  type='text'
                  name='gmail'
                  value={state.gmail}
                  onChange={handleChange}
                  placeholder='Email'
                  className='form-control m-2 border shadow-sm rounded fs-09'
                />
              </div>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Number phone'
                  name='sdt'
                  value={state.sdt}
                  onChange={handleChange}
                  className='form-control m-2 border shadow-sm rounded fs-09'
                />
              </div>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Nhập tài khoản'
                  name='username'
                  required
                  value={state.username}
                  onChange={handleChange}
                  className='form-control m-2 border shadow-sm rounded fs-09'
                />
              </div>
              <div className='input-group'>
                <input
                  type='password'
                  placeholder='Enter password'
                  name='password'
                  required
                  value={state.password}
                  onChange={handleChange}
                  className='form-control m-2 border shadow-sm rounded fs-09'
                />
              </div>
              <div className='input-group'>
                <input
                  type='password'
                  name='repassword'
                  required
                  value={state.repassword}
                  onChange={handleChange}
                  placeholder='Enter again password'
                  className='form-control m-2 border shadow-sm rounded fs-09'
                />
              </div>
              <div className='input-group d-flex justify-content-end '>
                <Link to='/login' className='m-2 fs-08'>
                  Have an account?
                </Link>
              </div>
              <div className='input-button p-1 d-flex justify-content-between'>
                <button
                  type='submit'
                  className='btn btn-success col-5 border-radius-20 fs-09'
                  onClick={handleSubmit.bind(this)}
                >
                  Register
                </button>
                <button className='btn btn-success border-radius-20 col-5 fs-09'>
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
      {!state.isSuccess ? '' : <Navigate to='/' />}
    </div>
  )
}
export default Register2
