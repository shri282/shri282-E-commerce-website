import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../body/body.scss'

function Body() {

    const [cardData,setCards] = useState({
      data : [],
      error : ''
    });

    const [currentSlide, setcurrentSlide] = useState(0);

    const [slideData, setslideData] = useState({
      data : [],
      error : ''
    });


    const rightSlideIndexHandler = () => {
  
        if(slideData.data.length - 1 <= currentSlide) {
          setcurrentSlide(0);
        }else {
          setcurrentSlide(prevdata => {
            return prevdata + 1;
          })
        }   
      
    }; 


    const leftSlideIndexHandler = () => {
      if(currentSlide <= 0) {
        setcurrentSlide(slideData.data.length - 1);
      }else {
        setcurrentSlide(prevdata => {
          return prevdata - 1;
        })
      }  
    }

    useEffect(() => {

        axios.get('http://localhost:8080/products').then(result => {
              console.log("card data fetched successfully : " +result);
              setCards(prevdata => {
                return {
                  ...prevdata,
                  data : result.data
                }
              });
         }).catch(error => {
            console.log("error while fetching : " +error);
            setCards(prevdata => {
              return {
                ...prevdata,
                error : error
              }
            })
         })
       
    },[]);


    useEffect(() => {
      axios.get('http://localhost:8080/products/slide').then(result => {
        console.log(result.data);
        setslideData(prevdata => {
          return {
            data : result.data.rows,
            error : prevdata.error
          }
        });
      }).catch(error => {
        console.log("error while fetching : " +error);
        setslideData(prevdata => {
          return {
            data : prevdata.data,
            error : error
          }
        });
      })
    },[]);




  return (
    <div>

      <div className='slide'>
            <button onClick={leftSlideIndexHandler}>&larr;</button>
              <div className='slidedata'>
                {
                
                  slideData.data.length > 0 && <img src={slideData.data[currentSlide].slide_path} alt=''></img>

                }
              </div>
            <button onClick={rightSlideIndexHandler}>&rarr;</button>
      </div>


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
            <h2>Categories</h2>
          </div>
          
          <div className='cards'>
            {
              !cardData.error && cardData.data.length > 0 && cardData.data.map(data => {
                console.log(data);
                return <div className='productSlider'>
                        
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