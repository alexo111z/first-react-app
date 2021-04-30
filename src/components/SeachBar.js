
function SeachBar(prop) {

    function getChanges(e) {
        prop.buscador(e.target.value)
    }

    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" name="searchWord"
                placeholder="Buscar por tarea o descripción" onChange={getChanges}
                aria-label="Buscar por tarea o descripción" aria-describedby="basic-addon2" />
            <div className="input-group-append">
                <button type="submit" className="btn btn-primary buttonSearch" >Buscar</button>
            </div>
        </div>
    );
}

export default SeachBar;