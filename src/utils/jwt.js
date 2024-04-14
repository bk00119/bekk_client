'use server'

import { jwtVerify } from 'jose';

const JWT_SECRET = 'bekk-developers'

export async function verifyToken(token){
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload
  } catch (error){
    console.error('Error decoding JWT token: ', error)
    return null
  }
}