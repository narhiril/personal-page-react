import "./Navbar.scss";
import ContactLinks from "./Contact/ContactLinks";

const Navbar = () => {

    return ( 
        <div className="navbar navbar-expand-md container-fluid">
            <ContactLinks />
        </div>
    );
}

export default Navbar;
