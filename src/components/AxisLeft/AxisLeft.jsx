import './style.css';

const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue) => (
   
    <text
      className='tick'
      key={tickValue}
      dy='.32em'
      x='-9'
      y={yScale(tickValue) + yScale.bandwidth() / 2}
    >
      {tickValue}
    </text>
   
  ));

export default AxisLeft;
