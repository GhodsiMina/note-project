import React from 'react'
import NoteForm from '../NoteForm';
import { useNote } from '../../NoteLayout';

const EditNote = ({AddTag, availableTags, handleEditNote}) => {
    const note = useNote();
    const noteWIthTags = availableTags.filter((tag) => note.tagIds.includes(tag.id))
    return (
        <>
            <h1>Edit Note</h1>
            <NoteForm 
            AddTag={AddTag} 
            availableTags={availableTags} 
            onSubmit={(data)=>handleEditNote(note.id, data)}
            title={note.title}
            body={note.body}
            tags={noteWIthTags}
            defaultColor={note.color}
            />

        </>
    );
}

export default EditNote