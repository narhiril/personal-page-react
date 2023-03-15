import "./scss/Footer.scss";
import ReactLogo from "../../Assets/reactlogo.svg";
import ThreeJSLogo from "../../Assets/threejslogo.svg";
import ThemeMenu from "../Themes/ThemeMenu";
import { useEffect } from "react";

const Footer = ({poweredBy}) => {
    
    useEffect(() => {
        activeFooter();
    });

    function activeFooter() {
        try {
            const react = document.getElementById("react-footer");
            const three = document.getElementById("threejs-footer");
            switch (poweredBy) {
                default:
                case "react":
                    react.classList.add("active-footer");
                    three.classList.remove("active-footer");
                    break;
                case "three":
                    react.classList.remove("active-footer");
                    three.classList.add("active-footer");
                    break;
            }
        } catch (e) { 
            console.error("Unable to find active footer element.");
        }
    }

    return (
        <div className="footer container-fluid">
            <ThemeMenu />
            <div className="powered-by" id="react-footer">
                <span>Powered by React</span>
                <img id="footer-logo" className="react" src={ReactLogo} alt="React Logo" />
            </div>
            <div className="powered-by" id="threejs-footer">
                <span>Powered by Three.js</span>
                <img id="footer-logo" className="three" src={ThreeJSLogo} alt="Three.js Logo" />
            </div>
        </div>
    );
}

export default Footer;
