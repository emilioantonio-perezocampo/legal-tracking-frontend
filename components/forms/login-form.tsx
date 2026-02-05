'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { createClient } from "@/lib/auth/client"
import { loginSchema, type LoginValues } from "@/lib/validators/auth"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const supabase = createClient()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: LoginValues) {
    setIsLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      toast.error("Error de autenticación", {
        description: error.message
      })
      setIsLoading(false)
      return
    }

    toast.success("Bienvenido", {
      description: "Iniciando sesión..."
    })
    
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-semibold text-gray-700 ml-1" htmlFor="email-input">
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input
                    {...field}
                    id="email-input"
                    type="email"
                    placeholder="john.doe@lawfirm.com"
                    className="h-11 pl-10 bg-white border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:border-blue-500 transition-all shadow-sm"
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <FormLabel className="text-sm font-semibold text-gray-700" htmlFor="password-input">
                  Password
                </FormLabel>
                <Button 
                  variant="link" 
                  type="button" 
                  className="p-0 h-auto text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </Button>
              </div>
              <FormControl>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input
                    {...field}
                    id="password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 pl-10 pr-10 bg-white border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:border-blue-500 transition-all shadow-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none z-10"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Remember Me */}
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2.5 space-y-0 ml-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-4 w-4 rounded border-gray-300 shadow-sm data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
              </FormControl>
              <FormLabel className="text-sm text-gray-600 cursor-pointer select-none font-normal">
                Remember me for 30 days
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 mt-2 gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              Sign In <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>

        {/* Footer Links */}
        <div className="text-center text-xs mt-2">
          <span className="text-gray-500">Don't have an account? </span>
          <button type="button" className="text-blue-600 font-semibold hover:underline focus:outline-none">
            Contact your administrator
          </button>
        </div>
      </form>
    </Form>
  )
}