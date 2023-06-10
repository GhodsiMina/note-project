import React from 'react';
import { Stack, Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NoteCard.module.css'
const NoteCard = ({note}) => {
    return (
        <Card as={Link} to={`${note.id}`} style={{ backgroundColor: note.color, border: note.color }}
            className={`h-100 text-reset text-decoration-none ${styles.card}`}
        >
            <Card.Body>
                <Stack gap={2} className='align-items-center justify-content-center h-100'>
                    <h4>{note.title}</h4>
                    {note.tags.length > 0 &&
                        (
                            <Stack gap={1} direction='horizontal' className='justify-content-center align-items-center flex-wrap'>
                                {note.tags.map((tag) => (
                                    <p className='h6' key={tag.id}>
                                        <Badge bg='light' text='dark'>{tag.label}</Badge>
                                    </p>
                                ))}
                            </Stack>
                        )
                    }
                </Stack>
            </Card.Body>
        </Card>
    );
}

export default NoteCard