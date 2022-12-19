import { useEffect, useState } from "react"
import { json } from "react-router-dom"


export default function Shop(){
    let [data,setData] = useState([])
    let [loading,setLoading]=useState(true)
    let found = false
   
    let [cart,setCart]=useState(localStorage.getItem('cart')!=undefined ? JSON.parse(localStorage.getItem('cart')):[])
    


    
   
   
    
    useEffect(()=>{
        let fetchData = async ()=>{
            let repo = await fetch("http://localhost:7000/products")
            let rep=await repo.json()
            return rep
        }
        fetchData().then((data)=>{
            setData(data)

           
            setLoading(false)
        })
       localStorage.setItem("cart",JSON.stringify(cart))
       
        
   
    },[cart])
    let addToCart=(id)=>{
        let crt = document.querySelector('.sh')
        crt.classList.add('shake')
        setTimeout(function(){
            crt.classList.remove("shake")

        },1500)
        
       
        
         
        for(let i in data){
            if(data[i].id==id){
              if(cart.length>0){

                for(let x of cart){
                    found=false
                    
                    if (x.idP==id){
                        found=true
                        if(x.quantity<data[i].quantity){
                            
                            let obj={idP:x.idP,title:x.title,quantity:x.quantity+1,prix:x.prix,image:x.image}
                            let filterC=cart.filter(f=>f.idP!==id)
                          
                            
      
                            setCart(filterC)
                          setCart(current=>[...current,obj])
      

                        }
                        else{
                            alert('le stock est limite ')
                            
                        }
                      
                        break
                    }

                }
                if(!found){
                   
                    setCart(current=>[...current,{idP:data[i].id,title:data[i].title,quantity:1,prix:data[i].prix,image:data[i].image}])
                   
                }
                
              
              }else{

                setCart(current=>[...current,{idP:data[i].id,title:data[i].title,quantity:1,prix:data[i].prix,image:data[i].image}])
              }
                  
                       

              
               break
            }
           
        }
     
        
        


    }
    
    return(
      
        <div className="container mt-5 pt-4">
         
            {!loading? <div className="products">
            {data.map((d)=>(
               
                <div className="product">
                    <img src={require(`./images/${d.image}`)} alt="" />
                    <div className="text">
                        <h2>{d.title}</h2>
                        <h5>{d.quantity} en stock</h5>
                        
                        <h4>{d.prix} MAD</h4>
                        <span className="icon" onClick={()=>{addToCart(d.id)}}><i className="bi bi-cart"></i></span>
                        <div className="stars">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
                
           
            ))}
            </div>:<h1>Loading....</h1>}
           
        </div>
    )
}
// npx json-server --watch data/cart.json --port 8000