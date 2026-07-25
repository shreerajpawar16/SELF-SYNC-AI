import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, Upload, X } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { TECHNOLOGIES } from '../utils/constants';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    experience: '',
    bio: '',
  });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file);
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    // Backend will handle profile update when connected
    // This UI will send the form data to the profile API endpoint
    if (updateProfile) {
      await updateProfile(form);
    }
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold font-display text-surface-900 dark:text-surface-50">Profile</h1>
        <p className="text-surface-500 dark:text-surface-400 mt-1">
          Manage your personal information and skills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Card */}
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-400 to-indigo-500 flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  form.name.charAt(0).toUpperCase()
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-9 h-9 bg-white dark:bg-surface-700 rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <Camera className="w-4 h-4 text-surface-600" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-50">{form.name || 'Your Name'}</h3>
            <p className="text-sm text-surface-400 mb-4">{form.email}</p>

            <div className="w-full pt-4 border-t border-surface-200 dark:border-surface-700">
              <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-3">Resume</p>
              {resume ? (
                <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-surface-600 dark:text-surface-400 truncate max-w-[120px]">{resume.name}</span>
                  </div>
                  <button onClick={() => setResume(null)} className="p-1 hover:bg-surface-200 dark:hover:bg-surface-700 rounded">
                    <X className="w-3.5 h-3.5 text-surface-400" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-lg cursor-pointer hover:border-primary-400 transition-colors">
                  <Upload className="w-6 h-6 text-surface-400" />
                  <span className="text-sm text-surface-400">Upload Resume</span>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </Card>

        {/* Details Form */}
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Experience Level
              </label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-50 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              >
                <option value="">Select experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {TECHNOLOGIES.slice(0, 20).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-2 border-primary-500'
                        : 'bg-surface-50 dark:bg-surface-800 text-surface-500 dark:text-surface-400 border-2 border-surface-200 dark:border-surface-700 hover:border-surface-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
              <Button
                variant="primary"
                icon={Save}
                loading={saving}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

