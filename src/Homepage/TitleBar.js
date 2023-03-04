import "./TitleBar.scss";

const TitleBar = () => {
    const email = "roxannarusbarsky@yahoo.com";
    return (
        <div className='title-bar'>
          <div id="nameplate" className="container text-center">
            <h1>Roxanna Rusbarsky</h1>
            <h2 className="text-sm">Junior Web Developer</h2>
          </div>
          <div id="contact-links" className="container text-center">
            <div className="row">
              <div className="col gx-2">
                <a className="btn btn-lg btn-outline-primary" title={email} href={`mailto:${email}`}>Email</a>
              </div>
              <div className="col gx-2">
                <a className="btn btn-lg btn-outline-primary" title="linkedin.com/in/roxanna-rusbarsky" href="https://www.linkedin.com/in/roxanna-rusbarsky/">LinkedIn</a>
              </div>
              <div className="col gx-2">
                <a className="btn btn-lg btn-outline-primary" title="github.com/narhiril" href="https://github.com/narhiril">GitHub</a>
              </div>
            </div>
          </div>
        </div>
    );
}

export default TitleBar;
