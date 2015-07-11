/* JS dependencies */
import React from "react";

/* Static dependencies */
import mapImage from '../images/map.jpg';

export default React.createClass({
  render () {
    return (
      <div className="map_sec"><img src={mapImage} alt="" /></div>
    );
  }
});
