import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';


const Contact = () => {
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({ name: '', email: '', contact:'', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message || !formData.contact) {
            return toast.error('Please fill in all fields');
        }

        try {
            setLoading(true);
            const res = await axiosSecure.post('/contact', formData);
            toast.success(res.data.message || 'Message sent!');
            setFormData({ name: '', email: '', message: '', contact:'' });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <section className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Type your Name here"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                             placeholder="Type your Email here"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                             placeholder="Type your Contact Number here"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Type your message here....."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-700">
                    <p>📞 Hotline: <strong>+8801XXXXXXXXX</strong></p>
                    <p>📧 Email: <strong>contact@blooddonation.com</strong></p>
                </div>
            </section>


        </div>
    );
};

export default Contact;