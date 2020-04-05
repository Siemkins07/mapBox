

import React, { useState } from "react";
// reactstrap components
import {Container, Row, Col, Button, Card, CardBody, UncontrolledCollapse, Table, Badge } from "reactstrap";
// core components
import ReactMapGL, { Marker } from 'react-map-gl';

const list = []
// const events = {}

function Akordeon() {
  
  
  const [markers, setMarkers] = useState(list)
  
  const [viewport, setViewport] = useState({
    latitude: 52.2319581,
    longitude: 21.0067249,
    zoom: 15,
  })
  
  const [action, setAction] = useState({})

 const logDragEvent = (name, event) => {
   setAction([name]= event.lngLat, ...action,)
  }

  const onMarkerStart = event => {
    logDragEvent('onDragStart', event)
  }

  const onMarkerDrag = event => {
    logDragEvent('onDrag', event)
  }

  const onMarkerEnd = event => {
    logDragEvent('onDragEnd', event)
    setMarkers(markers => [...markers, {id: markers.length +1, latitude: event.lngLat[1], longitude: event.lng[0]}])

  }
                    
  const handleRemovePoint = id => {
    setMarkers(markers => markers.filter(marker => marker.id !== id)) 
  }

  return (
    <div className="section section-accordion">
      <Container>
        <Row>
          <Col lg="6" md="12">
            <h2 className="title">MapBox</h2>
            <Button className="btn-round" color="info" type="button" size="lg" id="buttonMapToggler">
              Open Map
        </Button>
        <Button className="btn-round" color="info" outline type="button" size="lg" id="buttonPositionsToggler">
              Coordinates
        </Button>
            {/* <div style={{display:'flex'}}> */}
        <UncontrolledCollapse toggler="buttonMapToggler">
          <Card>
                <CardBody>
                  <ReactMapGL
                    {...viewport}
                    width="100%"
                    height='350px'
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={viewport => setViewport(viewport)}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    maxZoom={18} 
                    onClick={(e) => {
                      console.log(e)
                      e.preventDefault()
                      const latitude = e.lngLat[1]
                      const longitude = e.lngLat[0]
                      const timeStamp = e.timeStamp
                      setMarkers(markers => [...markers, { id: markers.length + 1, latitude, longitude, timeStamp }])
                    
                    }}                    
                  >
                    {markers.map(marker => (
                      <Marker
                        // key={marker.id}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        // timeStamp={marker.timeStamp}
                        offsetTop={-20}
                        offsetLeft={-10}
                        draggable
                        onDragStart={onMarkerStart}
                        onDrag={onMarkerDrag}
                        onDragEnd={onMarkerEnd}
                      >   
                        <i className="now-ui-icons location_pin">{marker.id}</i>
                      </Marker>
                    ))}
         </ReactMapGL>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
        <UncontrolledCollapse toggler="#buttonPositionsToggler">
          <Card>
            <CardBody>
              COORDINATES
                <Table>
                  <thead>
        <tr>
          <th>#</th>
          <th>Latitude</th>
          <th>Longitude</th>
          {/* <th>Addition time</th> */}
          <th>Delete point</th>
        </tr>
      </thead>
      <tbody>
          {markers.map(marker => (
              <tr>
              <th scope="row">{marker.id}</th>                  
            <td> {marker.latitude }</td>
            <td>{marker.longitude}</td>
              {/* <td>{new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(marker.timeStamp)}</td> */}
              <td>
                <Badge
                  color="danger"
                  className="mr-1"
                  style={{ display: 'flex', justifyContent: 'center', cursor: "pointer" }}
                  onClick={() => handleRemovePoint(marker.id)}
                
                >
                  Delete
              </Badge>
              </td>
            </tr>       
          ))}
                      
      </tbody>
          </Table>           
            </CardBody>
          </Card>
            </UncontrolledCollapse>
            {/* </div> */}
          </Col>
        </Row>
      </Container>
    </div>
  )
  }

export default Akordeon;