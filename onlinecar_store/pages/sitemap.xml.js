// import React from "react";

const staticUrls = ["/", "/about", "/contact"];

export default function Sitemap() {}

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls
        .map((pageurl) => {
          return `<url>
        <loc>${process.env.Host}${pageurl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
        })
        .join("")}
        
       
      </urlset>
    `;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
