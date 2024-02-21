import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Cards from '../../ui-components/cards';

function Cart() {

    const [cartData, setcartData] = useState({
        data : [],
        error : null
    });

    useEffect(() => {

       console.log(" in useeffect of cart");

       setTimeout(() => {

        axios.get('http://localhost:8080/cart/usercart',{
            params : {
                user_id : JSON.parse(localStorage.getItem('currentUser')).user_id
            }
           }).then(async result => {
               console.log(result);
               const prodIds = result.data.rows.map(data => data.prod_id);
               try {
                  const products = await getProductsById(prodIds);
                  console.log(products.data.rows);
                  setcartData(prevData => {
                    return {
                        ...prevData,
                        data : products.data.rows
                    }
                  });
               }catch (error) {
                    setcartData(prevData => {
                        return {
                            ...prevData,
                            error : error.message
                        }
                    });
               }
           })

       },2000);

       

    },[])

    const getProductsById = async (prodIds) => {
       const prods = await axios.get('http://localhost:8080/products/getbyids',{
        params : {
            prodIds : prodIds
        }
       });

       return prods;
    }


  return (
    <div>
        <h1>Cart Products</h1>

        <div>
       
            {
                !cartData.error && cartData.data.length === 0 && <h4>Loading....</h4> 
            }
            
            {
                cartData.error && <h4>{cartData.error.message}</h4>
            }
      
        </div>


        <div className='cards'>
            {
                !cartData.error && cartData.data.map(data => {
                    return <Cards key={data.prod_id} cardObj = {data} isCart={true}></Cards>
                })
            }
        </div>
        
        
    </div>
  )
}

export default Cart