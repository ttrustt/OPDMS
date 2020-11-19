import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React, { Component } from 'react';
import BaseTable, { AutoResizer, Column, SortOrder } from 'react-base-table'
import 'react-base-table/styles.css'
// import BootstrapTable from 'react-bootstrap-table-next';

const defaultSort = { key: 'id', order: SortOrder }

class DataTable extends Component {
    //structure for DataTableComponent
    constructor(props) {
        super(props);
        this.state = {data:this.props.data,sortBy: defaultSort };
        // console.log(this.props.data,'from datatable')
    }
    componentDidMount(){}
    onColumnSort = sortBy => {
        //sort column
        const order = sortBy.order === SortOrder.ASC ? 1 : -1
        const data = [...this.state.data]
        data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order))
        this.setState({
            sortBy,
            data,
        })
    }
    render() {
        const fixedColumns = this.props.columns.map((column, columnIndex) => {
            let frozen
            column.width = 150
            column.sortable = true
            if (columnIndex < 0) frozen = Column.FrozenDirection.LEFT
            if (columnIndex > 100) frozen = Column.FrozenDirection.RIGHT
            return { ...column, frozen}
        })
        fixedColumns.push( {
            title: 'id',
            dataKey: 'id',
            key:'id',
            width:150
          })
        const dataWithId = this.state.data.map((row,dataIndex) => {
            row.id=dataIndex
            return {...row}
        })
        return (
            
            <AutoResizer>
                {({ width, height }) => (
                    <BaseTable
                        width={width}
                        height={height}
                        columns={fixedColumns}
                        data={dataWithId}
                        sortBy={this.state.sortBy}
                        onColumnSort={this.onColumnSort}
                    />
                )}
            </AutoResizer>
        )
    }

}
export default DataTable;