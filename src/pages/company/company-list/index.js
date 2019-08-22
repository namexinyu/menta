import React, { Component } from 'react';
import { tabWrap } from '../../../pages';

@tabWrap({
  tabName: '企业列表',
  stores: ['']
})
class CompanyList extends Component {
  render() {
    return (
      <div>
        企业列表
      </div>
    );
  }
}
export default CompanyList;