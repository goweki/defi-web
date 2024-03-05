const rootURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXTAUTH_URL;

export default async function sitemap() {
  // DYNAMIC PAGES - blogposts
  // let blog = [];
  // const libData_ = await fetch(`${rootURL}api/library`);
  // const libData = await libData_.json();
  // if (libData.success) {
  //   const blogData = await libData.success.filter(
  //     (libItem) => libItem.type === "blogpost"
  //   );

  //   blog = blogData.map((blog) => ({
  //     url: `${rootURL}/library/blog/${blog._id}`,
  //     lastModified: new Date(blog.date).toISOString(),
  //   }));
  // }
  // pages;
  const routes = [
    "",
    "accessories",
    "cars",
    "contacts",
    "library",
    // "library/album",
    // "library/blog",
    // "library/events",
    "parts",
    "services",
  ].map((route) => ({
    url: `${rootURL}/${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...routes,
    // ...blog
  ];
}
