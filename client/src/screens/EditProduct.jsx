import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'

const EditProduct = () => {

    const { id } = useParams()
    const history = useHistory()
    


    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)

    useEffect(() => {
        const getDataById = async () => {
            const {data} = await axios.get(`/api/products/${id}`)
            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
            setPublished(data.published)
        }

        getDataById()
    },[id])

   const updateHandler = async (e) => {

        e.preventDefault()
       
        // update by put request

        const data = {
            title: title,
            price: price,
            description: description,
            published: published
        }

        await axios.put(`/api/products/${id}`, data)

        history.push('/')

   }

    return (
        <>
            <Container className='mt-5 p-2'>
                <div className='container' style={{backgroundColor:'#fffafa'}}>
                <h1 className='text-dark' style={{textAlign:'center'}}>Add Product</h1>
                </div>
                <Form onSubmit={updateHandler}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                          />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price (₹)</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                             />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="publishedCheckedid">
                        <Form.Check
                            type="checkbox"
                            value={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            label="publish"
                           />
                    </Form.Group>


                                    
                
                <div className="row container align-items-center">
                    <div className='col-lg-4'> <button type="button" class="btn btn-light text-bold border-warning "><Link class="text-warning" style={{ textDecoration: "none" }} to="/">Back</Link></button></div>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4' style={{ alignItems:"center",justifyContent:"flex-end",display:"flex"}}>
                    <Button variant="primary" type="submit">
                        Update Product
                    </Button>
                    </div>

                </div>
                </Form>
            </Container>
        </>
    )
}

export default EditProduct
