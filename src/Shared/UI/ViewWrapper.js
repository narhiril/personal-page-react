import Navbar from '../../Shared/UI/Navbar';
import TitleBar from '../../Homepage/TitleBar';
import Footer from '../../Shared/UI/Footer';
import EducationPanel from "../../Homepage/EducationPanel";
import { useState } from 'react';

const ViewWrapper = () => {
    const [showEducation, setShowEducation] = useState(false);
    const [showTitle, setShowTitle] = useState(true);
    const [footer, setFooter] = useState("react");
    const launchAnimationDuration = 10000;

    function renderEducation() {
        setShowTitle(false);
        setShowEducation(true);
    }

    function renderTitle() {
        setShowTitle(true);
        setShowEducation(false);
    }

    const toggles = {
        education: () => renderEducation(),
        title: () => renderTitle()
    }

    return (
        <div id="view-wrapper">
            <Navbar linkHandlers={toggles}/>
            <TitleBar render={showTitle} />
            <EducationPanel render={showEducation} 
                            onFooterChange={(x) => setFooter(x)} 
                            animationDuration={launchAnimationDuration}/>
            <Footer poweredBy={footer}/>
        </div>
    );
}

export default ViewWrapper;
