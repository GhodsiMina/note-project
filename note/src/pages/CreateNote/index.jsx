import React, { useState, useRef } from 'react';

import NoteForm from '../NoteForm';
import { useNote } from '../../NoteLayout';

const CreateNote = ({ AddTag, availableTags, handleCreateNote }) => {

    const note = useNote();


    return (
        <>
            <h1>New Note</h1>
            <NoteForm AddTag={AddTag} availableTags={availableTags} onSubmit={handleCreateNote} />

        </>

    );
}

export default CreateNote