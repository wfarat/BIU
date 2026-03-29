export function WatchedBadge({ watched }: { watched: boolean }) {
    if (!watched) return null;
    return (
        <span>✓ Obejrzany</span>
    )
}
