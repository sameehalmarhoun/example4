import { useSelector } from "react-redux";
import { Dash, Plus, Trash } from "react-bootstrap-icons";
import { Image } from 'react-bootstrap';

const CartItem = ({ cart, dispatch, item, updateProductQuantity, handleRemoveProduct }) => {
  const URL = process.env.REACT_APP_BASE_URL;
  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <tr key={item.productId}>
      <td className="px-0">
        <Trash
          className="me-1"
          onClick={() =>
            handleRemoveProduct({
              userId: currentUser.userId,
              cartId: cart.cartId,
              productId: item.productId,
              quantity: item.quantity
            })} />
        <Image src={URL + item.image} style={{ width: "60px" }} />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>
        <Dash size="25px"
          onClick={() =>
            item.quantity > 1 && ({
              quantity: item.quantity - 1,
              cartId: cart.cartId,
              productId: item.productId
            }, dispatch)} />
        {item.quantity}
        <Plus size="25px" onClick={() =>
          item.quantity < 10 ?
            updateProductQuantity({
              userId: currentUser.userId,
              quantity: item.quantity + 1,
              cartId: cart.cartId,
              productId: item.productId
            }, dispatch) :
            alert("max 10 per order")}
        />
      </td>
      <td className="d-none d-md-table-cell">$ {item.price * item.quantity}
      </td>
    </tr >
  )
}

export default CartItem;