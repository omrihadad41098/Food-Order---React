import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useContext } from "react";
import cartContext from "../store/cartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Header () {
    const cartCtx= useContext(cartContext);
    const userProgressCtx= useContext(UserProgressContext)
    function handleShowCart(){
        userProgressCtx.showCart()
    }
    const totalCartItems = cartCtx.items.reduce((totalquantity, item) =>{return totalquantity+item.quantity} , 0);
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="a restaurant"></img>
                <h1>React Food</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}> cart({totalCartItems})</Button>
            </nav>
        </header>
    );
}