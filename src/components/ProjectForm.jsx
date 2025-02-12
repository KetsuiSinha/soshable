import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from '../firebase';

const ProjectSubmissionButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    category: '',
    location: '',
    startDate: '',
    duration: '',
    contributors: [],
    projectImage: ''
  });

  const categories = [
    'Beach Cleaning',
    'School Upgrades',
    'Public Resource Development'
  ];

  const locations = [
    'VIRAR', 'VASAI', 'NAIGAON', 'MALAD', 'ANDHERI'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.projectName || !formData.projectDescription || 
        !formData.category || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const projectData = {
        ...formData,
        contributors: auth.currentUser ? [auth.currentUser.uid] : [],
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, "projects"), projectData);
      console.log("Project submitted with ID: ", docRef.id);

      setFormData({
        projectName: '',
        projectDescription: '',
        category: '',
        location: '',
        startDate: '',
        duration: '',
        contributors: [],
        projectImage: ''
      });
      setIsModalOpen(false);
      alert("Project submitted successfully!");
    } catch (error) {
      console.error("Project submission error: ", error);
      alert("Failed to submit the project. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-800 chill text-white px-6 py-3 rounded-lg  transition"
      >
        Start New Project
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-100 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl overflow-hidden relative">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 p-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>

            <form 
              onSubmit={handleSubmit} 
              className="p-12 space-y-6"
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Project Submission Form
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Project Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Project Duration (months)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Project Image URL</label>
                  <input
                    type="url"
                    name="projectImage"
                    value={formData.projectImage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional image URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Project Description</label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-12 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold"
                >
                  Submit Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSubmissionButton;