import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import {ReactNode} from "react";

interface AwardProps {
    image: string,
    alt: string,
    title: string,
    subtitle: string,
    metatitle: string,
    winners: Winner[]
}

export interface Winner {
    year: string,
    name: string
}

export default function Award({
                                  image,
                                  alt,
                                  title,
                                  subtitle,
                                  metatitle,
                                  winners,
                              }: AwardProps): ReactNode {

    return (
        <div>
            <hr/>
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <div className="post-preview">
                        {image !== "" ?
                            <img className="img-responsive" src={image} alt={alt}/> : null}
                        <h2 className="post-title">{title}</h2>
                        <h4 className="post-subtitle">{subtitle}</h4>
                        <p className="post-meta">{metatitle}</p>
                        <p className="post-meta">Past Winners:</p>
                        <table className="table table-striped table-responsive">
                            <thead>
                            <tr>
                                <th>Year</th>
                                <th>Players</th>
                            </tr>
                            </thead>
                            <tbody>
                            {winners.map((winner, i) => {
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