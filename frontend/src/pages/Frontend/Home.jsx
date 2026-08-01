import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Hero from "../../components/frontend/Hero";
import PageCard from "../../components/frontend/PageCard";
import { getPages } from "../../api/frontend/pageApi";

export default function Home() {

    const [pages, setPages] = useState([]);

    useEffect(() => {

        loadPages();

    }, []);

    async function loadPages() {

        const response = await getPages();

        setPages(response.data.data);

    }

    return (

        <MainLayout>

            <Hero />

            <section className="max-w-7xl mx-auto py-20 px-8">

                <h2 className="text-4xl font-bold mb-10">

                    Latest Pages

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {pages.map(page => (

                        <PageCard
                            key={page.id}
                            page={page}
                        />

                    ))}

                </div>

            </section>

        </MainLayout>

    );

}