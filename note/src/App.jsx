import React, { useMemo, createContext, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, Navigate } from 'react-router-dom';
import CreateNote from './pages/CreateNote';
import "./style/main.css";
import 'bootstrap/dist/css/bootstrap.css';
import NoteList from './pages/Home';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './useLocalStorage';
import NoteLayout from './NoteLayout';
import PreView from './pages/PreView';
import EditNote from './pages/EditNote';
import axios from 'axios';

// import {
//     useQuery,
//     useMutation,
//     useQueryClient,
//     QueryClient,
//     QueryClientProvider,
// } from '@tanstack/react-query'

export const TagContext = createContext(null);

// const queryClient = new QueryClient();
// const baseURL = 'https://jsonplaceholder.typicode.com/posts'

const App = () => {

    const [notes, setNotes] = useLocalStorage('NOTES', []);
    const [tags, setTags] = useLocalStorage('TAGS', []);
    const color = ['#ed1469', '#59765f', '#fefb1d', '#4bc65d'];

    // const getPosts = () => {
    //     return axios.get(baseURL)
    // }
    
    // const { data: posts } = useQuery(["post-list"], getPosts, {
        
    //     onSuccess: (res) => {
    //         res.data?.map((post) => {
    //             const randomTags = [tags[Math.floor(Math.random() * tags.length)]]
    //             const randomColor = [color[Math.floor(Math.random() * color.length)]]
    //             setNotes((pre) => [...pre, {
    //                 id: uuidv4(),
    //                 title: post.title,
    //                 body: post.body,
    //                 tagIds: randomTags,
    //                 color: randomColor,
    //             }])
    //         })
    //     }
        
    // })


    const AddTag = (tag) => {
        setTags((prevTag) => [...prevTag, tag])
    }

    const handleCreateNote = ({ tags, ...data }) => {
        setNotes((prevNotes) => {
            return [...prevNotes, { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) }]
        })

    }

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return {
                ...note,
                tags: tags.filter((tag) => note.tagIds.includes(tag.id))

            }
        })
    }, [notes, tags]);

    const handleDelete = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
    }

    const handleEditNote = (id, { tags, ...data }) => {
        setNotes((prevNotes) => prevNotes.map((note) => {
            if (note.id === id) {
                return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
            } else {
                return note
            }

        }))
    }

    const handleEditTag = (id, label) => {
        setTags((prevTags) => {

            return prevTags.map((tag) => {
                if (tag.id === id) {
                    return { ...tag, label }
                }
                return tag
            })
        })
    }

    const handleDeleteTag = (id) => {
        setTags((prevTags) => {
            return prevTags.filter((tag) => tag.id !== id)
        })
    }

    return (
        // <QueryClientProvider client={queryClient}>
            <Container className='my-4'>

                <Routes>
                    <Route path='/'

                        element={
                            <TagContext.Provider value={{ tags, handleEditTag, handleDeleteTag, notesWithTags }}>
                                <NoteList
                                // notes={notesWithTags} 
                                // availableTags={tags} 
                                // handleEditTag={handleEditTag} 
                                // handleDeleteTag={handleDeleteTag}
                                />
                            </TagContext.Provider>
                        }

                    />
                    <Route path='/new' element={<CreateNote AddTag={AddTag} availableTags={tags} handleCreateNote={handleCreateNote} />} />

                    <Route path='/:id' element={<NoteLayout notes={notes} />}>
                        <Route index element={<PreView availableTags={tags} handleDelete={handleDelete} handleEditNote={handleEditNote} />} />
                        <Route path='edit' element={<EditNote AddTag={AddTag} availableTags={tags} handleEditNote={handleEditNote} />} />
                    </Route>
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Container>
        // </QueryClientProvider>
    );
}

export default App