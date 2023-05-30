import styled from "styled-components";
import { colors, endpoint } from "../data";
import iconCategory from "../assets/icon_category.png";
import CustomNavLink from "./CustomNavLink";
import Cookies from "js-cookie";

const Container = styled.div`
  margin: 15px;
  width: 20%;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  border-radius: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  height: 100%;
  z-index: 2;
`;

const ProductName = styled.div`
  text-transform: capitalize;
  font-weight: bold;
  font-size: 15pt;
  text-align: center;
  color: ${colors.color2};
  margin: 7px 0px;
  max-height: 25px;
  overflow: hidden;
`;

export const CartButton = styled.div`
  z-index:100;
  border: 0;
  border-radius: 50%;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  border-radius: 20px;
  margin: 5px 0px;
  width: 40px;
  height:40px;
  padding 5px;

  &:not([disabled]):focus {
    box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.5),
      -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5),
      0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);
  }

  &:not([disabled]):hover {
    box-shadow: 0 0 0.01rem rgba(0, 0, 0, 0.5),
      -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.1),
      0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.1);
  }
`;

const Price = styled.p`
  font-weight: 200;
  font-size: 25px;
  padding: 10px 0px;
  margin-right: 10px;
  color: ${colors.color1};
`;
const ProductItem = ({ item }) => {
  const data = {
    book_id: Number(item.id),
    quantity: 1,
  };

  const handleAddToCart = () => {
    fetch(`${endpoint}/user/cart`, {
      method: "POST",
      headers: {
        authorization: Cookies.get("authToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <CustomNavLink to={`/books/${item.id}`} width={"100%"} height={"60%"}>
        <ImageWrapper>
          <Image src={item.image} />
        </ImageWrapper>
      </CustomNavLink>
      <CustomNavLink to={`/books/${item.id}`}>
        <ProductName>{item.title}</ProductName>
      </CustomNavLink>
      <div style={{
        display:"flex"
      }}>
        <Price>{Number(item.price).toLocaleString()} VND</Price>
        <CartButton onClick={handleAddToCart}>
          <div style={{
            backgroundImage:`url('https://cdn-icons-png.flaticon.com/512/10351/10351317.png')`,
            width:'90%',
            height:'90%',
            backgroundSize:'contain',
            backgroundRepeatL:'no-repeat',
            margin:'auto'
            }}></div>
        </CartButton>
      </div>
    </Container>
  );
};

export default ProductItem;
