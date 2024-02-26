import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Cards(props) {

  const navigate = useNavigate();

  const addCartHandler = () => {

    if(!localStorage.getItem('currentUser')) {
      navigate('/login');
      return;
    }

    axios.post('http://localhost:8080/cart/add',{
      prod_id : props.cardObj.prod_id,
      user_id : JSON.parse(localStorage.getItem('currentUser')).user_id
    }).then(res => {
      alert("product successfully added to cart " +res.data);
      window.location.reload();
    }).catch(err => {
      console.log(err);
      alert(err.response.data);
    })

  }


  const removeCartHandler = () => {

    if(!localStorage.getItem('currentUser')) {
      navigate('/login');
      return;
    }

    axios.delete('http://localhost:8080/cart/delete',{
      params : {
        user_id : JSON.parse(localStorage.getItem('currentUser')).user_id,
        prod_id : props.cardObj.prod_id
      }
    }).then(result => {
       alert('card item removed successfully ',JSON.stringify(result));
       window.location.reload();
    }).catch(error => {
       alert('error while removing cart ',error.message);
    });
    

  }

  const shopHandler = (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
      return;
    }else if(!localStorage.getItem('currentUser')) {
      navigate('/login');
      return;
    }
   
    navigate('/buyproducts');

  }



  return (
    <Card sx={{ maxWidth: 325, maxHeight : 950, margin: "10px", minWidth:200, cursor: 'pointer' }} onClick={shopHandler}>
      <CardMedia
        sx={{  height: 290,
          width: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          }}
        image= {props.cardObj.image_path.replace(/\\/g, '/')}
        title="green iguana"
      />
      <CardContent>
          {console.log(props)}
        <Typography gutterBottom variant="h6" component="div">
          {props.cardObj.prod_name}
        </Typography>
        <div style={{textAlign:"left"}}>
              <Typography variant="body2" color="text.secondary">
              <span style={{fontSize:"bolder",fontWeight:"bold"}}>Prize :</span>  {props.cardObj.prize}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              <span style={{fontSize:"bolder",fontWeight:"bold"}}>Availablity :</span> {props.cardObj.availability}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              <span style={{fontSize:"bolder",fontWeight:"bold"}}>Offer :</span> {props.cardObj.offer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              <span style={{fontSize:"bolder",fontWeight:"bold"}}>Stock :</span> {props.cardObj.stock}
              </Typography>
        </div>
        
      </CardContent>
      <CardActions>
        {
          !props.isCart && <Button sx={{width:"100%"}} variant="contained" size="small" onClick={addCartHandler}>Add To Cart</Button>
        }
        {
          props.isCart && <Button sx={{width:"100%"}} variant="contained" size="small" onClick={removeCartHandler}>Remove Cart</Button>
        }
      </CardActions>
  </Card>
  )
}

export default Cards