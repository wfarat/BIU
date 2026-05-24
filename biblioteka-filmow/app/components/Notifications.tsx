'use client'
import {useFilmDispatch, useFilmState} from "@/app/context/FilmContext";
import {useEffect} from "react";


export default function Notifications() {

    const { notifications } = useFilmState();
    const dispatch = useFilmDispatch();

    const getColor = (type: string) => {
        if (type === "error") return "red";
        if (type === "success") return "green";
        if (type === "warning") return "yellow";
        return "blue";
    }
    useEffect(() => {
        setTimeout(() => {
            dispatch({type: "DISMISS_NOTIFICATION", payload: notifications.at(-1)?.id ?? 0});
        },3000);
    }, [notifications])
    return (
        <div style={{position: "fixed", top: "20px", right: "20px"}}>
        {notifications.map(notification =>
            <div style={{background: getColor(notification.type)}} key={notification.id}>{notification.message}</div>)}
        </div>
    )
}
