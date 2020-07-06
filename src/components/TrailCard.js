import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './TrailCard.scss'

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
        <section
          id={`trail-${trailprops.id}`}
          className='trail'
          onMouseOver={() => {
            this.props.handleMouseOver(this.props.trail, trailprops.id)
          }}
          onClick={() => this.props.mapClick(trailprops)}
          style={{ backgroundColor: 'orange', border: '1px solid green' }}
        >
          <figure className=''>
            <img src={trailprops.img_url} alt='trail' />
          </figure>

          <div onClick={this.props.handleTrailCardClick} className=''>
            {trailprops.name}
          </div>
          <div className=''>{trailprops.city}</div>
          <div className=''>{trailprops.condition}</div>
          <div className=''>{trailprops.difficulty}</div>
          <div className=''>{trailprops.stars}</div>
          <div className=''>{trailprops.summary}</div>
        </section>
      </Link>
    )
  }
}

export default TrailCard
