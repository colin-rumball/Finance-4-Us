import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const Handle = Slider.Handle;

const handle = (props) => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<Tooltip
			prefixCls="rc-slider-tooltip"
			overlay={`${value}% | ${100 - value}%`}
			visible={dragging}
			placement="top"
			key={index}
		>
			<Handle value={value} {...restProps} />
		</Tooltip>
	);
 };

const CustomSlider = (props) => (
   <div>
		<Slider 
			min={0} 
			max={100}
			onChange={props.onChange}
			defaultValue={props.split} 
			handle={handle}
			 />
   </div>
);

export default CustomSlider;