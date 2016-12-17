import React, {PropTypes} from 'react'
import UnboundQuickOption from './quick-option'

export default React.createClass({
  propTypes: {
    rtt: PropTypes.number.isRequired,
    throughput: PropTypes.number.isRequired,
    payload: PropTypes.number.isRequired,
    parse: PropTypes.number.isRequired,
    setRtt: PropTypes.func.isRequired,
    setThroughput: PropTypes.func.isRequired,
    setPayload: PropTypes.func.isRequired,
    setParse: PropTypes.func.isRequired,
  },
  onChangeRtt(evt) {
    this.props.setRtt(Number(evt.target.value))
  },
  onChangeThroughput(evt) {
    this.props.setThroughput(Number(evt.target.value) * 1000)
  },
  onChangePayload(evt) {
    this.props.setPayload(Number(evt.target.value))
  },
  onChangeParse(evt) {
    this.props.setParse(Number(evt.target.value))
  },
  renderRtt() {
    return (
      <div className="six columns">
        <label htmlFor="rtt">RTT (ms):</label>
        <input name="rtt" type="text" value={this.props.rtt} onChange={this.onChangeRtt} />
      </div>
    )
  },
  renderThroughput() {
    return (
      <div className="six columns">
        <label htmlFor="throughput">Throughput (mbps):</label>
        <input name="throughput" type="text" value={this.props.throughput / 1000} onChange={this.onChangeThroughput} />
      </div>
    )
  },
  renderPayloadSize() {
    return (
      <div className="six columns">
        <label htmlFor="payload">Payload (kB):</label>
        <input name="payload" type="text" value={this.props.payload} onChange={this.onChangePayload} />
      </div>
    )
  },
  renderParseSize() {
    return (
      <div className="six columns">
        <label htmlFor="parse">Parse (kB):</label>
        <input name="parse" type="text" value={this.props.parse} onChange={this.onChangeParse} />
      </div>
    )
  },
  renderQuickOptions() {
    const QuickOption = props => (
      <UnboundQuickOption network={props.network}
        libraries={props.libraries}
        setRtt={this.props.setRtt}
        setPayload={this.props.setPayload}
        setParse={this.props.setParse}
        setThroughput={this.props.setThroughput}
        />
    )

    return (
      <div className="twelve columns">
        <QuickOption network={'3G'} libraries={['jquery']} />
        <QuickOption network={'3G'} libraries={['preact', 'skeleton']} />
        <QuickOption network={'3G'} libraries={['react', 'bootstrap']} />
        <QuickOption network={'3G'} libraries={['angular2', 'bootstrap']} />
      </div>
    )
  },
  render() {
    return (
      <div className="options">
        <div className="row">
          {this.renderRtt()}
          {this.renderThroughput()}
        </div>
        <div className="row">
          {this.renderPayloadSize()}
          {this.renderParseSize()}
        </div>
        <div className="row quick-options">
          <h4>Quick Presets</h4>
          {this.renderQuickOptions()}
        </div>
      </div>
    )
  },
})
