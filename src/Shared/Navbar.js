import "./Navbar.scss";

const Navbar = () => {
    return ( 
        <div className="navbar navbar-expand-md container-fluid">
            <div id="theme-menu" className="dropdown-center">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Select Theme</button>
            <ul class="dropdown-menu">
                <li>
                    <button className="dropdown-item theme-option" type="button" value="light">Light Theme</button>
                </li>
                <li>
                    <button className="dropdown-item theme-option" type="button" value="dark">Dark Theme</button>
                </li>
                <li>
                    <button className="dropdown-item theme-option" type="button" value="deepblue">Deep Blue Theme</button>
                </li>
                <li>
                    <button className="dropdown-item theme-option" type="button" value="redshift">Redshift Theme</button>
                </li>
            </ul>
            </div>
        </div>
    );
}

export default Navbar;
