import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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
  ({ channel }) => {
    return {
      ...channel,
    };
  },
  {
    getChannelData: () => {
      return { type: 'channel/getChannelData' };
    },
    getChannelDataBySearch: search => {
      return { type: 'channel/getChannelDataBySearch', payload: search };
    },
  },
)(
  class Channel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
    }
    componentDidMount() {
      this.props.getChannelData();
    }
    setFormValue = (name, event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
    search = () => {
      const tem = { ...this.state };
      this.props.getChannelDataBySearch(tem);
    };
    render() {
      const { data } = this.props;
      const { name } = this.state;
      return (
        <div className={styles.channel}>
          <PageHeaderWrapper>
            <Card className={styles.formCard}>
              <Form>
                <Form.Item label="姓名">
                  <Input value={name} onChange={event => this.setFormValue('name', event)} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.search}>
                    搜索
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <Card>
              <Table dataSource={data} columns={columns} rowKey={record => record.id} />
            </Card>
          </PageHeaderWrapper>
        </div>
      );
    }
  },
);
