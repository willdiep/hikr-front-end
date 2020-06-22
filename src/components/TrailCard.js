import React, { Component } from 'react'
import './TrailCard.scss'

class TrailCard extends Component {
  render() {
    const trailprops = this.props.trail.properties

    return (
      <section
        id={`trail-${trailprops.id}`}
        className='trail'
        onMouseOver={() => {
          this.props.handleMouseOver(this.props.trail, trailprops.id)
        }}
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
    )
  }
}

export default TrailCard
