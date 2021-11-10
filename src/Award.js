import React from 'react';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

class Award extends React.Component {

    render() {
        return (
            <div>
                <hr/>
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <div className="post-preview">
                            {this.props.image !== "" ?
                                <img className="img-responsive" src={this.props.image} alt={this.props.alt}/> : null}
                            <h2 className="post-title">{this.props.title}</h2>
                            <h4 className="post-subtitle">{this.props.subtitle}</h4>
                            <p className="post-meta">{this.props.metatitle}</p>
                            <p className="post-meta">Past Winners:</p>
                            <table className="table table-striped table-responsive">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Players</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.winners.map((winner, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{winner.year}</td>
                                                <td>{winner.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

Award.defaultProps = {
    image: "",
    alt: "",
    title: "",
    subtitle: "",
    metatitle: "",
    winners: [
        {
            year: "",
            name: ""
        }
    ]
};

Award.propTypes = {
    image: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    metatitle: PropTypes.string,
    winners: PropTypes.array
};

export default Award;