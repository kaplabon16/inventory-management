import React from "react"

const SocialLogin = () => {
  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:5043"}/api/auth/social/${provider}`
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <button onClick={() => handleSocialLogin("google")} className="p-2 text-white bg-red-500 rounded hover:bg-red-600">
        Login with Google
      </button>
      <button onClick={() => handleSocialLogin("github")} className="p-2 text-white bg-gray-800 rounded hover:bg-gray-900">
        Login with GitHub
      </button>
    </div>
  )
}

export default SocialLogin
