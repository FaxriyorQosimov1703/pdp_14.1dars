import React,{useState, useEffect} from 'react';
import SelectUser from '../SelectUser';
import {doGet} from '../Services';


export default function Todos() {

    const [todos, setTodos] = useState([]);
    const [data, setData] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [isFiltering, setisFiltering] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    const [page, setPage] = useState(1)

   async function getTodos() {
        const res = await doGet('/todos')
        setTodos(res.filter((item, index)=>index>=0&&index<10))
        setData(res)

        // const user = await doGet('/users')
        // setPostUsers(user)
     }

    useEffect(()=> {
        getTodos()
    }, [])

    useEffect(()=>{
        const filterPage = filter(currentUser, completed, page)
        setTodos(filterPage)
    }, [page])

    function filter(userId, completed, page) {
        return data.filter((item, index)=>
            (item.userId == userId || userId == '') && 
            (item.completed == completed || !isFiltering) ).filter((item, index)=>(index >= ((page-1) * 10) && (index < page * 10)))
    }

    function onSelectPost(userId) {
        const a = filter(userId, completed, page)
        setTodos(a)
        // setCompleted(userId)
        setCurrentUser(userId)
    }

    function handleCheck(event) {
        const completed = event.target.checked
        
        const filterCheck = filter(currentUser, completed, page);
        setTodos(filterCheck)
        setCompleted(completed)
        setisFiltering(true)
    }

    function reset(){
        setCompleted(false)
        setTodos(data)
        setCurrentUser('')
        setisFiltering(false)
        setPage(1)
    }

    function onNext() {
        const res = filter(currentUser, completed, page)
        if(page == 20) {
            setPage(1)
        }else{
            setPage(prevstate=> prevstate+1)

        }
    }

    function onPrev() {
        const res = filter(currentUser, completed, page)
        if(page == 1) {
            setPage(20)
        }else {
            setPage(prevstate=>prevstate-1)
        }
    }
    return (
        <div className=' my-5'>
            <div className="row my-3">
                <div className="col-md-4">
                    <SelectUser  onChange={onSelectPost} />
                </div>
                <div className="col-md-4">
                        <label htmlFor='b'>
                            <h4>completed</h4>
                        </label>
                        <input className=' mx-4 checkbox' checked={completed} type="checkbox" onChange={handleCheck} id="b"/>

                </div>
                <div className="col-md-4">
                    <button className="btn btn-danger" onClick={reset}>Reset</button>
                </div>
            </div>
            {
                todos.map(item => 
                    <div className="row">
                        <div className="col-md-1">
                            <input  className='checkbox' checked={item.completed} type="checkbox" name="" id={'checkbox/'+item.id}/>
                        </div>
                        <div className="col-md-10 "><h4 ><label className="label-hover" htmlFor={'checkbox/'+item.id}>{item.title}</label></h4></div>
                    </div>
                    
                    )
            }
            <div className="row my-4">
                <div className="col-md-1 text-center"><button className="btn btn-dark" onClick={onPrev}>prev</button></div>
                    <div className="col-md-1"><h1 className="text-center">{page}</h1></div>
                <div className="col-md-1 text-center"><button className="btn btn-dark" onClick={onNext}>next</button></div>
            </div>
        </div>
    )
}
