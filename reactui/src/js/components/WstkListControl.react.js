/**
 * @jsx React.DOM
 */

var Flux  = require('../Flux');
var React = require('react');
var Constants = require('../Constants');

class WstkListControl extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayName: 'WstkListControl',
    };
  }

  render() {
    var item = this.props.item;
    var wstkListControl;

    if (item.data.temperatureValue !== undefined && item.data.manufacturerName) {
      wstkListControl = (
        <div>
          <tr>
            <td className="ui table td one wide">{item.data.nodeId}</td>
            <td className="ui table td one wide">{item.data.deviceEndpoint.eui64}</td>
            <td className="ui table td one wide">{item.desc}</td>
            <td className="ui table td one wide">{item.data.deviceEndpoint.endpoint}</td>
            <td className="ui table td one wide">{item.data.manufacturerName}</td>
            <td className="ui table td one wide">{item.data.temperatureValue + '°C'}</td>
          </tr>
        </div>
      );
    } else {
      wstkListControl = (
        <div>
        </div>
      );
    }

    return (
      <div>
        {wstkListControl}
      </div>
    );
  }
}

WstkListControl.propTypes = {
  item: React.PropTypes.object.isRequired,
};

module.exports = WstkListControl;
