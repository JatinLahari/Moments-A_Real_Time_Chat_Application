import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import AnimationPage from "../components/AnimationPage";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {login, isLoggingIn} = useAuthStore();

  const validateForm = () =>{
    if(!formData.email.trim()) return toast.error("Email is required.");
    if(!formData.password) return toast.error("Password is required");

    return true;
  }
  const handleSubmit = (e)=>{
    e.preventDefault()

    const success = validateForm()

    if(success === true) login(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
    {/* Left side  */}

      <AnimationPage />

    {/* Right side  */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary"/>
              </div>
              <h1 className="text-2xl font-bold mt-2">Let's Create Moments</h1>
              <p className="text-base-content/60">Login Into Your Account</p>
            </div>
          </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="form-control">
                <lable className="label">
                  <Mail className="size-5 text-base-content/60"/>
                  <span className="label-text font-medium">Email</span>
                </lable>
                <div className="relative">
                  <input 
                  type="email"
                  className={`input input-bordered w-full pl-5`}
                  placeholder="jordon@gmail.com"
                  onChange={(e)=> setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-control">
                <lable className="label">
                  <Lock className="size-5 text-base-content/60"/>
                  <span className="label-text font-medium">Password</span>
                </lable>
                <div className="relative">
                  <input 
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-5`}
                  placeholder={showPassword ? "12345678" : "********"}
                  value={formData.password}
                  onChange={(e)=> setFormData({...formData, password: e.target.value})}
                  />
                  <button type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={()=>setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40"/>
                    ) : <Eye className="size-5 text-base-content/40"/>}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-circle btn-primary w-full" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Loading...
                      </>
                    ) : ( "Login" )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-base-content/60">
                New to create moments?{" "}
                <Link className="link link-primary" to="/signup">Sign Up</Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;