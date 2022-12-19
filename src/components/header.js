import { useEffect, useState } from "react"
import { Outlet, Link } from "react-router-dom";

export default function Header(){
    let [count,setCount]=useState(0)

    useEffect(()=>{
        setInterval(function(){
            if(localStorage.getItem('cart')!==undefined){
                setCount(JSON.parse(localStorage.getItem('cart')).length)
            }

        },100)
       
    })
       
   
    return(
        <>
        
            <header> 
                <Link to='/'><h1>THTHLO</h1></Link>
                
                <Link to="/cart" className="sh"><i className="bi bi-cart" ></i> <span className="badge" style={{backgroundColor:"#088178"}}>{count}</span></Link>
            </header>
           
        </>
    )

}