import type { NextRequest } from "next/server";
import { MiddlewareRequest } from "@netlify/next";
import faunadb from "faunadb";

const q = faunadb.query;

const client = new faunadb.Client({
  secret: 'fnAEyOigRHAAId4RkUGJ8jqf5zmiDhw8B6ccQKwn',
  domain: 'db.fauna.com',
})

export async function middleware(nextRequest: NextRequest) {
  const pathname = nextRequest.nextUrl.pathname;

  const middlewareRequest = new MiddlewareRequest(nextRequest);

  if (pathname.startsWith("/marketing")) {
    const expr = q.Map(
      q.Paginate(q.Documents(q.Collection('Pets'))),
      q.Lambda(x => q.Get(x))
    )

    const dbresponse = await client.query(expr);

    console.log('--->', dbresponse);
    // Unlike NextResponse.next(), MiddlewareRequest.next() actually sends the request to the origin
    // So we can grab the response and transform it!
    const response = await middlewareRequest.next();

    const message = `This was a static page but has been transformed in ${nextRequest?.geo?.city}, ${nextRequest?.geo?.country} using @netlify/next in middleware.ts!`;

    // Transform the response HTML
    response.replaceText("#message", message);
    // Transform the response props
    response.setPageProp("message", message);

    return response;
  }
}