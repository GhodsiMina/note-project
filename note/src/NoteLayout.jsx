import React from 'react'
import { Navigate, Outlet, useParams, useOutletContext } from 'react-router-dom';
 
const NoteLayout = ({notes}) => {
    const {id}= useParams();
    const note= notes.find((note)=> note.id === id);

     if (!note){
        return <Navigate to='/' replace />
     }

    return ( 
        <Outlet context={note} />
     );
}
 
export default NoteLayout

export function useNote(){
    return useOutletContext();
}