import "./TitleBar.scss";
import placeholder from "../Homepage/pfp.jpg";
import linkedinlogo from "../Homepage/LI-Logo.png";
import githublogo from "../Homepage/github.png";

const TitleBar = () => {
    const email = "roxannarusbarsky@yahoo.com";
    return (
        <div className='title-bar'>
          <div id="nameplate">
            <img id="profile-img" src={placeholder} alt="Profile picture"></img>
            <h1>Roxanna Rusbarsky</h1>
            <h2 className="text-sm">Full Stack Web Developer</h2>
          </div>
          <div id="contact-links" className="container text-center">
                <a className="item-a btn btn-lg btn-outline-dark" 
                   title={email} 
                   href={`mailto:${email}`}>Email
                </a>
                <a className="item-b btn btn-lg btn-outline-dark" 
                   title="linkedin.com/in/roxanna-rusbarsky" 
                   href="https://www.linkedin.com/in/roxanna-rusbarsky/">
                  <img id="linkedin" src={linkedinlogo} alt="LinkedIn" />
                </a>
                <a className="item-c btn btn-lg btn-outline-dark" 
                   title="github.com/narhiril" 
                   href="https://github.com/narhiril">
                   <img id="github" src={githublogo} alt="GitHub" />
                </a>
          </div>
        </div>
    );
}

export default TitleBar;
