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
            Phiếu khảo sát đánh giá cảm nhận về môi trường
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
                A. Thông tin người phỏng vấn
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
                  1. Địa điểm
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.diaDiem == null ? '' : khaoSat.diaDiem
                    }
                    placeholder='Địa điểm'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  2. Ngày bắt đầu
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioBatDau == null ? '' : khaoSat.gioBatDau
                    }
                    placeholder='Ngày bắt đầu'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  3. Giờ bắt đầu
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioBatDau == null ? '' : khaoSat.gioBatDau
                    }
                    placeholder='Giờ bắt đầu'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  4. Giờ kết thúc
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioKetThuc == null ? '' : khaoSat.gioKetThuc
                    }
                    placeholder='Giờ kết thúc'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  5. Tên người phỏng vấn
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
                    placeholder='Tên người phỏng vấn'
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
                B. Thông tin người trả lời
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
                  6. Họ và tên
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    placeholder='Họ và tên'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  7. Giới tính
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn giới tính</option>
                    <option value={1}>Nam</option>
                    <option value={2}>Nữ</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  8. Độ tuổi
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn độ tuổi</option>
                    <option value={0}>Dưới 10</option>
                    <option value={0}>Từ 10 – 19</option>
                    <option value={0}>Từ 30 – 39</option>
                    <option value={0}>Từ 40 – 49</option>
                    <option value={0}>Từ 50 – 59</option>
                    <option value={0}>Từ 60 – 69</option>
                    <option value={0}> Trên 70</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  9. Thời gian sinh sống tại khu vực
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn thời gian sinh sống</option>
                    <option value={0}>Dưới 3 tháng </option>
                    <option value={0}>Trên 3 tháng </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  10. Quý vị đã làm gì trong phòng 15 phút vừa qua?
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn hành động</option>
                    <option value={0}>Nằm</option>
                    <option value={0}>Ngồi</option>
                    <option value={0}>Đứng </option>
                    <option value={0}>Đi bộ</option>
                    <option value={0}>Chạy</option>
                    <option value={0}>Đạp xe</option>
                    <option value={0}>Đi xe máy</option>
                    <option value={0}>Lái ô tô</option>
                    <option value={0}>Làm việc tay chân nặng nhọc</option>
                    <option value={0}>Làm việc văn phòng</option>
                    <option value={0}>Khác</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  11. Mục đích của quý vị đến khu vực này
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn mục đích</option>
                    <option value={0}>Tôi làm việc ở đây</option>
                    <option value={0}>Tôi đi ngang qua</option>
                    <option value={0}>Tôi sống tại đây</option>
                    <option value={0}>Tôi sống tại đây</option>
                    <option value={0}>
                      Tôi đang thư giãn, vui chơi tại đây
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  12. Quần áo quý vị đang mặc
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
                  13. Tính đến thời điểm khảo sát, quý vị đã ở ngoài trời bao
                  lâu
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn thời gian</option>
                    <option value={0}>Dưới 15p</option>
                    <option value={0}>15p – 30p</option>
                    <option value={0}>30p – 1h</option>
                    <option value={0}>Trên 1h</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  14. Mức độ thường xuyên mà quý vị ở đây/ đi qua đây
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Hàng ngày </option>
                    <option>Hàng tuần </option>
                    <option>Hàng tháng </option>
                    <option>Hiếm khi </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  15. Quý vị có phải làm việc ngoài trời hàng ngày không
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Có </option>
                    <option>Không </option>
                    <option>Thi thoảng </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  16. Hàng ngày quý vị phải làm ngoài trời trong bao lâu
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Dưới 30p </option>
                    <option>30p – 1h </option>
                    <option>Trên 1h </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {' '}
                  17. Trong hôm nay, quý vị đã ở trong phòng điều hòa chưa
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Rồi </option>
                    <option>Chưa </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  18. Quý vị hay đi bằng phương tiện gì nhất khi ra ngoài trời
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Đi bộ </option>
                    <option>Xe đạp </option>
                    <option>Xe máy </option>
                    <option>Ô tô </option>
                    <option>Xe buýt, xe khách </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  19. Khi ra ngoài trời nắng, quý vị hay mặc trang phục gì
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Áo dài tay </option>
                    <option>Quần dài </option>
                    <option>Khẩu trang </option>
                    <option>Gang tay </option>
                    <option>Tất dài </option>
                    <option>Mũ </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  20. Quý vị tự thấy sức khỏe của mình từ trước tới nay như thế
                  nào
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Rất khỏe </option>
                    <option>Khỏe </option>
                    <option>Không quá khỏe </option>
                    <option>Yếu </option>
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
                C. Cảm nhận về sự nóng
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
                  21. Lúc này quý vị cảm thấy cơ thể thế nào
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Rét </option>
                    <option>Lạnh </option>
                    <option>Khá lạnh </option>
                    <option>Dễ chịu </option>
                    <option>Hơi nóng </option>
                    <option>Nóng </option>
                    <option>Rất Nóng </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  22. Thời tiết như thế này với quý vị là
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Chấp nhận được </option>
                    <option>Không chịu được </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  23. Quý vị cảm nhận môi trường hiện nay thế nào
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Dễ chịu </option>
                    <option>Khá dễ chịu </option>
                    <option>Không dễ chịu </option>
                    <option>Rất không dễ chịu </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  24. Quý vị thấy nắng thế nào
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Nắng còn quá ít </option>
                    <option>Nắng còn hơi ít </option>
                    <option>Đủ nắng rồi </option>
                    <option>Hơi nhiều nắng </option>
                    <option>Nhiều nắng quá</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  25. Quý vị thấy gió thế nào
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Gió yếu quá </option>
                    <option>Gió hơi yếu </option>
                    <option>Gió vừa đủ </option>
                    <option>Gió hơi mạnh </option>
                    <option>Gió mạnh quá</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  26. Quý vị có thấy oi/ khô không
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Rất oi </option>
                    <option>Hơi oi </option>
                    <option>Dễ chịu </option>
                    <option>Hơi khô, rát (da, môi) </option>
                    <option>Rất khô, rát (da, môi) quá </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  27. Quý vị có muốn thay đổi gì không
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>Muốn mát mẻ hơn </option>
                    <option>Không cần thay đổi </option>
                    <option>Muốn ấm hơn </option>
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
                D. Nguyện vọng (Chỉ dành cho người trả lời)
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
                  28. Quý vị muốn thay đổi gì
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option> </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  29. Quý vị thường đi tới đâu tại Hà Nội để tránh nắng nóng
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>
                      Công viên, vườn hoa, sân chơi có cây xanh, cỏ và có nước{' '}
                    </option>
                    <option>
                      Công viên, vườn hoa sân chơi có cây xanh, cỏ nhưng không
                      có nước{' '}
                    </option>
                    <option>Bờ sông, bờ hồ </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  30. Thời điểm mà quý vị hay đi ra ngoài tránh nóng
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Chọn </option>
                    <option>5 – 8 giờ </option>
                    <option>16 – 21 giờ </option>
                    <option>Sau 21 giờ </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 d-flex justify-content-center mt-4'>
            <Button variant='primary' type='submit'>
              Gửi khảo sát
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }
  return renderUi()
}
export default FormKhaoSat
