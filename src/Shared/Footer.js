import "./Footer.scss";
import ReactLogo from "../Assets/reactlogo.svg";
import ThemeMenu from "./Themes/ThemeMenu";

const Footer = () => {
    return (  
        <div className="footer container-fluid">
            <ThemeMenu />
            <div id="react-footer">
                <span>Powered by React</span>
                <img id="react-logo" src={ReactLogo} alt="React Logo" />
            </div>
        </div>
    );
}

export default Footer;
