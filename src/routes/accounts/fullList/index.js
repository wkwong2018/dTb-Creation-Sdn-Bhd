import React, { Component } from "react";
import {  Breadcrumb, Card } from "antd";
import contactList from "./data/contactList";
import Accountlist from "components/Accounts/Accountlist";


class FullList extends Component {

  constructor() {
    super();
    this.state = {
      noContentFoundMessage: 'No Contact found in selected folder',
      contactList: contactList
    }
  }

  render() {
    const {contactList, noContentFoundMessage } = this.state;
    return (
      <div className="gx-main-content">
        <div className="gx-app-module">
          <div className="gx-module-account-list">
            <div className="gx-module-box-content">
              <Card className="gx-card" title="Account Full List" style={{marginBottom: 0, borderRadius: 0 }}>
                <Breadcrumb>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item><span className="gx-link">Accounts</span></Breadcrumb.Item>
                  <Breadcrumb.Item>Accounts Full List</Breadcrumb.Item>
                </Breadcrumb>
              </Card>
              {contactList.length === 0 ?
                <div className="gx-h-100 gx-d-flex gx-align-items-center gx-justify-content-center">
                  {noContentFoundMessage}
                </div>
                : <Accountlist contactList={contactList} />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FullList;
