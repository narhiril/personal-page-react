import "./scss/NavigationLinks.scss";

const NavigationLinks = ({onToggleEducation, onToggleTitle, onToggleSkills}) => {
    return (  
        <div id="nav-links">
            <button className="btn btn-navbar" onClick={onToggleTitle()}>Home</button>
            <button className="btn btn-navbar" onClick={onToggleEducation()}>Education</button>
            <button className="btn btn-navbar" onClick={onToggleSkills()}>Skills</button>
        </div>
    );
}

export default NavigationLinks;
