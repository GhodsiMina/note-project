import React, { useMemo, useState, useContext } from 'react'
import { Button, Col, Row, Stack, Form, Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Creatable, { useCreatable } from 'react-select/creatable';
import Select from 'react-select';
import NoteCard from './NoteCard';
import EditTagsModal from './EditTagsModal';
import { TagContext } from '../../App';

const NoteList = () => {
    const {tags:availableTags, notesWithTags:notes}=useContext(TagContext)

    const [title, setTitle]=useState("");
    const [selectedTags, setSelectedTags]= useState([])
    const [modalTags, setModalTags]=useState(false)

    const filteredNotes= useMemo(()=>{
        return notes.filter((note)=>{
            return (
                title === '' ||
                (note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.every((tag)=>{
                    notes.tags.some((noteTag)=> noteTag.id===tag.id)
                }))
            )
            
        })
    },[title, selectedTags, notes])



    return (
        <>
            <Row className='align-items-center mb-5 p-2 rounded'>
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to='/new'>
                            <Button variant='dark'>Create</Button>
                        </Link>
                        <Button onClick={()=>setModalTags(true)} variant='outline-dark'>Edit Tags</Button>
                    </Stack>
                </Col>

            </Row>
            <Form>
                <Row className='glassy-bg mb-5 p-5'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <Select
                                isMulti
                                value={selectedTags.map((tag)=>{
                                    return {label: tag.label, value:tag.id}
                                })}
                                   
                                 options={availableTags.map((tag)=>{
                                    return {label: tag.label, value: tag.id}
                                 })} 

                               onChange={(tags)=>{
                                setSelectedTags(tags.map((tag)=>(
                                    {label: tag.label, id:tag.value}
                                )))
                               }}
                            >

                            </Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row lg={3} className='p-3'>
                {filteredNotes.length > 0 &&
                    filteredNotes.map((note) => (

                        <Col className='mt-3' key={note.id}>
                           <NoteCard note={note} />
                        </Col>

                    ))}
            </Row>
            <EditTagsModal 
            availableTags={availableTags} 
            show={modalTags} 
            onHide={()=>setModalTags(false)}
            // handleDeleteTag={handleDeleteTag}
            // handleEditTag={handleEditTag}
             />
        </>

    );
}

export default NoteList