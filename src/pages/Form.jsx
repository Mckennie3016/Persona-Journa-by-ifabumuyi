import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    country: '',
    interests: [],
    comments: '',
    agreeToTerms: false
  });
  const [showWelcome, setShowWelcome] = useState(false);
  const [lastName, setLastName] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'interests') {
        let updatedInterests = [...formData.interests];
        if (checked) {
          updatedInterests.push(value);
        } else {
          updatedInterests = updatedInterests.filter(item => item !== value);
        }
        setFormData({...formData, interests: updatedInterests});
      } else {
        setFormData({...formData, [name]: checked});
      }
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Extract last name from fullName
    const nameParts = formData.fullName.trim().split(' ');
    const extractedLastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    setLastName(extractedLastName);
    
    setShowWelcome(true);
    
    // Set timeout to hide welcome message and navigate after 5 seconds
    setTimeout(() => {
      navigate('/home');
    }, 5000);
  };

  if (showWelcome) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-blue-600">
            Welcome{lastName ? `, ${lastName}` : ''}!
          </h1>
          <p className="text-lg text-gray-600">
            Your account has been successfully created.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to home page in a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center bg-black/90 backdrop-blur-sm p-6 rounded-lg mb-6">
          <h1 className="text-2xl font-bold text-blue-400">Create Account</h1>
          <p className="mt-2 text-sm text-blue-400">
            Please fill in your details to sign up
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="13"
                max="120"
                required
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </legend>
                <div className="mt-2 space-y-2">
                  {['Male', 'Female', 'Other', 'Prefer not to say'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        id={`gender-${option}`}
                        name="gender"
                        type="radio"
                        required
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`gender-${option}`} className="ml-2 block text-sm text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="NG">Nigeria</option>
                <option value="IN">India</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Interests</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {['Sports', 'Music', 'Reading', 'Travel', 'Technology'].map((interest) => (
                  <div key={interest} className="flex items-center">
                    <input
                      id={`interest-${interest}`}
                      name="interests"
                      type="checkbox"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`interest-${interest}`} className="ml-2 block text-sm text-gray-700">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                Additional Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={3}
                value={formData.comments}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                  I agree to the terms and conditions <span className="text-red-500">*</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;