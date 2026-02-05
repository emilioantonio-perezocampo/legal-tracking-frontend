import { ShieldCheck } from 'lucide-react';
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-50 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay z-0"></div>

      {/* Main Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="pt-8 pb-6 px-8 flex flex-col items-center border-b border-gray-100 bg-white">
          {/* Logo Area */}
          <div className="relative flex items-center justify-center mb-6 group cursor-default">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 transform group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                <path d="M7 21h10"/>
                <path d="M12 3v18"/>
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
              </svg>
            </div>
            <div className="ml-3 text-left">
               <h1 className="font-bold text-xl text-gray-900 tracking-tight leading-none">LegalTracking</h1>
               <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 text-center">AI</span>
               </div>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center max-w-xs mx-auto">
            Login to access your legal AI assistant
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8 bg-gray-50/30">
          <LoginForm />
        </div>
      </div>

      {/* Security Footer */}
      <div className="mt-8 w-full max-w-md text-center animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300">
        <div className="flex items-center justify-center gap-2 mb-3 bg-white/5 backdrop-blur-sm py-1.5 px-3 rounded-full inline-flex border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300 text-xs font-medium uppercase tracking-wide">Secure login with multi-factor authentication</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
          This system uses advanced security measures to protect your legal data and ensure compliance with confidentiality requirements.
        </p>
      </div>
    </div>
  );
}