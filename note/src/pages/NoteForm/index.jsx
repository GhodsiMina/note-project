import React from 'react'
import { useState, useRef } from 'react';
import { Form, Stack, Row, Col, Button, } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import CreatableSelect from 'react-select/creatable';
import Creatable, { useCreatable } from 'react-select/creatable';
import { SliderPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';

const NoteForm = ({
    AddTag, 
    availableTags, 
    onSubmit,
    title='',
    body='',
    tags=[],
    defaultColor

}) => {
    
    const [selectedTags, setSelectedTags] = useState(tags);
    const titleRef= useRef();
    const markdownRef=useRef();
    // const [notes, setNotes] = useState(
    //     {
    //         title: "",
    //         body: "",
    //         color: "",
    //         tagId: []
    //     }
    // )
    const [color, setColor]=useState(defaultColor)
    const Naviagate= useNavigate();

   const handleSubmit=(e)=>{
    e.preventDefault();

    onSubmit( {
        title: titleRef.current.value,
        body: markdownRef.current.value,
        color: color,
        tags: selectedTags
    })
    console.log(titleRef.current.value)
    Naviagate('..');
   }
   
    return (
        <Form onSubmit={handleSubmit} className='mt-4'>
            <Stack gap={3}>
                <Row className='mb-2 glassy-bg p-5'>
                    <Col>
                        <Form.Group controlId='Title'>
                            <Form.Label as="h4">Title</Form.Label>
                            <Form.Control  defaultValue={title} ref={titleRef} required></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label as="h4">Tags</Form.Label>
                            <CreatableSelect

                                isClearable
                                isMulti
                                onChange={(availableTags)=> setSelectedTags(availableTags.map((tag)=>{
                                    return {label: tag.label , id:tag.value}
                                }))}
                                onCreateOption={(label) =>
                                {
                                    const newTag={
                                        label: label,
                                        id: uuidv4()
                                    }
                                    AddTag(newTag)
                                    setSelectedTags((prevTags)=>[...prevTags, newTag])
                                }
                                
                                }
                               
                            
                                value={selectedTags.map((tag)=>{
                                    return {label:tag.label, value:tag.id}
                                })}
                                options={availableTags.map((tag)=>{
                                    return {label:tag.label , value: tag.id}
                                })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='glassy-bg p-5'>
                  
                    <SliderPicker color={color} onChange={(newColor)=> setColor(newColor.hex)} />
                    
                </Row>
                <Row className='glassy-bg p-5'>
                        <Form.Group controlId='markdown'>
                            <Form.Label as='h4'>Body</Form.Label>
                                <Form.Control defaultValue={body} ref={markdownRef} required as='textarea' size='lg' rows={10} /> 
                        </Form.Group>
                </Row>
                <Stack direction='horizontal' gap={2} className='justify-content-end' >
                    <Button size='lg' type='submit' variant='dark'>Save</Button>
                    <Button size='lg' variant='outline-dark'>Cancel</Button>

                </Stack>
            </Stack>
        </Form>
    );
}
 
export default NoteForm