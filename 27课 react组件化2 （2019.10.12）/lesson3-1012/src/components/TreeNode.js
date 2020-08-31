import React, { Component } from "react";
import classnames from "classnames";

export default class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };
  render() {
    const { title, children } = this.props.data;
    const { expanded } = this.state;
    const hasChildren = children && children.length > 0;
    return (
      <div>
        <div className="nodesInner" onClick={this.handleExpanded}>
          {hasChildren && (
            <i
              className={classnames("tri", expanded ? "tri-open" : "tri-close")}
            ></i>
          )}
          <span>{title}</span>
        </div>
        {hasChildren && expanded && (
          <div className="children">
            {children.map(item => {
              return <TreeNode key={item.key} data={item} />;
            })}
          </div>
        )}
      </div>
    );
  }
}
