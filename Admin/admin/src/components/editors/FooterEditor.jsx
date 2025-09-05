import React, { useState } from 'react';
import { Save, Eye, Undo, Plus, Trash2, Link, Mail, Phone, MapPin } from 'lucide-react';

const FooterEditor = () => {
    const [activeTab, setActiveTab] = useState('content');
    const [content, setContent] = useState({
        branding: {
            logo: 'DigiOra',
            tagline: 'Digital Marketing Excellence',
            description: 'Driven by curiosity, DigiOra Media creates digital marketing strategies to address unmet needs in the modern business landscape.'
        },
        links: {
            company: [
                { name: 'About Us', href: '/about' },
                { name: 'Our Team', href: '/team' },
                { name: 'Careers', href: '/careers' },
                { name: 'Contact', href: '/contact' }
            ],
            services: [
                { name: 'Digital Strategy', href: '/services/strategy' },
                { name: 'Social Media', href: '/services/social' },
                { name: 'SEO & Analytics', href: '/services/seo' },
                { name: 'Content Marketing', href: '/services/content' }
            ],
            resources: [
                { name: 'Blog', href: '/blog' },
                { name: 'Case Studies', href: '/case-studies' },
                { name: 'Whitepapers', href: '/whitepapers' },
                { name: 'Newsletter', href: '/newsletter' }
            ]
        },
        contact: {
            address: '123 Digital Street, Marketing City, MC 12345',
            email: 'hello@digioramedia.com',
            phone: '+1 (555) 123-4567'
        },
        social: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/digiora', icon: 'LinkedIn' },
            { platform: 'Twitter', url: 'https://twitter.com/digioramedia', icon: 'Twitter' },
            { platform: 'Facebook', url: 'https://facebook.com/digioramedia', icon: 'Facebook' },
            { platform: 'Instagram', url: 'https://instagram.com/digioramedia', icon: 'Instagram' }
        ],
        legal: {
            copyright: '© 2024 DigiOra Media. All rights reserved.',
            privacy: '/privacy-policy',
            terms: '/terms-of-service',
            cookies: '/cookie-policy'
        }
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

    const addLink = (section) => {
        const newLink = { name: 'New Link', href: '/new-page' };
        setContent({
            ...content,
            links: {
                ...content.links,
                [section]: [...content.links[section], newLink]
            }
        });
        setHasChanges(true);
    };

    const removeLink = (section, index) => {
        setContent({
            ...content,
            links: {
                ...content.links,
                [section]: content.links[section].filter((_, i) => i !== index)
            }
        });
        setHasChanges(true);
    };

    const addSocial = () => {
        const newSocial = { platform: 'New Platform', url: 'https://example.com', icon: 'Globe' };
        setContent({
            ...content,
            social: [...content.social, newSocial]
        });
        setHasChanges(true);
    };

    const removeSocial = (index) => {
        setContent({
            ...content,
            social: content.social.filter((_, i) => i !== index)
        });
        setHasChanges(true);
    };

    const handleSave = () => {
        setSavedContent(content);
        setHasChanges(false);
        console.log('Saving footer content:', content);
    };

    const handleReset = () => {
        setContent(savedContent);
        setHasChanges(false);
    };

    const tabs = [
        { id: 'content', name: 'Branding' },
        { id: 'links', name: 'Links' },
        { id: 'contact', name: 'Contact' },
        { id: 'social', name: 'Social Media' },
        { id: 'legal', name: 'Legal' }
    ];

    const renderContentEditor = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo Text</label>
                    <input
                        type="text"
                        value={content.branding.logo}
                        onChange={(e) => handleContentChange('branding', 'logo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                    <input
                        type="text"
                        value={content.branding.tagline}
                        onChange={(e) => handleContentChange('branding', 'tagline', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    value={content.branding.description}
                    onChange={(e) => handleContentChange('branding', 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Brand Preview</h4>
                <div className="space-y-2">
                    <div className="font-semibold text-gray-900">{content.branding.logo}</div>
                    <div className="text-sm text-gray-600">{content.branding.tagline}</div>
                    <div className="text-sm text-gray-500">{content.branding.description}</div>
                </div>
            </div>
        </div>
    );

    const renderLinksEditor = () => (
        <div className="space-y-6">
            {Object.entries(content.links).map(([section, links]) => (
                <div key={section} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900 capitalize">{section} Links</h4>
                        <button
                            onClick={() => addLink(section)}
                            className="flex items-center px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Link
                        </button>
                    </div>

                    <div className="space-y-3">
                        {links.map((link, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={link.name}
                                        onChange={(e) => {
                                            const newLinks = links.map((l, i) =>
                                                i === index ? { ...l, name: e.target.value } : l
                                            );
                                            setContent({
                                                ...content,
                                                links: { ...content.links, [section]: newLinks }
                                            });
                                            setHasChanges(true);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="Link name"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={link.href}
                                        onChange={(e) => {
                                            const newLinks = links.map((l, i) =>
                                                i === index ? { ...l, href: e.target.value } : l
                                            );
                                            setContent({
                                                ...content,
                                                links: { ...content.links, [section]: newLinks }
                                            });
                                            setHasChanges(true);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="URL"
                                    />
                                </div>
                                <button
                                    onClick={() => removeLink(section, index)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderContactEditor = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                        value={content.contact.address}
                        onChange={(e) => handleContentChange('contact', 'address', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={content.contact.email}
                        onChange={(e) => handleContentChange('contact', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                    type="text"
                    value={content.contact.phone}
                    onChange={(e) => handleContentChange('contact', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Contact Preview</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{content.contact.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{content.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{content.contact.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSocialEditor = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Social Media Links</h3>
                <button
                    onClick={addSocial}
                    className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Platform
                </button>
            </div>

            <div className="space-y-4">
                {content.social.map((social, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-gray-900">Platform {index + 1}</h4>
                            <button
                                onClick={() => removeSocial(index)}
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
                                    onChange={(e) => handleArrayChange('social', index, 'platform', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                                <input
                                    type="url"
                                    value={social.url}
                                    onChange={(e) => handleArrayChange('social', index, 'url', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderLegalEditor = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                <input
                    type="text"
                    value={content.legal.copyright}
                    onChange={(e) => handleContentChange('legal', 'copyright', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Policy URL</label>
                    <input
                        type="text"
                        value={content.legal.privacy}
                        onChange={(e) => handleContentChange('legal', 'privacy', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Terms of Service URL</label>
                    <input
                        type="text"
                        value={content.legal.terms}
                        onChange={(e) => handleContentChange('legal', 'terms', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cookie Policy URL</label>
                    <input
                        type="text"
                        value={content.legal.cookies}
                        onChange={(e) => handleContentChange('legal', 'cookies', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Legal Links Preview</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Privacy Policy:</span>
                        <span className="text-blue-600">{content.legal.privacy}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Terms of Service:</span>
                        <span className="text-blue-600">{content.legal.terms}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Cookie Policy:</span>
                        <span className="text-blue-600">{content.legal.cookies}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Footer Editor</h1>
                    <p className="text-gray-600">Edit footer content, links, and legal information</p>
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
                {activeTab === 'links' && renderLinksEditor()}
                {activeTab === 'contact' && renderContactEditor()}
                {activeTab === 'social' && renderSocialEditor()}
                {activeTab === 'legal' && renderLegalEditor()}
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

export default FooterEditor; 