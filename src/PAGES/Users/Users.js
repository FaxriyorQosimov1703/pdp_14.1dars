import React,{useEffect, useState} from 'react';
import {doGet} from '../Services';



export default function Users() {
    const [users, setUsers] = useState([])

    async function getUsers() {
        const res = await doGet('/users');
        setUsers(res)
    }

    useEffect(()=>{
        getUsers()
    },[])
    return (
        <table className='table table-bordered my-4'>
            <thead className="bg-dark text-white">
                <tr>
                    <th>N</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>addres</th>
                    <th>website</th>
                    <th>company</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(item =>
                        
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.address.city}</td>
                                <td>{item.website}</td>
                                <td>{item.company.name}</td>
                            </tr>

                        )
                }
            </tbody>
        </table>
    )
}
