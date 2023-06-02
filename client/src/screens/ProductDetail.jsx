import React, { useEffect, useState } from 'react'
import {Card, Button, Container, Form, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import axios from 'axios';
import moment from 'moment';

const ProductDetail = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [productDescription, setProductDescription] = useState('')
    const [published, setPublished] = useState(true)
    const [productImage, setProductImage] = useState('')


    // review rating  description
    const [reviews, setReviews] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [stocktype, setStocktype] = useState("")
    const [date,setDate]=useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {

        const getSingleProductData = async () => {
            const { data } = await axios.get(`/api/products/getProductReviews/${id}`)
            console.log(data)

            setTitle(data.title)
            setPrice(data.price)
            setProductDescription(data.description)
            setPublished(data.published)
            setProductImage(data.image)

            // for reviews
            setReviews(data.review)


        }
        getSingleProductData()

    },[id])



    // handling Delete
    const handleDelete = async (id) => {
        await axios.delete(`/api/products/${id}`)
        history.push('/')
    }

    // to add review

    const addReviewHandler = async (e) => {

        e.preventDefault()

        let review = {
            product_id: id,
            quantity: quantity,
            stocktype:stocktype,
            date:date,
            description: description
            
        }

        await axios.post(`/api/products/addReview/${id}`, review)

        history.push('/')
    }
    

    return (
        <>
        <Container className="mt-10 p-4 ">
        <div className="row container align-items-center  rounded " style={{backgroundColor:"#fcfcfc",boxShadow:"2px 2px 5px 5px #454444",marginBottom:"20px"}} >
                    <div className='col-lg-4'><button type="button" class="btn btn-warning text-white  "><Link className="text-white" to="/"  style={{textDecoration:"none"}} >Back</Link></button> </div>
                    <div className='col-lg-4 align-items-center' style={{justifyContent:"center"}}> <h1 className="text-center" style={{fontFamily:'roboto',color:'#000000'}}>Product Details</h1></div>
                    <div className='col-lg-4'></div>
        </div>
        <Row  >
            <Col md={8} lg={8} sm={8}>
                <Card className='shadow-lg m-3 p-2 rounded' style={{backgroundColor:'#fffafa'}}>
                        <Card.Img src={`http://localhost:3000/${productImage}`} fluid  style={{height:"500px",objectFit:"contain"}}/>
                        <Card.Body>
                            <Card.Title><text style={{fontFamily:'roboto',fontweight:'bold',color:'black'}}>Title: </text><text style={{color:'black',fontweight:'200',fontFamily:'monospace'}}>{title}</text></Card.Title>
                            <Card.Title className="text-black"><text style={{fontFamily:'roboto',fontweight:'bold',color:'black'}}>Price: </text><text style={{color:'black',fontweight:'200',fontFamily:'monospace'}}>₹{price}</text></Card.Title>
                            <Card.Title >
                                <text style={{fontFamily:'roboto',fontweight:'bold',color:'black'}}>Description: </text><small style={{color:'black',fontweight:'200',fontFamily:'monospace'}}>{productDescription}</small>
                            </Card.Title>
                            <Card.Title >
                            <text style={{fontFamily:'roboto',fontweight:'bold',color:'black'}}> Published: </text>{published ? (<small style={{color:'black',fontweight:'200',fontFamily:'monospace'}}>True</small>) : (<small style={{color:'black',fontweight:'200',fontFamily:'monospace'}}>false</small>)}
                            </Card.Title>
                        <br />

                        <div className='container bg-light rounded'>
                            <Link to={`/product/edit/${id}`}>
                                <Button className='btn btn-light border-warning'>Edit</Button>
                            </Link>
                            
                            <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button> 
                        </div>
                    </Card.Body>        
                </Card>
            </Col>


                <Col md={4} lg={4} sm={4}>

                    <h2 className='text-center' style={{fontFamily:'monospace',fontweight:'bold'}}>Stock Entry</h2>
                    <hr />

                        <Form onSubmit={addReviewHandler}>
                            <Form.Group className="mb-3" controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="stocktype">

                                <Form.Label>Stock Type</Form.Label>

                         

                                <Form.Select value={stocktype} onChange={(e) => setStocktype(e.target.value)} >

                                    <option disabled>Select Stock Update Type</option>

                                    <option value="Newly Purchased">Newly Purchased</option>

                                    <option value="Current Stock">Current Stock</option>

                                </Form.Select>

 

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Pick Date</Form.Label>
                                <Form.Control
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                        type='date'
                                    />
                            </Form.Group>

                            

                        

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Stock info</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                    />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Add Entry
                            </Button>
                        </Form>
                         <br />

                        <h5 style={{fontFamily:'cursive',color:'black'}}>Product Stock</h5>
                        <hr />

                        {reviews.length > 0 ? (
                            reviews.map(review => {
                                return <p key={review.id} >Quantity: {review.quantity} <br />
                                Stock Type: {review.stocktype}<br/>
                                Date:{ moment(review.date).format('D MMM YYYY')} <br />
                                Description:{review.description}</p>
                            })
                        ): ( <p> Details not available</p> )}
    
                </Col>
                
        </Row>



                
        </Container>


        </>
    )
}

export default ProductDetail
