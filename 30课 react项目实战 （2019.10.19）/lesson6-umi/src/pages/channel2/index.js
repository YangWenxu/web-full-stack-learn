import React, { Component } from 'react';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Card, Form, Input, Table } from 'antd';
import Button from 'antd/es/button/button';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

export default connect(
  //mapStateToProps
  ({ channel2 }) => {
    return { ...channel2 };
  },
  //mapDisToProps
  {
    getChannel2Data: () => ({ type: 'channel2/getChannel2Data' }),
    getChannel2DataBySearch: name => ({
      type: 'channel2/getChannel2DataBySearch',
      payload: { name },
    }),
  },
)(
  class Channel2 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
    }
    componentDidMount() {
      this.props.getChannel2Data();
    }
    setName = event => {
      this.setState({
        name: event.target.value,
      });
    };
    search = () => {
      const { name } = this.state;
      this.props.getChannel2DataBySearch(name);
      console.log('name', name);
    };
    render() {
      const { data } = this.props;
      const { name } = this.state;
      // console.log('props', this.props);
      return (
        <PageHeaderWrapper>
          <div className={styles.channel2}>
            <Card className={styles.form}>
              <Form>
                <Form.Item label="姓名">
                  <Input value={name} onChange={this.setName} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.search}>
                    搜索
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <Card>
              <Table dataSource={data} columns={columns} rowKey={({ id }) => id} />
            </Card>
          </div>
        </PageHeaderWrapper>
      );
    }
  },
);
