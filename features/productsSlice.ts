/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  ref,
  push,
  update,
  remove,
  onValue,
  query,
  orderByChild,
  limitToLast,
  get
} from "firebase/database";


export interface Product {

  id?: string;
  name: string;
  price: number;
  category: {
    id: string;
    name: string;
  };
  description: string;
  brand: string;
  instock: boolean;
  productImage: string;
  mg: number;
  totalSold?: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: true,
};

export const startProductsRealtime = createAsyncThunk(
  "products/startRealtime",
  async (_, { dispatch }) => {
    const productsRef = ref(db, "products");

    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsa: Product[] = data
        ? Object.keys(data).map(id => ({
          id,
          ...data[id]
        }))
        : [];

      dispatch(setProducts(productsa));
    });

    return unsubscribe;
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (product: Product) => {
    const productsRef = ref(db, "products");

    const { id, ...dataToPush } = product;

    const newRef = await push(productsRef, dataToPush);
    return { id: newRef.key!, ...product };
  }
);


export const getTopSellingProducts = createAsyncThunk(
  "products/topSelling",
  async () => {
    const productsRef = ref(db, "products");

    const topQuery = query(
      productsRef,
      orderByChild("totalSold"),
      limitToLast(5) // gives highest 5, but in ASC order
    );

    const snapshot = await get(topQuery);

    const data: any[] = [];

    snapshot.forEach((child:any) => {
      data.push({
        id: child.key,
        ...child.val(),
      });
    });

    // 🔥 IMPORTANT: reverse to make it DESC (highest first)
    return data.reverse();
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (product: Product) => {
    if (!product.id) throw new Error("Product ID missing");

    const productRef = ref(db, `products/${product.id}`);


    const { name, price, category, description, productImage, mg, totalSold, brand } = product;

    await update(productRef, {
      name,
      price,
      category,
      description,
      productImage,
      mg,
      brand,
      totalSold
    });

    return product;
  }
);


export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string) => {
    const productRef = ref(db, `products/${id}`);
    await remove(productRef);
    return id;
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(getTopSellingProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;