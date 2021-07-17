import { Component } from "react";
import PropTypes from 'prop-types';

class Cloud extends Component {
    render() {
        return (
        <svg width={this.props.width} viewBox="0 0 154 75" stroke={this.props.stroke} fill={this.props.fill} style={{position:this.props.position, top:this.props.top, left:this.props.left, right:this.props.right, bottom:this.props.bottom}} xmlns="http://www.w3.org/2000/svg">
            <path d="M110.206 19.7548C106.736 8.46601 92.2915 0 75 0C57.583 0 43.0548 8.58932 39.7198 20.001C39.6467 20.0003 39.5734 20 39.5 20C31.9457 20 25.6536 23.6609 24.2789 28.5067C10.3895 30.6361 0 39.2266 0 49.5C0 61.3741 13.8792 71 31 71C35.3618 71 39.5132 70.3752 43.2783 69.2477C48.2449 70.3747 53.7316 71 59.5 71C66.8154 71 73.6778 69.9943 79.601 68.235C82.6034 69.9393 86.8246 71 91.5 71C94.75 71 97.7806 70.4875 100.335 69.6025C105.991 72.9792 113.177 75 121 75C139.225 75 154 64.031 154 50.5C154 37.368 140.084 26.6491 122.603 26.0284C118.973 23.4241 114.679 21.2174 110.206 19.7548Z"/>
        </svg>
        );
    }
}
export default Cloud;

Cloud.propTypes = {
    fill: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
    bottom: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired
};