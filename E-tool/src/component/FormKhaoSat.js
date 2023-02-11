import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { ajaxCallGet, ajaxCallPost } from '../base/base'
import data2 from '../data/listPoint.json'
import './../index.css'
import { toast } from 'https://cdn.skypack.dev/wc-toast'
import { useSelector } from 'react-redux'

const FormKhaoSat = props => {
  const [lat, setLat] = useState(props.lat)
  const [lon, setLon] = useState(props.lon)

  const visibleFormKhaoSat = useSelector(
    state => state.baseApp.visibleFormKhaoSat
  )
  var [khaoSat, setKhaoSat] = useState({})
  const id = useSelector(state => state.baseApp.idFormKhaoSat)
  const [showDialogModal, setShowDialogModal] = useState(visibleFormKhaoSat)
  const [idFormKhaoSat, setIdFormKhaoSat] = useState(id)
  const convertJsonToString = str => {
    str = str
      .replaceAll('CauHoi', '')
      .replaceAll('{', '')
      .replaceAll('}', '')
    str = str.split(',')
    const map = new Map()
    for (let i in str) {
      let x = str[i].split('=')[0]
      let y = str[i].split('=')[1]
      map.set(x, y)
    }
    console.log(map)
    return map
  }
  useEffect(() => {
    setShowDialogModal(visibleFormKhaoSat)
  }, [visibleFormKhaoSat, idFormKhaoSat])
  useEffect(() => {
    setIdFormKhaoSat(id)
    if (id != null) {
      ajaxCallGet('phieu-khao-sat?queries=deleted=false,id=' + id).then(rs => {
        let str = convertJsonToString(rs.data[0].cauHoi)
        rs.data[0].cauHoi = str
        setKhaoSat(rs.data[0])
      })
    }
  }, [id])

  useEffect(() => {
    setLat(props.lat)
    setLon(props.lon)
    setShowDialogModal(props.visible)
  }, [props])
  const closeModal = () => {
    setShowDialogModal(false)
  }
  const saveKhaoSat = event => {
    event.preventDefault()
    let data = {
      tenPhieu: 'string',
      tenNguoiTl: 'string',
      gioiTinh: true,
      tuoi: 0,
      diaDiem: 'string',
      toaDo: `[${lat},${lon}]`,
      gioBatDau: '',
      gioKetThuc: '',
      tenNguoiPhongVan: 'string',
      deleted: true,
      cauHoi: 'string'
    }
    ajaxCallPost('phieu-khao-sat/save-new/' + 1 + '/' + 1, data).then(rs => {
      setShowDialogModal(false)
      toast.success('Thêm khảo sát thành công')
    })
    data2.push(data)
  }
  const test = () => {}
  const renderUi = () => {
    return (
      <Modal
        show={showDialogModal}
        onHide={closeModal.bind(this)}
        dialogClassName='my-modal-phieu-ks'
      >
        <Form
          className=' m-4 '
          onSubmit={saveKhaoSat.bind(this)}
          id='parentCollape'
        >
          <h6 className='fw-bold text-center mb-3'>
            {/* Phiếu khảo sát đánh giá cảm nhận về môi trường */}
            SURVEY
            FEELINGS OF HANOI PEOPLE
            ABOUT THE CITY THERMAL ENVIRONMENT
          </h6>
          <div className='block-collapse'>
            <div
              className='block-collapse-header  d-flex justify-content-between align-items-center mb-2 border pt-2 pb-2 pe-3 ps-3 shadow-sm'
              data-bs-toggle='collapse'
              data-bs-target='#blockA'
              role='button'
              aria-expanded='false'
              aria-controls='blockA'
            >
              <p className='fw-bold mb-0 fs-09 text-dark'>
                {/* A. Thông tin người phỏng vấn */}
                A. Personal information 
              </p>
              <i class='fas fa-angle-down fs-5 m-1'></i>
            </div>
            <div
              className='block-collapse-content collapse'
              id='blockA'
              data-bs-parent='#parentCollape'
            >
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 1. Địa điểm */}
                  1. Place
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.diaDiem == null ? '' : khaoSat.diaDiem
                    }
                    // placeholder='Địa điểm'
                    placeholder='Place'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 2. Ngày bắt đầu */}
                  2. Sunny/ Shade Day
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioBatDau == null ? '' : khaoSat.gioBatDau
                    }
                    // placeholder='Ngày bắt đầu'
                    placeholder='Sunny/ Shade Day'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 3. Giờ bắt đầu */}
                  3. Start time
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioBatDau == null ? '' : khaoSat.gioBatDau
                    }
                    // placeholder='Giờ bắt đầu'
                    placeholder='Start time'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 4. Giờ kết thúc */}
                  4. End time
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioKetThuc == null ? '' : khaoSat.gioKetThuc
                    }
                    // placeholder='Giờ kết thúc'
                    placeholder='End time'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 5. Tên người phỏng vấn */}
                  ̀5. Interviewer's name
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.tenNguoiPhongVan == null
                        ? ''
                        : khaoSat.tenNguoiPhongVan
                    }
                    // placeholder='Tên người phỏng vấn'
                    placeholder="Interviewer's name"
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='block-collapse mt-3'>
            <div
              className='block-collapse-header d-flex justify-content-between align-items-center mb-2 border pt-2 pb-2 pe-3 ps-3 shadow-sm'
              data-bs-toggle='collapse'
              data-bs-target='#blockB'
              role='button'
              aria-expanded='false'
              aria-controls=''
            >
              <h6 className='fw-bold mb-0 fs-09 text-dark'>
                {/* B. Thông tin người trả lời */}
                B. Personal information 
              </h6>
              <i class='fas fa-angle-down fs-5 m-1'></i>
            </div>
            <div
              className='block-collapse-content collapse'
              id='blockB'
              data-bs-parent='#parentCollape'
            >
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 6. Họ và tên */}
                  6. Respondent's full name
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    // placeholder='Họ và tên'
                    placeholder="Respondent's full name"
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 7. Giới tính */}
                  7. Gender
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn giới tính */}
                      Choose Gender
                    </option>
                    <option value={1}>
                      {/* Nam */}
                      Male
                    </option>
                    <option value={2}>
                      {/* Nữ */}
                      Femail
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 8. Độ tuổi */}
                  8. Age
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn độ tuổi */}
                      Choose age
                    </option>
                    <option value={0}>
                      {/* Dưới 10 */}
                      Under 10
                    </option>
                    <option value={0}>10 – 19</option>
                    <option value={0}>30 – 39</option>
                    <option value={0}>40 – 49</option>
                    <option value={0}>50 – 59</option>
                    <option value={0}>60 – 69</option>
                    <option value={0}>Over 70</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 9. Thời gian sinh sống tại khu vực */}
                  9. Time lived in the area
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn thời gian sinh sống */}
                      Choose time
                    </option>
                    <option value={0}>
                      {/* Dưới 3 tháng  */}
                      Less than 3 months                                           
                    </option>
                    <option value={0}>
                      {/* Trên 3 tháng  */}
                      More than 3 months
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 10. Quý vị đã làm gì trong phòng 15 phút vừa qua? */}
                  10. What have you been doing in your room the last 15 minutes?
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn hành động */}
                      Choose a action
                    </option>
                    <option value={0}>
                      {/* Nằm */}
                      Lying
                    </option>
                    <option value={0}>
                      {/* Ngồi */}
                      Sitting
                    </option>
                    <option value={0}>
                      {/* Đứng  */}
                      Standing
                    </option>
                    <option value={0}>
                      {/* Đi bộ */}
                      Walking
                    </option>
                    <option value={0}>
                      {/* Chạy */}
                      Running
                    </option>
                    <option value={0}>
                      {/* Đạp xe */}
                      Cycling
                    </option>
                    <option value={0}>
                      {/* Đi xe máy */}
                      Riding a motorbike
                    </option>
                    <option value={0}>
                      {/* Lái ô tô */}
                      Driving car
                    </option>
                    <option value={0}>
                      {/* Làm việc tay chân nặng nhọc */}
                      Doing heavy manual work
                    </option>
                    <option value={0}>
                      {/* Làm việc văn phòng */}
                      Office work
                    </option>
                    <option value={0}>
                      {/* Khác */}
                      Other
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 11. Mục đích của quý vị đến khu vực này */}
                  11. What is your purpose in this area
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn mục đích */}
                      Choose your purpose
                    </option>
                    <option value={0}>
                      {/* Tôi làm việc ở đây */}
                      I work here
                    </option>
                    <option value={0}>
                      {/* Tôi đi ngang qua */}
                      I pass by
                    </option>
                    <option value={0}>
                      {/* Tôi sống tại đây */}
                      I live here 
                    </option>
                    <option value={0}>
                      {/* Tôi sống tại đây */}
                      I live here 
                    </option>
                    <option value={0}>
                      {/* Tôi đang thư giãn, vui chơi tại đây */}
                      I am relaxing and playing here
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 12. Quần áo quý vị đang mặc */}
                  12. The clothes you are wearing
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected></option>
                    <option value={0}></option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 13. Tính đến thời điểm khảo sát, quý vị đã ở ngoài trời bao
                  lâu */}
                  13, Up to the time of the survey, how long have you been outdoors
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn thời gian */}
                      Choose time
                    </option>
                    <option value={0}>
                      {/* Dưới 15p */}
                      Under 15p
                    </option>
                    <option value={0}>15p – 30p</option>
                    <option value={0}>30p – 1h</option>
                    <option value={0}>
                      Trên 1h
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 14. Mức độ thường xuyên mà quý vị ở đây/ đi qua đây */}
                  14. How often do you stay here/pass by
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Hàng ngày  */}
                      Daily 
                    </option>
                    <option>
                      {/* Hàng tuần  */}
                      Weekly
                    </option>
                    <option>
                      {/* Hàng tháng  */}
                      Monthly
                    </option>
                    <option>
                      {/* Hiếm khi  */}
                      Rarely
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 15. Quý vị có phải làm việc ngoài trời hàng ngày không */}
                  15. Do you have to work outdoors every day
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Có  */}
                      Yes
                    </option>
                    <option>
                      {/* Không  */}
                      No
                    </option>
                    <option>
                      {/* Thi thoảng  */}
                      Occasionally
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 16. Hàng ngày quý vị phải làm ngoài trời trong bao lâu */}
                  16. How long do you have to work outdoors every day
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Dưới 30p  */}
                      Under 30p
                    </option>
                    <option>30p – 1h </option>
                    <option>
                      {/* Trên 1h  */}
                      Over 1h
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {' '}
                  {/* 17. Trong hôm nay, quý vị đã ở trong phòng điều hòa chưa */}
                  17. Have you stayed in air-conditioned room today 
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Rồi  */}
                      Yes
                    </option>
                    <option>
                      {/* Chưa */}
                      Not yet
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 18. Quý vị hay đi bằng phương tiện gì nhất khi ra ngoài trời */}
                  18. What is your favorite way to go outdoors
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Đi bộ  */}
                      Walking
                    </option>
                    <option>
                      {/* Xe đạp  */}
                      Bicycle
                    </option>
                    <option>
                      {/* Xe máy */}
                      Motorbike 
                    </option>
                    <option>
                      {/* Ô tô  */}
                      Car
                    </option>
                    <option>
                      {/* Xe buýt, xe khách  */}
                      Bus, coach
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 19. Khi ra ngoài trời nắng, quý vị hay mặc trang phục gì */}
                  19. When you go out in the sun, what do you usually wear
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Áo dài tay  */}
                      Long-sleeved shirt 
                    </option>
                    <option>
                      {/* Quần dài  */}
                      Pants
                    </option>
                    <option>
                      {/* Khẩu trang  */}
                      Mask 
                    </option>
                    <option>
                      {/* Gang tay */}
                      Gloves 
                    </option>
                    <option>
                      {/* Tất dài  */}
                      Socks
                    </option>
                    <option>
                      {/* Mũ  */}
                      Hat
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 20. Quý vị tự thấy sức khỏe của mình từ trước tới nay như thế
                  nào */}
                  20. How about your health’s condition
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Rất khỏe  */}
                      Very strong 
                    </option>
                    <option>
                      {/* Khỏe  */}
                      Strong 
                    </option>
                    <option>
                      {/* Không quá khỏe  */}
                      Not too strong
                    </option>
                    <option>
                      {/* Yếu */}
                      Weak
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='block-collapse mt-3'>
            <div
              className='block-collapse-header d-flex justify-content-between align-items-center mb-2 border pt-2 pb-2 pe-3 ps-3 shadow-sm'
              data-bs-toggle='collapse'
              data-bs-target='#blockC'
              role='button'
              aria-expanded='false'
              aria-controls=''
            >
              <h6 className='fw-bold mb-0 fs-09 text-dark'>
                {/* C. Cảm nhận về sự nóng */}
                C. Sensation of heat 
              </h6>
              <i class='fas fa-angle-down fs-5 m-1'></i>
            </div>
            <div
              className='block-collapse-content collapse'
              id='blockC'
              data-bs-parent='#parentCollape'
            >
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 21. Lúc này quý vị cảm thấy cơ thể thế nào */}
                  21. How does your body feel right now
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Rét  */}
                      Very cold
                    </option>
                    <option>
                      {/* Lạnh  */}
                      Cold
                    </option>
                    <option>
                      {/* Khá lạnh  */}
                      Quite cold
                    </option>
                    <option>
                      {/* Dễ chịu */}
                      Pleasant
                    </option>
                    <option>
                      {/* Hơi nóng  */}
                      Slightly hot
                    </option>
                    <option>
                      {/* Nóng */}
                      Hot
                    </option>
                    <option>
                      {/* Rất Nóng  */}
                      Very hot
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 22. Thời tiết như thế này với quý vị là */}
                  22. Weather like this to you is
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Chấp nhận được  */}
                      Tolerable
                    </option>
                    <option>
                      {/* Không chịu được  */}
                      Intolerable
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 23. Quý vị cảm nhận môi trường hiện nay thế nào */}
                  23. How do you feel about the current environment
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>
                      {/* Dễ chịu  */}
                      Pleasant
                    </option>
                    <option>
                      {/* Khá dễ chịu  */}
                      Quite pleasant
                    </option>
                    <option>
                      {/* Không dễ chịu  */}
                      Not pleasant 
                    </option>
                    <option>
                      {/* Rất không dễ chịu  */}
                      Very unpleasant
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 24. Quý vị thấy nắng thế nào */}
                  24. How do you feel about the sun
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Nắng còn quá ít  */}
                      The sun is too little
                    </option>
                    <option>
                      {/* Nắng còn hơi ít  */}
                      The sun is still a little bit 
                    </option>
                    <option>
                      {/* Đủ nắng rồi  */}
                      It's sunny enough 
                    </option>
                    <option>
                      {/* Hơi nhiều nắng  */}
                      A bit too much sun
                    </option>
                    <option>
                      {/* Nhiều nắng quá */}
                      Too much sunshine
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 25. Quý vị thấy gió thế nào */}
                  25. How do you feel about the wind
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Gió yếu quá  */}
                      The wind is too weak 
                    </option>
                    <option>
                      {/* Gió hơi yếu  */}
                      The wind is a bit weak 
                    </option>
                    <option>
                      {/* Gió vừa đủ  */}
                      The wind is just enough 
                    </option>
                    <option>
                      {/* Gió hơi mạnh  */}
                      The wind is a bit strong 
                    </option>
                    <option>
                      {/* Gió mạnh quá */}
                      The wind is too strong
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 26. Quý vị có thấy oi/ khô không */}
                  26. Do you feel hot/dry
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Rất oi  */}
                      Very hot 
                    </option>
                    <option>
                      {/* Hơi oi  */}
                      Slightly hot 
                    </option>
                    <option>
                      {/* Dễ chịu  */}
                      Pleasant 
                    </option>
                    <option>
                      {/* Hơi khô, rát (da, môi)  */}
                      Slightly dry, burning (skin, lips)
                    </option>
                    <option>
                      {/* Rất khô, rát (da, môi) quá  */}
                      Very dry, burning (skin, lips)
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 27. Quý vị có muốn thay đổi gì không */}
                  27. Do you want to change anything ?
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option>
                      {/* Muốn mát mẻ hơn  */}
                      Want to be cooler 
                    </option>
                    <option>
                      {/* Không cần thay đổi  */}
                      Don't need to change 
                    </option>
                    <option>
                      {/* Muốn ấm hơn  */}
                      Want to be warmer
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='block-collapse mt-3'>
            <div
              className='block-collapse-header d-flex justify-content-between align-items-center mb-2 border pt-2 pb-2 pe-3 ps-3 shadow-sm'
              data-bs-toggle='collapse'
              data-bs-target='#blockD'
              role='button'
              aria-expanded='false'
              aria-controls=''
            >
              <h6 className='fw-bold mb-0 fs-09 text-dark'>
                {/* D. Nguyện vọng (Chỉ dành cho người trả lời) */}
                D. Aspiration (for respondent)
              </h6>
              <i class='fas fa-angle-down fs-5 m-1'></i>
            </div>
            <div
              className='block-collapse-content collapse'
              id='blockD'
              data-bs-parent='#parentCollape'
            >
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 28. Quý vị muốn thay đổi gì */}
                  28. Do you want to change anything
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn  */}
                      Choose
                    </option>
                    <option> </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 29. Quý vị thường đi tới đâu tại Hà Nội để tránh nắng nóng */}
                  29. Where do you usually go in Hanoi to avoid the heat
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>
                      {/* Chọn */}
                      Choose
                    </option>
                    <option>
                      {/* Công viên, vườn hoa, sân chơi có cây xanh, cỏ và có nước{' '} */}
                      Parks, flower gardens, playgrounds with trees, grass and water{' '}
                    </option>
                    <option>
                      {/* Công viên, vườn hoa sân chơi có cây xanh, cỏ nhưng không
                      có nước{' '} */}
                      Parks, flower gardens and playgrounds with trees, grass but 
                      no water{' '}
                    </option>
                    <option>
                      {/* Bờ sông, bờ hồ  */}
                      Riverbanks, lakeside
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {/* 30. Thời điểm mà quý vị hay đi ra ngoài tránh nóng */}
                  30. When do you often go out to avoid the heat
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>
                      {/* 5 – 8 giờ  */}
                      5 – 8 hours 
                    </option>
                    <option>
                      {/* 16 – 21 giờ  */}
                      16 – 21 hours 
                    </option>
                    <option>
                      {/* Sau 21 giờ  */}
                      After 21 hours
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 d-flex justify-content-center mt-4'>
            <Button variant='primary' type='submit'>
              {/* Gửi khảo sát */}
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }
  return renderUi()
}
export default FormKhaoSat
