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
        // Reset form after 3 seconds
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
        <div className="bg-gray-50">
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

            <section className="py-16 bg-white">
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

            <section className="py-20 bg-gray-900">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="flex items-center justify-center md:bg-gray-50 rounded-2xl">
                            <div className="bg-white w-full md:w-11/12 rounded-2xl shadow-2xl p-3 md:p-8 border border-gray-300">
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

                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-50 mb-6">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-300 mb-1">Headquarters</h3>
                                            <p className="text-gray-300">
                                                123 Financial District<br />
                                                New York, NY 10004<br />
                                                United States
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <Phone className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-300 mb-1">Phone</h3>
                                            <p className="text-gray-300">
                                                Support: +1 (555) 123-4567<br />
                                                Sales: +1 (555) 123-4568<br />
                                                International: +44 20 7946 0958
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <Mail className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-300 mb-1">Email</h3>
                                            <p className="text-gray-300">
                                                General: info@quantum.com<br />
                                                Support: support@quantum.com<br />
                                                Partnerships: partners@quantum.com
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <Clock className="h-6 w-6 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-300 mb-1">Business Hours</h3>
                                            <p className="text-gray-300">
                                                Monday - Friday: 8:00 AM - 8:00 PM EST<br />
                                                Weekend: 9:00 AM - 5:00 PM EST<br />
                                                <span className="text-blue-600 font-medium">Live chat: 24/7</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <a href="#" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                                        <HelpCircle className="h-5 w-5 text-blue-600 mr-3" />
                                        <span className="text-gray-700 hover:text-blue-600">Visit Help Center</span>
                                    </a>
                                    <a href="#" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                                        <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
                                        <span className="text-gray-700 hover:text-green-600">Start Live Chat</span>
                                    </a>
                                    <a href="#" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                                        <Briefcase className="h-5 w-5 text-purple-600 mr-3" />
                                        <span className="text-gray-700 hover:text-purple-600">Schedule Demo</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Global Offices
                        </h2>
                        <p className="text-xl text-gray-600">
                            We have offices around the world to better serve our global community.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">New York</h3>
                            <p className="text-gray-600 mb-4">
                                123 Financial District<br />
                                New York, NY 10004<br />
                                United States
                            </p>
                            <p className="text-sm text-blue-600 font-medium">Headquarters</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">London</h3>
                            <p className="text-gray-600 mb-4">
                                25 Canary Wharf<br />
                                London E14 5AB<br />
                                United Kingdom
                            </p>
                            <p className="text-sm text-green-600 font-medium">European Hub</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 text-center">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Singapore</h3>
                            <p className="text-gray-600 mb-4">
                                1 Marina Bay Drive<br />
                                Singapore 018989<br />
                                Singapore
                            </p>
                            <p className="text-sm text-purple-600 font-medium">Asia Pacific</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-50 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-300">
                            Quick answers to common questions about our platform and services.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                How do I get started with Quantum?
                            </h3>
                            <p className="text-gray-600">
                                Simply create a free account, complete our quick verification process, and you can
                                start exploring our platform immediately. No minimum deposit required to begin.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                What are your trading fees?
                            </h3>
                            <p className="text-gray-600">
                                We offer competitive pricing with commission-free stock trades and transparent
                                fee structures for all other instruments. Visit our pricing page for detailed information.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Is my money safe with Quantum?
                            </h3>
                            <p className="text-gray-600">
                                Yes, your funds are fully protected by SIPC insurance and segregated from company assets.
                                We use bank-level security and regulatory compliance to ensure maximum protection.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Do you offer educational resources?
                            </h3>
                            <p className="text-gray-600">
                                Absolutely! We provide comprehensive educational content including webinars, tutorials,
                                market analysis, and one-on-one coaching sessions for all skill levels.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-red-50 border-t border-red-200">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-red-800 mb-4">
                        Emergency Contact
                    </h2>
                    <p className="text-red-700 mb-6">
                        For urgent account issues or security concerns outside business hours
                    </p>
                    <div className="bg-white border border-red-200 rounded-lg p-6 inline-block">
                        <div className="flex items-center justify-center">
                            <Phone className="h-6 w-6 text-red-600 mr-3" />
                            <span className="text-lg font-semibold text-red-800">+1 (555) 911-HELP</span>
                        </div>
                        <p className="text-sm text-red-600 mt-2">Available 24/7 for emergencies only</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;