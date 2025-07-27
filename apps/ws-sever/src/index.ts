import { WebSocketServer } from "ws";
import {client} from "@repo/db/client";

const server = new WebSocketServer({ port: 8080 });

server.on("connection", async (socket) => {
    await client.user.create({
        data:{
            email: Math.random().toString() + "@example.com",
            password: Math.random().toString()
        }
    })
    socket.send("Welcome to WebSocket Server!");
})