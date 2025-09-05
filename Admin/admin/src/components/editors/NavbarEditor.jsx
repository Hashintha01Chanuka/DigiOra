import React, { useState } from "react";
import {
  Save,
  Eye,
  Undo,
  Plus,
  Trash2,
  Menu,
  Home,
  User,
  Settings,
  MessageSquare,
} from "lucide-react";

const NavbarEditor = () => {
  const [activeTab, setActiveTab] = useState("branding");
  const [content, setContent] = useState({
    branding: {
      logo: "DigiOra",
      logoUrl: "/logo.png",
      tagline: "Digital Marketing Excellence",
    },
    navigation: [
      { name: "Home", href: "/", icon: "Home", active: true },
      { name: "About", href: "/about", icon: "User", active: false },
      { name: "Services", href: "/services", icon: "Settings", active: false },
      {
        name: "Contact",
        href: "/contact",
        icon: "MessageSquare",
        active: false,
      },
    ],
    cta: {
      text: "Get Started",
      href: "/contact",
      style: "primary",
    },
    settings: {
      sticky: true,
      transparent: true,
      showTagline: true,
      mobileMenu: "hamburger",
    },
  });

  const [savedContent, setSavedContent] = useState(content);
  const [hasChanges, setHasChanges] = useState(false);

  const handleContentChange = (section, field, value) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [field]: value,
      },
    };
    setContent(newContent);
    setHasChanges(true);
  };

  const handleArrayChange = (section, index, field, value) => {
    const newContent = {
      ...content,
      [section]: content[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    };
    setContent(newContent);
    setHasChanges(true);
  };

  const addNavigationItem = () => {
    const newItem = {
      name: "New Page",
      href: "/new-page",
      icon: "Menu",
      active: false,
    };
    setContent({
      ...content,
      navigation: [...content.navigation, newItem],
    });
    setHasChanges(true);
  };

  const removeNavigationItem = (index) => {
    setContent({
      ...content,
      navigation: content.navigation.filter((_, i) => i !== index),
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    setSavedContent(content);
    setHasChanges(false);
    console.log("Saving navbar content:", content);
  };

  const handleReset = () => {
    setContent(savedContent);
    setHasChanges(false);
  };

  const tabs = [
    { id: "branding", name: "Branding" },
    { id: "navigation", name: "Navigation" },
    { id: "cta", name: "Call to Action" },
    { id: "settings", name: "Settings" },
  ];

  const renderBrandingEditor = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo Text
          </label>
          <input
            type="text"
            value={content.branding.logo}
            onChange={(e) =>
              handleContentChange("branding", "logo", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo URL
          </label>
          <input
            type="text"
            value={content.branding.logoUrl}
            onChange={(e) =>
              handleContentChange("branding", "logoUrl", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tagline
        </label>
        <input
          type="text"
          value={content.branding.tagline}
          onChange={(e) =>
            handleContentChange("branding", "tagline", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Brand Preview</h4>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold">
            {content.branding.logo.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              {content.branding.logo}
            </div>
            {content.settings.showTagline && (
              <div className="text-sm text-gray-500">
                {content.branding.tagline}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNavigationEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Navigation Menu</h3>
        <button
          onClick={addNavigationItem}
          className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="space-y-4">
        {content.navigation.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                Menu Item {index + 1}
              </h4>
              <button
                onClick={() => removeNavigationItem(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleArrayChange(
                      "navigation",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) =>
                    handleArrayChange(
                      "navigation",
                      index,
                      "href",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <select
                  value={item.icon}
                  onChange={(e) =>
                    handleArrayChange(
                      "navigation",
                      index,
                      "icon",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="Home">Home</option>
                  <option value="User">User</option>
                  <option value="Settings">Settings</option>
                  <option value="MessageSquare">Message</option>
                  <option value="Menu">Menu</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e) =>
                    handleArrayChange(
                      "navigation",
                      index,
                      "active",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Active Page
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Navigation Preview</h4>
        <div className="flex flex-wrap gap-2">
          {content.navigation.map((item, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                item.active
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCTAEditor = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Button Text
          </label>
          <input
            type="text"
            value={content.cta.text}
            onChange={(e) => handleContentChange("cta", "text", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Button URL
          </label>
          <input
            type="text"
            value={content.cta.href}
            onChange={(e) => handleContentChange("cta", "href", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Button Style
        </label>
        <select
          value={content.cta.style}
          onChange={(e) => handleContentChange("cta", "style", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="primary">Primary (Filled)</option>
          <option value="secondary">Secondary (Outlined)</option>
          <option value="ghost">Ghost (Text Only)</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">CTA Button Preview</h4>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            content.cta.style === "primary"
              ? "bg-red-600 text-white hover:bg-red-700"
              : content.cta.style === "secondary"
              ? "border border-red-600 text-red-600 hover:bg-red-50"
              : "text-red-600 hover:bg-red-50"
          }`}
        >
          {content.cta.text}
        </button>
      </div>
    </div>
  );

  const renderSettingsEditor = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Sticky Navigation</h4>
            <p className="text-sm text-gray-500">
              Keep navbar fixed at top when scrolling
            </p>
          </div>
          <input
            type="checkbox"
            checked={content.settings.sticky}
            onChange={(e) =>
              handleContentChange("settings", "sticky", e.target.checked)
            }
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">
              Transparent Background
            </h4>
            <p className="text-sm text-gray-500">
              Make navbar background transparent on hero section
            </p>
          </div>
          <input
            type="checkbox"
            checked={content.settings.transparent}
            onChange={(e) =>
              handleContentChange("settings", "transparent", e.target.checked)
            }
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Show Tagline</h4>
            <p className="text-sm text-gray-500">
              Display tagline next to logo
            </p>
          </div>
          <input
            type="checkbox"
            checked={content.settings.showTagline}
            onChange={(e) =>
              handleContentChange("settings", "showTagline", e.target.checked)
            }
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Menu Type
        </label>
        <select
          value={content.settings.mobileMenu}
          onChange={(e) =>
            handleContentChange("settings", "mobileMenu", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="hamburger">Hamburger Menu</option>
          <option value="dropdown">Dropdown Menu</option>
          <option value="slide">Slide Menu</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Settings Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Sticky Navigation:</span>
            <span
              className={
                content.settings.sticky ? "text-green-600" : "text-gray-500"
              }
            >
              {content.settings.sticky ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Transparent Background:</span>
            <span
              className={
                content.settings.transparent
                  ? "text-green-600"
                  : "text-gray-500"
              }
            >
              {content.settings.transparent ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Show Tagline:</span>
            <span
              className={
                content.settings.showTagline
                  ? "text-green-600"
                  : "text-gray-500"
              }
            >
              {content.settings.showTagline ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Mobile Menu:</span>
            <span className="text-gray-700 capitalize">
              {content.settings.mobileMenu}
            </span>
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
          <h1 className="text-2xl font-bold text-gray-900">
            Navigation Editor
          </h1>
          <p className="text-gray-600">
            Edit navigation menu, branding, and settings
          </p>
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
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Editor */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === "branding" && renderBrandingEditor()}
        {activeTab === "navigation" && renderNavigationEditor()}
        {activeTab === "cta" && renderCTAEditor()}
        {activeTab === "settings" && renderSettingsEditor()}
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

export default NavbarEditor;
