import './App.css'
import Post from './components/post/Post'

import {useState,useEffect} from 'react'
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'
import {usePostContext} from './context/context'
import {First_Render} from './context/actions'

function App() {
  const [focusState,setFocusState] = useState(false)
  // const [post,setPost] = useState([]) 

  const {setPostId,dispatch,state} = usePostContext()

  useEffect(()=>{
    FetchPost()
  },[])

  const FetchPost = async()=>{
    try{
      const {data} = await axios.get('/api/posts/634ecceb0a70c2bf83c99be6')
      dispatch(First_Render(data))

      //just for test
      setPostId('634ecceb0a70c2bf83c99be6')
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="app">
      <Routes>
          <Route exact path='/' element={<div>home</div>}/>
          <Route path='/post/:id' element={<Post/>}/>
      </Routes>
    </div>
  )
}

export default App
