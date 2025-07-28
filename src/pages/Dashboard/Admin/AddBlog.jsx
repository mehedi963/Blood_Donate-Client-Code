import React, { useRef, useState } from 'react';
import { imageUpload } from '../../../api/utilities';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import JoditEditor from 'jodit-react';
const AddBlog = () => {
    const axiosSecure = useAxiosSecure()
     const editor = useRef(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setUploading(true);
  try {
    const imageURL = await imageUpload(file);
    setThumbnail(imageURL);
    toast.success('Thumbnail uploaded');
  } catch (error) {
    console.error(error);
    toast.error('Failed to upload image');
  } finally {
    setUploading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !thumbnail || !content) {
      return toast.error('Please fill in all fields');
    }

    const blogData = {
      title,
      thumbnail,
      content,
      status: 'draft', 
    };

    try {
  await axiosSecure.post('/blogs', blogData);
  toast.success('Blog created successfully!');
  navigate('/dashboard/content-management');
} catch (error) {
  console.error(error);
  toast.error('Failed to create blog');
}
  };


    return (
        <div>
               <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📝 Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded px-4 py-2 mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block font-medium">Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {thumbnail && <img src={thumbnail} alt="Thumbnail" className="mt-2 w-40 rounded" />}
        </div>

        <div>
          <label className="block font-medium">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => {}}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create
        </button>
      </form>
    </div>
  
        </div>
    );
};

export default AddBlog;

