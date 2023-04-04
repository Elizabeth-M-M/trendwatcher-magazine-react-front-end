import React from "react";

const Footer = () => {
  return (
    <div className="footer text-light p-3 ">
      <div className="container">
        <div className="row text-center">
          <div className="col-6 d-md-block d-none text-md-left">
            <div>
              <h6 className="fw-bold text-uppercase mb-3">Contact us</h6>
              <p>Telephone - 07111111111</p>
              <p>Email - info@trendwatcherdaily.com</p>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="fw-bold text-uppercase mb-3">Follow us</h6>
            <div className="mb-3">
              <i className="bi bi-facebook me-4"></i>
              <i className="bi bi-twitter me-4"></i>
              <i className="bi bi-instagram me-4"></i>
              <i className="bi bi-whatsapp me-4"></i>
            </div>
            <div>
              <span className="header-font me-5">TWD</span>
              <span> Copyright &copy; 2023 Trend Watcher Daily</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
