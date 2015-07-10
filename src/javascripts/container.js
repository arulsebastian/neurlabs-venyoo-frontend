/* JS dependencies */
import React from "react";
import Map from "./map";
import TimeSlider from "./timeslider";
import DataTable from "./datatable";
import Filters from "./filters";
import Actions from "./actions";

/* Stylesheet dependencies */
// import "stylesheets/modules/container";

const Container = React.createClass({
  render () {
    return (
      <div className="container">
        <div className="leftCol">
          <Map />
          <TimeSlider />
          <DataTable />
        </div>
        <div className="rightCol">
          <Filters />
          <Actions />
        </div>
      </div>
    );
  }
});

export default Container;
