import { type AxiosResponse } from "axios";
import { type Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { axiosNocoDB } from "~/lib/axios";
import { type NocoDBGetResponse } from "~/types/nocodb";
import { type Link } from "~/types/link";

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

export default async function Page({
    params: { slug },
}: {
    params: {
        slug: string;
    };
}): Promise<JSX.Element> {
    const link = await getLink(slug);

    if (!link) {
        return notFound();
    }

    redirect(link.URL);
}
