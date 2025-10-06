import React, { useState } from 'react';
import { TrendingUp, Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Briefcase } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                subject: '',
                category: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-[#0083cf] text-white py-5">
                <div className="container text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-blue-100">
                        We're here to help you succeed. Reach out with questions, feedback, or partnership opportunities.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16 bg-gray-50">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BsWhatsapp className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
                            <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                            <p className="text-sm font-medium text-blue-600">Available 24/7</p>
                        </div>

                        <div className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                            <p className="text-gray-600 mb-4">Send us a detailed message</p>
                            <p className="text-sm font-medium text-green-600">support@quantum.com</p>
                        </div>

                        <div className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                            <p className="text-gray-600 mb-4">Speak directly with our team</p>
                            <p className="text-sm font-medium text-purple-600">+1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container">
                    <div className="bg-white w-full rounded-2xl shadow-2xl p-3 md:p-8 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="What's this about?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select a category</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="technical">Technical Support</option>
                                            <option value="account">Account Issues</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="feedback">Feedback</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    <Send className="h-5 w-5 mr-2" />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer CTA Section */}
            <section className="py-20 bg-[#0083cf] text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-lg mb-8">
                        Our support team is ready to assist you with anything you need.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center bg-white text-[#0083cf] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Contact Support
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Contact;
