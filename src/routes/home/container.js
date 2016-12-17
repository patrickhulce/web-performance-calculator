import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {setRtt, setPayload, setParse, setThroughput} from 'src/reducers/options'
import Options from './components/options'
import Timing from './components/timing'

const Home = React.createClass({
  propTypes: {
    options: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  },
  render() {
    return (
      <div>
        <Options
          rtt={this.props.options.rtt}
          throughput={this.props.options.throughput}
          payload={this.props.options.payload}
          parse={this.props.options.parse}
          setRtt={this.props.actions.setRtt}
          setThroughput={this.props.actions.setThroughput}
          setPayload={this.props.actions.setPayload}
          setParse={this.props.actions.setParse}
          />
        <Timing
          rtt={this.props.options.rtt}
          throughput={this.props.options.throughput}
          payload={this.props.options.payload}
          parse={this.props.options.parse}
          responseTime={100}
          />
      </div>
    )
  }
})

export default connect(
  state => state,
  dispatch => ({actions: bindActionCreators({setRtt, setPayload, setParse, setThroughput}, dispatch)})
)(Home)
