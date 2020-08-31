import React, { Component } from 'react';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Card, Form, Input, Button, Table } from 'antd';

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
  ({ more }) => {
    return { ...more };
  },
  {
    getMoreData: () => ({ type: 'more/getMoreData' }),
    getMoreDataBySearch: name => ({ type: 'more/getMoreDataBySearch', payload: { name } }),
  },
)(
  class More extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
    }
    componentDidMount() {
      this.props.getMoreData();
    }
    search = () => {
      const { name } = this.state;
      console.log(name);
    };
    setValue = (name, event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
    render() {
      const { data, getMoreDataBySearch } = this.props;
      const { name } = this.state;
      return (
        <PageHeaderWrapper>
          <div className={styles.more}>
            <Card className={styles.form}>
              <Form>
                <Form.Item label="姓名">
                  <Input value={name} onChange={event => this.setValue('name', event)} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={() => getMoreDataBySearch(name)}>
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
