import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/cartContext.jsx";
import  { UserProgressContextProvide } from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
function App() {
  return (
    <>
    <UserProgressContextProvide>
      <CartContextProvider>
      <Header/>
      <Meals/>
      <Cart/>
      <Checkout/>
      </CartContextProvider>
      </UserProgressContextProvide>
    </>
  );
}

export default App;
