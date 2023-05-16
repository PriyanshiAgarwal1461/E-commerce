import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@material-ui/core";

export const CartItem = ({
  setDrawerState,
  drawerState,
  selectedProducts,
  total,
  setSelectedProducts,
}) => {
  const handleCancelClick = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={drawerState}
        onClose={() => setDrawerState(false)}
      >
        <div>
          <div className="cartItems">CartItems</div>
          {selectedProducts.length !== 0 ? (
            <>
              <div className="drawer">
                {selectedProducts.map((item, index) => {
                  return (
                    <>
                      <Card className="drawer_media">
                        <CardMedia
                          component="img"
                          className="drawer_img"
                          image={item.image}
                          alt=""
                        />
                        {/* <Box sx={{ display: "flex", flexDirection: "column" }}> */}
                        <CardContent className="drawer_body">
                          <Typography className="drawer_title">
                            {item.title}
                          </Typography>
                          <Typography>
                            <Button
                              className="drawer_inc"
                              onClick={() => {
                                const updatedProducts = [...selectedProducts];
                                updatedProducts[index].quantity =
                                  parseInt(updatedProducts[index].quantity) - 1;
                                setSelectedProducts(updatedProducts);
                              }}
                            >
                              -
                            </Button>
                            <span className="drawer_item_val">
                              {item.quantity}
                            </span>
                            <Button
                              className="drawer_inc"
                              onClick={() => {
                                const updatedProducts = [...selectedProducts];
                                updatedProducts[index].quantity =
                                  parseInt(updatedProducts[index].quantity) + 1;
                                setSelectedProducts(updatedProducts);
                              }}
                            >
                              +
                            </Button>
                          </Typography>
                          <Typography className="drawer_price">
                            &#8377; {item.price * item.quantity}
                          </Typography>
                          <Typography className="drawer_taxes">
                            (Inclusive of all taxes)
                          </Typography>
                        </CardContent>
                        <CardActions className="drawer-action">
                          <Button
                            className="drawer_delete_btn"
                            onClick={() => handleCancelClick(index)}
                          >
                            <DeleteIcon />
                          </Button>
                        </CardActions>

                        {/* </Box> */}
                      </Card>
                    </>
                  );
                })}
              </div>
              <div className="total_cost">Total Amount: &#8377;{total}</div>
            </>
          ) : (
            <div className="no_item_added">No Item Added!!!</div>
          )}
        </div>
      </SwipeableDrawer>
    </>
  );
};
