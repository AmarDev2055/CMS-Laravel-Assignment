import { Link } from "react-router-dom";

export default function PageCard({ page }) {

    return (

        <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">

            {page.cover_image && (

                <img
                    src={page.cover_image}
                    alt={page.title}
                    className="h-60 w-full object-cover"
                />

            )}

            <div className="p-6">

                <h2 className="text-2xl font-bold">

                    {page.title}

                </h2>

                <div
                    className="mt-4 text-gray-600 line-clamp-3"
                    dangerouslySetInnerHTML={{
                        __html: page.body,
                    }}
                />

                <Link
                    to={`/${page.slug}`}
                    className="inline-block mt-6 text-blue-600 font-semibold"
                >
                    Read More →
                </Link>

            </div>

        </div>

    );

}