import React,{useState, useEffect} from 'react';
import {doGet} from './Services'

export default function SelectUser({onChange, name}) {
    const [postUsers, setPostUser] = useState([]);
    const [currentUser, setCurrentUser] = useState('')

    async function getUsers() {
        const users = await doGet('/users')
        setPostUser(users)
    }

    useEffect(()=>{
        getUsers()
    }, [])

    function onSelectPost(event) {
        const userId = event.target.value;
        const userId1 = userId === ''?'':parseInt(userId)
        setCurrentUser(userId1)
        if(onChange)
            onChange(userId1)
    }
    return (
        <div>
             <select  name={name} value={currentUser} onChange={onSelectPost} className={'form-control'} value={currentUser? parseInt(currentUser):''} name="" id="">
                <option value="">All</option>
                {
                    postUsers.map(item=>
                        
                        <option key={item.id} value={item.id}>{item.name}</option>
                        
                        )
                }
            </select>
        </div>
    )
}
