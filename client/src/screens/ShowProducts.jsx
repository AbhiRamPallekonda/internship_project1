import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';


const ShowProducts = () => {


    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProductsData = async () => {
            const { data } = await axios.get('/api/products/allProducts')
            console.log(data)
            setProducts(data)
        }
        getProductsData()
    }, [])

    return (
        <>
            <Container className="justify-content-center p-2">
                <div className="row container align-items-center" style={{backgroundColor:'#fffafa',boxShadow:"2px 2px 5px 5px #454444",marginBottom:"20px"}} >
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'> <h1 className='text-center' style={{fontFamily:'roboto',color:'black'}}>Products</h1></div>
                    <div className='col-lg-4' style={{ alignItems:"center",justifyContent:"flex-end",display:"flex"}}>
                        <button type="button" class="btn btn-warning text-white border-white "><Link class="text-white" style={{ textDecoration: "none" }} to="/addProduct">Add new Product</Link></button>
                    </div>

                </div>

                <hr />
                <Row>
                    {
                        products.map(product => {
                            return <Col md={6} lg={3} sm={12} key={product.id}>
                                <ProductCard product={product}/>
                            </Col>
                        })
                    }
                </Row>


            </Container>


        </>
    )
}

export default ShowProducts
