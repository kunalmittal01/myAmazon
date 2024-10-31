import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export const addToCartFirestore = createAsyncThunk(
    "cart/addToCartFirestore",
    async ({item,uid}) => {
        try {
            const idt = Date.now() + Math.random()*1000;
            const newCartItemRef = doc(db, `users/${uid}/cartItems`, `${item.id + idt}`);
            await setDoc(newCartItemRef, { ...item , id: item.id + idt});
            return { ...item, id: item.id + idt};
          } catch (error) {
            console.error("Error adding to Firestore:", error);
            throw error;
          }
    }
  )
  
  export const removeFromCartFirestore = createAsyncThunk(
    "cart/removeFromCartFirestore",
    async ({id,uid}) => {
      console.log(id);
      
        const cartItemRef = doc(db, `users/${uid}/cartItems`, `${id}`);
        await deleteDoc(cartItemRef);  
        return id;
    }
  );


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            console.log(action);
            state.items.push(action.payload);
            state.total += action.payload.price;
        },
        updateWholeCart: (state, action) => {
          state.items = action.payload;
          state.total = action.payload.reduce((acc, curr) => acc + curr.price, 0);
        },
        removeFromCart: (state, action) => {
          console.log(action.payload);
          state.total -= Number(state.items[action.payload].price);
          state.items.splice(action.payload,1)
          if(state.total <=0) {
              state.total = 0;
          }
        },
        clearCart: (state)=>{
            state.items.length = 0;
            state.total = 0;
        }
},
    extraReducers: (builder) => {
        builder.addCase(removeFromCartFirestore.pending, (state) => {
            state.status = "loading";
          })
          .addCase(removeFromCartFirestore.fulfilled, (state, action) => {
            const itemId = action.payload;
            const index = state.items.findIndex((item) => item.id === itemId);
            if (index !== -1) {
              state.total -= state.items[index].price;
              state.items.splice(index, 1);
            }
            state.status = "succeeded";
          })
          .addCase(removeFromCartFirestore.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
    
    builder
      .addCase(addToCartFirestore.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartFirestore.fulfilled, (state, action) => {
        const newItem = action.payload;
        state.items.push(newItem);
        state.total += newItem.price;
        state.status = "succeeded";
      })
      .addCase(addToCartFirestore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
}})

export const { addToCart, removeFromCart, clearCart, updateWholeCart } = cartSlice.actions;
export default cartSlice.reducer;