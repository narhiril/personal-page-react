import "./Footer.scss";
import ReactLogo from "./logo.svg";

const Footer = () => {
    return (  
        <div className="footer">
            <span>Powered by React</span>
            <img id="react-logo" src={ReactLogo} alt="React Logo" />
        </div>
    );
}

export default Footer;
