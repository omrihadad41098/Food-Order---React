import { useContext } from "react";
import cartContext from "../store/cartContext.jsx";
import Modal from "./UI/Modal.jsx";
import { currencyFormatter } from "../utill/formatting";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";

const  requestConfig= {
    method: 'POST', 
    headers:  {
        'Content-Type' : 'application/json'
    }
}

export default function Checkout (){


    const cartCtx=useContext(cartContext);
    const userProgressCtx=useContext(UserProgressContext);
    useHttp('http://localhost:3000/orders', requestConfig );
    const cartTotal= cartCtx.items.reduce((totalPrice,item)=> totalPrice+item.price * item.quantity ,0)
    function handleHideCheckout(){
        userProgressCtx.hideCheckout();
    }
    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        fetch ("http://localhost:3000/orders", {
            method: 'POST',
            headers: { 
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
            }
        )
    }
    return (
        <Modal open ={userProgressCtx.progress==='checkout'} onClose={handleHideCheckout}>
            <form onSubmit ={handleSubmit}>
                <h2>CheckOut</h2>
                <p>Total Ammount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type='text' id="name"></Input>
                <Input label="E-mail" type="email" id="email"></Input>
                <Input label="Street" type="text" id="street"></Input>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"></Input>
                    <Input label="City" type="text" id="city"></Input>
                </div>
                <p className="modal-actions">
                    <Button type="button"  onClick={handleHideCheckout} textOnly> Close</Button>
                    <Button > Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
    
}