import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

class Post extends Component {

    render() {
        return (
            <div>
                <hr />
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <div className="post-preview">
                            <h2 className="post-title">{this.props.title}</h2>
                            <h3 className="post-subtitle">{this.props.subtitle}</h3>
                            <p className="post-meta">{this.props.metatitle}</p>
                            <div className="location-gallery">
                                {this.props.images.map((image, i) => {
                                    return (<a href={image.location}
                                        title={image.title} key={i}>
                                        <img className="head" src={image.location} alt={image.alt} />
                                    </a>)
                                })}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

Post.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    metatitle: PropTypes.string,
    images: PropTypes.array
};

Post.defaultProps = {
    title: "",
    subtitle: "",
    metatitle: "",
    images: [{location: "", title: "", alt: ""}]
};

export default Post;