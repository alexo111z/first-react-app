
function SideBar() {

    function openSideNav() {
        document.getElementById('menuBar').style.width = '160px';
        document.getElementById('root').style.marginLeft = '160px';
        document.getElementById('iconOpenNav').style.visibility = "hidden";
    }

    function closeSideNav() {
        document.getElementById('menuBar').style.width = '0';
        document.getElementById('root').style.marginLeft = '0';
        document.getElementById('iconOpenNav').style.visibility = "visible";
    }

    return(
        <div className="sideBar">
            <a onClick={openSideNav}>
                <i className="fa fa-bars fa-lg" aria-hidden="true" id="iconOpenNav"></i>
            </a>

            <div className="sidenav" id="menuBar">
                <a onClick={closeSideNav}>
                    <i className="fa fa-bars fa-lg" aria-hidden="true" id="iconCloseNav"></i>
                </a>
                <div className="navList">
                    <ul>
                        <li><a href="">Perfil</a></li>
                        <li><a href="">Inicio</a></li>
                        <li><a href="">Acerca de...</a></li>
                        <li><a href="">Lista</a></li>
                        <li><a href="">Contacto</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;