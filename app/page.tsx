
'use client'

import axios from 'axios'
import AddPost from  './components/AddPost'
import { useQuery } from '@tanstack/react-query'
import Post from './components/Post'
import { PostType } from './types/Posts'

// fetch all posts
const allPosts = async() => {
  try {
    const response = await axios.get("/api/posts/getPost")
    return response.data
  } catch (error) {
    throw error;
  }
}

const page = () => {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  }) 

  if(error) {
    return <div>Error: {(error as Error).message}</div>
  } 

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <AddPost />
      {data?.map((post) => (
        <Post 
          comments={post.comments}
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  )
}

export default page