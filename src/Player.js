import React from 'react';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

class Player extends React.Component {

    render() {
        return (
            <div>
                <hr/>
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <div className="post-preview">
                            <h2 className="post-title">
                                <a href={this.props.image}>
                                    <img className="head" src={this.props.thumbnail} alt={this.props.alt}/>
                                </a> {this.props.name}
                            </h2>
                            {this.props.office !== "" ? <h3 className="post-subtitle">{this.props.office}</h3> : null}
                            <h4 className="post-subtitle">
                                Hometown: {this.props.hometown} <br/> Nickname: {this.props.nickname} <br/>
                            </h4>
                            <p className="post-meta">{this.props.about}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

Player.defaultProps = {
    image: "",
    thumbnail: "",
    alt: "",
    name: "",
    office: "",
    hometown: "",
    nickname: "",
    about: ""
};

Player.propTypes = {
    image: PropTypes.string,
    thumbnail: PropTypes.string,
    alt: PropTypes.string,
    name: PropTypes.string,
    office: PropTypes.string,
    hometown: PropTypes.string,
    nickname: PropTypes.string,
    about: PropTypes.string
};

export default Player;