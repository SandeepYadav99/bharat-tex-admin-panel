/**
 * Created by charnjeetelectrovese@gmail.com on 12/3/2019.
 */
import React, {Component} from 'react';
import {Button, Paper,IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    red as redColor,
} from '@material-ui/core/colors';
import {Add} from '@material-ui/icons';
import PageBox from '../../components/PageBox/PageBox.component';
import SidePanelComponent from '../../components/SidePanel/SidePanel.component';
// import CreateProvider from './Create.container';
import styles from './Style.module.css';
// import DataTables from '../../Datatables/DataTableSrc/DataTables';
import DataTables from '../../Datatables/Datatable.table';
import Constants from '../../config/constants';
import FilterComponent from '../../components/Filter/Filter.component';
import {
    actionFetchProviderUser,
    actionChangePageProviderUserRequests,
    actionChangeStatusProviderUserRequests,
    actionFilterProviderUserRequests,
    actionResetFilterProviderUserRequests,
    actionSetPageProviderUserRequests,
    actionCreateProviderUser,
    actionUpdateProviderUser,
    actionDeleteProviderUser
} from '../../actions/ProviderUser.action';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {serviceGetListData} from "../../services/index.services";

let CreateProvider = null;

class UserList extends Component {
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
            languages: [],
            is_calling: false,
        };
        this.configFilter = [
            {label: 'Created On', name: 'createdAt', type: 'date'},
            {label: 'Status', name: 'status', type: 'select', fields: ['PENDING', 'ACTIVE']},
        ];

        this._handleFilterDataChange = this._handleFilterDataChange.bind(this);
        this._queryFilter = this._queryFilter.bind(this);
        this._handleSearchValueChange = this._handleSearchValueChange.bind(this);
        this._handleSideToggle = this._handleSideToggle.bind(this);
        this._handleSortOrderChange = this._handleSortOrderChange.bind(this);
        this._handleRowSize = this._handleRowSize.bind(this);
        this._handlePageChange = this._handlePageChange.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleDataSave = this._handleDataSave.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleUserForm = this._handleUserForm.bind(this);
        this._handleCreateUser = this._handleCreateUser.bind(this)
    }

    componentDidMount() {

        // if (this.props.total_count <= 0) {
        this.props.actionFetchData();
        // }
    }


    handleCellClick(rowIndex, columnIndex, row, column) {
        console.log(`handleCellClick rowIndex: ${rowIndex} columnIndex: ${columnIndex}`);
    }

    _handlePageChange(type) {
        console.log('_handlePageChange', type);
        this.props.actionSetPage(type);
    }


    _handleDataSave(data, type) {
        // this.props.actionChangeStatus({...data, type: type});
        if (type == 'CREATE') {
            this.props.actionCreateUser(data)
        } else {
            this.props.actionUpdateUser(data)
        }
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
    }

    _queryFilter(key, value) {
        console.log('_queryFilter', key, value);
        this.props.actionSetPage(1);
        this.props.actionFetchData(1, this.props.sorting_data, {
            query: key == 'SEARCH_TEXT' ? value : this.props.query,
            query_data: key == 'FILTER_DATA' ? value : this.props.query_data,
        });
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
        this.props.actionSetPage(1);
        this.props.actionFetchData(1,
            {row, order}, {
                query: this.props.query,
                query_data: this.props.query_data,
            });
        // this.props.fetchUsers(1, row, order, { query: this.props.query, query_data: this.props.query_data });
    }

    _handleRowSize(page) {
        console.log(page);
    }

    // renderStatus(status) {
    //     if (status === 'ACTIVE') {
    //         return (
    //             <span style={{
    //                 fontSize: '12px',
    //                 color: 'white',
    //                 background: 'green',
    //                 padding: '3px 10px',
    //                 borderRadius: '20px',
    //                 textTransform: 'capitalize'
    //             }}>
    //                 {(status)}
    //             </span>
    //         );
    //     }
    //     return (<span style={{
    //         ...styles.spanFont,
    //         fontSize: '12px',
    //         color: 'white',
    //         background: `${status == 'NEW' ? 'orange' : 'orange'}`,
    //         padding: '3px 10px',
    //         borderRadius: '20px',
    //         textTransform: 'capitalize'
    //     }}>{(status)}</span>);
    // }

    renderStatus(status) {
        if (status === 'ACTIVE') {
            return (
                <span style={{
                    fontSize: '12px',
                    color: '#20c997',
                    background: 'rgba(32,201,151,.1)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    textTransform: 'capitalize'
                }}>
                    {(status)}
                </span>
            );
        }
        return (<span style={{
            ...styles.spanFont,
            fontSize: '12px',
            color: '#fa8b0c',
            background: `${status == 'NEW' ? 'rgba(250,139,12,.1)' : 'rgba(250,139,12,.1)'}`,
            padding: '3px 10px',
            borderRadius: '20px',
            textTransform: 'capitalize'
        }}>{(status)}</span>);
    }

    renderFirstCell(user) {
        const tempEmailRender = user.email ? (<span style={{textTransform: 'lowercase'}}>{(user.email)}</span>) : null;
        return (
            <div className={styles.firstCellFlex}>
                <div>
                    <img src={user.image} alt=""/>
                </div>
                <div className={classNames(styles.firstCellInfo, 'openSans')}>
                    <span><div>{`${user.first_name} ${user.last_name}`}</div></span>
                    {/*<br/>*/}
                    {/*{tempEmailRender}*/}
                </div>
            </div>
        );
    }


    _handleDelete(id) {
        this.props.actionDeleteUser(id);
        this.setState({
            side_panel: !this.state.side_panel,
            edit_data: null,
        });
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

    _renderCreateForm() {
        if (CreateProvider == null) {
            // import CreateProvider from './Create.container';
            CreateProvider = require('./User.view').default;
        }
        if (this.state.side_panel) {
            return (<CreateProvider
                handleDataSave={this._handleDataSave}
                data={this.state.edit_data}
                handleDelete={this._handleDelete}></CreateProvider>);
        }
        return null;
    }

    _handleUserForm(data){
        this.props.history.push('/users/detail/' + data.id)
    }

    _handleCreateUser(){
        this.props.history.push('/users/detail/create')
    }

    render() {
        const tableStructure = [
            {
                key: 'name',
                label: 'Info',
                style: { width: '15%'},
                sortable: true,
                render: (value, all) => <div>{this.renderFirstCell(all)}</div>,
            },
            {
                key: 'Contact',
                label: 'Contact',
                style: { width: '15%'},
                sortable: false,
                render: (temp, all) => <div>{all.contact}<br/>{all.email}</div>,
            },
            {
                key: 'designation',
                label: 'Designation',
                style: { width: '15%'},
                sortable: false,
                render: (temp, all) => <div>{all.designation}<br/>{all.country.label}</div>,
            },
            {
                key: 'role',
                label: 'User Role',
                style: { width: '15%'},
                sortable: true,
                render: (temp, all) => <div>{all.role}</div>,
            },
            {
                key: 'status',
                label: 'Status',
                style: { width: '15%'},
                sortable: true,
                render: (temp, all) => <div>{this.renderStatus(all.status)}</div>,
            },
            {
                key: 'last_login',
                label: 'Last Login',
                sortable: true,
                render: (temp, all) => <div>{all.last_login ? all.last_login : 'N/A'}</div>,
            },


            {
                key: 'user_id',
                label: 'Action',
                render: (temp, all) => (<div><IconButton className={'tableActionBtn'} color='secondary' disabled={this.state.is_calling}  onClick={this._handleUserForm.bind(this, all)}><OpenInNewIcon fontSize={'small'}/></IconButton></div>),
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
                        <span className={styles.title}>Admin User List</span>
                        <Button disabled={this.state.is_calling}variant={'contained'} color={'primary'}  onClick={this._handleCreateUser}>
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
                    title={'New User'} open={this.state.side_panel} side={'right'}>
                    {this._renderCreateForm()}
                </SidePanelComponent>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.provider_user.present,
        total_count: state.provider_user.all.length,
        currentPage: state.provider_user.currentPage,
        serverPage: state.provider_user.serverPage,
        sorting_data: state.provider_user.sorting_data,
        is_fetching: state.provider_user.is_fetching,
        query: state.provider_user.query,
        query_data: state.provider_user.query_data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionFetchData: actionFetchProviderUser,
        actionSetPage: actionSetPageProviderUserRequests,
        actionResetFilter: actionResetFilterProviderUserRequests,
        actionSetFilter: actionFilterProviderUserRequests,
        actionChangeStatus: actionChangeStatusProviderUserRequests,
        actionCreateProviderUser: actionCreateProviderUser,
        actionUpdateProviderUser: actionUpdateProviderUser,
        actionDeleteProviderUser: actionDeleteProviderUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
