import React from "react";
import { Button, Card, Table } from "antd";

class Accountlist extends React.Component {
  state = {
    filteredInfo: {},
    sortedInfo: {},
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clear = () => {
    this.setState({
      filteredInfo: {},
      sortedInfo: {},
    });
  };

  createBindingColumns = () => {
    let { sortedInfo, filteredInfo } = this.state;
    const columns = [{
      title: 'Account Status',
      dataIndex: 'accountStatus',
      key: 'accountStatus',
      filters: [
        { text: 'Account Review', value: 'Account Review' },
        { text: 'Balance Exhausted', value: 'Balance Exhausted'},
        { text: 'Running', value: 'Running'},
        { text: 'No Ad Running', value: 'No Ad Running' },
      ],
      filteredValue: filteredInfo.accountStatus || null,
      onFilter: (value, record) => record.accountStatus === value      
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: 'password',
      dataIndex: 'password',
      key: 'password'
    }, {
      title: 'domain',
      dataIndex: 'domain',
      key: 'domain'
    }, {
      title: 'referenceNumber',
      dataIndex: 'referenceNumber',
      key: 'referenceNumber',
      sorter: (a, b) => a.referenceNumber - b.referenceNumber,
      sortOrder: sortedInfo.columnKey === 'referenceNumber' && sortedInfo.order,
    }, {
      title: 'referenceNumberAmount',
      dataIndex: 'referenceNumberAmount',
      key: 'referenceNumberAmount',
      sorter: (a, b) => a.referenceNumberAmount - b.referenceNumberAmount,
      sortOrder: sortedInfo.columnKey === 'referenceNumberAmount' && sortedInfo.order,
    }];

    return columns;
  }

  render() {
    let { contactList } = this.props;
    const columns = this.createBindingColumns();

    return (
      <Card>
        <div className="table-operations">
          <Button onClick={this.clear}>Clear filters and sorters</Button>
        </div>
        <Table className="gx-table-responsive" columns={columns} dataSource={contactList} onChange={this.handleChange} />
      </Card>
    );
  }
}

export default Accountlist;
