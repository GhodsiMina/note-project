import { Delete } from '@icon-park/react';
import React from 'react'
import { Form, Modal, Stack,Row, Col } from 'react-bootstrap';
 import { useContext } from 'react';
 import { TagContext } from '../../App';

const EditTagsModal = ({availableTags, show, onHide}) => {
const  {handleEditTag, handleDeleteTag} = useContext(TagContext)

    return ( 
        <Modal 
        show={show} 
        onHide={onHide} 
        centered 
        scrollable 
        contentClassName='modals-bg p-2' >
            <Modal.Header closeButton>
                Edit Tags
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={1}>
                        {availableTags.map((tag)=>(
                            <Row key={tag.id} className='align-items-center' >
                                <Col>
                                    <Form.Control type='text' value={tag.label} onChange={(e)=>handleEditTag(tag.id, e.target.value)}></Form.Control>
                                </Col>
                                <Col xs='auto'><Delete size='25' onClick={()=>handleDeleteTag(tag.id)} fill={['#cc525c']} className='pointer' /></Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default EditTagsModal