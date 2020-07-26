import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import './TrailCard.scss'

const Card = styled.section`
  /* background-color: orange; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  `

const Description = styled.div`
  display: grid;
  align-content: center;

`

class TrailCard extends Component {
  render() {
    const trailprops = this.props.trail.properties
    // console.log(trailprops)

    const trailName = trailprops.name
    const urlPath = trailName
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('-')

    // console.log(urlPath)

    return (
      <Link to={`/mappage/trail/${urlPath}`}>
        <Card
          id={`trail-${trailprops.id}`}
          className='trail'
          onMouseOver={() => {
            this.props.handleMouseOver(this.props.trail, trailprops.id)
          }}
          onClick={() => this.props.mapClick(trailprops)}
        >
          <figure className=''>
            <img src={trailprops.img_url} alt='trail' />
          </figure>

          <Description>
            <div>{trailprops.name} </div>
            <div>{trailprops.city}</div>
            <div>{trailprops.condition}</div>
            <div>{trailprops.difficulty}</div>
            <div>{trailprops.stars}</div>
            {/* <div className=''>{trailprops.summary}</div> */}
          </Description>
        </Card>
      </Link>
    )
  }
}

export default TrailCard
