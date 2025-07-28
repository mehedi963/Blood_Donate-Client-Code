import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { NavLink } from 'react-router';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get('/blog')
            .then(res => setBlogs(res.data))
            .catch(err => console.error(err));
    }, []);
    console.log(blogs);

    return (
        <div className='mt-12'>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-6">📰 Published Blogs</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                        <div key={blog._id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
                            <img src={blog.thumbnail} alt={blog.title} className="w-full h-48 object-cover rounded mb-3" />
                            <h3 className="text-xl font-semibold">{blog.title}</h3>
                            <p
                                className="text-gray-600 mt-2 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                            <NavLink to={`/blogs/${blog._id}`} className="text-blue-600 font-medium mt-3 inline-block">
                                Read more →
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Blogs;