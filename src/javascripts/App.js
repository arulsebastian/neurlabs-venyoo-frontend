/* Static dependencies */
import "../index.html";
import "../app.html";
import "../stylesheets/base";

/* JS dependencies */
import React from "react";
import VenyooApp from "./components/VenyooApp";

React.render(<VenyooApp />, document.querySelector("#main"));