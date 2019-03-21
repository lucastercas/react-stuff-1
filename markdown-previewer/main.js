const e = React.createElement;

class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: `# H1 Header
## H2 Header

[google](https://www.google.com)

Inline \`Javascript\` code

\`\`\`
Block Javascript code
\`\`\`
1. List
2. Item
> Block Quote

![Image](https://www.google.com "Google Logo")

**This text Should be bold**

_This text should be in italyc_
`,
    };
    this.updateText = this.updateText.bind(this);
    this.handleMarkdown = this.handleMarkdown.bind(this);

    this.state.text = this.handleMarkdown(this.state.markdown);
  }

  handleMarkdown(markdown) {
    let result = marked(markdown);
    return result;
  }

  updateText(event) {
    console.log('Updating Text: ', event.target.value);
    const markdown = event.target.value;
    this.setState({
      text: this.handleMarkdown(markdown),
    });
  }

  render() {
    return e(
      'div',
      {},
      e(MarkdownEditor, {
        markdown: this.state.markdown,
        updateText: this.updateText,
      }),
      e('hr', null, null),
      e(MarkdownPreviewer, { text: this.state.text })
    );
  }
}

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
      'div',
      { id: 'editor-wrap' },
      e('div', { className: 'toolbar' }, 'Editor'),
      e('textarea', {
        id: 'editor',
        onChange: this.props.updateText,
        defaultValue: this.props.markdown,
        cols: 80,
        rows: 25,
      })
    );
  }
}

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    console.log('Text: ', props);
  }

  render() {
    return e(
      'div',
      {
        id: 'preview-wrap',
      },
      e('div', { className: 'toolbar' }, 'Preview'),
      e('div', {
        id: 'preview',
        dangerouslySetInnerHTML: { __html: this.props.text },
      })
    );
  }
}

const domContainer = $('main')[0];
ReactDOM.render(e(Markdown), domContainer);
