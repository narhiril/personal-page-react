import { useState, useRef, useEffect } from "react";
import "./scss/TitleBar.scss";
import placeholder from "../Assets/pfp.jpg";

const TitleBar = ({render, activePanel}) => {
    const primary = useRef(),
          secondary = useRef();

    const headers = {
        default: "Roxanna Rusbarsky", 
        //education: "My Education",
        skills: "My Skillset"
    }, subheaders = {
        default: "Full Stack Web Developer",
        //rotating: [],
    };

    const [primaryText, setPrimaryText] = useState(headers.default),
          [secondaryText, setSecondaryText] = useState(subheaders.default);

    useEffect(() => {
        if (!primary.current || !secondary.current) return;
        hideTitleText();
        const fadeTimer = setTimeout(() => {
          onPanelChange(activePanel);
        }, 250);

        return () => { clearTimeout(fadeTimer); };  
    }, [activePanel]);

    function onPanelChange(panel) {
        let h1, 
            h2 = "";
        switch(panel) {
            //case "education":
              //h1 = headers.education;
              //break;
            case "skills":
              h1 = headers.skills;
              break;
            default:
              h1 = headers.default;
              h2 = subheaders.default;
              break;
        }
        updateText(h1, h2);
    }
    
    function updateText(h1, h2 = "") {
        if (!primary.current || !secondary.current) return;
        setPrimaryText(h1);
        primary.current.classList.remove("invisible");
        if (h2 !== "") {
          setSecondaryText(h2);
          secondary.current.classList.remove("invisible");
          primary.current.classList.remove("no-secondary");
        } else {
          secondary.current.classList.add("invisible");
          primary.current.classList.add("no-secondary");
        }
    }

    function hideTitleText() {
        primary.current.classList.add("invisible");
        secondary.current.classList.add("invisible");
    }

    if (render) return (
        <div className='title-bar'>
          <div id="nameplate">
            <img id="profile-img" src={placeholder} alt="Profile"></img>
            <h1 ref={primary}>{primaryText}</h1>
            <h2 ref={secondary} className="text-sm">{secondaryText}</h2>
          </div>
        </div>
    );
}

export default TitleBar;
