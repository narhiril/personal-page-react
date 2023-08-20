import "./scss/SkillsSubsection.scss";

const SkillsSubsection = ({name, imageSrc}) => {

    return (
        <div className="skills-subsection">
            <img src={imageSrc} alt={name}></img>
            <label>{name}</label>
        </div>
    );
}
 
export default SkillsSubsection;
