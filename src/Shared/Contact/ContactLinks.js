import linkedinlogo from "../../Assets/linkedin.png";
import githublogo from "../../Assets/github.png";
import "../Contact/ContactLinks.scss";

const ContactLinks = () => {
    const email = "roxannarusbarsky@yahoo.com";
    return (
        <div id="contact-links" className="container text-center">
              <a className="item-a btn btn-lg btn-outline-dark" 
                 title={email} 
                 href={`mailto:${email}`}>Email
              </a>
              <a className="item-b btn btn-lg btn-outline-dark" 
                 title="linkedin.com/in/roxanna-rusbarsky" 
                 href="https://www.linkedin.com/in/roxanna-rusbarsky/">
                <img id="linkedin" className="align-middle" src={linkedinlogo} alt="LinkedIn" />
              </a>
              <a className="item-c btn btn-lg btn-outline-dark" 
                 title="github.com/narhiril" 
                 href="https://github.com/narhiril">
                 <img id="github" className="align-middle" src={githublogo} alt="GitHub" />
              </a>
        </div>  
    );
}
 
export default ContactLinks;