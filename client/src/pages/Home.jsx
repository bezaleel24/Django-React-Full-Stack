import { useState,useEffect } from "react"
import api from "../api"
import Notes from "../components/Notes";
import '../styles/Home.css'
const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content,setContent] = useState('');
  const [title,setTitle] = useState('');

  useEffect(()=>{
    getNote();
  },[])

  const getNote = ()=>{
    api.get('/api/notes/')
    .then((res) =>res.data)
    .then((data) =>{setNotes(data); console.log(data)})
    .catch(err => alert(err.message));
  }

  const deleteNote = (id)=>{
    api.delete(`/api/notes/delete/${id}/`)
    .then((res)=>{
      if (res.status===204){ alert("Note deleted!")}
      else {alert("Failed to delete note!")}
      getNote();
      })
    .catch(err => alert(err.message));
    
  }

const createNote = (e)=>{
  e.preventDefault()
  api.post('/api/notes/', {content,title})
  .then((res)=>{
    if (res.status === 201){
      alert("Note created!")
      getNote()
      console.log(notes)
    }
    else alert("Failed to create note!")
    console.log(notes)
  })
  .catch(err => alert(err.message));
  
}

  return (
    <div>
      <div>
        <h2>Notes</h2> 
        
      {notes.map((note)=>{
        return <Notes note={note} onDelete={deleteNote} key={note.id} />
       
      })}
      </div>
      <h2>Create a note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title</label>
        <br />
        <input 
        type="text" 
        id="title" 
        name="title" 
        onChange={(e)=>(setTitle(e.target.value))}
        value={title}
        />
        <br />
        <label htmlFor="content">Content</label>
        <br />
        <input 
        type="text" 
        id="content" 
        name="content" 
        onChange={(e)=>(setContent(e.target.value))}
        value={content}
        />

        <br />
        <input type="submit" value="submit"
        
        />
      </form>
    </div>
  )
}

export default Home
