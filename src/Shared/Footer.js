import "./Footer.scss";
import ReactLogo from "./logo.svg";

const Footer = () => {
    return (  
        <div className="footer container-fluid">
            <div id="react-footer">
                <span>Powered by React</span>
                <img id="react-logo" src={ReactLogo} alt="React Logo" />
            </div>
        </div>
    );
}

export default Footer;
