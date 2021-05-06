import React from 'react'
import { useState, useEffect } from 'react'  
import ListaTareas from '../components/ListTareas'
import ModalEditTarea from '../components/ModalEditTarea'
import ModalNewTarea from '../components/ModalNewTarea'
import SeachBar from '../components/SeachBar'

function Tareas() {

    const [tareas, setTareas] = useState([])
    const [showTareas, setShowTareas] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [showNewModal, setShowNewModal] = useState(false)

    useEffect(() => {
        const host = 'localhost:8000'
        const get = '/api/list'
        const getUrl = 'http://'+host+get;

        fetch(getUrl).then((response) => {
            return response.json()
        }).then((resData) => setTareas(resData))
    }, []);
    useEffect(() => {
        setShowTareas(tareas);
    }, [tareas]);

    function tareaIsCheck(childData) {
        let id = childData.id
        let checked = childData.checked

        setShowTareas(()=>{
            const newArr = showTareas.map((elem) => {
                let o = Object.assign({}, elem)
                if (parseInt(elem.id) === parseInt(id) ) o.checked = checked  
                return o
            })
            return newArr; 
        });
    }

    function searchKeyWord(data){
        let text = data.toLowerCase().trim();
        if (text.length > 0) {
            setShowTareas(() =>{
                let newArray = showTareas.filter( item => 
                    (item.title.toLowerCase().trim().includes(text) || item.description.toLowerCase().trim().includes(text)) );
                return newArray;
            })
        }else{
            setShowTareas(tareas)
        }
    }

    function createTarea(event) {
        const data = event.target.elements
        const title = data.title.value
        const description = data.description.value
        event.preventDefault()

        if (!title.length > 0 || !description.length > 0) {
            return alert('Rellena los campos por favor')
        }
        
        const toInsert = {
            id: tareas[tareas.length-1].id+1,
            title,
            description,
            state: "0"
        }
        
        const dir = '/api/create'
        apiRequest(toInsert, dir, 'POST')

        let newObject = Object.assign([], showTareas);
        newObject.push(toInsert)
        setTareas(newObject);

        newModalStatus();
    }

    function deleteTareas(data) {
                
        let add;
        const o = [];
        showTareas.forEach(element => {
            add = true;
            for (let i = 0; i < data.length; i++) {
                if(data[i] === element.id){
                    add = false
                } 
            }
            if(add) o.push(element)
        })
        setShowTareas(o);

        const dir = '/api/delete'
        apiRequest(data, dir, 'DELETE')
    }

    function editTareas(event){
        let array = [];
        let data = event.target.elements
        event.preventDefault()
        if (!data.id){
            return alert('No seleccionaste datos para editar!!');
        }
        if (!data.id.length){
            array.push({
                id: parseInt(data.id.value),
                title: data.title.value,
                description: data.description.value,
                state: data.state.value
            })
        }else {
            for (let i = 0; i < data.id.length; i++) {
                array.push({
                    id: parseInt(data.id[i].value),
                    title: data.title[i].value,
                    description: data.description[i].value,
                    state: data.state[i].value
                })
            }
        }
        const newArray = showTareas.map((elem) => {
            for (let i = 0; i < array.length; i++) {
                if(array[i].id === elem.id){
                    elem = { ...elem,
                        // id: elem.id,
                        title:  array[i].title,
                        description: array[i].description,
                        state: array[i].state
                    }
                }
            }
            return elem;
        })
        setTareas(newArray)
        editModalStatus()
        
        const dir = '/api/edit'
        apiRequest(array, dir, 'POST')

    }

    function apiRequest(data, url, type) {
        const host = 'localhost:8000'
        const postUrl = 'http://'+host+url;

        var csrf_token = '<?php echo csrf_token(); ?>';
        fetch(postUrl, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": csrf_token
            },
            method: type,
            credentials: "same-origin",
            body: JSON.stringify(data)
        }).then(resp => console.log( resp )).catch((error) => console.log(error+' - catch'));
    }

    function editModalStatus() {
        setShowEditModal(!showEditModal)
    }
    function newModalStatus() {
        setShowNewModal(!showNewModal)
    }
    

    return (
        <div className="bodyList">
            <div className="titleList">
                <h1>Lista de Tareas</h1>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, iste.</p>
            
            <div className="searchBar">
                <SeachBar buscador={searchKeyWord} />
            </div>
            
            <div className="listContent">
                <ListaTareas tareas={showTareas} parentIsCheck={tareaIsCheck} 
                            showModal={editModalStatus} onDelete={deleteTareas} />
            </div>

            <button type="button" className="btn btn-primary" onClick={newModalStatus} 
                id="btnOpenModalNew" data-toggle="modal" data-target="#newTarea">Crear Tarea</button>

            <ModalEditTarea editInfo={showTareas} showModal={showEditModal} closeModal={editModalStatus} onEdit={editTareas} />
            <ModalNewTarea showModal={showNewModal} closeModal={newModalStatus} createNew={createTarea} />
        </div>
    )
}

export default Tareas;