import topo from './../image/topo_map.png'
import hybrid from './../image/hybrid_map.png'
import streets from './../image/streets_map.png'
import oceans from './../image/oceans_map.png'
import dark from './../image/dark_map.png'
const initialState = {
  listTypeMap: [
    {
      active: false,
      type: 'topo',
      image: topo
    },
    {
      active: false,
      type: 'hybrid',
      image: hybrid
    },
    {
      active: false,
      type: 'streets',
      image: streets
    },
    {
      active: false,
      type: 'oceans',
      image: oceans
    },
    {
      active: false,
      type: 'dark-gray',
      image: dark
    }
  ]
}
const TypeMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGER_TYPE_MAP': {
      const listType = action.listType
      return {
        ...state,
        listTypeMap: listType
      }
    }

    default: {
      return state
    }
  }
}
export default TypeMapReducer
