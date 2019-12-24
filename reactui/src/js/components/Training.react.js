/**
 * @jsx React.DOM
 */

var Flux = require('../Flux');
var React = require('react');
var Constants = require('../Constants');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var WstkListControl = require('./WstkListControl.react');
var Random = require("random-js");
var engine = Random.engines.mt19937().autoSeed();

class Training extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: 'Training',
    };
  }

  componentDidMount() {
    Flux.stores.store.getBuildInfo(function(info) {
      this.setState({
        version: info.version
      });
      this.forceUpdate();
    }.bind(this));

    Flux.stores.store.on('change', function() {
      this.setState({
        gatewaysettings: Flux.stores.store.gatewaysettings
      });
    }.bind(this));
  }

  componentWillUnmount() {
    Flux.stores.store.removeListener('change')
  }

  render() {
    var recvDeviceList = Flux.stores.store.getHumanReadableMultiSensors();
    var wstkListCtrl = _.map(recvDeviceList, (item) => {
      return (
        <WstkListControl item={item} key={item.name}/>
      );
    }, this);
    var isDeviceListEmpty = (wstkListCtrl.length === 0) ? true : false;

    var devices = (
      <div className="column">
        <h4 className="ui header">Attached Devices</h4>
        {isDeviceListEmpty ?
          <div>
            <div className="ui message">
              <div className="header">No Attached Devices</div>
            </div>
          </div> :
          <div className="ui segment">
            <div className="ui divided list device-list">
              <table className="ui table">
                <tr>
                  <th className="ui table th one wide">Node ID</th>
                  <th className="ui table th one wide">Eui64</th>
                  <th className="ui table th one wide">Device Type</th>
                  <th className="ui table th one wide">Endpoint</th>
                  <th className="ui table th one wide">User Name</th>
                  <th className="ui table th one wide">Temperature</th>
                </tr>
                {wstkListCtrl}
              </table>
            </div>
          </div>
        }
      </div>
    );

    return (
      <div className="ui segment control-panel" style={{margin: '0rem', borderRadius: '0rem'}}>
        <div className="header">
        <img className="logo"
          src="assets/silicon-labs-logo.png" />
        <h3 className="title">ZigBee Training Monitor</h3>
        </div>
        <div className="ui divider"></div>
        <div className="ui stackable two column grid">
          {devices}
        </div>
        
        <div className="ui divider"></div>

        <div className="footer">
          <h5 className="ui right aligned header">ZigBee Gateway Version: {this.state.version}</h5>
          <h5 className="ui right aligned header">
            {this.state.gatewaysettings ? 'NCP Stack Version: ' + this.state.gatewaysettings.ncpStackVersion : 'NCP: Down'}
          </h5>
        </div>
      </div>
    );
  }
}

module.exports = Training;
