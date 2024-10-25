import { type AxiosResponse } from "axios";
import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { axiosNocoDB } from "~/lib/axios";
import { type NocoDBGetResponse } from "~/types/nocodb";
import { type Link } from "~/types/link";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
    title: "Redirecting...",
};

async function getLink(slug: string): Promise<Link | null> {
    try {
        const links = await axiosNocoDB
            .get(`/${process.env.NOCODB_TABLE_ID}/records`, {
                params: {
                    where: `(Slug,eq,${slug})`,
                },
            })
            .then((res: AxiosResponse<NocoDBGetResponse<Link>>) => {
                return res.data.list;
            });

        const foundedLink = links.find((link) => link.Slug === slug);

        if (!foundedLink) {
            return null;
        }

        return foundedLink;
    } catch (error) {
        return null;
    }
}

export const revalidate = 300;

interface SearchParamProps {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_id?: string;
    utm_term?: string;
    utm_content?: string;
}

export default async function Page({
    params: { slug },
    searchParams,
}: {
    params: {
        slug: string;
    };
    searchParams: SearchParamProps;
}): Promise<JSX.Element> {
    const link = await getLink(slug);

    if (!link) {
        return notFound();
    }

    await api.count.updateLinkVisitedCount({
        slug,
        searchParams,
    });

    redirect(link.URL);
}
