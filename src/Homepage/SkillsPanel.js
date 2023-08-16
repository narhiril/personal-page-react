import SkillsSubsection from "./SkillsSubsection";
import jsIcon from "../Assets/skills/JavaScript-logo.png";
import tsIcon from "../Assets/skills/tslogo-thumb.png";
import cSharpIcon from "../Assets/skills/csharp-thumb.svg";
import sassIcon from "../Assets/skills/sass-thumb.png";
import htmlIcon from "../Assets/skills/html5-thumb.png";
import reactIcon from "../Assets/reactlogo.svg";
import "./scss/SkillsPanel.scss";

const SkillsPanel = ({render}) => {
    if (render) return ( 
        <div className="skills-container">
            <div className="skills-panel">
                <SkillsSubsection name={"JavaScript"} 
                                  imageSrc={jsIcon}
                />
                <SkillsSubsection name={"TypeScript"}
                                  imageSrc={tsIcon} 
                />
                <SkillsSubsection name={"C#"}
                                  imageSrc={cSharpIcon} 
                />
                <SkillsSubsection name={"HTML5 / CSS"} 
                                  imageSrc={htmlIcon}
                />
                <SkillsSubsection name={"Sass / SCSS"} 
                                  imageSrc={sassIcon}
                />
                <SkillsSubsection name={"React"} 
                                  imageSrc={reactIcon}
                />
            </div>
        </div>
    );
}
 
export default SkillsPanel;
