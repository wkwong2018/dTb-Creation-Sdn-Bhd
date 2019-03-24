import React from "react";
import { Button, Card, Table, Divider, message } from "antd";
import AddAccount from "components/Accounts/AddAccount"

let contactId = 723812738;
class Accountlist extends React.Component {
  state = {
    filteredInfo: {},
    sortedInfo: {},
    addContactState:false,
    showMessage: false,
    alertMessage: ''
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
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <span className="gx-link">Delete</span>
          <Divider type="vertical"/>
          <span className="gx-link">Edit</span>
          {/* <span className="gx-link ant-dropdown-link">
            More actions <Icon type="down"/>
          </span> */}
        </span>
      ),
    }];

    return columns;
  }
  onAddContact = () => {
    this.setState({addContactState: true});
  };
  onContactClose = () => {
    this.setState({addContactState: false});
  };

  onSaveContact = (data) => {
    let isNew = true;
    const contactList = this.state.allContact.map((contact) => {
      if (contact.id === data.id) {
        isNew = false;
        return data
      } else {
        return contact
      }
    });
    if (isNew) {
      contactList.push(data);
    }
    this.setState({
      alertMessage: isNew ? 'Contact Added Successfully' : 'Contact Updated Successfully',
      showMessage: true,
      contactList: contactList,
      allContact: contactList
    });
    // this.onFilterOptionSelect(this.state.filterOption);
  };

  onDeleteContact = (data) => {
    this.setState({
      alertMessage: 'Contact Deleted Successfully',
      showMessage: true,
      allContact: this.state.allContact.filter((contact) => contact.id !== data.id),
      contactList: this.state.allContact.filter((contact) => contact.id !== data.id)
    })
  };

  render() {
    const { contactList } = this.props;
    const { addContactState, showMessage, alertMessage} = this.state;
    const columns = this.createBindingColumns();

    return (
      <Card style={{marginBottom: 0, borderRadius: 0 }} >
        <div className="table-operations">
          <Button onClick={this.clear}>Clear filters and sorters</Button>
          <Button onClick={this.onAddContact}> Add New Account </Button>
        </div>
        <Table className="gx-table-responsive" columns={columns} dataSource={contactList} onChange={this.handleChange} />
        <AddAccount open={addContactState} contact={{
          'id': contactId++,
          'name': '',
          'thumb': '',
          'email': '',
          'phone': '',  
          'designation': '',
          'selected': false,
          'starred': false,
          'frequently': false,
        }} onSaveContact={this.onSaveContact}
                    onContactClose={this.onContactClose} onDeleteContact={this.onDeleteContact}/>

        {showMessage && message.info(<span id="message-id">{alertMessage}</span>, 3, this.handleRequestClose)}
      </Card>
    );
  }
}

export default Accountlist;
