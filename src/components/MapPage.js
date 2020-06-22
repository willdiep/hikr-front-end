import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { Button } from 'react-bootstrap'
import { NavLink, withRouter, Link } from 'react-router-dom'
import TrailCard from './TrailCard'
import '../map.css'
import HikingTrail from './TrailProfile'

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_API_KEY}`

let hikingKey = `${process.env.REACT_APP_HIKING_PROJECT_API_KEY}`

var trailStuff = [
  {
    name: null,
    city: null,
    summary: null,
    length: null,
    // longitude: null,
    // latitude: null,
    stars: null,
  },
]

let localStorageLat = +localStorage.getItem('lat')
let localStorageLong = +localStorage.getItem('long')

class MapPage extends Component {
  constructor() {
    super()

    this.map = undefined

    this.state = {
      zoom: 10,
      currentTrailName: null,
      currentTrailCity: null,
      currentTrailSummary: null,
      currentTrailLength: null,
      // currentTrailLng: null,
      // currentTrailLat: null,
      currentTrailStars: null,
      allStores: {
        type: 'FeatureCollection',
        features: [],
      },
      isFetching: true,
      active: null,
    }
  }

  componentDidMount() {
    this.fetchListings()

    this.loadMapAndMarkers()
  }

  makeGeoJSON = (trail) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [trail.longitude, trail.latitude],
      },
      properties: {
        id: trail.id,
        name: trail.name,
        city: trail.location,
        summary: trail.summary,
        difficulty: trail.difficulty,
        stars: trail.stars,
        img_url: trail.imgSmall,
        length: trail.length,
        condition: trail.conditionDetails,
        conditionDate: trail.conditionDate,
      },
    }
  }

  makeTrailJSON = (trail) => {
    return {
      name: trail.name,
      location: trail.location,
      distance: trail.length,
      longitude: trail.longitude,
      latitude: trail.latitude,
    }
  }

  fetchListings = () => {
    let trailsUrl =
      'https://www.hikingproject.com/data/get-trails?lat=' +
      `${this.props.lat || localStorageLat}` +
      '&lon=' +
      `${this.props.lng || localStorageLong}` +
      '&maxDistance=10&key=' +
      `${hikingKey}`
    // console.log(trailsUrl)
    fetch(trailsUrl)
      .then((res) => res.json())
      .then((result) => {
        let stores = {
          type: 'FeatureCollection',
          features: [],
        }

        result.trails.forEach((trail) =>
          stores.features.push(this.makeGeoJSON(trail))
        )
        // result.trails.forEach(trail => trailInfo.trails.push(this.makeTrailJSON(trail)))

        this.setState({
          allStores: stores,
          isFetching: false,
        })
        // NOT IN USE
        // postTrails();
      })

    /**
     * Assign a unique id to each store. You'll use this `id`
     * later to associate each point on the map with a listing
     * in the sidebar.
     */
    // this.state.allStores.features.forEach(function(store, i) {
    //   store.properties.id = i
    // })

    //FETCH TO BACKEND TO POST NEW HIKINGTRAILS ----------------------------

    //   let trailInfo = {
    //     trails: []
    //   }

    // function postTrails() {
    //   trailInfo.trails.forEach(function(info){
    //     // console.log(info)
    //     fetch('http://localhost:3000/hikingtrails', {
    //       method: "POST",
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         name: info.name,
    //         location: info.location,
    //         distance: info.length,
    //         longitude: info.longitude,
    //         latitude: info.latitude
    //       })
    //     })
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             // console.log(result)

    //         }

    //     )

    //   })
    // }
  }

  //-------------------------------------------------------------------------

  loadMapAndMarkers = () => {
    // console.log(stores)
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [this.props.lng || localStorageLong, this.props.lat || localStorageLat],
      center: [localStorageLong, localStorageLat],
      zoom: this.state.zoom,
      // scrollZoom: true
    })

    this.map.on('move', (e) => {
      this.setState({
        // lng: map.getCenter().lng.toFixed(4),
        // lat: map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2),
        currentTrailName: trailStuff[0].name,
        currentTrailCity: trailStuff[0].city,
        currentTrailSummary: trailStuff[0].summary,
        currentTrailLength: trailStuff[0].length,
        // currentTrailLng: trailStuff[0].longitude,
        // currentTrailLat: trailStuff[0].latitude,
        currentTrailStars: trailStuff[0].stars,
      })
      // this.handleMapClick()
    })

    /**
     * Add geolocate control to the map.
     **/
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    )

    /**
     * Add zoom and rotation controls to the map.
     **/
    this.map.addControl(new mapboxgl.NavigationControl())

    /**
     * Wait until the map loads to make changes to the map.
     */
    this.map.on('load', () => {
      /**
       * This is where your '.addLayer()' used to be, instead
       * add only the source without styling a layer
       */
      this.map.addSource('places', {
        type: 'geojson',
        data: this.state.allStores,
      })

      /**
       * Add all the things to the page:
       * - The location listings on the side of the page
       * - The markers onto the map
       */
      // this.buildLocationList(this.state.allStores)
      // debugger
      this.addMarkers()
    })
  }

  displayDifficulty = (difficulty) => {
    if (difficulty === 'green') {
      return 'easy'
    } else if (difficulty === 'blue') {
      return 'intermediate'
    } else if (difficulty === 'blueBlack') {
      return 'intermediate/difficult'
    } else {
      return 'difficult'
    }
  }

  /**
   * Add a listing for each store to the sidebar.
   **/
  buildLocationList = (data) => {
    const listings = document.getElementById('listings')
    listings.innerHTML = ''

    data.features.forEach((store, i) => {
      /**
       * Create a shortcut for `store.properties`,
       * which will be used several times below.
       **/
      const prop = store.properties

      /* Add a new listing section to the sidebar. */
      const listing = listings.appendChild(document.createElement('div'))
      /* Assign a unique `id` to the listing. */
      listing.id = 'listing-' + prop.id
      /* Assign the `item` class to each listing for styling. */
      listing.className = 'item'

      /* Add the link to the individual listing created above. */
      const link = listing.appendChild(document.createElement('a'))
      link.href = '/hikingtrails/' + prop.name + ':slug'
      link.className = prop.name
      link.id = 'link-' + prop.id
      link.innerHTML = prop.name

      /* Add details to the individual listing. */
      const details = listing.appendChild(document.createElement('div'))
      details.innerHTML =
        '<Button>' + this.displayDifficulty(prop.difficulty) + '</Button>'
      details.innerHTML += prop.stars

      const extraDetails = listing.appendChild(document.createElement('div'))
      extraDetails.innerHTML = prop.city

      /**
       * Listen to the element and when it is hovered, do four things:
       * 1. Update the `currentFeature` to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/

      link.addEventListener('mouseover', (e) => {
        for (let i = 0; i < data.features.length; i++) {
          if (this.id === 'link-' + data.features[i].properties.id) {
            var clickedListing = data.features[i]
            this.flyToStore(clickedListing)
            this.createPopUp(clickedListing)
            trailStuff = []
            trailStuff.push(clickedListing.properties)
          }
        }
        // const activeItem = document.getElementsByClassName('active')
        // if (activeItem[0]) {
        //   activeItem[0].classList.remove('active')
        // }
        // this.parentNode.classList.add('active')
      })
    })
  }

  /**
   * Add a marker to the map for every store listing.
   **/
  addMarkers = () => {
    /* For each feature in the GeoJSON object above: */
    this.state.allStores.features.forEach((marker) => {
      /* Create a div element for the marker. */
      var el = document.createElement('div')
      /* Assign a unique `id` to the marker. */
      el.id = 'marker-' + marker.properties.id
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker'

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map)

      /**
       * Listen to the element and when it is clicked, do three things:
       * 1. Fly to the point
       * 2. Close all other popups and display popup for clicked store
       * 3. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      el.addEventListener('click', (e) => {
        /* Fly to the point */
        this.flyToStore(marker)
        /* Close all other popups and display popup for clicked store */
        this.createPopUp(marker)
        /* Highlight listing in sidebar */
        var activeItem = document.getElementsByClassName('active')
        e.stopPropagation()
        if (activeItem[0]) {
          activeItem[0].classList.remove('active')
        }
        var listing = document.getElementById('listing-' + marker.properties.id)
        listing.classList.add('active')
      })
    })
  }

  /**
   * Use Mapbox GL JS's `flyTo` to move the camera smoothly
   * a given center point.
   **/
  flyToStore = (currentFeature) => {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    })
  }

  /**
   * Create a Mapbox GL JS `Popup`.
   **/
  createPopUp = (currentFeature) => {
    var popUps = document.getElementsByClassName('mapboxgl-popup')
    if (popUps[0]) popUps[0].remove()
    var popup = new mapboxgl.Popup({ closeOnClick: false, anchor: 'bottom' })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        '<h3><a href="http://localhost:3001/hikingtrails/' +
          currentFeature.properties.name +
          '">' +
          currentFeature.properties.name +
          '</a></h3>' +
          '<h5>Distance: ' +
          currentFeature.properties.length +
          ' miles</h5>' +
          '<h5>' +
          currentFeature.properties.summary +
          '</h5>' +
          '<img src=' +
          currentFeature.properties.img_url +
          '>' +
          '<h5>Conditions: ' +
          currentFeature.properties.condition +
          '</h5>'
      )
      .addTo(this.map)
    // this.props.history.push('/hikingtrails/id')
    // })
  }

  // map onlick function to send state to parent
  handleMapClick = (event, e) => {
    // event.preventDefault();
    this.props.mapClick(trailStuff[0])
    // console.log(trailStuff[0])
  }

  handleMouseOver = (trailInfo, id) => {
    // console.log('trailInfo: ', trailInfo)
    // console.log('id: ',id)

    this.flyToStore(trailInfo)
    // DISABLE POP-UP. RE-RENDER SIDEBAR INFO INSTEAD
    // this.createPopUp(trailInfo)
    this.setState({
      active: `listing -${id}`,
    })

    let activeItem = document.getElementsByClassName('active')
    // console.log(activeItem[0])
    if (activeItem[0]) {
      activeItem[0].classList.remove('active')
    }
    document.querySelector(`#trail-${id}`).classList.add('active')
  }

  handleTrailCardClick = (e) => {
    console.log(e.target.innerText)
  }

  render() {
    const { isFetching } = this.state

    return (
      <div>
        {/* <h5>Filters</h5> */}
        {/* <p>distance ratings tags</p> */}
        {/* <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{' '}
            {this.state.zoom}
          </div>
        </div> */}

        <div className='sidebar'>
          <div className='heading'>
            <h4>Hiking Trails</h4>
          </div>
          <div id='listings' className='listings'>
            {isFetching ? (
              <div>Loading...</div>
            ) : (
              this.state.allStores.features.map((trail) => {
                // console.log(trail)
                return (
                  <TrailCard
                    key={trail.properties.id}
                    trail={trail}
                    handleMouseOver={this.handleMouseOver}
                    handleTrailCardClick={this.handleTrailCardClick}
                  />
                )
              })
            )}
          </div>
        </div>
        <div ref={(el) => (this.mapContainer = el)} className='map' />
        {/* <div id='map' class='map'></div> */}
      </div>
    )
  }
}

export default withRouter(MapPage)
