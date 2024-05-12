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
  }));
}

// export default async function sitemap() {
//   // DYNAMIC PAGES - blogposts
//   // let blog = [];
//   // const libData_ = await fetch(`${URLroot}/api/library`);
//   // const libData = await libData_.json();
//   // if (libData.success) {
//   //   const blogData = await libData.success.filter(
//   //     (libItem) => libItem.type === "blogpost"
//   //   );

//   //   blog = blogData.map((blog) => ({
//   //     url: `${URLroot}/library/blog/${blog._id}`,
//   //     lastModified: new Date(blog.date).toISOString(),
//   //     priority: 0.5,
//   //   }));
//   // }
//   // STATIC PAGES;
//   const routes = [
//     { url: "", priority: 1 },
//     { url: "cars", priority: 0.75 },
//     { url: "contacts", priority: 0.75 },
//     { url: "library", priority: 0.75 },
//     { url: "accessories", priority: 0.5 },
//     { url: "library/album", priority: 0.5 },
//     { url: "library/blog", priority: 0.5 },
//     { url: "library/events", priority: 0.5 },
//     { url: "parts", priority: 0.5 },
//     { url: "services", priority: 0.5 },
//   ].map((route) => ({
//     url: `${URLroot}/${route.url}`,
//     priority: route.priority,
//     lastModified: new Date().toISOString(),
//     changeFrequency: "monthly",
//   }));

//   return [
//     ...routes,
//     // ...blog
//   ];
// }}
