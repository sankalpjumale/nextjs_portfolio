import type { NextConfig } from "next";
import createMDX from "@next/mdx"
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["ts", "tsx", "mdx"],

  reactStrictMode: true,

  //configure external image domains allowed in next/image
  images: {
    remotePatterns: [
      {
        //allow images from github
        protocol: "https",
        hostname: "github.com"
      },
      {
        //allow images from github cdn
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        //allow images from cloudinary
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  },

  
};

//configure the mdx plugin with remark and rehype plugins and withmMDX wraps nextConfig 
const withMDX = createMDX({
  // options: {
  //   //remarksPlugins run during Markdown parsing
  //   remarkPlugins: [
  //     //remarkGfm adds github flavoured markdown: tables, strikethrough, task lists
  //     remarkGfm
  //   ],

  //   //rehypePlugins run after Markdown is converted to HTML
  //   rehypePlugins: [
  //     //rehypeHighlight adds syntax highlighting classes to fenced code blocks
  //     rehypeHighlight,

  //     //rehypeSlug adds id="..." to all heading for deep linking within posts
  //     rehypeSlug
  //   ]
  // }
})

//withMDX wraps and merges MDX settings into nextConfig
export default withMDX(nextConfig);
