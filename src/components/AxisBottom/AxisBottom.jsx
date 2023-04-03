import './style.css';

const AxisBottom = ({ xScale, innerHeight, tickFormat}) =>
  xScale.ticks().map((tickValue) => (
    <g
      className='tick'
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line y2={innerHeight} />
      <text dy='.71em' y={innerHeight + 3}>
        {tickFormat(tickValue)}
       
      </text>
    </g>
  ));

export default AxisBottom;
