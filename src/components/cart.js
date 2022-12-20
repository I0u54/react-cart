import { useEffect, useState } from "react"
export default function Cart(){
  
    
 
    let [cart,setCart]=useState(localStorage.getItem('cart')!=undefined ? JSON.parse(localStorage.getItem('cart')):[])
    let [productCheck,setProductCheck]=useState({})
    
    let deleteFromCart = (id)=>{
        let newCart = cart.filter(p=>p.idP!==id)
        setCart(newCart)
    }
    let [total,setTotal] = useState(0)
    let increment = (id)=>{
        let updatedCart = cart.map((c)=>{
            if(c.idP==id){
                productCheck.map((p)=>{
                    if(p.id==id){
                        if(p.quantity>c.quantity){
                            let updatedItem ={
                                ...c,
                                quantity:c.quantity+=1
                            }
                            return updatedItem

                        }
                        else{
                            alert('max')
                        }
                    }
                })
               
            }
            return c
        })
        setCart(updatedCart)

    }
    let decrement = (id)=>{
        let updatedCart = cart.map((c)=>{
            if(c.idP==id){
                if(c.quantity>1){
                    let updatedItem ={
                        ...c,
                        quantity:c.quantity-=1
                    }
                    return updatedItem

                }
                else{
                    alert("just delete it !")
                }
               
            }
            return c
        })
        setCart(updatedCart)

    }
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
        let calc = 0
        for(let x of cart){
            calc+=x.quantity * x.prix


        }
         
        setTotal(calc)
        let fetchData = async ()=>{
            let repo = await fetch("http://localhost:7000/products")
            let rep=await repo.json()
            return rep
        }
        fetchData().then((data)=>{
            setProductCheck(data)
           

        })
        
       

    },[cart])
    return(
        <>
            <div class="banner mt-5">
                <h1>#PANIER</h1>
        
            </div>
            {cart.length>0? <div className="container mt-3">
           <table className="table text-center table-borderless" style={{borderBottom:"2px solid lightgray"}}>
            <thead>
                <tr style={{borderTop:" 1px solid lightgray",borderBottom :"1px solid lightgray"}}>
                    <th>Suprimer</th>
                    <th>Image</th>
                    <th>Titre</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((c)=>(
                    <tr>
                        <td>
                            <i className="bi bi-x-circle" style={{fontSize:"25px",cursor:"pointer"}} onClick={()=>(deleteFromCart(c.idP))}></i>
                        </td>
                        <td><img src={require(`./images/${c.image}`)} width="80px"/></td>
                        <td>{c.title}</td>
                        <td>{c.prix} MAD</td>
                        <td><button className="btn" onClick={()=>{decrement(c.idP)}}>-</button>{c.quantity}<button className="btn" onClick={()=>{increment(c.idP)}}>+</button></td>
                        <td>{c.prix * c.quantity} MAD</td>
                    </tr>
                ))}

            </tbody>
           </table>
           <div className="pay">
           <table className="table  w-50 mt-5 ">
                <tbody>
                <tr>
                        <th>Panier Total</th>
                        <td>{total} MAD</td>
                    </tr>
                    <tr>
                        <th>Livraison</th>
                        <td>30 MAD</td>
                    </tr>
                    <tr>
                        <th>Sous-Total</th>
                        <td>{total +30} MAD</td>
                    </tr>
                    <tr>
                        
                    </tr>

                </tbody>
                    
           </table>
         
                    <button className="btn" style={{backgroundColor:"#088178",color:"#fff"}}>Commander</button>
           </div>

          
        </div>:<h1 className="text-center mt-3 ">le panier est vide </h1>}
           
        </>
       
    )
}