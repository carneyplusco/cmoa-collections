import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great!</p>
    <p><Link to="/things/6bd89462-6774-4617-bdfb-11bcb20c06ea">Go to bowl</Link></p>
    <p><Link to="/things/08371e5d-1c2c-42df-867e-b32e61685a44">Go to rose bowl</Link></p>
  </div>
)

export default IndexPage
