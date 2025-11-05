import React, { useState } from 'react';
import { Save, Eye, Undo, Plus, Trash2, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const ContactPageEditor = () => {
    const [activeTab, setActiveTab] = useState('content');
    const [content, setContent] = useState({
        hero: {
            badge: 'Get In Touch',
            title: 'Let\'s Connect',
            subtitle: 'Our team will onboard you into our process and you can learn more about how we can collaborate to drive your digital success.'
        },
        contactInfo: [
            {
                type: 'email',
                title: 'Email Us',
                value: 'hello@digioramedia.com',
                secondary: 'info@digioramedia.com',
                icon: 'Mail'
            },
            {
                type: 'phone',
                title: 'Call Us',
                value: '+1 (555) 123-4567',
                secondary: '+1 (555) 987-6543',
                icon: 'Phone'
            },
            {
                type: 'address',
                title: 'Visit Us',
                value: '123 Digital Street',
                secondary: 'Marketing City, MC 12345',
                icon: 'MapPin'
            }
        ],
        formFields: [
            { name: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'John' },
            { name: 'lastName', label: 'Last Name', type: 'text', required: true, placeholder: 'Doe' },
            { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com' },
            { name: 'company', label: 'Company', type: 'text', required: false, placeholder: 'Your Company' },
            { name: 'message', label: 'How can we help you?', type: 'textarea', required: true, placeholder: 'Tell us about your project and goals...' }
        ],
        socialMedia: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/digiora', icon: 'LinkedIn' },
            { platform: 'Twitter', url: 'https://twitter.com/digioramedia', icon: 'Twitter' },
            { platform: 'Facebook', url: 'https://facebook.com/digioramedia', icon: 'Facebook' },
            { platform: 'Instagram', url: 'https://instagram.com/digioramedia', icon: 'Instagram' }
        ]
    });

    const [savedContent, setSavedContent] = useState(content);
    const [hasChanges, setHasChanges] = useState(false);

    const handleContentChange = (section, field, value) => {
        const newContent = {
            ...content,
            [section]: {
                ...content[section],
                [field]: value
            }
        };
        setContent(newContent);
        setHasChanges(true);
    };

    const handleArrayChange = (section, index, field, value) => {
        const newContent = {
            ...content,
            [section]: {
                ...content[section],
                [field]: content[section][field].map((item, i) =>
                    i === index ? { ...item, [field]: value } : item
                )
            }
        };
        setContent(newContent);
        setHasChanges(true);
    };

    const addContactInfo = () => {
        const newContact = {
            type: 'email',
            title: 'New Contact',
            value: '',
            secondary: '',
            icon: 'Mail'
        };
        setContent({
            ...content,
            contactInfo: [...content.contactInfo, newContact]
        });
        setHasChanges(true);
    };

    const removeContactInfo = (index) => {
        setContent({
            ...content,
            contactInfo: content.contactInfo.filter((_, i) => i !== index)
        });
        setHasChanges(true);
    };

    const addFormField = () => {
        const newField = {
            name: 'newField',
            label: 'New Field',
            type: 'text',
            required: false,
            placeholder: 'Enter value...'
        };
        setContent({
            ...content,
            formFields: [...content.formFields, newField]
        });
        setHasChanges(true);
    };

    const removeFormField = (index) => {
        setContent({
            ...content,
            formFields: content.formFields.filter((_, i) => i !== index)
        });
        setHasChanges(true);
    };

    const addSocialMedia = () => {
        const newSocial = {
            platform: 'New Platform',
            url: 'https://example.com',
            icon: 'Globe'
        };
        setContent({
            ...content,
            socialMedia: [...content.socialMedia, newSocial]
        });
        setHasChanges(true);
    };

    const removeSocialMedia = (index) => {
        setContent({
            ...content,
            socialMedia: content.socialMedia.filter((_, i) => i !== index)
        });
        setHasChanges(true);
    };

    const handleSave = () => {
        setSavedContent(content);
        setHasChanges(false);
        console.log('Saving contact page content:', content);
    };

    const handleReset = () => {
        setContent(savedContent);
        setHasChanges(false);
    };

    const tabs = [
        { id: 'content', name: 'Main Content' },
        { id: 'contact', name: 'Contact Info' },
        { id: 'form', name: 'Contact Form' },
        { id: 'social', name: 'Social Media' }
    ];

    const renderContentEditor = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
                    <input
                        type="text"
                        value={content.hero.badge}
                        onChange={(e) => handleContentChange('hero', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        value={content.hero.title}
                        onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <textarea
                    value={content.hero.subtitle}
                    onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
            </div>
        </div>
    );

    const renderContactEditor = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <button
                    onClick={addContactInfo}
                    className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                </button>
            </div>

            <div className="space-y-4">
                {content.contactInfo.map((contact, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900">Contact {index + 1}</h4>
                            <button
                                onClick={() => removeContactInfo(index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select
                                    value={contact.type}
                                    onChange={(e) => handleArrayChange('contactInfo', index, 'type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                >
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                    <option value="address">Address</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={contact.title}
                                    onChange={(e) => handleArrayChange('contactInfo', index, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Value</label>
                                <input
                                    type="text"
                                    value={contact.value}
                                    onChange={(e) => handleArrayChange('contactInfo', index, 'value', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Value</label>
                                <input
                                    type="text"
                                    value={contact.secondary}
                                    onChange={(e) => handleArrayChange('contactInfo', index, 'secondary', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFormEditor = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Contact Form Fields</h3>
                <button
                    onClick={addFormField}
                    className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Field
                </button>
            </div>

            <div className="space-y-4">
                {content.formFields.map((field, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900">Field {index + 1}</h4>
                            <button
                                onClick={() => removeFormField(index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Field Name</label>
                                <input
                                    type="text"
                                    value={field.name}
                                    onChange={(e) => handleArrayChange('formFields', index, 'name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => handleArrayChange('formFields', index, 'label', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select
                                    value={field.type}
                                    onChange={(e) => handleArrayChange('formFields', index, 'type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                >
                                    <option value="text">Text</option>
                                    <option value="email">Email</option>
                                    <option value="tel">Phone</option>
                                    <option value="textarea">Textarea</option>
                                    <option value="select">Select</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
                                <input
                                    type="text"
                                    value={field.placeholder}
                                    onChange={(e) => handleArrayChange('formFields', index, 'placeholder', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) => handleArrayChange('formFields', index, 'required', e.target.checked)}
                                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 text-sm text-gray-700">Required Field</label>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSocialEditor = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Social Media Links</h3>
                <button
                    onClick={addSocialMedia}
                    className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Platform
                </button>
            </div>

            <div className="space-y-4">
                {content.socialMedia.map((social, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900">Platform {index + 1}</h4>
                            <button
                                onClick={() => removeSocialMedia(index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                                <input
                                    type="text"
                                    value={social.platform}
                                    onChange={(e) => handleArrayChange('socialMedia', index, 'platform', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                                <input
                                    type="url"
                                    value={social.url}
                                    onChange={(e) => handleArrayChange('socialMedia', index, 'url', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Contact Page Editor</h1>
                    <p className="text-gray-600">Edit contact information and form fields</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleReset}
                        disabled={!hasChanges}
                        className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Undo className="h-4 w-4 mr-2" />
                        Reset
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-red-500 text-red-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {activeTab === 'content' && renderContentEditor()}
                {activeTab === 'contact' && renderContactEditor()}
                {activeTab === 'form' && renderFormEditor()}
                {activeTab === 'social' && renderSocialEditor()}
            </div>

            {/* Preview */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                    <button className="flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                        <Eye className="h-4 w-4 mr-1" />
                        Full Preview
                    </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                        Preview of the {activeTab} section will appear here...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactPageEditor; 