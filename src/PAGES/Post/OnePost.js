import React,{useState, useEffect} from 'react';
import {doGet} from '../Services'

export default function OnePost({match, location}) {
    const [post, setPost] = useState([]);
    const [postUser, setPostUser] = useState('')
    
   async function getOnePost(id) {
    
        const res = await doGet('/posts/'+id)
        setPost(res)
        const user= await doGet('/users/'+res.userId)
        setPostUser(user)
        console.log(post.userId);
    }

    useEffect(() =>{
        getOnePost(match.params.id)
    },[])
    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <div className="card">
                        <div className="card-header">{postUser.name}</div>
                        <div className="card-body">{postUser.phone}</div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="card">
                        <div className="card-header">{post.id+'. '+post.title}</div>
                        <div className="card-body">{post.body}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
