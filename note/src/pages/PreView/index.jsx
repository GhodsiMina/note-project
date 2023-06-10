import React from 'react'
import { useNote } from '../../NoteLayout';
import { Row, Col, Stack, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const PreView = ({ availableTags, handleDelete }) => {

    const note = useNote();
    const noteWIthTags = availableTags.filter((tag) => note.tagIds.includes(tag.id))

    const navigate = useNavigate();

    return (
        <div>
            <Row className='align-items-center glassy-bg p-3'>
                <Col>
                    <h1> {note.title}</h1>

                </Col>
                <Col>
                    <Stack direction='horizontal' gap={2} className='justify-content-end'>

                        <Button onClick={() => {
                            navigate(`/${note.id}/edit`)
                        }} size='lg' variant='dark'>
                            Edit
                        </Button>

                        <Button onClick={() => {
                            handleDelete(note.id)
                            navigate('/')
                        }} size='lg' variant='danger'>
                            Delete
                        </Button>

                        <Button onClick={() => navigate('/')} size='lg' variant='outline-dark'>
                            Back
                        </Button>


                    </Stack>
                </Col>
            </Row>
            <Row className='align-items-center p-3 rounded mt-3' style={{ backgroundColor: note.color }}>
                <Col>
                    <h5>
                        Tags:
                    </h5>
                    {noteWIthTags.map((tag) => (
                        <Badge key={tag.id} bg='light' text='dark' className='text.truncate'>{tag.label}</Badge>
                    ))}
                </Col>
            </Row>
            <Row className='h-80 glassy-bg p-3 mt-4'>
                <h5>
                    <ReactMarkdown>
                        {note.body}
                    </ReactMarkdown>
                </h5>

            </Row>
        </div>
    );
}

export default PreView