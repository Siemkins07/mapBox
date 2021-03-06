import React, { useState } from "react";
import { Container, Row, Col, Button, Card, CardBody, UncontrolledCollapse, Table, Badge } from "reactstrap";
import ReactMapGL, { Marker } from 'react-map-gl';

function Akordeon() {

  const [switchMap, setSwitchMap] = useState(false)
  const list = []
  const [markers, setMarkers] = useState(list)
  const [viewport, setViewport] = useState({
    latitude: 52.2319581,
    longitude: 21.0067249,
    zoom: 15,
  })

  const onMarkerEnd = e => {
    let markerId = null
    if (e.target.tagName === 'I') {
      markerId = Number(e.target.innerHTML);
    } else {
      markerId = Number(e.target.getElementsByTagName('i')[0].innerHTML)
    }

    const index = markers.findIndex((m) => m.id === markerId);
    if (index !== -1) {
      setMarkers(markers => markers
        .slice(0, index)
        .concat(
          [{ id: markerId, latitude: e.lngLat[1], longitude: e.lngLat[0] }],
          markers.slice(index + 1))
      )
    }
  }

  const handleRemovePoint = id => {
    setMarkers(markers => markers.filter(marker => marker.id !== id))
  }

  return (
    <div className="section section-accordion">
      <Container>
        <Row>
          <Col lg="12" md="12">
            <h2 className="title">MapBox</h2>
            <Button
              id="buttonMapToggler"
              className="btn-round"
              color="info" type="button"
              size="lg"
              onClick={e => setSwitchMap(switchMap => !switchMap)}
            >
              {switchMap ? "Close Map" : "Open Map"}
            </Button>
            <Button
              id="buttonPositionsToggler"
              className="btn-round"
              color="info"
              outline
              type="button"
              size="lg"
            >
              Coordinates
            </Button>
            <UncontrolledCollapse toggler="buttonMapToggler">
              <Card>
                <CardBody>
                  <ReactMapGL
                    {...viewport}
                    width="100%"
                    height='40vh'
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={viewport => setViewport(viewport)}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    maxZoom={18}
                    onClick={e => {
                      e.preventDefault()
                      let id = markers.length > 0 ? markers[markers.length - 1].id + 1 : 1
                      const latitude = e.lngLat[1]
                      const longitude = e.lngLat[0]
                      const timeStamp = e.timeStamp
                      setMarkers(markers => [...markers, { id, latitude, longitude, timeStamp }])
                    }}
                  >
                    {markers.map(marker => (
                      <Marker
                        key={marker.id}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        timeStamp={marker.timeStamp}
                        offsetTop={-20}
                        offsetLeft={-10}
                        draggable
                        onDragEnd={onMarkerEnd}
                      >
                        <i className="now-ui-icons location_pin">{marker.id}</i>
                      </Marker>
                    ))}
                  </ReactMapGL>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
            <UncontrolledCollapse toggler="#buttonPositionsToggler" style={{ maxHeight: '300px', overflowY: markers.length > 4 ? 'scroll' : '' }}>
              <Card>
                <CardBody>
                  COORDINATES
                <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Addition time</th>
                        <th>Delete point</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markers.map(marker => (
                        <tr>
                          <th scope="row">{marker.id}</th>
                          <td> {marker.latitude}</td>
                          <td>{marker.longitude}</td>
                          <td>{new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(marker.timeStamp)}</td>
                          <td>
                            <Badge
                              color="danger"
                              className="mr-1"
                              style={{ cursor: "pointer" }}
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
          </Col>
        </Row>
      </Container>
    </div >
  )
}

export default Akordeon;