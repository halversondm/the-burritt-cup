import React from 'react';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export default function Player({
                                   image,
                                   thumbnail,
                                   alt,
                                   name,
                                   office,
                                   hometown,
                                   nickname,
                                   about
                               }) {

    return (
        <div>
            <hr/>
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <div className="post-preview">
                        <h2 className="post-title">
                            <a href={image}>
                                <img className="head" src={thumbnail} alt={alt}/>
                            </a> {name}
                        </h2>
                        {office !== "" ? <h3 className="post-subtitle">{office}</h3> : null}
                        <h4 className="post-subtitle">
                            Hometown: {hometown} <br/> Nickname: {nickname} <br/>
                        </h4>
                        <p className="post-meta">{about}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}