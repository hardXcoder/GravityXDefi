import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faTwitter,
  faMedium,
  faApple,
} from "@fortawesome/free-brands-svg-icons";

import opensea from "../images/opensea.png";
import twitter from "../images/twitter.png";

import { Link } from "react-router-dom";

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());
  return (
    <div className="social-container">
      <div className="social-links">
        <div className="copyrightContainer ">
          Copyright &#169; {currentYear} GravityX Capital
        </div>
      </div>
    </div>
  );
}
