import React from 'react'
import { Navbar, ViewOrders } from '../../components'

function AllOrders() {
  return (
    <div>
        <Navbar admin={true} />
        <ViewOrders />
    </div>
  )
}

export default AllOrders