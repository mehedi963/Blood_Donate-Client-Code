

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchBlogs = async () => {
    const { data } = await axiosSecure(`/blogs?status=${filter}`);
    console.log(data);
    setBlogs(data);
  };
console.log(blogs);
  useEffect(() => {
    fetchBlogs();
  }, [filter]);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/blogs/${id}/status`, { status });
      toast.success(`Blog ${status === 'published' ? 'published' : 'unpublished'} successfully`);
      fetchBlogs();
    } catch {
      toast.error('Only admins can perform this action');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch {
      toast.error('Only admins can delete blogs');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Add Blog
          </button>
        </Link>
      </div>

      <div className="mb-4">
        <select
          className="border rounded px-3 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded shadow-md bg-white">
            <img src={blog.thumbnail} alt="Thumbnail" className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Status: <span className={`font-semibold ${blog.status === 'draft' ? 'text-orange-500' : 'text-green-600'}`}>
                {blog.status}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {blog.status === 'draft' && (
                <button
                  onClick={() => handleStatusChange(blog._id, 'published')}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Publish
                </button>
              )}
              {blog.status === 'published' && (
                <button
                  onClick={() => handleStatusChange(blog._id, 'draft')}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Unpublish
                </button>
              )}
              <button
                onClick={() => handleDelete(blog._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
              {/* Optional edit button */}
              {/* <Link to={`/dashboard/content-management/edit/${blog._id}`}>
                <button className="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
              </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
