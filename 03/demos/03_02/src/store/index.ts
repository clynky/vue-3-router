import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid';
import createPersistedState from "vuex-plugin-persistedstate";
import { dataService } from '@/services/data.service';
interface State {
  orders: any[],
  restorants: any[],
  userData:any,
  cart:{
    items:{product:any,quantity:number}[],
  }
  
}
export default new Vuex.Store<State>({
  plugins: [createPersistedState()],
  state: (): State => ({
    orders: [],
   restorants: dataService.getRestorants(),
   userData:null,
   cart:{
      items:[],
   }
  }),
  getters: {
    orders(state) {

      return state.orders
    },
        availableRestorants: state => {
          return state.restorants
        },
        currentUser: state => {
          return state.userData
        },
        isLoggedIn: state => {
          return !!state.userData
        },
        cart: state => {
          return state.cart
        }
      },
  mutations: {
    newOrder (state, order) {
      state.orders.push(order)
    },
     setCartItems (state:any,items:{product:any,quantity:number}[]) {
            state.cart.items=items;
          },
          setUser (state,userData) {
            state.userData=userData
          },
          logout (state) {
            state.userData=null
          }
  },
    actions: {
      checkout ({ commit, state }) {
        return new Promise<any>((resolve, reject) => {
          setTimeout(() => {
            const orderItems=  state.cart.items.map((item)=>({
              product:item.product,
              quantity:item.quantity,
              restorant:state.restorants.find((restorant)=>restorant.id===item.product.restorantId)
            }))
            const order={
              id:uuidv4(),
              items:orderItems,
              orderCode: (Math.random() + 1).toString(36).substring(7),
              date:new Date(),
              totalItems:orderItems.length,
              amount: orderItems.reduce((total,item)=>total+item.product.price*item.quantity,0),
            }
            
          ;
            commit('newOrder',order)
            commit('setCartItems',[])
            resolve(order)
          }, 3000)///sumilate api call
        })
      
      
      },
    addToCart ({ commit, state }, product:any) {
      // potentially perform api requests here, for demo purposes we'll just commit the mutation
      // save the items currently in the cart
      const savedCartItems = [...state.cart.items]
      const existingItem = state.cart.items.find((cartItem:any) => cartItem.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      }
      else{
        savedCartItems.push({product,quantity:1})
      }
    
      commit('setCartItems',savedCartItems)
    
    }
  },
})

// export default createStore({
//   state: {
//     restorants: generateRestorants(),
//     userData:null,
//     cart:{
//       items:[],
//     }
    
//   },
//   getters: {
//     availableRestorants: state => {
//       return state.restorants
//     },
//     currentUser: state => {
//       return state.userData
//     },
//     isLoggedIn: state => {
//       return !!state.userData
//     },
//     cart: state => {
//       return state.cart
//     }
//   },
//   mutations: {
//     addToCart (state:any,item) {
//       state.cart.items.push(item)
//     },
//     setUser (state,userData) {
//       state.userData=userData
//     },
//     logout (state) {
//       state.userData=null
//     }

//   },
//   actions: {
//     addToCart ({ commit, state }, item:{product:any,quantity:number}) {
//       // potentially perform api requests here, for demo purposes we'll just commit the mutation
//       // save the items currently in the cart
//       const savedCartItems = [...state.cart.items]
//       const existingItem = state.cart.items.find((cartItem:any) => cartItem.product.id === item.product.id)
//       if (existingItem) {
//         existingItem.quantity += item.quantity
//       }
//       // send out checkout request, and optimistically
//       // clear the cart
//       commit(types.CHECKOUT_REQUEST)
//       // the shop API accepts a success callback and a failure callback
//       shop.buyProducts(
//         products,
//         // handle success
//         () => commit(types.CHECKOUT_SUCCESS),
//         // handle failure
//         () => commit(types.CHECKOUT_FAILURE, savedCartItems)
//       )
//     }
//   },
//   modules: {
//   }
// })
