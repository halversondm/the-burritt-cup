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
        <div className="mt-8 border border-gold-300 bg-cream-100 p-6 sm:p-8">
            {image !== "" ?
                <img className="w-full object-cover" src={image} alt={alt}/> : null}
            <h2 className="mt-4 font-serif text-2xl font-bold text-fairway-900">{title}</h2>
            <h4 className="mt-1 font-sans text-sm text-sage-500">{subtitle}</h4>
            <p className="mt-2 leading-relaxed">{metatitle}</p>
            <p className="mt-6 font-sans text-sm font-semibold text-fairway-900">Past Winners:</p>
            <table className="mt-2 w-full border-collapse overflow-hidden">
                <thead>
                <tr className="bg-fairway-900 text-cream-50">
                    <th className="px-4 py-2 text-left font-sans text-sm uppercase tracking-wide">Year</th>
                    <th className="px-4 py-2 text-left font-sans text-sm uppercase tracking-wide">Players</th>
                </tr>
                </thead>
                <tbody>
                {winners.map((winner, i) => {
                    return (
                        <tr key={i} className={i % 2 === 0 ? "bg-cream-50" : "bg-white"}>
                            <td className="px-4 py-2">{winner.year}</td>
                            <td className="px-4 py-2">{winner.name}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}