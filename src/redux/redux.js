import { legacy_createStore, combineReducers } from "redux"
import data from "../assets/data"

export const addToCart = (options, quantity, id) => {
return{
  type: 'addToCart',
  payload : {options, quantity, id}
}
}

export const removeFromCart = (id) => {
  return{
    type: 'removeFromCart',
    payload : {id}
  }
}

const cartReducer = (state=[], action) => {
switch(action.type){
  case 'addToCart' :
    return [...state, action.payload]
  case 'removeFromCart':
      return state.filter(el => action.payload.id !== el.id);
    case 'updateCartItemOptions' : {
      const {index, newOptions} = action.payload;
      return state.map((item, i) =>
      i === index ? {...item, options: newOptions} : item
    );
    }
    case 'updateCartItemQuantity':{
      const {index, newQuantity} = action.payload;
      return state.map((item, i) => 
      i === index ? {...item, quantity: newQuantity} : item
    );
    }
    
      default:
        return state
}
}


const menuReducer = (state= data.menu, action) => {
  return state
}

const rootReducer = combineReducers({cartReducer, menuReducer})

export const store = legacy_createStore(rootReducer)

export const updateCartItemOptions = (index, newOptions) => ({
  type: 'update_Cart_Item_Options',
  payload : {index, newOptions}
})

export const updateCartItemQuantity = (index, newQuantity) => ({
  type: 'update_Cart_Item_Quanity',
  payload: {index, newQuantity}
})
