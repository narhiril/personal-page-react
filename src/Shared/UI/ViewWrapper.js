import Navbar from '../../Shared/UI/Navbar';
import TitleBar from '../../Homepage/TitleBar';
import Footer from '../../Shared/UI/Footer';
import EducationPanel from "../../Homepage/EducationPanel";
import { useState } from 'react';

const ViewWrapper = () => {
    const [showEducation, setShowEducation] = useState(false);
    const [showTitle, setShowTitle] = useState(true);
    return (
        <div id="view-wrapper">
            <Navbar />
            <TitleBar render={showTitle} />
            <EducationPanel render={showEducation}/>
            <Footer />
        </div>
    );
}

export default ViewWrapper;
