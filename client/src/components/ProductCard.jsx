import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <>

            <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '18rem' }}>
                <Card.Img src={product.image}  style={{height:"500px",objectFit:"cover"}}/>
                <Card.Body>
                    <Card.Title><text style={{fontFamily:'roboto',color:'rgb(255,193,7)',fontWeight:'bold'}}>Title: </text><text style={{fontFamily:'monospace'}}>{product.title}</text></Card.Title>
                    <Card.Title><text style={{fontFamily:'robo',fontWeight:'bold',color:'rgb(255,193,7)'}}>Price: </text><text style={{fontFamily:'monospace'}}>₹{product.price}</text></Card.Title>
                    <Card.Text>
                    <text style={{fontFamily:'roboto',fontWeight:'bold'}}>Description: </text><text style={{fontFamily:'monospace'}}>{product.description.slice(0,10)}...</text>
                    </Card.Text>
                 
                    <Link to={`/product/${product.id}`}>
                        <Button className='btn btn-light border-warning rounded'>Detail</Button>
                    </Link>
                </Card.Body>

                
               
            </Card>
       
           
        </>
    )
}

export default ProductCard
