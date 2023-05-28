/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    basePath: process.env.NODE_ENV === 'production' ? '/sakai-react' : '',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/sakai-react' : '',
        uploadPath: process.env.NODE_ENV === 'production' ? '/sakai-react/upload.php' : '/api/upload',
        BASE_URL: process.env.BASE_URL,
    },
};

module.exports = nextConfig;
// require('dotenv').config();
//
// module.exports = {
//   env: {
//     BASE_URL: process.env.BASE_URL,
//   },
// };

