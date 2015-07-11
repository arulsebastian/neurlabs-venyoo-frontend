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
      <div className="wrapper">
        <div className="left_sec">
          <Map />
          <TimeSlider />
          <DataTable />
        </div>
        <div className="right_sec">
          <Filters />
          <Actions />
        </div>
      </div>
    );
  }
});

export default Container;
