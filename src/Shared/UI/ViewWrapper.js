import Navbar from '../../Shared/UI/Navbar';
import TitleBar from '../../Homepage/TitleBar';
import Footer from '../../Shared/UI/Footer';
import EducationPanel from "../../Homepage/EducationPanel";
import { useState, useCallback } from 'react';

const ViewWrapper = () => {
    const [showEducation, setShowEducation] = useState(false),
          [showTitle, setShowTitle] = useState(true),
          [footer, setFooter] = useState("react");

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

    const changeFooter = useCallback((x) => {
        setFooter(x);
    }, [setFooter]);

    return (
        <div id="view-wrapper">
            <Navbar linkHandlers={toggles}/>
            <TitleBar render={showTitle} />
            <EducationPanel render={showEducation} 
                            onFooterChange={changeFooter} />
            <Footer poweredBy={footer}/>
        </div>
    );
}

export default ViewWrapper;
