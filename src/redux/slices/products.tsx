import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Category = {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type ProductFormInputs = {
  id: number;
  title: string;
  images: string[];
  description: string;
};

export interface Product {
  id: number;
  price: number;
  creationAt: string;
  updatedAt: string;
  category: Category;
  title: string;
  images: string[];
  description: string;
  liked: boolean;
}

export interface ProductsState {
  products: Product[];
  status: "loading" | "success" | "error";
  currentPage: number;
  productsPerPage: number;
}

export const initialState: ProductsState = {
  products: [],
  status: "loading",
  currentPage: 1,
  productsPerPage: 8,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      return response.data.slice(0, 40);
    } catch (err) {
      console.error("Ошибка в получении данных", err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state: ProductsState, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    toggleLike(state: ProductsState, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    removeProduct(state: ProductsState, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProduct(
      state: ProductsState,
      action: PayloadAction<ProductFormInputs>
    ) {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.title = action.payload.title;
        product.description = action.payload.description;
        product.images = action.payload.images;
      }
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state: ProductsState) => {
      state.status = "loading";
      state.products = [];
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state: ProductsState, action: any) => {
        state.products = action.payload;
        state.status = "success";
      }
    );
    builder.addCase(fetchProducts.rejected, (state: ProductsState) => {
      state.status = "error";
      state.products = [];
    });
  },
});

export const {
  addProduct,
  toggleLike,
  removeProduct,
  updateProduct,
  setCurrentPage,
} = productsSlice.actions;

export default productsSlice.reducer;
