import PusherServer from "pusher"
import PusherClient from "pusher-js"
import { env } from "@/env"

export const pusherServer = new PusherServer({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: env.PUSHER_CLUSTER,
  useTLS: true,
})

export const pusherClient = new PusherClient(env.PUSHER_KEY, {
  cluster: env.PUSHER_CLUSTER,
  authEndpoint: "/api/pusher-auth",
  authTransport: "ajax",
  auth: {
    headers: {
      "Content-type": "application/json",
    },
  },
})
