import React, { useEffect, useRef, useState } from "react";
import "./header.scss";
import { Button, Fab } from "@mui/material";
import SelectUi from "../../ui-components/select";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function Header() {
  const [state, selectHandler] = useState("All Categories");

  const navigate = useNavigate();

  const [cartTotal, setCartTotal] = useState(0);

  const accRef = useRef(null);

  const showDropDown = () => {
    accRef.current.style.display =
      accRef.current.style.display === "block" ? "none" : "block";
  };

  const onLogoutDropDown = () => {
    accRef.current.style.display =
      accRef.current.style.display === "block" ? "none" : "block";
    localStorage.clear();
    window.location.href = "/";
  };

  const navStyle = ({ isActive }) => {
    return {
      fondWeight: isActive ? "bold" : "normal",
      color: isActive ? "red" : "black",
    };
  };

  const cartHandler = () => {
    navigate("cart");
  };

  useEffect(() => {
    axios
      .get("/cart/usercart", {
        params: {
          user_id: localStorage.getItem("currentUser")
            ? JSON.parse(localStorage.getItem("currentUser")).user_id
            : 0,
        },
      })
      .then((result) => {
        setCartTotal(result.data.rows.length);
      })
      .catch((error) => {
        console.log("something went wrong");
      });
  }, []);

  return (
    <div className="header">
      <div className="logo">
        <NavLink to={"/"}>
          <img src="\logo3.png" alt=""></img>
        </NavLink>
      </div>

      <div className="search">
        <SelectUi
          age={state}
          handleChange={(event) => selectHandler(event.target.value)}
        ></SelectUi>
        <input type="text" />
        <Button variant="contained">Search</Button>
      </div>

      <div className="others">
        <div>
          {localStorage.getItem("currentUser") && (
            <div className="loggedin">
              <div>
                <Fab
                  onClick={showDropDown}
                  className="acco"
                  sx={{ m: 0, minWidth: 20, backgroundColor: "gray" }}
                  color="primary"
                  aria-label="add"
                >
                  <img
                    src="/user.png"
                    className="dropbtn"
                    style={{ width: "20px" }}
                    alt=""
                  ></img>
                </Fab>
                <div ref={accRef} className="dropdown-content">
                  <NavLink
                    onClick={showDropDown}
                    style={navStyle}
                    to="/myaccount"
                  >
                    My Account
                  </NavLink>
                  <NavLink
                    onClick={showDropDown}
                    style={navStyle}
                    to="/myorders"
                  >
                    My Orders
                  </NavLink>
                  <NavLink
                    onClick={showDropDown}
                    style={navStyle}
                    to="/settings"
                  >
                    Settings
                  </NavLink>
                  <NavLink onClick={onLogoutDropDown}>Logout</NavLink>
                </div>
              </div>

              <div>
                <h4 className="account">
                  {"Hii " +
                    JSON.parse(localStorage.getItem("currentUser")).name}
                </h4>
              </div>
              <Fab
                className="acco"
                sx={{ m: 1, minWidth: 10, backgroundColor: "gray" }}
                onClick={cartHandler}
                color="primary"
                aria-label="add"
              >
                <img
                  src="/shopping-cart.png"
                  style={{ width: "20px" }}
                  alt=""
                ></img>
                <h4
                  style={{
                    position: "absolute",
                    top: "-18px",
                    right: "-8px",
                    backgroundColor: "chocolate",
                    borderRadius: "50%",
                    padding: "3px",
                    height: "20px",
                    width: "20px",
                  }}
                >
                  {cartTotal > 10 ? 10 + "+" : cartTotal}
                </h4>
              </Fab>
              <div>
                <h4 className="account">My Cart</h4>
                <h4>$ 0.00</h4>
              </div>
            </div>
          )}
        </div>

        <div>
          {!localStorage.getItem("currentUser") && (
            <div className="loggedout">
              <div>
                <NavLink to="/login">Login</NavLink>
              </div>
              <div>
                <NavLink to="/register">Register</NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
