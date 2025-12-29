export default function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            {/* Image */}
            <div className="aspect-square bg-gray-200" />

            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-5 bg-gray-300 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-10 bg-gray-300 rounded" />
            </div>
        </div>
    );
}
