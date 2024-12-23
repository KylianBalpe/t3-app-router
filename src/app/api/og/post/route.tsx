import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasPost = searchParams.has("post");

    let title: string;

    if (hasPost) {
      const encodedPost = searchParams.get("post")!;
      title = Buffer.from(encodedPost, "base64").toString("utf-8");
    } else {
      title = "T3 App";
    }

    const font = await fetch(
      new URL("../../../../assets/fonts/Archivo-SemiBold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#374151",
            fontFamily: "Archivo",
          }}
        >
          <div
            tw="mx-auto my-auto flex w-full h-full max-h-[550px] max-w-[1120px] flex-col items-center justify-center rounded-3xl border-8 border-black bg-[#ffc800]"
            style={{
              boxShadow: "12px 12px 0 0 rgb(0,0,0)",
            }}
          >
            <div tw="mt-4 text-7xl text-black text-center">{title}</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Archivo",
            data: font,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: unknown) {
    console.error(e);
    return new Response("Failed to generate open graph image", { status: 500 });
  }
}
