import React from 'react'
import { Navbar, SelectedOrder } from '../../components'

function AdminSelectedOrder() {
  return (
    <div>
        <Navbar admin={true} />
        <SelectedOrder />
    </div>
  )
}

export default AdminSelectedOrder