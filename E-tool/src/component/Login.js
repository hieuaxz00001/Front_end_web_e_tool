import React, { Component } from 'react'
import './../style/login.css'
import placeholderPNG from './../image/placeholder.png'
import { Form } from 'react-bootstrap'
import Validator from './../utils/Validator'
import { ajaxCallPost } from '../base/base'
import { toast } from 'https://cdn.skypack.dev/wc-toast'
import { useNavigate } from 'react-router-dom'
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      pass: '',
      errors: {}
    }
    const requiredWith = (value, field, state) =>
      (!state[field] && !value) || !!value

    const rules = [
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'Username là bắt buộc'
      },
      {
        field: 'pass',
        method: 'isEmpty',
        validWhen: false,
        message: 'Mật khẩu là bắt buộc'
      }
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
    let user = {
      username: this.state.username,
      password: this.state.pass
    }
    ajaxCallPost('user/login', user)
      .then(rs => {
        console.log(rs);
        if (rs.data != null) {
          toast.success('Đăng nhập thành công')
          setTimeout(() => {
            this.props.navigation('/')
          },1000)
        } else {
          toast.error('Đăng nhập thất bại')
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Đăng nhập thất bại')
      })
  }
  render () {
    const { errors } = this.state
    return (
      <div className='container d-flex justify-content-center bg-blue w-100 h-100 p-0 align-items-center'>
        <div
          className='block-login shadow-lg rounded  d-flex col-8 bg-white'
          style={{ overflowY: 'auto', height: '550px' }}
        >
          <div className='block-login_left col-12 col-sm-12 col-md-12 col-xl-6 col-xxl-6 col-lg-6'>
            <Form
              className='block-input'
              onSubmit={this.submitDisable.bind(this)}
            >
              <div className='input-header p-1 mt-4'>
                <div className='image-logo d-flex justify-content-center'>
                  <img width={125} height={125} src={placeholderPNG} alt='' />
                </div>
                <p className='text-center fs-2 m-0 text-green'>E-TOOL</p>
              </div>
              <div className='input-content' style={{ padding: '0px 30px' }}>
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

                <div className='input-group d-flex justify-content-end '>
                  <a href className='m-2'>
                    Đã có tài khoản?
                  </a>
                </div>
              </div>
              <div className='input-button p-1 d-flex justify-content-around'>
                <button
                  className='btn btn-success'
                  onClick={this.handleSubmit.bind(this)}
                >
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
                Quản lý, giám sát, kịp thời dự báo, cảnh báo và công bố diễn
                biến chất lượng môi trường
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default function (props) {
  const navigation = useNavigate()
  return <Login {...props} navigation={navigation} />
}
