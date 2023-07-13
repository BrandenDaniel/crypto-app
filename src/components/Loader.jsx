import React from "react";
import "../Sass/Loader.scss";

function Loader() {
  return (
    <div className="loader">
      <div class="lds-circle">
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
