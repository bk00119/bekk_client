"use client"

import { MdClose } from "react-icons/md"

export default function LikesModal ({ openModal, setOpenModal, users = null }) {
  function close() {
    setOpenModal(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <dialog
        open={openModal}
        className="flex flex-col bg-white rounded-lg shadow-lg p-4 z-10 min-w-56 min-h-56 max-h-72"
      >
        <div className="flex justify-between items-center mb-4 relative">
          <p className="text-lg font-semibold flex-grow text-center">Likes</p>
          <button
            className="text-gray-500 hover:text-gray-700 absolute top-0 right-0"
            onClick={close}
          >
            <MdClose size={24} />
          </button>
        </div>

        <hr className="border-gray-400" />
        <div className="mt-4 overflow-y-auto h-full">
          {users && users.map((user) => <p key={user.user_id} className="mb-1">{user.username}</p>)}
        </div>
      </dialog>
      <div
        className="fixed inset-0 bg-black opacity-50 z-0"
        onClick={close}
      ></div>
    </div>
  )
}
