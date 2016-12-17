import React, {PropTypes} from 'react'

export default class Main extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <div className="container container--primary">
        <div className="row header">
          <div className="twelve columns"><h1>WebPerf</h1></div>
        </div>
        {this.props.children}
      </div>
    )
  }
}
