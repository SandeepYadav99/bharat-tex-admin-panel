/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, IconButton, Paper} from '@material-ui/core';

import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import {Add, InputRounded as EditIcon} from '@material-ui/icons';
import PageBox from '../../../src/components/PageBox/PageBox.component';
import SidePanelComponent from '../../../src/components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './Style.module.css';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../../src/Datatables/Datatable.table';
import Constants from '../../../src/config/constants';
import FilterComponent from '../../../src/components/Filter/Filter.component';
import {
    actionFetchService,
    actionChangePageService,
    actionChangeStatusService,
    actionFilterService,
    actionResetFilterService,
    actionSetPageService,
    actionCreateService,
    actionUpdateService, actionDeleteService
} from '../../actions/Service.action';
import {serviceGetListData} from "../../services/index.services";
import {serviceGetCustomList} from "../../services/Common.service";

let CreateProvider = null;

class ServiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            point_selected: null,
            data: [],
            page: 1,
            total: Constants.DEFAULT_PAGE_VALUE + 1,
            side_panel: false,
            edit_data: null,
            units: [],
        };
        this.configFilter = [

            {label: 'Created Date', options:{maxDate: new Date()}, name: 'createdAt', type: 'date'},
            {label: 'Status', name: 'status', type: 'select', fields: [ 'ACTIVE', 'INACTIVE']},
        ];

        this._handleFilterDataChange = this._handleFilterDataChange.bind(this);
        this._queryFilter = this._queryFilter.bind(this);
        this._handleSearchValueChange = this._handleSearchValueChange.bind(this);
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
        this._handleRowSize = this._handleRowSize.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleChangeStatus = this._handleChangeStatus.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
    }

    componentDidMount() {
        // if (this.props.total_count <= 0) {
        this.props.actionFetchData();
        const request = serviceGetCustomList(['UNITS']);
        request.then((data)=> {
            if(!data.error){
                this.setState({
                    units: data.data.units,
                })
            }
        })
    }


    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
    }

    _handlePageChange(type) {
        console.log('_handlePageChange', type);
        this.props.actionSetPage(type);
    }


    _queryFilter(key, value) {
        console.log('_queryFilter', key, value);
        // this.props.actionSetPage(1);
        this.props.actionFetchData(1, this.props.sorting_data, {
            query: key == 'SEARCH_TEXT' ? value : this.props.query,
            query_data: key == 'FILTER_DATA' ? value : this.props.query_data,
        }, true);
    }

    _handleFilterDataChange(value) {
        console.log('_handleFilterDataChange', value);
        this._queryFilter('FILTER_DATA', value);
    }

    _handleSearchValueChange(value) {
        console.log('_handleSearchValueChange', value);
        this._queryFilter('SEARCH_TEXT', value);
    }

    handlePreviousPageClick() {
        console.log('handlePreviousPageClick', 'PREV');
    }

    handleNextPageClick() {
        console.log('handleNextPageClick', 'NEXT');
    }

    _handleSortOrderChange(row, order) {
        console.log(`handleSortOrderChange key:${row} order: ${order}`);
        // this.props.actionSetPage(1);
        this.props.actionFetchData(1,
            {row, order}, {
                query: this.props.query,
                query_data: this.props.query_data,
            }, row);
        // this.props.fetchUsers(1, row, order, { query: this.props.query, query_data: this.props.query_data });
    }

    _handleRowSize(page) {
        console.log(page);
    }

    renderStatus(status) {
        let className = 'warning';
        if (status in Constants.STATUS) {
            className = Constants.STATUS[status];
        }
        return (<span className={classNames('status', className)}>{(status)}</span>);
    }

    renderFirstCell(user) {
        const tempEmailRender = user.email ? (<span style={{textTransform: 'lowercase'}}>{(user.email)}</span>) : null;
        return (
            <div className={'userDetailLeague'} title={user.otp}>
                <div className={classNames('userDetailLeagueText', 'openSans')}>
                    <span><strong style={{textTransform:'capitalize'}}>{user.name}</strong></span> <br/>
                    {tempEmailRender}
                </div>
            </div>
        );
    }


    _handleEdit(data) {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: data,
        })
    }

    _handleSideToggle() {
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleDelete(id) {
        this.props.actionDelete(id);
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }


    _renderCreateForm () {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            CreateProvider = require('./Service.view').default;
        }
        if (this.state.side_panel) {
            return (<CreateProvider
                data={this.state.edit_data}
                industries = {this.state.industries}
                units = {this.state.units}
                subcategories = {this.state.subcategories}
                handleDataSave={this._handleDataSave}
                handleDelete={this._handleDelete}
            ></CreateProvider>);
        } return null;
    }
    _handleChangeStatus(data, type) {
        this.props.actionChangeStatus({...data, type: type});
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _handleDataSave(data, type) {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            this.props.actionCreateService(data)
        } else {
            this.props.actionUpdateService(data)
        }
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    render() {
        const tableStructure = [
            {
                key: 'name',
                label: 'Service Name',
                sortable: true,
                render: (value, all) => <div>{this.renderFirstCell(all)}</div>,
            },
            {
                key: 'description',
                label: 'Description',
                sortable: false,
                render: (value, all) => <div>{all.description}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                sortable: true,
                render: (temp, all) => <div>{this.renderStatus(all.status)}</div>,
            },
            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div><IconButton className={'tableActionBtn'} onClick={this._handleEdit.bind(this, all)}><EditIcon fontSize={'small'} /></IconButton></div>),
            },

        ];
        const datatableFunctions = {
            onCellClick: this.handleCellClick,
            // onCellDoubleClick: this.handleCellDoubleClick,
            // onFilterValueChange: this._handleSearchValueChange.bind(this),
            onSortOrderChange: this._handleSortOrderChange,
            onPageChange: this._handlePageChange,
            onRowSelection: this.handleRowSelection,
            onRowSizeChange: this._handleRowSize,

        };
        const datatable = {
            ...Constants.DATATABLE_PROPERTIES,
            columns: tableStructure,
            data: this.props.data,
            count: this.props.total_count,
            page: this.props.currentPage,
        };
        return (
            <div>
                <PageBox>
                    <div className={styles.headerContainer}>
                        <span className={styles.title}>Service List</span>
                        <Button onClick={this._handleSideToggle} variant={'contained'} color={'primary'}>
                            <Add></Add> Create
                        </Button>
                    </div>

                    <div>
                        <FilterComponent
                            is_progress={this.props.is_fetching}
                            filters={this.configFilter}
                            handleSearchValueChange={this._handleSearchValueChange.bind(this)}
                            handleFilterDataChange={this._handleFilterDataChange}
                        />
                        <div>
                            <br/>
                            <div style={{width: '100%'}}>
                                <DataTables
                                    {...datatable}
                                    {...datatableFunctions}
                                />
                            </div>
                        </div>
                    </div>

                </PageBox>
                <SidePanelComponent
                    handleToggle={this._handleSideToggle}
                    title={'New Service'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        data: state.services.present,
        total_count: state.services.all.length,
        currentPage: state.services.currentPage,
        serverPage: state.services.serverPage,
        sorting_data: state.services.sorting_data,
        is_fetching: state.services.is_fetching,
        query: state.services.query,
        query_data: state.services.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchService,
        actionSetPage: actionSetPageService,
        actionResetFilter: actionResetFilterService,
        actionSetFilter: actionFilterService,
        actionChangeStatus: actionChangeStatusService,
        actionCreateService: actionCreateService,
        actionUpdateService: actionUpdateService,
        actionDelete: actionDeleteService
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
