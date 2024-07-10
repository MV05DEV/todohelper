import { useState,useEffect } from 'react'
import './App.css'
import Top from './components/Top'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";





function App() {
  useEffect(() => {
    let taskstring=localStorage.getItem("Tasks")
    if (taskstring){
      let Tasks=JSON.parse(localStorage.getItem("Tasks"))
      setTasks(Tasks)
    }
  }, [])
  useEffect(() => {
    let finishstring=localStorage.getItem("Finished")
    if (finishstring){
      let Finished=JSON.parse(localStorage.getItem("Finished"))
      setFinished(Finished)
    }
    
  }, [])
  
  
  const [Task, setTask] = useState("")
  const [Tasks, setTasks] = useState([])
  const [Finish, setFinish] = useState(false)
  const [Finished, setFinished] = useState([])
  
  const saveToLS=() => {
    localStorage.setItem("Tasks",JSON.stringify(Tasks))
    localStorage.setItem("Finished",JSON.stringify(Finished))
    
  }
  
  const handleadd = () => {
    setTasks([...Tasks, {id:uuidv4(), Task, isCompleted: false }])
    setTask("")
    saveToLS()
  }
  const handleedit = (e,id) => {
    let t=Tasks.filter(i=>i.id===id)
    setTask(t[0].Task)
    let newTasks=Tasks.filter(item => {
      return item.id!==id
    });
    setTasks(newTasks)
    saveToLS()


  }
  const handledelete = (e) => {
    let newTasks=Tasks.filter(item => {
      return item.id!==e.target.name
    });
    setTasks(newTasks)
    saveToLS()



  }
  const handlechange = (e) => {
    setTask(e.target.value)

  }
  const handlefinish = () => {
    setFinish(!Finish)
    saveToLS()
  }
  const handlecheck=(e) => {
    let index=Tasks.findIndex(item => {
      return item.id===e.target.name
    })
    Tasks[index].isCompleted=!Tasks[index].isCompleted
    setTasks([...Tasks])
    
    if (Tasks[index].isCompleted){
      let t=Tasks[index]
      setFinished([...Finished,{id:t.id,Task:t.Task,isCompleted:true}])
    }
    else{
      let newfinish =Finished.filter(i=>i.id!==Tasks[index].id)
      setFinished(newfinish)

    }
    console.log(Finished)
    saveToLS()

  }
  const handleclear= () => {
    setTasks([])
    setFinished([])
    saveToLS()
    
  }
  console.log(Finished)
  
  



  return (
    <>
      <Top />
      <div className="bigbox bg-violet-400 h-[86vh]">
        <div className='flex justify-center'>

          <div className='p-4 flex flex-col gap-2 pr-0'>
            <div className='font-bold'>Create Task</div>
            <div>
              <input onChange={handlechange} type="text" value={Task} className='border-2 rounded-md w-[60vh] max-sm:w-[75vw]' />
              <button onClick={handleadd} disabled={Task.length<3} className=' text-white bg-violet-700 rounded-md p-1 ml-3 font-bold disabled:bg-violet-500'>ADD</button>
            </div>
          </div>
        </div>

        <div>

          <div className="tasks rounded-lg text-lg bg-violet-300 p-5 mx-[5%] w-[90vw] h-[60vh]">
            <div className='py-4'><input type="checkbox" onChange={handlefinish} checked={Finish} name="" id="" className='mx-2 cursor-pointer'/>Show Completed task</div>
            <h3>Your Tasks</h3>
            <div className="task flex flex-col gap-2">
              {(Tasks.length===0 || (Finished.length===Tasks.length && !Finish)) && <div className=' bg-violet-100 p-2 rounded-md'>No tasks present</div>}
              {Tasks.map(item => {
                return(Finish || !item.isCompleted)&& <div key={item.id} className='flex bg-violet-100 justify-between p-2 rounded-md items-center'>
                  
                  <div className={item.isCompleted ?"line-through" : ""}><input type="checkbox" onChange={handlecheck} checked={item.isCompleted} className='mr-10 cursor-pointer' name={item.id} id="" />{item.Task}</div>
                  <div className="flex h-full"><button onClick={(e)=>handleedit(e,item.id)} className='bg-violet-700 rounded-md p-1 px-3 ml-3 font-bold text-white max-sm:px-2'><p className='max-sm:hidden '>Edit</p> <p className='sm:hidden '><FaRegEdit /></p></button>
                    <button name={item.id} onClick={handledelete} className='bg-violet-700 rounded-md p-1 ml-3 font-bold text-white'><p className='max-sm:hidden'>Delete</p> <p className='sm:hidden'><MdDeleteForever /></p></button></div>
                </div>
              })}
              <div className='items-center flex justify-center'><button onClick={handleclear}className="bg-violet-700 rounded-md p-1 ml-3 font-bold text-white">Empty tasks</button></div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
