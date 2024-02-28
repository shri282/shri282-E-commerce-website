import React, {useEffect, useState} from 'react'
import Cards from '../../ui-components/cards';
import '../../components/cart/cart.scss';
import axios from '../../api/axios'

function Cart() {

    const [cartData, setcartData] = useState({
        data : [],
        error : null
    });

    useEffect(() => {

       console.log(" in useeffect of cart");


        axios.get('/cart/usercart',{
            params : {
                user_id : JSON.parse(localStorage.getItem('currentUser')).user_id
            }
           }).then(async result => {
               console.log(result);
               const prodIds = result.data.rows.map(data => data.prod_id); 
               axios.get('/products/getbyids',{
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
        

        <div>
       
            {
                !cartData.error && cartData.data.length === 0 && <h4>Loading....</h4> 
            }
            
            {
                cartData.error && <h4>{cartData.error.message}</h4>
            }
      
        </div>

        <div className='card-continer'>
          <div className='card-header'>
          <h1>Cart Products</h1>
          </div>
          
          <div className='cards'>
            {
                !cartData.error && cartData.data.length > 0 && cartData.data.map(data => {
                   return <Cards key={data.prod_id} cardObj = {data} isCart={true}></Cards>
                })
            }
         </div>

      </div>
        
        
    </div>
  )
}

export default Cart