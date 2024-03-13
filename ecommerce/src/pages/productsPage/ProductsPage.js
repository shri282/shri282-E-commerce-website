import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../../ui-components/cards';
import axios from '../../api/axios';

function ProductsPage() {
    const {category} = useParams();

    const [cardData,setCards] = useState({
        data : [],
        error : ''
      });


    useEffect(() => {

        axios.get('/products/getbycategory',{
            params : {
                category : category
            }
        }).then(result => {
              setCards(prevdata => {
                return {
                  ...prevdata,
                  data : result.data
                }
              });
         }).catch(error => {
            setCards(prevdata => {
              return {
                ...prevdata,
                error : error
              }
            })
         })
       
    },[category]);


  return (
    <div>
      
      <div className='cards-error'> 
        {
          !cardData.error && cardData.data.length === 0 && <h4>Loading....</h4> 
        }
        
        {
          cardData.error && <h4>{cardData.error.message}</h4>
        }
      </div>

      <div className='card-continer'>

          <div className='card-header'>
            <h2>{category}</h2>
          </div>
          
          <div className='cards'>
            {
              !cardData.error && cardData.data.length > 0 && cardData.data.map(data => {
                console.log(data);
                return <Cards cardObj = {data} isCart={false}></Cards>
                })
            }
         </div>

      </div>

    </div>
  )
}

export default ProductsPage;