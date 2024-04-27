"use client"

import PostModal from "@/app/components/postModal"
import { useState } from "react"

export default function CommentButton({
  className,
  post_id,
  post_data,
  user_id,
  children,
}) {
  const [openModal, setOpenModal] = useState(false)

  function expandPost() {
    setOpenModal(true)
  }

  return (
    <>
      <button className={className} onClick={expandPost}>
        {children}
      </button>
      {openModal && (
        <PostModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          post_id={post_id}
          post_data={post_data}
          user_id={user_id}
        />
      )}
    </>
  )
}
