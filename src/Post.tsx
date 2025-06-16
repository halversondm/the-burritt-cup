import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import {Carousel} from 'react-responsive-carousel';

interface PostProps {
    title: string,
    subtitle: string,
    metatitle: string,
    images: Image[],
    awards: [],
    summary: string
}

interface Image {
    location: string,
    alt: string,
    title: string
}

export default function Post({title, subtitle, metatitle, images, awards, summary}: PostProps) {

    return (
        <div>
            <hr/>
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <div className="post-preview">
                        <h2 className="post-title">{title}</h2>
                        <h3 className="post-subtitle">{Array.isArray(subtitle) ? subtitle.map((desc, i) => {
                            return (<div key={i}>{desc}<br/></div>);
                        }) : subtitle}</h3>
                        <p className="post-meta">{metatitle}</p>
                        {summary !== "" ?
                            <p className="post-meta"><u>Summary</u><br/>{summary}</p> : null}
                        {awards && awards.length > 0 ?
                            <div className="post-preview">
                                <u className="post-meta">Awards</u>
                                <ul className="post-meta">
                                    {awards.map((award, i) => {
                                        return (<li key={i}>{award}</li>)
                                    })}
                                </ul>
                            </div>
                            : null
                        }
                        {images && images.length > 0 ? <p className="post-meta"><u>Photo Gallery</u></p> : null}
                        <Carousel showArrows={true}>
                            {images && images.map((image, i) => {
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