import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLike, removeProduct, Product } from "../redux/slices/products";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface ProductCardProps {
  product: Product;
  filter: "all" | "favorites";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, filter }) => {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "15px 10px",
        borderRadius: "10px",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <Link to={`/products/${product.id}`}>
        <CardMedia
          component="img"
          height="200px"
          image={product.images[0]}
          alt={product.title}
          sx={{
            height: 200,
            objectFit: "cover",
            width: "100%",
            borderRadius: "10px",
          }}
        />
        <CardContent
          sx={{
            marginBottom: "10px",
            maxHeight: "100px",
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" noWrap>
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ lineHeight: "1.8" }}
          >
            {product.description}...
          </Typography>
        </CardContent>
      </Link>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <IconButton onClick={() => dispatch(toggleLike(product.id))}>
            <FavoriteIcon color={product.liked ? "error" : "action"} />
          </IconButton>
          {filter === "all" && (
            <IconButton onClick={() => dispatch(removeProduct(product.id))}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>
        <Link to={`/create-product/${product.id}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;
