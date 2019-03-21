const e = React.createElement;

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      minute: 25,
      second: 0,
    };
    this.stoped = true;
  }

  increaseControlLength(control) {
    if (this.stoped) {
      console.log('Increasing ', control);
      let obj = {};
      obj[control] = this.state[control] + 1;
      this.setState(obj);
    }
  }

  decreaseControlLength(control) {
    if (this.stoped) {
      let obj = {};
      obj[control] = this.state[control] - 1;
      this.setState(obj);
    }
  }

  timer(callback) {
    this.intervalId = setInterval(callback, 1000);
  }

  start() {
    this.stoped = false;
    const callback = () => {
      if (this.state.second === 0) {
        this.setState({
          second: 59,
          minute: this.state.minute - 1,
        });
      } else {
        this.setState({
          second: this.state.second - 1,
        });
      }
    };
    this.timer(callback);
  }

  stop() {
    this.stoped = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  restart() {
    this.stoped = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.setState({
      minute: this.state.session,
      second: 0,
    });
  }

  render() {
    return e(
      'div',
      {},
      e('h1', {}, 'Pomodoro Clock'),
      e(Control, {
        title: 'Break Length',
        length: this.state.break,
        increase: () => this.increaseControlLength('break'),
        decrease: () => this.decreaseControlLength('break'),
      }),
      e(Control, {
        title: 'Session Length',
        length: this.state.session,
        increase: () => this.increaseControlLength('session'),
        decrease: () => this.decreaseControlLength('session'),
      }),
      e(Clock, { minute: this.state.minute, second: this.state.second }),
      e(Button, { text: 'Start', click: () => this.start() }),
      e(Button, { text: 'Stop', click: () => this.stop() }),
      e(Button, { text: 'Restart', click: () => this.restart() })
    );
  }
}

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
    };
  }

  render() {
    return e(
      'div',
      { className: 'length-control' },
      e('h3', {}, this.props.title),
      e(Button, { text: 'Up', click: this.props.increase }),
      e('div', {}, this.props.length),
      e(Button, { text: 'Down', click: this.props.decrease })
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      'button',
      {
        onClick: () => {
          this.props.click();
        },
      },
      this.props.text
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      'div',
      { id: 'clock' },
      e(
        'h2',
        {},
        'Session',
        e(
          'div',
          {},
          this.props.minute,
          ':',
          this.props.second <= 9 ? `0${this.props.second}` : this.props.second
        )
      )
    );
  }
}

const mainContainer = $('main')[0];
ReactDOM.render(e(PomodoroClock), mainContainer);
