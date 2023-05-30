import React, { useEffect, useState } from "react";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Cookies from "js-cookie";
import { Search, ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import { mobile } from "../responsive";
import icon from "../assets/icon_book.png";
import CustomNavLink from "./CustomNavLink";

const Container = styled.div`
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-right: 25px;
`;
const Middle = styled.div`
  flex: 1;
  max-width: 500px
`
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 8px;
  height: 50%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 9;
  ${mobile({ width: "50px" })}

  &:focus {
    outline: none;
  }
`;

const Brand = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;

const MenuPopup = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  z-index: 1;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: none;
  flex-direction: column;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}

  &:hover ${MenuPopup} {
    display: block;
  }
`;

const SearchButton = styled.div`

`;

const Navbar = () => {
  const isLoggedIn = Cookies.get("authToken") || false;

  const MenuButton = styled.div`
    width: 150px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 5px;
  `;

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchMatch = useMatch("/search/:title");
  useEffect(() => {
    if (!searchMatch) setQuery("");
  }, [searchMatch]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <NavLink to={"/"} style={{ height: "100%" }}>
            <img src={icon} alt="" height="100%" style={{marginRight: "15px"}}/>
          </NavLink>
          <NavLink to={"/"} style={{ textDecoration: "none" }}>
            <Brand>Book Store</Brand>
          </NavLink>
        </Left>
        <Middle>
          <SearchContainer>
              <Input
                placeholder="Search"
                type="text"
                value={query}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    document.getElementById("btn-search").click();
                  }
                }}
                onChange={(e) => setQuery(e.target.value)}
              />
              <SearchButton
                onClick={() => navigate(`/search/${query}`, { replace: true })}
                id="btn-search"
              >
                <Search style={{ color: "gray", fontSize: 20}} />
              </SearchButton>
            </SearchContainer>
        </Middle>
        <Right>
          <CustomNavLink>
            <MenuItem>
              {/* <Badge badgeContent={4} color="error"> */}
              <NotificationsOutlinedIcon color="action" />
              {/* </Badge> */}
              <span>Thông báo</span>
            </MenuItem>
          </CustomNavLink>
          <CustomNavLink to={"/cart"}>
            <MenuItem>
              {/* <Badge badgeContent={4} color="primary"> */}
              <ShoppingCartCheckoutOutlined color="action" />
              {/* </Badge> */}
              <span>Giỏ hàng</span>
            </MenuItem>
          </CustomNavLink>
          {isLoggedIn ? (
            <CustomNavLink to={"/profile"}>
              <MenuItem>
                <PersonOutlineOutlinedIcon color="action"/>
                <span>Tài khoản</span>
              </MenuItem>
            </CustomNavLink>
          ) : (
            <>
              <MenuItem>
                <PersonOutlineOutlinedIcon />
                <span>Tài khoản</span>
                <MenuPopup>
                  <CustomNavLink to={"/login"}>
                    <MenuButton style={{ backgroundColor: "#153f4f" }}>
                      Đăng nhập
                    </MenuButton>
                  </CustomNavLink>
                  <CustomNavLink to={"/register"}>
                    <MenuButton style={{ backgroundColor: "#e67926" }}>
                      Đăng ký
                    </MenuButton>
                  </CustomNavLink>
                </MenuPopup>
              </MenuItem>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
