import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {doGet, doPost} from '../Services';
import OnePost from './OnePost';
import SelectUser from '../SelectUser';
import Modal from './PostModal';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Post({history}) {
    const [posts, setPosts] = useState([]);
    const [postUsers, setPostUsers] = useState([]);
    const [data, setData] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false)

   async function getPosts() {
        const res = await doGet('/posts')
        setPosts([...res])
        setData([...res])
        // const postuser = await doGet('/users')
        // setPostUsers(postuser)
    }

    async function savePost(data) {
        const res =  await doPost('/posts', data)
        setLoading(false)
        setModal(false)
        // setPosts(res);
        setData(prev=>{
            prev.push(res)
            return [...prev]
        })
        setPosts(prev=>{
            prev.push(res)
            return [...prev]
        })
        toast('malumot saqlandi. Eng oxiriga tushing')
     }

    useEffect(()=>{
        getPosts()
    },[])

    function onCheckCard(id) {
        history.push('/posts/'+id)
    }

    function filter(userId) {
        return data.filter(item=>item.userId == userId || userId=='')

    }



    function openModal() {
        setModal(prev=>!prev)
    }

    // function toggleModal() {
    //     setModal(prev=>!prev)
    // }

    function onSubmit(data) {
        setLoading(true)
        data.user = user
      savePost(data)
    }

    function onChangeUser(userId) {
        const a = filter(userId)
        setPosts(a)
    }

    // function onSubmit(data1) {
    //     setLoading(true)
    //     
    //     savePost(data1)
    // }

    function changeUser(id) {
        setUser(id)
    }
    return (
        <div>
            <ToastContainer />
            <div className="row my-3">
                <div className="col-md-4">
                    <SelectUser onChange={onChangeUser} />
                </div>
                <div className="col-md-4">
                    <button className="btn btn-dark" onClick={openModal}>Add</button>
                </div>
            </div>
        
            {
                modal?<Modal 
                changeUser={changeUser}  
                isOpen={modal} 
                toggleModal={openModal} 
                save={onSubmit}
                loading={loading}/>:''
            }

            <div className='row'>
                {
                    posts.map(item => <div key={item.id} className="col-md-3">
                            <div className="card post-card my-3" onClick={()=>onCheckCard(item.id)}>
                        
                                <div className="card-header bg-dark text-white post-card-header">{item.id+ '. '}{item.title}</div>
                                <div className="card-body">{item.body}</div>
                        
                            </div>

                        </div>
                    )
                }
        </div>
        
        </div>

    )
}
