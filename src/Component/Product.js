import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";
import { CartItem } from "./CartItem";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Grid,
  TextField,
} from "@material-ui/core";

export const Product = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noOfItems, setNoOfItems] = useState(1);
  const [drawerState, setDrawerState] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    const productData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products/");
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    productData();
  }, []);
  useEffect(() => {
    let subTotal = 0;
    let subTotalItem = 0;

    selectedProducts.forEach((item) => {
      subTotal =
        parseInt(subTotal) + parseInt(item.price) * parseInt(item.quantity);
      subTotalItem = parseInt(subTotalItem) + parseInt(item.quantity);
    });
    setTotal(subTotal);
    setTotalItem(subTotalItem);
  }, [selectedProducts]);
  if (isLoading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center" }}>Error: {error.message}</div>;
  }
  if (!data) {
    return null;
  }

  const handleChange = (event) => {
    if (event.target.value >= 1) {
      setNoOfItems(event.target.value);
    }
  };
  const handleAddToCart = (item) => {
    const index = selectedProducts.findIndex((x) => x.title === item.title);
    if (index !== -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index].quantity =
        parseInt(updatedProducts[index].quantity) + parseInt(noOfItems);
      setSelectedProducts(updatedProducts);
    } else {
      const newProduct = {
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: noOfItems,
      };
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  };

  return (
    <>
      <div className="home-page">
        <Button onClick={() => setDrawerState(true)} className="cart-btn">
          <ShoppingCartIcon fontSize="large" />
          <div className="item_no">{totalItem}</div>
        </Button>
      </div>
      <Grid container className="contain_products">
        {data.map((item, index) => {
          return (
            <Grid className="productContainer">
              <Card style={{ width: 300, height: 500 }}>
                <CardMedia
                  component="img"
                  alt=""
                  height="250px"
                  width="200px"
                  image={item.image}
                />
                <CardContent>
                  <Typography className="item_title">{item.title}</Typography>

                  <Typography className="item_price">
                    &#8377;{item.price} <span className="MRP">MRP</span>
                  </Typography>
                  <Typography className="taxes">
                    (Inclusive of all taxes)
                  </Typography>
                </CardContent>
                <CardActions>
                  <span className="qty">Qty</span>
                  <TextField
                    endIcon={<ShoppingCartOutlinedIcon />}
                    value={noOfItems}
                    autoFocus
                    variant="outlined"
                    type="number"
                    className="qty-no"
                    inputProps={{ min: 1 }}
                    onChange={(e) => handleChange(e)}
                  ></TextField>
                  <Button
                    startIcon={<ShoppingCartOutlinedIcon />}
                    className="ADD"
                    onClick={() => handleAddToCart(item)}
                  >
                    ADD
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <CartItem
        setDrawerState={setDrawerState}
        drawerState={drawerState}
        selectedProducts={selectedProducts}
        total={total}
        setSelectedProducts={setSelectedProducts}
      />
    </>
  );
};
