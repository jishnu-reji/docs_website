import { Button, Form, Modal } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';



function Home() {

  const [allDocs,setAllDocs] = useState([])
  const [docTitle,setDocTitle] = useState("")
  const [reload,setReaload] = useState('')
  const [show, setShow] = useState(false);


  const docsCollectionRef = collection(db,'documents')

  const getAllDocs = async()=>{
    const docsData = await getDocs(docsCollectionRef)
    const data = docsData.docs.map(doc =>(
      {
        ...doc.data(),
        id:doc.id
      }
    ))
    setAllDocs(data)
  }

  const postData = async()=>{
    await addDoc(docsCollectionRef,{
      title:docTitle,
      discription:""
    })
    setReaload(docTitle)
  }

  const deleleDocs = async(id)=>{
    const oneDoc = doc(db,'documents',id)
    await deleteDoc(oneDoc)
    setReaload(id)
  }

  useEffect(()=>{
    getAllDocs()
  },[reload])

  const handleClose =()=>setShow(false);

  const handleAdd = () =>{
    postData()
    alert(`Document ${docTitle} added successfully`)
    setShow(false);
  } 
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const handleEdit = (data) =>{
    navigate('/view',{state:data})
  }

  const handleChange =(e)=>{
    setDocTitle(e)
  }

  return (
    <div className='pap'>
      <div className="container">
        <div className='d-flex flex-column justify-content-center align-items-center mb-5'>
          <h1 className="text-center fw-bolder mt-2">DOCS APP</h1>
          <button onClick={handleShow} className='btn btn-success '><i className="fa-solid fa-circle-plus me-2"></i>ADD A DOCUMENT</button>
        </div>
        <div className="row">
          {allDocs?.length>0?allDocs.map((item)=>(
            <div key={item.id} className="col-lg-4 mb-4">
            <div style={{height:'170px'}} className='brd rounded'>
              <div className='d-flex justify-content-between px-3 py-2'>
                <h4 className='mb-0'>{item.title}</h4>
                <div className='d-flex justify-content-center align-items-center'>
                  <button onClick={()=>handleEdit(item)} className='btn'><i className="fa-solid fa-pen-to-square text-info"></i></button>
                  <button onClick={()=>deleleDocs(item.id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
                </div>
              </div>
              <p style={{textAlign:'justify'}} className='px-3'>{item.discription.replace(/<[^>]+>/g, '')}</p>
            </div>
          </div>
          ))
          :
          <div></div>
          }
          
        </div>
        <Modal size='sm' show={show} onHide={handleClose}>

        <Modal.Body className='d-flex flex-column'>
        <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputTitle"
          type="text"
          placeholder="Add Title"
          onChange={(e)=>handleChange(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Add Title</label>
      </Form.Floating>
        <Button variant="secondary" onClick={handleAdd}>ADD</Button>
        </Modal.Body>
      </Modal>
      </div>
    </div>
  )
}

export default Home