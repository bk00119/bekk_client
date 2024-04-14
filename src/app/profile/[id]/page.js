import { Suspense } from "react"
import { cookies } from "next/headers"

import PublicProfilePage from "../../components/profile/publicProfilePage"
import Test from "../../components/profile/test"
import { verifyToken } from "@/utils/jwt"
import PrivateProfilePage from "@/app/components/profile/privateProfilePage"

export default async function Page(props) {
  const cookieStore = cookies()
  const access_token = cookieStore.get("access_token")
  const access_token_data = await verifyToken(access_token.value)

  // CURRENT USER'S ID
  const curr_user_id = access_token_data?.user_id

  // USER ID FOR THE PROFILE PAGE
  const profile_id = props.params.id

  const isAdmin = curr_user_id === profile_id

  return (
    // useSearchParams() needs to be wrapped in a Suspense boundary.
    <Suspense>
      {isAdmin ? (
        // PRIVATE PROFILE PAGE (ADMIN)
        <PrivateProfilePage profile_id={profile_id} >
          {/* REPLACE TEST */}
          <Test />
        </PrivateProfilePage>
      ) : (
        // PUBLIC PROFILE PAGE
        // only view the user's posts
        <PublicProfilePage profile_id={profile_id} />
      )}
    </Suspense>
  )
}
