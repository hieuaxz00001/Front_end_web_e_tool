const initialState = {
    listTypeMap:[
        {
            active:false,
            type:'imagery'
        },
        {
            active:false,
            type:'imagery hybrid'
        },
        {
            active:false,
            type:'topographic'
        },
        {
            active:false,
            type:'streets'
        },
        {
            active:false,
            type:'streets (with relief)'
        },
        {
            active:false,
            type:'streets (night)'
        },
        {
            active:false,
            type:'navigation'
        },
        {
            active:false,
            type:'light gray canvas'
        },
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