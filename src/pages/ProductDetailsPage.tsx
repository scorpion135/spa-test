import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import "../index.css";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Находим продукт по ID
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id.toString() === id)
  );

  if (!product) return <div>Товар не найден</div>;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "50px",
          margin: "auto",
          flexWrap: "wrap",
        }}
      >
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ width: "600px", height: "600px" }}
        />

        <div style={{ maxWidth: "500px" }}>
          <h1 style={{ marginBottom: "30px" }}>{product.title}</h1>

          <p
            style={{
              marginBottom: "30px",
              fontSize: "20px",
              lineHeight: "1.5",
              overflowY: "auto",
              maxHeight: "400px",
            }}
          >
            {product.description}
          </p>
          <Link to="/">
            <button className="button">На главную</button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailPage;
