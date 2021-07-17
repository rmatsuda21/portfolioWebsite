import { Component } from "react";
import PropTypes from 'prop-types';

class Star extends Component {
    render() {
        return (
        <svg width={this.props.width} viewBox="0 0 150 150" stroke={this.props.stroke} fill={this.props.fill} style={{position:this.props.position, top:this.props.top, left:this.props.left, right:this.props.right, bottom:this.props.bottom, zIndex:'-1'}} xmlns="http://www.w3.org/2000/svg">
            <path d="M43.2718 1.96718C44.0432 0.642641 45.9568 0.642642 46.7282 1.96718L60.3972 25.4354C60.6798 25.9206 61.1534 26.2647 61.7022 26.3835L88.2458 32.1314C89.7439 32.4558 90.3352 34.2757 89.3139 35.4187L71.2182 55.6708C70.8441 56.0895 70.6632 56.6462 70.7198 57.2049L73.4556 84.2255C73.61 85.7505 72.0619 86.8753 70.6593 86.2572L45.8065 75.3054C45.2927 75.079 44.7073 75.079 44.1935 75.3054L19.3407 86.2572C17.9381 86.8753 16.39 85.7505 16.5444 84.2255L19.2802 57.2049C19.3368 56.6462 19.1559 56.0895 18.7818 55.6708L0.686131 35.4187C-0.335178 34.2757 0.25613 32.4558 1.75423 32.1314L28.2978 26.3835C28.8466 26.2647 29.3202 25.9206 29.6028 25.4354L43.2718 1.96718Z"/>
        </svg>
        );
    }
}
export default Star;

Star.propTypes = {
    fill: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
    bottom: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired
};