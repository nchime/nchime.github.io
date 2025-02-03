'use client'

import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-alpine.css'

interface RowData {
  name: string
  age: number
  country: string
}

const AgGridComponent: React.FC = () => {
  const rowData: RowData[] = [
    { name: 'Alice', age: 25, country: 'USA' },
    { name: 'Bob', age: 30, country: 'Canada' },
    { name: 'Charlie', age: 35, country: 'UK' },
  ]

  const columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
    { field: 'age', headerName: 'Age', sortable: true, filter: true },
    { field: 'country', headerName: 'Country', sortable: true, filter: true },
  ]

  return (
    <div className="ag-theme-alpine" style={{ height: 300, width: 600 }}>
      <AgGridReact<RowData> rowData={rowData} columnDefs={columnDefs} />
    </div>
  )
}

export default AgGridComponent
