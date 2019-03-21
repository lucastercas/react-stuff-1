console.log('Welcome to the Drum Machine');

const e = React.createElement;

class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.audiosOn = [];
    this.audiosOff = [];
    for (let i = 0; i < 9; i++) {
      this.audiosOn.push(`audios/drum/${i}.mp3`);
      this.audiosOff.push('#');
    }
    this.state = {
      chord: 0,
      power: true,
      bank: true,
      audios: this.audiosOn,
    };
  }

  handlePlayChord(chord) {
    console.log('Playing Chord: ', chord);
    this.setState({
      chord: chord,
    });
    $(`#${chord}`)[0]
      .play()
      .then(aux => {
        console.log(aux);
      });
  }

  handlePower() {
    if (this.state.power) {
      this.setState({
        power: false,
        audios: this.audiosOff,
      });
    } else {
      this.setState({
        power: true,
        audios: this.audiosOn,
      });
    }
  }

  handleBank() {
    this.setState({
      bank: !this.state.bank,
    });
  }

  render() {
    console.log('Rendering Drum');
    return e(
      'div',
      { id: 'drum-machine' },
      e(DrumPads, {
        handlePlayChord: chord => this.handlePlayChord(chord),
        power: this.state.power,
        bank: this.state.bank,
        audios: this.state.audios,
      }),
      e(DrumControls, {
        chord: this.state.chord,
        handlePower: () => this.handlePower(),
        handleBank: () => this.handleBank(),
      })
    );
  }
}

class DrumPads extends React.Component {
  constructor(props) {
    super(props);
  }

  constructPads() {
    let pads = [];
    for (let i = 0; i < 9; i++) {
      pads.push(
        e(PadButton, {
          key: i.toString(),
          chord: i,
          handlePlayChord: this.props.handlePlayChord,
          audio: this.props.audios[i],
        })
      );
    }
    return pads;
  }

  render() {
    console.log('Rendering DrumPad');
    const pads = this.constructPads();
    return e('div', { id: 'drum-pads' }, pads);
  }
}

class PadButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(`Rendering PadButton ${this.props.chord}: ${this.props.audio}`);
    return e(
      'div',
      {
        className: 'pad-btn',
        onClick: () => {
          this.props.handlePlayChord(this.props.chord);
        },
      },
      e('audio', {
        id: this.props.chord,
        src: this.props.audio,
      }),
      this.props.chord
    );
  }
}

class DrumControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      'div',
      { id: 'drum-controls' },
      e(PowerButton, { handler: this.props.handlePower }),
      e(Display, { chord: this.props.chord }),
      e(VolumeSlider),
      e(BankButton, { handler: this.props.handleBank })
    );
  }
}

class PowerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      float: 'right',
    };
  }

  handleClick() {
    if (this.state.float === 'left') {
      this.setState({
        float: 'right',
      });
    } else {
      this.setState({
        float: 'left',
      });
    }
    this.props.handler();
  }

  render() {
    return e(
      'div',
      null,
      e('p', null, 'Power'),
      e(Button, {
        float: this.state.float,
        click: () => this.handleClick(),
      })
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return e('p', { id: 'display' }, this.props.chord);
  }
}

class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return e(
      'div',
      {},
      e('input', {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
        defaultValue: 0.3,
      })
    );
  }
}

class BankButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      float: 'left',
    };
  }

  handleClick() {
    console.log('clicked');
    if (this.state.float === 'left') {
      this.setState({
        float: 'right',
      });
    } else {
      this.setState({
        float: 'left',
      });
    }
    this.props.handler();
  }

  render() {
    return e(
      'div',
      null,
      e('p', null, 'Bank'),
      e(Button, {
        float: this.state.float,
        click: () => this.handleClick(),
      })
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return e(
      'div',
      {
        onClick: this.props.click,
        className: 'select',
      },
      e('div', {
        className: 'inner',
        style: { float: this.props.float },
      })
    );
  }
}
const mainContainer = $('main')[0];
ReactDOM.render(e(Drum), mainContainer);
