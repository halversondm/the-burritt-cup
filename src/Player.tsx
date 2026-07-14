interface PlayerProps {
    image: string,
    thumbnail: string,
    alt: string,
    name: string,
    office: string,
    hometown: string,
    nickname: string,
    about: string
}

export default function Player({image, thumbnail, alt, name, office, hometown, nickname, about}: PlayerProps) {

    return (
        <div className="mt-8 border border-gold-300 bg-cream-100 p-6 sm:p-8">
            <div className="flex items-center gap-4">
                <a href={image}>
                    <img className="h-16 w-16 rounded-full border-2 border-gold-500 object-cover" src={thumbnail}
                         alt={alt}/>
                </a>
                <h2 className="font-serif text-2xl font-bold text-fairway-900">{name}</h2>
            </div>
            {office !== "" ? <h3 className="mt-4 font-sans text-lg font-semibold text-fairway-900">{office}</h3> : null}
            <h4 className="mt-2 font-sans text-sm text-sage-500">
                Hometown: {hometown} <br/> Nickname: {nickname}
            </h4>
            <p className="mt-4 leading-relaxed">{about}</p>
        </div>
    );
}