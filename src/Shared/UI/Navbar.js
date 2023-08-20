import "./scss/Navbar.scss";
import ContactLinks from "./ContactLinks";
import NavigationLinks from "./NavigationLinks";

const Navbar = ({linkHandlers}) => {

    return ( 
        <div className="navbar navbar-expand-md container-fluid">
            <NavigationLinks onToggleEducation={() => linkHandlers.education}
                             onToggleTitle={() => linkHandlers.title}
                             onToggleSkills={() => linkHandlers.skills} />
            <ContactLinks />
        </div>
    );
}

export default Navbar;
