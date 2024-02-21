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

  const cartHandler = () => {

    if(!localStorage.getItem('currentUser')) {
      navigate('/login');
      return;
    }

    axios.post('http://localhost:8080/cart/add',{
      prod_id : props.cardObj.prod_id,
      user_id : JSON.parse(localStorage.getItem('currentUser')).user_id
    }).then(res => {
      alert("product successfully added to cart " +res.data);
    }).catch(err => {
      alert("in error " +err.message);
    })

  }

  const shopHandler = () => {
    if(!localStorage.getItem('currentUser')) {
      navigate('/login');
      return;
    }
    
    navigate('/buyproducts');
  }

  return (
    <Card sx={{ maxWidth: 325, maxHeight : 950 }}>
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
      <Typography gutterBottom variant="h5" component="div">
        {props.cardObj.prod_name}
      </Typography>
      <Typography sx={{width : "180px", textAlign:"justify",wordSpacing:"0px",paddingBottom:"10px" }} variant="body2" color="text.secondary">
       {props.cardObj.description.substring(0,100)}
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
      <Button size="small" onClick={shopHandler}>Shop</Button>
      {
        !props.isCart && <Button size="small" onClick={cartHandler}>Add To Cart</Button>
      }
      
    </CardActions>
  </Card>
  )
}

export default Cards