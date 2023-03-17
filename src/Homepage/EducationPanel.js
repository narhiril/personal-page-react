import "./scss/EducationPanel.scss";
import launchcode from "../Assets/launchcodeCompleteLogo.png";
import webster from "../Assets/websterlogo.svg";
import { useState, useEffect, useRef } from "react";
import useWindowDimensions from "../Shared/Hooks/useWindowDimensions";
import RocketCanvas from "../Effects/RocketCanvas";

const EducationPanel = ({render, onFooterChange, animationDuration}) => {

    const buttonText = "Liftoff",
          countFrom = 9,
          interval = 1200,
          windowDim = useWindowDimensions(),
          [launchText, setLaunchText] = useState(buttonText),
          [canLaunch, setCanLaunch] = useState(true),
          [countdown, setCountdown] = useState(countFrom);

    useEffect(() => {
        makeTheCanvasActuallyWorkProperly();
    });

    function makeTheCanvasActuallyWorkProperly() {
        const logoElement = document.getElementById("lc-logo"),
              canvasContainer = document.getElementById("rocket-canvas");
        
        if (logoElement !== null && canvasContainer !== null) {
            const logoDimensions = logoElement.getBoundingClientRect();
            canvasContainer.style.left = `${logoDimensions.left}px`;
            canvasContainer.style.top = `${logoDimensions.top}px`;
            canvasContainer.style.width = `${logoDimensions.width}px`;
            canvasContainer.style.height = `${logoDimensions.height}px`;
            console.log("useEffect fired");
        }
    }

    function getRocketProperties() {
        const element = document.getElementById("lc-logo");
        if (element === null) {
            //if something has gone horribly wrong, draw off screen
            return {x: -2*windowDim.width, 
                    y: -2*windowDim.height};
        } else {
            const rect = element.getBoundingClientRect();
            return { x: rect.left, 
                     y: rect.top,
                     left: getComputedStyle(element).left,
                     top: getComputedStyle(element).top,
                     scaleX: rect.x / 512,
                     scaleY: rect.y / 512 };
        }
    }

    async function launch() {
        const button = document.getElementById("liftoff");
        if (button.hasAttribute("active") || !canLaunch) return;

        //begin sequence
        setCanLaunch(false);

        //launch button updates for styling
        button.setAttribute("active", true);
        button.classList.add("active");

        //launch sequence
        await launchDisableButtons().then((value) => {
            console.log(value);
        });
        launchFooter();
        launchCountdown(countFrom);

        //post-launch cleanup
        setTimeout(() => {
            launchEnableButtons().then((value) => {
                console.log(value);
            });

            //reset launch button, countdown, and flag for rocket canvas
            button.removeAttribute("active");
            button.classList.remove("active");
            setLaunchText(buttonText);
            setCountdown(countFrom);
            setCanLaunch(true);
        }, animationDuration + 500);
    }

    //alias for readability
    function launchEnableButtons() {
        return launchDisableButtons(false);
    }

    function launchDisableButtons(mode = true) {
        const buttons = document.querySelectorAll(".btn:not([active])");
        for (const btn of buttons) {
            if (mode) {
                btn.setAttribute("disabled", true);
                btn.classList.add("fade-color");
            }
            else {
                btn.removeAttribute("disabled");
                //delay to allow fade-in to finish
                setTimeout(() => {
                    btn.classList.remove("fade-color");
                }, 2500);
            }
        }
        return mode ? new Promise(resolve => resolve('Buttons disabled for launch sequence')) :
                      new Promise(resolve => resolve("Buttons returned to normal"));
    }

    async function launchCountdown(start) {
        let isValid = !isNaN(start) && start > 0;
        if(isValid) {
            const arr = [];
            for (let i = 0; i <= start; i++) {
                arr.unshift(i);
            }
            arr.map((num, index) => {
                setTimeout(() => {
                   setLaunchText(index === start ? buttonText : num);
                   setCountdown(index);
                }, (index+1) * interval);
                return true;
            });
        }
        return isValid;
    }

    async function launchFooter() {
        onFooterChange("three");
        if (isNaN(animationDuration)) {
            animationDuration = 2500;
        }
        setTimeout(() => {
            onFooterChange("react");
            //unlock the button
        }, animationDuration);
    }

    if (render) return (  
        <div className="education-panel">
            <div id="education" className="container">
                <h3>My Education</h3>
                <div className="education-grid container">
                    <label id="lc-label" className="education-label">LaunchCode</label>
                    <div id="lc-logo-container" className="education-logo">
                    <img id="lc-logo"
                         alt="LaunchCode logo" 
                         src={launchcode}></img>
                    <RocketCanvas rocketInfo={getRocketProperties()} 
                                  enabled={!canLaunch}
                                  count={countFrom}
                                  interval={interval}
                                  className="rocket-effect-component"
                                  />
                    </div>
                    <ul id="lc-list" className="education-list">
                        <li>March 2021 - February 2022</li>
                        <li>Women+ Web Development - C#/JavaScript</li>
                        <li>Selected as tech lead for <button id="liftoff" className="btn btn-navbar" onClick={() => launch()}>{launchText}</button> capstone project</li>
                    </ul>
                </div>
                <div className="education-grid container">
                    <label id="wu-label" className="education-label">Webster University</label>
                    <img id="wu-logo" 
                         className="education-logo" 
                         alt="Webster University logo" 
                         src={webster}></img>
                    <ul id="wu-list" className="education-list">
                        <li>Class of 2018</li>
                        <li>Bachelor of Arts - Game Design</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default EducationPanel;
