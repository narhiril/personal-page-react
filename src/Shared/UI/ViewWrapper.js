import Navbar from '../../Shared/UI/Navbar';
import TitleBar from '../../Homepage/TitleBar';
import Footer from '../../Shared/UI/Footer';
import EducationPanel from "../../Homepage/EducationPanel";
import SkillsPanel from "../../Homepage/SkillsPanel";
import { useState, useCallback } from 'react';
import "./scss/ViewWrapper.scss";

const ViewWrapper = () => {
    const [showEducation, setShowEducation] = useState(false),
          [showTitle, setShowTitle] = useState(true),
          [showSkills, setShowSkills] = useState(false),
          [activePanel, setActivePanel] = useState(""),
          [footer, setFooter] = useState("react");

    function setTitleMode(active = false, titleTextMode = "") {
        setShowTitle(active);
        setActivePanel(titleTextMode);
    }

    function renderEducation() {
        setTitleMode(false, "education");
        setShowEducation(true);
        setShowSkills(false);
    }

    function renderTitle() {
        setTitleMode(true, "");
        setShowEducation(false);
        setShowSkills(false);
    }

    function renderSkills() {
        setTitleMode(true, "skills");
        setShowEducation(false);
        setShowSkills(true);
    }

    const toggles = {
        education: () => renderEducation(),
        title: () => renderTitle(),
        skills: () => renderSkills()
    }

    const changeFooter = useCallback((x) => {
        setFooter(x);
    }, [setFooter]);

    return (
        <div id="view-wrapper">
            <Navbar linkHandlers={toggles}/>
            <TitleBar render={showTitle} activePanel={activePanel}/>
            <EducationPanel render={showEducation} 
                            onFooterChange={changeFooter} />
            <SkillsPanel render={showSkills} />
            <Footer poweredBy={footer}/>
        </div>
    );
}

export default ViewWrapper;
