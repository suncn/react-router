import React,{Component} from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, withRouter } from 'react-router'

import withExampleBasename from '../withExampleBasename'

const App = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
          <li><Link to="/form" activeClassName="active">Form</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const Dashboard = React.createClass({
  render() {
    return <h1>Dashboard</h1>
  }
})

class FormComponent extends Component{

  constructor(){
      super();
	  this.state = {
		  textValue:"ohai2"
	  }
  }
	 componentWillMount() {
	  console.log("this.props.router", this.props.route);
      this.props.router.setRouteLeaveHook(
        this.props.route,
        this.routerWillLeave.bind(this)
      )
    }

    routerWillLeave() {
      if (this.state.textValue)
        return 'You have unsaved information, are you sure you want to leave this page?'
    }

    handleChange(event) {
		console.log("this", this);
      this.setState({
        textValue: event.target.value
      })
    }

    handleSubmit(event) {
      event.preventDefault()

      this.setState({
        textValue: ''
      }, () => {
        this.props.router.push('/')
      })
    }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <p>Click the dashboard link with text in the input.</p>
            <input type="text" ref="userInput" value={this.state.textValue} onChange={this.handleChange.bind(this)} />
            <button type="submit">Go</button>
          </form>
        </div>
      )
    }

}

const Form = withRouter(FormComponent)

render((
  <Router history={withExampleBasename(browserHistory, __dirname)}>
    <Route path="/" component={App}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="form" component={Form} />
    </Route>
  </Router>
), document.getElementById('example'))
