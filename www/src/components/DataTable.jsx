import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React, { Component } from 'react';
import BaseTable, { AutoResizer, Column, SortOrder } from 'react-base-table'
import 'react-base-table/styles.css'
// import BootstrapTable from 'react-bootstrap-table-next';

const defaultSort = { key: 'id', order: SortOrder.DSC }

class DataTable extends Component {
  //structure for DataTableComponent
    constructor(props) {
        super(props);
        this.state = {data:this.props.data, sortBy:defaultSort, width: 0, height: 0}
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        };

        // console.log(this.props.data)
    componentDidMount(){
        this.state.data=this.props.data.map((row,dataIndex) => {
            row.id=dataIndex
            return {...row}
        })
        this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
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
    componentDidUpdate(){
      // const columnsNum = 
      // this.setState({fixedColumns:this.props.columns.map((column, columnIndex) => {
      //   let frozen
      //   // console.log(column)
      //   column.width = this.state.width/this.props.columns.size
      //   column.sortable=true
      //   // console.log(column)
      //   if (columnIndex < 0) frozen = Column.FrozenDirection.LEFT
      //   if (columnIndex > 100) frozen = Column.FrozenDirection.RIGHT
      //   return { ...column, frozen ,resizable: true}
      // })
      // })
      // this.state.fixedColumns.push( {
      //   title: 'id',
      //   dataKey: 'id',
      //   key:'id',
      //   width:150,
      //   hidden:true,
      //   // visible:false
      // })
    }
    render() {
      const columnNo = this.props.columns.length
      const fixedColumns = this.props.columns.map((column, columnIndex) => {
        let frozen
        // console.log(column)
        column.width = this.state.width/columnNo
        column.sortable=true
        // console.log(column)
        if (columnIndex < 0) frozen = Column.FrozenDirection.LEFT
        if (columnIndex > 100) frozen = Column.FrozenDirection.RIGHT
        return { ...column, frozen ,resizable: true}
      })
      fixedColumns.push( {
        title: 'id',
        dataKey: 'id',
        key:'id',
        width:150,
        hidden:true,
        // visible:false
      })
    // const dataWithId = this.props.data.map((row,dataIndex) => {
    //     row.id=dataIndex
    //     return {...row}
    // })

      if(this.props.columns.length < 9){
      return (
        // <div style={Container}>
        <AutoResizer>
          {({ width, height }) => (
            <BaseTable
              width={width}
              height={height}
              fixed columns={fixedColumns}
              data={this.state.data}
              sortBy={this.state.sortBy}
              onColumnSort={this.onColumnSort}
            />
          )}
        </AutoResizer>
      // </div>
    )
          }
        else{
          return(
            // <div style={{overflow:"scroll"}}>
            <AutoResizer>
            {({ width, height }) => (
              <BaseTable
                
                width={width}
                height={height}
                data={this.state.data}
                fixed columns={fixedColumns}
                sortBy={this.state.sortBy}
                onColumnSort={this.onColumnSort}
                // components={{TableCell,TableHeaderCell}}
              />
            )}
            
          </AutoResizer>
          // </div>
          )
        }
      }
}
export default DataTable;