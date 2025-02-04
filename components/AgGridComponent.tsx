'use client'

import { AgGridReact } from 'ag-grid-react'
// import { ColDef, ClientSideRowModelModule } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'

import { useMemo } from 'react'

ModuleRegistry.registerModules([AllCommunityModule])

const AgGridComponent = () => {
  const columnDefs = useMemo(
    () => [
      { field: 'name', headerName: 'Name' },
      {
        field: 'age',
        headerName: 'Age',
        cellClassRules: {
          'invalid-cell': (params: any) => params.value < 0 || params.value > 120,
        },
        onCellValueChanged: (params: any) => {
          if (params.value < 0 || params.value > 120) {
            alert('Invalid age. Please enter a value between 0 and 120.')
            params.node.setDataValue(params.colDef.field, params.oldValue)
          }
        },
      },
    ],
    []
  )

  const rowData = useMemo(
    () => [
      { name: 'Alice', age: '24' },
      { name: 'Bob', age: '30' },
    ],
    []
  )

  return (
    <div style={{ height: 200, width: '100%' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs as any} />
    </div>
  )
}

export default AgGridComponent
