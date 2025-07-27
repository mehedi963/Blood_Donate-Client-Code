import React from 'react';

const AddBlog = () => {
    return (
        <div>
            <h1>AddBlog</h1>
        </div>
    );
};

export default AddBlog;








// import { useForm } from 'react-hook-form';
// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import JoditEditor from 'jodit-react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const AddBlog = () => {
//   const { register, handleSubmit, reset } = useForm();
//   const [content, setContent] = useState('');
//   const editor = useRef(null);
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const imgbbApiKey = 'YOUR_IMGBB_API_KEY'; // 🔁 Replace this with your actual imgbb key

//   const onSubmit = async (data) => {
//     try {
//       // 1. Upload thumbnail to imgbb
//       const imageFile = data.thumbnail[0];
//       const formData = new FormData();
//       formData.append('image', imageFile);

//       const imgRes = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//         formData
//       );

//       const imageUrl = imgRes.data.data.url;

//       // 2. Create blog
//       const blog = {
//         title: data.title,
//         thumbnail: imageUrl,
//         content: content,
//         // status will default to "draft" in the backend
//       };

//       await axiosSecure.post('/blogs', blog);
//       toast.success('Blog created successfully');
//       reset();
//       setContent('');
//       navigate('/dashboard/content-management');
//     } catch (err) {
//       toast.error('Failed to create blog');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Add New Blog</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block font-medium mb-1">Title</label>
//           <input
//             type="text"
//             {...register('title', { required: true })}
//             className="w-full border rounded px-3 py-2"
//             placeholder="Enter blog title"
//             required
//           />
//         </div>

//         {/* Thumbnail */}
//         <div>
//           <label className="block font-medium mb-1">Thumbnail Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             {...register('thumbnail', { required: true })}
//             className="w-full"
//             required
//           />
//         </div>

//         {/* Rich Text Content */}
//         <div>
//           <label className="block font-medium mb-1">Content</label>
//           <JoditEditor
//             ref={editor}
//             value={content}
//             tabIndex={1}
//             onBlur={(newContent) => setContent(newContent)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Create Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBlog;
