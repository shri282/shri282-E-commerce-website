import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import '../body/body.scss';
import { useNavigate } from 'react-router-dom';

const initialState = {
  loading : true,
  cardData : [],
  error : ''
}

const reducer = (prevState,action) => {
  switch(action.type) {
    case 'FETCH_SUCCESS' :
      return {
        loading : false,
        cardData : action.payload,
        error : ''
      }
    case 'FETCH_FAILURE' :
      return {
        loading : false,
        cardData : [],
        error : action.error
      }
    default :
      return prevState;    
  }
}

function Body() {

    const navigate = useNavigate();
    
    const [cards, setCard] = useReducer(reducer,initialState);
    const [slide, setSlide] = useReducer(reducer,initialState);

    const [currentSlide, setcurrentSlide] = useState(0);

    const rightSlideIndexHandler = () => {
  
        if(slide.cardData.length - 1 <= currentSlide) {
          setcurrentSlide(0);
        }else {
          setcurrentSlide(prevdata => {
            return prevdata + 1;
          })
        }   
      
    }; 


    const leftSlideIndexHandler = () => {
      if(currentSlide <= 0) {
        setcurrentSlide(slide.cardData.length - 1);
      }else {
        setcurrentSlide(prevdata => {
          return prevdata - 1;
        })
      }  
    }

    const getOneFromEach = () => {
      const prods = [];
      const category = new Set(cards.cardData.map(data => data.category.toLowerCase()));
      category.forEach(cat => {
        prods.push(cards.cardData.filter(data => data.category.toLowerCase() === cat)[0]);
      })
      return prods;
    }


    const productHandler = (Category) => {
      localStorage.getItem('currentUser') ? navigate('productspage/'+Category) : navigate('/login');
    }

    useEffect(() => {

        axios.get('http://localhost:8080/products').then(result => {
          setCard({ type : 'FETCH_SUCCESS', payload : result.data })
         }).catch(error => {
          setCard({ type : 'FETCH_FAILURE', error : error.message }) 
         })
       
    },[]);


    useEffect(() => {
      axios.get('http://localhost:8080/products/slide').then(result => {
        setSlide({ type : 'FETCH_SUCCESS', payload : result.data.rows })
      }).catch(error => {
        setSlide({ type : 'FETCH_FAILURE', error : error.message })
      })
    },[]);




  return (
    <div>

      <div className='slide'>
            <button onClick={leftSlideIndexHandler}>&larr;</button>
              <div className='slidedata'>
                {
                  slide.cardData.length > 0 && <img src={slide.cardData[currentSlide].slide_path} alt=''></img>
                }
              </div>
            <button onClick={rightSlideIndexHandler}>&rarr;</button>
      </div>


      <div className='cards-error'> 
        {
          !cards.error && cards.cardData.length === 0 && <h4>Loading....</h4> 
        }
        
        {
          cards.error && <h4>{cards.error}</h4>
        }
      </div>

      <div className='card-continer'>
          <div className='card-header'>
            <h2>Categories</h2>
          </div>
          
          <div className='cards'>
            {
              !cards.error && cards.cardData.length > 0 && getOneFromEach().map(data => {
                return <div className='productSlider' key={data.prod_id} onClick={() => productHandler(data.category)}>
                        
                    <div className='prodimg'>
                      <img src={data.image_path} alt=''></img>
                    </div>

                    <div className='proddata'>
                      <h3>{data.prod_name}</h3>
                      <p>{"starts from " +data.prize}</p>
                    </div>

                  </div>
                })
            }
         </div>

      </div>
          
    </div>
  )
}

export default Body