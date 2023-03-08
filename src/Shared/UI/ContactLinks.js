import linkedinlogo from "../../Assets/linkedin.png";
import githublogo from "../../Assets/github.png";
import "./ContactLinks.scss";
import { BsFillEnvelopeAtFill, BsLinkedin, BsGithub } from "react-icons/bs";
//<img id="linkedin" className="align-middle" src={linkedinlogo} alt="LinkedIn" />
//<img id="github" className="align-middle" src={githublogo} alt="GitHub" />

const ContactLinks = () => {
    const email = "roxannarusbarsky@yahoo.com";
    return (
        <div id="contact-links" className="container text-center">
              <a className="item-a btn btn-lg btn-outline-dark" 
                 title={email} 
                 href={`mailto:${email}`}><BsFillEnvelopeAtFill /> Email
              </a>
              <a className="item-b btn btn-lg btn-outline-dark text-center" 
                 title="linkedin.com/in/roxanna-rusbarsky" 
                 href="https://www.linkedin.com/in/roxanna-rusbarsky/"><BsLinkedin /> LinkedIn
              </a>
              <a className="item-c btn btn-lg btn-outline-dark text-center" 
                 title="github.com/narhiril" 
                 href="https://github.com/narhiril"><BsGithub /> GitHub
              </a>
        </div>  
    );
}
 
export default ContactLinks;