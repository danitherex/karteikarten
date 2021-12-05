import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { Button, Carousel } from 'react-bootstrap';

class Lernen extends React.Component {

  render() {

    return (
      <>

        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Carousel interval={null}>
          <Carousel.Item >
            <img
              width={720} height={380}
              className="d-block w-100"
              src={image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h2>Warum ist die Banane krumm?</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item >
            <img
              width={720} height={380}
              className="d-block w-100"
              src={image}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h2>Die Bananenblüte, die aus der Staude wächst, ist so schwer, dass sie sie einfach nach unten kippt</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </>
    );
  }
}




export default Lernen;
