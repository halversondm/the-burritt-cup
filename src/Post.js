import React from 'react';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import {Carousel} from 'react-responsive-carousel';

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentImage: 0};
    }

    render() {
        return (
            <div>
                <hr/>
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <div className="post-preview">
                            <h2 className="post-title">{this.props.title}</h2>
                            <h3 className="post-subtitle">{Array.isArray(this.props.subtitle) ? this.props.subtitle.map((desc, i) => {
                                return (<div key={i}>{desc}<br/></div>);
                            }) : this.props.subtitle}</h3>
                            <p className="post-meta">{this.props.metatitle}</p>
                            {this.props.summary !== "" ?
                                <p className="post-meta"><u>Summary</u><br/>{this.props.summary}</p> : null}
                            {this.props.awards.length > 0 ?
                                <div className="post-preview">
                                    <u className="post-meta">Awards</u>
                                    <ul className="post-meta">
                                        {this.props.awards.map((award, i) => {
                                            return (<li key={i}>{award}</li>)
                                        })}
                                    </ul>
                                </div>
                                : null
                            }
                            {this.props.images.length > 0 ? <p className="post-meta"><u>Photo Gallery</u></p> : null}
                            <Carousel showArrows={true}>
                                {this.props.images.map((image, i) => {
                                    return (
                                        <div key={i}>
                                            <img src={image.location} alt={image.alt}/>
                                            <p className="legend">{image.title}</p>
                                        </div>);
                                })}
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

Post.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.any,
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