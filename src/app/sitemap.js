const rootURL = process.env.NEXTAUTH_URL || "http://localhost:3000/";

export default async function sitemap() {
  // blogpost pages
  let blog = [];
  const libData_ = await fetch(`${rootURL}api/library`);
  const libData = await libData_.json();
  if (libData.success) {
    const blogData = await libData.success.filter(
      (libItem) => libItem.type === "blogpost"
    );

    blog = blogData.map((blog) => ({
      url: `${rootURL}library/blog/${blog._id}`,
      lastModified: new Date(blog.date).toISOString(),
    }));
  }
  // pages;
  const routes = [
    "",
    "accessories",
    "cars",
    "contacts",
    "library",
    "library/album",
    "library/blog",
    "library/events",
    "parts",
    "services",
  ].map((route) => ({
    url: `${rootURL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blog];
}
