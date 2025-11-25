// // src/components/auth/Register.tsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Eye,
//   EyeOff,
//   Building,
//   User,
//   Mail,
//   Lock,
//   Briefcase,
// } from "lucide-react";
// import { Card, CardContent, CardHeader } from "../ui/Card";
// import { Button } from "../ui/Button";
// import { Input } from "../ui/Input";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import { registerUser, clearError } from "../../store/slices/authSlice";

// export const Register: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error } = useAppSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     company: "",
//     role: "purchase_manager" as "purchase_manager" | "project_manager",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   useEffect(() => {
//     dispatch(clearError());
//   }, [dispatch]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       dispatch(clearError());
//       // In real app, you'd set a form error state
//       alert("Passwords do not match");
//       return;
//     }

//     const { confirmPassword, ...registerData } = formData;
//     const result = await dispatch(registerUser(registerData));

//     if (registerUser.fulfilled.match(result)) {
//       navigate("/");
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="w-full max-w-md space-y-8">
//         {/* Header */}
//         <div className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="p-3 bg-blue-600 rounded-2xl">
//               <Building className="w-8 h-8 text-white" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">Get Started</h1>
//           <p className="mt-2 text-gray-600">Create your AgentProcure account</p>
//         </div>

//         <Card className="shadow-xl">
//           <CardHeader>
//             <h2 className="text-xl font-bold text-center text-gray-900">
//               Sign Up
//             </h2>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <div className="p-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
//                   {error}
//                 </div>
//               )}

//               <Input
//                 label="Full Name"
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 required
//                 icon={<User className="w-4 h-4 text-gray-400" />}
//               />

//               <Input
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 required
//                 icon={<Mail className="w-4 h-4 text-gray-400" />}
//               />

//               <Input
//                 label="Company Name"
//                 name="company"
//                 type="text"
//                 value={formData.company}
//                 onChange={handleChange}
//                 placeholder="Enter your company name"
//                 required
//                 icon={<Briefcase className="w-4 h-4 text-gray-400" />}
//               />

//               <div>
//                 <label className="label">Role</label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="input"
//                   required
//                 >
//                   <option value="purchase_manager">Purchase Manager</option>
//                   <option value="project_manager">Project Manager</option>
//                 </select>
//               </div>

//               <div className="relative">
//                 <Input
//                   label="Password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Create a password"
//                   required
//                   icon={<Lock className="w-4 h-4 text-gray-400" />}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute text-gray-400 right-3 top-9 hover:text-gray-600"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>

//               <div className="relative">
//                 <Input
//                   label="Confirm Password"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm your password"
//                   required
//                   icon={<Lock className="w-4 h-4 text-gray-400" />}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute text-gray-400 right-3 top-9 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>

//               <div className="flex items-center text-sm">
//                 <input
//                   type="checkbox"
//                   required
//                   className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-gray-600">
//                   I agree to the{" "}
//                   <a href="#" className="text-blue-600 hover:text-blue-500">
//                     Terms of Service
//                   </a>{" "}
//                   and{" "}
//                   <a href="#" className="text-blue-600 hover:text-blue-500">
//                     Privacy Policy
//                   </a>
//                 </span>
//               </div>

//               <Button
//                 type="submit"
//                 loading={isLoading}
//                 className="w-full"
//                 size="lg"
//               >
//                 Create Account
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="font-medium text-blue-600 hover:text-blue-500"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };
