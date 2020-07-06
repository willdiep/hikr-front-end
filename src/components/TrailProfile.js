import React from 'react'
import { withRouter } from 'react-router'
import { Form } from 'react-bootstrap'

let tagArray = []

class TrailProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      name: null,
      distance: null,
      location: null,
      longitude: null,
      latitude: null,
      views: null,
      kidfriendly: false,
      dogfriendly: true,
      wheelchairaccessible: false,
      strollerfriendly: false,
      fishing: false,
      camping: true,
      birdwatching: false,
    }
  }

  // fetch('http://localhost:3000/tags')
  // .then(res => res.json())
  // .then((result) => {
  //     result.forEach(function(tag){
  //         if(tag.hikingtrail_id === trailInfo.id){
  //             tagArray.push(tag)
  //         }
  //     })

  // })

  // }

  // populateTags = (event) => {
  // tagArray.forEach(function(tag){
  //     return (
  //     <div>
  //         <h3>{tag.user_id}</h3>
  //         <h4>{tag.kidfriendly}</h4>
  //         <h4>{tag.dogfriendly}</h4>
  //         <h4>{tag.wheelchairaccessible}</h4>
  //         <h4>{tag.strollerfriendly}</h4>
  //         <h4>{tag.fishing}</h4>
  //         <h4>{tag.camping}</h4>
  //         <h4>{tag.birdwatching}</h4>
  //     </div>
  //     )
  // })
  // }

  // handleSubmit = (event) => {
  //     event.preventDefault();

  //     let trailInfo = {
  //         user_id: trailInfo.id,
  //         hikingtrail_id: trailInfo.id,
  //         kidfriendly: trailInfo.kidfriendly,
  //         dogfriendly: trailInfo.dogfriendly,
  //         wheelchairaccessible: trailInfo.wheelchairaccessible,
  //         strollerfriendly: trailInfo.strollerfriendly,
  //         fishing: trailInfo.fishing,
  //         camping: trailInfo.camping,
  //         birdwatching: trailInfo.birdwatching

  //     }

  //     let tagObj = {
  //         method: 'POST',
  //         headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(trailInfo)
  //     }

  //     fetch('http://localhost:3000/tags', tagObj)
  // }

  //  handleChange = (event) => {
  //     this.setState({
  //         [event.target.name]: event.target.value,
  //     })
  // }

  render() {
    const { trailInfo } = this.props

    // console.log(trailInfo)

    return (
      <div>
        <figure>
          <img src={trailInfo.currentTrailImgUrl} alt='' />
        </figure>

        <br></br>
        <div>Name: {trailInfo.currentTrailName}</div>
        <div>City: {trailInfo.currentTrailCity}</div>
        <div>{trailInfo.currentTrailLength} miles</div>
        {/* <div>{trailInfo.longitude}{trailInfo.latitude}</div> */}
        <div>Summary: {trailInfo.currentTrailSummary}</div>
        <div>Conditon: {trailInfo.currentTrailCondition}</div>
        <div>Rating: {trailInfo.currentTrailStars}</div>
        <br></br>

        <Form onSubmit={this.handleSubmit}>
          <div>Add a Tag!</div>
          <br></br>
          <div>
            <label htmlFor='kid-friendly'>Good for kids?</label>
            <input
              type='checkbox'
              name='kid-friendly'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='dog-friendly'>Dog friendly?</label>
            <input
              type='checkbox'
              name='dog-friendly'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='wheelchair-accessible'>
              Wheelchair accessible?
            </label>
            <input
              type='checkbox'
              name='wheelchair-accessible'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='stroller-friendly'>Stroller accessible?</label>
            <input
              type='checkbox'
              name='stroller-friendly'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='fishing'>Is fishing allowed here?</label>
            <input
              type='checkbox'
              name='fishing'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='camping'>Is camping allowed here?</label>
            <input
              type='checkbox'
              name='camping'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor='birdwatching'>
              Is birdwatching available here?
            </label>
            <input
              type='checkbox'
              name='birdwatching'
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <input type='submit' value='Submit' />
        </Form>

        <div>{/* {this.populateTags()} */}</div>
      </div>
    )
  }
}

export default withRouter(TrailProfile)
