import React, {PropTypes} from 'react'

// Nexus 5 1MB of JS ~= 1750ms
const PARSE_RATE_KBPS = 1000 / 1.75

export default React.createClass({
  propTypes: {
    rtt: PropTypes.number.isRequired,
    throughput: PropTypes.number.isRequired,
    responseTime: PropTypes.number.isRequired,
    payload: PropTypes.number.isRequired,
    parse: PropTypes.number.isRequired,
  },
  computeTiming() {
    let {payload, parse, rtt, throughput, responseTime} = this.props
    let cwnd = 1460 * 10
    let cwndLimit = (this.props.rtt / 1000) * (throughput * 1000 / 8)

    let elapsed = rtt + responseTime
    let transferred = 0
    let frames = []
    let stages = {}

    // Do the network
    while (transferred < this.props.payload * 1000) {
      const prior = transferred
      elapsed += this.props.rtt
      transferred = Math.min(this.props.payload * 1000, prior + cwnd)

      frames.push([transferred - prior, transferred, this.props.rtt, elapsed])
      cwnd = Math.min(cwnd * 2, cwndLimit)
    }

    // Parse the files
    const parseTime = (parse / PARSE_RATE_KBPS) * 1000
    elapsed += parseTime
    stages.parse = [parseTime, elapsed]

    const duration = elapsed
    return {stages, frames, duration}
  },
  renderBody(frames, stages) {
    const titles = {0: 'First Byte', [frames.length - 1]: 'Last Byte'}
    return (
      <tbody>
        <tr>
          <td>TCP Handshake</td>
          <td className="hidden-xs"></td>
          <td>{this.props.rtt}ms</td>
          <td>{this.props.rtt}ms</td>
        </tr>
        <tr>
          <td>Server Calculating Response</td>
          <td className="hidden-xs"></td>
          <td>{(this.props.responseTime || 0)}ms</td>
          <td>{this.props.rtt + this.props.responseTime}ms</td>
        </tr>
        {frames.map((data, i) => (
          <tr key={i}>
            <td>{titles[i] || `Congestion Window #${i}`}</td>
            <td className="hidden-xs">{data[0] / 1000}kb</td>
            <td>{data[2]}ms</td>
            <td>{data[3]}ms</td>
          </tr>
        ))}
        <tr>
          <td>Parse</td>
          <td className="hidden-xs"></td>
          <td>{stages.parse[0]}ms</td>
          <td>{stages.parse[1]}ms</td>
        </tr>
      </tbody>
    )
  },
  render() {
    const {frames, stages, duration} = this.computeTiming()

    return (
      <div className="row timings">
        <h3>Data Transfer Timeline ({duration}ms total)</h3>
        <table className="data-transferred">
          <thead>
            <tr>
              <th>Context</th>
              <th className="hidden-xs">Data Sent</th>
              <th>Time Spent</th>
              <th>Time Elapsed</th>
            </tr>
          </thead>
          {this.renderBody(frames, stages)}
        </table>
      </div>
    )
  },
})
