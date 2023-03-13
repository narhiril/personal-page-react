import "./scss/EducationPanel.scss";
import rocketFull from "../Assets/launchcodeRocket.png";
import rocketNoFlame from "../Assets/launchcodeRocketNoFlame.png";
import flame from "../Assets/launchcodeFlame.png";
import launchcode from "../Assets/launchcodeCompleteLogo.png";
import webster from "../Assets/websterlogo.svg";
import { useState } from "react";

const EducationPanel = ({render, onFooterChange, animationDuration}) => {
    const buttonText = "Liftoff";
    const [launchText, setLaunchText] = useState(buttonText);
    const [readyForLaunch, setReadyForLaunch] = useState(true);

    async function launch() {
        const button = document.getElementById("liftoff");
        if (button.hasAttribute("active") || !readyForLaunch) return;

        //launch button updates for styling
        button.setAttribute("active", true);
        button.classList.add("active");

        //launch sequence
        await launchDisableButtons().then((value) => {
            console.log(value);
        });
        launchFooter();
        launchCountdown(9);

        //post-launch cleanup
        //setReadyForLaunch(false);
        setTimeout(() => {
            launchEnableButtons().then((value) => {
                console.log(value);
            });
            button.removeAttribute("active");
            button.classList.remove("active");
            setLaunchText(buttonText);
        }, animationDuration + 500);
    }

    //alias for readability
    async function launchEnableButtons() {
        return launchDisableButtons(false);
    }

    function launchDisableButtons(mode = true) {
        const buttons = document.querySelectorAll(".btn:not([active])");
        for (const btn of buttons) {
            if (mode) {
                btn.setAttribute("disabled", true);
                btn.classList.add("fade-color");
                return new Promise(resolve => resolve('Buttons disabled for launch sequence'));
            }
            else {
                btn.removeAttribute("disabled");
                //delay to allow fade-in to finish
                return new Promise(resolve => {
                    setTimeout(() => {
                        btn.classList.remove("fade-color");
                        resolve("Buttons returned to normal");
                    }, 2500);
                });
            }
        }
    }

    async function launchCountdown(start) {
        if(!isNaN(start)) {
            const arr = [];
            for (let i = 0; i <= start; i++) {
                arr.unshift(i);
            }
            arr.map((num, index) => {
                setTimeout(() => {
                   setLaunchText(index === start ? buttonText : num);
                }, (index+1) * 1200);
                return true;
            });
        }
        return true;
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
            <canvas id="education-canvas"></canvas>
            <div id="education" className="container">
                <h3>My Education</h3>
                <div className="education-grid container">
                    <label id="lc-label" className="education-label">LaunchCode</label>
                    <img id="lc-logo" 
                         className="education-logo" 
                         alt="LaunchCode logo" 
                         src={launchcode}></img>
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
