import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React,{useEffect,useState} from "react";

function App() {
  const url="http://127.0.0.1:8000/"
  const [taches, setTaches] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [input_task, setinput_task] = useState("");

  const [activeTask, setactiveTask] = useState(null)
  const getAllTask=()=>{
    setisloading(true);
    axios.get(url+"todo/list-task/")
    .then(res=>{
      setTaches(res.data);
      console.log(res.data);
      setisloading(false);
    })
    .catch(err=>{
      setisloading(false);
      console.error(err);
    })
    
  }

  const handlechange=(e)=>{
    setinput_task(e.target.value);
    console.log(input_task);

  }

 const addTask=()=>{
  setisloading(true);
  if (activeTask==null)
  {

 
    axios.post(url+"todo/create-task/",{
      "title":input_task,
      "status":false,
    })
    .then(res=>{
      setinput_task("");
      getAllTask();
      setisloading(false);
      setactiveTask(null);
    })
    .catch(err=>{
     
      console.error(err);
      setisloading(false);
    })
  }
  else{
    axios.put(url+`todo/update/${activeTask.id}/task/`,{
      "title":input_task,
      "status":activeTask.status,
    })
    .then(res=>{
      setinput_task("");
      getAllTask();
      setisloading(false);
      setactiveTask(null);
    })
    .catch(err=>{
     
      console.error(err);
      setisloading(false);
    })


  }
 }

 const deleteTask=task=>{
    axios.delete(url+`todo/destroy/${task.id}/task/`)
 
    .then(res=>{
      getAllTask();
    })
    .catch(err=>{
      console.error(err);
    })
  }

const toggleStatus=task=>{
  
  axios.put(url+`todo/update/${task.id}/task/`,{
    "title":task.title,
    "status":!task.status,
  })
  .then(res=>{
    setinput_task("");
    getAllTask();
    setisloading(false);
  })
  .catch(err=>{
   
    console.error(err);
    setisloading(false);
  })

}
  useEffect(() => {
    getAllTask();
    
  }, [])


const updateTask=task=>{
  setactiveTask(task);
  setinput_task(task.title);
  
}
  useEffect(() => {
    getAllTask();
    
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         TODO APP (Django +React)| By Prince Gédéon
        </p>
        
      </header>
      <div className="main">

        <div className="input_tache">
          <input type="text" placeholder="Ajouter une tacher" value={input_task} onChange={e=>handlechange(e)}/>
          <button onClick={addTask} disabled={!input_task.trim()}>Ajouter</button>

        </div>
        <div className="tachelist">
        <ul>
        {
          isloading?<h4>Chargement en cours ...</h4>:
          taches.map(task=>{
            return(
              <div className="tache-list" key={task.id}>
              <input type="checkbox" onChange={(e)=>(toggleStatus(task))}
                checked={task.status??true}
              />
              <li onClick={e=>updateTask(task)}>
              {
                task.status?
                <strike>{task.title}</strike>
                :task.title
                
                }
              </li>
              <div className="bouton">
              <button className="edit" onClick={e=>updateTask(task)}>Modifier</button>
              <button className="delete" onClick={e=>(deleteTask(task))}>Supprimer</button>

              </div>

            </div>)

          })
        }
          
        </ul>

        </div>

      </div>
    </div>
  );
}

export default App;
