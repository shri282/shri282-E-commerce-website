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


        axios.get('http://localhost:8080/cart/usercart',{
            params : {
                user_id : JSON.parse(localStorage.getItem('currentUser')).user_id
            }
           }).then(async result => {
               console.log(result);
               const prodIds = result.data.rows.map(data => data.prod_id); 
               axios.get('http://localhost:8080/products/getbyids',{
                    params : {
                        prodIds : JSON.stringify(prodIds)
                    }
                }).then(result => {
                    console.log("in cart result  " ,result.data);
                    setcartData(prevData => {
                        return {
                            ...prevData,
                            data : result.data.rows
                        }
                    });
                }).catch(error => {
                    console.log("in cart error  " ,error);
                    setcartData(prevData => {
                        return {
                            ...prevData,
                            error : error.message
                        }
                    });
                })

           }).catch(error => {
            setcartData(prevData => {
                            return {
                                ...prevData,
                                error : error.message
                            }
                        });
           })

    },[])



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