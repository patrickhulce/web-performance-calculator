import React, {PropTypes} from 'react'

const LIBRARIES = {
  angular2: {network: 135, parse: 633},
  bootstrap: {network: 43, parse: 0},
  'font-awesome': {network: 103, parse: 0},
  jquery: {network: 29, parse: 85},
  lodash: {network: 24, parse: 71},
  preact: {network: 4, parse: 9},
  react: {network: 48, parse: 160},
  'semantic-ui': {network: 93, parse: 0},
  skeleton: {network: 5, parse: 0},
}

const NETWORKS = {
  '3G': {latency: 100, throughput: 750},
  '4G': {latency: 20, throughput: 4000},
  wifi: {latency: 5, throughput: 15000},
}

export default React.createClass({
  propTypes: {
    network: PropTypes.oneOf(Object.keys(NETWORKS)),
    libraries: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(LIBRARIES))),
    setRtt: PropTypes.func.isRequired,
    setPayload: PropTypes.func.isRequired,
    setParse: PropTypes.func.isRequired,
    setThroughput: PropTypes.func.isRequired,
  },
  handleClick() {
    const baseLatency = 40
    const {network, libraries} = this.props
    const sizes = libraries.map(name => LIBRARIES[name])
    const payload = sizes.reduce((kb, sizes) => kb + sizes.network, 0)
    const parse = sizes.reduce((kb, sizes) => kb + sizes.parse, 0)
    this.props.setRtt(baseLatency + NETWORKS[network].latency)
    this.props.setThroughput(NETWORKS[network].throughput)
    this.props.setPayload(payload)
    this.props.setParse(parse)
  },
  render() {
    return (
      <div className="quick-option" onClick={this.handleClick}>
        <span>{this.props.libraries.join(' + ')}</span>
        <span className="network">{this.props.network}</span>
      </div>
    )
  },
})
