import { useEffect, useState } from "react";
import ItemCount from "../ItemCount";
import ItemList from "../ItemList";
import styles from "./ItemListContainer.module.css"
import { useParams } from "react-router-dom";

function ItemListContainer({ greeting }) {

  const onAdd=(cantidad)=>{
    alert ("agregaste " + cantidad + " productos al carrito");
  }
  const [items, setItems] = useState([])
  const{id}=useParams()  
  const getProducts =async()=> {
        const result = await fetch("https://6499986479fbe9bcf83f923d.mockapi.io/ProyectoReact");
        const data= await result.json();
        setItems(data);
      }
  const getFilteredProducts=async()=>{
        const result=await fetch("https://6499986479fbe9bcf83f923d.mockapi.io/ProyectoReact");
        const data=await result.json();
        setItems(data.filter((prod)=>prod.category===id));
      }
useEffect(() => {
  setTimeout(() =>  {
    if(id){
      getFilteredProducts()
    }else{
    getProducts(); 
  }
  }, 2000);
}, [id]);

  

  return (
    <>
    <h1 className={styles.greeting}>{greeting}</h1>
    <ItemCount
    stock={10}
    initial={1}
    onAdd={onAdd}
    />
    <ItemList items={items}/>
  
    </>
  )
}


export default ItemListContainer;
