import React from 'react';
import { Link } from 'react-router-dom';
import {
    Home,
    User,
    Settings,
    MessageSquare,
    Navigation,
    FileText,
    Eye,
    Edit,
    Save,
    TrendingUp
} from 'lucide-react';

const Dashboard = () => {
    const pages = [
        {
            name: 'Home Page',
            href: '/home',
            icon: Home,
            description: 'Hero section, main content, and call-to-action',
            lastModified: '2 hours ago',
            status: 'published'
        },
        {
            name: 'About Page',
            href: '/about',
            icon: User,
            description: 'Company story, team information, and values',
            lastModified: '1 day ago',
            status: 'published'
        },
        {
            name: 'Services Page',
            href: '/services',
            icon: Settings,
            description: 'Service offerings, pricing, and features',
            lastModified: '3 days ago',
            status: 'published'
        },
        {
            name: 'Contact Page',
            href: '/contact',
            icon: MessageSquare,
            description: 'Contact form, location, and contact details',
            lastModified: '1 week ago',
            status: 'published'
        },
        {
            name: 'Navigation',
            href: '/navbar',
            icon: Navigation,
            description: 'Main navigation menu and branding',
            lastModified: '2 weeks ago',
            status: 'published'
        },
        {
            name: 'Footer',
            href: '/footer',
            icon: FileText,
            description: 'Footer links, social media, and legal info',
            lastModified: '1 month ago',
            status: 'published'
        }
    ];

    const stats = [
        { name: 'Total Pages', value: '6', icon: Edit, change: '+0%', changeType: 'neutral' },
        { name: 'Published', value: '6', icon: Save, change: '+100%', changeType: 'positive' },
        { name: 'Views Today', value: '1,234', icon: Eye, change: '+12%', changeType: 'positive' },
        { name: 'Growth Rate', value: '8.2%', icon: TrendingUp, change: '+2.1%', changeType: 'positive' }
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <stat.icon className="h-8 w-8 text-red-600" />
                            </div>
                            <div className="ml-4 flex-1">
                                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' :
                                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                                }`}>
                                {stat.change}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

           
        </div>
    );
};

export default Dashboard; 