import React, { useEffect, useReducer, useState } from 'react'
import '../body/body.scss';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'


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

    const [currentSlide, setCurrentSlide] = useState(0);

    const rightSlideIndexHandler = () => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slide.cardData.length);
    }; 


    const leftSlideIndexHandler = () => { 
      setCurrentSlide(prevSlide => prevSlide === 0 ? slide.cardData.length - 1 : prevSlide - 1);
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

        axios.get('/products').then(result => {
          setCard({ type : 'FETCH_SUCCESS', payload : result.data })
         }).catch(error => {
          setCard({ type : 'FETCH_FAILURE', error : error.message }) 
         })
       
    },[]);


    useEffect(() => {
      axios.get('/products/slide').then(result => {
        setSlide({ type : 'FETCH_SUCCESS', payload : result.data.rows })
      }).catch(error => {
        setSlide({ type : 'FETCH_FAILURE', error : error.message })
      })
    },[]);


    useEffect(() => {
   
      const timer = setTimeout(() => {
          rightSlideIndexHandler();
        },2000);

      return () => {
        clearTimeout(timer);
      }
    },[currentSlide,slide]);

    
  return (
    <div>

      <div className='slide'>
            <button onClick={leftSlideIndexHandler}>&larr;</button>
              <div className='slidedata'>
                {
                  slide.cardData.length > 0 && (
                    <img src={slide.cardData[currentSlide].slide_path} alt='' />
                  )                
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