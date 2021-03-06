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
      toast.success('Th??m kh???o s??t th??nh c??ng')
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
            Phi???u kh???o s??t ????nh gi?? c???m nh???n v??? m??i tr?????ng
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
                A. Th??ng tin ng?????i ph???ng v???n
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
                  1. ?????a ??i???m
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.diaDiem == null ? '' : khaoSat.diaDiem
                    }
                    placeholder='?????a ??i???m'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  2. Ng??y b???t ?????u
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioBatDau == null ? '' : khaoSat.gioBatDau
                    }
                    placeholder='Ng??y b???t ?????u'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  3. Gi??? b???t ?????u
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioBatDau == null ? '' : khaoSat.gioBatDau
                    }
                    placeholder='Gi??? b???t ?????u'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  4. Gi??? k???t th??c
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    defaultValue={
                      khaoSat.gioKetThuc == null ? '' : khaoSat.gioKetThuc
                    }
                    placeholder='Gi??? k???t th??c'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  5. T??n ng?????i ph???ng v???n
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
                    placeholder='T??n ng?????i ph???ng v???n'
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
                B. Th??ng tin ng?????i tr??? l???i
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
                  6. H??? v?? t??n
                </label>
                <div className='col-12'>
                  <input
                    type='text'
                    name=''
                    placeholder='H??? v?? t??n'
                    className='form-control-customm form-control'
                  />
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  7. Gi???i t??nh
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n gi???i t??nh</option>
                    <option value={1}>Nam</option>
                    <option value={2}>N???</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  8. ????? tu???i
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n ????? tu???i</option>
                    <option value={0}>D?????i 10</option>
                    <option value={0}>T??? 10 ??? 19</option>
                    <option value={0}>T??? 30 ??? 39</option>
                    <option value={0}>T??? 40 ??? 49</option>
                    <option value={0}>T??? 50 ??? 59</option>
                    <option value={0}>T??? 60 ??? 69</option>
                    <option value={0}> Tr??n 70</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  9. Th???i gian sinh s???ng t???i khu v???c
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n th???i gian sinh s???ng</option>
                    <option value={0}>D?????i 3 th??ng </option>
                    <option value={0}>Tr??n 3 th??ng </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  10. Qu?? v??? ???? l??m g?? trong ph??ng 15 ph??t v???a qua?
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n h??nh ?????ng</option>
                    <option value={0}>N???m</option>
                    <option value={0}>Ng???i</option>
                    <option value={0}>?????ng </option>
                    <option value={0}>??i b???</option>
                    <option value={0}>Ch???y</option>
                    <option value={0}>?????p xe</option>
                    <option value={0}>??i xe m??y</option>
                    <option value={0}>L??i ?? t??</option>
                    <option value={0}>L??m vi???c tay ch??n n???ng nh???c</option>
                    <option value={0}>L??m vi???c v??n ph??ng</option>
                    <option value={0}>Kh??c</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  11. M???c ????ch c???a qu?? v??? ?????n khu v???c n??y
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n m???c ????ch</option>
                    <option value={0}>T??i l??m vi???c ??? ????y</option>
                    <option value={0}>T??i ??i ngang qua</option>
                    <option value={0}>T??i s???ng t???i ????y</option>
                    <option value={0}>T??i s???ng t???i ????y</option>
                    <option value={0}>
                      T??i ??ang th?? gi??n, vui ch??i t???i ????y
                    </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  12. Qu???n ??o qu?? v??? ??ang m???c
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
                  13. T??nh ?????n th???i ??i???m kh???o s??t, qu?? v??? ???? ??? ngo??i tr???i bao
                  l??u
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n th???i gian</option>
                    <option value={0}>D?????i 15p</option>
                    <option value={0}>15p ??? 30p</option>
                    <option value={0}>30p ??? 1h</option>
                    <option value={0}>Tr??n 1h</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  14. M???c ????? th?????ng xuy??n m?? qu?? v??? ??? ????y/ ??i qua ????y
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>H??ng ng??y </option>
                    <option>H??ng tu???n </option>
                    <option>H??ng th??ng </option>
                    <option>Hi???m khi </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  15. Qu?? v??? c?? ph???i l??m vi???c ngo??i tr???i h??ng ng??y kh??ng
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>C?? </option>
                    <option>Kh??ng </option>
                    <option>Thi tho???ng </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  16. H??ng ng??y qu?? v??? ph???i l??m ngo??i tr???i trong bao l??u
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>D?????i 30p </option>
                    <option>30p ??? 1h </option>
                    <option>Tr??n 1h </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  {' '}
                  17. Trong h??m nay, qu?? v??? ???? ??? trong ph??ng ??i???u h??a ch??a
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>R???i </option>
                    <option>Ch??a </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  18. Qu?? v??? hay ??i b???ng ph????ng ti???n g?? nh???t khi ra ngo??i tr???i
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>??i b??? </option>
                    <option>Xe ?????p </option>
                    <option>Xe m??y </option>
                    <option>?? t?? </option>
                    <option>Xe bu??t, xe kh??ch </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  19. Khi ra ngo??i tr???i n???ng, qu?? v??? hay m???c trang ph???c g??
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>??o d??i tay </option>
                    <option>Qu???n d??i </option>
                    <option>Kh???u trang </option>
                    <option>Gang tay </option>
                    <option>T???t d??i </option>
                    <option>M?? </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  20. Qu?? v??? t??? th???y s???c kh???e c???a m??nh t??? tr?????c t???i nay nh?? th???
                  n??o
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>R???t kh???e </option>
                    <option>Kh???e </option>
                    <option>Kh??ng qu?? kh???e </option>
                    <option>Y???u </option>
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
                C. C???m nh???n v??? s??? n??ng
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
                  21. L??c n??y qu?? v??? c???m th???y c?? th??? th??? n??o
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>R??t </option>
                    <option>L???nh </option>
                    <option>Kh?? l???nh </option>
                    <option>D??? ch???u </option>
                    <option>H??i n??ng </option>
                    <option>N??ng </option>
                    <option>R???t N??ng </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  22. Th???i ti???t nh?? th??? n??y v???i qu?? v??? l??
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>Ch???p nh???n ???????c </option>
                    <option>Kh??ng ch???u ???????c </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  23. Qu?? v??? c???m nh???n m??i tr?????ng hi???n nay th??? n??o
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>D??? ch???u </option>
                    <option>Kh?? d??? ch???u </option>
                    <option>Kh??ng d??? ch???u </option>
                    <option>R???t kh??ng d??? ch???u </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  24. Qu?? v??? th???y n???ng th??? n??o
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>N???ng c??n qu?? ??t </option>
                    <option>N???ng c??n h??i ??t </option>
                    <option>????? n???ng r???i </option>
                    <option>H??i nhi???u n???ng </option>
                    <option>Nhi???u n???ng qu??</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  25. Qu?? v??? th???y gi?? th??? n??o
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>Gi?? y???u qu?? </option>
                    <option>Gi?? h??i y???u </option>
                    <option>Gi?? v???a ????? </option>
                    <option>Gi?? h??i m???nh </option>
                    <option>Gi?? m???nh qu??</option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  26. Qu?? v??? c?? th???y oi/ kh?? kh??ng
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>R???t oi </option>
                    <option>H??i oi </option>
                    <option>D??? ch???u </option>
                    <option>H??i kh??, r??t (da, m??i) </option>
                    <option>R???t kh??, r??t (da, m??i) qu?? </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  27. Qu?? v??? c?? mu???n thay ?????i g?? kh??ng
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>Mu???n m??t m??? h??n </option>
                    <option>Kh??ng c???n thay ?????i </option>
                    <option>Mu???n ???m h??n </option>
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
                D. Nguy???n v???ng (Ch??? d??nh cho ng?????i tr??? l???i)
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
                  28. Qu?? v??? mu???n thay ?????i g??
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option> </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  29. Qu?? v??? th?????ng ??i t???i ????u t???i H?? N???i ????? tr??nh n???ng n??ng
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>
                      C??ng vi??n, v?????n hoa, s??n ch??i c?? c??y xanh, c??? v?? c?? n?????c{' '}
                    </option>
                    <option>
                      C??ng vi??n, v?????n hoa s??n ch??i c?? c??y xanh, c??? nh??ng kh??ng
                      c?? n?????c{' '}
                    </option>
                    <option>B??? s??ng, b??? h??? </option>
                  </select>
                </div>
              </div>
              <div className='md-2 row'>
                <label htmlFor='staticEmail' className='col-12 col-form-label'>
                  30. Th???i ??i???m m?? qu?? v??? hay ??i ra ngo??i tr??nh n??ng
                </label>
                <div className='col-12'>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Ch???n </option>
                    <option>5 ??? 8 gi??? </option>
                    <option>16 ??? 21 gi??? </option>
                    <option>Sau 21 gi??? </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 d-flex justify-content-center mt-4'>
            <Button variant='primary' type='submit'>
              G???i kh???o s??t
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }
  return renderUi()
}
export default FormKhaoSat
