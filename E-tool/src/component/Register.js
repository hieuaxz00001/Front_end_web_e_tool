import React, { Component } from 'react'
import './../style/login.css'
import logo from './../image/logo_etool_web.png'
import { Form } from 'react-bootstrap'
import Validator from './../utils/Validator'
import { ajaxCallPost, setItemLocalStorage } from '../base/base'
import { toast } from 'https://cdn.skypack.dev/wc-toast'
import { Link, Navigate } from 'react-router-dom'
export default class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoTen: '',
      gmail: '',
      username: '',
      pass: '',
      sdt: '',
      repass: '',
      errors: {},
      isSuccess: false
    }
    const requiredWith = (value, field, state) =>
      (!state[field] && !value) || !!value
    const rules = [
      // {
      //   field: 'hoTen',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'Họ và tên là bắt buộc.'
      // },
      // {
      //   field: 'gmail',
      //   method: 'isEmail',
      //   validWhen: true,
      //   message: 'Sai định dạng email'
      // },
      // {
      //   field: 'username',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'Username là bắt buộc'
      // },
      // {
      //   field: 'pass',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'Mật khẩu là bắt buộc'
      // },
      // {
      //   field: 'repass',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'Nhập lại mật khẩu.'
      // },
      // {
      //   field: 'sdt',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'Số điện thoại là bắt buộc.'
      // }
    ]
    this.validator = new Validator(rules)
  }
  submitDisable = event => {
    event.preventDefault()
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      errors: this.validator.validate(this.state)
    })
    console.log(this.state.errors)
    let user = {
      ten: this.state.hoTen,
      gmail: this.state.gmail,
      username: this.state.username,
      password: this.state.pass,
      sdt: this.state.sdt,
      deleted: false
    }
    ajaxCallPost('user', user).then(rs => {
      toast.success('Đăng ký tài khoản thành công')
      this.setState({
        isSuccess: true
      })
      setItemLocalStorage('user', rs.data)
    })
  }

  render () {
    const { errors } = this.state
    return (
      <div className='container d-flex justify-content-center bg-blue w-100 h-100 p-0 align-items-center'>
        <div
          className='block-login shadow-lg rounded  d-flex col-8 bg-white'
          style={{ overflowY: 'auto', height: '650px' }}
        >
          <div className='block-login_left col-12 col-sm-12 col-md-12 col-xl-6 col-xxl-6 col-lg-6'>
            <Form
              className='block-input'
              onSubmit={this.submitDisable.bind(this)}
            >
              <div className='input-header p-1 mt-4'>
                <div className='image-logo d-flex justify-content-center'>
                <img width={145} height={165} src={logo} alt='' />
                </div>
              </div>
              <div className='input-content' style={{ padding: '0px 30px' }}>
                <div className='input-group '>
                  <input
                    type='text'
                    name='hoTen'
                    value={this.state.hoTen}
                    onChange={this.handleInput}
                    placeholder='Họ và tên'
                    className='form-control  m-2 border shadow-sm rounded'
                  />
                  {errors.hoTen && (
                    <div className='validation fs-08 d-block w-100 text-start ms-3 text-danger'>
                      <i className='fas fa-exclamation-triangle me-2'></i>
                      {errors.hoTen}
                    </div>
                  )}
                </div>
                <div className='input-group'>
                  <input
                    type='text'
                    name='gmail'
                    value={this.state.gmail}
                    onChange={this.handleInput}
                    placeholder='Nhập gmail'
                    className='form-control m-2 border shadow-sm rounded'
                  />
                  {errors.gmail && (
                    <div className='validation fs-08 d-block w-100 text-start ms-3 text-danger'>
                      <i className='fas fa-exclamation-triangle me-2'></i>
                      {errors.gmail}
                    </div>
                  )}
                </div>
                <div className='input-group'>
                  <input
                    type='text'
                    placeholder='Nhập số điện thoại'
                    name='sdt'
                    value={this.state.sdt}
                    onChange={this.handleInput}
                    className='form-control m-2 border shadow-sm rounded'
                  />
                  {errors.sdt && (
                    <div className='validation fs-08 d-block w-100 text-start ms-3 text-danger'>
                      <i className='fas fa-exclamation-triangle me-2'></i>
                      {errors.sdt}
                    </div>
                  )}
                </div>
                <div className='input-group'>
                  <input
                    type='text'
                    placeholder='Nhập username'
                    name='username'
                    value={this.state.username}
                    onChange={this.handleInput}
                    className='form-control m-2 border shadow-sm rounded'
                  />
                  {errors.username && (
                    <div className='validation fs-08 d-block w-100 text-start ms-3 text-danger'>
                      <i className='fas fa-exclamation-triangle me-2'></i>
                      {errors.username}
                    </div>
                  )}
                </div>
                <div className='input-group'>
                  <input
                    type='password'
                    placeholder='Nhập password'
                    name='pass'
                    value={this.state.pass}
                    onChange={this.handleInput}
                    className='form-control m-2 border shadow-sm rounded'
                  />
                  {errors.pass && (
                    <div className='validation fs-08 d-block w-100 text-start ms-3 text-danger'>
                      <i className='fas fa-exclamation-triangle me-2'></i>
                      {errors.pass}
                    </div>
                  )}
                </div>
                <div className='input-group'>
                  <input
                    type='password'
                    name='repass'
                    value={this.state.repass}
                    onChange={this.handleInput}
                    placeholder='Nhập lại password'
                    className='form-control m-2 border shadow-sm rounded'
                  />
                  {errors.repass && (
                    <div className='validation fs-08 d-block w-100 text-start ms-3 text-danger'>
                      <i className='fas fa-exclamation-triangle me-2'></i>
                      {errors.repass}
                    </div>
                  )}
                </div>
                <div className='input-group d-flex justify-content-end '>
                  <Link to='/login' className='m-2'>
                    Đã có tài khoản?
                  </Link>
                </div>
              </div>
              <div className='input-button p-1 d-flex justify-content-around'>
                <button
                  className='btn btn-success'
                  onClick={this.handleSubmit.bind(this)}
                >
                  Đăng ký
                </button>
                <button className='btn btn-success'>Thoát</button>
              </div>
            </Form>
          </div>
          <div className='block-login_right  h-100 col-12 col-sm-12 col-md-12 col-xl-6 col-xxl-6 col-lg-6 d-flex align-items-center'>
            <div className='content p-4'>
              <p className='cl-white fs-5 p-2 text-start mb-0'>
                Đánh giá cảm nhận về môi trường
              </p>
              <p className='cl-white fs-2 p-2 text-start fw-bold'>
                Quản lý, giám sát, kịp thời dự báo, cảnh báo và công bố diễn
                biến chất lượng môi trường
              </p>
            </div>
          </div>
        </div>
        {!this.state.isSuccess ? (
          ''
        ) : (
          <Navigate to='/' />
        )}
      </div>
    )
  }
}
