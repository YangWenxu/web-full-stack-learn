import React, { Component } from "react";

export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        comments: [
          {
            author: "小明",
            body: "这是小明写的文章",
          },
          {
            author: "小红",
            body: "这是小红写的文章",
          },
        ],
      });
    }, 1000);
  }
  render() {
    const { comments } = this.state;
    return (
      <div>
        <h1>CommentList</h1>
        {comments.map(item => {
          return <Comment key={item.author} data={item} />;
        })}
      </div>
    );
  }
}

class Comment extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { author, body } = nextProps;
    const { author: nowAuthor, body: nowBody } = this.props;
    if (nowAuthor === author && nowBody === body) {
      //return false;
    }
    return true;
  }
  render() {
    const { author, body } = this.props.data;
    console.log("render");
    return (
      <div className="border">
        <p>作者: {author}</p>
        <p>内容: {body}</p>
      </div>
    );
  }
}
