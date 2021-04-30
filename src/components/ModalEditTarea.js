import { createPortal } from "react-dom";

function ModalEditTarea(prop) {

    let datos = prop.editInfo

    function ModalContent(prop) {
        const filter = prop.data
        let newArray = filter.filter((i) => ('checked' in i) && i.checked === true)
        // console.log(newArray)
        if (newArray.length > 0){
            let lista = newArray.map((item, inx) => {

                return (
                    <div key={item.id} className="editData">
                        <h6 className="numTarea">Tarea {inx+1}</h6>
                        <hr/>
                        <div className="md-form">
                            <label htmlFor={'inputForm'+inx}>Tarea</label>
                            <input type="text" id={'inputForm'+inx} className="form-control" defaultValue={item.title}/>
                        </div>
                        <div className="md-form">
                            <label htmlFor={'areaForm'+inx}>Descripción</label>
                            <textarea id={'areaForm'+inx} className="md-textarea form-control" rows="3" defaultValue={item.description}></textarea>
                        </div>
                        <div>
                            <label htmlFor="optonForm">Estado: </label>
                            <select className="custom-select custom-select-sm" defaultValue={item.state}>
                                <option value="0">Pendiente</option>
                                <option value="1">Completado</option>
                            </select>
                        </div>
                        <input type="hidden" name="id" value={item.id} />
                        <br/>
                    </div>
                    )

            })
            return lista
        }
        return <p>There is no data (-v-)</p>
    }

    if(!prop.showModal) return null

    return createPortal(
        <div className="modal principal" tabIndex="-1" role="dialog" id="editarTareas" aria-labelledby="Editar" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content color-body">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar tareas</h5>
                    </div>
                    <div className="modal-body">

                        <ModalContent data={datos} />

                    </div>
                    <div className="modal-footer">
                        <div>
                            <button type="button" className="btn btn-primary" id="saveDataModal">Guardar</button>
                            <button type="button" className="btn btn-secondary" onClick={prop.closeModal}
                                id="closeModal" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    , document.getElementById('portal'));
}

export default ModalEditTarea;