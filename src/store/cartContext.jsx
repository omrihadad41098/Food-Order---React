    import { createContext, useReducer } from "react";

    const cartContext = createContext({
        items: [],
        addItem: (item) => {},
        removeItem: (id) =>{}
    });

    function cartReducer(state, action){
        if(action.type === 'ADD_ITEM'){
            const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
            const updatedItems = [...state.items];
            if (existingItemIndex >-1)
                {
                    const existingItem = state.items[existingItemIndex];
                    const updatedItem = {...existingItem, quantity: existingItem.quantity+1}
                    updatedItems[existingItemIndex]= updatedItem
                    
                }
            else
                updatedItems.push({...action.item, quantity : 1})
            return {...state , items : updatedItems};
        }
        
        if(action.type === 'REMOVE_ITEM')
        {
            const exisitingItemIndex= state.items.findIndex((item)=> item.id===action.id);
            const existingCartItem = state.items[exisitingItemIndex];
            const updatedItems=[...state.items];
            if(existingCartItem.quantity===1){
                updatedItems.splice(exisitingItemIndex,1);
            }
            else{
                const updateItem={...existingCartItem, quantity: existingCartItem.quantity-1}
                updatedItems[exisitingItemIndex]=updateItem;
            }
            return {...state, items:updatedItems}
        }
        return state
    }
    export  function CartContextProvider({children}){
        const [cart, dispatchCartAction ]=useReducer(cartReducer, {items: []});
        
        function addItem(item) {
            dispatchCartAction({type: 'ADD_ITEM' , item:item})
        }
        function removeItem(id) {
            dispatchCartAction({type:'REMOVE_ITEM' , id: id})
        }
        const cartContextValue={
            items:cart.items
            ,addItem,
            removeItem};
        return <cartContext.Provider value ={cartContextValue}>{children}</cartContext.Provider>
    }

    export default cartContext;