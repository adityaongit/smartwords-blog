import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import Loader from './Loader'
import axios from 'axios'
// import { dotenv } from dotenv
// import { DUMMY_POSTS } from '../data'


const Posts = () => {

    const [posts, setPosts] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true)
            try {

                const response = await axios.get("http://localhost:5000/api/posts")
                setPosts(response?.data)
                setIsLoading(false)

            } catch (err) {
                console.log(err)
            }
        }

        fetchPosts()
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="posts">
            {
                posts.length > 0 ? <div className="container posts_container">
                    {
                        posts.map(({_id: id, thumbnail, category, title, description, creator, createdAt }) =>
                            <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title}
                                description={description} authorID={creator} createdAt={createdAt} />)
                    }
                </div> : <h2 className='center'>No posts found</h2>
            }
        </section>
    )
}

export default Posts