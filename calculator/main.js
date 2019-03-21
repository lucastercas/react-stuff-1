const e = React.createElement;

function isNumeric(char) {
  return !isNaN(Number(char));
}

function computeResult(head) {
  let leftResult = 0,
    rightResult = 0;
  if (head.left) {
    if (!isNumeric(head.left.value)) {
      leftResult = computeResult(head.left);
    } else {
      leftResult = head.left.value;
    }
  }
  if (head.right) {
    if (!isNumeric(head.right.value)) {
      rightResult = computeResult(head.right);
    } else {
      rightResult = head.right.value;
    }
  }
  leftResult = Number(leftResult);
  rightResult = Number(rightResult);
  switch (head.value) {
    case '+':
      return leftResult + rightResult;
      break;
    case '-':
      return leftResult - rightResult;
      break;
    case '/':
      return leftResult / rightResult;
      break;
    case 'X':
      return leftResult * rightResult;
      break;
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      result: '',
    };
    this.curSymbol = '';
    this.opTree = null;
  }

  switchKey(key) {
    switch (key) {
      case '+':
        if (!this.curSymbol === '' || isNumeric(this.curSymbol)) {
          this.updateText(key);
          this.addNode();
          this.curSymbol = '+';
        }
        break;
      case '-':
        break;
      case '/':
        break;
      case 'X':
        break;
      case 'AC':
        break;
      case '=':
        if (this.opTree) {
          if (!isNumeric(this.opTree.value)) {
            if (isNumeric(this.curSymbol)) {
              this.addNode();
            }
            this.setState({
              result: computeResult(this.opTree),
            });
          } else {
            this.setState({
              result: this.curSymbol,
            });
          }
        } else {
          this.setState({
            result: this.curSymbol,
          });
        }
        break;
      case '.':
        break;
      default:
        this.updateText(key);
        if (this.curSymbol === '' || isNumeric(this.curSymbol)) {
          this.curSymbol += key;
        } else {
          this.addNode();
          this.curSymbol = key;
        }
        break;
    }
  }

  addNode() {
    let node = { value: this.curSymbol, left: null, right: null };

    if (this.opTree === null) {
      this.opTree = node;
    } else {
      /* Andar ate o final da arvore, se tiver lugar na raiz, inserir na raiz
       * Senao, fazer o no atual ser pai da arvore toda
       */
      if (!isNumeric(this.opTree.value)) {
        // Se nao for um numero
        this.opTree.right = node;
      } else {
        // Se eh um numero, vai pra baixo
        node.left = this.opTree;
        this.opTree = node;
      }
    }

    console.log(this.opTree);
  }

  updateText(key) {
    this.setState({
      text: this.state.text + key,
    });
  }

  render() {
    return e(
      'div',
      { id: 'calculator' },
      e(Display, { text: this.state.text, result: this.state.result }),
      e(Keys, { click: key => this.switchKey(key) })
    );
  }
}

class Display extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      'div',
      { id: 'display' },
      e(Text, { id: 'text', text: this.props.text }),
      e(Text, { id: 'result', text: this.props.result })
    );
  }
}

class Text extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e('div', { id: this.props.id }, this.props.text);
  }
}

class Keys extends React.Component {
  constructor(props) {
    super(props);
  }

  makeKeys() {
    let keys = [];
    keys.push(
      e(Key, {
        key: 'AC',
        id: 'key-ac',
        display: 'AC',
        click: this.props.click,
      })
    );
    keys.push(
      e(Key, {
        key: '/',
        id: 'key-division',
        display: '/',
        click: this.props.click,
      })
    );
    keys.push(
      e(Key, {
        key: 'x',
        id: 'key-multi',
        display: 'X',
        click: this.props.click,
      })
    );

    for (let i = 2; i >= 0; i--) {
      for (let j = 1; j <= 3; j++) {
        keys.push(
          e(Key, {
            key: (3 * i + j).toString(),
            display: (3 * i + j).toString(),
            id: `key-${3 * i + j}`,
            click: this.props.click,
          })
        );
      }
      if (i == 2) {
        keys.push(
          e(Key, {
            key: '-',
            id: 'key-minus',
            display: '-',
            click: this.props.click,
          })
        );
      } else if (i == 1) {
        keys.push(
          e(Key, {
            key: '+',
            id: 'key-plus',
            display: '+',
            click: this.props.click,
          })
        );
      }
    }
    keys.push(
      e(Key, {
        key: '.',
        id: 'key-dot',
        display: '.',
        click: this.props.click,
      })
    );
    keys.push(
      e(Key, {
        key: '=',
        id: 'key-equal',
        display: '=',
        click: this.props.click,
      })
    );
    keys.push(
      e(Key, {
        key: '0',
        id: 'key-zero',
        display: '0',
        click: this.props.click,
      })
    );
    return keys;
  }

  render() {
    const keys = this.makeKeys();
    return e('div', { id: 'keys' }, keys);
  }
}

class Key extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      'p',
      {
        className: 'key',
        id: this.props.id,
        onClick: () => {
          this.props.click(this.props.display);
        },
      },
      this.props.display
    );
  }
}

const mainContainer = $('main')[0];
ReactDOM.render(e(Calculator), mainContainer);
