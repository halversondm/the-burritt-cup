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
        <div className="mt-8 border border-gold-300 bg-cream-100 p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-fairway-900">{title}</h2>
            <h3 className="mt-2 font-sans text-lg font-semibold text-fairway-900">{Array.isArray(subtitle) ? subtitle.map((desc, i) => {
                return (<div key={i}>{desc}<br/></div>);
            }) : subtitle}</h3>
            <p className="mt-2 font-sans text-sm text-sage-500">{metatitle}</p>
            {summary !== "" ?
                <p className="mt-6 leading-relaxed"><u>Summary</u><br/>{summary}</p> : null}
            {awards && awards.length > 0 ?
                <div className="mt-6">
                    <u className="font-sans text-sm font-semibold text-fairway-900">Awards</u>
                    <ul className="mt-2 list-inside list-disc">
                        {awards.map((award, i) => {
                            return (<li key={i}>{award}</li>)
                        })}
                    </ul>
                </div>
                : null
            }
            {images && images.length > 0 ?
                <p className="mt-6 font-sans text-sm font-semibold text-fairway-900"><u>Photo Gallery</u></p> : null}
            <div className="mt-4">
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
        </div>
    );
}