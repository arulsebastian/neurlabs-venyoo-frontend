/* JS dependencies */
import React from 'react';

/* Stylesheet dependencies */
import sliderImage from '../images/start_image.jpg';

export default React.createClass({
  render () {
    return (
      <div className='start_detail'><img src={sliderImage} alt='' /></div>
    );
  }
});
