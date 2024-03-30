import React, { useEffect, useReducer, useState } from "react";
import "./body.scss";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const initialState = {
  loading: true,
  productsData: [],
  error: "",
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        productsData: action.payload,
        error: "",
      };
    case "FETCH_FAILURE":
      return {
        loading: false,
        productsData: [],
        error: action.error,
      };
    default:
      return prevState;
  }
};

function Body(props) {
  const navigate = useNavigate();
  const [products, setCard] = useReducer(reducer, initialState);
  const [slide, setSlide] = useReducer(reducer, initialState);

  const [currentSlide, setCurrentSlide] = useState(0);

  const rightSlideIndexHandler = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slide.productsData.length);
  };

  const leftSlideIndexHandler = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slide.productsData.length - 1 : prevSlide - 1
    );
  };

  const getOneFromEach = () => {
    const prods = [];
    const category = new Set(
      products.productsData.map((data) => data.category.toLowerCase())
    );
    category.forEach((cat) => {
      prods.push(
        products.productsData.filter((data) => data.category.toLowerCase() === cat)[0]
      );
    });
    return prods;
  };

  const productHandler = (Category) => {
    localStorage.getItem("currentUser")
      ? navigate("productspage/" + Category)
      : navigate("/login", {
          state: { key: "productspage/" + Category },
        });
  };

  useEffect(() => {
    axios
      .get("/products", {
        headers: { Authorization: "Bearer " + localStorage.getItem("auth") },
      })
      .then((result) => {
        setCard({ type: "FETCH_SUCCESS", payload: result.data });
      })
      .catch((error) => {
        console.log(error);
        setCard({ type: "FETCH_FAILURE", error: error?.response?.data.message ?? error.message });
      });

    axios
      .get("/products/slide")
      .then((result) => {
        setSlide({ type: "FETCH_SUCCESS", payload: result.data.rows });
      })
      .catch((error) => {
        setSlide({ type: "FETCH_FAILURE", error: error.message });
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      rightSlideIndexHandler();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide, slide]);

  return (
    <div>
      <div className="slide">
        <button onClick={leftSlideIndexHandler}>&larr;</button>
        <div className="slidedata">
          {slide.productsData.length > 0 && (
            <img src={slide.productsData[currentSlide].slide_path} alt="" />
          )}
        </div>
        <button onClick={rightSlideIndexHandler}>&rarr;</button>
      </div>

      <div className="card-continer">
        <div className="card-header">
          <h2>Categories</h2>
        </div>

        <div className="cards-error">
          {!products.error && products.productsData.length === 0 && <h4>Loading....</h4>}

          {products.error && <h4>{products.error}</h4>}
        </div>

        <div className="cards">
          {!products.error &&
            products.productsData.length > 0 &&
            getOneFromEach().map((data) => {
              return (
                <div
                  className="productSlider"
                  key={data.prod_id}
                  onClick={() => productHandler(data.category)}
                >
                  <div className="prodimg">
                    <img src={data.image_path} alt=""></img>
                  </div>

                  <div className="proddata">
                    <h3>{data.prod_name}</h3>
                    <p>{"starts from " + data.prize}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Body;
