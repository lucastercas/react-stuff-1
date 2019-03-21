const e = React.createElement;

class QuoteDiv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: '"Meu nome eh lucas macedo',
      author: "- lucas tercas"
    };

    this.changeQuote = this.changeQuote.bind(this);
  }

  changeQuote(newState) {
    this.setState(newState);
  }

  render() {
    return e(
      "div",
      {
        id: "quote-box"
      },
      e(QuoteText, { text: this.state.quote }),
      e(QuoteAuthor, { text: this.state.author }),
      e(NewQuoteButton, { changeQuote: this.changeQuote }),
      e(TweetQuoteButton)
    );
  }
}

class QuoteText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e("p", { id: "text" }, `${this.props.text}`);
  }
}

class QuoteAuthor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e("p", { id: "author" }, `${this.props.text}`);
  }
}

class TweetQuoteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      "button",
      {
        className: "btn",
        id: "tweet-quote"
      },
      e("a", { href: "twitter.com/intent/tweet" }, "Tweet")
    );
  }
}

class NewQuoteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  getNewQuote() {
    return {
      quote: '"iae',
      author: "- lucas"
    };
  }

  render() {
    return e(
      "button",
      {
        className: "btn",
        id: "new-quote",
        onClick: () => {
          this.props.changeQuote(this.getNewQuote());
        }
      },
      "Like"
    );
  }
}
const domContainer = $("main")[0];
ReactDOM.render(e(QuoteDiv), domContainer);
