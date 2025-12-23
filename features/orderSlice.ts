/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { ref, push, update, remove, onValue } from "firebase/database";



import {IAddress} from "../features/addressSlice";
import { Product} from "../features/productsSlice";


export interface IForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: IAddress | null;
}



export interface Order {
  id?: string;
  customer: IForm;
  ProductOrder: Product[];
  subtotal: number;
  deliveryFee: number;
  total?: number;
  createdAt?: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: true,
};

/* ------------------ Realtime Fetch Orders ------------------ */
export const startOrdersRealtime = createAsyncThunk(
  "orders/startRealtime",
  async (_, { dispatch }) => {
    const ordersRef = ref(db, "orders");

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const orders: Order[] = data
        ? Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }))
        : [];

      dispatch(setOrders(orders));
    });

    return unsubscribe;
  }
);

/* ------------------ Add Order ------------------ */
export const addOrder = createAsyncThunk(
  "orders/add",
  async (order: Order) => {
    const ordersRef = ref(db, "orders");

    const { id, ...dataToPush } = order;

    const newRef = await push(ordersRef, {
      ...dataToPush,
      createdAt: new Date().toISOString(),
      total: dataToPush.subtotal + dataToPush.deliveryFee,
    });

    return { id: newRef.key!, ...order };
  }
);

/* ------------------ Update Order ------------------ */
export const updateOrder = createAsyncThunk(
  "orders/update",
  async (order: Order) => {
    if (!order.id) throw new Error("Order ID missing");

    const orderRef = ref(db, `orders/${order.id}`);

    const { customer, ProductOrder, subtotal, deliveryFee } = order;

    await update(orderRef, {
      customer,
      ProductOrder,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
    });

    return order;
  }
);

/* ------------------ Delete Order ------------------ */
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id: string) => {
    const orderRef = ref(db, `orders/${id}`);
    await remove(orderRef);
    return id;
  }
);

/* ------------------ Slice ------------------ */
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (o) => o.id === action.payload.id
        );
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o.id !== action.payload);
      });
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
