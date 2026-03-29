export function RatingStars({ rating }: { rating: number }) {
    const full = '★'.repeat(rating);
    const empty = '☆'.repeat(5 - rating);
    return (
        <span>
            {full}
            {empty}
        </span>
    )
}
