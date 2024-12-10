import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../redux/slices/products";

export interface ProductsListProps {
  filter: "all" | "favorites";
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({
  filter = "all",
  products,
}) => {
  const filteredProducts =
    filter === "favorites" ? products.filter((p) => p.liked) : products;

  return (
    <Grid container spacing={4} sx={{ marginBottom: "50px" }}>
      {filteredProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={product.id}>
          <ProductCard product={product} filter={filter} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
