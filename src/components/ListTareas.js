function CreateTable({tableRows, showModal}) {
    return(
    <div className="display-table">
    <table className="table table-dark">
        <thead>
            <tr>
                <th className="table-head">Tarea</th>
                <th className="table-head">Descripción</th>
                <th className="table-head">Estado</th>
                <th className="table-head"></th>
            </tr>
        </thead>
        <tbody>

        {tableRows}

            <tr>
                <th colSpan="2"></th>
                <th colSpan="2">
                    <button type="button" className="btn btn-primary" id="btnModalEditor" onClick={showModal}
                        data-toggle="modal" data-target="#editarTareas">Editar</button>
                    <button type="button" className="btn btn-danger" id="btnDeleteTarea">Eliminar</button>
                </th>
            </tr>
        </tbody>
    </table>
    </div>)
}

function ListaTareas(prop) {
    
    let tareas = prop.tareas
    let tableRows = []
    tableRows = tareas.map((tarea) => 
            <tr className="rowData" key={tarea.id}>
                    <th className="table-text">{tarea.title}</th>
                    <th className="table-text">{tarea.description}</th>
                    <th className="table-text" value={tarea.state} >
                        {parseInt(tarea.state) === 1 ? 'Completada' : 'Pendiente'}
                    </th>
                    <th>
                        <div className="form-check">
                            <input type="checkbox" onClick={getCheckedRow} className="form-check-input" id={tarea.id} />
                        </div>
                    </th>
                </tr>
        );

    function getCheckedRow(e){
        prop.parentIsCheck(e.target)
    }
        
    return(
        <div className="listContainer">
            {
                tareas.length !== 0 ? <CreateTable tableRows={tableRows} showModal={prop.showModal} /> : <p>No hay datos XD</p>            
            }
        </div>
    );
}

export default ListaTareas;