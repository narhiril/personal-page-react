import SkillsSubsection from "./SkillsSubsection";
import "./scss/SkillsPanel.scss";

const SkillsPanel = ({render}) => {
    if (render) return ( 
        <div className="skills-panel">
            <SkillsSubsection name={"JavaScript"} 
            />
            <SkillsSubsection name={"TypeScript"} 
            />
            <SkillsSubsection name={"C#"} 
            />
            <SkillsSubsection name={"Sass"} 
            />
            <SkillsSubsection name={"HTML/CSS"} 
            />
        </div>
    );
}
 
export default SkillsPanel;
