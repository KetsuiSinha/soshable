import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase';
import { 
  FaTimes, 
  FaDownload,
  FaUsers,
  FaProjectDiagram,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

// Urgency Determination Function
const determineUrgency = (duration) => {
  const durationNum = parseInt(duration);
  if (durationNum <= 3) return 'High';
  if (durationNum <= 6) return 'Medium';
  return 'Low';
};

// Mask Contributor ID Function
const maskContributorId = (id) => {
  if (id.length <= 3) return id;
  return '*'.repeat(id.length - 3) + id.slice(-3);
};

// Certificate Generator Component
const CertificateGenerator = ({ userName, projectName, onClose }) => {
  const canvasRef = React.useRef(null);
  const [certificateImage, setCertificateImage] = useState(null);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 100);

    ctx.font = '24px Arial';
    ctx.fillText('This is to certify that', canvas.width / 2, 200);

    ctx.font = 'bold 32px Arial';
    ctx.fillText(`Mr/Mrs. ${userName}`, canvas.width / 2, 250);

    ctx.font = '24px Arial';
    ctx.fillText(`has completed his/her contribution to the project`, canvas.width / 2, 300);

    ctx.font = 'bold 28px Arial';
    ctx.fillText(projectName, canvas.width / 2, 350);

    const dataURL = canvas.toDataURL('image/png');
    setCertificateImage(dataURL);
  };

  React.useEffect(() => {
    generateCertificate();
  }, [userName, projectName]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <canvas ref={canvasRef} className="hidden" />
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          <FaTimes />
        </button>
        {certificateImage && (
          <div>
            <img 
              src={certificateImage} 
              alt="Generated Certificate" 
              className="w-full mb-4 border-2 border-gray-300"
            />
            <a 
              href={certificateImage} 
              download={`Certificate_${userName.replace(/\s+/g, '_')}.png`} 
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              <FaDownload /> Download Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// Project Browser Component
const ProjectBrowser = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    myProjects: false
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const [totalContributions, setTotalContributions] = useState({
    projectCount: 0,
    uniqueContributors: 0,
    contributorDetails: []
  });

  const [expandedSections, setExpandedSections] = useState({
    contributors: false,
    projects: false
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    fetchProjects();

    return () => unsubscribe();
  }, [filters, user]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      let projectsRef = collection(db, 'projects');
      
      let projectsQuery = projectsRef;
      
      if (filters.location) {
        projectsQuery = query(projectsQuery, where('location', '==', filters.location));
      }
      
      if (filters.category) {
        projectsQuery = query(projectsQuery, where('category', '==', filters.category));
      }
      
      if (filters.myProjects && user) {
        projectsQuery = query(projectsQuery, where('contributors', 'array-contains', user.uid));
      }

      const querySnapshot = await getDocs(projectsQuery);
      const projectList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          urgency: determineUrgency(data.duration)
        };
      });
      
      setProjects(projectList);

      // Calculate contributor details
      const contributorMap = new Map();
      projectList.forEach(project => {
        if (project.contributors) {
          project.contributors.forEach(contributorId => {
            const currentContrib = contributorMap.get(contributorId) || { 
              id: contributorId, 
              projectCount: 0, 
              projects: [] 
            };
            currentContrib.projectCount++;
            currentContrib.projects.push(project.projectName);
            contributorMap.set(contributorId, currentContrib);
          });
        }
      });

      const contributorDetails = Array.from(contributorMap.values());

      setTotalContributions({
        projectCount: projectList.length,
        uniqueContributors: contributorMap.size,
        contributorDetails: contributorDetails
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Failed to load projects. Please try again.");
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 chill">Community Projects</h1>
        
        {/* Contribution Summary */}
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <FaProjectDiagram className="mr-2 text-blue-500" />
            <span>Total Projects: {totalContributions.projectCount}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-2 text-green-500" />
            <span>Community Creators: {totalContributions.uniqueContributors}</span>
          </div>
        </div>

        {/* Contributors Dropdown */}
        <div className="mb-6 bg-white rounded-lg shadow">
          <div 
            onClick={() => toggleSection('contributors')} 
            className="flex justify-between items-center p-4 cursor-pointer"
          >
            <h2 className="font-semibold">Contributors Details</h2>
            {expandedSections.contributors ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedSections.contributors && (
            <div className="p-4">
              {totalContributions.contributorDetails.map((contributor, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                  <p>Contributor ID: {maskContributorId(contributor.id)}</p>
                  <p>Projects Contributed: {contributor.projectCount}</p>
                  <p>Project Names: {contributor.projects.join(', ')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Responsive Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 items-center">
          <select 
            name="location" 
            onChange={handleFilterChange} 
            className="w-full md:w-auto p-2 border rounded bg-white"
            value={filters.location}
          >
            <option value="">All Locations</option>
            {['VIRAR', 'VASAI', 'NAIGAON', 'MALAD', 'ANDHERI'].map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select 
            name="category" 
            onChange={handleFilterChange} 
            className="w-full md:w-auto p-2 border rounded bg-white"
            value={filters.category}
          >
            <option value="">All Categories</option>
            {['Beach Cleaning', 'School Upgrades', 'Public Resource Development'].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {user && (
            <div className="flex items-center w-full md:w-auto">
              <input 
                type="checkbox" 
                id="myProjects" 
                name="myProjects"
                checked={filters.myProjects}
                onChange={handleFilterChange}
                className="mr-2"
              />
              <label htmlFor="myProjects" className="text-sm">My Projects Only</label>
            </div>
          )}
        </div>

        {/* Responsive Projects Grid */}
        {loading ? (
          <div className="text-center text-gray-600">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-600">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="bg-white border rounded-lg clash shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h2 className="text-lg sm:text-xl font-medium mb-2 sm:mb-0">{project.projectName}</h2>
                    <span className={`text-xs sm:text-sm font-medium ${
                      project.urgency === 'High' ? 'text-red-500' : 
                      project.urgency === 'Medium' ? 'text-yellow-500' : 
                      'text-green-500'
                    }`}>
                      {project.urgency} Urgency
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{project.location} | {project.category}</p>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 text-sm px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition-colors"
                    >
                      View Details
                    </button>
                    {user && project.contributors && project.contributors[0] === user.uid && (
                      <button 
                        onClick={() => {
                          setSelectedProject(project);
                          setShowCertificate(true);
                        }}
                        className="flex-1 text-sm px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
                      >
                        Get Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Popup */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 z-10"
            >
              <FaTimes />
            </button>
            
            {selectedProject.projectImage && (
              <div className="relative">
                <img 
                  src={selectedProject.projectImage} 
                  alt={selectedProject.projectName} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-20"></div>
              </div>
            )}

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedProject.projectName}</h2>
              
              <p className="mb-4 text-gray-700 text-sm">
                A {selectedProject.urgency.toLowerCase()} urgency project starting on {selectedProject.startDate} 
                in {selectedProject.location}. This {selectedProject.category.toLowerCase()} 
                initiative will run for {selectedProject.duration} months, focusing on 
                community development and engagement.
              </p>
              
              <div className="text-sm text-gray-600">
                <strong>Full Description:</strong> {selectedProject.projectDescription}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Generator Popup */}
      {showCertificate && user && (
        <CertificateGenerator 
          userName={user.displayName || user.email.split('@')[0]} 
          projectName={selectedProject?.projectName || "Community Project"}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default ProjectBrowser;