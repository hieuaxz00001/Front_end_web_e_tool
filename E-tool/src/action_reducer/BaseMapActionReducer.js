export const thayDoiToaDo = basemap => {
  return {
    type: 'CHANGE_LOCATION',
    lat: basemap.lat,
    lon: basemap.lon
  }
}
export const thayDoiToaDoPhieuKhaoSat = list => {
  return {
    type: 'CHANGE_LOCATION_PHIEUKHAOSAT',
    listPointKhaoSat: list
  }
}
