import "./scss/EducationPanel.scss";
import launchcode from "../Assets/launchcodeFull.png";
import webster from "../Assets/websterlogo.svg";
import { useState } from "react";

const EducationPanel = ({render}) => {
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
                        <li>Selected as tech lead for <button id="liftoff" className="btn btn-navbar">Liftoff</button> capstone project</li>
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
