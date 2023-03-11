import "./scss/NavigationLinks.scss";

const NavigationLinks = ({onToggleEducation, onToggleTitle}) => {
    return (  
        <div id="nav-links">
            <button className="btn btn-navbar" onClick={onToggleTitle()}>Home</button>
            <button className="btn btn-navbar" onClick={onToggleEducation()}>Education</button>
            <button className="btn btn-navbar">Skills</button>
        </div>
    );
}

export default NavigationLinks;
