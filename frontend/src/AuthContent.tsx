import React, { use } from 'react';
import { request } from './axios_helper';
import { useEffect, useState } from 'react';

export default function AuthContent() {

const [message, setMessage] = React.useState<string | null>(null);

useEffect(() => {
    request('GET', '/messages', {})
        .then(response => {
            console.log(response.data);
            setMessage(response.data[0]);
        })
        .catch(error => {
            console.error("Error fetching protected data:", error);
        });
}, []);

    return (
        <div>
            <h1>Authenticated Content</h1>
            <p>This content is only visible to authenticated users.</p>
            {message && <p>Message from server: {message}</p>}
        </div>
    );
}   