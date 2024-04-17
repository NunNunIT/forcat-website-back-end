// next.config.js
export default {
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dmjwq3ebx",
    TWEETNACL_PUBLIC_KEY_BASE64: "7zhu8+gSc34FGn2lBjH7bs2OM+hjkkrh3dKSAsQHuXA=",
    TWEETNACL_SECRET_KEY_BASE64: "mcwvsaLSMthCmElVr2E4Pyp2B4qeK+vOGJsLmGpVVG8=",
    NEXT_PUBLIC_BASE_URL: "127.0.0.1:3001",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
        hostname: "images.unsplash.com", // Thêm hostname của Unsplash
        port: "", // Không cần chỉ định cổng
        pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
      },
      {
        protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
        hostname: "images.pexels.com", // Thêm hostname của Pexels
        port: "", // Không cần chỉ định cổng
        pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
      },
      {
        protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
        hostname: "res.cloudinary.com", // Thêm hostname của Pexels
        port: "", // Không cần chỉ định cổng
        pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
      },
    ],
  },
};
