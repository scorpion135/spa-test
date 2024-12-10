import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { fetchProducts, setCurrentPage } from "../redux/slices/products";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../index.css";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Получение данных с redux
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  const currentPage = useSelector(
    (state: RootState) => state.products.currentPage
  );
  const productsPerPage = useSelector(
    (state: RootState) => state.products.productsPerPage
  );

  // Фильтр
  const [activeButton, setActiveButton] = useState<"all" | "favorites">("all");

  const isFavoriteNum = products.filter((p) => p.liked).length;

  // Поиск
  const [searchQuery, setSearchQuery] = useState("");

  // Фильтрация продуктов (поисковая строка)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Логика пагинации
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Обработка изменения страницы
  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  // Определение общего количества страниц
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleButtonClick = (buttonType: "all" | "favorites") => {
    setActiveButton(buttonType); // Устанавливаем активную кнопку
  };

  // Запрос данных с api
  useEffect(() => {
    try {
      if (products.length === 0) {
        dispatch(fetchProducts());
      }
    } catch (err) {
      console.error(err);
    }
  }, [products.length]);

  return (
    <Container maxWidth="xl">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexDirection: window.innerWidth < 1170 ? "column" : "row",
          gap: window.innerWidth < 1170 ? "40px" : "0px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          {activeButton === "all" ? "Все товары" : "Избранные"}
        </h1>
        {activeButton !== "favorites" && (
          <div
            style={{
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Поиск..."
              style={{
                width: "400px",
                border: "none",
                outline: "none",
                borderRadius: "10px",
                padding: "14px 20px",
                fontSize: "16px",
                flex: 1,
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <IconButton
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            className="button"
            style={{
              backgroundColor: activeButton === "all" ? "blueviolet" : "white",
              color: activeButton === "all" ? "white" : "black",
            }}
            onClick={() => handleButtonClick("all")}
          >
            Все товары
          </button>
          <button
            className="button"
            style={{
              backgroundColor: activeButton === "all" ? "white" : "blueviolet",
              color: activeButton === "all" ? "black" : "white",
            }}
            onClick={() => handleButtonClick("favorites")}
          >
            Избранные
          </button>
        </div>
      </div>
      {activeButton === "favorites" && isFavoriteNum === 0 && (
        <h1
          style={{
            margin: "200px",
            fontSize: "50px",
            textAlign: "center",
          }}
        >
          Избранных товаров нет
        </h1>
      )}
      {status === "loading" ? (
        <h2>Загрузка...</h2>
      ) : (
        <>
          {activeButton !== "favorites" && (
            <Link to="/create-product">
              <button className="button" style={{ marginBottom: "50px" }}>
                Создать товар
              </button>
            </Link>
          )}
          <ProductsList products={currentProducts} filter={activeButton} />
          {activeButton !== "favorites" && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductsPage;
