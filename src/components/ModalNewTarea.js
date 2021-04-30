import { createPortal } from "react-dom";

function ModalNewTarea(prop) {

    // function sendFormData(e) {
    //     console.log('lanzar');
    //     prop.createNew(e)
    // }

    if(!prop.showModal) return null

    return createPortal(
        <div className="modal principal" tabIndex="-1" role="dialog" id="newTarea" aria-labelledby="Editar" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content color-body">

                    <form method="POST" onSubmit={prop.createNew}>

                        <div className="modal-header">
                            <h5 className="modal-title">Crear nueva tarea</h5>
                        </div>
                        <div className="modal-body-new">

                            <div className="newContent">
                                <div className="createNewTarea-fill">
                                    <div className="md-form-new">
                                        <label htmlFor="title">Tarea</label>
                                        <input type="text" id="title" name="title" className="form-control" />
                                    </div>

                                    <div className="md-form-new">
                                        <label htmlFor="description">Descripción</label>
                                        <textarea id="description" name="description" className="md-textarea form-control" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <div>
                                <button type="submit" className="btn btn-primary" id="createNewTarea">Guardar</button>
                                <button type="button" className="btn btn-secondary" onClick={prop.closeModal}
                                    data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    , document.getElementById('portal'));
}

export default ModalNewTarea;