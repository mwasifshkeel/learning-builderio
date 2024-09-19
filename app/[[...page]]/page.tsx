import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";
import { cache } from "react";

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'
export const revalidate = 10;

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  console.log("page name : " , props?.params?.page?.join("/") );
  const builderModelName = "page";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      options:{},
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}

