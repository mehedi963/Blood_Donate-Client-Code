import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BlogsDetails = () => {
    const { id } = useParams();
  const [blog, setBlog] = useState([]);
    const axiosSecure = useAxiosSecure()
  useEffect(() => {
    axiosSecure.get(`/blog/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

    return (
        <div>
            <div className="max-w-3xl mx-auto px-4 py-8">
      <img src={blog.thumbnail} alt={blog.title} className="w-full rounded mb-4" />
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 mb-6">Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} className="blog-content text-lg leading-relaxed" />
    </div>
        </div>
    );
};

export default BlogsDetails;