# BEKK: Client-side App (built with Next.js)
### Contributors:
- Brian Kim
- Kaitlyn Chau
### Things to know
- Next.js app routes provide options for rendering content on the client side or server side using hooks like useClient for client-side rendering and useServer for server-side rendering
- To run the app, please check the [instructions](./INSTRUCTIONS.md)

# Structure
## `/app` directory: where all the pages, components, and apis are saved
- ### `layout.js`: to create UI that is shared between routes
- ### `page.js` files: server-side rendered code that is used to make route segments publicly accessible
- ### `/api/.../route.js` files: route handlers for creating custom request handler for a given route using Request and Response APIs
- ###  `/components` directory: where shared components are saved
## `/utils` directory: where some helper functions are saved
## `/lib` directory: where redux functions are saved
## `/middleware.js`: code that runs before a request from the client-side is completed
