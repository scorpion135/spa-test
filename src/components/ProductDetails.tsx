import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export interface ProductDetailsProps {
  product: { title: string; image: string; description: string };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h5">{product.title}</Typography>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
