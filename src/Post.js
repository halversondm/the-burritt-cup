import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = { currentImage: 0 };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }

    openLightbox(event) {
        event.preventDefault();
        let currentImage = Number(event.currentTarget.dataset.i);
        this.setState({
            currentImage: currentImage,
            lightboxIsOpen: true
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    render() {
        const LIGHTBOX_IMAGES = this.props.images.map((image) => {
            return { src: image.location, caption: image.title, alt: image.alt, width: 1, height: 1 };
        });
        return (
            <div>
                <hr />
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <div className="post-preview">
                            <h2 className="post-title">{this.props.title}</h2>
                            <h3 className="post-subtitle">{this.props.subtitle}</h3>
                            <p className="post-meta">{this.props.metatitle}</p>
                            {this.props.summary !== "" ? <p className="post-meta"><u>Summary</u><br />{this.props.summary}</p> : null}
                            {this.props.awards.length > 0 ?
                                <div className="post-preview">
                                    <u className="post-meta">Awards</u>
                                    <ul className="post-meta">
                                        {this.props.awards.map((award, i) => { return (<li key={i}>{award}</li>) })}
                                    </ul>
                                </div>
                                : null
                            }
                            {this.props.images.length > 0 ? <p className="post-meta"><u>Photo Gallery</u></p> : null}
                            <div className="location-gallery">
                                {this.props.images.map((image, i) => {
                                    return (
                                        <a href={image.location} title={image.title} key={i} data-i={i} onClick={this.openLightbox}>
                                            <img className="head" src={image.location} alt={image.alt} />
                                        </a>
                                    );
                                })}
                            </div>
                            <Lightbox images={LIGHTBOX_IMAGES} onClose={this.closeLightbox}
                                onClickPrev={this.gotoPrevious}
                                onClickNext={this.gotoNext}
                                currentImage={this.state.currentImage}
                                isOpen={this.state.lightboxIsOpen} />
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
    images: PropTypes.array,
    awards: PropTypes.array,
    summary: PropTypes.string
};

Post.defaultProps = {
    title: "",
    subtitle: "",
    metatitle: "",
    images: [],
    awards: [],
    summary: ""
};

export default Post;