import "./scss/SkillsSubsection.scss";

const SkillsSubsection = ({name, imageSrc}) => {

    return (
        <div className="skills-subsection">
            <img src={imageSrc}></img>
            <text>{name}</text>
        </div>
    );
}
 
export default SkillsSubsection;
