

import React from "react";
// reactstrap components
import {Container, Row, Col, Button, Card, CardBody, UncontrolledCollapse } from "reactstrap";
// core components

function Akordeon() {
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
        <UncontrolledCollapse toggler="buttonMapToggler">
          <Card>
                <CardBody>
                  MAPA
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              magni, voluptas debitis similique porro a molestias consequuntur
              earum odio officiis natus, amet hic, iste sed dignissimos esse
              fuga! Minus, alias.
            </CardBody>
          </Card>
        </UncontrolledCollapse>
        <UncontrolledCollapse toggler="#buttonPositionsToggler">
          <Card>
                <CardBody>
                  COORDINATES
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              magni, voluptas debitis similique porro a molestias consequuntur
              earum odio officiis natus, amet hic, iste sed dignissimos esse
              fuga! Minus, alias.
            </CardBody>
          </Card>
            </UncontrolledCollapse>
            
          </Col>
        </Row>
      </Container>
    </div>
  )
  }



      {/* <div className="item">
        <a
          href="#pablo"
          id="exampleAccordion1"
          onClick={e => e.preventDefault()}
        >
          Toggle item
        </a>
        <UncontrolledCollapse
          role="tabpanel"
          toggler="#exampleAccordion1"
          defaultOpen
        >
          <p className="mb-3">
            Raz
          </p>
        </UncontrolledCollapse>
      </div>
      <div className="item">
        <a
          href="#pablo"
          id="exampleAccordion2"
          onClick={e => e.preventDefault()}
        >
          Toggle item 2
        </a>
        <UncontrolledCollapse role="tabpanel" toggler="#exampleAccordion2">
          <p className="mb-3">
            Donec at ipsum dignissim, rutrum turpis scelerisque, tristique
            lectus. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Vivamus nec dui turpis. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus.
          </p>
        </UncontrolledCollapse>
      </div>
    </> */}
//   );
// }

export default Akordeon;