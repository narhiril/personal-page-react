import SkillsSubsection from "./SkillsSubsection";
import jsIcon from "../Assets/JavaScript-logo.png";
//import tsIcon from "";
//import cSharpIcon from "";
//import sassIcon from "";
//import htmlIcon from "";
import "./scss/SkillsPanel.scss";

const SkillsPanel = ({render}) => {
    if (render) return ( 
        <div className="skills-panel">
            <SkillsSubsection name={"JavaScript"} 
                              imageSrc={jsIcon}
            />
            {/*
            <SkillsSubsection name={"TypeScript"}
                              icon={tsIcon} 
            />
            <SkillsSubsection name={"C#"}
                              icon={cSharpIcon} 
            />
            <SkillsSubsection name={"Sass"} 
                              icon={sassIcon}
            />
            <SkillsSubsection name={"HTML/CSS"} 
                              icon={htmlIcon}
            />
            */}
        </div>
    );
}
 
export default SkillsPanel;
