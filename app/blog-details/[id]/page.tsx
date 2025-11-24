import React from 'react';
import BlogDetails from '../../../components/Blog/BlogDetails';
import blogData from '@/components/Blog/blogData';

// Generate static params for all blog IDs
export async function generateStaticParams() {
    const blogs = blogData();
    return blogs.map((blog) => ({
        id: blog.id.toString(),
    }));
}

const BlogDetailPage = () => {
    return <BlogDetails />;
};

export default BlogDetailPage;
