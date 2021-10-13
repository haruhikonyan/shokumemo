import React from "react"

const Loading: React.VFC = () => {
  return (
    <div className="fixed-top w-100 h-100 bg-dark opacity-50 d-flex justify-content-center align-items-center ">
      <div className="spinner-border text-light" role="status" />
    </div>
  )
}

export default Loading
