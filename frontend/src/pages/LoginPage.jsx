import { MessageSquare } from "lucide-react";
import AnimationPage from "../components/AnimationPage";

const LoginPage = () => {


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
        </div>
      </div>
    </div>
  )
}

export default LoginPage;